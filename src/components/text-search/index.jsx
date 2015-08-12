// TODO add searching class to .search-icon when async query is busy

import React from "react";
import cx from "classnames";

import queriesActions from "../../actions/queries";

import SearchIcon from "../icons/search";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css);

class TextSearch extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ""
		}
	}

	handleInputChange(ev) {
		this.setState({
			value: ev.target.value
		})
	}

	handleInputKeyDown(ev) {
		if (ev.keyCode === 13) {
			this.handleSubmit();
		}
	}

	handleSubmit() {
		queriesActions.changeSearchTerm(this.state.value);
	}

	render() {
		return (
			<div className="hire-faceted-search-text-search">
				<input
					onKeyDown={this.handleInputKeyDown.bind(this)}
					onChange={this.handleInputChange.bind(this)}
					value={this.state.value} />
				<div className={cx(
					"search-icon", {
						active: this.state.value !== ""
					})}
						onClick={this.handleSubmit.bind(this)}>
						<div className="center-vertical">
							<SearchIcon />
						</div>
				</div>
			</div>
		);
	}
}

TextSearch.defaultProps = {

};

TextSearch.propTypes = {

};

export default TextSearch;