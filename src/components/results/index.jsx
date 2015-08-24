import React from "react";
import debounce from "lodash.debounce";
import isEqual from "lodash.isequal";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";
import CurrentQuery from "./current-query";

import Loader from "../icons/loader-three-dots";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

let inViewport = function(el) {
	let rect = el.getBoundingClientRect();

	return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.onScroll = debounce(this.onScroll, 300).bind(this);

		this.state = {
			results: this.props.results.last.results
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll);
	}

	componentWillReceiveProps(nextProps) {
		let nextPage = this.props.results.last.start + this.props.config.rows === nextProps.results.last.start;
		let newResults = this.props.results.last !== nextProps.results.last;

		if (nextPage || newResults) {
			let nextResults = nextProps.results.last.results;

			if (nextPage) {
				nextResults = this.state.results.concat(nextResults);

				window.addEventListener("scroll", this.onScroll);
			}

			this.setState({
				results: nextResults
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	}

	onScroll() {
		let nth = (this.state.results.length - this.props.config.rows) + 1;

		let listItem = React.findDOMNode(this).querySelector(`.hire-faceted-search-result-list > li:nth-child(${nth})`);

		if (this.props.results.last.hasOwnProperty("_next") && inViewport(listItem)) {
			let url = this.props.results.last._next.replace("draft//api", "draft/api");
			this.props.onFetchResultsFromUrl(url);

			window.removeEventListener("scroll", this.onScroll);
		}

	}

	dataToComponents(results) {
		return results.map((data, index) =>
			<Result
				data={data}
				key={index + Math.random()}
				labels={this.props.labels}
				onSelect={this.props.onSelect} />
		);
	}

	render() {
		let loader = (this.props.results.last.numFound) > this.state.results.length ?
			<Loader className="loader" /> :
			null;
		console.log(this.props.labels);
		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>{this.props.results.last.numFound} {this.props.labels.resultsFound}</h3>
					<ResultsSortMenu
						labels={this.props.labels}
						onSetSort={this.props.onSetSort}
						values={this.props.queries.last.sortParameters} />
					<CurrentQuery
						labels={this.props.labels}
						onChangeSearchTerm={this.props.onChangeSearchTerm}
						onSelectFacetValue={this.props.onSelectFacetValue}
						queries={this.props.queries}
						results={this.props.results} />
				</header>
				<ul className="hire-faceted-search-result-list">
					{this.dataToComponents(this.state.results)}
				</ul>
				{loader}
			</div>
		);
	}
}

Results.propTypes = {
	config: React.PropTypes.object,
	labels: React.PropTypes.object,
	onChangeSearchTerm: React.PropTypes.func,
	onFetchResultsFromUrl: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	onSetSort: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object
};

export default Results;