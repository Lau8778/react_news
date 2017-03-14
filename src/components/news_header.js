import React,{Component} from 'react'
import axios from 'axios'
import {Row, Col, Menu, Icon, Modal, Button,
        Tabs, Form, Input, Checkbox, Tooltip,
        Cascader, Select,message
       }from 'antd'
import {Link} from 'react-router'
import logo from '../images/logo.png'

const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane
const FormItem = Form.Item


class NewsHeader extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedKeys:'topLine',//当前选中的标签
            isLogin:false,//是否是登录页面
            isRegist:false,//是否是注册页面
            confirmDirty: false,//是否合法
            user:{//用户信息
                username:null,
                password:null,
                userId:null,
                userFace:null
            }
        }
    }
    //组件将要加载前检查localStorage中是否有用户
    componentWillMount = () =>{
        if(localStorage.getItem('user')){
            const userLocal = JSON.parse(localStorage.getItem('user'))
            this.setState({user:userLocal})
        }
    }
    
    //退出
    logout = () =>{
        localStorage.user = ''
        this.setState({
            user:{
                username:null,
                password:null,
                userId:null,
                userFace:null
            }
        })
        message.success('退出成功')
    }
    
    //点击导航标签
    handleOnClick = ({key}) =>{
        this.setState({selectedKeys:key})
        //当点击登录/注册按钮时
        if(key === 'action'){
            this.setState({isLogin:true})
        }
    }
    
    //关闭登录对话框
    handleCancel = () => {
        this.setState({ isLogin: false, isRegist:false})
    }
    
    //处理登录/注册的表单提交
    handleSubmit = (isRegist, e) => {
        //取消表单提交的默认行为
        e.preventDefault();
        //获取数据 getFieldsValue会获取表单中所有组件的值
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        const action = isRegist ? 'register' : 'login'
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
        //发送ajax请求
        axios.get(url)
            .then(response => {
                const result = response.data//当账号或者密码错误时，返回null
                if(isRegist){
                    message.success('注册成功')
                    this.setState({isRegist:false})
                }else {
                    console.log(result);
                    if(!result){
                        message.error('登录失败')
                    }else {
                        message.success('登录成功')
                        //更改状态
                        this.setState({
                            isLogin:false,
                            user:{
                                username:result.NickUserName,
                                password:result.UserPassword,
                                userId:result.UserId,
                                userFace:result.UserFace
                            }
                        })
                        const userStr = JSON.stringify(this.state.user)
                        const form = this.props.form
                        if(!form.getFieldValue('remember')){
                            localStorage.setItem('user', userStr)
                        }
                        sessionStorage.setItem('user', userStr)
                    }
                }
            })
    }
    //前往注册页面
    goRegist = () => {
        this.setState({isLogin: false, isRegist:true})
    }
    //失去焦点时进行检查
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    //检查两次输入的密码是否一致
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('r_password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    }
    //
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['r_confirmPassword'], { force: true });
        }
        callback();
    }
    
    render (){
        //导航标签被选中的状态
        const {selectedKeys,user,remeberMe} = this.state
        //判断是否登录，如果已经登录则显示用户中心，否则显示登录/注册按钮
        const userItem = user.username ?
            <MenuItem key="logout" className="register">
                <Button type="primary">{user.username}</Button>
                &nbsp;&nbsp;
                <Link to="/user_center">
                    <Button type="dashed">个人中心</Button>
                </Link>
                &nbsp;&nbsp;
                <Button type="ghost" onClick={this.logout}>退出</Button>
            </MenuItem>
            :
            <MenuItem key="action" className="register">
                <Link><Icon type="appstore" />注册/登录</Link>
            </MenuItem>
            
        const { getFieldDecorator } = this.props.form//用来包装表单域中的控件
        //配置注册表单中的样式
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 14,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return(
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <Link to='/'>
                            <div className="logo">
                                <img src={logo} alt="logo"/>
                                <span>ReactNews</span>
                            </div>
                        </Link>
                    </Col>
                    <Col span={16}>
                        <Menu
                            mode="horizontal"
                            selectedKeys={[selectedKeys]}
                            onClick={this.handleOnClick}
                        >
                            <MenuItem key="top">
                                <Icon type="appstore" />头条
                            </MenuItem>
                            <MenuItem key="shehui">
                                <Icon type="appstore"/>社会
                            </MenuItem>
                            <MenuItem key="guonei">
                                <Icon type="appstore"/>国内
                            </MenuItem>
                            <MenuItem key="guoji">
                                <Icon type="appstore"/>国际
                            </MenuItem>
                            <MenuItem key="yule">
                                <Icon type="appstore"/>娱乐
                            </MenuItem>
                            <MenuItem key="tiyu">
                                <Icon type="appstore"/>体育
                            </MenuItem>
                            <MenuItem key="keji">
                                <Icon type="appstore"/>科技
                            </MenuItem>
                            <MenuItem key="shishang">
                                <Icon type="appstore"/>时尚
                            </MenuItem>
                            {userItem}
                            {/* 登录对话框*/}
                            <Modal
                                visible={this.state.isLogin}
                                title="用户登录"
                                //width="400px"
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>
                                ]}
                            >
                                <Form onSubmit={this.handleSubmit.bind(this, false)} className="login-form">
                                    <FormItem>
                                        {getFieldDecorator('username', {
                                            rules: [{ required: true, message: '请输入你的用户名!' }],
                                        })(
                                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: '请输入你的密码!' }],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: false
                                        })(
                                            <Checkbox>保存密码</Checkbox>
                                        )}
                                        <a className="login-form-forgot">忘记密码</a>
                                        <br/>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            登录
                                        </Button>
                                        <br/>
                                        还没有账号？ <a className="login-form-regist" onClick={this.goRegist}>去注册!</a>
                                    </FormItem>
                                </Form>
                            </Modal>
                            {/* 注册对话框*/}
                            <Modal
                                visible={this.state.isRegist}
                                title="用户注册"
                                //width="400px"
                                onCancel={this.handleCancel}
                                footer={[
                                    <Button key="back" size="large" onClick={this.handleCancel}>关闭</Button>
                                ]}
                            >
                                <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="用户名"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('r_userName', {
                                            rules: [{ required: true, message: '请输入你的用户名!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('r_password', {
                                            rules: [{
                                                required: true, message: '请输入你的密码!',
                                            }, {
                                                validator: this.checkConfirm,
                                            }],
                                        })(
                                            <Input type="password" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="再次确认密码"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('r_confirmPassword', {
                                            rules: [{
                                                required: true, message: '请确认密码!',
                                            }, {
                                                validator: this.checkPassword,
                                            }],
                                        })(
                                            <Input type="password" onBlur={this.handleConfirmBlur} />
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                                        {getFieldDecorator('agreement', {
                                            valuePropName: 'checked',
                                        })(
                                            <Checkbox>I have read the <a>agreement</a></Checkbox>
                                        )}
                                    </FormItem>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" size="large">注册</Button>
                                    </FormItem>
                                </Form>
                            </Modal>
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        )
    }
}

export default Form.create()(NewsHeader) //向外暴露的是包含了NewsHeader的Form