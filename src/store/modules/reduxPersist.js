import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'CONSUMO-API',
  storage,
  whiteList: ['auth'],
};

export default (reducers) => {
  const persistedReducers = persistReducer(persistConfig, reducers);

  return persistedReducers;
};
