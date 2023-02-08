import React, { FC } from "react";
import styled from "styled-components/macro";

import Checkbox from "@/UI/Checkbox";

interface ITHeadProps {
  checked?: boolean;
  showCheckbox: boolean;
  onTableCheckboxChange: (checked: boolean) => void;
}

const Index: FC<ITHeadProps> = ({
  showCheckbox,
  onTableCheckboxChange,
  checked,
}) => {
  return (
    <Head>
      <Tr>
        <Th></Th>
        <Th>
          {showCheckbox && (
            <Checkbox
              checked={checked}
              onChange={(checked) => onTableCheckboxChange(checked)}
            />
          )}
        </Th>
        <Th>
          <span>Название</span>
        </Th>
        <Th>Вес</Th>
        <Th>Ккал</Th>
        <Th>Примечание</Th>
        <Th></Th>
      </Tr>
    </Head>
  );
};

export default Index;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  height: 40px;

  background: #f6f8f9;
`;
const Tr = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
  width: 100%;
  height: 40px;
`;
const Th = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;

  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 24px;
  color: #6e7c87;

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(4),
  &:nth-child(5) {
    display: flex;
    justify-content: center;
  }

  &:nth-child(1) {
    width: 25px;
  }

  &:nth-child(2) {
    width: 20px;
  }

  &:nth-child(3) {
    flex: 1;
    padding-left: 2px;

    span {
      padding-left: 15px;
    }
  }

  &:nth-child(4) {
    width: 40px;
  }

  &:nth-child(5) {
    width: 40px;
  }

  &:nth-child(6) {
    flex: 0.5;
    padding-left: 20px;
  }

  &:nth-child(7) {
    width: 20px;
  }
`;
