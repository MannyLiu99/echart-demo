/**
 * @description: 污染物信息表 TODO源项目移植过来的
 * @param {type}
 * @return:
 */
export const firstPollutionAbbreviation = {
  '细颗粒物(PM2.5)': '2.5',
  '颗粒物(PM10)': '10',
  二氧化硫: 'S',
  二氧化氮: 'N',
  一氧化碳: 'C',
  臭氧1小时: 'O',
};
export const firstPollution = {
  '细颗粒物(PM2.5)': 'PM2.5',
  '颗粒物(PM10)': 'PM10',
  二氧化硫: 'SO2',
  二氧化氮: 'NO2',
  一氧化碳: 'CO',
  臭氧1小时: 'O3',
};
// 正值表示逆时针旋转
export const directionMap = {
  N: [0, '北风'],
  NNW: [0.39269908169872414, '北西北风'],
  NW: [0.7853981633974483, '西北风'],
  WNW: [1.1780972450961724, '西西北风'],
  W: [1.5707963267948966, '西风'],
  WSW: [1.9634954084936207, '西西南风'],
  SW: [2.356194490192345, '西南风'],
  SSW: [2.748893571891069, '南西南风'],
  S: [3.141592653589793, '南风'],
  SSE: [3.5342917352885173, '南东南风'],
  SE: [3.9269908169872414, '东南风'],
  ESE: [4.319689898685965, '东东南风'],
  E: [4.71238898038469, '东风'],
  ENE: [5.105088062083414, '东东北风'],
  NE: [5.497787143782138, '东北风'],
  NNE: [5.890486225480862, '北东北风'],
  svgPathData:
    'M368.941,1015v-8.88a22.067,22.067,0,0,1-4.953.66,13.151,13.151,0,0,0,6.006-3.77,13.84,13.84,0,0,0,6.008,3.77,25.8,25.8,0,0,1-5.093-.68v8.9h-1.968Z',
};
export const statusList = [
  { color: '#1392f6', textColor: '#fff', key: 'online', name: '在线' },
  { color: '#999999', textColor: '#fff', key: 'offline', name: '离线' },
  { color: '#d02c2c', textColor: '#fff', key: 'outOfLimit', name: '超标' },
  { color: '#f234ff', textColor: '#fff', key: 'abnormal', name: '异常' },
];
export const pollutionList = [
  { color: '#00E400', textColor: '#0f2d53', key: 'excellent', name: '优' },
  { color: '#FFFF00', textColor: '#0f2d53', key: 'good', name: '良' },
  { color: '#FF7E00', textColor: '#fff', key: 'mildPollution', name: '轻度' },
  {
    color: '#FF0000',
    textColor: '#fff',
    key: 'moderatePollution',
    name: '中度',
  },
  { color: '#99004C', textColor: '#fff', key: 'severePollution', name: '重度' },
  {
    color: '#990023',
    textColor: '#fff',
    key: 'seriousPollution',
    name: '严重',
  },
];
export const temperatureList = [
  { color: '#500085', textColor: '#0f2d53', key: 'excellent' },
  { color: '#b84592', textColor: '#0f2d53', key: 'good' },
  { color: '#b86ae0', textColor: '#fff', key: 'mildPollution' },
  { color: '#cdee4a', textColor: '#fff', key: 'moderatePollution' },
  { color: '#b8603e', textColor: '#fff', key: 'severePollution' },
  { color: '#9e003e', textColor: '#fff', key: 'seriousPollution' },
];
export const humidityList = [
  { color: '#ab6f00', textColor: '#0f2d53', key: 'excellent' },
  { color: '#735550', textColor: '#0f2d53', key: 'good' },
  { color: '#6828ff', textColor: '#fff', key: 'mildPollution' },
  { color: '#2f3463', textColor: '#fff', key: 'moderatePollution' },
  { color: '#000dc5', textColor: '#fff', key: 'severePollution' },
  { color: '#5be6ff', textColor: '#fff', key: 'seriousPollution' },
];
export const windSpeedList = [
  { color: '#3a6bff', textColor: '#0f2d53', key: 'excellent' },
  { color: '#88ff96', textColor: '#0f2d53', key: 'good' },
  { color: '#d33b3a', textColor: '#fff', key: 'mildPollution' },
  { color: '#aa09f5', textColor: '#fff', key: 'moderatePollution' },
  { color: '#c182a9', textColor: '#fff', key: 'severePollution' },
  { color: '#ebd4eb', textColor: '#fff', key: 'seriousPollution' },
];
export const pollutionRange = {
  AQI: [51, 101, 151, 201, 301],
  'PM2.5': [35, 75, 115, 150, 250],
  PM25: [35, 75, 115, 150, 250],
  PM2_5: [35, 75, 115, 150, 250],
  PM10: [50, 150, 250, 350, 420],
  SO2: [150, 500, 650, 800, 1600],
  NO2: [100, 200, 700, 1200, 2340],
  CO: [5, 10, 35, 60, 90],
  O3: [160, 200, 300, 400, 800],
  temperature: [-46, -23, -1, 21, 43],
  airPressure: [4000],
  humidity: [25, 41, 58, 75, 91],
  windSpeed: [45, 75, 105, 135, 165],
  TEMPERATURE: [-46, -23, -1, 21, 43],
  AIRPRESSURE: [4000],
  PRESSURE: [4000],
  HUMIDITY: [25, 41, 58, 75, 91],
  WINDSPEED: [45, 75, 105, 135, 165],
  综指: [5, 6, 8, 9, 10],
  COMPOSITE: [5, 6, 8, 9, 10],
};
/** 新增等级 */
export const pollutionGrade = {
  nothing: 0,
  excellent: 1,
  good: 2,
  mildPollution: 3,
  moderatePollution: 4,
  severePollution: 5,
  seriousPollution: 6,
};
