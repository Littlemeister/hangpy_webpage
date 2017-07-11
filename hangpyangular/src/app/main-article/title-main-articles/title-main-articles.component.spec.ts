import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleMainArticlesComponent } from './title-main-articles.component';

describe('TitleMainArticlesComponent', () => {
  let component: TitleMainArticlesComponent;
  let fixture: ComponentFixture<TitleMainArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleMainArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleMainArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
