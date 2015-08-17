import React from "react";

class Result extends React.Component {
	toI18n(name) {
		return (this.props.i18n.facetTitles.hasOwnProperty(name)) ?
			this.props.i18n.facetTitles[name] :
			name;
	}

	render() {
		let model = this.props.data;

		let metadata = model.get("metadata").entrySeq().map((keyValuePair, index) =>
			<li key={index}>
				<label>{this.toI18n(keyValuePair[0])}</label>
				<span>{keyValuePair[1]}</span>
			</li>
		)

		metadata = (metadata.size) ?
			<ul className="metadata">{metadata}</ul> :
			null;

		return (
			<li onClick={this.props.onSelect.bind(this, model)}>
				<label>{model.get("name")}</label>
				{metadata}
			</li>
		);
	}
}

Result.defaultProps = {

};

Result.propTypes = {

};

export default Result;

