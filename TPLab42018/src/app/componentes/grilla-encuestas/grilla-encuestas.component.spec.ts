import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaEncuestasComponent } from './grilla-encuestas.component';

describe('GrillaEncuestasComponent', () => {
  let component: GrillaEncuestasComponent;
  let fixture: ComponentFixture<GrillaEncuestasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaEncuestasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaEncuestasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
