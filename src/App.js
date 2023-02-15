import "./App.css";
import React, {useState, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Commits from "./Commits";

function App() {
	const [repoData, setRepoData] = useState([]);

	const getRepos = async () => {
		try {
			const res = await fetch(`https://api.github.com/orgs/Netflix/repos`);
			const data = await res.json();
			setRepoData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRepos();
	}, []);

	return (
		<Switch>
			<Route
				path={"/"}
				exact
				render={() => <Home repoData={repoData} />}
			></Route>
			<Route
				path="/:name"
				render={(routerProps) => {
					// console.log(routerProps);
					const thisRepo = [...repoData].filter((a) => {
						return a.name === routerProps.match.params.name;
					});
					return (
						<Commits
							{...routerProps}
							thisRepo={thisRepo[0]}
							getRepos={getRepos}
						/>
					);
				}}
			/>
		</Switch>
	);
}

export default App;
