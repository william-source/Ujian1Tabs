import { FotoService } from './../services/foto.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';

export interface fileFoto{
  name : string; //filePath
  path : string; //webViewPath
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {


  urlImageStorage : string[] = [];
  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService,
    private route : ActivatedRoute
  ) { }

    fileImage

  ngOnInit() {
    let data = this.route.snapshot.paramMap.get('data')
    this.fileImage = data
  }

  tampilkanData(){
    this.urlImageStorage=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then(
      (res) => {
      res.items.forEach((itemRef) =>
      itemRef.getDownloadURL().then(url =>{
        this.urlImageStorage.unshift(url)
        console.log(itemRef.name)
      })
      )
    }).catch((error) =>{
      console.log(error)
    })

  }


  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData()
  }
  


}
