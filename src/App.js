import "./App.css";
import React, {useState, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Commits from "./Commits";

function App() {
	const [repoData, setRepoData] = useState([]);

	const [branchData, setBranchData] = useState({});
	const [commitData, setCommitData] = useState({});

	// const getBranch = async () => {
	// 	try {
	// 		const res = await fetch(
	// 			`https://api.github.com/repos/Netflix/${repoData.name}/branches/${repoData.default_branch}`,
	// 			{
	// 				headers: {
	// 					Authorization: "token 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",
	// 				},
	// 			},
	// 		);
	// 		const data = await res.json();
	// 		setBranchData(data.commit.sha);
	// 		console.log(branchData);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const getRepos = async () => {
		try {
			const res = await fetch(`https://api.github.com/orgs/Netflix/repos`, {
				headers: {
					Authorization: "token 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",
				},
			});
			const data = await res.json();
			setRepoData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRepos();
		// getBranch();
	}, []);

	return (
		// <BrowserRouter>
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
					localStorage.setItem("repoObj", JSON.stringify(thisRepo[0]));
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
