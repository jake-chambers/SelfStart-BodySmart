import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';

@Injectable()
export class AddquestionService {
  questhelpdescription:string = "description";
  questionOrder:string = "order";
  constructor(public http: Http) { }
    
    addQuestion(id:string, questiontext:string){
    var body ={
        questionText:questiontext,
        questHelpDesc:this.questhelpdescription,
        questionOrder:this.questionOrder
    }
    console.log(body);
    return this.http.put('/api/manageforms/' + id, body).map(res => res.json());
}
}
