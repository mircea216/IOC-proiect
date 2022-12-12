import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-dog-lion',
  templateUrl: './dog-lion.component.html',
  styleUrls: ['./dog-lion.component.scss']
})
export class DogLionComponent implements OnInit {

  ngOnInit(): void {
  }

  playCorrectSound() {
    let audio = new Audio();
    audio.src = "../../../assets/sound/correct.m4a"
    audio.load();
    audio.play();
  }
}
