import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CreateexerciseService } from './createexercise.service';

@Component({
  selector: 'app-createexercise',
  templateUrl: './createexercise.component.html',
  styleUrls: ['./createexercise.component.css']
})
export class CreateexerciseComponent implements OnInit {
  constructor(public createexercise:CreateexerciseService, private flashmessage:FlashMessagesService, private router:Router) { 

  }
  
  addExercise(name: string, description: string, author: string, objectives: string, actionsteps: string, location: string, frequency: string, duration: string, multimediaURL: string)
  {
    var check = true;
    var message = "The following fields: ";
    if (name.length == 0)
    {
      check = false;
      message = message.concat("Name, ");
    }
    if (description.length == 0)
    {
      check = false;
      message = message.concat("Description, ");
    }
    if (author.length == 0)
    {
      check = false;
      message = message.concat("Author, ");
    }
    if (objectives.length == 0)
    {
      check = false;
      message = message.concat("Objectives, ");
    }
    if (actionsteps.length == 0)
    {
      check = false;
      message = message.concat("ActionSteps, ");
    }
    if (location.length == 0)
    {
      check = false;
      message = message.concat("Location, ");
    }
    if (frequency.length == 0)
    {
      check = false;
      message = message.concat("Frequency, ");
    }
    if (duration.length == 0)
    {
      check = false;
      message = message.concat("Duration, ");
    }
    message = message.concat("are invalid")
    if (check)
    {
      this.createexercise.addExercise(name, description, author, objectives, actionsteps, location, frequency, duration, multimediaURL).subscribe(data=>{
        this.flashmessage.show('Exercise Made!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/manageexercises']);
        console.log("THE EXERCISE IS ADDED");
        console.log(data);
      })
    }
    else
    {
              this.flashmessage.show(message, {cssClass: 'alert-danger', timeout: 5000});
    }
  }
  
  ngOnInit() {
  }

}
