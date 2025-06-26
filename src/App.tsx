import { BrowserRouter as Router } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { SuperUser } from "./navigation/SuperUser";
import { Onboard } from "./navigation/Onboard";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "./stores/user";

export default function App() {
  const isLoggedIn =  useSelector(selectIsLoggedIn)
  return (
    <>
      <Router>
        <ScrollToTop />
        { isLoggedIn ? (
          <SuperUser />
        ) : (
          <Onboard />
        )}
      </Router>
    </>
  );
}
