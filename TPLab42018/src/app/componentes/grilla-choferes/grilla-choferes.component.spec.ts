import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaChoferesComponent } from './grilla-choferes.component';

describe('GrillaChoferesComponent', () => {
  let component: GrillaChoferesComponent;
  let fixture: ComponentFixture<GrillaChoferesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrillaChoferesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
