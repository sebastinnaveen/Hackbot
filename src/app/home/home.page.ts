import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
//import { FormGroup, Validators, FormBuilder } from '../../../node_modules/@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chatList: Array<{text: string, isUserTyped: boolean}> = []; 
  showType: boolean = false;
  chatForm: FormGroup;
  constructor(public as: AppService, public fb: FormBuilder, private tts: TextToSpeech) { }

  ngOnInit() {
    let initText = 'Hi, I am a bot. How can i help you?'
    this.chatList.push({text:initText, isUserTyped:false});
    this.speak(initText)
    this.chatForm = this.fb.group({
			'chatbox': ['', Validators.compose([Validators.required])],
      })

      var or = {
        dsfd:''
      }

      console.log()
  }
  changeText(e){
    this.showType = true;
    setTimeout(() => {
      this.showType = false;
    }, 2000)
    
  }
 
  submit() {
   // this.showType = false;
    if(this.chatForm.value.chatbox !== '')
    {
      let texttyped = this.chatForm.value.chatbox;
      this.chatList.push({text:texttyped, isUserTyped:true});
      this.chatForm.controls['chatbox'].setValue('');
      
      this.as.getChat(texttyped).subscribe((res: any) => {
        let speech = res.data.result.fulfillment.speech;
        var data = {
            text:speech, 
            isUserTyped:false,
            payload: undefined
          }
        if(res.data.result.fulfillment.data){
          data.payload = res.data.result.fulfillment.data;
        }
        this.chatList.push(data);
        this.speak(speech)
        
    })
    }

  }

  speak(text){
    this.tts.speak(text)
    .then(() => console.log('Success'))
    .catch((reason: any) => console.log(reason));
  }

}
