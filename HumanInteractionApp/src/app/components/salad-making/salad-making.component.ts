import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salad-making',
  templateUrl: './salad-making.component.html',
  styleUrls: ['./salad-making.component.scss']
})
export class SaladMakingComponent implements OnInit {
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
