import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  title: string = 'Ver ruta';
  lat: any = -34.816121;
  lng: any = -58.470209;
  zoom: number = 16;
  destino : any;
  origen : any;

  constructor(
    public dialogRef: MatDialogRef<MapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.showRuta) {
        console.log("Data: ",data);
        
        this.origen = data.origen;
        this.lat = data.origen.lat;
        this.lng = data.origen.lng;
        this.destino = data.destino;
      }
    }

  dobleClick(event) {
    let coords = event.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
  }

  ngOnInit() {
  }

}
