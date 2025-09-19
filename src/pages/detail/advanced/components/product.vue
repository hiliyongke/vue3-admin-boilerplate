<template>
  <div class="operator-block operator-gap">
    <div class="operator-content">
      <div class="operator-title">
        <t-icon name="cart" class="operator-title-icon" />
        <h1>{{ data.name }}</h1>
        <div class="operator-title-subtitle">
          {{ data.subtitle }}
        </div>
        <div class="operator-title-tags">
          <t-tag class="operator-title-tag" theme="success" size="small">
            {{ data.size }}
          </t-tag>
          <t-tag class="operator-title-tag" size="small">
            {{ data.cpu }}
          </t-tag>
          <t-tag class="operator-title-tag" size="small">
            {{ data.memory }}
          </t-tag>
        </div>
      </div>
      <div class="operator-item">
        <span class="operator-item-info">{{ data.info }}</span>
        <t-icon class="operator-item-icon" name="chevron-right" size="small" style="color: rgba(0, 0, 0, 0.26)" />
      </div>
    </div>
    <div class="operator-footer">
      <span class="operator-footer-percentage"> {{ data.use }} / {{ data.stock }}（台） </span>
      <t-progress
        class="operator-progress"
        theme="line"
        :percentage="(data.use / data.stock) * 100"
        :label="false"
        :color="data.use / data.stock < 0.5 ? '#E24D59' : ''"
        :track-color="data.use / data.stock < 0.5 ? '#FCD4D4' : '#D4E3FC'"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductComponent',
};
</script>

<script setup lang="ts">
/**
 * 产品数据接口
 */
interface ProductData {
  /** 产品名称 */
  name: string;
  /** 副标题 */
  subtitle: string;
  /** 规格大小 */
  size: string;
  /** CPU 配置 */
  cpu: string;
  /** 内存配置 */
  memory: string;
  /** 产品信息 */
  info: string;
  /** 已使用数量 */
  use: number;
  /** 库存数量 */
  stock: number;
}

/**
 * 组件属性接口
 */
interface Props {
  /** 产品数据 */
  data?: ProductData;
}

/**
 * 组件属性
 */
withDefaults(defineProps<Props>(), {
  data: () => ({
    name: '',
    subtitle: '',
    size: '',
    cpu: '',
    memory: '',
    info: '',
    use: 0,
    stock: 0,
  }),
});
</script>

<style lang="less" scoped>
.operator-gap {
  margin-left: 20px;
}
.operator-block {
  position: relative;
  background-color: var(--td-bg-color-container);
  border: 1px solid var(--td-component-border);
  border-radius: 3px;
  .operator-content {
    height: 256px;
    padding: 20px 32px 24px 32px;
    .operator-title-icon {
      padding: 14px;
      font-size: 56px;
      color: var(--td-brand-color);
      background: var(--td-brand-color-1);
      border-radius: 100%;
    }
    .operator-title {
      position: relative;
      margin-bottom: 25px;
      h1 {
        display: inline-block;
        font-size: 24px;
        font-weight: 500;
        color: var(--td-text-color-primary);
      }
      &-subtitle {
        display: block;
        width: 60%;
        font-size: 14px;
        font-weight: 400;
        color: var(--td-text-color-placeholder);
      }
      &-tag {
        margin-top: 8px;
        margin-right: 4px;
        margin-left: unset;
        border: unset;
      }
      &-icon {
        position: absolute;
        top: 0px;
        right: 0px;
      }
      svg {
        circle {
          fill: var(--td-brand-color-2);
        }
        path {
          fill: var(--td-brand-color);
        }
      }
    }
    .operator-item {
      position: relative;
      padding-top: 8px;
      padding-bottom: 8px;
      &-info {
        display: inline-block;
        width: 60%;
        font-size: 14px;
        color: var(--td-text-color-placeholder);
        text-align: left;
      }
      &-icon {
        position: absolute;
        right: 0;
        bottom: 8px;
      }
    }
  }
  .operator-footer {
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    .t-progress--thin {
      display: unset;
    }
    &-percentage {
      position: absolute;
      right: 32px;
      bottom: 15px;
      color: var(--td-text-color-placeholder);
    }
  }
}
</style>
