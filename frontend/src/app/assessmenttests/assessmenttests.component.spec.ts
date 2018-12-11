import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmenttestsComponent } from './assessmenttests.component';

describe('AssessmenttestsComponent', () => {
  let component: AssessmenttestsComponent;
  let fixture: ComponentFixture<AssessmenttestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmenttestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmenttestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
