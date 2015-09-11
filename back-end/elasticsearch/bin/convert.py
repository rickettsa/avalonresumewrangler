
#
#   Transform resume XML to JSON
#
#   Usage: python convert.py --input <path to dir with XML> --output <path to dir to be created for JSON>
#
from xml.etree import ElementTree
import json
import sys, os, glob, re
from optparse import OptionParser

ns = { 'd':'http://ns.hr-xml.org/2007-04-15' } 

#-------------
def transform_contact_info( root, ns ):
    fn = root.find('.//d:ContactInfo/d:PersonName/d:GivenName', ns).text
    ln = root.find('.//d:ContactInfo/d:PersonName/d:FamilyName', ns).text
    cell = root.find('.//d:ContactInfo/d:ContactMethod/d:Mobile', ns).text
    email = root.find('.//d:ContactInfo/d:ContactMethod/d:InternetEmailAddress', ns).text
    return { 'firstName': fn, 'lastName': ln, 'cell': cell, 'email': email }

def desc_without_namespaces(desc):
    desc = re.sub( r'<Description xmlns:ns0=\"http://ns.hr-xml.org/2007-04-15\"', '', desc )
    return re.sub( r'ns0:', '', desc )

def transform_employment_history( root, ns ):
    eh = []
    for employer_org in root.findall('.//d:EmploymentHistory/d:EmployerOrg', ns):
        emp_name = employer_org.find('./d:EmployerOrgName', ns).text

        positions = []
        for position in employer_org.findall('./d:PositionHistory', ns):
            position_type = position.attrib['positionType']
            title = position.find('./d:Title', ns).text
            org_name = position.find('./d:OrganizationName', ns).text
            desc = position.find('./d:Description', ns)
            start_date = position.find('./d:StartDate', ns).text

            # change description to HTML by removing namespaces

            # remove namespace in text of element tree, clean up
            desc_without_ns = desc_without_namespaces(ElementTree.tostring(desc))
            desc = re.sub( r'^\s+', '', desc_without_ns, flags = re.MULTILINE)
            # parse back into tree without the namespace
            t = ElementTree.fromstring(desc)
            html = ElementTree.tostring(t, method='html')
            t = ElementTree.fromstring(html)
            final_desc = ''
            for e in t.iter():
                if e.tag != 'Description':
                    final_desc += ElementTree.tostring(e, method='html')

            positions.append( { 'positionType': position_type, 'title': title,
                'clientName': org_name, 'description': final_desc.replace('\n', ''),
                'startDate': start_date }
            )
        eh.append( { 'employerOrgName': emp_name, 'positions': positions } )

    return eh

def transform_education_history( root, ns):
    eh = []
    for school in root.findall('.//d:EducationHistory/d:SchoolOrInstitution', ns):
        school_name = school.find('./d:School/d:SchoolName', ns).text
        degree_name = school.find('./d:Degree/d:DegreeName', ns).text
        degree_major = school.find('./d:Degree/d:DegreeMajor/d:Name', ns).text
        start_date = school.find('./d:Degree/d:DatesOfAttendance/d:StartDate', ns).text

        eh.append( { 'schoolName': school_name, 'degreeName': degree_name,
            'degreeMajor': degree_major, 'startDate': start_date }
        )
    return eh

def transform_qualifications( root, ns):
    q = []
    for competency in root.findall('.//d:Qualifications/d:Competency', ns):
        display_name = competency.find('./d:CompetencyDisplayName', ns).text
        abbrev = competency.attrib['abbrev']
        years_exp = competency.find('./d:YearsExperience', ns).text

        q.append( { 'name': display_name, 'years': years_exp } )

    return q

def transform( xml_res, ns ):
    with open(xml_res, 'rt') as f:
        tree = ElementTree.parse(f)

    d = transform_contact_info( tree, ns )

    emp_hist = transform_employment_history( tree, ns )
    d['employmentHistory'] = emp_hist

    edu_hist = transform_education_history( tree, ns )
    d['educationHistory'] = edu_hist

    q = transform_qualifications( tree, ns )
    d['skills'] = q

    return d
#-------------

parser = OptionParser()
parser.add_option("-i", "--input-dir", dest="indir", help='existing directory containing XML input files')
parser.add_option("-o", "--output-dir", dest="outdir", help='new directory to be created for JSON output files')
(options, args) = parser.parse_args()

os.chdir(options.indir)
res_filenames = glob.glob('*.xml')

os.mkdir(options.outdir)

for xml_res in res_filenames:
    json_res = transform(xml_res, ns)

    output_filename = re.sub(r'\.xml$', '.json', xml_res)
    
    with open(os.path.join(options.outdir, output_filename), 'w') as f:
        json.dump(json_res, f, sort_keys=True, indent=4)

