<template>
  <t-form
    ref="form"
    class="base-form"
    :data="formData"
    :rules="FORM_RULES"
    label-align="top"
    :label-width="100"
    @reset="onReset"
    @submit="onSubmit"
  >
    <div class="form-basic-container">
      <div class="form-basic-item">
        <div class="form-basic-container-title">合同信息</div>
        <!-- 表单内容 -->

        <!-- 合同名称,合同类型 -->
        <t-row
          class="row-gap"
          :gutter="[16, 24]"
        >
          <t-col :span="6">
            <t-form-item
              label="合同名称"
              name="name"
            >
              <t-input
                v-model="formData.name"
                :style="{ width: '322px' }"
                placeholder="请输入内容"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item
              label="合同类型"
              name="type"
            >
              <t-select
                v-model="formData.type"
                :style="{ width: '322px' }"
                placeholder="请选择类型"
                class="demo-select-base"
                clearable
              >
                <t-option
                  v-for="(item, index) in TYPE_OPTIONS"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>

          <!-- 合同收付类型 -->
          <t-col :span="8">
            <t-form-item
              label="合同收付类型"
              name="payment"
            >
              <t-radio-group v-model="formData.payment">
                <t-radio value="1">收款</t-radio>
                <t-radio value="2">付款</t-radio>
              </t-radio-group>
              <span class="space-item"></span>
              <div>
                <t-input
                  placeholder="请输入金额"
                  :style="{ width: '160px' }"
                />
              </div>
            </t-form-item>
          </t-col>

          <t-col :span="6">
            <t-form-item
              label="甲方"
              name="partyA"
            >
              <t-select
                v-model="formData.partyA"
                :style="{ width: '322px' }"
                class="demo-select-base"
                placeholder="请选择类型"
                clearable
              >
                <t-option
                  v-for="(item, index) in PARTY_A_OPTIONS"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item
              label="乙方"
              name="partyB"
            >
              <t-select
                v-model="formData.partyB"
                :style="{ width: '322px' }"
                placeholder="请选择类型"
                class="demo-select-base"
                clearable
              >
                <t-option
                  v-for="(item, index) in PARTY_B_OPTIONS"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                >
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item
              label="合同签订日期"
              name="signDate"
            >
              <t-date-picker
                v-model="formData.signDate"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item
              label="合同生效日期"
              name="startDate"
            >
              <t-date-picker
                v-model="formData.startDate"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item
              label="合同结束日期"
              name="endDate"
            >
              <t-date-picker
                v-model="formData.endDate"
                :style="{ width: '322px' }"
                theme="primary"
                mode="date"
                separator="/"
              />
            </t-form-item>
          </t-col>
          <t-col :span="6">
            <t-form-item
              label=""
              name="files"
            >
              <t-upload
                v-model="formData.files"
                action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                tips="请上传pdf文件，大小在60M以内"
                :size-limit="{ size: 60, unit: 'MB' }"
                :format-response="formatResponse"
                :before-upload="beforeUpload"
                @fail="handleFail"
              >
                <t-button
                  class="form-submit-upload-btn"
                  variant="outline"
                >
                  上传合同文件
                </t-button>
              </t-upload>
            </t-form-item>
          </t-col>
        </t-row>

        <div class="form-basic-container-title form-title-gap">其它信息</div>

        <t-form-item
          label="备注"
          name="comment"
        >
          <t-textarea
            v-model="formData.comment"
            :height="124"
            placeholder="请输入备注"
          />
        </t-form-item>
        <t-form-item label="公证人">
          <t-avatar-group>
            <t-avatar>D</t-avatar>
            <t-avatar>S</t-avatar>
            <t-avatar>+</t-avatar>
          </t-avatar-group>
        </t-form-item>
      </div>
    </div>

    <div class="form-submit-container">
      <div class="form-submit-sub">
        <div class="form-submit-left">
          <t-button
            theme="primary"
            class="form-submit-confirm"
            type="submit"
          >
            提交
          </t-button>
          <t-button
            type="reset"
            class="form-submit-cancel"
            theme="default"
            variant="base"
          >
            取消
          </t-button>
        </div>
      </div>
    </div>
  </t-form>
</template>

<script lang="ts">
export default {
  name: 'FormBase'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { MessagePlugin } from 'tdesign-vue-next';
import type { UploadFile } from 'tdesign-vue-next';
import {
  FORM_RULES,
  INITIAL_DATA,
  TYPE_OPTIONS,
  PARTY_A_OPTIONS,
  PARTY_B_OPTIONS
} from './constants';

import type { SubmitContext } from 'tdesign-vue-next';

/**
 * 上传失败事件参数接口
 */
interface UploadFailEvent {
  file: UploadFile;
}

/**
 * 上传响应接口
 */
interface UploadResponse {
  url?: string;
  error?: string;
  [key: string]: any;
}

/**
 * 表单数据
 */
const formData = ref({ ...INITIAL_DATA });

/**
 * 重置表单
 */
const onReset = (): void => {
  MessagePlugin.warning('取消新建');
};

/**
 * 提交表单
 * @param context 提交上下文
 */
const onSubmit = (context: SubmitContext): void => {
  if (context.validateResult === true) {
    MessagePlugin.success('新建成功');
  }
};

/**
 * 上传前验证
 * @param file 上传文件
 * @returns 是否允许上传
 */
const beforeUpload = (file: UploadFile): boolean => {
  if (!/\.(pdf)$/.test(file.name || '')) {
    MessagePlugin.warning('请上传pdf文件');
    return false;
  }
  if ((file.size || 0) > 60 * 1024 * 1024) {
    MessagePlugin.warning('上传文件不能大于60M');
    return false;
  }
  return true;
};

/**
 * 上传失败处理
 * @param param 失败事件参数
 */
const handleFail = ({ file }: UploadFailEvent): void => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

/**
 * 格式化上传响应
 * 用于格式化接口响应值，error 会被用于上传失败的提示文字；url 表示文件/图片地址
 * @param res 响应数据
 * @returns 格式化后的响应
 */
const formatResponse = (res: UploadResponse): UploadResponse => {
  return {
    ...res,
    error: '上传失败，请重试',
    url: res.url
  };
};
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
