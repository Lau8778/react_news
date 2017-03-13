import React,{Component} from 'react'
import {Row,Col,Card,Form,Input,Button,message,notification} from 'antd'
import axios from 'axios'

const FormItem = Form.Item

class Comment extends Component{
    state = {
        comments:[]
    }
    
    componentWillMount(){
        const {uniquekey} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response =>{
                const comments = response.data.map(item => {
                    return {
                        username: item.UserName,
                        dateTime: item.datetime,
                        content: item.Comments
                    }
                })
                this.setState({comments})
            })
    }
    
    //发表评论
    submitComment = (e) =>{
        //取消默认行为
        e.preventDefault()
        //没有登录
        if(!localStorage.getItem('user')){
            message.warning('请先登录')
            return
        }
        //只有登录了才能评论
        const userid = JSON.parse(localStorage.getItem('user')).userId
        const {uniquekey} = this.props
        let content = this.props.form.getFieldValue('content')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${userid}&uniquekey=${uniquekey}&commnet=${content}`
        axios.get(url)
            .then(response =>{
                const result = response.data
                if (result){
                    //更新状态
                    this.componentWillMount()
                    //更新评论列表
                    this.props.form.resetFields()
                }
            })
    }
    
    //收藏文章
    addCollection = () =>{
        //没有登录
        if(!localStorage.getItem('user')){
            message.warning('请先登录')
            return
        }
        //只有登录了才能收藏
        const userid = JSON.parse(localStorage.getItem('user')).userId
        const {uniquekey} = this.props
        const content = this.props.form.getFieldValue('content')
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${userid}&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response =>{
                notification.success({
                    message: 'ReactNews收藏',
                    description: '文章收藏成功'
                })
            })
    }
    render (){
        const {getFieldDecorator} = this.props.form
        const {comments} = this.state
        const commentList = comments.map((comment, index) =>(
            <Card key={index} title={comment.username} extra={`发布于 ${comment.dateTime}`}>
                <p>{comment.content}</p>
            </Card>
        ))
       
        return (
            <div>
                {commentList}
                <Form onSubmit={this.submitComment}>
                    <FormItem label="请发表你的评论">
                        {getFieldDecorator('content')(
                            <Input type="textarea" placeholder="请发表评论" />
                        )}
                    </FormItem>
    
                    <Button type='primary' htmlType="submit">提交评论</Button>
                    <Button type='primary' onClick={this.addCollection}>收藏文章</Button>
                </Form>
            </div>
        )
    }
}
export default Form.create()(Comment)