import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// @pages
import Login from './pages/login';

export default function Routes() {
	return (
		<Router>
			<Switch>
				<Route exact path="/login" component={Login}/>
			</Switch>
		</Router>
	)
}

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => 
			false ? (
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