import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrypickerComponent } from './countrypicker.component';

describe('CountrypickerComponent', () => {
  let component: CountrypickerComponent;
  let fixture: ComponentFixture<CountrypickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrypickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrypickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
