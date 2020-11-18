import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ContextProvider from './context/withContext';

import Dashboard from './components/dashboard';

import Home from './components/home';

import Login from './components/login';

import Register from './components/register';

import PublicBoard from './components/publicboard';

import MenuAppBar from './components/AppBar';

import Board from './components/Board';

import Profile from './components/Profile';

export default function App() {
    return (
        <Router>
            <ContextProvider>
                <div>
                    <MenuAppBar/>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/publicboard" component={PublicBoard} />
                        <Route path="/board/:id" component={Board} />
                        <Route path="/profile" component={Profile} />
                    </Switch>
                </div>
            </ContextProvider>       
        </Router>
    );
}