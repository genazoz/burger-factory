import styled from "styled-components/macro";

import { ReactComponent as Logo } from "@/app/assets/logo-icon.svg";
import { ReactComponent as ArrowRightIcon } from "@/app/assets/arrow-right-icon.svg";
import Button from "@/UI/Button";
import { paths } from "@/app/common/mocks";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NotFound>
      <LogoWrapper>
        <Text>4</Text>
        <Logo />
        <Text>4</Text>
      </LogoWrapper>
      <Button
        icon={
          <ArrowRightIcon
            width={18}
            height={18}
            stroke={"white"}
            style={{ transform: "rotate(180deg)" }}
          />
        }
        onClick={() => navigate(paths.recipes)}
      >
        К рецептам
      </Button>
    </NotFound>
  );
};

export default NotFoundPage;

const NotFound = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: max-content;
  height: max-content;
  margin: auto;

  font-size: 80px;
  text-align: center;
  color: black;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Text = styled.div`
  font-weight: 700;
`;
