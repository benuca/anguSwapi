import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  SelectableSettings,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-starships',
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.scss'],
})
export class StarshipsComponent implements OnInit {
  starshipsData: any[] = [];
  starshipsEndpoint: string = 'https://swapi.dev/api/starships/';
  smallestCrewedStarships: any[] = [];
  selectableSettings: SelectableSettings = {
    checkboxOnly: false,
  };

  onSelectionChange(args: SelectionEvent) {
    if (args.selectedRows) {
      const selectedItem = args.selectedRows[0].dataItem;
      this.navigationService.navigate(['/starships', selectedItem.name]);
    }
  }

  sortStarshipByCrewSize() {
    this.starshipsData.sort((a, b) => {
      if (a.crew === 'unknown' && b.crew === 'unknown') {
        return 0;
      } else if (a.crew === 'unknown') {
        return 1;
      } else if (b.crew === 'unknown') {
        return -1;
      } else {
        const crewSizeA = parseInt(a.crew.replace(/,/g, ''), 10);
        const crewSizeB = parseInt(b.crew.replace(/,/g, ''), 10);
        return crewSizeA - crewSizeB;
      }
    });
  }

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('smallestCrewedStarships')) {
      this.http.get(this.starshipsEndpoint).subscribe((data: any) => {
        this.starshipsData.push(...data.results);
        const amountOfPlanets: number = data.count;
        const planetsPerPage: number = data.results.length;
        let pagesRemaining: number = Math.ceil(
          (amountOfPlanets - this.starshipsData.length) / planetsPerPage
        );
        for (++pagesRemaining; pagesRemaining > 1; pagesRemaining--) {
          this.http
            .get(`${this.starshipsEndpoint}?page=${pagesRemaining}`)
            .subscribe((data: any) => {
              this.starshipsData.push(...data.results);
              this.sortStarshipByCrewSize();
              this.smallestCrewedStarships = this.starshipsData.slice(0, 5);

              localStorage.setItem(
                'smallestCrewedStarships',
                JSON.stringify(this.smallestCrewedStarships)
              );
            });
        }
      });
    } else {
      this.smallestCrewedStarships = JSON.parse(
        localStorage.getItem('smallestCrewedStarships')!
      );
    }
  }
}
