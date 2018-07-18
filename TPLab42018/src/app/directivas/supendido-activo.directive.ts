import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSupendidoActivo]'
})
export class SupendidoActivoDirective {
  @Input('appSupendidoActivo') tipo: string;

  constructor(public miElementRef:ElementRef) {
    
  }
  ngDoCheck() {
    this.cambiarColor("");
  }


  private cambiarColor(color: string) {
    if (this.tipo ==="suspendido") {
      //this.miElementRef.nativeElement.style.backgroundColor ='#CC0000';
      this.miElementRef.nativeElement.style.backgroundColor ='rgb(249, 107, 107)';
    }
    if (this.tipo ==="activo") {
      //this.miElementRef.nativeElement.style.backgroundColor ='#007E33';
      this.miElementRef.nativeElement.style.backgroundColor ='rgb(100, 144, 118)';
    }
  }

}
