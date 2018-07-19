import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiAlertComponent } from './mi-alert.component';

describe('MiAlertComponent', () => {
  let component: MiAlertComponent;
  let fixture: ComponentFixture<MiAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
