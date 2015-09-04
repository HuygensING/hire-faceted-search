import React from "react";

class Result extends React.Component {
	toLabel(name) {
		return (this.props.labels.hasOwnProperty(name)) ?
			this.props.labels[name] :
			name;
	}

	render() {
		let model = this.props.data;
		let metadataList = this.props.metadataList;
		if(metadataList.length === 0) {
			metadataList = Object.keys(this.props.data.data);
		}
		let metadata = Object.keys(this.props.data.data)
			.filter((key) => this.props.data.data[key] !== "" && metadataList.indexOf(key) > -1)
			.sort((a, b) => metadataList.indexOf(a) > metadataList.indexOf(b))
			.map((key, index) =>
				<li key={index}>
					<label>{this.toLabel(key)}</label>
					<span>{this.props.data.data[key]}</span>
				</li>);

		metadata = (metadata.length) ?
			<ul className="metadata">{metadata}</ul> :
			null;

		return (
			<li onClick={this.props.onSelect.bind(this, model)}>
				<label>{this.props.data.displayName}</label>
				{metadata}
			</li>
		);
	}
}

Result.defaultProps = {
};

Result.propTypes = {
	data: React.PropTypes.object,
	labels: React.PropTypes.object,
	metadataList: React.PropTypes.array,
	onSelect: React.PropTypes.func
};

export default Result;

