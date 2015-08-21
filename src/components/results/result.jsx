import React from "react";

class Result extends React.Component {
	toLabel(name) {
		return (this.props.labels.facetTitles.hasOwnProperty(name)) ?
			this.props.labels.facetTitles[name] :
			name;
	}

	render() {
		let model = this.props.data;

		let metadata = Object.keys(this.props.data.metadata).map((key, index) =>
			<li key={index}>
				<label>{this.toLabel(key)}</label>
				<span>{this.props.data.metadata[key]}</span>
			</li>);

		metadata = (metadata.length) ?
			<ul className="metadata">{metadata}</ul> :
			null;

		return (
			<li onClick={this.props.onSelect.bind(this, model)}>
				<label>{this.props.data.name}</label>
				{metadata}
			</li>
		);
	}
}

Result.defaultProps = {

};

Result.propTypes = {
	labels: React.PropTypes.object
};

export default Result;

