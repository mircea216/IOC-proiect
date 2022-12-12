import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rhyno-elephant',
  templateUrl: './rhyno-elephant.component.html',
  styleUrls: ['./rhyno-elephant.component.scss']
})
export class RhynoElephantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  playCorrectSound() {
    let audio = new Audio();
    audio.src = "../../../assets/sound/correct.m4a"
    audio.load();
    audio.play();
  }


}
