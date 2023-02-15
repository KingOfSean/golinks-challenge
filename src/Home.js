import {Link} from "react-router-dom";
import React, {useRef} from "react";
import Search from "./Search";

const Home = ({repoData, handleChange, handleSubmit, searchRepo, request}) => {
	const mainContent = useRef();

	const handleScroll = (ref) => {
		window.scrollTo({
			behavior: "smooth",
			top: ref.current.offsetTop,
		});
	};

	if (repoData === undefined) {
		return <p className="main-title">No Results</p>;
	}

	return (
		<div ref={mainContent} className="main-content">
			<div className="scroll-up">
				<div
					className="arrow right"
					onClick={() => handleScroll(mainContent)}
				></div>
			</div>
			<h1 className="main-title">Repo Catcher</h1>

			<Search
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				searchRepo={searchRepo}
			/>

			<div className="repo-list">
				{request === false ? (
					<div>
						<p className="main-title">No Results</p>
					</div>
				) : (
					repoData
						.sort((a, b) => b.stargazers_count - a.stargazers_count)
						.map((repo, i) => {
							return (
								<Link className="repo-link" to={`${repo.name}`} key={repo.id}>
									<div className="repo">
										<h2 className="repo-name">{repo.name} </h2>
										<p>Writen in {repo.language}</p>
										<p className="description">{repo.description}</p>
										<div className="secondary-info">
											<p className="mini-info">
												<span className="mini-title">Forks:</span>{" "}
												{repo.forks_count}
											</p>
											<p className="mini-info">
												<span className="mini-title">Followers:</span>{" "}
												{repo.stargazers_count}
											</p>
											<p className="mini-info">
												<span className="mini-title">Created:</span>{" "}
												{new Date(repo.created_at).toDateString()}
											</p>
										</div>
									</div>
								</Link>
							);
						})
				)}
			</div>
		</div>
	);
};

export default Home;
