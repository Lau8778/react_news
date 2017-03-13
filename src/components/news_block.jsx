import React,{Component} from 'react'
import {Link} from 'react-router'
import {Card,Tabs} from 'antd'
import axios from 'axios'

export default class NewsBlock extends Component{
   
    constructor(props){
        super(props)
        this.state ={
            newsArr:[]
        }
    }
    
    //发送ajax请求
    componentWillMount (){
        const {type, count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response =>{
                const newsArr = response.data
                this.setState({newsArr})
            })
    }
    render() {
        const titleStyle = {
            width: this.props.width,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
        const {newsArr} = this.state
        const newsList = newsArr.length
        ? newsArr.map((news,index) =>{
            const {title,author_name,thumbnail_pic_s,uniquekey,url} = news
            return(
                <li key={index}>
                    <Link to={`detail/${uniquekey}`}>
                        <p style={titleStyle}>{title}</p>
                    </Link>
                </li>
            )
        })
        : '正在加载数据...'
        
        return (
            <Card>
                <ul>
                    {newsList}
                </ul>
            </Card>
        )
    }
}