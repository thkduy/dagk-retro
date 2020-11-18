import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import ContextProvider from './context/withContext.js';

import Dashboard from './components/Dashboard.js';

import Home from './components/Home.js';

import Login from './components/Login.js';

import Register from './components/Register.js';

import MenuAppBar from './components/AppBar.js';

import Board from './components/Board.js';

import Profile from './components/Profile.js';

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
                        <Route path="/board/:id" component={Board} />
                        <Route path="/profile" component={Profile} />
                    </Switch>
                </div>
            </ContextProvider>       
        </Router>
    );
}