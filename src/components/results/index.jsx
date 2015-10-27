import React from "react";
import cx from "classnames";
import debounce from "lodash.debounce";

import Result from "./result";
import ResultsSortMenu from "./sort-menu";
import CurrentQuery from "hire-current-query";

import Loader from "../icons/loader-three-dots";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

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
		return results.map((data, index) => {
			if(this.props.customComponents.result != null) {
				return React.createElement(this.props.customComponents.result, {
					data: data,
					key: index + Math.random(),
					labels: this.props.labels,
					metadataList: this.props.metadataList,
					onSelect: this.props.onSelect
				});
			} else {
				return (<Result
					data={data}
					key={index + Math.random()}
					labels={this.props.labels}
					metadataList={this.props.metadataList}
					onSelect={this.props.onSelect} />);
			}
		});
	}

	render() {
		let loader = (this.props.results.requesting) ?
			<Loader className="loader" /> :
			null;

		let sortValues = this.props.queries.last.sortParameters.length > 0 ?
			this.props.queries.last.sortParameters :
			this.props.results.last.sortableFields.map(f => ({fieldname: f}));

		let currentQuery = (this.props.customComponents.currentQuery != null) ?
			React.createElement(this.props.customComponents.currentQuery, {
				labels: this.props.labels,
				onChangeFullTextField: this.props.onChangeFullTextField,
				onChangeSearchTerm: this.props.onChangeSearchTerm,
				onSelectFacetValue: this.props.onSelectFacetValue,
				queries: this.props.queries,
				results: this.props.results
			}) :
			(<CurrentQuery
				labels={this.props.labels}
				onChangeFullTextField={this.props.onChangeFullTextField}
				onChangeSearchTerm={this.props.onChangeSearchTerm}
				onSelectFacetValue={this.props.onSelectFacetValue}
				queries={this.props.queries}
				results={this.props.results} />);

		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>{this.props.results.last.numFound} {this.props.labels.resultsFound}</h3>

					<ResultsSortMenu
						labels={this.props.labels}
						onSetSort={this.props.onSetSort}
						values={sortValues} />
					{currentQuery}
				</header>
				<ol className={cx(
						"hire-faceted-search-result-list",
						{numbered: this.props.numberedResults}
					)}>
					{this.dataToComponents(this.props.results.last.refs) /** API V2.x uses refs as result key, back to results in API 3 */ }
				</ol>
				{loader}
			</div>
		);
	}
}

Results.propTypes = {
	config: React.PropTypes.object,
	currentQueryComponent: React.PropTypes.func,
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
	onChangeFullTextField: React.PropTypes.func,
	onChangeSearchTerm: React.PropTypes.func,
	onFetchNextResults: React.PropTypes.func,
	onSelect: React.PropTypes.func,
	onSelectFacetValue: React.PropTypes.func,
	onSetSort: React.PropTypes.func,
	queries: React.PropTypes.object,
	resultComponent: React.PropTypes.func,
	results: React.PropTypes.object

};

export default Results;