import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem : Postagem = new Postagem()   //Instanciando um obj do tipo Postagem
  listaPostagens: Postagem[] //Instanciando um obj do tipo array de Postagens

  //instanciando usuario e atribuindo o id dele ao idUser
  user: User = new User()
  idUser = environment.id

  tema: Tema = new Tema() //instanciando um objeto do tipo Tema
  listaTemas: Tema[] //Instanciando um obj do tipo array de Temas
  idTema:number //Recebe o valor do ngModel no campo de escolher tema

  constructor(
    private router: Router,
    private postagemService : PostagemService, //injetando o postagem service
    private temaService: TemaService, //injetando o tema service, vamos precisar para lista-los já que a postagem precisa deles
    private authService: AuthService
    ) { }

  ngOnInit(){
    if(environment.token == ''){
      alert('Sua sessão expirou! Faça login novamente para continuar!')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas() //Traz automaticamente a lista de temas assim que inicia ou atualiza a pagina
    this.getAllPostagens() //Traz automaticamente a lista de postagens assim que inicia ou atualiza a pagina
  }

  //trazendo temas
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
    this.listaTemas = resp
    })
  }
 
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema)=>{
      this.tema = resp
    })
  }


  //metodos que cadastrará nossa postagem e o que apresentará
  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens = resp
    })
  }
  
  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp:User)=>{
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Buhh! Postagem realizada com sucesso!!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }
}