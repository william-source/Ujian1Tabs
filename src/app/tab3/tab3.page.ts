import { FotoService } from './../services/foto.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

export interface fileFoto{
  name : string; //filePath
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  dataFoto=[{}]

  urlImageStorage : string[] = [];

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService,
    private router : Router
  ) {}

  tampilkanData(){
    this.dataFoto=[]
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res) => {
      res.items.forEach((itemRef) =>
      itemRef.getDownloadURL().then(url =>{
        this.urlImageStorage.unshift(url)
        console.log(itemRef.name)
        this.dataFoto.unshift(
          {
            link : url,
            nama : itemRef.name
          }
          )
      })
      )
    }).catch((error) =>{
      console.log(error)
    })
  }


  detail(a){
    this.router.navigate(['/tab4',a])
  }


  goTo(){
    this.router.navigate(['tab4'])
  }


  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData()
  }
}
