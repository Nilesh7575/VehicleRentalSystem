import './App.css';
import Nav from './components/Navigation/Nav';
import Dashboard from './components/Dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Nav/>
      <Dashboard/>
    </div>
  );
}

export default App;
