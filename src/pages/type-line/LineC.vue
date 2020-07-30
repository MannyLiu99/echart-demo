<template>
  <div class="chart-box">
    <detail-header></detail-header>
    <div ref="monitorEchart" style="height: 200px;" class="chart-content"></div>
  </div>
</template>

<script>
import DetailHeader from "@/components/DetailHeader";
import { dataLineC } from "../data";
export default {
  components: { DetailHeader },
  //   props: ["echartData"],
  data() {
    return {
      myChart: "",
      colors: ["#AAB5C4", "#798695"],
      //   今天，昨天，阈值
      lineColors: ["#FFA128", "#00B886", "#FF4928"],
      echartData: "",
    };
  },
  methods: {
    handleEchartOption() {
      const option = {
        color: this.lineColors,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
        },
        grid: {
          top: "10%",
          left: 0,
          right: 10,
          bottom: 0,
          containLabel: true,
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dataLineC.time,
          axisTick: {
            show: false,
            alignWithLabel: true,
            lineStyle: {
              color: this.colors[0],
            },
          },
          axisLabel: {
            color: this.colors[0],
          },
          axisLine: {
            lineStyle: {
              color: this.colors[0],
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} KW",
            color: this.colors[0],
          },
          axisPointer: {
            snap: true,
          },
          axisTick: {
            show: false,
            alignWithLabel: true,
            lineStyle: {
              color: this.colors[0],
            },
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: this.colors[0],
            },
          },
        },

        series: [
          {
            name: "今日",
            type: "line",
            data: dataLineC.today,
            symbolSize: 1,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,161,40,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(255,161,40,0)",
                  },
                ],
                global: false,
              },
            },
          },
          {
            name: "昨日",
            type: "line",
            data: dataLineC.yesterday,
            symbolSize: 1,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0,184,134,0.3)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0,184,134,0)",
                  },
                ],
                global: false,
              },
            },
          },
          {
            name: "阈值",
            type: "line",
            data: dataLineC.threshold,
            symbolSize: 1,
            hoverAnimation: false,
            lineStyle: {
              type: "dotted",
            },
            markArea: this.handleMarkArea(dataLineC.plan),
          },
        ],
      };
      return option;
    },
    handleMarkArea(markAreaData) {
      if (!markAreaData || markAreaData.length <= 0) {
        return {};
      }
      const markArea = {
        label: {
          // show: true,
          position: "insideTopLeft",
          color: this.colors[1],
        },
        itemStyle: {
          color: "rgba(0,0,0,0.2)",
        },
        data: [],
      };
      const markData = [];
      for (let i = 0; i < markAreaData.length; i += 1) {
        const temp = [
          {
            name: markAreaData[i].planName,
            xAxis: markAreaData[i].planData[0],
          },
          {
            xAxis: markAreaData[i].planData[1],
          },
        ];
        markData.push(temp);
      }
      markArea.data = markData;
      console.log("停产计划", markArea);

      return markArea;
    },
  },
  watch: {
    echartData(newVal) {
      console.log(newVal);
    },
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.monitorEchart);
    this.myChart.setOption(this.handleEchartOption(dataLineC));
  },
};
</script>
<style lang="scss" scoped></style>
