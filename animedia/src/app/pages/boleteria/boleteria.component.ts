import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-boleteria',
  templateUrl: './boleteria.component.html',
  styleUrls: ['./boleteria.component.css']
})
export class BoleteriaComponent implements OnInit {
  // variables
  public puestos = 0;
  public puestosE = 0;
  public boleteria;
  public peliculaC;
  public sillasS="puestos: ";

  columnas = [1, 2, 3, 4,];
  columnas2 = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  columnas3 = [15, 16, 17, 18];
  columnas4 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  sillas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  sillas2 = ['I', 'J', 'K']

  constructor(public pedido: PedidoService, private _router: Router) {

  }
  ngOnInit(): void {
    this.peliculaC=this.pedido.tituloP;
  }
  /*  ngDoCheck(){
     
   } */

  status: boolean = false;
  puestosSeleccionados(x) {
    if (this.puestos < this.puestosE) {
      this.puestos++;
      document.getElementById(x).setAttribute("class", "btn btn-success sillas");
      this.sillasS=` ${this.sillasS} ${x} `;
    } else {
      alert(`Ya escogiste tus puestos, puedes dirigirte a pagos ${this.puestosE}`);
    }
  }

  pagos() {
     this.boleteria = {
      "nombre": "Boleta",
      "imagen":"src/assets/boletas.jpg",
      "descripcion": `${this.puestosE} boletas para la película ${this.peliculaC} \n  ${this.sillasS} `,
      "valor": 12000,
      "cantidad": this.puestos
    };
    if (this.boleteria.cantidad != this.puestos) {
      alert("Por favor escoje tus sillas");
    } else {
      alert(this.pedido.producto);
      this._router.navigate(['/pagos']);
      this.pedido.producto.push(this.boleteria);
      console.log(this.pedido);

    }
  }
}
