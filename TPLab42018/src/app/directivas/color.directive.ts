import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {
@Input('appColor') tipo: string;

  constructor(public miElementRef:ElementRef) {
    console.log("tipo ",this.tipo );
    

    //this.cambiarColor("");
  }
  ngDoCheck() {
    this.cambiarColor("");
  }


  private cambiarColor(color: string) {
    if (this.tipo ==="ADMINISTRADOR") {
      this.miElementRef.nativeElement.style.color ="white";
      this.miElementRef.nativeElement.style.fontWeight ="bold";
      this.miElementRef.nativeElement.style.backgroundColor ='#007E33';//verde
    }
    if (this.tipo ==="SUSPENDIDO") {//ElementType.bold
      this.miElementRef.nativeElement.style.color ="white";
      this.miElementRef.nativeElement.style.fontWeight ="bold";
      this.miElementRef.nativeElement.style.backgroundColor ='#CC0000';//rojo
    }

    // else{
    //   this.miElementRef.nativeElement.style.backgroundColor ='green';
    // } 
  }

}
