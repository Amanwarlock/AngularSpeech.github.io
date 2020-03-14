import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface BrowserWindow extends Window {
  webkitSpeechRecognition: any;
}


@Injectable({
  providedIn: 'root'
})
export class MdnSpeechService {

  recognition: any;

  constructor() {
    this.init();
   }

   init(){
    if('webkitSpeechRecognition' in window){
      const {webkitSpeechRecognition} : BrowserWindow = (window as any) as BrowserWindow;
      this.recognition = new webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

    }else{
      console.log("Error while using mdn-speech service...");
    }
   }

   OnListen(){
     return new Observable(observer=>{

      const self = this;

       this.recognition.start();

       this.recognition.onresult = function(event){
        let result = event.results[0][0].transcript;
        observer.next(result);
      }

      

      this.recognition.onspeechend = function() {
        self.recognition.stop();
      }

      this.recognition.onerror = function(e) {
      } 

      this.recognition.onend = function() {
        console.log('Speech recognition service disconnected');
      }

     });
   }

   Start(){
    return new Observable(observer=>{
      this.recognition.start();
      observer.next(true);
    });
   }

  
   OnResult(){
    return new Observable(observer=>{
      this.recognition.onresult = function(event){
        let result = event.results[0][0].transcript;
        observer.next(result);
      }
    });
   }

   OnEnd(){
    return new Observable(observer=>{
      this.recognition.onspeechend = function() {
       observer.next(true);
      }
    });
   }

   OnDisconnected(){
     return new Observable(observer=>{
      this.recognition.onend = function() {
        observer.next(true);
      }

     });
   }

   OnError(){
    return new Observable(observer=>{
      this.recognition.onerror = function(e) {
        observer.next(e);
      } 
    });
   }

   stop(){
    return new Observable(observer=>{
      this.recognition.stop();
      observer.next();
    });
   }

   OnNoMatch(){
     return new Observable(observer=>{
      this.recognition.onnomatch = function(event) {
        observer.next(true);
      }
     });
   }

}
