import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMainArticleComponent } from './search-main-article.component';

describe('SearchMainArticleComponent', () => {
  let component: SearchMainArticleComponent;
  let fixture: ComponentFixture<SearchMainArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMainArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMainArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
