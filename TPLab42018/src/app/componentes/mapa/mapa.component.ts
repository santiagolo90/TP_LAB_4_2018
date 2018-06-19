import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  title: string = 'My first AGM project';
  lat: number = -34.816121;
  lng: number = -58.470209;
  zoom: number = 16;

  constructor() { }

  dobleClick(event) {
    let coords = event.coords;
    this.lat = coords.lat;
    this.lng = coords.lng;
  }

  ngOnInit() {
  }

}
