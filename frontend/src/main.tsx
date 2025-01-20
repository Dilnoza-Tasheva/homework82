import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
          </PersistGate>
      </Provider>
  </StrictMode>,
)
