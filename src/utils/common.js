/**
 * Description: reauired, the file description, reference link, etc.
 * Created Date: 2020-06-10, 3:15:28 PM
 * Author: Liu Man <lm@hcttop.com>
 * -----
 * Last Modified: 2020-06-10, 3:15:28 PM
 * Modified By: Liu Man <lm@hcttop.com>
 * -----
 * Copyright (c) 2020-2020 hcttop
 * -----
 * HISTORY:
 * Date             	By  	Comments
 * ------------------	----	----------------------------------------------------------
 */
// TODO 直接拷贝的，待完善
// import ExportJsonExcel from 'js-export-excel';
// import html2canvas from 'html2canvas';
import {
  pollutionList,
  pollutionRange,
  temperatureList,
  humidityList,
  windSpeedList,
} from "./pollution";
/* eslint-disable */
export const baseConfig = {
  /** 默认城市 511300000000 南充市 */
  defaultAreaCode: "511300000000",
  defaultAreaName: "南充市",
};

/**
 *  根据值获取颜色
 * @param type
 * @param value 'number'
 * @return 颜色 '#00E400' name: 程度
 */
export const getColor = (type, value) => {
  if (type === "windDirection") return {};
  // 不传值或者不是number, 设置默认值
  const valueList = pollutionRange[type];
  if (!value || Number.isNaN(value)) {
    const fakeValue =
      type === "temperature" ? valueList[3] / 2 : valueList[0] / 4;
    return { color: "#C3C3C3", name: "离线", fakeValue };
  }
  // 各种污染物等级指标
  let origin = [];
  const len = pollutionList.length;

  const index = valueList.findIndex((item) => item > value);
  switch (type) {
    case "temperature":
      origin = temperatureList;
      break;
    case "humidity":
      origin = humidityList;
      break;
    case "windSpeed":
      origin = windSpeedList;
      break;
    case "airPressure":
      return { color: "#0068B7", textColor: "#0f2d53", name: "离线" };
    default:
      origin = pollutionList;
      break;
  }
  if (index === -1) return origin[len - 1];
  return origin[index];
};

/**
 * 判断当前站点是否被选中
 * @param {string} stationType 监测站点类型
 * @param {} stationCheckbox
 */
// export const judgeStationChecked = (stationType, stationCheckbox) => {
//   for (let i = 0; i < stationCheckbox.type.length; i++) {
//     const type = stationCheckbox.type[i];
//     for (let j = 0; j < type.length; j++) {
//       const element = type[j];
//       if (element === stationType) {
//         return stationCheckbox.data[i][j];
//       }
//     }
//   }
//   return false;
// };

/**
 * 根据返回的类型判断当前监测站点名字
 * @param {string} stationType 监测站点类型
 */
export const handleStationTypeToName = (stationType) => {
  let stationName = "国控站";
  switch (stationType) {
    case "NATION_CONTROL":
      stationName = "国控站";
      break;

    default:
      break;
  }
  return stationName;
};

/**
 * 生成uuid
 */
// export const uuid = () => {
//   const s = [];
//   const hexDigits = '0123456789abcdef';
//   for (let i = 0; i < 36; i++) {
//     s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
//   }
//   s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
//   s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
//   s[8] = s[13] = s[18] = s[23] = '-';

//   const uuid = s.join('');
//   return uuid;
// };

