import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.js'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

localStorage.setItem('check', "false")
localStorage.setItem('companyName','')

ReactDOM.render(
  <span>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </span>,
  document.getElementById('root')
);
