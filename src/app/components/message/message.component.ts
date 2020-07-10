import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  imagen: string = "";
  mensaje: string = "";
  titulo: string = "";
  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(parametro => {
      let value: number = parametro["value"];
      if (value == 1) {
        this.titulo = "Muchas gracias";
        this.imagen = "assets/img/exito.jpg";
      } else {
        this.titulo = "Ops...!!!";
        this.imagen = "assets/img/error.jpg";
      }
      this.mensaje = parametro["message"];
      console.log(parametro["value"]);
      console.log(parametro["message"]);
    });
  }

  onSubmit(value) {

  }
  retroceder() {
    this.router.navigate(['/triaje']);
  }
}
