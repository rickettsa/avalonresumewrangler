angular.module('templates-app', ['admin/admin.tpl.html', 'edit/edit.tpl.html', 'home/home.searchResults.tpl.html', 'home/home.tpl.html', 'projects/projects.tpl.html', 'skills/skills.tpl.html', 'view/view.tpl.html']);

angular.module("admin/admin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.tpl.html",
    "<div class=\"col-md-12\">\n" +
    "    <div class=\"row well dashed-well\">\n" +
    "        <div class=\"col-md-6 col-md-offset-3\">\n" +
    "            <form name=\"createNewUser\" ng-submit = \"admin.douser()\" novalidate>\n" +
    "                <div class=\"form-group\">\n" +
    "\n" +
    "                    <label>User Name</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.userName\" type=\"text\" required></input>\n" +
    "                    <label>First Name</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.firstName\" type=\"text\" required></input>\n" +
    "                    <label>Last Name</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.lastName\" type=\"text\" required></input>\n" +
    "\n" +
    "                    <label>Email</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.email\" type=\"text\" required></input>\n" +
    "                    <label>Phone</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.phone\" type=\"text\" required></input>\n" +
    "                    <label>City</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.city\" type=\"text\" required></input>\n" +
    "                    <label>State</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.state\" type=\"text\" required></input>\n" +
    "                    <label>Zip</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"admin.createUser.zip\" type=\"text\" required></input>\n" +
    "\n" +
    "\n" +
    "                    <br />\n" +
    "                    <button class=\"add-skill btn btn-success pull-right\" type=\"submit\" ><i class=\"glyphicon glyphicon-ok\"></i> Save</button>\n" +
    "\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("edit/edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("edit/edit.tpl.html",
    "<div class=\"col-md-12\">\n" +
    "    <div class=\"row well\">\n" +
    "        <!-- click-edit-link http://plnkr.co/edit/EsW7mV?p=preview -->\n" +
    "        <!-- plus button http://plnkr.co/edit/xUDrOS?p=preview -->\n" +
    "        <!-- http://vitalets.github.io/angular-xeditable/ -->\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h1>{{ contact.firstName }} {{ contact.lastName }}</h1>\n" +
    "            <h3>Hire Date:\n" +
    "            <a href = \"#\"\n" +
    "            e-required e-placeholder = \"Hire Date\"\n" +
    "            editable-text= \"resume.EmploymentHistory.EmployerOrg.HireDate\"\n" +
    "            onaftersave = \"edit.updateResume()\">\n" +
    "            {{ resume.EmploymentHistory.EmployerOrg.HireDate || \"empty\" }}\n" +
    "            </a></h3>\n" +
    "            <h3><a href= \"mailto : {{ contact.email }}\">{{ contact.email }}</a></h3>\n" +
    "            <h3><a href= \"tel: +{{ contact.phone }}\"> {{ contact.phone }}</a></h3>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h2>Employee Position at Avalon</h2>\n" +
    "            <h3>\n" +
    "            <a href= \"#\"\n" +
    "            e-required e-placeholder = \"Employee Position at Avalon\"\n" +
    "            editable-text = \"resume.EmploymentHistory.employeeSuperTitle\"\n" +
    "            onaftersave=\"edit.updateResume()\">\n" +
    "            {{ resume.EmploymentHistory.employeeSuperTitle || \"empty\" }}\n" +
    "            </a></h3>\n" +
    "\n" +
    "            <h2>Employee Professional Summary</h2>\n" +
    "            <p><a href = \"#\"\n" +
    "            e-required e-placeholder = \"Employee Professional Summary\"\n" +
    "            editable-text = \"resume.EmploymentHistory.employeeProfessionalSummary\" onaftersave= \"edit.updateResume()\">\n" +
    "            {{ resume.EmploymentHistory.employeeProfessionalSummary || \"empty\" }}\n" +
    "            </a></p>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <!-- ================================================= -->\n" +
    "        <!-- START RESUME EXPERIENCE SECTION -->\n" +
    "        <!-- ================================================= -->\n" +
    "        <div class=\"col-md-12\" ng-if = \"!_.isEmpty(contact)\">\n" +
    "            <h2>Experience:</h2>\n" +
    "\n" +
    "            <button class = \"add-skill btn btn-success\" ng-click = \"edit.addEmployer('start')\"><i class=\"glyphicon glyphicon-plus\"></i> Add Employer</button>\n" +
    "\n" +
    "            <div ng-repeat = \"emplyr in resume.employmentHistory\" ng-init=\"outerIndex = $index\">\n" +
    "                <div class=\"well\" ng-if=\"resume.employmentHistory[outerIndex].positions.length > 0\">\n" +
    "                    <div class=\"row\" >\n" +
    "                        <div class=\"col-md-8\">\n" +
    "                            <h3><a href = \"#\"\n" +
    "                            e-required e-placeholder = \"Service Provider Organization Name\"\n" +
    "                            editable-text = \"emplyr.employerOrgName\"\n" +
    "                            onaftersave = \"edit.updateResume()\">\n" +
    "                            {{ emplyr.employerOrgName || \"Service Provider Organization Name\" }}\n" +
    "                            </a></h3>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-4 text-right\">\n" +
    "                           <h3><button class = \"add-skill btn btn-success\" ng-click = \"edit.addExperience('start', outerIndex)\"><i class=\"glyphicon glyphicon-plus\"></i> Experience</button><h3>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div ng-repeat = \"pos in emplyr.positions\" ng-init = \"innerIndex= $index\">\n" +
    "                            <div class=\"well light-well\">\n" +
    "                                <div class=\"col-md-12 text-right\">\n" +
    "                                    <button class=\"btn btn-danger btn-xs\"\n" +
    "                                    ng-click = \"edit.deletePosition(outerIndex, innerIndex)\">Delete Position</button>\n" +
    "                                </div>\n" +
    "\n" +
    "   \n" +
    "                                <h3><a href=\"#\"\n" +
    "                                editable-text=\"pos.clientName\"\n" +
    "                                e-uib-typeahead=\"clientName as clientName._source.clientName for clientName in projects($viewValue) | filter:$viewValue |limitTo:3\"\n" +
    "                                e-typeahead-on-select='onSelect($item, $model, $label, pos)'\n" +
    "                                onaftersave = \"edit.updateResume()\" \n" +
    "                                >{{pos.clientName}} \n" +
    "                                </a></h3>\n" +
    "\n" +
    "                                <h3><a href = \"#\"\n" +
    "                                e-required e-placeholder = \"Position Title\"\n" +
    "                                editable-text            = \"pos.title\"\n" +
    "                                onaftersave              = \"edit.updateResume()\">\n" +
    "                                {{ pos.title || \"Position Title\" }}\n" +
    "                                </a></h3>\n" +
    "\n" +
    "                                <span><a href = \"#\"\n" +
    "                                e-required e-placeholder = \"Start Date\"\n" +
    "                                editable-text            = \"pos.startDate\"\n" +
    "                                onaftersave              = \"edit.updateResume()\">\n" +
    "                                {{ pos.startDate || \"Start Date\" }}\n" +
    "                                </a></span><span> to </span>\n" +
    "\n" +
    "                                <span><a href = \"#\"\n" +
    "                                e-required e-placeholder = \"End Date\"\n" +
    "                                editable-text            = \"pos.endDate\"\n" +
    "                                onaftersave              = \"edit.updateResume()\">\n" +
    "                                {{ pos.endDate || \"End Date\" }}\n" +
    "                                </a></span>\n" +
    "\n" +
    "                                <h4 class=\"uneditable\"\n" +
    "                                ng-if=\"pos.globalDescription\">\n" +
    "                                {{ pos.globalDescription }}\n" +
    "                                </h4>\n" +
    "\n" +
    "                                <br ng-if = \"!pos.GlobalDescription\"/>\n" +
    "                                <br ng-if = \"!pos.GlobalDescription\"/>\n" +
    "\n" +
    "                                <!-- Integrate CKEDitor http://jsfiddle.net/jWANb/2/ -->\n" +
    "                                <div class = \"ck-editor\"\n" +
    "                                ng-model = \"pos.description\"\n" +
    "                                ng-init  = \"description = pos.description\">\n" +
    "                                {{ pos.description }}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"col-md-12 text-right\">\n" +
    "                            <button class = \"add-skill btn btn-success\" ng-click = \"edit.addExperience('end', outerIndex)\"><i class=\"glyphicon glyphicon-plus\"></i> Experience</button></span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <button class = \"add-skill btn btn-success\" ng-click = \"edit.addEmployer('end')\"><i class=\"glyphicon glyphicon-plus\"></i> Add Employer</button>\n" +
    "        </div><!-- finish experience section -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <!-- ================================================= -->\n" +
    "        <!-- START RESUME SKILLSET SECTION -->\n" +
    "        <!-- ================================================= -->\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Lifetime Skillset:</h2>\n" +
    "            <button class = \"add-skill btn btn-success\" ng-click=\"edit.addLifeSkillRole(resume.skills)\"><i class=\"glyphicon glyphicon-plus\"></i> Skill</button>\n" +
    "\n" +
    "            <div class=\"well light-well\">\n" +
    "\n" +
    "                <form class=\"form-horizontal\">\n" +
    "                    <div class=\"form-group text-left\">\n" +
    "                        <label class=\"col-md-3  control-label\">Filter By:</label>\n" +
    "                        <div class=\"col-md-6\">\n" +
    "                         <input type=\"text\" class=\"form-control\" ng-model=\"edit.skillFilter\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "\n" +
    "                <div class=\"skills-scroller well col-md-12 col-md-offset-0\">\n" +
    "                    <form ng-submit=\"edit.updateResume()\">\n" +
    "                         <table class=\"skills-table\">\n" +
    "                            <tr ng-repeat=\"skillRole in resume.skills | filter:edit.skillFilter | orderBy:skillRole.name\" ng-init=\"skillRole.isEditing = false\">\n" +
    "\n" +
    "                                <td class=\"icon\" ng-if=\"skillRole.isEditing === false\">\n" +
    "                                    <img class=\"skill-icon\" ng-src=\"{{ edit.getSkillImg(skillRole) }}\" alt=\"img\"/>\n" +
    "                                    <p  class=\"skill-name\">{{ skillRole.name || \"Skill\"}}</p>\n" +
    "                                </td>\n" +
    "\n" +
    "                                <td class=\"skillname\" ng-if=\"skillRole.isEditing === true\">\n" +
    "                                    <input class=\"form-control\" ng-model=\"skillRole.name\" placeholder=\"Skill Name\" options=\"typeaheadOptions\" datasets=\"typeaheadData\" sf-typeahead autofocus/>\n" +
    "                                </td>\n" +
    "\n" +
    "                                <td class=\"experience-read\" ng-if=\"skillRole.isEditing === false\">\n" +
    "                                    {{ skillRole.years + ' years' || '0' }}\n" +
    "                                </td>\n" +
    "\n" +
    "                                <td class=\"experience-edit\" ng-if=\"skillRole.isEditing === true\">\n" +
    "                                    <input class=\"form-control\" ng-model=\"skillRole.years\" placeholder=\"Years Experience\" ng-pattern=\"'[0-9]+'\"/>\n" +
    "                                </td>\n" +
    "\n" +
    "                                <td class=\"controls text-right\">\n" +
    "                                    <div class=\"skill-controls\" ng-if=\"skillRole.isEditing === false\">\n" +
    "                                        <button type=\"button\" ng-click=\"edit.editSkill(skillRole)\" class=\"btn btn-info btn-sm\" aria-label=\"Left Align\">\n" +
    "                                            <span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span> Edit\n" +
    "                                        </button>\n" +
    "                                        \n" +
    "                                        <button type=\"button\" ng-click=\"edit.removeSkill($index, resume.skills)\" class=\"btn btn-danger btn-sm\" aria-label=\"Left Align\">\n" +
    "                                            <span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Delete\n" +
    "                                        </button>\n" +
    "                                        \n" +
    "                                       \n" +
    "                                    </div>\n" +
    "                                    <div class=\"skill-controls\" ng-if=\"skillRole.isEditing === true\">\n" +
    "                                         <button type=\"button\" ng-click=\"edit.saveSkills(resume.skills, skillRole)\" class=\"btn btn-success btn-sm\" aria-label=\"Left Align\">\n" +
    "                                            <span class=\"glyphicon glyphicon-floppy-disk\" aria-hidden=\"true\"></span> Save\n" +
    "                                        </button>\n" +
    "                                        \n" +
    "                                        <!--<button ng-click=\"edit.removeSkill($index, resume.skills)\"><i class=\"glyphicon glyphicon-remove\"></i></button>-->\n" +
    "                                    </div>\n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </form>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div><!-- finish skillset section -->\n" +
    "\n" +
    "\n" +
    "        <!-- ================================================= -->\n" +
    "        <!-- START RESUME EDUCATION SECTION -->\n" +
    "        <!-- ================================================= -->\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Education:</h2>\n" +
    "            <button class = \"add-skill btn btn-success\" ng-click =\"edit.addEducation('start')\"><i class=\"glyphicon glyphicon-plus\"></i> Education</button>\n" +
    "            <div class = \"well light-well\" ng-repeat = \"educ in resume.educationHistory\" >\n" +
    "                <div class=\"col-md-12 text-right\">\n" +
    "                    <button class=\"btn btn-danger btn-xs\" ng-click =\"edit.deleteEducation($index)\">Delete Education</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <h3><a href                  = \"#\"\n" +
    "                    e-required e-placeholder = \"Degree Mayor\"\n" +
    "                    editable-text            = \"educ.degreeMayor\"\n" +
    "                    onaftersave              = \"edit.updateResume()\">\n" +
    "                    {{ educ.degreeMayor || \"Degree Mayor\" }}</a></h3>\n" +
    "\n" +
    "                <h3><a href                  = \"#\"\n" +
    "                    e-required e-placeholder = \"Degree Name\"\n" +
    "                    editable-text            = \"educ.degreeName\"\n" +
    "                    onaftersave              = \"edit.updateResume()\">\n" +
    "                    {{ educ.degreeName || \"Degree Name\" }}</a></h3>\n" +
    "\n" +
    "                <h3><a href                  = \"#\"\n" +
    "                    e-required e-placeholder = \"School Name\"\n" +
    "                    editable-text            = \"educ.schoolName\"\n" +
    "                    onaftersave              = \"edit.updateResume()\">\n" +
    "                    {{ educ.schoolName || \"School Name\" }}</a></h3>\n" +
    "\n" +
    "                <span><a href                = \"#\"\n" +
    "                    e-required e-placeholder = \"Start Date\"\n" +
    "                    editable-text            = \"educ.startDate\"\n" +
    "                    onaftersave              = \"edit.updateResume()\">\n" +
    "                    {{ educ.startDate || \"Start Date\" }}</a></span><span> to </span>\n" +
    "\n" +
    "                <span><a href                = \"#\"\n" +
    "                    e-required e-placeholder = \"End Date\"\n" +
    "                    editable-text            = \"educ.endDate\"\n" +
    "                    onaftersave              = \"edit.updateResume()\">\n" +
    "                    {{ educ.endDate || \"End Date\" }}</a></span>\n" +
    "\n" +
    "            </div> <!-- finish div for educ in resume.educationHistory -->\n" +
    "             <button ng-if=\"!_.isEmpty(resume.educationHistory) && resume.educationHistory.length > 0\" class = \"add-skill btn btn-success\" ng-click = \"edit.addEducation('end')\"><i class=\"glyphicon glyphicon-plus\"></i> Education</button>\n" +
    "        </div><!-- finish education section -->\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div> <!-- finish row -->\n" +
    "</div>");
}]);

