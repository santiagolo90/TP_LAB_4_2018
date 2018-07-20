import { Pipe, PipeTransform } from '@angular/core';
import {ClientesService} from '../servicios/clientes.service';

@Pipe({
  name: 'cliente'
})
export class ClientePipe implements PipeTransform {

  public misClientes: Array<any> = [];
  constructor(public clienteServ: ClientesService) {
  }
  transform(value: any, args?: any): any {
    this.misClientes =[]
    this.clienteServ.traerTodos().then(res => {
         res.forEach(element => {
          this.misClientes.push(element);
         });
    }).catch(err => {
      console.log(err);

    });
  }

  

}
