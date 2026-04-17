import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Usuarios } from "../models/usuario.model";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({ providedIn: "root"})
export class UsuarioService{
    private http = inject(HttpClient);

    getUsuarios(): Observable<Usuarios[]>{
        return this.http.get<Usuarios[]>('https://jsonplaceholder.typicode.com/users').pipe(
            catchError(err => {
                console.log("Erro ao buscar Usuarios: ", err);
                return throwError(() => new Error("Falha ao buscar usuários."));
            })
        )
    }
}