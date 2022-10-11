import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { startWith } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      '9/30',
      '10/1',
      '10/2',
      '10/3',
      '10/4',
      '10/5',

    ],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        fill: false,
        tension: 0,
        borderColor: 'rgba(255,255,0,1)',
        pointBackgroundColor: 'blue',
      },
      {
        data: [0, 25, 50, 60, 40, 80, 90],
        label: 'Series A',
        fill: false,
        tension: 0,
        borderColor: 'blue',
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
