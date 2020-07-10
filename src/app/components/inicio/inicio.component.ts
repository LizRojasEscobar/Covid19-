import { Component, OnInit } from '@angular/core';
import { InicioService } from '../../services/inicio/inicio.service';
declare var HexgridHeatmap: any;
declare var mapboxgl: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  filtro: any = "";
  HexgridHeatmap: any;
  mapboxgl: any;
  contagiados: any;
  constructor(private servicio: InicioService) {

  }

  ngOnInit(): void {

    interface response {
      lat: string;
      lon: string;
    }
    this.servicio.getCoordenadas().subscribe(data => {
      this.contagiados = data;
      this.cargarMapa(this.contagiados );
    });
  }

  onSubmit(value) {

  }
  cargarMapa(contagiados:any) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93Y3JvdyIsImEiOiJja2MyZnUzZHUwMTM0MnhxbGF5ZnFrY2ViIn0.GLfNIJwUOpwEpBpDB3jY8w';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 11,
      center: [-76.962700, -12.065910]
    });

    map.on("load", function() {
      var heatmap = new HexgridHeatmap(map, "hexgrid-heatmap", "waterway-label");

      heatmap.setIntensity(15);
      heatmap.setSpread(0.3);
      heatmap.setData(contagiados);
      heatmap.update();
      heatmap.setColorStops([
        [0, "rgba(0,185,243,0)"],
        [60, "rgba(0,185,243,0.2)"],
        [600, "rgba(255,223,0,0.45)"],
        [1200, "rgba(255,105,0,0.5)"],
        [1500, "rgba(255,55,0,0.6)"]
      ])
    });
  }
}
