import { Component, OnInit } from '@angular/core';

interface SongInterface {
  title: string;
  image: string;
  desc: string;
  file: string;
  playing: boolean
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  songList: Array<SongInterface> = [
    {
      'title': 'Vache',
      'image': 'img/animals/cow-icon.png',
      'desc': 'Meugle',
      'file': '/sounds/cow.mp3',
      'playing': false
    },
    {
      'title': 'Dauphin',
      'image': 'img/animals/dolphin-icon.png',
      'desc': 'Siffle',
      'file': '/sounds/dolphin.mp3',
      'playing': false
    },
    {
      'title': 'Grenouille',
      'image': 'img/animals/frog-icon.png',
      'desc': 'Coasse',
      'file': '/sounds/frog.mp3',
      'playing': false
    },
    {
      'title': 'Oiseau',
      'image': 'img/animals/bird-icon.png',
      'desc': 'Chante',
      'file': '/sounds/bird.mp3',
      'playing': false
    },
    {
      'title': 'Cochon',
      'image': 'img/animals/pig-icon.png',
      'desc': 'Grogne',
      'file': '/sounds/pig.mp3',
      'playing': false
    },
    {
      'title': 'Chien',
      'image': 'img/animals/puppy-icon.png',
      'desc': 'Aboie',
      'file': '/sounds/dog.mp3',
      'playing': false
    },
    {
      'title': 'Chat',
      'image': 'img/animals/black-cat-icon.png',
      'desc': 'Miaule',
      'file': '/sounds/cat.mp3',
      'playing': false
    },
    {
      'title': 'Cheval',
      'image': 'img/animals/horse-icon.png',
      'desc': 'Hennit',
      'file': '/sounds/horse.wav',
      'playing': false
    },
    {
      'title': 'Ane',
      'image': 'img/animals/donkey-icon.png',
      'desc': 'Brait',
      'file': '/sounds/donkey.wav',
      'playing': false
    }
  ];

  pickedSong: SongInterface = null;

  playList: Array<SongInterface>= [];

  audio: HTMLAudioElement = null;

  constructor() {}

  addToPlayList(){
    if(this.pickedSong){
      this.playList.push(this.pickedSong);
      this.pickedSong = null;
    } 
  }

  playSound(){
    if(this.playList.length > 0 && ! this.playList[0].playing){
      //création et lecture du son
      this.audio = new Audio("/assets" + this.playList[0].file);
      this.audio.load();
      this.audio.play();

      //Affichage de la note de musique
      this.playList[0].playing = true;

      this.audio.ontimeupdate = ()=> {
        //Si je suis à la fin du son
        if(this.audio.currentTime == this.audio.duration){
          this.playList[0].playing = false;
          //Suppression de la première position de la playlist
          this.playList.shift();
          //Nouvel appel à playSound
          this.playSound();
        }
      }
    } else {
      this.audio.ontimeupdate = null;
      this.audio = null;
    }
  }

  reorderPlayList(even){
    //Sauvegarde de l'élément déplacé
    let song = this.playList[even.detail.from];
    //Suppression à la position de départ
    this.playList.splice(even.detail.from, 1);
    //Insertion à la position d'arrivée
    this.playList.splice(even.detail.to, 0, song);

    //Fin de l'opération de réorganisation
    even.detail.complete();

    console.log(this.playList);

  }

}
