import request from 'utils/request';

/**
 * 验证必填
 */
export const require = (message) => {
  const msg = message || '必填项';
  return { required: true, message: msg };
};

/**
 * 数字，中英文，中横线，下划线，utf-8中文
 */
const name = (message = '必须是数字,字母,下划线,汉字') => {
  return {
    validator: (rule, value, callback) => {
      if (value.length > 30) {
        callback('不能超过30个字符');
        return;
      }
      if (!/^[A-Za-z0-9-_\u4e00-\u9fa5]{1,30}$/.test(value)) {
        callback(message);
        return;
      }
      callback();
    },
  };
};

/**
 * 不能超过30个字符
 */
const maxLength = (length = 30, message) => {
  const msg = message || `不能超过${length}个字符`;
  return { pattern: /^[A-Za-z0-9-_\u4e00-\u9fa5]{1, length}$/, message: msg };
};

/**
 * 异步验证名称是否存在
 * @param {*} url 需要验证的 Url
 *
 * @param {*} originValue 编辑时会用到 originValue 如果存在，会比较当前
 *  值和 originValue 是否相等，如果相等则不远程校验名称，如
 *  果不相等，会去远程校验
 *
 * * @param {*} message 验证失败的消息
 *
 */
let asyncNameTime = null;
const asyncName = (url, originValue, message = '名称已存在') => {
  return {
    validator: (rule, value, callback) => {
      // console.log('value', originValue && originValue === value, value);
      if (originValue && originValue === value) {
        callback();
        return;
      }
      if (asyncNameTime) {
        clearTimeout(asyncNameTime);
      }
      asyncNameTime = setTimeout(() => {
        const response = request.get(`${url}${encodeURIComponent(value)}`);
        response.then(res => {
          const isExists = res && res.exists;
          if (!isExists) {
            callback();
            return;
          }
          callback(message);
        });
      }, 300);
    },
  };
};


export default {
  require,
  name,
  asyncName,
  maxLength,
}
