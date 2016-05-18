import React from "react";


class LabelInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			stateValue: null,
			editing: false
		};
	}

	onLabelClick() {
		this.setState({stateValue: this.props.value, editing: true});
	}

	onInputChange(ev) {
		this.setState({stateValue: ev.target.value});
	}

	onInputKeyPress(ev) {
		if (ev.key === "Enter") {
			this.props.onChange(this.state.stateValue);
			this.setState({stateValue: null, editing: false});
		}
	}

	render() {
		const { value } = this.props;
		const { stateValue, editing } = this.state;

		const label = editing ? null : <label onClick={this.onLabelClick.bind(this)}>{value}</label>;
		const input = editing ? (<label>
				<input
					onChange={this.onInputChange.bind(this)}
					onKeyPress={this.onInputKeyPress.bind(this)}
					type="number"
					value={stateValue}
				/>
			</label>) : null;
		return (input || label);
	}
}

LabelInput.propTypes = {
	onChange: React.PropTypes.func,
	value: React.PropTypes.number
};

export default LabelInput;