var test = require('tap').test
var fs = require('fs')
var JaySchema = require('jayschema');
var js = new JaySchema();

var badgeClassSchemaRaw = fs.readFileSync('../obi-schema-badgeclass-1.1.json')
var badgeClassNoIssuerRaw = fs.readFileSync('./badgeClassNoIssuer.json')
var badgeClassTestRaw = fs.readFileSync('./badgeClass.json')

function setup() {
  var badgeClassSchema = JSON.parse(badgeClassSchemaRaw)
  return badgeClassSchema
}


test("Validate test BadgeClass against schema", function(t) {
  var schema = setup()
  var badgeClassTest = JSON.parse(badgeClassTestRaw)
  var errors = js.validate(badgeClassTest, schema)
  t.equal(errors.length, 0, "badge class test should validate")
  console.log(errors)
  t.end()
})

test("badgeClass requires issuer", function(t) {
  var schema = setup()
  var badgeClassNoIssuer = JSON.parse(badgeClassNoIssuerRaw)
  var errors = js.validate(badgeClassNoIssuer, schema)
  t.ok(errors, "badge class without an issuer should not validate")
  console.log(errors)
  t.end()
})
