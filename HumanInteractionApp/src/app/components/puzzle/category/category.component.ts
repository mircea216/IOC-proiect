import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { DictionaryService } from '../dictionary.service';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  private subscriptionTranslations: Subscription | undefined;
  categories: any;
  categoryId: number = 0;
  categoryText: string = '';
  @Output() categoryChange = new EventEmitter();

  constructor(
    private dictionary: DictionaryService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories = [
      {
        id: 0,
        name: 'Povesti cu lipici pentru cei mici',
        folder: 'povesti',
      },
    ];

    this.categoryId = 0;
    this.categoryText = 'Povesti cu lipici pentru cei mici';
    this.emitCategory();

    // this.subscription = this.categoryService
    //   .getCategories()
    //   .subscribe((dataCategories: any) => {
    //     this.subscriptionTranslations = this.dictionary
    //       .getTranslations()
    //       .subscribe((dataTranslations: any) => {
    //         let categories = [];
    //         for (let i = 0; i < dataCategories.length; i++) {
    //           categories.push({
    //             id: dataCategories[i].id,
    //             name: dataTranslations[dataCategories[i].name],
    //             folder: dataCategories[i].folder,
    //           });
    //         }
    //         this.categories = categories;
    //         this.categoryText = dataTranslations['CATEGORY'];
    //         this.categoryId =
    //           this.categories[
    //             Math.floor(Math.random() * this.categories.length)
    //           ].id;
    //         this.emitCategory();
    //       });
    //   });
  }

  ngOnDestroy(): void {
    this.subscriptionTranslations?.unsubscribe();
    this.subscription?.unsubscribe();
  }

  emitCategory() {
    this.categoryChange.emit({
      categoryId: this.categoryId,
      folder: this.categories[this.categoryId].folder,
    });
  }

  onChange(event: any): void {
    this.categoryId = event.target.value;
    this.emitCategory();
  }
}
