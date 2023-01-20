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
  buttonDisable: boolean | undefined;
  buttonReplySoundDisable: boolean | undefined = true;
  displayer: boolean | undefined;
  win = false;

  secondTour = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

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
    if (!this.appleCorrect && !this.pearCorrect && !this.grapeCorrect) {
      this.playGameSound();
      setTimeout(() => {
        this.buttonReplySoundDisable = true;
      }, 6500);
    }
    else if (this.appleCorrect && !this.pearCorrect && !this.grapeCorrect) {
      this.appleCorrect = true;
      this.appleSound = new Audio();
      this.appleSound.src = '../../../assets/sound/sd-1.m4a';
      this.appleSound.load();
      this.appleSound.play();
      setTimeout(() => {
        this.buttonReplySoundDisable = true;
      }, 4500);
    }
    else if (this.appleCorrect && this.grapeCorrect && !this.pearCorrect) {
      this.grapeCorrect = true;
      this.grapeSound = new Audio();
      this.grapeSound.src = '../../../assets/sound/sd-2.m4a';
      this.grapeSound.load();
      this.grapeSound.play();
      setTimeout(() => {
        this.buttonReplySoundDisable = true;
      }, 4500);
    }
  }

  playGameSound(): void {
    if (!this.win && !this.secondTour) {
      if (this.saladInitGame) this.saladInitGame.pause();
      if (this.appleSound) this.appleSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.pearSound) this.pearSound.pause();
      if (this.grapeSound) this.grapeSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      this.route.params.subscribe((params) => {
        if (params['playSound'] == '1') {
          this.saladInitGame = new Audio();
          this.saladInitGame.src = '../../../assets/sound/sd-init.m4a';
          this.saladInitGame.load();
          this.saladInitGame.play();
        } else {
          this.secondTour = false;
        }
      });
    }
  }

  playRetrySound(): void {
    if (!this.win && !this.secondTour) {
      if (this.saladInitGame) this.saladInitGame.pause();
      if (this.appleSound) this.appleSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.pearSound) this.pearSound.pause();
      if (this.grapeSound) this.grapeSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      this.audioRetry = new Audio();
      this.audioRetry.src = '../../../assets/sound/sd-3.m4a';
      this.audioRetry.load();
      this.audioRetry.play();
    }
  }

  playAppleSound(): void {
    if (!this.win && !this.secondTour) {
      if (this.saladInitGame) this.saladInitGame.pause();
      if (this.appleSound) this.appleSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.pearSound) this.pearSound.pause();
      if (this.grapeSound) this.grapeSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
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
  }

  playGrapeSound(): void {
    if (!this.win && !this.secondTour) {
      if (this.saladInitGame) this.saladInitGame.pause();
      if (this.appleSound) this.appleSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.pearSound) this.pearSound.pause();
      if (this.grapeSound) this.grapeSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.appleCorrect && !this.pearCorrect && !this.grapeCorrect) {
        this.grapeCorrect = true;
        this.grapeSound = new Audio();
        this.grapeSound.src = '../../../assets/sound/sd-2.m4a';
        this.grapeSound.load();
        this.grapeSound.play();
      } else this.playRetrySound();
    }
  }

  playPearSound(): void {
    if (!this.win && !this.secondTour) {
      if (this.saladInitGame) this.saladInitGame.pause();
      if (this.appleSound) this.appleSound.pause();
      if (this.audioRetry) this.audioRetry.pause();
      if (this.pearSound) this.pearSound.pause();
      if (this.grapeSound) this.grapeSound.pause();
      if (this.audioRetry) this.audioRetry.pause();

      if (this.appleCorrect && this.grapeCorrect && !this.pearCorrect) {
        this.pearCorrect = true;
        this.pearSound = new Audio();
        this.pearSound.src = '../../../assets/sound/i5.m4a';
        this.pearSound.load();
        this.pearSound.play();
        this.win = true;

        setTimeout(() => {
          localStorage.setItem('puncte', '6');
          this.router.navigateByUrl('my-drawing');
        }, 8000);
      } else {
        this.playRetrySound();
      }
    }
  }

  backToMenu(): void {
    this.router.navigateByUrl("");
    localStorage.setItem("puncte", "0");
  }

  setDisplayer(): void {
    this.displayer = true;
  }

  negateDisplayer(): void {
    this.displayer = false;
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
