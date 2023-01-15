import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MouseCatComponent } from './components/mouse-cat/mouse-cat.component';
import { DogLionComponent } from './components/dog-lion/dog-lion.component';
import { RhynoElephantComponent } from './components/rhyno-elephant/rhyno-elephant.component';
import { SaladMakingComponent } from './components/salad-making/salad-making.component';
import { MealPreparationComponent } from './components/meal-preparation/meal-preparation.component';
import { PuzzleSnowWhiteComponent } from './components/puzzles/puzzle-snow-white/puzzle-snow-white.component';
import { BoardComponent } from './components/puzzle/board/board.component';
import { RepositoryComponent } from './components/puzzle/repository/repository.component';
import { CategoryComponent } from './components/puzzle/category/category.component';
import { CategoryHistoryComponent } from './components/puzzle/category-history/category-history.component';
import { GameComponent } from './components/puzzle/game/game.component';
import { HeaderComponent } from './components/puzzle/header/header.component';
import { HistoryComponent } from './components/puzzle/history/history.component';
import { ImageComponent } from './components/puzzle/image/image.component';
import { NavigationComponent } from './components/puzzle/navigation/navigation.component';
import { ImageHistoryComponent } from './components/puzzle/image-history/image-history.component';
import { StatsComponent } from './components/puzzle/stats/stats.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './components/puzzle/category.service';
import { DictionaryService } from './components/puzzle/dictionary.service';
import { GameDBService } from './components/puzzle/gamedb.service';
import { DrawingNumbersComponent } from './components/drawing-numbers/drawing-numbers.component';

@NgModule({
  declarations: [
    AppComponent,
    MouseCatComponent,
    DogLionComponent,
    RhynoElephantComponent,
    SaladMakingComponent,
    MealPreparationComponent,
    PuzzleSnowWhiteComponent,
    BoardComponent,
    RepositoryComponent,
    CategoryComponent,
    CategoryHistoryComponent,
    GameComponent,
    HeaderComponent,
    HistoryComponent,
    ImageComponent,
    ImageHistoryComponent,
    NavigationComponent,
    StatsComponent,
    DrawingNumbersComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [CategoryService, DictionaryService, GameDBService],
  bootstrap: [AppComponent],
})
export class AppModule {}
