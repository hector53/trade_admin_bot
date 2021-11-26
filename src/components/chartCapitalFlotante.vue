<script>
import Chart from 'chart.js/auto'

export default {
  extends: Line,
  data() {
    return {
      datos: {
          labels: [15,30,45,60],
      datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
      }]
      },
      options: {

      }
    };
  },
  ready() {

    this.renderChart(
      {
            labels: [15,30,45,60],
            datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
            }]
      }
    );
  },
};
</script>
