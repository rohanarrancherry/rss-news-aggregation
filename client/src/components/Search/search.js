import "../Main/styles.module.css";

const SearchBar = ({searchNews}) => {

    return (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Search"
            name="s" 
            onChange={(event)=>{searchNews(event.target.value)}}
        />
    </form>)
};

export default SearchBar;