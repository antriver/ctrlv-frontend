angular.module('ctrlv').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/image.html',
    "<ng-include src=\"'views/partials/current-user.html'\"></ng-include>\n" +
    "test\n" +
    "Image page!\n" +
    "\n" +
    "        {{ imageId }}\n" +
    "        {{ image }}\n" +
    "\n" +
    "        <a ui-sref=\".test\">Show List</a>\n" +
    "\n" +
    "        <div ui-view></div>\n" +
    "\n" +
    "        <img src=\"{{ image.urls.image }}\" />\n"
  );


  $templateCache.put('views/image/test.html',
    "<h3>List of Route 1 Items</h3>\n" +
    "<ul>\n" +
    "  <li ng-repeat=\"item in items\">{{item}}</li>\n" +
    "</ul>\n"
  );


  $templateCache.put('views/index.html',
    "\n" +
    "<div class=\"content\">\n" +
    "\n" +
    "    <h1>Hello World!</h1>\n" +
    "\n" +
    "    <h2>here's more</h2>\n" +
    "\n" +
    "    <span ng-bind=\"sessionKey\"></span>\n" +
    "    <span>{{username}}</span>\n" +
    "\n" +
    "    <pre>{{ session }}</pre>\n" +
    "\n" +
    "    <i class=\"typ typ-weather-stormy\"></i>\n" +
    "\n" +
    "    <a ui-sref=\"image\" class=\"btn btn-primary\"><i class=\"typ typ-weather-partly-sunny\"></i> Hello World</a>\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('views/login.html',
    "<form>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputEmail1\">Email address</label>\n" +
    "    <input type=\"email\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Email\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputPassword1\">Password</label>\n" +
    "    <input type=\"password\" class=\"form-control\" id=\"exampleInputPassword1\" placeholder=\"Password\">\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputFile\">File input</label>\n" +
    "    <input type=\"file\" id=\"exampleInputFile\">\n" +
    "    <p class=\"help-block\">Example block-level help text here.</p>\n" +
    "  </div>\n" +
    "  <div class=\"checkbox\">\n" +
    "    <label>\n" +
    "      <input type=\"checkbox\"> Check me out\n" +
    "    </label>\n" +
    "  </div>\n" +
    "  <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "</form>\n"
  );


  $templateCache.put('views/partials/current-user.html',
    "<div class=\"content\">\n" +
    "    {{ $root.session }}\n" +
    "\n" +
    "Current user: {{ $root.currentUser }}\n" +
    "</div>\n"
  );


  $templateCache.put('views/user/images.html',
    "{{ username }}\n" +
    "{{ images }}\n" +
    "\n" +
    "<div ng-repeat=\"image in images\">\n" +
    "    <img src=\"{{ image.urls.thumbnail }}\" />\n" +
    "</div>\n"
  );

}]);
