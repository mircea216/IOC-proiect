import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  tech: string = '';
  source: string = '';
  others: string = '';

  constructor(private dictionary: DictionaryService) {}

  ngOnInit(): void {
    this.subscription = this.dictionary
      .getTranslations()
      .subscribe((data: any) => {
        this.tech = data['TECH_STACK'];
        this.source = data['SOURCE_CODE'];
        this.others = data['OTHER_GAMES'];
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
