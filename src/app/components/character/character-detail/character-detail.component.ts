import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
})
export class CharacterDetailComponent {
  characterName: string | null = null;
  characterData: any;
  filmsAppearedIn: any = [];

  getFilmsAppearedIn() {
    if (this.characterData.films) {
      this.characterData.films.map((filmUrl: string) => {
        this.http.get(filmUrl).subscribe((data: any) => {
          const releaseDate = new Date(data.release_date);
          const year = releaseDate.getFullYear();
          const filmData = {
            filmTitle: data.title,
            filmDirector: data.director,
            filmReleaseYear: year,
          };
          this.filmsAppearedIn.push(filmData);
        });
      });
    }
  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.characterName = params['name'];
      if (this.characterName) {
        this.http
          .get(`https://swapi.dev/api/people/?search=${this.characterName}`)
          .subscribe((data: any) => {
            this.characterData = data.results[0];
            this.getFilmsAppearedIn();
          });
      }
    });
  }
}
