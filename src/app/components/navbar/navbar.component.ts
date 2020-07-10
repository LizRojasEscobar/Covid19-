import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  filtro: any = "";
  constructor() {

  }

  ngOnInit(): void {
  }
  getFiltro() {
    return this.filtro;
  }
  onSubmit(value) {
    //this.filtro = this.filtrado.transform(value);
  }
}
