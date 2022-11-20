import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import ArtistsPage from './pages/ArtistsPage';
import ArtworkPage from './pages/ArtworkPage';

import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"


ReactDOM.render(
	<div>
		<Router>
			<Switch>
				<Route exact
					path="/"
					render={() => (
						<HomePage />
					)} />
				<Route exact
					path="/artists"
					render={() => (
						<ArtistsPage />
					)} />
				<Route exact
					path="/artworks"
					render={() => (
						<ArtworkPage />
					)} />
			</Switch>
		</Router>
	</div>,
	document.getElementById('root')
);

