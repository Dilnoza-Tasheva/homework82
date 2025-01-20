import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import ArtistDetailsPage from "./features/artists/ArtistDetailsPage.tsx";
import AlbumDetailsPage from "./features/albums/AlbumDetailsPage.tsx";
import Register from "./features/users/Register.tsx";
import TrackHistory from "./features/tracks/TrackHistory.tsx";


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
              <Route path="/artist/:id" element={<ArtistDetailsPage />} />
              <Route path="/album/:id" element={<AlbumDetailsPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/track-history" element={<TrackHistory />} />
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App;
