import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meal-preparation',
  templateUrl: './meal-preparation.component.html',
  styleUrls: ['./meal-preparation.component.scss'],
})
export class MealPreparationComponent implements OnInit, OnDestroy {
  private audioRetry: any;
  private saladInitGame: any;
  private appleSound: any;
  private grapeSound: any;
  private pearSound: any;
  appleCorrect = false;
  grapeCorrect = false;
  pearCorrect = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.route.params.subscribe((params) => {
      if (params['playSound'] == '1') {
        this.saladInitGame = new Audio();
        this.saladInitGame.src = '../../../assets/sound/sd-init.m4a';
        this.saladInitGame.load();
        this.saladInitGame.play();
      }
    });
  }

  playRetrySound(): void {
    this.audioRetry = new Audio();
    this.audioRetry.src = '../../../assets/sound/sd-3.m4a';
    this.audioRetry.load();
    this.audioRetry.play();
  }

  playAppleSound(): void {
    if (!this.appleCorrect && !this.pearCorrect && !this.grapeCorrect) {
      this.appleCorrect = true;
      this.appleSound = new Audio();
      this.appleSound.src = '../../../assets/sound/sd-1.m4a';
      this.appleSound.load();
      this.appleSound.play();
    } else {
      this.playRetrySound();
    }
  }

  playGrapeSound(): void {
    if (this.appleCorrect && !this.pearCorrect && !this.grapeCorrect) {
      this.grapeCorrect = true;
      this.grapeSound = new Audio();
      this.grapeSound.src = '../../../assets/sound/sd-2.m4a';
      this.grapeSound.load();
      this.grapeSound.play();
    } else this.playRetrySound();
  }

  playPearSound(): void {
    if (this.appleCorrect && this.grapeCorrect && !this.pearCorrect) {
      this.pearCorrect = true;
      this.pearSound = new Audio();
      this.pearSound.src = '../../../assets/sound/i5.m4a';
      this.pearSound.load();
      this.pearSound.play();

      setTimeout(() => {
        localStorage.setItem('puncte', '6');
        this.router.navigateByUrl('my-drawing');
      }, 8000);
    } else {
      this.playRetrySound();
    }
  }

  ngOnDestroy(): void {
    if (this.saladInitGame) {
      this.saladInitGame.pause();
      this.saladInitGame = null;
    }
    if (this.appleSound) {
      this.appleSound.pause();
      this.appleSound = null;
    }
    if (this.audioRetry) {
      this.audioRetry.pause();
      this.audioRetry = null;
    }
    if (this.pearSound) {
      this.pearSound.pause();
      this.pearSound = null;
    }
    if (this.grapeSound) {
      this.grapeSound.pause();
      this.grapeSound = null;
    }
  }
}
