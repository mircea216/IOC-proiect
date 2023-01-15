import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  private subscription: Subscription | undefined;
  languages: any;

  constructor(private dictionary: DictionaryService) {}

  ngOnInit(): void {
    this.subscription = this.dictionary
      .getLanguages()
      .subscribe((languages: any) => {
        this.languages = languages;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  setLanguage(lang: any): void {
    this.dictionary.setLanguage(lang);
  }
}
