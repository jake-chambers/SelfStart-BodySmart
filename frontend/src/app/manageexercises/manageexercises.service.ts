import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class ManageexercisesService {
  constructor(public http: Http, private flashmessage:FlashMessagesService) { }

    private messageSource2 = new BehaviorSubject<any>("");
    currentMessage2 = this.messageSource2.asObservable();
    
    getExercises(){
        return this.http.get('/api/manageexercises').map(res => res.json());
    }
    changeMessage2(message2: any)
    {
      this.messageSource2.next(message2);
    }
    
    editExercise(ID: any, name: any, description: any, authorName: any, objectives: any, actionSteps: any, location: any, frequency: any, duration: any, multimediaURL: any){
      
      var body = {
        name: name,
        description: description, 
        authorName: authorName,
        objectives: objectives, 
        actionSteps: actionSteps, 
        location: location, 
        frequency: frequency, 
        duration: duration, 
        multimediaURL: multimediaURL
      }
      return this.http.put(('/api/manageexercises/'+ ID), body).map(res=>res.json());
    }
    
    updateRating(ID: any, rating: number , uId : any){
      var body = {rating:rating,
                  userID : uId}
      
      return this.http.put(('/api/manageexercises/'+ ID), body).map (res => res.json());
    }
    
    getRating(ID:any) {
      return this.http.get('/api/manageexercises/' + ID).map(res => res.json());
    }
    
    deleteExercise(id:string){
    return this.http.delete('/api/manageexercises/' + id).map(res => res.json());
  }
  
  updateRehabRating(ID: any, rating: number , eName : any, uId : any){
      var body = {rating:rating,
                  
                  }
      
      // var ratingsJSON = JSON.stringify(this.http.get('/api/rating/'));
      //   for (var i =0; i < ratingsJSON.length; i ++)
      //   {
      //     console.log("IDS are " +  )
      //     if (ratingsJSON[i].uID == uId)
      //     {
      //         return this.http.put(('/api/rating/' + ratingsJSON[i]._id), body).map (res => res.json());

      //     }
      //   }
      
      console.log("IN THE ManageexercisesService SERVICE");
      console.log("RATING IS: " + rating);
      // console.log("EID is : " + eId);
      console.log("userID is : " + uId);
      
      
      return this.http.put(('/api/rating/' + uId +'/' +eName+'/'), body).map (res => res.json());

    }
    
}
