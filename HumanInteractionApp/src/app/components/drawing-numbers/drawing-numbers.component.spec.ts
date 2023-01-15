import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingNumbersComponent } from './drawing-numbers.component';

describe('DrawingNumbersComponent', () => {
  let component: DrawingNumbersComponent;
  let fixture: ComponentFixture<DrawingNumbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrawingNumbersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawingNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
