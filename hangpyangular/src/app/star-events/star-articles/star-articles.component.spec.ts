import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarArticlesComponent } from './star-articles.component';

describe('StarArticlesComponent', () => {
  let component: StarArticlesComponent;
  let fixture: ComponentFixture<StarArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
