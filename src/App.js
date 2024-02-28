import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="MainContent">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
