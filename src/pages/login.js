import React from 'react';
import { connect } from 'dva';
import FormValid from 'utils/FormValid';
import { Form, Icon, Input, Button, Checkbox, Alert, Row, Col } from 'antd';
import intl from 'react-intl-universal';
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
    const intlLogin = intl.get('user.login.loginBtn');
    const intlUsername = intl.get('user.login.placeholderName');
    const intlPwd = intl.get('user.login.placeholderPws');
    const intlforgetPwd = intl.get('user.login.forgetPwd');
    const intlRemember = intl.get('user.login.remember');
    return (
      <div className={styles.login}>
        <div style={{textAlign: "center", marginBottom: '10px'}}>
          <span style={{fontSize: '24px'}}>
            Umi-React
          </span>
        </div>
        { loginErr && <Alert style={{ marginBottom: '20px' }} message='用户名密码错误' type='error' showIcon />}
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <FormItem>
            {getFieldDecorator('name', {
              initialValue: 'admin',
              rules: [
                FormValid.require(intlUsername),
              ],
            })(
              <Input
                prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder={intlUsername}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: '123456',
              rules: [
                FormValid.require(intlPwd),
              ],
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder={intlPwd}
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>{intlRemember}</Checkbox>
            )}
            <a className='login-form-forgot' href=''>{intlforgetPwd}</a>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              {intlLogin}
            </Button>
            <div>
              <Row>
                  <Col span={8}>管理员：</Col>
                  <Col span={8}>admin</Col>
                  <Col span={8}>123456</Col>
              </Row>
              <Row>
                  <Col span={8}>普通用户：</Col>
                  <Col span={8}>user</Col>
                  <Col span={8}>123456</Col>
              </Row>
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}
export default Login;
