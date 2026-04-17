import { Component, inject, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuarios.service';
import { Usuarios } from '../models/usuario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios implements OnInit {
  
  private service = inject(UsuarioService);

  listaUsuarios: Usuarios[] = [];

  ngOnInit(): void {
    this.service.getUsuarios().subscribe(lista => {
      this.listaUsuarios = lista;
    })

  }
}
