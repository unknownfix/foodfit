import React, { Dispatch, SetStateAction, useState } from "react";

type ShadowInjected<T1, T2> = Omit<T1, keyof T2>;

export interface ToggleProps {
  isToggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
}

const withToggle = <T,>(
  WrappedComponent: React.ComponentType<T>,
): React.FC<ShadowInjected<T, ToggleProps>> => (
  props: ShadowInjected<T, ToggleProps>,
) => {
  const [isToggled, setToggled] = useState<ToggleProps["isToggled"]>(false);
  return (
    <WrappedComponent
      {...(props as T)}
      isToggled={isToggled}
      setToggled={setToggled}
    />
  );
};

export default withToggle;
