import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';
@Component({
  selector: 'app-dog-lion',
  templateUrl: './dog-lion.component.html',
  styleUrls: ['./dog-lion.component.scss']
})
export class DogLionComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  surprise(): void {

    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes,
    });

    myConfetti();
  }
  playCorrectSound() {
    let audio = new Audio();
    audio.src = "../../../assets/sound/correct.m4a"
    audio.load();
    audio.play();
  }
}
