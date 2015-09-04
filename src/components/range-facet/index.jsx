import React from "react";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

const MOUSE_DOWN = 0;
const MOUSE_UP = 1;

React.initializeTouchEvents(true);

class RangeFacet extends React.Component {
	constructor(props) {
		super(props);

		this.mouseState = MOUSE_UP;
		this.mouseUpListener = this.onMouseUp.bind(this);
		this.mouseMoveListener = this.onMouseMove.bind(this);
		this.touchMoveListener = this.onTouchMove.bind(this);

		this.state = {
			...this.propsToState(this.props),
			...{hoverState: null}
		};
	}

	componentDidMount() {
		window.addEventListener("mouseup", this.mouseUpListener);
		window.addEventListener("mousemove", this.mouseMoveListener);
		window.addEventListener("touchend", this.mouseUpListener);
		window.addEventListener("touchmove", this.touchMoveListener);
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.propsToState(nextProps));
	}

	componentWillUnmount() {
		window.removeEventListener("mouseup", this.mouseUpListener);
		window.removeEventListener("mousemove", this.mouseMoveListener);
		window.removeEventListener("touchend", this.mouseUpListener);
		window.removeEventListener("touchmove", this.touchMoveListener);
	}



	propsToState(props) {
		let queryValues = (props.queries.last.facetValues || []).filter(x => x.name === this.props.data.name)[0] || {};
		let lowerLimit = queryValues.lowerLimit || props.data.options[0].lowerLimit;
		let upperLimit = queryValues.upperLimit || props.data.options[0].upperLimit;
		return {
			lowerLimit: lowerLimit,
			upperLimit: upperLimit,
			lowerBound: props.data.options[0].lowerLimit,
			upperBound: props.data.options[0].upperLimit
		};
	}

	convertUnit(value, mul) {
		return Math.floor(value * mul);
	}

	getPositionForLimit(pageX) {
		let rect = React.findDOMNode(this).children[1].children[0].getBoundingClientRect();
		if(rect.width > 0) {
			let percentage = (pageX - rect.left) / rect.width;
			let onScale = Math.floor((this.state.upperBound - this.state.lowerBound) * percentage) + this.state.lowerBound;
			if(onScale > this.state.upperBound) {
				onScale = this.state.upperBound;
			} else if(onScale < this.state.lowerBound) {
				onScale = this.state.lowerBound;
			}
			let deltaL = Math.max(onScale - this.state.lowerLimit, this.state.lowerLimit - onScale);
			let deltaU = Math.max(onScale - this.state.upperLimit, this.state.upperLimit - onScale);
			if(deltaL < deltaU) {
				if(onScale >= this.state.upperLimit) { onScale = this.state.upperLimit; }
				return {lowerLimit: onScale};
			} else {
				if(onScale <= this.state.lowerLimit) { onScale = this.state.lowerLimit; }
				return {upperLimit: onScale};
			}
		}
		return null;
	}

	setRange(pageX) {
		let posForLim = this.getPositionForLimit(pageX);
		if(posForLim !== null) {
			this.setState(posForLim);
		}
	}

	onMouseDown(ev) {
		this.mouseState = MOUSE_DOWN;
		this.setRange(ev.pageX);
	}

	onTouchStart(ev) {
		this.mouseState = MOUSE_DOWN;
		this.setRange(ev.touches[0].pageX);
		return ev.preventDefault();
	}

	onMouseMove(ev) {
		if(this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.pageX);
			return ev.preventDefault();
		} else if(React.findDOMNode(this).children[1].children[0].contains(ev.target)) {
			this.setState({
				hoverState: this.getPositionForLimit(ev.pageX)
			});
		} else {
			this.setState({hoverState: null});
		}
	}

	onTouchMove(ev) {
		if(this.mouseState === MOUSE_DOWN) {
			this.setRange(ev.touches[0].pageX);
			return ev.preventDefault();
		}
	}

	onMouseUp() {
		if(this.mouseState === MOUSE_DOWN) {
			this.props.onSelectFacetRange(this.props.data.name, {
				lowerLimit: Math.floor(this.state.lowerLimit / 10000) * 10000 + 101,
				upperLimit: Math.floor(this.state.upperLimit / 10000) * 10000 + 3112
			});
		}
		this.mouseState = MOUSE_UP;
	}

	getRangePath() {
		let lower = (this.state.lowerLimit - this.state.lowerBound) / (this.state.upperBound - this.state.lowerBound);
		let upper = (this.state.upperLimit - this.state.lowerBound) / (this.state.upperBound - this.state.lowerBound);
		return "M" + (lower * 400) + " 10 L " + (upper * 400) + " 10 Z";
	}

	getRangeCircle(key) {
		let percentage = (this.state[key] - this.state.lowerBound) / (this.state.upperBound - this.state.lowerBound);
		return (
			<circle className={this.state.hoverState && this.state.hoverState[key] ? "hovering" : ""} cx={percentage * 400} cy="10" r="4" />
		);
	}

	render() {
		let title = this.props.data.name;
		let facetTitle = this.props.labels.facetTitles.hasOwnProperty(title) ?
			this.props.labels.facetTitles[title] :
			title;

		return (
			<li className="hire-facet hire-range-facet">
				<header>
					<h3>{facetTitle}</h3>
				</header>
				<div>
					<svg
						onMouseDown={this.onMouseDown.bind(this)}
						onTouchStart={this.onTouchStart.bind(this)}
						viewBox="0 0 400 20">
						<g className="range-line">
							<path d={this.getRangePath()} fill="transparent" />
							{this.getRangeCircle("lowerLimit")}
							{this.getRangeCircle("upperLimit")}
						</g>

						<path d="M0 0 L 0 20 Z" fill="transparent" />
						<path d="M400 0 L 400 20 Z" fill="transparent" />
						<path d="M0 10 L 400 10 Z" fill="transparent" />
					</svg>
					<label>{this.convertUnit(this.state.lowerLimit, 0.0001)}</label>
					<label>{this.convertUnit(this.state.upperLimit, 0.0001)}</label>
				</div>
			</li>
		);
	}
}

RangeFacet.propTypes = {
	data: React.PropTypes.object,
	labels: React.PropTypes.object,
	onSelectFacetRange: React.PropTypes.func,
	queries: React.PropTypes.object
};


export default RangeFacet;