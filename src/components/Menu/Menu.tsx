import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useConnect } from "@utils/redux-like";
import { toggleMealAdd } from "@stores/meal/mealAction";
import StyledMenu from "./StyledMenu";

const Menu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [, dispatch] = useConnect();

  return (
    <StyledMenu>
      <div
        className={`item ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => {
          history.push("/");
          dispatch(toggleMealAdd(false));
        }}
      >
        <div className="icon">
          <i className="home" />
        </div>
        <span>Home</span>
      </div>
      <div className="item disabled">
        <div className="icon">
          <i className="weight" />
        </div>
        <div>Weight</div>
      </div>
      <div className="item big" onClick={() => dispatch(toggleMealAdd(true))}>
        <div className="icon">
          <i className="plus" />
        </div>
        <div>Add meal</div>
      </div>
      <div
        className={`item ${location.pathname === "/settings" ? "active" : ""}`}
        onClick={() => {
          history.push("/settings");
          dispatch(toggleMealAdd(false));
        }}
      >
        <div className="icon">
          <i className="settings" />
        </div>
        <div>Settings</div>
      </div>
      <div className="item disabled">
        <div className="icon">
          <i className="more" />
        </div>
        <div>More</div>
      </div>
    </StyledMenu>
  );
};

export default Menu;
