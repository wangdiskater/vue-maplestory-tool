<template>
<div class="content">
    <div class="type-key">
        <base-alert type="info">
            <strong>Info!</strong> You need all time: {{needTime}} minutes
        </base-alert>
        <!-- <span>Reset in: {{ resetTime }}</span> -->
        <span class="task-btn" v-for=" typeKey in typeKeys" :key="typeKey.key">
            <base-button :type="typeKey.type" @click="clickEvent(typeKey.key)" class="animation-on-hover">{{ typeKey.key
                }}</base-button>
        </span>
        <span class="task-btn">
            <base-button type="danger" fill @click="clearList()">Reset</base-button>
        </span>
    </div>
    <div class="row">
        <div :class="taskStyle" v-for=" taskkey in taskKeys" :key="taskkey" style="margin:10px 0;">

            <card type="" class="table-card">
                <template slot="header">
                    <template>
                        <h6 class="title d-inline">{{ taskkey }}</h6>
                    </template>
                    <div class="count-down">
                        <p class="text-right card-category d-inline">Reset in: {{ taskkey != "Weekly Tasks" ? resetTime : resetTime2 }}</p>
                    </div>
                </template>
                <div class="table-full-width">
                    <!-- <task-list tag="today"></task-list> -->
                    <!-- <tracker-list tag="today"></tracker-list> -->
                    <!-- <tracker-list :tasks='tasks' :prefix='imagePrefix'></tracker-list> -->
                    <tracker-list :tasks='tasksMap.get(taskkey)' :prefix='imagePrefix' @handleChange="changeSpendTime"></tracker-list>

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
import BaseAlert from "@/components/BaseAlert";

export default {
    components: {
        Card,
        LineChart,
        BarChart,
        TaskList,
        UserTable,
        TrackerList,
        BaseAlert
    },
    data() {
        return {
            tasksMap: this.initTaskMap(),
            taskKeys: [],
            imagePrefix: this.initImagePrefix(),
            typeKeys: [],
            taskStyle: 'col-lg-3',
            seconds: 864000,
            seconds2: 864000,
            resetTime: '',
            resetTime2: '',
            needTime: 0

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

                //utc今天的剩余
                let sec = this.getCountDownSecond();
                let dayOfWeek = new Date().getUTCDay();
                let addDay = 0;
                let weekend = 0;
                if (dayOfWeek < 4) {
                    addDay = 3 - dayOfWeek;
                } else {
                    addDay = 10 - dayOfWeek;
                }
                if (dayOfWeek == 0) {
                    weekend = 0;
                } else {
                    weekend = 7 - dayOfWeek;
                }

                // 有误差的
                this.seconds = sec + addDay * 24 * 3600;
                this.seconds2 = sec + weekend * 24 * 3600;

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
            //获取缓存中的数据
            // for (var key in localStorage) {
            //     if (key.indexOf("ms-") == -1) {
            //         continue;
            //     }
            //     let data = localStorage.getItem(key);
            //     if (data != null) {
            //         console.log(data);
            //         let taskEntity = JSON.parse(data);
            //         if (taskEntity.spendTime != null) {
            //             taskEntity.done = false;
            //             console.log(taskEntity)

            //             localStorage.setItem(key, JSON.stringify(taskEntity));
            //         }
            //     }
            // }

            //刷新页面
            location.reload();
        },
        // 天 时 分 秒 格式化函数
        countDown(seconds) {
            let d = parseInt(seconds / (24 * 60 * 60))
            d = d < 10 ? "0" + d : d
            let h = parseInt(seconds / (60 * 60) % 24);
            h = h < 10 ? "0" + h : h
            let m = parseInt(seconds / 60 % 60);
            m = m < 10 ? "0" + m : m
            let s = parseInt(seconds % 60);
            s = s < 10 ? "0" + s : s
            this.resetTime = d + 'd ' + h + ':' + m + ':' + s
        },
        // 天 时 分 秒 格式化函数
        countDown2(seconds) {
            let d = parseInt(seconds / (24 * 60 * 60))
            d = d < 10 ? "0" + d : d
            let h = parseInt(seconds / (60 * 60) % 24);
            h = h < 10 ? "0" + h : h
            let m = parseInt(seconds / 60 % 60);
            m = m < 10 ? "0" + m : m
            let s = parseInt(seconds % 60);
            s = s < 10 ? "0" + s : s
            this.resetTime2 = d + 'd ' + h + ':' + m + ':' + s
        },
        //定时器没过1秒参数减1
        time() {
            setInterval(() => {
                this.seconds -= 1
                this.countDown(this.seconds);

                this.seconds2 -= 1;
                this.countDown2(this.seconds2);

            }, 1000)
        },
        getCountDownSecond() {
            const nowTime = new Date();
            const utcTime = new Date(nowTime.getUTCFullYear(), nowTime.getUTCMonth(), nowTime.getUTCDate(), nowTime.getUTCHours(), nowTime.getUTCMinutes(), nowTime.getUTCSeconds());
            const endTime = new Date(utcTime.getFullYear(), utcTime.getMonth(), utcTime.getDate(), '23', '59', '59');
            console.log(utcTime)
            console.log(endTime)
            let sec = Math.ceil((endTime.getTime() - utcTime.getTime()) / 1000);
            console.log(sec);

            return sec;
        },
        changeSpendTime(row) {
            console.log(row)
            this.needTime = parseInt(this.needTime) + parseInt(row.spendTime);
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
        //获取缓存中的数据
        for (var key in localStorage) {
            if (key.indexOf("ms-") == -1) {
                continue;
            }
            let data = localStorage.getItem(key);
            if (data != null) {
                let taskEntity = JSON.parse(data);
                if (taskEntity.spendTime != null) {
                    console.log(taskEntity)
                    this.needTime = parseInt(this.needTime) + parseInt(taskEntity.spendTime);

                }

            }
        }

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

.count-down {
    display: inline-block;
    float: right;
}
</style>
