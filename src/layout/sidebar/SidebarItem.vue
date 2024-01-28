<template>
  <el-menu-item v-if="mainRoute?.meta && !mainRoute?.meta?.hidden" :index="`${resolvePath(mainRoute.path)}`">
    <div v-if="mainRoute?.meta?.icon" class="menu-icon-container">
      <div class="menu-icon">
        <FontAwesomeIcon
          :icon="['fas', mainRoute?.meta?.icon]"
          size="xl"
        />
      </div>
    </div>
    <template #title>
      {{ mainRoute?.meta?.title }}
    </template>
  </el-menu-item>

  <el-sub-menu
    v-else-if="sidebarRoute?.children && !sidebarRoute?.children[0].meta?.hidden"
    :index="`${resolvePath(sidebarRoute.path)}`"
  >
    <template #title>
      <div
        v-if="sidebarRoute?.meta?.icon"
        class="menu-icon-container"
      >
        <div class="menu-icon">
          <FontAwesomeIcon :icon="['fas', sidebarRoute?.meta?.icon]" size="xl" />
        </div>
      </div>
      <span>{{ sidebarRoute?.meta?.title }}</span>
    </template>

    <el-menu-item
      v-for="child in nestedRoutes"
      :key="resolvePath(child?.path)"
      :index="resolvePath(child?.path)"
    >
      <div v-if="child?.meta?.icon" class="menu-icon-container">
        <div class="menu-icon">
          <FontAwesomeIcon :icon="['fas', child?.meta?.icon]" size="xl" />
        </div>
      </div>
      <template #title>
        <span>{{ child?.meta?.title }}</span>
      </template>
    </el-menu-item>
  </el-sub-menu>
</template>

<script lang="ts">
import {
  defineComponent, toRefs, type PropType, computed
} from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export default defineComponent({
  props: {
    sidebarRoute: {
      type: Object as PropType<RouteRecordRaw>,
      default: () => {}
    },
    basePath: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { sidebarRoute, basePath } = toRefs(props);

    const visibleChildrenRouteCount = computed(() => (sidebarRoute.value.children
      ? sidebarRoute.value.children.filter((route) => !(route.meta && route.meta.hidden)).length
      : 0));

    const mainRoute = computed(() => {
      if (visibleChildrenRouteCount.value > 1) {
        return null;
      }

      if (sidebarRoute.value.children) {
        const childRoute = sidebarRoute.value.children
          .find((route) => !route.meta || !route.meta.hidden);
        if (childRoute) {
          return childRoute;
        }
      }

      return { ...sidebarRoute.value, path: '' };
    });

    const nestedRoutes = computed(() => sidebarRoute.value?.children
      ?.filter((childRoute) => !childRoute?.meta?.hidden));

    const resolvePath = (routePath: string) => {
      const isChildRoutePath = routePath && (basePath.value !== '/');
      const isRootRoutePath = routePath.startsWith('/');

      if (isChildRoutePath && !isRootRoutePath) {
        return `${basePath.value}/${routePath}`;
      }

      if (isRootRoutePath) {
        return `${routePath}`;
      }

      return basePath.value;
    };

    return {
      mainRoute,
      nestedRoutes,
      resolvePath
    };
  }
});
</script>

<style lang="scss" scoped>
.menu-icon-container {
  display: flex;
  align-items: center;
}

.menu-icon {
  width: 24px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
}

.el-sub-menu.is-active > :deep(.el-sub-menu__title) {
  color: var(--el-menu-active-color) !important;
  transition: color 0s;
}
</style>
