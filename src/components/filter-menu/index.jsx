import React from "react";
import cx from "classnames";

import Input from "hire-forms-input";
import FilterIcon from "../icons/filter";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class FilterMenu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: false,
			value: ""
		}
	}

	handleInputChange(value, ev) {
		this.setState({
			value: value
		});

		this.props.onChange(value);
	}

	handleInputBlur() {
		this.setState({
			active: false,
			value: ""
		});
	}

	handleInputFocus() {
		this.setState({
			active: true
		});
	}

	render() {
		return (
			<div className={cx(
				"hire-faceted-search-filter-menu",
				{active: this.state.active})}>
				<Input
					onBlur={this.handleInputBlur.bind(this)}
					onChange={this.handleInputChange.bind(this)}
					onFocus={this.handleInputFocus.bind(this)}
					value={this.state.value} />
				<FilterIcon />
			</div>
		);
	}
}

FilterMenu.defaultProps = {

};

FilterMenu.propTypes = {
	onChange: React.PropTypes.func.isRequired
};

export default FilterMenu;