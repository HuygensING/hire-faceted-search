// TODO cap at 50 results if results > 200

import React from "react";
import Immutable from "immutable";

import SortMenu from "../sort-menu";
import FilterMenu from "../filter-menu";
import ListItem from "./list-item";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class ListFacet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentSort: SortMenu.sortFunctions[SortMenu.defaultSort],
			filterQuery: ""
		}
	}

	handleSortMenuChange(funcName) {
		this.setState({
			currentSort: SortMenu.sortFunctions[funcName]
		});
	}

	handleFilterMenuChange(filterQuery) {
		this.setState({
			filterQuery: filterQuery
		})
	}

	render() {
		let filterMenu, sortMenu;
		let options = this.props.data.get("options");

		options = options.sort(this.state.currentSort);

		if (this.props.sortMenu) {
			sortMenu = <SortMenu onChange={this.handleSortMenuChange.bind(this)} />;
		}

		if (this.props.filterMenu) {
			filterMenu = <FilterMenu onChange={this.handleFilterMenuChange.bind(this)} />;

			if (this.state.filterQuery.length) {
				let query = this.state.filterQuery.toLowerCase();

				options = options.filter((option) =>
					option.get("name").toLowerCase().indexOf(query) > -1
				);
			}
		}

		let listItems = options.map((option, index) =>
			<ListItem
				count={option.get("count")}
				checked={this.props.selectedValues.contains(option.get("name"))}
				facetName={this.props.data.get("name")}
				key={index}
				name={option.get("name")} />);

		if (!listItems.size) {
			listItems = <li className="no-options-found">No options found.</li>
		}

		let title = this.props.data.get("title");
		let facetTitle = this.props.i18n.facetTitles.hasOwnProperty(title) ?
			this.props.i18n.facetTitles[title] :
			title;

		return (
			<li className="hire-facet hire-list-facet">
				<header>
					<h3>{facetTitle}</h3>
					{filterMenu}
					{sortMenu}
				</header>
				<ul>
					{listItems}
				</ul>
			</li>
		);
	}
}

ListFacet.defaultProps = {
	filterMenu: true,
	selectedValues: new Immutable.List(),
	sortMenu: false
};

ListFacet.propTypes = {
	data: React.PropTypes.instanceOf(Immutable.Map),
	filterMenu: React.PropTypes.bool,
	selectedValues: React.PropTypes.instanceOf(Immutable.List),
	sortMenu: React.PropTypes.bool
};

export default ListFacet;