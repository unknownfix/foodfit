import React from "react";
import StyledContentLoader from "./StyledContentLoader";

interface Props {
  className?: string;
  loading: boolean;
}

const ContentLoader: React.FC<Props> = ({
  className = "",
  loading = true,
  children,
}) => {
  return (
    <>
      {loading && (
        <StyledContentLoader className={className}>
          <div className="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </StyledContentLoader>
      )}
      {!loading && children}
    </>
  );
};

export default ContentLoader;
