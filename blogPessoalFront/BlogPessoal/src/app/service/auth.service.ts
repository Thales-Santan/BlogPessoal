import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static getByIdUser(id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  //criando metodos
  entrar(userLogin : UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar',userLogin)
  }

  cadastrar(user : User): Observable<User>{
    return this.http.post<User>('http://localhost:8080/usuarios/cadastrar',user)
  }

  //metodo criado para pegar coisas correlatas ao id de um user
  getByIdUser(id:number): Observable<User>{
    return this.http.get<User>(`http://localhost:8080/usuarios/${id}`)
  }


  //Metodo usado para fazer o menu e rodapé aparecerem nas pages, fora cadastro e login. Ele é implementado em app.component.html . Tambem é preciso injetar e exportar a classe AuthService em app.components.ts para que o app.component.html tenha acesso
  logado(){
    let ok: boolean = false

    if(environment.token != ""){
      ok = true
    }

    return ok
  }
}
