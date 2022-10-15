import { reactive } from 'vue';
import { getParentNodeById } from '/@/utils/treeHelper';

/**
 * @param {Function} request 接口函数
 * @param {Object} defaultParams 默认入参
 * @param {Boolean} isInit 是否初始化调用
 */
export function useTree(request, defaultParams = {}, isInit = false) {
  if (typeof request !== 'function') {
    console.error('useTree expected a Fuction as first params');
  }
  const state = reactive({
    // 上一次数据源
    preData: [],
    // 当前数据源
    data: [],
    // 选中节点
    selectedNode: null,
    // 勾选节点keys
    checkedKeys: []
  });
  // 设置state
  const setState = (obj = {}) => {
    Object.keys(obj).forEach(key => {
      state[key] = obj[key];
    });
  };
  // api请求
  const _request = async () => {
    const res = await request(defaultParams);
    if (res) {
      const { list } = res.data;
      state.data = list;
    }
  };
  // 初始化数据
  isInit && _request();
  /**
   * @description 新增节点
   * @param {Object} data 选中节点数据
   * @param {Object} newChild 新的子节点数据
   */
  function appendNode(data, newChild) {
    // 在首层添加节点
    if (!data) {
      state.data.push(newChild);
      return;
    }
    if (!data.children) {
      data.children = [];
    }
    const { id } = data;
    // 构建新节点
    const node = {
      ...newChild,
      parentId: id
    };
    data.children.push(node);
  }
  /**
   * @description 编辑节点
   * @param {Object} data 原节点数据
   * @param {object} newChild  新节点数据
   */
  function updateNode(data, newChild = {}) {
    Object.keys(newChild).forEach(key => {
      data[key] = newChild[key];
    });
  }
  /**
   * @description 删除节点
   * @param {Object} data 选中节点
   */
  function removeNode(data) {
    const parent = getParentNodeById(state.data, data.id);
    // parent存在,选中节点不是顶级节点
    if (parent) {
      const index = parent.children.findIndex(d => d.id === data.id);
      parent.children.splice(index, 1);
    } else {
      const index = state.data.findIndex(d => d.id === data.id);
      state.data.splice(index, 1);
    }
  }

  return {
    state,
    setState,
    appendNode,
    updateNode,
    removeNode
  };
}
