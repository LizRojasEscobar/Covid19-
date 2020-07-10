import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private _ActivatedRoute: ActivatedRoute, private router: Router, private servicio: LoginService, private formBuilder: FormBuilder) {

  }
  get f() { return this.registerForm.controls; }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    }, {
        //  validator: MustMatch('password', 'confirmPassword')
      });
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let _usuario = this.registerForm.controls.usuario.value;
    let _contrasena = this.registerForm.controls.contrasena.value;
    this.selUser(_usuario, _contrasena);
  }
  selUser(usuario: string, contrasena: string) {
    interface response {
      idusuario: number;
      nombres: string;
      apellidos: string;
    }
    this.servicio.selUser(usuario, contrasena).subscribe(data => {
      if (data[0].idusuario > 0) {
        let nombreUsuario = `${data[0].nombres} ${data[0].apellidos}`;
        this.router.navigate(['/infectado', data[0].idusuario, nombreUsuario]);
      } else {
        console.log("Usuario incorrecto");
      }
    });
  }
}
