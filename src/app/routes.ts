import { Routes } from '@angular/router';
import { PlanetsComponent } from './components/planet/planet-list/planet-list.component';
import { CharactersComponent } from './components/character/character-list/character-list.component';
import { StarshipsComponent } from './components/starship/starship-list/starship-list.component';
import { StarshipDetailComponent } from './components/starship/starship-detail/starship-detail.component';
import { PlanetDetailComponent } from './components/planet/planet-detail/planet-detail.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';

const routeConfig: Routes = [
  { path: 'planets', component: PlanetsComponent },
  { path: 'planets/:name', component: PlanetDetailComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:name', component: CharacterDetailComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starships/:name', component: StarshipDetailComponent },
];

export default routeConfig;
