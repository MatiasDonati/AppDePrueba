import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  public nombre:string;
  public apellido:string;
  public mostrar:boolean;
  public direccion:string;

  constructor(public navCtrl: NavController) {
    this.nombre = "";
    this.apellido = "";
    this.mostrar = false;
    this.direccion = "";
  }

  MostrarDatos(nombre:any, apellido:any){
    this.nombre = nombre;
    this.apellido = apellido;
    this.mostrar = true;
  }
}
