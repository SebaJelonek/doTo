import { Fragment, useEffect, useState } from "react";
import { Provider } from "jotai";
import "./App.css";

import { Navbar } from "./components/Navigation/Navbar/Navbar";
import Container from "./components/Container/Container";
import { UserContainer } from "./components/UserViewsContainer/UserContainer";
import { LoginNavbar } from "./components/Navigation/Navbar/LoginNavBar";
import { UserAtom, atomStore } from "./Atoms";

function App() {
  const [id, setId] = useState(atomStore.get(UserAtom).id);

  return (
    <div className="App">
      <Provider store={atomStore}>
        {id === 0 || id === undefined ? (
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
