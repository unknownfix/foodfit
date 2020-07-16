import styled from "styled-components";

export default styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  & .content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0 0 3rem 0;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    animation-name: animatetop;
    animation-duration: 0.4s;

    & .header {
      padding: 2px 16px;
      text-align: center;

      & .close {
        color: #aaa;
        float: right;
        font-size: 2.6rem;
        font-weight: bold;
      }

      & .close:hover,
      & .close:focus {
        color: ${(props) => props.theme.colorPrimary};
        text-decoration: none;
        cursor: pointer;
      }
    }

    & .body {
      padding: 2px 16px;
    }
  }

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;
