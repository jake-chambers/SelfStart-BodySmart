import { Component, OnInit } from '@angular/core';
import { ManageexercisesService } from './manageexercises.service';
import { RehabplanService } from '../rehabplan/rehabplan.service';


@Component({
  selector: 'app-manageexercises',
  templateUrl: './manageexercises.component.html',
  styleUrls: ['./manageexercises.component.css'],
  
})

export class ManageexercisesComponent implements OnInit {
  exerciseArray: any [] = [];
  rehabplanArray: any[] = [];
  exercise: any;
  constructor(public manageexercisesservice: ManageexercisesService, public rehabplanservice: RehabplanService) { }


  newMessage(message: any)
  {
    this.manageexercisesservice.changeMessage2(message);
  }
  
  
  ngOnInit() {
    this.manageexercisesservice.getExercises().subscribe(data=>{
      this.exerciseArray = [];
      for (var i = 0; i < data.manageexercises.length; i++){
        this.exerciseArray.push(data.manageexercises[i]);
      }
      console.log("These are the exercises");
      console.log(data.manageexercises);
    })
  }
  
   deleteExercise(id:string)
  {
    if (confirm("Do you wish to delete this Exercise?")) 
    {
       this.manageexercisesservice.deleteExercise(id).subscribe(data=>{
       location.reload();

   })
    }
   
   
  }
  
}
