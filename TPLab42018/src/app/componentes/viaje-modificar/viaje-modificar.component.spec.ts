import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViajeModificarComponent } from './viaje-modificar.component';

describe('ViajeModificarComponent', () => {
  let component: ViajeModificarComponent;
  let fixture: ComponentFixture<ViajeModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
