import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-preparation',
  templateUrl: './meal-preparation.component.html',
  styleUrls: ['./meal-preparation.component.scss']
})
export class MealPreparationComponent implements OnInit {
  private audioRetry: any;

  constructor() { }

  ngOnInit(): void {
  }

  playRetrySound() {
    this.audioRetry = new Audio();
    this.audioRetry.src = "../../../assets/sound/retry-sound.m4a"
    this.audioRetry.load();
    this.audioRetry.play();
  }
}
