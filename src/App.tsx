import "./index.css";

import clientOnly from "./utils/client-only";

const LazyButton = clientOnly(() => import("./Lazy").then(({ Lazy }) => ({ default: Lazy })));

const App = () => (
  <>
    <button type="button" onClick={() => console.log("lol")}>
      hi
    </button>
    <LazyButton />
  </>
);

export default App;
