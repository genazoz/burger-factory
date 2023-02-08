import React, { useEffect } from "react";
import styled from "styled-components/macro";

import { ReactComponent as CloseCircleIcon } from "@/app/assets/close-circle-icon.svg";
import Checkbox from "@/UI/Checkbox";
import Input from "@/modules/RecipesTables/components/Input";
import { ITableRow, TableRowType } from "@/modules/RecipesTables/models";
import {commonTheme} from "@/app/styles/themes";

function Index({
  data,
  type,
  onClickRemoveButton,
  onCheckboxChange,
  onInputBlur,
}: {
  data: ITableRow;
  type?: string | false;
  onClickRemoveButton: (id: string) => void;
  onCheckboxChange: (params: {
    checked: boolean;
    id: string;
    field: string;
  }) => void;
  onInputBlur: (params: { value: string; id: string; field: string }) => void;
}) {
  const calories =
    data?.items && data?.type === TableRowType.Category
      ? data.items.reduce(
          (acc: number, cur: ITableRow) =>
            cur.calories ? parseInt(cur.calories) + acc : acc,
          0
        )
      : data.calories;
  const weight =
    data?.items && data?.type === TableRowType.Category
      ? data.items.reduce(
          (acc: number, cur: ITableRow) =>
            cur.weight ? parseInt(cur.weight) + acc : acc,
          0
        )
      : data.weight;

  useEffect(() => {}, [weight]);

  return (
    <>
      <Td>
        <Checkbox
          checked={data.checked}
          onChange={(checked) =>
            onCheckboxChange({ checked, field: "checked", id: data.id })
          }
        />
      </Td>
      <Td
        isCategory={
          data.type === TableRowType.Category ||
          data.type === TableRowType.Common
        }
        isSubcategory={type === "subcategory"}
      >
        <Input
          value={data.name}
          onBlur={(value) => onInputBlur({ value, field: "name", id: data.id })}
        />
      </Td>
      <Td>
        {data?.items && data?.type === TableRowType.Category ? (
          <ValueWrapper>{weight || ""}</ValueWrapper>
        ) : (
          <Input
            value={weight}
            type={"number"}
            align={"center"}
            onBlur={(value) =>
              onInputBlur({ value, field: "weight", id: data.id })
            }
          />
        )}
      </Td>
      <Td>
        {data?.items && data?.type === TableRowType.Category ? (
          <ValueWrapper>{calories || ""}</ValueWrapper>
        ) : (
          <Input
            value={calories}
            type={"number"}
            align={"center"}
            onBlur={(value) =>
              onInputBlur({ value, field: "calories", id: data.id })
            }
          />
        )}
      </Td>
      <Td>
        <Input
          value={data.remark}
          onBlur={(value) =>
            onInputBlur({ value, field: "remark", id: data.id })
          }
        />
      </Td>
      <Td>
        <CloseButton
          fill={"#D2D4D6"}
          onClick={() => {
            onClickRemoveButton && onClickRemoveButton(data.id);
          }}
        />
      </Td>
    </>
  );
}

export default Index;

const Td = styled.div<{ isCategory?: boolean; isSubcategory?: boolean }>`
  overflow: hidden;
  display: flex;
  align-items: center;

  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  line-height: 17px;
  color: ${commonTheme.colors.black};

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
    padding-left: 9px;

    ${(props) =>
      props.isCategory &&
      `
      input {
        font-weight: 600;
      }
  `}
    ${(props) =>
      props.isSubcategory &&
      `
      input {
        margin-left: 20px;
      }
   `}
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

const CloseButton = styled(CloseCircleIcon)`
  cursor: pointer;
`;

const ValueWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5px 6px;

  text-align: center;
`;
