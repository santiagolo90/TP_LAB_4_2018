import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaViajesComponent } from './grilla-viajes.component';

describe('GrillaViajesComponent', () => {
  let component: GrillaViajesComponent;
  let fixture: ComponentFixture<GrillaViajesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaViajesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
