import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mouse-cat',
  templateUrl: './mouse-cat.component.html',
  styleUrls: ['./mouse-cat.component.scss']
})
export class MouseCatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    let audio = new Audio();
    audio.src = "../../../assets/sound/mc-sound.m4a"
    audio.load();
    audio.play();
  }

  playCorrectSound() {
    let audio = new Audio();
    audio.src = "../../../assets/sound/correct.m4a"
    audio.load();
    audio.play();
  }

  playRetrySound() {
    let audio = new Audio();
    audio.src = "../../../assets/sound/retry.m4a"
    audio.load();
    audio.play();
  }

}
