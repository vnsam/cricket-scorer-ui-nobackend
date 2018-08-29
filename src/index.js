import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import AppRouter from './routes/routes';
import ConnectedBatsmenStats from './scorer/BatsmenStats';

const store = configureStore();

// const ProviderApp = () => (
//   <Provider store={store}>
//     <AppRouter />
//   </Provider>
// );

const ProviderApp = () => (

  <Provider store={store}>
    {/* <ConnectedRunScore /> */}
    <AppRouter />
    <ConnectedBatsmenStats />
  </Provider>
);


ReactDOM.render(<ProviderApp />, document.getElementById('root'));
registerServiceWorker();
