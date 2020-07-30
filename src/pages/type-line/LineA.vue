<template>
  <div class="chart-box">
    <detail-header></detail-header>
    <div ref="lineA" style="height: 400px" class="chart-content"></div>
  </div>
</template>
<script>
import DetailHeader from "@/components/DetailHeader";
import moment from "moment";
import { transformFactorReplace, getColor } from "@/utils/common";
import { dataLineA } from "../data";
export default {
  data() {
    return {
      colors: ["#fff", "rgba(109, 141, 181, 0.4)", "#1c3e6b"],
    };
  },
  components: {
    DetailHeader,
  },
  methods: {
    /** 设置Echart SeriesData数据 */
    handleSeriesData(result, year) {
      const seriesData = [];
      const xAxisData = year
        ? [
            `${year}-01`,
            `${year}-02`,
            `${year}-03`,
            `${year}-04`,
            `${year}-05`,
            `${year}-06`,
            `${year}-07`,
            `${year}-08`,
            `${year}-09`,
            `${year}-10`,
            `${year}-11`,
            `${year}-12`,
          ]
        : [
            moment().format("YYYY-MM"),
            moment()
              .add(-1, "M")
              .format("YYYY-MM"),
            moment()
              .add(-2, "M")
              .format("YYYY-MM"),
            moment()
              .add(-3, "M")
              .format("YYYY-MM"),
            moment()
              .add(-4, "M")
              .format("YYYY-MM"),
            moment()
              .add(-5, "M")
              .format("YYYY-MM"),
            moment()
              .add(-6, "M")
              .format("YYYY-MM"),
            moment()
              .add(-7, "M")
              .format("YYYY-MM"),
            moment()
              .add(-8, "M")
              .format("YYYY-MM"),
            moment()
              .add(-9, "M")
              .format("YYYY-MM"),
            moment()
              .add(-10, "M")
              .format("YYYY-MM"),
            moment()
              .add(-11, "M")
              .format("YYYY-MM"),
          ];
      for (let i = 0; i < result.length; i += 1) {
        const { pollutionValue, pubTime } = result[i];
        for (let j = 0; j < xAxisData.length; j += 1) {
          const element = xAxisData[j];
          if (element === pubTime) {
            seriesData.push(pollutionValue);
          }
        }
      }
      return { seriesData, xAxisData };
    },
    /** 设置Echart tooltip formatter */
    handleTooltipFormatter(params, result, year) {
      for (let i = 0; i < result.length; i += 1) {
        const element = result[i];
        const { pubTime, pollution, pollutionValue, pollutions } = element;
        if (parseInt(pubTime, 10) === params[0].dataIndex + 1) {
          return `<div style="width:120px;text-align:left">${year}-${params[0]
            .dataIndex +
            1}<br>${pollution}:${pollutionValue}<br>首要污染物:${transformFactorReplace(
            pollutions || "无"
          )}</div>`;
        }
      }
      return null;
    },
    /** 设置Echart数据 */
    handleEchartOption(result, pollutant, year) {
      if (result.length === 0) {
        return {};
      }
      const that = this;
      const { seriesData, xAxisData } = this.handleSeriesData(result, year);
      const echartOption = {
        tooltip: {
          trigger: "axis",
          formatter(params) {
            return that.handleTooltipFormatter(params, result, year);
          },
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              backgroundColor: this.colors[2],
              iconStyle: {
                borderColor: this.colors[0],
              },
            },
          },
        },
        legend: {
          top: 20,
        },
        grid: {
          top: 20,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: this.colors[1],
            },
          },
          axisLabel: {
            color: this.colors[0],
          },
          axisLine: {
            lineStyle: {
              color: this.colors[1],
            },
          },
        },
        yAxis: {
          type: "value",
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: this.colors[1],
            },
          },
          axisLabel: {
            color: this.colors[0],
          },
          axisLine: {
            lineStyle: {
              color: this.colors[1],
            },
          },
          splitLine: {
            lineStyle: {
              color: this.colors[1],
            },
          },
        },
        series: [
          {
            type: "line",
            symbol: "circle",
            // 设定实心点的大小
            symbolSize: 10,
            itemStyle: {
              normal: {
                lineStyle: {
                  // 折线的颜色
                  color: "#7db5ec",
                },
                shadowBlur: 10,
                shadowColor: "rgba(120, 36, 50, 0.5)",
                shadowOffsetY: 5,
                color(e) {
                  const obj = getColor(
                    pollutant.toUpperCase(),
                    parseFloat(e.data)
                  );
                  return obj.color;
                },
              },
            },
            data: seriesData,
            smooth: true,
          },
        ],
      };
      return echartOption;
    },
  },
  created() {},
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.lineA);
    this.myChart.setOption(
      this.handleEchartOption(dataLineA || [], "AQI", "2020")
    );
  },
};
</script>
