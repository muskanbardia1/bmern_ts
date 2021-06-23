import React, { useEffect } from "react";
import { createBrowserHistory } from "history";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import { Router, Route, Switch } from "react-router-dom";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { getUserById } from "./flux/actions/authActions";
import {useDispatch} from "react-redux"
import ProtectedRoute from "./components/privateRoute"


import "./App.css";
export const history = createBrowserHistory();

function App() {
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(getUserById());
  }, []);
  return (
		<Router history={history}>
			<div className="App">
				<Switch>
					<Route path="/" exact component={SignIn} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/userDashboard" component={UserDashboard} />
					<ProtectedRoute
						exact
						path="/adminDashboard"
						component={AdminDashboard}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
