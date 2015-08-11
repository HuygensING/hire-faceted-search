import React from "react";
import queriesActions from "../actions/queries";

class ListFacet extends React.Component {
	handleClick(value) {
		queriesActions.add(this.props.data.get("name"), value);
	}

	render() {
		let options = this.props.data.get("options");
		let sortedOptions = options.sortBy(opt => -1 * opt.get("count"));
		let listItems = sortedOptions.map((option, index) =>
			<li
				key={index}
				onClick={this.handleClick.bind(this, option.get("name"))}>
				<label>{option.get("name")}</label>
				<span className="count">{option.get("count")}</span>
			</li>);

		return (
			<li className="hire-facet hire-list-facet">
				<h3>{this.props.data.get("title")}</h3>
				<ul>
					{listItems}
				</ul>
			</li>
		);
	}
}

ListFacet.defaultProps = {

};

ListFacet.propTypes = {

};

export default ListFacet;