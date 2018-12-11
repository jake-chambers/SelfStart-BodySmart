import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseprofileComponent } from './exerciseprofile.component';

describe('ExerciseprofileComponent', () => {
  let component: ExerciseprofileComponent;
  let fixture: ComponentFixture<ExerciseprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
