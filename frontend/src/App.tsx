import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home.tsx";
import ArtistDetailsPage from "./features/artists/ArtistDetailsPage.tsx";
import AlbumDetailsPage from "./features/albums/AlbumDetailsPage.tsx";
import Register from "./features/users/Register.tsx";
import TrackHistory from "./features/tracks/TrackHistory.tsx";
import AddArtist from "./features/artists/AddArtist.tsx";
import AddAlbum from "./features/albums/AddAlbum.tsx";
import AddTrack from "./features/tracks/AddTrack.tsx";
import ArtistsAdminPage from "./features/admin/AdminArtistPage.tsx";
import LoginPage from "./features/users/LoginPage.tsx";


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
              <Route path="/artists/new" element={<AddArtist />} />
              <Route path="/albums/new" element={<AddAlbum />} />
              <Route path="/tracks/new" element={<AddTrack />} />
              <Route path="/admin/artists" element={<ArtistsAdminPage />} />
              <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Container>
      </main>
    </>
  )
};

export default App;
