import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarEventsComponent } from './star-events.component';

describe('StarEventsComponent', () => {
  let component: StarEventsComponent;
  let fixture: ComponentFixture<StarEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
