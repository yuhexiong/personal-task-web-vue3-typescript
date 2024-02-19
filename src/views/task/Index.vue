<template>
  <div>
    <main class="wrapper">
      <div class="left-table">
        <div class="title-div">
          <font-awesome-icon
            :icon="['fas', 'book']"
            style="margin-right: 6px;"
          />
          事務
        </div>
        <div class="top-section">
          <search-date
            style="width: 75%;"
            :search-date-option="searchDateOption"
            @click="handleSearch"
            @reset="handleResetSearch"
          />

          <CreateTaskForm
            style="width: 25%; display: flex; justify-content: end;"
            :disabled="isEditing"
            @succeeded="handleCreateTask"
          />
        </div>

        <el-table
          ref="taskTable"
          v-loading="isGettingTasks"
          :data="tasks"
          header-cell-class-name="table-head"
          empty-text="請新增事務"
          stripe
          highlight-current-row
          border
          style="height: 100%; color: #1f2027;"
          @row-click="handleRowClick"
        >
          <el-table-column
            prop="date"
            label="日期"
            align="center"
            width="120"
          />
          <el-table-column
            prop="title"
            label="標題"
            align="center"
            width="110"
          />
          <el-table-column
            prop="summary"
            label="摘要"
            align="center"
          />
        </el-table>

        <el-config-provider :locale="zhTw">
          <el-pagination
            :current-page="currPage"
            :page-size="pageSize"
            :total="count"
            layout="prev, pager, next, total"
            @update:current-page="handleUpdateCurrentPage"
          />
        </el-config-provider>
      </div>
      <div class="right-table">
        <task-detail
          :uuid="selectedUuid"
          @updated="handleUpdateTask"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type{
  Task,
  FetchTasksOptions,
  SearchDateOption,
} from '@/interfaces';
import {
  onMounted, ref
} from 'vue';
import SearchDate from '@/components/SearchDate.vue';
import {
  ElConfigProvider,
  ElMessage,
  type MessageParamsWithType
} from 'element-plus';
import CreateTaskForm from '@/components/task/CreateTaskDialog.vue';
// @ts-ignore /* the file may not be defined, but it works */
import zhTw from 'element-plus/dist/locale/zh-tw.mjs';
import TaskDetail from './TaskDetail.vue';

const taskTable = ref();
const tasks = ref(<Task[]>[]);
const isEditing = ref(false);
const isGettingTasks = ref(true);
const searchDateOption = ref<SearchDateOption>({
    placeholder: '日期',
    value: ''
  });

const pageSize = ref(12);
const currPage = ref(1);
const count = ref(0);

const fetchTasks = (option: FetchTasksOptions = { date: undefined }) => {
  isGettingTasks.value = true;
  try {
    const storedTasksString = localStorage.getItem('tasks');
    const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : [];
    let allTasks;
    if (option.date) {
      allTasks = storedTasks.filter((storedTask: Task) => storedTask.date === option.date);
    } else {
      allTasks = storedTasks;
    }
    
    const startIndex = (currPage.value - 1) * pageSize.value;
    const endIndex = startIndex + pageSize.value;
    tasks.value = allTasks.slice(startIndex, endIndex);

    count.value = (allTasks)?.length;
  } catch (error) {
    ElMessage.error(error as MessageParamsWithType);
  } finally {
    isGettingTasks.value = false;
  }
};

const handleSearch = async (date: string) => {
  if (isEditing.value) {
    ElMessage.warning({ message: 'Error: Editing', showClose: true });
    return;
  }

  searchDateOption.value.value = date;

  fetchTasks({
    date: searchDateOption.value.value
  });
};

const handleResetSearch = async () => {
  if (isEditing.value) {
    ElMessage.warning({ message: 'Error: Editing', showClose: true });
    return;
  }

  searchDateOption.value.value = '';

  fetchTasks();
};

const handleUpdateCurrentPage = (val: number) => {
  if (isEditing.value) {
    ElMessage.warning({ message: 'Error: Editing', showClose: true });
  } else {
    currPage.value = val;
    fetchTasks();
  }
};

const selectedUuid = ref<string>('');

const handleRowClick = (row: Task) => {
  if (isEditing.value) {
    ElMessage.warning({ message: 'Error: Editing', showClose: true });
    const currentRow = tasks.value.find(task => task.uuid === row.uuid);
    taskTable.value.setCurrentRow(currentRow);
  } else {
    selectedUuid.value = row.uuid
  }
};

const handleCreateTask = async (uuid: string) => {
  try {
  fetchTasks();
  const index = tasks.value.findIndex(task => task.uuid === uuid)
    taskTable.value.setCurrentRow(tasks.value[index]);
    selectedUuid.value = uuid
  } catch (error) {
    ElMessage.error(error as MessageParamsWithType);
  }
}

onMounted(async () => {
  fetchTasks({
    date: searchDateOption.value.value
  });
});

const handleUpdateTask = (uuid: string) => {
  try {
    fetchTasks();
    const index = tasks.value.findIndex(task => task.uuid === uuid)
    if (index === -1) return;
    taskTable.value.setCurrentRow(tasks.value[index]);
    selectedUuid.value = uuid
  } catch (error) {
    ElMessage.error(error as MessageParamsWithType);
  }
};

</script>

<style scoped lang="scss">
.main-view {
  height: 100%;
}

main {
  width: 100%;
  padding: 20px 30px 30px 30px;
  display: flex;
  height: 100%;
}

.el-table {
  width: 100%;
}

.left-table {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 20px;
  border-right: 1px solid #ddd;
}
.right-table {
  width: 50%;
  height: 100%;
}

.title-div {
  font-size: 24px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-bottom: 10px;
  color: #1f2027;
}
.top-section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 5px;
}

.el-pagination {
  margin-top: 10px;
  justify-content: center;
}

::v-deep(.table-head) {
  background: #708090 !important;
  .cell {
    font-weight: bold;
    color: #ffffff;
  }
}
::v-deep(.el-table tr td.el-table__cell) {
  padding: 6px 0;
  .cell {
    padding: 0 4px;
    font-size: 14px;
  }
}
::v-deep(.el-table tr.el-table__row.current-row td.el-table__cell) {
  color: #337ecc;
}

</style>