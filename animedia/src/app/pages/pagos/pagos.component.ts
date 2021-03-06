import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  public opcionSeleccionada;
  public listaProductos= this.pedido.producto;
  public descuento= 0;
  public total=0;
  public sesion=  JSON.parse(localStorage.getItem('sesion'));

 public datos={
   "nombre": "",
   "direccion":"",
   "celular":"",
   "observaciones":"",
   "banco":"",
   "titular":"",
   "tipoI":"",
   "identificacion":"",
   "correo":""

 }


  constructor(public pedido : PedidoService) { }

  ngOnInit(): void {
    this.calculoSubtotal();
    
    this.pedido;

    if (this.sesion.affiliateCard == 'platino'){
      this.descuento=50;
    }else if(this.sesion.affiliateCard == 'gold'){
      this.descuento=25;
    }
    
  }
  ngDoCheck(){
    this.calculoSubtotal();
    console.log(this.pedido.producto);
  }
  
  calculoSubtotal(){
    let totalPre=0;
    for(var i=0;i<this.listaProductos.length;i++){
    console.log(this.listaProductos.length);
      if(this.listaProductos[i].cantidad == 0)
      {
        if(this.listaProductos.length == 0){
          this.listaProductos =[];
        }else{
        this.listaProductos[i]='';
        this.listaProductos.sort();
        this.listaProductos.shift();
        }
      }else{
        let sub=(this.listaProductos[i].valor*this.listaProductos[i].cantidad*(1-this.descuento/100));
       /* this.listaProductos[i].subtotal=sub */
       this.listaProductos[i]["subtotal"]= sub;
       totalPre+=sub;
       this.total=totalPre;
       console.log(totalPre);
      }
      
     
    }
  }
// calculo total

/* calculoTotal(){
  this.listaProductos.subtotal.forEach(element => {
    
  });
} */


  //muestra pagos por debito o credito
  mostrar(){
    var id=this.opcionSeleccionada;
    if(id==1){
      document.getElementById("credito").setAttribute("class","visible");
    }else{
      document.getElementById("credito").setAttribute("class","oculto");
    }
    if(id==2){
      document.getElementById('pse').setAttribute("class","visible");
    }else{
      document.getElementById("pse").setAttribute("class","oculto");
    }
  }
  //procesa el envio de datos
  envioDatos(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: "Compra exitosa !!. Tu pedido se encuentra en camino",
      showConfirmButton: false,
      timer: 2000
    })
    //alert(`Compra exitosa !!. Tu pedido se encuentra en camino`);
  }
}
