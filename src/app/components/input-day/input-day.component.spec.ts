import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDayComponent } from './input-day.component';

describe('InputDayComponent', () => {
  let component: InputDayComponent;
  let fixture: ComponentFixture<InputDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
