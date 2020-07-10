import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  filtro: any = "";
  constructor() {

  }

  ngOnInit(): void {
  }
  getFiltro() {
    return this.filtro;
  }
  onSubmit(value) {
  }
}
