import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '../../node_modules/@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppService {
    constructor(private httpClient: HttpClient) { }


    getChat = (text) => {
        let textRequest = {
            "text": text,
            "sessionId": "9432894328"
           }
           const httpOptions = {
                        headers: new HttpHeaders({
                               'Content-Type': 'application/json'
            })
        }
        //https://instbotrpa.appspot.com/instbot/nlp
        return this.httpClient.post('https://instbotrpa.appspot.com/instbot/nlp', textRequest, httpOptions);
       //return this.httpClient.post('http://localhost:5001/instbot/nlp', textRequest, httpOptions);
    }
}