var req = require("supertest");
var assert = require("assert");

var app = require("../app").app;
describe("Express tests...", function(){
    it("Express - Echo test", function(done){
        var phrase = "Hello!!!";
    
        req(app).get(`/echo/${phrase}`).expect(`<h2>Echo:${phrase}</h2>`).end(done);
    });
    
    it("Express - get object test", function(done){
        req(app).get("/expressTest").expect(function(response){
                assert.deepEqual(response.body, {test: "test"});
        }).end(done);
    });
});