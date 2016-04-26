import React from "react";
import cx from "classnames";
import debounce from "lodash.debounce";
import insertCss from "insert-css";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";
import CurrentQuery from "hire-current-query";

import Loader from "../icons/loader-three-dots";

let fs = require("fs");
let css = fs.readFileSync(__dirname + "/index.css");

if (typeof window != 'undefined' && window.document) {
	insertCss(css, {prepend: true});
}

let inViewport = function(el) {
	let rect = el.getBoundingClientRect();
	return rect.height > 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
};

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.onScroll = debounce(this.onScroll, 300).bind(this);
	}

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	}

	onScroll() {
		let nth = (this.props.results.last.refs.length - parseInt(Math.floor(this.props.config.rows / 2))) + 1;
		let listItem = React.findDOMNode(this).querySelector(`.hire-faceted-search-result-list > li:nth-child(${nth})`);
		if (this.props.results.last.hasOwnProperty("_next") && listItem && inViewport(listItem)) {
			let url = this.props.results.last._next;
			this.props.onFetchNextResults(url);
		}

	}

	dataToComponents(results) {
		let ResultComponent = (this.props.customComponents.result != null) ?
			this.props.customComponents.result :
			Result;

		return results.map((data, index) =>
			<ResultComponent
				data={data}
				key={index + Math.random()}
				labels={this.props.labels}
				metadataList={this.props.metadataList}
				onSelect={this.props.onSelect} />
		);
	}

	render() {
		let loader = (this.props.results.requesting) ?
			<Loader className="loader" /> :
			null;

		const currentSortParameter = this.props.queries.last.sortParameters.length ?
			this.props.queries.last.sortParameters[0].fieldname :
			null;

		let sortValues = this.props.results.last.sortableFields
			.map(f => ({fieldname: f}))
			.sort((a, b) => a.fieldname === currentSortParameter ? -1 : b.fieldname === currentSortParameter ? 1 : 0);

		let CurrentQueryComponent = (this.props.customComponents.currentQuery != null) ?
			this.props.customComponents.currentQuery :
			CurrentQuery;

		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>{this.props.results.last.numFound} {this.props.labels.resultsFound}</h3>
					<ResultsSortMenu
						labels={this.props.labels}
						onSetSort={this.props.onSetSort}
						values={sortValues} />
					<CurrentQueryComponent
						labels={this.props.labels}
						onChangeFullTextField={this.props.onChangeFullTextField}
						onChangeSearchTerm={this.props.onChangeSearchTerm}
						onSelectFacetValue={this.props.onSelectFacetValue}
						queries={this.props.queries}
						results={this.props.results} />
				</header>
				<ol className={cx(
						"hire-faceted-search-result-list",
						{numbered: this.props.numberedResults}
					)}>
					{this.dataToComponents(this.props.results.last.refs) /* API V2.x uses refs as result key, back to results in API 3 */ }
				</ol>
				{loader}
			</div>
		);
	}
}

Results.propTypes = {
	config: React.PropTypes.object,
	customComponents: React.PropTypes.object,
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
	numberedResults: React.PropTypes.bool,
	onChangeFullTextField: React.PropTypes.func,
	onChangeSearchTerm: React.PropTypes.func,
	onFetchNextResults: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	onSetSort: React.PropTypes.func,
	queries: React.PropTypes.object,
	results: React.PropTypes.object

};

export default Results;