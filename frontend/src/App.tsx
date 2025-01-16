import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";


const App = () => {

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>

      <main>
        <Container maxWidth="xl">
          <Routes>
              <Route path="/" element={<Home/>} />
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App;
