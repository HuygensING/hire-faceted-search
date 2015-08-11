// import xhr from "xhr";

// let baseUrl = "https://acc.repository.huygens.knaw.nl";

// let hasType = function(type) {
// 	return (relation) =>
// 		relation.sourceTypeName === type || relation.targetTypeName === type
// };

// xhr({
// 	url: `${baseUrl}/system/relationtypes`
// }, function(err, resp, body) {
// 	if (err) {
// 		console.error("Fetching relation types failed!", err, resp);
// 	}

// 	let toObject = function(prev, current) {
// 		prev[current.regularName] = current;
// 		prev[current.inverseName] = current;

// 		return prev;
// 	};

// 	let relations = JSON.parse(body);

// 	let authorRelations = relations.filter(hasType("person"));
// 	let authorPublicationRelations = authorRelations.filter(hasType("document"));
// 	let publicationRelations = relations.filter(hasType("document"));

// 	// console.log("relations", relations);
// 	console.log("authorRelations", authorRelations);
// 	console.log("authorPublicationRelations", authorPublicationRelations);
// 	console.log("publicationRelations", publicationRelations);
// });

let authorRelationMap = {
	hasBirthPlace: "wwlocations",
	hasBiography: "wwdocuments",
	hasDeathPlace: "wwlocations",
	hasEducation: "wwkeywords",
	hasFinancialSituation: "wwkeywords",
	hasMaritalStatus: "wwkeywords",
	hasPersonLanguage: "wwlanguages",
	hasProfession: "wwkeywords",
	hasPseudonym: "wwpersons",
	hasReligion: "wwkeywords",
	hasResidenceLocation: "wwlocations",
	hasSocialClass: "wwkeywords",
	isCollaboratorOf: "wwpersons",
	isCreatorOf: "wwdocuments",
	isMemberOf: "wwcollectives",
	isRelatedTo: "wwpersons",
	isSpouseOf: "wwpersons",
	isParentOf: "wwpersons",
	isGrandparentOf: "wwpersons",
	isSiblingOf: "wwpersons",
	isDedicatedPersonOf: "wwdocuments",
	isPersonAwarded: "wwdocuments",
	isPersonCommentedOnIn: "wwdocuments",
	isPersonListedOn: "wwdocuments",
	isPersonMentionedIn: "wwdocuments",
	isPersonQuotedIn: "wwdocuments",
	isPersonReferencedIn: "wwdocuments"
};

let publicationRelationMap = {
	commentsOnWork: "wwdocuments",
	containedInAnthology: "wwdocuments",
	hasGenre: "wwdocuments",
	hasPublishLocation: "wwdocuments",
	hasWorkLanguage: "wwdocuments",
	hasAdaptation: "wwdocuments",
	hasAnnotationsOn: "wwdocuments",
	hasBibliography: "wwdocuments",
	hasDocumentSource: "wwdocuments",
	hasEdition: "wwdocuments",
	hasSequel: "wwdocuments",
	hasTranslation: "wwdocuments",
	hasPlagiarismBy: "wwdocuments",
	hasPreface: "wwdocuments",
	isCreatedBy: "wwdocuments",
	isAnnotatedIn: "wwdocuments",
	isAdaptationOf: "wwdocuments",
	isAnthologyContaining: "wwdocuments",
	isAwardForWork: "wwdocuments",
	isBibliographyOf: "wwdocuments",
	isCensoredBy: "wwdocuments",
	isCensoringOf: "wwdocuments",
	isCopiedBy: "wwdocuments",
	isCopyOf: "wwdocuments",
	isEditionOf: "wwdocuments",
	isSequelOf: "wwdocuments",
	isPlagiarismOf: "wwdocuments",
	isWorkCommentedOnIn: "wwdocuments",
	isWorkAwarded: "wwdocuments",
	isPrefaceOf: "wwdocuments",
	isIntertextualOf: "wwdocuments",
	isIntertextualTo: "wwdocuments",
	isWorkListedOn: "wwdocuments",
	isWorkMentionedIn: "wwdocuments",
	isParodiedBy: "wwdocuments",
	isParodyOf: "wwdocuments",
	isWorkQuotedIn: "wwdocuments",
	isWorkReferencedIn: "wwdocuments",
	isDocumentSourceOf: "wwdocuments",
	isTranslationOf: "wwdocuments",
	mentionsWork: "wwdocuments",
	listsWork: "wwdocuments",
	quotesWork: "wwdocuments",
	referencesWork: "wwdocuments"
};

export default Object.assign(authorRelationMap, publicationRelationMap);