import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable()
export class MakepaymentService {

    paymentID: any;
    

  constructor(public http: Http) { }

    setUpPayment(number: String, note_: String){
        
         // let header = new Headers({
         //       'Authorization': 'Bearer A21AAH1SSAEnFsZ0YgJt-XIs89FN5Nn5CBbHMqwQqItDWWnuhX5wcie6fZEvMhkzpNxAiY3VkWo4d_SdFWsVFiNRaFyTgdphA',
         //       'Content-Type':  'application/json'
         //   })
            console.log("IN THE SERVICE");
            let headers = new Headers();
            headers.append('Authorization', btoa('Bearer A21AAH1SSAEnFsZ0YgJt-XIs89FN5Nn5CBbHMqwQqItDWWnuhX5wcie6fZEvMhkzpNxAiY3VkWo4d_SdFWsVFiNRaFyTgdphA'));
            headers.append('Content-Type', btoa('application/json'));
        
        let opts = new RequestOptions();
        opts.headers = headers;
       
        const body =
        {
            amount: number,
            note: note_,
        }
        //this will create/setup the payment
        return this.http.post('/api/makepayment/', body, {headers: opts}).map(res => res.json());
    }
    
    getPayments() {
        return this.http.get('/api/makepayment/').map(res => res.json());
    }
  
}
