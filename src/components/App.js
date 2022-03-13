import "../styles/App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateCoupon from "./createCoupon";
import Coupons from "./Coupons";
import Home from "./home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateCoupon />} />
          <Route path="/AllCoupon" element={<Coupons />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
