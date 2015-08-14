import React from "react";

// TODO pass as prop
import queriesStore from "../../stores/queries";

class Result extends React.Component {
	render() {
		let model = this.props.data;

		let metadata = queriesStore.getState().get("resultFields").map((field, index) =>
			<li key={index}>
				<label>{field}</label>
				<span>{model.get("metadata").get(field)}</span>
			</li>
		)

		metadata = (metadata.length) ?
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

