import React from "react";
import cx from "classnames";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

class ResultsSortMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			draggingIndex: null,
			draggingTop: null,
			levels: this.props.sortLevels
		};
	}

	handleDragStart(ev) {
		this.setState({
			draggingIndex: this.state.levels.indexOf(ev.target.innerHTML),
			draggingTop: ev.clientY
		});
	}

	handleDrag(ev) {
		let node = React.findDOMNode(this);
		let ulRect = node.querySelector("ul").getBoundingClientRect()
		let liRects = Array.prototype.slice.call(node.querySelectorAll("li")).map((li) =>
			li.getBoundingClientRect()
		)

		let liHeight = liRects[0].height;

		let data = liRects.map((liRect, index) => {
			return {
				height: liRect.height,
				index: index,
				top: (this.state.draggingIndex === index) ? ev.clientY : liRect.top,
				html: this.state.levels[index]
			}

		});

		let reduced = data.reduce((prev, current, index) => {
			if (index === 0) {
				prev.push(current);
			} else {
				let last = prev[index - 1];

				if (last.top + last.height > current.top) {
					prev[index - 1] = current;
					prev[index] = last;
				} else {
					prev.push(current);
				}
			}

			return prev;
		}, []);

		if (ev.clientY > ulRect.top && ev.clientY < (ulRect.bottom - liHeight)) {
			this.setState({
				draggingTop: ev.clientY,
				levels: reduced.map((r) => r.html)
			});
		}

	}

	handleDragEnd(ev) {
		this.setState({
			draggingIndex: null,
			draggingTop: null
		});
	}

	render() {
		let buttonString = (this.state.levels.length) ?
			"Sort by: " + this.state.levels[0] :
			"Sort";

		let sortLevels = this.state.levels.map((level, index) =>
			<li
				className={cx({dragging: (this.state.draggingIndex === index)})}
				draggable="true"
				key={index}
				onDrag={this.handleDrag.bind(this)}
				onDragEnd={this.handleDragEnd.bind(this)}
				onDragStart={this.handleDragStart.bind(this)}>
				{level}
			</li>
		);

		let fakeLi = (this.state.draggingIndex != null) ?
			<div
				className="fakeLi"
				ref="fakeLi"
				style={{top: this.state.draggingTop}}>
				{this.state.levels[this.state.draggingIndex]}
			</div> :
			null;

		return (
			<div className="hire-faceted-search-results-sort-menu">
				<button>{buttonString}</button>
				{fakeLi}
				<ul>
					{sortLevels}
				</ul>
			</div>
		);
	}
}

ResultsSortMenu.defaultProps = {
	sortLevels: []
};

ResultsSortMenu.propTypes = {
	sortLevels: React.PropTypes.array
};
export default ResultsSortMenu;