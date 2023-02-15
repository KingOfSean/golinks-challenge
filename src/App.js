import "./App.css";
import React, {useState, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./Home";
import Commits from "./Commits";

function App() {
	const [repoData, setRepoData] = useState([]);
	const [searchRepo, setSearchRepo] = useState("netflix");
	const [request, setRequest] = useState(true);

	const handleChange = (event) => {
		setSearchRepo(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (request === false) {
			setRequest(true);
		}
		getRepos(searchRepo);
	};

	const getRepos = async () => {
		try {
			const res = await fetch(
				`https://api.github.com/orgs/${searchRepo}/repos`,
			).then((response) => {
				if (response.ok) {
					return response;
				} else {
					setRequest(false);
					throw new Error(response.status + " Failed Fetch ");
				}
			});
			const data = await res.json();
			setRepoData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRepos(searchRepo);
	}, []);

	return (
		<Switch>
			<Route
				path={"/"}
				exact
				render={() => (
					<Home
						repoData={repoData}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						searchRepo={searchRepo}
						setSearchRepo={setSearchRepo}
						request={request}
					/>
				)}
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
							searchRepo={searchRepo}
						/>
					);
				}}
			/>
		</Switch>
	);
}

export default App;
