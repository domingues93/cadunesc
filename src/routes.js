import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';



// @pages
import Login from './pages/login';
import Panel from './pages/panel';



// theme for cadunesc
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
let cadunesc = createMuiTheme({
	palette: {
		primary: {
			main: "#ffe74c",
			dark: "#ffb74d",
		},
		secondary: {
			main: "#262d33"
		}
	},
});
cadunesc = responsiveFontSizes(cadunesc);


export default function Routes() {
	return (
		<ThemeProvider theme={cadunesc}>
			<Router>
				<Switch>
					<Route exact path="/login" component={Login}/>
					<PrivateRoute path="/" component={Panel}/>
				</Switch>
			</Router>
		</ThemeProvider>
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