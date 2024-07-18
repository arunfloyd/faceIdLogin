import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";
import { SpeedInsights } from '@vercel/speed-insights/react';
function App() {
  return (
    <Provider store={appStore}>
      <Body />
      <SpeedInsights />
    </Provider>

  )
}
export default App