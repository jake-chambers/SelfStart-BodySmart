import { Component, OnInit } from '@angular/core';
import { RehabplanService } from '../rehabplan/rehabplan.service';
import { ManageexercisesService} from '../manageexercises/manageexercises.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-exerciseprofile',
  templateUrl: './exerciseprofile.component.html',
  styleUrls: ['./exerciseprofile.component.css']
})
export class ExerciseprofileComponent implements OnInit {

  message2: any;
  isShown: boolean = false;
  showEdit: boolean = false;
  url:string='';
  temp:string = '';
  constructor(private domsanatizer: DomSanitizer, public manageexercises: ManageexercisesService,private flashmessage:FlashMessagesService, private router:Router)
  {
    // console.log("log message 1 con" + this.message2.multimediaURL);
    
    console.log("this is temp con: " + this.temp);
    
  }
  
  editExercise(id: string, name: string, description: string, author: string, objectives: string, actionsteps: string, location: string, frequency: string, duration: string, multimediaurl: string)
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
      this.manageexercises.editExercise(id, name, description, author, objectives, actionsteps, location, frequency, duration, multimediaurl).subscribe(data =>{
        console.log(data);
        this.flashmessage.show('Exercise updated!', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/manageexercises']);
      })
    }
    else
    {
      this.flashmessage.show(message, {cssClass: 'alert-danger', timeout: 5000});
    }
  }
  
  showEditFunction()
  {
    this.showEdit = !this.showEdit;
  }

  ngOnInit()
  {
    this.showEdit = true;
    this.manageexercises.currentMessage2.subscribe(message2 => this.message2 = message2);
    console.log("log message 1 ngOnInit" + this.message2.multimediaURL);
    console.log("this is temp ng: " + this.temp);
    this.temp = this.message2.multimediaURL;
    // this.url = this.domsanatizer.bypassSecurityTrustResourceUrl(this.temp);
  }

}
