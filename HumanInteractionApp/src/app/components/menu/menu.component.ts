import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToFood() {
    this.router.navigateByUrl('healthy-food-1');
  }

  goToAnimals() {
    this.router.navigateByUrl('round-1/1');
  }

  goToPuzzle() {
    this.router.navigateByUrl('puzzle');
  }
}
