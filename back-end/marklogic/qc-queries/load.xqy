xquery version "1.0-ml";

import module
    namespace json="http://marklogic.com/xdmp/json"
    at "/MarkLogic/json/json.xqy";

declare namespace hr='http://ns.hr-xml.org/2007-04-15';
declare namespace xsi="http://www.w3.org/2001/XMLSchema-instance";
declare namespace zip="xdmp:zip";

declare variable $ES-HOST := 'http://localhost:9200';
declare variable $ES-INDEX := 'resumes';
declare variable $ES-TYPE := 'resume';
declare variable $ES-HOST-INDEX-TYPE := fn:string-join( ($ES-HOST, $ES-INDEX, $ES-TYPE), '/' ) || '/';

declare variable $ZIP-PATH := 'C:\Users\kerisman\home\avalon\src\abe-becker-resume-wrangler\avalon-resumes-xml_1.1.zip';

declare variable $ML-RESUME-COLLECTION := 'resume';

(: these resumes will be ignored when bulk loading :)
declare variable $IGNORE := (
    (:'WayneApplebaumResume.docx.html.xml',:)
    ()
);

(::::::::::::::)

declare function local:name-from-resume( $r as element(hr:Resume) ) as xs:string {
    let $name := $r/hr:StructuredXMLResume/hr:ContactInfo/hr:PersonName
    let $firstname := fn:lower-case( $name/hr:GivenName )
    let $lastname := fn:lower-case( $name/hr:FamilyName )
    return
        if( $firstname and $lastname ) then $firstname || '-' || $lastname
        else if( $firstname ) then $firstname
        else $lastname
};

(: find a unique id to use for a new resume :)
declare function local:doc-id( $r as element(hr:Resume) ) as xs:string {
    let $fullname := fn:replace( local:name-from-resume( $r ), ' ', '-' )
    let $id :=
        if( $fullname ) then $fullname || '_' || xdmp:random() || ".xml"
        else xdmp:random() || ".xml"
    return if( fn:exists(fn:doc($id)) ) then local:doc-id($r) else $id
};

declare function local:json-config() {
(:    let $c := json:config("custom"):)
    let $c := json:config("full")
    let $_ := map:put( $c, 'array-element-names', (
        xs:QName('hr:Competency'),
        xs:QName('hr:Achievement'),
        xs:QName('hr:SecurityCredential'),
        xs:QName('hr:PositionHistory'))
    )
    let $_ := map:put($c, "whitespace", "ignore")
    let $_ := map:put($c, "attribute-names",("positionType",'projectId','abbrev',"currentEmployer",'id', 'name', 'description', 'schoolType', 'lastUsed','schemaLocation'))
    return $c
};

(: transform hr:Resume XML to JSON :)
declare function local:resume-to-json( $r as element(hr:Resume) ) {
    let $c := local:json-config()
    let $j := json:transform-to-json( $r, $c )
    return $j
};

(: transform a JSON resume to hr:Resume XML :)
declare function local:json-resume-to-xml( $r as xs:string ) {
    let $c := local:json-config()
    return json:transform-from-json( $r, $c )
};

