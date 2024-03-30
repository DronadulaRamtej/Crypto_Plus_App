import React from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space, Divider } from 'antd';

import {Navbar} from './components';

const App = () => {
  return (
    <div>
        <div className='app'>
            <Navbar/>
        </div>

        <div className='main'>

        </div>

        <div className='footer'>

        </div>
    </div>
  );
}

export default App