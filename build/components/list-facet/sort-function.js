"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = sortFunction;
var sortFunctions = {
	alphabetAscending: function alphabetAscending(valA, valB) {
		if (valA.name > valB.name) {
			return 1;
		}
		if (valB.name > valA.name) {
			return -1;
		}
		return 0;
	},
	alphabetDescending: function alphabetDescending(valA, valB) {
		if (valA.name > valB.name) {
			return -1;
		}
		if (valB.name > valA.name) {
			return 1;
		}
		return 0;
	},
	countAscending: function countAscending(valA, valB) {
		if (valA.count > valB.count) {
			return 1;
		}
		if (valB.count > valA.count) {
			return -1;
		}
		return 0;
	},
	countDescending: function countDescending(valA, valB) {
		if (valA.count > valB.count) {
			return -1;
		}
		if (valB.count > valA.count) {
			return 1;
		}
		return 0;
	}
};

function sortFunction(type, direction) {
	if (["count", "alphabet"].indexOf(type) === -1) {
		console.error("Unknown sort type: ", type);
	}

	if (["ascending", "descending"].indexOf(direction) === -1) {
		console.error("Unknown sort direction: ", direction);
	}

	var functionName = type + direction.charAt(0).toUpperCase() + direction.substr(1);
	return sortFunctions[functionName];
}