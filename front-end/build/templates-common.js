angular.module('templates-common', ['templates/navbar-header.tpl.html', 'templates/search-form.tpl.html', 'templates/user-login.tpl.html']);

angular.module("templates/navbar-header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navbar-header.tpl.html",
    "<nav class=\"navbar navbar-default navbar-static-top\">\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"navbar-header\">\n" +
    "            <button type=\"button\" ng-click=\"global.toggleNavVis()\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\".navbar-collapse\" aria-expanded=\"false\" aria-controls=\".navbar-collapse\">\n" +
    "                <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "                <span class=\"icon-bar\"></span>\n" +
    "            </button>\n" +
    "            <a class=\"navbar-brand\" ui-sref=\"home\">\n" +
    "                <img src=\"/assets/site/avalon-transparent.png\" ui-sref=\"home\"/>\n" +
    "                &#x2003;Resume Wrangler\n" +
    "            </a>\n" +
    "\n" +
    "            <form id=\"rw-global-search\" class=\"form-inline\" ng-submit=\"runGlobalSearch()\">\n" +
    "                <label>Search By: </label>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <select name=\"searchType\" ng-model=\"global.search.searchType\" class=\"form-control\">\n" +
    "                        <option ng-repeat=\"option in global.search.categories\" value=\"{{option}}\">{{option}}</option>\n" +
    "                    </select>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <input id=\"keywords-field\" class=\"form-control\" ng-model=\"global.search.query\" autofocus=\"autofocus\"/>\n" +
    "                    <button class=\"btn btn-primary\">\n" +
    "                        <i class=\"fa fa-search\"></i>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "                <ds-user-login></ds-user-login>\n" +
    "            </form>\n" +
    "\n" +
    "            <div class=\"navbar-collapse collapse navbar-right top\" ng-class=\"global.navVisible === 1 ? 'display-block' : ''\">\n" +
    "                <ul class=\"nav navbar-nav\">\n" +
    "                    <li ui-sref-active=\"active\">\n" +
    "                        <a href ui-sref=\"home\">\n" +
    "                            <i class=\"fa fa-home\"></i>\n" +
    "                            Home\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "                        <a href ui-sref=\"view({ firstName: session.firstName, lastName: session.lastName})\">\n" +
    "                            <i class=\"glyphicon glyphicon-eye-open\"></i> Resume\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "                        <a href ui-sref=\"projects\">\n" +
    "                            <i class=\"fa fa-edit\"></i>\n" +
    "                            Projects\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "                        <a href ui-sref=\"skills\">\n" +
    "                            <i class=\"fa fa-edit\"></i>\n" +
    "                            Skills\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                    <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "                        <a href ui-sref=\"admin\">\n" +
    "                            <i class=\"fa fa-edit\"></i>\n" +
    "                            Admin\n" +
    "                        </a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</nav>");
}]);

angular.module("templates/search-form.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/search-form.tpl.html",
    "<form class=\"ds-navbar-search-form\" role=\"search\" ng-submit=\"runSearch()\" novalidate>\n" +
    "  <!-- Input Group -->\n" +
    "  <div class=\"input-group\">\n" +
    "    <!-- Query -->\n" +
    "    <!-- <input type=\"text\" class=\"form-control\" placeholder=\"Search by title, keyword, ID and more...\" ng-model=\"query\" options=\"typeaheadOptions\" datasets=\"typeaheadData\" sf-typeahead autofocus> -->\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"query\" placeholder=\"Search by skill..\" autofocus>\n" +
    "\n" +
    "      <!-- Clear Search Button -->\n" +
    "      <!-- <i class=\"fa fa-times\" ng-click=\"clearSearch()\" ng-show=\"query || query.length > 0\"></i> -->\n" +
    "\n" +
    "      <!-- Submit -->\n" +
    "      <span class=\"input-group-btn\">\n" +
    "        <button class=\"btn btn-primary\" type=\"submit\">Go</button>\n" +
    "      </span>\n" +
    "    </div>\n" +
    "</form>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("templates/user-login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/user-login.tpl.html",
    "<div id=\"rw-google-login-wrapper\">\n" +
    "<div id=\"google-login\" class=\"g-signin2 btn\" data-onsuccess=\"onSignIn\"></div>\n" +
    "<div class=\"rw-user-login-status-wrapper\">\n" +
    "    <span class=\"rw-google-user-role\" ng-show=\"isAuthenticated\">As: {{session.userName}}</span>\n" +
    "    <a class=\"rw-sign-out\" href=\"#\" ng-show=\"isAuthenticated\" ng-click=\"signOut()\">Sign out</a>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- https://developers.google.com/+/web/signin/customize\n" +
    "\n" +
    " <div id=\"gSignInWrapper\">\n" +
    "    <span class=\"label\">Sign in with:</span>\n" +
    "    <div id=\"loginBtn\" class=\"customGPlusSignIn\" data-onsuccess=\"onSignIn\">\n" +
    "        <span class=\"icon\"></span>\n" +
    "        <span class=\"buttonText\">Google</span>\n" +
    "        <a ng-show=\"loggedIn\" href=\"#\" onclick=\"signOut()\">Sign out</a>\n" +
    "    </div>\n" +
    "</div> -->\n" +
    "");
}]);
