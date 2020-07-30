<template>
  <div class="echart-demos-content">
    <h1>echart demo</h1>
    <div class="section">
      <h2>Type:line</h2>
      <el-row :gutter="20" class="section-item">
        <el-col :span="6" v-for="(data, index) in typeLine" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <a :href="data.detailUrl">
              <img :src="data.imgUrl" class="image" />
              <div style="padding: 14px;">
                <span>{{ data.desc }}</span>
                <div class="bottom">
                  <el-button type="text" class="button"
                    >查看详情 <i class="el-icon-arrow-right"></i
                  ></el-button>
                </div>
              </div>
            </a>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="section">
      <h2>Type:Pie</h2>
      <el-row :gutter="20" class="section-item">
        <el-col :span="6" v-for="(data, index) in typePie" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <a :href="data.detailUrl">
              <img :src="data.imgUrl" class="image" />
              <div style="padding: 14px;">
                <span>{{ data.desc }}</span>
                <div class="bottom">
                  <el-button type="text" class="button"
                    >查看详情 <i class="el-icon-arrow-right"></i
                  ></el-button>
                </div>
              </div>
            </a>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="section">
      <h2>Type:Calendar</h2>
      <el-row :gutter="20" class="section-item">
        <el-col :span="6" v-for="(data, index) in typeCalendar" :key="index">
          <el-card :body-style="{ padding: '0px' }">
            <a :href="data.detailUrl">
              <img :src="data.imgUrl" class="image" />
              <div style="padding: 14px;">
                <span>{{ data.desc }}</span>
                <div class="bottom">
                  <el-button type="text" class="button"
                    >查看详情 <i class="el-icon-arrow-right"></i
                  ></el-button>
                </div>
              </div>
            </a>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      typeLine: [
        {
          imgUrl: require("@/assets/images/img_line_1.png"),
          detailUrl: "/line-a",
          desc: "简介",
        },
        {
          imgUrl: require("@/assets/images/img_line_2.png"),
          detailUrl: "/line-b",
          desc: "简介",
        },
        {
          imgUrl: require("@/assets/images/img_line_3.png"),
          detailUrl: "/line-c",
          desc: "简介",
        },
      ],
      typePie: [
        {
          imgUrl: require("@/assets/images/img_pie_1.png"),
          detailUrl: "/pie-a",
          desc: "简介",
        },
      ],
      typeCalendar: [
        {
          imgUrl: require("@/assets/images/img_calendar_1.png"),
          detailUrl: "/calendar-a",
          desc: "简介",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
h2 {
  border-bottom: 1px solid black;
  text-align: left;
}
.section {
  .section-item {
    padding: 0 20px;
  }
  img {
    display: block;
    width: 100%;
  }
}

// @import '~@/styles/analyze';
</style>
