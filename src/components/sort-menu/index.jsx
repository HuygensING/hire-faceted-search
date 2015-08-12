import React from "react";
import cx from "classnames";

import FilterIcon from "../icons/filter";
import SortCountAscendingIcon from "../icons/sort-count-ascending";
import SortCountDescendingIcon from "../icons/sort-count-descending";
import SortAlphabeticallyAscendingIcon from "../icons/sort-alphabetically-ascending";
import SortAlphabeticallyDescendingIcon from "../icons/sort-alphabetically-descending";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css);

class SortMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alpha: "asc",
			count: "desc",
			current: "count"
		}
	}

	/*
	 * Change the sort based on type (alpha|count) clicked and current state.
	 *
	 * If the active sort type is clicked, the direction (asc|desc) is changed.
	 * If the inactive sort type is clicked, the type (alpha|count) is set to current, the dir (asc|desc) does not change.
	 *
	 * @param {String} type Type of sorting: "alpha" or "count"
	 */
	changeSort(type) {
		let dir = (this.state.current != type) ?
			this.state[type].charAt(0).toUpperCase() + this.state[type].substr(1) :
			(this.state[type] === "asc") ?
				"Desc":
				"Asc";

		this.setState({
			current: type,
			[type]: dir.toLowerCase()
		})

		this.props.onChange(type + dir);
	}

	render() {
		let alpha = (this.state.alpha === "asc") ?
			<SortAlphabeticallyAscendingIcon /> :
			<SortAlphabeticallyDescendingIcon />;

		let count = (this.state.count === "asc") ?
			<SortCountAscendingIcon /> :
			<SortCountDescendingIcon />;

		return (
			<ul className="hire-faceted-search-sort-menu">
				<li>
					<FilterIcon />
				</li>
				<li
					className={cx({
						active: this.state.current === "alpha"
					})}
					onClick={this.changeSort.bind(this, "alpha")}>
					{alpha}
				</li>
				<li
					className={cx({
						active: this.state.current === "count"
					})}
					onClick={this.changeSort.bind(this, "count")}>
					{count}
				</li>
			</ul>
		);
	}
}

SortMenu.defaultProps = {

};

SortMenu.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default SortMenu;