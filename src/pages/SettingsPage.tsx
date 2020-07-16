import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import authMiddleware from "@utils/authMiddleware";
import Settings from "@components/Settings/Settings";

const StyledSettingsPage = styled.div`
  position: relative;
  display: grid;
  overflow-y: scroll;
  height: ${(props) => `calc(100vh - ${props.theme.menuHeight})`};
`;

const SettingsPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    authMiddleware(history);
  });

  return (
    <StyledSettingsPage>
      <Settings />
    </StyledSettingsPage>
  );
};

export default SettingsPage;
