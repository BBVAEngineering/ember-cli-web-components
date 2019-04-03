"use strict"
define("dummy/app",["exports","dummy/resolver","ember-load-initializers","dummy/config/environment","ember-cli-web-components"],function(e,t,n,o,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var m=Ember.Application.extend({modulePrefix:o.default.modulePrefix,podModulePrefix:o.default.podModulePrefix,Resolver:t.default});(0,n.default)(m,o.default.modulePrefix),(0,a.defineCustomElements)({"my-component":{name:"my-component"},"my-increment":{name:"my-increment"},"my-slot":{name:"my-slot"},"my-named-slot":{name:"my-named-slot"}})
var d=m
e.default=d}),define("dummy/initializers/container-debug-adapter",["exports","ember-resolver/resolvers/classic/container-debug-adapter"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0]
e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}
e.default=n}),define("dummy/initializers/export-application-global",["exports","dummy/config/environment"],function(e,t){function n(){var e=arguments[1]||arguments[0]
if(!1!==t.default.exportApplicationGlobal){var n
if("undefined"!=typeof window)n=window
else if("undefined"!=typeof global)n=global
else{if("undefined"==typeof self)return
n=self}var o,a=t.default.exportApplicationGlobal
o="string"==typeof a?a:Ember.String.classify(t.default.modulePrefix),n[o]||(n[o]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete n[o]}}))}}Object.defineProperty(e,"__esModule",{value:!0}),e.initialize=n,e.default=void 0
var o={name:"export-application-global",initialize:n}
e.default=o}),define("dummy/pods/components/my-component/component",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({tagName:""})
e.default=t}),define("dummy/pods/components/my-component/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"6SJC9py2",block:'{"symbols":["&default"],"statements":[[7,"style"],[9],[0,"\\n\\tp {\\n\\t\\tbackground: #209cee;\\n\\t\\tcolor: white;\\n\\t\\tpadding: 2rem 4rem;\\n\\t\\tborder: 0;\\n\\t\\tfont-size: 1.5rem;\\n\\t}\\n"],[10],[0,"\\n\\n"],[7,"p"],[9],[14,1],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/pods/components/my-component/template.hbs"}})
e.default=t}),define("dummy/pods/components/my-increment/component",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({tagName:"",actions:{increment:function(){var e=this.getWithDefault("value",0)
this.set("value",e+1)}}})
e.default=t}),define("dummy/pods/components/my-increment/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"pxuiYJOv",block:'{"symbols":[],"statements":[[7,"style"],[9],[0,"\\n\\tbutton {\\n\\t\\tbackground: #01d1b2;\\n\\t\\tcolor: white;\\n\\t\\tpadding: 2rem 4rem;\\n\\t\\tborder: 0;\\n\\t\\tfont-size: 1.5rem;\\n\\t\\twidth: 100%;\\n\\t}\\n"],[10],[0,"\\n\\n"],[7,"button"],[9],[0,"\\n"],[4,"unless",[[23,["value"]]],null,{"statements":[[0,"\\t\\tClick me!\\n"]],"parameters":[]},{"statements":[[0,"\\t\\tClicked "],[1,[21,"value"],false],[0," times\\n"]],"parameters":[]}],[3,"action",[[22,0,[]],"increment"]],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/pods/components/my-increment/template.hbs"}})
e.default=t}),define("dummy/pods/components/my-named-slot/component",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({tagName:""})
e.default=t}),define("dummy/pods/components/my-named-slot/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"oOjtiC8g",block:'{"symbols":[],"statements":[[7,"style"],[9],[0,"\\n\\t.block {\\n\\t\\tbackground: #ff3760;\\n\\t\\tcolor: black;\\n\\t\\tpadding: 1rem 4rem;\\n\\t\\tborder: 0;\\n\\t\\tfont-size: 1.5rem;\\n\\t}\\n"],[10],[0,"\\n\\n"],[7,"div"],[11,"class","block"],[9],[0,"\\n\\t"],[7,"h2"],[9],[7,"slot"],[11,"name","header"],[9],[10],[10],[0,"\\n\\t"],[7,"p"],[9],[7,"slot"],[11,"name","paragraph"],[9],[10],[10],[0,"\\n"],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/pods/components/my-named-slot/template.hbs"}})
e.default=t}),define("dummy/pods/components/my-slot/component",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.Component.extend({tagName:""})
e.default=t}),define("dummy/pods/components/my-slot/template",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"+xICXSFw",block:'{"symbols":[],"statements":[[7,"style"],[9],[0,"\\n\\tp {\\n\\t\\tbackground: #b86cff;\\n\\t\\tcolor: white;\\n\\t\\tpadding: 1rem 4rem;\\n\\t\\tborder: 0;\\n\\t\\tfont-size: 1.5rem;\\n\\t}\\n"],[10],[0,"\\n\\n"],[7,"p"],[9],[7,"slot"],[9],[0,"Placeholder"],[10],[10],[0,"\\n"]],"hasEval":false}',meta:{moduleName:"dummy/pods/components/my-slot/template.hbs"}})
e.default=t}),define("dummy/resolver",["exports","ember-resolver"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=t.default
e.default=n}),define("dummy/router",["exports","dummy/config/environment"],function(e,t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var n=Ember.Router.extend({location:t.default.locationType,rootURL:t.default.rootURL})
n.map(function(){})
var o=n
e.default=o}),define("dummy/templates/application",["exports"],function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=Ember.HTMLBars.template({id:"qHSYycrK",block:'{"symbols":[],"statements":[[0,"\\n"],[1,[21,"outlet"],false],[0,"\\n\\n"],[7,"my-component"],[11,"title","bar"],[11,"onclick","javascript: console.log(\'foo\')"],[9],[0,"Content"],[10],[0,"\\n\\n"],[5,"my-component",[],[["@title"],["bar"]],{"statements":[[0,"Content"]],"parameters":[]}]],"hasEval":false}',meta:{moduleName:"dummy/templates/application.hbs"}})
e.default=t}),define("dummy/config/environment",[],function(){var e={default:{modulePrefix:"dummy",podModulePrefix:"dummy/pods",environment:"production",rootURL:"/ember-cli-web-components/",locationType:"hash",EmberENV:{FEATURES:{},EXTEND_PROTOTYPES:{Date:!1},_JQUERY_INTEGRATION:!1},APP:{autoboot:!1},exportApplicationGlobal:!1}}
return Object.defineProperty(e,"__esModule",{value:!0}),e}),runningTests||require("dummy/app").default.create({autoboot:!1})
