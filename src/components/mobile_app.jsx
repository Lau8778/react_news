import React,{Component} from 'react'
import {BackTop} from 'antd'
import MobileNewsHeader from './mobile_news_header'
import NewsFooter from './news_footer'

import '../css/mobile.css'

export default class MobileApp extends Component{
    
    render (){
        return(
            <div >
                <MobileNewsHeader />
                {this.props.children}
                <NewsFooter />
                <BackTop />
            </div>
        )
    }
}