(: load a single resume into MarkLogic :)
declare function local:load-resume(
    $r             as element(hr:Resume),
    $path-from-zip as xs:string
) {
    let $doc-id := local:doc-id($r)

    (: fix cases where the doc id had no name prefix by prepending the path inside the zip (which usuall contains the person's name) -- this can happen if the xml resume had no data inside PersonName :)
    let $doc-id :=
        if( fn:matches($doc-id, '-') )
        then $doc-id
        else $path-from-zip || $doc-id
    return
        xdmp:document-insert( $doc-id, $r, (), ($ML-RESUME-COLLECTION) )
};

declare function local:create-es-index() {
    let $definition := text{
    '{
      "settings": { },
      "mappings": {
        "resumes": {
          "mappings": {
            "resume": {
              "properties": {
                "Resume": {
                  "properties": {
                    "StructuredXMLResume": {
                      "properties": {
                        "ContactInfo": {
                          "properties": {
                            "ContactMethod": {
                              "properties": {
                                "InternetEmailAddress": {
                                  "type": "string"
                                },
                                "Mobile": {
                                  "type": "string"
                                }
                              }
                            },
                            "PersonName": {
                              "properties": {
                                "FamilyName": {
                                  "type": "string"
                                },
                                "GivenName": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        },
                        "EducationHistory": {
                          "properties": {
                            "SchoolOrInstitution": {
                              "School": {
                                "SchoolName": {
                                  "type": "string"
                                }
                              },
                              "Degree": {
                                "DegreeName": {
                                  "type": "string"
                                },
                                "DegreeMajor": {
                                  "Name": {
                                    "type": "string"
                                  }
                                },
                                "DatesOfAttendance": {
                                  "StartDate": {
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          }
                        },
                        "EmploymentHistory": {
                          "properties": {
                            "EmployerOrg": {
                              "properties": {
                                "EmployerOrgName": {
                                  "type": "string"
                                },
                                "PositionHistory": {
                                  "properties": {
                                    "Description": {
                                      "properties": {
                                        "p": {
                                          "type": "string"
                                        },
                                        "ul": {
                                          "properties": {
                                            "li": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "OrgName": {
                                      "properties": {
                                        "OrganizationName": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "StartDate": {
                                      "type": "date",
                                      "format": "dateOptionalTime"
                                    },
                                    "Title": {
                                      "type": "string"
                                    },
                                    "positionType": {
                                      "type": "string"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        },
                        "Qualifications": {
                          "properties": {
                            "Competency": {
                              "properties": {
                                "CompetencyDisplayName": {
                                  "type": "string"
                                },
                                "YearsExperience": {
                                  "type": "string"
                                },
                                "abbrev": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    "schemaLocation": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }'
    }
    return
        xdmp:http-post( $ES-HOST-INDEX-TYPE, (), $definition )
};

(: index a single resume into ElasticSearch :)
declare function local:index-into-es($r as element(hr:Resume)) {
    let $json := local:resume-to-json($r)
    return xdmp:http-post( $ES-HOST-INDEX-TYPE, (), $json )
};

declare function local:load-resumes-into-ml( $zip-path as xs:string ) {
    local:load-resumes( $zip-path, fn:true(), fn:false() )
};

declare function local:load-resumes-into-es( $zip-path as xs:string ) {
    local:load-resumes( $zip-path, fn:false(), fn:true() )
};

(: load a set of resumes from a zip file into MarkLogic and/or ElasticSearch :)
declare function local:load-resumes(
    $zip-path as xs:string,
    $load-ml  as xs:boolean,
    $load-es  as xs:boolean
) {
    let $zip := xdmp:external-binary( $zip-path )
    let $zip-paths := for $x in xdmp:zip-manifest( $zip )//zip:part/text() return $x
    return
        for $path in $zip-paths
        let $resume := xdmp:zip-get($zip, $path)/node()
(:FIXME: something wrong involving this where clause; can sometimes skip all paths
        where $path != $IGNORE
:)
        return
            if($load-es)
            then
                (: load resume into Elasticsearch and return status info :)
                let $e := local:index-into-es($resume)
                return element resume {
                    attribute name { local:name-from-resume($resume) },
                    element http-response { $e[1] },
                    element es-response { xdmp:quote($e[2]) }
                }
            else if($load-ml)
            then
                (: load resume into MarkLogic :)
                local:load-resume($resume, $path)
            else
                (: return the JSON :)
                (local:resume-to-json($resume), '---------------------')
};

declare function local:delete-all-resumes-from-ml() {
    for $r in fn:collection( $ML-RESUME-COLLECTION )
    let $uri := fn:document-uri($r)
    return xdmp:document-delete($uri)
};

declare function local:delete-es-index() {
    let $es-index := fn:string-join( ($ES-HOST, $ES-INDEX), '/' )
    return xdmp:http-delete($es-index)
};

(: Perform round-trip conversion from XML to JSON and back to XML to check that conversion settings are right
let $r := xdmp:unquote(xdmp:filesystem-file('C:\users\kerisman\home\avalon\src\abe-becker-resume-wrangler\avalon-resume-template.xml'))/node()
let $rjson := local:resume-to-json($r)
return local:json-resume-to-xml( text{$rjson} )
:)

(:
let $r := xdmp:filesystem-file('C:\users\kerisman\home\avalon\src\abe-becker-resume-wrangler\avalon-resume-template.json')
return local:json-resume-to-xml($r)
:)

(:local:load-resumes-into-ml( $ZIP-PATH ):)
(:local:delete-all-resumes-from-ml():)

(: Convert XML resumes to JSON and load into ES, capturing and returning any errors
let $report := local:load-resumes-into-es( $ZIP-PATH )
return
    for $resume in $report
    let $code := $resume/http-response//*:code/fn:string()
    let $name := $resume/@name/fn:string()
    where $code eq '400'
    return
        if($code eq '400')
        then $name || ': fail:  ' || $resume/es-response/fn:string()
        else if($code eq '201')
        then $name || ': success'
        else $name || ': error code ' || $code
:)
    
(:local:delete-es-index():)
(:local:create-es-index():)

(: Return the JSON strings generated as an intermediate step before loading ES
let $rjson := local:load-resumes($ZIP-PATH, fn:false(), fn:false())[1]
return local:json-resume-to-xml( text{$rjson} )
:)
