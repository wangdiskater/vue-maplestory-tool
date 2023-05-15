<template>
<div class="content">
    <div class="row">

        <div class="col-12" v-for="activity in activitys" :key="activity.title">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">{{activity.title}}</h1>
                    </template>
                </template>
                <div class="table-full-width table-responsive" v-for="image in activity.img" :key="image.url">
                    <img :src="image.url" :width="image.width" />
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
            activitys: [{
                title: "周日",
                img: [{
                    url: require("@/assets/activity/sunday.png"),
                    width: "60%"
                }]
            }, {
                title: "深渊远征队",
                img: [{
                    url: require("@/assets/activity/深渊1.jpg"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/深渊2.jpg"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/深渊3.jpg"),
                    width: "60%"
                }]
            }, {
                title: "加速狩猎",
                img: [{
                    url: require("@/assets/activity/加速狩猎1.png"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/加速狩猎2.png"),
                    width: "60%"
                }]
            }, {
                title: "接力",
                img: [{
                    url: require("@/assets/activity/接力1.png"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/接力2.png"),
                    width: "60%"
                }]
            }, {
                title: "什么都不做",
                img: [{
                    url: require("@/assets/activity/什么都不做1.png"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/什么都不做2.png"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/什么都不做3.png"),
                    width: "60%"
                }, {
                    url: require("@/assets/activity/什么都不做4.jpg"),
                    width: "60%"
                }]
            }]

        }
    },
    methods: {},
    created() {},
    mounted() {}
}
</script>

<style lang=scss>
</style>
