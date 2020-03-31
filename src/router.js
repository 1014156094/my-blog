import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Home from './pages/home'
import BlogEdit from './pages/blog/edit'

export default class IRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route path="/" render={()=>
                            <Switch>
                                <Route path="/home" component={Home} />
                                <Route path="/blog/:id" component={BlogEdit} />
                                <Route path="/blog" component={BlogEdit} />
                                <Redirect to="/home" />
                            </Switch>
                        } />
                    </Switch>
                </App>
            </BrowserRouter>
        )
    }
}