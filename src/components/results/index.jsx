import React from "react";
import {Map} from "immutable";
import debounce from "lodash.debounce";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";
import ResultsRows from "./rows";
import CurrentQuery from "./current-query";
// import Pagination from "./pagination";

import Loader from "../icons/loader-three-dots";

import resultsActions from "../../actions/results";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

let inViewport = function(el) {
	let rect = el.getBoundingClientRect()

	return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.onScroll = debounce(this.onScroll, 300).bind(this);

		this.state = {
			results: this.dataToComponents(this.props.facetData.get("results"))
		};
	}

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll);
	}

	componentWillReceiveProps(nextProps) {
		let nextPage = this.props.facetData.get("start") + this.props.rows === nextProps.facetData.get("start");
		let otherQuery = this.props.query !== nextProps.query;

		if (nextPage || otherQuery) {
			let nextResults = this.dataToComponents(nextProps.facetData.get("results"));

			if (nextPage) {
				nextResults = this.state.results.concat(nextResults)

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

	onScroll(ev) {
		let nth = (this.state.results.size - this.props.rows) + 1;

		let listItem = React.findDOMNode(this).querySelector(`.hire-faceted-search-result-list > li:nth-child(${nth})`);

		if (this.props.facetData.has("_next") && inViewport(listItem)) {
			let url = this.props.facetData.get("_next").replace("draft//api", "draft/api");
			resultsActions.getResultsFromUrl(url);

			window.removeEventListener("scroll", this.onScroll);
		}

	}

	dataToComponents(results) {
		return results.map((data, index) =>
			<Result
				data={data}
				i18n={this.props.i18n}
				key={index + Math.random()}
				onSelect={this.props.onSelect} />
		);
	}

	render() {
		let loader = (this.props.facetData.get("numFound") > this.state.results.size) ?
			<Loader className="loader" /> :
			null;

		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>{this.props.i18n["Results found"]}: {this.props.facetData.get("numFound")}</h3>
					<ResultsSortMenu
						i18n={this.props.i18n}
						values={this.props.query.get("sortParameters")} />
					{/* <ResultsRows
						rows={this.props.rows} /> */}
					<CurrentQuery
						facetData={this.props.facetData}
						i18n={this.props.i18n}
						values={this.props.query} />
				</header>
				{/* <Pagination facetData={this.props.facetData} /> */}
				<ul className="hire-faceted-search-result-list">
					{this.state.results}
				</ul>
				{loader}
			</div>
		);
	}
}

Results.propTypes = {
	facetData: React.PropTypes.instanceOf(Map),
	i18n: React.PropTypes.object,
	query: React.PropTypes.instanceOf(Map),
	rows: React.PropTypes.number
}

export default Results;