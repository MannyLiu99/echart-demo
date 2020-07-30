<template>
  <div class="chart-box">
    <detail-header></detail-header>
    <div
      ref="chartStationRealTime"
      style="height: 200px;"
      class="chart-content"
    ></div>
  </div>
</template>

<script>
import DetailHeader from "@/components/DetailHeader";
export default {
  components: { DetailHeader },
  props: {
    echartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      option: {
        color: ["#7ED068", "#6E768B", "#FE7E01", "#FECA00"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          show: false,
          orient: "vertical",
          x: "55%",
          y: "center",
          itemWidth: 10,
          itemHeight: 10,
          align: "left",
          textStyle: {
            fontSize: 30,
            color: "#ffffff",
          },
        },
        title: [
          {
            text: "{name|合计站点}\n{val|100}",
            top: "center",
            x: "center",
            y: "center",
            textStyle: {
              rich: {
                name: {
                  fontSize: 12,
                  fontFamily: "PingFangSC-Regular,PingFang SC",
                  fontWeight: 400,
                  color: "#AAB5C4",
                  padding: [6, 0, 0, 0],
                },
                val: {
                  color: "#f4f8ff",
                  fontSize: 24,
                  fontFamily: "DINAlternate-Bold,DINAlternate",
                  fontWeight: "bold",
                },
              },
            },
          },
        ],
        series: [
          {
            name: "站点实时数据",
            type: "pie",
            radius: ["75%", "90%"] /* chart弧度大小 */,
            center: ["50%", "50%"],
            animation: false,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            hoverAnimation: false,
            // 起始角度 0 - 360
            startAngle: 75,

            label: {
              position: "outer",
              alignTo: "labelLine",
              margin: 30,
              distanceToLabelLine: 0,
              formatter: (params) => {
                if (params.dataIndex > 1) {
                  return `{c|${params.value}}{b|${params.name}} {icon|●}`;
                }

                return `{icon|●} {b|${params.name}}{c|${params.value}}`;
              },
              rich: {
                color: "#CFD6E2",
                icon: {
                  fontSize: 14,
                },
                b: {
                  fontSize: 12,
                  padding: [0, 2, 0, 0],
                  color: "#CFD6E2",
                  fontFamily: "PingFangSC-Regular,PingFang SC",
                  fontWeight: 400,
                },
                c: {
                  fontSize: 12,
                  padding: [0, 2, 0, 0],
                  fontFamily: "PingFangSC-Regular,PingFang SC",
                  fontWeight: 400,
                  color: "#CFD6E2",
                },
              },
            },
            labelLine: {
              show: true,
              length: 15,
              length2: "5%",
            },
            data: [
              { value: 45, name: "优" },
              { value: 10, name: "良" },
              { value: 15, name: "轻度" },
              { value: 30, name: "离线" },
            ],
            itemStyle: {
              borderWidth: 3,
              borderColor: "#285080",
            },
          },
          {
            type: "pie",
            // TODO splitline
            name: "最外层细圆环2",
            right: "35%",
            tooltip: {
              show: false,
            },
            hoverAnimation: false,
            radius: ["99%", "99%"],
            center: ["77%", "50%"],
            itemStyle: {
              borderColor: "#294F7B",
              borderWidth: 1,
            },
            label: {
              show: false,
            },
            data: [100],
          },
        ],
      },
    };
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.chartStationRealTime);
    this.myChart.setOption(this.option);
  },
};
</script>

<style></style>
