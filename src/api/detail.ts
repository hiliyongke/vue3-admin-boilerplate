import request from '@/utils/request';

const Api = {
  PurchaseList: '/mock/api/get-purchase-list',
  ProjectList: '/mock/api/get-project-list',
};

export function getPurchaseList() {
  return request.get({
    url: Api.PurchaseList,
  });
}

export function getProjectList() {
  return request.get({
    url: Api.ProjectList,
  });
}
