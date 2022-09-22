import { Component, OnInit } from '@angular/core';
import { ChartService } from '../services/chart.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart-list',
  templateUrl: './chart-list.component.html',
  styleUrls: ['./chart-list.component.css'],
})
export class ChartListComponent implements OnInit {
  chartOptions: EChartsOption[] = [];

  constructor(private chartService: ChartService) {
    this.chartService.chartData.subscribe((chartOptions) => {
      this.chartOptions = chartOptions;
    });
  }

  ngOnInit(): void {}
}
