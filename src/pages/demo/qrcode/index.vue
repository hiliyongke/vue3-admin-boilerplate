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
import qrcodeVue from 'qrcode.vue';
/* in ES 6 */
import domtoimage from 'dom-to-image';
import { defineComponent, ref } from 'vue';
import { urlToBlob } from '@/utils/transfer2blob';

export default defineComponent({
  components: {
    qrcodeVue
  },
  setup() {
    const qrcodeImgSrc = ref();
    const qrcodeRef = ref();
    const configFormRef = ref();
    const value = ref('https://example.com');
    const configRules = {
      hostName: [
        { required: true, message: '请输入二维码链接', trigger: 'blur' }
      ]
    };
    const configForm = ref({
      hostName: 'https://example.com'
    });

    /**
     * @description 下载图片
     */
    const handleDownImg = () => {
      urlToBlob(qrcodeImgSrc.value, (res: any) => {
        const link = document.createElement('a');
        const href = window.URL.createObjectURL(res); // 创建下载的链接
        link.href = href;
        link.download = 'Download.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
      ElMessage.success('保存成功！');
    };

    /**
     * @description 生成海报图片
     * @param
     */
    const generateImg = () => {
      const options = { cacheBust: true, width: 375, bgcolor: '#fff' };
      domtoimage
        .toBlob(qrcodeRef.value, options)
        .then((blob: Blob) => {
          const reader = new FileReader();
          reader.onload = e => {
            qrcodeImgSrc.value = e?.target?.result;
            handleDownImg();
          };
          if (blob) {
            reader.readAsDataURL(blob);
          }
        })
        .catch((error: any) => {
          // eslint-disable-next-line no-console
          console.error('oops, something went wrong!', error);
        });
    };

    return {
      qrcodeRef,
      value,
      configFormRef,
      configForm,
      configRules,
      generateImg
    };
  }
});
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
