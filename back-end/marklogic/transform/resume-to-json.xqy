xquery version '1.0-ml';

module namespace resume-to-json =
    'http://marklogic.com/rest-api/transform/resume-to-json-transformer';

import module
    namespace json="http://marklogic.com/xdmp/json"
    at "/MarkLogic/json/json.xqy";

declare namespace hr='http://ns.hr-xml.org/2007-04-15';

(::::::::::::::::::::)

declare private function resume-to-json:json-config() {
    let $c := json:config("custom")
    let $_ := map:put( $c, 'array-element-names', (
        xs:QName('hr:Competency'),
        xs:QName('hr:Achievement'),
        xs:QName('hr:SecurityCredential'),
        xs:QName('hr:PositionHistory'))
    )
    let $_ := map:put($c, "whitespace", "ignore")
    let $_ := map:put($c, "attribute-names",("positionType","currentEmployer",'id', 'name', 'description', 'schoolType', 'lastUsed'))
    return $c
};

(: transform hr:Resume XML to JSON :)
declare function resume-to-json:resume-to-json( $r as element(hr:Resume) ) {
    let $c := resume-to-json:json-config()
    let $j := json:transform-to-json( $r, $c )
    return $j
};

declare function resume-to-json:transform(
    $context as map:map,
    $params as map:map,
    $content as document-node()
) as document-node() {

    let $r-json := resume-to-json:resume-to-json( $content/node() )
    return document { $r-json }
};
