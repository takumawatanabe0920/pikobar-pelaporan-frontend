<template>
  <v-card
    class="chart-test-area"
    outlined
  >
    <v-card-title class="title ml-0 black--text">
      {{ $t('label.total_test_result') }} {{ $t('label.based').toLowerCase() }} {{ $t('label.area') }}
    </v-card-title>
    <v-divider class="mt-0 mb-2" />
    <v-card-text>
      <div class="chartWrapper">
        <div class="chartAreaWrapper">
          <chart-bar-horizontal
            v-if="loaded"
            ref="horizontalBarChart"
            :chart-data="chartData"
            :options="chartOptions"
            :styles="chartStyles"
            :name="'chart-test-area'"
            @callbackFooter="setFooter"
          />
        </div>
        <canvas
          ref="chartXAxis"
          height="350"
        />
        <div
          ref="chartLegend"
          class="mt-2"
        >
          <div class="chart-legend d-flex justify-center">
            <div
              v-for="(legend, index) in legends"
              :key="legend.label"
              class="d-flex mr-3"
              @click="onClickLegend(index)"
            >
              <div
                class="box mr-2"
                :style="{ backgroundColor: legend.backgroundColor }"
              />
              <span :ref="'chartLegendLabel' + index">{{ legend.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ChartTestArea',
  props: {
    tabActive: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loaded: false,
      charts: null,
      legends: [],
      htmlLegend: null,
      chartStyles: {},
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                drawBorder: false
              },
              scaleLabel: {
                display: false
              },
              ticks: {
                precision: 0
              },
              stacked: true
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              stacked: true
            }
          ]
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            boxWidth: 10
          }
        },
        legendCallback: (chart) => {
          this.charts = chart
          this.legends = chart.data.datasets
        },
        tooltips: {
          displayColors: false,
          mode: 'index',
          intersect: false,
          tooltipCaretSize: 0
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        layout: {
          padding: {
            right: 50
          }
        }
      }
    }
  },
  watch: {
    'tabActive': {
      handler(value) {
        this.tabActive = value
        this.filterTab()
        this.$refs.horizontalBarChart.update()
      },
      deep: true
    },
    '$refs'() {
      this.$refs.horizontalBarChart.update()
    }
  },
  mounted() {
    this.filterTab()
  },
  methods: {
    filterTab() {
      this.loaded = true
      if (this.tabActive === 'all') {
        this.getDataAll()
      } else if (this.tabActive === 'rapid') {
        this.getDataRapid()
      } else if (this.tabActive === 'pcr') {
        this.getDataPCR()
      }
    },
    getDataAll() {
      const area = [
        'Kota Bandung',
        'Kab. Bandung',
        'Kab. Bandung Barat',
        'Kab. Ciamis',
        'Kab. Garut',
        'Kab. Cirebon',
        'Kab. Bogor',
        'Kota Bogor',
        'Kota Sukabumi',
        'Kota Depok',
        'Kota Bekasi',
        'Kota Tasikmalaya',
        'Kab. Tasikmalaya',
        'Kab. Bekasi',
        'Kota Banjar',
        'Kota Depok',
        'Kota Bekasi',
        'Kota Tasikmalaya',
        'Kab. Tasikmalaya',
        'Kab. Bekasi',
        'Kab. Tasikmalaya',
        'Kab. Bekasi',
        'Kota Banjar',
        'Kota Depok',
        'Kota Bekasi',
        'Kota Tasikmalaya',
        'Kab. Tasikmalaya'
      ]
      const one = []
      const two = []

      this.setHeight(area.length)

      for (let index = 1; index <= 27; index++) {
        one.push(this.randomNumber())
        two.push(this.randomNumber())
      }

      this.chartData.labels = area

      this.chartData.datasets = []
      this.chartData.datasets.push(
        {
          label: this.$t('label.rapid_test_id'),
          backgroundColor: '#27AE60',
          hoverBackgroundColor: '#27AE60',
          data: one,
          hidden: false,
          barThickness: 15
        },
        {
          label: this.$t('label.pcr'),
          backgroundColor: '#F2C94C',
          hoverBackgroundColor: '#F2C94C',
          data: two,
          hidden: false,
          barThickness: 15
        }
      )
    },
    getDataRapid() { },
    getDataPCR() { },
    randomNumber() {
      return Math.floor(Math.random() * 101)
    },
    setFooter(value) {
      const targetCtx = this.$refs.chartXAxis.getContext('2d')
      targetCtx.canvas.width = value.copyWidth
      targetCtx.canvas.height = 350
      targetCtx.fillStyle = '#ffffff'
      targetCtx.fillRect(0, 325, value.copyWidth, 350)
      targetCtx.drawImage(value.sourceCanvas, 0, value.copyHeight - (20 * value.scale), value.copyWidth * value.scale,
        value.copyHeight * value.scale, 0, (350 - 20), value.copyWidth, value.copyHeight)
    },
    onClickLegend(datasetIndex) {
      const meta = this.charts.getDatasetMeta(0)
      let result
      if (meta.data[datasetIndex].hidden === true) {
        result = false
      } else {
        result = true
      }

      if (result) {
        this.chartData.datasets[datasetIndex].hidden = true
        meta.data[datasetIndex].hidden = true
        this.$refs['chartLegendLabel' + datasetIndex][0].style.textDecoration = 'line-through'
      } else {
        this.chartData.datasets[datasetIndex].hidden = false
        meta.data[datasetIndex].hidden = false
        this.$refs['chartLegendLabel' + datasetIndex][0].style.textDecoration = 'none'
      }
      this.$refs.horizontalBarChart.update()
    },
    setHeight(total) {
      const limit = 13

      let height
      if (total > 0 && total <= limit) {
        height = '100%'
      } else if (total > limit && total <= limit * 2) {
        height = '200%'
      } else if (total > limit * 2 && total <= limit * 3) {
        height = '300%'
      } else if (total > limit * 3 && total <= limit * 4) {
        height = '400%'
      }

      this.chartStyles = {
        height,
        position: 'relative'
      }
    }
  }
}
</script>

<style lang="scss">
.chart-test-area {
  .title {
    font-size: 16px !important;
  }

  .chartWrapper {
    position: relative;
  }

  .chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }

  .chartAreaWrapper {
    height: 350px;
    overflow-y: scroll;
  }

  .chart-legend {
    .box {
      width: 12px;
      height: 12px;
      border-radius: 0;
      margin-top: 3px;
    }
  }
}

.chart-test-area >>> #chartjs-tooltip {
  z-index: 999999 !important;
}
</style>
