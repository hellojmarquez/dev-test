import './App.css';
import { Routes, Route } from 'react-router-dom';
import Form from './Components/Form.jsx';
import UserDashboard from './Components/Dashboard';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/*" element={<Form />} />
				<Route path="/dashboard" element={<UserDashboard />} />
			</Routes>
		</div>
	);
}

export default App;
