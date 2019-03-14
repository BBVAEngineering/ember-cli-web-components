"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment","ember-cli-web-components"],function(e,t,o,n,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var i=Ember.Application.extend({modulePrefix:n.default.modulePrefix,podModulePrefix:n.default.podModulePrefix,Resolver:t.default});(0,o.default)(i,n.default.modulePrefix),(0,a.defineCustomElements)({"my-component":{name:"my-component",attributes:["title"]}})
var l=i
e.default=l}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=o}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function o(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var o
if("undefined"!=typeof window)o=window
else if("undefined"!=typeof global)o=global
else{if("undefined"==typeof self)return
o=self}var n,a=t.default.exportApplicationGlobal
n="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),o[n]||(o[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete o[n]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=o,e.default=void 0
var n={name:"export-application-global",initialize:o}
e.default=n}),define("dummy/pods/components/my-component/component",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({tagName:"button",attributeBindings:["title"]})
e.default=t}),define("dummy/pods/components/my-component/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"wxIPYE6/",block:'{"symbols":["&default"],"statements":[[1,[21,"title"],false],[0,"\\n\\n"],[14,1],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/pods/components/my-component/template.hbs"}})
e.default=t}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=t.default
e.default=o}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var o=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
o.map(function(){})
var n=o
e.default=n}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"qHSYycrK",block:'{"symbols":[],"statements":[[0,"\\n"],[1,[21,"outlet"],false],[0,"\\n\\n"],[7,"my-component"],[11,"title","bar"],[11,"onclick","javascript: console.log(\'foo\')"],[9],[0,"Content"],[10],[0,"\\n\\n"],[5,"my-component",[],[["@title"],["bar"]],{"statements":[[0,"Content"]],"parameters":[]}]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t}),define("dummy/config/environment",[],function(){var e={default:{modulePrefix:"dummy",podModulePrefix:"dummy/pods",environment:"production",rootURL:"/ember-cli-web-components/",locationType:"hash",EmberENV:{FEATURES:{},EXTEND_PROTOTYPES:{Date:!1},_JQUERY_INTEGRATION:!1},APP:{autoboot:!1},exportApplicationGlobal:!1}}
return Object.defineProperty(e,"__esModule",{value:!0}),e}),runningTests||require("dummy/app").default.create({autoboot:!1})
