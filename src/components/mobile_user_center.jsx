import React,{Component} from 'react'
import {Link} from 'react-router'
import {Row,Col,Tabs,Card,Upload,Icon,Modal,BackTop,Button,message} from 'antd'
import axios from 'axios'

const TabPane = Tabs.TabPane
export default class UserCenter extends Component{
    constructor(props){
        super(props)
        this.state = {
            collections:[],
            comments:[],
            previewVisible: false,
            previewImage: '',
            fileList:[
                {
                    uid: -1,
                    name: 'preview.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                }
            ]
        }
    }
    
    componentWillMount(){
        //我的收藏列表
        const userId = JSON.parse(localStorage.user).userId
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response =>{
                const collections = response.data.map((collection,index) =>{
                    return {
                        "uniquekey": collection.uniquekey,
                        "title": collection.Title
                    }
                })
                this.setState({collections})
            })
    
        //我的评论列表
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response =>{
                const comments = response.data.map((comment,index) =>{
                    return {
                        uniquekey: comment.uniquekey,
                        dateTime: comment.datetime,
                        content: comment.Comments
                    }
                })
                this.setState({comments})
            })
    }
    
    handleCancel = () => this.setState({ previewVisible: false })
    
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    
    handleChange = ({ fileList }) => this.setState({ fileList })
    render (){
        const {collections, comments,previewVisible,previewImage,fileList} = this.state
        const collectionList = collections.map((collection, index) =>(
            <Card key={index} title={collection.uniquekey} extra={<Link to={`/detail/${collection.uniquekey}`}>More</Link>}>
                <p>{collection.title}</p>
            </Card>
        ))
    
        const commentList = comments.map((comment, index) =>(
            <Card key={index} title={`于 ${comment.dateTime} 评论了文章 ${comment.uniquekey}`}
                  extra={<Link to={`/detail/${comment.uniquekey}`}>查看</Link>}>
                <p>{comment.content}</p>
            </Card>
        ))
    
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">添加</div>
            </div>
        );
        return(
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="我的收藏" key="1">
                                {collectionList}
                            </TabPane>
                            <TabPane tab="我的评论" key="2">
                                {commentList}
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div className="clearfix">
                                    <Upload
                                        action="http://localhost:3000/posts"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={this.handlePreview}
                                        onChange={this.handleChange}
                                    >
                                        {fileList.length >= 5 ? null : uploadButton}
                                    </Upload>
                                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}