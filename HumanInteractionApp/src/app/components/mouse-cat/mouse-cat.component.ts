import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-mouse-cat',
  templateUrl: './mouse-cat.component.html',
  styleUrls: ['./mouse-cat.component.scss'],
})
export class MouseCatComponent implements OnInit {
  ngOnInit(): void {
    this.playGameSound();
  }

  playGameSound(): void {
    this.route.params.subscribe((params) => {
      if (params['playSound'] == '1') {
        let audio = new Audio();
        audio.src = '../../../assets/sound/mc-sound.m4a';
        audio.load();
        audio.play();
      }
    });
  }

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  surprise(): void {
    const canvas = this.renderer2.createElement('canvas');

    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    const myConfetti = confetti.create(canvas, {
      resize: true, // will fit all screen sizes,
    });

    myConfetti();
    this.playCorrectSound();

    setTimeout(() => {
      localStorage.setItem('puncte', '1');
      this.router.navigateByUrl('my-drawing');
    }, 8000);
  }

  playCorrectSound() {
    let audio = new Audio();
    audio.src = '../../../assets/sound/correct.m4a';
    audio.load();
    audio.play();
  }

  playRetrySound() {
    let audio = new Audio();
    audio.src = '../../../assets/sound/retry.m4a';
    audio.load();
    audio.play();
  }
}
