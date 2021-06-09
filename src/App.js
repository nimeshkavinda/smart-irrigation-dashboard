import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Jumbotron from "./components/Jumbtron";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Jumbotron />
      <Dashboard />
    </div>
  );
}

export default App;
