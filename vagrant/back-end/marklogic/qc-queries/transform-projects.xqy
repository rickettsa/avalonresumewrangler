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
        xs:QName('Technology'),
        xs:QName('Competency'),
        xs:QName('Project'),
        xs:QName('Position'),
        xs:QName('ClientContact'))
    )
    let $_ := map:put($c, "whitespace", "ignore")
    let $_ := map:put($c, "attribute-names",('id', 'type', 'abbrev', 'component-type', 'filled-by', 'confidential', 'rid'))
    return $c
};

declare function local:projects-to-json( $r as element(Projects) ) {
    let $c := local:json-config()
    let $j := json:transform-to-json( $r, $c )
    return $j
};

declare function local:projects-to-xml( $r as xs:string ) {
    let $c := local:json-config()
    return json:transform-from-json( $r, $c )
};

let $filepath := 'C:\Users\kerisman\home\avalon\src\abe-becker-resume-wrangler\projects-template.xml'
let $p := xdmp:unquote(xdmp:filesystem-file($filepath))/node()
return local:projects-to-json($p)

(:
let $filepath := 'C:\Users\kerisman\home\avalon\src\abe-becker-resume-wrangler\projects-template.json'
let $p := xdmp:filesystem-file($filepath)
return local:projects-to-xml($p)
:)
