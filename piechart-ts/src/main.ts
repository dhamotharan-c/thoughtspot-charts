import './style.css'

// import {
//     ChartConfig,
//     ChartModel,
//     Query,
//     getChartContext,
//     ChartToTSEvent,
//     ColumnType,
//     CustomChartContext,
//   } from '@thoughtspot/ts-chart-sdk';
  
import Highcharts from 'highcharts';

Highcharts.chart('pieApp', {
    chart: {
        type: 'pie'
    },
    title: {
        text: 'Unknown'
    },
    tooltip: {
        valueSuffix: '%'
    },
    subtitle: {
        text:
        'Source: Unknown'
    },
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Water',
                    y: 55.02
                },
                {
                    name: 'Fat',
                    y: 26.71
                },
                {
                    name: 'Carbohydrates',
                    y: 1.09
                },
                {
                    name: 'Protein',
                    y: 15.5
                },
                {
                    name: 'Ash',
                    y: 1.68
                }
            ]
        }
    ]
} as any);
