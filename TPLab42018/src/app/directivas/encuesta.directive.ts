import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEncuesta]'
})
export class EncuestaDirective {
  @Input('appEncuesta') tipo: string;

  constructor(public miElementRef:ElementRef) {}

  ngDoCheck() {
    this.cambiarColor("");
  }

  private cambiarColor(color: string) {
    if (this.tipo ==="pendiente" ) {
      this.miElementRef.nativeElement.style.backgroundColor ='rgba(255, 152, 0, 0.7)';
      //this.miElementRef.nativeElement.style.backgroundColor ='rgba(255, 152, 0, 0.3)';
    }
    if (this.tipo ==="finalizada") {
      this.miElementRef.nativeElement.style.backgroundColor ='rgba(3, 169, 244, 0.7)';
      //this.miElementRef.nativeElement.style.backgroundColor ='rgba(3, 169, 244, 0.3)';
    }
  }

}
