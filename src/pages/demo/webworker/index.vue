<template>
  <div>
    <div>the recommend using way of worker</div>
    <div>计算结果：{{ showPageRef }}</div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'WebWorkerDemo',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * Worker 消息事件接口
 */
interface WorkerMessageEvent extends MessageEvent {
  data: number;
}

/**
 * Worker 函数类型
 */
type WorkerFunction = () => void;

/**
 * 计算结果显示
 */
const showPageRef = ref<number | null>(null);

/**
 * Worker 代码函数
 * 推荐阅读: https://blog.csdn.net/damo_qian/article/details/112757281
 */
const workerCode: WorkerFunction = () => {
  // 在 Worker 中监听消息
  onmessage = (e: MessageEvent<number>) => {
    console.time('加载时间');
    console.log(`接收到主线程的信息: ${e.data}`);

    // 处理复杂的 JS 逻辑
    let countNum = 0;
    for (let i = 0; i < e.data; i++) {
      countNum = i + countNum;
    }

    // 处理完毕返回主线程
    console.log('子线程数据处理完毕返回主线程');
    console.timeEnd('加载时间');
    postMessage(countNum);
  };
};

/**
 * 将函数转换为 Worker URL
 * @param func 要转换的函数
 * @returns Worker 实例
 */
const changeFuncToUrl = (func: WorkerFunction): Worker => {
  // 把函数转成一个自执行函数
  const workBlob = new Blob([`(${func.toString()})()`], {
    type: 'application/javascript',
  });
  const url = URL.createObjectURL(workBlob);
  return new Worker(url);
};

/**
 * 初始化 Worker 并开始计算
 */
const initWorker = (): void => {
  // 主线程逻辑
  const worker = changeFuncToUrl(workerCode);

  // 发送数据到 Worker
  worker.postMessage(30000000);

  // 监听 Worker 返回的消息
  worker.onmessage = (e: WorkerMessageEvent) => {
    console.log(`主进程收到了子进程发出的信息：${e.data}`);
    showPageRef.value = e.data;

    // 停止线程（注：用完后一定要停止）
    worker.terminate();
  };

  // 错误处理
  worker.onerror = (error: ErrorEvent) => {
    console.error('Worker 发生错误:', error);
    worker.terminate();
  };
};

// 页面加载时初始化 Worker
initWorker();
</script>
