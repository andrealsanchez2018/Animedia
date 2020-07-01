import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  public url;
  public peliculasEstreno = [];
  constructor(private peliculaService:PeliculasService) {
    this.url = peliculaService.url;
  }


  ngOnInit(): void {
    console.log(this.peliculasEstreno);
    this.buscarpelis();
  }

  buscarpelis()
  {
    this.peliculaService.listarPelis().subscribe(
      (response:any)=>{
        response.movies;
        console.log(response.movies);
        
        for(let i=0;i<response.movies.length;i++)
        {
          this.peliculaService.obtenerPelicula(response.movies[i]._id).subscribe(
            (respuesta:any)=>{
              respuesta.movie.image=this.url+"getMovieImage/"+respuesta.movie.image;
              this.peliculasEstreno.push(respuesta.movie);
            }
          );
        }
        
      }
    );
    console.log(this.peliculasEstreno);
  }
  
  
}
