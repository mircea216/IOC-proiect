import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-preparation',
  templateUrl: './meal-preparation.component.html',
  styleUrls: ['./meal-preparation.component.scss']
})
export class MealPreparationComponent implements OnInit {
  private audioRetry: any;
  private saladInitGame: any;
  private appleSound: any;
  private grapeSound: any;
  private pearSound: any;

  constructor() { }

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.saladInitGame = new Audio();
    this.saladInitGame.src = "../../../assets/sound/sd-init.m4a"
    this.saladInitGame.load();
    this.saladInitGame.play();
  }

  playRetrySound(): void {
    this.audioRetry = new Audio();
    this.audioRetry.src = "../../../assets/sound/sd-3.m4a"
    this.audioRetry.load();
    this.audioRetry.play();
  }

  playAppleSound(): void {
    this.appleSound = new Audio();
    this.appleSound.src = "../../../assets/sound/sd-1.m4a"
    this.appleSound.load();
    this.appleSound.play();
  }

  playGrapeSound(): void {
    this.grapeSound = new Audio();
    this.grapeSound.src = "../../../assets/sound/sd-2.m4a"
    this.grapeSound.load();
    this.grapeSound.play();
  }

  playPearSound(): void {
    this.pearSound = new Audio();
    this.pearSound.src = "../../../assets/sound/sd-4.m4a"
    this.pearSound.load();
    this.pearSound.play();
  }
}
