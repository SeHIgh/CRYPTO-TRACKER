import styled from "styled-components";
import clsImg from "../img/close.svg";
import darkMDImg from "../img/dark_mode.svg";
import lightMDImg from "../img/light_mode.svg";
import homeImg from "../img/home.svg";

export const ClsBtn = styled.button`
  background-color: #fe5f58;
  &:hover {
    background-image: url(${clsImg});
  }
`;
export const ModBtn = styled.button<{isDark: boolean}>`
  background-color: ${(props) => props.theme.toggleBtn};
  &:hover {
    background-image: url(${(props) => (props.isDark ? lightMDImg : darkMDImg)});
  }
`;
export const HomeBtn = styled.button`
  background-color: #29c740;
  &:hover {
    background-image: url(${homeImg});
  }
`;
