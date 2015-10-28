import React from "react";

import CheckedIcon from "../icons/checked";
import UncheckedIcon from "../icons/unchecked";

class ListFacetListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checked: this.props.checked
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			checked: nextProps.checked
		});
	}

	handleClick() {
		this.props.onSelectFacetValue(this.props.facetName, this.props.name, this.props.checked);

		this.setState({
			checked: !this.state.checked
		});
	}

	getLabel() {
		return this.props.labels && this.props.labels[this.props.name] ?
			this.props.labels[this.props.name] : this.props.name;
	}

	render() {
		let icon = this.state.checked ?
			<CheckedIcon /> :
			<UncheckedIcon />;

		return (
			<li
				className="hire-list-facet-list-item"
				onClick={this.handleClick.bind(this)}>
				{icon}
				<label title={this.props.name}>{this.getLabel()}</label>
				<span className="count">{this.props.count}</span>
			</li>
		);
	}
}

ListFacetListItem.defaultProps = {
	count: 0,
	checked: false,
	facetName: "",
	name: ""
};

ListFacetListItem.propTypes = {
	checked: React.PropTypes.bool,
	count: React.PropTypes.number,
	facetName: React.PropTypes.string,
	labels: React.PropTypes.object,
	name: React.PropTypes.string,
	onSelectFacetValue: React.PropTypes.func
};

export default ListFacetListItem;


