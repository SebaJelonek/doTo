import { Fragment, useState } from "react";
import { Provider } from "jotai";
import "./App.css";

import { Navbar } from "./components/Navigation/Navbar/Navbar";
import Container from "./components/Container/Container";
import { UserContainer } from "./components/UserViewsContainer/UserContainer";
import { LoginNavbar } from "./components/Navigation/Navbar/LoginNavBar";
import { atomStore } from "./Atoms";

function App() {
  const [id, setId] = useState<number>(0);

  return (
    <div className="App">
      <Provider store={atomStore}>
        {id === 0 ? (
          <Fragment>
            <UserContainer setId={setId} />
            <LoginNavbar />
          </Fragment>
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
