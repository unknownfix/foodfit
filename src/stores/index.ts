import createStore, {
  combineReducers,
  applyMiddleware,
} from "@utils/redux-like";
import thunkLike from "@middlewares/thunkLike";
import settingsReducer from "./settings/settingsReducer";
import userReducer from "./user/userReducer";
import mealReducer from "./meal/mealReducer";
import productReducer from "./product/productReducer";

const reducer = combineReducers({
  settings: settingsReducer,
  user: userReducer,
  meal: mealReducer,
  product: productReducer,
});

const store = createStore(reducer, applyMiddleware(thunkLike));

// store.subscribe(() => {
//   console.log("index", store.getState("user"));
// });

export default store;
