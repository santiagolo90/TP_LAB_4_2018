import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chofer'
})
export class ChoferPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value == null) {
      value = 'sin chofer';
    }
    return value;
  }

}
