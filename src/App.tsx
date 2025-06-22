import { BrowserRouter as Router } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { useState } from "react";
import { SuperUser } from "./navigation/SuperUser";
import { Onboard } from "./navigation/Onboard";

export default function App() {
  const [isLoggedIn] = useState(false);

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
