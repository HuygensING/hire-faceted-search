# Hire Faceted Search



[![build status](https://travis-ci.org/HuygensING/hire-faceted-search.svg?branch=master "Build status")](https://travis-ci.org/HuygensING/hire-faceted-search)

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

## Props

```
className              Add a custom className to root el.

config                 Map of config options.

customComponents       Map of custom components. Currently supported:
                       currentQuery, filters and result.

facetList              List of facet names. Determines order.

facetSortMap           Map of sort types. Keys are facet names,
                       values are maps with a `direction` and `type` key.

labels                 Map of labels. Used when the server doesn't
                       return a title for a facet. Or for i18n.

metadataList           List of metadata to be shown per result.

numberedResults        Boolean. Show <ol> or <ul> result list.

onChange               Function. Called when a new search result
                       is received. Returns the search results.

onSearchId             Function. Called when a new search result
                       is received. Returns the search ID.

onSelect               Function. Called when user click or touches
                       (selects) a search result.

query                  Map of query parameters. Usually the query
                       parameters are internal. In case of a forced
                       rerender or when passing queries from one
                       search to the other, passing a query via
                       props becomes necessary.
```

## Config

```
baseURL                Base of the search URL.

fullTextSearchFields   List of full text search fields. Consists
                       of maps with name and position key.

headers                Map of custom headers.

hideFreeTextSearch     Boolean to show/hide full text search.

queryDefaults          Map of search query defaults.

rows                   Number of rows per result list.

searchPath             Path of the search URL.
```