import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Router } from '@angular/router';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pelicula } from 'src/app/model/peliculas';


@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  @ViewChild('imagenP') imagenP: ElementRef;
  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('anio') anio: ElementRef;
  @ViewChild('sinopsis') sinopsis: ElementRef;
  @ViewChild('video') video: ElementRef;


  public peliculas = [];
  public actual;
  public url;
  public sesion;

  constructor(private peliculaService: PeliculasService, private _router: Router, private renderer: Renderer2, public pedido: PedidoService) {
    this.peliculas;
    this.actual = new Pelicula('', '', '', '', '', '', [], '', '', '', '', '', '');
    this.url = peliculaService.url;
    this.sesion = JSON.parse(localStorage.getItem('sesion'));
  }

  ngOnInit(): void {
    // console.log(this.sesion.affiliateCard);
  }
  ngAfterViewInit() {

    this.listarPeliculas();
    this.video.nativeElement.muted = "true";

  }
  pasarPelicula(pelicula) {

    this.imagenP.nativeElement.src = pelicula.image;
    this.nombre.nativeElement.innerText = pelicula.title;
    this.anio.nativeElement.innerText = pelicula.year;
    this.sinopsis.nativeElement.innerText = pelicula.synopsis;
    this.video.nativeElement.src = pelicula.trailer;
    document.getElementById("conteneInfo").setAttribute("class", "conteneInfo visible");
    document.getElementById("tituloCartelera").setAttribute("class", "oculto");
    localStorage.setItem('pelicula', pelicula.movie);
    console.log(pelicula.movie);
    
    // this.renderer.setStyle(this.fondo.'')    

    // this.renderer.setAttribute(this.imagenP,"src",pelicula.image);  // this.peliculaService.peliculaCarte = titulo;
    // alert(this.peliculaService.peliculaCarte);
    // this._router.navigate(['/boleteria']);
  }
  comprarB(x) {
    this.pedido.tituloP = x;
    this._router.navigate(['/boleteria']);
  }

  listarPeliculas() {
    this.peliculaService.listarPelis().subscribe(
      (response: any) => {
        for (let i = 0; i < response.movies.length; i++) {
          this.peliculaService.obtenerPelicula(response.movies[i]._id).subscribe(
            (res: any) => {
              res.movie.image = this.url + 'getMovieImage/' + res.movie.image;
              res.movie.trailer = this.url + 'getMovieTrailer/' + res.movie.trailer;
              this.peliculas.push(res.movie);
            }
          );

        }
      }
    );
  }
/*   buscarPelicula(find){


    let parametro = { busqueda: find };
    this.peliculaService.filtrarPeli(parametro).subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.peliculas = respuesta.movie;
      }
    );
  
  }  */

  reproducir(pelRepro) {
    this._router.navigate(['/reproductor']);
  }
}
