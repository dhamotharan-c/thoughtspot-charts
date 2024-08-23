import './style.css'

import {
    ChartConfig,
    ChartModel,
    Query,
    getChartContext,
    ChartColumn,
    DataPointsArray,
    ColumnType
  } from '@thoughtspot/ts-chart-sdk';
  
import Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

import _ from 'lodash';

function getDataForColumn(column: ChartColumn, dataArr: DataPointsArray) {
    const idx = _.findIndex(dataArr.columns, (colId) => column.id === colId);
    return _.map(dataArr.dataValue, (row) => row[idx]);
}

const getDataModel = (chartModel: any) =>{
    const columns = chartModel.columns;
    const dataArr: DataPointsArray = chartModel.data[0].data;

    // create point from data
    const points = dataArr.dataValue.map((row: any[], idx: number) => {
        return {
            id: `${row[0]} ${row[1]}`,
            parent: row[0],
            name: row[1],
            namevalue: row[2],
            
        };
    });

        // create projects from points & data
        const projects = _.uniq(getDataForColumn(columns[0], dataArr));
        const dataSeries = projects.map((project) => {
            const filteredPoints = points.filter(
                (point: any) => point.parent === project,
            );
            return {
                name: project,
                data: [
                    ...filteredPoints,
                    {
                        id: project,
                        name: project,
                    },
                ],
            };
        });
    return{
        dataSeries,
    }

}


const renderChart = (ctx: any) => {

    const chartModel = ctx.getChartModel();
    const dataModel = getDataModel(chartModel);

    debugger;

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
    series: dataModel.dataSeries as any,

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
                        columns: [...attributeColumns],
                    },
                    {
                        key: 'tagvalue',
                        columns: [...measureColumns],
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
        renderChart: (context) => renderChart(context),
    });
    await renderChart(ctx);
};

init();