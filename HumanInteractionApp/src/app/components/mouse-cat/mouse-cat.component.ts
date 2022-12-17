import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-mouse-cat',
  templateUrl: './mouse-cat.component.html',
  styleUrls: ['./mouse-cat.component.scss']
})
export class MouseCatComponent implements OnInit, OnDestroy {

  private audioGame: any;
  private audioCorrect: any;
  private audioRetry: any;

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.audioGame = new Audio();
    this.audioGame.src = "../../../assets/sound/mc-sound.m4a"
    this.audioGame.load();
    this.audioGame.play();
  }


  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

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

  surprise(): void {

    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes,
    });

    myConfetti();
    this.playCorrectSound();
  }


  playCorrectSound() {
    this.audioCorrect = new Audio();
    this.audioCorrect.src = "../../../assets/sound/correct.m4a"
    this.audioCorrect.load();
    this.audioCorrect.play();
  }

  playRetrySound() {
    this.audioRetry = new Audio();
    this.audioRetry.src = "../../../assets/sound/retry-sound.m4a"
    this.audioRetry.load();
    this.audioRetry.play();
  }
}
