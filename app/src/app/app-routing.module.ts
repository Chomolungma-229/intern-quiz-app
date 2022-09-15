import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizComponent } from './pages/quiz/quiz.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SelectLanguageComponent } from './pages/select-language/select-language.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { DialogComponent } from './components/dialog/dialog.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'selectlanguege', component: SelectLanguageComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dialog', component: DialogComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
