import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  puzzle: string = '';
  history: string = '';
  repository: string = '';
  about: string = '';
  contact: string = '';

  constructor(private dictionary: DictionaryService) {}

  ngOnInit(): void {
    this.subscription = this.dictionary
      .getTranslations()
      .subscribe((data: any) => {
        this.puzzle = data['HOME'];
        this.history = data['HISTORY'];
        this.repository = data['REPOSITORY'];
        this.about = data['ABOUT'];
        this.contact = data['CONTACT'];
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
