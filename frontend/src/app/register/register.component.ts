import { Component, OnInit } from '@angular/core';
 import {ValidateService} from '../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  DOB:String;
  phone:String;
  postalCode:String;
  martialStatus:String;
  healthCardNumber:String;
  medicalHistory:String;
  adminCode:String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
      DOB:this.DOB,
      phone:this.phone,
      postalCode:this.postalCode,
      martialStatus:this.martialStatus,
      healthCardNumber:this.healthCardNumber,
      medicalHistory:this.medicalHistory,
      adminCode:this.adminCode
    }
    console.log(user);
    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
      // Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
    
    
  }

}
