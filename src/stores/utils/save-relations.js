import xhr from "xhr";
import relationsStore from "../relations";
import userStore from "../user";

let relationUrl = "https://acc.repository.huygens.knaw.nl/domain/wwrelations";

let toXhrPromise = function(data) {
	return new Promise(
		function (resolve, reject) {
			let options = {
				body: JSON.stringify(data),
				headers: {
					Authorization: userStore.getState().user.get("token"),
					"Content-Type": "application/json",
					VRE_ID: "WomenWriters"
				},
				method: "POST",
				url: relationUrl
			};

			let done = function(err, resp, body) {
				if (err) {
					reject(err);
				} else {
					resolve(body);
				}
			};

			xhr(options, done);
		}
	);
};

let toObject = (prev, current) => {
	prev[current.regularName] = current;
	prev[current.inverseName] = current;

	return prev;
};

let toRelationObject = (relationName, relationType, sourceId, accepted) =>
	(id) => {
		id = id.substr(id.lastIndexOf("/") + 1);
		[sourceId, id] = (relationType.regularName === relationName) ?
			[sourceId, id] :
			[id, sourceId];

		return {
			"accepted": accepted,
			"@type": "wwrelation",
			"^typeId": relationType._id,
			"^sourceId": sourceId,
			"^sourceType": relationType.sourceTypeName,
			"^targetId": id,
			"^targetType": relationType.targetTypeName
		};
	};

let toRelationObjects = (relationsToSave, sourceId, accepted=true) =>
	(arr, relationName) => {
		let ids = relationsToSave[relationName];
		let relationTypes = relationsStore.getState().relations.reduce(toObject, {});
		let relationType = relationTypes[relationName];
		let relationObjects = ids.map(toRelationObject(relationName, relationType, sourceId, accepted));

		return arr.concat(relationObjects);
	};


/*
 * Reduce to an object with relation keys found in currentRelations, but not
 * in prevRelations. To find the removed relations, the parameters are flipped.
 *
 * @param {Array} prevRelations The relations received from the server, before editing.
 * @param {Array} currentRelations The edited relations, before being persisted to the server.
 * @returns {Function} Returns a reduce function with prevRelations and currentRelations in scope.
 */
let toFoundInCurrent = function(prevRelations, currentRelations) {
	return (obj, relationName) => {
		let found = currentRelations[relationName]
			.filter((relation) =>
				prevRelations[relationName].filter((prevRelation) =>
					prevRelation.key === relation.key
				).length === 0
			);

		if (found.length) {
			obj[relationName] = found.map((f) => f.key);
		}
		return obj;
	};
};

export default function(currentRelations, serverRelations, sourceId) {
	let relationNames = Object.keys(currentRelations);

	let added = relationNames
		.reduce(toFoundInCurrent(serverRelations, currentRelations), {});

	let removed = relationNames
		.reduce(toFoundInCurrent(currentRelations, serverRelations), {});

	added = Object.keys(added).reduce(toRelationObjects(added, sourceId), []);
	removed = Object.keys(removed).reduce(toRelationObjects(removed, sourceId, false), []);

	let promisedRelations = added.concat(removed).map(toXhrPromise);
	Promise.all(promisedRelations).then((response) => {
		console.log(response);
	});
}