// map start
// 时间格式化
export const formatTime = (time, fmt) => {
  try {
    if (typeof time === "string") {
      time = time.replace(/-/g, "/");
      time = new Date(time);
    }
    const o = {
      "M+": time.getMonth() + 1, // 月份
      "d+": time.getDate(), // 日
      "h+": time.getHours(), // 小时
      "m+": time.getMinutes(), // 分
      "s+": time.getSeconds(), // 秒
      "q+": Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        `${time.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
      }
    }
  } catch (e) {
    throw new Error(`${e}>>时间格式化失败>>${time}>>${fmt}`);
  }
  return fmt;
};

/**
 *  根据值获取颜色
 * @param type
 * @param value 'number'
 * @return 颜色 '#00E400' name: 程度
 */
export const getColorInfo = (key, value, type) => {
  // type 有值或true表示数据类型为天，不传或false表示数据类型为小时
  const valueList = type ? pollutionRangeDay[key] : pollutionRange[key];
  // const fakeValue = key === 'temperature' ? valueList[3] / 2 : valueList[0] / 4;
  let lixian = null;
  // 处理各种离线值
  switch (value) {
    case null:
    case "":
    case "-":
    case "null":
      lixian = {
        color: "#C3C3C3",
        name: "离线",
        key: "lixian",
        textColor: "#000",
        fakeValue: valueList[0] / 4,
      };
      break;
    default:
      break;
  }
  if (lixian) return lixian;
  // 各种污染物等级指标
  let origin = [];
  switch (key) {
    case "temperature":
      origin = temperatureList;
      break;
    case "humidity":
      origin = humidityList;
      break;
    case "windSpeed":
      origin = windSpeedList;
      break;
    case "rain":
      origin = rainList;
      break;
    case "airPressure":
      return { color: "#1091F4", textColor: "#1091F4" };
    case "TVOC":
      return { color: "#1091F4", textColor: "#1091F4" };
    default:
      origin = pollutionList;
      break;
  }
  const len = origin.length;
  const index = valueList.findIndex((item) => item > +value);
  if (index === -1) return origin[len - 1];
  return origin[index];
};

export const getMapPollutantText = (key, type) => {
  const keyInfo = {
    AQI: "AQI",
    "PM₂.₅": "PM2.5",
    "PM₁₀": "PM10",
    "SO₂": "SO2",
    "NO₂": "NO2",
    CO: "CO",
    "O₃": "O3",
    rain: "rain",
    TVOC: "tvoc",
  };
  let pollutant = keyInfo[key];
  switch (type) {
    case "toUpperCase":
      pollutant = pollutant.toUpperCase();
      break;
    case "toLowerCase":
      pollutant = pollutant.toLowerCase();
      break;
    default:
      break;
  }
  return pollutant;
};
// map end

/**
 * 导出流 ==> 下载文件
 * 接口须设置responseType,不然下载下来的文件为乱码  responseType: 'arraybuffer', //arraybuffer/blob
 * @param data res.data
 * @param fileName 下载的文件名(带后缀) eg. '站点实时数据.xls'
 */
export const downloadStreamToFile = (data, fileName) => {
  const blob = new Blob([data], { type: "application/zip;charset=utf-8" });
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    // 释放URL 对象
    URL.revokeObjectURL(elink.href);
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
};
/** 导出日志为Excel表 */
export const downloadExcel = (result) => {
  const { tableData, tableHeadData, fileName } = result;
  const dataTable = [];
  const sheetFilter = [];
  const sheetHeader = [];
  const option = {};
  for (let i = 0; i < tableData.length; i += 1) {
    const obj = {};
    for (let j = 0; j < tableHeadData.length; j += 1) {
      const element = tableHeadData[j];
      const { name } = element;
      const { dataIndex } = element;
      if (dataIndex !== "" && name !== "操作") {
        obj[name] =
          name === "序号" || dataIndex === "index"
            ? (i + 1).toString()
            : tableData[i][dataIndex];
        if (i === 0) {
          sheetFilter.push(name);
          sheetHeader.push(name);
        }
      }
    }
    dataTable.push(obj);
  }
  option.fileName = fileName;
  option.datas = [
    {
      sheetData: dataTable,
      sheetName: "sheet",
      sheetFilter,
      sheetHeader,
    },
  ];
  const toExcel = new ExportJsonExcel(option);
  toExcel.saveExcel();
};

// rgb to hex
function rgbToHex(r, g, b) {
  const hex = ((r << 16) | (g << 8) | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join("0")}${hex}`;
}

// hex to rgb
function hexToRgb(hex) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`));
  }
  return rgb;
}

// 计算渐变过渡色
export const gradient = (startColor, endColor, step) => {
  // 将 hex 转换为rgb
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);

  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;

  const gradientColorArr = [];
  for (let i = 0; i < step; i += 1) {
    // 计算每一步的hex值
    gradientColorArr.push(
      rgbToHex(
        parseInt(rStep * i + sColor[0]),
        parseInt(gStep * i + sColor[1]),
        parseInt(bStep * i + sColor[2])
      )
    );
  }
  return gradientColorArr;
};

/** 拆分区域 */
export const handleSplitArea = (area) => {
  let areas = area;
  const area1 = area.slice(0, 2);
  const area2 = area.slice(2, 4);
  const area3 = area.slice(4, 6);
  const area4 = area.slice(6, 9);
  const area5 = area.slice(9, 12);
  if (area3 === "00") {
    areas = `${area1 + area2}00000000`;
  } else if (area4 === "000") {
    areas = `${area1 + area2}00000000-${area1 + area2 + area3}000000`;
  } else if (area5 === "000") {
    areas = `${area1 + area2}00000000-${area1 + area2 + area3}000000-${area1 +
      area2 +
      area3 +
      area4}000`;
  } else {
    areas = `${area1 + area2}00000000-${area1 + area2 + area3}000000-${area1 +
      area2 +
      area3 +
      area4}000-${area}`;
  }
  return areas;
};

/** 比较2个对象是否相同 */
export const isObjEqual = (o1, o2) => {
  const props1 = Object.getOwnPropertyNames(o1);
  const props2 = Object.getOwnPropertyNames(o2);
  if (props1.length !== props2.length) {
    return false;
  }
  for (let i = 0, max = props1.length; i < max; i += 1) {
    const propName = props1[i];
    if (o1[propName] !== o2[propName]) {
      return false;
    }
  }
  return true;
};

/** 因子 数据 转大写下标 */
export const transformFactor = (type) => {
  let text = type;
  let tempType = type;
  tempType = type.toUpperCase();
  switch (tempType) {
    case "PM2.5":
      text = "PM₂.₅";
      break;
    case "PM2_5":
      text = "PM₂.₅";
      break;
    case "PM25":
      text = "PM₂.₅";
      break;
    case "SO2":
      text = "SO₂";
      break;
    case "NO2":
      text = "No₂";
      break;
    case "CO":
      text = "CO";
      break;
    case "PM10":
      text = "PM₁₀";
      break;
    case "O3":
      text = "O₃";
      break;
    default:
      break;
  }
  return text;
};
/** 因子 数据 转大写下标 替换字符串中指定的元素 */
export const transformFactorReplace = (type) => {
  if (!type) {
    return "无";
  }
  let text = type;
  let tempType = type;
  tempType = type.toUpperCase();
  if (tempType.indexOf("PM2.5") > -1) {
    text = tempType.replace("PM2.5", "PM₂.₅");
  } else if (tempType.indexOf("AQI") > -1) {
    text = tempType;
  } else if (tempType.indexOf("ALL") > -1) {
    text = "全部";
  } else if (tempType.indexOf("PM2_5") > -1) {
    text = tempType.replace("PM2_5", "PM₂.₅");
  } else if (tempType.indexOf("PM25") > -1) {
    text = tempType.replace("PM25", "PM₂.₅");
  } else if (tempType.indexOf("SO2") > -1) {
    text = tempType.replace("SO2", "SO₂");
  } else if (tempType.indexOf("NO2") > -1) {
    text = tempType.replace("NO2", "NO₂");
  } else if (tempType === "CO") {
    text = tempType;
  } else if (tempType.indexOf("PM10") > -1) {
    text = tempType.replace("PM10", "PM₁₀");
  } else if (tempType.indexOf("O3") > -1) {
    text = tempType.replace("O3", "O₃");
  } else if (tempType.indexOf("COMPOSITE") > -1) {
    text = "综合指数";
  } else if (tempType.indexOf("WINDSPEED") > -1) {
    text = "风速";
  } else if (tempType.indexOf("PRESSURE") > -1) {
    text = "气压";
  } else if (tempType.indexOf("TEMPERATURE") > -1) {
    text = "温度";
  } else if (tempType.indexOf("HUMIDITY") > -1) {
    text = "湿度";
  }
  return text;
};
export const getPollutantText = (key, type) => {
  const keyInfo = {
    AQI: "AQI",
    "PM₂.₅": "PM2.5",
    "PM₁₀": "PM10",
    "SO₂": "SO2",
    "NO₂": "NO2",
    CO: "CO",
    "O₃": "O3",
  };
  let pollutant = keyInfo[key];
  switch (type) {
    case "toUpperCase":
      pollutant = pollutant.toUpperCase();
      break;
    case "toLowerCase":
      pollutant = pollutant.toLowerCase();
      break;
    default:
      break;
  }
  return pollutant;
};

/** 伪彩图转化成图片下载 */
// export const downloadImg = obj => {
//   return new Promise(resolve => {
//     html2canvas(obj).then(canvas => {
//       const save_url = canvas.toDataURL('image/png');
//       const alink = document.createElement('a');
//       alink.href = save_url;
//       alink.download = '图片';
//       alink.click();
//       resolve('success');
//     });
//   });
// };

/** zip等文件下载(不支持图片和txt) */
export const downloadFile = (url, filename) => {
  const a = document.createElement("a");
  a.download = filename || handleSplitFileName(url); //设置下载文件名称
  a.href = url;
  document.body.appendChild(a);
  const evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, false);
  a.dispatchEvent(evt);
  document.body.removeChild(a);
};

/**分离url文件名 */
export const handleSplitFileName = (url) => {
  const urlArr = url.split("/");
  if (urlArr.length > 0) {
    const filenameArr = urlArr[urlArr.length - 1].split(".");
    if (filenameArr.length > 0) {
      return filenameArr[0];
    }
  }
  return "file";
};

/**合并静态图片格式的为gif */
export const mergePngToGif = (urlArr, filename, delayTime) => {
  return new Promise((reslove, reject) => {
    const arr = [];
    for (let i = 0; i < urlArr.length; i += 1) {
      const element = urlArr[i];
      const img = document.createElement("img"); // 生成一个img元素
      // 解决跨域 Canvas 污染问题
      img.setAttribute("crossOrigin", "anonymous");
      img.src = element;
      arr.push(img);
    }

    setTimeout(() => {
      //调用gif对象方法
      const gif = new window.GIF({
        workers: 2,
        quality: 10,
        workerScript: "../assets/js/gif/gif.worker.js",
      });
      //遍历图片对象
      arr.map((item) => {
        gif.addFrame(item, {
          delay: delayTime || 1000,
        });
        return true;
      });
      gif.on("finished", (blob) => {
        //下载动作
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename || "动态图"; //设置下载文件名称
        document.body.appendChild(a);
        const evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);
        a.dispatchEvent(evt);
        document.body.removeChild(a);
      });
      gif.render();
      reslove(true);
    }, 1000);
  });
};
