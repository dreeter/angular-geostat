import { EventEmitter, Injectable, Output } from '@angular/core';
import { SearchService } from './search.service';
import { EChartsOption } from 'echarts';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  echartOptions: EChartsOption[] = [];
  @Output() chartData: EventEmitter<EChartsOption[]> = new EventEmitter<
    EChartsOption[]
  >();

  constructor(private searchService: SearchService) {
    this.searchService.forecastSearch.subscribe((data: any) => {
      this.echartOptions = this.formatForecastData(data);
      this.chartData.emit(this.echartOptions);
    });
  }

  formatForecastData(data: any): EChartsOption[] {
    const tempSeries: (string | number)[][] = [];
    const windSeries: (string | number)[][] = [];

    for (let i = 0; i < data.list.length; i++) {
      const tempMeasurement: (string | number)[] = [];

      tempMeasurement.push(data.list[i].dt_txt.replaceAll('-', '/'));
      tempMeasurement.push(data.list[i].main.temp);
      tempSeries.push(tempMeasurement);

      const windMeasurement = [];
      windMeasurement.push(data.list[i].dt_txt.replaceAll('-', '/'));
      windMeasurement.push(data.list[i].wind.speed);
      windSeries.push(windMeasurement);
    }

    const tempOption: EChartsOption = {
      title: {
        text: 'Temperature Forecast',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        name: 'Date',
        nameLocation: 'middle',
        nameGap: 30,
        type: 'time',
        minInterval: 1,
        splitLine: {
          show: true,
        },
        scale: true,
        show: true,
        axisTick: {
          show: true,
          interval: 5,
          inside: true,
        },
      },

      yAxis: {
        name: 'Temperature',
        nameLocation: 'middle',
        nameGap: 30,
        minInterval: 1,
        scale: true,
        type: 'value',
        splitLine: {
          show: true,
        },
        show: true,
        splitNumber: 10,
        axisTick: {
          show: true,
          interval: 0,
          inside: true,
        },
      },
      series: [
        {
          type: 'line',
          lineStyle: {
            type: 'solid',
            color: '#E67E22',
          },
          data: tempSeries,
        },
      ],
    };

    const windOption: EChartsOption = {
      title: {
        text: 'Wind Forecast',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        name: 'Date',
        nameLocation: 'middle',
        nameGap: 30,
        type: 'time',
        minInterval: 1,
        splitLine: {
          show: true,
        },
        scale: true,
        show: true,
        axisTick: {
          show: true,
          interval: 5,
          inside: true,
        },
      },

      yAxis: {
        name: 'Wind Speed',
        nameLocation: 'middle',
        nameGap: 30,
        minInterval: 1,
        scale: true,
        type: 'value',
        splitLine: {
          show: true,
        },
        show: true,
        splitNumber: 10,
        axisTick: {
          show: true,
          interval: 0,
          inside: true,
        },
      },
      series: [
        {
          type: 'line',
          lineStyle: {
            type: 'solid',
            color: '#E67E22',
          },
          data: windSeries,
        },
      ],
    };

    return [tempOption, windOption];
  }
}
