<template>
<div class="content">
    <div class="row">
        <div class="col-12">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">未来东京城</h1>
                    </template>
                </template>
                <div class="table-full-width table-responsive" v-for="image in images1" :key="image.url">
                    <img :src="image.url" :width="image.width" />
                </div>
            </card>
        </div>
        <div class="col-12">

            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">春天的气息</h1>
                    </template>
                </template>
                <div class="table-full-width table-responsive" v-for="image in images2" :key="image.url">
                    <img :src="image.url" :width="image.width" />
                </div>
            </card>
        </div>
        <div class="col-12">

            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">短中分</h1>
                    </template>
                </template>
                <div class="table-full-width table-responsive" v-for="image in images3" :key="image.url">
                    <img :src="image.url" :width="image.width" />
                </div>
            </card>
        </div>
        <div class="col-12">
            <card type="table-responsive text-left">
                <template slot="header">
                    <template>
                        <h1 class="title d-inline">其他</h1>
                    </template>
                </template>
                <div class="table-full-width table-responsive" v-for="image in images4" :key="image.url">
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
            images1: [{
                    url: require("@/assets/activity/weilai1.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai2.jpg"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai3.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai4.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai5.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai6.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai7.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/weilai8.jpg"),
                    width: "40%"
                },
            ],
            images2: [{
                    url: require("@/assets/activity/spring1.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/spring2.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/spring3.jpg"),
                    width: "60%"
                },
            ],
            images3: [{
                    url: require("@/assets/activity/short1.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/short2.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/short3.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/short4.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/short5.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/short6.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/short7.png"),
                    width: "60%"
                },
            ],
            images4: [{
                    url: require("@/assets/activity/car1.jpg"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/sunday1.png"),
                    width: "60%"
                },
                {
                    url: require("@/assets/activity/sunday2.png"),
                    width: "60%"
                },
            ],

        }
    },
    methods: {},
    created() {},
    mounted() {}
}
</script>

<style lang=scss>
</style>
