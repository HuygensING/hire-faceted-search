# Hire Faceted Search

A faceted search React component.

## Config for publications

```javascript
import FacetedSearch from "hire-faceted-search";

// Basic search configuration
let searchConfig = {
    // Base URL
    baseURL: "http://(...)/v2",
    // API path
    searchPath: "search/path",
    // Provide a VRE ID for headers
    headers: {VRE_ID: "VreId"}
};

// Labels for human presentation of metadata labels (key = facets[n].name and refs[n].data[key])
let labels = {
	facetTitles: {
		"dynamic_s_creator": "Author",
		...
	}
};

// Controlled list of facet filters (default = all)
let facetList = ["dynamic_s_creator", ...];

// Metadata fields to be presented with result (default = all)
let metadataList = ["createdBy", ...];


React.render(<FacetedSearch 
	config={searchConfig} 
	facetList={facetList}
	labels={labels}
	metadataList={metadataList}
	onChange={function(data) {console.log(data)}}
	onSelect={this.gotodoc.bind(this)}
	 />, document.body);
```