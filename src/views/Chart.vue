<template>
  <div style="width: 100%;min-width: 300px;margin-bottom: 25px;">
    <div id="div-chart">
      <canvas id="usersChart" width="1" height="1"></canvas>
      <div id="js-legend" class="scrollbar-oceanlink"></div>
    </div>
  </div>
  
</template>

<script setup>
import $ from 'jquery'
import Chart from "../assets/styles/js/Chart.js"
import { ref, watchEffect } from "vue"

const props = defineProps(['task', 'list_sub_task'])

const getRandomColor = () => { 
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const myChart = ref(null)

const chart = () => {
  // Xu ly them mau
  let countTask, dataTask, arr_valueColor, v_OneColor, Dataslice, v_vitri;
  v_vitri = 10;
  countTask = props.list_sub_task.length;
  dataTask = props.list_sub_task;
  arr_valueColor = ['#F5F5F5', '#90E0EF', '#00B4D8', '#0077B6', '#03045E', '#FFD60A', '#FC2417', '#F4874A', '#96EF25', '#FF0C8F', '#FC59FF'];

  if (countTask > v_vitri) {
    Dataslice = dataTask.slice(v_vitri);
    for (let i = 0; i < Dataslice.length; i++) {
      v_OneColor = getRandomColor();
      arr_valueColor.push(v_OneColor);
    }
  }

  const xValues = props.list_sub_task
    .filter(item => item.type == "1")
    .map(item => item.sub_task_name)
  let xValuess = [];
  let xv;
  let ky_tu_repace = 15;
  for (let i = 0; i < xValues.length; i++) {
    if (xValues[i].length > ky_tu_repace) {
      xv = xValues[i].slice(0, ky_tu_repace) + "...";
      xValuess.push(xv);
    } else {
      xValuess.push(xValues[i]);
    }
  }
  const data = props.list_sub_task
    .filter(item => item.type == "1")
    .map(item => item.progress_task)
  data.unshift(100 - props.task.progress)
  if (xValuess != '' && xValuess != null && xValuess != undefined) {
    xValuess.unshift("Chưa hoàn thành")
  } else {
    xValues.unshift("Chưa hoàn thành")
  }
  $('#usersChart').remove()
  const canvasElement = '<canvas id="usersChart" width="1" height="1"></canvas>';
  $('#div-chart').append(canvasElement);
  myChart.value = new Chart($('#usersChart'), {
    type: 'RoundedDoughnut',
    data: {
      labels: xValuess,
      datasets: [{
        data,
        backgroundColor: arr_valueColor,
        borderWidth: 0,
      }]
    },
    options: {
      cutoutPercentage: 70,
      layout: {
        padding: {
          left: 0
        }
      },
      elements: {
        center: {
          text: props.task.progress + '%',
          color: '#9FAFC6',
          fontStyle: 'NotoSansJP-Regular',
          sidePadding: 0,
          minFontSize: 20,
          lineHeight: 25,
          fontSize: 12,
        }
      },
      legend: {
        display: false,
        position: 'right',
        labels: {
          boxWidth: 20,
          padding: 25,
        }
      },

      legendCallback: function(chart) { // tạo legend tùy chỉnh
        var text = [];
        for (var i = 0; i < chart.data.labels.length; i++) {
          if (i == 0) {
            text.push('<ul class="' + chart.id + '-legend">');
          }
          text.push('<li>');
          if (chart.data.labels[i]) {
            text.push('<div class="color_chart" style="background-color:' + arr_valueColor[i] + '"></div>');
            text.push(chart.data.labels[i]);
          }
          text.push('</li>');
          if (i == chart.data.labels.length) {
            text.push('</ul>');
          }
        }
        return text.join("");
      }
      
    }
  })
}

watchEffect(() => {
  chart();
  var legend = myChart.value.generateLegend();
  var legendContainer = document.getElementById('js-legend');
  if (legend != '' && legend != 'null' && legend != undefined) {
    legendContainer.innerHTML = legend;
    legendContainer.style.overflow = 'auto';
    legendContainer.style.width = 'calc(100% - 15px)';
    legendContainer.style.height = '100%';
  }
});

Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      var ctx = chart.chart.ctx;

      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var maxFontSize = centerConfig.maxFontSize || 75;
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
      ctx.font = "30px " + fontStyle;

      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      var minFontSize = centerConfig.minFontSize;
      var lineHeight = centerConfig.lineHeight || 25;
      var wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse + "px " + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }

      var words = txt.split(' ');
      var line = '';
      var lines = [];

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > elementWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }

      centerY -= (lines.length / 2) * lineHeight;

      for (var n = 0; n < lines.length; n++) {
        ctx.fillText(lines[n], centerX, centerY);
        centerY += lineHeight;
      }
      ctx.fillText(line, centerX, centerY);
    }
  }
})
Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut)
Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
  draw: function (ease) {
    var ctx = this.chart.ctx;
    var easingDecimal = ease || 1;
    var arcs = this.getMeta().data;
    Chart.helpers.each(arcs, function (arc, i) {
      arc.transition(easingDecimal).draw();

      var pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
      var pColor = pArc._view.backgroundColor;

      var vm = arc._view;
      var radius = (vm.outerRadius + vm.innerRadius) / 2;
      var thickness = (vm.outerRadius - vm.innerRadius) / 2;
      var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
      var angle = Math.PI - vm.endAngle - Math.PI / 2;

      ctx.save();
      ctx.translate(vm.x, vm.y);

      ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
      ctx.beginPath();
      ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = vm.backgroundColor;
      ctx.beginPath();
      ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
      ctx.fill();

      ctx.restore();
    });
  }
})
</script>

<style scoped></style>