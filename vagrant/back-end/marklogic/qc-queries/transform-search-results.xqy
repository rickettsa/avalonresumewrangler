xquery version "1.0-ml";

import module
    namespace json="http://marklogic.com/xdmp/json"
    at "/MarkLogic/json/json.xqy";

declare namespace hr='http://ns.hr-xml.org/2007-04-15';
declare namespace xsi="http://www.w3.org/2001/XMLSchema-instance";
declare namespace zip="xdmp:zip";

declare function local:json-config() {
    let $c := json:config("custom")
    let $_ := map:put( $c, 'array-element-names', (
        xs:QName('Resume'),
        xs:QName('Competency'),
        xs:QName('Achievement'),
        xs:QName('SecurityCredential'),
        xs:QName('PositionHistory'))
    )
    let $_ := map:put($c, "whitespace", "ignore")
    let $_ := map:put($c, "attribute-names",("positionType",'projectId','abbrev',"currentEmployer",'id', 'name', 'description', 'schoolType', 'lastUsed','schemaLocation'))
    return $c
};

declare function local:search-results-to-json( $r as element(ResumeSearchResults) ) {
    let $c := local:json-config()
    let $j := json:transform-to-json( $r, $c )
    return $j
};

declare function local:search-results-to-xml( $r as xs:string ) {
    let $c := local:json-config()
    return json:transform-from-json( $r, $c )
};

let $filepath := 'C:\Users\kerisman\home\avalon\src\abe-becker-resume-wrangler\search-results.xml'
let $p := xdmp:unquote(xdmp:filesystem-file($filepath))/node()
return local:search-results-to-json($p)

(:
let $filepath := 'C:\Users\kerisman\home\avalon\src\abe-becker-resume-wrangler\search-results.json'
let $p := xdmp:filesystem-file($filepath)
return local:search-results-to-xml($p)
:)

