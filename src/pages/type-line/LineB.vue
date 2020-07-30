<template>
  <div class="chart-box">
    <detail-header></detail-header>
    <div class="tendency-box">
      <el-radio-group v-model="radio" class="radio-group">
        <el-radio
          v-for="radio in radioGroup"
          :key="radio.key"
          :label="radio.key"
          >{{ radio.value }}</el-radio
        >
      </el-radio-group>
      <!-- <tendency-echart
        :echart-data="echartData"
        :data-type="radio"
      ></tendency-echart> -->
    </div>
    <div ref="lineB" style="height: 400px" class="chart-content"></div>
  </div>
</template>
<script>
import DetailHeader from "@/components/DetailHeader";
import moment from "moment";
import { dataLineB } from "../data";
export default {
  data() {
    return {
      //   colors: ["#fff", "rgba(109, 141, 181, 0.4)", "#1c3e6b"],
      radioGroup: [
        { key: "GM", value: "气态物趋势图" },
        { key: "PM", value: "颗粒物趋势图" },
      ],
      radio: "GM",
      colors: ["#597CA3", "#FF65B2", "#39B8FF", "#FFB56C", "#43FC45"],
      //   右侧偏移量
      offsets: this.createOffsets(30, 4),
      typeArr: ["GM", "PM"],
      myChart: "",
    };
  },
  components: {
    DetailHeader,
  },
  methods: {
    handleEchartOption(data, type) {
      if (!data || data.length <= 0) {
        return {};
      }
      const tempData = this.handleData(data);

      const tooltip = {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
      };
      const grid = {
        right: "8%",
        left: 0,
        bottom: "7%",
        top: "14%",
        containLabel: true,
      };
      const xAxis = [
        {
          type: "category",
          axisTick: {
            alignWithLabel: true,
            color: "#597CA3",
          },
          axisLabel: {
            rotate: -45,
            color: "#C5CCD8",
          },
          axisLine: {
            lineStyle: {
              color: "#597CA3",
            },
          },
          data: tempData.dataTime,
        },
      ];
      const yAxis = this.handleAxis(type);
      const series = this.handleSeries(tempData, type);

      const option = {
        color: this.colors,
        tooltip,
        grid,
        xAxis,
        yAxis,
        series,
      };

      return option;
    },
    handleSeries(data, type) {
      let series = [];
      if (type === this.typeArr[0]) {
        // 气态物
        series = [
          {
            name: "AQI",
            type: "bar",
            yAxisIndex: 0,
            barCategoryGap: "80%",
            data: data.dataAQI,
          },
          {
            name: "CO",
            type: "line",
            yAxisIndex: 1,
            data: data.dataCO,
            symbolSize: 1,
          },
          {
            name: "SO2",
            type: "line",
            yAxisIndex: 2,
            data: data.dataSO2,
            symbolSize: 1,
          },
          {
            name: "NO2",
            type: "line",
            yAxisIndex: 3,
            data: data.dataNO2,
            symbolSize: 1,
          },
          {
            name: "O3",
            type: "line",
            yAxisIndex: 4,
            data: data.dataO3,
            symbolSize: 1,
          },
        ];
      } else {
        // 固态物
        series = [
          {
            name: "AQI",
            type: "bar",
            yAxisIndex: 0,
            barCategoryGap: "80%",
            data: data.dataAQI,
          },
          {
            name: "PM25",
            type: "line",
            yAxisIndex: 1,
            data: data.dataPM25,
            symbolSize: 1,
          },
          {
            name: "PM10",
            type: "line",
            yAxisIndex: 2,
            data: data.dataPM10,
            symbolSize: 1,
          },
        ];
      }
      return series;
    },
    handleAxis(type) {
      let axis = {};
      if (type === this.typeArr[0]) {
        // 气态物
        axis = [
          {
            type: "value",
            name: "AQI",
            min: 0,
            position: "left",
            axisLine: {
              lineStyle: {
                color: this.colors[0],
              },
            },
            axisLabel: {
              formatter: "{value}",
              color: "#C5CCD8",
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "CO",
            min: 0,
            position: "right",
            offset: this.offsets[0],
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: this.colors[1],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "SO2",
            min: 0,
            position: "right",
            offset: this.offsets[1],
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: this.colors[2],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "NO2",
            min: 0,
            position: "right",
            offset: this.offsets[2],
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: this.colors[3],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "O3",
            min: 0,
            position: "right",
            offset: this.offsets[3],
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: this.colors[4],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ];
      } else {
        // 固态物
        axis = [
          {
            type: "value",
            name: "AQI",
            min: 0,
            position: "left",
            axisLine: {
              lineStyle: {
                color: this.colors[0],
              },
            },
            axisLabel: {
              formatter: "{value}",
              color: "#C5CCD8",
            },
            splitLine: {
              show: false,
            },
          },
          {
            type: "value",
            name: "PM25",
            min: 0,
            position: "right",
            offset: this.offsets[0],
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: this.colors[1],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "PM10",
            min: 0,
            position: "right",
            offset: this.offsets[1],
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: this.colors[2],
              },
            },
            axisLabel: {
              formatter: "{value}",
            },
          },
        ];
      }
      return axis;
    },
    /** 数据处理 */
    handleData(data) {
      // 接口返回的是7天的，目前仅需24h的
      const tempData = Object.assign([], data);
      let subData = tempData.reverse().splice(0, 24);
      subData = subData.reverse();
      const dataTime = [];
      const dataAQI = [];
      const dataCO = [];
      const dataNO2 = [];
      const dataO3 = [];
      const dataPM10 = [];
      const dataPM25 = [];
      const dataSO2 = [];
      for (let i = 0; i < subData.length; i += 1) {
        dataTime.push(moment(subData[i].dataTime).format("DD日HH时"));
        dataAQI.push(subData[i].AQI);
        dataCO.push(subData[i].CO);
        dataNO2.push(subData[i].NO2);
        dataO3.push(subData[i].O3);
        dataPM10.push(subData[i].PM10);
        dataPM25.push(subData[i].PM25);
        dataSO2.push(subData[i].SO2);
      }
      return {
        // 颗粒物
        dataPM10,
        dataPM25,
        // 气态物
        dataCO,
        dataNO2,
        dataO3,
        dataSO2,
        // 时间
        dataTime,
        dataAQI,
      };
    },
    // 右侧y轴偏移量
    createOffsets(stepOffset, size) {
      const res = [];
      for (let i = 0; i < size; i += 1) {
        res.push(i * stepOffset);
      }
      return res;
    },
  },
  created() {},
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.lineB);
    // 清除echart缓存
    this.myChart.clear();
    this.myChart.setOption(this.handleEchartOption(dataLineB, this.radio));
  },
  watch: {
    radio(newVal) {
      // 清除echart缓存
      this.myChart.clear();
      this.myChart.setOption(this.handleEchartOption(dataLineB, newVal));
    },
  },
};
</script>
