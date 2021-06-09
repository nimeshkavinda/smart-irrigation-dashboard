import "./App.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
