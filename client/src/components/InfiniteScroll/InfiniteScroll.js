
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resources:[], pageSize:this.props.perPage||9, pageNo:1, prevY:0, loading:false, loadedOnce:false
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleObserver = this.handleObserver.bind(this);
    }

    async componentDidMount() {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1
        };
        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    getPagedListView(){
        return new Request('https://randomuser.me/api/?page='+this.state.pageNo+'&results='+this.state.pageSize+'&seed=abc', {
            method: 'get'
        });
    }

    async fetchData() {
        var _self = this;
        this.setState({ loading: true });

        var resp = await fetch(this.getPagedListView()).catch(err => {console.log(err)});
        if(resp.status >= 200 && resp.status < 300) {
            var json = await resp.json();
            const resources = json.results;
            this.setState({loading: false, resources: [...this.state.resources, ...resources]});
        }
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        const top = entities[0].target.getBoundingClientRect().top;

        if (entities[0].intersectionRatio > 0) {
            this.fetchData();
            if (top < window.innerHeight && !this.state.loadedOnce) {
                observer.unobserve(this.loadingRef);
                observer.observe(this.loadingRef);
                this.setState({loadedOnce:true});
            }

            this.setState({pageNo: this.state.pageNo+1, prevY:y});

        }
    }

    render(){
        const loadingTextCSS = { display: this.state.loading ? "block" : "" };
        var {resources} = this.state;
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <h3 className="font-weight-light">React + Bootstrap 4 - Infinite Scrolling Data</h3>
                    </div>
                </div>
                <div className="row" id="scrollRoot">
                    {resources && resources.length > 0 ? resources
                        .map((resource,key) =>
                            (
                                <div className={'py-3 animated fadeIn ' + (this.props.colSize?this.props.colSize:'col-lg-4 col-md-6')} key={key}>
                                    <div className="card shadow-sm h-100">
                                        <div className="card-header shadow">
                                            {resource.name.first}
                                        </div>
                                        <div className="card-body py-5">
                                            <img className="rounded-circle float-right" src={resource.picture.thumbnail} />
                                            #{key+1} {resource.login.username} ({resource.gender})<br/>
                                            {resource.location.city}, {resource.location.state}
                                        </div>
                                        <div className="card-footer text-right bg-light">
                                            <button className="btn btn-outline-info">More</button>
                                        </div>
                                    </div>
                                </div>
                            )):<div />}
                </div>
                <div className="row">
                    <div className="col-12 mt-5 py-5 text-center" ref={loadingRef => (this.loadingRef = loadingRef)}>
                  <span style={loadingTextCSS}>
                    ...loading...
                  </span>
                    </div>
                </div>
            </div>
        )
    }
};

ReactDOM.render(
    <App />,
    document.getElementById("app")
);