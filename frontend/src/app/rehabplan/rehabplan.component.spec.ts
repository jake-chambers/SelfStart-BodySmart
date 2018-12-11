import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RehabplanComponent } from './rehabplan.component';

describe('RehabplanComponent', () => {
  let component: RehabplanComponent;
  let fixture: ComponentFixture<RehabplanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RehabplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RehabplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
