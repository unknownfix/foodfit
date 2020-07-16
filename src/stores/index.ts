import createStore, {
  combineReducers,
  applyMiddleware,
} from "@utils/redux-like";
import thunkLike from "@middlewares/thunkLike";
import userReducer from "./user/userReducer";

const reducer = combineReducers({
  user: userReducer,
});

const store = createStore(reducer, applyMiddleware(thunkLike));

// store.subscribe(() => {
//   console.log("index", store.getState("user"));
// });

export default store;
