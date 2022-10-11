import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import 'dayjs/locale/ja';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  today: any = dayjs();

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
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'JavaScript',
        fill: false,
        tension: 0,
        borderColor: 'yellow',
        backgroundColor: 'white',
        pointBackgroundColor: 'yellow',
      },
      {
        data: [0, 25, 50, 60, 40, 80, 90],
        label: 'Java',
        fill: false,
        tension: 0,
        borderColor: 'blue',
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

  constructor() { }

  ngOnInit(): void {

  }

}
