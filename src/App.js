// --------------- LIBRARIES ---------------
import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';

// --------------- ASSETS ---------------
import Routes from './Routes';

// --------------- MAIN ---------------
export default () => {
    return (
        <Fragment>
            <StatusBar barStyle='light-content' backgroundColor={'#6200EA'} />
            <Routes />
        </Fragment>
    );
};
