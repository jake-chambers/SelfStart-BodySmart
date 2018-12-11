import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { HomeComponent } from './home/home.component';
import { QuestionformComponent } from './questionform/questionform.component';
import { ProfileComponent } from './profile/profile.component';
import { ManageexercisesComponent } from './manageexercises/manageexercises.component';
import { RehabplanComponent } from './rehabplan/rehabplan.component';
import { CreateplanComponent } from './createplan/createplan.component';
import { CreateexerciseComponent } from './createexercise/createexercise.component';
import { CreatequestionComponent } from './createquestion/createquestion.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { MakepaymentComponent } from './makepayment/makepayment.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ExerciseprofileComponent } from './exerciseprofile/exerciseprofile.component';
import {FormprofileComponent} from './formprofile/formprofile.component';
import { AddquestionComponent } from './addquestion/addquestion.component';
import { AssessmenttestsComponent} from './assessmenttests/assessmenttests.component';
import { ViewpatientComponent} from './viewpatient/viewpatient.component';
import { SummaryReportComponent } from './summary-report/summary-report.component';
import { UserexercisesComponent } from './userexercises/userexercises.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'questions', component: QuestionformComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'manageexercises', component: ManageexercisesComponent },
  { path: 'rehabplan', component: RehabplanComponent },
  { path: 'createplan/:_id', component: CreateplanComponent },
  { path: 'createexercise', component: CreateexerciseComponent },
  { path: 'createquestion', component: CreatequestionComponent },
  { path: 'makepayment', component: MakepaymentComponent},
  { path: 'bookappointment', component: BookappointmentComponent },
  { path: 'manageusers', component: ManageusersComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: 'exerciseprofile', component: ExerciseprofileComponent },
  { path: 'forms', component: FormprofileComponent},
  { path: 'addquestion', component: AddquestionComponent},
  { path: 'assessment', component: AssessmenttestsComponent },
  { path: 'viewpatient/:_id', component: ViewpatientComponent },
  { path: 'summary/:_id', component: SummaryReportComponent },
  { path: 'userexercises', component: UserexercisesComponent },
  { path: 'about', component: AboutComponent },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
