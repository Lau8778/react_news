import React,{Component} from 'react'
import {Link} from 'react-router'
import {Carousel,Card,Tabs} from 'antd'
import MobileNewsBlock from './mobile_news_block'
import img1 from '../images/carousel_1.jpg'
import img2 from '../images/carousel_2.jpg'
import img3 from '../images/carousel_3.jpg'
import img4 from '../images/carousel_4.jpg'

const TabPane = Tabs.TabPane;

export default class MobileNewsContainer extends Component{
    render (){
        
        return(
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="头条" key="1" >
                        <div style={{width:"100%"}}>
                            <Carousel autoplay id="carousel">
                                <div><img src={img1} alt=""/></div>
                                <div><img src={img2} alt=""/></div>
                                <div><img src={img3} alt=""/></div>
                                <div><img src={img4} alt=""/></div>
                            </Carousel>
                        </div>
                        <MobileNewsBlock  type="top" count={20}/>
                    </TabPane>
                    <TabPane tab="社会" key="2">
                        <MobileNewsBlock  type="shehui" count={25}/>
                    </TabPane>
                    <TabPane tab="国内" key="3">
                        <MobileNewsBlock  type="guonei" count={25}/>
                    </TabPane>
                    <TabPane tab="国际" key="4">
                        <MobileNewsBlock  type="guoji" count={25}/>
                    </TabPane>
                    <TabPane tab="娱乐" key="5">
                        <MobileNewsBlock  type="yule" count={25}/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}