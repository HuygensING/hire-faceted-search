import React from "react";
import RangeSlider from "hire-range-slider";
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

		this.state = {
			...this.propsToState(this.props)
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState(this.propsToState(nextProps));
	}

	propsToState(props) {
		let queryValues = (props.queries.last.facetValues || []).filter(x => x.name === this.props.data.name)[0] || {};
		let lowerLimit = queryValues.lowerLimit || props.data.options[0].lowerLimit;
		let upperLimit = queryValues.upperLimit || props.data.options[0].upperLimit;
		return {
			lowerLimit: lowerLimit,
			upperLimit: upperLimit
		};
	}


	onRangeChange(range) {
		let lowerBound = this.props.data.options[0].lowerLimit;
		let upperBound = this.props.data.options[0].upperLimit;
		let realRange = upperBound - lowerBound;
		let newState = {
			lowerLimit: Math.floor(range.lowerLimit * realRange) + lowerBound,
			upperLimit: Math.floor(range.upperLimit * realRange) + lowerBound
		};
		if(range.refresh) {
			this.props.onSelectFacetRange(this.props.data.name, newState);
		} else {
			this.setState(newState);
		}
	}

	getPercentage(key) {
		let lowerBound = this.props.data.options[0].lowerLimit;
		let upperBound = this.props.data.options[0].upperLimit;
		let realRange = upperBound - lowerBound;

		let atRange = this.state[key] - lowerBound;
		return atRange / realRange;
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
					<RangeSlider lowerLimit={this.getPercentage("lowerLimit")} onChange={this.onRangeChange.bind(this)} upperLimit={this.getPercentage("upperLimit")} />
					<label>{Math.floor(this.state.lowerLimit * 0.0001)}</label>
					<label>{Math.floor(this.state.upperLimit * 0.0001)}</label>
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