import { Directive, ElementRef, HostListener, Input } from '@angular/core';


@Directive({
  selector: '[appViaje]'
})
export class ViajeDirective {
  @Input('appViaje') tipo: string;

  constructor(public miElementRef:ElementRef) {}

  ngDoCheck() {
    this.cambiarColor("");
  }


  private cambiarColor(color: string) {
    if (this.tipo ==="pendiente" ) {
      this.miElementRef.nativeElement.style.backgroundColor ='rgba(255, 152, 0, 0.7)';
      //this.miElementRef.nativeElement.style.backgroundColor ='rgba(255, 152, 0, 0.3)';
    }
    if (this.tipo ==="finalizado") {
      this.miElementRef.nativeElement.style.backgroundColor ='rgba(76, 175, 80, 0.7)';
      //this.miElementRef.nativeElement.style.backgroundColor ='rgba(76, 175, 80, 0.3)';
    }
    if (this.tipo ==="en curso") {
      this.miElementRef.nativeElement.style.backgroundColor ='rgba(3, 169, 244, 0.7)';
      //this.miElementRef.nativeElement.style.backgroundColor ='rgba(3, 169, 244, 0.3)';
    }
    if (this.tipo ==="cancelado") {
      this.miElementRef.nativeElement.style.backgroundColor ='rgba(244, 67, 54, 0.7)';
      //this.miElementRef.nativeElement.style.backgroundColor ='rgba(3, 169, 244, 0.3)';
    }
  }

}
