import React from "react";
import cx from "classnames";
import debounce from "lodash.debounce";

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
			if(this.props.resultComponent) {
				return React.createElement(this.props.resultComponent, {
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

		return (
			<div className="hire-faceted-search-results">
				<header>
					<h3>{this.props.results.last.numFound} {this.props.labels.resultsFound}</h3>

					<ResultsSortMenu
						labels={this.props.labels}
						onSetSort={this.props.onSetSort}
						values={sortValues} />

					<CurrentQuery
						labels={this.props.labels}
						onChangeSearchTerm={this.props.onChangeSearchTerm}
						onSelectFacetValue={this.props.onSelectFacetValue}
						queries={this.props.queries}
						results={this.props.results} />
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
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
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