/**
 * 验证必填
 */
export const require = (message) => {
  const msg = message || '必填项';
  return { required: true, message: msg };
};


export default {
  require,
}
