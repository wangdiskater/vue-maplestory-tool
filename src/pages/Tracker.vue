<template>
    <div class="content">
        <div class="type-key">
            <span>Reset in: {{ resetTime }}</span>
            <span class="task-btn" v-for=" typeKey in typeKeys" :key="typeKey.key">
                <base-button :type="typeKey.type" @click="clickEvent(typeKey.key)" class="animation-on-hover">{{ typeKey.key
                }}</base-button>
            </span>
            <base-button type="success" fill @click="clearList()">Reset</base-button>
        </div>
        <div class="row">
            <div :class="taskStyle" v-for=" taskkey in taskKeys" :key="taskkey" style="margin:10px 0;">

                <card type="" class="table-card">
                    <template slot="header">
                        <template>
                            <h6 class="title d-inline">{{ taskkey }}</h6>
                        </template>
                        <!-- <template>
                        <p class="card-category d-inline">today</p>
                    </template> -->
                    </template>
                    <div class="table-full-width">
                        <!-- <task-list tag="today"></task-list> -->
                        <!-- <tracker-list tag="today"></tracker-list> -->
                        <!-- <tracker-list :tasks='tasks' :prefix='imagePrefix'></tracker-list> -->
                        <tracker-list :tasks='tasksMap.get(taskkey)' :prefix='imagePrefix'></tracker-list>

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

import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";
import TaskList from "./Dashboard/TaskList";
import TrackerList from "./Tracker/TrackerList";
import UserTable from "./Dashboard/UserTable";
import msdata from "@/maplestory";

export default {
    components: {
        Card,
        LineChart,
        BarChart,
        TaskList,
        UserTable,
        TrackerList,
    },
    data() {
        return {
            tasksMap: this.initTaskMap(),
            taskKeys: [],
            imagePrefix: this.initImagePrefix(),
            typeKeys: [],
            taskStyle: 'col-lg-3',
            seconds: 864000,
            resetTime: ''

        }
    },
    methods: {
        initImagePrefix() {
            let data = msdata.msdata;
            let dailies = data.Dailies;
            return dailies.imagePrefix;
        },
        // // 初试显示
        // initTaskgroup() {
        //     let data = msdata.msdata;
        //     let dailies = data.Dailies;
        //     let taskGroups = dailies.taskGroups;
        //     let taskGroup = taskGroups[0];
        //     return taskGroup.tasks;
        // },
        initTaskMap() {
            let taskMap = new Map();
            let data = msdata.msdata
            let dailies = data.Dailies;
            let taskGroups = dailies.taskGroups
            for (let index = 0; index < taskGroups.length; index++) {
                const taskgroup = taskGroups[index];
                taskMap.set(taskgroup.title, taskgroup.tasks);
            }
            return taskMap;
        },
        logMapElements(value, key, map) {
            this.taskKeys.push(key);
        },
        clickEvent(typeKey) {
            let typeData = msdata.taskMap.get(typeKey);
            console.log(typeData);
            let taskGroups = typeData.taskGroups

            let newTaskKeys = [];
            for (let index = 0; index < taskGroups.length; index++) {
                const taskgroup = taskGroups[index];
                this.tasksMap.set(taskgroup.title, taskgroup.tasks);
                newTaskKeys.push(taskgroup.title);
            }
            this.taskKeys = [];
            this.taskKeys = newTaskKeys;
            this.imagePrefix = typeData.imagePrefix;

            console.log(this.imagePrefix);

            let taskKeysSize = this.taskKeys.length;
            let style = 'col-lg-' + (12 / taskKeysSize);
            console.log(style);
            this.taskStyle = style;


            // 计算到下一个的时间
            if (this.imagePrefix == "MapleWeeklies/") {
                let sec = this.getCountDownSecond();
                let dayOfWeek = new Date().getDay();
                let addDay = 0;
                if (dayOfWeek < 4) {
                    addDay = 3 - dayOfWeek;
                } else {
                    addDay = 10 - dayOfWeek;
                }
                console.log(dayOfWeek);
                // 有误差的
                this.seconds = sec + addDay * 24 * 3600;

            } else {
                this.seconds = this.getCountDownSecond();
            }

            // this.taskKeys = newTaskKeys;
            // console.log(this.taskKeys);
            // console.log(this.tasksMap);

        },
        initTaskData(value, key, map) {
            let type = "success";
            if (key == "Weeklies") {
                type = "primary"
            }
            let typeKey = {
                key: key,
                type: type
            };
            this.typeKeys.push(typeKey);
        },
        clearList() {
            localStorage.clear();
            //刷新页面
            location.reload();
        },
        // 天 时 分 秒 格式化函数
        countDown() {
            let d = parseInt(this.seconds / (24 * 60 * 60))
            d = d < 10 ? "0" + d : d
            let h = parseInt(this.seconds / (60 * 60) % 24);
            h = h < 10 ? "0" + h : h
            let m = parseInt(this.seconds / 60 % 60);
            m = m < 10 ? "0" + m : m
            let s = parseInt(this.seconds % 60);
            s = s < 10 ? "0" + s : s
            this.resetTime = d + '天' + h + '时' + m + '分' + s + '秒'
        },
        //定时器没过1秒参数减1
        time() {
            setInterval(() => {
                this.seconds -= 1
                this.countDown()
            }, 1000)
        },
        getCountDownSecond() {
            const nowTime = new Date();
            const endTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), '23', '59', '59');
            console.log(nowTime)
            console.log(endTime)
            let sec = (endTime.getTime() - nowTime.getTime()) / 1000 + 8 * 3600;
            console.log(sec);
            return sec;
        }
    },
    created() {
        this.tasksMap.forEach(this.logMapElements);


        //遍历数据 new
        msdata.taskMap.forEach(this.initTaskData);

    },
    mounted() {
        this.seconds = this.getCountDownSecond();
        this.time();
    }
}
</script>

<style>
.task-btn {
    display: inline-block;
    padding: 0 10px;
}

.type-key {
    padding-bottom: 10px;
}
</style>
