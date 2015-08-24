import React from "react";

let getNextState = function(prevState, progress) {
	let state = Object.keys(prevState).reduce((obj, currentProp) => {
		let delta = prevState[currentProp].max - prevState[currentProp].min;
		let amplitude = delta / 2;

		let verticalTranslation = prevState[currentProp].min + amplitude
		let horizontalTranslation = ((prevState[currentProp].start - prevState[currentProp].min) / delta) * Math.PI;

		let period = ((2 * Math.PI) / 1400) * progress;

		let current = (amplitude * Math.sin(period - horizontalTranslation)) + verticalTranslation;

		let nextState = {
			current: current,
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
			max: 15,
			min: 9,
			start: 9
		};

		let opacityDefaults = {
			max: 1,
			min: 0.4,
			start: 0.4
		};

		this.state = {
			circle1: {
				opacity: opacityDefaults,
				radius: radiusDefaults
			},
			circle2: {
				opacity: {...opacityDefaults, ...{
					start: 0.6
				}},
				radius: {...radiusDefaults, ...{
					start: 11
				}}
			},
			circle3: {
				opacity: {...opacityDefaults, ...{
					start: 0.8
				}},
				radius: {...radiusDefaults, ...{
					start: 13
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

		this.setState({
			circle1: getNextState(this.state.circle1, progress),
			circle2: getNextState(this.state.circle2, progress),
			circle3: getNextState(this.state.circle3, progress)
		})

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



