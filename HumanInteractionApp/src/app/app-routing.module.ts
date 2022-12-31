import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogLionComponent } from './components/dog-lion/dog-lion.component';
import { MealPreparationComponent } from './components/meal-preparation/meal-preparation.component';
import { MouseCatComponent } from './components/mouse-cat/mouse-cat.component';
import { AboutComponent } from './components/puzzle/about/about.component';
import { ContactComponent } from './components/puzzle/contact/contact.component';
import { GameComponent } from './components/puzzle/game/game.component';
import { HistoryComponent } from './components/puzzle/history/history.component';
import { RepositoryComponent } from './components/puzzle/repository/repository.component';
import { RhynoElephantComponent } from './components/rhyno-elephant/rhyno-elephant.component';
import { SaladMakingComponent } from './components/salad-making/salad-making.component';

const routes: Routes = [
  { path: 'round-1', component: MouseCatComponent },
  { path: 'round-2', component: DogLionComponent },
  { path: 'round-3', component: RhynoElephantComponent },
  { path: 'healthy-food-1', component: SaladMakingComponent },
  { path: 'healthy-food-2', component: MealPreparationComponent },
  { path: '', component: GameComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'repository', component: RepositoryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
