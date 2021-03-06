import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { UsuarioService } from './services/usuario.service';
import{PeliculasService} from './services/peliculas.service';
import {FormsModule}from '@angular/forms';
import {PedidoService} from './services/pedido.service';

import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    PagesModule,
    HttpClientModule,
    FormsModule
    ],
  providers: [
    UsuarioService, 
    PeliculasService, 
    PedidoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
