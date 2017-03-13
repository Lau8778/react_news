import React,{Component} from 'react'
import {Row,Col} from 'antd'

export default class NewsFooter extends Component{
    render (){
        return (
            <div className="footer">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        &copy;&nbsp;2017 ReactNews. All Rights Reserved
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        )
    }
}