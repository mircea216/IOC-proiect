import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  points: string | null = '0';
  pointsSound: any;
  introSound: any;
  buttonReplySoundDisable: boolean | undefined = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('puncte')) {
      this.points = localStorage.getItem('puncte');
    } else {
      localStorage.setItem('puncte', '0');
    }
    if(localStorage.getItem('puncte') != '0'){
      this.buttonReplySoundDisable=false;
    }
  }
  replySound():void{
    this.buttonReplySoundDisable=false;
    this.playIntroSound();
    setTimeout(() => {
      this.buttonReplySoundDisable=true;
    }, 8500);
  
  }
  ngOnDestroy(): void {
    localStorage.setItem('puncte', '0');
  }

  playIntroSound() {
    if (this.introSound) this.introSound.pause();
    if (this.pointsSound) this.pointsSound.pause();
    this.introSound = new Audio();
    if (this.pointsSound) this.pointsSound.pause();

    this.introSound.src = '../../../assets/sound/menu/BineAiVenit.mp4';
    this.introSound.load();
    this.introSound.play();
  }

  goToFood() {
    if (this.introSound) this.introSound.pause();
    if (
      localStorage.getItem('puncte') == '3' ||
      localStorage.getItem('puncte') == '4' ||
      localStorage.getItem('puncte') == '5' ||
      localStorage.getItem('puncte') == '6' ||
      localStorage.getItem('puncte') == '7' ||
      localStorage.getItem('puncte') == '8'
    )
      this.router.navigateByUrl('healthy-food-1/1');
  }

  goToAnimals() {
    if (this.introSound) this.introSound.pause();
    if (this.pointsSound) this.pointsSound.pause();

    if (
      localStorage.getItem('puncte') == '0' ||
      localStorage.getItem('puncte') == '1' ||
      localStorage.getItem('puncte') == '2'
    )
      this.router.navigateByUrl('round-1/1');
  }

  goToPuzzle() {
    if (this.introSound) this.introSound.pause();
    if (this.pointsSound) this.pointsSound.pause();

    if (localStorage.getItem('puncte') == '9')
      this.router.navigateByUrl('puzzle');
  }

  playSoundWithPoints() {
    if (this.introSound) this.introSound.pause();
    if (this.pointsSound) this.pointsSound.pause();
    this.pointsSound = new Audio();
    this.pointsSound.src =
      '../../../assets/sound/menu/' +
      localStorage.getItem('puncte') +
      'puncte.mp4';
    this.pointsSound.load();
    this.pointsSound.play();
  }
}
