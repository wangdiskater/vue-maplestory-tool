<template>
  <base-table :data="tableData" thead-classes="text-primary">
    <template slot-scope="{ row }">
      <td>
        <base-checkbox v-model="row.done"> </base-checkbox>
      </td>
      <td class="text-left" @click="clickEvent(row)">
        <p class="title">{{ row.title }}</p>
        <p class="text-muted">{{ row.description }}</p>
      </td>
      <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button">
          <!-- <i class="tim-icons icon-pencil"></i> -->
        </base-button>
      </td>
    </template>
  </base-table>
</template>
<script>
import BaseButton from "@/components/BaseButton";
import BaseTable from "@/components/BaseTable";
import BaseCheckbox from "@/components/BaseCheckbox";

export default {

  props: ['tag'],

  components: {
    BaseButton,
    BaseTable,
    BaseCheckbox,
  },

  computed: {
    tableData() {
      switch(this.tag) {
        case "today":
          return this.$t("dashboard.taskList");
        case "today2":
          return this.$t("dashboard.taskList2");
        case "today3":
          return this.$t("dashboard.taskList3");
        case "exp":
          return this.$t("dashboard.exp");
      }
      return this.$t("dashboard.weekTaskList");
    },
  },

  mounted() {
      let arr = [];
      switch(this.tag) {
        case "today":
          arr =  this.$t("dashboard.taskList");
          break;
        case "today2":
          arr =  this.$t("dashboard.taskList2");
          break;
        case "today3":
          arr =  this.$t("dashboard.taskList3");
          break;
        case "exp":
          arr = this.$t("dashboard.exp");
          break;
        default:
          arr = this.$t("dashboard.weekTaskList");
      }
       
      // 更新完把缓存的数据补上
      for (const index in arr) {
        let title = arr[index].title;
        console.log(arr[index].title);
        let userJsonStr = localStorage.getItem(title);
        if(userJsonStr != null) {
          let taskEntity = JSON.parse(userJsonStr);
          console.log(taskEntity);
          arr[index].done = taskEntity.done;
        }
      }
  },

  methods: {
    clickEvent(row) {
      console.log(row);
      row.done = !row.done;
      let title = row.title;
      // 保存数据
      localStorage.setItem(title, JSON.stringify(row));
      console.log("save success " + title)

    }
  }
};
</script>
<style></style>
