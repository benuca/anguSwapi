import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
})
export class PlanetDetailComponent {
  planetName: string | null = null;
  planetData: any;
  filmsAppearedIn: any = [];

  getFilmsAppearedIn() {
    if (this.planetData.films) {
      this.planetData.films.map((filmUrl: string) => {
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
      this.planetName = params['name'];
      if (this.planetName) {
        this.http
          .get(`https://swapi.dev/api/planets/?search=${this.planetName}`)
          .subscribe((data: any) => {
            this.planetData = data.results[0];
            this.getFilmsAppearedIn();
          });
      }
    });
  }
}
