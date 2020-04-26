import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Home from './pages/home'
import BlogEdit from './pages/blog/edit'
import BlogDetail from './pages/blog/detail'
import GuestbookEdit from './pages/guestbook/edit'
import store from './store'
import { Provider } from 'react-redux'

export default class IRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <Switch>
                        <App>
                            <Route path="/" render={() =>
                                <Switch>
                                    <Route path="/home" component={Home} />
                                    <Route path="/blog/:id/detail" component={BlogDetail} />
                                    <Route path="/blog/:id" component={BlogEdit} />
                                    <Route path="/blog" component={BlogEdit} />
                                    <Route path="/guestbook" component={GuestbookEdit} />
                                    <Redirect to="/home" />
                                </Switch>
                            } />
                        </App>
                    </Switch>
                </Provider >
            </BrowserRouter>
        )
    }
}