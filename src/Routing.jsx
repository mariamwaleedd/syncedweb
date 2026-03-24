import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';

const Routing = () => {
    return ( 
    <Router>

    <Route>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Error />} /> 
    </Route>

    </Router>
     );
}
 
export default Routing;