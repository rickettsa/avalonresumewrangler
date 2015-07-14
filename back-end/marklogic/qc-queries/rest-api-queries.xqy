xquery version '1.0-ml';

(:
:   Test using the REST API to perform the functionality needed for Resume
:   Wrangler
:)
declare namespace hr='http://ns.hr-xml.org/2007-04-15';

declare variable $HOST := 'localhost';
declare variable $PORT := '8020';
declare variable $API-VERSION := 'v1';

declare variable $HTTP-OPTIONS := 
    <options xmlns="xdmp:http">
       <authentication method="digest">
         <username>admin</username>
         <password>admin</password>
       </authentication>
    </options>;

declare variable $RESUME-COLLECTION := (:'resume':) 'skillwise';

declare variable $SAMPLE-RESUME :=
<Resume xmlns="http://ns.hr-xml.org/2007-04-15" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://ns.hr-xml.org/2007-04-15 file:/Users/abembecker/Development/Avalon/resumeWrangler/HR-XSL-Git/lib/hr-xml-2.5/HR-XML-2_5/SEP/Resume.xsd">
  <StructuredXMLResume>
    <ContactInfo>
      <PersonName>
        <GivenName>Shilpi</GivenName>
        <FamilyName>Reddy</FamilyName>
      </PersonName>
      <ContactMethod>
        <Mobile>
          <FormattedNumber>
</FormattedNumber>
        </Mobile>
      </ContactMethod>
    </ContactInfo>
    <EmploymentHistory>
      <EmployerOrg>
        <EmployerOrgName>Avalon Consulting LLC</EmployerOrgName>
        <PositionHistory positionType="contract">
          <Title>Senior Consultant</Title>
          <OrgName>
            <OrganizationName>Lead of Ecommerce and Merchandising applications.</OrganizationName>
          </OrgName>
          <Description>
            <p>Team lead for design, development, enhancement and implementation of Tuesday Morning Ecommerce, Merchandising, Planning and Allocation applications. Major projects worked on:</p>
            <p>Ecommerce</p>
            <p>: Tuesday Morning uses the Blue Martini ecommerce framework to build its ecommerce website. Various enhancements and customizations were performed on it to cater to the needs of Tuesday Morning.</p>
            <ul>
              <li>Built a vendor portal to help
vendors with looking up status on drop ship orders.
Used JSP's, HTML, CSS, JQuery, Struts and Hibernate
to build this application.</li>
              <li>Implemented REST services and
Webservices for interaction with third party
services(FedEx services, LP services, tax services,
marketing services etc)</li>
              <li>Designed and developed various
customizations within the Blue Martini framework
for Gift card lookups, Living social promotions,
employee discount promotions etc.</li>
              <li>Technologies used:JSP, HTML, JQuery, CSS, Struts,
Servlets, Hibernate, Java 1.6, Java script, Oracle
10g, WebLogic 9.2, Eclipse, ANT, JUNIT, REST
services, Blue Martini, Webservices and
JAXB.</li>
            </ul>
            <p>Merchandising systems</p>
            <p>: The merchandising systems constituted merchandising, planning and allocation systems. Designed and developed supporting applications around the core applications.</p>
            <ul>
              <li>Designed and developed a user
interface that allows the merchandisers to perform
reclass hierarchy without help from the IT
team.</li>
              <li>Led the team to design and build a
load notification system to provide a good
communication channel between warehouse and
stores.</li>
              <li>Instrumental in automating various
legacy time-consuming processes by using PERL
scripts and J2EE technologies.</li>
              <li>Headed the Tiger team focused on
improving the overnight batch processing times and
was successful in reducing it by half.</li>
              <li>Technologies used:Java 1.6, JSP, HTML, CSS, JUNIT, SQL
SERVER 2008 R2, ANT, JUNIT, JBOSS.</li>
            </ul>
          </Description>
          <StartDate>
            <StringDate>1000-01-01</StringDate>
          </StartDate>
        </PositionHistory>
        <PositionHistory positionType="contract">
          <Title>Team Lead/Software Engineer</Title>
          <OrgName>
            <OrganizationName>Pegasus Solutions Inc.</OrganizationName>
          </OrgName>
          <Description>
            <p>Technical lead and senior developer for multiple J2EE projects mainly on the distribution side of the business. Projects worked on:</p>
            <p>Content Manager and Webservices:</p>
            <p>Content Manager is a front end application where hotels can enter details about their properties and when submitted, this information is converted into an OTA (Open Travel Alliance) XML and sent to a webservice which stores it in the database. The distributors in turn can retrieve information about properties from this tool.</p>
            <ul>
              <li>Involved in requirements
gathering, design and analysis of both the front
end GUI and webservices.</li>
              <li>Used Struts framework for the user
interface and hibernate for all database related
calls.</li>
              <li>Developed SOAP-based Servers and
Clients for WebServices to utilize SOAP and
WSDL.</li>
              <li>Responsible for developing JUNIT
test cases for test-driven development.</li>
              <li>Used log4j for all application
