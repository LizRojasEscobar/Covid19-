import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-response',
  templateUrl: './response.component.html'
})
export class ResponseComponent implements OnInit {
  imagen: string = "";
  mensaje: string = "";
  titulo: string = "";
  idusuario: number;
  nombreUsuario: number;
  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(parametro => {
      let value: number = parametro["value"];
      this.idusuario = parametro["idusuario"];
      this.nombreUsuario = parametro["nombreUsuario"];
      if (value == 1) {
        this.titulo = "Gracias";
        this.imagen = "assets/img/exito.jpg";
      } else {
        this.titulo = "Ops...!!!";
        this.imagen = "assets/img/error.jpg";
      }
      this.mensaje = parametro["message"];
    });
  }
  onSubmit(value) {

  }
  retroceder() {
    this.router.navigate(['/infectado', this.idusuario, this.nombreUsuario]);
  }
}
