import { Component, ChangeDetectorRef } from '@angular/core';
import { MdnSpeechService } from './services/mdn-speech.service';

export interface IParticles extends Window {
  particlesJS: any;
}

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Speech Translator';

  logo = 'fas fa-brain'; //<i class="fas fa-bullhorn"></i>
  
  translation = "Try speaking ...";

  textList: string[];

  isListening = false;

  constructor(private speechService: MdnSpeechService, private changeDetector: ChangeDetectorRef){

  }

  ngOnInit(){
    
    this.initParticles();

    this.speechService.OnError().subscribe(error=>{
      console.log("Error on speech-to-text translation ", error);
    });

    this.speechService.OnEnd().subscribe(flag=>{
        this.isListening = false;
    });

    this.textList = [];
  }

  initParticles(){
    //const {particlesJS} : IParticles = (window as any) as IParticles;

    particlesJS.load('particles-js', './particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

  mdnListen(){
    if(this.isListening){
      this.isListening = false;
      this.speechService.stop().subscribe();
    }else{
      this.isListening = true;
      this.speechService.OnListen().subscribe((result: string)=>{
        this.textList.push(result);
        this.changeDetector.detectChanges();
        console.log("Speech result .............", result);
    });
    }
    this.speechService.OnDisconnected().subscribe(flag=>{
      this.isListening = false;
      this.changeDetector.detectChanges();
    });
    this.speechService.OnNoMatch().subscribe(flag=>{
      this.isListening = false;
      this.changeDetector.detectChanges();
    });
  }

  clear(){
    this.textList = [];
  }

  deleteNote(index){
    this.textList.splice(index,1);
    this.changeDetector.detectChanges();
  }

}
