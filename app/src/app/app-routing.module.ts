import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuizComponent } from './pages/quiz/quiz.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SelectLanguageComponent } from './pages/select-language/select-language.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

const routes: Routes = [
  { path: 'quiz', component: QuizComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'selectlanguege', component: SelectLanguageComponent },
  { path: 'register-user', component: RegisterUserComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
