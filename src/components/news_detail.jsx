import React,{Component} from 'react'
import {Row,Col,BackTop} from 'antd'
import axios from 'axios'
import ImageBlock from './news_image_block'
import Comments from './news_comments'

export default class NewsDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            news:{}
        }
    }
    
    //发送ajax请求
    componentWillMount(){
        const uniquekey = this.props.params.newsId
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response =>{
                const news = response.data
                this.setState({news})
            })
    }
    //当接收到父传过来新的prop时调用
    componentWillReceiveProps(nextProps) {
        this.showDetail(nextProps)
    }
    /*
     显示新闻详情
     */
    showDetail = (props) => {
        const uniquekey = props.params.newsId
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const news = response.data
                this.setState({news})
            })
    }
    
    render (){
        const {news} = this.state
        const newsDetail = this.state.news !== {}
            ? <div className="container" dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
            : '正在加载数据，请稍等...'
        
        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={16}>
                        <div>
                            {newsDetail}
                            <hr/>
                        </div>
                        <Comments uniquekey={this.props.params.newsId}/>
                    </Col>
                    <Col span={4}>
                        <ImageBlock title="相关新闻" type="top" count={20} width="100%" imgWidth="200px" imgHeight="150px"/>
                    </Col>
                    <Col span={2}></Col>
                </Row>
                <BackTop />
            </div>
        )
    }
}