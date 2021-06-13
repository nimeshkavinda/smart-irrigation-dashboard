import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Jumbotron from "./components/Jumbotron";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Jumbotron />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
