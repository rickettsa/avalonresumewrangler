angular.module('templates-common', ['templates/navbar-header.tpl.html', 'templates/search-form.tpl.html', 'templates/user-login.tpl.html']);

angular.module("templates/navbar-header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/navbar-header.tpl.html",
    "<nav class=\"navbar navbar-default \" role=\"navigation\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "       <a class=\"navbar-brand level1-80\" ui-sref=\"home\">\n" +
    "                <img src=\"/assets/site/avalon-transparent.png\" ui-sref=\"home\"/> &#x2003;Resume Wrangler\n" +
    "            </a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">       \n" +
    "      <div class=\"search-form\">\n" +
    "        <form class=\"form-inline\" ng-submit=\"runGlobalSearch()\">  \n" +
    "             \n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"exampleInputName2\">Search By:</label>\n" +
    "            <select name=\"searchType\" ng-model=\"global.search.searchType\" class=\"form-control \">\n" +
    "              <option ng-repeat=\"option in global.search.categories\" value=\"{{option}}\">{{option}}</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "          \n" +
    "          <div class=\"form-group\">\n" +
    "            <label for=\"exampleInputEmail2\"></label>\n" +
    "            <input id=\"keywords-field\" class=\"form-control search-input\" ng-model=\"global.search.query\" autofocus=\"autofocus\"/>\n" +
    "          </div>\n" +
    "      \n" +
    "          <button type=\"submit\" class=\"btn btn-default search-submit\" type=\"button\">\n" +
    "            <span class=\"glyphicon glyphicon-search\"></span> Search\n" +
    "          </button>\n" +
    "        \n" +
    "          <div class=\"login-full-screen text-right\">\n" +
    "            <ds-user-login></ds-user-login>\n" +
    "          </div>  \n" +
    "          \n" +
    "        </form>     \n" +
    "      </div>\n" +
    "             \n" +
    "      <ul class=\"nav navbar-nav navbar-right user-small-screen\">    \n" +
    "        <li class=\"dropdown\">\n" +
    "          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Menu <span class=\"caret\"></span></a>\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "              <a href ui-sref=\"home\">\n" +
    "                <i class=\"fa fa-home\"></i>\n" +
    "                Home\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "              <a href ui-sref=\"view({ firstName: session.firstName, lastName: session.lastName})\">\n" +
    "                <i class=\"glyphicon glyphicon-eye-open\"></i> \n" +
    "                Resume\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "              <a href ui-sref=\"projects\">\n" +
    "                  <i class=\"fa fa-edit\"></i>\n" +
    "                  Projects\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li  ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "              <a href ui-sref=\"skills\">\n" +
    "                  <i class=\"fa fa-edit\"></i>\n" +
    "                  Skills\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li  ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "              <a href ui-sref=\"admin\">\n" +
    "                  <i class=\"fa fa-edit\"></i>\n" +
    "                  Admin\n" +
    "              </a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li>\n" +
    "              <div class=\"row\">\n" +
    "                <div class=\"bottom text-center\">\n" +
    "                  <ds-user-login></ds-user-login>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "				    </li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "      </ul>  \n" +
    "    </div><!-- /.navbar-collapse -->\n" +
    "  </div><!-- /.container-fluid -->\n" +
    "</nav>\n" +
    "\n" +
    "<div class=\"row \">\n" +
    "  <div class=\"col-md-12 \">\n" +
    "    <ul class=\"nav nav-pills user-nav\">\n" +
    "      <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "        <a href ui-sref=\"home\">\n" +
    "          <i class=\"fa fa-home\"></i>\n" +
    "          Home\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "        <a href ui-sref=\"view({ firstName: session.firstName, lastName: session.lastName})\">\n" +
    "          <i class=\"glyphicon glyphicon-eye-open\"></i> Resume\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "        <a href ui-sref=\"projects\">\n" +
    "          <i class=\"fa fa-edit\"></i>\n" +
    "          Projects\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "        <a href ui-sref=\"skills\">\n" +
    "          <i class=\"fa fa-edit\"></i>\n" +
    "          Skills\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li ui-sref-active=\"active\" ng-if=\"isAuthorized(['editor','admin'])\">\n" +
    "        <a href ui-sref=\"admin\">\n" +
    "          <i class=\"fa fa-edit\"></i>\n" +
    "          Admin\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>        \n" +
    "  </div>   \n" +
    "</div>\n" +
    "\n" +
    "");
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
