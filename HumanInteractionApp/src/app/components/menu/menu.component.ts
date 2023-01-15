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
    this.points = localStorage.getItem('puncte');
  }

  ngOnDestroy(): void {
    localStorage.setItem('puncte', '0');
  }

  goToFood() {
    if (localStorage.getItem('puncte') == '3')
      this.router.navigateByUrl('healthy-food-1/1');
  }

  goToAnimals() {
    if (localStorage.getItem('puncte') == '0')
      this.router.navigateByUrl('round-1/1');
  }

  goToPuzzle() {
    if (localStorage.getItem('puncte') == '9')
      this.router.navigateByUrl('puzzle');
  }

  playSoundWithPoints() {}
}
