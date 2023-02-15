import "./Search.css";

const Search = ({handleChange, handleSubmit, searchRepo}) => {
	return (
		<form onSubmit={handleSubmit} className="form-horizontal">
			<input
				className="search-bar"
				placeholder="Search"
				type="text"
				name="searchRepo"
				required
				onChange={handleChange}
				value={searchRepo}
			/>
			<button className="search-button" type="submit">
				<img
					className="search-img"
					src="/Images/search.png"
					height="40px"
					width="40px"
				/>
			</button>
		</form>
	);
};

export default Search;
