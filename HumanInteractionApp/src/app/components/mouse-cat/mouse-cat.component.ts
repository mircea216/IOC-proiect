import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-mouse-cat',
  templateUrl: './mouse-cat.component.html',
  styleUrls: ['./mouse-cat.component.scss'],
})
export class MouseCatComponent implements OnInit, OnDestroy {
  private audioGame: any;
  private audioCorrect: any;
  private audioRetry: any;
  private backSound: any;
  buttonReplySoundDisable: boolean | undefined = true;
  buttonDisable: boolean | undefined = true;
  buttonBackDisable: boolean | undefined = true;
  displayer: boolean | undefined;

  win = false;

  secondTour = false;

  ngOnInit(): void {
    this.displayer = false;
    this.buttonDisable = true;
    this.route.params.subscribe((value) => {
      if (value['playSound'] === '1') {
        this.buttonDisable = false;
      }
    });
    this.playGameSound();
  }

  replySound(): void {
    this.buttonReplySoundDisable = false;
    this.playGameSound();
    setTimeout(() => {
      this.buttonReplySoundDisable = true;
    }, 4500);
  }

  playGameSound(): void {
    if (!this.win && !this.secondTour) {
      if (this.audioCorrect) this.audioCorrect.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.audioGame) this.audioGame.pause();
      if (this.backSound) this.backSound.pause();

      this.route.params.subscribe((params) => {
        if (params['playSound'] == '1') {
          this.audioGame = new Audio();
          this.audioGame.src = '../../../assets/sound/i1.m4a';
          this.audioGame.load();
          this.audioGame.play();
        } else {
          this.secondTour = true;
        }
      });
    }
  }

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  surprise(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes,
    });

    myConfetti();
    this.playCorrectSound();
  }

  ngOnDestroy(): void {
    if (this.audioGame) {
      this.audioGame.pause();
      this.audioGame = null;
    }
    if (this.audioCorrect) {
      this.audioCorrect.pause();
      this.audioCorrect = null;
    }
    if (this.audioRetry) {
      this.audioRetry.pause();
      this.audioRetry = null;
    }
    if (this.backSound) {
      this.backSound.pause();
      this.backSound = null;
    }
  }

  playCorrectSound() {
    if (!this.win && !this.secondTour) {
      if (this.audioGame) this.audioGame.pause();
      if (this.audioCorrect) this.audioCorrect.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.backSound) this.backSound.pause();
      this.audioCorrect = new Audio();
      this.audioCorrect.src = '../../../assets/sound/i2.m4a';
      this.audioCorrect.load();
      this.audioCorrect.play();
      this.win = true;

      setTimeout(() => {
        localStorage.setItem('puncte', '1');
        this.router.navigateByUrl('my-drawing');
      }, 6500);
    }
  }

  playRetrySound() {
    if (!this.win && !this.secondTour) {
      if (this.audioGame) this.audioGame.pause();
      if (this.audioCorrect) this.audioCorrect.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.backSound) this.backSound.pause();
      if (!this.audioCorrect) {
        this.audioRetry = new Audio();
        this.audioRetry.src = '../../../assets/sound/try.m4a';
        this.audioRetry.load();
        this.audioRetry.play();
      }
    }
  }

  backToMenu(): void {
    this.router.navigateByUrl("");
    localStorage.setItem("puncte", "0");
    if (this.backSound) this.backSound.pause();
  }

  setDisplayer(): void {
    this.displayer = true;
    this.backSound = new Audio();
    this.backSound.src = '../../../assets/sound/back.ogg';
    this.backSound.load();
    this.backSound.play();
    if (this.audioGame) this.audioGame.pause();
    if (this.audioCorrect) this.audioCorrect.pause();
    if (this.audioRetry) this.audioRetry.pause();
    this.buttonBackDisable = false;
    setTimeout(() => { this.buttonBackDisable = true }, 8000);
  }

  negateDisplayer(): void {
    this.displayer = false;
  }
}
