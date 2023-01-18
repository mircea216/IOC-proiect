import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-salad-making',
  templateUrl: './salad-making.component.html',
  styleUrls: ['./salad-making.component.scss'],
})
export class SaladMakingComponent implements OnInit {
  private audioRetry: any;
  private mealSound: any;
  private breakfastSound: any;
  private lunchSound: any;
  private dinnerSound: any;
  breakfastCorrect = false;
  lunchCorrect = false;
  dinnerCorrect = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.route.params.subscribe((params) => {
      if (params['playSound'] == '1') {
        this.mealSound = new Audio();
        this.mealSound.src = '../../../assets/sound/m1.m4a';
        this.mealSound.load();
        this.mealSound.play();
      }
    });
  }

  playRetrySound() {
    this.audioRetry = new Audio();
    this.audioRetry.src = '../../../assets/sound/sd-3.m4a';
    this.audioRetry.load();
    this.audioRetry.play();
  }

  playbreakfastSound(): void {
    if (!this.lunchCorrect && !this.breakfastCorrect && !this.dinnerCorrect) {
      this.breakfastCorrect = true;
      this.breakfastSound = new Audio();
      this.breakfastSound.src = '../../../assets/sound/m2.m4a';
      this.breakfastSound.load();
      this.breakfastSound.play();
    } else {
      this.playRetrySound();
    }
  }

  playlunchSound(): void {
    if (this.breakfastCorrect && !this.lunchCorrect && !this.dinnerCorrect) {
      this.lunchCorrect = true;
      this.lunchSound = new Audio();
      this.lunchSound.src = '../../../assets/sound/m3.m4a';
      this.lunchSound.load();
      this.lunchSound.play();
    } else this.playRetrySound();
  }

  playdinnerSound(): void {
    if (this.breakfastCorrect && this.lunchCorrect && !this.dinnerCorrect) {
      this.dinnerCorrect = true;
      this.dinnerSound = new Audio();
      this.dinnerSound.src = '../../../assets/sound/i6.m4a';
      this.dinnerSound.load();
      this.dinnerSound.play();

      setTimeout(() => {
        localStorage.setItem('puncte', '9');
        this.router.navigateByUrl('my-drawing');
      }, 7000);
    } else this.playRetrySound();
  }

  ngOnDestroy(): void {
    if (this.mealSound) {
      this.mealSound.pause();
      this.mealSound = null;
    }
    if (this.breakfastSound) {
      this.breakfastSound.pause();
      this.breakfastSound = null;
    }
    if (this.lunchSound) {
      this.lunchSound.pause();
      this.lunchSound = null;
    }
    if (this.dinnerSound) {
      this.dinnerSound.pause();
      this.dinnerSound = null;
    }
    if (this.audioRetry) {
      this.audioRetry.pause();
      this.audioRetry = null;
    }
  }
}
