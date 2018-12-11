import { Component, OnInit } from '@angular/core';
import { BookappointmentService } from './bookappointment.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
// import { FileService } from './file.service';
import {saveAs} from 'file-saver';

const URL='https://localhost:8081/api/upload';
@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})


export class BookappointmentComponent implements OnInit {
    images: any = [];
    date: Date = new Date();
    clientID:string;
    settings = {
        bigBanner: true,
        timePicker: true,
        format: 'short',
        defaultOpen: false
    }
    
    public uploader:FileUploader= new FileUploader({url:URL, itemAlias: 'photo'});

  constructor(private authService:AuthService, public bookappointment:BookappointmentService, private flashmessage:FlashMessagesService, private router:Router) 
  {}

  ngOnInit() {
    this.authService.getProfile().subscribe(data=>{
      console.log(data.user._id);
      this.clientID = data.user._id;
      console.log(this.clientID);
    })
    
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem=(item:any,response:any, status:any,headers:any)=>{
       console.log("ImageUpload:uploaded:", item, status, response);
    }
    
  }
  
  onFileSelected(event){
    console.log(event.target);
    for(var i=0; i<event.target.files.length; i++){
          this.images.push(event.target.value);
    }
  }
  
  bookAppointment(
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
    console.log("component is working");
    this.bookappointment.bookAppointment(this.clientID, 
  date,
  location,
  describePain,
  cause,
  dateOfInjury,
  description,
  ratingNow,
  ratingSevenDays,
  aggrevation,
  easePain,
  morningPain,
  eveningPain,
  otherTreatment,
  otherPains,
  otherConditions,
  explain,
  symptoms,
  history,
  describeHistory,
  occupation,
  activities,
  goals,
  image).subscribe(data=>{
      console.log('subscribe is working');
      this.flashmessage.show('Appointment Booked!', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/home']);
    })
  }

}
