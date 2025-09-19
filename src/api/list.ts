import request from '@/utils/request';

const Api = {
  BaseList: 'mock/api/get-list',
  CardList: 'mock/api/get-card-list',
};

export function getList() {
  return request.get({
    url: Api.BaseList,
  });
}

export function getCardList() {
  return request.get({
    url: Api.CardList,
  });
}
