import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStarEventComponent } from './create-star-event.component';

describe('CreateStarEventComponent', () => {
  let component: CreateStarEventComponent;
  let fixture: ComponentFixture<CreateStarEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStarEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
