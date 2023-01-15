import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DictionaryService } from '../dictionary.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  @Input() time: string = '';
  @Input() moves: number = 0;
  @Input() fails: number = 0;
  timeText: string = '';
  movesText: string = '';
  failsText: string = '';

  constructor(private dictionary: DictionaryService) {}

  ngOnInit(): void {
    this.subscription = this.dictionary
      .getTranslations()
      .subscribe((data: any) => {
        this.timeText = 'Timp:';
        this.movesText = 'Mutări: ';
        this.failsText = data['FAILS'];
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
