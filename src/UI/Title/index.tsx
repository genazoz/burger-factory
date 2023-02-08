import React, { FC } from "react";
import styled from "styled-components/macro";
import {commonTheme} from "@/app/styles/themes";

type TitleType = {
  children?: React.ReactNode;
};

const Title: FC<TitleType> = ({ children, ...rest }) => {
  return <TitleEl>{children}</TitleEl>;
};

export default Title;

const TitleEl = styled.div`
  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
  color: ${commonTheme.colors.black};
`;
