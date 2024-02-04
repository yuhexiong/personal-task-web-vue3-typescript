<template>
  <div>
    <el-drawer
      v-model="isExpanded"
      :with-header="false"
      direction="ltr"
      size="250"
      @close="closeDrawer"
    >
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          router
        >
          <sidebar-item
            v-for="route in accessibleRoutes"
            :key="route.path"
            :base-path="route.path"
            :sidebar-route="route"
          />
        </el-menu>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import store from '@/store';
import { SidebarActionType } from '@/store/interfaces';
import SidebarItem from './SidebarItem.vue';

export default defineComponent({
  components: {
    SidebarItem
  },
  setup() {
    const route = useRoute();
    const { accessibleRoutes } = store.getters;
    const isExpanded = computed(() => store.state.sidebar.isExpanded);

    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu as string;
      }
      return path;
    });

    const closeDrawer = () => {
      store.dispatch(SidebarActionType.ACTION_CLOSE_SIDE_BAR);
    };

    return {
      activeMenu,
      isExpanded,
      accessibleRoutes,
      closeDrawer
    };
  }
});
</script>

<style lang="scss" scoped>
::v-deep(.el-drawer__body) {
  padding: 10px 0px 0px 0px;
}
</style>
