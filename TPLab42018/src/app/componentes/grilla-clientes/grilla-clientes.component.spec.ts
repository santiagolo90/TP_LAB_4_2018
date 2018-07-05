import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaClientesComponent } from './grilla-clientes.component';

describe('GrillaClientesComponent', () => {
  let component: GrillaClientesComponent;
  let fixture: ComponentFixture<GrillaClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
