var expect = chai.expect
var accessToken = localStorage.getItem("accessToken")
var gh = github(accessToken)
var repo = gh.repo("ga-dc/pbj-project2")

describe("github", function(){
  it("is a function", function(){
    expect(typeof github).to.eq("function")
  })
  it("takes an access token", function(){
    expect(gh.accessToken).to.be.ok
  })
  describe("repo", function(){
    it("is a function", function(){
      expect(typeof gh.repo).to.eq("function")
    }) 
    it("takes a name", function(){
      expect(repo.name).to.eq("ga-dc/pbj-project2")
    }) 
    it("has issues", function(){
      expect(typeof repo.issues).to.eq("function")
    })
    it("has an issues url", function(){
      expect(repo.issuesUrl).to.contain("api.github.com")
    })
    describe("issues", function(){
      it("recursively gets all issues", function(done){
        repo.issues(function(issues){
	  expect(issues).to.be.ok
	  done()
	})
      }) 
    })
  })
})
