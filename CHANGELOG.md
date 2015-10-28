### v5.0.0	(2015/10/28 9:25)
* Fix tests due to added named export
* Make custom filters component possible
* Move custom components to hash
* Pass all state and props to children
* Move facetMap to seperate file
* Add Props and Config sections to README
* Add propType for sort
* Rename 'facets' to component to 'filters'
* Merge
* Let state override props
* Make fullTextSearch optional
* Pass all state and props through component hierarchy
* Copy results to refs if no refs present

### v4.7.0	(2015/10/22 10:32)
* support labels for facetValues

### v4.6.0	(2015/10/22 9:36)
* change fullTextSearchParameters through query prop

### v4.5.1	(2015/10/21 8:24)
* patch for missing config check in queries reducer

### v4.5.0	(2015/10/21 8:22)
* expose queryDefaults through config props

### v4.4.0	(2015/10/20 14:52)
* expose currentQueryComponent as prop in stead of obscure render func in config

### v4.3.0	(2015/10/20 14:23)
* moved CurrentQuery component to external package hire-current-query

### v4.2.0	(2015/10/20 12:17)
* added optional callback onSearchId, added last searchId to state

### v4.1.0	(2015/10/19 16:28)
* expose current query group map func through config

### v4.0.0	(2015/10/19 14:24)
* added multiple full text search field support

### v3.10.1	(2015/10/14 16:17)
* relaxed timeout of search component test
* fix #3 facets will not disappear with RECEIVE_NEXT_RESULTS
* removed commented out code from results reducers test

### v3.10.0	(2015/10/14 15:8)
* allow facetValues to be changed with the query property

### v3.9.0	(2015/10/6 12:28)
* Merge pull request #2 from HuygensING/development
* new range slider
* now using range slider component

### v3.8.0	(2015/9/9 10:42)
* Add custom className

### v3.7.2	(2015/9/7 8:57)
* New build

### v3.7.1	(2015/9/7 7:27)
* Fix tests around changed labels (not all labels are facetTitles)
* Add default prop val for facetSortMap

### v3.7.0	(2015/9/4 17:14)
* Make sorting configurable per facet
* Move render facets if/else to function map
* Move none facet titles out of facetTitles map
* Fix one to many change from results to refs
* New build
* Add update script

### v3.6.0	(2015/9/4 10:54)
* added range facet

### v3.5.3	(2015/9/3 7:32)


### v3.5.2	(2015/9/3 7:28)


### v3.5.1	(2015/9/2 17:39)
* Work with refs instead of results
* Add numberedResults prop

### v3.5.0	(2015/9/1 14:5)
* overridable result component
* shallow render test of text search
* added test for Facet component

### v3.4.2	(2015/8/31 12:33)
* only load new result batch when list item has over zero height, i.e. it is visible in dom

### v3.4.1	(2015/8/31 12:0)
* onChange is not required

### v3.4.0	(2015/8/31 11:20)
* changed default facet sort to countDesc
* added test for result item component

### v3.3.2	(2015/8/31 10:18)
* pass optional headers on GET request as well
* finished tests for queries reducer
* finished tests for queries reducer

### v3.3.1	(2015/8/28 11:44)
* make store class local to component
* tests for queries reducer part 1
* fixed facet reducer test
* added fetch next result test

### v3.3.0	(2015/8/27 15:24)
* added test for actions/results
* added pending tests for queries, coffee break
* Update README.md
* Update README.md
* newline
* newline
* added tests for results reducer
* added test for config reducer
* added first test

### v3.2.0	(2015/8/26 15:10)
* show loader by clearing list before new result fetch

### v3.1.1	(2015/8/26 14:47)
* bugfix, do not throw error when a certain expected facet is not in a result set

### v3.1.0	(2015/8/26 14:40)
* WWHT-23 determine sort parameters from api response

### v3.0.1	(2015/8/26 13:22)
* show facet name in CurrentQuery component; bugfix on 0 results
* reduced README
* added sample to readme
* added sample to readme
* new readme

### v3.0.0	(2015/8/26 10:50)


### v2.0.7	(2015/8/25 13:32)
* Fix typo

### v2.0.6	(2015/8/25 13:23)
* Move action callback handlers to actions file

### v2.0.5	(2015/8/25 9:37)
* Use facetList prop for rendering facets

### v2.0.4	(2015/8/24 17:13)
* Improve svg.loader algo

### v2.0.3	(2015/8/24 15:17)
* Return current list of results in onChange

### v2.0.2	(2015/8/24 15:1)
* Clean up

### v2.0.1	(2015/8/24 11:19)
* Fire change event on init
* Don't set a list of components as state

### v2.0.0	(2015/8/24 9:25)
* Finish replace flux and immutable with redux
* Replace flux && immutable with redux
* WiP
* Replace prop value function with string
* Add new search button

### v1.6.2	(2015/8/19 15:5)
* Fix results receive props bug

### v1.6.1	(2015/8/19 14:37)
* Remove console.log

### v1.6.0	(2015/8/19 14:36)
* Add i18n and infinite scroll

### v1.5.0	(2015/8/17 17:9)
* Add pagination and current query

### v1.4.2	(2015/8/17 14:32)
* Fix binding of event handlers

### v1.4.1	(2015/8/17 14:13)
* Add receive props for i18n

### v1.4.0	(2015/8/17 13:58)
* Add i18n and rows select

### v1.3.1	(2015/8/17 11:27)
* Add example to README

### v1.3.0	(2015/8/17 11:19)
* Change facets - results ratio
* Move styling from parent/client to FS
* Replace dnd sort by simple results sort
* Filter list facets
* Merge pull request #1 from renevanderark/master
* prepend css in stead of append, correct git repo in package.json

### v1.2.0	(2015/8/12 17:32)
* Add full text search
* Sort facets on alpha or count
* Add insertCSS dep

### v1.0.0	(2015/8/11 15:1)
* Reset version to 0.0.0 and add derequire dep

