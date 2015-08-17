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
		queriesActions.setSortParameter(level.get("fieldname"));

		this.setState({
			optionsVisible: false,
			level: level
		});
	}

	toI18n(name) {
		return (this.props.i18n.facetTitles.hasOwnProperty(name)) ?
			this.props.i18n.facetTitles[name] :
			name;
	}

	render() {
		if (this.props.values.isEmpty()) {
			return null;
		}

		let values = this.props.values.map((level, index) =>
			<li
				key={index}
				onClick={this.handleOptionClick.bind(this, level)}>
				{this.toI18n(level.get("fieldname"))}
			</li>
		);

		return (
			<div className="hire-faceted-search-results-sort-menu">
				<button
					onClick={this.handleButtonClick.bind(this)}>
					{this.props.i18n["Sort by"]}: {this.toI18n(this.state.level.get("fieldname"))}
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
	i18n: React.PropTypes.object,
	values: React.PropTypes.instanceOf(List)
};

export default ResultsSortMenu;