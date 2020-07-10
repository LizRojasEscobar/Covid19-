import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConsultaService } from '../../services/consulta/consulta.service';
@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html'
})
export class ConsultasComponent implements OnInit {
  dataUser: any[];
  datos: string[];
  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, private servicio: ConsultaService) {

  }

  ngOnInit(): void {
  //  this.consultar();
  }

  onSubmit(value) {

  }
  cargar(fecha: string) {
    this.consultar(fecha);
  }
  consultar(fecha: string) {
    this.servicio.consultar(fecha).subscribe(data => {
      this.datos = data;
    });
  }
}
