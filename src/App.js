import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from './firebase';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  const [user] = useAuthState(auth)

  return (
    <BrowserRouter>
      <div className={classes.App}>
      {
        user? <Header user={user.photoURL}/> : <SignIn />
      } 
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
