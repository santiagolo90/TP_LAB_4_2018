import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiCaptchaComponent } from './mi-captcha.component';

describe('MiCaptchaComponent', () => {
  let component: MiCaptchaComponent;
  let fixture: ComponentFixture<MiCaptchaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiCaptchaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiCaptchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
