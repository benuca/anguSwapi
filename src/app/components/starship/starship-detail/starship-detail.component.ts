import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
})
export class StarshipDetailComponent implements OnInit {
  starshipName: string | null = null;
  starshipData: any;
  filmsAppearedIn: any = [];

  getFilmsAppearedIn() {
    if (this.starshipData.films) {
      this.starshipData.films.map((filmUrl: string) => {
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
      this.starshipName = params['name'];
      if (this.starshipName) {
        this.http
          .get(`https://swapi.dev/api/starships/?search=${this.starshipName}`)
          .subscribe((data: any) => {
            this.starshipData = data.results[0];
            this.getFilmsAppearedIn();
          });
      }
    });
  }
}
