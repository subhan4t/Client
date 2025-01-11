import { StrictMode, version } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import authReducer from './state';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

//stores the user data even page is reload and it is stored in local storage-- function of redux-persist
const persistConfig = {
  key: "root",//key name used in stoarge
  storage,//storage engine like localstorage
  version: 1
  };
const persistedReducer = persistReducer(persistConfig, authReducer);//when page reloads persistreducer takes data for local stoarge
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      
      serializableCheck: {
        //some action in redux have non seriable data .that must be ignored
        ignoreActions: [
          FLUSH, //it cleans the storage
          REHYDRATE, //it stores the data locally continously
          PAUSE, //action to pause persistance
          PERSIST, //action to trigger persist process
          PURGE, //action to clear persist state
          REGISTER //action to register the persistance in storage
        ]
      }
    })
  
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* It makes the Redux store available to all components in the application, so that they can access the state and dispatch actions. */}
    {/* loading={null}: This specifies what should be rendered while the state is being rehydrated. Here, null is passed, which means nothing will be shown (i.e., the app will wait until the persisted state is fully loaded).
    persistor={persistStore(store)}: The persistor prop is used to manage the state persistence process. This is where you pass the persistor object created using persistStore(store). */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
