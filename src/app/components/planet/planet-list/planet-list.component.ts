import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  SelectableSettings,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
})
export class PlanetsComponent implements OnInit {
  planetsData: any[] = [];
  planetsEndpoint: string = 'https://swapi.dev/api/planets/';
  fiveBiggestPlanets: any[] = [];
  selectableSettings: SelectableSettings = { checkboxOnly: false };

  onSelectionChange(args: SelectionEvent) {
    if (args.selectedRows) {
      const selectedItem = args.selectedRows[0].dataItem;
      this.navigationService.navigate(['/planets', selectedItem.name]);
    }
  }

  sortPlanetsByDiameter() {
    this.planetsData.sort((a, b) => {
      if (a.diameter === 'unknown' && b.diameter === 'unknown') {
        return 0;
      } else if (a.diameter === 'unknown') {
        return 1;
      } else if (b.diameter === 'unknown') {
        return -1;
      } else {
        const diameterA = parseInt(a.diameter, 10);
        const diameterB = parseInt(b.diameter, 10);
        return diameterB - diameterA;
      }
    });
  }

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('fiveBiggestPlanets')) {
      this.http.get(this.planetsEndpoint).subscribe((data: any) => {
        this.planetsData.push(...data.results);

        const amountOfPlanets: number = data.count;
        const planetsPerPage: number = data.results.length;
        let pagesRemaining: number =
          (amountOfPlanets - this.planetsData.length) / planetsPerPage;

        for (++pagesRemaining; pagesRemaining > 1; pagesRemaining--) {
          this.http
            .get(`${this.planetsEndpoint}?page=${pagesRemaining}`)
            .subscribe((data: any) => {
              this.planetsData.push(...data.results);
              this.sortPlanetsByDiameter();
              this.fiveBiggestPlanets = this.planetsData.slice(0, 5);
              localStorage.setItem(
                'fiveBiggestPlanets',
                JSON.stringify(this.fiveBiggestPlanets)
              );
            });
        }
      });
    } else {
      this.fiveBiggestPlanets = JSON.parse(
        localStorage.getItem('fiveBiggestPlanets')!
      );
    }
  }
}
