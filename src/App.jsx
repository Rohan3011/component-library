import "./App.css";
import Autocomplete from "./components/AutoComplete";
import { Button } from "./components/Button";

function App() {
  return (
    <div className="">
      <h1>Reusable Components with jsdoc</h1>
      <Button className="bg-emerald-500">Hello World</Button>
      <div className="flex justify-center items-center">
        <Autocomplete />
      </div>
    </div>
  );
}

export default App;
