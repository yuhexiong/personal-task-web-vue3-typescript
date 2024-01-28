<template>
  <div class="layout-wrapper">
    <AppSidebar />
    <MainView class="main-view" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppSidebar from '@/layout/sidebar/Index.vue';
import MainView from '@/layout/main/Index.vue';

export default defineComponent({
  components: {
    AppSidebar,
    MainView
  }
});
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-view {
  flex-grow: 1;
}
</style>
