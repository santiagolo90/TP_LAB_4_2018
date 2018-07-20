import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio'
})
export class PrecioPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value > 0) {
      return '$ ' + value;
    }
    return 'sin precio';
  }

}
