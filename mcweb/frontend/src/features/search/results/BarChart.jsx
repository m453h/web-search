import * as React from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exporting from 'highcharts/modules/exporting';

// exporting(Highcharts);

export default function BarChart({
  normalized, height, title, series,
}) {
  const options = {
    chart: {
      type: 'bar',
      height,
    },
    title: { text: title },
    xAxis: {
      categories: series[0].data.map((d) => d.key),
      title: {
        text: null,
      },
    },
    yAxis: {
      min: 0,
      max: normalized ? 100 : null,
      title: {
        text: normalized ? 'Percentage' : 'Count',
        align: 'high',
      },
      labels: {
        overflow: 'justify',
        format: normalized ? '{value}%' : '{value.toLocaleString()}',
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
        pointStart: 0,
      },
    },
    legend: { enabled: true },
    credits: {
      enabled: false,
    },
    series: series.map((s) => ({
      color: s.color,
      name: s.name,
      minPointLength: 20,
      data: s.data.map((d) => ({
        y: d.value,
        dataLabels: {
          format: normalized ? `{point.y: ${d.value.toPrecision(4)} %}` : `{point.y: ${d.value.toLocaleString()}}`,
        },
      })),
    })),
  };
  return (
    <div>
      <HighchartsReact options={options} highcharts={Highcharts} />
    </div>
  );
}

BarChart.propTypes = {
  normalized: PropTypes.bool.isRequired,
  height: PropTypes.number,
  title: PropTypes.string.isRequired,
  series: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })),
  })).isRequired,

};

BarChart.defaultProps = {
  height: 200,
};
