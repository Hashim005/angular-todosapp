import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ToDoAddComponent } from './to-do-add/to-do-add.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
  { path:"", redirectTo:"/login",pathMatch:"full" },
  {path:'register',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  { path:'home',component:HomeComponent,
    children:[
      {path:'toDoAdd',component:ToDoAddComponent},
      {path:'toDoAdd/:id',component:ToDoAddComponent},
      {path:'statistics',component:StatisticsComponent}
    ]
  },
  {path:'**',component:NotFoundComponent}

];
