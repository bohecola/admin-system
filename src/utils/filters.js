export function dateFormat(timestamp, format = 'Y-m-d') {
  // timestamp为传入Date()构造函数的参数
  // format格式:
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  const date = timestamp ? new Date(timestamp) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 构建元信息日期对象，方便正则匹配成功后，进行替换
  const MetaDate = {
    Y: year,
    m: month,
    d: day,
    H: hours,
    i: minutes,
    s: seconds
  };

  return format.replace(
    /Y|m|d|H|i|s/ig,
    (matched) => matched === 'Y' ? MetaDate[matched] : zeroFill(MetaDate[matched])
  );
}

// 补领函数
export const zeroFill = n => n < 10 ? `0${n}` : n;