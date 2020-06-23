import React, { Dispatch, SetStateAction, useState } from "react";

export interface ToggleProps {
  isToggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
}

const withToggle = (WrappedComponent: React.FC<ToggleProps>) => () => {
  const [isToggled, setToggled] = useState<ToggleProps["isToggled"]>(false);
  return <WrappedComponent isToggled={isToggled} setToggled={setToggled} />;
};

export default withToggle;
