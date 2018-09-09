import fetch from 'dva/fetch';
import { notification } from 'antd';
import { stringify as qsStringify } from 'qs';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {

    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      return response.json();
    });
}

/**
 *  the proxy of request
 * @param url
 * @param options
 * @returns {*}
 */
function proxyRequest(url, options, showError = true) {
  options = options || {};
  return request(url, options).then((response) => {
    if (response.code === 0) {
      return response.data || {};
    }
    if (showError) {
      notification.error({
        message: response.data.message || 'system error',
      });
    }
    const e = new Error();
    e.code = response.code;
    e.message = response.message || `Failed to get data code : ${e.code}`;
    throw e;
  }).catch((e) => {
    // notification.error({
    //   message: 'system error',
    // });
  });
}

/**
 * @param url
 * @param data   such as : {name = xxx ,age = xx } equel : url ? name=xxx&age=xx
 * @param options
 * @returns {*}
 */
proxyRequest.get = (url, data, options, showError) => {
  options = options || {};
  url = data ? `${url}?${qsStringify(data)}` : url;
  return proxyRequest(url, options, showError);
};

/**
 * 接口错误不在右侧弹出提示
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
proxyRequest.getD = (url, data, options) => {
  return proxyRequest.get(url, data, options, false);
};

/**
 *
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
proxyRequest.post = (url, data, options, showError) => {
  options = options || {};
  options.body = data || {};
  options.method = 'POST';
  return proxyRequest(url, options, showError);
};

/**
 * 接口错误不在右侧弹出提示
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
proxyRequest.postD = (url, data, options) => {
  return proxyRequest.post(url, data, options, false);
};

/**
 *
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
proxyRequest.put = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'PUT';
  return proxyRequest(url, options);
};

/**
 *
 * @param url
 * @param data
 * @param options
 * @returns {*}
 */
proxyRequest.delete = (url, data, options) => {
  options = options || {};
  options.body = data || {};
  options.method = 'DELETE';
  return proxyRequest(url, options);
};

/**
 * @param url
 * @param options
 * @returns {*}
 */
export default proxyRequest;