angular.module("home/home.searchResults.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.searchResults.tpl.html",
    "<div class=\"row rw-search-res-row\" ng-if=\"searchResponse[0]._index === 'resumes'\">\n" +
    "    <div class=\"col-md-12 well\" ng-repeat=\"result in searchResponse\">\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <div class=\"row\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <img class=\"consultant-avatar img-rounded\" ng-src=\"{{ getAvatarImgName( result._source.email ) }}\"/>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-9\">\n" +
    "                        <h1>{{ result._source.firstName }} {{ result._source.lastName }}</h1>\n" +
    "                        <h4><a href=\"mailto:{{ result._source.email }}\">{{ result._source.email }}</a></h4>\n" +
    "                        <h4><a href=\"tel:+{{ result._source.phone }}\">{{ result._source.phone }}</a></h4>\n" +
    "                        <!--<h4 ng-if=\"result._source.city || result._source.state\">{{ result._source.city }}, {{ result._source.state }}</h4>-->\n" +
    "                        <h4>{{ result.timezone }}</h4>\n" +
    "                        <a class=\"pull-left\" ui-sref=\"view({ firstName:result._source.firstName, lastName:result._source.lastName  })\"><i class=\"fa fa-sm fa-eye\"></i> View Resume</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-6\">\n" +
    "                <h4><i>{{ result._source.employmentHistory[0].positions[0].title }}</i>, {{ result._source.employmentHistory[0].positions[0].contractingOrgName }}</h4>\n" +
    "                <!--<h4><span class=\"header-label\">{{ result._source.employmentHistory[0].positions[0].startDate }}</span></h4>-->\n" +
    "                <table class=\"table table-striped rw-skills-table\">\n" +
    "                    <!--<tr>-->\n" +
    "                        <!--<th>Skills</th>-->\n" +
    "                        <!--<th>Experience</th>-->\n" +
    "                    <!--</tr>-->\n" +
    "                    <tr ng-repeat=\"skill in result._source.skills | limitTo:search.config.skillsDispLimit | orderBy:-years\">\n" +
    "                        <td ng-bind-html=\"skill.name | highlight:global.search.query\"></td>\n" +
    "                        <!--<td>{{ skill.years }}yrs</td>-->\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "                <!--<a ng-if=\"result._source.skills.length - search.config.skillsDispLimit > 0\">Show More Skills...</a>-->\n" +
    "            </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\" ng-if=\"searchResponse.length === 0\">\n" +
    "        <div class=\"alert alert-danger\" role=\"alert\"><i class=\"fa fa-warning\"></i> Your search returned 0 results.. </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"row\" ng-if=\"searchResponse[0]._index === 'projects'\">\n" +
    "    <div class=\"col-md-12 well\" ng-repeat=\"result in searchResponse\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <h1>{{ result._source.name }}</h1>\n" +
    "                    <h3>{{ result._source.clientName }}</h3>\n" +
    "                    <h4>{{ result.clientWebsite }}</h4>\n" +
    "                    <a class=\"search-result-link pull-left\" ui-sref=\"projects({ id:result._id  })\"><i class=\"fa fa-sm fa-eye\"></i> View Project Details</a>\n" +
    "                    <h4>{{ result.clientDescription }}</h4>\n" +
    "                    <h4>{{ result.summary }}</h4>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h4><i>{{ result._source.startDate }}</i></h4>\n" +
    "            <table class=\"table table-striped\">\n" +
    "                <tr>\n" +
    "                    <th>Skills</th>\n" +
    "                </tr>\n" +
    "                <tr ng-repeat=\"skill in result._source.projectSkills | limitTo:search.config.skillsDispLimit | orderBy:-years\">\n" +
    "                    <td ng-bind-html=\"skill | highlight:global.search.query\"></td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "            <a ng-if=\"result._source.skills.length - search.config.skillsDispLimit > 0\">Show More Skills...</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-12\" ng-if=\"searchResponse.length === 0\">\n" +
    "        <div class=\"alert alert-danger\" role=\"alert\"><i class=\"fa fa-warning\"></i> Your search returned 0 results.. </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"jumbotron\">\n" +
    "  <h1>Avalon Resume Wrangler</h1>\n" +
    "  <p class=\"lead\">\n" +
    "    Search, update, and query Avalon resumes and projects.\n" +
    "      <search-form></search-form>\n" +
    "  </p>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("projects/projects.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("projects/projects.tpl.html",
    "<div class=\"col-md-12 dashed-well\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-8\">\n" +
    "            <h1><a href=\"#\" e-required e-placeholder=\"Project Name\" editable-text=\"project.name\" onaftersave=\"updateProject()\">{{ project.name || \"empty\" }}</a></h1>\n" +
    "            <h3><a href=\"#\" e-required e-placeholder=\"Client Name\" editable-text=\"project.clientName\" onaftersave=\"updateProject()\">{{ project.clientName || \"empty\" }}</a></h3>\n" +
    "            <h4><a href=\"mailto:{{ project.clientWebsite }}\" e-required e-placeholder=\"Client Website\" editable-text=\"project.clientWebsite\" onaftersave=\"updateProject()\">{{ project.clientWebsite }}</a></h4>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-4\">\n" +
    "            <table class=\"project-dates\">\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <span>Practice: </span>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a href=\"#\" e-required e-placeholder=\"Geo Practice\" editable-text=\"project.ProjectSummary.GeoPractice\" onaftersave=\"updateProject()\">{{ project.ProjectSummary.GeoPractice || \"empty\" }}</a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <span>Start Date: </span>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a href=\"#\" e-required e-placeholder=\"Project Name\" editable-text=\"project.startDate\" onaftersave=\"updateProject()\">{{ project.startDate || \"empty\" }}</a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <span>End Date:</span>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a href=\"#\" e-required e-placeholder=\"Project Name\" editable-text=\"project.AssignmentDateRange.ExpectedEndDate\" onaftersave=\"updateProject()\">{{ project.AssignmentDateRange.ExpectedEndDate || \"empty\" }}</a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <span>Extension Date:</span>\n" +
    "                    </td>\n" +
    "                    <td>\n" +
    "                        <a href=\"#\" e-required e-placeholder=\"Project Name\" editable-text=\"project.AssignmentDateRange.ActualEndDate\" onaftersave=\"updateProject()\">{{ project.AssignmentDateRange.ActualEndDate || \"empty\" }}</a>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Global Description: </h2>\n" +
    "            <div class=\"well light-well\">\n" +
    "                <p>\n" +
    "                <!--<a href=\"#\" e-rows=\"8\" e-cols=\"80\" e-style=\"width: 90%\" data-type=\"textarea\" e-required e-placeholder=\"Project Description\" editable-textarea=\"project.clientDescription\" onaftersave=\"updateProject()\">{{ project.clientDescription || \"empty\" }}</a>-->\n" +
    "                <div class=\"ck-editor\" ng-model=\"project.summary\" ng-init=\"description = project.summary\">{{ project.summary }}</div>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Technology Stack:</h2>\n" +
    "                <div class=\"well light-well\">\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <h4>Front End:</h4>\n" +
    "\n" +
    "                        <ul class=\"list-unstyled\">\n" +
    "                            <li ng-repeat=\"tech in project.TechnologyStack.Technology | excludeOthers:'frontend'\">\n" +
    "                                <!-- if an image is found, don't bother showing text -->\n" +
    "                                <!-- <img class=\"skill-icon\" ng-src=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\" alt=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\"/>-->\n" +
    "                                <!-- show text when editing and hide image -->\n" +
    "                                <h4 class=\"\" editable-text=\"tech.name\" onaftersave=\"updateProject()\" e-name=\"stackTechName\" e-typeahead=\"skill for skill in skillNames | filter:$viewValue | limitTo:10\" typeahead-editable=\"false\">\n" +
    "                                    <!-- {{ showSkill(skillRole) }} -->\n" +
    "                                    {{ tech.name }}</h4>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <h4>Back End:</h4>\n" +
    "                        <ul class=\"list-unstyled\">\n" +
    "                            <li ng-repeat=\"tech in project.TechnologyStack.Technology | excludeOthers:'backend'\">\n" +
    "                                <!-- if an image is found, don't bother showing text -->\n" +
    "                                <!-- <img class=\"skill-icon\" ng-src=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\" alt=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\"/>-->\n" +
    "                                <!-- show text when editing and hide image -->\n" +
    "                                <h4 class=\"\" editable-text=\"tech.name\" onaftersave=\"updateProject()\" e-name=\"stackTechName\" e-typeahead=\"skill for skill in skillNames | filter:$viewValue | limitTo:10\" typeahead-editable=\"false\">\n" +
    "                                    <!-- {{ showSkill(skillRole) }} -->\n" +
    "                                    {{ tech.name }}</h4>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <h4>Middleware:</h4>\n" +
    "                        <ul class=\"list-unstyled\">\n" +
    "                            <li ng-repeat=\"tech in project.TechnologyStack.Technology | excludeOthers:'middleware'\">\n" +
    "                                <!-- if an image is found, don't bother showing text -->\n" +
    "                                <!-- <img class=\"skill-icon\" ng-src=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\" alt=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\"/>-->\n" +
    "                                <!-- show text when editing and hide image -->\n" +
    "                                <h4 class=\"\" editable-text=\"tech.name\" onaftersave=\"updateProject()\" e-name=\"stackTechName\" e-typeahead=\"skill for skill in skillNames | filter:$viewValue | limitTo:10\" typeahead-editable=\"false\">\n" +
    "                                    <!-- {{ showSkill(skillRole) }} -->\n" +
    "                                    {{ tech.name }}</h4>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-3\">\n" +
    "                        <h4>Bug Reporting:</h4>\n" +
    "                        <ul class=\"list-unstyled\">\n" +
    "                            <li ng-repeat=\"tech in project.TechnologyStack.Technology | excludeOthers:'bugreporting'\">\n" +
    "                                <!-- if an image is found, don't bother showing text -->\n" +
    "                                <!-- <img class=\"skill-icon\" ng-src=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\" alt=\"{{ getSkillImg(tech.CompetencyDisplayName) }}\"/>-->\n" +
    "                                <!-- show text when editing and hide image -->\n" +
    "                                <h4 class=\"\" editable-text=\"tech.name\" onaftersave=\"updateProject()\" e-name=\"stackTechName\" e-typeahead=\"skill for skill in skillNames | filter:$viewValue | limitTo:10\" typeahead-editable=\"false\">\n" +
    "                                    <!-- {{ showSkill(skillRole) }} -->\n" +
    "                                    {{ tech.name }}</h4>\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Consultants:</h2>\n" +
    "            <div class=\"well light-well\">\n" +
    "                <div class=\"col-md-6 consultant well\" ng-repeat=\"position in project.positions\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <img class=\"consultant-avatar img-rounded\" ng-src=\"{{ getAvatarImgName( 'generic@avalonconsult.com' ) }}\"/>\n" +
    "                            <h4 ng-if=\"position.filledBy.ContactInfo.ContactMethod.InternetEmailAddress !== 'generic@avalonconsult.com'\" ng-click=\"goToResume( position.filledBy.ContactInfo.ContactMethod.InternetEmailAddress.toLowerCase() )\"><a href=\"#\">{{ position.filledBy.ContactInfo.PersonName.GivenName }} {{ position.filledBy.ContactInfo.PersonName.FamilyName }}</a></h4>\n" +
    "                            <a href=\"mailto:{{ position.filledBy.ContactInfo.ContactMethod.InternetEmailAddress.toLowerCase() }}\"><i class=\"glyphicon glyphicon-envelope\"></i> Email</a>\n" +
    "                            <br/>\n" +
    "                            <a href=\"tel:+{{ position.filledBy.ContactInfo.ContactMethod.Mobile }}\"><i class=\"glyphicon glyphicon-phone\"></i> {{ position.filledBy.ContactInfo.ContactMethod.Mobile }}</a>\n" +
    "                            <h4>{{ position.filledBy.ContactInfo.ContactMethod.PostalAddress.City }}, {{ position.filledBy.ContactInfo.ContactMethod.PostalAddress.State }}</h4>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-8\">\n" +
    "                            <h3 class=\"position-title\" editable-text=\"position.PositionTitle\" onaftersave=\"updateProject()\" e-name=\"positionTitle\"><a href=\"#\">{{ position.PositionTitle }}</a></h3>\n" +
    "                            <h4 class=\"uneditable\">{{ position.PositionResponsibilies }}</h4>\n" +
    "                            <ul class=\"consultant-skills-list\" ng-if=\"position.CompetenciesRequired.Competency.length > 0\">\n" +
    "                                <li ng-repeat=\"skill in position.CompetenciesRequired.Competency\">\n" +
    "                                    <h4 class=\"\" e-style=\"width: 60%\" editable-text=\"skill.DisplayName\" onaftersave=\"updateProject()\" e-name=\"consultantSkillName\" e-typeahead=\"skill for skill in skillNames | filter:$viewValue | limitTo:10\" typeahead-editable=\"false\">\n" +
    "                                        {{ skill.DisplayName }}\n" +
    "                                    </h4>\n" +
    "                                </li>\n" +
    "                            </ul>\n" +
    "                            <button class=\"add-skill btn btn-success\" ng-click=\"addSkill($index)\" ng-if=\"position.CompetenciesRequired.Competency.length === 0\"><span class=\"glyphicon glyphicon-plus\"></i> Skill</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <button class=\"add-consultant btn btn-success\" ng-click=\"addConsultant()\"><span class=\"glyphicon glyphicon-plus\"></i> Consultant</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Client Contacts:</h2>\n" +
    "            <div class=\"well light-well\">\n" +
    "                <div class=\"col-md-6 consultant well\" ng-repeat=\"contact in project.clientContacts\">\n" +
    "                    <div class=\"row\">\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <img class=\"consultant-avatar img-rounded\" src=\"/assets/avatars/generic.jpg\"/>\n" +
    "                            <h4><a href=\"#\">{{ contact.firstName }} {{ contact.lastName }}</a></h4>\n" +
    "                            <a href=\"mailto:{{ contact.email }}\"><i class=\"glyphicon glyphicon-envelope\"></i> Email</a>\n" +
    "                            <br/>\n" +
    "                            <a href=\"tel:+{{ contact.cell }}\"><i class=\"glyphicon glyphicon-phone\"></i> {{ contact.cell }}</a>\n" +
    "                            <!-- <h4>{{ position.filledBy.ContactInfo.ContactMethod.PostalAddress.City }}, {{ position.filledBy.ContactInfo.ContactMethod.PostalAddress.State }}</h4> -->\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-8\">\n" +
    "                            <h3 class=\"position-title\" editable-text=\"contact.title\" onaftersave=\"updateProject()\" e-name=\"positionTitle\"><a href=\"#\">{{ contact.title }}</a></h3>\n" +
    "                            <h4 >{{ contact.ContactInfo.PositionResponsibilies }}</h4>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <button class=\"add-client-contact btn btn-success\" ng-click=\"addClientContact()\"><span class=\"glyphicon glyphicon-plus\"></i> Client Contact</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("skills/skills.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("skills/skills.tpl.html",
    "<div class=\"col-md-12\">\n" +
    "    <div class=\"row well dashed-well\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-5\">\n" +
    "                    <h3>Filter By:</h3>\n" +
    "                    <ul class=\"skill-filters\">\n" +
    "                        <li ng-repeat=\"filter in skills.skillFilters\">\n" +
    "                            <input type=\"checkbox\" value=\"{{ filter.value }}\"></input>\n" +
    "                            <label>{{ filter.name }}</label>\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-7\">\n" +
    "                    <h3>Skills:</h3>\n" +
    "                    <!--<input class=\"form-control\" ng-model=\"skills.skillListFilter\" placeholder=\"Filter Skills by a Term...\"></div>-->\n" +
    "                    <div class=\"master-skills-list stack-meta-well well\">\n" +
    "                        <ul>\n" +
    "                            <li ng-click=\"skills.selectSkill(key, value)\" ng-repeat=\"(key, value) in skills.skillsMasterList | orderBy: dispName\" ng-class=\"skills.isSkillSelected(key)\">{{ value.dispName }}</li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <h3>Details:</h3>\n" +
    "            <form name=\"skillDetails\" novalidate>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label>Display Name</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"skills.currentSkill.dispName\" type=\"text\" required></input>\n" +
    "                    <label>Normalized Name (replace spaces with dash, no special chars)</label>\n" +
    "                    <input class=\"form-control\" ng-model=\"skills.currentSkill.normName\" type=\"text\" ng-disabled=\"modes.editingExistingSkill\" ng-pattern=\"skills.normNameRegex\" required></input>\n" +
    "                    <label>Image File Name</label>\n" +
    "                    <input name=\"skillImg\" class=\"form-control\" ng-model=\"skills.currentSkill.image\" type=\"text\"></input>\n" +
    "                    <label>Description</label>\n" +
    "                    <textarea  ng-model=\"skills.currentSkill.descr\"  class=\"form-control\" rows=\"3\"></textarea>\n" +
    "                    <br />\n" +
    "                    <button class=\"add-skill btn btn-success pull-right\" ng-click=\"skills.saveSkill(skills)\" ng-disabled=\"skillDetails.$pristine || skillDetails.$invalid\"><i class=\"glyphicon glyphicon-ok\"></i> Save</button>\n" +
    "                    <button class=\"add-skill btn btn-success\" ng-click=\"skills.addSkill()\" ng-if=\"skills.modes.editingExistingSkill\"><i class=\"glyphicon glyphicon-plus\"></i> New Skill</button>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-6\">\n" +
    "                    <h3>Stack Position:</h3>\n" +
    "                    <div ng-if=\"!skills.modes.addStackPosition\">\n" +
    "                        <div class=\"well stack-meta-well\">\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"pos in skills.positions\" ng-click=\"skills.togglePos(pos)\" ng-class=\"skills.isPosSelected(pos)\">{{ pos.dispName }}</li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                        <button class=\"add-skill btn btn-success\" ng-click=\"skills.modes.addStackPosition = 1\"><i class=\"glyphicon glyphicon-plus\"></i> Stack Position</button>\n" +
    "                    </div>\n" +
    "                    <div ng-if=\"skills.modes.addStackPosition\">\n" +
    "                        <form name=\"addStackPositionForm\">\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <!--<label>Position Id:</label>-->\n" +
    "                                <!--<input name=\"stackPositionId\" class=\"form-control\" type=\"text\" placeholder=\"normalized id\" disabled=\"disabled\"/>-->\n" +
    "                                <label>Position Display Name:</label>\n" +
    "                                <input name=\"stackPositionDispName\" ng-model=\"skills.formEl.stackPositionDispName\" class=\"form-control\" type=\"text\" placeholder=\"display name\" required/>\n" +
    "                                <br/>\n" +
    "                                <label>Position Description:</label>\n" +
    "                                <input name=\"stackPositionDescr\" ng-model=\"skills.formEl.stackPositionDescr\" class=\"form-control\" type=\"text\" placeholder=\"stack description\"/>\n" +
    "                                <br/>\n" +
    "                                <button class=\"add-skill btn btn-success pull-right\" ng-click=\"skills.addStackPosition()\"><i class=\"glyphicon glyphicon-plus\"></i> Add</button>\n" +
    "                                <button class=\"add-skill btn btn-warning pull-left\" ng-click=\"skills.modes.addStackPosition = 0\"><i class=\"glyphicon glyphicon-remove\"></i> Cancel</button>\n" +
    "                            </div>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-6\">\n" +
    "                    <h3>Stack Name:</h3>\n" +
    "                    <div ng-if=\"!skills.modes.addStackName\">\n" +
    "                        <div class=\"well stack-meta-well\">\n" +
    "                            <ul>\n" +
    "                                <li ng-repeat=\"stack in skills.stacks\" ng-click=\"skills.toggleStack(stack)\" ng-class=\"skills.isStackSelected(stack)\">{{ stack.dispName }}</li>\n" +
    "                            </ul>\n" +
    "                        </div>\n" +
    "                        <button class=\"add-skill btn btn-success\" ng-click=\"skills.modes.addStackName = 1\"><i class=\"glyphicon glyphicon-plus\"></i> Stack Name</button>\n" +
    "                    </div>\n" +
    "                    <div ng-if=\"skills.modes.addStackName\">\n" +
    "                        <form name=\"addStackNameForm\">\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <!--<label>Stack Id:</label>-->\n" +
    "                                <!--<input name=\"stackId\" class=\"form-control\" type=\"text\" placeholder=\"normalized id\" disabled=\"disabled\"/>-->\n" +
    "                                <label>Stack Display Name:</label>\n" +
    "                                <input name=\"stackDispName\" ng-model=\"skills.formEl.stackDispName\" class=\"form-control\" type=\"text\" placeholder=\"display name\" required/>\n" +
    "                                <br/>\n" +
    "                                <label>Stack Description:</label>\n" +
    "                                <input name=\"stackDescr\" ng-model=\"skills.formEl.stackDescr\" class=\"form-control\" type=\"text\" placeholder=\"stack description\"/>\n" +
    "                                <br/>\n" +
    "                                <button class=\"add-skill btn btn-success pull-right\" ng-click=\"skills.addStackName()\"><i class=\"glyphicon glyphicon-plus\"></i> Add</button>\n" +
    "                                <button class=\"add-skill btn btn-warning pull-left\" ng-click=\"skills.modes.addStackName = 0\"><i class=\"glyphicon glyphicon-remove\"></i> Cancel</button>\n" +
    "                            </div>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("view/view.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("view/view.tpl.html",
    "<div class=\"col-md-3\">\n" +
    "    <div class=\"row well sideBar\">\n" +
    "        <h2>Filter Resume:</h2>\n" +
    "        <form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <label>Search For:</label>\n" +
    "                <br/>\n" +
    "                <input type=\"text\" ng-model=\"skill\" typeahead=\"skill for skill in skillNames | filter:$viewValue | limitTo:10\" placeholder=\"Skill..\"></input>\n" +
    "\n" +
    "                <h4>Date Range</h4>\n" +
    "                <div class=\"input-daterange\">\n" +
    "                    <label>From:</label>\n" +
    "                    <br/>\n" +
    "                    <input type=\"text\" class=\"input-small\" value=\"2014-04-05\" />\n" +
    "                    <br/>\n" +
    "                    <label>To:</label>\n" +
    "                    <br/>\n" +
    "                    <input type=\"text\" class=\"input-small\" value=\"2015-04-19\" />\n" +
    "                </div>\n" +
    "\n" +
    "                <br/>\n" +
    "                <h4>Tech Type:</h4>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Front End\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Back End\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "\n" +
    "                <h4>Stack:</h4>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        ELK\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Grails\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Node\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        C# .Net\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "\n" +
    "                <h4>Include:</h4>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Lifetime Skillset\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Certifications\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Education\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" value=\"\">\n" +
    "                        Publications\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- ================================================= -->\n" +
    "<!-- START CONTACT SECTION -->\n" +
    "<!-- ================================================= -->\n" +
    "<div class=\"col-md-9\">\n" +
    "    <div class=\"row well mainContent\">\n" +
    "        <!-- click-edit-link http://plnkr.co/edit/EsW7mV?p=preview -->\n" +
    "        <!-- plus button http://plnkr.co/edit/xUDrOS?p=preview -->\n" +
    "        <!-- http://vitalets.github.io/angular-xeditable/ -->\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <div>\n" +
    "                <div class=\"pull-left\" ng-if=\"isAuthorized(['editor','admin'])\n" +
    "                        && contact.firstName === session.firstName\n" +
    "                        && contact.lastName === session.lastName\">\n" +
    "                    <a href ui-sref=\"edit({ firstName: session.firstName, lastName: session.lastName})\">\n" +
    "                        <i class=\"fa fa-2x fa-edit\"></i> Edit Resume\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "                <div class=\"pull-right\">\n" +
    "                    <span>Download As:</span>\n" +
    "                    &#x2003;\n" +
    "                    <a href=\"#\" ng-click = \"view.printPreview()\"><img class=\"download-icon\" src=\"/assets/icons/pdf.png\"/></a>\n" +
    "                    &#x2003;\n" +
    "                    <a href=\"#\"><img class=\"download-icon\" src=\"/assets/icons/word-doc.png\"/></a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"col-md-12\" ng-if=\"contact.firstName\">\n" +
    "            <h1    id=\"contactName\">{{ contact.firstName }} {{ contact.lastName }}</h1>\n" +
    "            <h4> Employee Title: {{resume.EmploymentHistory.employeeSuperTitle}}</h4>\n" +
    "            <h4> Employee Professional Summary: {{resume.EmploymentHistory.employeeProfessionalSummary}}</h4>\n" +
    "            <h4><a id=\"contactEmail\"  href=\"mailto:{{ contact.email }}\"> {{ contact.email }} </a></h4>\n" +
    "            <h4><a id=\"contactPhone\"  href=\"tel:+{{ contact.phone }}\"> {{ contact.phone }} </a></h4>\n" +
    "            <h5    id=\"contactTimezone\"> {{ contact.timezone }} </h5>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "<!-- ================================================= -->\n" +
    "<!-- START SKILLS SECTION -->\n" +
    "<!-- ================================================= -->\n" +
    "        <div class=\"col-md-12\" ng-if=\"resume.skills.length > 0\">\n" +
    "            <h2>Development Skills</h2>\n" +
    "            <label>Filter By:</label><input type=\"text\" class=\"form-control\" ng-model=\"view.skillFilter\"></input>\n" +
    "            <div class=\"skills-scroller well\">\n" +
    "                <form>\n" +
    "                    <table class=\"skills-table\">\n" +
    "\n" +
    "                        <tr ng-repeat=\"skillRole in resume.skills | filter:view.skillFilter | orderBy:skillRole.name\" ng-init=\"skillRole.isEditing = false\">\n" +
    "                            <td class=\"icon\" ng-if=\"skillRole.isEditing === false\">\n" +
    "                                <img class=\"skill-icon\" ng-src=\"{{ view.getSkillImg(skillRole) }}\" alt=\"img\"/>\n" +
    "                                <p ng-bind-html=\"skillRole.name | highlight:view.skillFilter\"  class=\"skill-name\"></p>\n" +
    "                            </td>\n" +
    "                            <td class=\"skillname\" ng-if=\"skillRole.isEditing === true\">\n" +
    "                                <input class=\"form-control\" ng-model=\"skillRole.name\" placeholder=\"Skill Name\" options=\"typeaheadOptions\" datasets=\"typeaheadData\" sf-typeahead autofocus/>\n" +
    "                            </td>\n" +
    "                            <!--<td class=\"experience-read\" ng-if=\"skillRole.isEditing === false\">-->\n" +
    "                                <!--{{ skillRole.years + ' years' || 'empty' }}-->\n" +
    "                            <!--</td>-->\n" +
    "                            <!--<td class=\"experience-edit\" ng-if=\"skillRole.isEditing === true\">-->\n" +
    "                                <!--<input class=\"form-control\" ng-model=\"skillRole.years\" placeholder=\"Years Experience\" ng-pattern=\"'[0-9]+'\"/>-->\n" +
    "                            <!--</td>-->\n" +
    "                        </tr>\n" +
    "                    </table>\n" +
    "                </form>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- ================================================= -->\n" +
    "        <!-- START EXPERIENCE SECTION -->\n" +
    "        <!-- ================================================= -->\n" +
    "\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h2>Experience:</h2>\n" +
    "            <div class=\"exper\">\n" +
    "                <div ng-repeat=\"emplyr in resume.employmentHistory\">\n" +
    "                    <div class=\"well light-well\" ng-repeat=\"pos in emplyr.positions\">\n" +
    "\n" +
    "                        <h3><a href=\"#\" class=\"employerOrgName\" e-placeholder=\"Service Provider Organization Name\">{{ emplyr.employerOrgName || \"empty\" }}</a></h3>\n" +
    "                        <h3 class=\"clientName\">{{ pos.clientName || \"empty\" }}</h3>\n" +
    "\n" +
    "                        <h3 class=\"positionTitle\">{{ pos.title || \"empty\" }}</h3>\n" +
    "                        <span>{{ pos.startDate || \"empty\" }}</span>\n" +
    "                        <span> to </span>\n" +
    "                        <span>{{ pos.endDate || \"empty\" }}</span>\n" +
    "\n" +
    "                        <!-- Integrate CKEDitor http://jsfiddle.net/jWANb/2/ -->\n" +
    "                        <div class=\"resume-descr\" ng-model=\"description\" ng-bind-html=\"pos.description\"></div>\n" +
    "\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"col-xs-12 preview-resume-parent fade\">\n" +
    "  <div class=\"closing-prev\">\n" +
    "    <span class=\"close-preview\" ng-click = \"view.closePreview()\">X</span>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"contact\">\n" +
    "    <img src=\"/assets/site/avalon-transparent.png\" class= \"avalon-img\">\n" +
    "    <h1 class=\"contact-info\"> {{ contact.firstName }} {{ contact.lastName }}</h1>\n" +
    "    <h4 class=\"contact-info\"> {{ contact.email }} </h4>\n" +
    "    <h4 class=\"contact-info\"> {{ contact.phone }} </h4>\n" +
    "    <h6 class=\"contact-info\"> {{ contact.timezone }} </h6>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-xs-4 chosen-resume-aside\">\n" +
    "      <div ng-for=\"emplyr in resume.employmentHistory\">\n" +
    "        <h4>Title</h4>\n" +
    "        <h5>{{resume.EmploymentHistory.employeeSuperTitle}}</h5>\n" +
    "\n" +
    "        <h4>Professional Summary</h4>\n" +
    "        <h5>{{resume.EmploymentHistory.employeeProfessionalSummary}}</h5>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "      <h4>Development Skills</h4>\n" +
    "      <div ng-repeat=\"skillRole in resume.skills | filter:view.skillFilter | orderBy:skillRole.name\" >\n" +
    "        {{skillRole.name}}\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-8 chosen-resume-main\">\n" +
    "      <h4>Professional Experience</h4>\n" +
    "      <div ng-repeat=\"emplyr in resume.employmentHistory\">\n" +
    "        <div class=\"well1\" ng-repeat=\"pos in emplyr.positions\">\n" +
    "          <h4><a href=\"#\" class=\"employerOrgName\" e-placeholder=\"Service Provider Organization Name\">{{ emplyr.employerOrgName || \"empty\" }}</a></h4>\n" +
    "          <h4 class=\"clientName contact-info\">    {{ pos.clientName || \"empty\" }}</h4>\n" +
    "          <h4 class=\"positionTitle contact-info\"> {{ pos.title      || \"empty\" }}</h4>\n" +
    "          <span>                     {{ pos.startDate  || \"empty\" }}</span><span> to </span>\n" +
    "          <span>                     {{ pos.endDate    || \"empty\" }}</span>\n" +
    "          <div class=\"resume-descr\"\n" +
    "               ng-model=\"description\"\n" +
    "               ng-bind-html=\"pos.description\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div> <!-- content col end -->\n" +
    "  </div> <!-- row end -->\n" +
    "</div> <!-- resume-preview-parent div end -->\n" +
    "\n" +
    "\n" +
    "");
}]);
