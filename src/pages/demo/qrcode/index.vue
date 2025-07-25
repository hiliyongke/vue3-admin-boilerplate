<template>
  <div class="qrcode-container">
    <div class="info">
      <t-divider content-position="left">生成二维码</t-divider>
      <span style="text-align: left">
        生成二维码通常用来做前台海报生成或者后台活动营销推广码配置
      </span>
    </div>
    <div class="grid-content bg-purple-dark">
      <t-card class="box-card">
        <div style="text-align: left">
          <span>后台活动营销配置推广码场景</span>
          <t-divider></t-divider>
        </div>
        <div class="qrcode-wrapper">
          <div ref="qrcodeRef">
            <qrcode-vue :value="configForm.hostName"></qrcode-vue>
          </div>
          <div class="qrcode-config">
            <t-form
              ref="configFormRef"
              :model="configForm"
              :rules="configRules"
            >
              <t-form-item
                label="域名"
                prop="hostName"
              >
                <t-input v-model="configForm.hostName"></t-input>
              </t-form-item>
            </t-form>
            <t-button
              style="margin-top: 10px"
              @click="generateImg"
            >
              保存二维码
            </t-button>
          </div>
        </div>
      </t-card>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'QrcodeDemo'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import qrcodeVue from 'qrcode.vue';
import domtoimage from 'dom-to-image';
import { MessagePlugin } from 'tdesign-vue-next';
import { urlToBlob } from '@/utils/transfer2blob';

/**
 * 表单配置接口
 */
interface ConfigForm {
  hostName: string;
}

/**
 * 表单验证规则类型
 */
type ConfigFormRules = {
  [K in keyof ConfigForm]: Array<{
    required: boolean;
    message: string;
    trigger: 'change' | 'blur';
  }>;
};

/**
 * DOM转图片选项接口
 */
interface DomToImageOptions {
  cacheBust: boolean;
  width: number;
  bgcolor: string;
}

/**
 * 二维码图片源
 */
const qrcodeImgSrc = ref<string>('');

/**
 * 二维码容器引用
 */
const qrcodeRef = ref<HTMLElement>();

/**
 * 表单引用
 */
const configFormRef = ref();

/**
 * 默认值
 */
const value = ref<string>('https://example.com');

/**
 * 表单验证规则
 */
const configRules: ConfigFormRules = {
  hostName: [
    { required: true, message: '请输入二维码链接', trigger: 'blur' }
  ]
};

/**
 * 表单配置
 */
const configForm = ref<ConfigForm>({
  hostName: 'https://example.com'
});

/**
 * 下载图片
 */
const handleDownImg = (): void => {
  if (!qrcodeImgSrc.value) {
    MessagePlugin.error('图片生成失败');
    return;
  }

  urlToBlob(qrcodeImgSrc.value, (res: Blob) => {
    const link = document.createElement('a');
    const href = window.URL.createObjectURL(res);
    link.href = href;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
  });
  MessagePlugin.success('保存成功！');
};

/**
 * 生成海报图片
 */
const generateImg = (): void => {
  if (!qrcodeRef.value) {
    MessagePlugin.error('二维码容器未找到');
    return;
  }

  const options: DomToImageOptions = {
    cacheBust: true,
    width: 375,
    bgcolor: '#fff'
  };

  domtoimage
    .toBlob(qrcodeRef.value, options)
    .then((blob: Blob | null) => {
      if (!blob) {
        MessagePlugin.error('图片生成失败');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          qrcodeImgSrc.value = result;
          handleDownImg();
        }
      };
      reader.readAsDataURL(blob);
    })
    .catch((error: Error) => {
      console.error('生成二维码图片失败:', error);
      MessagePlugin.error('生成图片失败，请重试');
    });
};
</script>
<style lang="less" scoped>
.qrcode-container {
  margin-top: 20px;
  .info {
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    text-align: left;
  }
  .qrcode-wrapper {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .qrcode-config {
      width: 70%;
      text-align: center;
    }
  }
}
</style>
