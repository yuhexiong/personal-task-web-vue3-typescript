<template>
  <div>
    <section>
      <div class="search-input">
        <el-date-picker
          v-model="inputValue"
          :placeholder="searchDateOption.placeholder"
          type="date"
          format="YYYY-MM-DD"
          :picker-options="{ firstDayOfWeek: 1 }"
          @change="handleDateChange(inputValue)"
        />
      </div>

      <div class="actions">
        <el-button
          type="primary"
          @click="emitSearchValue"
          @mousedown.prevent
        >
          查詢
        </el-button>

        <el-button
          type="info"
          @mousedown.prevent
          @click="resetSearchValue"
        >
          清除
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  ref, watch, toRefs
} from 'vue';
import type { SearchDateOption } from '@/interfaces';
import moment from 'moment';

interface Props {
  searchDateOption: SearchDateOption
}

const props = defineProps<Props>();

const emit = defineEmits(['click', 'reset']);

const { searchDateOption } = toRefs(props);

const inputValue = ref('');

watch(searchDateOption, () => {
  inputValue.value = searchDateOption.value.value;
});

const emitSearchValue = () => {
  emit('click', moment(inputValue.value).format('YYYY-MM-DD'));
};

const resetSearchValue = () => {
  inputValue.value = '';

  emit('reset', moment(inputValue.value).format('YYYY-MM-DD'));
};

const handleDateChange = (value: string) => {
  inputValue.value = value;
};

</script>

<style scoped lang="scss">
section {
  display: flex;
}

.search-input {
  margin-right: 12px;
}

.actions {
  display: flex;
}
</style>
