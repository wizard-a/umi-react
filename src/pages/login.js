import React from 'react';
import { connect } from 'dva';
import FormValid from 'utils/FormValid';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import styles from './login.less';
const FormItem = Form.Item;

@connect(({user}) => ({
  loginErr: user.loginErr,
}))
@Form.create()
class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/login',
          payload: values,
        });
      }
    });
  }

  render() {
    const { loginErr, form:{ getFieldDecorator } } = this.props;
    return (
      <div className={styles.login}>
        { loginErr && <Alert style={{ marginBottom: '20px' }} message='用户名密码错误' type='error' showIcon />}
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                FormValid.require('请输入用户名'),
              ],
            })(
              <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='用户名' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                FormValid.require('请输入密码'),
              ],
            })(
              <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='密码' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>记住我</Checkbox>
            )}
            <a className='login-form-forgot' href=''>忘记密码</a>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}


export default Login;
