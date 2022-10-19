// 获取常用时间
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

// 年月日时间格式化
export const formatToDateTime = (
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT
): string => {
  return dayjs(date).format(format);
};

// 年月日格式化
export const formatToDate = (
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT
): string => {
  return dayjs(date).format(format);
};

// 最近七天
export const LAST_7_DAYS = [
  dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD')
];

// 最近30天
export const LAST_30_DAYS = [
  dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
  dayjs().subtract(1, 'day').format('YYYY-MM-DD')
];
