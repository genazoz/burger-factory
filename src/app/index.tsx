import { withProviders } from "./providers";
import { Routing } from "@/pages";
import GlobalStyles from "@/app/styles/globalStyles";
import "./styles/normalize.scss";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Routing />
    </>
  );
};

export default withProviders(App);
