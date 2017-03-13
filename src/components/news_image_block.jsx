import React,{Component,PropTypes} from 'react'
import {Link} from 'react-router'
import {Card} from 'antd'
import axios from 'axios'

export default class ImageBlock extends Component{
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
        const imgStyle = {
            width:this.props.imgWidth,
            height:this.props.imgHeight
        }
        const titleStyle = {
            width: this.props.imgWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
        const {newsArr} = this.state
        const newsList = newsArr.length
        ? newsArr.map((news,index) =>{
            const {title,author_name,thumbnail_pic_s,uniquekey,url} = news
            return(
                <div key={index} className="imageblock">
                    <Link to={`detail/${uniquekey}`}>
                        <img src={thumbnail_pic_s} alt="" style={imgStyle}/>
                        <div className="custom-card">
                            <h3 style={titleStyle}>{title}</h3>
                            <p style={titleStyle}>{author_name}</p>
                        </div>
                    </Link>
                </div>
            )
        })
        : '正在加载数据...'
        
        const {title,width} = this.props
        return (
            <Card title={title} style={{width:width}} className="topNewsList">
                {newsList}
            </Card>
        )
    }
}
