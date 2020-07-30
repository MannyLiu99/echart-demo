<template>
  <div class="chart-box">
    <detail-header></detail-header>

    <div ref="calendarChart" style="height: 300px" class="chart-content"></div>
  </div>
  <!-- 空气质量日历 -->
</template>

<script>
import { transformFactorReplace } from "@/utils/common";
import moment from "moment";
import { dataCalendarA } from "../data";
import DetailHeader from "@/components/DetailHeader";

export default {
  components: { DetailHeader },
  data() {
    return {
      myChart: {},
      echartData: {},
      chartTextColor: "#CFD6E2",
      year: "2020",
      pollution: "aqi",
    };
  },
  props: [],
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.calendarChart);
    this.myChart.setOption(
      this.handleEchartOption(dataCalendarA, this.year, this.pollution)
    );
  },
  methods: {
    getVirtulData(result, year, pollution) {
      const data = [];
      for (let i = 0; i < result.months.length; i += 1) {
        const months = result.months[i];
        const month = months.month.replace("月", "");
        for (let j = 0; j < months.list.length; j += 1) {
          const list = months.list[j];
          data.push([
            moment(`${year}-${month}-${j + 1}`).format("YYYY-MM-DD"),
            parseFloat(list[pollution]),
          ]);
        }
      }
      return data;
    },
    /** 设置Tooltip：鼠标hover提示框内容 */
    handleTooltip(result, param) {
      const date = `日期：${moment(param.data[0]).format("YYYY年MM月DD日")}`;
      let airLevel = `空气质量等级：`;
      let primary = `首要污染物：`;
      let AQI = `AQI：`;
      let PM25 = `PM₂.₅(μg/m³)：`;
      let PM10 = `PM₁₀(μg/m³)：`;
      let SO2 = `SO₂(μg/m³)：`;
      let NO2 = `NO₂(μg/m³)：`;
      let CO = `CO(mg/m³)：`;
      let O3 = `O₃(μg/m³)：`;
      for (let i = 0; i < result.months.length; i += 1) {
        const months = result.months[i];
        const month = months.month.replace("月", "");
        for (let j = 0; j < months.list.length; j += 1) {
          const list = months.list[j];
          const {
            quality,
            pollutions,
            aqi,
            co,
            no2,
            o3,
            pm10,
            pm25,
            so2,
            pubtime,
          } = list;
          if (
            moment(param.data[0]).format("MM-DD") ===
            moment(`${month}-${pubtime}`).format("MM-DD")
          ) {
            airLevel += quality;
            primary += transformFactorReplace(pollutions);
            AQI += aqi;
            PM25 += pm25;
            PM10 += pm10;
            SO2 += so2;
            NO2 += no2;
            CO += co;
            O3 += o3;
          }
        }
      }
      const tip = `<div style="width:160px;text-align:left;">${date}<br>${airLevel}<br>${primary}<br>${AQI}<br>${PM25}<br>${PM10}<br>${SO2}<br>${NO2}<br>${CO}<br>${O3}</div>`;
      return tip;
    },
    /** 设置title */
    handleTitle(result, year) {
      let excellent = 0;
      let well = 0;
      let mild = 0;
      let moderate = 0;
      let heavy = 0;
      let severity = 0;
      for (let i = 0; i < result.months.length; i += 1) {
        const months = result.months[i];
        const {
          excellentDays,
          wellDays,
          mildDays,
          moderateDays,
          heavyDays,
          severityDays,
        } = months;
        excellent += excellentDays;
        well += wellDays;
        mild += mildDays;
        moderate += moderateDays;
        heavy += heavyDays;
        severity += severityDays;
      }
      const totalDay = this.handleTotalDay(year);
      const noneDay =
        totalDay - excellent - well - mild - moderate - heavy - severity;
      return `${year}年    总计${totalDay}天，优${excellent}天， 良${well}天， 轻度污染${mild}天， 中度污染${moderate}天， 重度污染${heavy}天， 严重污染:${severity}天， 无数据${noneDay}天`;
    },
    /** 总天数计算 */
    handleTotalDay(year) {
      if (year === moment().format("YYYY")) {
        return moment().diff(moment(moment().format("YYYY-01-01")), "days");
      }
      return moment(moment().format("YYYY-12-31")).diff(
        moment(moment().format("YYYY-01-01")),
        "days"
      );
    },
    /** 根据因子显示对应范围颜色 */
    handleShowColor(pollution) {
      let color = [];
      let max = 0;
      switch (pollution) {
        case "aqi":
          color = [
            "#00E400",
            "#FFFF00",
            "#FF7E00",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 500;
          break;
        case "pm25":
          color = [
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 350;
          break;
        case "pm10":
          color = [
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 600;
          break;
        case "so2":
          color = [
            "#00E400",
            "#00E400",
            "#00E400",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 2000;
          break;
        case "co":
          color = [
            "#00E400",
            "#FFFF00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 110;
          break;
        case "no2":
          color = [
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FFFF00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 2500;
          break;
        case "o3":
          color = [
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#00E400",
            "#FFFF00",
            "#FFFF00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF7E00",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#FF0000",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#99004C",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
            "#990023",
          ];
          max = 1000;
          break;

        default:
          break;
      }
      return { color, max };
    },

    /** 设置Echart数据 */
    handleEchartOption(result, year, pollution) {
      const that = this;
      if (result.length === 0) {
        return {};
      }
      // const { xAxisData, series } = handleEchartSeriesData(result);
      const { color, max } = this.handleShowColor(pollution);
      const echartOption = {
        title: {
          top: 20,
          // left: 'left',
          left: 0,
          textStyle: {
            fontSize: 14,
            fontWeight: "normal",
            fontFamily: "PingFang-SC-Regular",
            color: this.chartTextColor,
          },
          text: this.handleTitle(result, year),
          // subtext: `更新于${moment().format('YYYY-MM-DD HH:ss')}`,
        },
        tooltip: {
          trigger: "item",
          position(point, params, el, elRect, size) {
            // 固定在顶部
            return [
              +(point[0] > size.viewSize[0] - 180
                ? point[0] - 200
                : point[0] + 20),
              +(point[1] > size.viewSize[1] - 180
                ? point[1] - 200
                : point[1] - 100),
            ];
          },
          formatter(param) {
            return that.handleTooltip(result, param);
          },
        },
        visualMap: {
          min: 0,
          max,
          show: false,
          splitNumber: color.length,
          type: "piecewise",
          orient: "horizontal",
          left: "center",
          top: 65,
          inRange: {
            color,
          },
          textStyle: {
            color: this.chartTextColor,
          },
        },
        calendar: {
          top: 70,
          left: 30,
          right: 0,
          bottom: 0,
          cellSize: ["auto", 24],
          range: year,
          splitLine: {
            lineStyle: {
              color: "#f0faf8",
              width: 2,
            },
          },
          itemStyle: {
            color: "#b8b8b8",
            borderWidth: 1,
            borderColor: "#6AB2A8",
          },
          yearLabel: {
            show: false,
            textStyle: {
              fontSize: 30,
              color: this.chartTextColor,
            },
          },
          dayLabel: {
            nameMap: "cn",
            textStyle: {
              color: this.chartTextColor,
            },
          },
          monthLabel: {
            // position: 'end',
            nameMap: "cn",
            textStyle: {
              color: this.chartTextColor,
            },
            // align: 'left',
            // formatter(param) {
            //   return handleMonthLabelFormatter(result, param);
            // },
          },
        },
        series: {
          type: "heatmap",
          coordinateSystem: "calendar",
          emphasis: {
            itemStyle: {
              borderWidth: 2,
              borderType: "solid",
              borderColor: "blue",
            },
          },
          data: this.getVirtulData(result, year, pollution),
        },
      };
      return echartOption;
    },
  },
  watch: {},
};
</script>
