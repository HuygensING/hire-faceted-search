import relationMap from "../utils/relation-map";

let iterateObjectKeys = function(obj, parser) {
	let isObject = function(o) {
		return o !== null && !Array.isArray(o) && typeof o === "object";
	};

	Object.keys(obj).forEach((key) => {
		let value = obj[key];

		if (Array.isArray(value)) {
			if (value.length && isObject(value[0])) {
				value.forEach((nestedObject) =>
					iterateObjectKeys(nestedObject, parser)
				);
			}
		} else if (isObject(value)) {
			iterateObjectKeys(value, parser);
		}

		parser(key, value, obj);
	});
};

// let relationMap = {
// 	hasBirthPlace: "wwlocations",
// 	hasDeathPlace: "wwlocations",
// 	hasEducation: "wwkeywords",
// 	hasFinancialSituation: "wwkeywords",
// 	hasMaritalStatus: "wwkeywords",
// 	isCollaboratorOf: "wwpersons",
// 	isCreatorOf: "wwdocuments",
// 	isMemberOf: "wwcollectives",
// 	isSpouseOf: "wwpersons",
// 	hasProfession: "wwkeywords",
// 	hasPseudonym: "wwpersons",
// 	hasReligion: "wwkeywords",
// 	hasResidenceLocation: "wwlocations",
// 	hasSocialClass: "wwkeywords"
// };

let inComingParser = function(key, value, obj) {
	if (key === "names") {
		obj[key] = value.map((names) => {
			return {
				firstName: names.components[0].value,
				lastName: names.components[1].value
			};
		});
	}

	if (key === "types") {
		obj[key] = value.map((v) =>
			v.charAt(0) + v.substr(1).toLowerCase());
	}

	if ((key === "gender") || (key === "children")) {
		obj[key] = value.charAt(0) + value.substr(1).toLowerCase();
	}

	if (relationMap.hasOwnProperty(key)) {
		obj[key] = value
			.filter((v) => v.accepted)
			.map((v) => {
				return {
					key: `https://acc.repository.huygens.knaw.nl/domain/${relationMap[key]}/${v.id}`,
					value: v.displayName
				};
			});
	}
};

let outGoingParser = function(key, value, obj) {
	if (key.substr(0, 4) === "temp") {
		delete obj[key];
	}

	if (key === "types") {
		obj[key] = value.map((v) =>
			v.toUpperCase());
	}

	if ((key === "gender") || (key === "children")) {
		obj[key] = value.toUpperCase();
	}

	if (key === "names") {
		obj[key] = value.map((names) => {
			return {
				components: [{
						type: "FORENAME",
						value: names.firstName
					}, {
						type: "SURNAME",
						value: names.lastName
					}
				]
			};
		});
	}

	if (key === "persontype") {
		delete obj[key];
	}
};

export let parseIncomingAuthor = function(data) {
	iterateObjectKeys(data, inComingParser);

	return data;
};

export let parseOutgoingAuthor = function(data) {
	iterateObjectKeys(data, outGoingParser);

	return data;
};