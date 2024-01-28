<template>
  <div class="main-view-wrapper">
    <AppNavigator />
    <router-view
      :key="routePath"
      class="main-view"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import AppNavigator from '@/layout/navigator/Index.vue';

export default defineComponent({
  components: {
    AppNavigator
  },
  setup() {
    const route = useRoute();
    const routePath = () => route.path;

    return {
      routePath
    };
  }
});
</script>

<style lang="scss" scoped>
.main-view {
  width: 100%;
  overflow-y: scroll;
}

.main-view-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
