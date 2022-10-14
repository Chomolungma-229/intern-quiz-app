import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import 'dayjs/locale/ja';
import * as dayjs from 'dayjs';

import { QuestionAnswerService } from 'src/app/question-answer.service';
import { StorageService } from 'src/app/storage.service';
import { LanguageService } from 'src/app/language.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  today: any = dayjs();
  answerRate: any[] = [];
  isChart = false;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      this.today.subtract(6, 'day').format("MM月DD日"),
      this.today.subtract(5, 'day').format("MM月DD日"),
      this.today.subtract(4, 'day').format("MM月DD日"),
      this.today.subtract(3, 'day').format("MM月DD日"),
      this.today.subtract(2, 'day').format("MM月DD日"),
      this.today.subtract(1, 'day').format("MM月DD日"),
      this.today.format("MM月DD日")
    ],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        label: 'JavaScript',
        fill: false,
        tension: 0,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        backgroundColor: 'white',
        pointBackgroundColor: 'yellow',
      },
      {
        data: [0, 25, 50, 60, 40, 80, 90],
        label: 'Java',
        fill: false,
        tension: 0,
        borderColor: 'rgba(255, 0, 0, 0.5)',
        backgroundColor: 'white',
        pointBackgroundColor: 'red',
      },
      {
        data: [0, 25, 50, 30, 100, 50, 90],
        label: 'Python',
        fill: false,
        tension: 0,
        borderColor: 'rgba(0, 0, 255, 0.5)',
        backgroundColor: 'white',
        pointBackgroundColor: 'blue',
      },
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    responsive: false,
  };
  public lineChartLegend = true;

  constructor(
    private answerSvc: QuestionAnswerService,
    private storageSvc: StorageService,
    private languageSvc: LanguageService,
  ) { }

  ngOnInit(): void {
    let user: any = '';
    user = JSON.parse(this.storageSvc.getStorage('user') || '{}');
    let language: any;
    const oneWeekAgoDate: any = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
    this.languageSvc.getLanguage().subscribe(response => {
      console.log(response)
      const functions = response.map(language => {
        let query: any = {
          _where: [
            { users_permissions_user: user.id },
            { answer_at_gt: oneWeekAgoDate },
            { 'question.language': language.id }
          ]
        };
        return this.answerSvc.getQuestionAnswer(query);
      })
      forkJoin(functions).subscribe(response => {
        response.forEach((questionAnswer, index) => {
          this.answerRate = this.answerSvc.getCorrectAnswerRate(questionAnswer);
          this.lineChartData.datasets[index].data = this.answerRate;
          console.log(index, this.answerRate);
        })
        this.isChart = true;
      });
    });

  }


}
