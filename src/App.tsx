import { BrowserRouter as Router } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { SuperUser } from "./navigation/SuperUser";
import { Onboard } from "./navigation/Onboard";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "./stores/user";
import { useEffect } from "react";
import { fetchAllTranslations } from "./service";
import { keepTranslation } from "./stores/translation";
import { Slide, ToastContainer } from 'react-toastify';


export default function App() {
  const isLoggedIn =  useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadDefaults(){
      const resp = await fetchAllTranslations();
      if(resp.success){
        const { data } = resp.data;
        dispatch(keepTranslation(data))
      }
    }
    loadDefaults();
    return () => undefined
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        { isLoggedIn ? (
          <SuperUser />
        ) : (
          <Onboard />
        )}
        <ToastContainer />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={10}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Slide}
          style={{zIndex: 99999}}
        />
      </Router>
    </>
  );
}
