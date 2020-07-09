import reducer from '../reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createWrapper } from 'next-redux-wrapper';

const store = () => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper(store);
