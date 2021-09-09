import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  //Isso traz o token para essa camada,já que no back foi especificado que era necessario o token para acessa esse caminho (que faz os gets e posts e tals do tema)
  token ={headers : new HttpHeaders().set('Authorization',environment.token)}

  //Aplicando os metodos http

  //Como o getAll pega uma lista de postagens, declaramos aqui com array
  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('http://localhost:8080/postagens',this.token)
  }

  getByIdPostagem(id:number):Observable<Postagem>{
    return this.http.get<Postagem>(`http://localhost:8080/postagens/${id}`,this.token)
  }

  postPostagem(postagem:Postagem):Observable<Postagem>{
    return this.http.post<Postagem>('http://localhost:8080/postagens',postagem,this.token)
  }

  putPostagem(postagem:Postagem):Observable<Postagem>{
    return this.http.put<Postagem>('http://localhost:8080/postagens',postagem,this.token)
  }

  deletePostagem(id:number){
    return this.http.delete(`http://localhost:8080/postagens/${id}`,this.token)
  }
}
