import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-mouse-cat',
  templateUrl: './mouse-cat.component.html',
  styleUrls: ['./mouse-cat.component.scss']
})
export class MouseCatComponent implements OnInit {


  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    let audio = new Audio();
    audio.src = "../../../assets/sound/mc-sound.m4a"
    audio.load();
    audio.play();
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
    this.playCorrectSound();
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
