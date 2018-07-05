import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaVehiculosComponent } from './grilla-vehiculos.component';

describe('GrillaVehiculosComponent', () => {
  let component: GrillaVehiculosComponent;
  let fixture: ComponentFixture<GrillaVehiculosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaVehiculosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaVehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
