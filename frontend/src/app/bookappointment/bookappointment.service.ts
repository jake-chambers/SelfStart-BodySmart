import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookappointmentService {

  constructor(public http: Http) { }
  bookAppointment(
  clientID: String, 
  date: Date,
  location: String,
  describePain:String,
  cause: String,
  dateOfInjury: String,
  description: String,
  ratingNow: String,
  ratingSevenDays: String,
  aggrevation: String,
  easePain: String,
  morningPain: String,
  eveningPain: String,
  otherTreatment: String,
  otherPains: String,
  otherConditions: String,
  explain: String,
  symptoms: String,
  history: String,
  describeHistory: String,
  occupation: String,
  activities: String,
  goals: String,
  image: any){
    console.log("the service is working");
    console.log("from service: ")
    console.log(image);
      var body = {
        clientID: clientID,
        date: date,
        location: location,
        describePain:describePain,
        cause: cause,
        dateOfInjury: dateOfInjury,
        description: description,
        ratingNow: ratingNow,
        ratingSevenDays: ratingSevenDays,
        aggrevation: aggrevation,
        easePain: easePain,
        morningPain: morningPain,
        eveningPain: eveningPain,
        otherTreatment: otherTreatment,
        otherPains: otherPains,
        otherConditions: otherConditions,
        explain: explain,
        symptoms: symptoms,
        history: history,
        describeHistory: describeHistory,
        occupation: occupation,
        activities: activities,
        goals: goals,
        image: image,
      }
    console.log(body);
    return this.http.post('/api/bookappointment', body).map(res => res.json());
  }

}
