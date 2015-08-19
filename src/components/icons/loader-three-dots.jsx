import React from "react";

let getNextState = function(prevState, ratio) {
	let state = Object.keys(prevState).reduce((obj, currentProp) => {
		let delta = prevState[currentProp].max - prevState[currentProp].min;

		let direction = prevState[currentProp].forward ?
			1:
			-1;

		let begin = prevState[currentProp].forward ?
			prevState[currentProp].min :
			prevState[currentProp].max;

		let current = begin + (delta * ratio * direction);


		let nextState = {
			current: current,
		}

		let forwardPassedEnd = (prevState[currentProp].forward && (nextState.current > prevState[currentProp].max));
		let backwardPassedBegin = (!prevState[currentProp].forward && (nextState.current < prevState[currentProp].min));

		if (forwardPassedEnd || backwardPassedBegin) {
			nextState.forward = !prevState[currentProp].forward
		}

		obj[currentProp] = {...prevState[currentProp], ...nextState}

		return obj;
	}, {});

	return state;
}

class LoaderThreeDots extends React.Component {
	constructor(props) {
		super(props);

		this.start = null;

		let radiusDefaults = {
			max: 12,
			forward: true,
			min: 9
		};

		let opacityDefaults = {
			forward: true,
			max: 1,
			min: 0.3
		};

		this.state = {
			circle1: {
				opacity: {...opacityDefaults, ...{
					current: 1,
					forward: false
				}},
				radius: {...radiusDefaults, ...{
					current: 15,
					forward: false
				}}
			},
			circle2: {
				opacity: {...opacityDefaults, ...{
					current: 0.3
				}},
				radius: {...radiusDefaults, ...{
					current: 9
				}}
			},
			circle3: {
				opacity: {...opacityDefaults, ...{
					current: 1,
					forward: false
				}},
				radius: {...radiusDefaults, ...{
					current: 15,
					forward: false
				}}
			}
		};
	}

	componentDidMount() {
		this.mounted = true;
		window.requestAnimationFrame(this.step.bind(this));
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	step(timestamp) {
		if (!this.mounted) {
			return;
		}

		if (this.start == null) {
			this.start = timestamp;
		}

		let progress = timestamp - this.start;
		let ratio = progress/800;

		this.setState({
			circle1: getNextState(this.state.circle1, ratio),
			circle2: getNextState(this.state.circle2, ratio),
			circle3: getNextState(this.state.circle3, ratio)
		})

		if (ratio > 1) {
			this.start = null
		}

		window.requestAnimationFrame(this.step.bind(this));
	}

	render() {
		return (
			<svg
				className={this.props.className}
				fill="#fff"
				height="30"
				viewBox="0 0 120 30"
				width="120">
				<circle
					cx="15"
					cy="15"
					r={this.state.circle1.radius.current}
					fillOpacity={this.state.circle1.opacity.current} />
				<circle
					cx="60"
					cy="15"
					r={this.state.circle2.radius.current}
					fillOpacity={this.state.circle2.opacity.current} />
				<circle
					cx="105"
					cy="15"
					r={this.state.circle3.radius.current}
					fillOpacity={this.state.circle3.opacity.current} />
			</svg>

		);
	}
}

LoaderThreeDots.PropTypes = {
	className: React.PropTypes.string
}

export default LoaderThreeDots;



