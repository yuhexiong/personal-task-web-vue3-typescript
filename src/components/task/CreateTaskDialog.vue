<template>
  <div>
    <el-button
      type="success"
      @mousedown.prevent
      @click="openDialog"
    >
      新增
    </el-button>

    <el-dialog
      v-model="isVisible"
      align-center
      title="新增事務"
    >
      <el-form
        ref="createUserForm"
        :model="form"
        :rules="rules"
      >

      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="選擇日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @keyup.enter="submit(createUserForm)"
        />
      </el-form-item>

        <el-form-item
          label="標題"
          prop="title"
        >
          <el-input
            v-model="form.title"
            @keyup.enter="submit(createUserForm)"
          />
        </el-form-item>

        <el-form-item
          label="摘要"
          prop="summary"
        >
          <el-input
            v-model="form.summary"
            @keyup.enter="submit(createUserForm)"
          />
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="info"
            @mousedown.prevent
            @click="resetForm(createUserForm)"
          >
            取消
          </el-button>

          <el-button
            type="primary"
            @click="submit(createUserForm)"
            @mousedown.prevent
          >
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, watch
} from 'vue';
import { Plus } from '@element-plus/icons-vue';
import {
  ElMessage, type FormInstance, type FormRules, type MessageParamsWithType
} from 'element-plus';
import { toRaw } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '@/interfaces';

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
  date: '',
  title: '',
  summary: '',
};

export default defineComponent({
  emits: ['succeeded'],
  setup(_, { emit }) {
    const createUserForm = ref();
    const form = ref({ ...DEFAULT_FORM_VALUES });
    const isVisible = ref(false);

    const openDialog = () => {
      isVisible.value = true;
    };

    const closeDialog = () => {
      isVisible.value = false;
    };

    const submit = async (formValues: FormInstance | undefined) => {
      if (!formValues) return;

      await formValues.validate(async (valid) => {
        if (valid) {
          try {
            const storedTasksString = localStorage.getItem('tasks');
            const storedTasks = storedTasksString ? JSON.parse(storedTasksString) : [];
            const uuid = uuidv4();
            storedTasks.push(toRaw({ ...form.value, uuid }));

            storedTasks.sort((task1: Task, task2: Task) => {
              const date1 = new Date(task1.date);
              const date2 = new Date(task2.date);

              return date1.getTime() - date2.getTime();
            });

            const tasksJsonString = JSON.stringify(storedTasks);
            localStorage.setItem('tasks', tasksJsonString);

            ElMessage({
              message: '新增成功',
              type: 'success'
            });
            emit('succeeded', uuid);
            closeDialog();
          } catch (error) {
            ElMessage.error(error as MessageParamsWithType);
          }
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      closeDialog();
    };

    watch(isVisible, () => {
      if (!isVisible.value) resetForm(createUserForm.value);
    });

    return {
      Plus,
      form,
      rules,
      isVisible,
      createUserForm,
      submit,
      resetForm,
      openDialog
    };
  }
});
</script>

<style scoped lang="scss">
::v-deep(.el-form-item__label) {
  width: 55px;
}

::v-deep(.el-dialog) {
  width: 30%;
}

::v-deep(.el-input) {
  width: 100%;
}
</style>