level logging.</li>
              <li>Used Ant and Maven for creating
build scripts.</li>
              <li>Involved in migration of the code
from CVS to GIT.</li>
              <li>Technologies used:Struts, Hibernate, JSP, HTML, Java
Script, Servlets, Webservices, JAXB, Informix, and
JUnit.</li>
            </ul>
            <p>Ultra Direct</p>
            <p>: Ultra Direct is one of the most important products of Pegasus and it is through this that all the availability, booking and cancellation requests take place between hotels and distributors.</p>
            <ul>
              <li>Used Servlets and Java for
application development.</li>
              <li>Utilized JDBC for all data inserts
and data retrievals. Also involved in creation of
stored procedures.</li>
              <li>Used Log4j for logging, JUnit for
test driven development and SVN for version
control.</li>
              <li>Configured Hudson for continuous
integration testing.</li>
              <li>Technologies used:Java, Servlets, SVN, JUnit,
Eclipse, Log4J, Informix, Hudson and
Glassfish.</li>
            </ul>
            <p>EDCAT</p>
            <p>: EDCAT is a tool that we developed to do cache management tasks like searching the cache and deleting from the cache.</p>
            <ul>
              <li>Used GWT widgets and panels for
user interface building.</li>
              <li>Utilized ClickHandler and
KeypressHandler interface to manage client
events.</li>
              <li>Used CSS for creating
stylesheets.</li>
              <li>Guided other team members with
GWT.</li>
              <li>Oracle coherence cache was used
for all caching transactions.</li>
              <li>Technologies used:Java, GWT, JavaScript, Log4J, CVS,
ANT, Informix and Oracle Coherence.</li>
            </ul>
            <p>Audit Trail</p>
            <p>: Audit trail is a reporting application that is used by hotels to keep track of the webservice updates made to property content. There are a couple of scripts setup on cron that prune the webservice logs and add information to the database. There is also a front-end application where the customers can actually view this information.</p>
            <ul>
              <li>Responsible for the design,
analysis, coding and implementation of this
project.</li>
              <li>Used PERL to create scripts to
prune the logs and make inserts into the
database.</li>
              <li>Utilized JSP, Java Script and HTML
for front end GUI design.</li>
              <li>Developed code on Java OOPS
concept.</li>
              <li>Developed logging mechanism
utilizing Log4J and commons logging
utilities.</li>
              <li>Utilized JDBC API for interaction
with the Informix database.</li>
              <li>Technologies used:JSP, Servlets, Java, UNIX, Shell
script , Informix and PERL.</li>
            </ul>
            <p>Apart from the above-mentioned projects, was involved in various other smaller projects as either a lead or an individual contributor. Some of the other technologies used as a part of these other projects are</p>
            <p>Tapestry</p>
            <p>,</p>
            <p>JMS, IBM MQSeries, AJAX, and JQUERY.</p>
          </Description>
          <StartDate>
            <StringDate>1000-01-01</StringDate>
          </StartDate>
        </PositionHistory>
      </EmployerOrg>
    </EmploymentHistory>
    <EducationHistory>
      <SchoolOrInstitution schoolType="university">
        <School>
          <SchoolName>Fishbaum del Schloﬂberg</SchoolName>
        </School>
        <Degree>
          <DegreeName>BA</DegreeName>
          <DegreeMajor>
            <Name>Renaissance Bedpan Design</Name>
          </DegreeMajor>
          <DatesOfAttendance>
            <StartDate>
              <YearMonth>1631-02</YearMonth>
            </StartDate>
          </DatesOfAttendance>
          <Comments>Graduated with highest honors.</Comments>
        </Degree>
      </SchoolOrInstitution>
    </EducationHistory>
    <Qualifications>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="J2EE">
          <StringValue>J2EE</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="JSF">
          <StringValue>JSF</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="JSP">
          <StringValue>JSP</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Java">
          <StringValue>Java</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="EJB">
          <StringValue>EJB</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Hibernate">
          <StringValue>Hibernate</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="JDBC">
          <StringValue>JDBC</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="JQuery">
          <StringValue>JQuery</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="PERL">
          <StringValue>PERL</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Shell Scripts">
          <StringValue>Shell Scripts</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="PL/SQL">
          <StringValue>PL/SQL</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="XML">
          <StringValue>XML</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="XSLT">
          <StringValue>XSLT</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="GWT">
          <StringValue>GWT</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="HP">
          <StringValue>HP</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="DHTML">
          <StringValue>DHTML</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="CSS">
          <StringValue>CSS</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="ANT">
          <StringValue>ANT</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Apache Tomcat">
          <StringValue>Apache Tomcat</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="JBoss">
          <StringValue>JBoss</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="ORACLE">
          <StringValue>ORACLE</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="MySQL">
          <StringValue>MySQL</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Informix">
          <StringValue>Informix</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="MS SQL Server">
          <StringValue>MS SQL Server</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="DB2">
          <StringValue>DB2</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="UNIX">
          <StringValue>UNIX</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Linux">
          <StringValue>Linux</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Microsoft Windows">
          <StringValue>Microsoft Windows</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Rally">
          <StringValue>Rally</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="Jira">
          <StringValue>Jira</StringValue>
        </CompetencyEvidence>
      </Competency>
      <Competency>
        <CompetencyId id="">
