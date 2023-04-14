<template>
<base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
        <td>
            <div>
                <img :src="require('@/assets/maplestory/' + row.url)" alt="" class="track-img">
            </div>
        </td>
        <td class="text-left" @click="clickEvent(row)">
            <p class="title">{{ row.name }}</p>
            <p class="text-muted">{{ row.description }}</p>
        </td>
        <!-- <td class="td-actions text-right">
                <base-button type="link" artia-label="edit button">
                    <i class="tim-icons icon-pencil"></i>
                </base-button>
            </td> -->
        <td>
            <input type="text" placeholder="time you need" v-model='row.spendTime' class="timeImput" />
        </td>
        <td class="td-actions text-right">
            <base-checkbox v-model="row.done"></base-checkbox>
        </td>
    </template>
</base-table>
</template>

<script>
import BaseButton from "@/components/BaseButton";
import BaseTable from "@/components/BaseTable";
import BaseCheckbox from "@/components/BaseCheckbox";
import {
    Card,
    BaseInput
} from "@/components/index";

export default {

    props: ['tasks', 'prefix'],

    components: {
        BaseButton,
        BaseTable,
        BaseCheckbox,
        BaseInput,
    },
    data() {
        return {
            url: require("@/assets/maplestory/MapleDailies/ChuChu.png"),
            innerTask: "",
            innerPrefix: this.prefix,
        }
    },
    computed: {
        tableData() {
            for (let index = 0; index < this.tasks.length; index++) {
                let element = this.tasks[index];
                element.url = this.innerPrefix + element.image;
                // element.spendTime = 0;
            }
            this.innerTask = this.tasks;
            return this.innerTask;
        },
    },
    watch: {
        // 父类动态更新子类
        prefix: function (newValue, oldValue) {
            this.innerPrefix = newValue;
        }
    },
    mounted() {
        let arr = this.tasks;
        // 更新完把缓存的数据补上
        for (const index in arr) {
            let title = arr[index].name;
            let userJsonStr = localStorage.getItem("ms-" + title);
            if (userJsonStr != null) {
                let taskEntity = JSON.parse(userJsonStr);
                arr[index].done = taskEntity.done;
                arr[index].spendTime = taskEntity.spendTime;

            }
        }

    },

    methods: {
        clickEvent(row) {
            console.log("before:" + row.done);
            row.done = !row.done;
            let title = row.name;
            console.log("after:" + row.done);
            console.log(row);

            // 保存数据
            localStorage.setItem("ms-" + title, JSON.stringify(row));
            // console.log("save success " + title)

            // 触发重新计算时间
            this.$emit('handleChange', row);

        }
    }
};
</script>

<style>
.track-img {
    max-width: 50px;
    max-height: 50px;
}

.timeImput {
    width: 90%;
}
</style>
