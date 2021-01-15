import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import Blank from "./components/Blank/Blank";
import Login from "./components/Login/login-user.component";

import Register from "./components/Register/register-user.component";


//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {

	const [user, setUser] = useState("");

	useEffect(() => {
	fetch("http://localhost:5000/auth/secret", {
	headers: {
		Authorization: "Bearer " + localStorage.getItem("token"),
	},})
		.then((res) => {
			return res.json();
		})
		.then((user) => {
			console.log("User connected" + user);
			setUser(user);
		})
		.catch((err) => {
			console.log(err);
		});	
	},[]);
	
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
			<Route exact path = "/" component = { Blank } />
			<Route exact path = "/login" component = { Login } />
			<Route exact path = "/register" component = { Register } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
