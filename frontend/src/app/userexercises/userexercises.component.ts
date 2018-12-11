import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router} from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { RatingModule } from "ngx-rating";
import { ManageexercisesService } from '../manageexercises/manageexercises.service';
import { CreateplanService } from '../createplan/createplan.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-userexercises',
  templateUrl: './userexercises.component.html',
  styleUrls: ['./userexercises.component.css'],

})
export class UserexercisesComponent implements OnInit {
  
  user: any;
  starsCount:number[] = [];
  rehabPlan: any[] = [];
  exercises: any[] = [];
  id:any;
  constructor(private createplanservice: CreateplanService, private manageexercisesservice: ManageexercisesService, private authService:AuthService, private router:Router, public profileservice:ProfileService,  private flashmessage:FlashMessagesService) { 
    
  }

  ngOnInit() {
    
    this.authService.getProfile().subscribe(profile=>{
    this.user = profile.user;
    // console.log("the user is here");
    // console.log(profile.user);
    // console.log(this.user);
    //this.user.exercisePlan;
    this.getRehabPlan();
    
  });
  
  }
  
  getRehabPlan(){
    console.log("REHAB PLAN : " + this.user.rehabPlan);
    this.createplanservice.getRehabPlanByID(this.user.rehabPlan).subscribe(data => {
      // console.log('This is the data from backend');
      // console.log(data);
      
      // console.log('These are the exercises');
      // console.log(data.rehabPlan.exercises);
      
      for(var i = 0; i < data.rehabPlan.exercises.length; i++){
        
        if (data.rehabPlan.exercises[i] != null)
        {
            this.exercises.push(data.rehabPlan.exercises[i]);
        }
       
      }
    });
    
  }

  onExerciseSubmit(starsCount:number ,eName:any,uId : any){
    if (starsCount == 0)
    {
      //alert(somestuff)
      
    }
    console.log("IN THE RATING COMPONENT");
    this.manageexercisesservice.updateRehabRating(this.user.rehabPlan, starsCount, eName, uId).subscribe(data => {
    console.log(data);
    })
  }


}
