import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogLionComponent } from './components/dog-lion/dog-lion.component';
import { DrawingNumbersComponent } from './components/drawing-numbers/drawing-numbers.component';
import { MealPreparationComponent } from './components/meal-preparation/meal-preparation.component';
import { MenuComponent } from './components/menu/menu.component';
import { MouseCatComponent } from './components/mouse-cat/mouse-cat.component';
import { GameComponent } from './components/puzzle/game/game.component';
import { HistoryComponent } from './components/puzzle/history/history.component';
import { RepositoryComponent } from './components/puzzle/repository/repository.component';
import { RhynoElephantComponent } from './components/rhyno-elephant/rhyno-elephant.component';
import { SaladMakingComponent } from './components/salad-making/salad-making.component';

const routes: Routes = [
  { path: 'round-1/:playSound', component: MouseCatComponent },
  { path: 'round-2/:playSound', component: DogLionComponent },
  { path: 'round-3/:playSound', component: RhynoElephantComponent },
  { path: 'healthy-food-1/:playSound', component: MealPreparationComponent },
  { path: 'healthy-food-2/:playSound', component: SaladMakingComponent },
  { path: '', component: MenuComponent },
  { path: 'my-drawing', component: DrawingNumbersComponent },
  { path: 'puzzle', component: GameComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'repository', component: RepositoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
