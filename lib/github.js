var github = function( accessToken ){
  return {
    accessToken: accessToken,
    repo: repo
  }
  function repo(name){
    return {
      name: name,
      issues: issues,
      issuesUrl: "https://api.github.com/repos/" + name + "/issues?state=open&access_token=" + accessToken
    } 
  }
  function issues(callback, url, collection){
    var url = url || this.issuesUrl
    var collection = collection || []
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json'
    }).done( function( response, textStatus, req ){
      for( var i=0, len = response.length; i < len; i++ ){
	collection.push( response[i] );
      }
      nextUrl = req.getAllResponseHeaders().match(/<(.*)>; rel="next"/);
      if( nextUrl ){
	issues( callback, nextUrl[1], collection);
      } else {
	callback(collection);
      }
    }) 
  }
}