angular.module('ctrlv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/home.html',
    "<div id=\"uploader\">\n" +
    "\n" +
    "    <div id=\"uploader-collage\" ng-bind-html=\"sprites\"></div>\n" +
    "\n" +
    "    <div class=\"upload-status\" id=\"upload-waiting\">\n" +
    "        <h2>The <span class=\"green\">easiest</span> way to share photos.</h2>\n" +
    "        <h3>\n" +
    "            <i class=\"spinner-waiting\"></i>\n" +
    "            Press <span ng-if=\"mac\" class=\"btn btn-cmd\">cmd &#8984;</span><span ng-if=\"!mac\" class=\"btn btn-ctrl\">Ctrl</span>\n" +
    "            + <span class=\"btn btn-v\">V</span> to paste an image,\n" +
    "            or <a href=\"#\" class=\"btn\"><i class=\"typ typ-cloud-storage\"></i> select files to upload</a>\n" +
    "        </h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"upload-status out\" id=\"upload-loading\">\n" +
    "        <h3><i class=\"spinner-loading\"></i> Uploading...</h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"upload-status out\" id=\"upload-error\">\n" +
    "        <h3>Error</h3>\n" +
    "        <p></p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"upload-status out\" id=\"upload-complete\">\n" +
    "        <h3>Uploaded!</h3>\n" +
    "        <p>\n" +
    "            <label>\n" +
    "                Here's your link\n" +
    "                <input type=\"text\" id=\"newImageURL\" class=\"green\" readonly=\"readonly\" />\n" +
    "            </label>\n" +
    "        </p>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/image.html',
    "\n" +
    "\n" +
    "<div class=\"img-wrapper\">\n" +
    "\n" +
    "    <div ng-if=\"loading\">\n" +
    "        <i class=\"spinner-loading dark\"></i>\n" +
    "    </div>\n" +
    "\n" +
    "    <img\n" +
    "        ng-if=\"!loading && image\"\n" +
    "        ng-src=\"{{ image.image.url }}\"\n" +
    "        class=\"img\"\n" +
    "        />\n" +
    "\n" +
    "    <div ng-if=\"!loading\" class=\"img-details\">\n" +
    "        Uploaded by <a href=\"#\">Jimmenybillybob</a>\n" +
    "        <div class=\"img-tools\">\n" +
    "            <a class=\"btn\">Crop</a>\n" +
    "            <a class=\"btn\">Rotate</a>\n" +
    "            <a class=\"btn\">Delete</a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/modals/login.html',
    "<div class=\"modal\" ng-click=\"close()\">\n" +
    "    <div class=\"modal-content\" ng-click=\"$event.stopPropagation()\">\n" +
    "\n" +
    "        <label>Username <input type=\"text\" ng-model=\"username\" name=\"username\" /></label>\n" +
    "        <label>Password <input type=\"password\" ng-model=\"password\" name=\"password\" /></label>\n" +
    "\n" +
    "        <span ng-bind=\"username\"></span>\n" +
    "        <span ng-bind=\"password\"></span>\n" +
    "\n" +
    "        <a class=\"btn\" ng-click=\"login()\">Login</a>\n" +
    "        <a class=\"btn\" ng-click=\"close()\">Close</a>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/partials/album-sidebar.html',
    "<div class=\"album-sidebar\">\n" +
    "    <ul ng-if=\"albumImages.length > 0\" ng->\n" +
    "        <li ng-repeat=\"image in albumImages\">\n" +
    "            <img ng-src=\"{{ image.thumbnail.url }}\" />\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('views/partials/footer.html',
    "<footer>\n" +
    "\n" +
    "    <!--<div style=\"float:left;\">\n" +
    "        View:\n" +
    "        <a class=\"btn\" href=\"#\">Grid (Classic)</a>\n" +
    "        <a class=\"btn\" href=\"#\">Columns</a>\n" +
    "    </div>-->\n" +
    "\n" +
    "    <ul class=\"links\">\n" +
    "        <li>Created by <a href=\"https://themediadudes.com\">The Media Dudes</a></li>\n" +
    "        <li><a href=\"mailto:help@ctrlv.in\"><i class=\"typ typ-mail\"></i> Contact Us</a></li>\n" +
    "        <li><a ui-sref=\"terms\"><i class=\"typ typ-sort-alphabetically-outline\"></i> Terms of Use</a></li>\n" +
    "        <li><a ui-sref=\"privacy\"><i class=\"typ typ-lock-closed-outline\"></i> Privacy</a></li>\n" +
    "        <li><a ui-sref=\"help\"><i class=\"typ typ-info-large-outline\"></i> Help</a></li>\n" +
    "        <li><a href=\"https://api.ctrlv.in/docs\"><i class=\"typ typ-flow-switch\"></i> API</a></li>\n" +
    "    </ul>\n" +
    "</footer>\n"
  );


  $templateCache.put('views/partials/header.html',
    "<header class=\"clearfix\">\n" +
    "    <a ui-sref=\"home\" id=\"logo-container\">\n" +
    "        <img src=\"/assets/img/ctrlv.svg\" id=\"logo\" />\n" +
    "    </a>\n" +
    "\n" +
    "    <h1 ng-bind-html=\"title\"></h1>\n" +
    "\n" +
    "    <div  id=\"current-user\">\n" +
    "        <div ng-if=\"user === false\">\n" +
    "            <a id=\"login-btn\" class=\"btn\" href=\"#\" ng-click=\"login()\"><i class=\"typ typ-user\"></i> Login or Signup</a>\n" +
    "        </div>\n" +
    "        <div ng-if=\"user\">\n" +
    "            <h2>Hi <a ui-sref=\"user({ username: user.username.toLowerCase() })\" ng-bind=\"user.username\"></a></h2>\n" +
    "            <ul class=\"links\">\n" +
    "                <li><a ui-sref=\"user-favourites({ username: user.username.toLowerCase() })\"><i class=\"typ typ-heart-full-outline\"></i> Favourites</a></li>\n" +
    "                <li><a ui-sref=\"settings\"><i class=\"typ typ-spanner\"></i> Options</a></li>\n" +
    "                <li><a ui-sref=\"help\"><i class=\"typ typ-info-large-outline\"></i> Help</a></li>\n" +
    "                <li><a href=\"#\" ng-click=\"logout()\"><i class=\"typ typ-lock-open\"></i> Logout</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</header>\n"
  );


  $templateCache.put('views/partials/image-list.html',
    "\n" +
    "<ul ng-if=\"images.length > 0\" class=\"img-grid\">\n" +
    "    <li ng-repeat=\"image in images\">\n" +
    "        <a\n" +
    "            ui-sref=\"image({ imageId: image.imageId })\"\n" +
    "            ng-style=\"{'background-image': image.thumbnail ? '' : 'url('+ image.image.url + ')'}\"\n" +
    "            >\n" +
    "            <img ng-if=\"image.thumbnail\" class=\"img-thumb\" ng-src=\"{{ image.thumbnail.url }}\" />\n" +
    "        </a>\n" +
    "    </li>\n" +
    "</ul>\n"
  );


  $templateCache.put('views/user.html',
    "<div class=\"content\">\n" +
    "    <ng-include src=\"'views/partials/image-list.html'\"></ng-include>\n" +
    "</div>\n"
  );

}]);
