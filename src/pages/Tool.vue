<template>
<div class="content">
    <div class="row">
        <div class="col-12">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template v-if="!isRTL">
                        <h1 class="title d-inline">常用链接</h1>
                    </template>
                </template>
                <div class="table-full-width " v-for="url in urltool" :key="url">
                    <h4><span class="url-size">{{url.text}}:</span><a :href="url.link">{{url.link}}</a></h4>
                </div>
            </card>
        </div>

        <div class="col-12" v-for="tool in imgTool" :key="tool">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template v-if="!isRTL">
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
    Card
} from "@/components/index";
import TaskList from "./Dashboard/TaskList";
import BaseTable from "@/components/BaseTable";

export default {
    components: {
        Card,
        BaseTable,
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

        }
    },
    methods: {},
    created() {},
    mounted() {}
}
</script>

<style>
.url-size {
    padding-right: 20px;
    display: inline-block;
}
</style>
