import React from "react";

class Result extends React.Component {
	render() {
		let model = this.props.data;

		let metadata = model.get("metadata").entrySeq().map((keyValuePair, index) =>
			<li key={index}>
				<label>{keyValuePair[0]}</label>
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

