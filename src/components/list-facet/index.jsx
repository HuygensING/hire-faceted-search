import React from "react";
import cx from "classnames";

import SortMenu from "../sort-menu";
import FilterMenu from "../filter-menu";
import ListItem from "./list-item";

import sortFunction from "./sort-function";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

const INIT_SIZE = 12;

class ListFacet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			filterQuery: "",
			showAll: false,
			sortDirection: (props.sort != null) ? props.sort.direction : "descending",
			sortType: (props.sort != null) ? props.sort.type : "count"
		};
	}

	handleButtonClick() {
		this.setState({
			showAll: true
		});
	}

	handleSortMenuChange(type, direction) {
		this.setState({
			sortDirection: direction,
			sortType: type
		});
	}

	handleFilterMenuChange(filterQuery) {
		this.setState({
			filterQuery: filterQuery
		});
	}

	selectedValues() {
		let selectedValues = this.props.queries.last.facetValues
			.filter((values) =>	values.name === this.props.data.name);

		return (selectedValues.length) ?
			selectedValues[0].values :
			selectedValues;
	}

	render() {
		let filterMenu, sortMenu;

		let options = this.props.data.options;
		options = options.sort(sortFunction(this.state.sortType, this.state.sortDirection));

		if (this.props.showSortMenu) {
			sortMenu = (<SortMenu
				direction={this.state.sortDirection}
				onChange={this.handleSortMenuChange.bind(this)}
				type={this.state.sortType} />
			);
		}

		if (this.props.showFilterMenu) {
			filterMenu = <FilterMenu onChange={this.handleFilterMenuChange.bind(this)} />;

			if (this.state.filterQuery.length) {
				let query = this.state.filterQuery.toLowerCase();

				options = options.filter((option) =>
					option.name.toLowerCase().indexOf(query) > -1
				);
			}
		}

		let optionsToRender = (this.state.showAll) ?
			options :
			options.slice(0, INIT_SIZE - 1);


		let selectedValues = this.selectedValues();
		let listItems = optionsToRender.map((option, index) =>
			<ListItem
				checked={selectedValues.indexOf(option.name) > -1}
				count={option.count}
				facetName={this.props.data.name}
				key={index}
				name={option.name}
				onSelectFacetValue={this.props.onSelectFacetValue} />);


		if (!listItems.length) {
			listItems = <li className="no-options-found">No options found.</li>;
		}


		let title = this.props.data.name;
		let facetTitle = this.props.labels.facetTitles.hasOwnProperty(title) ?
			this.props.labels.facetTitles[title] :
			title;

		let moreButton = (!this.state.showAll && options.length > INIT_SIZE) ?
			<button onClick={this.handleButtonClick.bind(this)}>
				{this.props.labels.showAll} ({options.length})
			</button> :
			null;

		return (
			<li
				className={cx(
					"hire-facet",
					"hire-list-facet",
					{"show-all": this.state.showAll}
				)}>
				<header>
					<h3>{facetTitle}</h3>
					{filterMenu}
					{sortMenu}
				</header>
				<ul >
					{listItems}
				</ul>
				{moreButton}
			</li>
		);
	}
}

ListFacet.defaultProps = {
	showFilterMenu: true,
	showSortMenu: false
};

ListFacet.propTypes = {
	data: React.PropTypes.object,
	labels: React.PropTypes.object,
	onSelectFacetValue: React.PropTypes.func,
	queries: React.PropTypes.object,
	showFilterMenu: React.PropTypes.bool,
	showSortMenu: React.PropTypes.bool
};

export default ListFacet;