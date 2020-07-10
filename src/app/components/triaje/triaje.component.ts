import { Component, OnInit } from '@angular/core';
import { TriajeService } from '../../services/triaje/triaje.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-triaje',
  templateUrl: './triaje.component.html'
})

export class TriajeComponent implements OnInit {
  @ViewChild('pantalla') modal: any;
  _Gen: string = "";
  listaGenero: any = [];
  registerForm: FormGroup;
  submitted = false;
  chtos = false;
  chfiebre = false;
  chescalofrios = false;
  chfluidos = false;
  chdolorcabeza = false;
  chdolorespalda = false;
  chdificultad = false;
  chperdida = false;
  _genero_: string[] = ['Seleccione abajo', 'Hombre', 'Mujer'];
  c: string = "";
  mostrar: boolean = false;
  constructor(private servicio: TriajeService, private router: Router, private formBuilder: FormBuilder) {
  }
  radioChangeHandle(event: any) {
    this.c = event.target.value.substring(0, 1);
    if (this.c.toUpperCase() == 'S' && this.c.toUpperCase() == '')
      this.mostrar = true;
    else
      this.mostrar = false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  tos(e) {
    this.chtos = e.target.checked;
  }
  fiebre(e) {
    this.chfiebre = e.target.checked;
  }
  escalofrios(e) {
    this.chescalofrios = e.target.checked;
  }
  fluidos(e) {
    this.chfluidos = e.target.checked;
  }
  dolorcabeza(e) {
    this.chdolorcabeza = e.target.checked;
  }
  dolorespalda(e) {
    this.chdolorespalda = e.target.checked;
  }
  dificultad(e) {
    this.chdificultad = e.target.checked;
  }
  perdidago(e) {
    this.chperdida = e.target.checked;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      edad: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]]
    }, {
        //  validator: MustMatch('password', 'confirmPassword')
      });
    this.listaGenero = [
      { id: 0, genero: "-- Seleccione --" },
      { id: 1, genero: "Hombre" },
      { id: 2, genero: "Mujer" }
    ];
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.addTriaje(
      this.registerForm.controls.departamento.value,
      this.registerForm.controls.provincia.value,
      this.registerForm.controls.distrito.value,
      this.registerForm.controls.edad.value,
      this.chtos,
      this.chfiebre,
      this.chescalofrios,
      this.chfluidos,
      this.chdolorcabeza,
      this.chdolorespalda,
      this.chdificultad,
      this.chperdida,
      this._Gen
    );
  }

  onGeneroSelected(value: any) {
    if (value == 1)
      this._Gen = "M";
    else if (value == 2)
      this._Gen = "F";
  }
  addTriaje(departamento: string, provincia: string, distrito: string, edad: number, chktos: boolean, chfiebre: boolean, chfescalofrios: boolean, chfluidosnasales: boolean, chdolorcabeza: boolean, chdolorespalda: boolean, chdificultadrespirar: boolean, chgustoolfato: boolean, genero: string) {
    if (this.c.toUpperCase() == "S" || this.c.toUpperCase() == "") {
      this.mostrar = true;
    } else {
      let _chktos: number = chktos ? 1 : 0;
      let _chfiebre: number = chfiebre ? 1 : 0;
      let _chfescalofrios: number = chfescalofrios ? 1 : 0;
      let _chfluidosnasales: number = chfluidosnasales ? 1 : 0;
      let _chdolorcabeza: number = chdolorcabeza ? 1 : 0;
      let _chdolorespalda: number = chdolorespalda ? 1 : 0;
      let _chdificultadrespirar: number = chdificultadrespirar ? 1 : 0;
      let _chgustoolfato: number = chgustoolfato ? 1 : 0;

      let bodyJson: any = {
        "departamento": departamento,
        "provincia": provincia,
        "distrito": distrito,
        "tos": _chktos,
        "fiebre": _chfiebre,
        "escalofrios": _chfescalofrios,
        "fluidosNasales": _chfluidosnasales,
        "dolorCabeza": _chdolorcabeza,
        "dolorEspalda": _chdolorespalda,
        "dificultadRespirar": _chdificultadrespirar,
        "perdidaGustoOlfato": _chgustoolfato,
        "edad": edad,
        "sexo": genero
      };
      interface response {
        value: number;
        message: string;
      }

      this.servicio.addTriaje(bodyJson).subscribe(data => {
        let obj: response = JSON.parse(JSON.stringify(data));
        this.router.navigate(['/message', obj.value, obj.message]);
      });
      this.mostrar = false;
    }
  }
}
