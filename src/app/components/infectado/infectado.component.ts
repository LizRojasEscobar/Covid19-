import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { InfectadoService } from '../../services/infectado/infectado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-infectado',
  templateUrl: './infectado.component.html'
})
export class InfectadoComponent implements OnInit {
  listaGenero: any = [];
  dataUser: any[];
  _Gen: string = "";
  _Usuario: string;
  registerForm: FormGroup;
  submitted = false;
  nombreUsuario: string;
  idusuario: number;
  _genero_: string[] = ['Seleccione abajo', 'Hombre', 'Mujer'];
  c: string = "";
  mostrar: boolean = false;
  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, private servicio: InfectadoService, private formBuilder: FormBuilder) {
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let _departamento = this.registerForm.controls.departamento.value;
    let _provincia = this.registerForm.controls.provincia.value;
    let _distrito = this.registerForm.controls.distrito.value;
    let _latitud = this.registerForm.controls.latitud.value;
    let _edad = this.registerForm.controls.edad.value;
    let _longitud = this.registerForm.controls.longitud.value;
    let _metodo = this.registerForm.controls.metodo.value;
    this.agregarInfectado(_departamento, _provincia, _distrito, _latitud, _edad, _longitud, _metodo);
  }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(parametro => {
      this.idusuario = parametro["idusuario"];
      this.nombreUsuario = parametro["nombreUsuario"];
    });
    this.registerForm = this.formBuilder.group({
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
      metodo: ['', Validators.required],
      edad: ['', Validators.required]
    }, {
        //  validator: MustMatch('password', 'confirmPassword')
      });
  }
  radioChangeHandle(event: any) {
    this.c = event.target.value.substring(0, 1);
    if (this.c.toUpperCase() == 'S' && this.c.toUpperCase() == '')
      this.mostrar = true;
    else
      this.mostrar = false;
  }
  agregarInfectado(_departamento: string, _provincia: string, _distrito: string, _latitud: string, _edad: number, _longitud: string, _metodo: string) {
    if (this.c.toUpperCase() == "S" || this.c.toUpperCase() == "") {
      this.mostrar = true;
    } else {
      let jsonBody: any = {
        "departamento": _departamento,
        "provincia": _provincia,
        "distrito": _distrito,
        "metododx": _metodo,
        "edad": _edad,
        "latitud": _latitud,
        "longitud": _longitud
      };
      interface response {
        value: number;
        message: string;
      }
      this.servicio.agregarInfectado(jsonBody).subscribe(data => {
        let obj: response = JSON.parse(JSON.stringify(data));
        this.router.navigate(['/response', obj.value, obj.message, this.idusuario.toString(), this.nombreUsuario]);
      });
      this.mostrar = false;
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onGeneroSelected(value: any) {
    if (value == 1)
      this._Gen = "M";
    else if (value == 2)
      this._Gen = "F";
  }

  get f() { return this.registerForm.controls; }
}
