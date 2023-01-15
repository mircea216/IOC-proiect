import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';
import { GameDBService } from '../gamedb.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  readonly imagesPerCategory = 3;
  readonly secondsInAMinute = 60;
  private subscription: Subscription | undefined;
  private intervalId: any;
  private categoryId: number = -1;
  private seconds: number = 0;
  folder: string = '';
  image: number = 0;
  over: boolean = false;
  time: string = '';
  moves: number = 0;
  fails: number = 0;
  goal: string = '';
  end: string = '';

  private startSound: any;

  constructor(
    private dictionary: DictionaryService,
    private gamedb: GameDBService
  ) {}

  ngOnInit(): void {
    this.subscription = this.dictionary
      .getTranslations()
      .subscribe((data: any) => {
        this.goal = data['GAME_GOAL'];
        this.end = 'Ai castigat!';
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  refreshTimer(): void {
    this.intervalId = setInterval(() => {
      if (this.over) {
        clearInterval(this.intervalId);
      } else {
        this.seconds++;
        let minutes = Math.floor(this.seconds / this.secondsInAMinute);
        let seconds = (this.seconds % this.secondsInAMinute) + 's';
        this.time = minutes ? minutes + 'm ' + seconds : seconds;
      }
    }, 1000);
  }

  reset(): void {
    this.moves = 0;
    this.fails = 0;
    this.over = false;
    this.seconds = 0;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.refreshTimer();

    if (this.startSound) this.startSound.pause();
    this.startSound = new Audio();
    this.startSound.src = '../../../assets/images/povesti/0' + '/0.mp4';
    this.startSound.load();
    this.startSound.play();
  }

  onCategoryChange(category: any): void {
    this.categoryId = category.categoryId;
    this.folder = category.folder;
    this.reset();
    this.image = Math.floor(Math.random() * this.imagesPerCategory);
  }

  onImageChange(image: any): void {
    this.image = image;
    this.reset();
  }

  onStatsChange({ moves = 0, fails = 0, over = false }): void {
    this.moves = moves;
    this.fails = fails;
    this.over = over;
    this.save();
  }

  save(): void {
    if (this.over) {
      this.gamedb.save({
        categoryId: this.categoryId,
        folder: this.folder,
        image: this.image,
        time: this.time,
        moves: this.moves,
        fails: this.fails,
      });
    }
  }
}
