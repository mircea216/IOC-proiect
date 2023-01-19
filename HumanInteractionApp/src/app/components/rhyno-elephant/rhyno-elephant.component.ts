import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-rhyno-elephant',
  templateUrl: './rhyno-elephant.component.html',
  styleUrls: ['./rhyno-elephant.component.scss'],
})
export class RhynoElephantComponent implements OnInit {
  private audioGame: any;
  private audioCorrect: any;
  private audioRetry: any;
  buttonDisable: boolean | undefined;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buttonDisable = true;
    this.route.params.subscribe((value) => {
      if (value['playSound'] === '1') {
        this.buttonDisable = false;
      }
    });
    this.playGameSound();
  }

  surprise(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes,
    });

    myConfetti();
    this.playCorrectSound();

    setTimeout(() => {
      localStorage.setItem('puncte', '3');
      this.router.navigateByUrl('my-drawing');
    }, 6500);
  }

  playGameSound(): void {
    this.route.params.subscribe((params) => {
      if (params['playSound'] == '1') {
        this.audioGame = new Audio();
        this.audioGame.src = '../../../assets/sound/a2.m4a';
        this.audioGame.load();
        this.audioGame.play();
      }
    });
  }

  playCorrectSound() {
    this.audioCorrect = new Audio();
    this.audioCorrect.src = '../../../assets/sound/i4.m4a';
    this.audioCorrect.load();
    this.audioCorrect.play();
  }

  playRetrySound() {
    this.audioRetry = new Audio();
    this.audioRetry.src = '../../../assets/sound/try.m4a';
    this.audioRetry.load();
    this.audioRetry.play();
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
}
