import React,{Component} from 'react'
import {render} from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import MediaQuery from 'react-responsive'
//PC端模块
import App from './components/app'
import NewsContainer from './components/news_container'
import NewsDetail from './components/news_detail'
import UserCenter from './components/user_center'
//移动端模块
import MobileApp from './components/mobile_app'
import MobileNewsContainer from './components/mobile_news_container'
import MobileNewsDetail from './components/mobile_news_detail'
import MobileUserCenter from './components/mobile_user_center'

render((
    <div>
        {/*PC端*/}
        <MediaQuery query="(min-device-width: 1224px)">
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={NewsContainer}/>
                    <Route path="/detail/:newsId" component={NewsDetail}/>
                    <Route path="/user_center" component={UserCenter}/>
                </Route>
            </Router>
        </MediaQuery>
    
        {/*移动端*/}
        <MediaQuery query="(max-device-width: 1224px)">
            <Router history={hashHistory}>
                <Route path="/" component={MobileApp}>
                    <IndexRoute component={MobileNewsContainer}/>
                    <Route path="/detail/:newsId" component={MobileNewsDetail}/>
                    <Route path="/user_center" component={MobileUserCenter}/>
                </Route>
            </Router>
        </MediaQuery>
    </div>
),document.getElementById('root'))