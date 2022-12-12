import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogLionComponent } from './components/dog-lion/dog-lion.component';
import { MouseCatComponent } from './components/mouse-cat/mouse-cat.component';
import { RhynoElephantComponent } from './components/rhyno-elephant/rhyno-elephant.component';
import { SaladMakingComponent } from './components/salad-making/salad-making.component';

const routes: Routes = [
  { path: 'round-1', component: MouseCatComponent },
  { path: 'round-2', component: DogLionComponent },
  { path: 'round-3', component: RhynoElephantComponent },
  { path: 'healthy-food-1', component: SaladMakingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
