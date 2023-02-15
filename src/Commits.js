import React, {useState, useEffect} from "react";
import "./Commits.css";

const Commits = ({thisRepo, getRepos}) => {
	const [branchData, setBranchData] = useState([]);
	const [commitData, setCommitData] = useState([]);

	const getBranch = async () => {
		const obj = JSON.parse(localStorage.getItem("repoObj"));
		try {
			const res = await fetch(
				`https://api.github.com/repos/Netflix/${obj.name}/branches/${obj.default_branch}`,
				{
					headers: {
						Authorization: "token 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",
					},
				},
			);
			const data = await res.json();
			setBranchData(data.commit.sha);
			console.log(data.commit);
		} catch (error) {
			console.log(error);
		}
	};

	const getCommits = async () => {
		const sha = branchData;
		try {
			const res = await fetch(
				`https://api.github.com/repos/Netflix/${thisRepo.name}/commits`,
				{
					headers: {
						Authorization: "token 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",
					},
				},
			);
			const data = await res.json();
			setCommitData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		} finally {
			await getBranch();
		}
	};

	useEffect(() => {
		// getBranch(thisRepo);
		getCommits();
	}, []);

	return (
		<div className="commit-content">
			<h1 className="branch-name">{thisRepo.name}</h1>

			<div className="commit-list">
				{commitData
					// .sort((a, b) => b.stargazers_count - a.stargazers_count)
					.map((commit, i) => {
						return (
							<div className="commit-item" key={commit.sha}>
								<div className="commit-items">
									<h3 className="message">
										{(commit.author === null || commit.author.login) ===
										"dependabot[bot]"
											? "Made by a Bot"
											: commit.commit.message}
									</h3>
									<div className="secondary-commit">
										<p className="commit-info">
											<span>Committer: </span>
											{commit.author === null
												? "No Username Listed"
												: commit.author.login}
										</p>

										<p className="commit-info">
											<span>Commit Hash: </span> {commit.sha}
										</p>

										<p className="commit-info">
											<span>Commited On:</span>{" "}
											{new Date(commit.commit.author.date).toDateString()}
										</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};
export default Commits;
