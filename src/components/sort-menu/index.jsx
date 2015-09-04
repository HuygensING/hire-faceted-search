/* TODO Remove sort menu and move sort options (count/alpha) to facet schema.
	A schema is needed, because different facets, should be able to have different
	options set. */

import React from "react";
import cx from "classnames";

import SortCountAscendingIcon from "../icons/sort-count-ascending";
import SortCountDescendingIcon from "../icons/sort-count-descending";
import SortAlphabeticallyAscendingIcon from "../icons/sort-alphabetically-ascending";
import SortAlphabeticallyDescendingIcon from "../icons/sort-alphabetically-descending";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class SortMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			alphabet: (props.type === "alphabet") ? props.direction : "ascending",
			count: (props.type === "count") ? props.direction : "descending",
			current: props.type
		};
	}

	/*
	 * Change the sort based on type (alphabet|count) clicked and current state.
	 *
	 * If the active sort type is clicked, the direction (ascending|descending) is changed.
	 * If the inactive sort type is clicked, the type (alphabet|count) is set to current, the dir (ascending|descending) does not change.
	 *
	 * @param {String} type Type of sorting: "alphabet" or "count"
	 */
	changeSort(type) {
		let direction = (this.state.current !== type) ?
			this.state[type] :
			(this.state[type] === "ascending") ?
				"descending" :
				"ascending";

		this.setState({
			current: type,
			[type]: direction
		});
		console.log(type, direction);
		this.props.onChange(type, direction);
	}

	render() {
		let alphabetIcon = (this.state.alphabet === "ascending") ?
			<SortAlphabeticallyAscendingIcon /> :
			<SortAlphabeticallyDescendingIcon />;

		let countIcon = (this.state.count === "ascending") ?
			<SortCountAscendingIcon /> :
			<SortCountDescendingIcon />;

		return (
			<ul className="hire-faceted-search-sort-menu">
				<li
					className={cx({
						active: this.state.current === "alphabet"
					})}
					onClick={this.changeSort.bind(this, "alphabet")}>
					{alphabetIcon}
				</li>
				<li
					className={cx({
						active: this.state.current === "count"
					})}
					onClick={this.changeSort.bind(this, "count")}>
					{countIcon}
				</li>
			</ul>
		);
	}
}

SortMenu.propTypes = {
	direction: React.PropTypes.oneOf(["ascending", "descending"]),
	onChange: React.PropTypes.func.isRequired,
	type: React.PropTypes.oneOf(["alphabet", "count"])
};

export default SortMenu;