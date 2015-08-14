import React from "react";
import cx from "classnames";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/sortable-list.css");
insertCss(css, {prepend: true});

class SortableList extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			draggingValue: null,
			draggingTop: null,
			values: this.props.values
		};
	}

	handleDragStart(ev) {
		let offset = ev.clientY - ev.target.getBoundingClientRect().top;

		this.setState({
			draggingValue: ev.target.innerHTML,
			draggingTop: ev.clientY - offset
		});
	}

	handleDrag(ev) {
		if (this.state.draggingValue == null) {
			return;
		}

		let node = React.findDOMNode(this);
		let ulRect = node.querySelector("ul").getBoundingClientRect()
		let liHeight = ulRect.height/this.state.values.length;

		let draggingIndex = this.state.values.indexOf(this.state.draggingValue);
		let reduced = this.state.values.reduce((prev, current, index, arr) => {
			if

			return arr;
		}, []);


		// let data = liRects.map((liRect, index) => {
		// 	return {
		// 		height: liRect.height,
		// 		index: index,
		// 		top: (this.state.draggingValue === index) ? ev.clientY : liRect.top,
		// 		html: this.state.values[index]
		// 	}

		// });

		// let reduced = data.reduce((prev, current, index) => {
		// 	if (index === 0) {
		// 		prev.push(current);
		// 	} else {
		// 		let last = prev[index - 1];

		// 		if (last.top + last.height > current.top) {
		// 			prev[index - 1] = current;
		// 			prev[index] = last;
		// 		} else {
		// 			prev.push(current);
		// 		}
		// 	}

		// 	return prev;
		// }, []);

		if (ev.clientY > ulRect.top && ev.clientY < (ulRect.bottom - liHeight)) {
			console.log(reduced);
			this.setState({
				draggingTop: ev.clientY,
				values: reduced
			});
		}

	}

	handleDragEnd(ev) {
		this.setState({
			draggingValue: null,
			draggingTop: null
		});
	}

	render() {
		let buttonString = (this.state.values.length) ?
			"Sort by: " + this.state.values[0] :
			"Sort";

		let listitems = this.state.values.map((level, index) =>
			<li
				className={cx({dragging: (this.state.draggingValue === level)})}
				key={index}
				onMouseMove={this.handleDrag.bind(this)}
				onMouseUp={this.handleDragEnd.bind(this)}
				onMouseDown={this.handleDragStart.bind(this)}>
				{level}
			</li>
		);

		let fakeLi = (this.state.draggingValue != null) ?
			<div
				className="fakeLi"
				ref="fakeLi"
				style={{top: this.state.draggingTop}}>
				{this.state.draggingValue}
			</div> :
			null;

		return (
			<div className="hire-sortable-list">
				{fakeLi}
				<ul>
					{listitems}
				</ul>
			</div>
		);
	}
}

SortableList.defaultProps = {
	values: []
};

SortableList.propTypes = {
	values: React.PropTypes.array
};
export default SortableList;