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
  selector: 'app-dog-lion',
  templateUrl: './dog-lion.component.html',
  styleUrls: ['./dog-lion.component.scss'],
})
export class DogLionComponent implements OnInit, OnDestroy {
  private audioGame: any;
  private audioCorrect: any;
  private audioRetry: any;
  private backSound: any;
  buttonDisable: boolean | undefined;
  buttonReplySoundDisable: boolean | undefined = true;
  buttonBackDisable: boolean | undefined = true;
  displayer: boolean | undefined;

  win = false;

  secondTour = false;

  ngOnInit(): void {
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

  playGameSound(): void {
    if (!this.win) {
      if (this.audioGame) this.audioGame.pause();
      if (this.audioCorrect) this.audioCorrect.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.backSound) this.backSound.pause();
      this.route.params.subscribe((params) => {
        if (params['playSound'] == '1') {
          this.audioGame = new Audio();
          this.audioGame.src = '../../../assets/sound/a1.m4a';
          this.audioGame.load();
          this.audioGame.play();
        } else {
          this.secondTour = true;
        }
      });
    }
  }

  playCorrectSound() {
    if (!this.win && !this.secondTour) {
      if (this.audioGame) this.audioGame.pause();
      if (this.audioCorrect) this.audioCorrect.pause();
      if (this.audioRetry) this.audioRetry.pause();
      this.audioCorrect = new Audio();
      this.audioCorrect.src = '../../../assets/sound/i3.m4a';
      this.audioCorrect.load();
      this.audioCorrect.play();
      if (this.backSound) this.backSound.pause();
      this.win = true;
      setTimeout(() => {
        localStorage.setItem('puncte', '2');
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
      this.audioRetry = new Audio();
      this.audioRetry.src = '../../../assets/sound/try.m4a';
      this.audioRetry.load();
      this.audioRetry.play();
    }
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
