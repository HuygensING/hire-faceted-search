import Immutable from "immutable";

let emptyList = new Immutable.List();

export default new Immutable.Map({
	"@type": "wwperson",
	birthDate: "",
	deathDate: "",
	gender: "Unknown",
	links: emptyList,
	names: emptyList,
	types: emptyList,
	"@relations": new Immutable.Map({
		hasBirthPlace: emptyList,
		hasBiography: emptyList,
		hasDeathPlace: emptyList,
		hasEducation: emptyList,
		hasFinancialSituation: emptyList,
		hasMaritalStatus: emptyList,
		hasObituary: emptyList,
		hasProfession: emptyList,
		hasPseudonym: emptyList,
		hasReligion: emptyList,
		hasResidenceLocation: emptyList,
		hasSocialClass: emptyList,
		isCollaboratorOf: emptyList,
		isCreatorOf: emptyList,
		isDedicatedPersonOf: emptyList,
		isMemberOf: emptyList,
		isPersonAwarded: emptyList,
		isPersonCommentedOnIn: emptyList,
		isPersonListedOn: emptyList,
		isPersonMentionedIn: emptyList,
		isPersonQuotedIn: emptyList,
		isPersonReferencedIn: emptyList,
		isSpouseOf: emptyList,
		isParentOf: emptyList,
		isGrandparentOf: emptyList,
		isSiblingOf: emptyList,
		isRelatedTo: emptyList
	})
});