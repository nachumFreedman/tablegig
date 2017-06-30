import React from 'react';
import { render } from 'react-dom';
import { bootApp, networkMiddleware } from 'tahini';

import App from './App';
import './index.css';

import networkHandlers, { mocks } from './network/';
import registerServiceWorker from './registerServiceWorker';


const RootP = bootApp(
  [ networkMiddleware(mocks) ]
).getDevice(App, [], App.initState);

render(
  <RootP/>,
  document.getElementById('root')
);


registerServiceWorker();
