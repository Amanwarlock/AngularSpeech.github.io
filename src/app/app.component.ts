import { Component, ChangeDetectorRef } from '@angular/core';
import { MdnSpeechService } from './services/mdn-speech.service';

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'speechNg';
  
  translation = "Try speaking ...";

  textList: string[];

  isListening = false;

  constructor(private speechService: MdnSpeechService, private changeDetector: ChangeDetectorRef){

  }

  ngOnInit(){
      
    this.speechService.OnError().subscribe(error=>{
      console.log("Error on speech-to-text translation ", error);
    });

    this.speechService.OnEnd().subscribe(flag=>{
        this.isListening = false;
    });

    this.textList = [];
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
}
