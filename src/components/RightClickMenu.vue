<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// 定义菜单项的类型
export interface MenuItem {
  label?: string;
  icon?: string;
  action?: () => void;
  divider?: boolean;
  children?: MenuItem[];
  disabled?: boolean;
}

// 定义props
interface Props {
  items: MenuItem[];
  show: boolean;
  x: number;
  y: number;
}

const props = defineProps<Props>();

// 定义emits
const emit = defineEmits<{
  close: [];
}>();

// 引用菜单元素
const menuRef = ref<HTMLElement | null>(null);

// 计算菜单的样式位置
const menuStyle = computed(() => ({
  position: 'fixed' as const,
  left: `${props.x}px`,
  top: `${props.y}px`,
  zIndex: 9999,
}));

// 处理点击菜单项
const handleMenuItemClick = (item: MenuItem) => {
  if (item.action && !item.disabled) {
    item.action();
  }
  emit('close');
};

// 处理点击外部关闭菜单 - 使用更简单的方法
const handleClickOutside = () => {
  if (props.show) {
    emit('close');
  }
};

// 阻止事件冒泡，防止点击菜单时触发外部点击事件
const handleMenuClick = (event: MouseEvent) => {
  event.stopPropagation();
};

// 生命周期钩子
onMounted(() => {
  // 使用setTimeout确保组件已经渲染完成
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }, 10);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('contextmenu', (e) => e.preventDefault());
});
</script>

<template>
  <Transition name="menu">
    <v-sheet v-if="show" ref="menuRef" :style="menuStyle" color="surface" elevation="12" rounded="md" width="200px"
      @click="handleMenuClick">
      <v-list>
        <template v-for="(item, index) in items" :key="index">
          <v-divider v-if="item.divider" />
          <v-list-item v-else :disabled="item.disabled" @click="handleMenuItemClick(item)" class="cursor-pointer">
            <v-list-item-icon v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-sheet>
  </Transition>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s ease;
}

.menu-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.menu-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.v-list-item {
  user-select: none;
}
</style>
