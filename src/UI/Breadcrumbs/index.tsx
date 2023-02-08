import React, { FC } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import { ReactComponent as ArrowRightIcon } from "@/app/assets/arrow-right-icon.svg";
import {commonTheme} from "@/app/styles/themes";

type BreadcrumbsType = {
  links?: {
    text: string;
    link: string;
    active?: boolean;
  }[];
};

const Breadcrumbs: FC<BreadcrumbsType> = ({ links, ...rest }) => {
  return (
    <BreadcrumbsEl>
      {links && (
        <>
          {links.map((item, idx: number) => (
            <LinkWrapper key={idx} isActive={!!item.active}>
              <LinkLi to={item.link}>{item.text}</LinkLi>
              {idx !== links?.length - 1 && <ArrowRightIcon stroke="#B0BABF" />}
            </LinkWrapper>
          ))}
        </>
      )}
    </BreadcrumbsEl>
  );
};

export default Breadcrumbs;

const BreadcrumbsEl = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  font-weight: 400;
  font-size: 36px;
  line-height: 44px;
  color: ${commonTheme.colors.black};
`;
const LinkWrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;

  ${(props) =>
    props.isActive &&
    `
      pointer-events: none;

      a {
        color: ${commonTheme.colors.blueGray};
      }
  `}
`;
const LinkLi = styled(Link)`
  display: flex;

  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #6e7c87;

  transition: 0.1s opacity;

  &:hover {
    opacity: 0.7;
  }
`;
