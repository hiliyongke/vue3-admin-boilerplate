<template>
  <t-card theme="poster2">
    <template #avatar>
      <t-avatar size="56px">
        <template #icon>
          <shop-icon v-if="product?.type === 1" />
          <calendar-icon v-if="product?.type === 2" />
          <service-icon v-if="product?.type === 3" />
          <user-avatar-icon v-if="product?.type === 4" />
          <laptop-icon v-if="product?.type === 5" />
        </template>
      </t-avatar>
    </template>
    <template #status>
      <t-tag
        :theme="product?.isSetup ? 'success' : 'default'"
        :disabled="!product?.isSetup"
      >
        {{ product?.isSetup ? '已启用' : '已停用' }}
      </t-tag>
    </template>
    <template #content>
      <p class="list-card-item_detail--name">{{ product?.name }}</p>
      <p class="list-card-item_detail--desc">{{ product?.description }}</p>
    </template>
    <template #footer>
      <t-avatar-group
        cascading="left-up"
        :max="2"
      >
        <t-avatar>{{ typeMap[product?.type ? product.type - 1 : 0] }}</t-avatar>
        <t-avatar>
          <template #icon>
            <add-icon />
          </template>
        </t-avatar>
      </t-avatar-group>
    </template>
    <template #actions>
      <t-dropdown
        :disabled="!product?.isSetup"
        trigger="click"
        :options="[
          {
            content: '管理',
            value: 'manage',
            onClick: () => product && handleClickManage(product)
          },
          {
            content: '删除',
            value: 'delete',
            onClick: () => product && handleClickDelete(product)
          }
        ]"
      >
        <t-button
          theme="default"
          :disabled="!product?.isSetup"
          shape="square"
          variant="text"
        >
          <more-icon />
        </t-button>
      </t-dropdown>
    </template>
  </t-card>
</template>

<script setup lang="ts">
import {
  ShopIcon,
  CalendarIcon,
  ServiceIcon,
  UserAvatarIcon,
  LaptopIcon,
  MoreIcon,
  AddIcon
} from 'tdesign-icons-vue-next';

/**
 * 产品卡片数据接口
 */
export interface CardProductType {
  /** 产品类型 1-5 */
  type: number;
  /** 是否启用 */
  isSetup: boolean;
  /** 产品描述 */
  description: string;
  /** 产品名称 */
  name: string;
}

/**
 * 组件属性接口
 */
interface Props {
  /** 产品信息 */
  product?: CardProductType;
}

/**
 * 组件事件接口
 */
interface Emits {
  /** 管理产品事件 */
  'manage-product': [product: CardProductType];
  /** 删除产品事件 */
  'delete-item': [product: CardProductType];
}

/**
 * 组件属性
 */
const props = withDefaults(defineProps<Props>(), {
  product: undefined
});

/**
 * 组件事件
 */
const emit = defineEmits<Emits>();

/**
 * 产品类型映射
 */
const typeMap: readonly string[] = ['A', 'B', 'C', 'D', 'E'] as const;

/**
 * 处理管理产品点击
 * @param product 产品信息
 */
const handleClickManage = (product: CardProductType): void => {
  emit('manage-product', product);
};

/**
 * 处理删除产品点击
 * @param product 产品信息
 */
const handleClickDelete = (product: CardProductType): void => {
  emit('delete-item', product);
};
</script>

<style lang="less" scoped>
.list-card-item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &_detail {
    min-height: 140px;
    &--name {
      margin-bottom: 8px;
      font-size: 16px;
      font-weight: 400;
      color: var(--td-text-color-primary);
    }
    &--desc {
      display: -webkit-box;
      height: 40px;
      overflow: hidden;
      font-size: 12px;
      line-height: 20px;
      color: var(--td-text-color-secondary);
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
