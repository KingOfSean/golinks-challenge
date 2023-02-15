import {Link} from "react-router-dom";

const Home = ({repoData}) => {
	return (
		<div className="main-content">
			<h1 className="main-title">Repo Catcher</h1>

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
					})}
			</div>
		</div>
	);
};

export default Home;
