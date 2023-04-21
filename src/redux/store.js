// import { applyMiddleware, compose, createStore} from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import rootReducer from './reducers/rootReducer';
// import rootSaga from './sagas/rootSaga';
  
// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  
// export default () => {
//     const store = createStore(
//       rootReducer, composeEnhancer(applyMiddleware(sagaMiddleware))
//     );
//     sagaMiddleware.run(rootSaga);
//     return { store };
// };