import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MouseCatComponent } from './components/mouse-cat/mouse-cat.component';
import { DogLionComponent } from './components/dog-lion/dog-lion.component';
import { RhynoElephantComponent } from './components/rhyno-elephant/rhyno-elephant.component';
import { SaladMakingComponent } from './components/salad-making/salad-making.component';
import { MealPreparationComponent } from './components/meal-preparation/meal-preparation.component';
import { DrawingNumbersComponent } from './components/drawing-numbers/drawing-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    MouseCatComponent,
    DogLionComponent,
    RhynoElephantComponent,
    SaladMakingComponent,
    MealPreparationComponent,
    DrawingNumbersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
