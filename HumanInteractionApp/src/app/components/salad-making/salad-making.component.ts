import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salad-making',
  templateUrl: './salad-making.component.html',
  styleUrls: ['./salad-making.component.scss']
})
export class SaladMakingComponent implements OnInit {
  private audioRetry: any;
  private mealSound: any;
  private breakfastSound: any;
  private lunchSound: any;
  private dinnerSound: any;

  constructor() { }

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.mealSound = new Audio();
    this.mealSound.src = "../../../assets/sound/m1.m4a"
    this.mealSound.load();
    this.mealSound.play();
  }


  playRetrySound() {
    this.audioRetry = new Audio();
    this.audioRetry.src = "../../../assets/sound/sd-4.m4a"
    this.audioRetry.load();
    this.audioRetry.play();
  }

  playbreakfastSound(): void {
    this.breakfastSound = new Audio();
    this.breakfastSound.src = "../../../assets/sound/m2.m4a"
    this.breakfastSound.load();
    this.breakfastSound.play();
  }

  playlunchSound(): void {
    this.lunchSound = new Audio();
    this.lunchSound.src = "../../../assets/sound/m3.m4a"
    this.lunchSound.load();
    this.lunchSound.play();
  }

  playdinnerSound(): void {
    this.dinnerSound = new Audio();
    this.dinnerSound.src = "../../../assets/sound/m4.m4a"
    this.dinnerSound.load();
    this.dinnerSound.play();
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
