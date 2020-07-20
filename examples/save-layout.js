// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"FheM":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"TUK3":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"FheM"}],"VRYX":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require("_bundle_loader")(require.resolve('./shared-import')).then(({
  React,
  ReactDOM,
  jsxTab,
  htmlTab,
  DockLayout
}) => {
  let tab1 = {
    id: 't1',
    title: 'Tab 1',
    content: /*#__PURE__*/React.createElement("div", null, "Tab 1")
  };
  let tab2 = {
    id: 't2',
    title: 'Tab 2',
    content: /*#__PURE__*/React.createElement("div", null, "Tab 2")
  };
  let tab3 = {
    id: 't3',
    title: 'Tab 3',
    content: /*#__PURE__*/React.createElement("div", null, "Tab 3")
  };
  let tab4 = {
    id: 't4',
    title: 'Tab 4',
    content: /*#__PURE__*/React.createElement("div", null, "Tab 4")
  };
  let tab5 = {
    id: 't5',
    title: 'Tab 5',
    content: /*#__PURE__*/React.createElement("div", null, "Tab 5")
  };
  let tab6 = {
    id: 't6',
    title: 'Tab 6',
    content: /*#__PURE__*/React.createElement("div", null, "Tab 6")
  };
  let defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        mode: 'vertical',
        children: [{
          tabs: [tab1, jsxTab, htmlTab]
        }, {
          tabs: [tab2, tab3, tab4]
        }]
      }, {
        tabs: [tab5, tab6]
      }]
    }
  };
  let panelLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        tabs: [{
          id: 't1'
        }, {
          id: 't2'
        }, {
          id: 't3'
        }, {
          id: 't4'
        }, {
          id: 't5'
        }, {
          id: 't6'
        }, {
          id: 'jsxTab'
        }, {
          id: 'htmlTab'
        }]
      }]
    }
  };
  let horizontalLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [{
        tabs: [{
          id: 't1'
        }, {
          id: 'jsxTab'
        }, {
          id: 'htmlTab'
        }]
      }, {
        tabs: [{
          id: 't2'
        }]
      }, {
        tabs: [{
          id: 't3'
        }]
      }, {
        tabs: [{
          id: 't4'
        }]
      }, {
        tabs: [{
          id: 't5'
        }]
      }, {
        tabs: [{
          id: 't6'
        }]
      }]
    }
  };

  class Demo extends React.Component {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "getRef", r => {
        this.dockLayout = r;
      });

      _defineProperty(this, "state", {
        saved: null
      });
    }

    render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DockLayout, {
        ref: this.getRef,
        defaultLayout: defaultLayout,
        style: {
          position: 'absolute',
          left: 10,
          top: 60,
          right: 10,
          bottom: 10
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "top-panel"
      }, "Save Layout:", /*#__PURE__*/React.createElement("button", {
        style: {
          marginRight: 20
        },
        onClick: () => this.setState({
          saved: this.dockLayout.saveLayout()
        })
      }, "Save"), "Load Layout:", /*#__PURE__*/React.createElement("button", {
        onClick: () => this.dockLayout.loadLayout(horizontalLayout)
      }, "Horizontal"), /*#__PURE__*/React.createElement("button", {
        onClick: () => this.dockLayout.loadLayout(panelLayout)
      }, "Single Panel"), /*#__PURE__*/React.createElement("button", {
        disabled: this.state.saved == null,
        onClick: () => this.dockLayout.loadLayout(this.state.saved)
      }, "Saved Layout")));
    }

  }

  ReactDOM.render( /*#__PURE__*/React.createElement(Demo, null), document.getElementById('app'));
});
},{"_bundle_loader":"TUK3","./shared-import":[["shared-import.js","FeNK"],"FeNK"]}],"Yi9z":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("TUK3");b.register("js",require("Yi9z"));
},{}]},{},[0,"VRYX"], null)