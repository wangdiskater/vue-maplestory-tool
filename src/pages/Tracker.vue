<template>
<div class="content">
    <div>
        <span class="task-btn" v-for=" typeKey in typeKeys" :key="typeKey.key">
            <base-button :type="typeKey.type" @click="clickEvent(typeKey.key)" class="animation-on-hover">{{typeKey.key}}</base-button>
        </span>

    </div>
    <div class="row">
        <div class="col-lg-3" v-for=" taskkey in taskKeys" :key="taskkey">
            <card type="" class=" table-card">
                <template slot="header">
                    <template>
                        <h6 class="title d-inline">{{taskkey}}</h6>
                    </template>
                    <!-- <template>
                        <p class="card-category d-inline">today</p>
                    </template> -->
                </template>
                <div class="table-full-width table-responsive">
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
            btnName: this.initName(),
            tasks: this.initTaskgroup(),
            tasksMap: this.initTaskMap(),
            taskKeys: [],
            imagePrefix: this.initImagePrefix(),
            typeKeys: [],

        }
    },
    methods: {
        initName() {
            return "initName";
        },
        initImagePrefix() {
            let data = msdata.msdata;
            let dailies = data.Dailies;
            return dailies.imagePrefix;
        },
        initTaskgroup() {
            let data = msdata.msdata;
            let dailies = data.Dailies;
            let taskGroups = dailies.taskGroups;
            let taskGroup = taskGroups[0];
            return taskGroup.tasks;
        },
        initTaskMap() {

            // for (let index = 0; index < data.length; index++) {
            //     const trackTypeData = data[index];
            //     taskMap.set(taskgroup.title, taskgroup.tasks);

            // }
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
        clickEvent(taskkey) {

            // let taskgroupTasks = this.tasksMap.get(taskkey);
            // this.tasks = taskgroupTasks;
            let typeData = msdata.taskMap.get(taskkey);
            // console.log(taskkey);
            // console.log(typeData);
            let taskGroups = typeData.taskGroups
            this.taskMap = new Map();

            for (let index = 0; index < taskGroups.length; index++) {
                const taskgroup = taskGroups[index];
                this.taskMap.set(taskgroup.title, taskgroup.tasks);
            }
            this.taskKeys = [];
            this.taskKeys.push("Weekly Bosses");
            this.taskKeys.push("Weekly Tasks");
            console.log(this.taskMap)
            console.log(this.taskKeys)

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

    },
    created() {
        this.tasksMap.forEach(this.logMapElements);

        //遍历数据
        msdata.taskMap.forEach(this.initTaskData);

    },
    mounted() {

    }
}
</script>

<style>
.task-btn {
    display: inline-block;
    padding: 0 10px;
}
</style>
