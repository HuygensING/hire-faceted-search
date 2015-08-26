# Hire Faceted Search

A faceted search React component.


```javascript
import FacetedSearch from "hire-faceted-search";

// Basic search configuration
let searchConfig = {
    // Base URL
    baseURL: "http://(...)/v2",
    // API path
    searchPath: "search/path",
    // Sort levels
    levels: ["dynamic_sort_creator", "dynamic_sort_title"],
    // Provide a VRE ID for headers
    headers: {VRE_ID: "VreId"}
};

// Labels for human presentation
let labels = {
	facetTitles: {
		"dynamic_s_creator": "Author",
		"dynamic_sort_creator": "Author",
		"dynamic_sort_title": "Title",
		"dynamic_s_origin": "Country of first publication",
		"dynamic_s_genre": "Genre",
		"dynamic_s_language": "Language",
		"createdBy": "Author",
		"language": "Language",
		"publishLocation": "Country of first publication",
		"date": "Date"
	}
};

// Controlled list of facet filters (default = all)
let facetList = ["dynamic_s_creator", "dynamic_s_origin", "dynamic_s_language", "dynamic_s_genre"];

// Metadata fields to be presented with result (default = all)
let metadataList = ["createdBy", "publishLocation", "language", "date"];


React.render(<FacetedSearch 
	config={searchConfig} 
	facetList={facetList}
	labels={labels}
	metadataList={metadataList}
	onChange={function(data) {console.log(data)}}
	onSelect={this.gotodoc.bind(this)}
	 />, document.body);
```