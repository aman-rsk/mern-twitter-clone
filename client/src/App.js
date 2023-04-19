import './App.css';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Explore from './pages/Explore/Explore';
import Signin from './pages/Signin/Signin';
import Navbar from './components/Navbar/Navbar';
import Error from './pages/Error/Error';

const Layout = () => {
	return (
		<div className="md:w=8/12 mx-auto">
			<Navbar />
			<Outlet />
		</div>
	);
};

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Layout />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/profile/:id" element={<Profile />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signout" element={<Signin />} />
					<Route path="/*" element={<Error />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
