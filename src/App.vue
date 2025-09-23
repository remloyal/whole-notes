<script setup lang="ts">
import { ref } from 'vue';
import RightClickMenu from './components/RightClickMenu.vue';
import type { MenuItem } from './components/RightClickMenu.vue';

// 控制右键菜单的状态
const showContextMenu = ref(false);
const contextMenuX = ref(0);
const contextMenuY = ref(0);

// 定义右键菜单的菜单项
const contextMenuItems: MenuItem[] = [
  {
    label: '新建笔记',
    icon: 'mdi-file-plus',
    action: () => {
      console.log('新建笔记');
    },
  },
  {
    label: '打开文件',
    icon: 'mdi-folder-open',
    action: () => {
      console.log('打开文件');
    },
  },
  {
    divider: true,
  },
  {
    label: '复制',
    icon: 'mdi-content-copy',
    action: () => {
      console.log('复制');
    },
  },
  {
    label: '粘贴',
    icon: 'mdi-content-paste',
    action: () => {
      console.log('粘贴');
    },
  },
  {
    divider: true,
  },
  {
    label: '设置',
    icon: 'mdi-cog',
    action: () => {
      console.log('设置');
    },
  },
];

// 处理右键点击事件
const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  contextMenuX.value = event.clientX;
  contextMenuY.value = event.clientY;
  showContextMenu.value = true;
};

// 关闭右键菜单
const closeContextMenu = () => {
  showContextMenu.value = false;
};
</script>

<template>
  <v-layout class="rounded rounded-md border" @contextmenu="handleContextMenu">
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Navigation drawer" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar title="Application bar"></v-app-bar> -->

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <v-sheet
          border="dashed md"
          color="surface-light"
          height="200"
          rounded="lg"
          width="100%"
        >
          <div class="h-full w-full flex items-center justify-center">
            <span class="text-gray-500">右键点击空白区域显示菜单</span>
          </div>
        </v-sheet>
      </v-container>
    </v-main>

    <!-- 右键菜单组件 -->
    <RightClickMenu
      :items="contextMenuItems"
      :show="showContextMenu"
      :x="contextMenuX"
      :y="contextMenuY"
      @close="closeContextMenu"
    />
  </v-layout>
</template>
<style scoped></style>
