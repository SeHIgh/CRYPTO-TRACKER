import styled from "styled-components";
import clsImg from "../img/close.png";
import modImg from "../img/Darkmode.png";
import homeImg from "../img/home.png";

export const ClsBtn = styled.button`
  background-color: #fe5f58;
  &:hover {
    background-image: url(${clsImg});
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
export const ModBtn = styled.button`
  background-color: ${(props) => props.theme.toggleBtn};
  &:hover {
    background-image: url(${modImg});
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
export const HomeBtn = styled.button`
  background-color: #29c740;
  &:hover {
    background-image: url(${homeImg});
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
