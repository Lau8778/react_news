import React,{Component} from 'react'
import {Link} from 'react-router'
import {Row,Col,Carousel,Card,Tabs} from 'antd'
import ImageBlock from './news_image_block'
import NewsBlock from './news_block'
import Products from './products'
import img1 from '../images/carousel_1.jpg'
import img2 from '../images/carousel_2.jpg'
import img3 from '../images/carousel_3.jpg'
import img4 from '../images/carousel_4.jpg'

const TabPane = Tabs.TabPane;

export default class NewsContainer extends Component{
    render (){
        return(
            <div className="container">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <div className="leftContainer">
                            <Carousel autoplay>
                                <div><img src={img1} alt=""/></div>
                                <div><img src={img2} alt=""/></div>
                                <div><img src={img3} alt=""/></div>
                                <div><img src={img4} alt=""/></div>
                            </Carousel>
                            <ImageBlock title="国际头条" type="guoji" count={6} width="100%" imgWidth="112px" imgHeight="90px"/>
                        </div>
                        <Tabs defaultActiveKey="tab1" className='tabs_news' style={{width: "38%"}}>
                            <TabPane key="tab1" tab="新闻头条">
                                <NewsBlock type="top" count={22} width="100%"/>
                            </TabPane>
                            <TabPane key="tab2" tab="科技">
                                <NewsBlock type="keji" count={22} width="100%"/>
                            </TabPane>
                        </Tabs>
                        <Tabs className="tabs_product" style={{width: "28%"}}>
                            <TabPane tab="React News产品" key="1">
                                <Products />
                            </TabPane>
                        </Tabs>
                        <div>
                            <ImageBlock title="国内新闻" type="guonei" count={8} width="100%" imgWidth="142px" imgHeight="110px"/>
                            <ImageBlock title="娱乐新闻" type="yule" count={16} width="100%" imgWidth="142px" imgHeight="110px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}