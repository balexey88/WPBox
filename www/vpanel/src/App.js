import React, { Component } from 'react';
import logo from './logo.svg';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// import TopSpacer from './components/TopSpacer';
// import VisibleAppBar from './containers/VisibleAppBar';

/*
{"palette":{"common":{"black":"#000","white":"#fff"},"background":{"paper":"#fff","default":"#fafafa"},"primary":{"light":"rgba(149, 188, 88, 1)","main":"rgba(135, 182, 63, 1)","dark":"rgba(93, 135, 25, 1)","contrastText":"#fff"},"secondary":{"light":"rgba(241, 132, 97, 1)","main":"rgba(255, 112, 67, 1)","dark":"rgba(212, 93, 56, 1)","contrastText":"#fff"},"error":{"light":"#e57373","main":"#f44336","dark":"#d32f2f","contrastText":"#fff"},"text":{"primary":"rgba(0, 0, 0, 0.87)","secondary":"rgba(0, 0, 0, 0.54)","disabled":"rgba(0, 0, 0, 0.38)","hint":"rgba(0, 0, 0, 0.38)"}}}
 */

const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

const App = (props) => {
    const { classes, store } = props;

    return (
        <Provider store={store}>
            <Router>
                <div className={classes.root}>
                    <CssBaseline />

                    <VisibleAppBar/>

                    {/* <VisibleDrawer /> */}

                    {/* <main className={classes.content}>
                        <TopSpacer />

                        <Switch>
                            <Route path="/rest" component={RestPage} />
                            <Route path="/:filter?" component={TodoPage} />
                        </Switch>
                    </main> */}
                </div>
            </Router>
        </Provider>
    );
}

App.propType = {
    store: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(App);
