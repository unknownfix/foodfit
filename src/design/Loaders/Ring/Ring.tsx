import React from "react";
import StyledRing from "./StyledRing";

interface Props {
  className?: string;
}

const Ring: React.FC<Props> = ({ className = "" }) => {
  return <StyledRing className={`${className}`} />;
};

export default Ring;