</CompetencyId>
        <CompetencyEvidence name="MS Project">
          <StringValue>MS Project</StringValue>
        </CompetencyEvidence>
      </Competency>
    </Qualifications>
  </StructuredXMLResume>
</Resume>;

(:::::::::::::::::::::::::::::::)

(: find a unique id to use for a new resume :)
declare function local:doc-id( $r as element(hr:Resume) ) as xs:string {
    let $name := $r/hr:StructuredXMLResume/hr:ContactInfo/hr:PersonName
    let $firstname := fn:lower-case( $name/hr:GivenName )
    let $lastname := fn:lower-case( $name/hr:FamilyName )
    let $fullname :=
        if( $firstname and $lastname ) then $firstname || '-' || $lastname
        else if( $firstname ) then $firstname
        else $lastname
    let $id :=
        if( $fullname ) then $fullname || '_' || xdmp:random() || ".xml"
        else xdmp:random() || ".xml"
    return if( fn:exists(fn:doc($id)) ) then local:doc-id($r) else $id
};

declare function local:url(
    $resource   as xs:string,
    $params     as map:map
) {
    let $url := 'http://' || $HOST || ':' || $PORT || '/' || $API-VERSION || '/' || $resource
    let $param-pairs :=
        for $p in map:keys($params)
        let $v := map:get($params, $p)
        return $p || '=' || $v
    let $param-string := fn:string-join( $param-pairs, '&amp;' )
    return
        $url || '?' || $param-string
};

(: list all resumes :)
declare function local:list-resumes() {
    (: GET /v1/search?collection=resumes&format=json :)
    let $params := map:map()
    let $_ := map:put($params, 'collection', $RESUME-COLLECTION)
    let $_ := map:put($params, 'format', 'json')
    let $url := local:url( 'search', $params )
    return
        xdmp:http-get( $url, $HTTP-OPTIONS )[2]
};

(: GET: retrieve resume with the given id :)
declare function local:get-resume-by-id( $id as xs:string ) {
    (: GET /v1/documents?format=json&uri=<uri>&transform=resume-to-json-transformer :)
    let $params := map:map()
    let $_ := map:put($params, 'uri', $id)
    let $_ := map:put($params, 'transform', 'resume-to-json-transformer')
    let $_ := map:put($params, 'format', 'json')
    let $url := local:url( 'documents', $params )
    return
        xdmp:http-get( $url, $HTTP-OPTIONS )[2]
};

(: search for resumes :)
(:
declare function local:search-resumes(
    $query      as xs:string,
    $start      as xs:integer,
    $length     as xs:integer,
    $sort       as xs:string?,
    $direction  as xs:string?,
    $format     as xs:string?
) {
    let $params := map:map()
    let $_ := map:put($params, 'options', $SEARCH-OPTIONS)
    let $url := local:url( 'search', $params )
    return
        xdmp:http-get( $url, $HTTP-OPTIONS )[2]
};
:)
(:
declare function local:search-resumes( $query, $start, $length ) {
    local:search-resumes($query,$start,$length,(),(),())
};
:)
(: PUT: insert resume doc at supplied uri :)
declare function local:create-resume(
    $r  as element(hr:Resume),
    $id as xs:string
) {
    let $params := map:map()
    let $_ := map:put($params, 'uri', $id)
    let $_ := map:put($params, 'collection', $RESUME-COLLECTION)
    let $url := local:url( 'documents', $params )
    return
        xdmp:http-put( $url, $HTTP-OPTIONS, $r )
};

(: POST: insert resume doc at server-generated uri :)
declare function local:create-resume(
    $r  as element(hr:Resume)
) {
    (: create doc id (uri) :)
    let $id := local:doc-id($r)
    let $params := map:map()
    let $_ := map:put($params, 'collection', $RESUME-COLLECTION)
    let $url := local:url( 'documents', $params ) || '&amp;extension=xml'
    return
        xdmp:http-post( $url, $HTTP-OPTIONS, $r )
};

(: DELETE resume :)
declare function local:delete-resume( $id as xs:string ) {
    let $params := map:map()
    let $_ := map:put($params, 'uri', $id)
    let $url := local:url( 'documents', $params )
    return
        xdmp:http-delete( $url, $HTTP-OPTIONS )
};

(:local:list-resumes():) (: <-- works [v]:)
(:local:get-resume-by-id('deneena-lanius_16443389967476707122.xml'):) (: <-- this doesn't work for unknown reasons. It works perfectly when the generated URL is requested via browser. [v] :)
(:local:create-resume( $SAMPLE-RESUME, 'new-resume.xml' ):) (: <-- works [v] :)
(:local:create-resume( $SAMPLE-RESUME ):) (: <-- works [v] :)
(:local:delete-resume('4662265046855213688.xml'):) (: <-- works [v] :)

