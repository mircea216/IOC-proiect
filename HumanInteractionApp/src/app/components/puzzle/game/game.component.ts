import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';
import { GameDBService } from '../gamedb.service';
import * as confetti from 'canvas-confetti';

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
  image: number = -1;
  over: boolean = false;
  time: string = '';
  moves: number = 0;
  fails: number = 0;
  goal: string = '';
  end: string = '';

  private startSound: any;

  constructor(
    private dictionary: DictionaryService,
    private gamedb: GameDBService,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.dictionary
      .getTranslations()
      .subscribe((data: any) => {
        this.goal = data['GAME_GOAL'];
        this.end = 'Ai câștigat!';
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
  }

  onCategoryChange(category: any): void {
    this.categoryId = category.categoryId;
    this.folder = category.folder;
    this.reset();
    this.image = Math.floor(Math.random() * this.imagesPerCategory);
    if (this.startSound) this.startSound.pause();
    this.startSound = new Audio();
    this.startSound.src =
      '../../../assets/images/povesti/' + this.image + '/0.mp4';
    this.startSound.load();
    this.startSound.play();
  }

  onImageChange(image: any): void {
    this.image = image;
    this.reset();

    if (this.startSound) this.startSound.pause();
    this.startSound = new Audio();
    this.startSound.src =
      '../../../assets/images/povesti/' + this.image + '/0.mp4';
    this.startSound.load();
    this.startSound.play();
  }

  onStatsChange({ moves = 0, fails = 0, over = false }): void {
    this.moves = moves;
    this.fails = fails;
    this.over = over;
    if (over) {
      const canvas = this.renderer2.createElement('canvas');

      this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

      const myConfetti = confetti.create(canvas, {
        resize: true, // will fit all screen sizes,
      });

      myConfetti();
    }
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
