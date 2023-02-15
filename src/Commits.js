import React, {useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import "./Commits.css";

const Commits = ({thisRepo}) => {
	const [commitData, setCommitData] = useState([]);

	const getCommits = async () => {
		try {
			const res = await fetch(
				`https://api.github.com/repos/Netflix/${thisRepo.name}/commits`,
			);
			const data = await res.json();
			setCommitData(data);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getCommits();
	}, []);

	const mainContent = useRef();

	const handleScroll = (ref) => {
		window.scrollTo({
			behavior: "smooth",
			top: ref.current.offsetTop,
		});
	};

	return (
		<div ref={mainContent} className="commit-content">
			<div className="scroll-up">
				<div
					className="arrow right"
					onClick={() => handleScroll(mainContent)}
				></div>
			</div>

			<h1 className="branch-name">{thisRepo.name}</h1>

			<div className="commit-list">
				{commitData.map((commit, i) => {
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
										<span className="mini-title">Committer: </span>
										{commit.author === null
											? "No Username Listed"
											: commit.author.login}
									</p>

									<p className="commit-info">
										<span className="mini-title">Commit Hash: </span>{" "}
										{commit.sha}
									</p>

									<p className="commit-info">
										<span className="mini-title">Commited On:</span>{" "}
										{new Date(commit.commit.author.date).toDateString()}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<Link className="back-button" to="/">
				<p className="back-text">Back</p>
			</Link>
		</div>
	);
};
export default Commits;
