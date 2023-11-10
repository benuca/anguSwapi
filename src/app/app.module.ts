import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule, TabStripModule } from '@progress/kendo-angular-layout';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import {
  ButtonModule,
  ButtonGroupModule,
} from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { PlanetsComponent } from './components/planet/planet-list/planet-list.component';
import { StarshipsComponent } from './components/starship/starship-list/starship-list.component';
import { CharactersComponent } from './components/character/character-list/character-list.component';
import { StarshipDetailComponent } from './components/starship/starship-detail/starship-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PlanetDetailComponent } from './components/planet/planet-detail/planet-detail.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';
import { NavigationService } from './services/navigation.service';
import routeConfig from '../app/routes';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PlanetsComponent,
    StarshipsComponent,
    CharactersComponent,
    StarshipDetailComponent,
    LoaderComponent,
    PlanetDetailComponent,
    CharacterDetailComponent,
  ],
  imports: [
    LoaderModule,
    HttpClientModule,
    GridModule,
    ButtonModule,
    ButtonGroupModule,
    BrowserModule,
    LayoutModule,
    TabStripModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routeConfig),
    IndicatorsModule,
  ],
  providers: [provideRouter(routeConfig), NavigationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
