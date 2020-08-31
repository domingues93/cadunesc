import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// @pages
import Login from './pages/login';
import Panel from './pages/panel';

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login}/>
				<PrivateRoute path="/" component={Panel}/>
			</Switch>
		</Router>
	)
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => 
			localStorage.getItem("cadunesc-token") ? (
				<Component {...props}/>
			) : (
				<Redirect
					to={{
						pathname: "/login",
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
)