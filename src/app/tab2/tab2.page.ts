import { FotoService } from './../services/foto.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  urlImageStorage : string[] = [];

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService
  ) {}

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }

  TambahFoto(){
    this.fotoService.tambahFoto();
  }

  uploadFoto(){
    this.urlImageStorage=[];
    for(var index in this.fotoService.dataFoto){
      if(this.fotoService.dataFoto[index].filePath!="Load")
      {
      console.log(index, this.fotoService.dataFoto[index].filePath)
      
      const imgFilePath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`
      this.afStorage.upload(imgFilePath,this.fotoService.dataFoto[index].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url)=>{
          this.urlImageStorage.unshift(url)
          console.log(url);
        });
      });
    }
    }
  }

  clicked(a){
    console.log(a)

    const imgFilePath = `imgStorage/${a.filePath}`
    this.afStorage.upload(imgFilePath,a.dataImage).then(()=>{
      this.afStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url)=>{
        this.urlImageStorage.unshift(url)
        console.log(url)
      })
    })

  }

}
