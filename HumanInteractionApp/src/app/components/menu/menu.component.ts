import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit, OnDestroy {
  points: string | null = '0';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('puncte')) {
      this.points = localStorage.getItem('puncte');
    } else {
      localStorage.setItem('puncte', '0');
    }
  }

  ngOnDestroy(): void {
    localStorage.setItem('puncte', '0');
  }

  goToFood() {
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
    if (
      localStorage.getItem('puncte') == '0' ||
      localStorage.getItem('puncte') == '1' ||
      localStorage.getItem('puncte') == '2'
    )
      this.router.navigateByUrl('round-1/1');
  }

  goToPuzzle() {
    if (localStorage.getItem('puncte') == '9')
      this.router.navigateByUrl('puzzle');
  }

  playSoundWithPoints() {}
}
