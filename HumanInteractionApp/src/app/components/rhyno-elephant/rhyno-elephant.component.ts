import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-rhyno-elephant',
  templateUrl: './rhyno-elephant.component.html',
  styleUrls: ['./rhyno-elephant.component.scss']
})
export class RhynoElephantComponent implements OnInit {

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  surprise(): void {

    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true // will fit all screen sizes,
    });

    myConfetti();
    this.playCorrectSound();
  }

  playCorrectSound() {
    let audio = new Audio();
    audio.src = "../../../assets/sound/correct.m4a"
    audio.load();
    audio.play();
  }
}
