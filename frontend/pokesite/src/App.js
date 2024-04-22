import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectedPokemon from "./pages/SelectedPokemon";
import Profile from "./pages/Profile";
import NavBarx from "./components/NavBarx";
import PokemonMove from "./pages/PokemonMove";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
			<NavBarx />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/search" element={<Search />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/pokemon" element={<SelectedPokemon />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/move" element={<PokemonMove/>}/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
