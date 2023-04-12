<template>
<div class="content">
    <div class="row">
        <div class="col-12">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">常用链接</h1>
                    </template>
                </template>
                <div class="table-full-width " v-for="(url, index) in urltool" :key="index">
                    <h4><span class="url-size">{{url.text}}:</span><a :href="url.link">{{url.link}}</a></h4>
                </div>
            </card>
        </div>

        <div class="col-12">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">神秘球计算</h1>
                    </template>
                </template>
                <div class="row" v-for="(ball,index) in balls" :key="index">
                    <div class=" col-sm text-left">
                        <fieldset disabled>
                            <base-input label="岛名字" v-model="balls[index].name" disable></base-input>
                        </fieldset>
                    </div>
                    <div class="col-md-2 col-sm text-left">
                        <base-input label="每日获取量" v-model="balls[index].daily"></base-input>
                    </div>
                    <div class="col-md-2 col-sm text-left">
                        <base-input label="当前等级" placeholder="当前等级" v-model="balls[index].nowLevel"></base-input>
                    </div>
                    <div class="col-md-2 col-sm text-left">
                        <base-input label="当前等级的球数" placeholder="当前等级的球数" v-model="balls[index].nowCount"></base-input>
                    </div>
                    <div class="col-md-2 col-sm text-left">
                        <base-input label="还需要多少天" placeholder="还需要多少天" v-model="balls[index].needDay"></base-input>
                    </div>
                </div>
                <div class="row">
                    <base-button type="success" fill @click="caculatorDay">计算</base-button>
                </div>
            </card>
        </div>

        <div class="col-12" v-for="tool in imgTool" :key="tool.text">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">{{tool.text}}</h1>
                    </template>
                </template>
                <div class="table-full-width table-responsive">
                    <img :src="tool.url" :width="tool.width" />
                </div>
            </card>
        </div>
    </div>
</div>
</template>

<script>
import {
    Card,
    BaseInput
} from "@/components/index";

import TaskList from "./Dashboard/TaskList";
import BaseTable from "@/components/BaseTable";
import BaseButton from "@/components/BaseButton";
import msdata from "@/maplestory";


export default {
    components: {
        Card,
        BaseTable,
        BaseInput,
        BaseButton,
        TaskList,

    },
    data() {
        return {
            urltool: [{
                    text: "联盟自动排列工具",
                    link: "https://xenogents.github.io/LegionSolver/"
                }, {
                    text: "全职业刷怪查询",
                    link: "https://wj654cj86.github.io/MonstersKillsPerTenMinutes/"
                }, {
                    text: "巴哈姆特（枫之谷）",
                    link: "https://forum.gamer.com.tw/A.php?bsn=7650"
                },
                {
                    text: "新枫之谷官网",
                    link: "https://maplestory.beanfun.com/main"
                }

            ],
            imgTool: [{
                    text: "完美核心",
                    url: require("@/assets/tool/core.jpg"),
                    width: "80%"
                },
                {
                    text: "航海单人",
                    url: require("@/assets/tool/danhang.jpg"),
                    width: "80%"
                },
                {
                    text: "内在概率表",
                    url: require("@/assets/tool/neizai.png"),
                    width: "60%"
                },
                {
                    text: "经验倍增计算表",
                    url: require("@/assets/tool/exp1.jpg"),
                    width: "80%"
                },
                {
                    text: "经验拉满升级攻略",
                    url: require("@/assets/tool/exp2.png"),
                    width: "80%"
                },

            ],
            balls: [{
                    name: "消逝球",
                    daily: 14,
                    nowLevel: 1,
                    nowCount: 1,
                    needDay: ""
                },
                {
                    name: "啾啾球",
                    daily: 19,
                    nowLevel: 1,
                    nowCount: 1,
                    needDay: ""
                },
                {
                    name: "拉克兰",
                    daily: 12,
                    nowLevel: 1,
                    nowCount: 1,
                    needDay: ""
                },
                {
                    name: "阿尔球",
                    daily: 12,
                    nowLevel: 1,
                    nowCount: 1,
                    needDay: ""
                },
                {
                    name: "魔拉球",
                    daily: 8,
                    nowLevel: 1,
                    nowCount: 1,
                    needDay: ""
                },
                {
                    name: "艾斯球",
                    daily: 8,
                    nowLevel: 1,
                    nowCount: 1,
                    needDay: ""
                }
            ]

        }
    },
    methods: {
        // （总球数 - 当前球数）/ 每天获取 = 总天数
        caculatorDay() {
            var balls = this.balls;
            for (let index = 0; index < balls.length; index++) {
                const element = balls[index];
                if (element.nowLevel >= 20 || element.nowCount > 20 * 20 + 11) {
                    element.needDay = "参数错误";
                    continue;
                }
                let nowTotalBall = this.getNowBall(element.nowLevel) + element.nowCount;
                let needBall = 2679 - nowTotalBall;
                var needDay = Math.ceil(needBall / element.daily)
                element.needDay = needDay;
            }

        },
        getNowBall(nowLevel) {
            let haveFullLevel = nowLevel - 1;
            let nowBall = 0;
            for (let index = haveFullLevel; index > 0; index--) {
                nowBall += index * index + 11;
            }
            return nowBall;
        }
    },
    created() {},
    mounted() {
        console.log(msdata);
    }
}
</script>

<style>
.url-size {
    padding-right: 20px;
    display: inline-block;
}
</style>
