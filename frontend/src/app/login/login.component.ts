import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages/module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

username: String;
password: String;
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user={
      username:this.username,
      password:this.password,
    }

    
    this.authService.authenticateUser(user).subscribe(data=>{
      
      if(data.success){
        //if login info is correct, store the token and the user
          this.authService.storeUserData(data.token,data.user);
          console.log(data.user.isAdmin)
          this.flashMessage.show('You are now logged in',
            {cssClass:'alert-success',
            timeout:5000})
          
            if(data.user.isAdmin)
            {
              this.router.navigate(['/home'])
              
            }else{
              this.router.navigate(['/home']);
            }
            
             //if (this.authService.isadmin(user)){
            // this.router.navigate(['/admin']);}
            //else{this.router.navigate(['/profile']);}
            
      }else{
        this.flashMessage.show(data.msg,
          {cssClass:'alert-danger',
          timeout:5000});//timeout set to 5 seconds
          this.router.navigate(['/login']);
      }
    });
  }

  //take this object and submit it through our auth service to the back end authenticate router

}
