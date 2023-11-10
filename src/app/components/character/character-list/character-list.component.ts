import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  SelectableSettings,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-characters',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharactersComponent implements OnInit {
  charactersData: any[] = [];
  charactersEndpoint: string = 'https://swapi.dev/api/people/';
  firstFiveCharsYoungerThanForty: any[] = [];
  selectableSettings: SelectableSettings = { checkboxOnly: false };

  onSelectionChange(args: SelectionEvent) {
    if (args.selectedRows) {
      const selectedItem = args.selectedRows[0].dataItem;
      this.navigationService.navigate(['/characters', selectedItem.name]);
    }
  }

  pushYoungCharacters(data: any) {
    data.results.map((character: any) => {
      const yearWithoutBBY = character.birth_year.replace(' BBY', '');
      character.age = parseInt(yearWithoutBBY, 10);
      if (character.age < 40 && this.firstFiveCharsYoungerThanForty.length < 5)
        this.firstFiveCharsYoungerThanForty.push(character);
    });
  }

  constructor(
    private http: HttpClient,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem('firstFiveCharsYoungerThanForty')) {
      this.http.get(this.charactersEndpoint).subscribe((data: any) => {
        this.pushYoungCharacters(data);
        this.http
          .get(this.charactersEndpoint + '?page=2')
          .subscribe((data: any) => {
            this.pushYoungCharacters(data);
            this.firstFiveCharsYoungerThanForty.sort((a, b) => b.mass - a.mass);
            localStorage.setItem(
              'firstFiveCharsYoungerThanForty',
              JSON.stringify(this.firstFiveCharsYoungerThanForty)
            );
          });
      });
    } else {
      this.firstFiveCharsYoungerThanForty = JSON.parse(
        localStorage.getItem('firstFiveCharsYoungerThanForty')!
      );
    }
  }
}
