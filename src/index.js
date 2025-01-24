import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store, persistor } from './store/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import CategorySideBar from './components/CategorySideBar';


// Clear local storage before creating the Redux store
// localStorage.clear();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        {/* <CategorySideBar /> */}
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);