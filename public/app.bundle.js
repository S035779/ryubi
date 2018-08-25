/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "41b6f2f100ca9e7e6edd";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/fbemitter/index.js":
/*!******************************************!*\
  !*** ../node_modules/fbemitter/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var fbemitter = {
  EventEmitter: __webpack_require__(/*! ./lib/BaseEventEmitter */ "../node_modules/fbemitter/lib/BaseEventEmitter.js"),
  EmitterSubscription : __webpack_require__(/*! ./lib/EmitterSubscription */ "../node_modules/fbemitter/lib/EmitterSubscription.js")
};

module.exports = fbemitter;


/***/ }),

/***/ "../node_modules/fbemitter/lib/BaseEventEmitter.js":
/*!*********************************************************!*\
  !*** ../node_modules/fbemitter/lib/BaseEventEmitter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule BaseEventEmitter
 * @typechecks
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EmitterSubscription = __webpack_require__(/*! ./EmitterSubscription */ "../node_modules/fbemitter/lib/EmitterSubscription.js");
var EventSubscriptionVendor = __webpack_require__(/*! ./EventSubscriptionVendor */ "../node_modules/fbemitter/lib/EventSubscriptionVendor.js");

var emptyFunction = __webpack_require__(/*! fbjs/lib/emptyFunction */ "../node_modules/fbjs/lib/emptyFunction.js");
var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "../node_modules/fbjs/lib/invariant.js");

/**
 * @class BaseEventEmitter
 * @description
 * An EventEmitter is responsible for managing a set of listeners and publishing
 * events to them when it is told that such events happened. In addition to the
 * data for the given event it also sends a event control object which allows
 * the listeners/handlers to prevent the default behavior of the given event.
 *
 * The emitter is designed to be generic enough to support all the different
 * contexts in which one might want to emit events. It is a simple multicast
 * mechanism on top of which extra functionality can be composed. For example, a
 * more advanced emitter may use an EventHolder and EventFactory.
 */

var BaseEventEmitter = (function () {
  /**
   * @constructor
   */

  function BaseEventEmitter() {
    _classCallCheck(this, BaseEventEmitter);

    this._subscriber = new EventSubscriptionVendor();
    this._currentSubscription = null;
  }

  /**
   * Adds a listener to be invoked when events of the specified type are
   * emitted. An optional calling context may be provided. The data arguments
   * emitted will be passed to the listener function.
   *
   * TODO: Annotate the listener arg's type. This is tricky because listeners
   *       can be invoked with varargs.
   *
   * @param {string} eventType - Name of the event to listen to
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  BaseEventEmitter.prototype.addListener = function addListener(eventType, listener, context) {
    return this._subscriber.addSubscription(eventType, new EmitterSubscription(this._subscriber, listener, context));
  };

  /**
   * Similar to addListener, except that the listener is removed after it is
   * invoked once.
   *
   * @param {string} eventType - Name of the event to listen to
   * @param {function} listener - Function to invoke only once when the
   *   specified event is emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  BaseEventEmitter.prototype.once = function once(eventType, listener, context) {
    var emitter = this;
    return this.addListener(eventType, function () {
      emitter.removeCurrentListener();
      listener.apply(context, arguments);
    });
  };

  /**
   * Removes all of the registered listeners, including those registered as
   * listener maps.
   *
   * @param {?string} eventType - Optional name of the event whose registered
   *   listeners to remove
   */

  BaseEventEmitter.prototype.removeAllListeners = function removeAllListeners(eventType) {
    this._subscriber.removeAllSubscriptions(eventType);
  };

  /**
   * Provides an API that can be called during an eventing cycle to remove the
   * last listener that was invoked. This allows a developer to provide an event
   * object that can remove the listener (or listener map) during the
   * invocation.
   *
   * If it is called when not inside of an emitting cycle it will throw.
   *
   * @throws {Error} When called not during an eventing cycle
   *
   * @example
   *   var subscription = emitter.addListenerMap({
   *     someEvent: function(data, event) {
   *       console.log(data);
   *       emitter.removeCurrentListener();
   *     }
   *   });
   *
   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
   *   emitter.emit('someEvent', 'def'); // does not log anything
   */

  BaseEventEmitter.prototype.removeCurrentListener = function removeCurrentListener() {
    !!!this._currentSubscription ?  true ? invariant(false, 'Not in an emitting cycle; there is no current subscription') : undefined : undefined;
    this._subscriber.removeSubscription(this._currentSubscription);
  };

  /**
   * Returns an array of listeners that are currently registered for the given
   * event.
   *
   * @param {string} eventType - Name of the event to query
   * @return {array}
   */

  BaseEventEmitter.prototype.listeners = function listeners(eventType) /* TODO: Array<EventSubscription> */{
    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    return subscriptions ? subscriptions.filter(emptyFunction.thatReturnsTrue).map(function (subscription) {
      return subscription.listener;
    }) : [];
  };

  /**
   * Emits an event of the given type with the given data. All handlers of that
   * particular type will be notified.
   *
   * @param {string} eventType - Name of the event to emit
   * @param {*} Arbitrary arguments to be passed to each registered listener
   *
   * @example
   *   emitter.addListener('someEvent', function(message) {
   *     console.log(message);
   *   });
   *
   *   emitter.emit('someEvent', 'abc'); // logs 'abc'
   */

  BaseEventEmitter.prototype.emit = function emit(eventType) {
    var subscriptions = this._subscriber.getSubscriptionsForType(eventType);
    if (subscriptions) {
      var keys = Object.keys(subscriptions);
      for (var ii = 0; ii < keys.length; ii++) {
        var key = keys[ii];
        var subscription = subscriptions[key];
        // The subscription may have been removed during this event loop.
        if (subscription) {
          this._currentSubscription = subscription;
          this.__emitToSubscription.apply(this, [subscription].concat(Array.prototype.slice.call(arguments)));
        }
      }
      this._currentSubscription = null;
    }
  };

  /**
   * Provides a hook to override how the emitter emits an event to a specific
   * subscription. This allows you to set up logging and error boundaries
   * specific to your environment.
   *
   * @param {EmitterSubscription} subscription
   * @param {string} eventType
   * @param {*} Arbitrary arguments to be passed to each registered listener
   */

  BaseEventEmitter.prototype.__emitToSubscription = function __emitToSubscription(subscription, eventType) {
    var args = Array.prototype.slice.call(arguments, 2);
    subscription.listener.apply(subscription.context, args);
  };

  return BaseEventEmitter;
})();

module.exports = BaseEventEmitter;

/***/ }),

/***/ "../node_modules/fbemitter/lib/EmitterSubscription.js":
/*!************************************************************!*\
  !*** ../node_modules/fbemitter/lib/EmitterSubscription.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule EmitterSubscription
 * @typechecks
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventSubscription = __webpack_require__(/*! ./EventSubscription */ "../node_modules/fbemitter/lib/EventSubscription.js");

/**
 * EmitterSubscription represents a subscription with listener and context data.
 */

var EmitterSubscription = (function (_EventSubscription) {
  _inherits(EmitterSubscription, _EventSubscription);

  /**
   * @param {EventSubscriptionVendor} subscriber - The subscriber that controls
   *   this subscription
   * @param {function} listener - Function to invoke when the specified event is
   *   emitted
   * @param {*} context - Optional context object to use when invoking the
   *   listener
   */

  function EmitterSubscription(subscriber, listener, context) {
    _classCallCheck(this, EmitterSubscription);

    _EventSubscription.call(this, subscriber);
    this.listener = listener;
    this.context = context;
  }

  return EmitterSubscription;
})(EventSubscription);

module.exports = EmitterSubscription;

/***/ }),

/***/ "../node_modules/fbemitter/lib/EventSubscription.js":
/*!**********************************************************!*\
  !*** ../node_modules/fbemitter/lib/EventSubscription.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule EventSubscription
 * @typechecks
 */



/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventSubscription = (function () {

  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */

  function EventSubscription(subscriber) {
    _classCallCheck(this, EventSubscription);

    this.subscriber = subscriber;
  }

  /**
   * Removes this subscription from the subscriber that controls it.
   */

  EventSubscription.prototype.remove = function remove() {
    if (this.subscriber) {
      this.subscriber.removeSubscription(this);
      this.subscriber = null;
    }
  };

  return EventSubscription;
})();

module.exports = EventSubscription;

/***/ }),

/***/ "../node_modules/fbemitter/lib/EventSubscriptionVendor.js":
/*!****************************************************************!*\
  !*** ../node_modules/fbemitter/lib/EventSubscriptionVendor.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 * 
 * @providesModule EventSubscriptionVendor
 * @typechecks
 */



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var invariant = __webpack_require__(/*! fbjs/lib/invariant */ "../node_modules/fbjs/lib/invariant.js");

/**
 * EventSubscriptionVendor stores a set of EventSubscriptions that are
 * subscribed to a particular event type.
 */

var EventSubscriptionVendor = (function () {
  function EventSubscriptionVendor() {
    _classCallCheck(this, EventSubscriptionVendor);

    this._subscriptionsForType = {};
    this._currentSubscription = null;
  }

  /**
   * Adds a subscription keyed by an event type.
   *
   * @param {string} eventType
   * @param {EventSubscription} subscription
   */

  EventSubscriptionVendor.prototype.addSubscription = function addSubscription(eventType, subscription) {
    !(subscription.subscriber === this) ?  true ? invariant(false, 'The subscriber of the subscription is incorrectly set.') : undefined : undefined;
    if (!this._subscriptionsForType[eventType]) {
      this._subscriptionsForType[eventType] = [];
    }
    var key = this._subscriptionsForType[eventType].length;
    this._subscriptionsForType[eventType].push(subscription);
    subscription.eventType = eventType;
    subscription.key = key;
    return subscription;
  };

  /**
   * Removes a bulk set of the subscriptions.
   *
   * @param {?string} eventType - Optional name of the event type whose
   *   registered supscriptions to remove, if null remove all subscriptions.
   */

  EventSubscriptionVendor.prototype.removeAllSubscriptions = function removeAllSubscriptions(eventType) {
    if (eventType === undefined) {
      this._subscriptionsForType = {};
    } else {
      delete this._subscriptionsForType[eventType];
    }
  };

  /**
   * Removes a specific subscription. Instead of calling this function, call
   * `subscription.remove()` directly.
   *
   * @param {object} subscription
   */

  EventSubscriptionVendor.prototype.removeSubscription = function removeSubscription(subscription) {
    var eventType = subscription.eventType;
    var key = subscription.key;

    var subscriptionsForType = this._subscriptionsForType[eventType];
    if (subscriptionsForType) {
      delete subscriptionsForType[key];
    }
  };

  /**
   * Returns the array of subscriptions that are currently registered for the
   * given event type.
   *
   * Note: This array can be potentially sparse as subscriptions are deleted
   * from it when they are removed.
   *
   * TODO: This returns a nullable array. wat?
   *
   * @param {string} eventType
   * @return {?array}
   */

  EventSubscriptionVendor.prototype.getSubscriptionsForType = function getSubscriptionsForType(eventType) {
    return this._subscriptionsForType[eventType];
  };

  return EventSubscriptionVendor;
})();

module.exports = EventSubscriptionVendor;

/***/ }),

/***/ "../node_modules/fbjs/lib/ExecutionEnvironment.js":
/*!********************************************************!*\
  !*** ../node_modules/fbjs/lib/ExecutionEnvironment.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),

/***/ "../node_modules/fbjs/lib/camelize.js":
/*!********************************************!*\
  !*** ../node_modules/fbjs/lib/camelize.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _hyphenPattern = /-(.)/g;

/**
 * Camelcases a hyphenated string, for example:
 *
 *   > camelize('background-color')
 *   < "backgroundColor"
 *
 * @param {string} string
 * @return {string}
 */
function camelize(string) {
  return string.replace(_hyphenPattern, function (_, character) {
    return character.toUpperCase();
  });
}

module.exports = camelize;

/***/ }),

/***/ "../node_modules/fbjs/lib/camelizeStyleName.js":
/*!*****************************************************!*\
  !*** ../node_modules/fbjs/lib/camelizeStyleName.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var camelize = __webpack_require__(/*! ./camelize */ "../node_modules/fbjs/lib/camelize.js");

var msPattern = /^-ms-/;

/**
 * Camelcases a hyphenated CSS property name, for example:
 *
 *   > camelizeStyleName('background-color')
 *   < "backgroundColor"
 *   > camelizeStyleName('-moz-transition')
 *   < "MozTransition"
 *   > camelizeStyleName('-ms-transition')
 *   < "msTransition"
 *
 * As Andi Smith suggests
 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
 * is converted to lowercase `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
}

module.exports = camelizeStyleName;

/***/ }),

/***/ "../node_modules/fbjs/lib/containsNode.js":
/*!************************************************!*\
  !*** ../node_modules/fbjs/lib/containsNode.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var isTextNode = __webpack_require__(/*! ./isTextNode */ "../node_modules/fbjs/lib/isTextNode.js");

/*eslint-disable no-bitwise */

/**
 * Checks if a given DOM node contains or is another DOM node.
 */
function containsNode(outerNode, innerNode) {
  if (!outerNode || !innerNode) {
    return false;
  } else if (outerNode === innerNode) {
    return true;
  } else if (isTextNode(outerNode)) {
    return false;
  } else if (isTextNode(innerNode)) {
    return containsNode(outerNode, innerNode.parentNode);
  } else if ('contains' in outerNode) {
    return outerNode.contains(innerNode);
  } else if (outerNode.compareDocumentPosition) {
    return !!(outerNode.compareDocumentPosition(innerNode) & 16);
  } else {
    return false;
  }
}

module.exports = containsNode;

/***/ }),

/***/ "../node_modules/fbjs/lib/emptyFunction.js":
/*!*************************************************!*\
  !*** ../node_modules/fbjs/lib/emptyFunction.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ "../node_modules/fbjs/lib/emptyObject.js":
/*!***********************************************!*\
  !*** ../node_modules/fbjs/lib/emptyObject.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (true) {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;

/***/ }),

/***/ "../node_modules/fbjs/lib/getActiveElement.js":
/*!****************************************************!*\
  !*** ../node_modules/fbjs/lib/getActiveElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/* eslint-disable fb-www/typeof-undefined */

/**
 * Same as document.activeElement but wraps in a try-catch block. In IE it is
 * not safe to call document.activeElement if there is nothing focused.
 *
 * The activeElement will be null only if the document or document body is not
 * yet defined.
 *
 * @param {?DOMDocument} doc Defaults to current document.
 * @return {?DOMElement}
 */
function getActiveElement(doc) /*?DOMElement*/{
  doc = doc || (typeof document !== 'undefined' ? document : undefined);
  if (typeof doc === 'undefined') {
    return null;
  }
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}

module.exports = getActiveElement;

/***/ }),

/***/ "../node_modules/fbjs/lib/hyphenate.js":
/*!*********************************************!*\
  !*** ../node_modules/fbjs/lib/hyphenate.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var _uppercasePattern = /([A-Z])/g;

/**
 * Hyphenates a camelcased string, for example:
 *
 *   > hyphenate('backgroundColor')
 *   < "background-color"
 *
 * For CSS style names, use `hyphenateStyleName` instead which works properly
 * with all vendor prefixes, including `ms`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenate(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

module.exports = hyphenate;

/***/ }),

/***/ "../node_modules/fbjs/lib/hyphenateStyleName.js":
/*!******************************************************!*\
  !*** ../node_modules/fbjs/lib/hyphenateStyleName.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */



var hyphenate = __webpack_require__(/*! ./hyphenate */ "../node_modules/fbjs/lib/hyphenate.js");

var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, '-ms-');
}

module.exports = hyphenateStyleName;

/***/ }),

/***/ "../node_modules/fbjs/lib/invariant.js":
/*!*********************************************!*\
  !*** ../node_modules/fbjs/lib/invariant.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (true) {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),

/***/ "../node_modules/fbjs/lib/isNode.js":
/*!******************************************!*\
  !*** ../node_modules/fbjs/lib/isNode.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM node.
 */
function isNode(object) {
  var doc = object ? object.ownerDocument || object : document;
  var defaultView = doc.defaultView || window;
  return !!(object && (typeof defaultView.Node === 'function' ? object instanceof defaultView.Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
}

module.exports = isNode;

/***/ }),

/***/ "../node_modules/fbjs/lib/isTextNode.js":
/*!**********************************************!*\
  !*** ../node_modules/fbjs/lib/isTextNode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 */

var isNode = __webpack_require__(/*! ./isNode */ "../node_modules/fbjs/lib/isNode.js");

/**
 * @param {*} object The object to check.
 * @return {boolean} Whether or not the object is a DOM text node.
 */
function isTextNode(object) {
  return isNode(object) && object.nodeType == 3;
}

module.exports = isTextNode;

/***/ }),

/***/ "../node_modules/fbjs/lib/shallowEqual.js":
/*!************************************************!*\
  !*** ../node_modules/fbjs/lib/shallowEqual.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),

/***/ "../node_modules/fbjs/lib/warning.js":
/*!*******************************************!*\
  !*** ../node_modules/fbjs/lib/warning.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(/*! ./emptyFunction */ "../node_modules/fbjs/lib/emptyFunction.js");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (true) {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),

/***/ "../node_modules/iso8601-duration/lib/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/iso8601-duration/lib/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * @description A module for parsing ISO8601 durations
 */

/**
 * The pattern used for parsing ISO8601 duration (PnYnMnDTnHnMnS).
 * This does not cover the week format PnW.
 */

// PnYnMnDTnHnMnS
var numbers = '\\d+(?:[\\.,]\\d{0,3})?';
var weekPattern = '(' + numbers + 'W)';
var datePattern = '(' + numbers + 'Y)?(' + numbers + 'M)?(' + numbers + 'D)?';
var timePattern = 'T(' + numbers + 'H)?(' + numbers + 'M)?(' + numbers + 'S)?';

var iso8601 = 'P(?:' + weekPattern + '|' + datePattern + '(?:' + timePattern + ')?)';
var objMap = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds'];

/**
 * The ISO8601 regex for matching / testing durations
 */
var pattern = exports.pattern = new RegExp(iso8601);

/** Parse PnYnMnDTnHnMnS format to object
 * @param {string} durationString - PnYnMnDTnHnMnS formatted string
 * @return {Object} - With a property for each part of the pattern
 */
var parse = exports.parse = function parse(durationString) {
	// slice away first entry in match-array
	return durationString.match(pattern).slice(1).reduce(function (prev, next, idx) {
		prev[objMap[idx]] = parseFloat(next) || 0;
		return prev;
	}, {});
};

/**
 * Convert ISO8601 duration object to an end Date.
 *
 * @param {Object} duration - The duration object
 * @param {Date} startDate - The starting Date for calculating the duration
 * @return {Date} - The resulting end Date
 */
var end = exports.end = function end(duration, startDate) {
	// create two equal timestamps, add duration to 'then' and return time difference
	var timestamp = startDate ? startDate.getTime() : Date.now();
	var then = new Date(timestamp);

	then.setFullYear(then.getFullYear() + duration.years);
	then.setMonth(then.getMonth() + duration.months);
	then.setDate(then.getDate() + duration.days);
	then.setHours(then.getHours() + duration.hours);
	then.setMinutes(then.getMinutes() + duration.minutes);
	// then.setSeconds(then.getSeconds() + duration.seconds);
	then.setMilliseconds(then.getMilliseconds() + duration.seconds * 1000);
	// special case weeks
	then.setDate(then.getDate() + duration.weeks * 7);

	return then;
};

/**
 * Convert ISO8601 duration object to seconds
 *
 * @param {Object} duration - The duration object
 * @param {Date} startDate - The starting point for calculating the duration
 * @return {Number}
 */
var toSeconds = exports.toSeconds = function toSeconds(duration, startDate) {
	var timestamp = startDate ? startDate.getTime() : Date.now();
	var now = new Date(timestamp);
	var then = end(duration, startDate);

	var seconds = (then.getTime() - now.getTime()) / 1000;
	return seconds;
};

exports.default = {
	end: end,
	toSeconds: toSeconds,
	pattern: pattern,
	parse: parse
};

/***/ }),

/***/ "../node_modules/object-assign/index.js":
/*!**********************************************!*\
  !*** ../node_modules/object-assign/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "../node_modules/prop-types/checkPropTypes.js":
/*!****************************************************!*\
  !*** ../node_modules/prop-types/checkPropTypes.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "../node_modules/prop-types/factoryWithTypeCheckers.js":
/*!*************************************************************!*\
  !*** ../node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var assign = __webpack_require__(/*! object-assign */ "../node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "../node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "../node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ("development" !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
       true ? printWarning('Invalid argument supplied to oneOf, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "../node_modules/prop-types/index.js":
/*!*******************************************!*\
  !*** ../node_modules/prop-types/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "../node_modules/prop-types/factoryWithTypeCheckers.js")(isValidElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "../node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!**************************************************************!*\
  !*** ../node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "../node_modules/tslib/tslib.es6.js":
/*!******************************************!*\
  !*** ../node_modules/tslib/tslib.es6.js ***!
  \******************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./FluxContainerConverter.js":
/*!***********************************!*\
  !*** ./FluxContainerConverter.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

module.exports = {
  convert: function convert(containerClass) {
    var tmp = containerClass;

    containerClass = function containerClass() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _construct(tmp, args);
    };

    containerClass.prototype = tmp.prototype;
    containerClass.getStores = tmp.getStores;
    containerClass.calculateState = tmp.calculateState;
    return containerClass;
  }
};

/***/ }),

/***/ "./actions/AppAction.js":
/*!******************************!*\
  !*** ./actions/AppAction.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");




var pspid = "AppAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  selectedContent: function selectedContent(selected, title) {
    Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
      type: 'content/select',
      selected: selected,
      title: title
    });
  },
  fetchConfig: function fetchConfig() {
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].getConfig().then(function (config) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'config/fetch/appid',
        config: config
      });
    });
  },
  writeConfig: function writeConfig(obj) {
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].putConfig(obj).then(function (config) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'config/write/appid',
        config: config
      });
    });
  },
  writeInventoryItems: function writeInventoryItems(options) {
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].writeInventoryItems(options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (objs) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/write/inventory',
        options: options
      });
      return objs;
    }));
  }
});

/***/ }),

/***/ "./actions/CompleteAction.js":
/*!***********************************!*\
  !*** ./actions/CompleteAction.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");




var pspid = "CompleteAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  increment: function increment(options, page) {
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), options);
    page = ++page > 0 ? page : 1;
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].fetchCompleteItems(options, page).then(function (items) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/fetch/complete',
        items: items,
        options: options,
        page: page
      });
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Response: item/fetch/complete');
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].fetchCompleteItems(options, page).then(function (items) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/fetch/complete',
        items: items,
        options: options,
        page: page
      });
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, "> Response: item/fetch/complete"));
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
    });
  },
  writeCompleteItems: function writeCompleteItems(options) {
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].writeCompleteItems(options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (objs) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/write/complete',
        options: options
      });
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Response: item/write/complete');
      return objs;
    }));
  }
});

/***/ }),

/***/ "./actions/NoteAction.js":
/*!*******************************!*\
  !*** ./actions/NoteAction.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");




var displayName = "NoteAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  increment: function increment(options, page) {
    page = ++page > 0 ? page : 1;
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].fetchItems(options, page).then(function (items) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/fetch/note',
        items: items,
        options: options,
        page: page
      });
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].fetchItems(options, page).then(function (items) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/fetch/note',
        items: items,
        options: options,
        page: page
      });
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
    });
  },
  writeItems: function writeItems(options) {
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].writeItems(options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (objs) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/write/note',
        options: options
      });
      return objs;
    }));
  }
});

/***/ }),

/***/ "./actions/ProductsAction.js":
/*!***********************************!*\
  !*** ./actions/ProductsAction.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");




var pspid = "ProductsAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  increment: function increment(options, page) {
    page = ++page > 0 ? page : 1;
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].fetchProductsItems(options, page).then(function (items) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/fetch/products',
        items: items,
        options: options,
        page: page
      });
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].fetchProductsItems(options, page).then(function (items) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/fetch/products',
        items: items,
        options: options,
        page: page
      });
    });
  },
  writeProductsItems: function writeProductsItems(options) {
    return Services_NoteApiClient__WEBPACK_IMPORTED_MODULE_2__["default"].writeProductsItems(options).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(function (objs) {
      Object(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["dispatch"])({
        type: 'item/write/products',
        options: options
      });
      return objs;
    }));
  }
});

/***/ }),

/***/ "./components/AppBody/AppBody.js":
/*!***************************************!*\
  !*** ./components/AppBody/AppBody.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Components_AppSidebar_AppSidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/AppSidebar/AppSidebar */ "./components/AppSidebar/AppSidebar.js");
/* harmony import */ var Components_AppForm_AppForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Components/AppForm/AppForm */ "./components/AppForm/AppForm.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var AppBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppBody, _React$Component);

  function AppBody() {
    _classCallCheck(this, AppBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppBody).apply(this, arguments));
  }

  _createClass(AppBody, [{
    key: "render",
    value: function render() {
      var config = this.props.config;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_AppSidebar_AppSidebar__WEBPACK_IMPORTED_MODULE_2__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_AppForm_AppForm__WEBPACK_IMPORTED_MODULE_3__["default"], {
        config: config
      }));
    }
  }]);

  return AppBody;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

;
AppBody.displayName = 'AppBody';
AppBody.defaultProps = {
  config: null
};
AppBody.propTypes = {
  config: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (AppBody);

/***/ }),

/***/ "./components/AppForm/AppForm.js":
/*!***************************************!*\
  !*** ./components/AppForm/AppForm.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Actions_AppAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var AppForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppForm, _React$Component);

  function AppForm(props) {
    var _this;

    _classCallCheck(this, AppForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppForm).call(this, props));
    var config = props.config;
    _this.state = {
      appid: config.appid ? config.appid : '',
      certid: config.certid ? config.certid : '',
      token: config.token ? config.token : '',
      runame: config.runame ? config.runame : '',
      authorizeApi: config.authorizeApi ? config.authorizeApi : '',
      oauth2Api: config.oauth2Api ? config.oauth2Api : '',
      findingApi: config.findingApi ? config.findingApi : '',
      tradingApi: config.tradingApi ? config.tradingApi : '',
      inventoryApi: config.inventoryApi ? config.inventoryApi : '',
      marketingApi: config.marketingApi ? config.marketingApi : '',
      analyticsApi: config.analyticsApi ? config.analyticsApi : ''
    };
    return _this;
  }

  _createClass(AppForm, [{
    key: "handleChangeReset",
    value: function handleChangeReset(e) {
      var newState = {
        appid: '',
        certid: '',
        token: '',
        runame: '',
        authorizeApi: '',
        oauth2Api: '',
        findingApi: '',
        tradingApi: '',
        inventoryApi: '',
        marketingApi: '',
        analyticsApi: ''
      };
      this.setState(newState);
    }
  }, {
    key: "handleChangeSave",
    value: function handleChangeSave(e) {
      e.preventDefault();
      var config = this.props.config;
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(AppForm.displayName, 'handleChangeSave', config);
      var newConfig = Object.assign({}, config, this.state);
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();

      if (newConfig) {
        Actions_AppAction__WEBPACK_IMPORTED_MODULE_2__["default"].writeConfig(newConfig).then(function () {
          Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(AppForm.displayName, 'handleChangeSave', 'Success.');
          Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
        }).catch(function (err) {
          Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].error(AppForm.displayName, err.name, err.message);
          Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
        });
      }
    }
  }, {
    key: "handleChangeText",
    value: function handleChangeText(name, e) {
      this.setState(_defineProperty({}, name, e.target.value));
    }
  }, {
    key: "render",
    value: function render() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace(AppForm.displayName, 'State', this.state);
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace(AppForm.displayName, 'Props', this.props);
      var _this$state = this.state,
          appid = _this$state.appid,
          certid = _this$state.certid,
          token = _this$state.token,
          runame = _this$state.runame,
          authorizeApi = _this$state.authorizeApi,
          oauth2Api = _this$state.oauth2Api,
          findingApi = _this$state.findingApi,
          tradingApi = _this$state.tradingApi,
          inventoryApi = _this$state.inventoryApi,
          marketingApi = _this$state.marketingApi,
          analyticsApi = _this$state.analyticsApi;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "padded-less"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "App ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Client ID",
        value: appid,
        onChange: this.handleChangeText.bind(this, 'appid')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Cert ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Client Secret",
        value: certid,
        onChange: this.handleChangeText.bind(this, 'certid')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Application Token"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        className: "form-control",
        placeholder: "Token",
        value: token,
        onChange: this.handleChangeText.bind(this, 'token')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "RuName"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "eBay Redirect URL name",
        value: runame,
        onChange: this.handleChangeText.bind(this, 'runame')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Authorize API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: authorizeApi,
        onChange: this.handleChangeText.bind(this, 'authorizeApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "OAuth2 API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: oauth2Api,
        onChange: this.handleChangeText.bind(this, 'oauth2Api')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Finding API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: findingApi,
        onChange: this.handleChangeText.bind(this, 'findingApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Trading API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: tradingApi,
        onChange: this.handleChangeText.bind(this, 'tradingApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Inventory API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: inventoryApi,
        onChange: this.handleChangeText.bind(this, 'inventoryApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Marketing API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: marketingApi,
        onChange: this.handleChangeText.bind(this, 'marketingApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Analytics API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: analyticsApi,
        onChange: this.handleChangeText.bind(this, 'analyticsApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "reset",
        className: "btn btn-large btn-form btn-default",
        onClick: this.handleChangeReset.bind(this)
      }, "Reset"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-large btn-form btn-primary",
        onClick: this.handleChangeSave.bind(this)
      }, "Save"))));
    }
  }]);

  return AppForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

AppForm.displayName = 'AppForm';
AppForm.defaultProps = {
  config: null
};
AppForm.propTypes = {
  config: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (AppForm);

/***/ }),

/***/ "./components/AppSidebar/AppSidebar.js":
/*!*********************************************!*\
  !*** ./components/AppSidebar/AppSidebar.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppSidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Actions_AppAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var AppSidebar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppSidebar, _React$Component);

  function AppSidebar(props) {
    var _this;

    _classCallCheck(this, AppSidebar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppSidebar).call(this, props));
    _this.state = Object.assign({}, props.config);
    return _this;
  }

  _createClass(AppSidebar, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane pane-sm sidebar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: "nav-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "My account"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-key"
      }), "Application keyset")));
    }
  }]);

  return AppSidebar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;
AppSidebar.displayName = "AppSidebarView";

/***/ }),

/***/ "./components/CompleteBody/CompleteBody.js":
/*!*************************************************!*\
  !*** ./components/CompleteBody/CompleteBody.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompleteBody; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Components_CompleteSidebar_CompleteSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Components/CompleteSidebar/CompleteSidebar */ "./components/CompleteSidebar/CompleteSidebar.js");
/* harmony import */ var Components_CompleteTable_CompleteTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/CompleteTable/CompleteTable */ "./components/CompleteTable/CompleteTable.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var pspid = "CompleteBodyView";

var CompleteBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CompleteBody, _React$Component);

  function CompleteBody() {
    _classCallCheck(this, CompleteBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(CompleteBody).apply(this, arguments));
  }

  _createClass(CompleteBody, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_CompleteSidebar_CompleteSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: this.props.page,
        items: this.props.items,
        options: this.props.options
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_CompleteTable_CompleteTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
        items: this.props.items,
        options: this.props.options
      }));
    }
  }]);

  return CompleteBody;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/CompleteSidebar/CompleteSidebar.js":
/*!*******************************************************!*\
  !*** ./components/CompleteSidebar/CompleteSidebar.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompleteSidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Actions/CompleteAction */ "./actions/CompleteAction.js");
/* harmony import */ var Components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/Radio/Radio */ "./components/Radio/Radio.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/ipcutils */ "./utils/ipcutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var pspid = "CompleteSidebarView";

var CompleteSidebar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CompleteSidebar, _React$Component);

  function CompleteSidebar(props) {
    var _this;

    _classCallCheck(this, CompleteSidebar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CompleteSidebar).call(this, props));
    _this.state = Object.assign({}, props.options);
    return _this;
  }

  _createClass(CompleteSidebar, [{
    key: "csvHeader",
    value: function csvHeader() {
      return {
        'Image': '',
        'Url': '',
        'Title': '',
        'StartTime': '',
        'EndTime': '',
        'Condition': '',
        'Seller': '',
        'ItemID': '',
        'ProductID(UPC)': '',
        'ProductID(EAN)': '',
        'ProductID(ISBN)': '',
        'Category': '',
        'Shipping': '',
        'CurrentPrice': '',
        'CurrentCurrency': '',
        'ConvertedPrice': '',
        'ConvertedCurrency': '',
        'Status': '',
        'LeftTime': ''
      };
    }
  }, {
    key: "handleChangeSave",
    value: function handleChangeSave() {
      var _this2 = this;

      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Request', 'handleChangeSave');
      if (!Number(this.state.pages)) return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showErrorBox('Pages is not a number!');
      Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showSaveDialog(function (filename) {
        if (!filename) return Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Response', 'File save canceled!');
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'filename', filename);
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
        Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.touchFile(filename).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.addbomFile(filename);
        }).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.saveFile(filename, Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["util"].getCSVHeader(_this2.csvHeader()));
        }).then(function () {
          Actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeCompleteItems(_this2.state).subscribe(function (obj) {
            return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.saveFile(filename, obj);
          }, function (err) {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].error(CompleteSidebar.displayName, err.name, err.message);
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showErrorBox(err);
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          }, function () {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Response', 'File has been saved!');
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showSaveMessageBox();
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeHome",
    value: function handleChangeHome() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Request', 'handleChangeHome');
      Actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, 0);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Request', 'handleIncrement');
      Actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, this.props.page);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Request', 'handleDecrement');
      Actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].decrement(this.props.options, this.props.page);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(e) {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Request', 'handleChangeSearch');
      e.preventDefault();
      Actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.state, 0);
    }
  }, {
    key: "handleChangeReset",
    value: function handleChangeReset() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(CompleteSidebar.displayName, 'Request', 'handleChangeReset');
      this.setState({
        highestPrice: '',
        lowestPrice: '',
        shipping: [],
        condition: [],
        status: [],
        itemId: [],
        categoryPath: [],
        seller: [],
        startDate: '',
        endDate: ''
      });
    }
  }, {
    key: "handleChangeText",
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "handleChangeCheckbox",
    value: function handleChangeCheckbox(name, e) {
      var newState = {};
      newState[name] = e.target.checked;
      this.setState(newState);
    }
  }, {
    key: "handleChangeRadio",
    value: function handleChangeRadio(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "handleChangeSelect",
    value: function handleChangeSelect(name, e) {
      var newState = {};
      var options = e.target.options;
      var values = [];

      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) values.push(options[i].value);
      }

      newState[name] = values;
      this.setState(newState);
    }
  }, {
    key: "renderOption",
    value: function renderOption(objs, prop1, prop2) {
      if (!objs) return null;
      var len = arguments.length;
      var items = objs.map(function (obj) {
        return len === 2 ? obj[prop1][0] : obj[prop1][0][prop2][0];
      });
      var opts = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].dst(items);
      return opts.map(function (opt, idx) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: "choice-" + idx,
          value: opt
        }, opt);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var page = this.props.page;
      var optPaths = this.renderOption(this.props.items, 'primaryCategory', 'categoryName');
      var optSelrs = this.renderOption(this.props.items, 'sellerInfo', 'sellerUserName');
      var optImIDs = this.renderOption(this.props.items, 'itemId');
      var optShpgs = this.renderOption(this.props.items, 'shippingInfo', 'shipToLocations');
      var optSttss = this.renderOption(this.props.items, 'sellingStatus', 'sellingState');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane pane-sm sidebar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: "nav-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Title"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Search of items",
        value: this.state.searchString,
        onChange: this.handleChangeText.bind(this, 'searchString')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Sold listing"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "checkbox"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        value: "soldItemOnly",
        checked: this.state.soldItemOnly,
        onChange: this.handleChangeCheckbox.bind(this, 'soldItemOnly')
      }), "Sold items only."))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "End time"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "From Date (yyyy/mm/dd)",
        value: this.state.startDate,
        onChange: this.handleChangeText.bind(this, 'startDate')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "To Date (yyyy/mm/dd)",
        value: this.state.endDate,
        onChange: this.handleChangeText.bind(this, 'endDate')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-default",
        onClick: this.handleChangeReset.bind(this)
      }, "Reset"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-primary",
        onClick: this.handleChangeSearch.bind(this)
      }, "Search"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Functions"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleChangeHome.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-home"
      }), "Home (", page, " page)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleIncrement.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-right-bold"
      }), "Next"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleDecrement.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-left-bold"
      }), "Previous"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Output"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Number of pages",
        value: this.state.pages,
        onChange: this.handleChangeText.bind(this, 'pages')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-primary",
        onClick: this.handleChangeSave.bind(this)
      }, "Save"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Category"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.categoryPath,
        onChange: this.handleChangeSelect.bind(this, 'categoryPath')
      }, optPaths)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Seller"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.seller,
        onChange: this.handleChangeSelect.bind(this, 'seller')
      }, optSelrs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "ItemID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.itemId,
        onChange: this.handleChangeSelect.bind(this, 'itemId')
      }, optImIDs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Price"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Highest price",
        value: this.state.highestPrice,
        onChange: this.handleChangeText.bind(this, 'highestPrice')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Lowest price",
        value: this.state.lowestPrice,
        onChange: this.handleChangeText.bind(this, 'lowestPrice')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Shipping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.shipping,
        onChange: this.handleChangeSelect.bind(this, 'shipping')
      }, optShpgs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Condition"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.condition,
        onChange: this.handleChangeSelect.bind(this, 'condition')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1000"
      }, "New"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1500"
      }, "New other (see details)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1750"
      }, "New with defects"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2000"
      }, "Manufacturer refurbished"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2500"
      }, "Seller refurbished"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "3000"
      }, "Used"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "4000"
      }, "Very Good"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "5000"
      }, "Good"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "6000"
      }, "Acceptable"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "7000"
      }, "For parts or not working"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.status,
        onChange: this.handleChangeSelect.bind(this, 'status')
      }, optSttss))));
    }
  }]);

  return CompleteSidebar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;
CompleteSidebar.displayName = 'CompleteSidebar';

/***/ }),

/***/ "./components/CompleteTable/CompleteTable.js":
/*!***************************************************!*\
  !*** ./components/CompleteTable/CompleteTable.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CompleteTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "CompleteTableView";

var CompleteTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CompleteTable, _React$Component);

  function CompleteTable() {
    _classCallCheck(this, CompleteTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(CompleteTable).apply(this, arguments));
  }

  _createClass(CompleteTable, [{
    key: "renderStatus",
    value: function renderStatus(status) {
      var styles;

      switch (status) {
        case 0:
          styles = {
            fontWeight: 'bold',
            color: 'blue'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "Now available.");

        case 1:
          styles = {
            fontWeight: 'bold',
            color: 'orange'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "New added.");

        case 2:
          styles = {
            fontWeight: 'bold',
            color: 'red'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "Removed.");
      }
    }
  }, {
    key: "renderExtension",
    value: function renderExtension(duration) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "( ", Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].toLeftDays(duration), " )");
    }
  }, {
    key: "renderItem",
    value: function renderItem(obj, idx) {
      var item = obj;
      var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
      var Aid = item.itemId[0];
      var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
        return "".concat(obj.__value__, " ( ").concat(obj['@type'], " )");
      }) : ['---'];
      var Sid = item.sellerInfo[0].sellerUserName[0];
      var Stm = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(item.listingInfo[0].endTime[0]);
      var Url = item.viewItemURL[0];
      var Ttl = item.title[0];
      var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
      var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
      var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
      var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
      var Cgp = item.primaryCategory[0].categoryName[0];
      var Shp = item.shippingInfo[0].shipToLocations[0];
      var Stt = item.sellingStatus[0].sellingState[0];
      var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
      var stt = this.renderStatus(0);
      var Upd = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(Date.now());
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
        key: idx
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: Img,
        width: "128",
        height: "128"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: Url,
        target: "_blank"
      }, Ttl), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Sell period : ", Stm, " ~ ", Etm, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Condition : ", Cdn, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Seller : ", Sid, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "ItemID : ", Aid, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "ProductID : ", Pid.join(' '), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Category : ", Cgp)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Shp), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Pc1, " ", Ci1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "( ", Pc2, " ", Ci2, " )")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Stt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Ext)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, stt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Upd))));
    }
  }, {
    key: "filterItems",
    value: function filterItems(objs, options) {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
      return objs.filter(function (obj) {
        var item = obj;

        if (options != null) {
          if (!options.shipping.some(function (shipping) {
            return shipping === item.shippingInfo[0].shipToLocations[0];
          }) && options.shipping.length) return false;
          if (!options.condition.some(function (condition) {
            return condition === item.condition[0].conditionId[0];
          }) && options.condition.length) return false;
          if (!options.status.some(function (status) {
            return status === item.sellingStatus[0].sellingState[0];
          }) && options.status.length) return false;
          if (!options.categoryPath.some(function (path) {
            return path === item.primaryCategory[0].categoryName[0];
          }) && options.categoryPath.length) return false;
          if (!options.seller.some(function (selr) {
            return selr === item.sellerInfo[0].sellerUserName[0];
          }) && options.seller.length) return false;
          if (!options.itemId.some(function (itemid) {
            return itemid === item.itemId[0];
          }) && options.itemId.length) return false;
          if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
          if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
          if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
        }

        return true;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var options = this.props.options;
      var items = this.props.items ? this.filterItems(this.props.items, options).map(function (item, idx) {
        return _this.renderItem(item, idx);
      }) : null;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table-striped"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Image"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Detail"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Shipping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Price"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Update"))), items));
    }
  }]);

  return CompleteTable;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/Contents/Contents.js":
/*!*****************************************!*\
  !*** ./components/Contents/Contents.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var pspid = "ContensView";

var Contents =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Contents, _React$Component);

  function Contents() {
    _classCallCheck(this, Contents);

    return _possibleConstructorReturn(this, _getPrototypeOf(Contents).apply(this, arguments));
  }

  _createClass(Contents, [{
    key: "render",
    value: function render() {
      var contnt = this.props.children[this.props.selected];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "window-content"
      }, contnt);
    }
  }]);

  return Contents;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Contents);

/***/ }),

/***/ "./components/ErrorBoundary/ErrorBoundary.js":
/*!***************************************************!*\
  !*** ./components/ErrorBoundary/ErrorBoundary.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ErrorBoundary =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ErrorBoundary, _React$Component);

  function ErrorBoundary(props) {
    var _this;

    _classCallCheck(this, ErrorBoundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ErrorBoundary).call(this, props));
    _this.state = {
      error: null,
      errorInfo: null
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "componentDidCatch",
    value: function componentDidCatch(error, errorInfo) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].error(ErrorBoundary.displayName, error, errorInfo);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.errorInfo) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "Something went wrong."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("details", {
          style: {
            whiteSpace: 'pre-wrap'
          }
        }, this.state.error && this.state.error.toString(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), this.state.errorInfo.componentStack));
      }

      return this.props.children;
    }
  }]);

  return ErrorBoundary;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

;
ErrorBoundary.displayName = 'ErrorBoundary';
ErrorBoundary.defaultProps = {};
ErrorBoundary.propTypes = {};
/* harmony default export */ __webpack_exports__["default"] = (ErrorBoundary);

/***/ }),

/***/ "./components/GlobalFooter/GlobalFooter.js":
/*!*************************************************!*\
  !*** ./components/GlobalFooter/GlobalFooter.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Actions_AppAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
/* harmony import */ var Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/ipcutils */ "./utils/ipcutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var pspid = "GlobalFooterView";

var GlobalFooter =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GlobalFooter, _React$Component);

  function GlobalFooter() {
    _classCallCheck(this, GlobalFooter);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalFooter).apply(this, arguments));
  }

  _createClass(GlobalFooter, [{
    key: "csvHeader",
    value: function csvHeader() {
      return {};
    }
  }, {
    key: "handleChangeSave",
    value: function handleChangeSave() {
      var _this = this;

      Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info(GlobalFooter.displayName, 'Request: handleChangeSave');
      Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].win.showSaveDialog(function (filename) {
        if (!filename) return Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].error(GlobalFooter.displayName, 'Error', 'File save canceled!');
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
        Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].sys.touchFile(filename).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].sys.addbomFile(filename);
        }).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].sys.saveFile(filename, Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].getCSVHeader(_this.csvHeader()));
        }).then(function () {
          Actions_AppAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeInventoryItems(_this.state).subscribe(function (obj) {
            return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].sys.saveFile(filename, obj);
          }, function (err) {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].error(GlobalFooter.displayName, err.name, err.message, err.stack);
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].win.showErrorBox(err);
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
          }, function () {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info(GlobalFooter.displayName, 'handleChangeSave', 'File has been saved!');
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].win.showSaveMessageBox();
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeClose",
    value: function handleChangeClose() {
      Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].win.showCloseMessageBox(function (response) {
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace(GlobalFooter.displayName, 'Click button:', response);
        if (!response) Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_3__["default"].win.close();
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("footer", {
        className: "toolbar toolbar-footer"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "toolbar-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-default",
        onClick: this.handleChangeClose.bind(this)
      }, "Close"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.handleChangeSave.bind(this)
      }, "Save")));
    }
  }]);

  return GlobalFooter;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

;
GlobalFooter.displayName = 'GlobalFooter';
/* harmony default export */ __webpack_exports__["default"] = (GlobalFooter);

/***/ }),

/***/ "./components/GlobalHeader/GlobalHeader.js":
/*!*************************************************!*\
  !*** ./components/GlobalHeader/GlobalHeader.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GlobalHeader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var pspid = "GlobalHeaderView";

var GlobalHeader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(GlobalHeader, _React$Component);

  function GlobalHeader() {
    _classCallCheck(this, GlobalHeader);

    return _possibleConstructorReturn(this, _getPrototypeOf(GlobalHeader).apply(this, arguments));
  }

  _createClass(GlobalHeader, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("header", {
        className: "toolbar toolbar-header"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        className: "title"
      }, this.props.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "toolbar-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-default btn-dropdown pull-right"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-megaphone"
      }))));
    }
  }]);

  return GlobalHeader;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



/***/ }),

/***/ "./components/NoteBody/NoteBody.js":
/*!*****************************************!*\
  !*** ./components/NoteBody/NoteBody.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoteBody; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Components_NoteSidebar_NoteSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Components/NoteSidebar/NoteSidebar */ "./components/NoteSidebar/NoteSidebar.js");
/* harmony import */ var Components_NoteTable_NoteTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/NoteTable/NoteTable */ "./components/NoteTable/NoteTable.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var pspid = "NoteBodyView";

var NoteBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NoteBody, _React$Component);

  function NoteBody() {
    _classCallCheck(this, NoteBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoteBody).apply(this, arguments));
  }

  _createClass(NoteBody, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_NoteSidebar_NoteSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: this.props.page,
        items: this.props.items,
        options: this.props.options
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_NoteTable_NoteTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
        items: this.props.items,
        options: this.props.options
      }));
    }
  }]);

  return NoteBody;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/NoteSidebar/NoteSidebar.js":
/*!***********************************************!*\
  !*** ./components/NoteSidebar/NoteSidebar.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Actions/NoteAction */ "./actions/NoteAction.js");
/* harmony import */ var Components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/Radio/Radio */ "./components/Radio/Radio.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/ipcutils */ "./utils/ipcutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var NoteSidebar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NoteSidebar, _React$Component);

  function NoteSidebar(props) {
    var _this;

    _classCallCheck(this, NoteSidebar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NoteSidebar).call(this, props));
    _this.state = Object.assign({}, props.options);
    return _this;
  }

  _createClass(NoteSidebar, [{
    key: "csvHeader",
    value: function csvHeader() {
      return {
        'Image': '',
        'Url': '',
        'Title': '',
        'StartTime': '',
        'EndTime': '',
        'Condition': '',
        'Seller': '',
        'ItemID': '',
        'ProductID(UPC)': '',
        'ProductID(EAN)': '',
        'ProductID(ISBN)': '',
        'Category': '',
        'Shipping': '',
        'CurrentPrice': '',
        'CurrentCurrency': '',
        'ConvertedPrice': '',
        'ConvertedCurrency': '',
        'Status': '',
        'LeftTime': ''
      };
    }
  }, {
    key: "handleChangeSave",
    value: function handleChangeSave() {
      var _this2 = this;

      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Request', 'handleChangeSave');
      if (!Number(this.state.pages)) return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showErrorBox('Pages is not a number!');
      Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showSaveDialog(function (filename) {
        if (!filename) return Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Response', 'File save canceled!');
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
        Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.touchFile(filename).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.addbomFile(filename);
        }).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.saveFile(filename, Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["util"].getCSVHeader(_this2.csvHeader()));
        }).then(function () {
          Actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeItems(_this2.state).subscribe(function (obj) {
            return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.saveFile(filename, obj);
          }, function (err) {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].error(NoteSidebar.displayName, err.name, err.message);
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showErrorBox(err);
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          }, function () {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'handleChangeSave', 'File has been saved!');
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showSaveMessageBox();
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeHome",
    value: function handleChangeHome() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Request', 'handleChangeHome');
      Actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, 0);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Request', 'handleIncrement');
      Actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, this.props.page);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Request', 'handleDecrement');
      Actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].decrement(this.props.options, this.props.page);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(event) {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Request', 'handleChangeSearch');
      event.preventDefault();
      Actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.state, 0);
    }
  }, {
    key: "handleChangeReset",
    value: function handleChangeReset() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(NoteSidebar.displayName, 'Request', 'handleChangeReset');
      this.setState({
        highestPrice: '',
        lowestPrice: '',
        shipping: [],
        condition: [],
        status: [],
        itemId: [],
        categoryPath: [],
        seller: [],
        startDate: '',
        endDate: ''
      });
    }
  }, {
    key: "handleChangeText",
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "handleChangeCheckbox",
    value: function handleChangeCheckbox(name, e) {
      var newState = {};
      newState[name] = e.target.checked;
      this.setState(newState);
    }
  }, {
    key: "handleChangeRadio",
    value: function handleChangeRadio(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "handleChangeSelect",
    value: function handleChangeSelect(name, e) {
      var newState = {};
      var options = e.target.options;
      var values = [];

      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) values.push(options[i].value);
      }

      newState[name] = values;
      this.setState(newState);
    }
  }, {
    key: "renderOption",
    value: function renderOption(objs, prop1, prop2) {
      if (!objs) return null;
      var len = arguments.length;
      var items = objs.map(function (obj) {
        return len === 2 ? obj[prop1][0] : obj[prop1][0][prop2][0];
      });
      var opts = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].dst(items);
      return opts.map(function (opt, idx) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: "choice-" + idx,
          value: opt
        }, opt);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var page = this.props.page;
      var optPaths = this.renderOption(this.props.items, 'primaryCategory', 'categoryName');
      var optSelrs = this.renderOption(this.props.items, 'sellerInfo', 'sellerUserName');
      var optImIDs = this.renderOption(this.props.items, 'itemId');
      var optShpgs = this.renderOption(this.props.items, 'shippingInfo', 'shipToLocations');
      var optSttss = this.renderOption(this.props.items, 'sellingStatus', 'sellingState');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane pane-sm sidebar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: "nav-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Title"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Search of items",
        value: this.state.searchString,
        onChange: this.handleChangeText.bind(this, 'searchString')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "End time"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "From date (yyyy/mm/dd)",
        value: this.state.startDate,
        onChange: this.handleChangeText.bind(this, 'startDate')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "To date (yyyy/mm/dd)",
        value: this.state.endDate,
        onChange: this.handleChangeText.bind(this, 'endDate')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-default",
        onClick: this.handleChangeReset.bind(this)
      }, "Reset"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-primary",
        onClick: this.handleChangeSearch.bind(this)
      }, "Search"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Functions"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleChangeHome.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-home"
      }), "Home (", page, " page)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleIncrement.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-right-bold"
      }), "Next"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleDecrement.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-left-bold"
      }), "Previous"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Output"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Number of pages",
        value: this.state.pages,
        onChange: this.handleChangeText.bind(this, 'pages')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-primary",
        onClick: this.handleChangeSave.bind(this)
      }, "Save"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Category"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.categoryPath,
        onChange: this.handleChangeSelect.bind(this, 'categoryPath')
      }, optPaths)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Seller"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.seller,
        onChange: this.handleChangeSelect.bind(this, 'seller')
      }, optSelrs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "ItemID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.itemId,
        onChange: this.handleChangeSelect.bind(this, 'itemId')
      }, optImIDs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Price"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Highest price",
        value: this.state.highestPrice,
        onChange: this.handleChangeText.bind(this, 'highestPrice')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Lowest price",
        value: this.state.lowestPrice,
        onChange: this.handleChangeText.bind(this, 'lowestPrice')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Shipping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.shipping,
        onChange: this.handleChangeSelect.bind(this, 'shipping')
      }, optShpgs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Condition"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.condition,
        onChange: this.handleChangeSelect.bind(this, 'condition')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1000"
      }, "New"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1500"
      }, "New other (see details)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1750"
      }, "New with defects"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2000"
      }, "Manufacturer refurbished"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2500"
      }, "Seller refurbished"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "3000"
      }, "Used"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "4000"
      }, "Very Good"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "5000"
      }, "Good"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "6000"
      }, "Acceptable"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "7000"
      }, "For parts or not working"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.status,
        onChange: this.handleChangeSelect.bind(this, 'status')
      }, optSttss))));
    }
  }]);

  return NoteSidebar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

;
NoteSidebar.displayName = "NoteSidebar";
/* harmony default export */ __webpack_exports__["default"] = (NoteSidebar);

/***/ }),

/***/ "./components/NoteTable/NoteTable.js":
/*!*******************************************!*\
  !*** ./components/NoteTable/NoteTable.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoteTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var NoteTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NoteTable, _React$Component);

  function NoteTable() {
    _classCallCheck(this, NoteTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoteTable).apply(this, arguments));
  }

  _createClass(NoteTable, [{
    key: "renderStatus",
    value: function renderStatus(status) {
      var styles;

      switch (status) {
        case 0:
          styles = {
            fontWeight: 'bold',
            color: 'blue'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "Now available.");

        case 1:
          styles = {
            fontWeight: 'bold',
            color: 'orange'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "New added.");

        case 2:
          styles = {
            fontWeight: 'bold',
            color: 'red'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "Removed.");
      }
    }
  }, {
    key: "renderExtension",
    value: function renderExtension(duration) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "( ", Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].toLeftDays(duration), " )");
    }
  }, {
    key: "renderItem",
    value: function renderItem(obj, idx) {
      var item = obj;
      var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
      var Aid = item.itemId[0];
      var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
        return "".concat(obj.__value__, " ( ").concat(obj['@type'], " )");
      }) : ['---'];
      var Sid = item.sellerInfo[0].sellerUserName[0];
      var Stm = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(item.listingInfo[0].endTime[0]);
      var Url = item.viewItemURL[0];
      var Ttl = item.title[0];
      var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
      var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
      var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
      var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
      var Cgp = item.primaryCategory[0].categoryName[0];
      var Shp = item.shippingInfo[0].shipToLocations[0];
      var Stt = item.sellingStatus[0].sellingState[0];
      var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
      var stt = this.renderStatus(0);
      var Upd = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(Date.now());
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
        key: idx
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: Img,
        width: "128",
        height: "128"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: Url,
        target: "_blank"
      }, Ttl), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Sell period : ", Stm, " ~ ", Etm, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Condition : ", Cdn, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Seller : ", Sid, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "ItemID : ", Aid, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "ProductID : ", Pid.join(' '), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Category : ", Cgp)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Shp), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Pc1, " ", Ci1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "( ", Pc2, " ", Ci2, " )")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Stt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Ext)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, stt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Upd))));
    }
  }, {
    key: "filterItems",
    value: function filterItems(objs, options) {
      return objs.filter(function (obj) {
        var item = obj;

        if (options != null) {
          if (!options.shipping.some(function (shipping) {
            return shipping === item.shippingInfo[0].shipToLocations[0];
          }) && options.shipping.length) return false;
          if (!options.condition.some(function (condition) {
            return condition === item.condition[0].conditionId[0];
          }) && options.condition.length) return false;
          if (!options.status.some(function (status) {
            return status === item.sellingStatus[0].sellingState[0];
          }) && options.status.length) return false;
          if (!options.categoryPath.some(function (path) {
            return path === item.primaryCategory[0].categoryName[0];
          }) && options.categoryPath.length) return false;
          if (!options.seller.some(function (selr) {
            return selr === item.sellerInfo[0].sellerUserName[0];
          }) && options.seller.length) return false;
          if (!options.itemId.some(function (itemid) {
            return itemid === item.itemId[0];
          }) && options.itemId.length) return false;
          if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
          if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
          if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
        }

        return true;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var options = this.props.options;
      var items = this.props.items ? this.filterItems(this.props.items, options).map(function (item, idx) {
        return _this.renderItem(item, idx);
      }) : null;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table-striped"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Image"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Detail"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Shipping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Price"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Update"))), items));
    }
  }]);

  return NoteTable;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;
NoteTable.displayName = "NoteTableView";

/***/ }),

/***/ "./components/ProductsBody/ProductsBody.js":
/*!*************************************************!*\
  !*** ./components/ProductsBody/ProductsBody.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductsBody; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Components_ProductsSidebar_ProductsSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Components/ProductsSidebar/ProductsSidebar */ "./components/ProductsSidebar/ProductsSidebar.js");
/* harmony import */ var Components_ProductsTable_ProductsTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/ProductsTable/ProductsTable */ "./components/ProductsTable/ProductsTable.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var pspid = "ProductsBodyView";

var ProductsBody =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProductsBody, _React$Component);

  function ProductsBody() {
    _classCallCheck(this, ProductsBody);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductsBody).apply(this, arguments));
  }

  _createClass(ProductsBody, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_ProductsSidebar_ProductsSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: this.props.page,
        items: this.props.items,
        options: this.props.options
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_ProductsTable_ProductsTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
        items: this.props.items,
        options: this.props.options
      }));
    }
  }]);

  return ProductsBody;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/ProductsSidebar/ProductsSidebar.js":
/*!*******************************************************!*\
  !*** ./components/ProductsSidebar/ProductsSidebar.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductsSidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Actions/ProductsAction */ "./actions/ProductsAction.js");
/* harmony import */ var Components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Components/Radio/Radio */ "./components/Radio/Radio.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/ipcutils */ "./utils/ipcutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var ProductsSidebar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProductsSidebar, _React$Component);

  function ProductsSidebar(props) {
    var _this;

    _classCallCheck(this, ProductsSidebar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ProductsSidebar).call(this, props));
    _this.state = Object.assign({}, props.options);
    return _this;
  }

  _createClass(ProductsSidebar, [{
    key: "csvHeader",
    value: function csvHeader() {
      return {
        'Image': '',
        'Url': '',
        'Title': '',
        'StartTime': '',
        'EndTime': '',
        'Condition': '',
        'Seller': '',
        'ItemID': '',
        'ProductID(UPC)': '',
        'ProductID(EAN)': '',
        'ProductID(ISBN)': '',
        'Category': '',
        'Shipping': '',
        'CurrentPrice': '',
        'CurrentCurrency': '',
        'ConvertedPrice': '',
        'ConvertedCurrency': '',
        'Status': '',
        'LeftTime': ''
      };
    }
  }, {
    key: "handleChangeSave",
    value: function handleChangeSave() {
      var _this2 = this;

      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Request', 'handleChangeSave');
      if (!Number(this.state.pages)) return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showErrorBox('Pages is not a number!');
      Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showSaveDialog(function (filename) {
        if (!filename) return Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Response', 'File save canceled!');
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
        Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'filename', filename);
        Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.touchFile(filename).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.addbom(filename);
        }).then(function () {
          return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.saveFile(filename, Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["util"].getCSVHeader(_this2.csvHeader()));
        }).then(function () {
          Actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeProductsItems(_this2.state).subscribe(function (obj) {
            return Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].sys.saveFile(filename, obj);
          }, function (err) {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].error(ProductsSidebar.displayName, err.name, err.message);
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showErrorBox(err);
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          }, function () {
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Response', 'File has been saved!');
            Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].win.showSaveMessageBox();
            Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeHome",
    value: function handleChangeHome() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Request', 'handleChangeHome');
      Actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, 0);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Request', 'handleIncrement');
      Actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, this.props.page);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Request', 'handleDecrement');
      Actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].decrement(this.props.options, this.props.page);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(e) {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Request', 'handleChangeSearch');
      e.preventDefault();
      Actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.state, 0);
    }
  }, {
    key: "handleChangeReset",
    value: function handleChangeReset() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(ProductsSidebar.displayName, 'Request', 'handleChangeReset');
      this.setState({
        highestPrice: '',
        lowestPrice: '',
        shipping: [],
        condition: [],
        status: [],
        itemId: [],
        categoryPath: [],
        seller: []
      });
    }
  }, {
    key: "handleChangeText",
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "handleChangeCheckbox",
    value: function handleChangeCheckbox(name, e) {
      var newState = {};
      newState[name] = e.target.checked;
      this.setState(newState);
    }
  }, {
    key: "handleChangeRadio",
    value: function handleChangeRadio(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "handleChangeSelect",
    value: function handleChangeSelect(name, e) {
      var newState = {};
      var options = e.target.options;
      var values = [];

      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) values.push(options[i].value);
      }

      newState[name] = values;
      this.setState(newState);
    }
  }, {
    key: "renderOption",
    value: function renderOption(objs, prop1, prop2) {
      if (!objs) return null;
      var len = arguments.length;
      var items = objs.map(function (obj) {
        return len === 2 ? obj[prop1][0] : obj[prop1][0][prop2][0];
      });
      var opts = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].dst(items);
      return opts.map(function (opt, idx) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          key: "choice-" + idx,
          value: opt
        }, opt);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var page = this.props.page;
      var optPaths = this.renderOption(this.props.items, 'primaryCategory', 'categoryName');
      var optSelrs = this.renderOption(this.props.items, 'sellerInfo', 'sellerUserName');
      var optImIDs = this.renderOption(this.props.items, 'itemId');
      var optShpgs = this.renderOption(this.props.items, 'shippingInfo', 'shipToLocations');
      var optSttss = this.renderOption(this.props.items, 'sellingStatus', 'sellingState');
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane pane-sm sidebar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("nav", {
        className: "nav-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "ProductID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Search of items",
        value: this.state.productId,
        onChange: this.handleChangeText.bind(this, 'productId')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "ProductType"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__["default"], {
        name: "productType",
        value: this.state.productType,
        onChange: this.handleChangeRadio.bind(this, 'productType')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "ReferenceID"
      }, "ReferenceID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "ISBN"
      }, "ISBN"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "UPC"
      }, "UPC"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "EAN"
      }, "EAN"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-default",
        onClick: this.handleChangeReset.bind(this)
      }, "Reset"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-primary",
        onClick: this.handleChangeSearch.bind(this)
      }, "Search"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Functions"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleChangeHome.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-home"
      }), "Home (", page, " page)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleIncrement.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-right-bold"
      }), "Next"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item",
        onClick: this.handleDecrement.bind(this)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon icon-left-bold"
      }), "Previous"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Output"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Number of pages",
        value: this.state.pages,
        onChange: this.handleChangeText.bind(this, 'pages')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: "btn btn-mini btn-primary",
        onClick: this.handleChangeSave.bind(this)
      }, "Save"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Category"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.categoryPath,
        onChange: this.handleChangeSelect.bind(this, 'categoryPath')
      }, optPaths)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Seller"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.seller,
        onChange: this.handleChangeSelect.bind(this, 'seller')
      }, optSelrs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "ItemID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.itemId,
        onChange: this.handleChangeSelect.bind(this, 'itemId')
      }, optImIDs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Price"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Highest price",
        value: this.state.highestPrice,
        onChange: this.handleChangeText.bind(this, 'highestPrice')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Lowest price",
        value: this.state.lowestPrice,
        onChange: this.handleChangeText.bind(this, 'lowestPrice')
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Shipping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.shipping,
        onChange: this.handleChangeSelect.bind(this, 'shipping')
      }, optShpgs)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Condition"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.condition,
        onChange: this.handleChangeSelect.bind(this, 'condition')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1000"
      }, "New"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1500"
      }, "New other (see details)"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "1750"
      }, "New with defects"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2000"
      }, "Manufacturer refurbished"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "2500"
      }, "Seller refurbished"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "3000"
      }, "Used"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "4000"
      }, "Very Good"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "5000"
      }, "Good"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "6000"
      }, "Acceptable"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "7000"
      }, "For parts or not working"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h5", {
        className: "nav-group-title"
      }, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "nav-group-item"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
        className: "form-control",
        multiple: true,
        value: this.state.status,
        onChange: this.handleChangeSelect.bind(this, 'status')
      }, optSttss))));
    }
  }]);

  return ProductsSidebar;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;
ProductsSidebar.displayName = 'ProductsSidebar';

/***/ }),

/***/ "./components/ProductsTable/ProductsTable.js":
/*!***************************************************!*\
  !*** ./components/ProductsTable/ProductsTable.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProductsTable; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "ProductsTableView";

var ProductsTable =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ProductsTable, _React$Component);

  function ProductsTable() {
    _classCallCheck(this, ProductsTable);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductsTable).apply(this, arguments));
  }

  _createClass(ProductsTable, [{
    key: "renderStatus",
    value: function renderStatus(status) {
      var styles;

      switch (status) {
        case 0:
          styles = {
            fontWeight: 'bold',
            color: 'blue'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "Now available.");

        case 1:
          styles = {
            fontWeight: 'bold',
            color: 'orange'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "New added.");

        case 2:
          styles = {
            fontWeight: 'bold',
            color: 'red'
          };
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            style: styles
          }, "Removed.");
      }
    }
  }, {
    key: "renderExtension",
    value: function renderExtension(duration) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "( ", Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].toLeftDays(duration), " )");
    }
  }, {
    key: "renderItem",
    value: function renderItem(obj, idx) {
      var item = obj;
      var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
      var Aid = item.itemId[0];
      var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
        return "".concat(obj.__value__, " ( ").concat(obj['@type'], " )");
      }) : ['---'];
      var Sid = item.sellerInfo[0].sellerUserName[0];
      var Stm = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(item.listingInfo[0].endTime[0]);
      var Url = item.viewItemURL[0];
      var Ttl = item.title[0];
      var Pc1 = item.sellingStatus[0].currentPrice[0].__value__;
      var Ci1 = item.sellingStatus[0].currentPrice[0]['@currencyId'];
      var Pc2 = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var Ci2 = item.sellingStatus[0].convertedCurrentPrice[0]['@currencyId'];
      var Cdn = item.hasOwnProperty('condition') ? item.condition[0].conditionDisplayName[0] : '---';
      var Cgp = item.primaryCategory[0].categoryName[0];
      var Shp = item.shippingInfo[0].shipToLocations[0];
      var Stt = item.sellingStatus[0].sellingState[0];
      var Ext = item.sellingStatus[0].hasOwnProperty('timeLeft') ? this.renderExtension(item.sellingStatus[0].timeLeft[0]) : '';
      var stt = this.renderStatus(0);
      var Upd = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_1__["default"].getLocalTimeStamp(Date.now());
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", {
        key: idx
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: Img,
        width: "128",
        height: "128"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: Url,
        target: "_blank"
      }, Ttl), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Sell period : ", Stm, " ~ ", Etm, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Condition : ", Cdn, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Seller : ", Sid, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "ItemID : ", Aid, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "ProductID : ", Pid.join(' '), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "Category : ", Cgp)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, Shp), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Pc1, " ", Ci1), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "( ", Pc2, " ", Ci2, " )")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Stt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Ext)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, stt), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, Upd))));
    }
  }, {
    key: "filterItems",
    value: function filterItems(objs, options) {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
      return objs.filter(function (obj) {
        var item = obj;

        if (options != null) {
          if (!options.shipping.some(function (shipping) {
            return shipping === item.shippingInfo[0].shipToLocations[0];
          }) && options.shipping.length) return false;
          if (!options.condition.some(function (condition) {
            return condition === item.condition[0].conditionId[0];
          }) && options.condition.length) return false;
          if (!options.status.some(function (status) {
            return status === item.sellingStatus[0].sellingState[0];
          }) && options.status.length) return false;
          if (!options.categoryPath.some(function (path) {
            return path === item.primaryCategory[0].categoryName[0];
          }) && options.categoryPath.length) return false;
          if (!options.seller.some(function (selr) {
            return selr === item.sellerInfo[0].sellerUserName[0];
          }) && options.seller.length) return false;
          if (!options.itemId.some(function (itemid) {
            return itemid === item.itemId[0];
          }) && options.itemId.length) return false;
          if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
          if (Number(options.lowestPrice) > item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.lowestPrice !== '') return false;
          if (Number(options.highestPrice) < item.sellingStatus[0].convertedCurrentPrice[0].__value__ && options.highestPrice !== '') return false;
        }

        return true;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var options = this.props.options;
      var items = this.props.items ? this.filterItems(this.props.items, options).map(function (item, idx) {
        return _this.renderItem(item, idx);
      }) : null;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "table-striped"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Image"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Detail"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Shipping"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Price"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Status"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, "Update"))), items));
    }
  }]);

  return ProductsTable;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/Radio/Radio.js":
/*!***********************************!*\
  !*** ./components/Radio/Radio.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Radio; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Radio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio(props) {
    var _this;

    _classCallCheck(this, Radio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Radio).call(this, props));
    _this.state = {
      value: props.defaultValue
    };
    return _this;
  }

  _createClass(Radio, [{
    key: "handleChange",
    value: function handleChange(event) {
      if (this.props.onChange) {
        this.props.onChange(event);
      }

      this.setState({
        value: event.target.value
      });
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.props.value || this.state.value;
      var children = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(this.props.children, function (child, i) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "radio"
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "radio",
          name: this.props.name,
          value: child.props.value,
          checked: child.props.value === value,
          onChange: this.handleChange.bind(this)
        }), child.props.children));
      }.bind(this));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, children);
    }
  }]);

  return Radio;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/Tabs/Tabs.js":
/*!*********************************!*\
  !*** ./components/Tabs/Tabs.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Actions_AppAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "TabsView";

var Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tabs, _React$Component);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tabs).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Actions_AppAction__WEBPACK_IMPORTED_MODULE_1__["default"].selectedContent(0, this.props.children[0].props.label);
    }
  }, {
    key: "handleClickTab",
    value: function handleClickTab(index, title, event) {
      event.preventDefault();
      Actions_AppAction__WEBPACK_IMPORTED_MODULE_1__["default"].selectedContent(index, title);
    }
  }, {
    key: "renderTitles",
    value: function renderTitles(child, index) {
      var selected = this.props.selected === index ? 'active' : '';
      var classNames = ['tab-item'];
      classNames.push(selected);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: index,
        className: classNames.join(' '),
        onClick: this.handleClickTab.bind(this, index, child.props.label)
      }, child.props.label);
    }
  }, {
    key: "render",
    value: function render() {
      var titles = this.props.children.map(this.renderTitles.bind(this));
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tab-group"
      }, titles);
    }
  }]);

  return Tabs;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Tabs);

/***/ }),

/***/ "./dispatcher.js":
/*!***********************!*\
  !*** ./dispatcher.js ***!
  \***********************/
/*! exports provided: default, dispatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return dispatch; });
/* harmony import */ var flux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flux */ "../node_modules/flux/index.js");
/* harmony import */ var flux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flux__WEBPACK_IMPORTED_MODULE_0__);

var dispatcher = new flux__WEBPACK_IMPORTED_MODULE_0__["Dispatcher"]();
/* harmony default export */ __webpack_exports__["default"] = (dispatcher);
var dispatch = dispatcher.dispatch.bind(dispatcher);

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "../node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Pages_App_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Pages/App/App */ "./pages/App/App.js");



var rootEl = document.getElementById('app');

var renderRoot = function renderRoot() {
  Object(react_dom__WEBPACK_IMPORTED_MODULE_1__["render"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Pages_App_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), rootEl);
};

if (true) {
  module.hot.accept(/*! ./pages/App/App.js */ "./pages/App/App.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ Pages_App_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/App/App.js */ "./pages/App/App.js");
(function () {
    setImmediate(function () {
      renderRoot();
    });
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

;
renderRoot();

/***/ }),

/***/ "./pages/App/App.js":
/*!**************************!*\
  !*** ./pages/App/App.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Main/FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var Stores_appStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Stores/appStore */ "./stores/appStore.js");
/* harmony import */ var Actions_AppAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var Components_AppBody_AppBody__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! Components/AppBody/AppBody */ "./components/AppBody/AppBody.js");
/* harmony import */ var Pages_Note_Note__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! Pages/Note/Note */ "./pages/Note/Note.js");
/* harmony import */ var Pages_Complete_Complete__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! Pages/Complete/Complete */ "./pages/Complete/Complete.js");
/* harmony import */ var Pages_Products_Products__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! Pages/Products/Products */ "./pages/Products/Products.js");
/* harmony import */ var Components_Tabs_Tabs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! Components/Tabs/Tabs */ "./components/Tabs/Tabs.js");
/* harmony import */ var Components_Contents_Contents__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! Components/Contents/Contents */ "./components/Contents/Contents.js");
/* harmony import */ var Components_GlobalHeader_GlobalHeader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! Components/GlobalHeader/GlobalHeader */ "./components/GlobalHeader/GlobalHeader.js");
/* harmony import */ var Components_GlobalFooter_GlobalFooter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! Components/GlobalFooter/GlobalFooter */ "./components/GlobalFooter/GlobalFooter.js");
/* harmony import */ var Components_ErrorBoundary_ErrorBoundary__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! Components/ErrorBoundary/ErrorBoundary */ "./components/ErrorBoundary/ErrorBoundary.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


















var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Utilities_webutils__WEBPACK_IMPORTED_MODULE_15__["log"].info(App.displayName, 'prefetch', 'config');
      return Actions_AppAction__WEBPACK_IMPORTED_MODULE_5__["default"].fetchConfig();
    }
  }, {
    key: "render",
    value: function render() {
      //log.info(App.displayName, 'State', this.state);
      var _this$state = this.state,
          title = _this$state.title,
          selected = _this$state.selected,
          config = _this$state.config;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "window"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_ErrorBoundary_ErrorBoundary__WEBPACK_IMPORTED_MODULE_14__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_GlobalHeader_GlobalHeader__WEBPACK_IMPORTED_MODULE_12__["default"], {
        title: title
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_Tabs_Tabs__WEBPACK_IMPORTED_MODULE_10__["default"], {
        selected: selected
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Search of items"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Search of Completed items"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Search of Product IDs"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Preference"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_Contents_Contents__WEBPACK_IMPORTED_MODULE_11__["default"], {
        selected: selected
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Pages_Note_Note__WEBPACK_IMPORTED_MODULE_7__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Pages_Complete_Complete__WEBPACK_IMPORTED_MODULE_8__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Pages_Products_Products__WEBPACK_IMPORTED_MODULE_9__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_AppBody_AppBody__WEBPACK_IMPORTED_MODULE_6__["default"], {
        config: config
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_GlobalFooter_GlobalFooter__WEBPACK_IMPORTED_MODULE_13__["default"], null)));
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [Stores_appStore__WEBPACK_IMPORTED_MODULE_4__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return Stores_appStore__WEBPACK_IMPORTED_MODULE_4__["default"].getState();
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

App.displayName = 'AppController';
App.defaultProps = {};
App.propTypes = {};
/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_2__["Container"].create(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_3___default.a.convert(App)));

/***/ }),

/***/ "./pages/Complete/Complete.js":
/*!************************************!*\
  !*** ./pages/Complete/Complete.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Main/FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var Stores_completeStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Stores/completeStore */ "./stores/completeStore.js");
/* harmony import */ var Components_CompleteBody_CompleteBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Components/CompleteBody/CompleteBody */ "./components/CompleteBody/CompleteBody.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var pspid = "CompleteControlerView";

var Complete =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Complete, _React$Component);

  function Complete() {
    _classCallCheck(this, Complete);

    return _possibleConstructorReturn(this, _getPrototypeOf(Complete).apply(this, arguments));
  }

  _createClass(Complete, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_CompleteBody_CompleteBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options
      });
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [Stores_completeStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return Stores_completeStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return Complete;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(Complete)));

/***/ }),

/***/ "./pages/Note/Note.js":
/*!****************************!*\
  !*** ./pages/Note/Note.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Main/FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var Stores_noteStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Stores/noteStore */ "./stores/noteStore.js");
/* harmony import */ var Components_NoteBody_NoteBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Components/NoteBody/NoteBody */ "./components/NoteBody/NoteBody.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var pspid = "NoteControlerView";

var Note =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Note, _React$Component);

  function Note() {
    _classCallCheck(this, Note);

    return _possibleConstructorReturn(this, _getPrototypeOf(Note).apply(this, arguments));
  }

  _createClass(Note, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_NoteBody_NoteBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options
      });
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [Stores_noteStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return Stores_noteStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return Note;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(Note)));

/***/ }),

/***/ "./pages/Products/Products.js":
/*!************************************!*\
  !*** ./pages/Products/Products.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Main/FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var Stores_productsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Stores/productsStore */ "./stores/productsStore.js");
/* harmony import */ var Components_ProductsBody_ProductsBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Components/ProductsBody/ProductsBody */ "./components/ProductsBody/ProductsBody.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var pspid = "ProductsControlerView";

var Products =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Products, _React$Component);

  function Products() {
    _classCallCheck(this, Products);

    return _possibleConstructorReturn(this, _getPrototypeOf(Products).apply(this, arguments));
  }

  _createClass(Products, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Components_ProductsBody_ProductsBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options
      });
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [Stores_productsStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return Stores_productsStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return Products;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(Main_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(Products)));

/***/ }),

/***/ "./services/NoteApiClient.js":
/*!***********************************!*\
  !*** ./services/NoteApiClient.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "../node_modules/ramda/es/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! Utilities/ipcutils */ "./utils/ipcutils.js");






Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].config('console', 'basic', 'ALL', 'electron-renderer');
Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].config('app');
var displayName = "NoteApiClient";
var eBay = new Object();
/* harmony default export */ __webpack_exports__["default"] = ({
  request: function request(operation, options) {
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(displayName, 'request', operation);

    switch (operation) {
      case 'config/fetch':
        return new Promise(function (resolve, reject) {
          var memory = window.localStorage || window.UserDataStorage && new Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["stor"].UserDataStorage() || new Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["stor"].CookieStorage();
          var config = JSON.parse(memory.getItem("eBay_config"));
          eBay = config ? config : {};
          resolve(eBay);
        });

      case 'config/write':
        return new Promise(function (resolve, reject) {
          var memory = window.localStorage || window.UserDataStorage && new Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["stor"].UserDataStorage() || new Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["stor"].CookieStorage();
          eBay = options;
          memory.setItem("eBay_config", JSON.stringify(options));
          resolve(options);
        });

      case 'findItemsByKeywords':
        return new Promise(function (resolve, reject) {
          JSONP.request(eBay.findingApi, options, function (obj) {
            resolve(obj);
          });
        });

      case 'findCompletedItems':
        return new Promise(function (resolve, reject) {
          JSONP.request(eBay.findingApi, options, function (obj) {
            resolve(obj);
          });
        });

      case 'findItemsByProduct':
        return new Promise(function (resolve, reject) {
          JSONP.request(eBay.findingApi, options, function (obj) {
            resolve(obj);
          });
        });

      case 'client_credentials':
        return new Promise(function (resolve, reject) {
          Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].fetch.of(eBay.oauth2Api).post(options, function (err, obj) {
            if (err) return reject(err);
            resolve(obj);
          });
        });

      case 'code':
        return new Promise(function (resolve, reject) {
          Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].fetch.of(eBay.authorizeApi).auth(options, function (err, obj) {
            if (err) return reject(err);
            resolve(obj);
          });
        });

      case 'authorization_code':
        return new Promise(function (resolve, reject) {
          Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].fetch.of(eBay.oauth2Api).post(options, function (err, obj) {
            if (err) return reject(err);
            resolve(obj);
          });
        });

      case 'refresh_token':
        return new Promise(function (resolve, reject) {
          Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].fetch.of(eBay.oauth2Api).post(options, function (err, obj) {
            if (err) return reject(err);
            resolve(obj);
          });
        });

      case 'GetItem':
        return new Promise(function (resolve, reject) {
          Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].fetch.of(eBay.tradingApi).post(options, function (err, obj) {
            if (err) return reject(err);
            resolve(obj);
          });
        });

      case 'inventory_item':
        return new Promise(function (resolve, reject) {
          Utilities_ipcutils__WEBPACK_IMPORTED_MODULE_5__["default"].fetch.of(eBay.inventoryApi + '/' + operation).get(options, function (err, obj) {
            if (err) return reject(err);
            resolve(obj);
          });
        });

      default:
        return new Promise(function (resolve) {
          Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].error(displayName, 'Error', 'This operation is unknown.');
          resolve(options);
        });
    }
  },
  getConfig: function getConfig() {
    return this.request('config/fetch');
  },
  getItems: function getItems(options, page) {
    return this.request('findItemsByKeywords', this.optItems({
      appid: eBay.appid,
      page: page,
      operation: 'findItemsByKeywords'
    }, options));
  },
  getCompleteItems: function getCompleteItems(options, page) {
    return this.request('findCompletedItems', this.optItems({
      appid: eBay.appid,
      page: page,
      operation: 'findCompletedItems'
    }, options));
  },
  getProductsItems: function getProductsItems(options, page) {
    return this.request('findItemsByProduct', this.optProducts({
      appid: eBay.appid,
      page: page,
      operation: 'findItemsByProduct'
    }, options));
  },
  getAppToken: function getAppToken(scope) {
    return this.request('client_credentials', {
      appid: eBay.appid,
      certid: eBay.certid,
      runame: eBay.runame,
      scope: scope,
      operation: 'client_credentials',
      type: 'NV'
    });
  },
  getCode: function getCode(options, scope) {
    return this.request('code', this.optCode({
      appid: eBay.appid,
      runame: eBay.runame,
      operation: 'code',
      scope: scope
    }, options));
  },
  getUserToken: function getUserToken(code) {
    return this.request('authorization_code', {
      appid: eBay.appid,
      certid: eBay.certid,
      runame: eBay.runame,
      code: code,
      operation: 'authorization_code',
      type: 'NV'
    });
  },
  getRefreshToken: function getRefreshToken(scope) {
    return this.request('refresh_token', {
      appid: eBay.appid,
      certid: eBay.certid,
      token: eBay.usertoken.refresh_token,
      scope: scope,
      operation: 'refresh_token',
      type: 'NV'
    });
  },
  getItemDetails: function getItemDetails(options, items) {
    return this.request('GetItem', {
      appid: eBay.appid,
      token: eBay.token,
      items: items,
      options: options,
      operation: 'GetItem',
      type: 'XML'
    });
  },
  getInventoryItems: function getInventoryItems(options, token) {
    return this.request('inventory_item', {
      appid: eBay.appid,
      token: token,
      options: options,
      offset: 0,
      operation: 'inventory_item',
      type: 'JSON'
    });
  },
  putConfig: function putConfig(config) {
    return this.request('config/write', config);
  },
  putItems: function putItems(items) {
    return this.request('writeItemsByKeywords', items);
  },
  putCompleteItems: function putCompleteItems(items) {
    return this.request('writeCompletedItems', items);
  },
  putProductsItems: function putProductsItems(items) {
    return this.request('writeItemsByProduct', items);
  },
  fetchItems: function fetchItems(options, page) {
    return this.getItems(options, page).then(this.resItems).then(this.setItems);
  },
  fetchCompleteItems: function fetchCompleteItems(options, page) {
    return this.getCompleteItems(options, page).then(this.resCompleteItems).then(this.setItems);
  },
  fetchProductsItems: function fetchProductsItems(options, page) {
    return this.getProductsItems(options, page).then(this.resProductsItems).then(this.setItems);
  },
  writeItems: function writeItems(options) {
    var _this = this;

    var streamItems = function streamItems(idx) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this.getItems(options, idx));
    };

    var streamDetail = function streamDetail(objs) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this.getItemDetails(options, objs));
    };

    var forkItems = function forkItems(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["forkJoin"])(_this.forItems(options, obj));
    };

    return streamItems(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.resItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(forkItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["map"](this.resItems.bind(this))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["map"](this.setItems.bind(this))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["flatten"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(streamDetail));
  },
  writeCompleteItems: function writeCompleteItems(options) {
    var _this2 = this;

    var streamItems = function streamItems(idx) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this2.getCompleteItems(options, idx));
    };

    var streamDetail = function streamDetail(objs) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this2.getItemDetails(options, objs));
    };

    var forkItems = function forkItems(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["forkJoin"])(_this2.forCompleteItems(options, obj));
    };

    return streamItems(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.resCompleteItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(forkItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["map"](this.resCompleteItems.bind(this))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["map"](this.setItems.bind(this))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["flatten"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(streamDetail));
  },
  writeProductsItems: function writeProductsItems(options) {
    var _this3 = this;

    var streamItems = function streamItems(idx) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this3.getProductsItems(options, idx));
    };

    var streamDetail = function streamDetail(objs) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this3.getItemDetails(options, objs));
    };

    var forkItems = function forkItems(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["forkJoin"])(_this3.forProductsItems(options, obj));
    };

    return streamItems(1).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(this.resProductsItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(forkItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["map"](this.resProductsItems.bind(this))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["map"](this.setItems.bind(this))), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["flatten"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(streamDetail));
  },
  fetchAppToken: function fetchAppToken(state, scope) {
    var _this4 = this;

    var requestToken = function requestToken(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this4.getAppToken(obj));
    };

    var setToken = function setToken(obj) {
      return ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](eBay, {
        apptoken: obj,
        appstate: state
      });
    };

    var writeConfig = function writeConfig(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this4.putConfig(obj));
    };

    var getToken = function getToken(obj) {
      return obj.apptoken.access_token;
    };

    return requestToken(scope).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(setToken), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(writeConfig), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(getToken));
  },
  fetchUserToken: function fetchUserToken(state, scope) {
    var _this5 = this;

    var requestCode = function requestCode(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this5.getCode({
        state: state
      }, obj));
    };

    var requestToken = function requestToken(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this5.getUserToken(obj.authcode.code));
    };

    var convCode = function convCode(obj) {
      return ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](obj, {
        code: decodeURIComponent(obj.code)
      });
    };

    var setCode = function setCode(obj) {
      return ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](eBay, {
        authcode: convCode(obj)
      });
    };

    var setToken = function setToken(obj) {
      return ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](eBay, {
        usertoken: obj,
        userstate: state,
        refreshstate: state
      });
    };

    var writeConfig = function writeConfig(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this5.putConfig(obj));
    };

    var getToken = function getToken(obj) {
      return obj.usertoken.access_token;
    };

    return requestCode(scope).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(setCode), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(writeConfig), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(requestToken), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(setToken), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(writeConfig), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(getToken));
  },
  fetchRefreshToken: function fetchRefreshToken(state, scope) {
    var _this6 = this;

    var requestToken = function requestToken(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this6.getRefreshToken(obj));
    };

    var setToken = function setToken(obj) {
      return ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](eBay, {
        usertoken: ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](eBay.usertoken, obj),
        userstate: state
      });
    };

    var writeConfig = function writeConfig(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this6.putConfig(obj));
    };

    var getToken = function getToken(obj) {
      return obj.usertoken.access_token;
    };

    return requestToken(scope).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(setToken), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(writeConfig), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(getToken));
  },
  fetchToken: function fetchToken(scope) {
    var state = Date.now();
    var duUsrToken = eBay.usertoken.expires_in * 1000 + eBay.userstate;
    var duRefToken = eBay.usertoken.refresh_token_expires_in * 1000 + eBay.refreshstate;
    var isUsrToken = !!eBay.usertoken.access_token;
    var isRefToken = !!eBay.usertoken.refresh_token;
    var isUsrAvailable = duUsrToken - state > 0;
    var isRefAvailable = duRefToken - state > 0;
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(displayName, 'User Token (existence/validity/duration/modified):', isUsrToken, isUsrAvailable, Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].getLocalTimeStamp(duUsrToken), Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].getLocalTimeStamp(eBay.userstate));
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info(displayName, 'Refresh Token (existence/validity/duration/modified):', isRefToken, isRefAvailable, Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].getLocalTimeStamp(duRefToken), Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].getLocalTimeStamp(eBay.refreshstate));
    return !isUsrToken && isRefToken ? isUsrAvailable ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])([eBay.usertoken.access_token]) : isRefAvailable ? this.fetchRefreshToken(state, scope) : this.fetchUserToken(state, scope) : this.fetchUserToken(state, scope);
  },
  writeInventoryItems: function writeInventoryItems(options) {
    var _this7 = this;

    var scope = ['https://api.ebay.com/oauth/api_scope', 'https://api.ebay.com/oauth/api_scope/sell.marketing.readonly', 'https://api.ebay.com/oauth/api_scope/sell.marketing', 'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly', 'https://api.ebay.com/oauth/api_scope/sell.inventory', 'https://api.ebay.com/oauth/api_scope/sell.account.readonly', 'https://api.ebay.com/oauth/api_scope/sell.account', 'https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly', 'https://api.ebay.com/oauth/api_scope/sell.fulfillment', 'https://api.ebay.com/oauth/api_scope/sell.analytics.readonly'];

    var streamItems = function streamItems(obj) {
      return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_this7.getInventoryItems(options, obj));
    }; //  const streamDetail  = objs  => from(this.getItemDetails(objs));
    //  const forkItems     = obj   => forkJoin(this.forInventoryItems(options, obj));
    //  const forkJSON      = obj   => forkJoin(util.toJSON(obj));


    return this.fetchToken(scope).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["flatMap"])(streamItems), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(ramda__WEBPACK_IMPORTED_MODULE_0__["tap"](this.logTrace.bind(this))) //      map(this.resInventoryItems)
    //    , flatMap(forkItems)
    //    , map(R.map(this.resInventoryItems.bind(this)))
    //    , map(R.map(this.setItems.bind(this)))
    //    , map(R.flatten)
    //    , flatMap(from)
    //    , flatMap(streamDetail)
    //    , flatMap(forkJSON)
    //    , map(R.map(this.resDetail.bind(this)))
    //    , map(R.map(this.setDetail.bind(this)))
    //    , map(R.filter(R.curry(this.filterDetail.bind(this))(options)))
    //    , map(R.map(this.renderDetail.bind(this)))
    //    , map(R.map(util.toCSV.bind(this)))
    //    , map(R.map(csv => csv + '\n'))
    );
  },
  forItems: function forItems(options, res) {
    var pages = Number(options.pages);
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];

    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getItems(options, idx));
    }

    return newItems;
  },
  forCompleteItems: function forCompleteItems(options, res) {
    var pages = Number(options.pages);
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];

    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getCompleteItems(options, idx));
    }

    return newItems;
  },
  forProductsItems: function forProductsItems(options, res) {
    var pages = Number(options.pages);
    var page = Number(res.paginationOutput[0].totalPages[0]) < pages ? Number(res.paginationOutput[0].totalPages[0]) : pages;
    var newItems = [];

    for (var idx = 1; idx <= page; idx++) {
      newItems.push(this.getProductsItems(options, idx));
    }

    return newItems;
  },
  resItems: function resItems(obj) {
    return obj.hasOwnProperty('findItemsByKeywordsResponse') ? obj.findItemsByKeywordsResponse[0] : null;
  },
  resCompleteItems: function resCompleteItems(obj) {
    return obj.hasOwnProperty('findCompletedItemsResponse') ? obj.findCompletedItemsResponse[0] : null;
  },
  resProductsItems: function resProductsItems(obj) {
    return obj.hasOwnProperty('findItemsByProductResponse') ? obj.findItemsByProductResponse[0] : null;
  },
  setItems: function setItems(obj) {
    return obj && obj.ack[0] === 'Success' ? obj.searchResult[0].item : null;
  },
  optCode: function optCode(o, p) {
    var _o = o;

    var _p = p ? p : {};

    var search = new Object();
    search['client_id'] = _o.appid;
    search['redirect_uri'] = _o.runame;
    search['response_type'] = _o.operation;
    search['scope'] = ramda__WEBPACK_IMPORTED_MODULE_0__["join"](' ', _o.scope);
    search['state'] = _p.state;
    return {
      search: search,
      operation: _o.operation,
      state: _p.state
    };
  },
  optItems: function optItems(o, p) {
    var _o = o;

    var _p = p ? p : {};

    var options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 100;
    options['paginationInput.pageNumber'] = _o.page;

    if (_p.searchString) {
      options['keywords'] = _p.searchString;
    } else {
      options['keywords'] = '';
    }

    var n = 0;

    if (_p.seller && _p.seller.length) {
      options['itemFilter(' + n + ').name'] = 'Seller';

      _p.seller.forEach(function (slr, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = slr;
      });

      n++;
    }

    if (_p.highestPrice) {
      options['itemFilter(' + n + ').name'] = 'MaxPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.highestPrice;
      n++;
    }

    if (_p.lowestPrice) {
      options['itemFilter(' + n + ').name'] = 'MinPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.lowestPrice;
      n++;
    }

    if (_p.condition && _p.condition.length) {
      options['itemFilter(' + n + ').name'] = 'Condition';

      _p.condition.forEach(function (cdn, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = cdn;
      });

      n++;
    }

    if (_p.soldItemOnly === true) {
      options['itemFilter(' + n + ').name'] = 'SoldItemOnly';
      options['itemFilter(' + n + ').value(0)'] = 'true';
      n++;
    }

    if (Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].isValidDate(_p.startDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeFrom';
      options['itemFilter(' + n + ').value(0)'] = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].setTimeStamp(_p.startDate);
      n++;
    }

    if (Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].isValidDate(_p.endDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeTo';
      options['itemFilter(' + n + ').value(0)'] = Utilities_stdutils__WEBPACK_IMPORTED_MODULE_4__["default"].setTimeStamp(_p.endDate);
      n++;
    } //log.trace(displayName, 'optItems:', options);


    return options;
  },
  optProducts: function optProducts(o, p) {
    var _o = o;

    var _p = p ? p : {};

    var options = new Object();
    options['GLOBAL-ID'] = 'EBAY-US';
    options['MESSAGE-ENCODING'] = 'UTF-8';
    options['OPERATION-NAME'] = _o.operation;
    options['REQUEST-DATA-FORMAT'] = 'NV';
    options['RESPONSE-DATA-FORMAT'] = 'JSON';
    options['REST-PAYLOAD'] = '';
    options['SECURITY-APPNAME'] = _o.appid;
    options['SERVICE-VERSION'] = '1.13.0';
    options['outputSelector'] = 'SellerInfo';
    options['paginationInput.entriesPerPage'] = 10;
    options['paginationInput.pageNumber'] = _o.page;

    if (_p.productId && _p.productType) {
      options['productId'] = _p.productId;
      options['productId.@type'] = _p.productType;
    } else {
      options['productId'] = '';
      options['productId.@type'] = '';
    }

    var n = 0;

    if (_p.seller && _p.seller.length) {
      options['itemFilter(' + n + ').name'] = 'Seller';

      _p.seller.forEach(function (slr, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = slr;
      });

      n++;
    }

    if (_p.highestPrice) {
      options['itemFilter(' + n + ').name'] = 'MaxPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.highestPrice;
      n++;
    }

    if (_p.lowestPrice) {
      options['itemFilter(' + n + ').name'] = 'MinPrice';
      options['itemFilter(' + n + ').value(0)'] = _p.lowestPrice;
      n++;
    }

    if (_p.condition && _p.condition.length) {
      options['itemFilter(' + n + ').name'] = 'Condition';

      _p.condition.forEach(function (cdn, idx) {
        return options['itemFilter(' + n + ').value(' + idx + ')'] = cdn;
      });

      n++;
    } //log.trace(displayName, 'optProducts:', options);


    return options;
  },
  logTrace: function logTrace(obj) {
    return Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace(displayName, 'Trace log:', obj);
  },
  logError: function logError(err) {
    return Utilities_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].error(displayName, 'Error occurred:', err);
  }
});

/***/ }),

/***/ "./stores/appStore.js":
/*!****************************!*\
  !*** ./stores/appStore.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var AppStore =
/*#__PURE__*/
function (_ReduceStore) {
  _inherits(AppStore, _ReduceStore);

  function AppStore() {
    _classCallCheck(this, AppStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(AppStore).apply(this, arguments));
  }

  _createClass(AppStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return {
        selected: 0,
        title: '',
        config: {
          selected: '',
          title: '',
          appid: '',
          certid: '',
          token: '',
          runame: '',
          authorizeApi: '',
          oauth2Api: '',
          findingApi: '',
          tradingApi: '',
          inventoryApi: '',
          marketingApi: '',
          analyticsApi: '',
          authcode: null,
          usertoken: null
        },
        options: null
      };
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'content/select':
          return Object.assign({}, state, {
            selected: action.selected,
            title: action.title
          });

        case 'config/fetch/appid':
          return Object.assign({}, state, {
            config: action.config
          });

        case 'config/write/appid':
          return Object.assign({}, state, {
            config: action.config
          });

        case 'item/write/inventory':
          return Object.assign({}, state, {
            options: action.options
          });

        default:
          return state;
      }
    }
  }]);

  return AppStore;
}(flux_utils__WEBPACK_IMPORTED_MODULE_0__["ReduceStore"]);

;
/* harmony default export */ __webpack_exports__["default"] = (new AppStore(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./stores/completeStore.js":
/*!*********************************!*\
  !*** ./stores/completeStore.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var displayName = "completeStore";

var CompleteStore =
/*#__PURE__*/
function (_ReduceStore) {
  _inherits(CompleteStore, _ReduceStore);

  function CompleteStore() {
    _classCallCheck(this, CompleteStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(CompleteStore).apply(this, arguments));
  }

  _createClass(CompleteStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return {
        page: 0,
        items: null,
        options: {
          searchString: '',
          pages: '',
          highestPrice: '',
          lowestPrice: '',
          shipping: [],
          condition: [],
          status: [],
          itemId: [],
          categoryPath: [],
          seller: [],
          soldItemOnly: false,
          startDate: '',
          endDate: ''
        }
      };
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'item/fetch/complete':
          return Object.assign({}, state, {
            items: action.items,
            options: action.options,
            page: action.page
          });

        case 'item/write/complete':
          return Object.assign({}, state, {
            options: action.options
          });

        default:
          return state;
      }
    }
  }]);

  return CompleteStore;
}(flux_utils__WEBPACK_IMPORTED_MODULE_0__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["default"] = (new CompleteStore(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./stores/noteStore.js":
/*!*****************************!*\
  !*** ./stores/noteStore.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var displayName = "noteStore";

var NoteStore =
/*#__PURE__*/
function (_ReduceStore) {
  _inherits(NoteStore, _ReduceStore);

  function NoteStore() {
    _classCallCheck(this, NoteStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(NoteStore).apply(this, arguments));
  }

  _createClass(NoteStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return {
        page: 0,
        items: null,
        options: {
          searchString: '',
          pages: '',
          highestPrice: '',
          lowestPrice: '',
          shipping: [],
          condition: [],
          status: [],
          itemId: [],
          categoryPath: [],
          seller: [],
          startDate: '',
          endDate: ''
        }
      };
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'item/fetch/note':
          return Object.assign({}, state, {
            items: action.items,
            options: action.options,
            page: action.page
          });

        case 'item/write/note':
          return Object.assign({}, state, {
            options: action.options
          });

        default:
          return state;
      }
    }
  }]);

  return NoteStore;
}(flux_utils__WEBPACK_IMPORTED_MODULE_0__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["default"] = (new NoteStore(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./stores/productsStore.js":
/*!*********************************!*\
  !*** ./stores/productsStore.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Main/dispatcher */ "./dispatcher.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var displayName = "productsStore";

var ProductsStore =
/*#__PURE__*/
function (_ReduceStore) {
  _inherits(ProductsStore, _ReduceStore);

  function ProductsStore() {
    _classCallCheck(this, ProductsStore);

    return _possibleConstructorReturn(this, _getPrototypeOf(ProductsStore).apply(this, arguments));
  }

  _createClass(ProductsStore, [{
    key: "getInitialState",
    value: function getInitialState() {
      return {
        page: 0,
        items: null,
        options: {
          productId: '',
          productType: '',
          pages: '',
          highestPrice: '',
          lowestPrice: '',
          shipping: [],
          condition: [],
          status: [],
          itemId: [],
          categoryPath: [],
          seller: []
        }
      };
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      switch (action.type) {
        case 'item/fetch/products':
          return Object.assign({}, state, {
            items: action.items,
            options: action.options,
            page: action.page
          });

        case 'item/write/products':
          return Object.assign({}, state, {
            options: action.options
          });

        default:
          return state;
      }
    }
  }]);

  return ProductsStore;
}(flux_utils__WEBPACK_IMPORTED_MODULE_0__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["default"] = (new ProductsStore(Main_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./utils/ipcutils.js":
/*!***************************!*\
  !*** ./utils/ipcutils.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ramda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ramda */ "../node_modules/ramda/es/index.js");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var Utilities_stdutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Utilities/stdutils */ "./utils/stdutils.js");
/* harmony import */ var Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! Utilities/webutils */ "./utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var ipc =
/*#__PURE__*/
function () {
  function ipc(props) {
    _classCallCheck(this, ipc);

    this.props = props;
  }

  _createClass(ipc, [{
    key: "send",
    value: function send(request, callback) {
      var _this = this;

      electron__WEBPACK_IMPORTED_MODULE_2__["ipcRenderer"].on('asynchronous-reply', function (event, _ref) {
        var error = _ref.error,
            response = _ref.response;
        if (error) return callback(error);

        _this.setProps({
          event: event
        });

        callback(null, response);
      });
      electron__WEBPACK_IMPORTED_MODULE_2__["ipcRenderer"].send('asynchronous-message', request);
    }
  }, {
    key: "sendSync",
    value: function sendSync(request) {
      var _ipcRenderer$sendSync = electron__WEBPACK_IMPORTED_MODULE_2__["ipcRenderer"].sendSync('synchronous-message', request),
          error = _ipcRenderer$sendSync.error,
          response = _ipcRenderer$sendSync.response;

      if (error) return error;
      return response;
    }
  }, {
    key: "setState",
    value: function setState(state) {
      this.state = ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](this.state, state);
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      this.props = ramda__WEBPACK_IMPORTED_MODULE_0__["merge"](this.props, props);
    }
  }, {
    key: "props",
    set: function set(props) {
      this._props = props;
    },
    get: function get() {
      return this._props;
    }
  }]);

  return ipc;
}();

;
ipc.displayName = 'ipc';

var fetch =
/*#__PURE__*/
function (_ipc) {
  _inherits(fetch, _ipc);

  function fetch(props) {
    var _this2;

    _classCallCheck(this, fetch);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(fetch).call(this, props));
    _this2.state = {
      url: props.url,
      response: ''
    };
    return _this2;
  }

  _createClass(fetch, [{
    key: "auth",
    value: function auth(request, callback) {
      var url = this.state.url;
      var search = request.search;
      var authUrl = search ? url + '?' + Utilities_stdutils__WEBPACK_IMPORTED_MODULE_3__["default"].urlencode(search) : url; //log.info(fetch.displayName, 'authUrl', authUrl);

      var BrowserWindow = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].BrowserWindow;
      var authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
          nodeIntegration: false,
          webSecurity: false
        }
      });

      var handleChangeUrl = function handleChangeUrl(newUrl) {
        //log.info(fetch.displayName, 'newUrl', newUrl);
        var raw_code = /code=([^&]*)/.exec(newUrl) || null;
        var raw_state = /state=([^&]*)/.exec(newUrl) || null;
        var raw_expire = /expires_in=([^&]*)/.exec(newUrl) || null;
        var code = raw_code && raw_code.length > 1 ? raw_code[1] : null;
        var state = raw_state && raw_state.length > 1 ? raw_state[1] : null;
        var expires_in = raw_expire && raw_expire.length > 1 ? raw_expire[1] : null;

        if (code && state && expires_in) {
          authWindow.destroy();
          if (Number(state) === request.state) callback(null, {
            code: code,
            state: state,
            expires_in: expires_in
          });
          callback({
            name: 'Error',
            message: 'This redirect page was not the expected status.'
          });
        }
      };

      authWindow.webContents.on('did-finish-load', function () {
        return handleChangeUrl(authWindow.webContents.getURL());
      });
      authWindow.once('ready-to-show', function () {
        return authWindow.show();
      });
      authWindow.on('close', function () {
        authWindow.hide();
        callback({
          name: 'Canceled',
          message: 'Content was incomplete. Please check the contents once again.'
        });
      });
      authWindow.loadURL(authUrl);
    }
  }, {
    key: "get",
    value: function get(request, callback) {
      var _this3 = this;

      var url = this.state.url;
      this.send(ramda__WEBPACK_IMPORTED_MODULE_0__["merge"]({
        url: url,
        method: 'GET'
      }, request), function (error, response) {
        if (error) return callback(error);

        _this3.setState({
          response: response
        });

        callback(null, response);
      });
    }
  }, {
    key: "post",
    value: function post(request, callback) {
      var _this4 = this;

      var url = this.state.url;
      this.send(ramda__WEBPACK_IMPORTED_MODULE_0__["merge"]({
        url: url,
        method: 'POST'
      }, request), function (error, response) {
        if (error) return callback(error);

        _this4.setState({
          response: response
        });

        callback(null, response);
      });
    }
  }, {
    key: "_post",
    value: function _post(request) {
      var url = this.state.url;
      var response = this.sendSync(ramda__WEBPACK_IMPORTED_MODULE_0__["merge"]({
        url: url,
        method: 'POST'
      }, request));
      this.setState({
        response: response
      });
      return response;
    }
  }], [{
    key: "of",
    value: function of(props) {
      props = ramda__WEBPACK_IMPORTED_MODULE_0__["is"](Object, props) ? props : {
        url: props
      };
      return new fetch(props);
    }
  }]);

  return fetch;
}(ipc);

;
fetch.displayName = 'fetch';
var win = {
  displayName: 'win',
  showSaveDialog: function showSaveDialog(callback) {
    var title = 'Save';
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__["log"].info(win.displayName, 'showSaveDialog', title);
    var current = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].getCurrentWindow();
    var options = {
      title: title,
      filters: [{
        name: 'CSV File',
        extensions: ['csv']
      }, {
        name: 'All Files',
        extensions: ['*']
      }]
    };
    electron__WEBPACK_IMPORTED_MODULE_2__["remote"].dialog.showSaveDialog(current, options, callback);
  },
  showErrorBox: function showErrorBox(_ref2) {
    var name = _ref2.name,
        message = _ref2.message;

    if (message.errors) {
      name = message.errors[0].message;
      message = message.errors[0].longMessage;
    } else if (message.error) {
      name = message.error;
      message = message.error_description;
    }

    Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__["log"].info(win.displayName, 'showErrorBox', name);
    electron__WEBPACK_IMPORTED_MODULE_2__["remote"].dialog.showErrorBox(name, message);
  },
  showCloseMessageBox: function showCloseMessageBox(callback) {
    var title = 'Quit';
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__["log"].info(win.displayName, 'showCloseMessageBox', title);
    var current = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].getCurrentWindow();
    var options = {
      title: title,
      type: 'info',
      buttons: ['OK', 'Cancel'],
      message: 'Would you like to close this window?',
      detail: 'Close this window.'
    };
    electron__WEBPACK_IMPORTED_MODULE_2__["remote"].dialog.showMessageBox(current, options, callback);
  },
  showSaveMessageBox: function showSaveMessageBox() {
    var title = 'Save';
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__["log"].info(win.displayName, 'showSaveMessageBox', title);
    var current = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].getCurrentWindow();
    var options = {
      title: title,
      type: 'info',
      buttons: ['OK'],
      message: 'Save file',
      detail: 'CSV file saved.'
    };
    electron__WEBPACK_IMPORTED_MODULE_2__["remote"].dialog.showMessageBox(current, options);
  },
  close: function close() {
    var title = 'Close';
    Utilities_webutils__WEBPACK_IMPORTED_MODULE_4__["log"].info(win.displayName, 'close', title);
    var current = electron__WEBPACK_IMPORTED_MODULE_2__["remote"].getCurrentWindow();
    current.close();
  }
};
var sys = {
  displayName: 'sys',
  addbomFile: function addbomFile(filename) {
    var obj = Buffer.from([0xEF, 0xBB, 0xBF]);
    return new Promise(function (resolve, reject) {
      fs__WEBPACK_IMPORTED_MODULE_1___default.a.appendFile(filename, obj, function (err) {
        if (err) reject(err);
        resolve('File has been saved!');
      });
    });
  },
  saveFile: function saveFile(filename, obj) {
    return new Promise(function (resolve, reject) {
      fs__WEBPACK_IMPORTED_MODULE_1___default.a.appendFile(filename, obj, function (err) {
        if (err) reject(err);
        resolve('File has been saved!');
      });
    });
  },
  touchFile: function touchFile(filename) {
    return new Promise(function (resolve) {
      fs__WEBPACK_IMPORTED_MODULE_1___default.a.closeSync(fs__WEBPACK_IMPORTED_MODULE_1___default.a.openSync(filename, 'w', 438));
      resolve('File has been touched!');
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = ({
  fetch: fetch,
  win: win,
  sys: sys
});

/***/ }),

/***/ "./utils/spin.js":
/*!***********************!*\
  !*** ./utils/spin.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright (c) 2011-2014 Felix Gnass
 * Licensed under the MIT license
 * http://spin.js.org/
 *
 * Example:
    const opts = {
      lines: 12             // The number of lines to draw
    , length: 7             // The length of each line
    , width: 5              // The line thickness
    , radius: 10            // The radius of the inner circle
    , scale: 1.0            // Scales overall size of the spinner
    , corners: 1            // Roundness (0..1)
    , color: '#000'         // #rgb or #rrggbb
    , opacity: 1/4          // Opacity of the lines
    , rotate: 0             // Rotation offset
    , direction: 1          // 1: clockwise, -1: counterclockwise
    , speed: 1              // Rounds per second
    , trail: 100            // Afterglow percentage
    , fps: 20               // Frames per second when using setTimeout()
    , zIndex: 2e9           // Use a high z-index by default
    , className: 'spinner'  // CSS class to assign to the element
    , top: '50%'            // center vertically
    , left: '50%'           // center horizontally
    , shadow: false         // Whether to render a shadow
    , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
    , position: 'absolute'  // Element positioning
    }
    const target = document.getElementById('foo')
    const spinner = new Spinner(opts).spin(target)
 */
;

(function (root, factory) {
  /* CommonJS */
  if (( false ? undefined : _typeof(module)) === 'object' && module.exports) module.exports = factory();
  /* AMD module */
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* Browser global */
    else {}
})(this, function () {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O']
  /* Vendor prefixes */
  ,
      animations = {}
  /* Animation rules keyed by their name */
  ,
      useCssAnimations
  /* Whether to use CSS animations or setTimeout */
  ,
      sheet;
  /* A stylesheet to hold the @keyframe or VML rules. */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */

  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div'),
        n;

    for (n in prop) {
      el[n] = prop[n];
    }

    return el;
  }
  /**
   * Appends children and returns the parent.
   */


  function ins(parent
  /* child1, child2, ...*/
  ) {
    for (var i = 1, n = arguments.length; i < n; i++) {
      parent.appendChild(arguments[i]);
    }

    return parent;
  }
  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */


  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha * 100), i, lines].join('-'),
        start = 0.01 + i / lines * 100,
        z = Math.max(1 - (1 - alpha) / trail * (100 - start), alpha),
        prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase(),
        pre = prefix && '-' + prefix + '-' || '';

    if (!animations[name]) {
      sheet.insertRule('@' + pre + 'keyframes ' + name + '{' + '0%{opacity:' + z + '}' + start + '%{opacity:' + alpha + '}' + (start + 0.01) + '%{opacity:1}' + (start + trail) % 100 + '%{opacity:' + alpha + '}' + '100%{opacity:' + z + '}' + '}', sheet.cssRules.length);
      animations[name] = 1;
    }

    return name;
  }
  /**
   * Tries various vendor prefixes and returns the first supported property.
   */


  function vendor(el, prop) {
    var s = el.style,
        pp,
        i;
    prop = prop.charAt(0).toUpperCase() + prop.slice(1);
    if (s[prop] !== undefined) return prop;

    for (i = 0; i < prefixes.length; i++) {
      pp = prefixes[i] + prop;
      if (s[pp] !== undefined) return pp;
    }
  }
  /**
   * Sets multiple style properties at once.
   */


  function css(el, prop) {
    for (var n in prop) {
      el.style[vendor(el, n) || n] = prop[n];
    }

    return el;
  }
  /**
   * Fills in default values.
   */


  function merge(obj) {
    for (var i = 1; i < arguments.length; i++) {
      var def = arguments[i];

      for (var n in def) {
        if (obj[n] === undefined) obj[n] = def[n];
      }
    }

    return obj;
  }
  /**
   * Returns the line color from the given string or array.
   */


  function getColor(color, idx) {
    return typeof color === 'string' ? color : color[idx % color.length];
  } // Built-in defaults


  var defaults = {
    lines: 12 // The number of lines to draw
    ,
    length: 7 // The length of each line
    ,
    width: 5 // The line thickness
    ,
    radius: 10 // The radius of the inner circle
    ,
    scale: 1.0 // Scales overall size of the spinner
    ,
    corners: 1 // Roundness (0..1)
    ,
    color: '#000' // #rgb or #rrggbb
    ,
    opacity: 1 / 4 // Opacity of the lines
    ,
    rotate: 0 // Rotation offset
    ,
    direction: 1 // 1: clockwise, -1: counterclockwise
    ,
    speed: 1 // Rounds per second
    ,
    trail: 100 // Afterglow percentage
    ,
    fps: 20 // Frames per second when using setTimeout()
    ,
    zIndex: 2e9 // Use a high z-index by default
    ,
    className: 'spinner' // CSS class to assign to the element
    ,
    top: '50%' // center vertically
    ,
    left: '50%' // center horizontally
    ,
    shadow: false // Whether to render a shadow
    ,
    hwaccel: false // Whether to use hardware acceleration (might be buggy)
    ,
    position: 'absolute' // Element positioning

    /** The constructor */

  };

  function Spinner(o) {
    this.opts = merge(o || {}, Spinner.defaults, defaults);
  } // Global defaults that override the built-ins:


  Spinner.defaults = {};
  merge(Spinner.prototype, {
    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function spin(target) {
      this.stop();
      var self = this,
          o = self.opts,
          el = self.el = createEl(null, {
        className: o.className
      });
      css(el, {
        position: o.position,
        width: 0,
        zIndex: o.zIndex,
        left: o.left,
        top: o.top
      });

      if (target) {
        target.insertBefore(el, target.firstChild || null);
      }

      el.setAttribute('role', 'progressbar');
      self.lines(el, self.opts);

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0,
            start = (o.lines - 1) * (1 - o.direction) / 2,
            alpha,
            fps = o.fps,
            f = fps / o.speed,
            ostep = (1 - o.opacity) / (f * o.trail / 100),
            astep = f / o.lines;

        (function anim() {
          i++;

          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity);
            self.opacity(el, j * o.direction + start, alpha, o);
          }

          self.timeout = self.el && setTimeout(anim, ~~(1000 / fps));
        })();
      }

      return self;
    }
    /**
     * Stops and removes the Spinner.
     */
    ,
    stop: function stop() {
      var el = this.el;

      if (el) {
        clearTimeout(this.timeout);
        if (el.parentNode) el.parentNode.removeChild(el);
        this.el = undefined;
      }

      return this;
    }
    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    ,
    lines: function lines(el, o) {
      var i = 0,
          start = (o.lines - 1) * (1 - o.direction) / 2,
          seg;

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: o.scale * (o.length + o.width) + 'px',
          height: o.scale * o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360 / o.lines * i + o.rotate) + 'deg) translate(' + o.scale * o.radius + 'px' + ',0)',
          borderRadius: (o.corners * o.scale * o.width >> 1) + 'px'
        });
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1 + ~(o.scale * o.width / 2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1 / o.speed + 's linear infinite'
        });
        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px #000'), {
          top: '2px'
        }));
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')));
      }

      return el;
    }
    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    ,
    opacity: function opacity(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val;
    }
  });

  function initVML() {
    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr);
    } // No CSS transforms but VML support, add a CSS rule for VML elements:


    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)');

    Spinner.prototype.lines = function (el, o) {
      var r = o.scale * (o.length + o.width),
          s = o.scale * 2 * r;

      function grp() {
        return css(vml('group', {
          coordsize: s + ' ' + s,
          coordorigin: -r + ' ' + -r
        }), {
          width: s,
          height: s
        });
      }

      var margin = -(o.width + o.length) * o.scale * 2 + 'px',
          g = css(grp(), {
        position: 'absolute',
        top: margin,
        left: margin
      }),
          i;

      function seg(i, dx, filter) {
        ins(g, ins(css(grp(), {
          rotation: 360 / o.lines * i + 'deg',
          left: ~~dx
        }), ins(css(vml('roundrect', {
          arcsize: o.corners
        }), {
          width: r,
          height: o.scale * o.width,
          left: o.scale * o.radius,
          top: -o.scale * o.width >> 1,
          filter: filter
        }), vml('fill', {
          color: getColor(o.color, i),
          opacity: o.opacity
        }), vml('stroke', {
          opacity: 0
        }) // transparent stroke to fix color bleeding upon opacity change
        )));
      }

      if (o.shadow) for (i = 1; i <= o.lines; i++) {
        seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)');
      }

      for (i = 1; i <= o.lines; i++) {
        seg(i);
      }

      return ins(el, g);
    };

    Spinner.prototype.opacity = function (el, i, val, o) {
      var c = el.firstChild;
      o = o.shadow && o.lines || 0;

      if (c && i + o < c.childNodes.length) {
        c = (_readOnlyError("c"), c.childNodes[i + o]);
        c = (_readOnlyError("c"), c && c.firstChild);
        c = (_readOnlyError("c"), c && c.firstChild);
        if (c) c.opacity = val;
      }
    };
  }

  if (typeof document !== 'undefined') {
    sheet = function () {
      var el = createEl('style', {
        type: 'text/css'
      });
      ins(document.getElementsByTagName('head')[0], el);
      return el.sheet || el.styleSheet;
    }();

    var probe = css(createEl('group'), {
      behavior: 'url(#default#VML)'
    });
    if (!vendor(probe, 'transform') && probe.adj) initVML();else useCssAnimations = vendor(probe, 'animation');
  }

  return Spinner;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./utils/stdutils.js":
/*!***************************!*\
  !*** ./utils/stdutils.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! querystring */ "querystring");
/* harmony import */ var querystring__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(querystring__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }




var env = process.env.PLATFORM || 'local';
var isNode = env === 'local';
var color_code = {
  Reset: isNode ? "\x1b[0m" : '',
  Bright: isNode ? "\x1b[1m" : '',
  Dim: isNode ? "\x1b[2m" : '',
  Underscore: isNode ? "\x1b[4m" : '',
  Blink: isNode ? "\x1b[5m" : '',
  Reverse: isNode ? "\x1b[7m" : '',
  Hidden: isNode ? "\x1b[8m" : '',
  FgBlack: isNode ? "\x1b[30m" : '',
  FgRed: isNode ? "\x1b[31m" : '',
  FgGreen: isNode ? "\x1b[32m" : '',
  FgYellow: isNode ? "\x1b[33m" : '',
  FgBlue: isNode ? "\x1b[34m" : '',
  FgMagenta: isNode ? "\x1b[35m" : '',
  FgCyan: isNode ? "\x1b[36m" : '',
  FgWhite: isNode ? "\x1b[37m" : '',
  BgBlack: isNode ? "\x1b[40m" : '',
  BgRed: isNode ? "\x1b[41m" : '',
  BgGreen: isNode ? "\x1b[42m" : '',
  BgYellow: isNode ? "\x1b[43m" : '',
  BgBlue: isNode ? "\x1b[44m" : '',
  BgMagenta: isNode ? "\x1b[45m" : '',
  BgCyan: isNode ? "\x1b[46m" : '',
  BgWhite: isNode ? "\x1b[47m" : ''
};
var std = {
  toRGBa: function toRGBa(str, a) {
    var r = parseInt(str.substr(1, 2), 16);
    var g = parseInt(str.substr(3, 2), 16);
    var b = parseInt(str.substr(5, 2), 16);
    return "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
  },
  logError: function logError(caller, name, message) {
    var date = color_code['FgRed'] + "[".concat(this.getLocalISOTimeStamp(new Date()), "]");
    var head = color_code['Reset'] + name;
    console.error(date, '[ERROR]', caller, '-', head, ':', message);
  },
  logWarn: function logWarn(caller, name, message) {
    var date = color_code['FgYellow'] + "[".concat(this.getLocalISOTimeStamp(new Date()), "]");
    var head = color_code['Reset'] + name;
    console.warn(date, '[WARN]', caller, '-', head, ':', message);
  },
  logDebug: function logDebug(caller, name, message) {
    var date = color_code['FgCyan'] + "[".concat(this.getLocalISOTimeStamp(new Date()), "]");
    var head = color_code['Reset'] + name;
    console.log(date, '[DEBUG]', caller, '-', head, ':', message);
  },
  logTrace: function logTrace(caller, name, message) {
    var date = color_code['FgBlue'] + "[".concat(this.getLocalISOTimeStamp(new Date()), "]");
    var head = color_code['Reset'] + name;
    console.trace(date, '[TRACE]', caller, '-', head, ':', message);
  },
  logInfo: function logInfo(caller, name, message) {
    var date = color_code['FgGreen'] + "[".concat(this.getLocalISOTimeStamp(new Date()), "]");
    var head = color_code['Reset'] + name;
    console.info(date, '[INFO]', caller, '-', head, ':', message);
  },
  is: function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
  },

  /**
   * Copy the enumerable properties of p to o, and return o.
   * If o and p have a property by the same name, o's property is 
   * overwritten. This function does not handle getters and setters 
   * or copy attributes.
   *
   * @param {object} o
   * @param {object} p
   * @returns {object}
   */
  extend: function extend(o, p) {
    for (var prop in p) {
      // For all props in p.
      o[prop] = p[prop]; // Add the property to o.
    }

    return o;
  },

  /**
   * Copy the enumerable properties of p to o, and return o.
   * If o and p have a property by the same name, o's property is 
   * left alone. This function does not handle getters and setters 
   * or copy attributes.
   *
   * @param {object} o
   * @param {object} p
   * @returns {object}
   */
  merge: function merge(o, p) {
    for (var prop in p) {
      // For all props in p.
      if (o.hasOwnProperty[prop]) continue; // Except those already in o.

      o[prop] = p[prop]; // Add the property to o.
    }

    return o;
  },

  /**
   * Remove properties from o if there is not a property with the 
   * same name in p. Return o.
   *
   * @param {object} o
   * @param {object} p
   * @returns {object}
   */
  restrict: function restrict(o, p) {
    for (var prop in o) {
      // For all props in o
      if (!(prop in p)) delete o[prop]; // Delete if not in p
    }

    return o;
  },

  /**
   * For each property of p, delete the property with the same name 
   * from o. Return o.
   *
   * @param {object} o
   * @param {object} p
   * @returns {object}
   */
  subtract: function subtract(o, p) {
    for (var prop in p) {
      // For all props in p
      delete o[prop]; // Delete from o (deleting a
      // nonexistent prop is harmless)
    }

    return o;
  },

  /**
   * Return a new object that holds the properties of both o and p.
   * If o and p have properties by the same name, the values 
   * from o are used.
   *
   * @param {object} o
   * @param {object} p
   * @returns {object}
   */
  union: function union(o, p) {
    return extend(extend({}, o), p);
  },

  /**
   * Return a new object that holds only the properties of o that 
   * also appear in p. This is something like the intersection of o 
   * and p, but the values of the properties in p are discarded
   *
   * @param {object} o
   * @param {object} p
   * @returns {object}
   */
  intersection: function intersection(o, p) {
    return restrict(extend({}, o), p);
  },

  /**
   * Return an array that holds the names of the enumerable own 
   * properties of o.
   *
   * @param {object} o
   * @returns {array}
   */
  keys: function keys(o) {
    if (_typeof(o) !== "object") throw TypeError(); // Object argument required

    var result = []; // The array we will return

    for (var prop in o) {
      // For all enumerable properties
      if (o.hasOwnProperty(prop)) // If it is an own property
        result.push(prop); // add it to the array.
    }

    return result; // Return the array.
  },

  /**
   * and
   *
   * @param {array} o
   * @param {array} p
   * @returns {array}
   */
  and: function and(o, p) {
    if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    var _p = p.filter(function (x) {
      return x;
    });

    var result = _o.concat(_p).filter(function (x, i, y) {
      return y.indexOf(x) !== y.lastIndexOf(x);
    }).filter(function (x, i, y) {
      return y.indexOf(x) === i;
    });

    return result;
  },

  /**
   * del
   *
   * @param {array} o
   * @param {array} p
   * @returns {array}
   */
  del: function del(o, p) {
    if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    var _p = p.filter(function (x) {
      return x;
    });

    var result = _o.filter(function (x, i, y) {
      return _p.indexOf(x) === -1;
    });

    return result;
  },

  /**
   * add
   *
   * @param {array} o
   * @param {array} p
   * @returns {array}
   */
  add: function add(o, p) {
    if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    var _p = p.filter(function (x) {
      return x;
    });

    var result = _p.filter(function (x, i, y) {
      return _o.indexOf(x) === -1;
    });

    return result;
  },

  /**
   * dif
   *
   * @param {array} o
   * @param {array} p
   * @returns {array}
   */
  dif: function dif(o, p) {
    if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    var _p = p.filter(function (x) {
      return x;
    });

    var result = _o.filter(function (x, i, y) {
      return _p.indexOf(x) === -1;
    }).concat(_p.filter(function (x, i, y) {
      return _o.indexOf(x) === -1;
    }));

    return result;
  },

  /**
   * dup
   *
   * @param {array} o
   * @param {array} p
   * @returns {array}
   */
  dup: function dup(o, p) {
    if (!Array.isArray(o) || !Array.isArray(p)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    var _p = p.filter(function (x) {
      return x;
    });

    var result = _o.concat(_p).filter(function (x, i, y) {
      return y.indexOf(x) === i;
    });

    return result;
  },

  /**
   * dst.
   *
   * @param {array} o
   * @returns {array}
   */
  dst: function dst(o) {
    if (!Array.isArray(o)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    var _p = _o.sort(function (s, t) {
      var a = s.toString().toLowerCase();
      var b = t.toString().toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    var result = _p.filter(function (x, i, y) {
      if (i === 0) return true;
      return x !== y[i - 1];
    });

    return result;
  },

  /**
   * oder by string.
   *
   * @param {array} o
   * @returns {array}
   */
  sortStr: function sortStr(o) {
    if (!Array.isArray(o)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    return _o.sort(function (s, t) {
      var a = s.toString().toLowerCase();
      var b = t.toString().toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  },

  /**
   * sort by number,
   *
   * @param {array} o
   * @returns {array}
   */
  sortNum: function sortNum(o) {
    if (!Array.isArray(o)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    return _o.sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  },

  /**
   * sort value by object key string,
   *
   * @param {array} o
   * @param {string} k
   * @returns {array}
   */
  sortObjStr: function sortObjStr(o, k) {
    if (!Array.isArray(o)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    return _o.sort(function (s, t) {
      var a = s[k].toString().toLowerCase();
      var b = t[k].toString().toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  },

  /**
   * sort value by object key unicode.,
   *
   * @param {array} o
   * @param {string} k
   * @returns {array}
   */
  sortObjUni: function sortObjUni(o, k) {
    if (!Array.isArray(o)) throw TypeError();

    var _o = o.filter(function (x) {
      return x;
    });

    return _o.sort(function (s, t) {
      var a = s[k];
      var b = t[k];
      if (a < b) return -1;
      if (a > b) return 1;
    });
  },

  /**
   * getTimeStamp
   *
   * @returns {string}
   */
  getTimeStamp: function getTimeStamp() {
    var dt = new Date();
    return dt.toISOString();
  },

  /**
   * getLocalTimeStamp
   *
   * @param {string} s
   * @returns {string}
   */
  getLocalTimeStamp: function getLocalTimeStamp(s) {
    var dt = new Date(s);

    var _yr = dt.getFullYear();

    var _mo = dt.getMonth() + 1;

    var _dy = dt.getDate();

    var _tm = dt.toTimeString().split(' ')[0];
    return "".concat(_yr, "-").concat(_mo, "-").concat(_dy, " ").concat(_tm);
  },

  /**
   * getLocalDateStamp
   *
   * @param {string} s
   * @returns {string}
   */
  getLocalDateStamp: function getLocalDateStamp(s) {
    var dt = new Date(s);

    var _mo = dt.getMonth() + 1;

    var _dy = dt.getDate();

    return "".concat(_mo, "/").concat(_dy);
  },

  /**
   * setTimeStamp
   *
   * @param {string} s
   * @returns {object}
   */
  setTimeStamp: function setTimeStamp(s) {
    var matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);

    if (!matches) {
      return false;
    }

    var y = parseInt(matches[1]);
    var m = parseInt(matches[2]);
    var d = parseInt(matches[3]);

    if (m < 1 || m > 12 || d < 1 || d > 31) {
      return null;
    }

    var dt = new Date(y, m - 1, d, 0, 0, 0, 0);

    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) {
      return null;
    }

    return dt.toISOString();
  },
  isValidDate: function isValidDate(s) {
    var matches = /^(\d+)\/(\d+)\/(\d+)$/.exec(s);

    if (!matches) {
      return false;
    }

    var y = parseInt(matches[1]);
    var m = parseInt(matches[2]);
    var d = parseInt(matches[3]);

    if (m < 1 || m > 12 || d < 1 || d > 31) {
      return false;
    }

    var dt = new Date(y, m - 1, d, 0, 0, 0, 0);

    if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) {
      return false;
    }

    return true;
  },

  /**
   * Schedule an invocation or invovations of fn() in the future.
   * Note that the call to invoke() does not block: it returns 
   * right away.
   *
   * @param {function} fn - If interval is specified but end is 
   *                          omited, then never stop invoking fn.
   *                        If interval and end are omited, then 
   *                          just invoke fn once after start ms.
   *                        If only fn is specified, behave as is 
   *                          start was 0.
   * @param {number} s -  Wait start milliseconds, then call fn().
   * @param {number} i -  Call fn() every interval milliseconds.
   * @param {number} e -  Stopping after a total of start+end 
   *                      milliseconds.
   */
  invoke: function invoke(fn, s, i, e) {
    if (!s) s = 0;
    setTimeout(fn, s);

    if (arguments.length >= 3) {
      setTimeout(function () {
        var h = setInterval(fn, i);
        if (e) setTimeout(function () {
          clearInterval(h);
        }, e);
      }, s);
    }
  },
  invokeMap: function invokeMap(fn, s, i, e) {
    var _this = this;

    var argLen = arguments.length;
    if (!s) s = 0;
    var idx = 0;
    return function (arr) {
      var arrLen = arr.length;

      var setTime = function setTime(obj, idx) {
        return setTimeout(fn.bind(_this, obj), i * idx);
      };

      setTimeout(fn.bind(_this, arr.shift()), s);

      if (argLen >= 3) {
        setTimeout(function () {
          return arr.forEach(setTime);
        }, s);
      }
    };
  },

  /**
   * @param {function} fn - monitor callback (return true or false).
   * @param {function} rs - resolve callback (monitor results).
   * @param {function} rj - reject callback (time out).
   * @param {function} ed - complete callback;
   * @param {number} s -  Wait start milliseconds, then call fn().
   * @param {number} i -  Call fn() every interval milliseconds.
   * @param {number} e -  Stopping after a total of start+end 
   *                      milliseconds.
   * 
   *
   */
  invoke2: function invoke2(fn, rs, rj, ed, s, i, e) {
    if (!s) s = 0;
    setTimeout(function () {
      var _a = fn();

      rs(_a);
      if (_a) return ed();
      if (!e) return rj({
        name: 'Error',
        message: 'TIME OUT!'
      });
    }, s);

    if (arguments.length >= 6) {
      var _b = 0;
      setTimeout(function () {
        var h = setInterval(function () {
          var _a = fn();

          rs(_a);

          if (_a) {
            clearInterval(h);
            return ed();
          }

          if (e - s <= i * ++_b) {
            clearInterval(h);
            return rj({
              name: 'Error',
              message: 'TIME OUT!'
            });
          }
        }, i);
      }, s);
    }
  },

  /**
   * Encode the properties of an object as if they were name/value 
   * pairs from an HTML form, 
   * using application/x-www-form-urlencoded format
   */
  encodeFormData: function encodeFormData(data) {
    if (!data) return "";
    var pairs = [];

    for (var name in data) {
      if (!data.hasOwnProperty(name)) continue;
      if (typeof data[name] === "function") continue;
      var value = data[name].toString();
      name = encodeURIComponent(name.replace(" ", "+"));
      value = encodeURIComponent(value.replace(" ", "+"));
      pairs.push(name + "=" + value);
    }

    return pairs.join('&');
  },

  /**
   * Decode an HTML form as if they were name/value pairs from 
   * the properties of an object, 
   * using application/x-www-form-urlencoded format↲
   */
  decodeFormData: function decodeFormData(text, sep, eq, isDecode) {
    text = text || location.search.substr(1);
    sep = sep || '&';
    eq = eq || '=';
    var decode = isDecode ? decodeURIComponent : function (a) {
      return a;
    };
    return text.split(sep).reduce(function (obj, v) {
      var pair = v.split(eq);
      obj[pair[0]] = decode(pair[1]);
      return obj;
    }, {});
  },

  /**
   * Generated a randam characters, using 'Math.random()' method.
   * $length: number of characters to be generated.
   * added [ /*-+.,!#$%&()~|_  ] to makeRandStr.
   */
  makeRandPassword: function makeRandPassword(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789/*-+.,!#$%&()~|_';
    var str = '';

    for (var i = 0; i < length; ++i) {
      str += chars[Math.floor(Math.random() * 78)];
    }

    return str;
  },

  /**
   * Generated a randam characters, using 'Math.random()' method.
   * $length: number of characters to be generated.
   */
  makeRandStr: function makeRandStr(length) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
    var str = '';

    for (var i = 0; i < length; ++i) {
      str += chars[Math.floor(Math.random() * 62)];
    }

    return str;
  },

  /**
   * Generated a randam characters, using 'Math.random()' method.
   * $length: number of characters to be generated.
   */
  makeRandInt: function makeRandInt(length) {
    var chars = '123456789';
    var str = '';

    for (var i = 0; i < length; ++i) {
      str += chars[Math.floor(Math.random() * 9)];
    }

    return parseInt(str, 10);
  },

  /**
   * Function that return a character string decoded from Base 64.
   *
   * @param {string} string - Base64 charactor string.
   * @return {string}
   */
  decode_base64: function decode_base64(string) {
    var b = Buffer.from(string, 'base64');
    return b.toString();
  },

  /**
   * Function that returns a character string encoded to BASE 64.
   *
   * @param {string} string - Ascii charactor string.
   * @return {string}
   */
  encode_base64: function encode_base64(string) {
    var b = Buffer.from(string);
    return b.toString('base64');
  },

  /**
   * Function to combines two functions.
   * 
   * @param {function} join - fork-join function.
   * @param {function} func1 - function.
   * @param {function} func2 - function.
   * @return {function}
   */
  fork: function fork(join, func1, func2) {
    return function (val) {
      return join(func1(val), func2(val));
    };
  },

  /**
   * Function to sort the key of the object.
   *
   * @param {object} obj - object.
   * @return {object} 
   */
  ksort: function ksort(obj) {
    var keys = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) keys.push(key);
    }

    keys.sort();
    var res = {};
    keys.forEach(function (key) {
      res[key] = obj[key];
    });
    return res;
  },

  /**
   * Function that return a character string encode 
   * from Associative array object.
   * 
   * @param {objct} obj - query parameter object.
   * @return {string}
   */
  urlencode: function urlencode(obj) {
    if (!obj) return "";
    var pairs = [];

    for (var name in obj) {
      if (!obj.hasOwnProperty(name)) continue;
      if (typeof obj[name] === "function") continue;
      var value = obj[name].toString();
      name = encodeURIComponent(name);
      value = encodeURIComponent(value);
      pairs.push(name + "=" + value);
    }

    return pairs.join('&');
  },

  /**
   * Function that return a character string encode 
   * from Associative array object.
   * 
   * @param {objct} obj - query parameter object.
   * @return {string}
   */
  urlencode_fake: function urlencode_fake(obj) {
    var keys = [];

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) keys.push(key);
    }

    return keys.map(function (key, idx) {
      return "".concat(key, "=").concat(obj[key]);
    }).map(function (pair) {
      return pair.replace(" ", "+");
    }).join('&');
  },

  /**
   * Function that return a character string encode 
   * from Associative array object.
   * 
   * @param {objct} obj - query parameter object.
   * @return {string}
   */
  urlencode_rfc3986: function urlencode_rfc3986(obj) {
    return querystring__WEBPACK_IMPORTED_MODULE_0___default.a.stringify(obj);
  },

  /**
   * Function that returns a character string encoded to sha256 hash. 
   *
   * @param {string} string - string to be converted.
   * @param {string} secret_key - secret key string required for conversion.
   */
  crypto_sha256: function crypto_sha256(string, secret_key) {
    return crypto__WEBPACK_IMPORTED_MODULE_1___default.a.createHmac('sha256', secret_key).update(string).digest('base64');
  },
  crypto_pbkdf2: function crypto_pbkdf2(pass, salt, length) {
    return new Promise(function (resolve, reject) {
      var random = function random(cbk) {
        return crypto__WEBPACK_IMPORTED_MODULE_1___default.a.randomBytes(128, cbk);
      };

      var pbkdf2 = function pbkdf2(slt, cbk) {
        return crypto__WEBPACK_IMPORTED_MODULE_1___default.a.pbkdf2(pass, slt, 7000, length, 'sha256', cbk);
      };

      var bin2str = function bin2str(bin) {
        return Buffer.from(bin).toString('hex');
      };

      if (salt) {
        pbkdf2(salt, function (err, _hash) {
          if (err) return reject(err);
          resolve({
            salt: salt,
            hash: bin2str(_hash)
          });
        });
      } else {
        random(function (err, _salt) {
          salt = bin2str(_salt);
          pbkdf2(salt, function (err, _hash) {
            if (err) return reject(err);
            resolve({
              salt: salt,
              hash: bin2str(_hash)
            });
          });
        });
      }
    });
  },

  /**
   * Function that returns instance. 
   *
   * @param {string} url - url character string.
   * @return {object} - return url instance.
   */
  parse_url: function parse_url(url) {
    return new url__WEBPACK_IMPORTED_MODULE_2__["URL"](url);
  },

  /**
   * Function that returns instance. 
   *
   * @param {object} query - search query object.
   * @return {object} - return URLSearchParams instance.
   */
  parse_query: function parse_query(query) {
    return new url__WEBPACK_IMPORTED_MODULE_2__["URLSearchParams"](query);
  },
  getLocalISOTimeStamp: function getLocalISOTimeStamp(date) {
    var setDate = [date.getFullYear(), ('00' + (date.getMonth() + 1)).substr(-2), ('00' + date.getDate()).substr(-2)];
    var setTime = [('00' + date.getHours()).substr(-2), ('00' + date.getMinutes()).substr(-2), ('00' + date.getSeconds()).substr(-2), ('00' + date.getMilliseconds()).substr(-3)];
    return [setDate.join('-'), 'T', setTime.join(':')].join('');
  },
  getLocalISOZoneStamp: function getLocalISOZoneStamp(date) {
    var setOffset = function setOffset(d) {
      var o = d.getTimezoneOffset() / -60;
      return (0 < o ? '+' : '-') + ('00' + Math.abs(o)).substr(-2) + ':00';
    };

    var setDate = [date.getFullYear(), ('00' + (date.getMonth() + 1)).substr(-2), ('00' + date.getDate()).substr(-2)];
    var setTime = [('00' + date.getHours()).substr(-2), ('00' + date.getMinutes()).substr(-2), ('00' + date.getSeconds()).substr(-2), ('000' + date.getMilliseconds()).substr(-3)];
    return [setDate.join('-'), 'T', setTime.join(':'), setOffset(date)].join('');
  },

  /*
   * ex) formatDate(new Date('2015/03/04'), 'MMM dt, yyyy [w]');
   * => "Mar 4th, 2015 [Wed]"
   * @param {date} date - date instance.
   * @param {string} format - date format.
   * @return {string} - formated date string.
   */
  formatDate: function formatDate(date, format) {
    return dateFormat.format(date, format);
  },
  formatNumber: function formatNumber(num, format) {
    return numFormat.format(num, format);
  },
  regexZip: function regexZip(postal_code, country_code) {
    return zipRegex.regex(country_code, postal_code);
  },
  //regexPhone(phone_number, country_code) {
  //  return /^[\d,-]+$/.test(phone_number);
  //}
  regexNumber: function regexNumber(number) {
    return /^[\d,-]+$/.test(number);
  },
  regexEmail: function regexEmail(address) {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(address);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (std);
var numFormat = {
  fmt: {
    ddddd: function ddddd(num) {
      return ('0000' + num).slice(-5);
    },
    dddd: function dddd(num) {
      return ('000' + num).slice(-4);
    },
    ddd: function ddd(num) {
      return ('00' + num).slice(-3);
    },
    dd: function dd(num) {
      return ('0' + num).slice(-2);
    },
    t: function t(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
  },
  format: function numFormat(num, format) {
    var result = format;

    for (var key in this.fmt) {
      result = result.replace(key, this.fmt[key](num));
    }

    return result;
  }
};
/*
 * std.dateFormat(new Date(), 'YYYY/MM/DD hh:mm');
 *
 */

var dateFormat = {
  fmt: {
    hh: function hh(date) {
      return ('0' + date.getHours()).slice(-2);
    },
    h: function h(date) {
      return date.getHours();
    },
    mm: function mm(date) {
      return ('0' + date.getMinutes()).slice(-2);
    },
    m: function m(date) {
      return date.getMinutes();
    },
    ss: function ss(date) {
      return ('0' + date.getSeconds()).slice(-2);
    },
    s: function s(date) {
      return date.getSeconds();
    },
    ccc: function ccc(date) {
      return ('00' + date.getMilliseconds()).slice(-3);
    },
    DD: function DD(date) {
      return ('0' + date.getDate()).slice(-2);
    },
    D: function D(date) {
      return date.getDate();
    },
    YYYY: function YYYY(date) {
      return date.getFullYear() + '';
    },
    YY: function YY(date) {
      return date.getFullYear() - 2000 + '';
    },
    t: function t(date) {
      return date.getDate() <= 3 ? ["st", "nd", "rd"][date.getDate() - 1] : 'th';
    },
    w: function w(date) {
      return ["Sun", "$on", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()];
    },
    MMMM: function MMMM(date) {
      return ["January", "February", "$arch", "April", "$ay", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
    },
    MMM: function MMM(date) {
      return ["Jan", "Feb", "$ar", "Apr", "@ay", "Jun", "Jly", "Aug", "Spt", "Oct", "Nov", "Dec"][date.getMonth()];
    },
    MM: function MM(date) {
      return ('0' + (date.getMonth() + 1)).slice(-2);
    },
    M: function M(date) {
      return date.getMonth() + 1;
    },
    $: function $(date) {
      return 'M';
    }
  },
  format: function dateFormat(date, format) {
    var result = format;

    for (var key in this.fmt) {
      result = result.replace(key, this.fmt[key](date));
    }

    return result;
  }
};
var zipRegex = {
  reg: {
    "GB": "GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\\d{1,4}",
    "JE": "JE\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
    "GG": "GY\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
    "IM": "IM\\d[\\dA-Z]?[ ]?\\d[ABD-HJLN-UW-Z]{2}",
    "US": "\\d{5}([ \\-]\\d{4})?",
    "CA": "[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z][ ]?\\d[ABCEGHJ-NPRSTV-Z]\\d",
    "DE": "\\d{5}",
    "JP": "\\d{3}-\\d{4}",
    "FR": "\\d{2}[ ]?\\d{3}",
    "AU": "\\d{4}",
    "IT": "\\d{5}",
    "CH": "\\d{4}",
    "AT": "\\d{4}",
    "ES": "\\d{5}",
    "NL": "\\d{4}[ ]?[A-Z]{2}",
    "BE": "\\d{4}",
    "DK": "\\d{4}",
    "SE": "\\d{3}[ ]?\\d{2}",
    "NO": "\\d{4}",
    "BR": "\\d{5}[\\-]?\\d{3}",
    "PT": "\\d{4}([\\-]\\d{3})?",
    "FI": "\\d{5}",
    "AX": "22\\d{3}",
    "KR": "\\d{3}[\\-]\\d{3}",
    "CN": "\\d{6}",
    "TW": "\\d{3}(\\d{2})?",
    "SG": "\\d{6}",
    "DZ": "\\d{5}",
    "AD": "AD\\d{3}",
    "AR": "([A-HJ-NP-Z])?\\d{4}([A-Z]{3})?",
    "AM": "(37)?\\d{4}",
    "AZ": "\\d{4}",
    "BH": "((1[0-2]|[2-9])\\d{2})?",
    "BD": "\\d{4}",
    "BB": "(BB\\d{5})?",
    "BY": "\\d{6}",
    "BM": "[A-Z]{2}[ ]?[A-Z0-9]{2}",
    "BA": "\\d{5}",
    "IO": "BBND 1ZZ",
    "BN": "[A-Z]{2}[ ]?\\d{4}",
    "BG": "\\d{4}",
    "KH": "\\d{5}",
    "CV": "\\d{4}",
    "CL": "\\d{7}",
    "CR": "\\d{4,5}|\\d{3}-\\d{4}",
    "HR": "\\d{5}",
    "CY": "\\d{4}",
    "CZ": "\\d{3}[ ]?\\d{2}",
    "DO": "\\d{5}",
    "EC": "([A-Z]\\d{4}[A-Z]|(?:[A-Z]{2})?\\d{6})?",
    "EG": "\\d{5}",
    "EE": "\\d{5}",
    "FO": "\\d{3}",
    "GE": "\\d{4}",
    "GR": "\\d{3}[ ]?\\d{2}",
    "GL": "39\\d{2}",
    "GT": "\\d{5}",
    "HT": "\\d{4}",
    "HN": "(?:\\d{5})?",
    "HU": "\\d{4}",
    "IS": "\\d{3}",
    "IN": "\\d{6}",
    "ID": "\\d{5}",
    "IL": "\\d{5}",
    "JO": "\\d{5}",
    "KZ": "\\d{6}",
    "KE": "\\d{5}",
    "KW": "\\d{5}",
    "LA": "\\d{5}",
    "LV": "\\d{4}",
    "LB": "(\\d{4}([ ]?\\d{4})?)?",
    "LI": "(948[5-9])|(949[0-7])",
    "LT": "\\d{5}",
    "LU": "\\d{4}",
    "MK": "\\d{4}",
    "MY": "\\d{5}",
    "MV": "\\d{5}",
    "MT": "[A-Z]{3}[ ]?\\d{2,4}",
    "MU": "(\\d{3}[A-Z]{2}\\d{3})?",
    "MX": "\\d{5}",
    "MD": "\\d{4}",
    "MC": "980\\d{2}",
    "MA": "\\d{5}",
    "NP": "\\d{5}",
    "NZ": "\\d{4}",
    "NI": "((\\d{4}-)?\\d{3}-\\d{3}(-\\d{1})?)?",
    "NG": "(\\d{6})?",
    "OM": "(PC )?\\d{3}",
    "PK": "\\d{5}",
    "PY": "\\d{4}",
    "PH": "\\d{4}",
    "PL": "\\d{2}-\\d{3}",
    "PR": "00[679]\\d{2}([ \\-]\\d{4})?",
    "RO": "\\d{6}",
    "RU": "\\d{6}",
    "SM": "4789\\d",
    "SA": "\\d{5}",
    "SN": "\\d{5}",
    "SK": "\\d{3}[ ]?\\d{2}",
    "SI": "\\d{4}",
    "ZA": "\\d{4}",
    "LK": "\\d{5}",
    "TJ": "\\d{6}",
    "TH": "\\d{5}",
    "TN": "\\d{4}",
    "TR": "\\d{5}",
    "TM": "\\d{6}",
    "UA": "\\d{5}",
    "UY": "\\d{5}",
    "UZ": "\\d{6}",
    "VA": "00120",
    "VE": "\\d{4}",
    "ZM": "\\d{5}",
    "AS": "96799",
    "CC": "6799",
    "CK": "\\d{4}",
    "RS": "\\d{6}",
    "ME": "8\\d{4}",
    "CS": "\\d{5}",
    "YU": "\\d{5}",
    "CX": "6798",
    "ET": "\\d{4}",
    "FK": "FIQQ 1ZZ",
    "NF": "2899",
    "FM": "(9694[1-4])([ \\-]\\d{4})?",
    "GF": "9[78]3\\d{2}",
    "GN": "\\d{3}",
    "GP": "9[78][01]\\d{2}",
    "GS": "SIQQ 1ZZ",
    "GU": "969[123]\\d([ \\-]\\d{4})?",
    "GW": "\\d{4}",
    "HM": "\\d{4}",
    "IQ": "\\d{5}",
    "KG": "\\d{6}",
    "LR": "\\d{4}",
    "LS": "\\d{3}",
    "MG": "\\d{3}",
    "MH": "969[67]\\d([ \\-]\\d{4})?",
    "MN": "\\d{6}",
    "MP": "9695[012]([ \\-]\\d{4})?",
    "MQ": "9[78]2\\d{2}",
    "NC": "988\\d{2}",
    "NE": "\\d{4}",
    "VI": "008(([0-4]\\d)|(5[01]))([ \\-]\\d{4})?",
    "PF": "987\\d{2}",
    "PG": "\\d{3}",
    "PM": "9[78]5\\d{2}",
    "PN": "PCRN 1ZZ",
    "PW": "96940",
    "RE": "9[78]4\\d{2}",
    "SH": "(ASCN|STHL) 1ZZ",
    "SJ": "\\d{4}",
    "SO": "\\d{5}",
    "SZ": "[HLMS]\\d{3}",
    "TC": "TKCA 1ZZ",
    "WF": "986\\d{2}",
    "XK": "\\d{5}",
    "YT": "976\\d{2}",
    "ZZ": "[\\d,-]+"
  },
  regex: function regex(country_code, postal_code) {
    var reg = this.reg[country_code] ? this.reg[country_code] : this.reg['ZZ'];
    return new RegExp('^' + reg + '$').test(postal_code);
  }
};

/***/ }),

/***/ "./utils/webutils.js":
/*!***************************!*\
  !*** ./utils/webutils.js ***!
  \***************************/
/*! exports provided: M, log, spn, stor, util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spn", function() { return spn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stor", function() { return stor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "util", function() { return util; });
/* harmony import */ var iso8601_duration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! iso8601-duration */ "../node_modules/iso8601-duration/lib/index.js");
/* harmony import */ var iso8601_duration__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(iso8601_duration__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var Utilities_spin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Utilities/spin */ "./utils/spin.js");
/* harmony import */ var Utilities_spin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(Utilities_spin__WEBPACK_IMPORTED_MODULE_1__);
function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var Logger = null;
var Spiner = null;
var target = null;
var util = {
  getCSVHeader: function getCSVHeader(obj) {
    var arr = new Array();

    for (var prop in obj) {
      arr.push(prop);
    }

    return arr.join() + '\n';
  },
  setCSVHeader: function setCSVHeader(objs) {
    var arr = new Array();

    for (var prop in objs[0]) {
      arr.push(prop);
    }

    obj.unshift(arr);
    return objs;
  },
  toLeftDays: function toLeftDays(date) {
    var obj = Object(iso8601_duration__WEBPACK_IMPORTED_MODULE_0__["parse"])(date);
    return "".concat(obj.days, " days") + ' / ' + "".concat(obj.hours, " hours") + ' / ' + "".concat(obj.minutes, " minutes");
  }
};
var M = {
  fork: function fork(join, func1, func2) {
    return function (val) {
      return join(func1(val), func2(val));
    };
  }
};
var log = {
  Logger: Logger,
  config: function config(apd, lyt, flv, nam) {
    var apds = {
      'alert': new Log4js.JSAlertAppender(),
      'console': new Log4js.BrowserConsoleAppender()
    };
    var lyts = {
      'basic': new Log4js.BasicLayout(),
      'json': new Log4js.JSONLayout(),
      'xml': new Log4js.XMLLayout()
    };
    var flvs = {
      'OFF': Log4js.Level.OFF,
      'FATAL': Log4js.Level.FATAL,
      'ERROR': Log4js.Level.ERROR,
      'WARN': Log4js.Level.WARN,
      'INFO': Log4js.Level.INFO,
      'DEBUG': Log4js.Level.DEBUG,
      'TRACE': Log4js.Level.TRACE,
      'ALL': Log4js.Level.ALL
    };
    var appender = apds[apd];
    appender.setLayout(lyts[lyt]);
    var logger = new Log4js.getLogger(nam);
    logger.addAppender(appender);
    this.Logger = logger;
  },
  logger: function logger(mlv, msg) {
    var _msg = msg.map(function (val) {
      if (_typeof(val) === 'object') {
        return JSON.stringify(val, null, 4);
      } else if (val == null) {
        return '?';
      } else {
        return val;
      }
    });

    this.Logger.log(mlv, _msg.join(' '), null);
  },
  fatal: function fatal(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('FATAL', args);
  },
  error: function error(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('ERROR', args);
  },
  warn: function warn(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('WARN', args);
  },
  info: function info(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('INFO', args);
  },
  debug: function debug(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('DEBUG', args);
  },
  trace: function trace(msg) {
    var args = Array.prototype.slice.call(arguments);
    this.logger('TRACE', args);
  }
};
var spn = {
  Spinner: Utilities_spin__WEBPACK_IMPORTED_MODULE_1___default.a,
  target: target,
  config: function config(target) {
    var opts = {
      lines: 13 // The number of lines to draw
      ,
      length: 28 // The length of each line
      ,
      width: 14 // The line thickness
      ,
      radius: 42 // The radius of the inner circle
      ,
      scale: 1 // Scales overall size of the spinner
      ,
      corners: 1 // Corner roundness (0..1)
      ,
      color: '#000' // #rgb or #rrggbb or array of colors
      ,
      opacity: 0.25 // Opacity of the lines
      ,
      rotate: 0 // The rotation offset
      ,
      direction: 1 // 1: clockwise, -1: counterclockwise
      ,
      speed: 1 // Rounds per second
      ,
      trail: 60 // Afterglow percentage
      ,
      fps: 20 // Frames per second when using
      // setTimeout() as
      // a fallback for CSS
      ,
      zIndex: 2e9 // The z-index (defaults to 2000000000)
      ,
      className: 'spinner' // The CSS class to assign to the
      //  spinner
      ,
      top: '49%' // Top position relative to parent
      ,
      left: '49%' // Left position relative to parent
      ,
      shadow: false // Whether to render a shadow
      ,
      hwaccel: false // Whether to use hardware acceleration
      ,
      position: 'absolute' // Element positioning

    };
    this.Spinner = new Utilities_spin__WEBPACK_IMPORTED_MODULE_1___default.a(opts);
    this.target = document.getElementById(target);
  },
  spin: function spin() {
    this.Spinner.spin(this.target);
  },
  stop: function stop() {
    this.Spinner.stop();
  }
};
var stor = {
  /**
   * setCookies
   *
   * @param name
   * @param value
   * @param daysToLive
   */
  setCookies: function setCookies(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") cookie += "; max-age=" + daysToLive * 60 * 60 * 24;
    document.cookie = cookie;
  },

  /**
   * getCookies
   * Return the document's cookies as an object of name/value
   * pairs.Assume that cookie values are encoded with
   * encodeURIComponent().
   *
   * @returns {object} - Store name and value in object.
   */
  getCookies: function getCookies() {
    var cookies = {};
    var all = document.cookie;
    if (all === "") return cookies;
    var list = all.split("; ");

    for (var i = 0; i < list.length; i++) {
      var cookie = list[i];
      var p = cookie.indexOf("=");
      var name = cookie.substring(0, p);
      var value = cookie.substring(p + 1);
      value = decodeURIComponent(value);
      cookies[name] = value;
    }

    return cookies;
  },

  /**
   * CookieStorage
   * This class implements the Storage API that localStorage and
   * sessionStorage do, but implements it on top of HTTP Cookies.
   *
   * @param maxage {number} - lifetime
   * @param path {string} - scope
   */
  CookieStorage: function CookieStorage(maxage, path) {
    var cookies = function () {
      var cookies = {};
      var all = document.cookie;
      if (all === "") return cookies;
      var list = all.split("; ");

      for (var i = 0; i < list.length; i++) {
        var cookie = list[i];
        var p = cookie.indexOf("=");
        var name = cookie.substring(0, p);
        var value = cookie.substring(p + 1);
        value = decodeURIComponent(value);
        cookies[name] = value;
      }

      return cookies;
    }();

    var keys = [];

    for (var key in cookies) {
      keys.push(key);
    }

    this.length = keys.length;

    this.key = function (n) {
      if (n < 0 || n >= keys.length) return null;
      return keys[n];
    };

    this.getItem = function (name) {
      return cookies[name] || null;
    };

    this.setItem = function (key, value) {
      if (!(key in cookies)) {
        keys.push(key);
        this.length++;
      }

      cookies[key] = value;
      var cookie = key + "=" + encodeURIComponent(value);
      if (maxage) cookie += "; max-age=" + maxage;
      if (path) cookie += "; path=" + path;
      document.cookie = cookie;
    };

    this.removeItem = function (key) {
      if (!(key in cookies)) return;
      delete cookies[key];

      for (var i = 0; i < keys.length; i++) {
        if (keys[i] === key) {
          keys.splice(i, 1);
          break;
        }
      }

      this.length--;
      document.cookie = key + "=; max-age=0";
    };

    this.clear = function () {
      for (var i = 0; i < keys.length; i++) {
        document.cookie = keys[i] + "=; max-age=0";
      }

      cookies = (_readOnlyError("cookies"), {});
      keys = [];
      this.length = 0;
    };
  },

  /**
   * UserDataStorage
   * Create a document element and install the special userData
   * behavior on it so it gets save() and load() methods.
   *
   * @param {number} maxage - If maxage is specified, expire the
   *                  userData in maxage seconds
   */
  UserDataStorage: function UserDataStorage(maxage) {
    var memory = document.createElement("div");
    memory.style.display = "none";
    memory.style.behavior = "url('#default#userData')";
    document.body.appendChild(memory);

    if (maxage) {
      var now = new Date().getTime();
      var expires = now + maxage * 1000;
      memory.expires = new Date(expires).toUTCString();
    }

    memory.load("UserDataStorage");

    this.getItem = function (key) {
      return memory.getAttribute(key) || null;
    };

    this.setItem = function (key, value) {
      memory.setAttribute(key, value);
      memory.save("UserDataStorage");
    };

    this.removeItem = function (key) {
      memory.removeAttribute(key);
      memory.save("UserDataStorage");
    };
  }
};


/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi ./main.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./main.js */"./main.js");


/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvbGliL0Jhc2VFdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvbGliL0VtaXR0ZXJTdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvbGliL0V2ZW50U3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJlbWl0dGVyL2xpYi9FdmVudFN1YnNjcmlwdGlvblZlbmRvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvY2FtZWxpemUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9jYW1lbGl6ZVN0eWxlTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2NvbnRhaW5zTm9kZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2dldEFjdGl2ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9oeXBoZW5hdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9oeXBoZW5hdGVTdHlsZU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pc05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pc1RleHROb2RlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvc2hhbGxvd0VxdWFsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2lzbzg2MDEtZHVyYXRpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9GbHV4Q29udGFpbmVyQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMvQXBwQWN0aW9uLmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMvQ29tcGxldGVBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYWN0aW9ucy9Ob3RlQWN0aW9uLmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMvUHJvZHVjdHNBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBCb2R5L0FwcEJvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBGb3JtL0FwcEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBTaWRlYmFyL0FwcFNpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Db21wbGV0ZUJvZHkvQ29tcGxldGVCb2R5LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQ29tcGxldGVTaWRlYmFyL0NvbXBsZXRlU2lkZWJhci5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0NvbXBsZXRlVGFibGUvQ29tcGxldGVUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0NvbnRlbnRzL0NvbnRlbnRzLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS9FcnJvckJvdW5kYXJ5LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvR2xvYmFsRm9vdGVyL0dsb2JhbEZvb3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0dsb2JhbEhlYWRlci9HbG9iYWxIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ob3RlQm9keS9Ob3RlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL05vdGVTaWRlYmFyL05vdGVTaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTm90ZVRhYmxlL05vdGVUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Byb2R1Y3RzQm9keS9Qcm9kdWN0c0JvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Qcm9kdWN0c1NpZGViYXIvUHJvZHVjdHNTaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJvZHVjdHNUYWJsZS9Qcm9kdWN0c1RhYmxlLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUmFkaW8vUmFkaW8uanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9UYWJzL1RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL0FwcC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvQ29tcGxldGUvQ29tcGxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTm90ZS9Ob3RlLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL1Byb2R1Y3RzL1Byb2R1Y3RzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL05vdGVBcGlDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RvcmVzL2FwcFN0b3JlLmpzIiwid2VicGFjazovLy8uL3N0b3Jlcy9jb21wbGV0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL3N0b3Jlcy9ub3RlU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RvcmVzL3Byb2R1Y3RzU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvaXBjdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvc3Bpbi5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9zdGR1dGlscy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy93ZWJ1dGlscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicXVlcnlzdHJpbmdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY29udmVydCIsImNvbnRhaW5lckNsYXNzIiwidG1wIiwiYXJncyIsInByb3RvdHlwZSIsImdldFN0b3JlcyIsImNhbGN1bGF0ZVN0YXRlIiwicHNwaWQiLCJzZWxlY3RlZENvbnRlbnQiLCJzZWxlY3RlZCIsInRpdGxlIiwiZGlzcGF0Y2giLCJ0eXBlIiwiZmV0Y2hDb25maWciLCJOb3RlQXBpQ2xpZW50IiwiZ2V0Q29uZmlnIiwidGhlbiIsImNvbmZpZyIsIndyaXRlQ29uZmlnIiwib2JqIiwicHV0Q29uZmlnIiwid3JpdGVJbnZlbnRvcnlJdGVtcyIsIm9wdGlvbnMiLCJwaXBlIiwibWFwIiwib2JqcyIsImluY3JlbWVudCIsInBhZ2UiLCJsb2ciLCJ0cmFjZSIsInNwbiIsInNwaW4iLCJmZXRjaENvbXBsZXRlSXRlbXMiLCJpdGVtcyIsImluZm8iLCJzdG9wIiwiZGVjcmVtZW50Iiwid3JpdGVDb21wbGV0ZUl0ZW1zIiwiZGlzcGxheU5hbWUiLCJmZXRjaEl0ZW1zIiwid3JpdGVJdGVtcyIsImZldGNoUHJvZHVjdHNJdGVtcyIsIndyaXRlUHJvZHVjdHNJdGVtcyIsIkFwcEJvZHkiLCJwcm9wcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsIkFwcEZvcm0iLCJzdGF0ZSIsImFwcGlkIiwiY2VydGlkIiwidG9rZW4iLCJydW5hbWUiLCJhdXRob3JpemVBcGkiLCJvYXV0aDJBcGkiLCJmaW5kaW5nQXBpIiwidHJhZGluZ0FwaSIsImludmVudG9yeUFwaSIsIm1hcmtldGluZ0FwaSIsImFuYWx5dGljc0FwaSIsImUiLCJuZXdTdGF0ZSIsInNldFN0YXRlIiwicHJldmVudERlZmF1bHQiLCJuZXdDb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJBcHBBY3Rpb24iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwibmFtZSIsIm1lc3NhZ2UiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZUNoYW5nZVRleHQiLCJiaW5kIiwiaGFuZGxlQ2hhbmdlUmVzZXQiLCJoYW5kbGVDaGFuZ2VTYXZlIiwiQXBwU2lkZWJhciIsIkNvbXBsZXRlQm9keSIsIkNvbXBsZXRlU2lkZWJhciIsIk51bWJlciIsInBhZ2VzIiwiaXBjIiwid2luIiwic2hvd0Vycm9yQm94Iiwic2hvd1NhdmVEaWFsb2ciLCJmaWxlbmFtZSIsInN5cyIsInRvdWNoRmlsZSIsImFkZGJvbUZpbGUiLCJzYXZlRmlsZSIsInV0aWwiLCJnZXRDU1ZIZWFkZXIiLCJjc3ZIZWFkZXIiLCJDb21wbGV0ZUFjdGlvbiIsInN1YnNjcmliZSIsInNob3dTYXZlTWVzc2FnZUJveCIsImhpZ2hlc3RQcmljZSIsImxvd2VzdFByaWNlIiwic2hpcHBpbmciLCJjb25kaXRpb24iLCJzdGF0dXMiLCJpdGVtSWQiLCJjYXRlZ29yeVBhdGgiLCJzZWxsZXIiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY2hlY2tlZCIsInZhbHVlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwicHJvcDEiLCJwcm9wMiIsImxlbiIsImFyZ3VtZW50cyIsIm9wdHMiLCJzdGQiLCJkc3QiLCJvcHQiLCJpZHgiLCJvcHRQYXRocyIsInJlbmRlck9wdGlvbiIsIm9wdFNlbHJzIiwib3B0SW1JRHMiLCJvcHRTaHBncyIsIm9wdFN0dHNzIiwic2VhcmNoU3RyaW5nIiwic29sZEl0ZW1Pbmx5IiwiaGFuZGxlQ2hhbmdlQ2hlY2tib3giLCJoYW5kbGVDaGFuZ2VTZWFyY2giLCJoYW5kbGVDaGFuZ2VIb21lIiwiaGFuZGxlSW5jcmVtZW50IiwiaGFuZGxlRGVjcmVtZW50IiwiaGFuZGxlQ2hhbmdlU2VsZWN0IiwiQ29tcGxldGVUYWJsZSIsInN0eWxlcyIsImZvbnRXZWlnaHQiLCJjb2xvciIsImR1cmF0aW9uIiwidG9MZWZ0RGF5cyIsIml0ZW0iLCJJbWciLCJoYXNPd25Qcm9wZXJ0eSIsImdhbGxlcnlVUkwiLCJBaWQiLCJQaWQiLCJwcm9kdWN0SWQiLCJfX3ZhbHVlX18iLCJTaWQiLCJzZWxsZXJJbmZvIiwic2VsbGVyVXNlck5hbWUiLCJTdG0iLCJnZXRMb2NhbFRpbWVTdGFtcCIsImxpc3RpbmdJbmZvIiwic3RhcnRUaW1lIiwiRXRtIiwiZW5kVGltZSIsIlVybCIsInZpZXdJdGVtVVJMIiwiVHRsIiwiUGMxIiwic2VsbGluZ1N0YXR1cyIsImN1cnJlbnRQcmljZSIsIkNpMSIsIlBjMiIsImNvbnZlcnRlZEN1cnJlbnRQcmljZSIsIkNpMiIsIkNkbiIsImNvbmRpdGlvbkRpc3BsYXlOYW1lIiwiQ2dwIiwicHJpbWFyeUNhdGVnb3J5IiwiY2F0ZWdvcnlOYW1lIiwiU2hwIiwic2hpcHBpbmdJbmZvIiwic2hpcFRvTG9jYXRpb25zIiwiU3R0Iiwic2VsbGluZ1N0YXRlIiwiRXh0IiwicmVuZGVyRXh0ZW5zaW9uIiwidGltZUxlZnQiLCJzdHQiLCJyZW5kZXJTdGF0dXMiLCJVcGQiLCJEYXRlIiwibm93Iiwiam9pbiIsImZpbHRlciIsInNvbWUiLCJjb25kaXRpb25JZCIsInBhdGgiLCJzZWxyIiwiaXRlbWlkIiwiaXNGaW5pdGUiLCJmaWx0ZXJJdGVtcyIsInJlbmRlckl0ZW0iLCJDb250ZW50cyIsImNvbnRudCIsImNoaWxkcmVuIiwiRXJyb3JCb3VuZGFyeSIsImVycm9ySW5mbyIsIndoaXRlU3BhY2UiLCJ0b1N0cmluZyIsImNvbXBvbmVudFN0YWNrIiwiR2xvYmFsRm9vdGVyIiwic3RhY2siLCJzaG93Q2xvc2VNZXNzYWdlQm94IiwicmVzcG9uc2UiLCJjbG9zZSIsImhhbmRsZUNoYW5nZUNsb3NlIiwiR2xvYmFsSGVhZGVyIiwiTm90ZUJvZHkiLCJOb3RlU2lkZWJhciIsIk5vdGVBY3Rpb24iLCJldmVudCIsIk5vdGVUYWJsZSIsIlByb2R1Y3RzQm9keSIsIlByb2R1Y3RzU2lkZWJhciIsImFkZGJvbSIsIlByb2R1Y3RzQWN0aW9uIiwicHJvZHVjdFR5cGUiLCJoYW5kbGVDaGFuZ2VSYWRpbyIsIlByb2R1Y3RzVGFibGUiLCJSYWRpbyIsImRlZmF1bHRWYWx1ZSIsIm9uQ2hhbmdlIiwiQ2hpbGRyZW4iLCJjaGlsZCIsImhhbmRsZUNoYW5nZSIsIlRhYnMiLCJsYWJlbCIsImluZGV4IiwiY2xhc3NOYW1lcyIsImhhbmRsZUNsaWNrVGFiIiwidGl0bGVzIiwicmVuZGVyVGl0bGVzIiwiZGlzcGF0Y2hlciIsInJvb3RFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXJSb290IiwicmVuZGVyIiwiaG90IiwiYWNjZXB0Iiwic2V0SW1tZWRpYXRlIiwiQXBwIiwiYXBwU3RvcmUiLCJnZXRTdGF0ZSIsIkNvbnRhaW5lciIsImNyZWF0ZSIsIkNvbnRhaW5lckNvbnZlcnRlciIsIkNvbXBsZXRlIiwiY29tcGxldGVTdG9yZSIsIk5vdGUiLCJub3RlU3RvcmUiLCJQcm9kdWN0cyIsInByb2R1Y3RzU3RvcmUiLCJlQmF5IiwicmVxdWVzdCIsIm9wZXJhdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWVtb3J5Iiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiVXNlckRhdGFTdG9yYWdlIiwic3RvciIsIkNvb2tpZVN0b3JhZ2UiLCJKU09OIiwicGFyc2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIkpTT05QIiwiZmV0Y2giLCJvZiIsInBvc3QiLCJhdXRoIiwiZ2V0IiwiZ2V0SXRlbXMiLCJvcHRJdGVtcyIsImdldENvbXBsZXRlSXRlbXMiLCJnZXRQcm9kdWN0c0l0ZW1zIiwib3B0UHJvZHVjdHMiLCJnZXRBcHBUb2tlbiIsInNjb3BlIiwiZ2V0Q29kZSIsIm9wdENvZGUiLCJnZXRVc2VyVG9rZW4iLCJjb2RlIiwiZ2V0UmVmcmVzaFRva2VuIiwidXNlcnRva2VuIiwicmVmcmVzaF90b2tlbiIsImdldEl0ZW1EZXRhaWxzIiwiZ2V0SW52ZW50b3J5SXRlbXMiLCJvZmZzZXQiLCJwdXRJdGVtcyIsInB1dENvbXBsZXRlSXRlbXMiLCJwdXRQcm9kdWN0c0l0ZW1zIiwicmVzSXRlbXMiLCJzZXRJdGVtcyIsInJlc0NvbXBsZXRlSXRlbXMiLCJyZXNQcm9kdWN0c0l0ZW1zIiwic3RyZWFtSXRlbXMiLCJmcm9tIiwic3RyZWFtRGV0YWlsIiwiZm9ya0l0ZW1zIiwiZm9ya0pvaW4iLCJmb3JJdGVtcyIsImZsYXRNYXAiLCJmb3JDb21wbGV0ZUl0ZW1zIiwiZm9yUHJvZHVjdHNJdGVtcyIsImZldGNoQXBwVG9rZW4iLCJyZXF1ZXN0VG9rZW4iLCJzZXRUb2tlbiIsImFwcHRva2VuIiwiYXBwc3RhdGUiLCJnZXRUb2tlbiIsImFjY2Vzc190b2tlbiIsImZldGNoVXNlclRva2VuIiwicmVxdWVzdENvZGUiLCJhdXRoY29kZSIsImNvbnZDb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2V0Q29kZSIsInVzZXJzdGF0ZSIsInJlZnJlc2hzdGF0ZSIsImZldGNoUmVmcmVzaFRva2VuIiwiZmV0Y2hUb2tlbiIsImR1VXNyVG9rZW4iLCJleHBpcmVzX2luIiwiZHVSZWZUb2tlbiIsInJlZnJlc2hfdG9rZW5fZXhwaXJlc19pbiIsImlzVXNyVG9rZW4iLCJpc1JlZlRva2VuIiwiaXNVc3JBdmFpbGFibGUiLCJpc1JlZkF2YWlsYWJsZSIsImxvZ1RyYWNlIiwicmVzIiwicGFnaW5hdGlvbk91dHB1dCIsInRvdGFsUGFnZXMiLCJuZXdJdGVtcyIsImZpbmRJdGVtc0J5S2V5d29yZHNSZXNwb25zZSIsImZpbmRDb21wbGV0ZWRJdGVtc1Jlc3BvbnNlIiwiZmluZEl0ZW1zQnlQcm9kdWN0UmVzcG9uc2UiLCJhY2siLCJzZWFyY2hSZXN1bHQiLCJvIiwicCIsIl9vIiwiX3AiLCJzZWFyY2giLCJuIiwiZm9yRWFjaCIsInNsciIsImNkbiIsImlzVmFsaWREYXRlIiwic2V0VGltZVN0YW1wIiwibG9nRXJyb3IiLCJBcHBTdG9yZSIsImFjdGlvbiIsIkNvbXBsZXRlU3RvcmUiLCJOb3RlU3RvcmUiLCJQcm9kdWN0c1N0b3JlIiwiY2FsbGJhY2siLCJpcGNSZW5kZXJlciIsIm9uIiwic2V0UHJvcHMiLCJzZW5kIiwic2VuZFN5bmMiLCJfcHJvcHMiLCJ1cmwiLCJhdXRoVXJsIiwidXJsZW5jb2RlIiwiQnJvd3NlcldpbmRvdyIsInJlbW90ZSIsImF1dGhXaW5kb3ciLCJ3aWR0aCIsImhlaWdodCIsInNob3ciLCJ3ZWJQcmVmZXJlbmNlcyIsIm5vZGVJbnRlZ3JhdGlvbiIsIndlYlNlY3VyaXR5IiwiaGFuZGxlQ2hhbmdlVXJsIiwicmF3X2NvZGUiLCJleGVjIiwibmV3VXJsIiwicmF3X3N0YXRlIiwicmF3X2V4cGlyZSIsImRlc3Ryb3kiLCJ3ZWJDb250ZW50cyIsImdldFVSTCIsIm9uY2UiLCJoaWRlIiwibG9hZFVSTCIsIm1ldGhvZCIsImN1cnJlbnQiLCJnZXRDdXJyZW50V2luZG93IiwiZmlsdGVycyIsImV4dGVuc2lvbnMiLCJkaWFsb2ciLCJlcnJvcnMiLCJsb25nTWVzc2FnZSIsImVycm9yX2Rlc2NyaXB0aW9uIiwiYnV0dG9ucyIsImRldGFpbCIsInNob3dNZXNzYWdlQm94IiwiQnVmZmVyIiwiZnMiLCJhcHBlbmRGaWxlIiwiY2xvc2VTeW5jIiwib3BlblN5bmMiLCJyb290IiwiZmFjdG9yeSIsInByZWZpeGVzIiwiYW5pbWF0aW9ucyIsInVzZUNzc0FuaW1hdGlvbnMiLCJzaGVldCIsImNyZWF0ZUVsIiwidGFnIiwicHJvcCIsImVsIiwiY3JlYXRlRWxlbWVudCIsImlucyIsInBhcmVudCIsImFwcGVuZENoaWxkIiwiYWRkQW5pbWF0aW9uIiwiYWxwaGEiLCJ0cmFpbCIsImxpbmVzIiwic3RhcnQiLCJ6IiwiTWF0aCIsIm1heCIsInByZWZpeCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInByZSIsImluc2VydFJ1bGUiLCJjc3NSdWxlcyIsInZlbmRvciIsInMiLCJzdHlsZSIsInBwIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInVuZGVmaW5lZCIsImNzcyIsIm1lcmdlIiwiZGVmIiwiZ2V0Q29sb3IiLCJkZWZhdWx0cyIsInJhZGl1cyIsInNjYWxlIiwiY29ybmVycyIsIm9wYWNpdHkiLCJyb3RhdGUiLCJkaXJlY3Rpb24iLCJzcGVlZCIsImZwcyIsInpJbmRleCIsImNsYXNzTmFtZSIsInRvcCIsImxlZnQiLCJzaGFkb3ciLCJod2FjY2VsIiwicG9zaXRpb24iLCJTcGlubmVyIiwic2VsZiIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJmIiwib3N0ZXAiLCJhc3RlcCIsImFuaW0iLCJqIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJzZWciLCJmaWxsIiwiYmFja2dyb3VuZCIsImJveFNoYWRvdyIsInRyYW5zZm9ybU9yaWdpbiIsInRyYW5zZm9ybSIsImJvcmRlclJhZGl1cyIsImFuaW1hdGlvbiIsInZhbCIsImNoaWxkTm9kZXMiLCJpbml0Vk1MIiwidm1sIiwiYXR0ciIsImFkZFJ1bGUiLCJyIiwiZ3JwIiwiY29vcmRzaXplIiwiY29vcmRvcmlnaW4iLCJtYXJnaW4iLCJnIiwiZHgiLCJyb3RhdGlvbiIsImFyY3NpemUiLCJjIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVNoZWV0IiwicHJvYmUiLCJiZWhhdmlvciIsImFkaiIsImVudiIsInByb2Nlc3MiLCJQTEFURk9STSIsImlzTm9kZSIsImNvbG9yX2NvZGUiLCJSZXNldCIsIkJyaWdodCIsIkRpbSIsIlVuZGVyc2NvcmUiLCJCbGluayIsIlJldmVyc2UiLCJIaWRkZW4iLCJGZ0JsYWNrIiwiRmdSZWQiLCJGZ0dyZWVuIiwiRmdZZWxsb3ciLCJGZ0JsdWUiLCJGZ01hZ2VudGEiLCJGZ0N5YW4iLCJGZ1doaXRlIiwiQmdCbGFjayIsIkJnUmVkIiwiQmdHcmVlbiIsIkJnWWVsbG93IiwiQmdCbHVlIiwiQmdNYWdlbnRhIiwiQmdDeWFuIiwiQmdXaGl0ZSIsInRvUkdCYSIsInN0ciIsImEiLCJwYXJzZUludCIsInN1YnN0ciIsImIiLCJjYWxsZXIiLCJkYXRlIiwiZ2V0TG9jYWxJU09UaW1lU3RhbXAiLCJoZWFkIiwiY29uc29sZSIsImxvZ1dhcm4iLCJ3YXJuIiwibG9nRGVidWciLCJsb2dJbmZvIiwiaXMiLCJjbGFzIiwiY2FsbCIsImV4dGVuZCIsInJlc3RyaWN0Iiwic3VidHJhY3QiLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsImtleXMiLCJUeXBlRXJyb3IiLCJyZXN1bHQiLCJhbmQiLCJBcnJheSIsImlzQXJyYXkiLCJ4IiwiY29uY2F0IiwieSIsImxhc3RJbmRleE9mIiwiZGVsIiwiYWRkIiwiZGlmIiwiZHVwIiwic29ydCIsInQiLCJzb3J0U3RyIiwic29ydE51bSIsInNvcnRPYmpTdHIiLCJrIiwic29ydE9ialVuaSIsImdldFRpbWVTdGFtcCIsImR0IiwidG9JU09TdHJpbmciLCJfeXIiLCJnZXRGdWxsWWVhciIsIl9tbyIsImdldE1vbnRoIiwiX2R5IiwiZ2V0RGF0ZSIsIl90bSIsInRvVGltZVN0cmluZyIsInNwbGl0IiwiZ2V0TG9jYWxEYXRlU3RhbXAiLCJtYXRjaGVzIiwibSIsImQiLCJpbnZva2UiLCJmbiIsImgiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpbnZva2VNYXAiLCJhcmdMZW4iLCJhcnJMZW4iLCJhcnIiLCJzZXRUaW1lIiwic2hpZnQiLCJpbnZva2UyIiwicnMiLCJyaiIsImVkIiwiX2EiLCJfYiIsImVuY29kZUZvcm1EYXRhIiwiZGF0YSIsInBhaXJzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsImRlY29kZUZvcm1EYXRhIiwidGV4dCIsInNlcCIsImVxIiwiaXNEZWNvZGUiLCJsb2NhdGlvbiIsImRlY29kZSIsInJlZHVjZSIsInYiLCJwYWlyIiwibWFrZVJhbmRQYXNzd29yZCIsImNoYXJzIiwiZmxvb3IiLCJyYW5kb20iLCJtYWtlUmFuZFN0ciIsIm1ha2VSYW5kSW50IiwiZGVjb2RlX2Jhc2U2NCIsInN0cmluZyIsImVuY29kZV9iYXNlNjQiLCJmb3JrIiwiZnVuYzEiLCJmdW5jMiIsImtzb3J0Iiwia2V5IiwidXJsZW5jb2RlX2Zha2UiLCJ1cmxlbmNvZGVfcmZjMzk4NiIsInF1ZXJ5c3RyaW5nIiwiY3J5cHRvX3NoYTI1NiIsInNlY3JldF9rZXkiLCJjcnlwdG8iLCJjcmVhdGVIbWFjIiwidXBkYXRlIiwiZGlnZXN0IiwiY3J5cHRvX3Bia2RmMiIsInBhc3MiLCJzYWx0IiwicmFuZG9tQnl0ZXMiLCJjYmsiLCJwYmtkZjIiLCJzbHQiLCJiaW4yc3RyIiwiYmluIiwiX2hhc2giLCJoYXNoIiwiX3NhbHQiLCJwYXJzZV91cmwiLCJwYXJzZV9xdWVyeSIsInF1ZXJ5Iiwic2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJnZXRMb2NhbElTT1pvbmVTdGFtcCIsInNldE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwiYWJzIiwiZm9ybWF0RGF0ZSIsImZvcm1hdCIsImRhdGVGb3JtYXQiLCJmb3JtYXROdW1iZXIiLCJudW0iLCJudW1Gb3JtYXQiLCJyZWdleFppcCIsInBvc3RhbF9jb2RlIiwiY291bnRyeV9jb2RlIiwiemlwUmVnZXgiLCJyZWdleCIsInJlZ2V4TnVtYmVyIiwibnVtYmVyIiwidGVzdCIsInJlZ2V4RW1haWwiLCJhZGRyZXNzIiwiZm10IiwiZGRkZGQiLCJkZGRkIiwiZGRkIiwiZGQiLCJoaCIsIm1tIiwic3MiLCJjY2MiLCJERCIsIkQiLCJZWVlZIiwiWVkiLCJ3IiwiZ2V0RGF5IiwiTU1NTSIsIk1NTSIsIk1NIiwiTSIsIiQiLCJyZWciLCJSZWdFeHAiLCJMb2dnZXIiLCJTcGluZXIiLCJzZXRDU1ZIZWFkZXIiLCJ1bnNoaWZ0IiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsImFwZCIsImx5dCIsImZsdiIsIm5hbSIsImFwZHMiLCJMb2c0anMiLCJKU0FsZXJ0QXBwZW5kZXIiLCJCcm93c2VyQ29uc29sZUFwcGVuZGVyIiwibHl0cyIsIkJhc2ljTGF5b3V0IiwiSlNPTkxheW91dCIsIlhNTExheW91dCIsImZsdnMiLCJMZXZlbCIsIk9GRiIsIkZBVEFMIiwiRVJST1IiLCJXQVJOIiwiSU5GTyIsIkRFQlVHIiwiVFJBQ0UiLCJBTEwiLCJhcHBlbmRlciIsInNldExheW91dCIsImxvZ2dlciIsImdldExvZ2dlciIsImFkZEFwcGVuZGVyIiwibWx2IiwibXNnIiwiX21zZyIsImZhdGFsIiwiZGVidWciLCJzZXRDb29raWVzIiwiZGF5c1RvTGl2ZSIsImNvb2tpZSIsImdldENvb2tpZXMiLCJjb29raWVzIiwiYWxsIiwibGlzdCIsIm1heGFnZSIsInJlbW92ZUl0ZW0iLCJzcGxpY2UiLCJjbGVhciIsImRpc3BsYXkiLCJib2R5IiwiZ2V0VGltZSIsImV4cGlyZXMiLCJ0b1VUQ1N0cmluZyIsImxvYWQiLCJnZXRBdHRyaWJ1dGUiLCJzYXZlIiwicmVtb3ZlQXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxh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QWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFFBSUQ7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QWhLLFdBQU9xTCxLQUFQLENBQWFxVSxPQUFiLEdBQXVCLE1BQXZCO0FBQ0ExZixXQUFPcUwsS0FBUCxDQUFhb0UsUUFBYixHQUF3QiwwQkFBeEI7QUFDQWxSLGFBQVNvaEIsSUFBVCxDQUFjeFYsV0FBZCxDQUEwQm5LLE1BQTFCOztBQUNBLFFBQUlzZixNQUFKLEVBQVk7QUFDUixVQUFNcGtCLE1BQU0sSUFBSUQsSUFBSixHQUFXMmtCLE9BQVgsRUFBWjtBQUNBLFVBQU1DLFVBQVUza0IsTUFBTW9rQixTQUFTLElBQS9CO0FBQ0F0ZixhQUFPNmYsT0FBUCxHQUFpQixJQUFJNWtCLElBQUosQ0FBUzRrQixPQUFULEVBQWtCQyxXQUFsQixFQUFqQjtBQUNIOztBQUNEOWYsV0FBTytmLElBQVAsQ0FBWSxpQkFBWjs7QUFDQSxTQUFLdmYsT0FBTCxHQUFlLFVBQVN3WCxHQUFULEVBQWM7QUFDekIsYUFBT2hZLE9BQU9nZ0IsWUFBUCxDQUFvQmhJLEdBQXBCLEtBQTRCLElBQW5DO0FBQ0gsS0FGRDs7QUFHQSxTQUFLdlgsT0FBTCxHQUFlLFVBQVN1WCxHQUFULEVBQWMvakIsS0FBZCxFQUFxQjtBQUNoQytMLGFBQU9tTixZQUFQLENBQW9CNkssR0FBcEIsRUFBd0IvakIsS0FBeEI7QUFDQStMLGFBQU9pZ0IsSUFBUCxDQUFZLGlCQUFaO0FBQ0gsS0FIRDs7QUFJQSxTQUFLVixVQUFMLEdBQWtCLFVBQVN2SCxHQUFULEVBQWM7QUFDNUJoWSxhQUFPa2dCLGVBQVAsQ0FBdUJsSSxHQUF2QjtBQUNBaFksYUFBT2lnQixJQUFQLENBQVksaUJBQVo7QUFDSCxLQUhEO0FBSUg7QUF6SVUsQ0FBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUlBLG1DOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjQxYjZmMmYxMDBjYTllN2U2ZWRkXCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0XHRlbHNlIGhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwXSA9IGNhbGxiYWNrIHx8IGZ1bmN0aW9uKCkge307XG4gXHRcdFx0fSxcbiBcdFx0XHRkZWNsaW5lOiBmdW5jdGlvbihkZXApIHtcbiBcdFx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0Zm9yKHZhciBjaHVua0lkIGluIGluc3RhbGxlZENodW5rcylcbiBcdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHR7XG4gXHRcdFx0XHQvKmdsb2JhbHMgY2h1bmtJZCAqL1xuIFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIgJiZcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiZcbiBcdFx0XHRcdGhvdFdhaXRpbmdGaWxlcyA9PT0gMFxuIFx0XHRcdCkge1xuIFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gcHJvbWlzZTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSB8fCAhaG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0pXG4gXHRcdFx0cmV0dXJuO1xuIFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IGZhbHNlO1xuIFx0XHRmb3IgKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0aG90VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYgKC0taG90V2FpdGluZ0ZpbGVzID09PSAwICYmIGhvdENodW5rc0xvYWRpbmcgPT09IDApIHtcbiBcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzKys7XG4gXHRcdFx0aG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RVcGRhdGVEb3dubG9hZGVkKCkge1xuIFx0XHRob3RTZXRTdGF0dXMoXCJyZWFkeVwiKTtcbiBcdFx0dmFyIGRlZmVycmVkID0gaG90RGVmZXJyZWQ7XG4gXHRcdGhvdERlZmVycmVkID0gbnVsbDtcbiBcdFx0aWYgKCFkZWZlcnJlZCkgcmV0dXJuO1xuIFx0XHRpZiAoaG90QXBwbHlPblVwZGF0ZSkge1xuIFx0XHRcdC8vIFdyYXAgZGVmZXJyZWQgb2JqZWN0IGluIFByb21pc2UgdG8gbWFyayBpdCBhcyBhIHdlbGwtaGFuZGxlZCBQcm9taXNlIHRvXG4gXHRcdFx0Ly8gYXZvaWQgdHJpZ2dlcmluZyB1bmNhdWdodCBleGNlcHRpb24gd2FybmluZyBpbiBDaHJvbWUuXG4gXHRcdFx0Ly8gU2VlIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTQ2NTY2NlxuIFx0XHRcdFByb21pc2UucmVzb2x2ZSgpXG4gXHRcdFx0XHQudGhlbihmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIGhvdEFwcGx5KGhvdEFwcGx5T25VcGRhdGUpO1xuIFx0XHRcdFx0fSlcbiBcdFx0XHRcdC50aGVuKFxuIFx0XHRcdFx0XHRmdW5jdGlvbihyZXN1bHQpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKHJlc3VsdCk7XG4gXHRcdFx0XHRcdH0sXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlamVjdChlcnIpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHQpO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2godG9Nb2R1bGVJZChpZCkpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0XHRkZWZlcnJlZC5yZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90QXBwbHkob3B0aW9ucykge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcInJlYWR5XCIpXG4gXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzXCIpO1xuIFx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuIFx0XHR2YXIgY2I7XG4gXHRcdHZhciBpO1xuIFx0XHR2YXIgajtcbiBcdFx0dmFyIG1vZHVsZTtcbiBcdFx0dmFyIG1vZHVsZUlkO1xuXG4gXHRcdGZ1bmN0aW9uIGdldEFmZmVjdGVkU3R1ZmYodXBkYXRlTW9kdWxlSWQpIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW3VwZGF0ZU1vZHVsZUlkXTtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblxuIFx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpLm1hcChmdW5jdGlvbihpZCkge1xuIFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0Y2hhaW46IFtpZF0sXG4gXHRcdFx0XHRcdGlkOiBpZFxuIFx0XHRcdFx0fTtcbiBcdFx0XHR9KTtcbiBcdFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuIFx0XHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAoIW1vZHVsZSB8fCBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX3NlbGZEZWNsaW5lZCkge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1kZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9tYWluKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJ1bmFjY2VwdGVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGUucGFyZW50cy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50SWQgPSBtb2R1bGUucGFyZW50c1tpXTtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudCA9IGluc3RhbGxlZE1vZHVsZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuIFx0XHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHRcdH07XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG4gXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcbiBcdFx0XHRcdFx0cXVldWUucHVzaCh7XG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcbiBcdFx0XHRcdFx0XHRpZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuXG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcbiBcdFx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcbiBcdFx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuIFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG4gXHRcdFx0fTtcbiBcdFx0fVxuXG4gXHRcdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcbiBcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdHZhciBpdGVtID0gYltpXTtcbiBcdFx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcbiBcdFx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuIFx0XHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcbiBcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG4gXHRcdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUoKSB7XG4gXHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyByZXN1bHQubW9kdWxlSWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcbiBcdFx0XHQpO1xuIFx0XHR9O1xuXG4gXHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaG90VXBkYXRlLCBpZCkpIHtcbiBcdFx0XHRcdG1vZHVsZUlkID0gdG9Nb2R1bGVJZChpZCk7XG4gXHRcdFx0XHQvKiogQHR5cGUge1RPRE99ICovXG4gXHRcdFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRcdFx0aWYgKGhvdFVwZGF0ZVtpZF0pIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0gZ2V0QWZmZWN0ZWRTdHVmZihtb2R1bGVJZCk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJkaXNwb3NlZFwiLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBpZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cbiBcdFx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG4gXHRcdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG4gXHRcdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcbiBcdFx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGRlZmF1bHQ6XG4gXHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG4gXHRcdFx0XHRcdGhvdFNldFN0YXR1cyhcImFib3J0XCIpO1xuIFx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoYWJvcnRFcnJvcik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9BcHBseSkge1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IGhvdFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgcmVzdWx0Lm91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdFx0XHRcdGZvciAobW9kdWxlSWQgaW4gcmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0XHRcdFx0aWYgKFxuIFx0XHRcdFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHRcdFx0XHQpXG4gXHRcdFx0XHRcdFx0KSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG4gXHRcdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcbiBcdFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuIFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuIFx0XHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRtb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSAmJlxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHQpXG4gXHRcdFx0XHRvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMucHVzaCh7XG4gXHRcdFx0XHRcdG1vZHVsZTogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdGVycm9ySGFuZGxlcjogaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uaG90Ll9zZWxmQWNjZXB0ZWRcbiBcdFx0XHRcdH0pO1xuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG4gXHRcdE9iamVjdC5rZXlzKGhvdEF2YWlsYWJsZUZpbGVzTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gPT09IGZhbHNlKSB7XG4gXHRcdFx0XHRob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0fVxuIFx0XHR9KTtcblxuIFx0XHR2YXIgaWR4O1xuIFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcbiBcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuIFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdGlmICghbW9kdWxlKSBjb250aW51ZTtcblxuIFx0XHRcdHZhciBkYXRhID0ge307XG5cbiBcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcbiBcdFx0XHR2YXIgZGlzcG9zZUhhbmRsZXJzID0gbW9kdWxlLmhvdC5fZGlzcG9zZUhhbmRsZXJzO1xuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdGNiID0gZGlzcG9zZUhhbmRsZXJzW2pdO1xuIFx0XHRcdFx0Y2IoZGF0YSk7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdEN1cnJlbnRNb2R1bGVEYXRhW21vZHVsZUlkXSA9IGRhdGE7XG5cbiBcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuIFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cbiBcdFx0XHQvLyByZW1vdmUgbW9kdWxlIGZyb20gY2FjaGVcbiBcdFx0XHRkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG4gXHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHJlbW92ZSBcInBhcmVudHNcIiByZWZlcmVuY2VzIGZyb20gYWxsIGNoaWxkcmVuXG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGNoaWxkID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuIFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG4gXHRcdFx0XHRpZHggPSBjaGlsZC5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG4gXHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gcmVtb3ZlIG91dGRhdGVkIGRlcGVuZGVuY3kgZnJvbSBtb2R1bGUgY2hpbGRyZW5cbiBcdFx0dmFyIGRlcGVuZGVuY3k7XG4gXHRcdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tqXTtcbiBcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcbiBcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIE5vdCBpbiBcImFwcGx5XCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cbiBcdFx0aG90Q3VycmVudEhhc2ggPSBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRcdC8vIGluc2VydCBuZXcgY29kZVxuIFx0XHRmb3IgKG1vZHVsZUlkIGluIGFwcGxpZWRVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcGxpZWRVcGRhdGUsIG1vZHVsZUlkKSkge1xuIFx0XHRcdFx0bW9kdWxlc1ttb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuIFx0XHR2YXIgZXJyb3IgPSBudWxsO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0dmFyIGNhbGxiYWNrcyA9IFtdO1xuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV07XG4gXHRcdFx0XHRcdFx0Y2IgPSBtb2R1bGUuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBlbmRlbmN5XTtcbiBcdFx0XHRcdFx0XHRpZiAoY2IpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihjYikgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGNiKTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGNiID0gY2FsbGJhY2tzW2ldO1xuIFx0XHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0XHRjYihtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG4gXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXSxcbiBcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBpdGVtID0gb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG4gXHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuIFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVycik7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcbiBcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyMjtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBoYW5kbGUgZXJyb3JzIGluIGFjY2VwdCBoYW5kbGVycyBhbmQgc2VsZiBhY2NlcHRlZCBtb2R1bGUgbG9hZFxuIFx0XHRpZiAoZXJyb3IpIHtcbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJmYWlsXCIpO1xuIFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gXHRcdH1cblxuIFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuIFx0XHRcdHJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4gXHQvLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbiBcdC8vIFByb21pc2UgPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG4gXHR2YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuIFx0XHRcImFwcFwiOiAwXG4gXHR9O1xuXG4gXHR2YXIgZGVmZXJyZWRNb2R1bGVzID0gW107XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGhvdDogaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSxcbiBcdFx0XHRwYXJlbnRzOiAoaG90Q3VycmVudFBhcmVudHNUZW1wID0gaG90Q3VycmVudFBhcmVudHMsIGhvdEN1cnJlbnRQYXJlbnRzID0gW10sIGhvdEN1cnJlbnRQYXJlbnRzVGVtcCksXG4gXHRcdFx0Y2hpbGRyZW46IFtdXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcImNvbW1vblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqL1xuXG52YXIgZmJlbWl0dGVyID0ge1xuICBFdmVudEVtaXR0ZXI6IHJlcXVpcmUoJy4vbGliL0Jhc2VFdmVudEVtaXR0ZXInKSxcbiAgRW1pdHRlclN1YnNjcmlwdGlvbiA6IHJlcXVpcmUoJy4vbGliL0VtaXR0ZXJTdWJzY3JpcHRpb24nKVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmYmVtaXR0ZXI7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEJhc2VFdmVudEVtaXR0ZXJcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIEVtaXR0ZXJTdWJzY3JpcHRpb24gPSByZXF1aXJlKCcuL0VtaXR0ZXJTdWJzY3JpcHRpb24nKTtcbnZhciBFdmVudFN1YnNjcmlwdGlvblZlbmRvciA9IHJlcXVpcmUoJy4vRXZlbnRTdWJzY3JpcHRpb25WZW5kb3InKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogQGNsYXNzIEJhc2VFdmVudEVtaXR0ZXJcbiAqIEBkZXNjcmlwdGlvblxuICogQW4gRXZlbnRFbWl0dGVyIGlzIHJlc3BvbnNpYmxlIGZvciBtYW5hZ2luZyBhIHNldCBvZiBsaXN0ZW5lcnMgYW5kIHB1Ymxpc2hpbmdcbiAqIGV2ZW50cyB0byB0aGVtIHdoZW4gaXQgaXMgdG9sZCB0aGF0IHN1Y2ggZXZlbnRzIGhhcHBlbmVkLiBJbiBhZGRpdGlvbiB0byB0aGVcbiAqIGRhdGEgZm9yIHRoZSBnaXZlbiBldmVudCBpdCBhbHNvIHNlbmRzIGEgZXZlbnQgY29udHJvbCBvYmplY3Qgd2hpY2ggYWxsb3dzXG4gKiB0aGUgbGlzdGVuZXJzL2hhbmRsZXJzIHRvIHByZXZlbnQgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIFRoZSBlbWl0dGVyIGlzIGRlc2lnbmVkIHRvIGJlIGdlbmVyaWMgZW5vdWdoIHRvIHN1cHBvcnQgYWxsIHRoZSBkaWZmZXJlbnRcbiAqIGNvbnRleHRzIGluIHdoaWNoIG9uZSBtaWdodCB3YW50IHRvIGVtaXQgZXZlbnRzLiBJdCBpcyBhIHNpbXBsZSBtdWx0aWNhc3RcbiAqIG1lY2hhbmlzbSBvbiB0b3Agb2Ygd2hpY2ggZXh0cmEgZnVuY3Rpb25hbGl0eSBjYW4gYmUgY29tcG9zZWQuIEZvciBleGFtcGxlLCBhXG4gKiBtb3JlIGFkdmFuY2VkIGVtaXR0ZXIgbWF5IHVzZSBhbiBFdmVudEhvbGRlciBhbmQgRXZlbnRGYWN0b3J5LlxuICovXG5cbnZhciBCYXNlRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBCYXNlRXZlbnRFbWl0dGVyKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlRXZlbnRFbWl0dGVyKTtcblxuICAgIHRoaXMuX3N1YnNjcmliZXIgPSBuZXcgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IoKTtcbiAgICB0aGlzLl9jdXJyZW50U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgbGlzdGVuZXIgdG8gYmUgaW52b2tlZCB3aGVuIGV2ZW50cyBvZiB0aGUgc3BlY2lmaWVkIHR5cGUgYXJlXG4gICAqIGVtaXR0ZWQuIEFuIG9wdGlvbmFsIGNhbGxpbmcgY29udGV4dCBtYXkgYmUgcHJvdmlkZWQuIFRoZSBkYXRhIGFyZ3VtZW50c1xuICAgKiBlbWl0dGVkIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAgICpcbiAgICogVE9ETzogQW5ub3RhdGUgdGhlIGxpc3RlbmVyIGFyZydzIHR5cGUuIFRoaXMgaXMgdHJpY2t5IGJlY2F1c2UgbGlzdGVuZXJzXG4gICAqICAgICAgIGNhbiBiZSBpbnZva2VkIHdpdGggdmFyYXJncy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiB0b1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciAtIEZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBzcGVjaWZpZWQgZXZlbnQgaXNcbiAgICogICBlbWl0dGVkXG4gICAqIEBwYXJhbSB7Kn0gY29udGV4dCAtIE9wdGlvbmFsIGNvbnRleHQgb2JqZWN0IHRvIHVzZSB3aGVuIGludm9raW5nIHRoZVxuICAgKiAgIGxpc3RlbmVyXG4gICAqL1xuXG4gIEJhc2VFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgIHJldHVybiB0aGlzLl9zdWJzY3JpYmVyLmFkZFN1YnNjcmlwdGlvbihldmVudFR5cGUsIG5ldyBFbWl0dGVyU3Vic2NyaXB0aW9uKHRoaXMuX3N1YnNjcmliZXIsIGxpc3RlbmVyLCBjb250ZXh0KSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNpbWlsYXIgdG8gYWRkTGlzdGVuZXIsIGV4Y2VwdCB0aGF0IHRoZSBsaXN0ZW5lciBpcyByZW1vdmVkIGFmdGVyIGl0IGlzXG4gICAqIGludm9rZWQgb25jZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGxpc3RlbiB0b1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lciAtIEZ1bmN0aW9uIHRvIGludm9rZSBvbmx5IG9uY2Ugd2hlbiB0aGVcbiAgICogICBzcGVjaWZpZWQgZXZlbnQgaXMgZW1pdHRlZFxuICAgKiBAcGFyYW0geyp9IGNvbnRleHQgLSBPcHRpb25hbCBjb250ZXh0IG9iamVjdCB0byB1c2Ugd2hlbiBpbnZva2luZyB0aGVcbiAgICogICBsaXN0ZW5lclxuICAgKi9cblxuICBCYXNlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudFR5cGUsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgdmFyIGVtaXR0ZXIgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKGV2ZW50VHlwZSwgZnVuY3Rpb24gKCkge1xuICAgICAgZW1pdHRlci5yZW1vdmVDdXJyZW50TGlzdGVuZXIoKTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIG9mIHRoZSByZWdpc3RlcmVkIGxpc3RlbmVycywgaW5jbHVkaW5nIHRob3NlIHJlZ2lzdGVyZWQgYXNcbiAgICogbGlzdGVuZXIgbWFwcy5cbiAgICpcbiAgICogQHBhcmFtIHs/c3RyaW5nfSBldmVudFR5cGUgLSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB3aG9zZSByZWdpc3RlcmVkXG4gICAqICAgbGlzdGVuZXJzIHRvIHJlbW92ZVxuICAgKi9cblxuICBCYXNlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnRUeXBlKSB7XG4gICAgdGhpcy5fc3Vic2NyaWJlci5yZW1vdmVBbGxTdWJzY3JpcHRpb25zKGV2ZW50VHlwZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGFuIEFQSSB0aGF0IGNhbiBiZSBjYWxsZWQgZHVyaW5nIGFuIGV2ZW50aW5nIGN5Y2xlIHRvIHJlbW92ZSB0aGVcbiAgICogbGFzdCBsaXN0ZW5lciB0aGF0IHdhcyBpbnZva2VkLiBUaGlzIGFsbG93cyBhIGRldmVsb3BlciB0byBwcm92aWRlIGFuIGV2ZW50XG4gICAqIG9iamVjdCB0aGF0IGNhbiByZW1vdmUgdGhlIGxpc3RlbmVyIChvciBsaXN0ZW5lciBtYXApIGR1cmluZyB0aGVcbiAgICogaW52b2NhdGlvbi5cbiAgICpcbiAgICogSWYgaXQgaXMgY2FsbGVkIHdoZW4gbm90IGluc2lkZSBvZiBhbiBlbWl0dGluZyBjeWNsZSBpdCB3aWxsIHRocm93LlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gV2hlbiBjYWxsZWQgbm90IGR1cmluZyBhbiBldmVudGluZyBjeWNsZVxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgIHZhciBzdWJzY3JpcHRpb24gPSBlbWl0dGVyLmFkZExpc3RlbmVyTWFwKHtcbiAgICogICAgIHNvbWVFdmVudDogZnVuY3Rpb24oZGF0YSwgZXZlbnQpIHtcbiAgICogICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAqICAgICAgIGVtaXR0ZXIucmVtb3ZlQ3VycmVudExpc3RlbmVyKCk7XG4gICAqICAgICB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqICAgZW1pdHRlci5lbWl0KCdzb21lRXZlbnQnLCAnYWJjJyk7IC8vIGxvZ3MgJ2FiYydcbiAgICogICBlbWl0dGVyLmVtaXQoJ3NvbWVFdmVudCcsICdkZWYnKTsgLy8gZG9lcyBub3QgbG9nIGFueXRoaW5nXG4gICAqL1xuXG4gIEJhc2VFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUN1cnJlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUN1cnJlbnRMaXN0ZW5lcigpIHtcbiAgICAhISF0aGlzLl9jdXJyZW50U3Vic2NyaXB0aW9uID8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ05vdCBpbiBhbiBlbWl0dGluZyBjeWNsZTsgdGhlcmUgaXMgbm8gY3VycmVudCBzdWJzY3JpcHRpb24nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5fc3Vic2NyaWJlci5yZW1vdmVTdWJzY3JpcHRpb24odGhpcy5fY3VycmVudFN1YnNjcmlwdGlvbik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGN1cnJlbnRseSByZWdpc3RlcmVkIGZvciB0aGUgZ2l2ZW5cbiAgICogZXZlbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBOYW1lIG9mIHRoZSBldmVudCB0byBxdWVyeVxuICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICovXG5cbiAgQmFzZUV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50VHlwZSkgLyogVE9ETzogQXJyYXk8RXZlbnRTdWJzY3JpcHRpb24+ICove1xuICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaWJlci5nZXRTdWJzY3JpcHRpb25zRm9yVHlwZShldmVudFR5cGUpO1xuICAgIHJldHVybiBzdWJzY3JpcHRpb25zID8gc3Vic2NyaXB0aW9ucy5maWx0ZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUpLm1hcChmdW5jdGlvbiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm4gc3Vic2NyaXB0aW9uLmxpc3RlbmVyO1xuICAgIH0pIDogW107XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50IG9mIHRoZSBnaXZlbiB0eXBlIHdpdGggdGhlIGdpdmVuIGRhdGEuIEFsbCBoYW5kbGVycyBvZiB0aGF0XG4gICAqIHBhcnRpY3VsYXIgdHlwZSB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdFxuICAgKiBAcGFyYW0geyp9IEFyYml0cmFyeSBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggcmVnaXN0ZXJlZCBsaXN0ZW5lclxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAgIGVtaXR0ZXIuYWRkTGlzdGVuZXIoJ3NvbWVFdmVudCcsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICogICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgKiAgIH0pO1xuICAgKlxuICAgKiAgIGVtaXR0ZXIuZW1pdCgnc29tZUV2ZW50JywgJ2FiYycpOyAvLyBsb2dzICdhYmMnXG4gICAqL1xuXG4gIEJhc2VFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50VHlwZSkge1xuICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaWJlci5nZXRTdWJzY3JpcHRpb25zRm9yVHlwZShldmVudFR5cGUpO1xuICAgIGlmIChzdWJzY3JpcHRpb25zKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHN1YnNjcmlwdGlvbnMpO1xuICAgICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IGtleXMubGVuZ3RoOyBpaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2lpXTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHN1YnNjcmlwdGlvbnNba2V5XTtcbiAgICAgICAgLy8gVGhlIHN1YnNjcmlwdGlvbiBtYXkgaGF2ZSBiZWVuIHJlbW92ZWQgZHVyaW5nIHRoaXMgZXZlbnQgbG9vcC5cbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb247XG4gICAgICAgICAgdGhpcy5fX2VtaXRUb1N1YnNjcmlwdGlvbi5hcHBseSh0aGlzLCBbc3Vic2NyaXB0aW9uXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgaG9vayB0byBvdmVycmlkZSBob3cgdGhlIGVtaXR0ZXIgZW1pdHMgYW4gZXZlbnQgdG8gYSBzcGVjaWZpY1xuICAgKiBzdWJzY3JpcHRpb24uIFRoaXMgYWxsb3dzIHlvdSB0byBzZXQgdXAgbG9nZ2luZyBhbmQgZXJyb3IgYm91bmRhcmllc1xuICAgKiBzcGVjaWZpYyB0byB5b3VyIGVudmlyb25tZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge0VtaXR0ZXJTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gICAqIEBwYXJhbSB7Kn0gQXJiaXRyYXJ5IGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCByZWdpc3RlcmVkIGxpc3RlbmVyXG4gICAqL1xuXG4gIEJhc2VFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9fZW1pdFRvU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gX19lbWl0VG9TdWJzY3JpcHRpb24oc3Vic2NyaXB0aW9uLCBldmVudFR5cGUpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgc3Vic2NyaXB0aW9uLmxpc3RlbmVyLmFwcGx5KHN1YnNjcmlwdGlvbi5jb250ZXh0LCBhcmdzKTtcbiAgfTtcblxuICByZXR1cm4gQmFzZUV2ZW50RW1pdHRlcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUV2ZW50RW1pdHRlcjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKiBcbiAqIEBwcm92aWRlc01vZHVsZSBFbWl0dGVyU3Vic2NyaXB0aW9uXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbnZhciBFdmVudFN1YnNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vRXZlbnRTdWJzY3JpcHRpb24nKTtcblxuLyoqXG4gKiBFbWl0dGVyU3Vic2NyaXB0aW9uIHJlcHJlc2VudHMgYSBzdWJzY3JpcHRpb24gd2l0aCBsaXN0ZW5lciBhbmQgY29udGV4dCBkYXRhLlxuICovXG5cbnZhciBFbWl0dGVyU3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uIChfRXZlbnRTdWJzY3JpcHRpb24pIHtcbiAgX2luaGVyaXRzKEVtaXR0ZXJTdWJzY3JpcHRpb24sIF9FdmVudFN1YnNjcmlwdGlvbik7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnRTdWJzY3JpcHRpb25WZW5kb3J9IHN1YnNjcmliZXIgLSBUaGUgc3Vic2NyaWJlciB0aGF0IGNvbnRyb2xzXG4gICAqICAgdGhpcyBzdWJzY3JpcHRpb25cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgLSBGdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgc3BlY2lmaWVkIGV2ZW50IGlzXG4gICAqICAgZW1pdHRlZFxuICAgKiBAcGFyYW0geyp9IGNvbnRleHQgLSBPcHRpb25hbCBjb250ZXh0IG9iamVjdCB0byB1c2Ugd2hlbiBpbnZva2luZyB0aGVcbiAgICogICBsaXN0ZW5lclxuICAgKi9cblxuICBmdW5jdGlvbiBFbWl0dGVyU3Vic2NyaXB0aW9uKHN1YnNjcmliZXIsIGxpc3RlbmVyLCBjb250ZXh0KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVtaXR0ZXJTdWJzY3JpcHRpb24pO1xuXG4gICAgX0V2ZW50U3Vic2NyaXB0aW9uLmNhbGwodGhpcywgc3Vic2NyaWJlcik7XG4gICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cblxuICByZXR1cm4gRW1pdHRlclN1YnNjcmlwdGlvbjtcbn0pKEV2ZW50U3Vic2NyaXB0aW9uKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyU3Vic2NyaXB0aW9uOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXZlbnRTdWJzY3JpcHRpb25cbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEV2ZW50U3Vic2NyaXB0aW9uIHJlcHJlc2VudHMgYSBzdWJzY3JpcHRpb24gdG8gYSBwYXJ0aWN1bGFyIGV2ZW50LiBJdCBjYW5cbiAqIHJlbW92ZSBpdHMgb3duIHN1YnNjcmlwdGlvbi5cbiAqL1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIEV2ZW50U3Vic2NyaXB0aW9uID0gKGZ1bmN0aW9uICgpIHtcblxuICAvKipcbiAgICogQHBhcmFtIHtFdmVudFN1YnNjcmlwdGlvblZlbmRvcn0gc3Vic2NyaWJlciB0aGUgc3Vic2NyaWJlciB0aGF0IGNvbnRyb2xzXG4gICAqICAgdGhpcyBzdWJzY3JpcHRpb24uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEV2ZW50U3Vic2NyaXB0aW9uKHN1YnNjcmliZXIpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRTdWJzY3JpcHRpb24pO1xuXG4gICAgdGhpcy5zdWJzY3JpYmVyID0gc3Vic2NyaWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoaXMgc3Vic2NyaXB0aW9uIGZyb20gdGhlIHN1YnNjcmliZXIgdGhhdCBjb250cm9scyBpdC5cbiAgICovXG5cbiAgRXZlbnRTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICBpZiAodGhpcy5zdWJzY3JpYmVyKSB7XG4gICAgICB0aGlzLnN1YnNjcmliZXIucmVtb3ZlU3Vic2NyaXB0aW9uKHRoaXMpO1xuICAgICAgdGhpcy5zdWJzY3JpYmVyID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50U3Vic2NyaXB0aW9uO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFN1YnNjcmlwdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKiBcbiAqIEBwcm92aWRlc01vZHVsZSBFdmVudFN1YnNjcmlwdGlvblZlbmRvclxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogRXZlbnRTdWJzY3JpcHRpb25WZW5kb3Igc3RvcmVzIGEgc2V0IG9mIEV2ZW50U3Vic2NyaXB0aW9ucyB0aGF0IGFyZVxuICogc3Vic2NyaWJlZCB0byBhIHBhcnRpY3VsYXIgZXZlbnQgdHlwZS5cbiAqL1xuXG52YXIgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFdmVudFN1YnNjcmlwdGlvblZlbmRvcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IpO1xuXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGUgPSB7fTtcbiAgICB0aGlzLl9jdXJyZW50U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgc3Vic2NyaXB0aW9uIGtleWVkIGJ5IGFuIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAgICogQHBhcmFtIHtFdmVudFN1YnNjcmlwdGlvbn0gc3Vic2NyaXB0aW9uXG4gICAqL1xuXG4gIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yLnByb3RvdHlwZS5hZGRTdWJzY3JpcHRpb24gPSBmdW5jdGlvbiBhZGRTdWJzY3JpcHRpb24oZXZlbnRUeXBlLCBzdWJzY3JpcHRpb24pIHtcbiAgICAhKHN1YnNjcmlwdGlvbi5zdWJzY3JpYmVyID09PSB0aGlzKSA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdUaGUgc3Vic2NyaWJlciBvZiB0aGUgc3Vic2NyaXB0aW9uIGlzIGluY29ycmVjdGx5IHNldC4nKSA6IGludmFyaWFudChmYWxzZSkgOiB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLl9zdWJzY3JpcHRpb25zRm9yVHlwZVtldmVudFR5cGVdKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpcHRpb25zRm9yVHlwZVtldmVudFR5cGVdID0gW107XG4gICAgfVxuICAgIHZhciBrZXkgPSB0aGlzLl9zdWJzY3JpcHRpb25zRm9yVHlwZVtldmVudFR5cGVdLmxlbmd0aDtcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zRm9yVHlwZVtldmVudFR5cGVdLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICBzdWJzY3JpcHRpb24uZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgIHN1YnNjcmlwdGlvbi5rZXkgPSBrZXk7XG4gICAgcmV0dXJuIHN1YnNjcmlwdGlvbjtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGJ1bGsgc2V0IG9mIHRoZSBzdWJzY3JpcHRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGV2ZW50VHlwZSAtIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGV2ZW50IHR5cGUgd2hvc2VcbiAgICogICByZWdpc3RlcmVkIHN1cHNjcmlwdGlvbnMgdG8gcmVtb3ZlLCBpZiBudWxsIHJlbW92ZSBhbGwgc3Vic2NyaXB0aW9ucy5cbiAgICovXG5cbiAgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IucHJvdG90eXBlLnJlbW92ZUFsbFN1YnNjcmlwdGlvbnMgPSBmdW5jdGlvbiByZW1vdmVBbGxTdWJzY3JpcHRpb25zKGV2ZW50VHlwZSkge1xuICAgIGlmIChldmVudFR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGUgPSB7fTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuX3N1YnNjcmlwdGlvbnNGb3JUeXBlW2V2ZW50VHlwZV07XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgc3BlY2lmaWMgc3Vic2NyaXB0aW9uLiBJbnN0ZWFkIG9mIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgY2FsbFxuICAgKiBgc3Vic2NyaXB0aW9uLnJlbW92ZSgpYCBkaXJlY3RseS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHN1YnNjcmlwdGlvblxuICAgKi9cblxuICBFdmVudFN1YnNjcmlwdGlvblZlbmRvci5wcm90b3R5cGUucmVtb3ZlU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gcmVtb3ZlU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgIHZhciBldmVudFR5cGUgPSBzdWJzY3JpcHRpb24uZXZlbnRUeXBlO1xuICAgIHZhciBrZXkgPSBzdWJzY3JpcHRpb24ua2V5O1xuXG4gICAgdmFyIHN1YnNjcmlwdGlvbnNGb3JUeXBlID0gdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGVbZXZlbnRUeXBlXTtcbiAgICBpZiAoc3Vic2NyaXB0aW9uc0ZvclR5cGUpIHtcbiAgICAgIGRlbGV0ZSBzdWJzY3JpcHRpb25zRm9yVHlwZVtrZXldO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3Vic2NyaXB0aW9ucyB0aGF0IGFyZSBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlXG4gICAqIGdpdmVuIGV2ZW50IHR5cGUuXG4gICAqXG4gICAqIE5vdGU6IFRoaXMgYXJyYXkgY2FuIGJlIHBvdGVudGlhbGx5IHNwYXJzZSBhcyBzdWJzY3JpcHRpb25zIGFyZSBkZWxldGVkXG4gICAqIGZyb20gaXQgd2hlbiB0aGV5IGFyZSByZW1vdmVkLlxuICAgKlxuICAgKiBUT0RPOiBUaGlzIHJldHVybnMgYSBudWxsYWJsZSBhcnJheS4gd2F0P1xuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gICAqIEByZXR1cm4gez9hcnJheX1cbiAgICovXG5cbiAgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IucHJvdG90eXBlLmdldFN1YnNjcmlwdGlvbnNGb3JUeXBlID0gZnVuY3Rpb24gZ2V0U3Vic2NyaXB0aW9uc0ZvclR5cGUoZXZlbnRUeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N1YnNjcmlwdGlvbnNGb3JUeXBlW2V2ZW50VHlwZV07XG4gIH07XG5cbiAgcmV0dXJuIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yO1xufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFdmVudFN1YnNjcmlwdGlvblZlbmRvcjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5Vc2VET00gPSAhISh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZG9jdW1lbnQgJiYgd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG4vKipcbiAqIFNpbXBsZSwgbGlnaHR3ZWlnaHQgbW9kdWxlIGFzc2lzdGluZyB3aXRoIHRoZSBkZXRlY3Rpb24gYW5kIGNvbnRleHQgb2ZcbiAqIFdvcmtlci4gSGVscHMgYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jaWVzIGFuZCBhbGxvd3MgY29kZSB0byByZWFzb24gYWJvdXRcbiAqIHdoZXRoZXIgb3Igbm90IHRoZXkgYXJlIGluIGEgV29ya2VyLCBldmVuIGlmIHRoZXkgbmV2ZXIgaW5jbHVkZSB0aGUgbWFpblxuICogYFJlYWN0V29ya2VyYCBkZXBlbmRlbmN5LlxuICovXG52YXIgRXhlY3V0aW9uRW52aXJvbm1lbnQgPSB7XG5cbiAgY2FuVXNlRE9NOiBjYW5Vc2VET00sXG5cbiAgY2FuVXNlV29ya2VyczogdHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcsXG5cbiAgY2FuVXNlRXZlbnRMaXN0ZW5lcnM6IGNhblVzZURPTSAmJiAhISh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciB8fCB3aW5kb3cuYXR0YWNoRXZlbnQpLFxuXG4gIGNhblVzZVZpZXdwb3J0OiBjYW5Vc2VET00gJiYgISF3aW5kb3cuc2NyZWVuLFxuXG4gIGlzSW5Xb3JrZXI6ICFjYW5Vc2VET00gLy8gRm9yIG5vdywgdGhpcyBpcyB0cnVlIC0gbWlnaHQgY2hhbmdlIGluIHRoZSBmdXR1cmUuXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhlY3V0aW9uRW52aXJvbm1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgX2h5cGhlblBhdHRlcm4gPSAvLSguKS9nO1xuXG4vKipcbiAqIENhbWVsY2FzZXMgYSBoeXBoZW5hdGVkIHN0cmluZywgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGNhbWVsaXplKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmRDb2xvclwiXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjYW1lbGl6ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF9oeXBoZW5QYXR0ZXJuLCBmdW5jdGlvbiAoXywgY2hhcmFjdGVyKSB7XG4gICAgcmV0dXJuIGNoYXJhY3Rlci50b1VwcGVyQ2FzZSgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbGl6ZTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FtZWxpemUgPSByZXF1aXJlKCcuL2NhbWVsaXplJyk7XG5cbnZhciBtc1BhdHRlcm4gPSAvXi1tcy0vO1xuXG4vKipcbiAqIENhbWVsY2FzZXMgYSBoeXBoZW5hdGVkIENTUyBwcm9wZXJ0eSBuYW1lLCBmb3IgZXhhbXBsZTpcbiAqXG4gKiAgID4gY2FtZWxpemVTdHlsZU5hbWUoJ2JhY2tncm91bmQtY29sb3InKVxuICogICA8IFwiYmFja2dyb3VuZENvbG9yXCJcbiAqICAgPiBjYW1lbGl6ZVN0eWxlTmFtZSgnLW1vei10cmFuc2l0aW9uJylcbiAqICAgPCBcIk1velRyYW5zaXRpb25cIlxuICogICA+IGNhbWVsaXplU3R5bGVOYW1lKCctbXMtdHJhbnNpdGlvbicpXG4gKiAgIDwgXCJtc1RyYW5zaXRpb25cIlxuICpcbiAqIEFzIEFuZGkgU21pdGggc3VnZ2VzdHNcbiAqIChodHRwOi8vd3d3LmFuZGlzbWl0aC5jb20vYmxvZy8yMDEyLzAyL21vZGVybml6ci1wcmVmaXhlZC8pLCBhbiBgLW1zYCBwcmVmaXhcbiAqIGlzIGNvbnZlcnRlZCB0byBsb3dlcmNhc2UgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGNhbWVsaXplU3R5bGVOYW1lKHN0cmluZykge1xuICByZXR1cm4gY2FtZWxpemUoc3RyaW5nLnJlcGxhY2UobXNQYXR0ZXJuLCAnbXMtJykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsaXplU3R5bGVOYW1lOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG52YXIgaXNUZXh0Tm9kZSA9IHJlcXVpcmUoJy4vaXNUZXh0Tm9kZScpO1xuXG4vKmVzbGludC1kaXNhYmxlIG5vLWJpdHdpc2UgKi9cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBnaXZlbiBET00gbm9kZSBjb250YWlucyBvciBpcyBhbm90aGVyIERPTSBub2RlLlxuICovXG5mdW5jdGlvbiBjb250YWluc05vZGUob3V0ZXJOb2RlLCBpbm5lck5vZGUpIHtcbiAgaWYgKCFvdXRlck5vZGUgfHwgIWlubmVyTm9kZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChvdXRlck5vZGUgPT09IGlubmVyTm9kZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGlzVGV4dE5vZGUob3V0ZXJOb2RlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChpc1RleHROb2RlKGlubmVyTm9kZSkpIHtcbiAgICByZXR1cm4gY29udGFpbnNOb2RlKG91dGVyTm9kZSwgaW5uZXJOb2RlLnBhcmVudE5vZGUpO1xuICB9IGVsc2UgaWYgKCdjb250YWlucycgaW4gb3V0ZXJOb2RlKSB7XG4gICAgcmV0dXJuIG91dGVyTm9kZS5jb250YWlucyhpbm5lck5vZGUpO1xuICB9IGVsc2UgaWYgKG91dGVyTm9kZS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbikge1xuICAgIHJldHVybiAhIShvdXRlck5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24oaW5uZXJOb2RlKSAmIDE2KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb250YWluc05vZGU7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuLyogZXNsaW50LWRpc2FibGUgZmItd3d3L3R5cGVvZi11bmRlZmluZWQgKi9cblxuLyoqXG4gKiBTYW1lIGFzIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYnV0IHdyYXBzIGluIGEgdHJ5LWNhdGNoIGJsb2NrLiBJbiBJRSBpdCBpc1xuICogbm90IHNhZmUgdG8gY2FsbCBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGlmIHRoZXJlIGlzIG5vdGhpbmcgZm9jdXNlZC5cbiAqXG4gKiBUaGUgYWN0aXZlRWxlbWVudCB3aWxsIGJlIG51bGwgb25seSBpZiB0aGUgZG9jdW1lbnQgb3IgZG9jdW1lbnQgYm9keSBpcyBub3RcbiAqIHlldCBkZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7P0RPTURvY3VtZW50fSBkb2MgRGVmYXVsdHMgdG8gY3VycmVudCBkb2N1bWVudC5cbiAqIEByZXR1cm4gez9ET01FbGVtZW50fVxuICovXG5mdW5jdGlvbiBnZXRBY3RpdmVFbGVtZW50KGRvYykgLyo/RE9NRWxlbWVudCove1xuICBkb2MgPSBkb2MgfHwgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHVuZGVmaW5lZCk7XG4gIGlmICh0eXBlb2YgZG9jID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRvYy5hY3RpdmVFbGVtZW50IHx8IGRvYy5ib2R5O1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGRvYy5ib2R5O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QWN0aXZlRWxlbWVudDsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgX3VwcGVyY2FzZVBhdHRlcm4gPSAvKFtBLVpdKS9nO1xuXG4vKipcbiAqIEh5cGhlbmF0ZXMgYSBjYW1lbGNhc2VkIHN0cmluZywgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICpcbiAqIEZvciBDU1Mgc3R5bGUgbmFtZXMsIHVzZSBgaHlwaGVuYXRlU3R5bGVOYW1lYCBpbnN0ZWFkIHdoaWNoIHdvcmtzIHByb3Blcmx5XG4gKiB3aXRoIGFsbCB2ZW5kb3IgcHJlZml4ZXMsIGluY2x1ZGluZyBgbXNgLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaHlwaGVuYXRlKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoX3VwcGVyY2FzZVBhdHRlcm4sICctJDEnKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGhlbmF0ZTsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaHlwaGVuYXRlID0gcmVxdWlyZSgnLi9oeXBoZW5hdGUnKTtcblxudmFyIG1zUGF0dGVybiA9IC9ebXMtLztcblxuLyoqXG4gKiBIeXBoZW5hdGVzIGEgY2FtZWxjYXNlZCBDU1MgcHJvcGVydHkgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnYmFja2dyb3VuZENvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmQtY29sb3JcIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnTW96VHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbW96LXRyYW5zaXRpb25cIlxuICogICA+IGh5cGhlbmF0ZVN0eWxlTmFtZSgnbXNUcmFuc2l0aW9uJylcbiAqICAgPCBcIi1tcy10cmFuc2l0aW9uXCJcbiAqXG4gKiBBcyBNb2Rlcm5penIgc3VnZ2VzdHMgKGh0dHA6Ly9tb2Rlcm5penIuY29tL2RvY3MvI3ByZWZpeGVkKSwgYW4gYG1zYCBwcmVmaXhcbiAqIGlzIGNvbnZlcnRlZCB0byBgLW1zLWAuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBoeXBoZW5hdGVTdHlsZU5hbWUoc3RyaW5nKSB7XG4gIHJldHVybiBoeXBoZW5hdGUoc3RyaW5nKS5yZXBsYWNlKG1zUGF0dGVybiwgJy1tcy0nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBoZW5hdGVTdHlsZU5hbWU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbi8qKlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIG9iamVjdCB0byBjaGVjay5cbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgb3Igbm90IHRoZSBvYmplY3QgaXMgYSBET00gbm9kZS5cbiAqL1xuZnVuY3Rpb24gaXNOb2RlKG9iamVjdCkge1xuICB2YXIgZG9jID0gb2JqZWN0ID8gb2JqZWN0Lm93bmVyRG9jdW1lbnQgfHwgb2JqZWN0IDogZG9jdW1lbnQ7XG4gIHZhciBkZWZhdWx0VmlldyA9IGRvYy5kZWZhdWx0VmlldyB8fCB3aW5kb3c7XG4gIHJldHVybiAhIShvYmplY3QgJiYgKHR5cGVvZiBkZWZhdWx0Vmlldy5Ob2RlID09PSAnZnVuY3Rpb24nID8gb2JqZWN0IGluc3RhbmNlb2YgZGVmYXVsdFZpZXcuTm9kZSA6IHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgPT09ICdudW1iZXInICYmIHR5cGVvZiBvYmplY3Qubm9kZU5hbWUgPT09ICdzdHJpbmcnKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNOb2RlOyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL2lzTm9kZScpO1xuXG4vKipcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgb2JqZWN0IGlzIGEgRE9NIHRleHQgbm9kZS5cbiAqL1xuZnVuY3Rpb24gaXNUZXh0Tm9kZShvYmplY3QpIHtcbiAgcmV0dXJuIGlzTm9kZShvYmplY3QpICYmIG9iamVjdC5ub2RlVHlwZSA9PSAzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVGV4dE5vZGU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICogXG4gKi9cblxuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIGlubGluZWQgT2JqZWN0LmlzIHBvbHlmaWxsIHRvIGF2b2lkIHJlcXVpcmluZyBjb25zdW1lcnMgc2hpcCB0aGVpciBvd25cbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICovXG5mdW5jdGlvbiBpcyh4LCB5KSB7XG4gIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgaWYgKHggPT09IHkpIHtcbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIC8vIEFkZGVkIHRoZSBub256ZXJvIHkgY2hlY2sgdG8gbWFrZSBGbG93IGhhcHB5LCBidXQgaXQgaXMgcmVkdW5kYW50XG4gICAgcmV0dXJuIHggIT09IDAgfHwgeSAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG5cbi8qKlxuICogUGVyZm9ybXMgZXF1YWxpdHkgYnkgaXRlcmF0aW5nIHRocm91Z2gga2V5cyBvbiBhbiBvYmplY3QgYW5kIHJldHVybmluZyBmYWxzZVxuICogd2hlbiBhbnkga2V5IGhhcyB2YWx1ZXMgd2hpY2ggYXJlIG5vdCBzdHJpY3RseSBlcXVhbCBiZXR3ZWVuIHRoZSBhcmd1bWVudHMuXG4gKiBSZXR1cm5zIHRydWUgd2hlbiB0aGUgdmFsdWVzIG9mIGFsbCBrZXlzIGFyZSBzdHJpY3RseSBlcXVhbC5cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0VxdWFsKG9iakEsIG9iakIpIHtcbiAgaWYgKGlzKG9iakEsIG9iakIpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iakEgIT09ICdvYmplY3QnIHx8IG9iakEgPT09IG51bGwgfHwgdHlwZW9mIG9iakIgIT09ICdvYmplY3QnIHx8IG9iakIgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIga2V5c0EgPSBPYmplY3Qua2V5cyhvYmpBKTtcbiAgdmFyIGtleXNCID0gT2JqZWN0LmtleXMob2JqQik7XG5cbiAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5c0IubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gVGVzdCBmb3IgQSdzIGtleXMgZGlmZmVyZW50IGZyb20gQi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQS5sZW5ndGg7IGkrKykge1xuICAgIGlmICghaGFzT3duUHJvcGVydHkuY2FsbChvYmpCLCBrZXlzQVtpXSkgfHwgIWlzKG9iakFba2V5c0FbaV1dLCBvYmpCW2tleXNBW2ldXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaGFsbG93RXF1YWw7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBkZXNjcmlwdGlvbiBBIG1vZHVsZSBmb3IgcGFyc2luZyBJU084NjAxIGR1cmF0aW9uc1xuICovXG5cbi8qKlxuICogVGhlIHBhdHRlcm4gdXNlZCBmb3IgcGFyc2luZyBJU084NjAxIGR1cmF0aW9uIChQblluTW5EVG5Ibk1uUykuXG4gKiBUaGlzIGRvZXMgbm90IGNvdmVyIHRoZSB3ZWVrIGZvcm1hdCBQblcuXG4gKi9cblxuLy8gUG5Zbk1uRFRuSG5NblNcbnZhciBudW1iZXJzID0gJ1xcXFxkKyg/OltcXFxcLixdXFxcXGR7MCwzfSk/JztcbnZhciB3ZWVrUGF0dGVybiA9ICcoJyArIG51bWJlcnMgKyAnVyknO1xudmFyIGRhdGVQYXR0ZXJuID0gJygnICsgbnVtYmVycyArICdZKT8oJyArIG51bWJlcnMgKyAnTSk/KCcgKyBudW1iZXJzICsgJ0QpPyc7XG52YXIgdGltZVBhdHRlcm4gPSAnVCgnICsgbnVtYmVycyArICdIKT8oJyArIG51bWJlcnMgKyAnTSk/KCcgKyBudW1iZXJzICsgJ1MpPyc7XG5cbnZhciBpc284NjAxID0gJ1AoPzonICsgd2Vla1BhdHRlcm4gKyAnfCcgKyBkYXRlUGF0dGVybiArICcoPzonICsgdGltZVBhdHRlcm4gKyAnKT8pJztcbnZhciBvYmpNYXAgPSBbJ3dlZWtzJywgJ3llYXJzJywgJ21vbnRocycsICdkYXlzJywgJ2hvdXJzJywgJ21pbnV0ZXMnLCAnc2Vjb25kcyddO1xuXG4vKipcbiAqIFRoZSBJU084NjAxIHJlZ2V4IGZvciBtYXRjaGluZyAvIHRlc3RpbmcgZHVyYXRpb25zXG4gKi9cbnZhciBwYXR0ZXJuID0gZXhwb3J0cy5wYXR0ZXJuID0gbmV3IFJlZ0V4cChpc284NjAxKTtcblxuLyoqIFBhcnNlIFBuWW5NbkRUbkhuTW5TIGZvcm1hdCB0byBvYmplY3RcbiAqIEBwYXJhbSB7c3RyaW5nfSBkdXJhdGlvblN0cmluZyAtIFBuWW5NbkRUbkhuTW5TIGZvcm1hdHRlZCBzdHJpbmdcbiAqIEByZXR1cm4ge09iamVjdH0gLSBXaXRoIGEgcHJvcGVydHkgZm9yIGVhY2ggcGFydCBvZiB0aGUgcGF0dGVyblxuICovXG52YXIgcGFyc2UgPSBleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UoZHVyYXRpb25TdHJpbmcpIHtcblx0Ly8gc2xpY2UgYXdheSBmaXJzdCBlbnRyeSBpbiBtYXRjaC1hcnJheVxuXHRyZXR1cm4gZHVyYXRpb25TdHJpbmcubWF0Y2gocGF0dGVybikuc2xpY2UoMSkucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBuZXh0LCBpZHgpIHtcblx0XHRwcmV2W29iak1hcFtpZHhdXSA9IHBhcnNlRmxvYXQobmV4dCkgfHwgMDtcblx0XHRyZXR1cm4gcHJldjtcblx0fSwge30pO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IElTTzg2MDEgZHVyYXRpb24gb2JqZWN0IHRvIGFuIGVuZCBEYXRlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkdXJhdGlvbiAtIFRoZSBkdXJhdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnREYXRlIC0gVGhlIHN0YXJ0aW5nIERhdGUgZm9yIGNhbGN1bGF0aW5nIHRoZSBkdXJhdGlvblxuICogQHJldHVybiB7RGF0ZX0gLSBUaGUgcmVzdWx0aW5nIGVuZCBEYXRlXG4gKi9cbnZhciBlbmQgPSBleHBvcnRzLmVuZCA9IGZ1bmN0aW9uIGVuZChkdXJhdGlvbiwgc3RhcnREYXRlKSB7XG5cdC8vIGNyZWF0ZSB0d28gZXF1YWwgdGltZXN0YW1wcywgYWRkIGR1cmF0aW9uIHRvICd0aGVuJyBhbmQgcmV0dXJuIHRpbWUgZGlmZmVyZW5jZVxuXHR2YXIgdGltZXN0YW1wID0gc3RhcnREYXRlID8gc3RhcnREYXRlLmdldFRpbWUoKSA6IERhdGUubm93KCk7XG5cdHZhciB0aGVuID0gbmV3IERhdGUodGltZXN0YW1wKTtcblxuXHR0aGVuLnNldEZ1bGxZZWFyKHRoZW4uZ2V0RnVsbFllYXIoKSArIGR1cmF0aW9uLnllYXJzKTtcblx0dGhlbi5zZXRNb250aCh0aGVuLmdldE1vbnRoKCkgKyBkdXJhdGlvbi5tb250aHMpO1xuXHR0aGVuLnNldERhdGUodGhlbi5nZXREYXRlKCkgKyBkdXJhdGlvbi5kYXlzKTtcblx0dGhlbi5zZXRIb3Vycyh0aGVuLmdldEhvdXJzKCkgKyBkdXJhdGlvbi5ob3Vycyk7XG5cdHRoZW4uc2V0TWludXRlcyh0aGVuLmdldE1pbnV0ZXMoKSArIGR1cmF0aW9uLm1pbnV0ZXMpO1xuXHQvLyB0aGVuLnNldFNlY29uZHModGhlbi5nZXRTZWNvbmRzKCkgKyBkdXJhdGlvbi5zZWNvbmRzKTtcblx0dGhlbi5zZXRNaWxsaXNlY29uZHModGhlbi5nZXRNaWxsaXNlY29uZHMoKSArIGR1cmF0aW9uLnNlY29uZHMgKiAxMDAwKTtcblx0Ly8gc3BlY2lhbCBjYXNlIHdlZWtzXG5cdHRoZW4uc2V0RGF0ZSh0aGVuLmdldERhdGUoKSArIGR1cmF0aW9uLndlZWtzICogNyk7XG5cblx0cmV0dXJuIHRoZW47XG59O1xuXG4vKipcbiAqIENvbnZlcnQgSVNPODYwMSBkdXJhdGlvbiBvYmplY3QgdG8gc2Vjb25kc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkdXJhdGlvbiAtIFRoZSBkdXJhdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7RGF0ZX0gc3RhcnREYXRlIC0gVGhlIHN0YXJ0aW5nIHBvaW50IGZvciBjYWxjdWxhdGluZyB0aGUgZHVyYXRpb25cbiAqIEByZXR1cm4ge051bWJlcn1cbiAqL1xudmFyIHRvU2Vjb25kcyA9IGV4cG9ydHMudG9TZWNvbmRzID0gZnVuY3Rpb24gdG9TZWNvbmRzKGR1cmF0aW9uLCBzdGFydERhdGUpIHtcblx0dmFyIHRpbWVzdGFtcCA9IHN0YXJ0RGF0ZSA/IHN0YXJ0RGF0ZS5nZXRUaW1lKCkgOiBEYXRlLm5vdygpO1xuXHR2YXIgbm93ID0gbmV3IERhdGUodGltZXN0YW1wKTtcblx0dmFyIHRoZW4gPSBlbmQoZHVyYXRpb24sIHN0YXJ0RGF0ZSk7XG5cblx0dmFyIHNlY29uZHMgPSAodGhlbi5nZXRUaW1lKCkgLSBub3cuZ2V0VGltZSgpKSAvIDEwMDA7XG5cdHJldHVybiBzZWNvbmRzO1xufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0ge1xuXHRlbmQ6IGVuZCxcblx0dG9TZWNvbmRzOiB0b1NlY29uZHMsXG5cdHBhdHRlcm46IHBhdHRlcm4sXG5cdHBhcnNlOiBwYXJzZVxufTsiLCIvKlxub2JqZWN0LWFzc2lnblxuKGMpIFNpbmRyZSBTb3JodXNcbkBsaWNlbnNlIE1JVFxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBwcm9wSXNFbnVtZXJhYmxlID0gT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuZnVuY3Rpb24gdG9PYmplY3QodmFsKSB7XG5cdGlmICh2YWwgPT09IG51bGwgfHwgdmFsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3QuYXNzaWduIGNhbm5vdCBiZSBjYWxsZWQgd2l0aCBudWxsIG9yIHVuZGVmaW5lZCcpO1xuXHR9XG5cblx0cmV0dXJuIE9iamVjdCh2YWwpO1xufVxuXG5mdW5jdGlvbiBzaG91bGRVc2VOYXRpdmUoKSB7XG5cdHRyeSB7XG5cdFx0aWYgKCFPYmplY3QuYXNzaWduKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gRGV0ZWN0IGJ1Z2d5IHByb3BlcnR5IGVudW1lcmF0aW9uIG9yZGVyIGluIG9sZGVyIFY4IHZlcnNpb25zLlxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9NDExOFxuXHRcdHZhciB0ZXN0MSA9IG5ldyBTdHJpbmcoJ2FiYycpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctd3JhcHBlcnNcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Ly8gV2UgZG9uJ3QgZXhwZWN0IGFueSBvZiB0aGUgYWJvdmUgdG8gdGhyb3csIGJ1dCBiZXR0ZXIgdG8gYmUgc2FmZS5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzaG91bGRVc2VOYXRpdmUoKSA/IE9iamVjdC5hc3NpZ24gOiBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcblx0dmFyIGZyb207XG5cdHZhciB0byA9IHRvT2JqZWN0KHRhcmdldCk7XG5cdHZhciBzeW1ib2xzO1xuXG5cdGZvciAodmFyIHMgPSAxOyBzIDwgYXJndW1lbnRzLmxlbmd0aDsgcysrKSB7XG5cdFx0ZnJvbSA9IE9iamVjdChhcmd1bWVudHNbc10pO1xuXG5cdFx0Zm9yICh2YXIga2V5IGluIGZyb20pIHtcblx0XHRcdGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGZyb20sIGtleSkpIHtcblx0XHRcdFx0dG9ba2V5XSA9IGZyb21ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApXG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAgICAgICAnVXNlIGBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKWAgdG8gY2FsbCB0aGVtLiAnICtcbiAgICAgICAgICAgICdSZWFkIG1vcmUgYXQgaHR0cDovL2ZiLm1lL3VzZS1jaGVjay1wcm9wLXR5cGVzJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgZXJyLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBwcm9wIG9uIGAnICsgY29tcG9uZW50TmFtZSAgKyAnYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gcHJpbnRXYXJuaW5nKCdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvblRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLiBFeHBlY3RlZCBhbiBhcnJheSBvZiBjaGVjayBmdW5jdGlvbnMsIGJ1dCAnICtcbiAgICAgICAgICAncmVjZWl2ZWQgJyArIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSArICcgYXQgaW5kZXggJyArIGkgKyAnLidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICghaXNOb2RlKHByb3BzW3Byb3BOYW1lXSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBzdXBwbGllZCB0byAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBSZWFjdE5vZGUuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gc2hhcGVUeXBlcykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBhbGwga2V5cyBpbiBjYXNlIHNvbWUgYXJlIHJlcXVpcmVkIGJ1dCBtaXNzaW5nIGZyb21cbiAgICAgIC8vIHByb3BzLlxuICAgICAgdmFyIGFsbEtleXMgPSBhc3NpZ24oe30sIHByb3BzW3Byb3BOYW1lXSwgc2hhcGVUeXBlcyk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gYWxsS2V5cykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKFxuICAgICAgICAgICAgJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGtleSBgJyArIGtleSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLicgK1xuICAgICAgICAgICAgJ1xcbkJhZCBvYmplY3Q6ICcgKyBKU09OLnN0cmluZ2lmeShwcm9wc1twcm9wTmFtZV0sIG51bGwsICcgICcpICtcbiAgICAgICAgICAgICdcXG5WYWxpZCBrZXlzOiAnICsgIEpTT04uc3RyaW5naWZ5KE9iamVjdC5rZXlzKHNoYXBlVHlwZXMpLCBudWxsLCAnICAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vZGUocHJvcFZhbHVlKSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvcFZhbHVlID09PSBudWxsIHx8IGlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChwcm9wVmFsdWUpO1xuICAgICAgICAgIHZhciBzdGVwO1xuICAgICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpIHtcbiAgICAvLyBOYXRpdmUgU3ltYm9sLlxuICAgIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gICAgaWYgKHByb3BWYWx1ZVsnQEB0b1N0cmluZ1RhZyddID09PSAnU3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgZm9yIG5vbi1zcGVjIGNvbXBsaWFudCBTeW1ib2xzIHdoaWNoIGFyZSBwb2x5ZmlsbGVkLlxuICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gRXF1aXZhbGVudCBvZiBgdHlwZW9mYCBidXQgd2l0aCBzcGVjaWFsIGhhbmRsaW5nIGZvciBhcnJheSBhbmQgcmVnZXhwLlxuICBmdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH1cbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAgIC8vIHBhc3NlcyBQcm9wVHlwZXMub2JqZWN0LlxuICAgICAgcmV0dXJuICdvYmplY3QnO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkpIHtcbiAgICAgIHJldHVybiAnc3ltYm9sJztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuICAvLyBTZWUgYGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyYC5cbiAgZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wVmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHByb3BWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnICsgcHJvcFZhbHVlO1xuICAgIH1cbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgYSBzdHJpbmcgdGhhdCBpcyBwb3N0Zml4ZWQgdG8gYSB3YXJuaW5nIGFib3V0IGFuIGludmFsaWQgdHlwZS5cbiAgLy8gRm9yIGV4YW1wbGUsIFwidW5kZWZpbmVkXCIgb3IgXCJvZiB0eXBlIGFycmF5XCJcbiAgZnVuY3Rpb24gZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKHZhbHVlKSB7XG4gICAgdmFyIHR5cGUgPSBnZXRQcmVjaXNlVHlwZSh2YWx1ZSk7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdhcnJheSc6XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gJ2FuICcgKyB0eXBlO1xuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdkYXRlJzpcbiAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgIHJldHVybiAnYSAnICsgdHlwZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG4gIGZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BWYWx1ZS5jb25zdHJ1Y3RvciB8fCAhcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWUpIHtcbiAgICAgIHJldHVybiBBTk9OWU1PVVM7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgfVxuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gY2hlY2tQcm9wVHlwZXM7XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0aWYgKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbnZlcnQ6IGZ1bmN0aW9uKGNvbnRhaW5lckNsYXNzKSB7XG4gICAgY29uc3QgdG1wID0gY29udGFpbmVyQ2xhc3M7XG4gICAgY29udGFpbmVyQ2xhc3MgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICByZXR1cm4gbmV3IHRtcCguLi5hcmdzKTtcbiAgICB9O1xuICAgIGNvbnRhaW5lckNsYXNzLnByb3RvdHlwZSA9IHRtcC5wcm90b3R5cGU7XG4gICAgY29udGFpbmVyQ2xhc3MuZ2V0U3RvcmVzID0gdG1wLmdldFN0b3JlcztcbiAgICBjb250YWluZXJDbGFzcy5jYWxjdWxhdGVTdGF0ZSA9IHRtcC5jYWxjdWxhdGVTdGF0ZTtcbiAgICByZXR1cm4gY29udGFpbmVyQ2xhc3M7XG4gIH1cbn07XG5cbiIsImltcG9ydCB7IG1hcCB9ICAgICAgICBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9ICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCBOb3RlQXBpQ2xpZW50ICBmcm9tICdTZXJ2aWNlcy9Ob3RlQXBpQ2xpZW50JztcbmltcG9ydCB7IGxvZyB9ICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgQXBwQWN0aW9uYDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZWxlY3RlZENvbnRlbnQoc2VsZWN0ZWQsIHRpdGxlKSB7XG4gICAgZGlzcGF0Y2goeyB0eXBlOiAnY29udGVudC9zZWxlY3QnLCBzZWxlY3RlZCwgdGl0bGUgfSk7XG4gIH0sXG4gIGZldGNoQ29uZmlnKCkge1xuICAgIHJldHVybiBOb3RlQXBpQ2xpZW50LmdldENvbmZpZygpLnRoZW4oXG4gICAgICBjb25maWcgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdjb25maWcvZmV0Y2gvYXBwaWQnLCBjb25maWcgfSk7XG4gICAgICB9KTtcbiAgfSxcbiAgd3JpdGVDb25maWcob2JqKSB7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQucHV0Q29uZmlnKG9iaikudGhlbihcbiAgICAgIGNvbmZpZyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2NvbmZpZy93cml0ZS9hcHBpZCcsIGNvbmZpZyB9KTtcbiAgICAgIH0pO1xuICB9LFxuICB3cml0ZUludmVudG9yeUl0ZW1zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC53cml0ZUludmVudG9yeUl0ZW1zKG9wdGlvbnMpLnBpcGUoXG4gICAgICBtYXAob2JqcyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vd3JpdGUvaW52ZW50b3J5Jywgb3B0aW9ucyB9KTtcbiAgICAgICAgcmV0dXJuIG9ianM7XG4gICAgICB9KSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IG1hcCB9ICAgICAgICBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9ICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCBOb3RlQXBpQ2xpZW50ICBmcm9tICdTZXJ2aWNlcy9Ob3RlQXBpQ2xpZW50JztcbmltcG9ydCB7IHNwbiwgbG9nIH0gICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBDb21wbGV0ZUFjdGlvbmA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5jcmVtZW50KG9wdGlvbnMsIHBhZ2UpIHtcbiAgICBsb2cudHJhY2UoYCR7cHNwaWR9PmAsIG9wdGlvbnMpO1xuICAgIHBhZ2UgPSArK3BhZ2UgPiAwID8gcGFnZSA6IDE7XG4gICAgc3BuLnNwaW4oKTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC5mZXRjaENvbXBsZXRlSXRlbXMob3B0aW9ucywgcGFnZSlcbiAgICAudGhlbihpdGVtcyA9PiB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL2ZldGNoL2NvbXBsZXRlJ1xuICAgICAgICAsIGl0ZW1zLCBvcHRpb25zLCBwYWdlIH0pO1xuICAgICAgbG9nLmluZm8oYCR7cHNwaWR9PmAsICdSZXNwb25zZTogaXRlbS9mZXRjaC9jb21wbGV0ZScpO1xuICAgICAgc3BuLnN0b3AoKTtcbiAgICB9KTtcbiAgfSxcbiAgZGVjcmVtZW50KG9wdGlvbnMsIHBhZ2UpIHtcbiAgICBwYWdlID0gLS1wYWdlID4gMCA/IHBhZ2UgOiAxO1xuICAgIHNwbi5zcGluKCk7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQuZmV0Y2hDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIHBhZ2UpXG4gICAgLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnaXRlbS9mZXRjaC9jb21wbGV0ZSdcbiAgICAgICAgLCBpdGVtcywgb3B0aW9ucywgcGFnZSB9KTtcbiAgICAgIGxvZy5pbmZvKGAke3BzcGlkfT4gUmVzcG9uc2U6IGl0ZW0vZmV0Y2gvY29tcGxldGVgKTtcbiAgICAgIHNwbi5zdG9wKCk7XG4gICAgfSk7XG4gIH0sXG4gIHdyaXRlQ29tcGxldGVJdGVtcyhvcHRpb25zKSB7XG4gICAgc3BuLnNwaW4oKTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC53cml0ZUNvbXBsZXRlSXRlbXMob3B0aW9ucykucGlwZShcbiAgICAgIG1hcChvYmpzID0+IHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnaXRlbS93cml0ZS9jb21wbGV0ZScsIG9wdGlvbnMgfSk7XG4gICAgICAgIGxvZy5pbmZvKGAke3BzcGlkfT5gLCAnUmVzcG9uc2U6IGl0ZW0vd3JpdGUvY29tcGxldGUnKTtcbiAgICAgICAgcmV0dXJuIG9ianM7XG4gICAgICB9KSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IG1hcCB9ICAgICAgICBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBkaXNwYXRjaCB9ICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCBOb3RlQXBpQ2xpZW50ICBmcm9tICdTZXJ2aWNlcy9Ob3RlQXBpQ2xpZW50JztcbmltcG9ydCB7IHNwbiwgbG9nIH0gICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBkaXNwbGF5TmFtZSA9IGBOb3RlQWN0aW9uYDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmNyZW1lbnQob3B0aW9ucywgcGFnZSkge1xuICAgIHBhZ2UgPSArK3BhZ2UgPiAwID8gcGFnZSA6IDE7XG4gICAgc3BuLnNwaW4oKTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC5mZXRjaEl0ZW1zKG9wdGlvbnMsIHBhZ2UpLnRoZW4oXG4gICAgICBpdGVtcyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vZmV0Y2gvbm90ZSdcbiAgICAgICAgICAsIGl0ZW1zLCBvcHRpb25zLCBwYWdlIH0pO1xuICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgfSk7XG4gIH0sXG4gIGRlY3JlbWVudChvcHRpb25zLCBwYWdlKSB7XG4gICAgcGFnZSA9IC0tcGFnZSA+IDAgPyBwYWdlIDogMTtcbiAgICBzcG4uc3BpbigpO1xuICAgIHJldHVybiBOb3RlQXBpQ2xpZW50LmZldGNoSXRlbXMob3B0aW9ucywgcGFnZSkudGhlbihcbiAgICAgIGl0ZW1zID0+IHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnaXRlbS9mZXRjaC9ub3RlJ1xuICAgICAgICAgICwgaXRlbXMsIG9wdGlvbnMsIHBhZ2UgfSk7XG4gICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICB9KTtcbiAgfSxcbiAgd3JpdGVJdGVtcyhvcHRpb25zKSB7XG4gICAgc3BuLnNwaW4oKTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC53cml0ZUl0ZW1zKG9wdGlvbnMpLnBpcGUoXG4gICAgICBtYXAob2JqcyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vd3JpdGUvbm90ZScsIG9wdGlvbnMgfSk7XG4gICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgfSkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBtYXAgfSAgICAgICAgZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSAgIGZyb20gJ01haW4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgTm90ZUFwaUNsaWVudCAgZnJvbSAnU2VydmljZXMvTm90ZUFwaUNsaWVudCc7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgUHJvZHVjdHNBY3Rpb25gO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluY3JlbWVudChvcHRpb25zLCBwYWdlKSB7XG4gICAgcGFnZSA9ICsrcGFnZSA+IDAgPyBwYWdlIDogMTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC5mZXRjaFByb2R1Y3RzSXRlbXMob3B0aW9ucywgcGFnZSlcbiAgICAudGhlbihpdGVtcyA9PiB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL2ZldGNoL3Byb2R1Y3RzJywgaXRlbXMsIG9wdGlvbnMsIHBhZ2UgfSk7XG4gICAgfSk7XG4gIH0sXG4gIGRlY3JlbWVudChvcHRpb25zLCBwYWdlKSB7XG4gICAgcGFnZSA9IC0tcGFnZSA+IDAgPyBwYWdlIDogMTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC5mZXRjaFByb2R1Y3RzSXRlbXMob3B0aW9ucywgcGFnZSlcbiAgICAudGhlbihpdGVtcyA9PiB7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL2ZldGNoL3Byb2R1Y3RzJywgaXRlbXMsIG9wdGlvbnMsIHBhZ2UgfSk7XG4gICAgfSk7XG4gIH0sXG4gIHdyaXRlUHJvZHVjdHNJdGVtcyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQud3JpdGVQcm9kdWN0c0l0ZW1zKG9wdGlvbnMpLnBpcGUoXG4gICAgICBtYXAob2JqcyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vd3JpdGUvcHJvZHVjdHMnLCBvcHRpb25zIH0pO1xuICAgICAgICByZXR1cm4gb2JqcztcbiAgICAgIH0pKTtcbiAgfVxufVxuIiwiaW1wb3J0IFJlYWN0ICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyAgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgQXBwU2lkZWJhciBmcm9tICdDb21wb25lbnRzL0FwcFNpZGViYXIvQXBwU2lkZWJhcic7XG5pbXBvcnQgQXBwRm9ybSAgICBmcm9tICdDb21wb25lbnRzL0FwcEZvcm0vQXBwRm9ybSc7XG5pbXBvcnQgeyBsb2cgfSAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jbGFzcyBBcHBCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgY29uZmlnIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmUtZ3JvdXBcIj5cbiAgICAgIDxBcHBTaWRlYmFyIC8+XG4gICAgICA8QXBwRm9ybSBjb25maWc9e2NvbmZpZ30vPlxuICAgIDwvZGl2PjtcbiAgfVxufTtcbkFwcEJvZHkuZGlzcGxheU5hbWUgPSAnQXBwQm9keSc7XG5BcHBCb2R5LmRlZmF1bHRQcm9wcyA9IHsgY29uZmlnOiBudWxsIH07XG5BcHBCb2R5LnByb3BUeXBlcyA9IHtcbiAgY29uZmlnOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWRcbn07XG5leHBvcnQgZGVmYXVsdCBBcHBCb2R5O1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzICAgIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFwcEFjdGlvbiAgICBmcm9tICdBY3Rpb25zL0FwcEFjdGlvbic7XG5pbXBvcnQgeyBzcG4sIGxvZyB9IGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNsYXNzIEFwcEZvcm0gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICBjb25zdCBjb25maWcgPSBwcm9wcy5jb25maWc7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGFwcGlkOiAgICAgIGNvbmZpZy5hcHBpZCAgICAgID8gY29uZmlnLmFwcGlkICAgICAgOiAnJ1xuICAgICwgY2VydGlkOiAgICAgY29uZmlnLmNlcnRpZCAgICAgPyBjb25maWcuY2VydGlkICAgICA6ICcnXG4gICAgLCB0b2tlbjogICAgICBjb25maWcudG9rZW4gICAgICA/IGNvbmZpZy50b2tlbiAgICAgIDogJydcbiAgICAsIHJ1bmFtZTogICAgIGNvbmZpZy5ydW5hbWUgICAgID8gY29uZmlnLnJ1bmFtZSAgICAgOiAnJ1xuICAgICwgYXV0aG9yaXplQXBpOiBjb25maWcuYXV0aG9yaXplQXBpID8gY29uZmlnLmF1dGhvcml6ZUFwaSA6ICcnXG4gICAgLCBvYXV0aDJBcGk6ICAgIGNvbmZpZy5vYXV0aDJBcGkgICAgPyBjb25maWcub2F1dGgyQXBpICAgIDogJydcbiAgICAsIGZpbmRpbmdBcGk6ICAgY29uZmlnLmZpbmRpbmdBcGkgICA/IGNvbmZpZy5maW5kaW5nQXBpICAgOiAnJ1xuICAgICwgdHJhZGluZ0FwaTogICBjb25maWcudHJhZGluZ0FwaSAgID8gY29uZmlnLnRyYWRpbmdBcGkgICA6ICcnXG4gICAgLCBpbnZlbnRvcnlBcGk6IGNvbmZpZy5pbnZlbnRvcnlBcGkgPyBjb25maWcuaW52ZW50b3J5QXBpIDogJydcbiAgICAsIG1hcmtldGluZ0FwaTogY29uZmlnLm1hcmtldGluZ0FwaSA/IGNvbmZpZy5tYXJrZXRpbmdBcGkgOiAnJ1xuICAgICwgYW5hbHl0aWNzQXBpOiBjb25maWcuYW5hbHl0aWNzQXBpID8gY29uZmlnLmFuYWx5dGljc0FwaSA6ICcnXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVJlc2V0KGUpIHtcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAgIGFwcGlkOiAgICAgICAgICcnXG4gICAgLCBjZXJ0aWQ6ICAgICAgICAnJ1xuICAgICwgdG9rZW46ICAgICAgICAgJydcbiAgICAsIHJ1bmFtZTogICAgICAgICcnXG4gICAgLCBhdXRob3JpemVBcGk6ICAnJ1xuICAgICwgb2F1dGgyQXBpOiAgICAgJydcbiAgICAsIGZpbmRpbmdBcGk6ICAgICcnXG4gICAgLCB0cmFkaW5nQXBpOiAgICAnJ1xuICAgICwgaW52ZW50b3J5QXBpOiAgJydcbiAgICAsIG1hcmtldGluZ0FwaTogICcnXG4gICAgLCBhbmFseXRpY3NBcGk6ICAnJ1xuICAgIH07XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTYXZlKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgeyBjb25maWcgfSA9IHRoaXMucHJvcHM7XG4gICAgbG9nLmluZm8oQXBwRm9ybS5kaXNwbGF5TmFtZSwgJ2hhbmRsZUNoYW5nZVNhdmUnLCBjb25maWcpO1xuICAgIGNvbnN0IG5ld0NvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZywgdGhpcy5zdGF0ZSk7XG4gICAgc3BuLnNwaW4oKTtcbiAgICBpZihuZXdDb25maWcpIHtcbiAgICAgIEFwcEFjdGlvbi53cml0ZUNvbmZpZyhuZXdDb25maWcpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBsb2cuaW5mbyhBcHBGb3JtLmRpc3BsYXlOYW1lLCAnaGFuZGxlQ2hhbmdlU2F2ZScsICdTdWNjZXNzLicpO1xuICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgIGxvZy5lcnJvcihBcHBGb3JtLmRpc3BsYXlOYW1lLCBlcnIubmFtZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVRleHQobmFtZSwgZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBbbmFtZV06IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGxvZy50cmFjZShBcHBGb3JtLmRpc3BsYXlOYW1lLCAnU3RhdGUnLCB0aGlzLnN0YXRlKTtcbiAgICBsb2cudHJhY2UoQXBwRm9ybS5kaXNwbGF5TmFtZSwgJ1Byb3BzJywgdGhpcy5wcm9wcyk7XG4gICAgY29uc3QgeyBhcHBpZCwgY2VydGlkLCB0b2tlbiwgcnVuYW1lXG4gICAgICAsIGF1dGhvcml6ZUFwaSwgb2F1dGgyQXBpLCBmaW5kaW5nQXBpLCB0cmFkaW5nQXBpLCBpbnZlbnRvcnlBcGksIG1hcmtldGluZ0FwaSwgYW5hbHl0aWNzQXBpIH1cbiAgICAgID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lXCI+XG4gICAgPGZvcm0gY2xhc3NOYW1lPVwicGFkZGVkLWxlc3NcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPkFwcCBJRDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIkNsaWVudCBJRFwiXG4gICAgICAgIHZhbHVlPXthcHBpZH1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdhcHBpZCcpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5DZXJ0IElEPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiQ2xpZW50IFNlY3JldFwiXG4gICAgICAgIHZhbHVlPXtjZXJ0aWR9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnY2VydGlkJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPkFwcGxpY2F0aW9uIFRva2VuPC9sYWJlbD5cbiAgICAgIDx0ZXh0YXJlYVxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlRva2VuXCJcbiAgICAgICAgdmFsdWU9e3Rva2VufVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3Rva2VuJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPlJ1TmFtZTwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cImVCYXkgUmVkaXJlY3QgVVJMIG5hbWVcIlxuICAgICAgICB2YWx1ZT17cnVuYW1lfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3J1bmFtZScpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5BdXRob3JpemUgQVBJIFVSTDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlVSTFwiXG4gICAgICAgIHZhbHVlPXthdXRob3JpemVBcGl9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnYXV0aG9yaXplQXBpJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPk9BdXRoMiBBUEkgVVJMPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVVJMXCJcbiAgICAgICAgdmFsdWU9e29hdXRoMkFwaX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdvYXV0aDJBcGknKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWw+RmluZGluZyBBUEkgVVJMPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVVJMXCJcbiAgICAgICAgdmFsdWU9e2ZpbmRpbmdBcGl9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnZmluZGluZ0FwaScpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5UcmFkaW5nIEFQSSBVUkw8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJVUkxcIlxuICAgICAgICB2YWx1ZT17dHJhZGluZ0FwaX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICd0cmFkaW5nQXBpJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPkludmVudG9yeSBBUEkgVVJMPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVVJMXCJcbiAgICAgICAgdmFsdWU9e2ludmVudG9yeUFwaX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdpbnZlbnRvcnlBcGknKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWw+TWFya2V0aW5nIEFQSSBVUkw8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJVUkxcIlxuICAgICAgICB2YWx1ZT17bWFya2V0aW5nQXBpfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ21hcmtldGluZ0FwaScpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5BbmFseXRpY3MgQVBJIFVSTDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlVSTFwiXG4gICAgICAgIHZhbHVlPXthbmFseXRpY3NBcGl9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnYW5hbHl0aWNzQXBpJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJyZXNldFwiIGNsYXNzTmFtZT1cImJ0biBidG4tbGFyZ2UgYnRuLWZvcm0gYnRuLWRlZmF1bHRcIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZVJlc2V0LmJpbmQodGhpcyl9PlxuICAgICAgICBSZXNldFxuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWxhcmdlIGJ0bi1mb3JtIGJ0bi1wcmltYXJ5XCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTYXZlLmJpbmQodGhpcyl9PlxuICAgICAgICBTYXZlXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9ybT5cbiAgICA8L2Rpdj47XG4gIH1cbn1cbkFwcEZvcm0uZGlzcGxheU5hbWUgPSAnQXBwRm9ybSc7XG5BcHBGb3JtLmRlZmF1bHRQcm9wcyA9IHsgY29uZmlnOiBudWxsIH07XG5BcHBGb3JtLnByb3BUeXBlcyA9IHtcbiAgY29uZmlnIDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuZXhwb3J0IGRlZmF1bHQgQXBwRm9ybTtcbiIsImltcG9ydCBSZWFjdCAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBBcHBBY3Rpb24gIGZyb20gJ0FjdGlvbnMvQXBwQWN0aW9uJztcbmltcG9ydCB7IGxvZyB9ICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwU2lkZWJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5jb25maWcpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmUgcGFuZS1zbSBzaWRlYmFyXCI+XG4gICAgPG5hdiBjbGFzc05hbWU9XCJuYXYtZ3JvdXBcIj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5NeSBhY2NvdW50PC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1rZXlcIj48L3NwYW4+XG4gICAgICAgIEFwcGxpY2F0aW9uIGtleXNldFxuICAgICAgPC9zcGFuPlxuICAgIDwvbmF2PlxuICAgIDwvZGl2PjtcbiAgfVxufTtcbkFwcFNpZGViYXIuZGlzcGxheU5hbWUgPSBgQXBwU2lkZWJhclZpZXdgO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbXBsZXRlU2lkZWJhciAgZnJvbSAnQ29tcG9uZW50cy9Db21wbGV0ZVNpZGViYXIvQ29tcGxldGVTaWRlYmFyJztcbmltcG9ydCBDb21wbGV0ZVRhYmxlICAgIGZyb20gJ0NvbXBvbmVudHMvQ29tcGxldGVUYWJsZS9Db21wbGV0ZVRhYmxlJztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYENvbXBsZXRlQm9keVZpZXdgO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGV0ZUJvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZS1ncm91cFwiPlxuICAgICAgPENvbXBsZXRlU2lkZWJhclxuICAgICAgICBwYWdlPXt0aGlzLnByb3BzLnBhZ2V9XG4gICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLml0ZW1zfVxuICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9IC8+XG4gICAgICA8Q29tcGxldGVUYWJsZVxuICAgICAgICBpdGVtcz17dGhpcy5wcm9wcy5pdGVtc31cbiAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5vcHRpb25zfSAvPlxuICAgIDwvZGl2PjtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENvbXBsZXRlQWN0aW9uICAgICBmcm9tICdBY3Rpb25zL0NvbXBsZXRlQWN0aW9uJztcbmltcG9ydCBSYWRpbyAgICAgICAgICAgICAgZnJvbSAnQ29tcG9uZW50cy9SYWRpby9SYWRpbyc7XG5pbXBvcnQgeyBsb2csIHNwbiwgdXRpbCB9IGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9zdGR1dGlscyc7XG5pbXBvcnQgaXBjICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9pcGN1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYENvbXBsZXRlU2lkZWJhclZpZXdgO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb21wbGV0ZVNpZGViYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMub3B0aW9ucyk7XG4gIH1cblxuICBjc3ZIZWFkZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdJbWFnZSc6ICAgICAgICAgICAgICAgICcnXG4gICAgICAsICdVcmwnOiAgICAgICAgICAgICAgICAnJ1xuICAgICAgLCAnVGl0bGUnOiAgICAgICAgICAgICAgJydcbiAgICAgICwgJ1N0YXJ0VGltZSc6ICAgICAgICAgICcnXG4gICAgICAsICdFbmRUaW1lJzogICAgICAgICAgICAnJ1xuICAgICAgLCAnQ29uZGl0aW9uJzogICAgICAgICAgJydcbiAgICAgICwgJ1NlbGxlcic6ICAgICAgICAgICAgICcnXG4gICAgICAsICdJdGVtSUQnOiAgICAgICAgICAgICAnJ1xuICAgICAgLCAnUHJvZHVjdElEKFVQQyknOiAgICAgJydcbiAgICAgICwgJ1Byb2R1Y3RJRChFQU4pJzogICAgICcnXG4gICAgICAsICdQcm9kdWN0SUQoSVNCTiknOiAgICAnJ1xuICAgICAgLCAnQ2F0ZWdvcnknOiAgICAgICAgICAgJydcbiAgICAgICwgJ1NoaXBwaW5nJzogICAgICAgICAgICcnXG4gICAgICAsICdDdXJyZW50UHJpY2UnOiAgICAgICAnJ1xuICAgICAgLCAnQ3VycmVudEN1cnJlbmN5JzogICAgJydcbiAgICAgICwgJ0NvbnZlcnRlZFByaWNlJzogICAgICcnXG4gICAgICAsICdDb252ZXJ0ZWRDdXJyZW5jeSc6ICAnJ1xuICAgICAgLCAnU3RhdHVzJzogICAgICAgICAgICAgJydcbiAgICAgICwgJ0xlZnRUaW1lJzogICAgICAgICAgICcnXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNhdmUoKSB7XG4gICAgbG9nLmluZm8oQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VTYXZlJyk7XG4gICAgaWYoIU51bWJlcih0aGlzLnN0YXRlLnBhZ2VzKSkgcmV0dXJuIGlwYy53aW4uc2hvd0Vycm9yQm94KCdQYWdlcyBpcyBub3QgYSBudW1iZXIhJyk7XG4gICAgaXBjLndpbi5zaG93U2F2ZURpYWxvZygoZmlsZW5hbWUpID0+IHtcbiAgICAgIGlmKCFmaWxlbmFtZSkgcmV0dXJuIGxvZy5pbmZvKENvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1Jlc3BvbnNlJywgJ0ZpbGUgc2F2ZSBjYW5jZWxlZCEnKTtcbiAgICAgIGxvZy5pbmZvKENvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ2ZpbGVuYW1lJywgZmlsZW5hbWUpO1xuICAgICAgc3BuLnNwaW4oKTtcbiAgICAgIGlwYy5zeXMudG91Y2hGaWxlKGZpbGVuYW1lKVxuICAgICAgLnRoZW4oKCkgPT4gaXBjLnN5cy5hZGRib21GaWxlKGZpbGVuYW1lKSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuc2F2ZUZpbGUoZmlsZW5hbWUsIHV0aWwuZ2V0Q1NWSGVhZGVyKHRoaXMuY3N2SGVhZGVyKCkpKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgQ29tcGxldGVBY3Rpb24ud3JpdGVDb21wbGV0ZUl0ZW1zKHRoaXMuc3RhdGUpLnN1YnNjcmliZShcbiAgICAgICAgICBvYmogPT4gaXBjLnN5cy5zYXZlRmlsZShmaWxlbmFtZSwgb2JqKVxuICAgICAgICAsIGVyciA9PiB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCBlcnIubmFtZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93RXJyb3JCb3goZXJyKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICAsICgpID0+IHtcbiAgICAgICAgICAgIGxvZy5pbmZvKENvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1Jlc3BvbnNlJywgJ0ZpbGUgaGFzIGJlZW4gc2F2ZWQhJyk7XG4gICAgICAgICAgICBpcGMud2luLnNob3dTYXZlTWVzc2FnZUJveCgpO1xuICAgICAgICAgICAgc3BuLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlSG9tZSgpIHtcbiAgICBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUNoYW5nZUhvbWUnKTtcbiAgICBDb21wbGV0ZUFjdGlvbi5pbmNyZW1lbnQodGhpcy5wcm9wcy5vcHRpb25zLCAwKTtcbiAgfVxuXG4gIGhhbmRsZUluY3JlbWVudCgpIHtcbiAgICBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUluY3JlbWVudCcpO1xuICAgIENvbXBsZXRlQWN0aW9uLmluY3JlbWVudCh0aGlzLnByb3BzLm9wdGlvbnMsIHRoaXMucHJvcHMucGFnZSk7XG4gIH1cblxuICBoYW5kbGVEZWNyZW1lbnQoKSB7XG4gICAgbG9nLmluZm8oQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVEZWNyZW1lbnQnKTtcbiAgICBDb21wbGV0ZUFjdGlvbi5kZWNyZW1lbnQodGhpcy5wcm9wcy5vcHRpb25zLCB0aGlzLnByb3BzLnBhZ2UpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2VhcmNoKGUpIHtcbiAgICBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUNoYW5nZVNlYXJjaCcpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBDb21wbGV0ZUFjdGlvbi5pbmNyZW1lbnQodGhpcy5zdGF0ZSwgMCk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VSZXNldCgpIHtcbiAgICBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUNoYW5nZVJlc2V0Jyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBoaWdoZXN0UHJpY2U6ICAgJydcbiAgICAgICwgbG93ZXN0UHJpY2U6ICAnJ1xuICAgICAgLCBzaGlwcGluZzogICAgIFtdXG4gICAgICAsIGNvbmRpdGlvbjogICAgW11cbiAgICAgICwgc3RhdHVzOiAgICAgICBbXVxuICAgICAgLCBpdGVtSWQ6ICAgICAgIFtdXG4gICAgICAsIGNhdGVnb3J5UGF0aDogW11cbiAgICAgICwgc2VsbGVyOiAgICAgICBbXVxuICAgICAgLCBzdGFydERhdGU6ICAgICcnXG4gICAgICAsIGVuZERhdGU6ICAgICAgJydcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVRleHQobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VDaGVja2JveChuYW1lLCBlKSB7XG4gICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgbmV3U3RhdGVbbmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlUmFkaW8obmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTZWxlY3QobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIGxldCBvcHRpb25zID0gZS50YXJnZXQub3B0aW9ucztcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yKCBsZXQgaT0wOyBpPG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKG9wdGlvbnNbaV0uc2VsZWN0ZWQpIHZhbHVlcy5wdXNoKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgIH1cbiAgICBuZXdTdGF0ZVtuYW1lXSA9IHZhbHVlcztcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbihvYmpzLCBwcm9wMSwgcHJvcDIpIHtcbiAgICBpZighb2JqcykgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBjb25zdCBpdGVtcyA9IG9ianMubWFwKG9iaiA9PiB7XG4gICAgICByZXR1cm4gKGxlbiA9PT0gMilcbiAgICAgICAgPyBvYmpbcHJvcDFdWzBdXG4gICAgICAgIDogb2JqW3Byb3AxXVswXVtwcm9wMl1bMF07XG4gICAgfSlcbiAgICBjb25zdCBvcHRzID0gc3RkLmRzdChpdGVtcyk7XG4gICAgcmV0dXJuIG9wdHMubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgcmV0dXJuIDxvcHRpb25cbiAgICAgICAga2V5PXtcImNob2ljZS1cIiArIGlkeH0gdmFsdWU9e29wdH0gPntvcHR9PC9vcHRpb24+O1xuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcbiAgICBjb25zdCBvcHRQYXRocyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3ByaW1hcnlDYXRlZ29yeScsICdjYXRlZ29yeU5hbWUnKTtcbiAgICBjb25zdCBvcHRTZWxycyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NlbGxlckluZm8nLCAnc2VsbGVyVXNlck5hbWUnKTtcbiAgICBjb25zdCBvcHRJbUlEcyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ2l0ZW1JZCcpO1xuICAgIGNvbnN0IG9wdFNocGdzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2hpcHBpbmdJbmZvJywgJ3NoaXBUb0xvY2F0aW9ucycpO1xuICAgIGNvbnN0IG9wdFN0dHNzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2VsbGluZ1N0YXR1cycsICdzZWxsaW5nU3RhdGUnKTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lIHBhbmUtc20gc2lkZWJhclwiPlxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2LWdyb3VwXCI+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+VGl0bGU8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBvZiBpdGVtc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoU3RyaW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdzZWFyY2hTdHJpbmcnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U29sZCBsaXN0aW5nPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hlY2tib3hcIj5cbiAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIHZhbHVlPVwic29sZEl0ZW1Pbmx5XCJcbiAgICAgICAgICBjaGVja2VkPXt0aGlzLnN0YXRlLnNvbGRJdGVtT25seX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZUNoZWNrYm94LmJpbmQodGhpcywgJ3NvbGRJdGVtT25seScpfVxuICAgICAgICAvPlNvbGQgaXRlbXMgb25seS48L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5FbmQgdGltZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbSBEYXRlICh5eXl5L21tL2RkKVwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc3RhcnREYXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdzdGFydERhdGUnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJUbyBEYXRlICh5eXl5L21tL2RkKVwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZW5kRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnZW5kRGF0ZScpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1taW5pIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZVJlc2V0LmJpbmQodGhpcyl9PlJlc2V0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTZWFyY2guYmluZCh0aGlzKX0+U2VhcmNoXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cblx0XHRcdDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5GdW5jdGlvbnM8L2g1PlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZUhvbWUuYmluZCh0aGlzKX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1ob21lXCI+PC9zcGFuPlxuXHRcdFx0XHRIb21lICh7cGFnZX0gcGFnZSlcblx0XHRcdDwvc3Bhbj5cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVJbmNyZW1lbnQuYmluZCh0aGlzKX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1yaWdodC1ib2xkXCI+PC9zcGFuPlxuXHRcdFx0XHROZXh0XG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGVjcmVtZW50LmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tbGVmdC1ib2xkXCI+PC9zcGFuPlxuXHRcdFx0XHRQcmV2aW91c1xuXHRcdFx0PC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPk91dHB1dDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTnVtYmVyIG9mIHBhZ2VzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYWdlc31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAncGFnZXMnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTYXZlLmJpbmQodGhpcyl9PlNhdmVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkNhdGVnb3J5PC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jYXRlZ29yeVBhdGh9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnY2F0ZWdvcnlQYXRoJyl9XG4gICAgICAgID57b3B0UGF0aHN9PC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U2VsbGVyPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxsZXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ3NlbGxlcicpfVxuICAgICAgICA+e29wdFNlbHJzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkl0ZW1JRDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaXRlbUlkfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2l0ZW1JZCcpfVxuICAgICAgICA+e29wdEltSURzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlByaWNlPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJIaWdoZXN0IHByaWNlXCIgXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaGlnaGVzdFByaWNlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdoaWdoZXN0UHJpY2UnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJMb3dlc3QgcHJpY2VcIiBcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5sb3dlc3RQcmljZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnbG93ZXN0UHJpY2UnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U2hpcHBpbmc8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNoaXBwaW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ3NoaXBwaW5nJyl9XG4gICAgICAgID57b3B0U2hwZ3N9PC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+Q29uZGl0aW9uPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jb25kaXRpb259XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnY29uZGl0aW9uJyl9PlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxMDAwXCI+TmV3PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE1MDBcIj5cbiAgICAgICAgICAgIE5ldyBvdGhlciAoc2VlIGRldGFpbHMpPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE3NTBcIj5cbiAgICAgICAgICAgIE5ldyB3aXRoIGRlZmVjdHM8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMjAwMFwiPlxuICAgICAgICAgICAgTWFudWZhY3R1cmVyIHJlZnVyYmlzaGVkPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjI1MDBcIj5cbiAgICAgICAgICAgIFNlbGxlciByZWZ1cmJpc2hlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMDAwXCI+VXNlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MDAwXCI+VmVyeSBHb29kPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjUwMDBcIj5Hb29kPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjYwMDBcIj5BY2NlcHRhYmxlPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjcwMDBcIj5cbiAgICAgICAgICAgIEZvciBwYXJ0cyBvciBub3Qgd29ya2luZzwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5TdGF0dXM8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXR1c31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzdGF0dXMnKX1cbiAgICAgICAgICA+e29wdFN0dHNzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmF2PlxuICAgIDwvZGl2PjtcbiAgfVxufTtcbkNvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSA9ICdDb21wbGV0ZVNpZGViYXInO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdGQgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvc3RkdXRpbHMnO1xuaW1wb3J0IHsgbG9nLCB1dGlsIH0gIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYENvbXBsZXRlVGFibGVWaWV3YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGxldGVUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlclN0YXR1cyhzdGF0dXMpIHtcbiAgICBsZXQgc3R5bGVzO1xuICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc3R5bGVzID0geyBmb250V2VpZ2h0Oidib2xkJywgY29sb3I6ICdibHVlJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5Ob3cgYXZhaWxhYmxlLjwvZGl2PjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc3R5bGVzID0geyBmb250V2VpZ2h0Oidib2xkJywgY29sb3I6ICdvcmFuZ2UnIH07XG4gICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXN9Pk5ldyBhZGRlZC48L2Rpdj47XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAncmVkJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5SZW1vdmVkLjwvZGl2PjtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyRXh0ZW5zaW9uKGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIDxkaXY+KCB7IHV0aWwudG9MZWZ0RGF5cyhkdXJhdGlvbikgfSApPC9kaXY+O1xuICB9XG5cbiAgcmVuZGVySXRlbShvYmosIGlkeCkge1xuICAgIGNvbnN0IGl0ZW0gPSBvYmo7XG4gICAgY29uc3QgSW1nID0gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnZ2FsbGVyeVVSTCcpXG4gICAgICA/IGl0ZW0uZ2FsbGVyeVVSTFswXSA6ICcnO1xuICAgIGNvbnN0IEFpZCA9IGl0ZW0uaXRlbUlkWzBdO1xuICAgIGNvbnN0IFBpZCA9IGl0ZW0uaGFzT3duUHJvcGVydHkoJ3Byb2R1Y3RJZCcpXG4gICAgICA/IGl0ZW0ucHJvZHVjdElkLm1hcChvYmogPT5cbiAgICAgICAgYCR7b2JqLl9fdmFsdWVfX30gKCAke29ialsnQHR5cGUnXX0gKWApIDogWyctLS0nXTtcbiAgICBjb25zdCBTaWQgPSBpdGVtLnNlbGxlckluZm9bMF0uc2VsbGVyVXNlck5hbWVbMF07XG4gICAgY29uc3QgU3RtXG4gICAgICA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChpdGVtLmxpc3RpbmdJbmZvWzBdLnN0YXJ0VGltZVswXSk7XG4gICAgY29uc3QgRXRtXG4gICAgICA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChpdGVtLmxpc3RpbmdJbmZvWzBdLmVuZFRpbWVbMF0pO1xuICAgIGNvbnN0IFVybCA9IGl0ZW0udmlld0l0ZW1VUkxbMF07XG4gICAgY29uc3QgVHRsID0gaXRlbS50aXRsZVswXTtcbiAgICBjb25zdCBQYzEgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fO1xuICAgIGNvbnN0IENpMSA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgLmN1cnJlbnRQcmljZVswXVsnQGN1cnJlbmN5SWQnXTtcbiAgICBjb25zdCBQYzIgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fO1xuICAgIGNvbnN0IENpMiA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXVsnQGN1cnJlbmN5SWQnXTtcbiAgICBjb25zdCBDZG4gPSBpdGVtLmhhc093blByb3BlcnR5KCdjb25kaXRpb24nKSBcbiAgICAgID8gaXRlbS5jb25kaXRpb25bMF0uY29uZGl0aW9uRGlzcGxheU5hbWVbMF0gOiAnLS0tJztcbiAgICBjb25zdCBDZ3AgPSBpdGVtLnByaW1hcnlDYXRlZ29yeVswXS5jYXRlZ29yeU5hbWVbMF07XG4gICAgY29uc3QgU2hwID0gaXRlbS5zaGlwcGluZ0luZm9bMF0uc2hpcFRvTG9jYXRpb25zWzBdO1xuICAgIGNvbnN0IFN0dCA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXS5zZWxsaW5nU3RhdGVbMF07XG4gICAgY29uc3QgRXh0ID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdLmhhc093blByb3BlcnR5KCd0aW1lTGVmdCcpXG4gICAgICA/IHRoaXMucmVuZGVyRXh0ZW5zaW9uKGl0ZW0uc2VsbGluZ1N0YXR1c1swXS50aW1lTGVmdFswXSlcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgc3R0ID0gdGhpcy5yZW5kZXJTdGF0dXMoMCk7XG4gICAgY29uc3QgVXBkID0gc3RkLmdldExvY2FsVGltZVN0YW1wKERhdGUubm93KCkpO1xuXG4gICAgcmV0dXJuIDx0Ym9keSBrZXk9e2lkeH0+PHRyPlxuICAgICAgPHRkPjxpbWcgc3JjPXtJbWd9IHdpZHRoPScxMjgnIGhlaWdodD0nMTI4JyAvPjwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+XG4gICAgICAgIDxhIGhyZWY9e1VybH0gdGFyZ2V0PSdfYmxhbmsnPntUdGx9PC9hPjxiciAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICBTZWxsIHBlcmlvZCA6IHtTdG19IH4ge0V0bX08YnIgLz5cbiAgICAgICAgQ29uZGl0aW9uIDoge0Nkbn08YnIgLz5cbiAgICAgICAgU2VsbGVyIDoge1NpZH08YnIgLz5cbiAgICAgICAgSXRlbUlEIDoge0FpZH08YnIgLz5cbiAgICAgICAgUHJvZHVjdElEIDoge1BpZC5qb2luKCcgJyl9PGJyIC8+XG4gICAgICAgIENhdGVnb3J5IDoge0NncH1cbiAgICAgIDwvc3Bhbj48L3RkPlxuICAgICAgPHRkPntTaHB9PC90ZD5cbiAgICAgIDx0ZD5cbiAgICAgICAgPHNwYW4+e1BjMX0ge0NpMX08L3NwYW4+PGJyIC8+XG4gICAgICAgIDxzcGFuPigge1BjMn0ge0NpMn0gKTwvc3Bhbj5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+e1N0dH08L3NwYW4+PGJyIC8+PHNwYW4+e0V4dH08L3NwYW4+PC90ZD5cbiAgICAgIDx0ZD48c3Bhbj57c3R0fTwvc3Bhbj48YnIgLz48c3Bhbj57VXBkfTwvc3Bhbj48L3RkPlxuICAgIDwvdHI+PC90Ym9keT47XG4gIH1cblxuICBmaWx0ZXJJdGVtcyhvYmpzLCBvcHRpb25zKSB7XG4gICAgbG9nLnRyYWNlKGAke3BzcGlkfT5gLCBvcHRpb25zKTtcbiAgICByZXR1cm4gb2Jqcy5maWx0ZXIob2JqID0+IHsgXG4gICAgICBjb25zdCBpdGVtID0gb2JqO1xuICAgICAgaWYob3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGlmKCFvcHRpb25zLnNoaXBwaW5nLnNvbWUoc2hpcHBpbmcgPT5cbiAgICAgICAgICAgIHNoaXBwaW5nID09PSBpdGVtLnNoaXBwaW5nSW5mb1swXVxuICAgICAgICAgICAgLnNoaXBUb0xvY2F0aW9uc1swXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnNoaXBwaW5nLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLmNvbmRpdGlvbi5zb21lKGNvbmRpdGlvbiA9PiBcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9PT0gaXRlbS5jb25kaXRpb25bMF1cbiAgICAgICAgICAgIC5jb25kaXRpb25JZFswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLmNvbmRpdGlvbi5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5zdGF0dXMuc29tZShzdGF0dXMgPT5cbiAgICAgICAgICAgIHN0YXR1cyA9PT0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuc2VsbGluZ1N0YXRlWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuc3RhdHVzLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLmNhdGVnb3J5UGF0aC5zb21lKHBhdGggPT5cbiAgICAgICAgICAgIHBhdGggPT09IGl0ZW0ucHJpbWFyeUNhdGVnb3J5WzBdXG4gICAgICAgICAgICAuY2F0ZWdvcnlOYW1lWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuY2F0ZWdvcnlQYXRoLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLnNlbGxlci5zb21lKHNlbHIgPT4gXG4gICAgICAgICAgICBzZWxyID09PSBpdGVtLnNlbGxlckluZm9bMF1cbiAgICAgICAgICAgIC5zZWxsZXJVc2VyTmFtZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnNlbGxlci5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5pdGVtSWQuc29tZShpdGVtaWQgPT4gXG4gICAgICAgICAgICBpdGVtaWQgPT09IGl0ZW0uaXRlbUlkWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuaXRlbUlkLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFpc0Zpbml0ZShvcHRpb25zLmxvd2VzdFByaWNlKSBcbiAgICAgICAgICB8fCAhaXNGaW5pdGUob3B0aW9ucy5oaWdoZXN0UHJpY2UpKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoTnVtYmVyKG9wdGlvbnMubG93ZXN0UHJpY2UpID4gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXyBcbiAgICAgICAgICAmJiBvcHRpb25zLmxvd2VzdFByaWNlICE9PSAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKE51bWJlcihvcHRpb25zLmhpZ2hlc3RQcmljZSkgPCBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgICAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fIFxuICAgICAgICAgICYmIG9wdGlvbnMuaGlnaGVzdFByaWNlICE9PSAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5pdGVtc1xuICAgICAgPyB0aGlzLmZpbHRlckl0ZW1zKHRoaXMucHJvcHMuaXRlbXMsIG9wdGlvbnMpXG4gICAgICAgIC5tYXAoKGl0ZW0sIGlkeCkgPT4gdGhpcy5yZW5kZXJJdGVtKGl0ZW0sIGlkeCkpXG4gICAgICA6IG51bGw7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZVwiPlxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlLXN0cmlwZWRcIj5cbiAgICAgIDx0aGVhZD48dHI+XG4gICAgICA8dGg+SW1hZ2U8L3RoPlxuICAgICAgPHRoPkRldGFpbDwvdGg+XG4gICAgICA8dGg+U2hpcHBpbmc8L3RoPlxuICAgICAgPHRoPlByaWNlPC90aD5cbiAgICAgIDx0aD5TdGF0dXM8L3RoPlxuICAgICAgPHRoPlVwZGF0ZTwvdGg+XG4gICAgICA8L3RyPjwvdGhlYWQ+XG4gICAgICB7aXRlbXN9XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PjtcbiAgfVxufTtcblxuIiwiaW1wb3J0IFJlYWN0ICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGxvZyB9ICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBDb250ZW5zVmlld2A7XG5cbmNsYXNzIENvbnRlbnRzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGNvbnRudCA9IHRoaXMucHJvcHMuY2hpbGRyZW5bdGhpcy5wcm9wcy5zZWxlY3RlZF07XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwid2luZG93LWNvbnRlbnRcIj57Y29udG50fTwvZGl2PjtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29udGVudHM7XG4iLCJpbXBvcnQgUmVhY3QgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzICBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGxvZyB9ICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogbnVsbCwgZXJyb3JJbmZvOiBudWxsIH07XG4gIH1cblxuICBjb21wb25lbnREaWRDYXRjaChlcnJvciwgZXJyb3JJbmZvKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGVycm9yLCBlcnJvckluZm8gfSk7XG4gICAgbG9nLmVycm9yKEVycm9yQm91bmRhcnkuZGlzcGxheU5hbWUsIGVycm9yLCBlcnJvckluZm8pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLmVycm9ySW5mbykge1xuICAgICAgcmV0dXJuIDxkaXY+PGgyPlNvbWV0aGluZyB3ZW50IHdyb25nLjwvaDI+XG4gICAgICAgIDxkZXRhaWxzIHN0eWxlPXt7IHdoaXRlU3BhY2U6ICdwcmUtd3JhcCcgfX0+XG4gICAgICAgIHt0aGlzLnN0YXRlLmVycm9yICYmIHRoaXMuc3RhdGUuZXJyb3IudG9TdHJpbmcoKX1cbiAgICAgICAgPGJyIC8+XG4gICAgICAgIHt0aGlzLnN0YXRlLmVycm9ySW5mby5jb21wb25lbnRTdGFja31cbiAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgPC9kaXY+O1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgfVxufTtcbkVycm9yQm91bmRhcnkuZGlzcGxheU5hbWUgPSAnRXJyb3JCb3VuZGFyeSc7XG5FcnJvckJvdW5kYXJ5LmRlZmF1bHRQcm9wcyA9IHt9O1xuRXJyb3JCb3VuZGFyeS5wcm9wVHlwZXMgPSB7fTtcbmV4cG9ydCBkZWZhdWx0IEVycm9yQm91bmRhcnk7XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBBcHBBY3Rpb24gICAgICAgICAgZnJvbSAnQWN0aW9ucy9BcHBBY3Rpb24nO1xuaW1wb3J0IHsgbG9nLCBzcG4sIHV0aWwgfSBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuaW1wb3J0IGlwYyAgICAgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvaXBjdXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBHbG9iYWxGb290ZXJWaWV3YDtcblxuY2xhc3MgR2xvYmFsRm9vdGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY3N2SGVhZGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNhdmUoKSB7XG4gICAgbG9nLmluZm8oR2xvYmFsRm9vdGVyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdDogaGFuZGxlQ2hhbmdlU2F2ZScpO1xuICAgIGlwYy53aW4uc2hvd1NhdmVEaWFsb2coKGZpbGVuYW1lKSA9PiB7XG4gICAgICBpZighZmlsZW5hbWUpIHJldHVybiBsb2cuZXJyb3IoR2xvYmFsRm9vdGVyLmRpc3BsYXlOYW1lLCAnRXJyb3InLCAnRmlsZSBzYXZlIGNhbmNlbGVkIScpO1xuICAgICAgc3BuLnNwaW4oKTtcbiAgICAgIGlwYy5zeXMudG91Y2hGaWxlKGZpbGVuYW1lKVxuICAgICAgLnRoZW4oKCkgPT4gaXBjLnN5cy5hZGRib21GaWxlKGZpbGVuYW1lKSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuc2F2ZUZpbGUoZmlsZW5hbWUsIHV0aWwuZ2V0Q1NWSGVhZGVyKHRoaXMuY3N2SGVhZGVyKCkpKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgQXBwQWN0aW9uLndyaXRlSW52ZW50b3J5SXRlbXModGhpcy5zdGF0ZSkuc3Vic2NyaWJlKFxuICAgICAgICAgIG9iaiA9PiBpcGMuc3lzLnNhdmVGaWxlKGZpbGVuYW1lLCBvYmopXG4gICAgICAgICwgZXJyID0+IHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihHbG9iYWxGb290ZXIuZGlzcGxheU5hbWUsIGVyci5uYW1lLCBlcnIubWVzc2FnZSwgZXJyLnN0YWNrKTtcbiAgICAgICAgICAgIGlwYy53aW4uc2hvd0Vycm9yQm94KGVycik7XG4gICAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgLCAoKSA9PiB7XG4gICAgICAgICAgICBsb2cuaW5mbyhHbG9iYWxGb290ZXIuZGlzcGxheU5hbWUsICdoYW5kbGVDaGFuZ2VTYXZlJywgJ0ZpbGUgaGFzIGJlZW4gc2F2ZWQhJyk7XG4gICAgICAgICAgICBpcGMud2luLnNob3dTYXZlTWVzc2FnZUJveCgpO1xuICAgICAgICAgICAgc3BuLnN0b3AoKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlQ2xvc2UoKSB7XG4gICAgaXBjLndpbi5zaG93Q2xvc2VNZXNzYWdlQm94KChyZXNwb25zZSkgPT4ge1xuICAgICAgbG9nLnRyYWNlKEdsb2JhbEZvb3Rlci5kaXNwbGF5TmFtZSwgJ0NsaWNrIGJ1dHRvbjonLCByZXNwb25zZSk7XG4gICAgICBpZighcmVzcG9uc2UpIGlwYy53aW4uY2xvc2UoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGZvb3RlciBjbGFzc05hbWU9XCJ0b29sYmFyIHRvb2xiYXItZm9vdGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2xiYXItYWN0aW9uc1wiPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRlZmF1bHRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZUNsb3NlLmJpbmQodGhpcyl9PkNsb3NlPC9idXR0b24+XG4gICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBwdWxsLXJpZ2h0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTYXZlLmJpbmQodGhpcyl9PlNhdmU8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9vdGVyPjtcbiAgfVxufTtcbkdsb2JhbEZvb3Rlci5kaXNwbGF5TmFtZSA9ICdHbG9iYWxGb290ZXInO1xuZXhwb3J0IGRlZmF1bHQgR2xvYmFsRm9vdGVyO1xuIiwiaW1wb3J0IFJlYWN0ICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGxvZyB9ICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBHbG9iYWxIZWFkZXJWaWV3YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2xvYmFsSGVhZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8aGVhZGVyIGNsYXNzTmFtZT1cInRvb2xiYXIgdG9vbGJhci1oZWFkZXJcIj5cbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0aXRsZVwiPnt0aGlzLnByb3BzLnRpdGxlfTwvaDE+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRvb2xiYXItYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0IGJ0bi1kcm9wZG93biBwdWxsLXJpZ2h0XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLW1lZ2FwaG9uZVwiPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2hlYWRlcj47XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IE5vdGVTaWRlYmFyICBmcm9tICdDb21wb25lbnRzL05vdGVTaWRlYmFyL05vdGVTaWRlYmFyJztcbmltcG9ydCBOb3RlVGFibGUgICAgZnJvbSAnQ29tcG9uZW50cy9Ob3RlVGFibGUvTm90ZVRhYmxlJztcbmltcG9ydCB7IGxvZyB9ICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgTm90ZUJvZHlWaWV3YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTm90ZUJvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZS1ncm91cFwiPlxuICAgICAgPE5vdGVTaWRlYmFyXG4gICAgICAgIHBhZ2U9e3RoaXMucHJvcHMucGFnZX1cbiAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuaXRlbXN9XG4gICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMub3B0aW9uc30gLz5cbiAgICAgIDxOb3RlVGFibGVcbiAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuaXRlbXN9XG4gICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMub3B0aW9uc30gLz5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBOb3RlQWN0aW9uICAgICAgICAgZnJvbSAnQWN0aW9ucy9Ob3RlQWN0aW9uJztcbmltcG9ydCBSYWRpbyAgICAgICAgICAgICAgZnJvbSAnQ29tcG9uZW50cy9SYWRpby9SYWRpbyc7XG5pbXBvcnQgeyBsb2csIHNwbiwgdXRpbCB9IGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9zdGR1dGlscyc7XG5pbXBvcnQgaXBjICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9pcGN1dGlscyc7XG5cbmNsYXNzIE5vdGVTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzLm9wdGlvbnMpO1xuICB9XG5cbiAgY3N2SGVhZGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnSW1hZ2UnOiAgICAgICAgICAgICAgICAnJ1xuICAgICAgLCAnVXJsJzogICAgICAgICAgICAgICAgJydcbiAgICAgICwgJ1RpdGxlJzogICAgICAgICAgICAgICcnXG4gICAgICAsICdTdGFydFRpbWUnOiAgICAgICAgICAnJ1xuICAgICAgLCAnRW5kVGltZSc6ICAgICAgICAgICAgJydcbiAgICAgICwgJ0NvbmRpdGlvbic6ICAgICAgICAgICcnXG4gICAgICAsICdTZWxsZXInOiAgICAgICAgICAgICAnJ1xuICAgICAgLCAnSXRlbUlEJzogICAgICAgICAgICAgJydcbiAgICAgICwgJ1Byb2R1Y3RJRChVUEMpJzogICAgICcnXG4gICAgICAsICdQcm9kdWN0SUQoRUFOKSc6ICAgICAnJ1xuICAgICAgLCAnUHJvZHVjdElEKElTQk4pJzogICAgJydcbiAgICAgICwgJ0NhdGVnb3J5JzogICAgICAgICAgICcnXG4gICAgICAsICdTaGlwcGluZyc6ICAgICAgICAgICAnJ1xuICAgICAgLCAnQ3VycmVudFByaWNlJzogICAgICAgJydcbiAgICAgICwgJ0N1cnJlbnRDdXJyZW5jeSc6ICAgICcnXG4gICAgICAsICdDb252ZXJ0ZWRQcmljZSc6ICAgICAnJ1xuICAgICAgLCAnQ29udmVydGVkQ3VycmVuY3knOiAgJydcbiAgICAgICwgJ1N0YXR1cyc6ICAgICAgICAgICAgICcnXG4gICAgICAsICdMZWZ0VGltZSc6ICAgICAgICAgICAnJ1xuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTYXZlKCkge1xuICAgIGxvZy5pbmZvKE5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VTYXZlJyk7XG4gICAgaWYoIU51bWJlcih0aGlzLnN0YXRlLnBhZ2VzKSkgcmV0dXJuIGlwYy53aW4uc2hvd0Vycm9yQm94KCdQYWdlcyBpcyBub3QgYSBudW1iZXIhJyk7XG4gICAgaXBjLndpbi5zaG93U2F2ZURpYWxvZyhmaWxlbmFtZSA9PiB7XG4gICAgICBpZighZmlsZW5hbWUpIHJldHVybiBsb2cuaW5mbyhOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1Jlc3BvbnNlJywgJ0ZpbGUgc2F2ZSBjYW5jZWxlZCEnKTtcbiAgICAgIHNwbi5zcGluKCk7XG4gICAgICBpcGMuc3lzLnRvdWNoRmlsZShmaWxlbmFtZSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuYWRkYm9tRmlsZShmaWxlbmFtZSkpXG4gICAgICAudGhlbigoKSA9PiBpcGMuc3lzLnNhdmVGaWxlKGZpbGVuYW1lLCB1dGlsLmdldENTVkhlYWRlcih0aGlzLmNzdkhlYWRlcigpKSkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIE5vdGVBY3Rpb24ud3JpdGVJdGVtcyh0aGlzLnN0YXRlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgb2JqID0+IGlwYy5zeXMuc2F2ZUZpbGUoZmlsZW5hbWUsIG9iailcbiAgICAgICAgLCBlcnIgPT4ge1xuICAgICAgICAgICAgbG9nLmVycm9yKE5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lLCBlcnIubmFtZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93RXJyb3JCb3goZXJyKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICAsICgpID0+IHtcbiAgICAgICAgICAgIGxvZy5pbmZvKE5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnaGFuZGxlQ2hhbmdlU2F2ZScsICdGaWxlIGhhcyBiZWVuIHNhdmVkIScpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93U2F2ZU1lc3NhZ2VCb3goKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIGhhbmRsZUNoYW5nZUhvbWUoKSB7XG4gICAgbG9nLmluZm8gKE5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VIb21lJyk7XG4gICAgTm90ZUFjdGlvbi5pbmNyZW1lbnQodGhpcy5wcm9wcy5vcHRpb25zLCAwKTtcbiAgfVxuXG4gIGhhbmRsZUluY3JlbWVudCgpIHtcbiAgICBsb2cuaW5mbyAoTm90ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUluY3JlbWVudCcpO1xuICAgIE5vdGVBY3Rpb24uaW5jcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgdGhpcy5wcm9wcy5wYWdlKTtcbiAgfVxuXG4gIGhhbmRsZURlY3JlbWVudCgpIHtcbiAgICBsb2cuaW5mbyAoTm90ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZURlY3JlbWVudCcpO1xuICAgIE5vdGVBY3Rpb24uZGVjcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgdGhpcy5wcm9wcy5wYWdlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNlYXJjaChldmVudCkge1xuICAgIGxvZy5pbmZvIChOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlU2VhcmNoJyk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBOb3RlQWN0aW9uLmluY3JlbWVudCh0aGlzLnN0YXRlLCAwKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVJlc2V0KCkge1xuICAgIGxvZy5pbmZvIChOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlUmVzZXQnKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhpZ2hlc3RQcmljZTogICAnJ1xuICAgICAgLCBsb3dlc3RQcmljZTogICcnXG4gICAgICAsIHNoaXBwaW5nOiAgICAgW11cbiAgICAgICwgY29uZGl0aW9uOiAgICBbXVxuICAgICAgLCBzdGF0dXM6ICAgICAgIFtdXG4gICAgICAsIGl0ZW1JZDogICAgICAgW11cbiAgICAgICwgY2F0ZWdvcnlQYXRoOiBbXVxuICAgICAgLCBzZWxsZXI6ICAgICAgIFtdXG4gICAgICAsIHN0YXJ0RGF0ZTogICAgJydcbiAgICAgICwgZW5kRGF0ZTogICAgICAnJ1xuICAgIH0pO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlVGV4dChuYW1lLCBlKSB7XG4gICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgbmV3U3RhdGVbbmFtZV0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZUNoZWNrYm94KG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBuZXdTdGF0ZVtuYW1lXSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VSYWRpbyhuYW1lLCBlKSB7XG4gICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgbmV3U3RhdGVbbmFtZV0gPSBlLnRhcmdldC52YWx1ZTtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNlbGVjdChuYW1lLCBlKSB7XG4gICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgbGV0IG9wdGlvbnMgPSBlLnRhcmdldC5vcHRpb25zO1xuICAgIGxldCB2YWx1ZXMgPSBbXTtcbiAgICBmb3IoIGxldCBpPTA7IGk8b3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYob3B0aW9uc1tpXS5zZWxlY3RlZCkgdmFsdWVzLnB1c2gob3B0aW9uc1tpXS52YWx1ZSk7XG4gICAgfVxuICAgIG5ld1N0YXRlW25hbWVdID0gdmFsdWVzO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgcmVuZGVyT3B0aW9uKG9ianMsIHByb3AxLCBwcm9wMikge1xuICAgIGlmKCFvYmpzKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIGNvbnN0IGl0ZW1zID0gb2Jqcy5tYXAob2JqID0+IHtcbiAgICAgIHJldHVybiAobGVuID09PSAyKVxuICAgICAgICA/IG9ialtwcm9wMV1bMF1cbiAgICAgICAgOiBvYmpbcHJvcDFdWzBdW3Byb3AyXVswXTtcbiAgICB9KVxuICAgIGNvbnN0IG9wdHMgPSBzdGQuZHN0KGl0ZW1zKTtcbiAgICByZXR1cm4gb3B0cy5tYXAoKG9wdCwgaWR4KSA9PiB7XG4gICAgICByZXR1cm4gPG9wdGlvblxuICAgICAgICBrZXk9e1wiY2hvaWNlLVwiICsgaWR4fSB2YWx1ZT17b3B0fSA+e29wdH08L29wdGlvbj47XG4gICAgfSlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBwYWdlID0gdGhpcy5wcm9wcy5wYWdlO1xuICAgIGNvbnN0IG9wdFBhdGhzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAncHJpbWFyeUNhdGVnb3J5JywgJ2NhdGVnb3J5TmFtZScpO1xuICAgIGNvbnN0IG9wdFNlbHJzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2VsbGVySW5mbycsICdzZWxsZXJVc2VyTmFtZScpO1xuICAgIGNvbnN0IG9wdEltSURzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnaXRlbUlkJyk7XG4gICAgY29uc3Qgb3B0U2hwZ3MgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdzaGlwcGluZ0luZm8nLCAnc2hpcFRvTG9jYXRpb25zJyk7XG4gICAgY29uc3Qgb3B0U3R0c3MgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdzZWxsaW5nU3RhdHVzJywgJ3NlbGxpbmdTdGF0ZScpO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmUgcGFuZS1zbSBzaWRlYmFyXCI+XG4gICAgPG5hdiBjbGFzc05hbWU9XCJuYXYtZ3JvdXBcIj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5UaXRsZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIG9mIGl0ZW1zXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2hTdHJpbmd9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3NlYXJjaFN0cmluZycpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5FbmQgdGltZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRnJvbSBkYXRlICh5eXl5L21tL2RkKVwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc3RhcnREYXRlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdzdGFydERhdGUnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJUbyBkYXRlICh5eXl5L21tL2RkKVwiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuZW5kRGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnZW5kRGF0ZScpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1taW5pIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZVJlc2V0LmJpbmQodGhpcyl9PlJlc2V0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTZWFyY2guYmluZCh0aGlzKX0+U2VhcmNoXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cblx0XHRcdDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5GdW5jdGlvbnM8L2g1PlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZUhvbWUuYmluZCh0aGlzKX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1ob21lXCI+PC9zcGFuPlxuXHRcdFx0XHRIb21lICh7cGFnZX0gcGFnZSlcblx0XHRcdDwvc3Bhbj5cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVJbmNyZW1lbnQuYmluZCh0aGlzKX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1yaWdodC1ib2xkXCI+PC9zcGFuPlxuXHRcdFx0XHROZXh0XG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGVjcmVtZW50LmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tbGVmdC1ib2xkXCI+PC9zcGFuPlxuXHRcdFx0XHRQcmV2aW91c1xuXHRcdFx0PC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPk91dHB1dDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTnVtYmVyIG9mIHBhZ2VzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYWdlc31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAncGFnZXMnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTYXZlLmJpbmQodGhpcyl9PlNhdmVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkNhdGVnb3J5PC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jYXRlZ29yeVBhdGh9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnY2F0ZWdvcnlQYXRoJyl9XG4gICAgICAgID57b3B0UGF0aHN9PC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U2VsbGVyPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxsZXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ3NlbGxlcicpfVxuICAgICAgICA+e29wdFNlbHJzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkl0ZW1JRDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaXRlbUlkfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2l0ZW1JZCcpfVxuICAgICAgICA+e29wdEltSURzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlByaWNlPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJIaWdoZXN0IHByaWNlXCIgXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaGlnaGVzdFByaWNlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdoaWdoZXN0UHJpY2UnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJMb3dlc3QgcHJpY2VcIiBcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5sb3dlc3RQcmljZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnbG93ZXN0UHJpY2UnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U2hpcHBpbmc8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNoaXBwaW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ3NoaXBwaW5nJyl9XG4gICAgICAgID57b3B0U2hwZ3N9PC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+Q29uZGl0aW9uPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jb25kaXRpb259XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnY29uZGl0aW9uJyl9PlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxMDAwXCI+TmV3PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE1MDBcIj5cbiAgICAgICAgICAgIE5ldyBvdGhlciAoc2VlIGRldGFpbHMpPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE3NTBcIj5cbiAgICAgICAgICAgIE5ldyB3aXRoIGRlZmVjdHM8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMjAwMFwiPlxuICAgICAgICAgICAgTWFudWZhY3R1cmVyIHJlZnVyYmlzaGVkPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjI1MDBcIj5cbiAgICAgICAgICAgIFNlbGxlciByZWZ1cmJpc2hlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMDAwXCI+VXNlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MDAwXCI+VmVyeSBHb29kPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjUwMDBcIj5Hb29kPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjYwMDBcIj5BY2NlcHRhYmxlPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjcwMDBcIj5cbiAgICAgICAgICAgIEZvciBwYXJ0cyBvciBub3Qgd29ya2luZzwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5TdGF0dXM8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXR1c31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzdGF0dXMnKX1cbiAgICAgICAgICA+e29wdFN0dHNzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmF2PlxuICAgIDwvZGl2PjtcbiAgfVxufTtcbk5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lID0gYE5vdGVTaWRlYmFyYDtcbmV4cG9ydCBkZWZhdWx0IE5vdGVTaWRlYmFyO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdGQgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvc3RkdXRpbHMnO1xuaW1wb3J0IHsgbG9nLCB1dGlsIH0gIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGVUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlclN0YXR1cyhzdGF0dXMpIHtcbiAgICBsZXQgc3R5bGVzO1xuICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc3R5bGVzID0geyBmb250V2VpZ2h0Oidib2xkJywgY29sb3I6ICdibHVlJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5Ob3cgYXZhaWxhYmxlLjwvZGl2PjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc3R5bGVzID0geyBmb250V2VpZ2h0Oidib2xkJywgY29sb3I6ICdvcmFuZ2UnIH07XG4gICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXN9Pk5ldyBhZGRlZC48L2Rpdj47XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAncmVkJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5SZW1vdmVkLjwvZGl2PjtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyRXh0ZW5zaW9uKGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIDxkaXY+KCB7IHV0aWwudG9MZWZ0RGF5cyhkdXJhdGlvbikgfSApPC9kaXY+O1xuICB9XG5cbiAgcmVuZGVySXRlbShvYmosIGlkeCkge1xuICAgIGNvbnN0IGl0ZW0gPSBvYmo7XG4gICAgY29uc3QgSW1nID0gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnZ2FsbGVyeVVSTCcpXG4gICAgICA/IGl0ZW0uZ2FsbGVyeVVSTFswXSA6ICcnO1xuICAgIGNvbnN0IEFpZCA9IGl0ZW0uaXRlbUlkWzBdO1xuICAgIGNvbnN0IFBpZCA9IGl0ZW0uaGFzT3duUHJvcGVydHkoJ3Byb2R1Y3RJZCcpXG4gICAgICA/IGl0ZW0ucHJvZHVjdElkLm1hcChvYmogPT5cbiAgICAgICAgYCR7b2JqLl9fdmFsdWVfX30gKCAke29ialsnQHR5cGUnXX0gKWApIDogWyctLS0nXTtcbiAgICBjb25zdCBTaWQgPSBpdGVtLnNlbGxlckluZm9bMF0uc2VsbGVyVXNlck5hbWVbMF07XG4gICAgY29uc3QgU3RtXG4gICAgICA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChpdGVtLmxpc3RpbmdJbmZvWzBdLnN0YXJ0VGltZVswXSk7XG4gICAgY29uc3QgRXRtXG4gICAgICA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChpdGVtLmxpc3RpbmdJbmZvWzBdLmVuZFRpbWVbMF0pO1xuICAgIGNvbnN0IFVybCA9IGl0ZW0udmlld0l0ZW1VUkxbMF07XG4gICAgY29uc3QgVHRsID0gaXRlbS50aXRsZVswXTtcbiAgICBjb25zdCBQYzEgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fO1xuICAgIGNvbnN0IENpMSA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgLmN1cnJlbnRQcmljZVswXVsnQGN1cnJlbmN5SWQnXTtcbiAgICBjb25zdCBQYzIgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fO1xuICAgIGNvbnN0IENpMiA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXVsnQGN1cnJlbmN5SWQnXTtcbiAgICBjb25zdCBDZG4gPSBpdGVtLmhhc093blByb3BlcnR5KCdjb25kaXRpb24nKSBcbiAgICAgID8gaXRlbS5jb25kaXRpb25bMF0uY29uZGl0aW9uRGlzcGxheU5hbWVbMF0gOiAnLS0tJztcbiAgICBjb25zdCBDZ3AgPSBpdGVtLnByaW1hcnlDYXRlZ29yeVswXS5jYXRlZ29yeU5hbWVbMF07XG4gICAgY29uc3QgU2hwID0gaXRlbS5zaGlwcGluZ0luZm9bMF0uc2hpcFRvTG9jYXRpb25zWzBdO1xuICAgIGNvbnN0IFN0dCA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXS5zZWxsaW5nU3RhdGVbMF07XG4gICAgY29uc3QgRXh0ID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdLmhhc093blByb3BlcnR5KCd0aW1lTGVmdCcpXG4gICAgICA/IHRoaXMucmVuZGVyRXh0ZW5zaW9uKGl0ZW0uc2VsbGluZ1N0YXR1c1swXS50aW1lTGVmdFswXSlcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgc3R0ID0gdGhpcy5yZW5kZXJTdGF0dXMoMCk7XG4gICAgY29uc3QgVXBkID0gc3RkLmdldExvY2FsVGltZVN0YW1wKERhdGUubm93KCkpO1xuXG4gICAgcmV0dXJuIDx0Ym9keSBrZXk9e2lkeH0+PHRyPlxuICAgICAgPHRkPjxpbWcgc3JjPXtJbWd9IHdpZHRoPScxMjgnIGhlaWdodD0nMTI4JyAvPjwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+XG4gICAgICAgIDxhIGhyZWY9e1VybH0gdGFyZ2V0PSdfYmxhbmsnPntUdGx9PC9hPjxiciAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICBTZWxsIHBlcmlvZCA6IHtTdG19IH4ge0V0bX08YnIgLz5cbiAgICAgICAgQ29uZGl0aW9uIDoge0Nkbn08YnIgLz5cbiAgICAgICAgU2VsbGVyIDoge1NpZH08YnIgLz5cbiAgICAgICAgSXRlbUlEIDoge0FpZH08YnIgLz5cbiAgICAgICAgUHJvZHVjdElEIDoge1BpZC5qb2luKCcgJyl9PGJyIC8+XG4gICAgICAgIENhdGVnb3J5IDoge0NncH1cbiAgICAgIDwvc3Bhbj48L3RkPlxuICAgICAgPHRkPntTaHB9PC90ZD5cbiAgICAgIDx0ZD5cbiAgICAgICAgPHNwYW4+e1BjMX0ge0NpMX08L3NwYW4+PGJyIC8+XG4gICAgICAgIDxzcGFuPigge1BjMn0ge0NpMn0gKTwvc3Bhbj5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+e1N0dH08L3NwYW4+PGJyIC8+PHNwYW4+e0V4dH08L3NwYW4+PC90ZD5cbiAgICAgIDx0ZD48c3Bhbj57c3R0fTwvc3Bhbj48YnIgLz48c3Bhbj57VXBkfTwvc3Bhbj48L3RkPlxuICAgIDwvdHI+PC90Ym9keT47XG4gIH1cblxuICBmaWx0ZXJJdGVtcyhvYmpzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9ianMuZmlsdGVyKG9iaiA9PiB7IFxuICAgICAgY29uc3QgaXRlbSA9IG9iajtcbiAgICAgIGlmKG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBpZighb3B0aW9ucy5zaGlwcGluZy5zb21lKHNoaXBwaW5nID0+XG4gICAgICAgICAgICBzaGlwcGluZyA9PT0gaXRlbS5zaGlwcGluZ0luZm9bMF1cbiAgICAgICAgICAgIC5zaGlwVG9Mb2NhdGlvbnNbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zaGlwcGluZy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5jb25kaXRpb24uc29tZShjb25kaXRpb24gPT4gXG4gICAgICAgICAgICBjb25kaXRpb24gPT09IGl0ZW0uY29uZGl0aW9uWzBdXG4gICAgICAgICAgICAuY29uZGl0aW9uSWRbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5jb25kaXRpb24ubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuc3RhdHVzLnNvbWUoc3RhdHVzID0+XG4gICAgICAgICAgICBzdGF0dXMgPT09IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLnNlbGxpbmdTdGF0ZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnN0YXR1cy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5jYXRlZ29yeVBhdGguc29tZShwYXRoID0+XG4gICAgICAgICAgICBwYXRoID09PSBpdGVtLnByaW1hcnlDYXRlZ29yeVswXVxuICAgICAgICAgICAgLmNhdGVnb3J5TmFtZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLmNhdGVnb3J5UGF0aC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5zZWxsZXIuc29tZShzZWxyID0+IFxuICAgICAgICAgICAgc2VsciA9PT0gaXRlbS5zZWxsZXJJbmZvWzBdXG4gICAgICAgICAgICAuc2VsbGVyVXNlck5hbWVbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zZWxsZXIubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuaXRlbUlkLnNvbWUoaXRlbWlkID0+IFxuICAgICAgICAgICAgaXRlbWlkID09PSBpdGVtLml0ZW1JZFswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLml0ZW1JZC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNGaW5pdGUob3B0aW9ucy5sb3dlc3RQcmljZSkgXG4gICAgICAgICAgfHwgIWlzRmluaXRlKG9wdGlvbnMuaGlnaGVzdFByaWNlKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKE51bWJlcihvcHRpb25zLmxvd2VzdFByaWNlKSA+IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXS5fX3ZhbHVlX18gXG4gICAgICAgICAgJiYgb3B0aW9ucy5sb3dlc3RQcmljZSAhPT0gJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZihOdW1iZXIob3B0aW9ucy5oaWdoZXN0UHJpY2UpIDwgaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXyBcbiAgICAgICAgICAmJiBvcHRpb25zLmhpZ2hlc3RQcmljZSAhPT0gJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMucHJvcHMuaXRlbXNcbiAgICAgID8gdGhpcy5maWx0ZXJJdGVtcyh0aGlzLnByb3BzLml0ZW1zLCBvcHRpb25zKVxuICAgICAgICAubWFwKChpdGVtLCBpZHgpID0+IHRoaXMucmVuZGVySXRlbShpdGVtLCBpZHgpKVxuICAgICAgOiBudWxsO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmVcIj5cbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZS1zdHJpcGVkXCI+XG4gICAgICA8dGhlYWQ+PHRyPlxuICAgICAgPHRoPkltYWdlPC90aD5cbiAgICAgIDx0aD5EZXRhaWw8L3RoPlxuICAgICAgPHRoPlNoaXBwaW5nPC90aD5cbiAgICAgIDx0aD5QcmljZTwvdGg+XG4gICAgICA8dGg+U3RhdHVzPC90aD5cbiAgICAgIDx0aD5VcGRhdGU8L3RoPlxuICAgICAgPC90cj48L3RoZWFkPlxuICAgICAge2l0ZW1zfVxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5Ob3RlVGFibGUuZGlzcGxheU5hbWUgPSBgTm90ZVRhYmxlVmlld2A7XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZHVjdHNTaWRlYmFyICBmcm9tICdDb21wb25lbnRzL1Byb2R1Y3RzU2lkZWJhci9Qcm9kdWN0c1NpZGViYXInO1xuaW1wb3J0IFByb2R1Y3RzVGFibGUgICAgZnJvbSAnQ29tcG9uZW50cy9Qcm9kdWN0c1RhYmxlL1Byb2R1Y3RzVGFibGUnO1xuaW1wb3J0IHsgbG9nIH0gICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgUHJvZHVjdHNCb2R5Vmlld2A7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RzQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lLWdyb3VwXCI+XG4gICAgICA8UHJvZHVjdHNTaWRlYmFyXG4gICAgICAgIHBhZ2U9e3RoaXMucHJvcHMucGFnZX1cbiAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuaXRlbXN9XG4gICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMub3B0aW9uc30gLz5cbiAgICAgIDxQcm9kdWN0c1RhYmxlXG4gICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLml0ZW1zfVxuICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9IC8+XG4gICAgPC9kaXY+O1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvZHVjdHNBY3Rpb24gICAgIGZyb20gJ0FjdGlvbnMvUHJvZHVjdHNBY3Rpb24nO1xuaW1wb3J0IFJhZGlvICAgICAgICAgICAgICBmcm9tICdDb21wb25lbnRzL1JhZGlvL1JhZGlvJztcbmltcG9ydCB7IGxvZywgc3BuLCB1dGlsIH0gZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcbmltcG9ydCBzdGQgICAgICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3N0ZHV0aWxzJztcbmltcG9ydCBpcGMgICAgICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL2lwY3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdHNTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzLm9wdGlvbnMpO1xuICB9XG5cbiAgY3N2SGVhZGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnSW1hZ2UnOiAgICAgICAgICAgICAgICAnJ1xuICAgICAgLCAnVXJsJzogICAgICAgICAgICAgICAgJydcbiAgICAgICwgJ1RpdGxlJzogICAgICAgICAgICAgICcnXG4gICAgICAsICdTdGFydFRpbWUnOiAgICAgICAgICAnJ1xuICAgICAgLCAnRW5kVGltZSc6ICAgICAgICAgICAgJydcbiAgICAgICwgJ0NvbmRpdGlvbic6ICAgICAgICAgICcnXG4gICAgICAsICdTZWxsZXInOiAgICAgICAgICAgICAnJ1xuICAgICAgLCAnSXRlbUlEJzogICAgICAgICAgICAgJydcbiAgICAgICwgJ1Byb2R1Y3RJRChVUEMpJzogICAgICcnXG4gICAgICAsICdQcm9kdWN0SUQoRUFOKSc6ICAgICAnJ1xuICAgICAgLCAnUHJvZHVjdElEKElTQk4pJzogICAgJydcbiAgICAgICwgJ0NhdGVnb3J5JzogICAgICAgICAgICcnXG4gICAgICAsICdTaGlwcGluZyc6ICAgICAgICAgICAnJ1xuICAgICAgLCAnQ3VycmVudFByaWNlJzogICAgICAgJydcbiAgICAgICwgJ0N1cnJlbnRDdXJyZW5jeSc6ICAgICcnXG4gICAgICAsICdDb252ZXJ0ZWRQcmljZSc6ICAgICAnJ1xuICAgICAgLCAnQ29udmVydGVkQ3VycmVuY3knOiAgJydcbiAgICAgICwgJ1N0YXR1cyc6ICAgICAgICAgICAgICcnXG4gICAgICAsICdMZWZ0VGltZSc6ICAgICAgICAgICAnJ1xuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTYXZlKCkge1xuICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlU2F2ZScpO1xuICAgIGlmKCFOdW1iZXIodGhpcy5zdGF0ZS5wYWdlcykpIHJldHVybiBpcGMud2luLnNob3dFcnJvckJveCgnUGFnZXMgaXMgbm90IGEgbnVtYmVyIScpO1xuICAgIGlwYy53aW4uc2hvd1NhdmVEaWFsb2coKGZpbGVuYW1lKSA9PiB7XG4gICAgICBpZighZmlsZW5hbWUpIHJldHVybiBsb2cuaW5mbyhQcm9kdWN0c1NpZGViYXIuZGlzcGxheU5hbWUsICdSZXNwb25zZScsICdGaWxlIHNhdmUgY2FuY2VsZWQhJyk7XG4gICAgICBzcG4uc3BpbigpO1xuICAgICAgbG9nLmluZm8oUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCAnZmlsZW5hbWUnLCBmaWxlbmFtZSk7XG4gICAgICBpcGMuc3lzLnRvdWNoRmlsZShmaWxlbmFtZSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuYWRkYm9tKGZpbGVuYW1lKSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuc2F2ZUZpbGUoZmlsZW5hbWUsIHV0aWwuZ2V0Q1NWSGVhZGVyKHRoaXMuY3N2SGVhZGVyKCkpKSlcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgUHJvZHVjdHNBY3Rpb24ud3JpdGVQcm9kdWN0c0l0ZW1zKHRoaXMuc3RhdGUpLnN1YnNjcmliZShcbiAgICAgICAgICBvYmogPT4gaXBjLnN5cy5zYXZlRmlsZShmaWxlbmFtZSwgb2JqKVxuICAgICAgICAsIGVyciA9PiB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCBlcnIubmFtZSwgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93RXJyb3JCb3goZXJyKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICAsICgpID0+IHtcbiAgICAgICAgICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1Jlc3BvbnNlJywgJ0ZpbGUgaGFzIGJlZW4gc2F2ZWQhJyk7XG4gICAgICAgICAgICBpcGMud2luLnNob3dTYXZlTWVzc2FnZUJveCgpO1xuICAgICAgICAgICAgc3BuLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZUhvbWUoKSB7XG4gICAgbG9nLmluZm8oUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VIb21lJyk7XG4gICAgUHJvZHVjdHNBY3Rpb24uaW5jcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgMCk7XG4gIH1cblxuICBoYW5kbGVJbmNyZW1lbnQoKSB7XG4gICAgbG9nLmluZm8oUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVJbmNyZW1lbnQnKTtcbiAgICBQcm9kdWN0c0FjdGlvbi5pbmNyZW1lbnQodGhpcy5wcm9wcy5vcHRpb25zLCB0aGlzLnByb3BzLnBhZ2UpO1xuICB9XG5cbiAgaGFuZGxlRGVjcmVtZW50KCkge1xuICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlRGVjcmVtZW50Jyk7XG4gICAgUHJvZHVjdHNBY3Rpb24uZGVjcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgdGhpcy5wcm9wcy5wYWdlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNlYXJjaChlKSB7XG4gICAgbG9nLmluZm8oUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VTZWFyY2gnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgUHJvZHVjdHNBY3Rpb24uaW5jcmVtZW50KHRoaXMuc3RhdGUsIDApO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlUmVzZXQoKSB7XG4gICAgbG9nLmluZm8oUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VSZXNldCcpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGlnaGVzdFByaWNlOiAgICcnXG4gICAgICAsIGxvd2VzdFByaWNlOiAgJydcbiAgICAgICwgc2hpcHBpbmc6ICAgICBbXVxuICAgICAgLCBjb25kaXRpb246ICAgIFtdXG4gICAgICAsIHN0YXR1czogICAgICAgW11cbiAgICAgICwgaXRlbUlkOiAgICAgICBbXVxuICAgICAgLCBjYXRlZ29yeVBhdGg6IFtdXG4gICAgICAsIHNlbGxlcjogICAgICAgW11cbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVRleHQobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VDaGVja2JveChuYW1lLCBlKSB7XG4gICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgbmV3U3RhdGVbbmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlUmFkaW8obmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTZWxlY3QobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIGxldCBvcHRpb25zID0gZS50YXJnZXQub3B0aW9ucztcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yKCBsZXQgaT0wOyBpPG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKG9wdGlvbnNbaV0uc2VsZWN0ZWQpIHZhbHVlcy5wdXNoKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgIH1cbiAgICBuZXdTdGF0ZVtuYW1lXSA9IHZhbHVlcztcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbihvYmpzLCBwcm9wMSwgcHJvcDIpIHtcbiAgICBpZighb2JqcykgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBjb25zdCBpdGVtcyA9IG9ianMubWFwKG9iaiA9PiB7XG4gICAgICByZXR1cm4gKGxlbiA9PT0gMilcbiAgICAgICAgPyBvYmpbcHJvcDFdWzBdXG4gICAgICAgIDogb2JqW3Byb3AxXVswXVtwcm9wMl1bMF07XG4gICAgfSlcbiAgICBjb25zdCBvcHRzID0gc3RkLmRzdChpdGVtcyk7XG4gICAgcmV0dXJuIG9wdHMubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgcmV0dXJuIDxvcHRpb25cbiAgICAgICAga2V5PXtcImNob2ljZS1cIiArIGlkeH0gdmFsdWU9e29wdH0gPntvcHR9PC9vcHRpb24+O1xuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcbiAgICBjb25zdCBvcHRQYXRocyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3ByaW1hcnlDYXRlZ29yeScsICdjYXRlZ29yeU5hbWUnKTtcbiAgICBjb25zdCBvcHRTZWxycyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NlbGxlckluZm8nLCAnc2VsbGVyVXNlck5hbWUnKTtcbiAgICBjb25zdCBvcHRJbUlEcyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ2l0ZW1JZCcpO1xuICAgIGNvbnN0IG9wdFNocGdzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2hpcHBpbmdJbmZvJywgJ3NoaXBUb0xvY2F0aW9ucycpO1xuICAgIGNvbnN0IG9wdFN0dHNzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2VsbGluZ1N0YXR1cycsICdzZWxsaW5nU3RhdGUnKTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lIHBhbmUtc20gc2lkZWJhclwiPlxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2LWdyb3VwXCI+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+UHJvZHVjdElEPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggb2YgaXRlbXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByb2R1Y3RJZH1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAncHJvZHVjdElkJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlByb2R1Y3RUeXBlPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxSYWRpbyBuYW1lPVwicHJvZHVjdFR5cGVcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnByb2R1Y3RUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlUmFkaW8uYmluZCh0aGlzLCAncHJvZHVjdFR5cGUnKX0gPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSZWZlcmVuY2VJRFwiPlJlZmVyZW5jZUlEPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIklTQk5cIj5JU0JOPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlVQQ1wiPlVQQzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJFQU5cIj5FQU48L29wdGlvbj5cbiAgICAgICAgPC9SYWRpbz5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1hY3Rpb25zXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1taW5pIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZVJlc2V0LmJpbmQodGhpcyl9PlJlc2V0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTZWFyY2guYmluZCh0aGlzKX0+U2VhcmNoXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cblx0XHRcdDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5GdW5jdGlvbnM8L2g1PlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNoYW5nZUhvbWUuYmluZCh0aGlzKX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1ob21lXCI+PC9zcGFuPlxuXHRcdFx0XHRIb21lICh7cGFnZX0gcGFnZSlcblx0XHRcdDwvc3Bhbj5cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVJbmNyZW1lbnQuYmluZCh0aGlzKX0+XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1yaWdodC1ib2xkXCI+PC9zcGFuPlxuXHRcdFx0XHROZXh0XG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGVjcmVtZW50LmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tbGVmdC1ib2xkXCI+PC9zcGFuPlxuXHRcdFx0XHRQcmV2aW91c1xuXHRcdFx0PC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPk91dHB1dDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTnVtYmVyIG9mIHBhZ2VzXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wYWdlc31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAncGFnZXMnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tcHJpbWFyeVwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VTYXZlLmJpbmQodGhpcyl9PlNhdmVcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkNhdGVnb3J5PC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jYXRlZ29yeVBhdGh9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnY2F0ZWdvcnlQYXRoJyl9XG4gICAgICAgID57b3B0UGF0aHN9PC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U2VsbGVyPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zZWxsZXJ9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ3NlbGxlcicpfVxuICAgICAgICA+e29wdFNlbHJzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkl0ZW1JRDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaXRlbUlkfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2l0ZW1JZCcpfVxuICAgICAgICA+e29wdEltSURzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlByaWNlPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJIaWdoZXN0IHByaWNlXCIgXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuaGlnaGVzdFByaWNlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdoaWdoZXN0UHJpY2UnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJMb3dlc3QgcHJpY2VcIiBcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5sb3dlc3RQcmljZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnbG93ZXN0UHJpY2UnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U2hpcHBpbmc8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNoaXBwaW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ3NoaXBwaW5nJyl9XG4gICAgICAgID57b3B0U2hwZ3N9PC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+Q29uZGl0aW9uPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5jb25kaXRpb259XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnY29uZGl0aW9uJyl9PlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxMDAwXCI+TmV3PC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE1MDBcIj5cbiAgICAgICAgICAgIE5ldyBvdGhlciAoc2VlIGRldGFpbHMpPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE3NTBcIj5cbiAgICAgICAgICAgIE5ldyB3aXRoIGRlZmVjdHM8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMjAwMFwiPlxuICAgICAgICAgICAgTWFudWZhY3R1cmVyIHJlZnVyYmlzaGVkPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjI1MDBcIj5cbiAgICAgICAgICAgIFNlbGxlciByZWZ1cmJpc2hlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzMDAwXCI+VXNlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI0MDAwXCI+VmVyeSBHb29kPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjUwMDBcIj5Hb29kPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjYwMDBcIj5BY2NlcHRhYmxlPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjcwMDBcIj5cbiAgICAgICAgICAgIEZvciBwYXJ0cyBvciBub3Qgd29ya2luZzwvb3B0aW9uPlxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5TdGF0dXM8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXR1c31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzdGF0dXMnKX1cbiAgICAgICAgICA+e29wdFN0dHNzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgIDwvbmF2PlxuICAgIDwvZGl2PjtcbiAgfVxufTtcblByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSA9ICdQcm9kdWN0c1NpZGViYXInO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdGQgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvc3RkdXRpbHMnO1xuaW1wb3J0IHsgbG9nLCB1dGlsIH0gIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYFByb2R1Y3RzVGFibGVWaWV3YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZHVjdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlclN0YXR1cyhzdGF0dXMpIHtcbiAgICBsZXQgc3R5bGVzO1xuICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgc3R5bGVzID0geyBmb250V2VpZ2h0Oidib2xkJywgY29sb3I6ICdibHVlJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5Ob3cgYXZhaWxhYmxlLjwvZGl2PjtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgc3R5bGVzID0geyBmb250V2VpZ2h0Oidib2xkJywgY29sb3I6ICdvcmFuZ2UnIH07XG4gICAgICAgIHJldHVybiA8ZGl2IHN0eWxlPXtzdHlsZXN9Pk5ldyBhZGRlZC48L2Rpdj47XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAncmVkJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5SZW1vdmVkLjwvZGl2PjtcbiAgICB9XG4gIH07XG5cbiAgcmVuZGVyRXh0ZW5zaW9uKGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIDxkaXY+KCB7IHV0aWwudG9MZWZ0RGF5cyhkdXJhdGlvbikgfSApPC9kaXY+O1xuICB9XG5cbiAgcmVuZGVySXRlbShvYmosIGlkeCkge1xuICAgIGNvbnN0IGl0ZW0gPSBvYmo7XG4gICAgY29uc3QgSW1nID0gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnZ2FsbGVyeVVSTCcpXG4gICAgICA/IGl0ZW0uZ2FsbGVyeVVSTFswXSA6ICcnO1xuICAgIGNvbnN0IEFpZCA9IGl0ZW0uaXRlbUlkWzBdO1xuICAgIGNvbnN0IFBpZCA9IGl0ZW0uaGFzT3duUHJvcGVydHkoJ3Byb2R1Y3RJZCcpXG4gICAgICA/IGl0ZW0ucHJvZHVjdElkLm1hcChvYmogPT5cbiAgICAgICAgYCR7b2JqLl9fdmFsdWVfX30gKCAke29ialsnQHR5cGUnXX0gKWApIDogWyctLS0nXTtcbiAgICBjb25zdCBTaWQgPSBpdGVtLnNlbGxlckluZm9bMF0uc2VsbGVyVXNlck5hbWVbMF07XG4gICAgY29uc3QgU3RtXG4gICAgICA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChpdGVtLmxpc3RpbmdJbmZvWzBdLnN0YXJ0VGltZVswXSk7XG4gICAgY29uc3QgRXRtXG4gICAgICA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChpdGVtLmxpc3RpbmdJbmZvWzBdLmVuZFRpbWVbMF0pO1xuICAgIGNvbnN0IFVybCA9IGl0ZW0udmlld0l0ZW1VUkxbMF07XG4gICAgY29uc3QgVHRsID0gaXRlbS50aXRsZVswXTtcbiAgICBjb25zdCBQYzEgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fO1xuICAgIGNvbnN0IENpMSA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgLmN1cnJlbnRQcmljZVswXVsnQGN1cnJlbmN5SWQnXTtcbiAgICBjb25zdCBQYzIgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fO1xuICAgIGNvbnN0IENpMiA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXVsnQGN1cnJlbmN5SWQnXTtcbiAgICBjb25zdCBDZG4gPSBpdGVtLmhhc093blByb3BlcnR5KCdjb25kaXRpb24nKSBcbiAgICAgID8gaXRlbS5jb25kaXRpb25bMF0uY29uZGl0aW9uRGlzcGxheU5hbWVbMF0gOiAnLS0tJztcbiAgICBjb25zdCBDZ3AgPSBpdGVtLnByaW1hcnlDYXRlZ29yeVswXS5jYXRlZ29yeU5hbWVbMF07XG4gICAgY29uc3QgU2hwID0gaXRlbS5zaGlwcGluZ0luZm9bMF0uc2hpcFRvTG9jYXRpb25zWzBdO1xuICAgIGNvbnN0IFN0dCA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXS5zZWxsaW5nU3RhdGVbMF07XG4gICAgY29uc3QgRXh0ID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdLmhhc093blByb3BlcnR5KCd0aW1lTGVmdCcpXG4gICAgICA/IHRoaXMucmVuZGVyRXh0ZW5zaW9uKGl0ZW0uc2VsbGluZ1N0YXR1c1swXS50aW1lTGVmdFswXSlcbiAgICAgIDogJyc7XG4gICAgY29uc3Qgc3R0ID0gdGhpcy5yZW5kZXJTdGF0dXMoMCk7XG4gICAgY29uc3QgVXBkID0gc3RkLmdldExvY2FsVGltZVN0YW1wKERhdGUubm93KCkpO1xuXG4gICAgcmV0dXJuIDx0Ym9keSBrZXk9e2lkeH0+PHRyPlxuICAgICAgPHRkPjxpbWcgc3JjPXtJbWd9IHdpZHRoPScxMjgnIGhlaWdodD0nMTI4JyAvPjwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+XG4gICAgICAgIDxhIGhyZWY9e1VybH0gdGFyZ2V0PSdfYmxhbmsnPntUdGx9PC9hPjxiciAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICBTZWxsIHBlcmlvZCA6IHtTdG19IH4ge0V0bX08YnIgLz5cbiAgICAgICAgQ29uZGl0aW9uIDoge0Nkbn08YnIgLz5cbiAgICAgICAgU2VsbGVyIDoge1NpZH08YnIgLz5cbiAgICAgICAgSXRlbUlEIDoge0FpZH08YnIgLz5cbiAgICAgICAgUHJvZHVjdElEIDoge1BpZC5qb2luKCcgJyl9PGJyIC8+XG4gICAgICAgIENhdGVnb3J5IDoge0NncH1cbiAgICAgIDwvc3Bhbj48L3RkPlxuICAgICAgPHRkPntTaHB9PC90ZD5cbiAgICAgIDx0ZD5cbiAgICAgICAgPHNwYW4+e1BjMX0ge0NpMX08L3NwYW4+PGJyIC8+XG4gICAgICAgIDxzcGFuPigge1BjMn0ge0NpMn0gKTwvc3Bhbj5cbiAgICAgIDwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+e1N0dH08L3NwYW4+PGJyIC8+PHNwYW4+e0V4dH08L3NwYW4+PC90ZD5cbiAgICAgIDx0ZD48c3Bhbj57c3R0fTwvc3Bhbj48YnIgLz48c3Bhbj57VXBkfTwvc3Bhbj48L3RkPlxuICAgIDwvdHI+PC90Ym9keT47XG4gIH1cblxuICBmaWx0ZXJJdGVtcyhvYmpzLCBvcHRpb25zKSB7XG4gICAgbG9nLnRyYWNlKGAke3BzcGlkfT5gLCBvcHRpb25zKTtcbiAgICByZXR1cm4gb2Jqcy5maWx0ZXIob2JqID0+IHsgXG4gICAgICBjb25zdCBpdGVtID0gb2JqO1xuICAgICAgaWYob3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGlmKCFvcHRpb25zLnNoaXBwaW5nLnNvbWUoc2hpcHBpbmcgPT5cbiAgICAgICAgICAgIHNoaXBwaW5nID09PSBpdGVtLnNoaXBwaW5nSW5mb1swXVxuICAgICAgICAgICAgLnNoaXBUb0xvY2F0aW9uc1swXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnNoaXBwaW5nLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLmNvbmRpdGlvbi5zb21lKGNvbmRpdGlvbiA9PiBcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9PT0gaXRlbS5jb25kaXRpb25bMF1cbiAgICAgICAgICAgIC5jb25kaXRpb25JZFswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLmNvbmRpdGlvbi5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5zdGF0dXMuc29tZShzdGF0dXMgPT5cbiAgICAgICAgICAgIHN0YXR1cyA9PT0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuc2VsbGluZ1N0YXRlWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuc3RhdHVzLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLmNhdGVnb3J5UGF0aC5zb21lKHBhdGggPT5cbiAgICAgICAgICAgIHBhdGggPT09IGl0ZW0ucHJpbWFyeUNhdGVnb3J5WzBdXG4gICAgICAgICAgICAuY2F0ZWdvcnlOYW1lWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuY2F0ZWdvcnlQYXRoLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLnNlbGxlci5zb21lKHNlbHIgPT4gXG4gICAgICAgICAgICBzZWxyID09PSBpdGVtLnNlbGxlckluZm9bMF1cbiAgICAgICAgICAgIC5zZWxsZXJVc2VyTmFtZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnNlbGxlci5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5pdGVtSWQuc29tZShpdGVtaWQgPT4gXG4gICAgICAgICAgICBpdGVtaWQgPT09IGl0ZW0uaXRlbUlkWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuaXRlbUlkLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFpc0Zpbml0ZShvcHRpb25zLmxvd2VzdFByaWNlKSBcbiAgICAgICAgICB8fCAhaXNGaW5pdGUob3B0aW9ucy5oaWdoZXN0UHJpY2UpKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoTnVtYmVyKG9wdGlvbnMubG93ZXN0UHJpY2UpID4gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXyBcbiAgICAgICAgICAmJiBvcHRpb25zLmxvd2VzdFByaWNlICE9PSAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKE51bWJlcihvcHRpb25zLmhpZ2hlc3RQcmljZSkgPCBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgICAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fIFxuICAgICAgICAgICYmIG9wdGlvbnMuaGlnaGVzdFByaWNlICE9PSAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBvcHRpb25zID0gdGhpcy5wcm9wcy5vcHRpb25zO1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5wcm9wcy5pdGVtc1xuICAgICAgPyB0aGlzLmZpbHRlckl0ZW1zKHRoaXMucHJvcHMuaXRlbXMsIG9wdGlvbnMpXG4gICAgICAgIC5tYXAoKGl0ZW0sIGlkeCkgPT4gdGhpcy5yZW5kZXJJdGVtKGl0ZW0sIGlkeCkpXG4gICAgICA6IG51bGw7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZVwiPlxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRhYmxlLXN0cmlwZWRcIj5cbiAgICAgIDx0aGVhZD48dHI+XG4gICAgICA8dGg+SW1hZ2U8L3RoPlxuICAgICAgPHRoPkRldGFpbDwvdGg+XG4gICAgICA8dGg+U2hpcHBpbmc8L3RoPlxuICAgICAgPHRoPlByaWNlPC90aD5cbiAgICAgIDx0aD5TdGF0dXM8L3RoPlxuICAgICAgPHRoPlVwZGF0ZTwvdGg+XG4gICAgICA8L3RyPjwvdGhlYWQ+XG4gICAgICB7aXRlbXN9XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PjtcbiAgfVxufTtcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFkaW8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgdmFsdWU6IHByb3BzLmRlZmF1bHRWYWx1ZVxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICBpZih0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKGV2ZW50KTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLnByb3BzLnZhbHVlIHx8IHRoaXMuc3RhdGUudmFsdWU7XG4gICAgbGV0IGNoaWxkcmVuID0gUmVhY3QuQ2hpbGRyZW4ubWFwKHRoaXMucHJvcHMuY2hpbGRyZW5cbiAgICAsIGZ1bmN0aW9uKGNoaWxkLCBpKSB7XG4gICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJyYWRpb1wiPlxuICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJyYWRpb1wiXG4gICAgICAgICAgbmFtZT17dGhpcy5wcm9wcy5uYW1lfVxuICAgICAgICAgIHZhbHVlPXtjaGlsZC5wcm9wcy52YWx1ZX1cbiAgICAgICAgICBjaGVja2VkPXtjaGlsZC5wcm9wcy52YWx1ZSA9PT0gdmFsdWV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcyl9IC8+XG4gICAgICAgIHtjaGlsZC5wcm9wcy5jaGlsZHJlbn08L2xhYmVsPlxuICAgICAgPC9kaXY+O1xuICAgIH0uYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIDxzcGFuPntjaGlsZHJlbn08L3NwYW4+O1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFwcEFjdGlvbiAgZnJvbSAnQWN0aW9ucy9BcHBBY3Rpb24nO1xuaW1wb3J0IHsgbG9nIH0gICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgVGFic1ZpZXdgO1xuXG5jbGFzcyBUYWJzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgQXBwQWN0aW9uLnNlbGVjdGVkQ29udGVudCgwLCB0aGlzLnByb3BzLmNoaWxkcmVuWzBdLnByb3BzLmxhYmVsKTtcbiAgfVxuXG4gIGhhbmRsZUNsaWNrVGFiKGluZGV4LCB0aXRsZSwgZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIEFwcEFjdGlvbi5zZWxlY3RlZENvbnRlbnQoaW5kZXgsIHRpdGxlKTtcbiAgfVxuXG4gIHJlbmRlclRpdGxlcyhjaGlsZCwgaW5kZXgpIHtcbiAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMucHJvcHMuc2VsZWN0ZWQgPT09IGluZGV4ID8gJ2FjdGl2ZScgOiAnJztcbiAgICBjb25zdCBjbGFzc05hbWVzID0gWyd0YWItaXRlbSddO1xuICAgIGNsYXNzTmFtZXMucHVzaChzZWxlY3RlZCk7XG4gICAgcmV0dXJuIDxkaXYga2V5PXtpbmRleH1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcy5qb2luKCcgJyl9XG4gICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUNsaWNrVGFiLmJpbmQodGhpcywgaW5kZXgsIGNoaWxkLnByb3BzLmxhYmVsKX1cbiAgICA+e2NoaWxkLnByb3BzLmxhYmVsfTwvZGl2PjtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB0aXRsZXMgPSB0aGlzLnByb3BzLmNoaWxkcmVuLm1hcCh0aGlzLnJlbmRlclRpdGxlcy5iaW5kKHRoaXMpKTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0YWItZ3JvdXBcIj57dGl0bGVzfTwvZGl2PjtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgVGFicztcbiIsImltcG9ydCB7IERpc3BhdGNoZXIgfSBmcm9tICdmbHV4JztcblxuY29uc3QgZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BhdGNoZXI7XG5leHBvcnQgY29uc3QgZGlzcGF0Y2ggPSBkaXNwYXRjaGVyLmRpc3BhdGNoLmJpbmQoZGlzcGF0Y2hlcik7XG4iLCJpbXBvcnQgUmVhY3QgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IEFwcCAgICAgICAgZnJvbSAnUGFnZXMvQXBwL0FwcCc7XG4gXG5jb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyk7XG5jb25zdCByZW5kZXJSb290ID0gKCkgPT4ge1xuICByZW5kZXIoPEFwcCAvPiwgcm9vdEVsKTtcbn07XG5cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KCcuL3BhZ2VzL0FwcC9BcHAuanMnLCAoKSA9PiB7XG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgIHJlbmRlclJvb3QoKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5yZW5kZXJSb290KCk7XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgICAgICAgICAgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDb250YWluZXIgfSAgICAgIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IENvbnRhaW5lckNvbnZlcnRlciBmcm9tICdNYWluL0ZsdXhDb250YWluZXJDb252ZXJ0ZXInO1xuaW1wb3J0IGFwcFN0b3JlICAgICAgICAgICBmcm9tICdTdG9yZXMvYXBwU3RvcmUnO1xuaW1wb3J0IEFwcEFjdGlvbiAgICAgICAgICBmcm9tICdBY3Rpb25zL0FwcEFjdGlvbic7XG5pbXBvcnQgQXBwQm9keSAgICAgICAgICAgIGZyb20gJ0NvbXBvbmVudHMvQXBwQm9keS9BcHBCb2R5JztcbmltcG9ydCBOb3RlICAgICAgICAgICAgICAgZnJvbSAnUGFnZXMvTm90ZS9Ob3RlJztcbmltcG9ydCBDb21wbGV0ZSAgICAgICAgICAgZnJvbSAnUGFnZXMvQ29tcGxldGUvQ29tcGxldGUnO1xuaW1wb3J0IFByb2R1Y3RzICAgICAgICAgICBmcm9tICdQYWdlcy9Qcm9kdWN0cy9Qcm9kdWN0cyc7XG5pbXBvcnQgVGFicyAgICAgICAgICAgICAgIGZyb20gJ0NvbXBvbmVudHMvVGFicy9UYWJzJztcbmltcG9ydCBDb250ZW50cyAgICAgICAgICAgZnJvbSAnQ29tcG9uZW50cy9Db250ZW50cy9Db250ZW50cyc7XG5pbXBvcnQgR2xvYmFsSGVhZGVyICAgICAgIGZyb20gJ0NvbXBvbmVudHMvR2xvYmFsSGVhZGVyL0dsb2JhbEhlYWRlcic7XG5pbXBvcnQgR2xvYmFsRm9vdGVyICAgICAgIGZyb20gJ0NvbXBvbmVudHMvR2xvYmFsRm9vdGVyL0dsb2JhbEZvb3Rlcic7XG5pbXBvcnQgRXJyb3JCb3VuZGFyeSAgICAgIGZyb20gJ0NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS9FcnJvckJvdW5kYXJ5JztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY2xhc3MgQXBwIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldFN0b3JlcygpIHtcbiAgICByZXR1cm4gW2FwcFN0b3JlXTtcbiAgfVxuXG4gIHN0YXRpYyBjYWxjdWxhdGVTdGF0ZSgpIHtcbiAgICByZXR1cm4gYXBwU3RvcmUuZ2V0U3RhdGUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGxvZy5pbmZvKEFwcC5kaXNwbGF5TmFtZSwgJ3ByZWZldGNoJywgJ2NvbmZpZycpO1xuICAgIHJldHVybiBBcHBBY3Rpb24uZmV0Y2hDb25maWcoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICAvL2xvZy5pbmZvKEFwcC5kaXNwbGF5TmFtZSwgJ1N0YXRlJywgdGhpcy5zdGF0ZSk7XG4gICAgY29uc3QgeyB0aXRsZSwgc2VsZWN0ZWQsIGNvbmZpZyB9ID0gdGhpcy5zdGF0ZTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ3aW5kb3dcIj5cbiAgICAgICAgPEVycm9yQm91bmRhcnk+XG4gICAgICAgICAgPEdsb2JhbEhlYWRlciB0aXRsZT17dGl0bGV9IC8+XG4gICAgICAgICAgPFRhYnMgc2VsZWN0ZWQ9e3NlbGVjdGVkfT5cbiAgICAgICAgICAgIDxzcGFuIGxhYmVsPVwiU2VhcmNoIG9mIGl0ZW1zXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gbGFiZWw9XCJTZWFyY2ggb2YgQ29tcGxldGVkIGl0ZW1zXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gbGFiZWw9XCJTZWFyY2ggb2YgUHJvZHVjdCBJRHNcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBsYWJlbD1cIlByZWZlcmVuY2VcIj48L3NwYW4+XG4gICAgICAgICAgPC9UYWJzPlxuICAgICAgICAgIDxDb250ZW50cyBzZWxlY3RlZD17c2VsZWN0ZWR9PlxuICAgICAgICAgICAgPE5vdGUgLz5cbiAgICAgICAgICAgIDxDb21wbGV0ZSAvPlxuICAgICAgICAgICAgPFByb2R1Y3RzIC8+XG4gICAgICAgICAgICA8QXBwQm9keSBjb25maWc9e2NvbmZpZ30vPlxuICAgICAgICAgIDwvQ29udGVudHM+XG4gICAgICAgICAgPEdsb2JhbEZvb3RlciAvPlxuICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICA8L2Rpdj5cbiAgICA7XG4gIH1cbn1cbkFwcC5kaXNwbGF5TmFtZSA9ICdBcHBDb250cm9sbGVyJztcbkFwcC5kZWZhdWx0UHJvcHMgPSB7fTtcbkFwcC5wcm9wVHlwZXMgPSB7fTtcbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lci5jcmVhdGUoQ29udGFpbmVyQ29udmVydGVyLmNvbnZlcnQoQXBwKSk7XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbnRhaW5lciB9ICAgICAgZnJvbSAnZmx1eC91dGlscyc7XG5pbXBvcnQgQ29udGFpbmVyQ29udmVydGVyIGZyb20gJ01haW4vRmx1eENvbnRhaW5lckNvbnZlcnRlcic7XG5pbXBvcnQgY29tcGxldGVTdG9yZSAgICAgIGZyb20gJ1N0b3Jlcy9jb21wbGV0ZVN0b3JlJztcbmltcG9ydCBDb21wbGV0ZUJvZHkgICAgICAgZnJvbSAnQ29tcG9uZW50cy9Db21wbGV0ZUJvZHkvQ29tcGxldGVCb2R5JztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgQ29tcGxldGVDb250cm9sZXJWaWV3YDtcblxuY2xhc3MgQ29tcGxldGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0U3RvcmVzKCkge1xuICAgIHJldHVybiBbY29tcGxldGVTdG9yZV07XG4gIH1cblxuICBzdGF0aWMgY2FsY3VsYXRlU3RhdGUoKSB7XG4gICAgcmV0dXJuIGNvbXBsZXRlU3RvcmUuZ2V0U3RhdGUoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPENvbXBsZXRlQm9keVxuICAgICAgcGFnZT17dGhpcy5zdGF0ZS5wYWdlfVxuICAgICAgaXRlbXM9e3RoaXMuc3RhdGUuaXRlbXN9XG4gICAgICBvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9IC8+O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXIuY3JlYXRlKENvbnRhaW5lckNvbnZlcnRlci5jb252ZXJ0KENvbXBsZXRlKSk7XG5cbiIsImltcG9ydCBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gICAgICBmcm9tICdmbHV4L3V0aWxzJztcbmltcG9ydCBDb250YWluZXJDb252ZXJ0ZXIgZnJvbSAnTWFpbi9GbHV4Q29udGFpbmVyQ29udmVydGVyJztcbmltcG9ydCBub3RlU3RvcmUgICAgICAgICAgZnJvbSAnU3RvcmVzL25vdGVTdG9yZSc7XG5pbXBvcnQgTm90ZUJvZHkgICAgICAgICAgIGZyb20gJ0NvbXBvbmVudHMvTm90ZUJvZHkvTm90ZUJvZHknO1xuaW1wb3J0IHsgbG9nIH0gICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBOb3RlQ29udHJvbGVyVmlld2A7XG5cbmNsYXNzIE5vdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZ2V0U3RvcmVzKCkge1xuICAgIHJldHVybiBbbm90ZVN0b3JlXTtcbiAgfVxuXG4gIHN0YXRpYyBjYWxjdWxhdGVTdGF0ZSgpIHtcbiAgICByZXR1cm4gbm90ZVN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxOb3RlQm9keVxuICAgICAgcGFnZT17dGhpcy5zdGF0ZS5wYWdlfVxuICAgICAgaXRlbXM9e3RoaXMuc3RhdGUuaXRlbXN9XG4gICAgICBvcHRpb25zPXt0aGlzLnN0YXRlLm9wdGlvbnN9IC8+O1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXIuY3JlYXRlKENvbnRhaW5lckNvbnZlcnRlci5jb252ZXJ0KE5vdGUpKTtcblxuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDb250YWluZXIgfSAgICAgIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IENvbnRhaW5lckNvbnZlcnRlciBmcm9tICdNYWluL0ZsdXhDb250YWluZXJDb252ZXJ0ZXInO1xuaW1wb3J0IHByb2R1Y3RzU3RvcmUgICAgICBmcm9tICdTdG9yZXMvcHJvZHVjdHNTdG9yZSc7XG5pbXBvcnQgUHJvZHVjdHNCb2R5ICAgICAgIGZyb20gJ0NvbXBvbmVudHMvUHJvZHVjdHNCb2R5L1Byb2R1Y3RzQm9keSc7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYFByb2R1Y3RzQ29udHJvbGVyVmlld2A7XG5cbmNsYXNzIFByb2R1Y3RzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldFN0b3JlcygpIHtcbiAgICByZXR1cm4gW3Byb2R1Y3RzU3RvcmVdO1xuICB9XG5cbiAgc3RhdGljIGNhbGN1bGF0ZVN0YXRlKCkge1xuICAgIHJldHVybiBwcm9kdWN0c1N0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxQcm9kdWN0c0JvZHlcbiAgICAgIHBhZ2U9e3RoaXMuc3RhdGUucGFnZX1cbiAgICAgIGl0ZW1zPXt0aGlzLnN0YXRlLml0ZW1zfVxuICAgICAgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfSAvPjtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyLmNyZWF0ZShDb250YWluZXJDb252ZXJ0ZXIuY29udmVydChQcm9kdWN0cykpO1xuXG4iLCJpbXBvcnQgKiBhcyBSICAgICAgICAgICAgICAgICAgIGZyb20gJ3JhbWRhJztcbmltcG9ydCB7IGZyb20sIGZvcmtKb2luLCBwaXBlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZsYXRNYXAgfSAgICAgICAgIGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGxvZywgc3BuLCBzdG9yIH0gICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcbmltcG9ydCBzdGQgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3N0ZHV0aWxzJztcbmltcG9ydCBpcGMgICAgICAgICAgICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL2lwY3V0aWxzJztcblxubG9nLmNvbmZpZygnY29uc29sZScsICdiYXNpYycsICdBTEwnLCAnZWxlY3Ryb24tcmVuZGVyZXInKTtcbnNwbi5jb25maWcoJ2FwcCcpO1xuXG5jb25zdCBkaXNwbGF5TmFtZSA9IGBOb3RlQXBpQ2xpZW50YDtcblxubGV0IGVCYXkgPSBuZXcgT2JqZWN0KCk7XG5leHBvcnQgZGVmYXVsdCB7XG4gIHJlcXVlc3Qob3BlcmF0aW9uLCBvcHRpb25zKSB7XG4gICAgbG9nLmluZm8oZGlzcGxheU5hbWUsICdyZXF1ZXN0Jywgb3BlcmF0aW9uKTtcbiAgICBzd2l0Y2gob3BlcmF0aW9uKSB7XG4gICAgICBjYXNlICdjb25maWcvZmV0Y2gnOlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG1lbW9yeSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UgXG4gICAgICAgICAgICB8fCAod2luZG93LlVzZXJEYXRhU3RvcmFnZSAmJiBuZXcgc3Rvci5Vc2VyRGF0YVN0b3JhZ2UoKSkgfHwgbmV3IHN0b3IuQ29va2llU3RvcmFnZSgpO1xuICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IEpTT04ucGFyc2UobWVtb3J5LmdldEl0ZW0oXCJlQmF5X2NvbmZpZ1wiKSk7XG4gICAgICAgICAgZUJheSA9IGNvbmZpZyA/IGNvbmZpZyA6IHt9O1xuICAgICAgICAgIHJlc29sdmUoZUJheSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnY29uZmlnL3dyaXRlJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCBtZW1vcnkgPSB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICAgICAgICB8fCAod2luZG93LlVzZXJEYXRhU3RvcmFnZSAmJiBuZXcgc3Rvci5Vc2VyRGF0YVN0b3JhZ2UoKSkgfHwgbmV3IHN0b3IuQ29va2llU3RvcmFnZSgpO1xuICAgICAgICAgIGVCYXkgPSBvcHRpb25zO1xuICAgICAgICAgIG1lbW9yeS5zZXRJdGVtKFwiZUJheV9jb25maWdcIiwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xuICAgICAgICAgIHJlc29sdmUob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnZmluZEl0ZW1zQnlLZXl3b3Jkcyc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgSlNPTlAucmVxdWVzdChlQmF5LmZpbmRpbmdBcGksIG9wdGlvbnMsIG9iaiA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnZmluZENvbXBsZXRlZEl0ZW1zJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBKU09OUC5yZXF1ZXN0KGVCYXkuZmluZGluZ0FwaSwgb3B0aW9ucywgb2JqID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUob2JqKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdmaW5kSXRlbXNCeVByb2R1Y3QnOlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIEpTT05QLnJlcXVlc3QoZUJheS5maW5kaW5nQXBpLCBvcHRpb25zLCBvYmogPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2NsaWVudF9jcmVkZW50aWFscyc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaXBjLmZldGNoLm9mKGVCYXkub2F1dGgyQXBpKS5wb3N0KG9wdGlvbnMsIChlcnIsIG9iaikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnY29kZSc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaXBjLmZldGNoLm9mKGVCYXkuYXV0aG9yaXplQXBpKS5hdXRoKG9wdGlvbnMsIChlcnIsIG9iaikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnYXV0aG9yaXphdGlvbl9jb2RlJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpcGMuZmV0Y2gub2YoZUJheS5vYXV0aDJBcGkpLnBvc3Qob3B0aW9ucywgKGVyciwgb2JqKSA9PiB7XG4gICAgICAgICAgICBpZihlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHJlc29sdmUob2JqKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdyZWZyZXNoX3Rva2VuJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpcGMuZmV0Y2gub2YoZUJheS5vYXV0aDJBcGkpLnBvc3Qob3B0aW9ucywgKGVyciwgb2JqKSA9PiB7XG4gICAgICAgICAgICBpZihlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHJlc29sdmUob2JqKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdHZXRJdGVtJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpcGMuZmV0Y2gub2YoZUJheS50cmFkaW5nQXBpKS5wb3N0KG9wdGlvbnMsIChlcnIsIG9iaikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnaW52ZW50b3J5X2l0ZW0nOlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlwYy5mZXRjaC5vZihlQmF5LmludmVudG9yeUFwaSArICcvJyArIG9wZXJhdGlvbikuZ2V0KG9wdGlvbnMsIChlcnIsIG9iaikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgIGxvZy5lcnJvcihkaXNwbGF5TmFtZSwgJ0Vycm9yJywgJ1RoaXMgb3BlcmF0aW9uIGlzIHVua25vd24uJyk7XG4gICAgICAgICAgcmVzb2x2ZShvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIGdldENvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdjb25maWcvZmV0Y2gnKTtcbiAgfSxcblxuICBnZXRJdGVtcyhvcHRpb25zLCBwYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZmluZEl0ZW1zQnlLZXl3b3JkcydcbiAgICAgICwgdGhpcy5vcHRJdGVtcyh7IGFwcGlkOiBlQmF5LmFwcGlkLCBwYWdlLCBvcGVyYXRpb246ICdmaW5kSXRlbXNCeUtleXdvcmRzJyB9LCBvcHRpb25zKSk7XG4gIH0sXG4gIFxuICBnZXRDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIHBhZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdmaW5kQ29tcGxldGVkSXRlbXMnXG4gICAgICAsIHRoaXMub3B0SXRlbXMoeyBhcHBpZDogZUJheS5hcHBpZCwgcGFnZSwgb3BlcmF0aW9uOiAnZmluZENvbXBsZXRlZEl0ZW1zJyB9LCBvcHRpb25zKSk7XG4gIH0sXG4gIFxuICBnZXRQcm9kdWN0c0l0ZW1zKG9wdGlvbnMsIHBhZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdmaW5kSXRlbXNCeVByb2R1Y3QnXG4gICAgICAsIHRoaXMub3B0UHJvZHVjdHMoeyBhcHBpZDogZUJheS5hcHBpZCwgcGFnZSwgb3BlcmF0aW9uOiAnZmluZEl0ZW1zQnlQcm9kdWN0JyB9LCBvcHRpb25zKSk7XG4gIH0sXG4gIFxuICBnZXRBcHBUb2tlbihzY29wZSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2NsaWVudF9jcmVkZW50aWFscycsIHsgXG4gICAgICBhcHBpZDogZUJheS5hcHBpZCwgY2VydGlkOiBlQmF5LmNlcnRpZCwgcnVuYW1lOiBlQmF5LnJ1bmFtZSwgc2NvcGVcbiAgICAsIG9wZXJhdGlvbjogJ2NsaWVudF9jcmVkZW50aWFscycsIHR5cGU6ICdOVicgXG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0Q29kZShvcHRpb25zLCBzY29wZSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2NvZGUnXG4gICAgICAsIHRoaXMub3B0Q29kZSh7IGFwcGlkOiBlQmF5LmFwcGlkLCBydW5hbWU6IGVCYXkucnVuYW1lLCBvcGVyYXRpb246ICdjb2RlJywgc2NvcGUgfSwgb3B0aW9ucykpXG4gIH0sXG5cbiAgZ2V0VXNlclRva2VuKGNvZGUpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdhdXRob3JpemF0aW9uX2NvZGUnLCB7IFxuICAgICAgYXBwaWQ6IGVCYXkuYXBwaWQsIGNlcnRpZDogZUJheS5jZXJ0aWQsIHJ1bmFtZTogZUJheS5ydW5hbWUsIGNvZGVcbiAgICAsIG9wZXJhdGlvbjogJ2F1dGhvcml6YXRpb25fY29kZScsIHR5cGU6ICdOVicgXG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0UmVmcmVzaFRva2VuKHNjb3BlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgncmVmcmVzaF90b2tlbicsIHtcbiAgICAgIGFwcGlkOiBlQmF5LmFwcGlkLCBjZXJ0aWQ6IGVCYXkuY2VydGlkLCB0b2tlbjogZUJheS51c2VydG9rZW4ucmVmcmVzaF90b2tlbiwgc2NvcGVcbiAgICAsIG9wZXJhdGlvbjogJ3JlZnJlc2hfdG9rZW4nLCB0eXBlOiAnTlYnXG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0SXRlbURldGFpbHMob3B0aW9ucywgaXRlbXMpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHZXRJdGVtJywgeyBcbiAgICAgIGFwcGlkOiBlQmF5LmFwcGlkLCB0b2tlbjogZUJheS50b2tlbiwgaXRlbXMsIG9wdGlvbnMsIG9wZXJhdGlvbjogJ0dldEl0ZW0nLCB0eXBlOiAnWE1MJyBcbiAgICB9KTtcbiAgfSxcblxuICBnZXRJbnZlbnRvcnlJdGVtcyhvcHRpb25zLCB0b2tlbikge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2ludmVudG9yeV9pdGVtJywgeyBcbiAgICAgIGFwcGlkOiBlQmF5LmFwcGlkLCB0b2tlbiwgb3B0aW9ucywgb2Zmc2V0OiAwLCBvcGVyYXRpb246ICdpbnZlbnRvcnlfaXRlbScsIHR5cGU6ICdKU09OJyBcbiAgICB9KTtcbiAgfSxcbiAgXG4gIHB1dENvbmZpZyhjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdjb25maWcvd3JpdGUnLCBjb25maWcpO1xuICB9LFxuXG4gIHB1dEl0ZW1zKGl0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnd3JpdGVJdGVtc0J5S2V5d29yZHMnLCBpdGVtcyk7XG4gIH0sXG4gIFxuICBwdXRDb21wbGV0ZUl0ZW1zKGl0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnd3JpdGVDb21wbGV0ZWRJdGVtcycsIGl0ZW1zKTtcbiAgfSxcbiAgXG4gIHB1dFByb2R1Y3RzSXRlbXMoaXRlbXMpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCd3cml0ZUl0ZW1zQnlQcm9kdWN0JywgaXRlbXMpO1xuICB9LFxuICBcbiAgZmV0Y2hJdGVtcyhvcHRpb25zLCBwYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SXRlbXMob3B0aW9ucywgcGFnZSlcbiAgICAgIC50aGVuKHRoaXMucmVzSXRlbXMpXG4gICAgICAudGhlbih0aGlzLnNldEl0ZW1zKVxuICB9LFxuICBcbiAgZmV0Y2hDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIHBhZ2UpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIHBhZ2UpXG4gICAgICAudGhlbih0aGlzLnJlc0NvbXBsZXRlSXRlbXMpXG4gICAgICAudGhlbih0aGlzLnNldEl0ZW1zKVxuICB9LFxuXG4gIGZldGNoUHJvZHVjdHNJdGVtcyhvcHRpb25zLCBwYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvZHVjdHNJdGVtcyhvcHRpb25zLCBwYWdlKVxuICAgICAgLnRoZW4odGhpcy5yZXNQcm9kdWN0c0l0ZW1zKVxuICAgICAgLnRoZW4odGhpcy5zZXRJdGVtcylcbiAgfSxcbiAgXG4gIHdyaXRlSXRlbXMob3B0aW9ucykge1xuICAgIGNvbnN0IHN0cmVhbUl0ZW1zICAgPSBpZHggICA9PiBmcm9tKHRoaXMuZ2V0SXRlbXMob3B0aW9ucywgaWR4KSk7XG4gICAgY29uc3Qgc3RyZWFtRGV0YWlsICA9IG9ianMgID0+IGZyb20odGhpcy5nZXRJdGVtRGV0YWlscyhvcHRpb25zLCBvYmpzKSk7XG4gICAgY29uc3QgZm9ya0l0ZW1zICAgICA9IG9iaiAgID0+IGZvcmtKb2luKHRoaXMuZm9ySXRlbXMob3B0aW9ucywgb2JqKSk7XG4gICAgcmV0dXJuIHN0cmVhbUl0ZW1zKDEpLnBpcGUoXG4gICAgICAgIG1hcCh0aGlzLnJlc0l0ZW1zKVxuICAgICAgLCBmbGF0TWFwKGZvcmtJdGVtcylcbiAgICAgICwgbWFwKFIubWFwKHRoaXMucmVzSXRlbXMuYmluZCh0aGlzKSkpXG4gICAgICAsIG1hcChSLm1hcCh0aGlzLnNldEl0ZW1zLmJpbmQodGhpcykpKVxuICAgICAgLCBtYXAoUi5mbGF0dGVuKVxuICAgICAgLCBmbGF0TWFwKHN0cmVhbURldGFpbClcbiAgICAgICk7XG4gIH0sXG5cbiAgd3JpdGVDb21wbGV0ZUl0ZW1zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzdHJlYW1JdGVtcyAgID0gaWR4ICAgPT4gZnJvbSh0aGlzLmdldENvbXBsZXRlSXRlbXMob3B0aW9ucywgaWR4KSk7XG4gICAgY29uc3Qgc3RyZWFtRGV0YWlsICA9IG9ianMgID0+IGZyb20odGhpcy5nZXRJdGVtRGV0YWlscyhvcHRpb25zLCBvYmpzKSk7XG4gICAgY29uc3QgZm9ya0l0ZW1zICAgICA9IG9iaiAgID0+IGZvcmtKb2luKHRoaXMuZm9yQ29tcGxldGVJdGVtcyhvcHRpb25zLCBvYmopKTtcbiAgICByZXR1cm4gc3RyZWFtSXRlbXMoMSkucGlwZShcbiAgICAgICAgbWFwKHRoaXMucmVzQ29tcGxldGVJdGVtcylcbiAgICAgICwgZmxhdE1hcChmb3JrSXRlbXMpXG4gICAgICAsIG1hcChSLm1hcCh0aGlzLnJlc0NvbXBsZXRlSXRlbXMuYmluZCh0aGlzKSkpXG4gICAgICAsIG1hcChSLm1hcCh0aGlzLnNldEl0ZW1zLmJpbmQodGhpcykpKVxuICAgICAgLCBtYXAoUi5mbGF0dGVuKVxuICAgICAgLCBmbGF0TWFwKHN0cmVhbURldGFpbClcbiAgICAgICk7XG4gIH0sXG4gIFxuICB3cml0ZVByb2R1Y3RzSXRlbXMob3B0aW9ucykge1xuICAgIGNvbnN0IHN0cmVhbUl0ZW1zICAgPSBpZHggICA9PiBmcm9tKHRoaXMuZ2V0UHJvZHVjdHNJdGVtcyhvcHRpb25zLCBpZHgpKTtcbiAgICBjb25zdCBzdHJlYW1EZXRhaWwgID0gb2JqcyAgPT4gZnJvbSh0aGlzLmdldEl0ZW1EZXRhaWxzKG9wdGlvbnMsIG9ianMpKTtcbiAgICBjb25zdCBmb3JrSXRlbXMgICAgID0gb2JqICAgPT4gZm9ya0pvaW4odGhpcy5mb3JQcm9kdWN0c0l0ZW1zKG9wdGlvbnMsIG9iaikpO1xuICAgIHJldHVybiBzdHJlYW1JdGVtcygxKS5waXBlKFxuICAgICAgICBtYXAodGhpcy5yZXNQcm9kdWN0c0l0ZW1zKVxuICAgICAgLCBmbGF0TWFwKGZvcmtJdGVtcylcbiAgICAgICwgbWFwKFIubWFwKHRoaXMucmVzUHJvZHVjdHNJdGVtcy5iaW5kKHRoaXMpKSlcbiAgICAgICwgbWFwKFIubWFwKHRoaXMuc2V0SXRlbXMuYmluZCh0aGlzKSkpXG4gICAgICAsIG1hcChSLmZsYXR0ZW4pXG4gICAgICAsIGZsYXRNYXAoc3RyZWFtRGV0YWlsKVxuICAgICAgKTtcbiAgfSxcbiAgXG4gIGZldGNoQXBwVG9rZW4oc3RhdGUsIHNjb3BlKSB7XG4gICAgY29uc3QgcmVxdWVzdFRva2VuICA9IG9iaiA9PiBmcm9tKHRoaXMuZ2V0QXBwVG9rZW4ob2JqKSk7XG4gICAgY29uc3Qgc2V0VG9rZW4gICAgICA9IG9iaiA9PiBSLm1lcmdlKGVCYXksIHsgYXBwdG9rZW46IG9iaiwgYXBwc3RhdGU6IHN0YXRlIH0pO1xuICAgIGNvbnN0IHdyaXRlQ29uZmlnICAgPSBvYmogPT4gZnJvbSh0aGlzLnB1dENvbmZpZyhvYmopKTtcbiAgICBjb25zdCBnZXRUb2tlbiAgICAgID0gb2JqID0+IG9iai5hcHB0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgcmV0dXJuIHJlcXVlc3RUb2tlbihzY29wZSkucGlwZShcbiAgICAgICAgbWFwKHNldFRva2VuKVxuICAgICAgLCBmbGF0TWFwKHdyaXRlQ29uZmlnKVxuICAgICAgLCBtYXAoZ2V0VG9rZW4pXG4gICAgICApO1xuICB9LFxuXG4gIGZldGNoVXNlclRva2VuKHN0YXRlLCBzY29wZSkge1xuICAgIGNvbnN0IHJlcXVlc3RDb2RlICAgPSBvYmogPT4gZnJvbSh0aGlzLmdldENvZGUoeyBzdGF0ZSB9LCBvYmopKTtcbiAgICBjb25zdCByZXF1ZXN0VG9rZW4gID0gb2JqID0+IGZyb20odGhpcy5nZXRVc2VyVG9rZW4ob2JqLmF1dGhjb2RlLmNvZGUpKTtcbiAgICBjb25zdCBjb252Q29kZSAgICAgID0gb2JqID0+IFIubWVyZ2Uob2JqLCB7IGNvZGU6IGRlY29kZVVSSUNvbXBvbmVudChvYmouY29kZSkgfSk7XG4gICAgY29uc3Qgc2V0Q29kZSAgICAgICA9IG9iaiA9PiBSLm1lcmdlKGVCYXksIHsgYXV0aGNvZGU6IGNvbnZDb2RlKG9iaikgfSk7XG4gICAgY29uc3Qgc2V0VG9rZW4gICAgICA9IG9iaiA9PiBSLm1lcmdlKGVCYXksIHsgdXNlcnRva2VuOiBvYmosIHVzZXJzdGF0ZTogc3RhdGUsIHJlZnJlc2hzdGF0ZTogc3RhdGUgfSk7XG4gICAgY29uc3Qgd3JpdGVDb25maWcgICA9IG9iaiA9PiBmcm9tKHRoaXMucHV0Q29uZmlnKG9iaikpO1xuICAgIGNvbnN0IGdldFRva2VuICAgICAgPSBvYmogPT4gb2JqLnVzZXJ0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgcmV0dXJuIHJlcXVlc3RDb2RlKHNjb3BlKS5waXBlKFxuICAgICAgICBtYXAoc2V0Q29kZSlcbiAgICAgICwgZmxhdE1hcCh3cml0ZUNvbmZpZylcbiAgICAgICwgZmxhdE1hcChyZXF1ZXN0VG9rZW4pXG4gICAgICAsIG1hcChzZXRUb2tlbilcbiAgICAgICwgZmxhdE1hcCh3cml0ZUNvbmZpZylcbiAgICAgICwgbWFwKGdldFRva2VuKVxuICAgICAgKTtcbiAgfSxcblxuICBmZXRjaFJlZnJlc2hUb2tlbihzdGF0ZSwgc2NvcGUpIHtcbiAgICBjb25zdCByZXF1ZXN0VG9rZW4gID0gb2JqID0+IGZyb20odGhpcy5nZXRSZWZyZXNoVG9rZW4ob2JqKSk7XG4gICAgY29uc3Qgc2V0VG9rZW4gICAgICA9IG9iaiA9PiBSLm1lcmdlKGVCYXksIHsgdXNlcnRva2VuOiBSLm1lcmdlKGVCYXkudXNlcnRva2VuLCBvYmopLCB1c2Vyc3RhdGU6IHN0YXRlIH0pO1xuICAgIGNvbnN0IHdyaXRlQ29uZmlnICAgPSBvYmogPT4gZnJvbSh0aGlzLnB1dENvbmZpZyhvYmopKTtcbiAgICBjb25zdCBnZXRUb2tlbiAgICAgID0gb2JqID0+IG9iai51c2VydG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgIHJldHVybiByZXF1ZXN0VG9rZW4oc2NvcGUpLnBpcGUoXG4gICAgICAgIG1hcChzZXRUb2tlbilcbiAgICAgICwgZmxhdE1hcCh3cml0ZUNvbmZpZylcbiAgICAgICwgbWFwKGdldFRva2VuKVxuICAgICAgKTtcbiAgfSxcblxuICBmZXRjaFRva2VuKHNjb3BlKSB7XG4gICAgY29uc3Qgc3RhdGUgICAgICAgICAgID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBkdVVzclRva2VuICAgICAgPSBlQmF5LnVzZXJ0b2tlbi5leHBpcmVzX2luICogMTAwMCArIGVCYXkudXNlcnN0YXRlO1xuICAgIGNvbnN0IGR1UmVmVG9rZW4gICAgICA9IGVCYXkudXNlcnRva2VuLnJlZnJlc2hfdG9rZW5fZXhwaXJlc19pbiAqIDEwMDAgKyBlQmF5LnJlZnJlc2hzdGF0ZTtcbiAgICBjb25zdCBpc1VzclRva2VuICAgICAgPSAhIWVCYXkudXNlcnRva2VuLmFjY2Vzc190b2tlbjtcbiAgICBjb25zdCBpc1JlZlRva2VuICAgICAgPSAhIWVCYXkudXNlcnRva2VuLnJlZnJlc2hfdG9rZW47XG4gICAgY29uc3QgaXNVc3JBdmFpbGFibGUgID0gZHVVc3JUb2tlbiAtIHN0YXRlID4gMDtcbiAgICBjb25zdCBpc1JlZkF2YWlsYWJsZSAgPSBkdVJlZlRva2VuIC0gc3RhdGUgPiAwO1xuICAgIGxvZy5pbmZvKGRpc3BsYXlOYW1lLCAnVXNlciBUb2tlbiAoZXhpc3RlbmNlL3ZhbGlkaXR5L2R1cmF0aW9uL21vZGlmaWVkKTonXG4gICAgICAsIGlzVXNyVG9rZW4sIGlzVXNyQXZhaWxhYmxlXG4gICAgICAsIHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChkdVVzclRva2VuKSwgc3RkLmdldExvY2FsVGltZVN0YW1wKGVCYXkudXNlcnN0YXRlKSk7XG4gICAgbG9nLmluZm8oZGlzcGxheU5hbWUsICdSZWZyZXNoIFRva2VuIChleGlzdGVuY2UvdmFsaWRpdHkvZHVyYXRpb24vbW9kaWZpZWQpOidcbiAgICAgICwgaXNSZWZUb2tlbiwgaXNSZWZBdmFpbGFibGVcbiAgICAgICwgc3RkLmdldExvY2FsVGltZVN0YW1wKGR1UmVmVG9rZW4pLCBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoZUJheS5yZWZyZXNoc3RhdGUpKTtcbiAgICByZXR1cm4gIWlzVXNyVG9rZW4gJiYgaXNSZWZUb2tlbiBcbiAgICAgID8gaXNVc3JBdmFpbGFibGVcbiAgICAgICAgPyBmcm9tKFsgZUJheS51c2VydG9rZW4uYWNjZXNzX3Rva2VuIF0pXG4gICAgICAgIDogaXNSZWZBdmFpbGFibGVcbiAgICAgICAgICA/IHRoaXMuZmV0Y2hSZWZyZXNoVG9rZW4oc3RhdGUsIHNjb3BlKSBcbiAgICAgICAgICA6IHRoaXMuZmV0Y2hVc2VyVG9rZW4oc3RhdGUsIHNjb3BlKVxuICAgICAgOiB0aGlzLmZldGNoVXNlclRva2VuKHN0YXRlLCBzY29wZSlcbiAgICA7IFxuICB9LFxuXG4gIHdyaXRlSW52ZW50b3J5SXRlbXMob3B0aW9ucykge1xuICAgIGNvbnN0IHNjb3BlID0gWyBcbiAgICAgICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUnXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwubWFya2V0aW5nLnJlYWRvbmx5J1xuICAgICwgJ2h0dHBzOi8vYXBpLmViYXkuY29tL29hdXRoL2FwaV9zY29wZS9zZWxsLm1hcmtldGluZydcbiAgICAsICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUvc2VsbC5pbnZlbnRvcnkucmVhZG9ubHknXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwuaW52ZW50b3J5J1xuICAgICwgJ2h0dHBzOi8vYXBpLmViYXkuY29tL29hdXRoL2FwaV9zY29wZS9zZWxsLmFjY291bnQucmVhZG9ubHknXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwuYWNjb3VudCdcbiAgICAsICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUvc2VsbC5mdWxmaWxsbWVudC5yZWFkb25seSdcbiAgICAsICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUvc2VsbC5mdWxmaWxsbWVudCdcbiAgICAsICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUvc2VsbC5hbmFseXRpY3MucmVhZG9ubHknXG4gICAgXTtcbiAgICBjb25zdCBzdHJlYW1JdGVtcyAgID0gb2JqID0+IGZyb20odGhpcy5nZXRJbnZlbnRvcnlJdGVtcyhvcHRpb25zLCBvYmopKTtcbiAgLy8gIGNvbnN0IHN0cmVhbURldGFpbCAgPSBvYmpzICA9PiBmcm9tKHRoaXMuZ2V0SXRlbURldGFpbHMob2JqcykpO1xuICAvLyAgY29uc3QgZm9ya0l0ZW1zICAgICA9IG9iaiAgID0+IGZvcmtKb2luKHRoaXMuZm9ySW52ZW50b3J5SXRlbXMob3B0aW9ucywgb2JqKSk7XG4gIC8vICBjb25zdCBmb3JrSlNPTiAgICAgID0gb2JqICAgPT4gZm9ya0pvaW4odXRpbC50b0pTT04ob2JqKSk7XG4gICAgcmV0dXJuIHRoaXMuZmV0Y2hUb2tlbihzY29wZSkucGlwZShcbiAgICAgICAgZmxhdE1hcChzdHJlYW1JdGVtcylcbiAgICAgICwgbWFwKFIudGFwKHRoaXMubG9nVHJhY2UuYmluZCh0aGlzKSkpXG4gIC8vICAgICAgbWFwKHRoaXMucmVzSW52ZW50b3J5SXRlbXMpXG4gIC8vICAgICwgZmxhdE1hcChmb3JrSXRlbXMpXG4gIC8vICAgICwgbWFwKFIubWFwKHRoaXMucmVzSW52ZW50b3J5SXRlbXMuYmluZCh0aGlzKSkpXG4gIC8vICAgICwgbWFwKFIubWFwKHRoaXMuc2V0SXRlbXMuYmluZCh0aGlzKSkpXG4gIC8vICAgICwgbWFwKFIuZmxhdHRlbilcbiAgLy8gICAgLCBmbGF0TWFwKGZyb20pXG4gIC8vICAgICwgZmxhdE1hcChzdHJlYW1EZXRhaWwpXG4gIC8vICAgICwgZmxhdE1hcChmb3JrSlNPTilcbiAgLy8gICAgLCBtYXAoUi5tYXAodGhpcy5yZXNEZXRhaWwuYmluZCh0aGlzKSkpXG4gIC8vICAgICwgbWFwKFIubWFwKHRoaXMuc2V0RGV0YWlsLmJpbmQodGhpcykpKVxuICAvLyAgICAsIG1hcChSLmZpbHRlcihSLmN1cnJ5KHRoaXMuZmlsdGVyRGV0YWlsLmJpbmQodGhpcykpKG9wdGlvbnMpKSlcbiAgLy8gICAgLCBtYXAoUi5tYXAodGhpcy5yZW5kZXJEZXRhaWwuYmluZCh0aGlzKSkpXG4gIC8vICAgICwgbWFwKFIubWFwKHV0aWwudG9DU1YuYmluZCh0aGlzKSkpXG4gIC8vICAgICwgbWFwKFIubWFwKGNzdiA9PiBjc3YgKyAnXFxuJykpXG4gICAgKVxuICAgIDtcbiAgfSxcbiAgXG4gIGZvckl0ZW1zKG9wdGlvbnMsIHJlcykge1xuICAgIGNvbnN0IHBhZ2VzID0gTnVtYmVyKG9wdGlvbnMucGFnZXMpO1xuICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVzLnBhZ2luYXRpb25PdXRwdXRbMF0udG90YWxQYWdlc1swXSkgPCBwYWdlc1xuICAgICAgPyBOdW1iZXIocmVzLnBhZ2luYXRpb25PdXRwdXRbMF0udG90YWxQYWdlc1swXSkgOiBwYWdlcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IFtdO1xuICAgIGZvcihsZXQgaWR4PTE7IGlkeCA8PSBwYWdlOyBpZHgrKykge1xuICAgICAgbmV3SXRlbXMucHVzaCh0aGlzLmdldEl0ZW1zKG9wdGlvbnMsIGlkeCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH0sXG4gIFxuICBmb3JDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIHJlcykge1xuICAgIGNvbnN0IHBhZ2VzID0gTnVtYmVyKG9wdGlvbnMucGFnZXMpO1xuICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVzLnBhZ2luYXRpb25PdXRwdXRbMF0udG90YWxQYWdlc1swXSkgPCBwYWdlc1xuICAgICAgPyBOdW1iZXIocmVzLnBhZ2luYXRpb25PdXRwdXRbMF0udG90YWxQYWdlc1swXSkgOiBwYWdlcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IFtdO1xuICAgIGZvcihsZXQgaWR4PTE7IGlkeCA8PSBwYWdlOyBpZHgrKykge1xuICAgICAgbmV3SXRlbXMucHVzaCh0aGlzLmdldENvbXBsZXRlSXRlbXMob3B0aW9ucywgaWR4KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfSxcbiAgXG4gIGZvclByb2R1Y3RzSXRlbXMob3B0aW9ucywgcmVzKSB7XG4gICAgY29uc3QgcGFnZXMgPSBOdW1iZXIob3B0aW9ucy5wYWdlcyk7XG4gICAgY29uc3QgcGFnZSA9IE51bWJlcihyZXMucGFnaW5hdGlvbk91dHB1dFswXS50b3RhbFBhZ2VzWzBdKSA8IHBhZ2VzXG4gICAgICA/IE51bWJlcihyZXMucGFnaW5hdGlvbk91dHB1dFswXS50b3RhbFBhZ2VzWzBdKSA6IHBhZ2VzO1xuICAgIGNvbnN0IG5ld0l0ZW1zID0gW107XG4gICAgZm9yKGxldCBpZHg9MTsgaWR4IDw9IHBhZ2U7IGlkeCsrKSB7XG4gICAgICBuZXdJdGVtcy5wdXNoKHRoaXMuZ2V0UHJvZHVjdHNJdGVtcyhvcHRpb25zLCBpZHgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9LFxuICBcbiAgcmVzSXRlbXMob2JqKSB7XG4gICAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eSgnZmluZEl0ZW1zQnlLZXl3b3Jkc1Jlc3BvbnNlJykgXG4gICAgICA/IG9iai5maW5kSXRlbXNCeUtleXdvcmRzUmVzcG9uc2VbMF0gOiBudWxsO1xuICB9LFxuICBcbiAgcmVzQ29tcGxldGVJdGVtcyhvYmopIHtcbiAgICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KCdmaW5kQ29tcGxldGVkSXRlbXNSZXNwb25zZScpIFxuICAgICAgPyBvYmouZmluZENvbXBsZXRlZEl0ZW1zUmVzcG9uc2VbMF0gOiBudWxsO1xuICB9LFxuICBcbiAgcmVzUHJvZHVjdHNJdGVtcyhvYmopIHtcbiAgICByZXR1cm4gb2JqLmhhc093blByb3BlcnR5KCdmaW5kSXRlbXNCeVByb2R1Y3RSZXNwb25zZScpIFxuICAgICAgPyBvYmouZmluZEl0ZW1zQnlQcm9kdWN0UmVzcG9uc2VbMF0gOiBudWxsO1xuICB9LFxuICBcbiAgc2V0SXRlbXMob2JqKSB7XG4gICAgcmV0dXJuICBvYmogJiYgb2JqLmFja1swXSA9PT0gJ1N1Y2Nlc3MnXG4gICAgICA/IG9iai5zZWFyY2hSZXN1bHRbMF0uaXRlbSA6IG51bGw7XG4gIH0sXG5cbiAgb3B0Q29kZShvLCBwKSB7XG4gICAgY29uc3QgX28gPSBvO1xuICAgIGNvbnN0IF9wID0gcCA/IHAgOiB7fTtcbiAgICBjb25zdCBzZWFyY2ggPSBuZXcgT2JqZWN0KCk7XG4gICAgc2VhcmNoWydjbGllbnRfaWQnXSA9IF9vLmFwcGlkO1xuICAgIHNlYXJjaFsncmVkaXJlY3RfdXJpJ10gPSBfby5ydW5hbWU7XG4gICAgc2VhcmNoWydyZXNwb25zZV90eXBlJ10gPSBfby5vcGVyYXRpb247XG4gICAgc2VhcmNoWydzY29wZSddID0gUi5qb2luKCcgJywgX28uc2NvcGUpO1xuICAgIHNlYXJjaFsnc3RhdGUnXSA9IF9wLnN0YXRlO1xuICAgIHJldHVybiB7IHNlYXJjaCwgb3BlcmF0aW9uOiBfby5vcGVyYXRpb24sIHN0YXRlOiBfcC5zdGF0ZSB9O1xuICB9LFxuXG4gIG9wdEl0ZW1zKG8sIHApIHtcbiAgICBjb25zdCBfbyA9IG87XG4gICAgY29uc3QgX3AgPSBwID8gcCA6IHt9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgT2JqZWN0KCk7XG4gICAgb3B0aW9uc1snR0xPQkFMLUlEJ10gPSAnRUJBWS1VUyc7XG4gICAgb3B0aW9uc1snTUVTU0FHRS1FTkNPRElORyddID0gJ1VURi04JztcbiAgICBvcHRpb25zWydPUEVSQVRJT04tTkFNRSddID0gX28ub3BlcmF0aW9uO1xuICAgIG9wdGlvbnNbJ1JFUVVFU1QtREFUQS1GT1JNQVQnXSA9ICdOVic7XG4gICAgb3B0aW9uc1snUkVTUE9OU0UtREFUQS1GT1JNQVQnXSA9ICdKU09OJztcbiAgICBvcHRpb25zWydSRVNULVBBWUxPQUQnXSA9ICcnO1xuICAgIG9wdGlvbnNbJ1NFQ1VSSVRZLUFQUE5BTUUnXSA9IF9vLmFwcGlkO1xuICAgIG9wdGlvbnNbJ1NFUlZJQ0UtVkVSU0lPTiddID0gJzEuMTMuMCc7XG4gICAgb3B0aW9uc1snb3V0cHV0U2VsZWN0b3InXSA9ICdTZWxsZXJJbmZvJztcbiAgICBvcHRpb25zWydwYWdpbmF0aW9uSW5wdXQuZW50cmllc1BlclBhZ2UnXSA9IDEwMDtcbiAgICBvcHRpb25zWydwYWdpbmF0aW9uSW5wdXQucGFnZU51bWJlciddID0gX28ucGFnZTtcblxuICAgIGlmKF9wLnNlYXJjaFN0cmluZykge1xuICAgICAgb3B0aW9uc1sna2V5d29yZHMnXSA9IF9wLnNlYXJjaFN0cmluZztcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9uc1sna2V5d29yZHMnXSA9ICcnO1xuICAgIH1cblxuICAgIGxldCBuID0gMDtcbiAgICBpZihfcC5zZWxsZXIgJiYgX3Auc2VsbGVyLmxlbmd0aCkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnU2VsbGVyJztcbiAgICAgIF9wLnNlbGxlci5mb3JFYWNoKChzbHIsIGlkeCkgPT5cbiAgICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgnICtpZHgrICcpJ10gPSBzbHIpO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIGlmKF9wLmhpZ2hlc3RQcmljZSkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnTWF4UHJpY2UnO1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgwKSddXG4gICAgICAgID0gX3AuaGlnaGVzdFByaWNlO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIGlmKF9wLmxvd2VzdFByaWNlKSB7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLm5hbWUnXSA9ICdNaW5QcmljZSc7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKDApJ10gPSBfcC5sb3dlc3RQcmljZTtcbiAgICAgIG4rKztcbiAgICB9XG4gICAgXG4gICAgaWYoX3AuY29uZGl0aW9uICYmIF9wLmNvbmRpdGlvbi5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ0NvbmRpdGlvbic7XG4gICAgICBfcC5jb25kaXRpb24uZm9yRWFjaCgoY2RuLCBpZHgpID0+IFxuICAgICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKCcgK2lkeCsgJyknXSA9IGNkbik7XG4gICAgICBuKys7XG4gICAgfVxuXG4gICAgaWYoX3Auc29sZEl0ZW1Pbmx5ID09PSB0cnVlKSB7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLm5hbWUnXSA9ICdTb2xkSXRlbU9ubHknO1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgwKSddID0gJ3RydWUnO1xuICAgICAgbisrO1xuICAgIH1cbiAgICBcbiAgICBpZihzdGQuaXNWYWxpZERhdGUoX3Auc3RhcnREYXRlKSkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnRW5kVGltZUZyb20nO1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgwKSddXG4gICAgICAgID0gc3RkLnNldFRpbWVTdGFtcChfcC5zdGFydERhdGUpO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIGlmKHN0ZC5pc1ZhbGlkRGF0ZShfcC5lbmREYXRlKSkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnRW5kVGltZVRvJztcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoMCknXVxuICAgICAgICA9IHN0ZC5zZXRUaW1lU3RhbXAoX3AuZW5kRGF0ZSk7XG4gICAgICBuKys7XG4gICAgfVxuICAgIFxuICAgIC8vbG9nLnRyYWNlKGRpc3BsYXlOYW1lLCAnb3B0SXRlbXM6Jywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH0sXG5cbiAgb3B0UHJvZHVjdHMobywgcCkge1xuICAgIGNvbnN0IF9vID0gbztcbiAgICBjb25zdCBfcCA9IHAgPyBwIDoge307XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5ldyBPYmplY3QoKTtcbiAgICBvcHRpb25zWydHTE9CQUwtSUQnXSA9ICdFQkFZLVVTJztcbiAgICBvcHRpb25zWydNRVNTQUdFLUVOQ09ESU5HJ10gPSAnVVRGLTgnO1xuICAgIG9wdGlvbnNbJ09QRVJBVElPTi1OQU1FJ10gPSBfby5vcGVyYXRpb247XG4gICAgb3B0aW9uc1snUkVRVUVTVC1EQVRBLUZPUk1BVCddID0gJ05WJztcbiAgICBvcHRpb25zWydSRVNQT05TRS1EQVRBLUZPUk1BVCddID0gJ0pTT04nO1xuICAgIG9wdGlvbnNbJ1JFU1QtUEFZTE9BRCddID0gJyc7XG4gICAgb3B0aW9uc1snU0VDVVJJVFktQVBQTkFNRSddID0gX28uYXBwaWQ7XG4gICAgb3B0aW9uc1snU0VSVklDRS1WRVJTSU9OJ10gPSAnMS4xMy4wJztcbiAgICBvcHRpb25zWydvdXRwdXRTZWxlY3RvciddID0gJ1NlbGxlckluZm8nO1xuICAgIG9wdGlvbnNbJ3BhZ2luYXRpb25JbnB1dC5lbnRyaWVzUGVyUGFnZSddID0gMTA7XG4gICAgb3B0aW9uc1sncGFnaW5hdGlvbklucHV0LnBhZ2VOdW1iZXInXSA9IF9vLnBhZ2U7XG5cbiAgICBpZihfcC5wcm9kdWN0SWQgJiYgX3AucHJvZHVjdFR5cGUpIHtcbiAgICAgIG9wdGlvbnNbJ3Byb2R1Y3RJZCddID0gX3AucHJvZHVjdElkO1xuICAgICAgb3B0aW9uc1sncHJvZHVjdElkLkB0eXBlJ10gPSBfcC5wcm9kdWN0VHlwZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9uc1sncHJvZHVjdElkJ10gPSAnJztcbiAgICAgIG9wdGlvbnNbJ3Byb2R1Y3RJZC5AdHlwZSddID0gJyc7XG4gICAgfVxuXG4gICAgbGV0IG4gPSAwO1xuICAgIGlmKF9wLnNlbGxlciAmJiBfcC5zZWxsZXIubGVuZ3RoKSB7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLm5hbWUnXSA9ICdTZWxsZXInO1xuICAgICAgX3Auc2VsbGVyLmZvckVhY2goKHNsciwgaWR4KSA9PlxuICAgICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKCcgK2lkeCsgJyknXSA9IHNscik7XG4gICAgICBuKys7XG4gICAgfVxuXG4gICAgaWYoX3AuaGlnaGVzdFByaWNlKSB7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLm5hbWUnXSA9ICdNYXhQcmljZSc7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKDApJ11cbiAgICAgICAgPSBfcC5oaWdoZXN0UHJpY2U7XG4gICAgICBuKys7XG4gICAgfVxuXG4gICAgaWYoX3AubG93ZXN0UHJpY2UpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ01pblByaWNlJztcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoMCknXSA9IF9wLmxvd2VzdFByaWNlO1xuICAgICAgbisrO1xuICAgIH1cbiAgICBcbiAgICBpZihfcC5jb25kaXRpb24gJiYgX3AuY29uZGl0aW9uLmxlbmd0aCkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnQ29uZGl0aW9uJztcbiAgICAgIF9wLmNvbmRpdGlvbi5mb3JFYWNoKChjZG4sIGlkeCkgPT4gXG4gICAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoJyAraWR4KyAnKSddID0gY2RuKTtcbiAgICAgIG4rKztcbiAgICB9XG5cbiAgICAvL2xvZy50cmFjZShkaXNwbGF5TmFtZSwgJ29wdFByb2R1Y3RzOicsIG9wdGlvbnMpO1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9LFxuXG4gIGxvZ1RyYWNlKG9iaikge1xuICAgIHJldHVybiBsb2cudHJhY2UoZGlzcGxheU5hbWUsICdUcmFjZSBsb2c6Jywgb2JqKTtcbiAgfSxcblxuICBsb2dFcnJvcihlcnIpIHtcbiAgICByZXR1cm4gbG9nLmVycm9yKGRpc3BsYXlOYW1lLCAnRXJyb3Igb2NjdXJyZWQ6JywgZXJyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUmVkdWNlU3RvcmUgfSAgZnJvbSAnZmx1eC91dGlscyc7XG5pbXBvcnQgZGlzcGF0Y2hlciAgICAgICBmcm9tICdNYWluL2Rpc3BhdGNoZXInO1xuaW1wb3J0IHsgbG9nIH0gICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY2xhc3MgQXBwU3RvcmUgZXh0ZW5kcyBSZWR1Y2VTdG9yZSB7XG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0ZWQ6IDBcbiAgICAgICwgdGl0bGU6ICcnXG4gICAgICAsIGNvbmZpZzoge1xuICAgICAgICAgIHNlbGVjdGVkOiAnJ1xuICAgICAgICAsIHRpdGxlOiAgICAnJ1xuICAgICAgICAsIGFwcGlkOiAgICAnJ1xuICAgICAgICAsIGNlcnRpZDogICAnJ1xuICAgICAgICAsIHRva2VuOiAgICAnJ1xuICAgICAgICAsIHJ1bmFtZTogICAnJ1xuICAgICAgICAsIGF1dGhvcml6ZUFwaTogJydcbiAgICAgICAgLCBvYXV0aDJBcGk6ICAgICcnXG4gICAgICAgICwgZmluZGluZ0FwaTogICAnJ1xuICAgICAgICAsIHRyYWRpbmdBcGk6ICAgJydcbiAgICAgICAgLCBpbnZlbnRvcnlBcGk6ICcnXG4gICAgICAgICwgbWFya2V0aW5nQXBpOiAnJ1xuICAgICAgICAsIGFuYWx5dGljc0FwaTogJydcbiAgICAgICAgLCBhdXRoY29kZTogbnVsbFxuICAgICAgICAsIHVzZXJ0b2tlbjogbnVsbFxuICAgICAgICB9XG4gICAgICAsIG9wdGlvbnM6IG51bGxcbiAgICAgIH07XG4gIH1cbiAgXG4gIHJlZHVjZShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSAnY29udGVudC9zZWxlY3QnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgc2VsZWN0ZWQ6IGFjdGlvbi5zZWxlY3RlZCwgdGl0bGU6IGFjdGlvbi50aXRsZSB9KTtcbiAgICAgIGNhc2UgJ2NvbmZpZy9mZXRjaC9hcHBpZCc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBjb25maWc6IGFjdGlvbi5jb25maWcgfSk7XG4gICAgICBjYXNlICdjb25maWcvd3JpdGUvYXBwaWQnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29uZmlnOiBhY3Rpb24uY29uZmlnIH0pO1xuICAgICAgY2FzZSAnaXRlbS93cml0ZS9pbnZlbnRvcnknOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgb3B0aW9uczogYWN0aW9uLm9wdGlvbnMgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbmV3IEFwcFN0b3JlKGRpc3BhdGNoZXIpO1xuIiwiaW1wb3J0IHsgUmVkdWNlU3RvcmUgfSAgZnJvbSAnZmx1eC91dGlscyc7XG5pbXBvcnQgZGlzcGF0Y2hlciAgICAgICBmcm9tICdNYWluL2Rpc3BhdGNoZXInO1xuaW1wb3J0IHsgbG9nIH0gICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgZGlzcGxheU5hbWUgPSBgY29tcGxldGVTdG9yZWA7XG5cbmNsYXNzIENvbXBsZXRlU3RvcmUgZXh0ZW5kcyBSZWR1Y2VTdG9yZSB7XG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogICAgICAgICAgICAgMCBcbiAgICAgICwgaXRlbXM6ICAgICAgICAgIG51bGxcbiAgICAgICwgb3B0aW9uczoge1xuICAgICAgICBzZWFyY2hTdHJpbmc6ICAgJydcbiAgICAgICAgLCBwYWdlczogICAgICAgICcnXG4gICAgICAgICwgaGlnaGVzdFByaWNlOiAnJ1xuICAgICAgICAsIGxvd2VzdFByaWNlOiAgJydcbiAgICAgICAgLCBzaGlwcGluZzogICAgIFtdXG4gICAgICAgICwgY29uZGl0aW9uOiAgICBbXVxuICAgICAgICAsIHN0YXR1czogICAgICAgW11cbiAgICAgICAgLCBpdGVtSWQ6ICAgICAgIFtdXG4gICAgICAgICwgY2F0ZWdvcnlQYXRoOiBbXVxuICAgICAgICAsIHNlbGxlcjogICAgICAgW11cbiAgICAgICAgLCBzb2xkSXRlbU9ubHk6IGZhbHNlXG4gICAgICAgICwgc3RhcnREYXRlOiAgICAnJ1xuICAgICAgICAsIGVuZERhdGU6ICAgICAgJydcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIFxuICByZWR1Y2Uoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2l0ZW0vZmV0Y2gvY29tcGxldGUnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGVcbiAgICAgICAgICAsIHsgaXRlbXM6IGFjdGlvbi5pdGVtcywgb3B0aW9uczogYWN0aW9uLm9wdGlvbnNcbiAgICAgICAgICAgICwgcGFnZTogYWN0aW9uLnBhZ2UgfSk7XG4gICAgICBjYXNlICdpdGVtL3dyaXRlL2NvbXBsZXRlJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlXG4gICAgICAgICAgLCB7IG9wdGlvbnM6IGFjdGlvbi5vcHRpb25zIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgQ29tcGxldGVTdG9yZShkaXNwYXRjaGVyKTtcbiIsImltcG9ydCB7IFJlZHVjZVN0b3JlIH0gIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IGRpc3BhdGNoZXIgICAgICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IGRpc3BsYXlOYW1lID0gYG5vdGVTdG9yZWA7XG5cbmNsYXNzIE5vdGVTdG9yZSBleHRlbmRzIFJlZHVjZVN0b3JlIHtcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiAgICAgICAgICAgICAwIFxuICAgICAgLCBpdGVtczogICAgICAgICAgbnVsbFxuICAgICAgLCBvcHRpb25zOiB7XG4gICAgICAgIHNlYXJjaFN0cmluZzogICAnJ1xuICAgICAgICAsIHBhZ2VzOiAgICAgICAgJycgXG4gICAgICAgICwgaGlnaGVzdFByaWNlOiAnJ1xuICAgICAgICAsIGxvd2VzdFByaWNlOiAgJydcbiAgICAgICAgLCBzaGlwcGluZzogICAgIFtdXG4gICAgICAgICwgY29uZGl0aW9uOiAgICBbXVxuICAgICAgICAsIHN0YXR1czogICAgICAgW11cbiAgICAgICAgLCBpdGVtSWQ6ICAgICAgIFtdXG4gICAgICAgICwgY2F0ZWdvcnlQYXRoOiBbXVxuICAgICAgICAsIHNlbGxlcjogICAgICAgW11cbiAgICAgICAgLCBzdGFydERhdGU6ICAgICcnXG4gICAgICAgICwgZW5kRGF0ZTogICAgICAnJ1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgXG4gIHJlZHVjZShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSAnaXRlbS9mZXRjaC9ub3RlJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGl0ZW1zOiBhY3Rpb24uaXRlbXMsIG9wdGlvbnM6IGFjdGlvbi5vcHRpb25zLCBwYWdlOiBhY3Rpb24ucGFnZSB9KTtcbiAgICAgIGNhc2UgJ2l0ZW0vd3JpdGUvbm90ZSc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBvcHRpb25zOiBhY3Rpb24ub3B0aW9ucyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IE5vdGVTdG9yZShkaXNwYXRjaGVyKTtcbiIsImltcG9ydCB7IFJlZHVjZVN0b3JlIH0gIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IGRpc3BhdGNoZXIgICAgICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IGRpc3BsYXlOYW1lID0gYHByb2R1Y3RzU3RvcmVgO1xuXG5jbGFzcyBQcm9kdWN0c1N0b3JlIGV4dGVuZHMgUmVkdWNlU3RvcmUge1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6ICAgICAgICAgICAgIDBcbiAgICAgICwgaXRlbXM6ICAgICAgICAgIG51bGxcbiAgICAgICwgb3B0aW9uczoge1xuICAgICAgICBwcm9kdWN0SWQ6ICAgICAgJydcbiAgICAgICAgLCBwcm9kdWN0VHlwZTogICcnXG4gICAgICAgICwgcGFnZXM6ICAgICAgICAnJ1xuICAgICAgICAsIGhpZ2hlc3RQcmljZTogJydcbiAgICAgICAgLCBsb3dlc3RQcmljZTogICcnXG4gICAgICAgICwgc2hpcHBpbmc6ICAgICBbXVxuICAgICAgICAsIGNvbmRpdGlvbjogICAgW11cbiAgICAgICAgLCBzdGF0dXM6ICAgICAgIFtdXG4gICAgICAgICwgaXRlbUlkOiAgICAgICBbXVxuICAgICAgICAsIGNhdGVnb3J5UGF0aDogW11cbiAgICAgICAgLCBzZWxsZXI6ICAgICAgIFtdXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBcbiAgcmVkdWNlKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlICdpdGVtL2ZldGNoL3Byb2R1Y3RzJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlXG4gICAgICAgICAgLCB7IGl0ZW1zOiBhY3Rpb24uaXRlbXMsIG9wdGlvbnM6IGFjdGlvbi5vcHRpb25zXG4gICAgICAgICAgICAsIHBhZ2U6IGFjdGlvbi5wYWdlIH0pO1xuICAgICAgY2FzZSAnaXRlbS93cml0ZS9wcm9kdWN0cyc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZVxuICAgICAgICAgICwgeyBvcHRpb25zOiBhY3Rpb24ub3B0aW9ucyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IFByb2R1Y3RzU3RvcmUoZGlzcGF0Y2hlcik7XG4iLCJpbXBvcnQgKiBhcyBSICBmcm9tICdyYW1kYSc7XG5pbXBvcnQgZnMgICAgICBmcm9tICdmcyc7XG5pbXBvcnQgeyBpcGNSZW5kZXJlciwgcmVtb3RlIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHN0ZCAgICAgZnJvbSAnVXRpbGl0aWVzL3N0ZHV0aWxzJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNsYXNzIGlwYyB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB9XG5cbiAgc2V0IHByb3BzKHByb3BzKSB7XG4gICAgdGhpcy5fcHJvcHMgPSBwcm9wcztcbiAgfVxuXG4gIGdldCBwcm9wcygpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvcHM7XG4gIH1cblxuICBzZW5kKHJlcXVlc3QsIGNhbGxiYWNrKSB7XG4gICAgaXBjUmVuZGVyZXIub24oJ2FzeW5jaHJvbm91cy1yZXBseScsIChldmVudCwgeyBlcnJvciwgcmVzcG9uc2UgfSkgPT4ge1xuICAgICAgaWYoZXJyb3IpIHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gICAgICB0aGlzLnNldFByb3BzKHsgZXZlbnQgfSk7XG4gICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgfSk7XG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnYXN5bmNocm9ub3VzLW1lc3NhZ2UnLCByZXF1ZXN0KTtcbiAgfVxuXG4gIHNlbmRTeW5jKHJlcXVlc3QpIHtcbiAgICBjb25zdCB7IGVycm9yLCByZXNwb25zZSB9ID0gaXBjUmVuZGVyZXIuc2VuZFN5bmMoJ3N5bmNocm9ub3VzLW1lc3NhZ2UnLCByZXF1ZXN0KTtcbiAgICBpZihlcnJvcikgcmV0dXJuIGVycm9yO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxuXG4gIHNldFN0YXRlKHN0YXRlKSB7XG4gICAgdGhpcy5zdGF0ZSA9IFIubWVyZ2UodGhpcy5zdGF0ZSwgc3RhdGUpO1xuICB9XG5cbiAgc2V0UHJvcHMocHJvcHMpIHtcbiAgICB0aGlzLnByb3BzID0gUi5tZXJnZSh0aGlzLnByb3BzLCBwcm9wcyk7XG4gIH1cbn07XG5pcGMuZGlzcGxheU5hbWUgPSAnaXBjJztcblxuY2xhc3MgZmV0Y2ggZXh0ZW5kcyBpcGMge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0geyB1cmw6IHByb3BzLnVybCwgcmVzcG9uc2U6ICcnIH07XG4gIH1cblxuICBzdGF0aWMgb2YocHJvcHMpIHtcbiAgICBwcm9wcyA9IFIuaXMoT2JqZWN0LCBwcm9wcykgPyBwcm9wcyA6IHsgdXJsOiBwcm9wcyB9O1xuICAgIHJldHVybiBuZXcgZmV0Y2gocHJvcHMpO1xuICB9XG5cbiAgYXV0aChyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHsgdXJsIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgc2VhcmNoIH0gPSByZXF1ZXN0O1xuICAgIGNvbnN0IGF1dGhVcmwgPSBzZWFyY2ggPyB1cmwgKyAnPycgKyBzdGQudXJsZW5jb2RlKHNlYXJjaCkgOiB1cmw7XG4gICAgLy9sb2cuaW5mbyhmZXRjaC5kaXNwbGF5TmFtZSwgJ2F1dGhVcmwnLCBhdXRoVXJsKTtcbiAgICBjb25zdCBCcm93c2VyV2luZG93ID0gcmVtb3RlLkJyb3dzZXJXaW5kb3c7XG4gICAgY29uc3QgYXV0aFdpbmRvdyA9IG5ldyBCcm93c2VyV2luZG93KHsgd2lkdGg6IDgwMCwgaGVpZ2h0OiA2MDAsIHNob3c6IGZhbHNlXG4gICAgLCB3ZWJQcmVmZXJlbmNlczogeyBub2RlSW50ZWdyYXRpb246IGZhbHNlLCB3ZWJTZWN1cml0eTogZmFsc2UgfSBcbiAgICB9KTtcbiAgICBjb25zdCBoYW5kbGVDaGFuZ2VVcmwgPSBuZXdVcmwgPT4ge1xuICAgICAgLy9sb2cuaW5mbyhmZXRjaC5kaXNwbGF5TmFtZSwgJ25ld1VybCcsIG5ld1VybCk7XG4gICAgICBjb25zdCByYXdfY29kZSAgPSAvY29kZT0oW14mXSopLy5leGVjKG5ld1VybCkgfHwgbnVsbDtcbiAgICAgIGNvbnN0IHJhd19zdGF0ZSA9IC9zdGF0ZT0oW14mXSopLy5leGVjKG5ld1VybCkgfHwgbnVsbDtcbiAgICAgIGNvbnN0IHJhd19leHBpcmUgPSAvZXhwaXJlc19pbj0oW14mXSopLy5leGVjKG5ld1VybCkgfHwgbnVsbDtcbiAgICAgIGNvbnN0IGNvZGUgPSAocmF3X2NvZGUgJiYgcmF3X2NvZGUubGVuZ3RoID4gMSkgPyByYXdfY29kZVsxXSA6IG51bGw7XG4gICAgICBjb25zdCBzdGF0ZSA9IChyYXdfc3RhdGUgJiYgcmF3X3N0YXRlLmxlbmd0aCA+IDEpID8gcmF3X3N0YXRlWzFdIDogbnVsbDtcbiAgICAgIGNvbnN0IGV4cGlyZXNfaW4gPSAocmF3X2V4cGlyZSAmJiByYXdfZXhwaXJlLmxlbmd0aCA+IDEpID8gcmF3X2V4cGlyZVsxXSA6IG51bGw7XG4gICAgICBpZiAoY29kZSAmJiBzdGF0ZSAmJiBleHBpcmVzX2luKSB7XG4gICAgICAgIGF1dGhXaW5kb3cuZGVzdHJveSgpO1xuICAgICAgICBpZiAoTnVtYmVyKHN0YXRlKSA9PT0gcmVxdWVzdC5zdGF0ZSkgY2FsbGJhY2sobnVsbCwgeyBjb2RlLCBzdGF0ZSwgZXhwaXJlc19pbiB9KTtcbiAgICAgICAgY2FsbGJhY2soeyBuYW1lOiAnRXJyb3InLCBtZXNzYWdlOiAnVGhpcyByZWRpcmVjdCBwYWdlIHdhcyBub3QgdGhlIGV4cGVjdGVkIHN0YXR1cy4nIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgYXV0aFdpbmRvdy53ZWJDb250ZW50cy5vbignZGlkLWZpbmlzaC1sb2FkJywgKCkgPT4gaGFuZGxlQ2hhbmdlVXJsKGF1dGhXaW5kb3cud2ViQ29udGVudHMuZ2V0VVJMKCkpKTtcbiAgICBhdXRoV2luZG93Lm9uY2UoJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiBhdXRoV2luZG93LnNob3coKSk7XG4gICAgYXV0aFdpbmRvdy5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICBhdXRoV2luZG93LmhpZGUoKTtcbiAgICAgIGNhbGxiYWNrKHsgbmFtZTogJ0NhbmNlbGVkJywgbWVzc2FnZTogJ0NvbnRlbnQgd2FzIGluY29tcGxldGUuIFBsZWFzZSBjaGVjayB0aGUgY29udGVudHMgb25jZSBhZ2Fpbi4nIH0pO1xuICAgIH0pO1xuICAgIGF1dGhXaW5kb3cubG9hZFVSTChhdXRoVXJsKTtcbiAgfVxuXG4gIGdldChyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIGNvbnN0IHsgdXJsIH0gPSB0aGlzLnN0YXRlO1xuICAgIHRoaXMuc2VuZChSLm1lcmdlKHsgdXJsLCBtZXRob2Q6ICdHRVQnIH0sIHJlcXVlc3QpLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZihlcnJvcikgcmV0dXJuIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyByZXNwb25zZSB9KTtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBvc3QocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB7IHVybCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNlbmQoUi5tZXJnZSh7IHVybCwgbWV0aG9kOiAnUE9TVCcgfSwgcmVxdWVzdCksIChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGlmKGVycm9yKSByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHJlc3BvbnNlIH0pO1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgX3Bvc3QocmVxdWVzdCkge1xuICAgIGNvbnN0IHsgdXJsIH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5zZW5kU3luYyhSLm1lcmdlKHsgdXJsLCBtZXRob2Q6ICdQT1NUJyB9LCByZXF1ZXN0KSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHJlc3BvbnNlIH0pO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfVxufTtcbmZldGNoLmRpc3BsYXlOYW1lID0gJ2ZldGNoJztcblxuY29uc3Qgd2luID0ge1xuICBkaXNwbGF5TmFtZTogJ3dpbicsXG4gIHNob3dTYXZlRGlhbG9nKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGl0bGUgPSAnU2F2ZSc7XG4gICAgbG9nLmluZm8od2luLmRpc3BsYXlOYW1lLCAnc2hvd1NhdmVEaWFsb2cnLCB0aXRsZSlcbiAgICBjb25zdCBjdXJyZW50ID0gcmVtb3RlLmdldEN1cnJlbnRXaW5kb3coKTtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgdGl0bGVcbiAgICAsIGZpbHRlcnM6IFtcbiAgICAgICAgeyBuYW1lOiAnQ1NWIEZpbGUnLCBleHRlbnNpb25zOiBbJ2NzdiddfVxuICAgICAgLCB7IG5hbWU6ICdBbGwgRmlsZXMnLCBleHRlbnNpb25zOiBbJyonXSB9XG4gICAgICBdXG4gICAgfTtcbiAgICByZW1vdGUuZGlhbG9nLnNob3dTYXZlRGlhbG9nKGN1cnJlbnQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfSxcblxuICBzaG93RXJyb3JCb3goeyBuYW1lLCBtZXNzYWdlIH0pIHtcbiAgICBpZihtZXNzYWdlLmVycm9ycykge1xuICAgICAgbmFtZSAgICAgPSBtZXNzYWdlLmVycm9yc1swXS5tZXNzYWdlO1xuICAgICAgbWVzc2FnZSAgPSBtZXNzYWdlLmVycm9yc1swXS5sb25nTWVzc2FnZTtcbiAgICB9IGVsc2UgXG4gICAgaWYobWVzc2FnZS5lcnJvcikge1xuICAgICAgbmFtZSAgICAgPSBtZXNzYWdlLmVycm9yO1xuICAgICAgbWVzc2FnZSAgPSBtZXNzYWdlLmVycm9yX2Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBsb2cuaW5mbyh3aW4uZGlzcGxheU5hbWUsICdzaG93RXJyb3JCb3gnLCBuYW1lKVxuICAgIHJlbW90ZS5kaWFsb2cuc2hvd0Vycm9yQm94KG5hbWUsIG1lc3NhZ2UpO1xuICB9LFxuXG4gIHNob3dDbG9zZU1lc3NhZ2VCb3goY2FsbGJhY2spIHtcbiAgICBjb25zdCB0aXRsZSA9ICdRdWl0JztcbiAgICBsb2cuaW5mbyh3aW4uZGlzcGxheU5hbWUsICdzaG93Q2xvc2VNZXNzYWdlQm94JywgdGl0bGUpXG4gICAgY29uc3QgY3VycmVudCA9IHJlbW90ZS5nZXRDdXJyZW50V2luZG93KCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHRpdGxlXG4gICAgLCB0eXBlOiAnaW5mbydcbiAgICAsIGJ1dHRvbnM6IFsnT0snLCAnQ2FuY2VsJ11cbiAgICAsIG1lc3NhZ2U6ICdXb3VsZCB5b3UgbGlrZSB0byBjbG9zZSB0aGlzIHdpbmRvdz8nXG4gICAgLCBkZXRhaWw6ICdDbG9zZSB0aGlzIHdpbmRvdy4nXG4gICAgfTtcbiAgICByZW1vdGUuZGlhbG9nLnNob3dNZXNzYWdlQm94KGN1cnJlbnQsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgfSxcblxuICBzaG93U2F2ZU1lc3NhZ2VCb3goKSB7XG4gICAgY29uc3QgdGl0bGUgPSAnU2F2ZSc7XG4gICAgbG9nLmluZm8od2luLmRpc3BsYXlOYW1lLCAnc2hvd1NhdmVNZXNzYWdlQm94JywgdGl0bGUpXG4gICAgY29uc3QgY3VycmVudCA9IHJlbW90ZS5nZXRDdXJyZW50V2luZG93KCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHRpdGxlXG4gICAgLCB0eXBlOiAnaW5mbydcbiAgICAsIGJ1dHRvbnM6IFsgJ09LJyBdXG4gICAgLCBtZXNzYWdlOiAnU2F2ZSBmaWxlJ1xuICAgICwgZGV0YWlsOiAnQ1NWIGZpbGUgc2F2ZWQuJ1xuICAgIH07XG4gICAgcmVtb3RlLmRpYWxvZy5zaG93TWVzc2FnZUJveChjdXJyZW50LCBvcHRpb25zKTtcbiAgfSxcblxuICBjbG9zZSgpIHtcbiAgICBjb25zdCB0aXRsZSA9ICdDbG9zZSc7XG4gICAgbG9nLmluZm8od2luLmRpc3BsYXlOYW1lLCAnY2xvc2UnLCB0aXRsZSlcbiAgICBjb25zdCBjdXJyZW50ID0gcmVtb3RlLmdldEN1cnJlbnRXaW5kb3coKTtcbiAgICBjdXJyZW50LmNsb3NlKCk7XG4gIH1cbn07XG5cbmNvbnN0IHN5cyA9IHtcbiAgZGlzcGxheU5hbWU6ICdzeXMnLFxuICBhZGRib21GaWxlKGZpbGVuYW1lKSB7XG4gICAgY29uc3Qgb2JqID0gIEJ1ZmZlci5mcm9tKFsweEVGLCAweEJCLCAweEJGXSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLmFwcGVuZEZpbGUoZmlsZW5hbWUsIG9iaiwgZXJyID0+IHtcbiAgICAgICAgaWYoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgcmVzb2x2ZSgnRmlsZSBoYXMgYmVlbiBzYXZlZCEnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIHNhdmVGaWxlKGZpbGVuYW1lLCBvYmopIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZnMuYXBwZW5kRmlsZShmaWxlbmFtZSwgb2JqLCBlcnIgPT4ge1xuICAgICAgICBpZihlcnIpIHJlamVjdChlcnIpO1xuICAgICAgICByZXNvbHZlKCdGaWxlIGhhcyBiZWVuIHNhdmVkIScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgdG91Y2hGaWxlKGZpbGVuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZnMuY2xvc2VTeW5jKGZzLm9wZW5TeW5jKGZpbGVuYW1lLCAndycsIDBvNjY2KSk7XG4gICAgICByZXNvbHZlKCdGaWxlIGhhcyBiZWVuIHRvdWNoZWQhJyk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHsgZmV0Y2gsIHdpbiwgc3lzIH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMS0yMDE0IEZlbGl4IEduYXNzXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9zcGluLmpzLm9yZy9cbiAqXG4gKiBFeGFtcGxlOlxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBsaW5lczogMTIgICAgICAgICAgICAgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XG4gICAgLCBsZW5ndGg6IDcgICAgICAgICAgICAgLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcbiAgICAsIHdpZHRoOiA1ICAgICAgICAgICAgICAvLyBUaGUgbGluZSB0aGlja25lc3NcbiAgICAsIHJhZGl1czogMTAgICAgICAgICAgICAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcbiAgICAsIHNjYWxlOiAxLjAgICAgICAgICAgICAvLyBTY2FsZXMgb3ZlcmFsbCBzaXplIG9mIHRoZSBzcGlubmVyXG4gICAgLCBjb3JuZXJzOiAxICAgICAgICAgICAgLy8gUm91bmRuZXNzICgwLi4xKVxuICAgICwgY29sb3I6ICcjMDAwJyAgICAgICAgIC8vICNyZ2Igb3IgI3JyZ2diYlxuICAgICwgb3BhY2l0eTogMS80ICAgICAgICAgIC8vIE9wYWNpdHkgb2YgdGhlIGxpbmVzXG4gICAgLCByb3RhdGU6IDAgICAgICAgICAgICAgLy8gUm90YXRpb24gb2Zmc2V0XG4gICAgLCBkaXJlY3Rpb246IDEgICAgICAgICAgLy8gMTogY2xvY2t3aXNlLCAtMTogY291bnRlcmNsb2Nrd2lzZVxuICAgICwgc3BlZWQ6IDEgICAgICAgICAgICAgIC8vIFJvdW5kcyBwZXIgc2Vjb25kXG4gICAgLCB0cmFpbDogMTAwICAgICAgICAgICAgLy8gQWZ0ZXJnbG93IHBlcmNlbnRhZ2VcbiAgICAsIGZwczogMjAgICAgICAgICAgICAgICAvLyBGcmFtZXMgcGVyIHNlY29uZCB3aGVuIHVzaW5nIHNldFRpbWVvdXQoKVxuICAgICwgekluZGV4OiAyZTkgICAgICAgICAgIC8vIFVzZSBhIGhpZ2ggei1pbmRleCBieSBkZWZhdWx0XG4gICAgLCBjbGFzc05hbWU6ICdzcGlubmVyJyAgLy8gQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgZWxlbWVudFxuICAgICwgdG9wOiAnNTAlJyAgICAgICAgICAgIC8vIGNlbnRlciB2ZXJ0aWNhbGx5XG4gICAgLCBsZWZ0OiAnNTAlJyAgICAgICAgICAgLy8gY2VudGVyIGhvcml6b250YWxseVxuICAgICwgc2hhZG93OiBmYWxzZSAgICAgICAgIC8vIFdoZXRoZXIgdG8gcmVuZGVyIGEgc2hhZG93XG4gICAgLCBod2FjY2VsOiBmYWxzZSAgICAgICAgLy8gV2hldGhlciB0byB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uIChtaWdodCBiZSBidWdneSlcbiAgICAsIHBvc2l0aW9uOiAnYWJzb2x1dGUnICAvLyBFbGVtZW50IHBvc2l0aW9uaW5nXG4gICAgfVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb28nKVxuICAgIGNvbnN0IHNwaW5uZXIgPSBuZXcgU3Bpbm5lcihvcHRzKS5zcGluKHRhcmdldClcbiAqL1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuXG4gIC8qIENvbW1vbkpTICovXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcblxuICAvKiBBTUQgbW9kdWxlICovXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGZhY3RvcnkpXG5cbiAgLyogQnJvd3NlciBnbG9iYWwgKi9cbiAgZWxzZSByb290LlNwaW5uZXIgPSBmYWN0b3J5KClcbn0odGhpcywgZnVuY3Rpb24gKCkge1xuICBcInVzZSBzdHJpY3RcIlxuXG4gIGxldCBwcmVmaXhlcyA9IFsnd2Via2l0JywgJ01veicsICdtcycsICdPJ10gLyogVmVuZG9yIHByZWZpeGVzICovXG4gICAgLCBhbmltYXRpb25zID0ge30gLyogQW5pbWF0aW9uIHJ1bGVzIGtleWVkIGJ5IHRoZWlyIG5hbWUgKi9cbiAgICAsIHVzZUNzc0FuaW1hdGlvbnMgLyogV2hldGhlciB0byB1c2UgQ1NTIGFuaW1hdGlvbnMgb3Igc2V0VGltZW91dCAqL1xuICAgICwgc2hlZXQgLyogQSBzdHlsZXNoZWV0IHRvIGhvbGQgdGhlIEBrZXlmcmFtZSBvciBWTUwgcnVsZXMuICovXG5cbiAgLyoqXG4gICAqIFV0aWxpdHkgZnVuY3Rpb24gdG8gY3JlYXRlIGVsZW1lbnRzLiBJZiBubyB0YWcgbmFtZSBpcyBnaXZlbixcbiAgICogYSBESVYgaXMgY3JlYXRlZC4gT3B0aW9uYWxseSBwcm9wZXJ0aWVzIGNhbiBiZSBwYXNzZWQuXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVFbCAodGFnLCBwcm9wKSB7XG4gICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcgfHwgJ2RpdicpXG4gICAgICAsIG5cblxuICAgIGZvciAobiBpbiBwcm9wKSBlbFtuXSA9IHByb3Bbbl1cbiAgICByZXR1cm4gZWxcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBlbmRzIGNoaWxkcmVuIGFuZCByZXR1cm5zIHRoZSBwYXJlbnQuXG4gICAqL1xuICBmdW5jdGlvbiBpbnMgKHBhcmVudCAvKiBjaGlsZDEsIGNoaWxkMiwgLi4uKi8pIHtcbiAgICBmb3IgKGxldCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChhcmd1bWVudHNbaV0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gb3BhY2l0eSBrZXlmcmFtZSBhbmltYXRpb24gcnVsZSBhbmQgcmV0dXJucyBpdHMgbmFtZS5cbiAgICogU2luY2UgbW9zdCBtb2JpbGUgV2Via2l0cyBoYXZlIHRpbWluZyBpc3N1ZXMgd2l0aCBhbmltYXRpb24tZGVsYXksXG4gICAqIHdlIGNyZWF0ZSBzZXBhcmF0ZSBydWxlcyBmb3IgZWFjaCBsaW5lL3NlZ21lbnQuXG4gICAqL1xuICBmdW5jdGlvbiBhZGRBbmltYXRpb24gKGFscGhhLCB0cmFpbCwgaSwgbGluZXMpIHtcbiAgICBjb25zdCBuYW1lID0gWydvcGFjaXR5JywgdHJhaWwsIH5+KGFscGhhICogMTAwKSwgaSwgbGluZXNdLmpvaW4oJy0nKVxuICAgICAgLCBzdGFydCA9IDAuMDEgKyBpL2xpbmVzICogMTAwXG4gICAgICAsIHogPSBNYXRoLm1heCgxIC0gKDEtYWxwaGEpIC8gdHJhaWwgKiAoMTAwLXN0YXJ0KSwgYWxwaGEpXG4gICAgICAsIHByZWZpeCA9IHVzZUNzc0FuaW1hdGlvbnMuc3Vic3RyaW5nKDAsIHVzZUNzc0FuaW1hdGlvbnMuaW5kZXhPZignQW5pbWF0aW9uJykpLnRvTG93ZXJDYXNlKClcbiAgICAgICwgcHJlID0gcHJlZml4ICYmICctJyArIHByZWZpeCArICctJyB8fCAnJ1xuXG4gICAgaWYgKCFhbmltYXRpb25zW25hbWVdKSB7XG4gICAgICBzaGVldC5pbnNlcnRSdWxlKFxuICAgICAgICAnQCcgKyBwcmUgKyAna2V5ZnJhbWVzICcgKyBuYW1lICsgJ3snICtcbiAgICAgICAgJzAle29wYWNpdHk6JyArIHogKyAnfScgK1xuICAgICAgICBzdGFydCArICcle29wYWNpdHk6JyArIGFscGhhICsgJ30nICtcbiAgICAgICAgKHN0YXJ0KzAuMDEpICsgJyV7b3BhY2l0eToxfScgK1xuICAgICAgICAoc3RhcnQrdHJhaWwpICUgMTAwICsgJyV7b3BhY2l0eTonICsgYWxwaGEgKyAnfScgK1xuICAgICAgICAnMTAwJXtvcGFjaXR5OicgKyB6ICsgJ30nICtcbiAgICAgICAgJ30nLCBzaGVldC5jc3NSdWxlcy5sZW5ndGgpXG5cbiAgICAgIGFuaW1hdGlvbnNbbmFtZV0gPSAxXG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWVcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmllcyB2YXJpb3VzIHZlbmRvciBwcmVmaXhlcyBhbmQgcmV0dXJucyB0aGUgZmlyc3Qgc3VwcG9ydGVkIHByb3BlcnR5LlxuICAgKi9cbiAgZnVuY3Rpb24gdmVuZG9yIChlbCwgcHJvcCkge1xuICAgIGxldCBzID0gZWwuc3R5bGVcbiAgICAgICwgcHBcbiAgICAgICwgaVxuXG4gICAgcHJvcCA9IHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpXG4gICAgaWYgKHNbcHJvcF0gIT09IHVuZGVmaW5lZCkgcmV0dXJuIHByb3BcbiAgICBmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBwID0gcHJlZml4ZXNbaV0rcHJvcFxuICAgICAgaWYgKHNbcHBdICE9PSB1bmRlZmluZWQpIHJldHVybiBwcFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIG11bHRpcGxlIHN0eWxlIHByb3BlcnRpZXMgYXQgb25jZS5cbiAgICovXG4gIGZ1bmN0aW9uIGNzcyAoZWwsIHByb3ApIHtcbiAgICBmb3IgKGxldCBuIGluIHByb3ApIHtcbiAgICAgIGVsLnN0eWxlW3ZlbmRvcihlbCwgbikgfHwgbl0gPSBwcm9wW25dXG4gICAgfVxuXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogRmlsbHMgaW4gZGVmYXVsdCB2YWx1ZXMuXG4gICAqL1xuICBmdW5jdGlvbiBtZXJnZSAob2JqKSB7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGRlZiA9IGFyZ3VtZW50c1tpXVxuICAgICAgZm9yIChsZXQgbiBpbiBkZWYpIHtcbiAgICAgICAgaWYgKG9ialtuXSA9PT0gdW5kZWZpbmVkKSBvYmpbbl0gPSBkZWZbbl1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGxpbmUgY29sb3IgZnJvbSB0aGUgZ2l2ZW4gc3RyaW5nIG9yIGFycmF5LlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0Q29sb3IgKGNvbG9yLCBpZHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvbG9yID09PSAnc3RyaW5nJyA/IGNvbG9yIDogY29sb3JbaWR4ICUgY29sb3IubGVuZ3RoXVxuICB9XG5cbiAgLy8gQnVpbHQtaW4gZGVmYXVsdHNcblxuICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICBsaW5lczogMTIgICAgICAgICAgICAgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XG4gICwgbGVuZ3RoOiA3ICAgICAgICAgICAgIC8vIFRoZSBsZW5ndGggb2YgZWFjaCBsaW5lXG4gICwgd2lkdGg6IDUgICAgICAgICAgICAgIC8vIFRoZSBsaW5lIHRoaWNrbmVzc1xuICAsIHJhZGl1czogMTAgICAgICAgICAgICAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcbiAgLCBzY2FsZTogMS4wICAgICAgICAgICAgLy8gU2NhbGVzIG92ZXJhbGwgc2l6ZSBvZiB0aGUgc3Bpbm5lclxuICAsIGNvcm5lcnM6IDEgICAgICAgICAgICAvLyBSb3VuZG5lc3MgKDAuLjEpXG4gICwgY29sb3I6ICcjMDAwJyAgICAgICAgIC8vICNyZ2Igb3IgI3JyZ2diYlxuICAsIG9wYWNpdHk6IDEvNCAgICAgICAgICAvLyBPcGFjaXR5IG9mIHRoZSBsaW5lc1xuICAsIHJvdGF0ZTogMCAgICAgICAgICAgICAvLyBSb3RhdGlvbiBvZmZzZXRcbiAgLCBkaXJlY3Rpb246IDEgICAgICAgICAgLy8gMTogY2xvY2t3aXNlLCAtMTogY291bnRlcmNsb2Nrd2lzZVxuICAsIHNwZWVkOiAxICAgICAgICAgICAgICAvLyBSb3VuZHMgcGVyIHNlY29uZFxuICAsIHRyYWlsOiAxMDAgICAgICAgICAgICAvLyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuICAsIGZwczogMjAgICAgICAgICAgICAgICAvLyBGcmFtZXMgcGVyIHNlY29uZCB3aGVuIHVzaW5nIHNldFRpbWVvdXQoKVxuICAsIHpJbmRleDogMmU5ICAgICAgICAgICAvLyBVc2UgYSBoaWdoIHotaW5kZXggYnkgZGVmYXVsdFxuICAsIGNsYXNzTmFtZTogJ3NwaW5uZXInICAvLyBDU1MgY2xhc3MgdG8gYXNzaWduIHRvIHRoZSBlbGVtZW50XG4gICwgdG9wOiAnNTAlJyAgICAgICAgICAgIC8vIGNlbnRlciB2ZXJ0aWNhbGx5XG4gICwgbGVmdDogJzUwJScgICAgICAgICAgIC8vIGNlbnRlciBob3Jpem9udGFsbHlcbiAgLCBzaGFkb3c6IGZhbHNlICAgICAgICAgLy8gV2hldGhlciB0byByZW5kZXIgYSBzaGFkb3dcbiAgLCBod2FjY2VsOiBmYWxzZSAgICAgICAgLy8gV2hldGhlciB0byB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uIChtaWdodCBiZSBidWdneSlcbiAgLCBwb3NpdGlvbjogJ2Fic29sdXRlJyAgLy8gRWxlbWVudCBwb3NpdGlvbmluZ1xuICB9XG5cbiAgLyoqIFRoZSBjb25zdHJ1Y3RvciAqL1xuICBmdW5jdGlvbiBTcGlubmVyIChvKSB7XG4gICAgdGhpcy5vcHRzID0gbWVyZ2UobyB8fCB7fSwgU3Bpbm5lci5kZWZhdWx0cywgZGVmYXVsdHMpXG4gIH1cblxuICAvLyBHbG9iYWwgZGVmYXVsdHMgdGhhdCBvdmVycmlkZSB0aGUgYnVpbHQtaW5zOlxuICBTcGlubmVyLmRlZmF1bHRzID0ge31cblxuICBtZXJnZShTcGlubmVyLnByb3RvdHlwZSwge1xuICAgIC8qKlxuICAgICAqIEFkZHMgdGhlIHNwaW5uZXIgdG8gdGhlIGdpdmVuIHRhcmdldCBlbGVtZW50LiBJZiB0aGlzIGluc3RhbmNlIGlzIGFscmVhZHlcbiAgICAgKiBzcGlubmluZywgaXQgaXMgYXV0b21hdGljYWxseSByZW1vdmVkIGZyb20gaXRzIHByZXZpb3VzIHRhcmdldCBiIGNhbGxpbmdcbiAgICAgKiBzdG9wKCkgaW50ZXJuYWxseS5cbiAgICAgKi9cbiAgICBzcGluOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICB0aGlzLnN0b3AoKVxuXG4gICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAsIG8gPSBzZWxmLm9wdHNcbiAgICAgICAgLCBlbCA9IHNlbGYuZWwgPSBjcmVhdGVFbChudWxsLCB7Y2xhc3NOYW1lOiBvLmNsYXNzTmFtZX0pXG5cbiAgICAgIGNzcyhlbCwge1xuICAgICAgICBwb3NpdGlvbjogby5wb3NpdGlvblxuICAgICAgLCB3aWR0aDogMFxuICAgICAgLCB6SW5kZXg6IG8uekluZGV4XG4gICAgICAsIGxlZnQ6IG8ubGVmdFxuICAgICAgLCB0b3A6IG8udG9wXG4gICAgICB9KVxuXG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoZWwsIHRhcmdldC5maXJzdENoaWxkIHx8IG51bGwpXG4gICAgICB9XG5cbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpXG4gICAgICBzZWxmLmxpbmVzKGVsLCBzZWxmLm9wdHMpXG5cbiAgICAgIGlmICghdXNlQ3NzQW5pbWF0aW9ucykge1xuICAgICAgICAvLyBObyBDU1MgYW5pbWF0aW9uIHN1cHBvcnQsIHVzZSBzZXRUaW1lb3V0KCkgaW5zdGVhZFxuICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgICAsIHN0YXJ0ID0gKG8ubGluZXMgLSAxKSAqICgxIC0gby5kaXJlY3Rpb24pIC8gMlxuICAgICAgICAgICwgYWxwaGFcbiAgICAgICAgICAsIGZwcyA9IG8uZnBzXG4gICAgICAgICAgLCBmID0gZnBzIC8gby5zcGVlZFxuICAgICAgICAgICwgb3N0ZXAgPSAoMSAtIG8ub3BhY2l0eSkgLyAoZiAqIG8udHJhaWwgLyAxMDApXG4gICAgICAgICAgLCBhc3RlcCA9IGYgLyBvLmxpbmVzXG5cbiAgICAgICAgOyhmdW5jdGlvbiBhbmltICgpIHtcbiAgICAgICAgICBpKytcbiAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG8ubGluZXM7IGorKykge1xuICAgICAgICAgICAgYWxwaGEgPSBNYXRoLm1heCgxIC0gKGkgKyAoby5saW5lcyAtIGopICogYXN0ZXApICUgZiAqIG9zdGVwLCBvLm9wYWNpdHkpXG5cbiAgICAgICAgICAgIHNlbGYub3BhY2l0eShlbCwgaiAqIG8uZGlyZWN0aW9uICsgc3RhcnQsIGFscGhhLCBvKVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZWxmLnRpbWVvdXQgPSBzZWxmLmVsICYmIHNldFRpbWVvdXQoYW5pbSwgfn4oMTAwMCAvIGZwcykpXG4gICAgICAgIH0pKClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYW5kIHJlbW92ZXMgdGhlIFNwaW5uZXIuXG4gICAgICovXG4gICwgc3RvcDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmVsXG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dClcbiAgICAgICAgaWYgKGVsLnBhcmVudE5vZGUpIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXG4gICAgICAgIHRoaXMuZWwgPSB1bmRlZmluZWRcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW50ZXJuYWwgbWV0aG9kIHRoYXQgZHJhd3MgdGhlIGluZGl2aWR1YWwgbGluZXMuIFdpbGwgYmUgb3ZlcndyaXR0ZW5cbiAgICAgKiBpbiBWTUwgZmFsbGJhY2sgbW9kZSBiZWxvdy5cbiAgICAgKi9cbiAgLCBsaW5lczogZnVuY3Rpb24gKGVsLCBvKSB7XG4gICAgICBsZXQgaSA9IDBcbiAgICAgICAgLCBzdGFydCA9IChvLmxpbmVzIC0gMSkgKiAoMSAtIG8uZGlyZWN0aW9uKSAvIDJcbiAgICAgICAgLCBzZWdcblxuICAgICAgZnVuY3Rpb24gZmlsbCAoY29sb3IsIHNoYWRvdykge1xuICAgICAgICByZXR1cm4gY3NzKGNyZWF0ZUVsKCksIHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICAsIHdpZHRoOiBvLnNjYWxlICogKG8ubGVuZ3RoICsgby53aWR0aCkgKyAncHgnXG4gICAgICAgICwgaGVpZ2h0OiBvLnNjYWxlICogby53aWR0aCArICdweCdcbiAgICAgICAgLCBiYWNrZ3JvdW5kOiBjb2xvclxuICAgICAgICAsIGJveFNoYWRvdzogc2hhZG93XG4gICAgICAgICwgdHJhbnNmb3JtT3JpZ2luOiAnbGVmdCdcbiAgICAgICAgLCB0cmFuc2Zvcm06ICdyb3RhdGUoJyArIH5+KDM2MC9vLmxpbmVzKmkgKyBvLnJvdGF0ZSkgKyAnZGVnKSB0cmFuc2xhdGUoJyArIG8uc2NhbGUqby5yYWRpdXMgKyAncHgnICsgJywwKSdcbiAgICAgICAgLCBib3JkZXJSYWRpdXM6IChvLmNvcm5lcnMgKiBvLnNjYWxlICogby53aWR0aCA+PiAxKSArICdweCdcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZm9yICg7IGkgPCBvLmxpbmVzOyBpKyspIHtcbiAgICAgICAgc2VnID0gY3NzKGNyZWF0ZUVsKCksIHtcbiAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgICAgICAsIHRvcDogMSArIH4oby5zY2FsZSAqIG8ud2lkdGggLyAyKSArICdweCdcbiAgICAgICAgLCB0cmFuc2Zvcm06IG8uaHdhY2NlbCA/ICd0cmFuc2xhdGUzZCgwLDAsMCknIDogJydcbiAgICAgICAgLCBvcGFjaXR5OiBvLm9wYWNpdHlcbiAgICAgICAgLCBhbmltYXRpb246IHVzZUNzc0FuaW1hdGlvbnMgJiYgYWRkQW5pbWF0aW9uKG8ub3BhY2l0eSwgby50cmFpbCwgc3RhcnQgKyBpICogby5kaXJlY3Rpb24sIG8ubGluZXMpICsgJyAnICsgMSAvIG8uc3BlZWQgKyAncyBsaW5lYXIgaW5maW5pdGUnXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKG8uc2hhZG93KSBpbnMoc2VnLCBjc3MoZmlsbCgnIzAwMCcsICcwIDAgNHB4ICMwMDAnKSwge3RvcDogJzJweCd9KSlcbiAgICAgICAgaW5zKGVsLCBpbnMoc2VnLCBmaWxsKGdldENvbG9yKG8uY29sb3IsIGkpLCAnMCAwIDFweCByZ2JhKDAsMCwwLC4xKScpKSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbFxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0aGF0IGFkanVzdHMgdGhlIG9wYWNpdHkgb2YgYSBzaW5nbGUgbGluZS5cbiAgICAgKiBXaWxsIGJlIG92ZXJ3cml0dGVuIGluIFZNTCBmYWxsYmFjayBtb2RlIGJlbG93LlxuICAgICAqL1xuICAsIG9wYWNpdHk6IGZ1bmN0aW9uIChlbCwgaSwgdmFsKSB7XG4gICAgICBpZiAoaSA8IGVsLmNoaWxkTm9kZXMubGVuZ3RoKSBlbC5jaGlsZE5vZGVzW2ldLnN0eWxlLm9wYWNpdHkgPSB2YWxcbiAgICB9XG5cbiAgfSlcblxuXG4gIGZ1bmN0aW9uIGluaXRWTUwgKCkge1xuXG4gICAgLyogVXRpbGl0eSBmdW5jdGlvbiB0byBjcmVhdGUgYSBWTUwgdGFnICovXG4gICAgZnVuY3Rpb24gdm1sICh0YWcsIGF0dHIpIHtcbiAgICAgIHJldHVybiBjcmVhdGVFbCgnPCcgKyB0YWcgKyAnIHhtbG5zPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LmNvbTp2bWxcIiBjbGFzcz1cInNwaW4tdm1sXCI+JywgYXR0cilcbiAgICB9XG5cbiAgICAvLyBObyBDU1MgdHJhbnNmb3JtcyBidXQgVk1MIHN1cHBvcnQsIGFkZCBhIENTUyBydWxlIGZvciBWTUwgZWxlbWVudHM6XG4gICAgc2hlZXQuYWRkUnVsZSgnLnNwaW4tdm1sJywgJ2JlaGF2aW9yOnVybCgjZGVmYXVsdCNWTUwpJylcblxuICAgIFNwaW5uZXIucHJvdG90eXBlLmxpbmVzID0gZnVuY3Rpb24gKGVsLCBvKSB7XG4gICAgICBjb25zdCByID0gby5zY2FsZSAqIChvLmxlbmd0aCArIG8ud2lkdGgpXG4gICAgICAgICwgcyA9IG8uc2NhbGUgKiAyICogclxuXG4gICAgICBmdW5jdGlvbiBncnAgKCkge1xuICAgICAgICByZXR1cm4gY3NzKFxuICAgICAgICAgIHZtbCgnZ3JvdXAnLCB7XG4gICAgICAgICAgICBjb29yZHNpemU6IHMgKyAnICcgKyBzXG4gICAgICAgICAgLCBjb29yZG9yaWdpbjogLXIgKyAnICcgKyAtclxuICAgICAgICAgIH0pXG4gICAgICAgICwgeyB3aWR0aDogcywgaGVpZ2h0OiBzIH1cbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBsZXQgbWFyZ2luID0gLShvLndpZHRoICsgby5sZW5ndGgpICogby5zY2FsZSAqIDIgKyAncHgnXG4gICAgICAgICwgZyA9IGNzcyhncnAoKSwge3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IG1hcmdpbiwgbGVmdDogbWFyZ2lufSlcbiAgICAgICAgLCBpO1xuXG4gICAgICBmdW5jdGlvbiBzZWcgKGksIGR4LCBmaWx0ZXIpIHtcbiAgICAgICAgaW5zKFxuICAgICAgICAgIGdcbiAgICAgICAgLCBpbnMoXG4gICAgICAgICAgICBjc3MoZ3JwKCksIHtyb3RhdGlvbjogMzYwIC8gby5saW5lcyAqIGkgKyAnZGVnJywgbGVmdDogfn5keH0pXG4gICAgICAgICAgLCBpbnMoXG4gICAgICAgICAgICAgIGNzcyhcbiAgICAgICAgICAgICAgICB2bWwoJ3JvdW5kcmVjdCcsIHthcmNzaXplOiBvLmNvcm5lcnN9KVxuICAgICAgICAgICAgICAsIHsgd2lkdGg6IHJcbiAgICAgICAgICAgICAgICAsIGhlaWdodDogby5zY2FsZSAqIG8ud2lkdGhcbiAgICAgICAgICAgICAgICAsIGxlZnQ6IG8uc2NhbGUgKiBvLnJhZGl1c1xuICAgICAgICAgICAgICAgICwgdG9wOiAtby5zY2FsZSAqIG8ud2lkdGggPj4gMVxuICAgICAgICAgICAgICAgICwgZmlsdGVyOiBmaWx0ZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICwgdm1sKCdmaWxsJywge2NvbG9yOiBnZXRDb2xvcihvLmNvbG9yLCBpKSwgb3BhY2l0eTogby5vcGFjaXR5fSlcbiAgICAgICAgICAgICwgdm1sKCdzdHJva2UnLCB7b3BhY2l0eTogMH0pIC8vIHRyYW5zcGFyZW50IHN0cm9rZSB0byBmaXggY29sb3IgYmxlZWRpbmcgdXBvbiBvcGFjaXR5IGNoYW5nZVxuICAgICAgICAgICAgKVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBpZiAoby5zaGFkb3cpXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPD0gby5saW5lczsgaSsrKSB7XG4gICAgICAgICAgc2VnKGksIC0yLCAncHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LkJsdXIocGl4ZWxyYWRpdXM9MixtYWtlc2hhZG93PTEsc2hhZG93b3BhY2l0eT0uMyknKVxuICAgICAgICB9XG5cbiAgICAgIGZvciAoaSA9IDE7IGkgPD0gby5saW5lczsgaSsrKSBzZWcoaSlcbiAgICAgIHJldHVybiBpbnMoZWwsIGcpXG4gICAgfVxuXG4gICAgU3Bpbm5lci5wcm90b3R5cGUub3BhY2l0eSA9IGZ1bmN0aW9uIChlbCwgaSwgdmFsLCBvKSB7XG4gICAgICBjb25zdCBjID0gZWwuZmlyc3RDaGlsZFxuICAgICAgbyA9IG8uc2hhZG93ICYmIG8ubGluZXMgfHwgMFxuICAgICAgaWYgKGMgJiYgaSArIG8gPCBjLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIGMgPSBjLmNoaWxkTm9kZXNbaSArIG9dOyBjID0gYyAmJiBjLmZpcnN0Q2hpbGQ7IGMgPSBjICYmIGMuZmlyc3RDaGlsZFxuICAgICAgICBpZiAoYykgYy5vcGFjaXR5ID0gdmFsXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzaGVldCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCBlbCA9IGNyZWF0ZUVsKCdzdHlsZScsIHt0eXBlIDogJ3RleHQvY3NzJ30pXG4gICAgICBpbnMoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSwgZWwpXG4gICAgICByZXR1cm4gZWwuc2hlZXQgfHwgZWwuc3R5bGVTaGVldFxuICAgIH0oKSlcblxuICAgIGNvbnN0IHByb2JlID0gY3NzKGNyZWF0ZUVsKCdncm91cCcpLCB7YmVoYXZpb3I6ICd1cmwoI2RlZmF1bHQjVk1MKSd9KVxuXG4gICAgaWYgKCF2ZW5kb3IocHJvYmUsICd0cmFuc2Zvcm0nKSAmJiBwcm9iZS5hZGopIGluaXRWTUwoKVxuICAgIGVsc2UgdXNlQ3NzQW5pbWF0aW9ucyA9IHZlbmRvcihwcm9iZSwgJ2FuaW1hdGlvbicpXG4gIH1cblxuICByZXR1cm4gU3Bpbm5lclxuXG59KSk7XG4iLCJpbXBvcnQgcXVlcnlzdHJpbmcgICAgICAgICAgICAgIGZyb20gJ3F1ZXJ5c3RyaW5nJztcbmltcG9ydCBjcnlwdG8gICAgICAgICAgICAgICAgICAgZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IFVSTCwgVVJMU2VhcmNoUGFyYW1zIH0gZnJvbSAndXJsJztcblxuY29uc3QgZW52ID0gcHJvY2Vzcy5lbnYuUExBVEZPUk0gfHwgJ2xvY2FsJztcbmNvbnN0IGlzTm9kZSA9IGVudiA9PT0gJ2xvY2FsJztcbmNvbnN0IGNvbG9yX2NvZGUgPSB7XG4gIFJlc2V0OiAgICAgIGlzTm9kZSA/IFwiXFx4MWJbMG1cIiA6ICcnXG4sIEJyaWdodDogICAgIGlzTm9kZSA/IFwiXFx4MWJbMW1cIiA6ICcnXG4sIERpbTogICAgICAgIGlzTm9kZSA/IFwiXFx4MWJbMm1cIiA6ICcnXG4sIFVuZGVyc2NvcmU6IGlzTm9kZSA/IFwiXFx4MWJbNG1cIiA6ICcnXG4sIEJsaW5rOiAgICAgIGlzTm9kZSA/IFwiXFx4MWJbNW1cIiA6ICcnXG4sIFJldmVyc2U6ICAgIGlzTm9kZSA/IFwiXFx4MWJbN21cIiA6ICcnXG4sIEhpZGRlbjogICAgIGlzTm9kZSA/IFwiXFx4MWJbOG1cIiA6ICcnXG5cbiwgRmdCbGFjazogICAgaXNOb2RlID8gXCJcXHgxYlszMG1cIiA6ICcnXG4sIEZnUmVkOiAgICAgIGlzTm9kZSA/IFwiXFx4MWJbMzFtXCIgOiAnJ1xuLCBGZ0dyZWVuOiAgICBpc05vZGUgPyBcIlxceDFiWzMybVwiIDogJydcbiwgRmdZZWxsb3c6ICAgaXNOb2RlID8gXCJcXHgxYlszM21cIiA6ICcnXG4sIEZnQmx1ZTogICAgIGlzTm9kZSA/IFwiXFx4MWJbMzRtXCIgOiAnJ1xuLCBGZ01hZ2VudGE6ICBpc05vZGUgPyBcIlxceDFiWzM1bVwiIDogJydcbiwgRmdDeWFuOiAgICAgaXNOb2RlID8gXCJcXHgxYlszNm1cIiA6ICcnXG4sIEZnV2hpdGU6ICAgIGlzTm9kZSA/IFwiXFx4MWJbMzdtXCIgOiAnJ1xuXG4sIEJnQmxhY2s6ICAgIGlzTm9kZSA/IFwiXFx4MWJbNDBtXCIgOiAnJ1xuLCBCZ1JlZDogICAgICBpc05vZGUgPyBcIlxceDFiWzQxbVwiIDogJydcbiwgQmdHcmVlbjogICAgaXNOb2RlID8gXCJcXHgxYls0Mm1cIiA6ICcnXG4sIEJnWWVsbG93OiAgIGlzTm9kZSA/IFwiXFx4MWJbNDNtXCIgOiAnJ1xuLCBCZ0JsdWU6ICAgICBpc05vZGUgPyBcIlxceDFiWzQ0bVwiIDogJydcbiwgQmdNYWdlbnRhOiAgaXNOb2RlID8gXCJcXHgxYls0NW1cIiA6ICcnXG4sIEJnQ3lhbjogICAgIGlzTm9kZSA/IFwiXFx4MWJbNDZtXCIgOiAnJ1xuLCBCZ1doaXRlOiAgICBpc05vZGUgPyBcIlxceDFiWzQ3bVwiIDogJydcbn1cblxuY29uc3Qgc3RkID0ge1xuICB0b1JHQmEoc3RyLCBhKSB7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KHN0ci5zdWJzdHIoMSwyKSwgMTYpO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChzdHIuc3Vic3RyKDMsMiksIDE2KTtcbiAgICBjb25zdCBiID0gcGFyc2VJbnQoc3RyLnN1YnN0cig1LDIpLCAxNik7XG4gICAgcmV0dXJuIGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sICR7YX0pYDtcbiAgfSxcblxuICBsb2dFcnJvcihjYWxsZXIsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBkYXRlID0gY29sb3JfY29kZVsnRmdSZWQnXSArIGBbJHt0aGlzLmdldExvY2FsSVNPVGltZVN0YW1wKG5ldyBEYXRlKX1dYDtcbiAgICBjb25zdCBoZWFkID0gY29sb3JfY29kZVsnUmVzZXQnXSArIG5hbWU7XG4gICAgY29uc29sZS5lcnJvcihkYXRlICwnW0VSUk9SXScsIGNhbGxlciwgJy0nLGhlYWQsICc6JywgbWVzc2FnZSk7XG4gIH0sXG5cbiAgbG9nV2FybihjYWxsZXIsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBkYXRlID0gY29sb3JfY29kZVsnRmdZZWxsb3cnXSArIGBbJHt0aGlzLmdldExvY2FsSVNPVGltZVN0YW1wKG5ldyBEYXRlKX1dYDtcbiAgICBjb25zdCBoZWFkID0gY29sb3JfY29kZVsnUmVzZXQnXSArIG5hbWU7XG4gICAgY29uc29sZS53YXJuKGRhdGUgLCdbV0FSTl0nLCBjYWxsZXIsICctJyxoZWFkLCAnOicsIG1lc3NhZ2UpO1xuICB9LFxuXG4gIGxvZ0RlYnVnKGNhbGxlciwgbmFtZSwgbWVzc2FnZSkge1xuICAgIGNvbnN0IGRhdGUgPSBjb2xvcl9jb2RlWydGZ0N5YW4nXSArIGBbJHt0aGlzLmdldExvY2FsSVNPVGltZVN0YW1wKG5ldyBEYXRlKX1dYDtcbiAgICBjb25zdCBoZWFkID0gY29sb3JfY29kZVsnUmVzZXQnXSArIG5hbWU7XG4gICAgY29uc29sZS5sb2coZGF0ZSAsJ1tERUJVR10nLCBjYWxsZXIsICctJyxoZWFkLCAnOicsIG1lc3NhZ2UpO1xuICB9LFxuXG4gIGxvZ1RyYWNlKGNhbGxlciwgbmFtZSwgbWVzc2FnZSkge1xuICAgIGNvbnN0IGRhdGUgPSBjb2xvcl9jb2RlWydGZ0JsdWUnXSArIGBbJHt0aGlzLmdldExvY2FsSVNPVGltZVN0YW1wKG5ldyBEYXRlKX1dYDtcbiAgICBjb25zdCBoZWFkID0gY29sb3JfY29kZVsnUmVzZXQnXSArIG5hbWU7XG4gICAgY29uc29sZS50cmFjZShkYXRlLCAnW1RSQUNFXScsIGNhbGxlciwgJy0nLCBoZWFkLCAnOicsIG1lc3NhZ2UpO1xuICB9LFxuXG4gIGxvZ0luZm8oY2FsbGVyLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgZGF0ZSA9IGNvbG9yX2NvZGVbJ0ZnR3JlZW4nXSArIGBbJHt0aGlzLmdldExvY2FsSVNPVGltZVN0YW1wKG5ldyBEYXRlKX1dYDtcbiAgICBjb25zdCBoZWFkID0gY29sb3JfY29kZVsnUmVzZXQnXSArIG5hbWU7XG4gICAgY29uc29sZS5pbmZvKGRhdGUsICdbSU5GT10nLCBjYWxsZXIsICctJywgaGVhZCwgJzonLCBtZXNzYWdlKTtcbiAgfSxcblxuICBpcyh0eXBlLCBvYmopIHtcbiAgICBjb25zdCBjbGFzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikuc2xpY2UoOCwgLTEpO1xuICAgIHJldHVybiBvYmogIT09IHVuZGVmaW5lZCAmJiBvYmogIT09IG51bGwgJiYgY2xhcyA9PT0gdHlwZTtcbiAgfSxcblxuICAvKipcbiAgICogQ29weSB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHAgdG8gbywgYW5kIHJldHVybiBvLlxuICAgKiBJZiBvIGFuZCBwIGhhdmUgYSBwcm9wZXJ0eSBieSB0aGUgc2FtZSBuYW1lLCBvJ3MgcHJvcGVydHkgaXMgXG4gICAqIG92ZXJ3cml0dGVuLiBUaGlzIGZ1bmN0aW9uIGRvZXMgbm90IGhhbmRsZSBnZXR0ZXJzIGFuZCBzZXR0ZXJzIFxuICAgKiBvciBjb3B5IGF0dHJpYnV0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwXG4gICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAqL1xuICBleHRlbmQobywgcCkge1xuICAgIGZvcihsZXQgcHJvcCBpbiBwKSB7ICAgICAgICAgICAgLy8gRm9yIGFsbCBwcm9wcyBpbiBwLlxuICAgICAgb1twcm9wXSA9IHBbcHJvcF07ICAgICAgICAvLyBBZGQgdGhlIHByb3BlcnR5IHRvIG8uXG4gICAgfVxuICAgIHJldHVybiBvO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSBlbnVtZXJhYmxlIHByb3BlcnRpZXMgb2YgcCB0byBvLCBhbmQgcmV0dXJuIG8uXG4gICAqIElmIG8gYW5kIHAgaGF2ZSBhIHByb3BlcnR5IGJ5IHRoZSBzYW1lIG5hbWUsIG8ncyBwcm9wZXJ0eSBpcyBcbiAgICogbGVmdCBhbG9uZS4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBoYW5kbGUgZ2V0dGVycyBhbmQgc2V0dGVycyBcbiAgICogb3IgY29weSBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcGFyYW0ge29iamVjdH0gcFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgbWVyZ2UobywgcCkge1xuICAgIGZvcihsZXQgIHByb3AgaW4gcCkgeyAgICAgICAgICAgIC8vIEZvciBhbGwgcHJvcHMgaW4gcC5cbiAgICAgIGlmIChvLmhhc093blByb3BlcnR5W3Byb3BdKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXhjZXB0IHRob3NlIGFscmVhZHkgaW4gby5cbiAgICAgIG9bcHJvcF0gPSBwW3Byb3BdOyAgICAgICAgLy8gQWRkIHRoZSBwcm9wZXJ0eSB0byBvLlxuICAgIH1cbiAgICByZXR1cm4gbztcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIHByb3BlcnRpZXMgZnJvbSBvIGlmIHRoZXJlIGlzIG5vdCBhIHByb3BlcnR5IHdpdGggdGhlIFxuICAgKiBzYW1lIG5hbWUgaW4gcC4gUmV0dXJuIG8uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwXG4gICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAqL1xuICByZXN0cmljdChvLCBwKSB7XG4gICAgZm9yKGxldCBwcm9wIGluIG8pIHsgICAgICAgICAgICAvLyBGb3IgYWxsIHByb3BzIGluIG9cbiAgICAgIGlmICghKHByb3AgaW4gcCkpIGRlbGV0ZSBvW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBEZWxldGUgaWYgbm90IGluIHBcbiAgICB9XG4gICAgcmV0dXJuIG87XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZvciBlYWNoIHByb3BlcnR5IG9mIHAsIGRlbGV0ZSB0aGUgcHJvcGVydHkgd2l0aCB0aGUgc2FtZSBuYW1lIFxuICAgKiBmcm9tIG8uIFJldHVybiBvLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcGFyYW0ge29iamVjdH0gcFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgc3VidHJhY3QobywgcCkge1xuICAgIGZvcihsZXQgcHJvcCBpbiBwKSB7ICAgICAgICAgICAgLy8gRm9yIGFsbCBwcm9wcyBpbiBwXG4gICAgICBkZWxldGUgb1twcm9wXTsgICAgICAgICAgIC8vIERlbGV0ZSBmcm9tIG8gKGRlbGV0aW5nIGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9uZXhpc3RlbnQgcHJvcCBpcyBoYXJtbGVzcylcbiAgICB9XG4gICAgcmV0dXJuIG87XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5ldyBvYmplY3QgdGhhdCBob2xkcyB0aGUgcHJvcGVydGllcyBvZiBib3RoIG8gYW5kIHAuXG4gICAqIElmIG8gYW5kIHAgaGF2ZSBwcm9wZXJ0aWVzIGJ5IHRoZSBzYW1lIG5hbWUsIHRoZSB2YWx1ZXMgXG4gICAqIGZyb20gbyBhcmUgdXNlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9cbiAgICogQHBhcmFtIHtvYmplY3R9IHBcbiAgICogQHJldHVybnMge29iamVjdH1cbiAgICovXG4gIHVuaW9uKG8scCkge1xuICAgIHJldHVybiBleHRlbmQoZXh0ZW5kKHt9LG8pLCBwKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJuIGEgbmV3IG9iamVjdCB0aGF0IGhvbGRzIG9ubHkgdGhlIHByb3BlcnRpZXMgb2YgbyB0aGF0IFxuICAgKiBhbHNvIGFwcGVhciBpbiBwLiBUaGlzIGlzIHNvbWV0aGluZyBsaWtlIHRoZSBpbnRlcnNlY3Rpb24gb2YgbyBcbiAgICogYW5kIHAsIGJ1dCB0aGUgdmFsdWVzIG9mIHRoZSBwcm9wZXJ0aWVzIGluIHAgYXJlIGRpc2NhcmRlZFxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcGFyYW0ge29iamVjdH0gcFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgaW50ZXJzZWN0aW9uKG8scCkgeyBcbiAgICByZXR1cm4gcmVzdHJpY3QoZXh0ZW5kKHt9LCBvKSwgcCk7IFxuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gYXJyYXkgdGhhdCBob2xkcyB0aGUgbmFtZXMgb2YgdGhlIGVudW1lcmFibGUgb3duIFxuICAgKiBwcm9wZXJ0aWVzIG9mIG8uXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIGtleXMobykge1xuICAgIGlmICh0eXBlb2YgbyAhPT0gXCJvYmplY3RcIikgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9iamVjdCBhcmd1bWVudCByZXF1aXJlZFxuICAgIGxldCByZXN1bHQgPSBbXTsgICAgICAgICAgICAvLyBUaGUgYXJyYXkgd2Ugd2lsbCByZXR1cm5cbiAgICBmb3IobGV0IHByb3AgaW4gbykgeyAgICAgICAgLy8gRm9yIGFsbCBlbnVtZXJhYmxlIHByb3BlcnRpZXNcbiAgICAgIGlmIChvLmhhc093blByb3BlcnR5KHByb3ApKSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQgaXMgYW4gb3duIHByb3BlcnR5XG4gICAgICAgIHJlc3VsdC5wdXNoKHByb3ApOyAgICAgIC8vIGFkZCBpdCB0byB0aGUgYXJyYXkuXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7ICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGFycmF5LlxuICB9LFxuXG4gIC8qKlxuICAgKiBhbmRcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcGFyYW0ge2FycmF5fSBwXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIGFuZChvLCBwKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pIHx8ICFBcnJheS5pc0FycmF5KHApKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCBfcCA9IHAuZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCByZXN1bHQgPSBfby5jb25jYXQoX3ApXG4gICAgIC5maWx0ZXIoZnVuY3Rpb24oeCwgaSwgeSl7IFxuICAgICAgIHJldHVybiB5LmluZGV4T2YoeCkgIT09IHkubGFzdEluZGV4T2YoeCk7IH0pXG4gICAgIC5maWx0ZXIoZnVuY3Rpb24oeCwgaSwgeSl7IFxuICAgICAgIHJldHVybiB5LmluZGV4T2YoeCkgPT09IGk7IH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGRlbFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBcbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgZGVsKG8sIHApIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobykgfHwgIUFycmF5LmlzQXJyYXkocCkpIHRocm93IFR5cGVFcnJvcigpO1xuICAgIGNvbnN0IF9vID0gby5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IF9wID0gcC5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgIF9vLmZpbHRlcihmdW5jdGlvbih4LCBpLCB5KSB7IHJldHVybiBfcC5pbmRleE9mKHgpID09PSAtMTsgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvKipcbiAgICogYWRkXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IG9cbiAgICogQHBhcmFtIHthcnJheX0gcFxuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBhZGQobywgcCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSB8fCAhQXJyYXkuaXNBcnJheShwKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgX3AgPSBwLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgcmVzdWx0ID1cbiAgICAgX3AuZmlsdGVyKGZ1bmN0aW9uKHgsIGksIHkpIHsgcmV0dXJuIF9vLmluZGV4T2YoeCkgPT09IC0xOyB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBkaWZcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcGFyYW0ge2FycmF5fSBwXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIGRpZihvLCBwKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pIHx8ICFBcnJheS5pc0FycmF5KHApKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCBfcCA9IHAuZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCByZXN1bHQgPVxuICAgICAgX28uZmlsdGVyKGZ1bmN0aW9uKHgsIGksIHkpIHsgcmV0dXJuIF9wLmluZGV4T2YoeCkgPT09IC0xOyB9KVxuICAgICAuY29uY2F0KFxuICAgICAgICBfcC5maWx0ZXIoZnVuY3Rpb24oeCwgaSwgeSkgeyBcbiAgICAgICAgICByZXR1cm4gX28uaW5kZXhPZih4KSA9PT0gLTE7IH0pXG4gICAgICApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGR1cFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBcbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgZHVwKG8sIHApIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobykgfHwgIUFycmF5LmlzQXJyYXkocCkpIHRocm93IFR5cGVFcnJvcigpO1xuICAgIGNvbnN0IF9vID0gby5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IF9wID0gcC5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9IF9vLmNvbmNhdChfcClcbiAgICAgLmZpbHRlcihmdW5jdGlvbih4LCBpLCB5KXsgcmV0dXJuIHkuaW5kZXhPZih4KSA9PT0gaTsgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvKipcbiAgICogZHN0LlxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIGRzdChvKSB7IFxuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgX3AgPSBfby5zb3J0KGZ1bmN0aW9uKHMsIHQpe1xuICAgICAgY29uc3QgYT1zLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGI9dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZihhPGIpIHJldHVybiAtMTtcbiAgICAgIGlmKGE+YikgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgICBjb25zdCByZXN1bHQgPSBfcC5maWx0ZXIoZnVuY3Rpb24oeCwgaSwgeSkge1xuICAgICAgaWYoaT09PTApIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIHghPT15W2ktMV07XG4gICAgfSlcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBvZGVyIGJ5IHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBzb3J0U3RyKG8pIHsgXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICByZXR1cm4gX28uc29ydChmdW5jdGlvbihzLCB0KXtcbiAgICAgIGNvbnN0IGE9cy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBiPXQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYoYTxiKSByZXR1cm4gLTE7XG4gICAgICBpZihhPmIpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNvcnQgYnkgbnVtYmVyLFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIHNvcnROdW0obykgeyBcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobykpIHRocm93IFR5cGVFcnJvcigpO1xuICAgIGNvbnN0IF9vID0gby5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIHJldHVybiBfby5zb3J0KGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgaWYoYTxiKSByZXR1cm4gLTE7XG4gICAgICBpZihhPmIpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNvcnQgdmFsdWUgYnkgb2JqZWN0IGtleSBzdHJpbmcsXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtcbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgc29ydE9ialN0cihvLCBrKSB7IFxuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgcmV0dXJuIF9vLnNvcnQoZnVuY3Rpb24ocywgdCl7XG4gICAgICBjb25zdCBhPXNba10udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgYj10W2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmKGE8YikgcmV0dXJuIC0xO1xuICAgICAgaWYoYT5iKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzb3J0IHZhbHVlIGJ5IG9iamVjdCBrZXkgdW5pY29kZS4sXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IG9cbiAgICogQHBhcmFtIHtzdHJpbmd9IGtcbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgc29ydE9ialVuaShvLCBrKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICByZXR1cm4gX28uc29ydChmdW5jdGlvbihzLCB0KSB7XG4gICAgICBjb25zdCBhPXNba107XG4gICAgICBjb25zdCBiPXRba107XG4gICAgICBpZihhPGIpIHJldHVybiAtMTtcbiAgICAgIGlmKGE+YikgcmV0dXJuIDE7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldFRpbWVTdGFtcFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0VGltZVN0YW1wKCkge1xuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUoKTtcbiAgICByZXR1cm4gZHQudG9JU09TdHJpbmcoKTtcbiAgfSxcblxuICAvKipcbiAgICogZ2V0TG9jYWxUaW1lU3RhbXBcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldExvY2FsVGltZVN0YW1wKHMpIHtcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHMpO1xuICAgIGNvbnN0IF95ciA9IGR0LmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgX21vID0gZHQuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgX2R5ID0gZHQuZ2V0RGF0ZSgpO1xuICAgIGNvbnN0IF90bSA9IGR0LnRvVGltZVN0cmluZygpLnNwbGl0KCcgJylbMF07XG4gICAgcmV0dXJuIGAke195cn0tJHtfbW99LSR7X2R5fSAke190bX1gO1xuICB9LFxuXG4gIC8qKlxuICAgKiBnZXRMb2NhbERhdGVTdGFtcFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0TG9jYWxEYXRlU3RhbXAocykge1xuICAgIGNvbnN0IGR0ID0gbmV3IERhdGUocyk7XG4gICAgY29uc3QgX21vID0gZHQuZ2V0TW9udGgoKSArIDE7XG4gICAgY29uc3QgX2R5ID0gZHQuZ2V0RGF0ZSgpO1xuICAgIHJldHVybiBgJHtfbW99LyR7X2R5fWA7XG4gIH0sXG5cbiAgLyoqXG4gICAqIHNldFRpbWVTdGFtcFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc1xuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgc2V0VGltZVN0YW1wKHMpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gL14oXFxkKylcXC8oXFxkKylcXC8oXFxkKykkLy5leGVjKHMpO1xuICAgIGlmKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHkgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcbiAgICBjb25zdCBtID0gcGFyc2VJbnQobWF0Y2hlc1syXSk7XG4gICAgY29uc3QgZCA9IHBhcnNlSW50KG1hdGNoZXNbM10pO1xuICAgIGlmKG0gPCAxIHx8IG0gPiAxMiB8fCBkIDwgMSB8fCBkID4gMzEpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHksIG0gLSAxLCBkLCAwLCAwLCAwLCAwKTtcbiAgICBpZihkdC5nZXRGdWxsWWVhcigpICE9PSB5XG4gICAgICAgIHx8IGR0LmdldE1vbnRoKCkgIT09IG0gLSAxXG4gICAgICAgIHx8IGR0LmdldERhdGUoKSAhPT0gZClcbiAgICB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGR0LnRvSVNPU3RyaW5nKCk7XG4gIH0sXG5cbiAgaXNWYWxpZERhdGUocykge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAvXihcXGQrKVxcLyhcXGQrKVxcLyhcXGQrKSQvLmV4ZWMocyk7XG4gICAgaWYoIW1hdGNoZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgeSA9IHBhcnNlSW50KG1hdGNoZXNbMV0pO1xuICAgIGNvbnN0IG0gPSBwYXJzZUludChtYXRjaGVzWzJdKTtcbiAgICBjb25zdCBkID0gcGFyc2VJbnQobWF0Y2hlc1szXSk7XG4gICAgaWYobSA8IDEgfHwgbSA+IDEyIHx8IGQgPCAxIHx8IGQgPiAzMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHksIG0gLSAxLCBkLCAwLCAwLCAwLCAwKTtcbiAgICBpZihkdC5nZXRGdWxsWWVhcigpICE9PSB5XG4gICAgICAgIHx8IGR0LmdldE1vbnRoKCkgIT09IG0gLSAxXG4gICAgICAgIHx8IGR0LmdldERhdGUoKSAhPT0gZClcbiAgICB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTY2hlZHVsZSBhbiBpbnZvY2F0aW9uIG9yIGludm92YXRpb25zIG9mIGZuKCkgaW4gdGhlIGZ1dHVyZS5cbiAgICogTm90ZSB0aGF0IHRoZSBjYWxsIHRvIGludm9rZSgpIGRvZXMgbm90IGJsb2NrOiBpdCByZXR1cm5zIFxuICAgKiByaWdodCBhd2F5LlxuICAgKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiAtIElmIGludGVydmFsIGlzIHNwZWNpZmllZCBidXQgZW5kIGlzIFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgb21pdGVkLCB0aGVuIG5ldmVyIHN0b3AgaW52b2tpbmcgZm4uXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgSWYgaW50ZXJ2YWwgYW5kIGVuZCBhcmUgb21pdGVkLCB0aGVuIFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAganVzdCBpbnZva2UgZm4gb25jZSBhZnRlciBzdGFydCBtcy5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICBJZiBvbmx5IGZuIGlzIHNwZWNpZmllZCwgYmVoYXZlIGFzIGlzIFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgd2FzIDAuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzIC0gIFdhaXQgc3RhcnQgbWlsbGlzZWNvbmRzLCB0aGVuIGNhbGwgZm4oKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGkgLSAgQ2FsbCBmbigpIGV2ZXJ5IGludGVydmFsIG1pbGxpc2Vjb25kcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGUgLSAgU3RvcHBpbmcgYWZ0ZXIgYSB0b3RhbCBvZiBzdGFydCtlbmQgXG4gICAqICAgICAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcy5cbiAgICovXG4gIGludm9rZShmbiwgcywgaSwgZSkge1xuICAgIGlmICghcykgcyA9IDA7XG4gICAgc2V0VGltZW91dChmbiwgcyk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGggPSBzZXRJbnRlcnZhbChmbiwgaSk7XG4gICAgICAgIGlmIChlKSBzZXRUaW1lb3V0KCgpID0+IHsgY2xlYXJJbnRlcnZhbChoKTsgfSwgZSk7XG4gICAgICB9LCBzKTtcbiAgICB9XG4gIH0sXG5cbiAgaW52b2tlTWFwKGZuLCBzLCBpLCBlKSB7XG4gICAgY29uc3QgYXJnTGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZighcykgcyA9IDA7XG4gICAgbGV0IGlkeCA9IDA7XG4gICAgcmV0dXJuIGFyciA9PiB7XG4gICAgICBjb25zdCBhcnJMZW4gPSBhcnIubGVuZ3RoO1xuICAgICAgY29uc3Qgc2V0VGltZSA9IChvYmosIGlkeCkgPT4gc2V0VGltZW91dChmbi5iaW5kKHRoaXMsIG9iaiksIGkqaWR4KTtcbiAgICAgIHNldFRpbWVvdXQoZm4uYmluZCh0aGlzLCBhcnIuc2hpZnQoKSksIHMpO1xuICAgICAgaWYgKGFyZ0xlbiA+PSAzKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXJyLmZvckVhY2goc2V0VGltZSksIHMpO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0gbW9uaXRvciBjYWxsYmFjayAocmV0dXJuIHRydWUgb3IgZmFsc2UpLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBycyAtIHJlc29sdmUgY2FsbGJhY2sgKG1vbml0b3IgcmVzdWx0cykuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJqIC0gcmVqZWN0IGNhbGxiYWNrICh0aW1lIG91dCkuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVkIC0gY29tcGxldGUgY2FsbGJhY2s7XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzIC0gIFdhaXQgc3RhcnQgbWlsbGlzZWNvbmRzLCB0aGVuIGNhbGwgZm4oKS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGkgLSAgQ2FsbCBmbigpIGV2ZXJ5IGludGVydmFsIG1pbGxpc2Vjb25kcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGUgLSAgU3RvcHBpbmcgYWZ0ZXIgYSB0b3RhbCBvZiBzdGFydCtlbmQgXG4gICAqICAgICAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcy5cbiAgICogXG4gICAqXG4gICAqL1xuICBpbnZva2UyKGZuLCBycywgcmosIGVkLCBzLCBpLCBlKSB7XG4gICAgaWYgKCFzKSBzID0gMDtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IF9hID0gZm4oKTtcbiAgICAgIHJzKF9hKTtcbiAgICAgIGlmKF9hKSByZXR1cm4gZWQoKTtcbiAgICAgIGlmKCFlKSByZXR1cm4gcmooeyBuYW1lOiAnRXJyb3InLCBtZXNzYWdlOiAnVElNRSBPVVQhJyB9KTtcbiAgICB9LCBzKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA2KSB7XG4gICAgICBsZXQgX2IgPSAwO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGggPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgX2EgPSBmbigpO1xuICAgICAgICAgIHJzKF9hKTtcbiAgICAgICAgICBpZihfYSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChoKTtcbiAgICAgICAgICAgIHJldHVybiBlZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZigoZS1zKSA8PSAoaSorK19iKSkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChoKTtcbiAgICAgICAgICAgIHJldHVybiByaih7IG5hbWU6ICdFcnJvcicsIG1lc3NhZ2U6ICdUSU1FIE9VVCEnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgaSk7XG4gICAgICB9LCBzKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVuY29kZSB0aGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QgYXMgaWYgdGhleSB3ZXJlIG5hbWUvdmFsdWUgXG4gICAqIHBhaXJzIGZyb20gYW4gSFRNTCBmb3JtLCBcbiAgICogdXNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGZvcm1hdFxuICAgKi9cbiAgZW5jb2RlRm9ybURhdGEoZGF0YSkge1xuICAgIGlmICghZGF0YSkgcmV0dXJuIFwiXCI7XG4gICAgbGV0IHBhaXJzID0gW107XG4gICAgZm9yKGxldCBuYW1lIGluIGRhdGEpIHtcbiAgICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgY29udGludWU7XG4gICAgICBpZiAodHlwZW9mIGRhdGFbbmFtZV0gPT09IFwiZnVuY3Rpb25cIikgY29udGludWU7XG4gICAgICBsZXQgdmFsdWUgPSBkYXRhW25hbWVdLnRvU3RyaW5nKCk7XG4gICAgICBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUucmVwbGFjZShcIiBcIiwgXCIrXCIpKTtcbiAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlLnJlcGxhY2UoXCIgXCIsIFwiK1wiKSk7XG4gICAgICBwYWlycy5wdXNoKG5hbWUgKyBcIj1cIiArIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbiAgfSxcblxuICAvKipcbiAgICogRGVjb2RlIGFuIEhUTUwgZm9ybSBhcyBpZiB0aGV5IHdlcmUgbmFtZS92YWx1ZSBwYWlycyBmcm9tIFxuICAgKiB0aGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QsIFxuICAgKiB1c2luZyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgZm9ybWF04oayXG4gICAqL1xuICBkZWNvZGVGb3JtRGF0YSh0ZXh0LCBzZXAsIGVxLCBpc0RlY29kZSkge1xuICAgIHRleHQgPSB0ZXh0IHx8IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSk7XG4gICAgc2VwID0gc2VwIHx8ICcmJztcbiAgICBlcSA9IGVxIHx8ICc9JztcbiAgICBjb25zdCBkZWNvZGUgPSAoaXNEZWNvZGUpID8gZGVjb2RlVVJJQ29tcG9uZW50IFxuICAgICAgOiBmdW5jdGlvbihhKSB7IHJldHVybiBhOyB9O1xuICAgIHJldHVybiB0ZXh0LnNwbGl0KHNlcCkucmVkdWNlKGZ1bmN0aW9uKG9iaiwgdikge1xuICAgICAgY29uc3QgcGFpciA9IHYuc3BsaXQoZXEpO1xuICAgICAgb2JqW3BhaXJbMF1dID0gZGVjb2RlKHBhaXJbMV0pO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LCB7fSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlZCBhIHJhbmRhbSBjaGFyYWN0ZXJzLCB1c2luZyAnTWF0aC5yYW5kb20oKScgbWV0aG9kLlxuICAgKiAkbGVuZ3RoOiBudW1iZXIgb2YgY2hhcmFjdGVycyB0byBiZSBnZW5lcmF0ZWQuXG4gICAqIGFkZGVkIFsgLyotKy4sISMkJSYoKX58XyAgXSB0byBtYWtlUmFuZFN0ci5cbiAgICovXG4gIG1ha2VSYW5kUGFzc3dvcmQobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKTEtNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODkvKi0rLiwhIyQlJigpfnxfJztcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgc3RyICs9IGNoYXJzWyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogNzggKSBdO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZWQgYSByYW5kYW0gY2hhcmFjdGVycywgdXNpbmcgJ01hdGgucmFuZG9tKCknIG1ldGhvZC5cbiAgICogJGxlbmd0aDogbnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gYmUgZ2VuZXJhdGVkLlxuICAgKi9cbiAgbWFrZVJhbmRTdHIobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcnMgPVxuICAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKTEtNTk9QUVJTVFVWV1hZWjAxMjM0NTY3ODknO1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICBzdHIgKz0gY2hhcnNbIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiA2MiApIF07XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlZCBhIHJhbmRhbSBjaGFyYWN0ZXJzLCB1c2luZyAnTWF0aC5yYW5kb20oKScgbWV0aG9kLlxuICAgKiAkbGVuZ3RoOiBudW1iZXIgb2YgY2hhcmFjdGVycyB0byBiZSBnZW5lcmF0ZWQuXG4gICAqL1xuICBtYWtlUmFuZEludChsZW5ndGgpIHtcbiAgICBjb25zdCBjaGFycyA9ICcxMjM0NTY3ODknO1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICBzdHIgKz0gY2hhcnNbIE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiA5ICkgXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlSW50KHN0ciwgMTApO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybiBhIGNoYXJhY3RlciBzdHJpbmcgZGVjb2RlZCBmcm9tIEJhc2UgNjQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBCYXNlNjQgY2hhcmFjdG9yIHN0cmluZy5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgZGVjb2RlX2Jhc2U2NChzdHJpbmcpIHtcbiAgICBjb25zdCBiID0gQnVmZmVyLmZyb20oc3RyaW5nLCAnYmFzZTY0JylcbiAgICByZXR1cm4gYi50b1N0cmluZygpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBjaGFyYWN0ZXIgc3RyaW5nIGVuY29kZWQgdG8gQkFTRSA2NC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIEFzY2lpIGNoYXJhY3RvciBzdHJpbmcuXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGVuY29kZV9iYXNlNjQoc3RyaW5nKSB7XG4gICAgY29uc3QgYiA9IEJ1ZmZlci5mcm9tKHN0cmluZyk7XG4gICAgcmV0dXJuIGIudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBjb21iaW5lcyB0d28gZnVuY3Rpb25zLlxuICAgKiBcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gam9pbiAtIGZvcmstam9pbiBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYzEgLSBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYzIgLSBmdW5jdGlvbi5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259XG4gICAqL1xuICBmb3JrKGpvaW4sIGZ1bmMxLCBmdW5jMikge1xuICAgIHJldHVybiB2YWwgPT4gam9pbihmdW5jMSh2YWwpLCBmdW5jMih2YWwpKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gc29ydCB0aGUga2V5IG9mIHRoZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvYmogLSBvYmplY3QuXG4gICAqIEByZXR1cm4ge29iamVjdH0gXG4gICAqL1xuICBrc29ydChvYmope1xuICAgIGNvbnN0IGtleXMgPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoa2V5KSkga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMuc29ydCgpO1xuICAgIGxldCByZXMgPSB7fTtcbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgcmVzW2tleV0gPSBvYmpba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybiBhIGNoYXJhY3RlciBzdHJpbmcgZW5jb2RlIFxuICAgKiBmcm9tIEFzc29jaWF0aXZlIGFycmF5IG9iamVjdC5cbiAgICogXG4gICAqIEBwYXJhbSB7b2JqY3R9IG9iaiAtIHF1ZXJ5IHBhcmFtZXRlciBvYmplY3QuXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIHVybGVuY29kZShvYmopIHtcbiAgICBpZiAoIW9iaikgcmV0dXJuIFwiXCI7XG4gICAgbGV0IHBhaXJzID0gW107XG4gICAgZm9yKGxldCBuYW1lIGluIG9iaikge1xuICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlO1xuICAgICAgaWYgKHR5cGVvZiBvYmpbbmFtZV0gPT09IFwiZnVuY3Rpb25cIikgY29udGludWU7XG4gICAgICBsZXQgdmFsdWUgPSBvYmpbbmFtZV0udG9TdHJpbmcoKTtcbiAgICAgIG5hbWUgPSBlbmNvZGVVUklDb21wb25lbnQobmFtZSk7XG4gICAgICB2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICBwYWlycy5wdXNoKG5hbWUgKyBcIj1cIiArIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZXR1cm4gYSBjaGFyYWN0ZXIgc3RyaW5nIGVuY29kZSBcbiAgICogZnJvbSBBc3NvY2lhdGl2ZSBhcnJheSBvYmplY3QuXG4gICAqIFxuICAgKiBAcGFyYW0ge29iamN0fSBvYmogLSBxdWVyeSBwYXJhbWV0ZXIgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB1cmxlbmNvZGVfZmFrZShvYmopIHtcbiAgICBjb25zdCBrZXlzID0gW107XG4gICAgZm9yKGxldCBrZXkgaW4gb2JqKSB7XG4gICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoa2V5KSkga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXlzLm1hcCgoa2V5LCBpZHgpID0+IGAke2tleX09JHtvYmpba2V5XX1gKVxuICAgICAgLm1hcChwYWlyID0+IHBhaXIucmVwbGFjZShcIiBcIiwgXCIrXCIpKVxuICAgICAgLmpvaW4oJyYnKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZXR1cm4gYSBjaGFyYWN0ZXIgc3RyaW5nIGVuY29kZSBcbiAgICogZnJvbSBBc3NvY2lhdGl2ZSBhcnJheSBvYmplY3QuXG4gICAqIFxuICAgKiBAcGFyYW0ge29iamN0fSBvYmogLSBxdWVyeSBwYXJhbWV0ZXIgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB1cmxlbmNvZGVfcmZjMzk4NihvYmopIHtcbiAgICByZXR1cm4gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KG9iaik7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGNoYXJhY3RlciBzdHJpbmcgZW5jb2RlZCB0byBzaGEyNTYgaGFzaC4gXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBzdHJpbmcgdG8gYmUgY29udmVydGVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjcmV0X2tleSAtIHNlY3JldCBrZXkgc3RyaW5nIHJlcXVpcmVkIGZvciBjb252ZXJzaW9uLlxuICAgKi9cbiAgY3J5cHRvX3NoYTI1NihzdHJpbmcsIHNlY3JldF9rZXkpIHtcbiAgICByZXR1cm4gY3J5cHRvXG4gICAgICAuY3JlYXRlSG1hYygnc2hhMjU2Jywgc2VjcmV0X2tleSlcbiAgICAgIC51cGRhdGUoc3RyaW5nKVxuICAgICAgLmRpZ2VzdCgnYmFzZTY0Jyk7XG4gIH0sXG5cbiAgY3J5cHRvX3Bia2RmMihwYXNzLCBzYWx0LCBsZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmFuZG9tID0gY2JrID0+IGNyeXB0by5yYW5kb21CeXRlcygxMjgsIGNiayk7XG4gICAgICBjb25zdCBwYmtkZjIgPSAoc2x0LCBjYmspID0+XG4gICAgICAgIGNyeXB0by5wYmtkZjIocGFzcywgc2x0LCA3MDAwLCBsZW5ndGgsICdzaGEyNTYnLCBjYmspO1xuICAgICAgY29uc3QgYmluMnN0ciA9IGJpbiA9PiBCdWZmZXIuZnJvbShiaW4pLnRvU3RyaW5nKCdoZXgnKTtcbiAgICAgIGlmKHNhbHQpIHtcbiAgICAgICAgcGJrZGYyKHNhbHQsIChlcnIsIF9oYXNoKSA9PiB7XG4gICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgcmVzb2x2ZSh7IHNhbHQsIGhhc2g6IGJpbjJzdHIoX2hhc2gpIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhbmRvbSgoZXJyLCBfc2FsdCkgPT4ge1xuICAgICAgICAgIHNhbHQgPSBiaW4yc3RyKF9zYWx0KTtcbiAgICAgICAgICBwYmtkZjIoc2FsdCwgKGVyciwgX2hhc2gpID0+IHtcbiAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmVzb2x2ZSh7IHNhbHQsIGhhc2g6IGJpbjJzdHIoX2hhc2gpIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpbnN0YW5jZS4gXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB1cmwgY2hhcmFjdGVyIHN0cmluZy5cbiAgICogQHJldHVybiB7b2JqZWN0fSAtIHJldHVybiB1cmwgaW5zdGFuY2UuXG4gICAqL1xuICBwYXJzZV91cmwodXJsKSB7XG4gICAgcmV0dXJuIG5ldyBVUkwodXJsKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGluc3RhbmNlLiBcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHF1ZXJ5IC0gc2VhcmNoIHF1ZXJ5IG9iamVjdC5cbiAgICogQHJldHVybiB7b2JqZWN0fSAtIHJldHVybiBVUkxTZWFyY2hQYXJhbXMgaW5zdGFuY2UuXG4gICAqL1xuICBwYXJzZV9xdWVyeShxdWVyeSkge1xuICAgIHJldHVybiBuZXcgVVJMU2VhcmNoUGFyYW1zKHF1ZXJ5KTtcbiAgfSxcblxuICBnZXRMb2NhbElTT1RpbWVTdGFtcCAoZGF0ZSkge1xuICAgIGNvbnN0IHNldERhdGUgPSBbXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAsICgnMDAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpKS5zdWJzdHIoLTIpXG4gICAgLCAoJzAwJyArIGRhdGUuZ2V0RGF0ZSgpKS5zdWJzdHIoLTIpXG4gICAgXTtcbiAgICBjb25zdCBzZXRUaW1lID0gW1xuICAgICAgKCcwMCcgKyBkYXRlLmdldEhvdXJzKCkpLnN1YnN0cigtMilcbiAgICAsICgnMDAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnN1YnN0cigtMilcbiAgICAsICgnMDAnICsgZGF0ZS5nZXRTZWNvbmRzKCkpLnN1YnN0cigtMilcbiAgICAsICgnMDAnICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkuc3Vic3RyKC0zKVxuICAgIF07XG4gICAgcmV0dXJuIFtcbiAgICAgIHNldERhdGUuam9pbignLScpLCAnVCcsIHNldFRpbWUuam9pbignOicpXG4gICAgXS5qb2luKCcnKTtcbiAgfSxcblxuICBnZXRMb2NhbElTT1pvbmVTdGFtcCAoZGF0ZSkge1xuICAgIGNvbnN0IHNldE9mZnNldCA9IGQgPT4ge1xuICAgICAgY29uc3QgbyA9IGQuZ2V0VGltZXpvbmVPZmZzZXQoKSAvIC02MDtcbiAgICAgIHJldHVybiAoKDAgPCBvKSA/ICcrJyA6ICctJylcbiAgICAgICAgKyAoJzAwJyArIE1hdGguYWJzKG8pKS5zdWJzdHIoLTIpICsgJzowMCc7IH07XG4gICAgY29uc3Qgc2V0RGF0ZSA9IFtcbiAgICAgIGRhdGUuZ2V0RnVsbFllYXIoKVxuICAgICwgKCcwMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkpLnN1YnN0cigtMilcbiAgICAsICgnMDAnICsgZGF0ZS5nZXREYXRlKCkpLnN1YnN0cigtMilcbiAgICBdO1xuICAgIGNvbnN0IHNldFRpbWUgPSBbXG4gICAgICAoJzAwJyArIGRhdGUuZ2V0SG91cnMoKSkuc3Vic3RyKC0yKVxuICAgICwgKCcwMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSkuc3Vic3RyKC0yKVxuICAgICwgKCcwMCcgKyBkYXRlLmdldFNlY29uZHMoKSkuc3Vic3RyKC0yKVxuICAgICwgKCcwMDAnICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkuc3Vic3RyKC0zKVxuICAgIF07XG4gICAgcmV0dXJuIFtcbiAgICAgIHNldERhdGUuam9pbignLScpLCAnVCcsIHNldFRpbWUuam9pbignOicpLCBzZXRPZmZzZXQoZGF0ZSlcbiAgICBdLmpvaW4oJycpO1xuICB9LFxuXG4gIC8qXG4gICAqIGV4KSBmb3JtYXREYXRlKG5ldyBEYXRlKCcyMDE1LzAzLzA0JyksICdNTU0gZHQsIHl5eXkgW3ddJyk7XG4gICAqID0+IFwiTWFyIDR0aCwgMjAxNSBbV2VkXVwiXG4gICAqIEBwYXJhbSB7ZGF0ZX0gZGF0ZSAtIGRhdGUgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXQgLSBkYXRlIGZvcm1hdC5cbiAgICogQHJldHVybiB7c3RyaW5nfSAtIGZvcm1hdGVkIGRhdGUgc3RyaW5nLlxuICAgKi9cbiAgZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gZGF0ZUZvcm1hdC5mb3JtYXQoZGF0ZSwgZm9ybWF0KTtcbiAgfSxcblxuICBmb3JtYXROdW1iZXIobnVtLCBmb3JtYXQpIHtcbiAgICByZXR1cm4gbnVtRm9ybWF0LmZvcm1hdChudW0sIGZvcm1hdCk7XG4gIH0sXG4gIFxuICByZWdleFppcChwb3N0YWxfY29kZSwgY291bnRyeV9jb2RlKSB7XG4gICAgcmV0dXJuIHppcFJlZ2V4LnJlZ2V4KGNvdW50cnlfY29kZSwgcG9zdGFsX2NvZGUpO1xuICB9LFxuXG4gIC8vcmVnZXhQaG9uZShwaG9uZV9udW1iZXIsIGNvdW50cnlfY29kZSkge1xuICAvLyAgcmV0dXJuIC9eW1xcZCwtXSskLy50ZXN0KHBob25lX251bWJlcik7XG4gIC8vfVxuXG4gIHJlZ2V4TnVtYmVyKG51bWJlcikge1xuICAgIHJldHVybiAvXltcXGQsLV0rJC8udGVzdChudW1iZXIpO1xuICB9LFxuXG4gIHJlZ2V4RW1haWwoYWRkcmVzcykge1xuICAgIHJldHVybiAvXlstYS16MC05fiEkJV4mKl89K317XFwnP10rKFxcLlstYS16MC05fiEkJV4mKl89K317XFwnP10rKSpAKFthLXowLTlfXVthLXowLTlfXSooXFwuWy1hLXowLTlfXSspKlxcLihhZXJvfGFycGF8Yml6fGNvbXxjb29wfGVkdXxnb3Z8aW5mb3xpbnR8bWlsfG11c2V1bXxuYW1lfG5ldHxvcmd8cHJvfHRyYXZlbHxtb2JpfFthLXpdW2Etel0pfChbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9KSkoOlswLTldezEsNX0pPyQvaS50ZXN0KGFkZHJlc3MpO1xuICB9XG5cbn07XG5leHBvcnQgZGVmYXVsdCBzdGQ7XG5cbmNvbnN0IG51bUZvcm1hdCA9IHtcbiAgZm10OiB7XG4gICAgZGRkZGQ6IGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gKCcwMDAwJyArIG51bSkuc2xpY2UoLTUpOyB9LFxuICAgIGRkZGQ6IGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gKCcwMDAnICsgbnVtKS5zbGljZSgtNCk7IH0sXG4gICAgZGRkOiBmdW5jdGlvbihudW0pIHsgcmV0dXJuICgnMDAnICsgbnVtKS5zbGljZSgtMyk7IH0sXG4gICAgZGQ6IGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gKCcwJyArIG51bSkuc2xpY2UoLTIpOyB9LFxuICAgIHQ6IGZ1bmN0aW9uKG51bSkgeyByZXR1cm4gbnVtXG4gICAgICAgIC50b1N0cmluZygpLnJlcGxhY2UoLyhcXGQpKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIkMSxcIik7IH1cbiAgfSxcbiAgZm9ybWF0OiBmdW5jdGlvbiBudW1Gb3JtYXQgKG51bSwgZm9ybWF0KSB7XG4gICAgbGV0IHJlc3VsdCA9IGZvcm1hdDtcbiAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5mbXQpXG4gICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShrZXksIHRoaXMuZm10W2tleV0obnVtKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuLypcbiAqIHN0ZC5kYXRlRm9ybWF0KG5ldyBEYXRlKCksICdZWVlZL01NL0REIGhoOm1tJyk7XG4gKlxuICovIFxuY29uc3QgZGF0ZUZvcm1hdCA9IHtcbiAgZm10IDoge1xuICAgIGhoOiAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuICgnMCcgKyBkYXRlLmdldEhvdXJzKCkpLnNsaWNlKC0yKTsgfSxcbiAgICBoOiAgICBmdW5jdGlvbihkYXRlKSB7IHJldHVybiBkYXRlLmdldEhvdXJzKCk7IH0sXG4gICAgbW06ICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gKCcwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zbGljZSgtMik7IH0sXG4gICAgbTogICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRNaW51dGVzKCk7IH0sXG4gICAgc3M6ICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gKCcwJyArIGRhdGUuZ2V0U2Vjb25kcygpKS5zbGljZSgtMik7IH0sXG4gICAgczogICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRTZWNvbmRzKCk7IH0sXG4gICAgY2NjOiAgZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuICgnMDAnICsgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkuc2xpY2UoLTMpO1xuICAgIH0sXG4gICAgREQ6ICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gKCcwJyArIGRhdGUuZ2V0RGF0ZSgpKS5zbGljZSgtMik7IH0sXG4gICAgRDogICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXREYXRlKCk7IH0sXG4gICAgWVlZWTogZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpICsgJyc7IH0sXG4gICAgWVk6ICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpLTIwMDAgKyAnJzsgfSxcbiAgICB0OiAgICBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCk8PTNcbiAgICAgICAgPyBbXCJzdFwiLCBcIm5kXCIsIFwicmRcIl1bZGF0ZS5nZXREYXRlKCktMV06ICd0aCc7XG4gICAgfSxcbiAgICB3OiAgICBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBcIlN1blwiLCBcIiRvblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXG4gICAgICBdW2RhdGUuZ2V0RGF5KCldO1xuICAgIH0sXG4gICAgTU1NTTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgXCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCIkYXJjaFwiLCBcIkFwcmlsXCIsIFwiJGF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIlxuICAgICAgLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJcbiAgICAgIF1bZGF0ZS5nZXRNb250aCgpXTtcbiAgICB9LFxuICAgIE1NTTogIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIFwiSmFuXCIsIFwiRmViXCIsIFwiJGFyXCIsIFwiQXByXCIsIFwiQGF5XCIsIFwiSnVuXCIsIFwiSmx5XCIsIFwiQXVnXCIsIFwiU3B0XCJcbiAgICAgICwgXCJPY3RcIiwgXCJOb3ZcIiwgXCJEZWNcIlxuICAgICAgXVtkYXRlLmdldE1vbnRoKCldO1xuICAgIH0sICBcbiAgICBNTTogICBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gKCcwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSkuc2xpY2UoLTIpO1xuICAgIH0sXG4gICAgTTogZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMTsgfSxcbiAgICAkOiBmdW5jdGlvbihkYXRlKSB7IHJldHVybiAnTSc7IH1cbiAgfSxcbiAgZm9ybWF0OmZ1bmN0aW9uIGRhdGVGb3JtYXQgKGRhdGUsIGZvcm1hdCkge1xuICAgIGxldCByZXN1bHQgPSBmb3JtYXQ7XG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMuZm10KVxuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2Uoa2V5LCB0aGlzLmZtdFtrZXldKGRhdGUpKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuXG5jb25zdCB6aXBSZWdleCA9IHtcbiAgcmVnOiB7XG4gICAgXCJHQlwiOlwiR0lSWyBdPzBBQXwoKEFCfEFMfEJ8QkF8QkJ8QkR8Qkh8Qkx8Qk58QlJ8QlN8QlR8Q0F8Q0J8Q0Z8Q0h8Q018Q098Q1J8Q1R8Q1Z8Q1d8REF8RER8REV8REd8REh8REx8RE58RFR8RFl8RXxFQ3xFSHxFTnxFWHxGS3xGWXxHfEdMfEdZfEdVfEhBfEhEfEhHfEhQfEhSfEhTfEhVfEhYfElHfElNfElQfElWfEpFfEtBfEtUfEtXfEtZfEx8TEF8TER8TEV8TEx8TE58TFN8TFV8TXxNRXxNS3xNTHxOfE5FfE5HfE5OfE5QfE5SfE5XfE9MfE9YfFBBfFBFfFBIfFBMfFBPfFBSfFJHfFJIfFJNfFN8U0F8U0V8U0d8U0t8U0x8U018U058U098U1B8U1J8U1N8U1R8U1d8U1l8VEF8VER8VEZ8VE58VFF8VFJ8VFN8VFd8VUJ8V3xXQXxXQ3xXRHxXRnxXTnxXUnxXU3xXVnxZT3xaRSkoXFxcXGRbXFxcXGRBLVpdP1sgXT9cXFxcZFtBQkQtSEpMTi1VVy1aXXsyfSkpfEJGUE9bIF0/XFxcXGR7MSw0fVwiLFxuICAgIFwiSkVcIjpcIkpFXFxcXGRbXFxcXGRBLVpdP1sgXT9cXFxcZFtBQkQtSEpMTi1VVy1aXXsyfVwiLFxuICAgIFwiR0dcIjpcIkdZXFxcXGRbXFxcXGRBLVpdP1sgXT9cXFxcZFtBQkQtSEpMTi1VVy1aXXsyfVwiLFxuICAgIFwiSU1cIjpcIklNXFxcXGRbXFxcXGRBLVpdP1sgXT9cXFxcZFtBQkQtSEpMTi1VVy1aXXsyfVwiLFxuICAgIFwiVVNcIjpcIlxcXFxkezV9KFsgXFxcXC1dXFxcXGR7NH0pP1wiLFxuICAgIFwiQ0FcIjpcIltBQkNFR0hKS0xNTlBSU1RWWFldXFxcXGRbQUJDRUdISi1OUFJTVFYtWl1bIF0/XFxcXGRbQUJDRUdISi1OUFJTVFYtWl1cXFxcZFwiLFxuICAgIFwiREVcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJKUFwiOlwiXFxcXGR7M30tXFxcXGR7NH1cIixcbiAgICBcIkZSXCI6XCJcXFxcZHsyfVsgXT9cXFxcZHszfVwiLFxuICAgIFwiQVVcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJJVFwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkNIXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiQVRcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJFU1wiOlwiXFxcXGR7NX1cIixcbiAgICBcIk5MXCI6XCJcXFxcZHs0fVsgXT9bQS1aXXsyfVwiLFxuICAgIFwiQkVcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJES1wiOlwiXFxcXGR7NH1cIixcbiAgICBcIlNFXCI6XCJcXFxcZHszfVsgXT9cXFxcZHsyfVwiLFxuICAgIFwiTk9cIjpcIlxcXFxkezR9XCIsXG4gICAgXCJCUlwiOlwiXFxcXGR7NX1bXFxcXC1dP1xcXFxkezN9XCIsXG4gICAgXCJQVFwiOlwiXFxcXGR7NH0oW1xcXFwtXVxcXFxkezN9KT9cIixcbiAgICBcIkZJXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiQVhcIjpcIjIyXFxcXGR7M31cIixcbiAgICBcIktSXCI6XCJcXFxcZHszfVtcXFxcLV1cXFxcZHszfVwiLFxuICAgIFwiQ05cIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJUV1wiOlwiXFxcXGR7M30oXFxcXGR7Mn0pP1wiLFxuICAgIFwiU0dcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJEWlwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkFEXCI6XCJBRFxcXFxkezN9XCIsXG4gICAgXCJBUlwiOlwiKFtBLUhKLU5QLVpdKT9cXFxcZHs0fShbQS1aXXszfSk/XCIsXG4gICAgXCJBTVwiOlwiKDM3KT9cXFxcZHs0fVwiLFxuICAgIFwiQVpcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJCSFwiOlwiKCgxWzAtMl18WzItOV0pXFxcXGR7Mn0pP1wiLFxuICAgIFwiQkRcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJCQlwiOlwiKEJCXFxcXGR7NX0pP1wiLFxuICAgIFwiQllcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJCTVwiOlwiW0EtWl17Mn1bIF0/W0EtWjAtOV17Mn1cIixcbiAgICBcIkJBXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiSU9cIjpcIkJCTkQgMVpaXCIsXG4gICAgXCJCTlwiOlwiW0EtWl17Mn1bIF0/XFxcXGR7NH1cIixcbiAgICBcIkJHXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiS0hcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJDVlwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkNMXCI6XCJcXFxcZHs3fVwiLFxuICAgIFwiQ1JcIjpcIlxcXFxkezQsNX18XFxcXGR7M30tXFxcXGR7NH1cIixcbiAgICBcIkhSXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiQ1lcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJDWlwiOlwiXFxcXGR7M31bIF0/XFxcXGR7Mn1cIixcbiAgICBcIkRPXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiRUNcIjpcIihbQS1aXVxcXFxkezR9W0EtWl18KD86W0EtWl17Mn0pP1xcXFxkezZ9KT9cIixcbiAgICBcIkVHXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiRUVcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJGT1wiOlwiXFxcXGR7M31cIixcbiAgICBcIkdFXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiR1JcIjpcIlxcXFxkezN9WyBdP1xcXFxkezJ9XCIsXG4gICAgXCJHTFwiOlwiMzlcXFxcZHsyfVwiLFxuICAgIFwiR1RcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJIVFwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkhOXCI6XCIoPzpcXFxcZHs1fSk/XCIsXG4gICAgXCJIVVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIklTXCI6XCJcXFxcZHszfVwiLFxuICAgIFwiSU5cIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJJRFwiOlwiXFxcXGR7NX1cIixcbiAgICBcIklMXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiSk9cIjpcIlxcXFxkezV9XCIsXG4gICAgXCJLWlwiOlwiXFxcXGR7Nn1cIixcbiAgICBcIktFXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiS1dcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJMQVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkxWXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiTEJcIjpcIihcXFxcZHs0fShbIF0/XFxcXGR7NH0pPyk/XCIsXG4gICAgXCJMSVwiOlwiKDk0OFs1LTldKXwoOTQ5WzAtN10pXCIsXG4gICAgXCJMVFwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkxVXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiTUtcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJNWVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIk1WXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiTVRcIjpcIltBLVpdezN9WyBdP1xcXFxkezIsNH1cIixcbiAgICBcIk1VXCI6XCIoXFxcXGR7M31bQS1aXXsyfVxcXFxkezN9KT9cIixcbiAgICBcIk1YXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiTURcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJNQ1wiOlwiOTgwXFxcXGR7Mn1cIixcbiAgICBcIk1BXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiTlBcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJOWlwiOlwiXFxcXGR7NH1cIixcbiAgICBcIk5JXCI6XCIoKFxcXFxkezR9LSk/XFxcXGR7M30tXFxcXGR7M30oLVxcXFxkezF9KT8pP1wiLFxuICAgIFwiTkdcIjpcIihcXFxcZHs2fSk/XCIsXG4gICAgXCJPTVwiOlwiKFBDICk/XFxcXGR7M31cIixcbiAgICBcIlBLXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiUFlcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJQSFwiOlwiXFxcXGR7NH1cIixcbiAgICBcIlBMXCI6XCJcXFxcZHsyfS1cXFxcZHszfVwiLFxuICAgIFwiUFJcIjpcIjAwWzY3OV1cXFxcZHsyfShbIFxcXFwtXVxcXFxkezR9KT9cIixcbiAgICBcIlJPXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiUlVcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJTTVwiOlwiNDc4OVxcXFxkXCIsXG4gICAgXCJTQVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIlNOXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiU0tcIjpcIlxcXFxkezN9WyBdP1xcXFxkezJ9XCIsXG4gICAgXCJTSVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIlpBXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiTEtcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJUSlwiOlwiXFxcXGR7Nn1cIixcbiAgICBcIlRIXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiVE5cIjpcIlxcXFxkezR9XCIsXG4gICAgXCJUUlwiOlwiXFxcXGR7NX1cIixcbiAgICBcIlRNXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiVUFcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJVWVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIlVaXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiVkFcIjpcIjAwMTIwXCIsXG4gICAgXCJWRVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIlpNXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiQVNcIjpcIjk2Nzk5XCIsXG4gICAgXCJDQ1wiOlwiNjc5OVwiLFxuICAgIFwiQ0tcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJSU1wiOlwiXFxcXGR7Nn1cIixcbiAgICBcIk1FXCI6XCI4XFxcXGR7NH1cIixcbiAgICBcIkNTXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiWVVcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJDWFwiOlwiNjc5OFwiLFxuICAgIFwiRVRcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJGS1wiOlwiRklRUSAxWlpcIixcbiAgICBcIk5GXCI6XCIyODk5XCIsXG4gICAgXCJGTVwiOlwiKDk2OTRbMS00XSkoWyBcXFxcLV1cXFxcZHs0fSk/XCIsXG4gICAgXCJHRlwiOlwiOVs3OF0zXFxcXGR7Mn1cIixcbiAgICBcIkdOXCI6XCJcXFxcZHszfVwiLFxuICAgIFwiR1BcIjpcIjlbNzhdWzAxXVxcXFxkezJ9XCIsXG4gICAgXCJHU1wiOlwiU0lRUSAxWlpcIixcbiAgICBcIkdVXCI6XCI5NjlbMTIzXVxcXFxkKFsgXFxcXC1dXFxcXGR7NH0pP1wiLFxuICAgIFwiR1dcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJITVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIklRXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiS0dcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJMUlwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkxTXCI6XCJcXFxcZHszfVwiLFxuICAgIFwiTUdcIjpcIlxcXFxkezN9XCIsXG4gICAgXCJNSFwiOlwiOTY5WzY3XVxcXFxkKFsgXFxcXC1dXFxcXGR7NH0pP1wiLFxuICAgIFwiTU5cIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJNUFwiOlwiOTY5NVswMTJdKFsgXFxcXC1dXFxcXGR7NH0pP1wiLFxuICAgIFwiTVFcIjpcIjlbNzhdMlxcXFxkezJ9XCIsXG4gICAgXCJOQ1wiOlwiOTg4XFxcXGR7Mn1cIixcbiAgICBcIk5FXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiVklcIjpcIjAwOCgoWzAtNF1cXFxcZCl8KDVbMDFdKSkoWyBcXFxcLV1cXFxcZHs0fSk/XCIsXG4gICAgXCJQRlwiOlwiOTg3XFxcXGR7Mn1cIixcbiAgICBcIlBHXCI6XCJcXFxcZHszfVwiLFxuICAgIFwiUE1cIjpcIjlbNzhdNVxcXFxkezJ9XCIsXG4gICAgXCJQTlwiOlwiUENSTiAxWlpcIixcbiAgICBcIlBXXCI6XCI5Njk0MFwiLFxuICAgIFwiUkVcIjpcIjlbNzhdNFxcXFxkezJ9XCIsXG4gICAgXCJTSFwiOlwiKEFTQ058U1RITCkgMVpaXCIsXG4gICAgXCJTSlwiOlwiXFxcXGR7NH1cIixcbiAgICBcIlNPXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiU1pcIjpcIltITE1TXVxcXFxkezN9XCIsXG4gICAgXCJUQ1wiOlwiVEtDQSAxWlpcIixcbiAgICBcIldGXCI6XCI5ODZcXFxcZHsyfVwiLFxuICAgIFwiWEtcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJZVFwiOlwiOTc2XFxcXGR7Mn1cIixcbiAgICBcIlpaXCI6XCJbXFxcXGQsLV0rXCJcbiAgfSxcbiAgcmVnZXg6IGZ1bmN0aW9uKGNvdW50cnlfY29kZSwgcG9zdGFsX2NvZGUpIHtcbiAgICBjb25zdCByZWcgPSB0aGlzLnJlZ1tjb3VudHJ5X2NvZGVdXG4gICAgICA/IHRoaXMucmVnW2NvdW50cnlfY29kZV0gOiB0aGlzLnJlZ1snWlonXVxuICAgIHJldHVybiBuZXcgUmVnRXhwKCdeJytyZWcrJyQnKS50ZXN0KHBvc3RhbF9jb2RlKTsgfVxufTtcbiIsImltcG9ydCB7IHBhcnNlIH0gIGZyb20gJ2lzbzg2MDEtZHVyYXRpb24nO1xuaW1wb3J0IFNwaW5uZXIgICAgZnJvbSAnVXRpbGl0aWVzL3NwaW4nO1xuXG5sZXQgTG9nZ2VyID0gbnVsbDtcbmxldCBTcGluZXIgPSBudWxsO1xubGV0IHRhcmdldCA9IG51bGw7XG5cbmNvbnN0IHV0aWwgPSB7XG4gIGdldENTVkhlYWRlcihvYmopIHtcbiAgICBsZXQgYXJyID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBwcm9wIGluIG9iaikge1xuICAgICAgYXJyLnB1c2gocHJvcCk7XG4gICAgfVxuICAgIHJldHVybiBhcnIuam9pbigpICsgJ1xcbic7XG4gIH0sXG4gIHNldENTVkhlYWRlcihvYmpzKSB7XG4gICAgbGV0IGFyciA9IG5ldyBBcnJheSgpO1xuICAgIGZvcihsZXQgcHJvcCBpbiBvYmpzWzBdKSB7XG4gICAgICBhcnIucHVzaChwcm9wKTtcbiAgICB9XG4gICAgb2JqLnVuc2hpZnQoYXJyKTtcbiAgICByZXR1cm4gb2JqcztcbiAgfSxcbiAgdG9MZWZ0RGF5cyhkYXRlKSB7XG4gICAgY29uc3Qgb2JqID0gcGFyc2UoZGF0ZSk7XG4gICAgcmV0dXJuIChcbiAgICAgICAgYCR7b2JqLmRheXN9IGRheXNgICsgJyAvICdcbiAgICAgICsgYCR7b2JqLmhvdXJzfSBob3Vyc2AgKyAnIC8gJ1xuICAgICAgKyBgJHtvYmoubWludXRlc30gbWludXRlc2ApO1xuICB9XG59O1xuXG5jb25zdCBNID0ge1xuICBmb3JrKGpvaW4sIGZ1bmMxLCBmdW5jMikge1xuICAgIHJldHVybiB2YWwgPT4gam9pbihmdW5jMSh2YWwpLCBmdW5jMih2YWwpKTtcbiAgfVxufTtcblxuY29uc3QgbG9nID0ge1xuICBMb2dnZXIsXG4gIGNvbmZpZyhhcGQsIGx5dCwgZmx2LCBuYW0pIHtcbiAgICBjb25zdCBhcGRzID0ge1xuICAgICAgJ2FsZXJ0JzogICAgICBuZXcgTG9nNGpzLkpTQWxlcnRBcHBlbmRlcigpXG4gICAgICAsICdjb25zb2xlJzogIG5ldyBMb2c0anMuQnJvd3NlckNvbnNvbGVBcHBlbmRlcigpXG4gICAgfTtcbiAgICBjb25zdCBseXRzID0ge1xuICAgICAgJ2Jhc2ljJzogICAgICBuZXcgTG9nNGpzLkJhc2ljTGF5b3V0KClcbiAgICAgICwgJ2pzb24nOiAgICAgbmV3IExvZzRqcy5KU09OTGF5b3V0KClcbiAgICAgICwgJ3htbCc6ICAgICAgbmV3IExvZzRqcy5YTUxMYXlvdXQoKVxuICAgIH07XG4gICAgY29uc3QgZmx2cyA9IHtcbiAgICAgICdPRkYnOiAgICAgICAgTG9nNGpzLkxldmVsLk9GRlxuICAgICAgLCAnRkFUQUwnOiAgICBMb2c0anMuTGV2ZWwuRkFUQUxcbiAgICAgICwgJ0VSUk9SJzogICAgTG9nNGpzLkxldmVsLkVSUk9SXG4gICAgICAsICdXQVJOJzogICAgIExvZzRqcy5MZXZlbC5XQVJOXG4gICAgICAsICdJTkZPJzogICAgIExvZzRqcy5MZXZlbC5JTkZPXG4gICAgICAsICdERUJVRyc6ICAgIExvZzRqcy5MZXZlbC5ERUJVR1xuICAgICAgLCAnVFJBQ0UnOiAgICBMb2c0anMuTGV2ZWwuVFJBQ0VcbiAgICAgICwgJ0FMTCc6ICAgICAgTG9nNGpzLkxldmVsLkFMTFxuICAgIH07XG4gICAgY29uc3QgYXBwZW5kZXIgPSBhcGRzW2FwZF07XG4gICAgYXBwZW5kZXIuc2V0TGF5b3V0KGx5dHNbbHl0XSk7XG4gICAgY29uc3QgbG9nZ2VyID0gbmV3IExvZzRqcy5nZXRMb2dnZXIobmFtKTtcbiAgICBsb2dnZXIuYWRkQXBwZW5kZXIoYXBwZW5kZXIpO1xuICAgIHRoaXMuTG9nZ2VyID0gbG9nZ2VyO1xuICB9LFxuICBsb2dnZXIobWx2LCBtc2cpIHtcbiAgICBjb25zdCBfbXNnID0gbXNnLm1hcCggdmFsID0+IHtcbiAgICAgIGlmKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWwsIG51bGwsIDQpO1xuICAgICAgfSBlbHNlIGlmKHZhbCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnPyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuTG9nZ2VyLmxvZyhtbHYsIF9tc2cuam9pbignICcpLCBudWxsKTtcbiAgfSxcbiAgZmF0YWwobXNnKSAge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRoaXMubG9nZ2VyKCdGQVRBTCcsICBhcmdzKTtcbiAgfSxcbiAgZXJyb3IobXNnKSAge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRoaXMubG9nZ2VyKCdFUlJPUicsICBhcmdzKTtcbiAgfSxcbiAgd2Fybihtc2cpICAge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRoaXMubG9nZ2VyKCdXQVJOJywgICBhcmdzKTtcbiAgfSxcbiAgaW5mbyhtc2cpICAge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRoaXMubG9nZ2VyKCdJTkZPJywgICBhcmdzKTtcbiAgfSxcbiAgZGVidWcobXNnKSAge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRoaXMubG9nZ2VyKCdERUJVRycsICBhcmdzKTtcbiAgfSxcbiAgdHJhY2UobXNnKSAge1xuICAgIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHRoaXMubG9nZ2VyKCdUUkFDRScsICBhcmdzKTtcbiAgfVxufTtcblxuY29uc3Qgc3BuID0ge1xuICBTcGlubmVyLFxuICB0YXJnZXQsXG4gIGNvbmZpZyh0YXJnZXQpIHtcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgbGluZXM6ICAgICAgICAxMyAgLy8gVGhlIG51bWJlciBvZiBsaW5lcyB0byBkcmF3XG4gICAgICAsIGxlbmd0aDogICAgIDI4ICAvLyBUaGUgbGVuZ3RoIG9mIGVhY2ggbGluZVxuICAgICAgLCB3aWR0aDogICAgICAxNCAgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG4gICAgICAsIHJhZGl1czogICAgIDQyICAvLyBUaGUgcmFkaXVzIG9mIHRoZSBpbm5lciBjaXJjbGVcbiAgICAgICwgc2NhbGU6ICAgICAgMSAgIC8vIFNjYWxlcyBvdmVyYWxsIHNpemUgb2YgdGhlIHNwaW5uZXJcbiAgICAgICwgY29ybmVyczogICAgMSAgIC8vIENvcm5lciByb3VuZG5lc3MgKDAuLjEpXG4gICAgICAsIGNvbG9yOiAgICAgICcjMDAwJyAvLyAjcmdiIG9yICNycmdnYmIgb3IgYXJyYXkgb2YgY29sb3JzXG4gICAgICAsIG9wYWNpdHk6ICAgIDAuMjUgLy8gT3BhY2l0eSBvZiB0aGUgbGluZXNcbiAgICAgICwgcm90YXRlOiAgICAgMCAgIC8vIFRoZSByb3RhdGlvbiBvZmZzZXRcbiAgICAgICwgZGlyZWN0aW9uOiAgMSAgIC8vIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2VcbiAgICAgICwgc3BlZWQ6ICAgICAgMSAgIC8vIFJvdW5kcyBwZXIgc2Vjb25kXG4gICAgICAsIHRyYWlsOiAgICAgIDYwICAvLyBBZnRlcmdsb3cgcGVyY2VudGFnZVxuICAgICAgLCBmcHM6ICAgICAgICAyMCAgLy8gRnJhbWVzIHBlciBzZWNvbmQgd2hlbiB1c2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dCgpIGFzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhIGZhbGxiYWNrIGZvciBDU1NcbiAgICAgICwgekluZGV4OiAgICAgMmU5IC8vIFRoZSB6LWluZGV4IChkZWZhdWx0cyB0byAyMDAwMDAwMDAwKVxuICAgICAgLCBjbGFzc05hbWU6ICAnc3Bpbm5lcicgICAvLyBUaGUgQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIHNwaW5uZXJcbiAgICAgICwgdG9wOiAgICAgICAgJzQ5JScgLy8gVG9wIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHBhcmVudFxuICAgICAgLCBsZWZ0OiAgICAgICAnNDklJyAvLyBMZWZ0IHBvc2l0aW9uIHJlbGF0aXZlIHRvIHBhcmVudFxuICAgICAgLCBzaGFkb3c6ICAgICBmYWxzZSAvLyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuICAgICAgLCBod2FjY2VsOiAgICBmYWxzZSAvLyBXaGV0aGVyIHRvIHVzZSBoYXJkd2FyZSBhY2NlbGVyYXRpb25cbiAgICAgICwgcG9zaXRpb246ICAgJ2Fic29sdXRlJyAvLyBFbGVtZW50IHBvc2l0aW9uaW5nXG4gICAgfTtcbiAgICB0aGlzLlNwaW5uZXIgPSBuZXcgU3Bpbm5lcihvcHRzKTtcbiAgICB0aGlzLnRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldCk7XG4gIH0sXG4gIHNwaW4oKSB7IHRoaXMuU3Bpbm5lci5zcGluKHRoaXMudGFyZ2V0KTsgfSxcbiAgc3RvcCgpICB7IHRoaXMuU3Bpbm5lci5zdG9wKCk7IH1cbn07XG5cbmNvbnN0IHN0b3IgPSB7XG4gIC8qKlxuICAgKiBzZXRDb29raWVzXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcGFyYW0gZGF5c1RvTGl2ZVxuICAgKi9cbiAgc2V0Q29va2llcyhuYW1lLCB2YWx1ZSwgZGF5c1RvTGl2ZSkge1xuICAgIGxldCBjb29raWUgPSBuYW1lICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgIGlmKHR5cGVvZiBkYXlzVG9MaXZlID09PSBcIm51bWJlclwiKVxuICAgICAgY29va2llICs9IFwiOyBtYXgtYWdlPVwiICsgKGRheXNUb0xpdmUqNjAqNjAqMjQpO1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZTtcbiAgfSxcblxuICAvKipcbiAgICogZ2V0Q29va2llc1xuICAgKiBSZXR1cm4gdGhlIGRvY3VtZW50J3MgY29va2llcyBhcyBhbiBvYmplY3Qgb2YgbmFtZS92YWx1ZVxuICAgKiBwYWlycy5Bc3N1bWUgdGhhdCBjb29raWUgdmFsdWVzIGFyZSBlbmNvZGVkIHdpdGhcbiAgICogZW5jb2RlVVJJQ29tcG9uZW50KCkuXG4gICAqXG4gICAqIEByZXR1cm5zIHtvYmplY3R9IC0gU3RvcmUgbmFtZSBhbmQgdmFsdWUgaW4gb2JqZWN0LlxuICAgKi9cbiAgZ2V0Q29va2llcygpIHtcbiAgICAgIGxldCBjb29raWVzID0ge307XG4gICAgICBjb25zdCBhbGwgPSBkb2N1bWVudC5jb29raWU7XG4gICAgICBpZiAoYWxsID09PSBcIlwiKVxuICAgICAgICAgIHJldHVybiBjb29raWVzO1xuICAgICAgY29uc3QgbGlzdCA9IGFsbC5zcGxpdChcIjsgXCIpO1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBjb29raWUgPSBsaXN0W2ldO1xuICAgICAgICAgIGNvbnN0IHAgPSBjb29raWUuaW5kZXhPZihcIj1cIik7XG4gICAgICAgICAgY29uc3QgbmFtZSA9IGNvb2tpZS5zdWJzdHJpbmcoMCxwKTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvb2tpZS5zdWJzdHJpbmcocCsxKTtcbiAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgY29va2llc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvb2tpZVN0b3JhZ2VcbiAgICogVGhpcyBjbGFzcyBpbXBsZW1lbnRzIHRoZSBTdG9yYWdlIEFQSSB0aGF0IGxvY2FsU3RvcmFnZSBhbmRcbiAgICogc2Vzc2lvblN0b3JhZ2UgZG8sIGJ1dCBpbXBsZW1lbnRzIGl0IG9uIHRvcCBvZiBIVFRQIENvb2tpZXMuXG4gICAqXG4gICAqIEBwYXJhbSBtYXhhZ2Uge251bWJlcn0gLSBsaWZldGltZVxuICAgKiBAcGFyYW0gcGF0aCB7c3RyaW5nfSAtIHNjb3BlXG4gICAqL1xuICBDb29raWVTdG9yYWdlKG1heGFnZSwgcGF0aCkge1xuICAgICAgY29uc3QgY29va2llcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICBsZXQgY29va2llcyA9IHt9O1xuICAgICAgICAgIGNvbnN0IGFsbCA9IGRvY3VtZW50LmNvb2tpZTtcbiAgICAgICAgICBpZiAoYWxsID09PSBcIlwiKVxuICAgICAgICAgICAgICByZXR1cm4gY29va2llcztcbiAgICAgICAgICBjb25zdCBsaXN0ID0gYWxsLnNwbGl0KFwiOyBcIik7XG4gICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgY29uc3QgY29va2llID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgY29uc3QgcCA9IGNvb2tpZS5pbmRleE9mKFwiPVwiKTtcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGNvb2tpZS5zdWJzdHJpbmcoMCxwKTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjb29raWUuc3Vic3RyaW5nKHArMSk7XG4gICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgY29va2llc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29va2llcztcbiAgICAgIH0oKSk7XG4gICAgICBsZXQga2V5cyA9IFtdO1xuICAgICAgZm9yKGxldCBrZXkgaW4gY29va2llcykga2V5cy5wdXNoKGtleSk7XG4gICAgICB0aGlzLmxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgICAgdGhpcy5rZXkgPSBmdW5jdGlvbihuKSB7XG4gICAgICAgICAgaWYgKG4gPCAwIHx8IG4gPj0ga2V5cy5sZW5ndGgpIHJldHVybiBudWxsO1xuICAgICAgICAgIHJldHVybiBrZXlzW25dO1xuICAgICAgfTtcbiAgICAgIHRoaXMuZ2V0SXRlbSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGNvb2tpZXNbbmFtZV0gfHwgbnVsbDtcbiAgICAgIH07XG4gICAgICB0aGlzLnNldEl0ZW0gPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCEoa2V5IGluIGNvb2tpZXMpKSB7XG4gICAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xuICAgICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb29raWVzW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICBsZXQgY29va2llID0ga2V5ICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgIGlmIChtYXhhZ2UpIGNvb2tpZSArPSBcIjsgbWF4LWFnZT1cIiArIG1heGFnZTtcbiAgICAgICAgICBpZiAocGF0aCkgY29va2llICs9IFwiOyBwYXRoPVwiICsgcGF0aDtcbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gICAgICB9O1xuICAgICAgdGhpcy5yZW1vdmVJdGVtID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgaWYgKCEoa2V5IGluIGNvb2tpZXMpKSByZXR1cm47XG4gICAgICAgICAgZGVsZXRlIGNvb2tpZXNba2V5XTtcbiAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBpZiAoa2V5c1tpXSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICBrZXlzLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBrZXkgKyBcIj07IG1heC1hZ2U9MFwiO1xuICAgICAgfTtcbiAgICAgIHRoaXMuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0ga2V5c1tpXSArIFwiPTsgbWF4LWFnZT0wXCI7XG4gICAgICAgICAgY29va2llcyA9IHt9O1xuICAgICAgICAgIGtleXMgPSBbXTtcbiAgICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBVc2VyRGF0YVN0b3JhZ2VcbiAgICogQ3JlYXRlIGEgZG9jdW1lbnQgZWxlbWVudCBhbmQgaW5zdGFsbCB0aGUgc3BlY2lhbCB1c2VyRGF0YVxuICAgKiBiZWhhdmlvciBvbiBpdCBzbyBpdCBnZXRzIHNhdmUoKSBhbmQgbG9hZCgpIG1ldGhvZHMuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhhZ2UgLSBJZiBtYXhhZ2UgaXMgc3BlY2lmaWVkLCBleHBpcmUgdGhlXG4gICAqICAgICAgICAgICAgICAgICAgdXNlckRhdGEgaW4gbWF4YWdlIHNlY29uZHNcbiAgICovXG4gIFVzZXJEYXRhU3RvcmFnZShtYXhhZ2UpICB7XG4gICAgICBjb25zdCBtZW1vcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbWVtb3J5LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIG1lbW9yeS5zdHlsZS5iZWhhdmlvciA9IFwidXJsKCcjZGVmYXVsdCN1c2VyRGF0YScpXCI7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1lbW9yeSk7XG4gICAgICBpZiAobWF4YWdlKSB7XG4gICAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgY29uc3QgZXhwaXJlcyA9IG5vdyArIG1heGFnZSAqIDEwMDA7XG4gICAgICAgICAgbWVtb3J5LmV4cGlyZXMgPSBuZXcgRGF0ZShleHBpcmVzKS50b1VUQ1N0cmluZygpO1xuICAgICAgfVxuICAgICAgbWVtb3J5LmxvYWQoXCJVc2VyRGF0YVN0b3JhZ2VcIik7XG4gICAgICB0aGlzLmdldEl0ZW0gPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbWVtb3J5LmdldEF0dHJpYnV0ZShrZXkpIHx8IG51bGw7XG4gICAgICB9O1xuICAgICAgdGhpcy5zZXRJdGVtID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgIG1lbW9yeS5zZXRBdHRyaWJ1dGUoa2V5LHZhbHVlKTtcbiAgICAgICAgICBtZW1vcnkuc2F2ZShcIlVzZXJEYXRhU3RvcmFnZVwiKTtcbiAgICAgIH07XG4gICAgICB0aGlzLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICBtZW1vcnkucmVtb3ZlQXR0cmlidXRlKGtleSk7XG4gICAgICAgICAgbWVtb3J5LnNhdmUoXCJVc2VyRGF0YVN0b3JhZ2VcIik7XG4gICAgICB9O1xuICB9XG59O1xuZXhwb3J0IHsgTSwgbG9nLCBzcG4sIHN0b3IsIHV0aWwgfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNyeXB0b1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxdWVyeXN0cmluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==