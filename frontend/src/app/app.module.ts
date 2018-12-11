import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router'
import { AppComponent } from './app.component';
import { QuestionformComponent } from './questionform/questionform.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageexercisesComponent } from './manageexercises/manageexercises.component';
import { QuestionformService } from './questionform/questionform.service';
import { ProfileService } from './profile/profile.service';
import { ManageexercisesService } from './manageexercises/manageexercises.service';
import { RehabplanComponent } from './rehabplan/rehabplan.component';
import { CreateplanComponent } from './createplan/createplan.component';
import { CreateexerciseComponent } from './createexercise/createexercise.component';
import { CreateexerciseService } from './createexercise/createexercise.service';
import { CreatequestionService } from './createquestion/createquestion.service';
import { CreatequestionComponent } from './createquestion/createquestion.component';
import { RehabplanService } from './rehabplan/rehabplan.service';
import { CreateplanService } from './createplan/createplan.service';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { BookappointmentService } from './bookappointment/bookappointment.service';
import { RegisterComponent } from './register/register.component'
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {RatingModule} from "ngx-rating";
// import {AdminGuard} from './auth/admin.guard';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManageusersService} from './manageusers/manageusers.service';
import { LoginComponent } from './login/login.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ExerciseprofileComponent } from './exerciseprofile/exerciseprofile.component';
import {FormprofileComponent} from './formprofile/formprofile.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
// import { SortPipe } from './pipes/sort.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { ImageUploadModule } from "angular2-image-upload";
import { AssessmenttestsComponent } from './assessmenttests/assessmenttests.component';
import { ViewpatientComponent } from './viewpatient/viewpatient.component';
import { AddquestionService } from './addquestion/addquestion.service';
import { FormprofileService } from './formprofile/formprofile.service';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MakepaymentComponent } from './makepayment/makepayment.component';
import { MakepaymentService } from './makepayment/makepayment.service';
import { AssessmenttestsService } from './assessmenttests/assessmenttests.service';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { UserexercisesComponent } from './userexercises/userexercises.component';
import {FileUploadModule} from 'ng2-file-upload/file-upload/file-upload.module';
import { ChartsModule } from 'ng2-charts';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AboutComponent } from './about/about.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

var appRoutes:Routes=[
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'manageexercises',component:ManageexercisesComponent,canActivate:[AuthGuard]},
  {path:'createquestion',component:CreatequestionComponent,canActivate:[AuthGuard]},
  {path:'makepayment',component:MakepaymentComponent,canActivate:[AuthGuard]},
  {path:'createexercise',component:CreateexerciseComponent,canActivate:[AuthGuard]},
  {path:'questionform',component:QuestionformComponent,},
  {path:'manageusers',component:ManageusersComponent,canActivate:[AuthGuard]},
  {path:'user-detail',component:UserDetailComponent,canActivate:[AuthGuard]},
  {path:'summar',component:SummaryReportComponent,canActivate:[AuthGuard]},
];

@NgModule
({
  declarations: 
  [
    AppComponent,
    QuestionformComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    ManageexercisesComponent,
    RehabplanComponent,
    CreateplanComponent,
    CreateexerciseComponent,
    CreatequestionComponent,
    BookappointmentComponent,
    RegisterComponent,
    ManageusersComponent,
    LoginComponent,
    UserDetailComponent,
    ExerciseprofileComponent,
    FormprofileComponent,
    // SortPipe,
    SearchPipe,
    FilterPipe,
    AddquestionComponent,
    AssessmenttestsComponent,
    ViewpatientComponent,
    MakepaymentComponent,
    ForgotpasswordComponent,
    SummaryReportComponent,
    UserexercisesComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FileUploadModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    AngularDateTimePickerModule,
    ImageUploadModule.forRoot(),
    SortableModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    RatingModule,
    ChartsModule,
    AccordionModule.forRoot(),
    CarouselModule.forRoot(),

  ],
  
  providers: [AuthGuard,ValidateService,AuthService, MakepaymentService, QuestionformService, ProfileService, ManageexercisesService, ManageusersService, CreateexerciseService, CreatequestionService, RehabplanService, CreateplanService, BookappointmentService, SearchPipe, FilterPipe, AddquestionService, FormprofileService, AssessmenttestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
