xquery version '1.0-ml';

import module
    namespace search = "http://marklogic.com/appservices/search"
    at "/MarkLogic/appservices/search/search.xqy";

declare namespace hr='http://ns.hr-xml.org/2007-04-15';

declare variable $SEARCH-OPTIONS :=
    <options xmlns='http://marklogic.com/appservices/search'>
        <constraint name='skill'>
            <range type='xs:string' collation='http://marklogic.com/collation/'>
                <element ns='http://ns.hr-xml.org/2007-04-15' name='StringValue' />
            </range>
        </constraint>
        <constraint name='fullname'>
            <value>
                <field name='fullname' /> <!--FIXME:make fullname field on PersonName/GivenName + PersonName/FamilyName -->
            </value>
        </constraint>
        <constraint name='employer'>
            <word>
                <element ns='http://ns.hr-xml.org/2007-04-15' name='EmployerOrgName' />
            </word>
        </constraint>
        <constraint name='school'>
            <word>
                <element ns='http://ns.hr-xml.org/2007-04-15' name='SchoolName' />
            </word>
        </constraint>
        <constraint name='degree-name'>
            <word>
                <element ns='http://ns.hr-xml.org/2007-04-15' name='Name' />
            </word>
        </constraint>
    </options>;

(: Get skill set from a given resume :)
declare function local:skills( $r as element(hr:Resume) ) {
  let $history := $r/hr:StructuredXMLResume/hr:EmploymentHistory/hr:EmployerOrg/hr:PositionHistory
  let $skill-set := fn:distinct-values(
    for $h in $history
    return $h/hr:Competency/hr:CompetencyEvidence/hr:StringValue/fn:string()
  )
  return $skill-set
};

(: Search for resumes with particular skills :)
declare function local:find-by-skills( $q as xs:string ) {
    search:search( $q, $SEARCH-OPTIONS, 1, 20 )
};

local:find-by-skills( 'skill:marklogic' )

