import React from "react";
import {List, Map} from "immutable";
import cx from "classnames";

import queriesActions from "../../../actions/queries";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class ResultsSortMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			optionsVisible: false,
			level: this.props.values.first()
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			optionsVisible: false,
			level: nextProps.values.first()
		});
	}

	handleButtonClick() {
		this.setState({
			optionsVisible: !this.state.optionsVisible
		});
	}

	handleOptionClick(level, ev) {
		queriesActions.setSortParameter(ev.target.innerHTML);

		this.setState({
			optionsVisible: false,
			level: level
		});
	}

	render() {
		if (this.props.values.isEmpty()) {
			return null;
		}

		let values = this.props.values.map((level, index) =>
			<li
				key={index}
				onClick={this.handleOptionClick.bind(this, level)}>
				{level.get("fieldname")}
			</li>
		);

		return (
			<div className="hire-faceted-search-results-sort-menu">
				<button
					onClick={this.handleButtonClick.bind(this)}>
					Sort by: {this.state.level.get("fieldname")}
				</button>
				<ul
					className={cx({visible: this.state.optionsVisible})}>
					{values}
				</ul>
			</div>
		);
	}
}

ResultsSortMenu.defaultProps = {
	values: new List()
};

ResultsSortMenu.propTypes = {
	values: React.PropTypes.instanceOf(List)
};

export default ResultsSortMenu;