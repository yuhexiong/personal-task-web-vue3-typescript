<template>
  <nav>
    <ul>
      <li>
        <el-button
          class="sidebar-controller"
          :icon="Expand"
          text
          @click="expandSidebar"
        />
      </li>
      <li>
        <p>
          事務紀錄系統
        </p>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, Expand, UserFilled } from '@element-plus/icons-vue';
import store from '@/store';
import { SidebarActionType } from '@/store/interfaces';

export default defineComponent({
  setup() {
    const router = useRouter();

    const expandSidebar = () => {
      store.dispatch(SidebarActionType.ACTION_OPEN_SIDE_BAR);
    };

    return {
      router,
      Expand,
      UserFilled,
      ArrowRight,
      expandSidebar
    };
  }
});
</script>

<style lang="scss" scoped>
body {
  color: #fff;
}

nav {
  width: 100%;
  height: 65px;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  z-index: 1;
  display: flex;
  justify-content: space-between;

  ul {
    height: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: end;

    li {
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      p {
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}

.el-dropdown {
  height: 100%;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.sidebar-controller {
  font-size: 24px;
}
</style>
