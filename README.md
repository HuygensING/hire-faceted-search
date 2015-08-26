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

## Config for persons
```javascript
let facetList = [
	"dynamic_s_gender",
	"dynamic_s_residence",
	"dynamic_s_language",
	"dynamic_s_birthDate",
	"dynamic_s_birthplace",
	"dynamic_s_deathDate",
	"dynamic_s_deathplace",
	"dynamic_s_religion",
	"dynamic_s_collective"
];

let metadataList = ["name", "birthDate", "deathDate", "residenceLocation"];

let labels = {
	facetTitles: {
		"dynamic_s_deathplace": "Place of Death",
		"dynamic_s_birthplace": "Place of birth",
		"dynamic_s_gender": "Gender",
		"dynamic_s_residence": "Country of residence",
		"dynamic_s_relatedLocations": "Related country",
		"dynamic_s_religion": "Religion",
		"dynamic_s_language": "Language",
		"dynamic_s_deathDate": "Year of Death",
		"dynamic_s_birthDate": "Year of birth",
		"dynamic_s_collective": "Memberships",
		"dynamic_sort_name": "Name",
		"dynamic_k_birthDate": "Date of Birth",
		"dynamic_k_deathDate": "Date of Death",
		"gender": "Gender",
		"birthDate": "Date of birth",
		"deathDate": "Date of death",
		"name": "Name",
		"residenceLocation": "Country of residence"
	}
};

```