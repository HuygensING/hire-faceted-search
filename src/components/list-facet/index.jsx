import React from "react";
import Immutable from "immutable";

import SortMenu from "../sort-menu";
import ListItem from "./list-item";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css);

let sortFunctions = {
	alphaAsc: (valA, valB) => {
		if (valA.get("name") > valB.get("name")) return 1;
		if (valB.get("name") > valA.get("name")) return -1;
		return 0;
	},
	alphaDesc: (valA, valB) => {
		if (valA.get("name") > valB.get("name")) return -1;
		if (valB.get("name") > valA.get("name")) return 1;
		return 0;
	},
	countAsc: (valA, valB) => {
		if (valA.get("count") > valB.get("count")) return 1;
		if (valB.get("count") > valA.get("count")) return -1;
		return 0;
	},
	countDesc: (valA, valB) => {
		if (valA.get("count") > valB.get("count")) return -1;
		if (valB.get("count") > valA.get("count")) return 1;
		return 0;
	}
};

class ListFacet extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			currentSort: sortFunctions.countDesc
		}
	}

	handleSortMenuChange(funcName) {
		this.setState({
			currentSort: sortFunctions[funcName]
		});
	}

	render() {
		let options = this.props.data.get("options");
		let sortedOptions = options.sort(this.state.currentSort);
		let listItems = sortedOptions.map((option, index) =>
			<ListItem
				count={option.get("count")}
				checked={this.props.selectedValues.contains(option.get("name"))}
				facetName={this.props.data.get("name")}
				key={index}
				name={option.get("name")} />);

		return (
			<li className="hire-facet hire-list-facet">
				<header>
					<h3>{this.props.data.get("title")}</h3>
					<SortMenu onChange={this.handleSortMenuChange.bind(this)} />
				</header>
				<ul>
					{listItems}
				</ul>
			</li>
		);
	}
}

ListFacet.defaultProps = {
	selectedValues: new Immutable.List()
};

ListFacet.propTypes = {
	data: React.PropTypes.instanceOf(Immutable.Map),
	selectedValues: React.PropTypes.instanceOf(Immutable.List)
};

export default ListFacet;