<template>
  <div class="wrapper">
    <main>
      <div class="top-nav">
        <div class="title">
          <h2 style="color: #1f2027;">
            詳細資料
          </h2>
        </div>
      </div>

      <div class="task-detail">
        <el-form
          ref="taskInfoForm"
          :model="form"
          :rules="rules"
          label-position="top"
          label-width="auto"
        >
          <div class="container">
            <div class="title-info">
              <el-form-item
                label="標題"
                prop="title"
              >
                <el-input
                  v-model="form.title"
                />
              </el-form-item>

              <el-form-item
                label="優先度"
                prop="priorityType"
              >
                <el-select
                  v-model="form.priorityType"
                  style="width: 100px;"
                >
                  <el-option
                    v-for="item in priorityTypes"
                    :key="item"
                    :label="PRIORITY_TYPE_LABEL[item]"
                    :value="item"
                  />
                </el-select>
              </el-form-item>

              <div class="switch-container">
                <span style="margin: 0 20px 0 0; color: #1f2027;">
                  {{ form.status === true ? '已完成' : '未完成' }}
                </span>
                <el-switch
                  v-model="form.status"
                  style="--el-switch-on-color: var(--el-color-success); --el-switch-off-color: var(--el-color-danger);"
                  :active-value="true"
                  :inactive-value="false"
                />
              </div>
            </div>

            <div class="one-column-info">
              <el-form-item
                label="摘要"
                prop="summary"
                style="width: 90%;"
              >
                <el-input
                  v-model="form.summary"
                />
              </el-form-item>
            </div>

            <div class="two-col-info">
              <el-form-item
                label="日期"
                prop="date"
              >
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="請選擇日期"
                  value-format="YYYY-MM-DD"
                />
              </el-form-item>
              <el-form-item
                label="參與者"
                prop="participant"
              >
                <el-input
                  v-model="form.participant"
                />
              </el-form-item>
            </div>

            <div class="one-column-info">
              <el-form-item
                label="地點"
                prop="address"
                style="width: 90%;"
              >
                <el-input
                  v-model="form.address"
                />
              </el-form-item>
            </div>

            <div class="one-column-info">
              <el-form-item
                label="紀錄"
                prop="thought"
                style="width: 90%;"
              >
                <el-input
                  v-model="form.thought"
                  type="textarea"
                  :rows="3"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>

        <div class="submit-container">
          <el-button
            type="success"
            @mousedown.prevent
            @click="submit(taskInfoForm)"
          >
            儲存
          </el-button>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import {
  ElMessage, type FormInstance, type FormRules, type MessageParamsWithType
} from 'element-plus';
import {
  defineComponent, ref, reactive, watch
} from 'vue';
import { 
  PRIORITY_TYPE_LABEL, 
  PriorityType,
  type Task 
} from '@/interfaces';
import { toRaw } from 'vue';

const priorityTypes = [PriorityType.LOW, PriorityType.MEDIUM, PriorityType.HIGH];

const rules = reactive<FormRules>({
  date: [
    { required: true, message: '此為必填欄位' }
  ],
  title: [
    { required: true, message: '此為必填欄位' }
  ],
  summary: [
    { required: true, message: '此為必填欄位' }
  ]
});

const DEFAULT_FORM_VALUES = {
  uuid: '',
  title: '',
  summary: '',
  date: '',
  address: '',
  participant: '',
  status: false,
  priorityType: '',
  thought: '',
};

export default defineComponent({
  props: {
    uuid: {
      type: String,
      default: '',
    },
  },
  emits: ['updated'],
  setup(props, { emit }) {
    const task = ref();
    const form = ref({ ...DEFAULT_FORM_VALUES });
    const taskInfoForm = ref();

    const fetchTask = (uuid: string) => {
      try {
        const storedTasksString = localStorage.getItem('tasks');
        const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : [];
        task.value = storedTasks.find((task: Task) => task.uuid === uuid);

      } catch (error) {
        ElMessage.error(error as MessageParamsWithType);
      }
    };

    const updateTask = (uuid: string) => {
      try {
        fetchTask(uuid)
        emit('updated', uuid);
      } catch (error) {
        ElMessage.error(error as MessageParamsWithType);
      }
    }

    const submit = async (formValues: FormInstance | undefined) => {
      if (!formValues) return;

      await formValues.validate(async (valid) => {
        if (valid) {
          try {
            const storedTasksString = localStorage.getItem('tasks');
            const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : [];
            const updateIndex = storedTasks.findIndex((storedTask: Task) => storedTask.uuid === form.value.uuid)

            storedTasks[updateIndex] = toRaw(form.value);;
            storedTasks.sort((task1: Task, task2: Task) => {
              const date1 = new Date(task1.date);
              const date2 = new Date(task2.date);
              return date1.getTime() - date2.getTime();
            });

            const tasksJsonString = JSON.stringify(storedTasks);
            localStorage.setItem('tasks', tasksJsonString);

            ElMessage({
              message: '更新成功',
              type: 'success'
            });
            updateTask(form.value.uuid);

          } catch (error) {
            ElMessage.error(error as MessageParamsWithType);
          }
        }
      });
    };

    watch(task, () => {
      form.value = {
        uuid: task.value.uuid,
        title: task.value.title,
        summary: task.value.summary,
        date: task.value.date,
        address: task.value.address ?? '',
        participant: task.value.participant ?? '',
        status: task.value.status ?? '',
        priorityType: task.value.priorityType ?? '',
        thought: task.value.thought ?? '',
      };
    });

    watch(
      () => props.uuid,
      (uuid) => {
        if (uuid) {
          fetchTask(uuid);
        }
      }
    );

    return {
      form,
      rules,
      taskInfoForm,
      task,
      priorityTypes,
      PRIORITY_TYPE_LABEL,
      submit,
      fetchTask,
      updateTask,
    };
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  height: 100%;
}

main {
  width: 100%;
  height: 100%;
  padding: 30px 0px 20px 20px;
}

.top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
}

.title {
  display: flex;
  align-items: center;
}

h2 {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
}

.task-detail {
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title-info {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 8px;
}

.switch-container {
  grid-column: 3 / span 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 40%;
}

.switch-container .el-switch {
  margin-top: 5px;
  margin-right: 20px;
}

.two-col-info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  row-gap: 8px;
}

.one-column-info {
  margin-bottom: 8px;
}

.submit-container {
  display: flex;
  justify-content: center;
}

::v-deep(.el-form-item) {
  width: 80%;
  label {
    color: #1f2027;
  }
}

::v-deep(.el-input) {
  width: 100%;
  height: 35px;
}

</style>
