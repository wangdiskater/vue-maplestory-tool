<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="table-responsive text-left" class="table-card">
          <template slot="header">
            <template v-if="!isRTL">
              <h6 class="title d-inline">练级经验小助手</h6>
            </template>
            <template v-else>
              <h6 class="title d-inline">الشحنات</h6>
            </template>
            <template v-if="!isRTL">
              <p class="card-category d-inline">exp</p>
            </template>
          </template>
          <div class="table-full-width table-responsive">
            <task-list tag="exp"></task-list>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { Card } from "@/components/index";
import TaskList from "./Dashboard/TaskList";

import BaseTable from "@/components/BaseTable";

// const tableColumns = ["Name", "Country", "City", "Salary"];
// const tableData = [
//   {
//     id: 1,
//     name: "Dakota Rice",
//     salary: "$36.738",
//     country: "Niger",
//     city: "Oud-Turnhout",
//   },
//   {
//     id: 2,
//     name: "Minerva Hooper",
//     salary: "$23,789",
//     country: "Curaçao",
//     city: "Sinaai-Waas",
//   },
//   {
//     id: 3,
//     name: "Sage Rodriguez",
//     salary: "$56,142",
//     country: "Netherlands",
//     city: "Baileux",
//   },
//   {
//     id: 4,
//     name: "Philip Chaney",
//     salary: "$38,735",
//     country: "Korea, South",
//     city: "Overland Park",
//   },
//   {
//     id: 5,
//     name: "Doris Greene",
//     salary: "$63,542",
//     country: "Malawi",
//     city: "Feldkirchen in Kärnten",
//   },
//   {
//     id: 6,
//     name: "Mason Porter",
//     salary: "$98,615",
//     country: "Chile",
//     city: "Gloucester",
//   },
//   {
//     id: 7,
//     name: "Jon Porter",
//     salary: "$78,615",
//     country: "Portugal",
//     city: "Gloucester",
//   },
// ];

const tableColumns = ["name", "desc", "use","get", "percent"];
const tableData = [
  {
    id: 1,
    name: "轮回石碑",
    desc: "增加地图的最大怪物数量和刷新速度",
    use: "图腾装备，装备后0转技能栏多一个轮回技能，直接释放，无冷却时间",
    get: "抽奖或购买",
    percent: "效率max"
  },
  {
    name: "燃烧之戒",
    desc: "燃烧地图使用后提升到最高燃烧等级（最高十）",
    use: "现金戒指，装备后0转技能栏多一个技能，直接释放，CD30分钟",
    get: "抽奖或购买",
    percent: "100%"
    
  },
  {
    name: "苦行戒指",
    desc: "减少30%伤害增加15%经验",
    use: "现金戒指，装备后0转技能栏多一个技能，直接释放，CD30分钟，持续时间15分钟",
    get: "抽奖或购买",
    percent: "15%"
  },
    {
    name: "十字军团戒指（两个）",
    desc: "旧版十字军任务给",
    use: "佩戴增加5%经验",
    get: "已无法获取",
    percent: "5%"
  },
  {
    name: "精灵吊坠",
    desc: "佩戴增加10%经验，过一小时增加10%，最高30%",
    use: "佩戴增加",
    get: "抽奖，活动送，道场送",
    percent: "30%"

  },
  {
    name: "经验宠物",
    desc: "宠物洗经验",
    use: "装备3只加20%经验",
    get:"自己洗，购买",
    percent: "20%"
  },
  {
    name: "五转花、主教花、猫",
    desc: "增加经验的技能,三个只有一个生效",
    use: "主动技能使用",
    get: "五转核心获取、和主教、LZL组队",
    percent: "35%、50%、30%"
  },
  {
    name: "V矩阵特殊核心-（克服的经验/轮的经验）",
    desc: "特殊核心只能带一个，一般带克服",
    use: "",
    get: "",
    percent: ""
  },
];

export default {
  components: {
    Card,
    BaseTable,
    TaskList,

  },
  data() {
    return {
      table1: {
        title: "Simple Table",
        columns: [...tableColumns],
        data: [...tableData],
      },
      table2: {
        title: "Table on Plain Background",
        columns: [...tableColumns],
        data: [...tableData],
      },
    };
  },
  computed: {
    enableRTL() {
      return this.$route.query.enableRTL;
    },
    isRTL() {
      return this.$rtl.isRTL;
    },
  },
};
</script>
<style>
.table-card {
  height: 100%;
  padding-bottom: 10px;
}
</style>
