// let initialState = {
// 	queries: [],
// 	queryModel: {
// 		"facetValues": [],
// 		"searchInAnnotations": true,
// 		"searchInTranscriptions": true,
// 		"term": "",
// 		"textLayers": ["Diplomatic", "Opmerkingen en verwijzingen", "Comments and References", "Transcription", "Transcripción", "Transcriptie", "Vertaling", "Translation", "Traducción", "Comentarios y referencias"]
// 	}
// }

export default function(state={}, action) {
	switch (action.type) {
		case "SET_CONFIG_DEFAULTS":
			return {...state, ...action.config}
		default:
			return state;
	}
}