import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.route.params.subscribe((params) => {
      if (params['playSound'] == '1') {
        this.audioGame = new Audio();
        this.audioGame.src = '../../../assets/sound/i1.m4a';
        this.audioGame.load();
        this.audioGame.play();
      }
    });
  }

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  surprise(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes,
    });

    myConfetti();
    this.playCorrectSound();

    setTimeout(() => {
      localStorage.setItem('puncte', '1');
      this.router.navigateByUrl('my-drawing');
    }, 6500);
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
  }

  playCorrectSound() {
    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../../assets/sound/i2.m4a';
    this.audioCorrect.load();
    this.audioCorrect.play();
  }

  playRetrySound() {
    this.audioRetry = new Audio();
    this.audioRetry.src = '../../../assets/sound/try.m4a';
    this.audioRetry.load();
    this.audioRetry.play();
  }
}
