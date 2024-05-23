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
import PokemonAbilityPage from "./pages/PokemonAbilityPage";
import DamageRelations from "./pages/DamageRelations";
import { useState } from "react";

function App() {
	const [loggedInEmail, setLoggedInEmail] = useState(
		localStorage.getItem("email")
	);

	const handleLogin = (email) => {
		localStorage.setItem("email", email);
		setLoggedInEmail(email);
	};

	const handleLogout = () => {
		localStorage.removeItem("email");
		setLoggedInEmail(null);
		window.location.href = "/";
	};

	return (
		<div className="App">
			<BrowserRouter>
				<NavBarx loggedInEmail={loggedInEmail} onLogout={handleLogout} />
				<div className="pages">
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/search" element={<Search />} />
						<Route path="/login" element={<Login onLogin={handleLogin} />} />
						<Route path="/signup" element={<Signup onLogin={handleLogin} />} />
						<Route path="/pokemon" element={<SelectedPokemon onEmailChange={handleLogin} />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/move" element={<PokemonMove />} />
						<Route path="/ability" element={<PokemonAbilityPage />} />
						<Route path="/relations" element={<DamageRelations />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
