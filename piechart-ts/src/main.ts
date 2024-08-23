import './style.css'

import {
    ChartConfig,
    ChartModel,
    Query,
    getChartContext,
    ChartToTSEvent,
    ColumnType,
    ChartColumn,
    DataPointsArray,
    CustomChartContext,
  } from '@thoughtspot/ts-chart-sdk';
  
import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

import _ from 'lodash';

const getDataModel = (chartModel: ChartModel) =>{
    const data = chartModel.data;

    const points = data?.[0].data.dataValue.map((row)=>{
        return{
            projectname: row[0],
            tagname: row[1],
            tagvalue: row[2],
        };
    });

    const projectwisepoints = _.groupBy(points,'projectname');
    const series = Object.keys(projectwisepoints).map((projectName) =>{

        return{
            name: projectName,
            data: projectwisepoints[projectName].map((point:any) => {
                return{
                    name: point.tagname,
                    value: point.tagvalue,
                }
            }),
        }
    
    });
    return{
        series,
    }

}


const renderChart = (ctx: CustomChartContext) => {

    const chartModel = ctx.getChartModel();
    const dataModel = getDataModel(chartModel);

    Highcharts.chart('pieApp', {
    accessibility: {
        enabled: false
    },
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
    series: dataModel.series as any,
    // series: [
    //     {
    //         name: 'Poduct', //Project name - Basically a type of series name column
    //         colorByPoint: true,
    //         data: [
    //             {                        //Two columns struct
    //                 name: 'Water',       //Column attribute selection
    //                 y: 55.02             //Column Measure selection
    //             },
    //             {
    //                 name: 'Fat',
    //                 y: 26.71
    //             },
    //             {
    //                 name: 'Carbohydrates',
    //                 y: 1.09
    //             },
    //             {
    //                 name: 'Protein',
    //                 y: 15.5
    //             },
    //             {
    //                 name: 'Ash',
    //                 y: 1.68
    //             }
    //         ]
    //     }
    // ]
    } as any);

    return Promise.resolve();
}

const init = async () => {
    const ctx = await getChartContext({
        getDefaultChartConfig: (chartModel: ChartModel): ChartConfig[] => {
            const columns = chartModel.columns;

            const measureColumns = _.filter(
                columns, 
                (columns) => columns.type === ColumnType.MEASURE,
            );
            const attributeColumns = _.filter(
                columns, 
                (columns) => columns.type === ColumnType.ATTRIBUTE,
            );
            const chartConfig: ChartConfig = {
                key: 'default',
                dimensions:[
                    {
                        key: 'projectname',
                        columns: [columns[0]],
                    },
                    {
                        key: 'tagname',
                        columns: [attributeColumns[1]],
                    },
                    {
                        key: 'tagvalue',
                        columns: [measureColumns[2]],
                    },
                    
                ],
            };
            return [chartConfig]; 


        },
        getQueriesFromChartConfig: (
            chartConfig: ChartConfig[],
        ): Array<Query> => {
            return chartConfig.map(
                (config: ChartConfig): Query =>
                    _.reduce(
                        config.dimensions,
                        (acc: Query, dimension) => ({
                            queryColumns: [
                                ...acc.queryColumns,
                                ...dimension.columns,
                            ],
                        }),
                        {
                            queryColumns: [],
                        } as Query,
                    ),
            );
        },
        renderChart: (context:CustomChartContext) => renderChart(context),
    });
    await renderChart(ctx);
};

init();