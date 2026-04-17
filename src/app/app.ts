import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaUsuarios } from './lista-usuarios/lista-usuarios';

@Component({
  selector: 'app-root',
  imports: [ListaUsuarios],
  templateUrl: './app.html',
  styleUrl: './app.css',
  standalone: true
})
export class App {
  protected readonly title = signal('sistema-usuarios');
}
