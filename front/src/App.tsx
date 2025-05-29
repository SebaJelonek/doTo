import { Fragment } from "react";
import { Provider, useAtom } from "jotai";
import "./App.css";
import { Register } from "./Views/Register/Register";
import { Navbar } from "./components/Navigation/Navbar/Navbar";
import Container from "./components/Container/Container";
import { UserAtom } from "./Atoms";

function App() {
  const [user] = useAtom(UserAtom);
  const id = undefined;

  return (
    <div className="App">
      <Provider>
        {id === undefined ? (
          <Register />
        ) : (
          <Fragment>
            <Container />
            <Navbar />
          </Fragment>
        )}
      </Provider>
    </div>
  );
}

export default App;
