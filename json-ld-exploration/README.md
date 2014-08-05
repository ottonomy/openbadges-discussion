## To Do
* ./badges/jsonld-badge.png - Unbaked Badge Image
* ./assertions/8208dc87-9616-4304-9103-ef43f4058e3e.png - Baked Badge Image
* ./evidence/8208dc87.html - Evidence page for this badge.
- ./organization.json - Issuer organization JSON. DONE.
* ./logo.png - Organization logo
* ./context.json - JSON-LD linkin' it up.
* ./badges/jsonld-badge.html - Criteria page
- ./badges/jsonld-badge.json - Badge Class. DONE.
- ./assertions/8208dc87-9616-4304-9103-ef43f4058e3e.json Badge Assertion. DONE.

## JSON-LD Notes
* "@type" indicates the type of a node identified with an IRI "@id", like "It's a Restaurant, bro!"
* "@vocab" sets a default vocabulary for the properties. Then you can set properties to null in the context to declare that it is not part of that vocabulary. Useful for extensions?
    - Instead of declaring null, can you declare a default, then declare the specific extension vocabs other terms are identified in? This would make for a pretty simple JSON-LD inline context object.
    - "@vocab" sets a common prefix to be used for all properties and types that do not match a term (something that could expand to an IRI or node identifier) and are not themselves an IRI. 
        + I think this means that we can (in the inline @context object of a badge object) declare our base vocab to be wherever we host the main standard (https://badgealliance.org/standard/1.2/) and then specify the extension properties as terms defined in other external context documents (that are also JSON-schemas for those extensions).
        + Accreditrust did it the ugly way by adding their own namespaced property names as absolute IRIs.
    - @vocab has to be a IRI prefix (like "https://badgealliance.org/standard/1.2/") probably with a trailing slash, because then all the property names are defined in separate documents (ugh) like "https://badgealliance.org/standard/1.2/issuedOn". 
        + Can JSON-LD processors understand JSON pointers to deep link within a single context/schema file? (for example, use https://badgealliance.org/standard/1.2#/ as the base so that "issuedOn" may be defined next to "image")?
* I don't think we can use a linked "@context" unless the badge has no extensions (but most badges will have no extensions, probably?)
* Compact IRIs are defined like { "foaf": "http://xmlns.com/foaf/0.1" } and used like "foaf:name": "Perd Hapley". 
    - I don't think we should use them. They are ugly and lame. I don't suppose we should disallow their use in extensions if somebody wants to add a bunch of extensions defined in one suite, but it's too linked data-ey for me.
    - Except, you can double up on your definitions. Like this within a context object:
        + "foaf": "http://xmlns.com/foaf/0.1/"
        + "picture": { "@id": "foaf:depiction", "@type": "@id" }
* You can specify types of values in JSON-LD (like boolean, number, ...)
    - I think JSON-schema components of our definitions are better suited for this. Maybe even to the point of directing people not to use JSON-LD's functionality here.
    - I very much think we should not use the "@value" + "@type" method of doing this (example 22 on http://www.w3.org/TR/json-ld ), because that dumps the ugly right into the values of the badge objects rather than separating them nicely to the context.
* A JSON-LD document may have multiple contexts, just may not define a new one within another "@context" object.
* Combining external and local contexts. (This will probably be quite useful for us)
    - Example 29 on http://www.w3.org/TR/json-ld/#dfn-active-context will be most useful I bet. ("Combining external and local contexts" with an array)
    - Multiple contexts may be defined with an array (of IRIs or objects).
    - "Active context" is the accumulation of contexts defined in this array.
        + Contexts are processed in order, so later-defined contexts complement and override previous contexts in the array.

## Questions to forward to a JSON-LD Expert
* What is expected to live at the end of a context reference if not JSON-LD, and how can it cooperate with automatically providing JSON-schema to run verification against? Should we link a JSON-schema document that also has a @context object?
* JSON pointers are used in JSON-schema to indicate which fragment within the document's structure is targeted. Can JSON-LD point to one of these?
* How should we locate the context and schema files for the Assertion, Badge Class and Issuer Organization objects?
    

