import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'admin'
})
export class AdminPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  str:string;
  constructor() {
  }
  
  transform(value: any, args?: any): any {
    // if (value =="admin") {
    //   let text = value;
    //   value.replace("<span style='color: red'>admin</span>");
    //   //return
    //   return value;
    // }
    if (value != null) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].tipo == "admin") {
          console.log("value: ", value);
          //alert(value[i].nombre);
          value[i].tipo = "administrador".toUpperCase(); 
        }
        if (value[i].tipo == "cliente" && value[i].estado == "suspendido" ) {
          console.log("value: ", value);
          //alert(value[i].nombre);
          value[i].estado = "suspendido".toUpperCase(); 
        }
      }
    }
    return value;

    
  }

}

// transform(value: any, args?: any): any {
//   if(value='M')
//   {
//     return "machito";
//   }else{
//     return "señorita";
//   }
// }
