import { Pipe, PipeTransform, ElementRef, HostListener } from '@angular/core';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  constructor(public miElementRef:ElementRef) {
  }
  transform(value: any, args?: any): any {
    
    for (let i = 0; i < value.length; i++) {
      if (value[i].tipo == "admin") {
        console.log("value: ", value);

        //this.miElementRef.nativeElement.style.backgroundColor ='red';
      }
    }
    return value;
  }

}
