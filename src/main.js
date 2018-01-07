const clearSearchResults = () => {
  $( ".search__link" ).remove();
}

const addSearchResult = ( result ) => {
  let searchArea = $( "#search" );
  let resultHtml = "<a class=\"search__link\" href=\"https://en.wikipedia.org/?curid=" +
      result.pageid + 
      "\"><div class=\"search__result\"><p class=\"result__title\">" +
      result.title +
      "</p><p class=\"result__blurb\">" +
      result.snippet +
      "</p></div></a>";
  searchArea.append( resultHtml );
}

const displayResults = ( resultData ) => {
  resultData.query.search.map( addSearchResult );
}

const getSearchResults = ( searchPhrase ) => {
  console.log( "testing ajax" );
  let uriReadySearchPhrase = encodeURI( searchPhrase );
  let resultData = $.ajax({
    type: "GET",
    dataType: "jsonp",
    url: "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" +
      uriReadySearchPhrase,
    crossDomain: true,
    cache: false
    });
  resultData.then( displayResults , alert );
}

const search = () => {
  let searchTerms = $( '#search-field' ).val();
  clearSearchResults();
  getSearchResults( searchTerms );
}

const randomArticle = () => {
  window.location.href = "https://en.wikipedia.org/wiki/Special:Random";
}

$( "document" ).ready( clearSearchResults );

$( '#search-btn' ).click( search );
$( '#random-btn' ).click( randomArticle );
