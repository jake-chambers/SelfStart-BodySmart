import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserexercisesComponent } from './userexercises.component';

describe('UserexercisesComponent', () => {
  let component: UserexercisesComponent;
  let fixture: ComponentFixture<UserexercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserexercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserexercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
