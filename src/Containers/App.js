import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import '../CSS/App.css'
import Home from '../Components/Home'

function App() {
	return (
		<Router>
			<Routes>
				<Route exact={true} path='/' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
