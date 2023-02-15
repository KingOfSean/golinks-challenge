import {Link} from "react-router-dom";

const Home = ({repoData}) => {
	return (
		<div className="main-content">
			<h1>Repo Catcher</h1>

			<div className="repo-list">
				{repoData
					.sort((a, b) => b.stargazers_count - a.stargazers_count)
					.map((repo, i) => {
						return (
							<Link className="repo-link" to={`${repo.name}`} key={repo.id}>
								<div className="repo">
									<h2 className="repo-name">{repo.name} </h2>
									<p>Writen in {repo.language}</p>
									<p className="description">{repo.description}</p>
									<div className="secondary-info">
										{/* <p>
											<span>Branch:</span> {repo.default_branch}
										</p> */}
										<p>
											<span>Forks:</span> {repo.forks_count}
										</p>
										<p>
											<span>Followers:</span> {repo.stargazers_count}
										</p>
										<p>
											<span>Created:</span>{" "}
											{new Date(repo.created_at).toDateString()}
										</p>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
};

export default Home;
