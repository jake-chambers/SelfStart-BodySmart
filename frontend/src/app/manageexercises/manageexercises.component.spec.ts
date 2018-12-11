import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageexercisesComponent } from './manageexercises.component';

describe('ManageexercisesComponent', () => {
  let component: ManageexercisesComponent;
  let fixture: ComponentFixture<ManageexercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageexercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageexercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
