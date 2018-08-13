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
/******/ 	var hotCurrentHash = "1c61c8b819348bfc72f6";
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
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvbGliL0Jhc2VFdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvbGliL0VtaXR0ZXJTdWJzY3JpcHRpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmVtaXR0ZXIvbGliL0V2ZW50U3Vic2NyaXB0aW9uLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJlbWl0dGVyL2xpYi9FdmVudFN1YnNjcmlwdGlvblZlbmRvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL0V4ZWN1dGlvbkVudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvY2FtZWxpemUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9jYW1lbGl6ZVN0eWxlTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2NvbnRhaW5zTm9kZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2dldEFjdGl2ZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9oeXBoZW5hdGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9oeXBoZW5hdGVTdHlsZU5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pc05vZGUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pc1RleHROb2RlLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvc2hhbGxvd0VxdWFsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2lzbzg2MDEtZHVyYXRpb24vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvY2hlY2tQcm9wVHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9GbHV4Q29udGFpbmVyQ29udmVydGVyLmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMvQXBwQWN0aW9uLmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMvQ29tcGxldGVBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vYWN0aW9ucy9Ob3RlQWN0aW9uLmpzIiwid2VicGFjazovLy8uL2FjdGlvbnMvUHJvZHVjdHNBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBCb2R5L0FwcEJvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBGb3JtL0FwcEZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9BcHBTaWRlYmFyL0FwcFNpZGViYXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Db21wbGV0ZUJvZHkvQ29tcGxldGVCb2R5LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQ29tcGxldGVTaWRlYmFyL0NvbXBsZXRlU2lkZWJhci5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0NvbXBsZXRlVGFibGUvQ29tcGxldGVUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0NvbnRlbnRzL0NvbnRlbnRzLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeS9FcnJvckJvdW5kYXJ5LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvR2xvYmFsRm9vdGVyL0dsb2JhbEZvb3Rlci5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0dsb2JhbEhlYWRlci9HbG9iYWxIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ob3RlQm9keS9Ob3RlQm9keS5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL05vdGVTaWRlYmFyL05vdGVTaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTm90ZVRhYmxlL05vdGVUYWJsZS5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Byb2R1Y3RzQm9keS9Qcm9kdWN0c0JvZHkuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Qcm9kdWN0c1NpZGViYXIvUHJvZHVjdHNTaWRlYmFyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUHJvZHVjdHNUYWJsZS9Qcm9kdWN0c1RhYmxlLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUmFkaW8vUmFkaW8uanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9UYWJzL1RhYnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzcGF0Y2hlci5qcyIsIndlYnBhY2s6Ly8vLi9tYWluLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL0FwcC9BcHAuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvQ29tcGxldGUvQ29tcGxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvTm90ZS9Ob3RlLmpzIiwid2VicGFjazovLy8uL3BhZ2VzL1Byb2R1Y3RzL1Byb2R1Y3RzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL05vdGVBcGlDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3RvcmVzL2FwcFN0b3JlLmpzIiwid2VicGFjazovLy8uL3N0b3Jlcy9jb21wbGV0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL3N0b3Jlcy9ub3RlU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3RvcmVzL3Byb2R1Y3RzU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvaXBjdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbHMvc3Bpbi5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy9zdGR1dGlscy5qcyIsIndlYnBhY2s6Ly8vLi91dGlscy93ZWJ1dGlscy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJlbGVjdHJvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicXVlcnlzdHJpbmdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiY29udmVydCIsImNvbnRhaW5lckNsYXNzIiwidG1wIiwiYXJncyIsInByb3RvdHlwZSIsImdldFN0b3JlcyIsImNhbGN1bGF0ZVN0YXRlIiwicHNwaWQiLCJzZWxlY3RlZENvbnRlbnQiLCJzZWxlY3RlZCIsInRpdGxlIiwiZGlzcGF0Y2giLCJ0eXBlIiwiZmV0Y2hDb25maWciLCJOb3RlQXBpQ2xpZW50IiwiZ2V0Q29uZmlnIiwidGhlbiIsImNvbmZpZyIsIndyaXRlQ29uZmlnIiwib2JqIiwicHV0Q29uZmlnIiwid3JpdGVJbnZlbnRvcnlJdGVtcyIsIm9wdGlvbnMiLCJwaXBlIiwibWFwIiwib2JqcyIsImluY3JlbWVudCIsInBhZ2UiLCJsb2ciLCJ0cmFjZSIsInNwbiIsInNwaW4iLCJmZXRjaENvbXBsZXRlSXRlbXMiLCJpdGVtcyIsImluZm8iLCJzdG9wIiwiZGVjcmVtZW50Iiwid3JpdGVDb21wbGV0ZUl0ZW1zIiwiZGlzcGxheU5hbWUiLCJmZXRjaEl0ZW1zIiwid3JpdGVJdGVtcyIsImZldGNoUHJvZHVjdHNJdGVtcyIsIndyaXRlUHJvZHVjdHNJdGVtcyIsIkFwcEJvZHkiLCJwcm9wcyIsIlJlYWN0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCIsIkFwcEZvcm0iLCJzdGF0ZSIsImFwcGlkIiwiY2VydGlkIiwidG9rZW4iLCJydW5hbWUiLCJhdXRob3JpemVBcGkiLCJvYXV0aDJBcGkiLCJmaW5kaW5nQXBpIiwidHJhZGluZ0FwaSIsImludmVudG9yeUFwaSIsIm1hcmtldGluZ0FwaSIsImFuYWx5dGljc0FwaSIsImUiLCJuZXdTdGF0ZSIsInNldFN0YXRlIiwicHJldmVudERlZmF1bHQiLCJuZXdDb25maWciLCJPYmplY3QiLCJhc3NpZ24iLCJBcHBBY3Rpb24iLCJjYXRjaCIsImVycm9yIiwiZXJyIiwibmFtZSIsIm1lc3NhZ2UiLCJ0YXJnZXQiLCJ2YWx1ZSIsImhhbmRsZUNoYW5nZVRleHQiLCJiaW5kIiwiaGFuZGxlQ2hhbmdlUmVzZXQiLCJoYW5kbGVDaGFuZ2VTYXZlIiwiQXBwU2lkZWJhciIsIkNvbXBsZXRlQm9keSIsIkNvbXBsZXRlU2lkZWJhciIsIk51bWJlciIsInBhZ2VzIiwiaXBjIiwid2luIiwic2hvd0Vycm9yQm94Iiwic2hvd1NhdmVEaWFsb2ciLCJmaWxlbmFtZSIsInN5cyIsInRvdWNoRmlsZSIsImFkZGJvbUZpbGUiLCJzYXZlRmlsZSIsInV0aWwiLCJnZXRDU1ZIZWFkZXIiLCJjc3ZIZWFkZXIiLCJDb21wbGV0ZUFjdGlvbiIsInN1YnNjcmliZSIsInNob3dTYXZlTWVzc2FnZUJveCIsImhpZ2hlc3RQcmljZSIsImxvd2VzdFByaWNlIiwic2hpcHBpbmciLCJjb25kaXRpb24iLCJzdGF0dXMiLCJpdGVtSWQiLCJjYXRlZ29yeVBhdGgiLCJzZWxsZXIiLCJzdGFydERhdGUiLCJlbmREYXRlIiwiY2hlY2tlZCIsInZhbHVlcyIsImkiLCJsZW5ndGgiLCJwdXNoIiwicHJvcDEiLCJwcm9wMiIsImxlbiIsImFyZ3VtZW50cyIsIm9wdHMiLCJzdGQiLCJkc3QiLCJvcHQiLCJpZHgiLCJvcHRQYXRocyIsInJlbmRlck9wdGlvbiIsIm9wdFNlbHJzIiwib3B0SW1JRHMiLCJvcHRTaHBncyIsIm9wdFN0dHNzIiwic2VhcmNoU3RyaW5nIiwic29sZEl0ZW1Pbmx5IiwiaGFuZGxlQ2hhbmdlQ2hlY2tib3giLCJoYW5kbGVDaGFuZ2VTZWFyY2giLCJoYW5kbGVDaGFuZ2VIb21lIiwiaGFuZGxlSW5jcmVtZW50IiwiaGFuZGxlRGVjcmVtZW50IiwiaGFuZGxlQ2hhbmdlU2VsZWN0IiwiQ29tcGxldGVUYWJsZSIsInN0eWxlcyIsImZvbnRXZWlnaHQiLCJjb2xvciIsImR1cmF0aW9uIiwidG9MZWZ0RGF5cyIsIml0ZW0iLCJJbWciLCJoYXNPd25Qcm9wZXJ0eSIsImdhbGxlcnlVUkwiLCJBaWQiLCJQaWQiLCJwcm9kdWN0SWQiLCJfX3ZhbHVlX18iLCJTaWQiLCJzZWxsZXJJbmZvIiwic2VsbGVyVXNlck5hbWUiLCJTdG0iLCJnZXRMb2NhbFRpbWVTdGFtcCIsImxpc3RpbmdJbmZvIiwic3RhcnRUaW1lIiwiRXRtIiwiZW5kVGltZSIsIlVybCIsInZpZXdJdGVtVVJMIiwiVHRsIiwiUGMxIiwic2VsbGluZ1N0YXR1cyIsImN1cnJlbnRQcmljZSIsIkNpMSIsIlBjMiIsImNvbnZlcnRlZEN1cnJlbnRQcmljZSIsIkNpMiIsIkNkbiIsImNvbmRpdGlvbkRpc3BsYXlOYW1lIiwiQ2dwIiwicHJpbWFyeUNhdGVnb3J5IiwiY2F0ZWdvcnlOYW1lIiwiU2hwIiwic2hpcHBpbmdJbmZvIiwic2hpcFRvTG9jYXRpb25zIiwiU3R0Iiwic2VsbGluZ1N0YXRlIiwiRXh0IiwicmVuZGVyRXh0ZW5zaW9uIiwidGltZUxlZnQiLCJzdHQiLCJyZW5kZXJTdGF0dXMiLCJVcGQiLCJEYXRlIiwibm93Iiwiam9pbiIsImZpbHRlciIsInNvbWUiLCJjb25kaXRpb25JZCIsInBhdGgiLCJzZWxyIiwiaXRlbWlkIiwiaXNGaW5pdGUiLCJmaWx0ZXJJdGVtcyIsInJlbmRlckl0ZW0iLCJDb250ZW50cyIsImNvbnRudCIsImNoaWxkcmVuIiwiRXJyb3JCb3VuZGFyeSIsImVycm9ySW5mbyIsIndoaXRlU3BhY2UiLCJ0b1N0cmluZyIsImNvbXBvbmVudFN0YWNrIiwiR2xvYmFsRm9vdGVyIiwic3RhY2siLCJzaG93Q2xvc2VNZXNzYWdlQm94IiwicmVzcG9uc2UiLCJjbG9zZSIsImhhbmRsZUNoYW5nZUNsb3NlIiwiR2xvYmFsSGVhZGVyIiwiTm90ZUJvZHkiLCJOb3RlU2lkZWJhciIsIk5vdGVBY3Rpb24iLCJldmVudCIsIk5vdGVUYWJsZSIsIlByb2R1Y3RzQm9keSIsIlByb2R1Y3RzU2lkZWJhciIsImFkZGJvbSIsIlByb2R1Y3RzQWN0aW9uIiwicHJvZHVjdFR5cGUiLCJoYW5kbGVDaGFuZ2VSYWRpbyIsIlByb2R1Y3RzVGFibGUiLCJSYWRpbyIsImRlZmF1bHRWYWx1ZSIsIm9uQ2hhbmdlIiwiQ2hpbGRyZW4iLCJjaGlsZCIsImhhbmRsZUNoYW5nZSIsIlRhYnMiLCJsYWJlbCIsImluZGV4IiwiY2xhc3NOYW1lcyIsImhhbmRsZUNsaWNrVGFiIiwidGl0bGVzIiwicmVuZGVyVGl0bGVzIiwiZGlzcGF0Y2hlciIsInJvb3RFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXJSb290IiwicmVuZGVyIiwiaG90IiwiYWNjZXB0Iiwic2V0SW1tZWRpYXRlIiwiQXBwIiwiYXBwU3RvcmUiLCJnZXRTdGF0ZSIsIkNvbnRhaW5lciIsImNyZWF0ZSIsIkNvbnRhaW5lckNvbnZlcnRlciIsIkNvbXBsZXRlIiwiY29tcGxldGVTdG9yZSIsIk5vdGUiLCJub3RlU3RvcmUiLCJQcm9kdWN0cyIsInByb2R1Y3RzU3RvcmUiLCJlQmF5IiwicmVxdWVzdCIsIm9wZXJhdGlvbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibWVtb3J5Iiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiVXNlckRhdGFTdG9yYWdlIiwic3RvciIsIkNvb2tpZVN0b3JhZ2UiLCJKU09OIiwicGFyc2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInN0cmluZ2lmeSIsIkpTT05QIiwiZmV0Y2giLCJvZiIsInBvc3QiLCJhdXRoIiwiZ2V0IiwiZ2V0SXRlbXMiLCJvcHRJdGVtcyIsImdldENvbXBsZXRlSXRlbXMiLCJnZXRQcm9kdWN0c0l0ZW1zIiwib3B0UHJvZHVjdHMiLCJnZXRBcHBUb2tlbiIsInNjb3BlIiwiZ2V0Q29kZSIsIm9wdENvZGUiLCJnZXRVc2VyVG9rZW4iLCJjb2RlIiwiZ2V0UmVmcmVzaFRva2VuIiwidXNlcnRva2VuIiwicmVmcmVzaF90b2tlbiIsImdldEl0ZW1EZXRhaWxzIiwiZ2V0SW52ZW50b3J5SXRlbXMiLCJvZmZzZXQiLCJwdXRJdGVtcyIsInB1dENvbXBsZXRlSXRlbXMiLCJwdXRQcm9kdWN0c0l0ZW1zIiwicmVzSXRlbXMiLCJzZXRJdGVtcyIsInJlc0NvbXBsZXRlSXRlbXMiLCJyZXNQcm9kdWN0c0l0ZW1zIiwic3RyZWFtSXRlbXMiLCJmcm9tIiwic3RyZWFtRGV0YWlsIiwiZm9ya0l0ZW1zIiwiZm9ya0pvaW4iLCJmb3JJdGVtcyIsImZsYXRNYXAiLCJmb3JDb21wbGV0ZUl0ZW1zIiwiZm9yUHJvZHVjdHNJdGVtcyIsImZldGNoQXBwVG9rZW4iLCJyZXF1ZXN0VG9rZW4iLCJzZXRUb2tlbiIsImFwcHRva2VuIiwiYXBwc3RhdGUiLCJnZXRUb2tlbiIsImFjY2Vzc190b2tlbiIsImZldGNoVXNlclRva2VuIiwicmVxdWVzdENvZGUiLCJhdXRoY29kZSIsImNvbnZDb2RlIiwiZGVjb2RlVVJJQ29tcG9uZW50Iiwic2V0Q29kZSIsInVzZXJzdGF0ZSIsInJlZnJlc2hzdGF0ZSIsImZldGNoUmVmcmVzaFRva2VuIiwiZmV0Y2hUb2tlbiIsImR1VXNyVG9rZW4iLCJleHBpcmVzX2luIiwiZHVSZWZUb2tlbiIsInJlZnJlc2hfdG9rZW5fZXhwaXJlc19pbiIsImlzVXNyVG9rZW4iLCJpc1JlZlRva2VuIiwiaXNVc3JBdmFpbGFibGUiLCJpc1JlZkF2YWlsYWJsZSIsImxvZ1RyYWNlIiwicmVzIiwicGFnaW5hdGlvbk91dHB1dCIsInRvdGFsUGFnZXMiLCJuZXdJdGVtcyIsImZpbmRJdGVtc0J5S2V5d29yZHNSZXNwb25zZSIsImZpbmRDb21wbGV0ZWRJdGVtc1Jlc3BvbnNlIiwiZmluZEl0ZW1zQnlQcm9kdWN0UmVzcG9uc2UiLCJhY2siLCJzZWFyY2hSZXN1bHQiLCJvIiwicCIsIl9vIiwiX3AiLCJzZWFyY2giLCJuIiwiZm9yRWFjaCIsInNsciIsImNkbiIsImlzVmFsaWREYXRlIiwic2V0VGltZVN0YW1wIiwibG9nRXJyb3IiLCJBcHBTdG9yZSIsImFjdGlvbiIsIkNvbXBsZXRlU3RvcmUiLCJOb3RlU3RvcmUiLCJQcm9kdWN0c1N0b3JlIiwiY2FsbGJhY2siLCJpcGNSZW5kZXJlciIsIm9uIiwic2V0UHJvcHMiLCJzZW5kIiwic2VuZFN5bmMiLCJfcHJvcHMiLCJ1cmwiLCJhdXRoVXJsIiwidXJsZW5jb2RlIiwiQnJvd3NlcldpbmRvdyIsInJlbW90ZSIsImF1dGhXaW5kb3ciLCJ3aWR0aCIsImhlaWdodCIsInNob3ciLCJ3ZWJQcmVmZXJlbmNlcyIsIm5vZGVJbnRlZ3JhdGlvbiIsIndlYlNlY3VyaXR5IiwiaGFuZGxlQ2hhbmdlVXJsIiwicmF3X2NvZGUiLCJleGVjIiwibmV3VXJsIiwicmF3X3N0YXRlIiwicmF3X2V4cGlyZSIsImRlc3Ryb3kiLCJ3ZWJDb250ZW50cyIsImdldFVSTCIsIm9uY2UiLCJoaWRlIiwibG9hZFVSTCIsIm1ldGhvZCIsImN1cnJlbnQiLCJnZXRDdXJyZW50V2luZG93IiwiZmlsdGVycyIsImV4dGVuc2lvbnMiLCJkaWFsb2ciLCJlcnJvcnMiLCJsb25nTWVzc2FnZSIsImVycm9yX2Rlc2NyaXB0aW9uIiwiYnV0dG9ucyIsImRldGFpbCIsInNob3dNZXNzYWdlQm94IiwiQnVmZmVyIiwiZnMiLCJhcHBlbmRGaWxlIiwiY2xvc2VTeW5jIiwib3BlblN5bmMiLCJyb290IiwiZmFjdG9yeSIsInByZWZpeGVzIiwiYW5pbWF0aW9ucyIsInVzZUNzc0FuaW1hdGlvbnMiLCJzaGVldCIsImNyZWF0ZUVsIiwidGFnIiwicHJvcCIsImVsIiwiY3JlYXRlRWxlbWVudCIsImlucyIsInBhcmVudCIsImFwcGVuZENoaWxkIiwiYWRkQW5pbWF0aW9uIiwiYWxwaGEiLCJ0cmFpbCIsImxpbmVzIiwic3RhcnQiLCJ6IiwiTWF0aCIsIm1heCIsInByZWZpeCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsInByZSIsImluc2VydFJ1bGUiLCJjc3NSdWxlcyIsInZlbmRvciIsInMiLCJzdHlsZSIsInBwIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInVuZGVmaW5lZCIsImNzcyIsIm1lcmdlIiwiZGVmIiwiZ2V0Q29sb3IiLCJkZWZhdWx0cyIsInJhZGl1cyIsInNjYWxlIiwiY29ybmVycyIsIm9wYWNpdHkiLCJyb3RhdGUiLCJkaXJlY3Rpb24iLCJzcGVlZCIsImZwcyIsInpJbmRleCIsImNsYXNzTmFtZSIsInRvcCIsImxlZnQiLCJzaGFkb3ciLCJod2FjY2VsIiwicG9zaXRpb24iLCJTcGlubmVyIiwic2VsZiIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJzZXRBdHRyaWJ1dGUiLCJmIiwib3N0ZXAiLCJhc3RlcCIsImFuaW0iLCJqIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJzZWciLCJmaWxsIiwiYmFja2dyb3VuZCIsImJveFNoYWRvdyIsInRyYW5zZm9ybU9yaWdpbiIsInRyYW5zZm9ybSIsImJvcmRlclJhZGl1cyIsImFuaW1hdGlvbiIsInZhbCIsImNoaWxkTm9kZXMiLCJpbml0Vk1MIiwidm1sIiwiYXR0ciIsImFkZFJ1bGUiLCJyIiwiZ3JwIiwiY29vcmRzaXplIiwiY29vcmRvcmlnaW4iLCJtYXJnaW4iLCJnIiwiZHgiLCJyb3RhdGlvbiIsImFyY3NpemUiLCJjIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzdHlsZVNoZWV0IiwicHJvYmUiLCJiZWhhdmlvciIsImFkaiIsImVudiIsInByb2Nlc3MiLCJQTEFURk9STSIsImlzTm9kZSIsImNvbG9yX2NvZGUiLCJSZXNldCIsIkJyaWdodCIsIkRpbSIsIlVuZGVyc2NvcmUiLCJCbGluayIsIlJldmVyc2UiLCJIaWRkZW4iLCJGZ0JsYWNrIiwiRmdSZWQiLCJGZ0dyZWVuIiwiRmdZZWxsb3ciLCJGZ0JsdWUiLCJGZ01hZ2VudGEiLCJGZ0N5YW4iLCJGZ1doaXRlIiwiQmdCbGFjayIsIkJnUmVkIiwiQmdHcmVlbiIsIkJnWWVsbG93IiwiQmdCbHVlIiwiQmdNYWdlbnRhIiwiQmdDeWFuIiwiQmdXaGl0ZSIsInRvUkdCYSIsInN0ciIsImEiLCJwYXJzZUludCIsInN1YnN0ciIsImIiLCJjYWxsZXIiLCJkYXRlIiwiZ2V0TG9jYWxJU09UaW1lU3RhbXAiLCJoZWFkIiwiY29uc29sZSIsImxvZ1dhcm4iLCJ3YXJuIiwibG9nRGVidWciLCJsb2dJbmZvIiwiaXMiLCJjbGFzIiwiY2FsbCIsImV4dGVuZCIsInJlc3RyaWN0Iiwic3VidHJhY3QiLCJ1bmlvbiIsImludGVyc2VjdGlvbiIsImtleXMiLCJUeXBlRXJyb3IiLCJyZXN1bHQiLCJhbmQiLCJBcnJheSIsImlzQXJyYXkiLCJ4IiwiY29uY2F0IiwieSIsImxhc3RJbmRleE9mIiwiZGVsIiwiYWRkIiwiZGlmIiwiZHVwIiwic29ydCIsInQiLCJzb3J0U3RyIiwic29ydE51bSIsInNvcnRPYmpTdHIiLCJrIiwic29ydE9ialVuaSIsImdldFRpbWVTdGFtcCIsImR0IiwidG9JU09TdHJpbmciLCJfeXIiLCJnZXRGdWxsWWVhciIsIl9tbyIsImdldE1vbnRoIiwiX2R5IiwiZ2V0RGF0ZSIsIl90bSIsInRvVGltZVN0cmluZyIsInNwbGl0IiwiZ2V0TG9jYWxEYXRlU3RhbXAiLCJtYXRjaGVzIiwibSIsImQiLCJpbnZva2UiLCJmbiIsImgiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJpbnZva2VNYXAiLCJhcmdMZW4iLCJhcnJMZW4iLCJhcnIiLCJzZXRUaW1lIiwic2hpZnQiLCJpbnZva2UyIiwicnMiLCJyaiIsImVkIiwiX2EiLCJfYiIsImVuY29kZUZvcm1EYXRhIiwiZGF0YSIsInBhaXJzIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVwbGFjZSIsImRlY29kZUZvcm1EYXRhIiwidGV4dCIsInNlcCIsImVxIiwiaXNEZWNvZGUiLCJsb2NhdGlvbiIsImRlY29kZSIsInJlZHVjZSIsInYiLCJwYWlyIiwibWFrZVJhbmRQYXNzd29yZCIsImNoYXJzIiwiZmxvb3IiLCJyYW5kb20iLCJtYWtlUmFuZFN0ciIsIm1ha2VSYW5kSW50IiwiZGVjb2RlX2Jhc2U2NCIsInN0cmluZyIsImVuY29kZV9iYXNlNjQiLCJmb3JrIiwiZnVuYzEiLCJmdW5jMiIsImtzb3J0Iiwia2V5IiwidXJsZW5jb2RlX2Zha2UiLCJ1cmxlbmNvZGVfcmZjMzk4NiIsInF1ZXJ5c3RyaW5nIiwiY3J5cHRvX3NoYTI1NiIsInNlY3JldF9rZXkiLCJjcnlwdG8iLCJjcmVhdGVIbWFjIiwidXBkYXRlIiwiZGlnZXN0IiwiY3J5cHRvX3Bia2RmMiIsInBhc3MiLCJzYWx0IiwicmFuZG9tQnl0ZXMiLCJjYmsiLCJwYmtkZjIiLCJzbHQiLCJiaW4yc3RyIiwiYmluIiwiX2hhc2giLCJoYXNoIiwiX3NhbHQiLCJwYXJzZV91cmwiLCJwYXJzZV9xdWVyeSIsInF1ZXJ5Iiwic2V0RGF0ZSIsImdldEhvdXJzIiwiZ2V0TWludXRlcyIsImdldFNlY29uZHMiLCJnZXRNaWxsaXNlY29uZHMiLCJnZXRMb2NhbElTT1pvbmVTdGFtcCIsInNldE9mZnNldCIsImdldFRpbWV6b25lT2Zmc2V0IiwiYWJzIiwiZm9ybWF0RGF0ZSIsImZvcm1hdCIsImRhdGVGb3JtYXQiLCJmb3JtYXROdW1iZXIiLCJudW0iLCJudW1Gb3JtYXQiLCJyZWdleFppcCIsInBvc3RhbF9jb2RlIiwiY291bnRyeV9jb2RlIiwiemlwUmVnZXgiLCJyZWdleCIsInJlZ2V4TnVtYmVyIiwibnVtYmVyIiwidGVzdCIsInJlZ2V4RW1haWwiLCJhZGRyZXNzIiwiZm10IiwiZGRkZGQiLCJkZGRkIiwiZGRkIiwiZGQiLCJoaCIsIm1tIiwic3MiLCJjY2MiLCJERCIsIkQiLCJZWVlZIiwiWVkiLCJ3IiwiZ2V0RGF5IiwiTU1NTSIsIk1NTSIsIk1NIiwiTSIsIiQiLCJyZWciLCJSZWdFeHAiLCJMb2dnZXIiLCJTcGluZXIiLCJzZXRDU1ZIZWFkZXIiLCJ1bnNoaWZ0IiwiZGF5cyIsImhvdXJzIiwibWludXRlcyIsImFwZCIsImx5dCIsImZsdiIsIm5hbSIsImFwZHMiLCJMb2c0anMiLCJKU0FsZXJ0QXBwZW5kZXIiLCJCcm93c2VyQ29uc29sZUFwcGVuZGVyIiwibHl0cyIsIkJhc2ljTGF5b3V0IiwiSlNPTkxheW91dCIsIlhNTExheW91dCIsImZsdnMiLCJMZXZlbCIsIk9GRiIsIkZBVEFMIiwiRVJST1IiLCJXQVJOIiwiSU5GTyIsIkRFQlVHIiwiVFJBQ0UiLCJBTEwiLCJhcHBlbmRlciIsInNldExheW91dCIsImxvZ2dlciIsImdldExvZ2dlciIsImFkZEFwcGVuZGVyIiwibWx2IiwibXNnIiwiX21zZyIsImZhdGFsIiwiZGVidWciLCJzZXRDb29raWVzIiwiZGF5c1RvTGl2ZSIsImNvb2tpZSIsImdldENvb2tpZXMiLCJjb29raWVzIiwiYWxsIiwibGlzdCIsIm1heGFnZSIsInJlbW92ZUl0ZW0iLCJzcGxpY2UiLCJjbGVhciIsImRpc3BsYXkiLCJib2R5IiwiZ2V0VGltZSIsImV4cGlyZXMiLCJ0b1VUQ1N0cmluZyIsImxvYWQiLCJnZXRBdHRyaWJ1dGUiLCJzYXZlIiwicmVtb3ZlQXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsNEJBQTRCO0FBQzdDO0FBQ0E7QUFDQSwwQkFBa0IsMkJBQTJCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxh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QWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsWUFBWTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFjLDRCQUE0QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBZSw0QkFBNEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsdUNBQXVDO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHNCQUFzQjtBQUN2QztBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQWMsd0NBQXdDO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBc0MsdUJBQXVCOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQix1QkFBdUI7QUFDdkM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6MUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0Esd0NBQXdDO0FBQ3hDLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBLHNGQUFzSDtBQUN0SDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLHdDQUF3QztBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxvQkFBb0I7QUFDakMsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsRUFBRTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxrQzs7Ozs7Ozs7Ozs7O0FDOUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaURBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdkosMENBQTBDLCtEQUErRCxxR0FBcUcsRUFBRSx5RUFBeUUsZUFBZSx5RUFBeUUsRUFBRSxFQUFFLHVIQUF1SDs7QUFFNWU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhLHdCQUF3QjtBQUNyQztBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQscUM7Ozs7Ozs7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKOztBQUVBO0FBQ0EsYUFBYSx3QkFBd0I7QUFDckM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsbUM7Ozs7Ozs7Ozs7OztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGlEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsa0JBQWtCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQseUM7Ozs7Ozs7Ozs7OztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQzs7Ozs7Ozs7Ozs7O0FDaENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSwwQjs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUM7Ozs7Ozs7Ozs7OztBQ3BDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7OztBQ3BDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsNkI7Ozs7Ozs7Ozs7OztBQ2hCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7Ozs7Ozs7O0FDbkNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQjs7Ozs7Ozs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DOzs7Ozs7Ozs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTs7QUFFQSwyQjs7Ozs7Ozs7Ozs7O0FDcERBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLEVBQUU7QUFDYixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCOzs7Ozs7Ozs7Ozs7QUNyQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0Qjs7Ozs7Ozs7Ozs7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOEI7Ozs7Ozs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNGQUFzRixhQUFhO0FBQ25HO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSw0RkFBNEYsZUFBZTtBQUMzRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCOzs7Ozs7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsS0FBSztBQUNoQixZQUFZLEtBQUs7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxLQUFLO0FBQ2hCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixzQkFBc0I7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLG9CQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRHQUE0RztBQUM1RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQzs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMxaUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLFFBSUQ7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1hBO0FBQUE7QUFDQTtBQUNBLCtEQUErRDtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QWhLLFdBQU9xTCxLQUFQLENBQWFxVSxPQUFiLEdBQXVCLE1BQXZCO0FBQ0ExZixXQUFPcUwsS0FBUCxDQUFhb0UsUUFBYixHQUF3QiwwQkFBeEI7QUFDQWxSLGFBQVNvaEIsSUFBVCxDQUFjeFYsV0FBZCxDQUEwQm5LLE1BQTFCOztBQUNBLFFBQUlzZixNQUFKLEVBQVk7QUFDUixVQUFNcGtCLE1BQU0sSUFBSUQsSUFBSixHQUFXMmtCLE9BQVgsRUFBWjtBQUNBLFVBQU1DLFVBQVUza0IsTUFBTW9rQixTQUFTLElBQS9CO0FBQ0F0ZixhQUFPNmYsT0FBUCxHQUFpQixJQUFJNWtCLElBQUosQ0FBUzRrQixPQUFULEVBQWtCQyxXQUFsQixFQUFqQjtBQUNIOztBQUNEOWYsV0FBTytmLElBQVAsQ0FBWSxpQkFBWjs7QUFDQSxTQUFLdmYsT0FBTCxHQUFlLFVBQVN3WCxHQUFULEVBQWM7QUFDekIsYUFBT2hZLE9BQU9nZ0IsWUFBUCxDQUFvQmhJLEdBQXBCLEtBQTRCLElBQW5DO0FBQ0gsS0FGRDs7QUFHQSxTQUFLdlgsT0FBTCxHQUFlLFVBQVN1WCxHQUFULEVBQWMvakIsS0FBZCxFQUFxQjtBQUNoQytMLGFBQU9tTixZQUFQLENBQW9CNkssR0FBcEIsRUFBd0IvakIsS0FBeEI7QUFDQStMLGFBQU9pZ0IsSUFBUCxDQUFZLGlCQUFaO0FBQ0gsS0FIRDs7QUFJQSxTQUFLVixVQUFMLEdBQWtCLFVBQVN2SCxHQUFULEVBQWM7QUFDNUJoWSxhQUFPa2dCLGVBQVAsQ0FBdUJsSSxHQUF2QjtBQUNBaFksYUFBT2lnQixJQUFQLENBQVksaUJBQVo7QUFDSCxLQUhEO0FBSUg7QUF6SVUsQ0FBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUlBLG1DOzs7Ozs7Ozs7OztBQ0FBLHFDOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLHdDOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudEhhc2ggPSBcIjFjNjFjOGI4MTkzNDhiZmM3MmY2XCI7XG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTtcblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRpZiAoIW1lKSByZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXztcbiBcdFx0dmFyIGZuID0gZnVuY3Rpb24ocmVxdWVzdCkge1xuIFx0XHRcdGlmIChtZS5ob3QuYWN0aXZlKSB7XG4gXHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XSkge1xuIFx0XHRcdFx0XHRpZiAoaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuIFx0XHRcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5wdXNoKG1vZHVsZUlkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRob3RDdXJyZW50Q2hpbGRNb2R1bGUgPSByZXF1ZXN0O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1lLmNoaWxkcmVuLmluZGV4T2YocmVxdWVzdCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdG1lLmNoaWxkcmVuLnB1c2gocmVxdWVzdCk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgK1xuIFx0XHRcdFx0XHRcdHJlcXVlc3QgK1xuIFx0XHRcdFx0XHRcdFwiKSBmcm9tIGRpc3Bvc2VkIG1vZHVsZSBcIiArXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdCk7XG4gXHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0XHRcdH1cbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhyZXF1ZXN0KTtcbiBcdFx0fTtcbiBcdFx0dmFyIE9iamVjdEZhY3RvcnkgPSBmdW5jdGlvbiBPYmplY3RGYWN0b3J5KG5hbWUpIHtcbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdO1xuIFx0XHRcdFx0fSxcbiBcdFx0XHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiBcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXSA9IHZhbHVlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH07XG4gXHRcdH07XG4gXHRcdGZvciAodmFyIG5hbWUgaW4gX193ZWJwYWNrX3JlcXVpcmVfXykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChfX3dlYnBhY2tfcmVxdWlyZV9fLCBuYW1lKSAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJlXCIgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwidFwiXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIE9iamVjdEZhY3RvcnkobmFtZSkpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRmbi5lID0gZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicmVhZHlcIikgaG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHRob3RDaHVua3NMb2FkaW5nKys7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18uZShjaHVua0lkKS50aGVuKGZpbmlzaENodW5rTG9hZGluZywgZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRmaW5pc2hDaHVua0xvYWRpbmcoKTtcbiBcdFx0XHRcdHRocm93IGVycjtcbiBcdFx0XHR9KTtcblxuIFx0XHRcdGZ1bmN0aW9uIGZpbmlzaENodW5rTG9hZGluZygpIHtcbiBcdFx0XHRcdGhvdENodW5rc0xvYWRpbmctLTtcbiBcdFx0XHRcdGlmIChob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiKSB7XG4gXHRcdFx0XHRcdGlmICghaG90V2FpdGluZ0ZpbGVzTWFwW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRcdFx0aG90RW5zdXJlVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKGhvdENodW5rc0xvYWRpbmcgPT09IDAgJiYgaG90V2FpdGluZ0ZpbGVzID09PSAwKSB7XG4gXHRcdFx0XHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9O1xuIFx0XHRmbi50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0XHRpZiAobW9kZSAmIDEpIHZhbHVlID0gZm4odmFsdWUpO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLnQodmFsdWUsIG1vZGUgJiB+MSk7XG4gXHRcdH07XG4gXHRcdHJldHVybiBmbjtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIGhvdCA9IHtcbiBcdFx0XHQvLyBwcml2YXRlIHN0dWZmXG4gXHRcdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuIFx0XHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuIFx0XHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuIFx0XHRcdF9tYWluOiBob3RDdXJyZW50Q2hpbGRNb2R1bGUgIT09IG1vZHVsZUlkLFxuXG4gXHRcdFx0Ly8gTW9kdWxlIEFQSVxuIFx0XHRcdGFjdGl2ZTogdHJ1ZSxcbiBcdFx0XHRhY2NlcHQ6IGZ1bmN0aW9uKGRlcCwgY2FsbGJhY2spIHtcbiBcdFx0XHRcdGlmICh0eXBlb2YgZGVwID09PSBcInVuZGVmaW5lZFwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRlY2xpbmU6IGZ1bmN0aW9uKGRlcCkge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRob3Q6IGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCksXG4gXHRcdFx0cGFyZW50czogKGhvdEN1cnJlbnRQYXJlbnRzVGVtcCA9IGhvdEN1cnJlbnRQYXJlbnRzLCBob3RDdXJyZW50UGFyZW50cyA9IFtdLCBob3RDdXJyZW50UGFyZW50c1RlbXApLFxuIFx0XHRcdGNoaWxkcmVuOiBbXVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBob3RDcmVhdGVSZXF1aXJlKG1vZHVsZUlkKSk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gX193ZWJwYWNrX2hhc2hfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5oID0gZnVuY3Rpb24oKSB7IHJldHVybiBob3RDdXJyZW50SGFzaDsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJjb21tb25cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxudmFyIGZiZW1pdHRlciA9IHtcbiAgRXZlbnRFbWl0dGVyOiByZXF1aXJlKCcuL2xpYi9CYXNlRXZlbnRFbWl0dGVyJyksXG4gIEVtaXR0ZXJTdWJzY3JpcHRpb24gOiByZXF1aXJlKCcuL2xpYi9FbWl0dGVyU3Vic2NyaXB0aW9uJylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZmJlbWl0dGVyO1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIEBwcm92aWRlc01vZHVsZSBCYXNlRXZlbnRFbWl0dGVyXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBFbWl0dGVyU3Vic2NyaXB0aW9uID0gcmVxdWlyZSgnLi9FbWl0dGVyU3Vic2NyaXB0aW9uJyk7XG52YXIgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IgPSByZXF1aXJlKCcuL0V2ZW50U3Vic2NyaXB0aW9uVmVuZG9yJyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIEBjbGFzcyBCYXNlRXZlbnRFbWl0dGVyXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFuIEV2ZW50RW1pdHRlciBpcyByZXNwb25zaWJsZSBmb3IgbWFuYWdpbmcgYSBzZXQgb2YgbGlzdGVuZXJzIGFuZCBwdWJsaXNoaW5nXG4gKiBldmVudHMgdG8gdGhlbSB3aGVuIGl0IGlzIHRvbGQgdGhhdCBzdWNoIGV2ZW50cyBoYXBwZW5lZC4gSW4gYWRkaXRpb24gdG8gdGhlXG4gKiBkYXRhIGZvciB0aGUgZ2l2ZW4gZXZlbnQgaXQgYWxzbyBzZW5kcyBhIGV2ZW50IGNvbnRyb2wgb2JqZWN0IHdoaWNoIGFsbG93c1xuICogdGhlIGxpc3RlbmVycy9oYW5kbGVycyB0byBwcmV2ZW50IHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSBnaXZlbiBldmVudC5cbiAqXG4gKiBUaGUgZW1pdHRlciBpcyBkZXNpZ25lZCB0byBiZSBnZW5lcmljIGVub3VnaCB0byBzdXBwb3J0IGFsbCB0aGUgZGlmZmVyZW50XG4gKiBjb250ZXh0cyBpbiB3aGljaCBvbmUgbWlnaHQgd2FudCB0byBlbWl0IGV2ZW50cy4gSXQgaXMgYSBzaW1wbGUgbXVsdGljYXN0XG4gKiBtZWNoYW5pc20gb24gdG9wIG9mIHdoaWNoIGV4dHJhIGZ1bmN0aW9uYWxpdHkgY2FuIGJlIGNvbXBvc2VkLiBGb3IgZXhhbXBsZSwgYVxuICogbW9yZSBhZHZhbmNlZCBlbWl0dGVyIG1heSB1c2UgYW4gRXZlbnRIb2xkZXIgYW5kIEV2ZW50RmFjdG9yeS5cbiAqL1xuXG52YXIgQmFzZUV2ZW50RW1pdHRlciA9IChmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gQmFzZUV2ZW50RW1pdHRlcigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQmFzZUV2ZW50RW1pdHRlcik7XG5cbiAgICB0aGlzLl9zdWJzY3JpYmVyID0gbmV3IEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yKCk7XG4gICAgdGhpcy5fY3VycmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGxpc3RlbmVyIHRvIGJlIGludm9rZWQgd2hlbiBldmVudHMgb2YgdGhlIHNwZWNpZmllZCB0eXBlIGFyZVxuICAgKiBlbWl0dGVkLiBBbiBvcHRpb25hbCBjYWxsaW5nIGNvbnRleHQgbWF5IGJlIHByb3ZpZGVkLiBUaGUgZGF0YSBhcmd1bWVudHNcbiAgICogZW1pdHRlZCB3aWxsIGJlIHBhc3NlZCB0byB0aGUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gICAqXG4gICAqIFRPRE86IEFubm90YXRlIHRoZSBsaXN0ZW5lciBhcmcncyB0eXBlLiBUaGlzIGlzIHRyaWNreSBiZWNhdXNlIGxpc3RlbmVyc1xuICAgKiAgICAgICBjYW4gYmUgaW52b2tlZCB3aXRoIHZhcmFyZ3MuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBOYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gdG9cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgLSBGdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgc3BlY2lmaWVkIGV2ZW50IGlzXG4gICAqICAgZW1pdHRlZFxuICAgKiBAcGFyYW0geyp9IGNvbnRleHQgLSBPcHRpb25hbCBjb250ZXh0IG9iamVjdCB0byB1c2Ugd2hlbiBpbnZva2luZyB0aGVcbiAgICogICBsaXN0ZW5lclxuICAgKi9cblxuICBCYXNlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2ZW50VHlwZSwgbGlzdGVuZXIsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlci5hZGRTdWJzY3JpcHRpb24oZXZlbnRUeXBlLCBuZXcgRW1pdHRlclN1YnNjcmlwdGlvbih0aGlzLl9zdWJzY3JpYmVyLCBsaXN0ZW5lciwgY29udGV4dCkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTaW1pbGFyIHRvIGFkZExpc3RlbmVyLCBleGNlcHQgdGhhdCB0aGUgbGlzdGVuZXIgaXMgcmVtb3ZlZCBhZnRlciBpdCBpc1xuICAgKiBpbnZva2VkIG9uY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBOYW1lIG9mIHRoZSBldmVudCB0byBsaXN0ZW4gdG9cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXIgLSBGdW5jdGlvbiB0byBpbnZva2Ugb25seSBvbmNlIHdoZW4gdGhlXG4gICAqICAgc3BlY2lmaWVkIGV2ZW50IGlzIGVtaXR0ZWRcbiAgICogQHBhcmFtIHsqfSBjb250ZXh0IC0gT3B0aW9uYWwgY29udGV4dCBvYmplY3QgdG8gdXNlIHdoZW4gaW52b2tpbmcgdGhlXG4gICAqICAgbGlzdGVuZXJcbiAgICovXG5cbiAgQmFzZUV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnRUeXBlLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgIHZhciBlbWl0dGVyID0gdGhpcztcbiAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldmVudFR5cGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlQ3VycmVudExpc3RlbmVyKCk7XG4gICAgICBsaXN0ZW5lci5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBvZiB0aGUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMsIGluY2x1ZGluZyB0aG9zZSByZWdpc3RlcmVkIGFzXG4gICAqIGxpc3RlbmVyIG1hcHMuXG4gICAqXG4gICAqIEBwYXJhbSB7P3N0cmluZ30gZXZlbnRUeXBlIC0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgZXZlbnQgd2hvc2UgcmVnaXN0ZXJlZFxuICAgKiAgIGxpc3RlbmVycyB0byByZW1vdmVcbiAgICovXG5cbiAgQmFzZUV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50VHlwZSkge1xuICAgIHRoaXMuX3N1YnNjcmliZXIucmVtb3ZlQWxsU3Vic2NyaXB0aW9ucyhldmVudFR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhbiBBUEkgdGhhdCBjYW4gYmUgY2FsbGVkIGR1cmluZyBhbiBldmVudGluZyBjeWNsZSB0byByZW1vdmUgdGhlXG4gICAqIGxhc3QgbGlzdGVuZXIgdGhhdCB3YXMgaW52b2tlZC4gVGhpcyBhbGxvd3MgYSBkZXZlbG9wZXIgdG8gcHJvdmlkZSBhbiBldmVudFxuICAgKiBvYmplY3QgdGhhdCBjYW4gcmVtb3ZlIHRoZSBsaXN0ZW5lciAob3IgbGlzdGVuZXIgbWFwKSBkdXJpbmcgdGhlXG4gICAqIGludm9jYXRpb24uXG4gICAqXG4gICAqIElmIGl0IGlzIGNhbGxlZCB3aGVuIG5vdCBpbnNpZGUgb2YgYW4gZW1pdHRpbmcgY3ljbGUgaXQgd2lsbCB0aHJvdy5cbiAgICpcbiAgICogQHRocm93cyB7RXJyb3J9IFdoZW4gY2FsbGVkIG5vdCBkdXJpbmcgYW4gZXZlbnRpbmcgY3ljbGVcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICB2YXIgc3Vic2NyaXB0aW9uID0gZW1pdHRlci5hZGRMaXN0ZW5lck1hcCh7XG4gICAqICAgICBzb21lRXZlbnQ6IGZ1bmN0aW9uKGRhdGEsIGV2ZW50KSB7XG4gICAqICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgKiAgICAgICBlbWl0dGVyLnJlbW92ZUN1cnJlbnRMaXN0ZW5lcigpO1xuICAgKiAgICAgfVxuICAgKiAgIH0pO1xuICAgKlxuICAgKiAgIGVtaXR0ZXIuZW1pdCgnc29tZUV2ZW50JywgJ2FiYycpOyAvLyBsb2dzICdhYmMnXG4gICAqICAgZW1pdHRlci5lbWl0KCdzb21lRXZlbnQnLCAnZGVmJyk7IC8vIGRvZXMgbm90IGxvZyBhbnl0aGluZ1xuICAgKi9cblxuICBCYXNlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVDdXJyZW50TGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVDdXJyZW50TGlzdGVuZXIoKSB7XG4gICAgISEhdGhpcy5fY3VycmVudFN1YnNjcmlwdGlvbiA/IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdOb3QgaW4gYW4gZW1pdHRpbmcgY3ljbGU7IHRoZXJlIGlzIG5vIGN1cnJlbnQgc3Vic2NyaXB0aW9uJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuX3N1YnNjcmliZXIucmVtb3ZlU3Vic2NyaXB0aW9uKHRoaXMuX2N1cnJlbnRTdWJzY3JpcHRpb24pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBjdXJyZW50bHkgcmVnaXN0ZXJlZCBmb3IgdGhlIGdpdmVuXG4gICAqIGV2ZW50LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gTmFtZSBvZiB0aGUgZXZlbnQgdG8gcXVlcnlcbiAgICogQHJldHVybiB7YXJyYXl9XG4gICAqL1xuXG4gIEJhc2VFdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudFR5cGUpIC8qIFRPRE86IEFycmF5PEV2ZW50U3Vic2NyaXB0aW9uPiAqL3tcbiAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmliZXIuZ2V0U3Vic2NyaXB0aW9uc0ZvclR5cGUoZXZlbnRUeXBlKTtcbiAgICByZXR1cm4gc3Vic2NyaXB0aW9ucyA/IHN1YnNjcmlwdGlvbnMuZmlsdGVyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlKS5tYXAoZnVuY3Rpb24gKHN1YnNjcmlwdGlvbikge1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi5saXN0ZW5lcjtcbiAgICB9KSA6IFtdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudCBvZiB0aGUgZ2l2ZW4gdHlwZSB3aXRoIHRoZSBnaXZlbiBkYXRhLiBBbGwgaGFuZGxlcnMgb2YgdGhhdFxuICAgKiBwYXJ0aWN1bGFyIHR5cGUgd2lsbCBiZSBub3RpZmllZC5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXRcbiAgICogQHBhcmFtIHsqfSBBcmJpdHJhcnkgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIHJlZ2lzdGVyZWQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogICBlbWl0dGVyLmFkZExpc3RlbmVyKCdzb21lRXZlbnQnLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAqICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICogICB9KTtcbiAgICpcbiAgICogICBlbWl0dGVyLmVtaXQoJ3NvbWVFdmVudCcsICdhYmMnKTsgLy8gbG9ncyAnYWJjJ1xuICAgKi9cblxuICBCYXNlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudFR5cGUpIHtcbiAgICB2YXIgc3Vic2NyaXB0aW9ucyA9IHRoaXMuX3N1YnNjcmliZXIuZ2V0U3Vic2NyaXB0aW9uc0ZvclR5cGUoZXZlbnRUeXBlKTtcbiAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhzdWJzY3JpcHRpb25zKTtcbiAgICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCBrZXlzLmxlbmd0aDsgaWkrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpaV07XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgIC8vIFRoZSBzdWJzY3JpcHRpb24gbWF5IGhhdmUgYmVlbiByZW1vdmVkIGR1cmluZyB0aGlzIGV2ZW50IGxvb3AuXG4gICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICB0aGlzLl9jdXJyZW50U3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgIHRoaXMuX19lbWl0VG9TdWJzY3JpcHRpb24uYXBwbHkodGhpcywgW3N1YnNjcmlwdGlvbl0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fY3VycmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIGhvb2sgdG8gb3ZlcnJpZGUgaG93IHRoZSBlbWl0dGVyIGVtaXRzIGFuIGV2ZW50IHRvIGEgc3BlY2lmaWNcbiAgICogc3Vic2NyaXB0aW9uLiBUaGlzIGFsbG93cyB5b3UgdG8gc2V0IHVwIGxvZ2dpbmcgYW5kIGVycm9yIGJvdW5kYXJpZXNcbiAgICogc3BlY2lmaWMgdG8geW91ciBlbnZpcm9ubWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtFbWl0dGVyU3Vic2NyaXB0aW9ufSBzdWJzY3JpcHRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICAgKiBAcGFyYW0geyp9IEFyYml0cmFyeSBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggcmVnaXN0ZXJlZCBsaXN0ZW5lclxuICAgKi9cblxuICBCYXNlRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fX2VtaXRUb1N1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIF9fZW1pdFRvU3Vic2NyaXB0aW9uKHN1YnNjcmlwdGlvbiwgZXZlbnRUeXBlKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHN1YnNjcmlwdGlvbi5saXN0ZW5lci5hcHBseShzdWJzY3JpcHRpb24uY29udGV4dCwgYXJncyk7XG4gIH07XG5cbiAgcmV0dXJuIEJhc2VFdmVudEVtaXR0ZXI7XG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VFdmVudEVtaXR0ZXI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICogXG4gKiBAcHJvdmlkZXNNb2R1bGUgRW1pdHRlclN1YnNjcmlwdGlvblxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgRXZlbnRTdWJzY3JpcHRpb24gPSByZXF1aXJlKCcuL0V2ZW50U3Vic2NyaXB0aW9uJyk7XG5cbi8qKlxuICogRW1pdHRlclN1YnNjcmlwdGlvbiByZXByZXNlbnRzIGEgc3Vic2NyaXB0aW9uIHdpdGggbGlzdGVuZXIgYW5kIGNvbnRleHQgZGF0YS5cbiAqL1xuXG52YXIgRW1pdHRlclN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoX0V2ZW50U3Vic2NyaXB0aW9uKSB7XG4gIF9pbmhlcml0cyhFbWl0dGVyU3Vic2NyaXB0aW9uLCBfRXZlbnRTdWJzY3JpcHRpb24pO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0V2ZW50U3Vic2NyaXB0aW9uVmVuZG9yfSBzdWJzY3JpYmVyIC0gVGhlIHN1YnNjcmliZXIgdGhhdCBjb250cm9sc1xuICAgKiAgIHRoaXMgc3Vic2NyaXB0aW9uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyIC0gRnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIHNwZWNpZmllZCBldmVudCBpc1xuICAgKiAgIGVtaXR0ZWRcbiAgICogQHBhcmFtIHsqfSBjb250ZXh0IC0gT3B0aW9uYWwgY29udGV4dCBvYmplY3QgdG8gdXNlIHdoZW4gaW52b2tpbmcgdGhlXG4gICAqICAgbGlzdGVuZXJcbiAgICovXG5cbiAgZnVuY3Rpb24gRW1pdHRlclN1YnNjcmlwdGlvbihzdWJzY3JpYmVyLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFbWl0dGVyU3Vic2NyaXB0aW9uKTtcblxuICAgIF9FdmVudFN1YnNjcmlwdGlvbi5jYWxsKHRoaXMsIHN1YnNjcmliZXIpO1xuICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB9XG5cbiAgcmV0dXJuIEVtaXR0ZXJTdWJzY3JpcHRpb247XG59KShFdmVudFN1YnNjcmlwdGlvbik7XG5cbm1vZHVsZS5leHBvcnRzID0gRW1pdHRlclN1YnNjcmlwdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogQHByb3ZpZGVzTW9kdWxlIEV2ZW50U3Vic2NyaXB0aW9uXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFdmVudFN1YnNjcmlwdGlvbiByZXByZXNlbnRzIGEgc3Vic2NyaXB0aW9uIHRvIGEgcGFydGljdWxhciBldmVudC4gSXQgY2FuXG4gKiByZW1vdmUgaXRzIG93biBzdWJzY3JpcHRpb24uXG4gKi9cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9XG5cbnZhciBFdmVudFN1YnNjcmlwdGlvbiA9IChmdW5jdGlvbiAoKSB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXZlbnRTdWJzY3JpcHRpb25WZW5kb3J9IHN1YnNjcmliZXIgdGhlIHN1YnNjcmliZXIgdGhhdCBjb250cm9sc1xuICAgKiAgIHRoaXMgc3Vic2NyaXB0aW9uLlxuICAgKi9cblxuICBmdW5jdGlvbiBFdmVudFN1YnNjcmlwdGlvbihzdWJzY3JpYmVyKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50U3Vic2NyaXB0aW9uKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlciA9IHN1YnNjcmliZXI7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGlzIHN1YnNjcmlwdGlvbiBmcm9tIHRoZSBzdWJzY3JpYmVyIHRoYXQgY29udHJvbHMgaXQuXG4gICAqL1xuXG4gIEV2ZW50U3Vic2NyaXB0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgaWYgKHRoaXMuc3Vic2NyaWJlcikge1xuICAgICAgdGhpcy5zdWJzY3JpYmVyLnJlbW92ZVN1YnNjcmlwdGlvbih0aGlzKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlciA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBFdmVudFN1YnNjcmlwdGlvbjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRTdWJzY3JpcHRpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICogXG4gKiBAcHJvdmlkZXNNb2R1bGUgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3JcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH1cblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yIHN0b3JlcyBhIHNldCBvZiBFdmVudFN1YnNjcmlwdGlvbnMgdGhhdCBhcmVcbiAqIHN1YnNjcmliZWQgdG8gYSBwYXJ0aWN1bGFyIGV2ZW50IHR5cGUuXG4gKi9cblxudmFyIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yKTtcblxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnNGb3JUeXBlID0ge307XG4gICAgdGhpcy5fY3VycmVudFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIHN1YnNjcmlwdGlvbiBrZXllZCBieSBhbiBldmVudCB0eXBlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gICAqIEBwYXJhbSB7RXZlbnRTdWJzY3JpcHRpb259IHN1YnNjcmlwdGlvblxuICAgKi9cblxuICBFdmVudFN1YnNjcmlwdGlvblZlbmRvci5wcm90b3R5cGUuYWRkU3Vic2NyaXB0aW9uID0gZnVuY3Rpb24gYWRkU3Vic2NyaXB0aW9uKGV2ZW50VHlwZSwgc3Vic2NyaXB0aW9uKSB7XG4gICAgIShzdWJzY3JpcHRpb24uc3Vic2NyaWJlciA9PT0gdGhpcykgPyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVGhlIHN1YnNjcmliZXIgb2YgdGhlIHN1YnNjcmlwdGlvbiBpcyBpbmNvcnJlY3RseSBzZXQuJykgOiBpbnZhcmlhbnQoZmFsc2UpIDogdW5kZWZpbmVkO1xuICAgIGlmICghdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGVbZXZlbnRUeXBlXSkge1xuICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGVbZXZlbnRUeXBlXSA9IFtdO1xuICAgIH1cbiAgICB2YXIga2V5ID0gdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGVbZXZlbnRUeXBlXS5sZW5ndGg7XG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uc0ZvclR5cGVbZXZlbnRUeXBlXS5wdXNoKHN1YnNjcmlwdGlvbik7XG4gICAgc3Vic2NyaXB0aW9uLmV2ZW50VHlwZSA9IGV2ZW50VHlwZTtcbiAgICBzdWJzY3JpcHRpb24ua2V5ID0ga2V5O1xuICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBidWxrIHNldCBvZiB0aGUgc3Vic2NyaXB0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHs/c3RyaW5nfSBldmVudFR5cGUgLSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB0eXBlIHdob3NlXG4gICAqICAgcmVnaXN0ZXJlZCBzdXBzY3JpcHRpb25zIHRvIHJlbW92ZSwgaWYgbnVsbCByZW1vdmUgYWxsIHN1YnNjcmlwdGlvbnMuXG4gICAqL1xuXG4gIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yLnByb3RvdHlwZS5yZW1vdmVBbGxTdWJzY3JpcHRpb25zID0gZnVuY3Rpb24gcmVtb3ZlQWxsU3Vic2NyaXB0aW9ucyhldmVudFR5cGUpIHtcbiAgICBpZiAoZXZlbnRUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnNGb3JUeXBlID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB0aGlzLl9zdWJzY3JpcHRpb25zRm9yVHlwZVtldmVudFR5cGVdO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHNwZWNpZmljIHN1YnNjcmlwdGlvbi4gSW5zdGVhZCBvZiBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIGNhbGxcbiAgICogYHN1YnNjcmlwdGlvbi5yZW1vdmUoKWAgZGlyZWN0bHkuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzdWJzY3JpcHRpb25cbiAgICovXG5cbiAgRXZlbnRTdWJzY3JpcHRpb25WZW5kb3IucHJvdG90eXBlLnJlbW92ZVN1YnNjcmlwdGlvbiA9IGZ1bmN0aW9uIHJlbW92ZVN1YnNjcmlwdGlvbihzdWJzY3JpcHRpb24pIHtcbiAgICB2YXIgZXZlbnRUeXBlID0gc3Vic2NyaXB0aW9uLmV2ZW50VHlwZTtcbiAgICB2YXIga2V5ID0gc3Vic2NyaXB0aW9uLmtleTtcblxuICAgIHZhciBzdWJzY3JpcHRpb25zRm9yVHlwZSA9IHRoaXMuX3N1YnNjcmlwdGlvbnNGb3JUeXBlW2V2ZW50VHlwZV07XG4gICAgaWYgKHN1YnNjcmlwdGlvbnNGb3JUeXBlKSB7XG4gICAgICBkZWxldGUgc3Vic2NyaXB0aW9uc0ZvclR5cGVba2V5XTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHN1YnNjcmlwdGlvbnMgdGhhdCBhcmUgY3VycmVudGx5IHJlZ2lzdGVyZWQgZm9yIHRoZVxuICAgKiBnaXZlbiBldmVudCB0eXBlLlxuICAgKlxuICAgKiBOb3RlOiBUaGlzIGFycmF5IGNhbiBiZSBwb3RlbnRpYWxseSBzcGFyc2UgYXMgc3Vic2NyaXB0aW9ucyBhcmUgZGVsZXRlZFxuICAgKiBmcm9tIGl0IHdoZW4gdGhleSBhcmUgcmVtb3ZlZC5cbiAgICpcbiAgICogVE9ETzogVGhpcyByZXR1cm5zIGEgbnVsbGFibGUgYXJyYXkuIHdhdD9cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICAgKiBAcmV0dXJuIHs/YXJyYXl9XG4gICAqL1xuXG4gIEV2ZW50U3Vic2NyaXB0aW9uVmVuZG9yLnByb3RvdHlwZS5nZXRTdWJzY3JpcHRpb25zRm9yVHlwZSA9IGZ1bmN0aW9uIGdldFN1YnNjcmlwdGlvbnNGb3JUeXBlKGV2ZW50VHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9zdWJzY3JpcHRpb25zRm9yVHlwZVtldmVudFR5cGVdO1xuICB9O1xuXG4gIHJldHVybiBFdmVudFN1YnNjcmlwdGlvblZlbmRvcjtcbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRTdWJzY3JpcHRpb25WZW5kb3I7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuVXNlRE9NID0gISEodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50ICYmIHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxuLyoqXG4gKiBTaW1wbGUsIGxpZ2h0d2VpZ2h0IG1vZHVsZSBhc3Npc3Rpbmcgd2l0aCB0aGUgZGV0ZWN0aW9uIGFuZCBjb250ZXh0IG9mXG4gKiBXb3JrZXIuIEhlbHBzIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhbmQgYWxsb3dzIGNvZGUgdG8gcmVhc29uIGFib3V0XG4gKiB3aGV0aGVyIG9yIG5vdCB0aGV5IGFyZSBpbiBhIFdvcmtlciwgZXZlbiBpZiB0aGV5IG5ldmVyIGluY2x1ZGUgdGhlIG1haW5cbiAqIGBSZWFjdFdvcmtlcmAgZGVwZW5kZW5jeS5cbiAqL1xudmFyIEV4ZWN1dGlvbkVudmlyb25tZW50ID0ge1xuXG4gIGNhblVzZURPTTogY2FuVXNlRE9NLFxuXG4gIGNhblVzZVdvcmtlcnM6IHR5cGVvZiBXb3JrZXIgIT09ICd1bmRlZmluZWQnLFxuXG4gIGNhblVzZUV2ZW50TGlzdGVuZXJzOiBjYW5Vc2VET00gJiYgISEod2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgd2luZG93LmF0dGFjaEV2ZW50KSxcblxuICBjYW5Vc2VWaWV3cG9ydDogY2FuVXNlRE9NICYmICEhd2luZG93LnNjcmVlbixcblxuICBpc0luV29ya2VyOiAhY2FuVXNlRE9NIC8vIEZvciBub3csIHRoaXMgaXMgdHJ1ZSAtIG1pZ2h0IGNoYW5nZSBpbiB0aGUgZnV0dXJlLlxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4ZWN1dGlvbkVudmlyb25tZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxudmFyIF9oeXBoZW5QYXR0ZXJuID0gLy0oLikvZztcblxuLyoqXG4gKiBDYW1lbGNhc2VzIGEgaHlwaGVuYXRlZCBzdHJpbmcsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBjYW1lbGl6ZSgnYmFja2dyb3VuZC1jb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kQ29sb3JcIlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gY2FtZWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcucmVwbGFjZShfaHlwaGVuUGF0dGVybiwgZnVuY3Rpb24gKF8sIGNoYXJhY3Rlcikge1xuICAgIHJldHVybiBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FtZWxpemU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbWVsaXplID0gcmVxdWlyZSgnLi9jYW1lbGl6ZScpO1xuXG52YXIgbXNQYXR0ZXJuID0gL14tbXMtLztcblxuLyoqXG4gKiBDYW1lbGNhc2VzIGEgaHlwaGVuYXRlZCBDU1MgcHJvcGVydHkgbmFtZSwgZm9yIGV4YW1wbGU6XG4gKlxuICogICA+IGNhbWVsaXplU3R5bGVOYW1lKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAqICAgPCBcImJhY2tncm91bmRDb2xvclwiXG4gKiAgID4gY2FtZWxpemVTdHlsZU5hbWUoJy1tb3otdHJhbnNpdGlvbicpXG4gKiAgIDwgXCJNb3pUcmFuc2l0aW9uXCJcbiAqICAgPiBjYW1lbGl6ZVN0eWxlTmFtZSgnLW1zLXRyYW5zaXRpb24nKVxuICogICA8IFwibXNUcmFuc2l0aW9uXCJcbiAqXG4gKiBBcyBBbmRpIFNtaXRoIHN1Z2dlc3RzXG4gKiAoaHR0cDovL3d3dy5hbmRpc21pdGguY29tL2Jsb2cvMjAxMi8wMi9tb2Rlcm5penItcHJlZml4ZWQvKSwgYW4gYC1tc2AgcHJlZml4XG4gKiBpcyBjb252ZXJ0ZWQgdG8gbG93ZXJjYXNlIGBtc2AuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZ1xuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBjYW1lbGl6ZVN0eWxlTmFtZShzdHJpbmcpIHtcbiAgcmV0dXJuIGNhbWVsaXplKHN0cmluZy5yZXBsYWNlKG1zUGF0dGVybiwgJ21zLScpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW1lbGl6ZVN0eWxlTmFtZTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxudmFyIGlzVGV4dE5vZGUgPSByZXF1aXJlKCcuL2lzVGV4dE5vZGUnKTtcblxuLyplc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgZ2l2ZW4gRE9NIG5vZGUgY29udGFpbnMgb3IgaXMgYW5vdGhlciBET00gbm9kZS5cbiAqL1xuZnVuY3Rpb24gY29udGFpbnNOb2RlKG91dGVyTm9kZSwgaW5uZXJOb2RlKSB7XG4gIGlmICghb3V0ZXJOb2RlIHx8ICFpbm5lck5vZGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAob3V0ZXJOb2RlID09PSBpbm5lck5vZGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChpc1RleHROb2RlKG91dGVyTm9kZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAoaXNUZXh0Tm9kZShpbm5lck5vZGUpKSB7XG4gICAgcmV0dXJuIGNvbnRhaW5zTm9kZShvdXRlck5vZGUsIGlubmVyTm9kZS5wYXJlbnROb2RlKTtcbiAgfSBlbHNlIGlmICgnY29udGFpbnMnIGluIG91dGVyTm9kZSkge1xuICAgIHJldHVybiBvdXRlck5vZGUuY29udGFpbnMoaW5uZXJOb2RlKTtcbiAgfSBlbHNlIGlmIChvdXRlck5vZGUuY29tcGFyZURvY3VtZW50UG9zaXRpb24pIHtcbiAgICByZXR1cm4gISEob3V0ZXJOb2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGlubmVyTm9kZSkgJiAxNik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29udGFpbnNOb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIE9iamVjdC5mcmVlemUoZW1wdHlPYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5T2JqZWN0OyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbi8qIGVzbGludC1kaXNhYmxlIGZiLXd3dy90eXBlb2YtdW5kZWZpbmVkICovXG5cbi8qKlxuICogU2FtZSBhcyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGJ1dCB3cmFwcyBpbiBhIHRyeS1jYXRjaCBibG9jay4gSW4gSUUgaXQgaXNcbiAqIG5vdCBzYWZlIHRvIGNhbGwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpZiB0aGVyZSBpcyBub3RoaW5nIGZvY3VzZWQuXG4gKlxuICogVGhlIGFjdGl2ZUVsZW1lbnQgd2lsbCBiZSBudWxsIG9ubHkgaWYgdGhlIGRvY3VtZW50IG9yIGRvY3VtZW50IGJvZHkgaXMgbm90XG4gKiB5ZXQgZGVmaW5lZC5cbiAqXG4gKiBAcGFyYW0gez9ET01Eb2N1bWVudH0gZG9jIERlZmF1bHRzIHRvIGN1cnJlbnQgZG9jdW1lbnQuXG4gKiBAcmV0dXJuIHs/RE9NRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gZ2V0QWN0aXZlRWxlbWVudChkb2MpIC8qP0RPTUVsZW1lbnQqL3tcbiAgZG9jID0gZG9jIHx8ICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB1bmRlZmluZWQpO1xuICBpZiAodHlwZW9mIGRvYyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB0cnkge1xuICAgIHJldHVybiBkb2MuYWN0aXZlRWxlbWVudCB8fCBkb2MuYm9keTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBkb2MuYm9keTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEFjdGl2ZUVsZW1lbnQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIEB0eXBlY2hlY2tzXG4gKi9cblxudmFyIF91cHBlcmNhc2VQYXR0ZXJuID0gLyhbQS1aXSkvZztcblxuLyoqXG4gKiBIeXBoZW5hdGVzIGEgY2FtZWxjYXNlZCBzdHJpbmcsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBoeXBoZW5hdGUoJ2JhY2tncm91bmRDb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kLWNvbG9yXCJcbiAqXG4gKiBGb3IgQ1NTIHN0eWxlIG5hbWVzLCB1c2UgYGh5cGhlbmF0ZVN0eWxlTmFtZWAgaW5zdGVhZCB3aGljaCB3b3JrcyBwcm9wZXJseVxuICogd2l0aCBhbGwgdmVuZG9yIHByZWZpeGVzLCBpbmNsdWRpbmcgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGh5cGhlbmF0ZShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKF91cHBlcmNhc2VQYXR0ZXJuLCAnLSQxJykudG9Mb3dlckNhc2UoKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoeXBoZW5hdGU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBAdHlwZWNoZWNrc1xuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGh5cGhlbmF0ZSA9IHJlcXVpcmUoJy4vaHlwaGVuYXRlJyk7XG5cbnZhciBtc1BhdHRlcm4gPSAvXm1zLS87XG5cbi8qKlxuICogSHlwaGVuYXRlcyBhIGNhbWVsY2FzZWQgQ1NTIHByb3BlcnR5IG5hbWUsIGZvciBleGFtcGxlOlxuICpcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ2JhY2tncm91bmRDb2xvcicpXG4gKiAgIDwgXCJiYWNrZ3JvdW5kLWNvbG9yXCJcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ01velRyYW5zaXRpb24nKVxuICogICA8IFwiLW1vei10cmFuc2l0aW9uXCJcbiAqICAgPiBoeXBoZW5hdGVTdHlsZU5hbWUoJ21zVHJhbnNpdGlvbicpXG4gKiAgIDwgXCItbXMtdHJhbnNpdGlvblwiXG4gKlxuICogQXMgTW9kZXJuaXpyIHN1Z2dlc3RzIChodHRwOi8vbW9kZXJuaXpyLmNvbS9kb2NzLyNwcmVmaXhlZCksIGFuIGBtc2AgcHJlZml4XG4gKiBpcyBjb252ZXJ0ZWQgdG8gYC1tcy1gLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gaHlwaGVuYXRlU3R5bGVOYW1lKHN0cmluZykge1xuICByZXR1cm4gaHlwaGVuYXRlKHN0cmluZykucmVwbGFjZShtc1BhdHRlcm4sICctbXMtJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaHlwaGVuYXRlU3R5bGVOYW1lOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2hlY2suXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCB0aGUgb2JqZWN0IGlzIGEgRE9NIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGlzTm9kZShvYmplY3QpIHtcbiAgdmFyIGRvYyA9IG9iamVjdCA/IG9iamVjdC5vd25lckRvY3VtZW50IHx8IG9iamVjdCA6IGRvY3VtZW50O1xuICB2YXIgZGVmYXVsdFZpZXcgPSBkb2MuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xuICByZXR1cm4gISEob2JqZWN0ICYmICh0eXBlb2YgZGVmYXVsdFZpZXcuTm9kZSA9PT0gJ2Z1bmN0aW9uJyA/IG9iamVjdCBpbnN0YW5jZW9mIGRlZmF1bHRWaWV3Lk5vZGUgOiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqZWN0Lm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygb2JqZWN0Lm5vZGVOYW1lID09PSAnc3RyaW5nJykpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTm9kZTsiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqL1xuXG52YXIgaXNOb2RlID0gcmVxdWlyZSgnLi9pc05vZGUnKTtcblxuLyoqXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNoZWNrLlxuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIG9iamVjdCBpcyBhIERPTSB0ZXh0IG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGlzVGV4dE5vZGUob2JqZWN0KSB7XG4gIHJldHVybiBpc05vZGUob2JqZWN0KSAmJiBvYmplY3Qubm9kZVR5cGUgPT0gMztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1RleHROb2RlOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogQHR5cGVjaGVja3NcbiAqIFxuICovXG5cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICAvLyBBZGRlZCB0aGUgbm9uemVybyB5IGNoZWNrIHRvIG1ha2UgRmxvdyBoYXBweSwgYnV0IGl0IGlzIHJlZHVuZGFudFxuICAgIHJldHVybiB4ICE9PSAwIHx8IHkgIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuXG4vKipcbiAqIFBlcmZvcm1zIGVxdWFsaXR5IGJ5IGl0ZXJhdGluZyB0aHJvdWdoIGtleXMgb24gYW4gb2JqZWN0IGFuZCByZXR1cm5pbmcgZmFsc2VcbiAqIHdoZW4gYW55IGtleSBoYXMgdmFsdWVzIHdoaWNoIGFyZSBub3Qgc3RyaWN0bHkgZXF1YWwgYmV0d2VlbiB0aGUgYXJndW1lbnRzLlxuICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIHZhbHVlcyBvZiBhbGwga2V5cyBhcmUgc3RyaWN0bHkgZXF1YWwuXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dFcXVhbChvYmpBLCBvYmpCKSB7XG4gIGlmIChpcyhvYmpBLCBvYmpCKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmpBICE9PSAnb2JqZWN0JyB8fCBvYmpBID09PSBudWxsIHx8IHR5cGVvZiBvYmpCICE9PSAnb2JqZWN0JyB8fCBvYmpCID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGtleXNBID0gT2JqZWN0LmtleXMob2JqQSk7XG4gIHZhciBrZXlzQiA9IE9iamVjdC5rZXlzKG9iakIpO1xuXG4gIGlmIChrZXlzQS5sZW5ndGggIT09IGtleXNCLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFRlc3QgZm9yIEEncyBrZXlzIGRpZmZlcmVudCBmcm9tIEIuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5c0EubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWhhc093blByb3BlcnR5LmNhbGwob2JqQiwga2V5c0FbaV0pIHx8ICFpcyhvYmpBW2tleXNBW2ldXSwgb2JqQltrZXlzQVtpXV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hhbGxvd0VxdWFsOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZGVzY3JpcHRpb24gQSBtb2R1bGUgZm9yIHBhcnNpbmcgSVNPODYwMSBkdXJhdGlvbnNcbiAqL1xuXG4vKipcbiAqIFRoZSBwYXR0ZXJuIHVzZWQgZm9yIHBhcnNpbmcgSVNPODYwMSBkdXJhdGlvbiAoUG5Zbk1uRFRuSG5NblMpLlxuICogVGhpcyBkb2VzIG5vdCBjb3ZlciB0aGUgd2VlayBmb3JtYXQgUG5XLlxuICovXG5cbi8vIFBuWW5NbkRUbkhuTW5TXG52YXIgbnVtYmVycyA9ICdcXFxcZCsoPzpbXFxcXC4sXVxcXFxkezAsM30pPyc7XG52YXIgd2Vla1BhdHRlcm4gPSAnKCcgKyBudW1iZXJzICsgJ1cpJztcbnZhciBkYXRlUGF0dGVybiA9ICcoJyArIG51bWJlcnMgKyAnWSk/KCcgKyBudW1iZXJzICsgJ00pPygnICsgbnVtYmVycyArICdEKT8nO1xudmFyIHRpbWVQYXR0ZXJuID0gJ1QoJyArIG51bWJlcnMgKyAnSCk/KCcgKyBudW1iZXJzICsgJ00pPygnICsgbnVtYmVycyArICdTKT8nO1xuXG52YXIgaXNvODYwMSA9ICdQKD86JyArIHdlZWtQYXR0ZXJuICsgJ3wnICsgZGF0ZVBhdHRlcm4gKyAnKD86JyArIHRpbWVQYXR0ZXJuICsgJyk/KSc7XG52YXIgb2JqTWFwID0gWyd3ZWVrcycsICd5ZWFycycsICdtb250aHMnLCAnZGF5cycsICdob3VycycsICdtaW51dGVzJywgJ3NlY29uZHMnXTtcblxuLyoqXG4gKiBUaGUgSVNPODYwMSByZWdleCBmb3IgbWF0Y2hpbmcgLyB0ZXN0aW5nIGR1cmF0aW9uc1xuICovXG52YXIgcGF0dGVybiA9IGV4cG9ydHMucGF0dGVybiA9IG5ldyBSZWdFeHAoaXNvODYwMSk7XG5cbi8qKiBQYXJzZSBQblluTW5EVG5Ibk1uUyBmb3JtYXQgdG8gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gZHVyYXRpb25TdHJpbmcgLSBQblluTW5EVG5Ibk1uUyBmb3JtYXR0ZWQgc3RyaW5nXG4gKiBAcmV0dXJuIHtPYmplY3R9IC0gV2l0aCBhIHByb3BlcnR5IGZvciBlYWNoIHBhcnQgb2YgdGhlIHBhdHRlcm5cbiAqL1xudmFyIHBhcnNlID0gZXhwb3J0cy5wYXJzZSA9IGZ1bmN0aW9uIHBhcnNlKGR1cmF0aW9uU3RyaW5nKSB7XG5cdC8vIHNsaWNlIGF3YXkgZmlyc3QgZW50cnkgaW4gbWF0Y2gtYXJyYXlcblx0cmV0dXJuIGR1cmF0aW9uU3RyaW5nLm1hdGNoKHBhdHRlcm4pLnNsaWNlKDEpLnJlZHVjZShmdW5jdGlvbiAocHJldiwgbmV4dCwgaWR4KSB7XG5cdFx0cHJldltvYmpNYXBbaWR4XV0gPSBwYXJzZUZsb2F0KG5leHQpIHx8IDA7XG5cdFx0cmV0dXJuIHByZXY7XG5cdH0sIHt9KTtcbn07XG5cbi8qKlxuICogQ29udmVydCBJU084NjAxIGR1cmF0aW9uIG9iamVjdCB0byBhbiBlbmQgRGF0ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZHVyYXRpb24gLSBUaGUgZHVyYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge0RhdGV9IHN0YXJ0RGF0ZSAtIFRoZSBzdGFydGluZyBEYXRlIGZvciBjYWxjdWxhdGluZyB0aGUgZHVyYXRpb25cbiAqIEByZXR1cm4ge0RhdGV9IC0gVGhlIHJlc3VsdGluZyBlbmQgRGF0ZVxuICovXG52YXIgZW5kID0gZXhwb3J0cy5lbmQgPSBmdW5jdGlvbiBlbmQoZHVyYXRpb24sIHN0YXJ0RGF0ZSkge1xuXHQvLyBjcmVhdGUgdHdvIGVxdWFsIHRpbWVzdGFtcHMsIGFkZCBkdXJhdGlvbiB0byAndGhlbicgYW5kIHJldHVybiB0aW1lIGRpZmZlcmVuY2Vcblx0dmFyIHRpbWVzdGFtcCA9IHN0YXJ0RGF0ZSA/IHN0YXJ0RGF0ZS5nZXRUaW1lKCkgOiBEYXRlLm5vdygpO1xuXHR2YXIgdGhlbiA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG5cblx0dGhlbi5zZXRGdWxsWWVhcih0aGVuLmdldEZ1bGxZZWFyKCkgKyBkdXJhdGlvbi55ZWFycyk7XG5cdHRoZW4uc2V0TW9udGgodGhlbi5nZXRNb250aCgpICsgZHVyYXRpb24ubW9udGhzKTtcblx0dGhlbi5zZXREYXRlKHRoZW4uZ2V0RGF0ZSgpICsgZHVyYXRpb24uZGF5cyk7XG5cdHRoZW4uc2V0SG91cnModGhlbi5nZXRIb3VycygpICsgZHVyYXRpb24uaG91cnMpO1xuXHR0aGVuLnNldE1pbnV0ZXModGhlbi5nZXRNaW51dGVzKCkgKyBkdXJhdGlvbi5taW51dGVzKTtcblx0Ly8gdGhlbi5zZXRTZWNvbmRzKHRoZW4uZ2V0U2Vjb25kcygpICsgZHVyYXRpb24uc2Vjb25kcyk7XG5cdHRoZW4uc2V0TWlsbGlzZWNvbmRzKHRoZW4uZ2V0TWlsbGlzZWNvbmRzKCkgKyBkdXJhdGlvbi5zZWNvbmRzICogMTAwMCk7XG5cdC8vIHNwZWNpYWwgY2FzZSB3ZWVrc1xuXHR0aGVuLnNldERhdGUodGhlbi5nZXREYXRlKCkgKyBkdXJhdGlvbi53ZWVrcyAqIDcpO1xuXG5cdHJldHVybiB0aGVuO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IElTTzg2MDEgZHVyYXRpb24gb2JqZWN0IHRvIHNlY29uZHNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZHVyYXRpb24gLSBUaGUgZHVyYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge0RhdGV9IHN0YXJ0RGF0ZSAtIFRoZSBzdGFydGluZyBwb2ludCBmb3IgY2FsY3VsYXRpbmcgdGhlIGR1cmF0aW9uXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKi9cbnZhciB0b1NlY29uZHMgPSBleHBvcnRzLnRvU2Vjb25kcyA9IGZ1bmN0aW9uIHRvU2Vjb25kcyhkdXJhdGlvbiwgc3RhcnREYXRlKSB7XG5cdHZhciB0aW1lc3RhbXAgPSBzdGFydERhdGUgPyBzdGFydERhdGUuZ2V0VGltZSgpIDogRGF0ZS5ub3coKTtcblx0dmFyIG5vdyA9IG5ldyBEYXRlKHRpbWVzdGFtcCk7XG5cdHZhciB0aGVuID0gZW5kKGR1cmF0aW9uLCBzdGFydERhdGUpO1xuXG5cdHZhciBzZWNvbmRzID0gKHRoZW4uZ2V0VGltZSgpIC0gbm93LmdldFRpbWUoKSkgLyAxMDAwO1xuXHRyZXR1cm4gc2Vjb25kcztcbn07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHtcblx0ZW5kOiBlbmQsXG5cdHRvU2Vjb25kczogdG9TZWNvbmRzLFxuXHRwYXR0ZXJuOiBwYXR0ZXJuLFxuXHRwYXJzZTogcGFyc2Vcbn07IiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24oKSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuXG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpZiAodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gRXJyb3IoXG4gICAgICAgICAgICAgIChjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycpICsgJzogJyArIGxvY2F0aW9uICsgJyB0eXBlIGAnICsgdHlwZVNwZWNOYW1lICsgJ2AgaXMgaW52YWxpZDsgJyArXG4gICAgICAgICAgICAgICdpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UsIGJ1dCByZWNlaXZlZCBgJyArIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSArICdgLidcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlcnIubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvciAmJiAhKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiB0eXBlIHNwZWNpZmljYXRpb24gb2YgJyArXG4gICAgICAgICAgICBsb2NhdGlvbiArICcgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICcgKyB0eXBlb2YgZXJyb3IgKyAnLiAnICtcbiAgICAgICAgICAgICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICtcbiAgICAgICAgICAgICdjcmVhdG9yIChhcnJheU9mLCBpbnN0YW5jZU9mLCBvYmplY3RPZiwgb25lT2YsIG9uZU9mVHlwZSwgYW5kICcgK1xuICAgICAgICAgICAgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nXG4gICAgICAgICAgKVxuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgICAvLyBPbmx5IG1vbml0b3IgdGhpcyBmYWlsdXJlIG9uY2UgYmVjYXVzZSB0aGVyZSB0ZW5kcyB0byBiZSBhIGxvdCBvZiB0aGVcbiAgICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgICB2YXIgc3RhY2sgPSBnZXRTdGFjayA/IGdldFN0YWNrKCkgOiAnJztcblxuICAgICAgICAgIHByaW50V2FybmluZyhcbiAgICAgICAgICAgICdGYWlsZWQgJyArIGxvY2F0aW9uICsgJyB0eXBlOiAnICsgZXJyb3IubWVzc2FnZSArIChzdGFjayAhPSBudWxsID8gc3RhY2sgOiAnJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxudmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHByaW50V2FybmluZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgdGV4dDtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgICAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArXG4gICAgICAgICAgICAgICdmdW5jdGlvbiBmb3IgdGhlIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgcHJvcCBvbiBgJyArIGNvbXBvbmVudE5hbWUgICsgJ2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzUmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkICcgKyAoJ2luIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGBudWxsYC4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYHVuZGVmaW5lZGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gICAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgICByZXR1cm4gY2hhaW5lZENoZWNrVHlwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gZXhwZWN0ZWRUeXBlKSB7XG4gICAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgICAvLyBjaGVjaywgYnV0IHdlIGNhbiBvZmZlciBhIG1vcmUgcHJlY2lzZSBlcnJvciBtZXNzYWdlIGhlcmUgcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyBwcmludFdhcm5pbmcoJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHByaW50V2FybmluZygnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb25UaGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICcgKyBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcoY2hlY2tlcikgKyAnIGF0IGluZGV4ICcgKyBpICsgJy4nXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uVGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBjb252ZXJ0OiBmdW5jdGlvbihjb250YWluZXJDbGFzcykge1xuICAgIGNvbnN0IHRtcCA9IGNvbnRhaW5lckNsYXNzO1xuICAgIGNvbnRhaW5lckNsYXNzID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgcmV0dXJuIG5ldyB0bXAoLi4uYXJncyk7XG4gICAgfTtcbiAgICBjb250YWluZXJDbGFzcy5wcm90b3R5cGUgPSB0bXAucHJvdG90eXBlO1xuICAgIGNvbnRhaW5lckNsYXNzLmdldFN0b3JlcyA9IHRtcC5nZXRTdG9yZXM7XG4gICAgY29udGFpbmVyQ2xhc3MuY2FsY3VsYXRlU3RhdGUgPSB0bXAuY2FsY3VsYXRlU3RhdGU7XG4gICAgcmV0dXJuIGNvbnRhaW5lckNsYXNzO1xuICB9XG59O1xuXG4iLCJpbXBvcnQgeyBtYXAgfSAgICAgICAgZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSAgIGZyb20gJ01haW4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgTm90ZUFwaUNsaWVudCAgZnJvbSAnU2VydmljZXMvTm90ZUFwaUNsaWVudCc7XG5pbXBvcnQgeyBsb2cgfSAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYEFwcEFjdGlvbmA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc2VsZWN0ZWRDb250ZW50KHNlbGVjdGVkLCB0aXRsZSkge1xuICAgIGRpc3BhdGNoKHsgdHlwZTogJ2NvbnRlbnQvc2VsZWN0Jywgc2VsZWN0ZWQsIHRpdGxlIH0pO1xuICB9LFxuICBmZXRjaENvbmZpZygpIHtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC5nZXRDb25maWcoKS50aGVuKFxuICAgICAgY29uZmlnID0+IHtcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnY29uZmlnL2ZldGNoL2FwcGlkJywgY29uZmlnIH0pO1xuICAgICAgfSk7XG4gIH0sXG4gIHdyaXRlQ29uZmlnKG9iaikge1xuICAgIHJldHVybiBOb3RlQXBpQ2xpZW50LnB1dENvbmZpZyhvYmopLnRoZW4oXG4gICAgICBjb25maWcgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdjb25maWcvd3JpdGUvYXBwaWQnLCBjb25maWcgfSk7XG4gICAgICB9KTtcbiAgfSxcbiAgd3JpdGVJbnZlbnRvcnlJdGVtcyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQud3JpdGVJbnZlbnRvcnlJdGVtcyhvcHRpb25zKS5waXBlKFxuICAgICAgbWFwKG9ianMgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL3dyaXRlL2ludmVudG9yeScsIG9wdGlvbnMgfSk7XG4gICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgfSkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBtYXAgfSAgICAgICAgZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSAgIGZyb20gJ01haW4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgTm90ZUFwaUNsaWVudCAgZnJvbSAnU2VydmljZXMvTm90ZUFwaUNsaWVudCc7XG5pbXBvcnQgeyBzcG4sIGxvZyB9ICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgQ29tcGxldGVBY3Rpb25gO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGluY3JlbWVudChvcHRpb25zLCBwYWdlKSB7XG4gICAgbG9nLnRyYWNlKGAke3BzcGlkfT5gLCBvcHRpb25zKTtcbiAgICBwYWdlID0gKytwYWdlID4gMCA/IHBhZ2UgOiAxO1xuICAgIHNwbi5zcGluKCk7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQuZmV0Y2hDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIHBhZ2UpXG4gICAgLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnaXRlbS9mZXRjaC9jb21wbGV0ZSdcbiAgICAgICAgLCBpdGVtcywgb3B0aW9ucywgcGFnZSB9KTtcbiAgICAgIGxvZy5pbmZvKGAke3BzcGlkfT5gLCAnUmVzcG9uc2U6IGl0ZW0vZmV0Y2gvY29tcGxldGUnKTtcbiAgICAgIHNwbi5zdG9wKCk7XG4gICAgfSk7XG4gIH0sXG4gIGRlY3JlbWVudChvcHRpb25zLCBwYWdlKSB7XG4gICAgcGFnZSA9IC0tcGFnZSA+IDAgPyBwYWdlIDogMTtcbiAgICBzcG4uc3BpbigpO1xuICAgIHJldHVybiBOb3RlQXBpQ2xpZW50LmZldGNoQ29tcGxldGVJdGVtcyhvcHRpb25zLCBwYWdlKVxuICAgIC50aGVuKGl0ZW1zID0+IHtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vZmV0Y2gvY29tcGxldGUnXG4gICAgICAgICwgaXRlbXMsIG9wdGlvbnMsIHBhZ2UgfSk7XG4gICAgICBsb2cuaW5mbyhgJHtwc3BpZH0+IFJlc3BvbnNlOiBpdGVtL2ZldGNoL2NvbXBsZXRlYCk7XG4gICAgICBzcG4uc3RvcCgpO1xuICAgIH0pO1xuICB9LFxuICB3cml0ZUNvbXBsZXRlSXRlbXMob3B0aW9ucykge1xuICAgIHNwbi5zcGluKCk7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQud3JpdGVDb21wbGV0ZUl0ZW1zKG9wdGlvbnMpLnBpcGUoXG4gICAgICBtYXAob2JqcyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vd3JpdGUvY29tcGxldGUnLCBvcHRpb25zIH0pO1xuICAgICAgICBsb2cuaW5mbyhgJHtwc3BpZH0+YCwgJ1Jlc3BvbnNlOiBpdGVtL3dyaXRlL2NvbXBsZXRlJyk7XG4gICAgICAgIHJldHVybiBvYmpzO1xuICAgICAgfSkpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBtYXAgfSAgICAgICAgZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZGlzcGF0Y2ggfSAgIGZyb20gJ01haW4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgTm90ZUFwaUNsaWVudCAgZnJvbSAnU2VydmljZXMvTm90ZUFwaUNsaWVudCc7XG5pbXBvcnQgeyBzcG4sIGxvZyB9ICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgZGlzcGxheU5hbWUgPSBgTm90ZUFjdGlvbmA7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaW5jcmVtZW50KG9wdGlvbnMsIHBhZ2UpIHtcbiAgICBwYWdlID0gKytwYWdlID4gMCA/IHBhZ2UgOiAxO1xuICAgIHNwbi5zcGluKCk7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQuZmV0Y2hJdGVtcyhvcHRpb25zLCBwYWdlKS50aGVuKFxuICAgICAgaXRlbXMgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL2ZldGNoL25vdGUnXG4gICAgICAgICAgLCBpdGVtcywgb3B0aW9ucywgcGFnZSB9KTtcbiAgICAgICAgc3BuLnN0b3AoKTtcbiAgICAgIH0pO1xuICB9LFxuICBkZWNyZW1lbnQob3B0aW9ucywgcGFnZSkge1xuICAgIHBhZ2UgPSAtLXBhZ2UgPiAwID8gcGFnZSA6IDE7XG4gICAgc3BuLnNwaW4oKTtcbiAgICByZXR1cm4gTm90ZUFwaUNsaWVudC5mZXRjaEl0ZW1zKG9wdGlvbnMsIHBhZ2UpLnRoZW4oXG4gICAgICBpdGVtcyA9PiB7XG4gICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ2l0ZW0vZmV0Y2gvbm90ZSdcbiAgICAgICAgICAsIGl0ZW1zLCBvcHRpb25zLCBwYWdlIH0pO1xuICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgfSk7XG4gIH0sXG4gIHdyaXRlSXRlbXMob3B0aW9ucykge1xuICAgIHNwbi5zcGluKCk7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQud3JpdGVJdGVtcyhvcHRpb25zKS5waXBlKFxuICAgICAgbWFwKG9ianMgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL3dyaXRlL25vdGUnLCBvcHRpb25zIH0pO1xuICAgICAgICByZXR1cm4gb2JqcztcbiAgICAgIH0pKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgbWFwIH0gICAgICAgIGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGRpc3BhdGNoIH0gICBmcm9tICdNYWluL2Rpc3BhdGNoZXInO1xuaW1wb3J0IE5vdGVBcGlDbGllbnQgIGZyb20gJ1NlcnZpY2VzL05vdGVBcGlDbGllbnQnO1xuaW1wb3J0IHsgbG9nIH0gICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYFByb2R1Y3RzQWN0aW9uYDtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbmNyZW1lbnQob3B0aW9ucywgcGFnZSkge1xuICAgIHBhZ2UgPSArK3BhZ2UgPiAwID8gcGFnZSA6IDE7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQuZmV0Y2hQcm9kdWN0c0l0ZW1zKG9wdGlvbnMsIHBhZ2UpXG4gICAgLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnaXRlbS9mZXRjaC9wcm9kdWN0cycsIGl0ZW1zLCBvcHRpb25zLCBwYWdlIH0pO1xuICAgIH0pO1xuICB9LFxuICBkZWNyZW1lbnQob3B0aW9ucywgcGFnZSkge1xuICAgIHBhZ2UgPSAtLXBhZ2UgPiAwID8gcGFnZSA6IDE7XG4gICAgcmV0dXJuIE5vdGVBcGlDbGllbnQuZmV0Y2hQcm9kdWN0c0l0ZW1zKG9wdGlvbnMsIHBhZ2UpXG4gICAgLnRoZW4oaXRlbXMgPT4ge1xuICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnaXRlbS9mZXRjaC9wcm9kdWN0cycsIGl0ZW1zLCBvcHRpb25zLCBwYWdlIH0pO1xuICAgIH0pO1xuICB9LFxuICB3cml0ZVByb2R1Y3RzSXRlbXMob3B0aW9ucykge1xuICAgIHJldHVybiBOb3RlQXBpQ2xpZW50LndyaXRlUHJvZHVjdHNJdGVtcyhvcHRpb25zKS5waXBlKFxuICAgICAgbWFwKG9ianMgPT4ge1xuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdpdGVtL3dyaXRlL3Byb2R1Y3RzJywgb3B0aW9ucyB9KTtcbiAgICAgICAgcmV0dXJuIG9ianM7XG4gICAgICB9KSk7XG4gIH1cbn1cbiIsImltcG9ydCBSZWFjdCAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IEFwcFNpZGViYXIgZnJvbSAnQ29tcG9uZW50cy9BcHBTaWRlYmFyL0FwcFNpZGViYXInO1xuaW1wb3J0IEFwcEZvcm0gICAgZnJvbSAnQ29tcG9uZW50cy9BcHBGb3JtL0FwcEZvcm0nO1xuaW1wb3J0IHsgbG9nIH0gICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY2xhc3MgQXBwQm9keSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGNvbmZpZyB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lLWdyb3VwXCI+XG4gICAgICA8QXBwU2lkZWJhciAvPlxuICAgICAgPEFwcEZvcm0gY29uZmlnPXtjb25maWd9Lz5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5BcHBCb2R5LmRpc3BsYXlOYW1lID0gJ0FwcEJvZHknO1xuQXBwQm9keS5kZWZhdWx0UHJvcHMgPSB7IGNvbmZpZzogbnVsbCB9O1xuQXBwQm9keS5wcm9wVHlwZXMgPSB7XG4gIGNvbmZpZzogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkXG59O1xuZXhwb3J0IGRlZmF1bHQgQXBwQm9keTtcbiIsImltcG9ydCBSZWFjdCAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyAgICBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBBcHBBY3Rpb24gICAgZnJvbSAnQWN0aW9ucy9BcHBBY3Rpb24nO1xuaW1wb3J0IHsgc3BuLCBsb2cgfSBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jbGFzcyBBcHBGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgY29uc3QgY29uZmlnID0gcHJvcHMuY29uZmlnO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBhcHBpZDogICAgICBjb25maWcuYXBwaWQgICAgICA/IGNvbmZpZy5hcHBpZCAgICAgIDogJydcbiAgICAsIGNlcnRpZDogICAgIGNvbmZpZy5jZXJ0aWQgICAgID8gY29uZmlnLmNlcnRpZCAgICAgOiAnJ1xuICAgICwgdG9rZW46ICAgICAgY29uZmlnLnRva2VuICAgICAgPyBjb25maWcudG9rZW4gICAgICA6ICcnXG4gICAgLCBydW5hbWU6ICAgICBjb25maWcucnVuYW1lICAgICA/IGNvbmZpZy5ydW5hbWUgICAgIDogJydcbiAgICAsIGF1dGhvcml6ZUFwaTogY29uZmlnLmF1dGhvcml6ZUFwaSA/IGNvbmZpZy5hdXRob3JpemVBcGkgOiAnJ1xuICAgICwgb2F1dGgyQXBpOiAgICBjb25maWcub2F1dGgyQXBpICAgID8gY29uZmlnLm9hdXRoMkFwaSAgICA6ICcnXG4gICAgLCBmaW5kaW5nQXBpOiAgIGNvbmZpZy5maW5kaW5nQXBpICAgPyBjb25maWcuZmluZGluZ0FwaSAgIDogJydcbiAgICAsIHRyYWRpbmdBcGk6ICAgY29uZmlnLnRyYWRpbmdBcGkgICA/IGNvbmZpZy50cmFkaW5nQXBpICAgOiAnJ1xuICAgICwgaW52ZW50b3J5QXBpOiBjb25maWcuaW52ZW50b3J5QXBpID8gY29uZmlnLmludmVudG9yeUFwaSA6ICcnXG4gICAgLCBtYXJrZXRpbmdBcGk6IGNvbmZpZy5tYXJrZXRpbmdBcGkgPyBjb25maWcubWFya2V0aW5nQXBpIDogJydcbiAgICAsIGFuYWx5dGljc0FwaTogY29uZmlnLmFuYWx5dGljc0FwaSA/IGNvbmZpZy5hbmFseXRpY3NBcGkgOiAnJ1xuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VSZXNldChlKSB7XG4gICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICBhcHBpZDogICAgICAgICAnJ1xuICAgICwgY2VydGlkOiAgICAgICAgJydcbiAgICAsIHRva2VuOiAgICAgICAgICcnXG4gICAgLCBydW5hbWU6ICAgICAgICAnJ1xuICAgICwgYXV0aG9yaXplQXBpOiAgJydcbiAgICAsIG9hdXRoMkFwaTogICAgICcnXG4gICAgLCBmaW5kaW5nQXBpOiAgICAnJ1xuICAgICwgdHJhZGluZ0FwaTogICAgJydcbiAgICAsIGludmVudG9yeUFwaTogICcnXG4gICAgLCBtYXJrZXRpbmdBcGk6ICAnJ1xuICAgICwgYW5hbHl0aWNzQXBpOiAgJydcbiAgICB9O1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2F2ZShlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHsgY29uZmlnIH0gPSB0aGlzLnByb3BzO1xuICAgIGxvZy5pbmZvKEFwcEZvcm0uZGlzcGxheU5hbWUsICdoYW5kbGVDaGFuZ2VTYXZlJywgY29uZmlnKTtcbiAgICBjb25zdCBuZXdDb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcsIHRoaXMuc3RhdGUpO1xuICAgIHNwbi5zcGluKCk7XG4gICAgaWYobmV3Q29uZmlnKSB7XG4gICAgICBBcHBBY3Rpb24ud3JpdGVDb25maWcobmV3Q29uZmlnKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgbG9nLmluZm8oQXBwRm9ybS5kaXNwbGF5TmFtZSwgJ2hhbmRsZUNoYW5nZVNhdmUnLCAnU3VjY2Vzcy4nKTtcbiAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICBsb2cuZXJyb3IoQXBwRm9ybS5kaXNwbGF5TmFtZSwgZXJyLm5hbWUsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VUZXh0KG5hbWUsIGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgW25hbWVdOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBsb2cudHJhY2UoQXBwRm9ybS5kaXNwbGF5TmFtZSwgJ1N0YXRlJywgdGhpcy5zdGF0ZSk7XG4gICAgbG9nLnRyYWNlKEFwcEZvcm0uZGlzcGxheU5hbWUsICdQcm9wcycsIHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IHsgYXBwaWQsIGNlcnRpZCwgdG9rZW4sIHJ1bmFtZVxuICAgICAgLCBhdXRob3JpemVBcGksIG9hdXRoMkFwaSwgZmluZGluZ0FwaSwgdHJhZGluZ0FwaSwgaW52ZW50b3J5QXBpLCBtYXJrZXRpbmdBcGksIGFuYWx5dGljc0FwaSB9XG4gICAgICA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZVwiPlxuICAgIDxmb3JtIGNsYXNzTmFtZT1cInBhZGRlZC1sZXNzXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5BcHAgSUQ8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJDbGllbnQgSURcIlxuICAgICAgICB2YWx1ZT17YXBwaWR9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnYXBwaWQnKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWw+Q2VydCBJRDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIkNsaWVudCBTZWNyZXRcIlxuICAgICAgICB2YWx1ZT17Y2VydGlkfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2NlcnRpZCcpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5BcHBsaWNhdGlvbiBUb2tlbjwvbGFiZWw+XG4gICAgICA8dGV4dGFyZWFcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJUb2tlblwiXG4gICAgICAgIHZhbHVlPXt0b2tlbn1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICd0b2tlbicpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5SdU5hbWU8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJlQmF5IFJlZGlyZWN0IFVSTCBuYW1lXCJcbiAgICAgICAgdmFsdWU9e3J1bmFtZX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdydW5hbWUnKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWw+QXV0aG9yaXplIEFQSSBVUkw8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJVUkxcIlxuICAgICAgICB2YWx1ZT17YXV0aG9yaXplQXBpfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2F1dGhvcml6ZUFwaScpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5PQXV0aDIgQVBJIFVSTDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlVSTFwiXG4gICAgICAgIHZhbHVlPXtvYXV0aDJBcGl9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnb2F1dGgyQXBpJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPkZpbmRpbmcgQVBJIFVSTDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlVSTFwiXG4gICAgICAgIHZhbHVlPXtmaW5kaW5nQXBpfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2ZpbmRpbmdBcGknKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWw+VHJhZGluZyBBUEkgVVJMPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVVJMXCJcbiAgICAgICAgdmFsdWU9e3RyYWRpbmdBcGl9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAndHJhZGluZ0FwaScpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgIDxsYWJlbD5JbnZlbnRvcnkgQVBJIFVSTDwvbGFiZWw+XG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIlVSTFwiXG4gICAgICAgIHZhbHVlPXtpbnZlbnRvcnlBcGl9XG4gICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnaW52ZW50b3J5QXBpJyl9IC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgPGxhYmVsPk1hcmtldGluZyBBUEkgVVJMPC9sYWJlbD5cbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiVVJMXCJcbiAgICAgICAgdmFsdWU9e21hcmtldGluZ0FwaX1cbiAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdtYXJrZXRpbmdBcGknKX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICA8bGFiZWw+QW5hbHl0aWNzIEFQSSBVUkw8L2xhYmVsPlxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJVUkxcIlxuICAgICAgICB2YWx1ZT17YW5hbHl0aWNzQXBpfVxuICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2FuYWx5dGljc0FwaScpfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwicmVzZXRcIiBjbGFzc05hbWU9XCJidG4gYnRuLWxhcmdlIGJ0bi1mb3JtIGJ0bi1kZWZhdWx0XCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VSZXNldC5iaW5kKHRoaXMpfT5cbiAgICAgICAgUmVzZXRcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1sYXJnZSBidG4tZm9ybSBidG4tcHJpbWFyeVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2F2ZS5iaW5kKHRoaXMpfT5cbiAgICAgICAgU2F2ZVxuICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvcm0+XG4gICAgPC9kaXY+O1xuICB9XG59XG5BcHBGb3JtLmRpc3BsYXlOYW1lID0gJ0FwcEZvcm0nO1xuQXBwRm9ybS5kZWZhdWx0UHJvcHMgPSB7IGNvbmZpZzogbnVsbCB9O1xuQXBwRm9ybS5wcm9wVHlwZXMgPSB7XG4gIGNvbmZpZyA6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZFxufTtcbmV4cG9ydCBkZWZhdWx0IEFwcEZvcm07XG4iLCJpbXBvcnQgUmVhY3QgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXBwQWN0aW9uICBmcm9tICdBY3Rpb25zL0FwcEFjdGlvbic7XG5pbXBvcnQgeyBsb2cgfSAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcFNpZGViYXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcHMuY29uZmlnKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lIHBhbmUtc20gc2lkZWJhclwiPlxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2LWdyb3VwXCI+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+TXkgYWNjb3VudDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24ta2V5XCI+PC9zcGFuPlxuICAgICAgICBBcHBsaWNhdGlvbiBrZXlzZXRcbiAgICAgIDwvc3Bhbj5cbiAgICA8L25hdj5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5BcHBTaWRlYmFyLmRpc3BsYXlOYW1lID0gYEFwcFNpZGViYXJWaWV3YDtcbiIsImltcG9ydCBSZWFjdCAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb21wbGV0ZVNpZGViYXIgIGZyb20gJ0NvbXBvbmVudHMvQ29tcGxldGVTaWRlYmFyL0NvbXBsZXRlU2lkZWJhcic7XG5pbXBvcnQgQ29tcGxldGVUYWJsZSAgICBmcm9tICdDb21wb25lbnRzL0NvbXBsZXRlVGFibGUvQ29tcGxldGVUYWJsZSc7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBDb21wbGV0ZUJvZHlWaWV3YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGxldGVCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmUtZ3JvdXBcIj5cbiAgICAgIDxDb21wbGV0ZVNpZGViYXJcbiAgICAgICAgcGFnZT17dGhpcy5wcm9wcy5wYWdlfVxuICAgICAgICBpdGVtcz17dGhpcy5wcm9wcy5pdGVtc31cbiAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5vcHRpb25zfSAvPlxuICAgICAgPENvbXBsZXRlVGFibGVcbiAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuaXRlbXN9XG4gICAgICAgIG9wdGlvbnM9e3RoaXMucHJvcHMub3B0aW9uc30gLz5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBDb21wbGV0ZUFjdGlvbiAgICAgZnJvbSAnQWN0aW9ucy9Db21wbGV0ZUFjdGlvbic7XG5pbXBvcnQgUmFkaW8gICAgICAgICAgICAgIGZyb20gJ0NvbXBvbmVudHMvUmFkaW8vUmFkaW8nO1xuaW1wb3J0IHsgbG9nLCBzcG4sIHV0aWwgfSBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuaW1wb3J0IHN0ZCAgICAgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvc3RkdXRpbHMnO1xuaW1wb3J0IGlwYyAgICAgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvaXBjdXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBDb21wbGV0ZVNpZGViYXJWaWV3YDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGxldGVTaWRlYmFyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BzLm9wdGlvbnMpO1xuICB9XG5cbiAgY3N2SGVhZGVyKCkge1xuICAgIHJldHVybiB7XG4gICAgICAnSW1hZ2UnOiAgICAgICAgICAgICAgICAnJ1xuICAgICAgLCAnVXJsJzogICAgICAgICAgICAgICAgJydcbiAgICAgICwgJ1RpdGxlJzogICAgICAgICAgICAgICcnXG4gICAgICAsICdTdGFydFRpbWUnOiAgICAgICAgICAnJ1xuICAgICAgLCAnRW5kVGltZSc6ICAgICAgICAgICAgJydcbiAgICAgICwgJ0NvbmRpdGlvbic6ICAgICAgICAgICcnXG4gICAgICAsICdTZWxsZXInOiAgICAgICAgICAgICAnJ1xuICAgICAgLCAnSXRlbUlEJzogICAgICAgICAgICAgJydcbiAgICAgICwgJ1Byb2R1Y3RJRChVUEMpJzogICAgICcnXG4gICAgICAsICdQcm9kdWN0SUQoRUFOKSc6ICAgICAnJ1xuICAgICAgLCAnUHJvZHVjdElEKElTQk4pJzogICAgJydcbiAgICAgICwgJ0NhdGVnb3J5JzogICAgICAgICAgICcnXG4gICAgICAsICdTaGlwcGluZyc6ICAgICAgICAgICAnJ1xuICAgICAgLCAnQ3VycmVudFByaWNlJzogICAgICAgJydcbiAgICAgICwgJ0N1cnJlbnRDdXJyZW5jeSc6ICAgICcnXG4gICAgICAsICdDb252ZXJ0ZWRQcmljZSc6ICAgICAnJ1xuICAgICAgLCAnQ29udmVydGVkQ3VycmVuY3knOiAgJydcbiAgICAgICwgJ1N0YXR1cyc6ICAgICAgICAgICAgICcnXG4gICAgICAsICdMZWZ0VGltZSc6ICAgICAgICAgICAnJ1xuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTYXZlKCkge1xuICAgIGxvZy5pbmZvKENvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlU2F2ZScpO1xuICAgIGlmKCFOdW1iZXIodGhpcy5zdGF0ZS5wYWdlcykpIHJldHVybiBpcGMud2luLnNob3dFcnJvckJveCgnUGFnZXMgaXMgbm90IGEgbnVtYmVyIScpO1xuICAgIGlwYy53aW4uc2hvd1NhdmVEaWFsb2coKGZpbGVuYW1lKSA9PiB7XG4gICAgICBpZighZmlsZW5hbWUpIHJldHVybiBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXNwb25zZScsICdGaWxlIHNhdmUgY2FuY2VsZWQhJyk7XG4gICAgICBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdmaWxlbmFtZScsIGZpbGVuYW1lKTtcbiAgICAgIHNwbi5zcGluKCk7XG4gICAgICBpcGMuc3lzLnRvdWNoRmlsZShmaWxlbmFtZSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuYWRkYm9tRmlsZShmaWxlbmFtZSkpXG4gICAgICAudGhlbigoKSA9PiBpcGMuc3lzLnNhdmVGaWxlKGZpbGVuYW1lLCB1dGlsLmdldENTVkhlYWRlcih0aGlzLmNzdkhlYWRlcigpKSkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIENvbXBsZXRlQWN0aW9uLndyaXRlQ29tcGxldGVJdGVtcyh0aGlzLnN0YXRlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgb2JqID0+IGlwYy5zeXMuc2F2ZUZpbGUoZmlsZW5hbWUsIG9iailcbiAgICAgICAgLCBlcnIgPT4ge1xuICAgICAgICAgICAgbG9nLmVycm9yKENvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSwgZXJyLm5hbWUsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGlwYy53aW4uc2hvd0Vycm9yQm94KGVycik7XG4gICAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgLCAoKSA9PiB7XG4gICAgICAgICAgICBsb2cuaW5mbyhDb21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXNwb25zZScsICdGaWxlIGhhcyBiZWVuIHNhdmVkIScpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93U2F2ZU1lc3NhZ2VCb3goKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZUhvbWUoKSB7XG4gICAgbG9nLmluZm8oQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VIb21lJyk7XG4gICAgQ29tcGxldGVBY3Rpb24uaW5jcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgMCk7XG4gIH1cblxuICBoYW5kbGVJbmNyZW1lbnQoKSB7XG4gICAgbG9nLmluZm8oQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVJbmNyZW1lbnQnKTtcbiAgICBDb21wbGV0ZUFjdGlvbi5pbmNyZW1lbnQodGhpcy5wcm9wcy5vcHRpb25zLCB0aGlzLnByb3BzLnBhZ2UpO1xuICB9XG5cbiAgaGFuZGxlRGVjcmVtZW50KCkge1xuICAgIGxvZy5pbmZvKENvbXBsZXRlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlRGVjcmVtZW50Jyk7XG4gICAgQ29tcGxldGVBY3Rpb24uZGVjcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgdGhpcy5wcm9wcy5wYWdlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVNlYXJjaChlKSB7XG4gICAgbG9nLmluZm8oQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VTZWFyY2gnKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgQ29tcGxldGVBY3Rpb24uaW5jcmVtZW50KHRoaXMuc3RhdGUsIDApO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlUmVzZXQoKSB7XG4gICAgbG9nLmluZm8oQ29tcGxldGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVDaGFuZ2VSZXNldCcpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaGlnaGVzdFByaWNlOiAgICcnXG4gICAgICAsIGxvd2VzdFByaWNlOiAgJydcbiAgICAgICwgc2hpcHBpbmc6ICAgICBbXVxuICAgICAgLCBjb25kaXRpb246ICAgIFtdXG4gICAgICAsIHN0YXR1czogICAgICAgW11cbiAgICAgICwgaXRlbUlkOiAgICAgICBbXVxuICAgICAgLCBjYXRlZ29yeVBhdGg6IFtdXG4gICAgICAsIHNlbGxlcjogICAgICAgW11cbiAgICAgICwgc3RhcnREYXRlOiAgICAnJ1xuICAgICAgLCBlbmREYXRlOiAgICAgICcnXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VUZXh0KG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBuZXdTdGF0ZVtuYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlQ2hlY2tib3gobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBuZXdTdGF0ZVtuYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2VsZWN0KG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBsZXQgb3B0aW9ucyA9IGUudGFyZ2V0Lm9wdGlvbnM7XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciggbGV0IGk9MDsgaTxvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihvcHRpb25zW2ldLnNlbGVjdGVkKSB2YWx1ZXMucHVzaChvcHRpb25zW2ldLnZhbHVlKTtcbiAgICB9XG4gICAgbmV3U3RhdGVbbmFtZV0gPSB2YWx1ZXM7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICByZW5kZXJPcHRpb24ob2JqcywgcHJvcDEsIHByb3AyKSB7XG4gICAgaWYoIW9ianMpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgY29uc3QgaXRlbXMgPSBvYmpzLm1hcChvYmogPT4ge1xuICAgICAgcmV0dXJuIChsZW4gPT09IDIpXG4gICAgICAgID8gb2JqW3Byb3AxXVswXVxuICAgICAgICA6IG9ialtwcm9wMV1bMF1bcHJvcDJdWzBdO1xuICAgIH0pXG4gICAgY29uc3Qgb3B0cyA9IHN0ZC5kc3QoaXRlbXMpO1xuICAgIHJldHVybiBvcHRzLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgIHJldHVybiA8b3B0aW9uXG4gICAgICAgIGtleT17XCJjaG9pY2UtXCIgKyBpZHh9IHZhbHVlPXtvcHR9ID57b3B0fTwvb3B0aW9uPjtcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XG4gICAgY29uc3Qgb3B0UGF0aHMgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdwcmltYXJ5Q2F0ZWdvcnknLCAnY2F0ZWdvcnlOYW1lJyk7XG4gICAgY29uc3Qgb3B0U2VscnMgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdzZWxsZXJJbmZvJywgJ3NlbGxlclVzZXJOYW1lJyk7XG4gICAgY29uc3Qgb3B0SW1JRHMgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdpdGVtSWQnKTtcbiAgICBjb25zdCBvcHRTaHBncyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NoaXBwaW5nSW5mbycsICdzaGlwVG9Mb2NhdGlvbnMnKTtcbiAgICBjb25zdCBvcHRTdHRzcyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NlbGxpbmdTdGF0dXMnLCAnc2VsbGluZ1N0YXRlJyk7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZSBwYW5lLXNtIHNpZGViYXJcIj5cbiAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdi1ncm91cFwiPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlRpdGxlPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggb2YgaXRlbXNcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaFN0cmluZ31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnc2VhcmNoU3RyaW5nJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNvbGQgbGlzdGluZzwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoZWNrYm94XCI+XG4gICAgICAgIDxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICB2YWx1ZT1cInNvbGRJdGVtT25seVwiXG4gICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5zb2xkSXRlbU9ubHl9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VDaGVja2JveC5iaW5kKHRoaXMsICdzb2xkSXRlbU9ubHknKX1cbiAgICAgICAgLz5Tb2xkIGl0ZW1zIG9ubHkuPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+RW5kIHRpbWU8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20gRGF0ZSAoeXl5eS9tbS9kZClcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnc3RhcnREYXRlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVG8gRGF0ZSAoeXl5eS9tbS9kZClcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmVuZERhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2VuZERhdGUnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VSZXNldC5iaW5kKHRoaXMpfT5SZXNldFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW1pbmkgYnRuLXByaW1hcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2VhcmNoLmJpbmQodGhpcyl9PlNlYXJjaFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG5cdFx0XHQ8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+RnVuY3Rpb25zPC9oNT5cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VIb21lLmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24taG9tZVwiPjwvc3Bhbj5cblx0XHRcdFx0SG9tZSAoe3BhZ2V9IHBhZ2UpXG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSW5jcmVtZW50LmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tcmlnaHQtYm9sZFwiPjwvc3Bhbj5cblx0XHRcdFx0TmV4dFxuXHRcdFx0PC9zcGFuPlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURlY3JlbWVudC5iaW5kKHRoaXMpfT5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLWxlZnQtYm9sZFwiPjwvc3Bhbj5cblx0XHRcdFx0UHJldmlvdXNcblx0XHRcdDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5PdXRwdXQ8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIk51bWJlciBvZiBwYWdlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFnZXN9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3BhZ2VzJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFjdGlvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW1pbmkgYnRuLXByaW1hcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2F2ZS5iaW5kKHRoaXMpfT5TYXZlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5DYXRlZ29yeTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY2F0ZWdvcnlQYXRofVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2NhdGVnb3J5UGF0aCcpfVxuICAgICAgICA+e29wdFBhdGhzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNlbGxlcjwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsbGVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzZWxsZXInKX1cbiAgICAgICAgPntvcHRTZWxyc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5JdGVtSUQ8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLml0ZW1JZH1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdpdGVtSWQnKX1cbiAgICAgICAgPntvcHRJbUlEc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5QcmljZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSGlnaGVzdCBwcmljZVwiIFxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmhpZ2hlc3RQcmljZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnaGlnaGVzdFByaWNlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTG93ZXN0IHByaWNlXCIgXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubG93ZXN0UHJpY2V9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2xvd2VzdFByaWNlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNoaXBwaW5nPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zaGlwcGluZ31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzaGlwcGluZycpfVxuICAgICAgICA+e29wdFNocGdzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkNvbmRpdGlvbjwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY29uZGl0aW9ufVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2NvbmRpdGlvbicpfT5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTAwMFwiPk5ldzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxNTAwXCI+XG4gICAgICAgICAgICBOZXcgb3RoZXIgKHNlZSBkZXRhaWxzKTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxNzUwXCI+XG4gICAgICAgICAgICBOZXcgd2l0aCBkZWZlY3RzPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwMDBcIj5cbiAgICAgICAgICAgIE1hbnVmYWN0dXJlciByZWZ1cmJpc2hlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyNTAwXCI+XG4gICAgICAgICAgICBTZWxsZXIgcmVmdXJiaXNoZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMzAwMFwiPlVzZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDAwMFwiPlZlcnkgR29vZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1MDAwXCI+R29vZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI2MDAwXCI+QWNjZXB0YWJsZTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI3MDAwXCI+XG4gICAgICAgICAgICBGb3IgcGFydHMgb3Igbm90IHdvcmtpbmc8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U3RhdHVzPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdGF0dXN9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnc3RhdHVzJyl9XG4gICAgICAgICAgPntvcHRTdHRzc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25hdj5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5Db21wbGV0ZVNpZGViYXIuZGlzcGxheU5hbWUgPSAnQ29tcGxldGVTaWRlYmFyJztcbiIsImltcG9ydCBSZWFjdCAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3N0ZHV0aWxzJztcbmltcG9ydCB7IGxvZywgdXRpbCB9ICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBDb21wbGV0ZVRhYmxlVmlld2A7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBsZXRlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXJTdGF0dXMoc3RhdHVzKSB7XG4gICAgbGV0IHN0eWxlcztcbiAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAnYmx1ZScgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlc30+Tm93IGF2YWlsYWJsZS48L2Rpdj47XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAnb3JhbmdlJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5OZXcgYWRkZWQuPC9kaXY+O1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHlsZXMgPSB7IGZvbnRXZWlnaHQ6J2JvbGQnLCBjb2xvcjogJ3JlZCcgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlc30+UmVtb3ZlZC48L2Rpdj47XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckV4dGVuc2lvbihkdXJhdGlvbikge1xuICAgIHJldHVybiA8ZGl2PiggeyB1dGlsLnRvTGVmdERheXMoZHVyYXRpb24pIH0gKTwvZGl2PjtcbiAgfVxuXG4gIHJlbmRlckl0ZW0ob2JqLCBpZHgpIHtcbiAgICBjb25zdCBpdGVtID0gb2JqO1xuICAgIGNvbnN0IEltZyA9IGl0ZW0uaGFzT3duUHJvcGVydHkoJ2dhbGxlcnlVUkwnKVxuICAgICAgPyBpdGVtLmdhbGxlcnlVUkxbMF0gOiAnJztcbiAgICBjb25zdCBBaWQgPSBpdGVtLml0ZW1JZFswXTtcbiAgICBjb25zdCBQaWQgPSBpdGVtLmhhc093blByb3BlcnR5KCdwcm9kdWN0SWQnKVxuICAgICAgPyBpdGVtLnByb2R1Y3RJZC5tYXAob2JqID0+XG4gICAgICAgIGAke29iai5fX3ZhbHVlX199ICggJHtvYmpbJ0B0eXBlJ119IClgKSA6IFsnLS0tJ107XG4gICAgY29uc3QgU2lkID0gaXRlbS5zZWxsZXJJbmZvWzBdLnNlbGxlclVzZXJOYW1lWzBdO1xuICAgIGNvbnN0IFN0bVxuICAgICAgPSBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoaXRlbS5saXN0aW5nSW5mb1swXS5zdGFydFRpbWVbMF0pO1xuICAgIGNvbnN0IEV0bVxuICAgICAgPSBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoaXRlbS5saXN0aW5nSW5mb1swXS5lbmRUaW1lWzBdKTtcbiAgICBjb25zdCBVcmwgPSBpdGVtLnZpZXdJdGVtVVJMWzBdO1xuICAgIGNvbnN0IFR0bCA9IGl0ZW0udGl0bGVbMF07XG4gICAgY29uc3QgUGMxID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAuY3VycmVudFByaWNlWzBdLl9fdmFsdWVfXztcbiAgICBjb25zdCBDaTEgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jdXJyZW50UHJpY2VbMF1bJ0BjdXJyZW5jeUlkJ107XG4gICAgY29uc3QgUGMyID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXztcbiAgICBjb25zdCBDaTIgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF1bJ0BjdXJyZW5jeUlkJ107XG4gICAgY29uc3QgQ2RuID0gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnY29uZGl0aW9uJykgXG4gICAgICA/IGl0ZW0uY29uZGl0aW9uWzBdLmNvbmRpdGlvbkRpc3BsYXlOYW1lWzBdIDogJy0tLSc7XG4gICAgY29uc3QgQ2dwID0gaXRlbS5wcmltYXJ5Q2F0ZWdvcnlbMF0uY2F0ZWdvcnlOYW1lWzBdO1xuICAgIGNvbnN0IFNocCA9IGl0ZW0uc2hpcHBpbmdJbmZvWzBdLnNoaXBUb0xvY2F0aW9uc1swXTtcbiAgICBjb25zdCBTdHQgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF0uc2VsbGluZ1N0YXRlWzBdO1xuICAgIGNvbnN0IEV4dCA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXS5oYXNPd25Qcm9wZXJ0eSgndGltZUxlZnQnKVxuICAgICAgPyB0aGlzLnJlbmRlckV4dGVuc2lvbihpdGVtLnNlbGxpbmdTdGF0dXNbMF0udGltZUxlZnRbMF0pXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IHN0dCA9IHRoaXMucmVuZGVyU3RhdHVzKDApO1xuICAgIGNvbnN0IFVwZCA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChEYXRlLm5vdygpKTtcblxuICAgIHJldHVybiA8dGJvZHkga2V5PXtpZHh9Pjx0cj5cbiAgICAgIDx0ZD48aW1nIHNyYz17SW1nfSB3aWR0aD0nMTI4JyBoZWlnaHQ9JzEyOCcgLz48L3RkPlxuICAgICAgPHRkPjxzcGFuPlxuICAgICAgICA8YSBocmVmPXtVcmx9IHRhcmdldD0nX2JsYW5rJz57VHRsfTwvYT48YnIgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgU2VsbCBwZXJpb2QgOiB7U3RtfSB+IHtFdG19PGJyIC8+XG4gICAgICAgIENvbmRpdGlvbiA6IHtDZG59PGJyIC8+XG4gICAgICAgIFNlbGxlciA6IHtTaWR9PGJyIC8+XG4gICAgICAgIEl0ZW1JRCA6IHtBaWR9PGJyIC8+XG4gICAgICAgIFByb2R1Y3RJRCA6IHtQaWQuam9pbignICcpfTxiciAvPlxuICAgICAgICBDYXRlZ29yeSA6IHtDZ3B9XG4gICAgICA8L3NwYW4+PC90ZD5cbiAgICAgIDx0ZD57U2hwfTwvdGQ+XG4gICAgICA8dGQ+XG4gICAgICAgIDxzcGFuPntQYzF9IHtDaTF9PC9zcGFuPjxiciAvPlxuICAgICAgICA8c3Bhbj4oIHtQYzJ9IHtDaTJ9ICk8L3NwYW4+XG4gICAgICA8L3RkPlxuICAgICAgPHRkPjxzcGFuPntTdHR9PC9zcGFuPjxiciAvPjxzcGFuPntFeHR9PC9zcGFuPjwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+e3N0dH08L3NwYW4+PGJyIC8+PHNwYW4+e1VwZH08L3NwYW4+PC90ZD5cbiAgICA8L3RyPjwvdGJvZHk+O1xuICB9XG5cbiAgZmlsdGVySXRlbXMob2Jqcywgb3B0aW9ucykge1xuICAgIGxvZy50cmFjZShgJHtwc3BpZH0+YCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG9ianMuZmlsdGVyKG9iaiA9PiB7IFxuICAgICAgY29uc3QgaXRlbSA9IG9iajtcbiAgICAgIGlmKG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBpZighb3B0aW9ucy5zaGlwcGluZy5zb21lKHNoaXBwaW5nID0+XG4gICAgICAgICAgICBzaGlwcGluZyA9PT0gaXRlbS5zaGlwcGluZ0luZm9bMF1cbiAgICAgICAgICAgIC5zaGlwVG9Mb2NhdGlvbnNbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zaGlwcGluZy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5jb25kaXRpb24uc29tZShjb25kaXRpb24gPT4gXG4gICAgICAgICAgICBjb25kaXRpb24gPT09IGl0ZW0uY29uZGl0aW9uWzBdXG4gICAgICAgICAgICAuY29uZGl0aW9uSWRbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5jb25kaXRpb24ubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuc3RhdHVzLnNvbWUoc3RhdHVzID0+XG4gICAgICAgICAgICBzdGF0dXMgPT09IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLnNlbGxpbmdTdGF0ZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnN0YXR1cy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5jYXRlZ29yeVBhdGguc29tZShwYXRoID0+XG4gICAgICAgICAgICBwYXRoID09PSBpdGVtLnByaW1hcnlDYXRlZ29yeVswXVxuICAgICAgICAgICAgLmNhdGVnb3J5TmFtZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLmNhdGVnb3J5UGF0aC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5zZWxsZXIuc29tZShzZWxyID0+IFxuICAgICAgICAgICAgc2VsciA9PT0gaXRlbS5zZWxsZXJJbmZvWzBdXG4gICAgICAgICAgICAuc2VsbGVyVXNlck5hbWVbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zZWxsZXIubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuaXRlbUlkLnNvbWUoaXRlbWlkID0+IFxuICAgICAgICAgICAgaXRlbWlkID09PSBpdGVtLml0ZW1JZFswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLml0ZW1JZC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNGaW5pdGUob3B0aW9ucy5sb3dlc3RQcmljZSkgXG4gICAgICAgICAgfHwgIWlzRmluaXRlKG9wdGlvbnMuaGlnaGVzdFByaWNlKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKE51bWJlcihvcHRpb25zLmxvd2VzdFByaWNlKSA+IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXS5fX3ZhbHVlX18gXG4gICAgICAgICAgJiYgb3B0aW9ucy5sb3dlc3RQcmljZSAhPT0gJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZihOdW1iZXIob3B0aW9ucy5oaWdoZXN0UHJpY2UpIDwgaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXyBcbiAgICAgICAgICAmJiBvcHRpb25zLmhpZ2hlc3RQcmljZSAhPT0gJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMucHJvcHMuaXRlbXNcbiAgICAgID8gdGhpcy5maWx0ZXJJdGVtcyh0aGlzLnByb3BzLml0ZW1zLCBvcHRpb25zKVxuICAgICAgICAubWFwKChpdGVtLCBpZHgpID0+IHRoaXMucmVuZGVySXRlbShpdGVtLCBpZHgpKVxuICAgICAgOiBudWxsO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmVcIj5cbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZS1zdHJpcGVkXCI+XG4gICAgICA8dGhlYWQ+PHRyPlxuICAgICAgPHRoPkltYWdlPC90aD5cbiAgICAgIDx0aD5EZXRhaWw8L3RoPlxuICAgICAgPHRoPlNoaXBwaW5nPC90aD5cbiAgICAgIDx0aD5QcmljZTwvdGg+XG4gICAgICA8dGg+U3RhdHVzPC90aD5cbiAgICAgIDx0aD5VcGRhdGU8L3RoPlxuICAgICAgPC90cj48L3RoZWFkPlxuICAgICAge2l0ZW1zfVxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5cbiIsImltcG9ydCBSZWFjdCAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBsb2cgfSAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgQ29udGVuc1ZpZXdgO1xuXG5jbGFzcyBDb250ZW50cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCBjb250bnQgPSB0aGlzLnByb3BzLmNoaWxkcmVuW3RoaXMucHJvcHMuc2VsZWN0ZWRdO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIndpbmRvdy1jb250ZW50XCI+e2NvbnRudH08L2Rpdj47XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRzO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyAgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBsb2cgfSAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jbGFzcyBFcnJvckJvdW5kYXJ5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgZXJyb3I6IG51bGwsIGVycm9ySW5mbzogbnVsbCB9O1xuICB9XG5cbiAgY29tcG9uZW50RGlkQ2F0Y2goZXJyb3IsIGVycm9ySW5mbykge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBlcnJvciwgZXJyb3JJbmZvIH0pO1xuICAgIGxvZy5lcnJvcihFcnJvckJvdW5kYXJ5LmRpc3BsYXlOYW1lLCBlcnJvciwgZXJyb3JJbmZvKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5lcnJvckluZm8pIHtcbiAgICAgIHJldHVybiA8ZGl2PjxoMj5Tb21ldGhpbmcgd2VudCB3cm9uZy48L2gyPlxuICAgICAgICA8ZGV0YWlscyBzdHlsZT17eyB3aGl0ZVNwYWNlOiAncHJlLXdyYXAnIH19PlxuICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvciAmJiB0aGlzLnN0YXRlLmVycm9yLnRvU3RyaW5nKCl9XG4gICAgICAgIDxiciAvPlxuICAgICAgICB7dGhpcy5zdGF0ZS5lcnJvckluZm8uY29tcG9uZW50U3RhY2t9XG4gICAgICAgIDwvZGV0YWlscz5cbiAgICAgIDwvZGl2PjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG4gIH1cbn07XG5FcnJvckJvdW5kYXJ5LmRpc3BsYXlOYW1lID0gJ0Vycm9yQm91bmRhcnknO1xuRXJyb3JCb3VuZGFyeS5kZWZhdWx0UHJvcHMgPSB7fTtcbkVycm9yQm91bmRhcnkucHJvcFR5cGVzID0ge307XG5leHBvcnQgZGVmYXVsdCBFcnJvckJvdW5kYXJ5O1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgQXBwQWN0aW9uICAgICAgICAgIGZyb20gJ0FjdGlvbnMvQXBwQWN0aW9uJztcbmltcG9ydCB7IGxvZywgc3BuLCB1dGlsIH0gZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcbmltcG9ydCBpcGMgICAgICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL2lwY3V0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgR2xvYmFsRm9vdGVyVmlld2A7XG5cbmNsYXNzIEdsb2JhbEZvb3RlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNzdkhlYWRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTYXZlKCkge1xuICAgIGxvZy5pbmZvKEdsb2JhbEZvb3Rlci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3Q6IGhhbmRsZUNoYW5nZVNhdmUnKTtcbiAgICBpcGMud2luLnNob3dTYXZlRGlhbG9nKChmaWxlbmFtZSkgPT4ge1xuICAgICAgaWYoIWZpbGVuYW1lKSByZXR1cm4gbG9nLmVycm9yKEdsb2JhbEZvb3Rlci5kaXNwbGF5TmFtZSwgJ0Vycm9yJywgJ0ZpbGUgc2F2ZSBjYW5jZWxlZCEnKTtcbiAgICAgIHNwbi5zcGluKCk7XG4gICAgICBpcGMuc3lzLnRvdWNoRmlsZShmaWxlbmFtZSlcbiAgICAgIC50aGVuKCgpID0+IGlwYy5zeXMuYWRkYm9tRmlsZShmaWxlbmFtZSkpXG4gICAgICAudGhlbigoKSA9PiBpcGMuc3lzLnNhdmVGaWxlKGZpbGVuYW1lLCB1dGlsLmdldENTVkhlYWRlcih0aGlzLmNzdkhlYWRlcigpKSkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIEFwcEFjdGlvbi53cml0ZUludmVudG9yeUl0ZW1zKHRoaXMuc3RhdGUpLnN1YnNjcmliZShcbiAgICAgICAgICBvYmogPT4gaXBjLnN5cy5zYXZlRmlsZShmaWxlbmFtZSwgb2JqKVxuICAgICAgICAsIGVyciA9PiB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoR2xvYmFsRm9vdGVyLmRpc3BsYXlOYW1lLCBlcnIubmFtZSwgZXJyLm1lc3NhZ2UsIGVyci5zdGFjayk7XG4gICAgICAgICAgICBpcGMud2luLnNob3dFcnJvckJveChlcnIpO1xuICAgICAgICAgICAgc3BuLnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICwgKCkgPT4ge1xuICAgICAgICAgICAgbG9nLmluZm8oR2xvYmFsRm9vdGVyLmRpc3BsYXlOYW1lLCAnaGFuZGxlQ2hhbmdlU2F2ZScsICdGaWxlIGhhcyBiZWVuIHNhdmVkIScpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93U2F2ZU1lc3NhZ2VCb3goKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZUNsb3NlKCkge1xuICAgIGlwYy53aW4uc2hvd0Nsb3NlTWVzc2FnZUJveCgocmVzcG9uc2UpID0+IHtcbiAgICAgIGxvZy50cmFjZShHbG9iYWxGb290ZXIuZGlzcGxheU5hbWUsICdDbGljayBidXR0b246JywgcmVzcG9uc2UpO1xuICAgICAgaWYoIXJlc3BvbnNlKSBpcGMud2luLmNsb3NlKCk7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxmb290ZXIgY2xhc3NOYW1lPVwidG9vbGJhciB0b29sYmFyLWZvb3RlclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sYmFyLWFjdGlvbnNcIj5cbiAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kZWZhdWx0XCIgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VDbG9zZS5iaW5kKHRoaXMpfT5DbG9zZTwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2F2ZS5iaW5kKHRoaXMpfT5TYXZlPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Zvb3Rlcj47XG4gIH1cbn07XG5HbG9iYWxGb290ZXIuZGlzcGxheU5hbWUgPSAnR2xvYmFsRm9vdGVyJztcbmV4cG9ydCBkZWZhdWx0IEdsb2JhbEZvb3RlcjtcbiIsImltcG9ydCBSZWFjdCAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBsb2cgfSAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgR2xvYmFsSGVhZGVyVmlld2A7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdsb2JhbEhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPGhlYWRlciBjbGFzc05hbWU9XCJ0b29sYmFyIHRvb2xiYXItaGVhZGVyXCI+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGl0bGVcIj57dGhpcy5wcm9wcy50aXRsZX08L2gxPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0b29sYmFyLWFjdGlvbnNcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tZGVmYXVsdCBidG4tZHJvcGRvd24gcHVsbC1yaWdodFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb24gaWNvbi1tZWdhcGhvbmVcIj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+O1xuICB9XG59XG4iLCJpbXBvcnQgUmVhY3QgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBOb3RlU2lkZWJhciAgZnJvbSAnQ29tcG9uZW50cy9Ob3RlU2lkZWJhci9Ob3RlU2lkZWJhcic7XG5pbXBvcnQgTm90ZVRhYmxlICAgIGZyb20gJ0NvbXBvbmVudHMvTm90ZVRhYmxlL05vdGVUYWJsZSc7XG5pbXBvcnQgeyBsb2cgfSAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYE5vdGVCb2R5Vmlld2A7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5vdGVCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmUtZ3JvdXBcIj5cbiAgICAgIDxOb3RlU2lkZWJhclxuICAgICAgICBwYWdlPXt0aGlzLnByb3BzLnBhZ2V9XG4gICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLml0ZW1zfVxuICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9IC8+XG4gICAgICA8Tm90ZVRhYmxlXG4gICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLml0ZW1zfVxuICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9IC8+XG4gICAgPC9kaXY+O1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTm90ZUFjdGlvbiAgICAgICAgIGZyb20gJ0FjdGlvbnMvTm90ZUFjdGlvbic7XG5pbXBvcnQgUmFkaW8gICAgICAgICAgICAgIGZyb20gJ0NvbXBvbmVudHMvUmFkaW8vUmFkaW8nO1xuaW1wb3J0IHsgbG9nLCBzcG4sIHV0aWwgfSBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuaW1wb3J0IHN0ZCAgICAgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvc3RkdXRpbHMnO1xuaW1wb3J0IGlwYyAgICAgICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvaXBjdXRpbHMnO1xuXG5jbGFzcyBOb3RlU2lkZWJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5vcHRpb25zKTtcbiAgfVxuXG4gIGNzdkhlYWRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0ltYWdlJzogICAgICAgICAgICAgICAgJydcbiAgICAgICwgJ1VybCc6ICAgICAgICAgICAgICAgICcnXG4gICAgICAsICdUaXRsZSc6ICAgICAgICAgICAgICAnJ1xuICAgICAgLCAnU3RhcnRUaW1lJzogICAgICAgICAgJydcbiAgICAgICwgJ0VuZFRpbWUnOiAgICAgICAgICAgICcnXG4gICAgICAsICdDb25kaXRpb24nOiAgICAgICAgICAnJ1xuICAgICAgLCAnU2VsbGVyJzogICAgICAgICAgICAgJydcbiAgICAgICwgJ0l0ZW1JRCc6ICAgICAgICAgICAgICcnXG4gICAgICAsICdQcm9kdWN0SUQoVVBDKSc6ICAgICAnJ1xuICAgICAgLCAnUHJvZHVjdElEKEVBTiknOiAgICAgJydcbiAgICAgICwgJ1Byb2R1Y3RJRChJU0JOKSc6ICAgICcnXG4gICAgICAsICdDYXRlZ29yeSc6ICAgICAgICAgICAnJ1xuICAgICAgLCAnU2hpcHBpbmcnOiAgICAgICAgICAgJydcbiAgICAgICwgJ0N1cnJlbnRQcmljZSc6ICAgICAgICcnXG4gICAgICAsICdDdXJyZW50Q3VycmVuY3knOiAgICAnJ1xuICAgICAgLCAnQ29udmVydGVkUHJpY2UnOiAgICAgJydcbiAgICAgICwgJ0NvbnZlcnRlZEN1cnJlbmN5JzogICcnXG4gICAgICAsICdTdGF0dXMnOiAgICAgICAgICAgICAnJ1xuICAgICAgLCAnTGVmdFRpbWUnOiAgICAgICAgICAgJydcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2F2ZSgpIHtcbiAgICBsb2cuaW5mbyhOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlU2F2ZScpO1xuICAgIGlmKCFOdW1iZXIodGhpcy5zdGF0ZS5wYWdlcykpIHJldHVybiBpcGMud2luLnNob3dFcnJvckJveCgnUGFnZXMgaXMgbm90IGEgbnVtYmVyIScpO1xuICAgIGlwYy53aW4uc2hvd1NhdmVEaWFsb2coZmlsZW5hbWUgPT4ge1xuICAgICAgaWYoIWZpbGVuYW1lKSByZXR1cm4gbG9nLmluZm8oTm90ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXNwb25zZScsICdGaWxlIHNhdmUgY2FuY2VsZWQhJyk7XG4gICAgICBzcG4uc3BpbigpO1xuICAgICAgaXBjLnN5cy50b3VjaEZpbGUoZmlsZW5hbWUpXG4gICAgICAudGhlbigoKSA9PiBpcGMuc3lzLmFkZGJvbUZpbGUoZmlsZW5hbWUpKVxuICAgICAgLnRoZW4oKCkgPT4gaXBjLnN5cy5zYXZlRmlsZShmaWxlbmFtZSwgdXRpbC5nZXRDU1ZIZWFkZXIodGhpcy5jc3ZIZWFkZXIoKSkpKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBOb3RlQWN0aW9uLndyaXRlSXRlbXModGhpcy5zdGF0ZSkuc3Vic2NyaWJlKFxuICAgICAgICAgIG9iaiA9PiBpcGMuc3lzLnNhdmVGaWxlKGZpbGVuYW1lLCBvYmopXG4gICAgICAgICwgZXJyID0+IHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgZXJyLm5hbWUsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGlwYy53aW4uc2hvd0Vycm9yQm94KGVycik7XG4gICAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgLCAoKSA9PiB7XG4gICAgICAgICAgICBsb2cuaW5mbyhOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ2hhbmRsZUNoYW5nZVNhdmUnLCAnRmlsZSBoYXMgYmVlbiBzYXZlZCEnKTtcbiAgICAgICAgICAgIGlwYy53aW4uc2hvd1NhdmVNZXNzYWdlQm94KCk7XG4gICAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIFxuICBoYW5kbGVDaGFuZ2VIb21lKCkge1xuICAgIGxvZy5pbmZvIChOb3RlU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlSG9tZScpO1xuICAgIE5vdGVBY3Rpb24uaW5jcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgMCk7XG4gIH1cblxuICBoYW5kbGVJbmNyZW1lbnQoKSB7XG4gICAgbG9nLmluZm8gKE5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVJbmNyZW1lbnQnKTtcbiAgICBOb3RlQWN0aW9uLmluY3JlbWVudCh0aGlzLnByb3BzLm9wdGlvbnMsIHRoaXMucHJvcHMucGFnZSk7XG4gIH1cblxuICBoYW5kbGVEZWNyZW1lbnQoKSB7XG4gICAgbG9nLmluZm8gKE5vdGVTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVxdWVzdCcsICdoYW5kbGVEZWNyZW1lbnQnKTtcbiAgICBOb3RlQWN0aW9uLmRlY3JlbWVudCh0aGlzLnByb3BzLm9wdGlvbnMsIHRoaXMucHJvcHMucGFnZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTZWFyY2goZXZlbnQpIHtcbiAgICBsb2cuaW5mbyAoTm90ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUNoYW5nZVNlYXJjaCcpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgTm90ZUFjdGlvbi5pbmNyZW1lbnQodGhpcy5zdGF0ZSwgMCk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VSZXNldCgpIHtcbiAgICBsb2cuaW5mbyAoTm90ZVNpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUNoYW5nZVJlc2V0Jyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBoaWdoZXN0UHJpY2U6ICAgJydcbiAgICAgICwgbG93ZXN0UHJpY2U6ICAnJ1xuICAgICAgLCBzaGlwcGluZzogICAgIFtdXG4gICAgICAsIGNvbmRpdGlvbjogICAgW11cbiAgICAgICwgc3RhdHVzOiAgICAgICBbXVxuICAgICAgLCBpdGVtSWQ6ICAgICAgIFtdXG4gICAgICAsIGNhdGVnb3J5UGF0aDogW11cbiAgICAgICwgc2VsbGVyOiAgICAgICBbXVxuICAgICAgLCBzdGFydERhdGU6ICAgICcnXG4gICAgICAsIGVuZERhdGU6ICAgICAgJydcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVRleHQobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VDaGVja2JveChuYW1lLCBlKSB7XG4gICAgbGV0IG5ld1N0YXRlID0ge307XG4gICAgbmV3U3RhdGVbbmFtZV0gPSBlLnRhcmdldC5jaGVja2VkO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlUmFkaW8obmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQudmFsdWU7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTZWxlY3QobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIGxldCBvcHRpb25zID0gZS50YXJnZXQub3B0aW9ucztcbiAgICBsZXQgdmFsdWVzID0gW107XG4gICAgZm9yKCBsZXQgaT0wOyBpPG9wdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKG9wdGlvbnNbaV0uc2VsZWN0ZWQpIHZhbHVlcy5wdXNoKG9wdGlvbnNbaV0udmFsdWUpO1xuICAgIH1cbiAgICBuZXdTdGF0ZVtuYW1lXSA9IHZhbHVlcztcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIHJlbmRlck9wdGlvbihvYmpzLCBwcm9wMSwgcHJvcDIpIHtcbiAgICBpZighb2JqcykgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBjb25zdCBpdGVtcyA9IG9ianMubWFwKG9iaiA9PiB7XG4gICAgICByZXR1cm4gKGxlbiA9PT0gMilcbiAgICAgICAgPyBvYmpbcHJvcDFdWzBdXG4gICAgICAgIDogb2JqW3Byb3AxXVswXVtwcm9wMl1bMF07XG4gICAgfSlcbiAgICBjb25zdCBvcHRzID0gc3RkLmRzdChpdGVtcyk7XG4gICAgcmV0dXJuIG9wdHMubWFwKChvcHQsIGlkeCkgPT4ge1xuICAgICAgcmV0dXJuIDxvcHRpb25cbiAgICAgICAga2V5PXtcImNob2ljZS1cIiArIGlkeH0gdmFsdWU9e29wdH0gPntvcHR9PC9vcHRpb24+O1xuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgcGFnZSA9IHRoaXMucHJvcHMucGFnZTtcbiAgICBjb25zdCBvcHRQYXRocyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3ByaW1hcnlDYXRlZ29yeScsICdjYXRlZ29yeU5hbWUnKTtcbiAgICBjb25zdCBvcHRTZWxycyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NlbGxlckluZm8nLCAnc2VsbGVyVXNlck5hbWUnKTtcbiAgICBjb25zdCBvcHRJbUlEcyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ2l0ZW1JZCcpO1xuICAgIGNvbnN0IG9wdFNocGdzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2hpcHBpbmdJbmZvJywgJ3NoaXBUb0xvY2F0aW9ucycpO1xuICAgIGNvbnN0IG9wdFN0dHNzID0gdGhpcy5yZW5kZXJPcHRpb24odGhpcy5wcm9wcy5pdGVtc1xuICAgICAgLCAnc2VsbGluZ1N0YXR1cycsICdzZWxsaW5nU3RhdGUnKTtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lIHBhbmUtc20gc2lkZWJhclwiPlxuICAgIDxuYXYgY2xhc3NOYW1lPVwibmF2LWdyb3VwXCI+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+VGl0bGU8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBvZiBpdGVtc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VhcmNoU3RyaW5nfVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlVGV4dC5iaW5kKHRoaXMsICdzZWFyY2hTdHJpbmcnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+RW5kIHRpbWU8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZyb20gZGF0ZSAoeXl5eS9tbS9kZClcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnN0YXJ0RGF0ZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnc3RhcnREYXRlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiVG8gZGF0ZSAoeXl5eS9tbS9kZClcIlxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmVuZERhdGV9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2VuZERhdGUnKX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VSZXNldC5iaW5kKHRoaXMpfT5SZXNldFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW1pbmkgYnRuLXByaW1hcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2VhcmNoLmJpbmQodGhpcyl9PlNlYXJjaFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG5cdFx0XHQ8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+RnVuY3Rpb25zPC9oNT5cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VIb21lLmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24taG9tZVwiPjwvc3Bhbj5cblx0XHRcdFx0SG9tZSAoe3BhZ2V9IHBhZ2UpXG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSW5jcmVtZW50LmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tcmlnaHQtYm9sZFwiPjwvc3Bhbj5cblx0XHRcdFx0TmV4dFxuXHRcdFx0PC9zcGFuPlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURlY3JlbWVudC5iaW5kKHRoaXMpfT5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLWxlZnQtYm9sZFwiPjwvc3Bhbj5cblx0XHRcdFx0UHJldmlvdXNcblx0XHRcdDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5PdXRwdXQ8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIk51bWJlciBvZiBwYWdlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFnZXN9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3BhZ2VzJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFjdGlvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW1pbmkgYnRuLXByaW1hcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2F2ZS5iaW5kKHRoaXMpfT5TYXZlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5DYXRlZ29yeTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY2F0ZWdvcnlQYXRofVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2NhdGVnb3J5UGF0aCcpfVxuICAgICAgICA+e29wdFBhdGhzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNlbGxlcjwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsbGVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzZWxsZXInKX1cbiAgICAgICAgPntvcHRTZWxyc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5JdGVtSUQ8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLml0ZW1JZH1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdpdGVtSWQnKX1cbiAgICAgICAgPntvcHRJbUlEc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5QcmljZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSGlnaGVzdCBwcmljZVwiIFxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmhpZ2hlc3RQcmljZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnaGlnaGVzdFByaWNlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTG93ZXN0IHByaWNlXCIgXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubG93ZXN0UHJpY2V9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2xvd2VzdFByaWNlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNoaXBwaW5nPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zaGlwcGluZ31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzaGlwcGluZycpfVxuICAgICAgICA+e29wdFNocGdzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkNvbmRpdGlvbjwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY29uZGl0aW9ufVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2NvbmRpdGlvbicpfT5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTAwMFwiPk5ldzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxNTAwXCI+XG4gICAgICAgICAgICBOZXcgb3RoZXIgKHNlZSBkZXRhaWxzKTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxNzUwXCI+XG4gICAgICAgICAgICBOZXcgd2l0aCBkZWZlY3RzPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwMDBcIj5cbiAgICAgICAgICAgIE1hbnVmYWN0dXJlciByZWZ1cmJpc2hlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyNTAwXCI+XG4gICAgICAgICAgICBTZWxsZXIgcmVmdXJiaXNoZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMzAwMFwiPlVzZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDAwMFwiPlZlcnkgR29vZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1MDAwXCI+R29vZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI2MDAwXCI+QWNjZXB0YWJsZTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI3MDAwXCI+XG4gICAgICAgICAgICBGb3IgcGFydHMgb3Igbm90IHdvcmtpbmc8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U3RhdHVzPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdGF0dXN9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnc3RhdHVzJyl9XG4gICAgICAgICAgPntvcHRTdHRzc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25hdj5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5Ob3RlU2lkZWJhci5kaXNwbGF5TmFtZSA9IGBOb3RlU2lkZWJhcmA7XG5leHBvcnQgZGVmYXVsdCBOb3RlU2lkZWJhcjtcbiIsImltcG9ydCBSZWFjdCAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3N0ZHV0aWxzJztcbmltcG9ydCB7IGxvZywgdXRpbCB9ICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb3RlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXJTdGF0dXMoc3RhdHVzKSB7XG4gICAgbGV0IHN0eWxlcztcbiAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAnYmx1ZScgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlc30+Tm93IGF2YWlsYWJsZS48L2Rpdj47XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAnb3JhbmdlJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5OZXcgYWRkZWQuPC9kaXY+O1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHlsZXMgPSB7IGZvbnRXZWlnaHQ6J2JvbGQnLCBjb2xvcjogJ3JlZCcgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlc30+UmVtb3ZlZC48L2Rpdj47XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckV4dGVuc2lvbihkdXJhdGlvbikge1xuICAgIHJldHVybiA8ZGl2PiggeyB1dGlsLnRvTGVmdERheXMoZHVyYXRpb24pIH0gKTwvZGl2PjtcbiAgfVxuXG4gIHJlbmRlckl0ZW0ob2JqLCBpZHgpIHtcbiAgICBjb25zdCBpdGVtID0gb2JqO1xuICAgIGNvbnN0IEltZyA9IGl0ZW0uaGFzT3duUHJvcGVydHkoJ2dhbGxlcnlVUkwnKVxuICAgICAgPyBpdGVtLmdhbGxlcnlVUkxbMF0gOiAnJztcbiAgICBjb25zdCBBaWQgPSBpdGVtLml0ZW1JZFswXTtcbiAgICBjb25zdCBQaWQgPSBpdGVtLmhhc093blByb3BlcnR5KCdwcm9kdWN0SWQnKVxuICAgICAgPyBpdGVtLnByb2R1Y3RJZC5tYXAob2JqID0+XG4gICAgICAgIGAke29iai5fX3ZhbHVlX199ICggJHtvYmpbJ0B0eXBlJ119IClgKSA6IFsnLS0tJ107XG4gICAgY29uc3QgU2lkID0gaXRlbS5zZWxsZXJJbmZvWzBdLnNlbGxlclVzZXJOYW1lWzBdO1xuICAgIGNvbnN0IFN0bVxuICAgICAgPSBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoaXRlbS5saXN0aW5nSW5mb1swXS5zdGFydFRpbWVbMF0pO1xuICAgIGNvbnN0IEV0bVxuICAgICAgPSBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoaXRlbS5saXN0aW5nSW5mb1swXS5lbmRUaW1lWzBdKTtcbiAgICBjb25zdCBVcmwgPSBpdGVtLnZpZXdJdGVtVVJMWzBdO1xuICAgIGNvbnN0IFR0bCA9IGl0ZW0udGl0bGVbMF07XG4gICAgY29uc3QgUGMxID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAuY3VycmVudFByaWNlWzBdLl9fdmFsdWVfXztcbiAgICBjb25zdCBDaTEgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jdXJyZW50UHJpY2VbMF1bJ0BjdXJyZW5jeUlkJ107XG4gICAgY29uc3QgUGMyID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXztcbiAgICBjb25zdCBDaTIgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF1bJ0BjdXJyZW5jeUlkJ107XG4gICAgY29uc3QgQ2RuID0gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnY29uZGl0aW9uJykgXG4gICAgICA/IGl0ZW0uY29uZGl0aW9uWzBdLmNvbmRpdGlvbkRpc3BsYXlOYW1lWzBdIDogJy0tLSc7XG4gICAgY29uc3QgQ2dwID0gaXRlbS5wcmltYXJ5Q2F0ZWdvcnlbMF0uY2F0ZWdvcnlOYW1lWzBdO1xuICAgIGNvbnN0IFNocCA9IGl0ZW0uc2hpcHBpbmdJbmZvWzBdLnNoaXBUb0xvY2F0aW9uc1swXTtcbiAgICBjb25zdCBTdHQgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF0uc2VsbGluZ1N0YXRlWzBdO1xuICAgIGNvbnN0IEV4dCA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXS5oYXNPd25Qcm9wZXJ0eSgndGltZUxlZnQnKVxuICAgICAgPyB0aGlzLnJlbmRlckV4dGVuc2lvbihpdGVtLnNlbGxpbmdTdGF0dXNbMF0udGltZUxlZnRbMF0pXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IHN0dCA9IHRoaXMucmVuZGVyU3RhdHVzKDApO1xuICAgIGNvbnN0IFVwZCA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChEYXRlLm5vdygpKTtcblxuICAgIHJldHVybiA8dGJvZHkga2V5PXtpZHh9Pjx0cj5cbiAgICAgIDx0ZD48aW1nIHNyYz17SW1nfSB3aWR0aD0nMTI4JyBoZWlnaHQ9JzEyOCcgLz48L3RkPlxuICAgICAgPHRkPjxzcGFuPlxuICAgICAgICA8YSBocmVmPXtVcmx9IHRhcmdldD0nX2JsYW5rJz57VHRsfTwvYT48YnIgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgU2VsbCBwZXJpb2QgOiB7U3RtfSB+IHtFdG19PGJyIC8+XG4gICAgICAgIENvbmRpdGlvbiA6IHtDZG59PGJyIC8+XG4gICAgICAgIFNlbGxlciA6IHtTaWR9PGJyIC8+XG4gICAgICAgIEl0ZW1JRCA6IHtBaWR9PGJyIC8+XG4gICAgICAgIFByb2R1Y3RJRCA6IHtQaWQuam9pbignICcpfTxiciAvPlxuICAgICAgICBDYXRlZ29yeSA6IHtDZ3B9XG4gICAgICA8L3NwYW4+PC90ZD5cbiAgICAgIDx0ZD57U2hwfTwvdGQ+XG4gICAgICA8dGQ+XG4gICAgICAgIDxzcGFuPntQYzF9IHtDaTF9PC9zcGFuPjxiciAvPlxuICAgICAgICA8c3Bhbj4oIHtQYzJ9IHtDaTJ9ICk8L3NwYW4+XG4gICAgICA8L3RkPlxuICAgICAgPHRkPjxzcGFuPntTdHR9PC9zcGFuPjxiciAvPjxzcGFuPntFeHR9PC9zcGFuPjwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+e3N0dH08L3NwYW4+PGJyIC8+PHNwYW4+e1VwZH08L3NwYW4+PC90ZD5cbiAgICA8L3RyPjwvdGJvZHk+O1xuICB9XG5cbiAgZmlsdGVySXRlbXMob2Jqcywgb3B0aW9ucykge1xuICAgIHJldHVybiBvYmpzLmZpbHRlcihvYmogPT4geyBcbiAgICAgIGNvbnN0IGl0ZW0gPSBvYmo7XG4gICAgICBpZihvcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgaWYoIW9wdGlvbnMuc2hpcHBpbmcuc29tZShzaGlwcGluZyA9PlxuICAgICAgICAgICAgc2hpcHBpbmcgPT09IGl0ZW0uc2hpcHBpbmdJbmZvWzBdXG4gICAgICAgICAgICAuc2hpcFRvTG9jYXRpb25zWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuc2hpcHBpbmcubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuY29uZGl0aW9uLnNvbWUoY29uZGl0aW9uID0+IFxuICAgICAgICAgICAgY29uZGl0aW9uID09PSBpdGVtLmNvbmRpdGlvblswXVxuICAgICAgICAgICAgLmNvbmRpdGlvbklkWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuY29uZGl0aW9uLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLnN0YXR1cy5zb21lKHN0YXR1cyA9PlxuICAgICAgICAgICAgc3RhdHVzID09PSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgICAgICAgIC5zZWxsaW5nU3RhdGVbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zdGF0dXMubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuY2F0ZWdvcnlQYXRoLnNvbWUocGF0aCA9PlxuICAgICAgICAgICAgcGF0aCA9PT0gaXRlbS5wcmltYXJ5Q2F0ZWdvcnlbMF1cbiAgICAgICAgICAgIC5jYXRlZ29yeU5hbWVbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5jYXRlZ29yeVBhdGgubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuc2VsbGVyLnNvbWUoc2VsciA9PiBcbiAgICAgICAgICAgIHNlbHIgPT09IGl0ZW0uc2VsbGVySW5mb1swXVxuICAgICAgICAgICAgLnNlbGxlclVzZXJOYW1lWzBdKVxuICAgICAgICAgICYmIG9wdGlvbnMuc2VsbGVyLmxlbmd0aClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKCFvcHRpb25zLml0ZW1JZC5zb21lKGl0ZW1pZCA9PiBcbiAgICAgICAgICAgIGl0ZW1pZCA9PT0gaXRlbS5pdGVtSWRbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5pdGVtSWQubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIWlzRmluaXRlKG9wdGlvbnMubG93ZXN0UHJpY2UpIFxuICAgICAgICAgIHx8ICFpc0Zpbml0ZShvcHRpb25zLmhpZ2hlc3RQcmljZSkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZihOdW1iZXIob3B0aW9ucy5sb3dlc3RQcmljZSkgPiBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgICAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF0uX192YWx1ZV9fIFxuICAgICAgICAgICYmIG9wdGlvbnMubG93ZXN0UHJpY2UgIT09ICcnKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoTnVtYmVyKG9wdGlvbnMuaGlnaGVzdFByaWNlKSA8IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXS5fX3ZhbHVlX18gXG4gICAgICAgICAgJiYgb3B0aW9ucy5oaWdoZXN0UHJpY2UgIT09ICcnKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLnByb3BzLm9wdGlvbnM7XG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLnByb3BzLml0ZW1zXG4gICAgICA/IHRoaXMuZmlsdGVySXRlbXModGhpcy5wcm9wcy5pdGVtcywgb3B0aW9ucylcbiAgICAgICAgLm1hcCgoaXRlbSwgaWR4KSA9PiB0aGlzLnJlbmRlckl0ZW0oaXRlbSwgaWR4KSlcbiAgICAgIDogbnVsbDtcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwYW5lXCI+XG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGUtc3RyaXBlZFwiPlxuICAgICAgPHRoZWFkPjx0cj5cbiAgICAgIDx0aD5JbWFnZTwvdGg+XG4gICAgICA8dGg+RGV0YWlsPC90aD5cbiAgICAgIDx0aD5TaGlwcGluZzwvdGg+XG4gICAgICA8dGg+UHJpY2U8L3RoPlxuICAgICAgPHRoPlN0YXR1czwvdGg+XG4gICAgICA8dGg+VXBkYXRlPC90aD5cbiAgICAgIDwvdHI+PC90aGVhZD5cbiAgICAgIHtpdGVtc31cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+O1xuICB9XG59O1xuTm90ZVRhYmxlLmRpc3BsYXlOYW1lID0gYE5vdGVUYWJsZVZpZXdgO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2R1Y3RzU2lkZWJhciAgZnJvbSAnQ29tcG9uZW50cy9Qcm9kdWN0c1NpZGViYXIvUHJvZHVjdHNTaWRlYmFyJztcbmltcG9ydCBQcm9kdWN0c1RhYmxlICAgIGZyb20gJ0NvbXBvbmVudHMvUHJvZHVjdHNUYWJsZS9Qcm9kdWN0c1RhYmxlJztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYFByb2R1Y3RzQm9keVZpZXdgO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9kdWN0c0JvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZS1ncm91cFwiPlxuICAgICAgPFByb2R1Y3RzU2lkZWJhclxuICAgICAgICBwYWdlPXt0aGlzLnByb3BzLnBhZ2V9XG4gICAgICAgIGl0ZW1zPXt0aGlzLnByb3BzLml0ZW1zfVxuICAgICAgICBvcHRpb25zPXt0aGlzLnByb3BzLm9wdGlvbnN9IC8+XG4gICAgICA8UHJvZHVjdHNUYWJsZVxuICAgICAgICBpdGVtcz17dGhpcy5wcm9wcy5pdGVtc31cbiAgICAgICAgb3B0aW9ucz17dGhpcy5wcm9wcy5vcHRpb25zfSAvPlxuICAgIDwvZGl2PjtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb2R1Y3RzQWN0aW9uICAgICBmcm9tICdBY3Rpb25zL1Byb2R1Y3RzQWN0aW9uJztcbmltcG9ydCBSYWRpbyAgICAgICAgICAgICAgZnJvbSAnQ29tcG9uZW50cy9SYWRpby9SYWRpbyc7XG5pbXBvcnQgeyBsb2csIHNwbiwgdXRpbCB9IGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9zdGR1dGlscyc7XG5pbXBvcnQgaXBjICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9pcGN1dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RzU2lkZWJhciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wcy5vcHRpb25zKTtcbiAgfVxuXG4gIGNzdkhlYWRlcigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgJ0ltYWdlJzogICAgICAgICAgICAgICAgJydcbiAgICAgICwgJ1VybCc6ICAgICAgICAgICAgICAgICcnXG4gICAgICAsICdUaXRsZSc6ICAgICAgICAgICAgICAnJ1xuICAgICAgLCAnU3RhcnRUaW1lJzogICAgICAgICAgJydcbiAgICAgICwgJ0VuZFRpbWUnOiAgICAgICAgICAgICcnXG4gICAgICAsICdDb25kaXRpb24nOiAgICAgICAgICAnJ1xuICAgICAgLCAnU2VsbGVyJzogICAgICAgICAgICAgJydcbiAgICAgICwgJ0l0ZW1JRCc6ICAgICAgICAgICAgICcnXG4gICAgICAsICdQcm9kdWN0SUQoVVBDKSc6ICAgICAnJ1xuICAgICAgLCAnUHJvZHVjdElEKEVBTiknOiAgICAgJydcbiAgICAgICwgJ1Byb2R1Y3RJRChJU0JOKSc6ICAgICcnXG4gICAgICAsICdDYXRlZ29yeSc6ICAgICAgICAgICAnJ1xuICAgICAgLCAnU2hpcHBpbmcnOiAgICAgICAgICAgJydcbiAgICAgICwgJ0N1cnJlbnRQcmljZSc6ICAgICAgICcnXG4gICAgICAsICdDdXJyZW50Q3VycmVuY3knOiAgICAnJ1xuICAgICAgLCAnQ29udmVydGVkUHJpY2UnOiAgICAgJydcbiAgICAgICwgJ0NvbnZlcnRlZEN1cnJlbmN5JzogICcnXG4gICAgICAsICdTdGF0dXMnOiAgICAgICAgICAgICAnJ1xuICAgICAgLCAnTGVmdFRpbWUnOiAgICAgICAgICAgJydcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2F2ZSgpIHtcbiAgICBsb2cuaW5mbyhQcm9kdWN0c1NpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZUNoYW5nZVNhdmUnKTtcbiAgICBpZighTnVtYmVyKHRoaXMuc3RhdGUucGFnZXMpKSByZXR1cm4gaXBjLndpbi5zaG93RXJyb3JCb3goJ1BhZ2VzIGlzIG5vdCBhIG51bWJlciEnKTtcbiAgICBpcGMud2luLnNob3dTYXZlRGlhbG9nKChmaWxlbmFtZSkgPT4ge1xuICAgICAgaWYoIWZpbGVuYW1lKSByZXR1cm4gbG9nLmluZm8oUHJvZHVjdHNTaWRlYmFyLmRpc3BsYXlOYW1lLCAnUmVzcG9uc2UnLCAnRmlsZSBzYXZlIGNhbmNlbGVkIScpO1xuICAgICAgc3BuLnNwaW4oKTtcbiAgICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ2ZpbGVuYW1lJywgZmlsZW5hbWUpO1xuICAgICAgaXBjLnN5cy50b3VjaEZpbGUoZmlsZW5hbWUpXG4gICAgICAudGhlbigoKSA9PiBpcGMuc3lzLmFkZGJvbShmaWxlbmFtZSkpXG4gICAgICAudGhlbigoKSA9PiBpcGMuc3lzLnNhdmVGaWxlKGZpbGVuYW1lLCB1dGlsLmdldENTVkhlYWRlcih0aGlzLmNzdkhlYWRlcigpKSkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIFByb2R1Y3RzQWN0aW9uLndyaXRlUHJvZHVjdHNJdGVtcyh0aGlzLnN0YXRlKS5zdWJzY3JpYmUoXG4gICAgICAgICAgb2JqID0+IGlwYy5zeXMuc2F2ZUZpbGUoZmlsZW5hbWUsIG9iailcbiAgICAgICAgLCBlcnIgPT4ge1xuICAgICAgICAgICAgbG9nLmVycm9yKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgZXJyLm5hbWUsIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIGlwYy53aW4uc2hvd0Vycm9yQm94KGVycik7XG4gICAgICAgICAgICBzcG4uc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgLCAoKSA9PiB7XG4gICAgICAgICAgICBsb2cuaW5mbyhQcm9kdWN0c1NpZGViYXIuZGlzcGxheU5hbWUsICdSZXNwb25zZScsICdGaWxlIGhhcyBiZWVuIHNhdmVkIScpO1xuICAgICAgICAgICAgaXBjLndpbi5zaG93U2F2ZU1lc3NhZ2VCb3goKTtcbiAgICAgICAgICAgIHNwbi5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VIb21lKCkge1xuICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlSG9tZScpO1xuICAgIFByb2R1Y3RzQWN0aW9uLmluY3JlbWVudCh0aGlzLnByb3BzLm9wdGlvbnMsIDApO1xuICB9XG5cbiAgaGFuZGxlSW5jcmVtZW50KCkge1xuICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlSW5jcmVtZW50Jyk7XG4gICAgUHJvZHVjdHNBY3Rpb24uaW5jcmVtZW50KHRoaXMucHJvcHMub3B0aW9ucywgdGhpcy5wcm9wcy5wYWdlKTtcbiAgfVxuXG4gIGhhbmRsZURlY3JlbWVudCgpIHtcbiAgICBsb2cuaW5mbyhQcm9kdWN0c1NpZGViYXIuZGlzcGxheU5hbWUsICdSZXF1ZXN0JywgJ2hhbmRsZURlY3JlbWVudCcpO1xuICAgIFByb2R1Y3RzQWN0aW9uLmRlY3JlbWVudCh0aGlzLnByb3BzLm9wdGlvbnMsIHRoaXMucHJvcHMucGFnZSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VTZWFyY2goZSkge1xuICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlU2VhcmNoJyk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIFByb2R1Y3RzQWN0aW9uLmluY3JlbWVudCh0aGlzLnN0YXRlLCAwKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVJlc2V0KCkge1xuICAgIGxvZy5pbmZvKFByb2R1Y3RzU2lkZWJhci5kaXNwbGF5TmFtZSwgJ1JlcXVlc3QnLCAnaGFuZGxlQ2hhbmdlUmVzZXQnKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGhpZ2hlc3RQcmljZTogICAnJ1xuICAgICAgLCBsb3dlc3RQcmljZTogICcnXG4gICAgICAsIHNoaXBwaW5nOiAgICAgW11cbiAgICAgICwgY29uZGl0aW9uOiAgICBbXVxuICAgICAgLCBzdGF0dXM6ICAgICAgIFtdXG4gICAgICAsIGl0ZW1JZDogICAgICAgW11cbiAgICAgICwgY2F0ZWdvcnlQYXRoOiBbXVxuICAgICAgLCBzZWxsZXI6ICAgICAgIFtdXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDaGFuZ2VUZXh0KG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBuZXdTdGF0ZVtuYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlQ2hlY2tib3gobmFtZSwgZSkge1xuICAgIGxldCBuZXdTdGF0ZSA9IHt9O1xuICAgIG5ld1N0YXRlW25hbWVdID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZVJhZGlvKG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBuZXdTdGF0ZVtuYW1lXSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlU2VsZWN0KG5hbWUsIGUpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSB7fTtcbiAgICBsZXQgb3B0aW9ucyA9IGUudGFyZ2V0Lm9wdGlvbnM7XG4gICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgIGZvciggbGV0IGk9MDsgaTxvcHRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihvcHRpb25zW2ldLnNlbGVjdGVkKSB2YWx1ZXMucHVzaChvcHRpb25zW2ldLnZhbHVlKTtcbiAgICB9XG4gICAgbmV3U3RhdGVbbmFtZV0gPSB2YWx1ZXM7XG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH1cblxuICByZW5kZXJPcHRpb24ob2JqcywgcHJvcDEsIHByb3AyKSB7XG4gICAgaWYoIW9ianMpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgY29uc3QgaXRlbXMgPSBvYmpzLm1hcChvYmogPT4ge1xuICAgICAgcmV0dXJuIChsZW4gPT09IDIpXG4gICAgICAgID8gb2JqW3Byb3AxXVswXVxuICAgICAgICA6IG9ialtwcm9wMV1bMF1bcHJvcDJdWzBdO1xuICAgIH0pXG4gICAgY29uc3Qgb3B0cyA9IHN0ZC5kc3QoaXRlbXMpO1xuICAgIHJldHVybiBvcHRzLm1hcCgob3B0LCBpZHgpID0+IHtcbiAgICAgIHJldHVybiA8b3B0aW9uXG4gICAgICAgIGtleT17XCJjaG9pY2UtXCIgKyBpZHh9IHZhbHVlPXtvcHR9ID57b3B0fTwvb3B0aW9uPjtcbiAgICB9KVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2U7XG4gICAgY29uc3Qgb3B0UGF0aHMgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdwcmltYXJ5Q2F0ZWdvcnknLCAnY2F0ZWdvcnlOYW1lJyk7XG4gICAgY29uc3Qgb3B0U2VscnMgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdzZWxsZXJJbmZvJywgJ3NlbGxlclVzZXJOYW1lJyk7XG4gICAgY29uc3Qgb3B0SW1JRHMgPSB0aGlzLnJlbmRlck9wdGlvbih0aGlzLnByb3BzLml0ZW1zXG4gICAgICAsICdpdGVtSWQnKTtcbiAgICBjb25zdCBvcHRTaHBncyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NoaXBwaW5nSW5mbycsICdzaGlwVG9Mb2NhdGlvbnMnKTtcbiAgICBjb25zdCBvcHRTdHRzcyA9IHRoaXMucmVuZGVyT3B0aW9uKHRoaXMucHJvcHMuaXRlbXNcbiAgICAgICwgJ3NlbGxpbmdTdGF0dXMnLCAnc2VsbGluZ1N0YXRlJyk7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicGFuZSBwYW5lLXNtIHNpZGViYXJcIj5cbiAgICA8bmF2IGNsYXNzTmFtZT1cIm5hdi1ncm91cFwiPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlByb2R1Y3RJRDwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIG9mIGl0ZW1zXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcm9kdWN0SWR9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3Byb2R1Y3RJZCcpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5Qcm9kdWN0VHlwZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8UmFkaW8gbmFtZT1cInByb2R1Y3RUeXBlXCJcbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5wcm9kdWN0VHlwZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVJhZGlvLmJpbmQodGhpcywgJ3Byb2R1Y3RUeXBlJyl9ID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUmVmZXJlbmNlSURcIj5SZWZlcmVuY2VJRDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJJU0JOXCI+SVNCTjwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVUENcIj5VUEM8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRUFOXCI+RUFOPC9vcHRpb24+XG4gICAgICAgIDwvUmFkaW8+XG4gICAgICA8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tbWluaSBidG4tZGVmYXVsdFwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VSZXNldC5iaW5kKHRoaXMpfT5SZXNldFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW1pbmkgYnRuLXByaW1hcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2VhcmNoLmJpbmQodGhpcyl9PlNlYXJjaFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NwYW4+XG5cdFx0XHQ8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+RnVuY3Rpb25zPC9oNT5cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCJcbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDaGFuZ2VIb21lLmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24taG9tZVwiPjwvc3Bhbj5cblx0XHRcdFx0SG9tZSAoe3BhZ2V9IHBhZ2UpXG5cdFx0XHQ8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiXG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSW5jcmVtZW50LmJpbmQodGhpcyl9PlxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJpY29uIGljb24tcmlnaHQtYm9sZFwiPjwvc3Bhbj5cblx0XHRcdFx0TmV4dFxuXHRcdFx0PC9zcGFuPlxuXHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIlxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZURlY3JlbWVudC5iaW5kKHRoaXMpfT5cblx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwiaWNvbiBpY29uLWxlZnQtYm9sZFwiPjwvc3Bhbj5cblx0XHRcdFx0UHJldmlvdXNcblx0XHRcdDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5PdXRwdXQ8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIk51bWJlciBvZiBwYWdlc1wiXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUucGFnZXN9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ3BhZ2VzJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWFjdGlvbnNcIj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLW1pbmkgYnRuLXByaW1hcnlcIlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2hhbmdlU2F2ZS5iaW5kKHRoaXMpfT5TYXZlXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5DYXRlZ29yeTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY2F0ZWdvcnlQYXRofVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2NhdGVnb3J5UGF0aCcpfVxuICAgICAgICA+e29wdFBhdGhzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNlbGxlcjwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuc2VsbGVyfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzZWxsZXInKX1cbiAgICAgICAgPntvcHRTZWxyc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5JdGVtSUQ8L2g1PlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibmF2LWdyb3VwLWl0ZW1cIj5cbiAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIG11bHRpcGxlPXt0cnVlfVxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLml0ZW1JZH1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdpdGVtSWQnKX1cbiAgICAgICAgPntvcHRJbUlEc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxoNSBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtdGl0bGVcIj5QcmljZTwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSGlnaGVzdCBwcmljZVwiIFxuICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLmhpZ2hlc3RQcmljZX1cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVRleHQuYmluZCh0aGlzLCAnaGlnaGVzdFByaWNlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTG93ZXN0IHByaWNlXCIgXG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUubG93ZXN0UHJpY2V9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VUZXh0LmJpbmQodGhpcywgJ2xvd2VzdFByaWNlJyl9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPlNoaXBwaW5nPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zaGlwcGluZ31cbiAgICAgICAgICBvbkNoYW5nZT17XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZVNlbGVjdC5iaW5kKHRoaXMsICdzaGlwcGluZycpfVxuICAgICAgICA+e29wdFNocGdzfTwvc2VsZWN0PlxuICAgICAgPC9zcGFuPlxuICAgICAgPGg1IGNsYXNzTmFtZT1cIm5hdi1ncm91cC10aXRsZVwiPkNvbmRpdGlvbjwvaDU+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJuYXYtZ3JvdXAtaXRlbVwiPlxuICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgbXVsdGlwbGU9e3RydWV9XG4gICAgICAgICAgdmFsdWU9e3RoaXMuc3RhdGUuY29uZGl0aW9ufVxuICAgICAgICAgIG9uQ2hhbmdlPXtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlU2VsZWN0LmJpbmQodGhpcywgJ2NvbmRpdGlvbicpfT5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTAwMFwiPk5ldzwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxNTAwXCI+XG4gICAgICAgICAgICBOZXcgb3RoZXIgKHNlZSBkZXRhaWxzKTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxNzUwXCI+XG4gICAgICAgICAgICBOZXcgd2l0aCBkZWZlY3RzPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjIwMDBcIj5cbiAgICAgICAgICAgIE1hbnVmYWN0dXJlciByZWZ1cmJpc2hlZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyNTAwXCI+XG4gICAgICAgICAgICBTZWxsZXIgcmVmdXJiaXNoZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMzAwMFwiPlVzZWQ8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDAwMFwiPlZlcnkgR29vZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1MDAwXCI+R29vZDwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI2MDAwXCI+QWNjZXB0YWJsZTwvb3B0aW9uPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI3MDAwXCI+XG4gICAgICAgICAgICBGb3IgcGFydHMgb3Igbm90IHdvcmtpbmc8L29wdGlvbj5cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L3NwYW4+XG4gICAgICA8aDUgY2xhc3NOYW1lPVwibmF2LWdyb3VwLXRpdGxlXCI+U3RhdHVzPC9oNT5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm5hdi1ncm91cC1pdGVtXCI+XG4gICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICBtdWx0aXBsZT17dHJ1ZX1cbiAgICAgICAgICB2YWx1ZT17dGhpcy5zdGF0ZS5zdGF0dXN9XG4gICAgICAgICAgb25DaGFuZ2U9e1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVDaGFuZ2VTZWxlY3QuYmluZCh0aGlzLCAnc3RhdHVzJyl9XG4gICAgICAgICAgPntvcHRTdHRzc308L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICA8L25hdj5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5Qcm9kdWN0c1NpZGViYXIuZGlzcGxheU5hbWUgPSAnUHJvZHVjdHNTaWRlYmFyJztcbiIsImltcG9ydCBSZWFjdCAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3N0ZHV0aWxzJztcbmltcG9ydCB7IGxvZywgdXRpbCB9ICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBQcm9kdWN0c1RhYmxlVmlld2A7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2R1Y3RzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICByZW5kZXJTdGF0dXMoc3RhdHVzKSB7XG4gICAgbGV0IHN0eWxlcztcbiAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAnYmx1ZScgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlc30+Tm93IGF2YWlsYWJsZS48L2Rpdj47XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHN0eWxlcyA9IHsgZm9udFdlaWdodDonYm9sZCcsIGNvbG9yOiAnb3JhbmdlJyB9O1xuICAgICAgICByZXR1cm4gPGRpdiBzdHlsZT17c3R5bGVzfT5OZXcgYWRkZWQuPC9kaXY+O1xuICAgICAgY2FzZSAyOlxuICAgICAgICBzdHlsZXMgPSB7IGZvbnRXZWlnaHQ6J2JvbGQnLCBjb2xvcjogJ3JlZCcgfTtcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlc30+UmVtb3ZlZC48L2Rpdj47XG4gICAgfVxuICB9O1xuXG4gIHJlbmRlckV4dGVuc2lvbihkdXJhdGlvbikge1xuICAgIHJldHVybiA8ZGl2PiggeyB1dGlsLnRvTGVmdERheXMoZHVyYXRpb24pIH0gKTwvZGl2PjtcbiAgfVxuXG4gIHJlbmRlckl0ZW0ob2JqLCBpZHgpIHtcbiAgICBjb25zdCBpdGVtID0gb2JqO1xuICAgIGNvbnN0IEltZyA9IGl0ZW0uaGFzT3duUHJvcGVydHkoJ2dhbGxlcnlVUkwnKVxuICAgICAgPyBpdGVtLmdhbGxlcnlVUkxbMF0gOiAnJztcbiAgICBjb25zdCBBaWQgPSBpdGVtLml0ZW1JZFswXTtcbiAgICBjb25zdCBQaWQgPSBpdGVtLmhhc093blByb3BlcnR5KCdwcm9kdWN0SWQnKVxuICAgICAgPyBpdGVtLnByb2R1Y3RJZC5tYXAob2JqID0+XG4gICAgICAgIGAke29iai5fX3ZhbHVlX199ICggJHtvYmpbJ0B0eXBlJ119IClgKSA6IFsnLS0tJ107XG4gICAgY29uc3QgU2lkID0gaXRlbS5zZWxsZXJJbmZvWzBdLnNlbGxlclVzZXJOYW1lWzBdO1xuICAgIGNvbnN0IFN0bVxuICAgICAgPSBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoaXRlbS5saXN0aW5nSW5mb1swXS5zdGFydFRpbWVbMF0pO1xuICAgIGNvbnN0IEV0bVxuICAgICAgPSBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoaXRlbS5saXN0aW5nSW5mb1swXS5lbmRUaW1lWzBdKTtcbiAgICBjb25zdCBVcmwgPSBpdGVtLnZpZXdJdGVtVVJMWzBdO1xuICAgIGNvbnN0IFR0bCA9IGl0ZW0udGl0bGVbMF07XG4gICAgY29uc3QgUGMxID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAuY3VycmVudFByaWNlWzBdLl9fdmFsdWVfXztcbiAgICBjb25zdCBDaTEgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jdXJyZW50UHJpY2VbMF1bJ0BjdXJyZW5jeUlkJ107XG4gICAgY29uc3QgUGMyID0gaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXztcbiAgICBjb25zdCBDaTIgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF1cbiAgICAgIC5jb252ZXJ0ZWRDdXJyZW50UHJpY2VbMF1bJ0BjdXJyZW5jeUlkJ107XG4gICAgY29uc3QgQ2RuID0gaXRlbS5oYXNPd25Qcm9wZXJ0eSgnY29uZGl0aW9uJykgXG4gICAgICA/IGl0ZW0uY29uZGl0aW9uWzBdLmNvbmRpdGlvbkRpc3BsYXlOYW1lWzBdIDogJy0tLSc7XG4gICAgY29uc3QgQ2dwID0gaXRlbS5wcmltYXJ5Q2F0ZWdvcnlbMF0uY2F0ZWdvcnlOYW1lWzBdO1xuICAgIGNvbnN0IFNocCA9IGl0ZW0uc2hpcHBpbmdJbmZvWzBdLnNoaXBUb0xvY2F0aW9uc1swXTtcbiAgICBjb25zdCBTdHQgPSBpdGVtLnNlbGxpbmdTdGF0dXNbMF0uc2VsbGluZ1N0YXRlWzBdO1xuICAgIGNvbnN0IEV4dCA9IGl0ZW0uc2VsbGluZ1N0YXR1c1swXS5oYXNPd25Qcm9wZXJ0eSgndGltZUxlZnQnKVxuICAgICAgPyB0aGlzLnJlbmRlckV4dGVuc2lvbihpdGVtLnNlbGxpbmdTdGF0dXNbMF0udGltZUxlZnRbMF0pXG4gICAgICA6ICcnO1xuICAgIGNvbnN0IHN0dCA9IHRoaXMucmVuZGVyU3RhdHVzKDApO1xuICAgIGNvbnN0IFVwZCA9IHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChEYXRlLm5vdygpKTtcblxuICAgIHJldHVybiA8dGJvZHkga2V5PXtpZHh9Pjx0cj5cbiAgICAgIDx0ZD48aW1nIHNyYz17SW1nfSB3aWR0aD0nMTI4JyBoZWlnaHQ9JzEyOCcgLz48L3RkPlxuICAgICAgPHRkPjxzcGFuPlxuICAgICAgICA8YSBocmVmPXtVcmx9IHRhcmdldD0nX2JsYW5rJz57VHRsfTwvYT48YnIgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgU2VsbCBwZXJpb2QgOiB7U3RtfSB+IHtFdG19PGJyIC8+XG4gICAgICAgIENvbmRpdGlvbiA6IHtDZG59PGJyIC8+XG4gICAgICAgIFNlbGxlciA6IHtTaWR9PGJyIC8+XG4gICAgICAgIEl0ZW1JRCA6IHtBaWR9PGJyIC8+XG4gICAgICAgIFByb2R1Y3RJRCA6IHtQaWQuam9pbignICcpfTxiciAvPlxuICAgICAgICBDYXRlZ29yeSA6IHtDZ3B9XG4gICAgICA8L3NwYW4+PC90ZD5cbiAgICAgIDx0ZD57U2hwfTwvdGQ+XG4gICAgICA8dGQ+XG4gICAgICAgIDxzcGFuPntQYzF9IHtDaTF9PC9zcGFuPjxiciAvPlxuICAgICAgICA8c3Bhbj4oIHtQYzJ9IHtDaTJ9ICk8L3NwYW4+XG4gICAgICA8L3RkPlxuICAgICAgPHRkPjxzcGFuPntTdHR9PC9zcGFuPjxiciAvPjxzcGFuPntFeHR9PC9zcGFuPjwvdGQ+XG4gICAgICA8dGQ+PHNwYW4+e3N0dH08L3NwYW4+PGJyIC8+PHNwYW4+e1VwZH08L3NwYW4+PC90ZD5cbiAgICA8L3RyPjwvdGJvZHk+O1xuICB9XG5cbiAgZmlsdGVySXRlbXMob2Jqcywgb3B0aW9ucykge1xuICAgIGxvZy50cmFjZShgJHtwc3BpZH0+YCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIG9ianMuZmlsdGVyKG9iaiA9PiB7IFxuICAgICAgY29uc3QgaXRlbSA9IG9iajtcbiAgICAgIGlmKG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBpZighb3B0aW9ucy5zaGlwcGluZy5zb21lKHNoaXBwaW5nID0+XG4gICAgICAgICAgICBzaGlwcGluZyA9PT0gaXRlbS5zaGlwcGluZ0luZm9bMF1cbiAgICAgICAgICAgIC5zaGlwVG9Mb2NhdGlvbnNbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zaGlwcGluZy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5jb25kaXRpb24uc29tZShjb25kaXRpb24gPT4gXG4gICAgICAgICAgICBjb25kaXRpb24gPT09IGl0ZW0uY29uZGl0aW9uWzBdXG4gICAgICAgICAgICAuY29uZGl0aW9uSWRbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5jb25kaXRpb24ubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuc3RhdHVzLnNvbWUoc3RhdHVzID0+XG4gICAgICAgICAgICBzdGF0dXMgPT09IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLnNlbGxpbmdTdGF0ZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLnN0YXR1cy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5jYXRlZ29yeVBhdGguc29tZShwYXRoID0+XG4gICAgICAgICAgICBwYXRoID09PSBpdGVtLnByaW1hcnlDYXRlZ29yeVswXVxuICAgICAgICAgICAgLmNhdGVnb3J5TmFtZVswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLmNhdGVnb3J5UGF0aC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighb3B0aW9ucy5zZWxsZXIuc29tZShzZWxyID0+IFxuICAgICAgICAgICAgc2VsciA9PT0gaXRlbS5zZWxsZXJJbmZvWzBdXG4gICAgICAgICAgICAuc2VsbGVyVXNlck5hbWVbMF0pXG4gICAgICAgICAgJiYgb3B0aW9ucy5zZWxsZXIubGVuZ3RoKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYoIW9wdGlvbnMuaXRlbUlkLnNvbWUoaXRlbWlkID0+IFxuICAgICAgICAgICAgaXRlbWlkID09PSBpdGVtLml0ZW1JZFswXSlcbiAgICAgICAgICAmJiBvcHRpb25zLml0ZW1JZC5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZighaXNGaW5pdGUob3B0aW9ucy5sb3dlc3RQcmljZSkgXG4gICAgICAgICAgfHwgIWlzRmluaXRlKG9wdGlvbnMuaGlnaGVzdFByaWNlKSlcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmKE51bWJlcihvcHRpb25zLmxvd2VzdFByaWNlKSA+IGl0ZW0uc2VsbGluZ1N0YXR1c1swXVxuICAgICAgICAgICAgLmNvbnZlcnRlZEN1cnJlbnRQcmljZVswXS5fX3ZhbHVlX18gXG4gICAgICAgICAgJiYgb3B0aW9ucy5sb3dlc3RQcmljZSAhPT0gJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZihOdW1iZXIob3B0aW9ucy5oaWdoZXN0UHJpY2UpIDwgaXRlbS5zZWxsaW5nU3RhdHVzWzBdXG4gICAgICAgICAgICAuY29udmVydGVkQ3VycmVudFByaWNlWzBdLl9fdmFsdWVfXyBcbiAgICAgICAgICAmJiBvcHRpb25zLmhpZ2hlc3RQcmljZSAhPT0gJycpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMucHJvcHMub3B0aW9ucztcbiAgICBjb25zdCBpdGVtcyA9IHRoaXMucHJvcHMuaXRlbXNcbiAgICAgID8gdGhpcy5maWx0ZXJJdGVtcyh0aGlzLnByb3BzLml0ZW1zLCBvcHRpb25zKVxuICAgICAgICAubWFwKChpdGVtLCBpZHgpID0+IHRoaXMucmVuZGVySXRlbShpdGVtLCBpZHgpKVxuICAgICAgOiBudWxsO1xuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInBhbmVcIj5cbiAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0YWJsZS1zdHJpcGVkXCI+XG4gICAgICA8dGhlYWQ+PHRyPlxuICAgICAgPHRoPkltYWdlPC90aD5cbiAgICAgIDx0aD5EZXRhaWw8L3RoPlxuICAgICAgPHRoPlNoaXBwaW5nPC90aD5cbiAgICAgIDx0aD5QcmljZTwvdGg+XG4gICAgICA8dGg+U3RhdHVzPC90aD5cbiAgICAgIDx0aD5VcGRhdGU8L3RoPlxuICAgICAgPC90cj48L3RoZWFkPlxuICAgICAge2l0ZW1zfVxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj47XG4gIH1cbn07XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJhZGlvIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHZhbHVlOiBwcm9wcy5kZWZhdWx0VmFsdWVcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgaWYodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZShldmVudCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdmFsdWU6IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZSB8fCB0aGlzLnN0YXRlLnZhbHVlO1xuICAgIGxldCBjaGlsZHJlbiA9IFJlYWN0LkNoaWxkcmVuLm1hcCh0aGlzLnByb3BzLmNoaWxkcmVuXG4gICAgLCBmdW5jdGlvbihjaGlsZCwgaSkge1xuICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicmFkaW9cIj5cbiAgICAgICAgPGxhYmVsPjxpbnB1dCB0eXBlPVwicmFkaW9cIlxuICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICB2YWx1ZT17Y2hpbGQucHJvcHMudmFsdWV9XG4gICAgICAgICAgY2hlY2tlZD17Y2hpbGQucHJvcHMudmFsdWUgPT09IHZhbHVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpfSAvPlxuICAgICAgICB7Y2hpbGQucHJvcHMuY2hpbGRyZW59PC9sYWJlbD5cbiAgICAgIDwvZGl2PjtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHJldHVybiA8c3Bhbj57Y2hpbGRyZW59PC9zcGFuPjtcbiAgfVxufTtcbiIsImltcG9ydCBSZWFjdCAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCBBcHBBY3Rpb24gIGZyb20gJ0FjdGlvbnMvQXBwQWN0aW9uJztcbmltcG9ydCB7IGxvZyB9ICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYFRhYnNWaWV3YDtcblxuY2xhc3MgVGFicyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIEFwcEFjdGlvbi5zZWxlY3RlZENvbnRlbnQoMCwgdGhpcy5wcm9wcy5jaGlsZHJlblswXS5wcm9wcy5sYWJlbCk7XG4gIH1cblxuICBoYW5kbGVDbGlja1RhYihpbmRleCwgdGl0bGUsIGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBBcHBBY3Rpb24uc2VsZWN0ZWRDb250ZW50KGluZGV4LCB0aXRsZSk7XG4gIH1cblxuICByZW5kZXJUaXRsZXMoY2hpbGQsIGluZGV4KSB7XG4gICAgY29uc3Qgc2VsZWN0ZWQgPSB0aGlzLnByb3BzLnNlbGVjdGVkID09PSBpbmRleCA/ICdhY3RpdmUnIDogJyc7XG4gICAgY29uc3QgY2xhc3NOYW1lcyA9IFsndGFiLWl0ZW0nXTtcbiAgICBjbGFzc05hbWVzLnB1c2goc2VsZWN0ZWQpO1xuICAgIHJldHVybiA8ZGl2IGtleT17aW5kZXh9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMuam9pbignICcpfVxuICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja1RhYi5iaW5kKHRoaXMsIGluZGV4LCBjaGlsZC5wcm9wcy5sYWJlbCl9XG4gICAgPntjaGlsZC5wcm9wcy5sYWJlbH08L2Rpdj47XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgdGl0bGVzID0gdGhpcy5wcm9wcy5jaGlsZHJlbi5tYXAodGhpcy5yZW5kZXJUaXRsZXMuYmluZCh0aGlzKSk7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGFiLWdyb3VwXCI+e3RpdGxlc308L2Rpdj47XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFRhYnM7XG4iLCJpbXBvcnQgeyBEaXNwYXRjaGVyIH0gZnJvbSAnZmx1eCc7XG5cbmNvbnN0IGRpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwYXRjaGVyO1xuZXhwb3J0IGNvbnN0IGRpc3BhdGNoID0gZGlzcGF0Y2hlci5kaXNwYXRjaC5iaW5kKGRpc3BhdGNoZXIpO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBBcHAgICAgICAgIGZyb20gJ1BhZ2VzL0FwcC9BcHAnO1xuIFxuY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpO1xuY29uc3QgcmVuZGVyUm9vdCA9ICgpID0+IHtcbiAgcmVuZGVyKDxBcHAgLz4sIHJvb3RFbCk7XG59O1xuXG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgnLi9wYWdlcy9BcHAvQXBwLmpzJywgKCkgPT4ge1xuICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICByZW5kZXJSb290KCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxucmVuZGVyUm9vdCgpO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzICAgICAgICAgIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gICAgICBmcm9tICdmbHV4L3V0aWxzJztcbmltcG9ydCBDb250YWluZXJDb252ZXJ0ZXIgZnJvbSAnTWFpbi9GbHV4Q29udGFpbmVyQ29udmVydGVyJztcbmltcG9ydCBhcHBTdG9yZSAgICAgICAgICAgZnJvbSAnU3RvcmVzL2FwcFN0b3JlJztcbmltcG9ydCBBcHBBY3Rpb24gICAgICAgICAgZnJvbSAnQWN0aW9ucy9BcHBBY3Rpb24nO1xuaW1wb3J0IEFwcEJvZHkgICAgICAgICAgICBmcm9tICdDb21wb25lbnRzL0FwcEJvZHkvQXBwQm9keSc7XG5pbXBvcnQgTm90ZSAgICAgICAgICAgICAgIGZyb20gJ1BhZ2VzL05vdGUvTm90ZSc7XG5pbXBvcnQgQ29tcGxldGUgICAgICAgICAgIGZyb20gJ1BhZ2VzL0NvbXBsZXRlL0NvbXBsZXRlJztcbmltcG9ydCBQcm9kdWN0cyAgICAgICAgICAgZnJvbSAnUGFnZXMvUHJvZHVjdHMvUHJvZHVjdHMnO1xuaW1wb3J0IFRhYnMgICAgICAgICAgICAgICBmcm9tICdDb21wb25lbnRzL1RhYnMvVGFicyc7XG5pbXBvcnQgQ29udGVudHMgICAgICAgICAgIGZyb20gJ0NvbXBvbmVudHMvQ29udGVudHMvQ29udGVudHMnO1xuaW1wb3J0IEdsb2JhbEhlYWRlciAgICAgICBmcm9tICdDb21wb25lbnRzL0dsb2JhbEhlYWRlci9HbG9iYWxIZWFkZXInO1xuaW1wb3J0IEdsb2JhbEZvb3RlciAgICAgICBmcm9tICdDb21wb25lbnRzL0dsb2JhbEZvb3Rlci9HbG9iYWxGb290ZXInO1xuaW1wb3J0IEVycm9yQm91bmRhcnkgICAgICBmcm9tICdDb21wb25lbnRzL0Vycm9yQm91bmRhcnkvRXJyb3JCb3VuZGFyeSc7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXRTdG9yZXMoKSB7XG4gICAgcmV0dXJuIFthcHBTdG9yZV07XG4gIH1cblxuICBzdGF0aWMgY2FsY3VsYXRlU3RhdGUoKSB7XG4gICAgcmV0dXJuIGFwcFN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBsb2cuaW5mbyhBcHAuZGlzcGxheU5hbWUsICdwcmVmZXRjaCcsICdjb25maWcnKTtcbiAgICByZXR1cm4gQXBwQWN0aW9uLmZldGNoQ29uZmlnKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy9sb2cuaW5mbyhBcHAuZGlzcGxheU5hbWUsICdTdGF0ZScsIHRoaXMuc3RhdGUpO1xuICAgIGNvbnN0IHsgdGl0bGUsIHNlbGVjdGVkLCBjb25maWcgfSA9IHRoaXMuc3RhdGU7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwid2luZG93XCI+XG4gICAgICAgIDxFcnJvckJvdW5kYXJ5PlxuICAgICAgICAgIDxHbG9iYWxIZWFkZXIgdGl0bGU9e3RpdGxlfSAvPlxuICAgICAgICAgIDxUYWJzIHNlbGVjdGVkPXtzZWxlY3RlZH0+XG4gICAgICAgICAgICA8c3BhbiBsYWJlbD1cIlNlYXJjaCBvZiBpdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGxhYmVsPVwiU2VhcmNoIG9mIENvbXBsZXRlZCBpdGVtc1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGxhYmVsPVwiU2VhcmNoIG9mIFByb2R1Y3QgSURzXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gbGFiZWw9XCJQcmVmZXJlbmNlXCI+PC9zcGFuPlxuICAgICAgICAgIDwvVGFicz5cbiAgICAgICAgICA8Q29udGVudHMgc2VsZWN0ZWQ9e3NlbGVjdGVkfT5cbiAgICAgICAgICAgIDxOb3RlIC8+XG4gICAgICAgICAgICA8Q29tcGxldGUgLz5cbiAgICAgICAgICAgIDxQcm9kdWN0cyAvPlxuICAgICAgICAgICAgPEFwcEJvZHkgY29uZmlnPXtjb25maWd9Lz5cbiAgICAgICAgICA8L0NvbnRlbnRzPlxuICAgICAgICAgIDxHbG9iYWxGb290ZXIgLz5cbiAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgPC9kaXY+XG4gICAgO1xuICB9XG59XG5BcHAuZGlzcGxheU5hbWUgPSAnQXBwQ29udHJvbGxlcic7XG5BcHAuZGVmYXVsdFByb3BzID0ge307XG5BcHAucHJvcFR5cGVzID0ge307XG5leHBvcnQgZGVmYXVsdCBDb250YWluZXIuY3JlYXRlKENvbnRhaW5lckNvbnZlcnRlci5jb252ZXJ0KEFwcCkpO1xuIiwiaW1wb3J0IFJlYWN0ICAgICAgICAgICAgICBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDb250YWluZXIgfSAgICAgIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IENvbnRhaW5lckNvbnZlcnRlciBmcm9tICdNYWluL0ZsdXhDb250YWluZXJDb252ZXJ0ZXInO1xuaW1wb3J0IGNvbXBsZXRlU3RvcmUgICAgICBmcm9tICdTdG9yZXMvY29tcGxldGVTdG9yZSc7XG5pbXBvcnQgQ29tcGxldGVCb2R5ICAgICAgIGZyb20gJ0NvbXBvbmVudHMvQ29tcGxldGVCb2R5L0NvbXBsZXRlQm9keSc7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IHBzcGlkID0gYENvbXBsZXRlQ29udHJvbGVyVmlld2A7XG5cbmNsYXNzIENvbXBsZXRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldFN0b3JlcygpIHtcbiAgICByZXR1cm4gW2NvbXBsZXRlU3RvcmVdO1xuICB9XG5cbiAgc3RhdGljIGNhbGN1bGF0ZVN0YXRlKCkge1xuICAgIHJldHVybiBjb21wbGV0ZVN0b3JlLmdldFN0YXRlKCk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIDxDb21wbGV0ZUJvZHlcbiAgICAgIHBhZ2U9e3RoaXMuc3RhdGUucGFnZX1cbiAgICAgIGl0ZW1zPXt0aGlzLnN0YXRlLml0ZW1zfVxuICAgICAgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfSAvPjtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyLmNyZWF0ZShDb250YWluZXJDb252ZXJ0ZXIuY29udmVydChDb21wbGV0ZSkpO1xuXG4iLCJpbXBvcnQgUmVhY3QgICAgICAgICAgICAgIGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbnRhaW5lciB9ICAgICAgZnJvbSAnZmx1eC91dGlscyc7XG5pbXBvcnQgQ29udGFpbmVyQ29udmVydGVyIGZyb20gJ01haW4vRmx1eENvbnRhaW5lckNvbnZlcnRlcic7XG5pbXBvcnQgbm90ZVN0b3JlICAgICAgICAgIGZyb20gJ1N0b3Jlcy9ub3RlU3RvcmUnO1xuaW1wb3J0IE5vdGVCb2R5ICAgICAgICAgICBmcm9tICdDb21wb25lbnRzL05vdGVCb2R5L05vdGVCb2R5JztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgICAgZnJvbSAnVXRpbGl0aWVzL3dlYnV0aWxzJztcblxuY29uc3QgcHNwaWQgPSBgTm90ZUNvbnRyb2xlclZpZXdgO1xuXG5jbGFzcyBOb3RlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGdldFN0b3JlcygpIHtcbiAgICByZXR1cm4gW25vdGVTdG9yZV07XG4gIH1cblxuICBzdGF0aWMgY2FsY3VsYXRlU3RhdGUoKSB7XG4gICAgcmV0dXJuIG5vdGVTdG9yZS5nZXRTdGF0ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8Tm90ZUJvZHlcbiAgICAgIHBhZ2U9e3RoaXMuc3RhdGUucGFnZX1cbiAgICAgIGl0ZW1zPXt0aGlzLnN0YXRlLml0ZW1zfVxuICAgICAgb3B0aW9ucz17dGhpcy5zdGF0ZS5vcHRpb25zfSAvPjtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ29udGFpbmVyLmNyZWF0ZShDb250YWluZXJDb252ZXJ0ZXIuY29udmVydChOb3RlKSk7XG5cbiIsImltcG9ydCBSZWFjdCAgICAgICAgICAgICAgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ29udGFpbmVyIH0gICAgICBmcm9tICdmbHV4L3V0aWxzJztcbmltcG9ydCBDb250YWluZXJDb252ZXJ0ZXIgZnJvbSAnTWFpbi9GbHV4Q29udGFpbmVyQ29udmVydGVyJztcbmltcG9ydCBwcm9kdWN0c1N0b3JlICAgICAgZnJvbSAnU3RvcmVzL3Byb2R1Y3RzU3RvcmUnO1xuaW1wb3J0IFByb2R1Y3RzQm9keSAgICAgICBmcm9tICdDb21wb25lbnRzL1Byb2R1Y3RzQm9keS9Qcm9kdWN0c0JvZHknO1xuaW1wb3J0IHsgbG9nIH0gICAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBwc3BpZCA9IGBQcm9kdWN0c0NvbnRyb2xlclZpZXdgO1xuXG5jbGFzcyBQcm9kdWN0cyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXRTdG9yZXMoKSB7XG4gICAgcmV0dXJuIFtwcm9kdWN0c1N0b3JlXTtcbiAgfVxuXG4gIHN0YXRpYyBjYWxjdWxhdGVTdGF0ZSgpIHtcbiAgICByZXR1cm4gcHJvZHVjdHNTdG9yZS5nZXRTdGF0ZSgpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8UHJvZHVjdHNCb2R5XG4gICAgICBwYWdlPXt0aGlzLnN0YXRlLnBhZ2V9XG4gICAgICBpdGVtcz17dGhpcy5zdGF0ZS5pdGVtc31cbiAgICAgIG9wdGlvbnM9e3RoaXMuc3RhdGUub3B0aW9uc30gLz47XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbnRhaW5lci5jcmVhdGUoQ29udGFpbmVyQ29udmVydGVyLmNvbnZlcnQoUHJvZHVjdHMpKTtcblxuIiwiaW1wb3J0ICogYXMgUiAgICAgICAgICAgICAgICAgICBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBmcm9tLCBmb3JrSm9pbiwgcGlwZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBmbGF0TWFwIH0gICAgICAgICBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBsb2csIHNwbiwgc3RvciB9ICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5pbXBvcnQgc3RkICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9zdGR1dGlscyc7XG5pbXBvcnQgaXBjICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy9pcGN1dGlscyc7XG5cbmxvZy5jb25maWcoJ2NvbnNvbGUnLCAnYmFzaWMnLCAnQUxMJywgJ2VsZWN0cm9uLXJlbmRlcmVyJyk7XG5zcG4uY29uZmlnKCdhcHAnKTtcblxuY29uc3QgZGlzcGxheU5hbWUgPSBgTm90ZUFwaUNsaWVudGA7XG5cbmxldCBlQmF5ID0gbmV3IE9iamVjdCgpO1xuZXhwb3J0IGRlZmF1bHQge1xuICByZXF1ZXN0KG9wZXJhdGlvbiwgb3B0aW9ucykge1xuICAgIGxvZy5pbmZvKGRpc3BsYXlOYW1lLCAncmVxdWVzdCcsIG9wZXJhdGlvbik7XG4gICAgc3dpdGNoKG9wZXJhdGlvbikge1xuICAgICAgY2FzZSAnY29uZmlnL2ZldGNoJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCBtZW1vcnkgPSB3aW5kb3cubG9jYWxTdG9yYWdlIFxuICAgICAgICAgICAgfHwgKHdpbmRvdy5Vc2VyRGF0YVN0b3JhZ2UgJiYgbmV3IHN0b3IuVXNlckRhdGFTdG9yYWdlKCkpIHx8IG5ldyBzdG9yLkNvb2tpZVN0b3JhZ2UoKTtcbiAgICAgICAgICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKG1lbW9yeS5nZXRJdGVtKFwiZUJheV9jb25maWdcIikpO1xuICAgICAgICAgIGVCYXkgPSBjb25maWcgPyBjb25maWcgOiB7fTtcbiAgICAgICAgICByZXNvbHZlKGVCYXkpO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2NvbmZpZy93cml0ZSc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgY29uc3QgbWVtb3J5ID0gd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgfHwgKHdpbmRvdy5Vc2VyRGF0YVN0b3JhZ2UgJiYgbmV3IHN0b3IuVXNlckRhdGFTdG9yYWdlKCkpIHx8IG5ldyBzdG9yLkNvb2tpZVN0b3JhZ2UoKTtcbiAgICAgICAgICBlQmF5ID0gb3B0aW9ucztcbiAgICAgICAgICBtZW1vcnkuc2V0SXRlbShcImVCYXlfY29uZmlnXCIsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcbiAgICAgICAgICByZXNvbHZlKG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2ZpbmRJdGVtc0J5S2V5d29yZHMnOlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIEpTT05QLnJlcXVlc3QoZUJheS5maW5kaW5nQXBpLCBvcHRpb25zLCBvYmogPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2ZpbmRDb21wbGV0ZWRJdGVtcyc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgSlNPTlAucmVxdWVzdChlQmF5LmZpbmRpbmdBcGksIG9wdGlvbnMsIG9iaiA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnZmluZEl0ZW1zQnlQcm9kdWN0JzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBKU09OUC5yZXF1ZXN0KGVCYXkuZmluZGluZ0FwaSwgb3B0aW9ucywgb2JqID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUob2JqKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICBjYXNlICdjbGllbnRfY3JlZGVudGlhbHMnOlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlwYy5mZXRjaC5vZihlQmF5Lm9hdXRoMkFwaSkucG9zdChvcHRpb25zLCAoZXJyLCBvYmopID0+IHtcbiAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2NvZGUnOlxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGlwYy5mZXRjaC5vZihlQmF5LmF1dGhvcml6ZUFwaSkuYXV0aChvcHRpb25zLCAoZXJyLCBvYmopID0+IHtcbiAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2F1dGhvcml6YXRpb25fY29kZSc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaXBjLmZldGNoLm9mKGVCYXkub2F1dGgyQXBpKS5wb3N0KG9wdGlvbnMsIChlcnIsIG9iaikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAncmVmcmVzaF90b2tlbic6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaXBjLmZldGNoLm9mKGVCYXkub2F1dGgyQXBpKS5wb3N0KG9wdGlvbnMsIChlcnIsIG9iaikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyKSByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgICByZXNvbHZlKG9iaik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgY2FzZSAnR2V0SXRlbSc6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgaXBjLmZldGNoLm9mKGVCYXkudHJhZGluZ0FwaSkucG9zdChvcHRpb25zLCAoZXJyLCBvYmopID0+IHtcbiAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGNhc2UgJ2ludmVudG9yeV9pdGVtJzpcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBpcGMuZmV0Y2gub2YoZUJheS5pbnZlbnRvcnlBcGkgKyAnLycgKyBvcGVyYXRpb24pLmdldChvcHRpb25zLCAoZXJyLCBvYmopID0+IHtcbiAgICAgICAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgcmVzb2x2ZShvYmopO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICBsb2cuZXJyb3IoZGlzcGxheU5hbWUsICdFcnJvcicsICdUaGlzIG9wZXJhdGlvbiBpcyB1bmtub3duLicpO1xuICAgICAgICAgIHJlc29sdmUob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICBnZXRDb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnY29uZmlnL2ZldGNoJyk7XG4gIH0sXG5cbiAgZ2V0SXRlbXMob3B0aW9ucywgcGFnZSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ2ZpbmRJdGVtc0J5S2V5d29yZHMnXG4gICAgICAsIHRoaXMub3B0SXRlbXMoeyBhcHBpZDogZUJheS5hcHBpZCwgcGFnZSwgb3BlcmF0aW9uOiAnZmluZEl0ZW1zQnlLZXl3b3JkcycgfSwgb3B0aW9ucykpO1xuICB9LFxuICBcbiAgZ2V0Q29tcGxldGVJdGVtcyhvcHRpb25zLCBwYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZmluZENvbXBsZXRlZEl0ZW1zJ1xuICAgICAgLCB0aGlzLm9wdEl0ZW1zKHsgYXBwaWQ6IGVCYXkuYXBwaWQsIHBhZ2UsIG9wZXJhdGlvbjogJ2ZpbmRDb21wbGV0ZWRJdGVtcycgfSwgb3B0aW9ucykpO1xuICB9LFxuICBcbiAgZ2V0UHJvZHVjdHNJdGVtcyhvcHRpb25zLCBwYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnZmluZEl0ZW1zQnlQcm9kdWN0J1xuICAgICAgLCB0aGlzLm9wdFByb2R1Y3RzKHsgYXBwaWQ6IGVCYXkuYXBwaWQsIHBhZ2UsIG9wZXJhdGlvbjogJ2ZpbmRJdGVtc0J5UHJvZHVjdCcgfSwgb3B0aW9ucykpO1xuICB9LFxuICBcbiAgZ2V0QXBwVG9rZW4oc2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdjbGllbnRfY3JlZGVudGlhbHMnLCB7IFxuICAgICAgYXBwaWQ6IGVCYXkuYXBwaWQsIGNlcnRpZDogZUJheS5jZXJ0aWQsIHJ1bmFtZTogZUJheS5ydW5hbWUsIHNjb3BlXG4gICAgLCBvcGVyYXRpb246ICdjbGllbnRfY3JlZGVudGlhbHMnLCB0eXBlOiAnTlYnIFxuICAgIH0pO1xuICB9LFxuXG4gIGdldENvZGUob3B0aW9ucywgc2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdjb2RlJ1xuICAgICAgLCB0aGlzLm9wdENvZGUoeyBhcHBpZDogZUJheS5hcHBpZCwgcnVuYW1lOiBlQmF5LnJ1bmFtZSwgb3BlcmF0aW9uOiAnY29kZScsIHNjb3BlIH0sIG9wdGlvbnMpKVxuICB9LFxuXG4gIGdldFVzZXJUb2tlbihjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnYXV0aG9yaXphdGlvbl9jb2RlJywgeyBcbiAgICAgIGFwcGlkOiBlQmF5LmFwcGlkLCBjZXJ0aWQ6IGVCYXkuY2VydGlkLCBydW5hbWU6IGVCYXkucnVuYW1lLCBjb2RlXG4gICAgLCBvcGVyYXRpb246ICdhdXRob3JpemF0aW9uX2NvZGUnLCB0eXBlOiAnTlYnIFxuICAgIH0pO1xuICB9LFxuXG4gIGdldFJlZnJlc2hUb2tlbihzY29wZSkge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3JlZnJlc2hfdG9rZW4nLCB7XG4gICAgICBhcHBpZDogZUJheS5hcHBpZCwgY2VydGlkOiBlQmF5LmNlcnRpZCwgdG9rZW46IGVCYXkudXNlcnRva2VuLnJlZnJlc2hfdG9rZW4sIHNjb3BlXG4gICAgLCBvcGVyYXRpb246ICdyZWZyZXNoX3Rva2VuJywgdHlwZTogJ05WJ1xuICAgIH0pO1xuICB9LFxuXG4gIGdldEl0ZW1EZXRhaWxzKG9wdGlvbnMsIGl0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR2V0SXRlbScsIHsgXG4gICAgICBhcHBpZDogZUJheS5hcHBpZCwgdG9rZW46IGVCYXkudG9rZW4sIGl0ZW1zLCBvcHRpb25zLCBvcGVyYXRpb246ICdHZXRJdGVtJywgdHlwZTogJ1hNTCcgXG4gICAgfSk7XG4gIH0sXG5cbiAgZ2V0SW52ZW50b3J5SXRlbXMob3B0aW9ucywgdG9rZW4pIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdpbnZlbnRvcnlfaXRlbScsIHsgXG4gICAgICBhcHBpZDogZUJheS5hcHBpZCwgdG9rZW4sIG9wdGlvbnMsIG9mZnNldDogMCwgb3BlcmF0aW9uOiAnaW52ZW50b3J5X2l0ZW0nLCB0eXBlOiAnSlNPTicgXG4gICAgfSk7XG4gIH0sXG4gIFxuICBwdXRDb25maWcoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnY29uZmlnL3dyaXRlJywgY29uZmlnKTtcbiAgfSxcblxuICBwdXRJdGVtcyhpdGVtcykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3dyaXRlSXRlbXNCeUtleXdvcmRzJywgaXRlbXMpO1xuICB9LFxuICBcbiAgcHV0Q29tcGxldGVJdGVtcyhpdGVtcykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ3dyaXRlQ29tcGxldGVkSXRlbXMnLCBpdGVtcyk7XG4gIH0sXG4gIFxuICBwdXRQcm9kdWN0c0l0ZW1zKGl0ZW1zKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnd3JpdGVJdGVtc0J5UHJvZHVjdCcsIGl0ZW1zKTtcbiAgfSxcbiAgXG4gIGZldGNoSXRlbXMob3B0aW9ucywgcGFnZSkge1xuICAgIHJldHVybiB0aGlzLmdldEl0ZW1zKG9wdGlvbnMsIHBhZ2UpXG4gICAgICAudGhlbih0aGlzLnJlc0l0ZW1zKVxuICAgICAgLnRoZW4odGhpcy5zZXRJdGVtcylcbiAgfSxcbiAgXG4gIGZldGNoQ29tcGxldGVJdGVtcyhvcHRpb25zLCBwYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q29tcGxldGVJdGVtcyhvcHRpb25zLCBwYWdlKVxuICAgICAgLnRoZW4odGhpcy5yZXNDb21wbGV0ZUl0ZW1zKVxuICAgICAgLnRoZW4odGhpcy5zZXRJdGVtcylcbiAgfSxcblxuICBmZXRjaFByb2R1Y3RzSXRlbXMob3B0aW9ucywgcGFnZSkge1xuICAgIHJldHVybiB0aGlzLmdldFByb2R1Y3RzSXRlbXMob3B0aW9ucywgcGFnZSlcbiAgICAgIC50aGVuKHRoaXMucmVzUHJvZHVjdHNJdGVtcylcbiAgICAgIC50aGVuKHRoaXMuc2V0SXRlbXMpXG4gIH0sXG4gIFxuICB3cml0ZUl0ZW1zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzdHJlYW1JdGVtcyAgID0gaWR4ICAgPT4gZnJvbSh0aGlzLmdldEl0ZW1zKG9wdGlvbnMsIGlkeCkpO1xuICAgIGNvbnN0IHN0cmVhbURldGFpbCAgPSBvYmpzICA9PiBmcm9tKHRoaXMuZ2V0SXRlbURldGFpbHMob3B0aW9ucywgb2JqcykpO1xuICAgIGNvbnN0IGZvcmtJdGVtcyAgICAgPSBvYmogICA9PiBmb3JrSm9pbih0aGlzLmZvckl0ZW1zKG9wdGlvbnMsIG9iaikpO1xuICAgIHJldHVybiBzdHJlYW1JdGVtcygxKS5waXBlKFxuICAgICAgICBtYXAodGhpcy5yZXNJdGVtcylcbiAgICAgICwgZmxhdE1hcChmb3JrSXRlbXMpXG4gICAgICAsIG1hcChSLm1hcCh0aGlzLnJlc0l0ZW1zLmJpbmQodGhpcykpKVxuICAgICAgLCBtYXAoUi5tYXAodGhpcy5zZXRJdGVtcy5iaW5kKHRoaXMpKSlcbiAgICAgICwgbWFwKFIuZmxhdHRlbilcbiAgICAgICwgZmxhdE1hcChzdHJlYW1EZXRhaWwpXG4gICAgICApO1xuICB9LFxuXG4gIHdyaXRlQ29tcGxldGVJdGVtcyhvcHRpb25zKSB7XG4gICAgY29uc3Qgc3RyZWFtSXRlbXMgICA9IGlkeCAgID0+IGZyb20odGhpcy5nZXRDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIGlkeCkpO1xuICAgIGNvbnN0IHN0cmVhbURldGFpbCAgPSBvYmpzICA9PiBmcm9tKHRoaXMuZ2V0SXRlbURldGFpbHMob3B0aW9ucywgb2JqcykpO1xuICAgIGNvbnN0IGZvcmtJdGVtcyAgICAgPSBvYmogICA9PiBmb3JrSm9pbih0aGlzLmZvckNvbXBsZXRlSXRlbXMob3B0aW9ucywgb2JqKSk7XG4gICAgcmV0dXJuIHN0cmVhbUl0ZW1zKDEpLnBpcGUoXG4gICAgICAgIG1hcCh0aGlzLnJlc0NvbXBsZXRlSXRlbXMpXG4gICAgICAsIGZsYXRNYXAoZm9ya0l0ZW1zKVxuICAgICAgLCBtYXAoUi5tYXAodGhpcy5yZXNDb21wbGV0ZUl0ZW1zLmJpbmQodGhpcykpKVxuICAgICAgLCBtYXAoUi5tYXAodGhpcy5zZXRJdGVtcy5iaW5kKHRoaXMpKSlcbiAgICAgICwgbWFwKFIuZmxhdHRlbilcbiAgICAgICwgZmxhdE1hcChzdHJlYW1EZXRhaWwpXG4gICAgICApO1xuICB9LFxuICBcbiAgd3JpdGVQcm9kdWN0c0l0ZW1zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzdHJlYW1JdGVtcyAgID0gaWR4ICAgPT4gZnJvbSh0aGlzLmdldFByb2R1Y3RzSXRlbXMob3B0aW9ucywgaWR4KSk7XG4gICAgY29uc3Qgc3RyZWFtRGV0YWlsICA9IG9ianMgID0+IGZyb20odGhpcy5nZXRJdGVtRGV0YWlscyhvcHRpb25zLCBvYmpzKSk7XG4gICAgY29uc3QgZm9ya0l0ZW1zICAgICA9IG9iaiAgID0+IGZvcmtKb2luKHRoaXMuZm9yUHJvZHVjdHNJdGVtcyhvcHRpb25zLCBvYmopKTtcbiAgICByZXR1cm4gc3RyZWFtSXRlbXMoMSkucGlwZShcbiAgICAgICAgbWFwKHRoaXMucmVzUHJvZHVjdHNJdGVtcylcbiAgICAgICwgZmxhdE1hcChmb3JrSXRlbXMpXG4gICAgICAsIG1hcChSLm1hcCh0aGlzLnJlc1Byb2R1Y3RzSXRlbXMuYmluZCh0aGlzKSkpXG4gICAgICAsIG1hcChSLm1hcCh0aGlzLnNldEl0ZW1zLmJpbmQodGhpcykpKVxuICAgICAgLCBtYXAoUi5mbGF0dGVuKVxuICAgICAgLCBmbGF0TWFwKHN0cmVhbURldGFpbClcbiAgICAgICk7XG4gIH0sXG4gIFxuICBmZXRjaEFwcFRva2VuKHN0YXRlLCBzY29wZSkge1xuICAgIGNvbnN0IHJlcXVlc3RUb2tlbiAgPSBvYmogPT4gZnJvbSh0aGlzLmdldEFwcFRva2VuKG9iaikpO1xuICAgIGNvbnN0IHNldFRva2VuICAgICAgPSBvYmogPT4gUi5tZXJnZShlQmF5LCB7IGFwcHRva2VuOiBvYmosIGFwcHN0YXRlOiBzdGF0ZSB9KTtcbiAgICBjb25zdCB3cml0ZUNvbmZpZyAgID0gb2JqID0+IGZyb20odGhpcy5wdXRDb25maWcob2JqKSk7XG4gICAgY29uc3QgZ2V0VG9rZW4gICAgICA9IG9iaiA9PiBvYmouYXBwdG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgIHJldHVybiByZXF1ZXN0VG9rZW4oc2NvcGUpLnBpcGUoXG4gICAgICAgIG1hcChzZXRUb2tlbilcbiAgICAgICwgZmxhdE1hcCh3cml0ZUNvbmZpZylcbiAgICAgICwgbWFwKGdldFRva2VuKVxuICAgICAgKTtcbiAgfSxcblxuICBmZXRjaFVzZXJUb2tlbihzdGF0ZSwgc2NvcGUpIHtcbiAgICBjb25zdCByZXF1ZXN0Q29kZSAgID0gb2JqID0+IGZyb20odGhpcy5nZXRDb2RlKHsgc3RhdGUgfSwgb2JqKSk7XG4gICAgY29uc3QgcmVxdWVzdFRva2VuICA9IG9iaiA9PiBmcm9tKHRoaXMuZ2V0VXNlclRva2VuKG9iai5hdXRoY29kZS5jb2RlKSk7XG4gICAgY29uc3QgY29udkNvZGUgICAgICA9IG9iaiA9PiBSLm1lcmdlKG9iaiwgeyBjb2RlOiBkZWNvZGVVUklDb21wb25lbnQob2JqLmNvZGUpIH0pO1xuICAgIGNvbnN0IHNldENvZGUgICAgICAgPSBvYmogPT4gUi5tZXJnZShlQmF5LCB7IGF1dGhjb2RlOiBjb252Q29kZShvYmopIH0pO1xuICAgIGNvbnN0IHNldFRva2VuICAgICAgPSBvYmogPT4gUi5tZXJnZShlQmF5LCB7IHVzZXJ0b2tlbjogb2JqLCB1c2Vyc3RhdGU6IHN0YXRlLCByZWZyZXNoc3RhdGU6IHN0YXRlIH0pO1xuICAgIGNvbnN0IHdyaXRlQ29uZmlnICAgPSBvYmogPT4gZnJvbSh0aGlzLnB1dENvbmZpZyhvYmopKTtcbiAgICBjb25zdCBnZXRUb2tlbiAgICAgID0gb2JqID0+IG9iai51c2VydG9rZW4uYWNjZXNzX3Rva2VuO1xuICAgIHJldHVybiByZXF1ZXN0Q29kZShzY29wZSkucGlwZShcbiAgICAgICAgbWFwKHNldENvZGUpXG4gICAgICAsIGZsYXRNYXAod3JpdGVDb25maWcpXG4gICAgICAsIGZsYXRNYXAocmVxdWVzdFRva2VuKVxuICAgICAgLCBtYXAoc2V0VG9rZW4pXG4gICAgICAsIGZsYXRNYXAod3JpdGVDb25maWcpXG4gICAgICAsIG1hcChnZXRUb2tlbilcbiAgICAgICk7XG4gIH0sXG5cbiAgZmV0Y2hSZWZyZXNoVG9rZW4oc3RhdGUsIHNjb3BlKSB7XG4gICAgY29uc3QgcmVxdWVzdFRva2VuICA9IG9iaiA9PiBmcm9tKHRoaXMuZ2V0UmVmcmVzaFRva2VuKG9iaikpO1xuICAgIGNvbnN0IHNldFRva2VuICAgICAgPSBvYmogPT4gUi5tZXJnZShlQmF5LCB7IHVzZXJ0b2tlbjogUi5tZXJnZShlQmF5LnVzZXJ0b2tlbiwgb2JqKSwgdXNlcnN0YXRlOiBzdGF0ZSB9KTtcbiAgICBjb25zdCB3cml0ZUNvbmZpZyAgID0gb2JqID0+IGZyb20odGhpcy5wdXRDb25maWcob2JqKSk7XG4gICAgY29uc3QgZ2V0VG9rZW4gICAgICA9IG9iaiA9PiBvYmoudXNlcnRva2VuLmFjY2Vzc190b2tlbjtcbiAgICByZXR1cm4gcmVxdWVzdFRva2VuKHNjb3BlKS5waXBlKFxuICAgICAgICBtYXAoc2V0VG9rZW4pXG4gICAgICAsIGZsYXRNYXAod3JpdGVDb25maWcpXG4gICAgICAsIG1hcChnZXRUb2tlbilcbiAgICAgICk7XG4gIH0sXG5cbiAgZmV0Y2hUb2tlbihzY29wZSkge1xuICAgIGNvbnN0IHN0YXRlICAgICAgICAgICA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZHVVc3JUb2tlbiAgICAgID0gZUJheS51c2VydG9rZW4uZXhwaXJlc19pbiAqIDEwMDAgKyBlQmF5LnVzZXJzdGF0ZTtcbiAgICBjb25zdCBkdVJlZlRva2VuICAgICAgPSBlQmF5LnVzZXJ0b2tlbi5yZWZyZXNoX3Rva2VuX2V4cGlyZXNfaW4gKiAxMDAwICsgZUJheS5yZWZyZXNoc3RhdGU7XG4gICAgY29uc3QgaXNVc3JUb2tlbiAgICAgID0gISFlQmF5LnVzZXJ0b2tlbi5hY2Nlc3NfdG9rZW47XG4gICAgY29uc3QgaXNSZWZUb2tlbiAgICAgID0gISFlQmF5LnVzZXJ0b2tlbi5yZWZyZXNoX3Rva2VuO1xuICAgIGNvbnN0IGlzVXNyQXZhaWxhYmxlICA9IGR1VXNyVG9rZW4gLSBzdGF0ZSA+IDA7XG4gICAgY29uc3QgaXNSZWZBdmFpbGFibGUgID0gZHVSZWZUb2tlbiAtIHN0YXRlID4gMDtcbiAgICBsb2cuaW5mbyhkaXNwbGF5TmFtZSwgJ1VzZXIgVG9rZW4gKGV4aXN0ZW5jZS92YWxpZGl0eS9kdXJhdGlvbi9tb2RpZmllZCk6J1xuICAgICAgLCBpc1VzclRva2VuLCBpc1VzckF2YWlsYWJsZVxuICAgICAgLCBzdGQuZ2V0TG9jYWxUaW1lU3RhbXAoZHVVc3JUb2tlbiksIHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChlQmF5LnVzZXJzdGF0ZSkpO1xuICAgIGxvZy5pbmZvKGRpc3BsYXlOYW1lLCAnUmVmcmVzaCBUb2tlbiAoZXhpc3RlbmNlL3ZhbGlkaXR5L2R1cmF0aW9uL21vZGlmaWVkKTonXG4gICAgICAsIGlzUmVmVG9rZW4sIGlzUmVmQXZhaWxhYmxlXG4gICAgICAsIHN0ZC5nZXRMb2NhbFRpbWVTdGFtcChkdVJlZlRva2VuKSwgc3RkLmdldExvY2FsVGltZVN0YW1wKGVCYXkucmVmcmVzaHN0YXRlKSk7XG4gICAgcmV0dXJuICFpc1VzclRva2VuICYmIGlzUmVmVG9rZW4gXG4gICAgICA/IGlzVXNyQXZhaWxhYmxlXG4gICAgICAgID8gZnJvbShbIGVCYXkudXNlcnRva2VuLmFjY2Vzc190b2tlbiBdKVxuICAgICAgICA6IGlzUmVmQXZhaWxhYmxlXG4gICAgICAgICAgPyB0aGlzLmZldGNoUmVmcmVzaFRva2VuKHN0YXRlLCBzY29wZSkgXG4gICAgICAgICAgOiB0aGlzLmZldGNoVXNlclRva2VuKHN0YXRlLCBzY29wZSlcbiAgICAgIDogdGhpcy5mZXRjaFVzZXJUb2tlbihzdGF0ZSwgc2NvcGUpXG4gICAgOyBcbiAgfSxcblxuICB3cml0ZUludmVudG9yeUl0ZW1zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBzY29wZSA9IFsgXG4gICAgICAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlJ1xuICAgICwgJ2h0dHBzOi8vYXBpLmViYXkuY29tL29hdXRoL2FwaV9zY29wZS9zZWxsLm1hcmtldGluZy5yZWFkb25seSdcbiAgICAsICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUvc2VsbC5tYXJrZXRpbmcnXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwuaW52ZW50b3J5LnJlYWRvbmx5J1xuICAgICwgJ2h0dHBzOi8vYXBpLmViYXkuY29tL29hdXRoL2FwaV9zY29wZS9zZWxsLmludmVudG9yeSdcbiAgICAsICdodHRwczovL2FwaS5lYmF5LmNvbS9vYXV0aC9hcGlfc2NvcGUvc2VsbC5hY2NvdW50LnJlYWRvbmx5J1xuICAgICwgJ2h0dHBzOi8vYXBpLmViYXkuY29tL29hdXRoL2FwaV9zY29wZS9zZWxsLmFjY291bnQnXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwuZnVsZmlsbG1lbnQucmVhZG9ubHknXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwuZnVsZmlsbG1lbnQnXG4gICAgLCAnaHR0cHM6Ly9hcGkuZWJheS5jb20vb2F1dGgvYXBpX3Njb3BlL3NlbGwuYW5hbHl0aWNzLnJlYWRvbmx5J1xuICAgIF07XG4gICAgY29uc3Qgc3RyZWFtSXRlbXMgICA9IG9iaiA9PiBmcm9tKHRoaXMuZ2V0SW52ZW50b3J5SXRlbXMob3B0aW9ucywgb2JqKSk7XG4gIC8vICBjb25zdCBzdHJlYW1EZXRhaWwgID0gb2JqcyAgPT4gZnJvbSh0aGlzLmdldEl0ZW1EZXRhaWxzKG9ianMpKTtcbiAgLy8gIGNvbnN0IGZvcmtJdGVtcyAgICAgPSBvYmogICA9PiBmb3JrSm9pbih0aGlzLmZvckludmVudG9yeUl0ZW1zKG9wdGlvbnMsIG9iaikpO1xuICAvLyAgY29uc3QgZm9ya0pTT04gICAgICA9IG9iaiAgID0+IGZvcmtKb2luKHV0aWwudG9KU09OKG9iaikpO1xuICAgIHJldHVybiB0aGlzLmZldGNoVG9rZW4oc2NvcGUpLnBpcGUoXG4gICAgICAgIGZsYXRNYXAoc3RyZWFtSXRlbXMpXG4gICAgICAsIG1hcChSLnRhcCh0aGlzLmxvZ1RyYWNlLmJpbmQodGhpcykpKVxuICAvLyAgICAgIG1hcCh0aGlzLnJlc0ludmVudG9yeUl0ZW1zKVxuICAvLyAgICAsIGZsYXRNYXAoZm9ya0l0ZW1zKVxuICAvLyAgICAsIG1hcChSLm1hcCh0aGlzLnJlc0ludmVudG9yeUl0ZW1zLmJpbmQodGhpcykpKVxuICAvLyAgICAsIG1hcChSLm1hcCh0aGlzLnNldEl0ZW1zLmJpbmQodGhpcykpKVxuICAvLyAgICAsIG1hcChSLmZsYXR0ZW4pXG4gIC8vICAgICwgZmxhdE1hcChmcm9tKVxuICAvLyAgICAsIGZsYXRNYXAoc3RyZWFtRGV0YWlsKVxuICAvLyAgICAsIGZsYXRNYXAoZm9ya0pTT04pXG4gIC8vICAgICwgbWFwKFIubWFwKHRoaXMucmVzRGV0YWlsLmJpbmQodGhpcykpKVxuICAvLyAgICAsIG1hcChSLm1hcCh0aGlzLnNldERldGFpbC5iaW5kKHRoaXMpKSlcbiAgLy8gICAgLCBtYXAoUi5maWx0ZXIoUi5jdXJyeSh0aGlzLmZpbHRlckRldGFpbC5iaW5kKHRoaXMpKShvcHRpb25zKSkpXG4gIC8vICAgICwgbWFwKFIubWFwKHRoaXMucmVuZGVyRGV0YWlsLmJpbmQodGhpcykpKVxuICAvLyAgICAsIG1hcChSLm1hcCh1dGlsLnRvQ1NWLmJpbmQodGhpcykpKVxuICAvLyAgICAsIG1hcChSLm1hcChjc3YgPT4gY3N2ICsgJ1xcbicpKVxuICAgIClcbiAgICA7XG4gIH0sXG4gIFxuICBmb3JJdGVtcyhvcHRpb25zLCByZXMpIHtcbiAgICBjb25zdCBwYWdlcyA9IE51bWJlcihvcHRpb25zLnBhZ2VzKTtcbiAgICBjb25zdCBwYWdlID0gTnVtYmVyKHJlcy5wYWdpbmF0aW9uT3V0cHV0WzBdLnRvdGFsUGFnZXNbMF0pIDwgcGFnZXNcbiAgICAgID8gTnVtYmVyKHJlcy5wYWdpbmF0aW9uT3V0cHV0WzBdLnRvdGFsUGFnZXNbMF0pIDogcGFnZXM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBbXTtcbiAgICBmb3IobGV0IGlkeD0xOyBpZHggPD0gcGFnZTsgaWR4KyspIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2godGhpcy5nZXRJdGVtcyhvcHRpb25zLCBpZHgpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0l0ZW1zO1xuICB9LFxuICBcbiAgZm9yQ29tcGxldGVJdGVtcyhvcHRpb25zLCByZXMpIHtcbiAgICBjb25zdCBwYWdlcyA9IE51bWJlcihvcHRpb25zLnBhZ2VzKTtcbiAgICBjb25zdCBwYWdlID0gTnVtYmVyKHJlcy5wYWdpbmF0aW9uT3V0cHV0WzBdLnRvdGFsUGFnZXNbMF0pIDwgcGFnZXNcbiAgICAgID8gTnVtYmVyKHJlcy5wYWdpbmF0aW9uT3V0cHV0WzBdLnRvdGFsUGFnZXNbMF0pIDogcGFnZXM7XG4gICAgY29uc3QgbmV3SXRlbXMgPSBbXTtcbiAgICBmb3IobGV0IGlkeD0xOyBpZHggPD0gcGFnZTsgaWR4KyspIHtcbiAgICAgIG5ld0l0ZW1zLnB1c2godGhpcy5nZXRDb21wbGV0ZUl0ZW1zKG9wdGlvbnMsIGlkeCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3SXRlbXM7XG4gIH0sXG4gIFxuICBmb3JQcm9kdWN0c0l0ZW1zKG9wdGlvbnMsIHJlcykge1xuICAgIGNvbnN0IHBhZ2VzID0gTnVtYmVyKG9wdGlvbnMucGFnZXMpO1xuICAgIGNvbnN0IHBhZ2UgPSBOdW1iZXIocmVzLnBhZ2luYXRpb25PdXRwdXRbMF0udG90YWxQYWdlc1swXSkgPCBwYWdlc1xuICAgICAgPyBOdW1iZXIocmVzLnBhZ2luYXRpb25PdXRwdXRbMF0udG90YWxQYWdlc1swXSkgOiBwYWdlcztcbiAgICBjb25zdCBuZXdJdGVtcyA9IFtdO1xuICAgIGZvcihsZXQgaWR4PTE7IGlkeCA8PSBwYWdlOyBpZHgrKykge1xuICAgICAgbmV3SXRlbXMucHVzaCh0aGlzLmdldFByb2R1Y3RzSXRlbXMob3B0aW9ucywgaWR4KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXdJdGVtcztcbiAgfSxcbiAgXG4gIHJlc0l0ZW1zKG9iaikge1xuICAgIHJldHVybiBvYmouaGFzT3duUHJvcGVydHkoJ2ZpbmRJdGVtc0J5S2V5d29yZHNSZXNwb25zZScpIFxuICAgICAgPyBvYmouZmluZEl0ZW1zQnlLZXl3b3Jkc1Jlc3BvbnNlWzBdIDogbnVsbDtcbiAgfSxcbiAgXG4gIHJlc0NvbXBsZXRlSXRlbXMob2JqKSB7XG4gICAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eSgnZmluZENvbXBsZXRlZEl0ZW1zUmVzcG9uc2UnKSBcbiAgICAgID8gb2JqLmZpbmRDb21wbGV0ZWRJdGVtc1Jlc3BvbnNlWzBdIDogbnVsbDtcbiAgfSxcbiAgXG4gIHJlc1Byb2R1Y3RzSXRlbXMob2JqKSB7XG4gICAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eSgnZmluZEl0ZW1zQnlQcm9kdWN0UmVzcG9uc2UnKSBcbiAgICAgID8gb2JqLmZpbmRJdGVtc0J5UHJvZHVjdFJlc3BvbnNlWzBdIDogbnVsbDtcbiAgfSxcbiAgXG4gIHNldEl0ZW1zKG9iaikge1xuICAgIHJldHVybiAgb2JqICYmIG9iai5hY2tbMF0gPT09ICdTdWNjZXNzJ1xuICAgICAgPyBvYmouc2VhcmNoUmVzdWx0WzBdLml0ZW0gOiBudWxsO1xuICB9LFxuXG4gIG9wdENvZGUobywgcCkge1xuICAgIGNvbnN0IF9vID0gbztcbiAgICBjb25zdCBfcCA9IHAgPyBwIDoge307XG4gICAgY29uc3Qgc2VhcmNoID0gbmV3IE9iamVjdCgpO1xuICAgIHNlYXJjaFsnY2xpZW50X2lkJ10gPSBfby5hcHBpZDtcbiAgICBzZWFyY2hbJ3JlZGlyZWN0X3VyaSddID0gX28ucnVuYW1lO1xuICAgIHNlYXJjaFsncmVzcG9uc2VfdHlwZSddID0gX28ub3BlcmF0aW9uO1xuICAgIHNlYXJjaFsnc2NvcGUnXSA9IFIuam9pbignICcsIF9vLnNjb3BlKTtcbiAgICBzZWFyY2hbJ3N0YXRlJ10gPSBfcC5zdGF0ZTtcbiAgICByZXR1cm4geyBzZWFyY2gsIG9wZXJhdGlvbjogX28ub3BlcmF0aW9uLCBzdGF0ZTogX3Auc3RhdGUgfTtcbiAgfSxcblxuICBvcHRJdGVtcyhvLCBwKSB7XG4gICAgY29uc3QgX28gPSBvO1xuICAgIGNvbnN0IF9wID0gcCA/IHAgOiB7fTtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IE9iamVjdCgpO1xuICAgIG9wdGlvbnNbJ0dMT0JBTC1JRCddID0gJ0VCQVktVVMnO1xuICAgIG9wdGlvbnNbJ01FU1NBR0UtRU5DT0RJTkcnXSA9ICdVVEYtOCc7XG4gICAgb3B0aW9uc1snT1BFUkFUSU9OLU5BTUUnXSA9IF9vLm9wZXJhdGlvbjtcbiAgICBvcHRpb25zWydSRVFVRVNULURBVEEtRk9STUFUJ10gPSAnTlYnO1xuICAgIG9wdGlvbnNbJ1JFU1BPTlNFLURBVEEtRk9STUFUJ10gPSAnSlNPTic7XG4gICAgb3B0aW9uc1snUkVTVC1QQVlMT0FEJ10gPSAnJztcbiAgICBvcHRpb25zWydTRUNVUklUWS1BUFBOQU1FJ10gPSBfby5hcHBpZDtcbiAgICBvcHRpb25zWydTRVJWSUNFLVZFUlNJT04nXSA9ICcxLjEzLjAnO1xuICAgIG9wdGlvbnNbJ291dHB1dFNlbGVjdG9yJ10gPSAnU2VsbGVySW5mbyc7XG4gICAgb3B0aW9uc1sncGFnaW5hdGlvbklucHV0LmVudHJpZXNQZXJQYWdlJ10gPSAxMDA7XG4gICAgb3B0aW9uc1sncGFnaW5hdGlvbklucHV0LnBhZ2VOdW1iZXInXSA9IF9vLnBhZ2U7XG5cbiAgICBpZihfcC5zZWFyY2hTdHJpbmcpIHtcbiAgICAgIG9wdGlvbnNbJ2tleXdvcmRzJ10gPSBfcC5zZWFyY2hTdHJpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnNbJ2tleXdvcmRzJ10gPSAnJztcbiAgICB9XG5cbiAgICBsZXQgbiA9IDA7XG4gICAgaWYoX3Auc2VsbGVyICYmIF9wLnNlbGxlci5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ1NlbGxlcic7XG4gICAgICBfcC5zZWxsZXIuZm9yRWFjaCgoc2xyLCBpZHgpID0+XG4gICAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoJyAraWR4KyAnKSddID0gc2xyKTtcbiAgICAgIG4rKztcbiAgICB9XG5cbiAgICBpZihfcC5oaWdoZXN0UHJpY2UpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ01heFByaWNlJztcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoMCknXVxuICAgICAgICA9IF9wLmhpZ2hlc3RQcmljZTtcbiAgICAgIG4rKztcbiAgICB9XG5cbiAgICBpZihfcC5sb3dlc3RQcmljZSkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnTWluUHJpY2UnO1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgwKSddID0gX3AubG93ZXN0UHJpY2U7XG4gICAgICBuKys7XG4gICAgfVxuICAgIFxuICAgIGlmKF9wLmNvbmRpdGlvbiAmJiBfcC5jb25kaXRpb24ubGVuZ3RoKSB7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLm5hbWUnXSA9ICdDb25kaXRpb24nO1xuICAgICAgX3AuY29uZGl0aW9uLmZvckVhY2goKGNkbiwgaWR4KSA9PiBcbiAgICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgnICtpZHgrICcpJ10gPSBjZG4pO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIGlmKF9wLnNvbGRJdGVtT25seSA9PT0gdHJ1ZSkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnU29sZEl0ZW1Pbmx5JztcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoMCknXSA9ICd0cnVlJztcbiAgICAgIG4rKztcbiAgICB9XG4gICAgXG4gICAgaWYoc3RkLmlzVmFsaWREYXRlKF9wLnN0YXJ0RGF0ZSkpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ0VuZFRpbWVGcm9tJztcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykudmFsdWUoMCknXVxuICAgICAgICA9IHN0ZC5zZXRUaW1lU3RhbXAoX3Auc3RhcnREYXRlKTtcbiAgICAgIG4rKztcbiAgICB9XG5cbiAgICBpZihzdGQuaXNWYWxpZERhdGUoX3AuZW5kRGF0ZSkpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ0VuZFRpbWVUbyc7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKDApJ11cbiAgICAgICAgPSBzdGQuc2V0VGltZVN0YW1wKF9wLmVuZERhdGUpO1xuICAgICAgbisrO1xuICAgIH1cbiAgICBcbiAgICAvL2xvZy50cmFjZShkaXNwbGF5TmFtZSwgJ29wdEl0ZW1zOicsIG9wdGlvbnMpO1xuICAgIHJldHVybiBvcHRpb25zO1xuICB9LFxuXG4gIG9wdFByb2R1Y3RzKG8sIHApIHtcbiAgICBjb25zdCBfbyA9IG87XG4gICAgY29uc3QgX3AgPSBwID8gcCA6IHt9O1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgT2JqZWN0KCk7XG4gICAgb3B0aW9uc1snR0xPQkFMLUlEJ10gPSAnRUJBWS1VUyc7XG4gICAgb3B0aW9uc1snTUVTU0FHRS1FTkNPRElORyddID0gJ1VURi04JztcbiAgICBvcHRpb25zWydPUEVSQVRJT04tTkFNRSddID0gX28ub3BlcmF0aW9uO1xuICAgIG9wdGlvbnNbJ1JFUVVFU1QtREFUQS1GT1JNQVQnXSA9ICdOVic7XG4gICAgb3B0aW9uc1snUkVTUE9OU0UtREFUQS1GT1JNQVQnXSA9ICdKU09OJztcbiAgICBvcHRpb25zWydSRVNULVBBWUxPQUQnXSA9ICcnO1xuICAgIG9wdGlvbnNbJ1NFQ1VSSVRZLUFQUE5BTUUnXSA9IF9vLmFwcGlkO1xuICAgIG9wdGlvbnNbJ1NFUlZJQ0UtVkVSU0lPTiddID0gJzEuMTMuMCc7XG4gICAgb3B0aW9uc1snb3V0cHV0U2VsZWN0b3InXSA9ICdTZWxsZXJJbmZvJztcbiAgICBvcHRpb25zWydwYWdpbmF0aW9uSW5wdXQuZW50cmllc1BlclBhZ2UnXSA9IDEwO1xuICAgIG9wdGlvbnNbJ3BhZ2luYXRpb25JbnB1dC5wYWdlTnVtYmVyJ10gPSBfby5wYWdlO1xuXG4gICAgaWYoX3AucHJvZHVjdElkICYmIF9wLnByb2R1Y3RUeXBlKSB7XG4gICAgICBvcHRpb25zWydwcm9kdWN0SWQnXSA9IF9wLnByb2R1Y3RJZDtcbiAgICAgIG9wdGlvbnNbJ3Byb2R1Y3RJZC5AdHlwZSddID0gX3AucHJvZHVjdFR5cGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnNbJ3Byb2R1Y3RJZCddID0gJyc7XG4gICAgICBvcHRpb25zWydwcm9kdWN0SWQuQHR5cGUnXSA9ICcnO1xuICAgIH1cblxuICAgIGxldCBuID0gMDtcbiAgICBpZihfcC5zZWxsZXIgJiYgX3Auc2VsbGVyLmxlbmd0aCkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnU2VsbGVyJztcbiAgICAgIF9wLnNlbGxlci5mb3JFYWNoKChzbHIsIGlkeCkgPT5cbiAgICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgnICtpZHgrICcpJ10gPSBzbHIpO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIGlmKF9wLmhpZ2hlc3RQcmljZSkge1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS5uYW1lJ10gPSAnTWF4UHJpY2UnO1xuICAgICAgb3B0aW9uc1snaXRlbUZpbHRlcignICtuKyAnKS52YWx1ZSgwKSddXG4gICAgICAgID0gX3AuaGlnaGVzdFByaWNlO1xuICAgICAgbisrO1xuICAgIH1cblxuICAgIGlmKF9wLmxvd2VzdFByaWNlKSB7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLm5hbWUnXSA9ICdNaW5QcmljZSc7XG4gICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKDApJ10gPSBfcC5sb3dlc3RQcmljZTtcbiAgICAgIG4rKztcbiAgICB9XG4gICAgXG4gICAgaWYoX3AuY29uZGl0aW9uICYmIF9wLmNvbmRpdGlvbi5sZW5ndGgpIHtcbiAgICAgIG9wdGlvbnNbJ2l0ZW1GaWx0ZXIoJyArbisgJykubmFtZSddID0gJ0NvbmRpdGlvbic7XG4gICAgICBfcC5jb25kaXRpb24uZm9yRWFjaCgoY2RuLCBpZHgpID0+IFxuICAgICAgICBvcHRpb25zWydpdGVtRmlsdGVyKCcgK24rICcpLnZhbHVlKCcgK2lkeCsgJyknXSA9IGNkbik7XG4gICAgICBuKys7XG4gICAgfVxuXG4gICAgLy9sb2cudHJhY2UoZGlzcGxheU5hbWUsICdvcHRQcm9kdWN0czonLCBvcHRpb25zKTtcbiAgICByZXR1cm4gb3B0aW9ucztcbiAgfSxcblxuICBsb2dUcmFjZShvYmopIHtcbiAgICByZXR1cm4gbG9nLnRyYWNlKGRpc3BsYXlOYW1lLCAnVHJhY2UgbG9nOicsIG9iaik7XG4gIH0sXG5cbiAgbG9nRXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIGxvZy5lcnJvcihkaXNwbGF5TmFtZSwgJ0Vycm9yIG9jY3VycmVkOicsIGVycik7XG4gIH1cbn1cbiIsImltcG9ydCB7IFJlZHVjZVN0b3JlIH0gIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IGRpc3BhdGNoZXIgICAgICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNsYXNzIEFwcFN0b3JlIGV4dGVuZHMgUmVkdWNlU3RvcmUge1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbGVjdGVkOiAwXG4gICAgICAsIHRpdGxlOiAnJ1xuICAgICAgLCBjb25maWc6IHtcbiAgICAgICAgICBzZWxlY3RlZDogJydcbiAgICAgICAgLCB0aXRsZTogICAgJydcbiAgICAgICAgLCBhcHBpZDogICAgJydcbiAgICAgICAgLCBjZXJ0aWQ6ICAgJydcbiAgICAgICAgLCB0b2tlbjogICAgJydcbiAgICAgICAgLCBydW5hbWU6ICAgJydcbiAgICAgICAgLCBhdXRob3JpemVBcGk6ICcnXG4gICAgICAgICwgb2F1dGgyQXBpOiAgICAnJ1xuICAgICAgICAsIGZpbmRpbmdBcGk6ICAgJydcbiAgICAgICAgLCB0cmFkaW5nQXBpOiAgICcnXG4gICAgICAgICwgaW52ZW50b3J5QXBpOiAnJ1xuICAgICAgICAsIG1hcmtldGluZ0FwaTogJydcbiAgICAgICAgLCBhbmFseXRpY3NBcGk6ICcnXG4gICAgICAgICwgYXV0aGNvZGU6IG51bGxcbiAgICAgICAgLCB1c2VydG9rZW46IG51bGxcbiAgICAgICAgfVxuICAgICAgLCBvcHRpb25zOiBudWxsXG4gICAgICB9O1xuICB9XG4gIFxuICByZWR1Y2Uoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2NvbnRlbnQvc2VsZWN0JzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IHNlbGVjdGVkOiBhY3Rpb24uc2VsZWN0ZWQsIHRpdGxlOiBhY3Rpb24udGl0bGUgfSk7XG4gICAgICBjYXNlICdjb25maWcvZmV0Y2gvYXBwaWQnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgY29uZmlnOiBhY3Rpb24uY29uZmlnIH0pO1xuICAgICAgY2FzZSAnY29uZmlnL3dyaXRlL2FwcGlkJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGNvbmZpZzogYWN0aW9uLmNvbmZpZyB9KTtcbiAgICAgIGNhc2UgJ2l0ZW0vd3JpdGUvaW52ZW50b3J5JzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IG9wdGlvbnM6IGFjdGlvbi5vcHRpb25zIH0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IG5ldyBBcHBTdG9yZShkaXNwYXRjaGVyKTtcbiIsImltcG9ydCB7IFJlZHVjZVN0b3JlIH0gIGZyb20gJ2ZsdXgvdXRpbHMnO1xuaW1wb3J0IGRpc3BhdGNoZXIgICAgICAgZnJvbSAnTWFpbi9kaXNwYXRjaGVyJztcbmltcG9ydCB7IGxvZyB9ICAgICAgICAgIGZyb20gJ1V0aWxpdGllcy93ZWJ1dGlscyc7XG5cbmNvbnN0IGRpc3BsYXlOYW1lID0gYGNvbXBsZXRlU3RvcmVgO1xuXG5jbGFzcyBDb21wbGV0ZVN0b3JlIGV4dGVuZHMgUmVkdWNlU3RvcmUge1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6ICAgICAgICAgICAgIDAgXG4gICAgICAsIGl0ZW1zOiAgICAgICAgICBudWxsXG4gICAgICAsIG9wdGlvbnM6IHtcbiAgICAgICAgc2VhcmNoU3RyaW5nOiAgICcnXG4gICAgICAgICwgcGFnZXM6ICAgICAgICAnJ1xuICAgICAgICAsIGhpZ2hlc3RQcmljZTogJydcbiAgICAgICAgLCBsb3dlc3RQcmljZTogICcnXG4gICAgICAgICwgc2hpcHBpbmc6ICAgICBbXVxuICAgICAgICAsIGNvbmRpdGlvbjogICAgW11cbiAgICAgICAgLCBzdGF0dXM6ICAgICAgIFtdXG4gICAgICAgICwgaXRlbUlkOiAgICAgICBbXVxuICAgICAgICAsIGNhdGVnb3J5UGF0aDogW11cbiAgICAgICAgLCBzZWxsZXI6ICAgICAgIFtdXG4gICAgICAgICwgc29sZEl0ZW1Pbmx5OiBmYWxzZVxuICAgICAgICAsIHN0YXJ0RGF0ZTogICAgJydcbiAgICAgICAgLCBlbmREYXRlOiAgICAgICcnXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICBcbiAgcmVkdWNlKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICBjYXNlICdpdGVtL2ZldGNoL2NvbXBsZXRlJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlXG4gICAgICAgICAgLCB7IGl0ZW1zOiBhY3Rpb24uaXRlbXMsIG9wdGlvbnM6IGFjdGlvbi5vcHRpb25zXG4gICAgICAgICAgICAsIHBhZ2U6IGFjdGlvbi5wYWdlIH0pO1xuICAgICAgY2FzZSAnaXRlbS93cml0ZS9jb21wbGV0ZSc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZVxuICAgICAgICAgICwgeyBvcHRpb25zOiBhY3Rpb24ub3B0aW9ucyB9KTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IENvbXBsZXRlU3RvcmUoZGlzcGF0Y2hlcik7XG4iLCJpbXBvcnQgeyBSZWR1Y2VTdG9yZSB9ICBmcm9tICdmbHV4L3V0aWxzJztcbmltcG9ydCBkaXNwYXRjaGVyICAgICAgIGZyb20gJ01haW4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBkaXNwbGF5TmFtZSA9IGBub3RlU3RvcmVgO1xuXG5jbGFzcyBOb3RlU3RvcmUgZXh0ZW5kcyBSZWR1Y2VTdG9yZSB7XG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcGFnZTogICAgICAgICAgICAgMCBcbiAgICAgICwgaXRlbXM6ICAgICAgICAgIG51bGxcbiAgICAgICwgb3B0aW9uczoge1xuICAgICAgICBzZWFyY2hTdHJpbmc6ICAgJydcbiAgICAgICAgLCBwYWdlczogICAgICAgICcnIFxuICAgICAgICAsIGhpZ2hlc3RQcmljZTogJydcbiAgICAgICAgLCBsb3dlc3RQcmljZTogICcnXG4gICAgICAgICwgc2hpcHBpbmc6ICAgICBbXVxuICAgICAgICAsIGNvbmRpdGlvbjogICAgW11cbiAgICAgICAgLCBzdGF0dXM6ICAgICAgIFtdXG4gICAgICAgICwgaXRlbUlkOiAgICAgICBbXVxuICAgICAgICAsIGNhdGVnb3J5UGF0aDogW11cbiAgICAgICAgLCBzZWxsZXI6ICAgICAgIFtdXG4gICAgICAgICwgc3RhcnREYXRlOiAgICAnJ1xuICAgICAgICAsIGVuZERhdGU6ICAgICAgJydcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIFxuICByZWR1Y2Uoc3RhdGUsIGFjdGlvbikge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2l0ZW0vZmV0Y2gvbm90ZSc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBpdGVtczogYWN0aW9uLml0ZW1zLCBvcHRpb25zOiBhY3Rpb24ub3B0aW9ucywgcGFnZTogYWN0aW9uLnBhZ2UgfSk7XG4gICAgICBjYXNlICdpdGVtL3dyaXRlL25vdGUnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgb3B0aW9uczogYWN0aW9uLm9wdGlvbnMgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBOb3RlU3RvcmUoZGlzcGF0Y2hlcik7XG4iLCJpbXBvcnQgeyBSZWR1Y2VTdG9yZSB9ICBmcm9tICdmbHV4L3V0aWxzJztcbmltcG9ydCBkaXNwYXRjaGVyICAgICAgIGZyb20gJ01haW4vZGlzcGF0Y2hlcic7XG5pbXBvcnQgeyBsb2cgfSAgICAgICAgICBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jb25zdCBkaXNwbGF5TmFtZSA9IGBwcm9kdWN0c1N0b3JlYDtcblxuY2xhc3MgUHJvZHVjdHNTdG9yZSBleHRlbmRzIFJlZHVjZVN0b3JlIHtcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwYWdlOiAgICAgICAgICAgICAwXG4gICAgICAsIGl0ZW1zOiAgICAgICAgICBudWxsXG4gICAgICAsIG9wdGlvbnM6IHtcbiAgICAgICAgcHJvZHVjdElkOiAgICAgICcnXG4gICAgICAgICwgcHJvZHVjdFR5cGU6ICAnJ1xuICAgICAgICAsIHBhZ2VzOiAgICAgICAgJydcbiAgICAgICAgLCBoaWdoZXN0UHJpY2U6ICcnXG4gICAgICAgICwgbG93ZXN0UHJpY2U6ICAnJ1xuICAgICAgICAsIHNoaXBwaW5nOiAgICAgW11cbiAgICAgICAgLCBjb25kaXRpb246ICAgIFtdXG4gICAgICAgICwgc3RhdHVzOiAgICAgICBbXVxuICAgICAgICAsIGl0ZW1JZDogICAgICAgW11cbiAgICAgICAgLCBjYXRlZ29yeVBhdGg6IFtdXG4gICAgICAgICwgc2VsbGVyOiAgICAgICBbXVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgXG4gIHJlZHVjZShzdGF0ZSwgYWN0aW9uKSB7XG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgICAgY2FzZSAnaXRlbS9mZXRjaC9wcm9kdWN0cyc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZVxuICAgICAgICAgICwgeyBpdGVtczogYWN0aW9uLml0ZW1zLCBvcHRpb25zOiBhY3Rpb24ub3B0aW9uc1xuICAgICAgICAgICAgLCBwYWdlOiBhY3Rpb24ucGFnZSB9KTtcbiAgICAgIGNhc2UgJ2l0ZW0vd3JpdGUvcHJvZHVjdHMnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGVcbiAgICAgICAgICAsIHsgb3B0aW9uczogYWN0aW9uLm9wdGlvbnMgfSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBQcm9kdWN0c1N0b3JlKGRpc3BhdGNoZXIpO1xuIiwiaW1wb3J0ICogYXMgUiAgZnJvbSAncmFtZGEnO1xuaW1wb3J0IGZzICAgICAgZnJvbSAnZnMnO1xuaW1wb3J0IHsgaXBjUmVuZGVyZXIsIHJlbW90ZSB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBzdGQgICAgIGZyb20gJ1V0aWxpdGllcy9zdGR1dGlscyc7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICdVdGlsaXRpZXMvd2VidXRpbHMnO1xuXG5jbGFzcyBpcGMge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgfVxuXG4gIHNldCBwcm9wcyhwcm9wcykge1xuICAgIHRoaXMuX3Byb3BzID0gcHJvcHM7XG4gIH1cblxuICBnZXQgcHJvcHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3BzO1xuICB9XG5cbiAgc2VuZChyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgIGlwY1JlbmRlcmVyLm9uKCdhc3luY2hyb25vdXMtcmVwbHknLCAoZXZlbnQsIHsgZXJyb3IsIHJlc3BvbnNlIH0pID0+IHtcbiAgICAgIGlmKGVycm9yKSByZXR1cm4gY2FsbGJhY2soZXJyb3IpO1xuICAgICAgdGhpcy5zZXRQcm9wcyh7IGV2ZW50IH0pO1xuICAgICAgY2FsbGJhY2sobnVsbCwgcmVzcG9uc2UpO1xuICAgIH0pO1xuICAgIGlwY1JlbmRlcmVyLnNlbmQoJ2FzeW5jaHJvbm91cy1tZXNzYWdlJywgcmVxdWVzdCk7XG4gIH1cblxuICBzZW5kU3luYyhyZXF1ZXN0KSB7XG4gICAgY29uc3QgeyBlcnJvciwgcmVzcG9uc2UgfSA9IGlwY1JlbmRlcmVyLnNlbmRTeW5jKCdzeW5jaHJvbm91cy1tZXNzYWdlJywgcmVxdWVzdCk7XG4gICAgaWYoZXJyb3IpIHJldHVybiBlcnJvcjtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBzZXRTdGF0ZShzdGF0ZSkge1xuICAgIHRoaXMuc3RhdGUgPSBSLm1lcmdlKHRoaXMuc3RhdGUsIHN0YXRlKTtcbiAgfVxuXG4gIHNldFByb3BzKHByb3BzKSB7XG4gICAgdGhpcy5wcm9wcyA9IFIubWVyZ2UodGhpcy5wcm9wcywgcHJvcHMpO1xuICB9XG59O1xuaXBjLmRpc3BsYXlOYW1lID0gJ2lwYyc7XG5cbmNsYXNzIGZldGNoIGV4dGVuZHMgaXBjIHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHsgdXJsOiBwcm9wcy51cmwsIHJlc3BvbnNlOiAnJyB9O1xuICB9XG5cbiAgc3RhdGljIG9mKHByb3BzKSB7XG4gICAgcHJvcHMgPSBSLmlzKE9iamVjdCwgcHJvcHMpID8gcHJvcHMgOiB7IHVybDogcHJvcHMgfTtcbiAgICByZXR1cm4gbmV3IGZldGNoKHByb3BzKTtcbiAgfVxuXG4gIGF1dGgocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB7IHVybCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IHNlYXJjaCB9ID0gcmVxdWVzdDtcbiAgICBjb25zdCBhdXRoVXJsID0gc2VhcmNoID8gdXJsICsgJz8nICsgc3RkLnVybGVuY29kZShzZWFyY2gpIDogdXJsO1xuICAgIC8vbG9nLmluZm8oZmV0Y2guZGlzcGxheU5hbWUsICdhdXRoVXJsJywgYXV0aFVybCk7XG4gICAgY29uc3QgQnJvd3NlcldpbmRvdyA9IHJlbW90ZS5Ccm93c2VyV2luZG93O1xuICAgIGNvbnN0IGF1dGhXaW5kb3cgPSBuZXcgQnJvd3NlcldpbmRvdyh7IHdpZHRoOiA4MDAsIGhlaWdodDogNjAwLCBzaG93OiBmYWxzZVxuICAgICwgd2ViUHJlZmVyZW5jZXM6IHsgbm9kZUludGVncmF0aW9uOiBmYWxzZSwgd2ViU2VjdXJpdHk6IGZhbHNlIH0gXG4gICAgfSk7XG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlVXJsID0gbmV3VXJsID0+IHtcbiAgICAgIC8vbG9nLmluZm8oZmV0Y2guZGlzcGxheU5hbWUsICduZXdVcmwnLCBuZXdVcmwpO1xuICAgICAgY29uc3QgcmF3X2NvZGUgID0gL2NvZGU9KFteJl0qKS8uZXhlYyhuZXdVcmwpIHx8IG51bGw7XG4gICAgICBjb25zdCByYXdfc3RhdGUgPSAvc3RhdGU9KFteJl0qKS8uZXhlYyhuZXdVcmwpIHx8IG51bGw7XG4gICAgICBjb25zdCByYXdfZXhwaXJlID0gL2V4cGlyZXNfaW49KFteJl0qKS8uZXhlYyhuZXdVcmwpIHx8IG51bGw7XG4gICAgICBjb25zdCBjb2RlID0gKHJhd19jb2RlICYmIHJhd19jb2RlLmxlbmd0aCA+IDEpID8gcmF3X2NvZGVbMV0gOiBudWxsO1xuICAgICAgY29uc3Qgc3RhdGUgPSAocmF3X3N0YXRlICYmIHJhd19zdGF0ZS5sZW5ndGggPiAxKSA/IHJhd19zdGF0ZVsxXSA6IG51bGw7XG4gICAgICBjb25zdCBleHBpcmVzX2luID0gKHJhd19leHBpcmUgJiYgcmF3X2V4cGlyZS5sZW5ndGggPiAxKSA/IHJhd19leHBpcmVbMV0gOiBudWxsO1xuICAgICAgaWYgKGNvZGUgJiYgc3RhdGUgJiYgZXhwaXJlc19pbikge1xuICAgICAgICBhdXRoV2luZG93LmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKE51bWJlcihzdGF0ZSkgPT09IHJlcXVlc3Quc3RhdGUpIGNhbGxiYWNrKG51bGwsIHsgY29kZSwgc3RhdGUsIGV4cGlyZXNfaW4gfSk7XG4gICAgICAgIGNhbGxiYWNrKHsgbmFtZTogJ0Vycm9yJywgbWVzc2FnZTogJ1RoaXMgcmVkaXJlY3QgcGFnZSB3YXMgbm90IHRoZSBleHBlY3RlZCBzdGF0dXMuJyB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGF1dGhXaW5kb3cud2ViQ29udGVudHMub24oJ2RpZC1maW5pc2gtbG9hZCcsICgpID0+IGhhbmRsZUNoYW5nZVVybChhdXRoV2luZG93LndlYkNvbnRlbnRzLmdldFVSTCgpKSk7XG4gICAgYXV0aFdpbmRvdy5vbmNlKCdyZWFkeS10by1zaG93JywgKCkgPT4gYXV0aFdpbmRvdy5zaG93KCkpO1xuICAgIGF1dGhXaW5kb3cub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgYXV0aFdpbmRvdy5oaWRlKCk7XG4gICAgICBjYWxsYmFjayh7IG5hbWU6ICdDYW5jZWxlZCcsIG1lc3NhZ2U6ICdDb250ZW50IHdhcyBpbmNvbXBsZXRlLiBQbGVhc2UgY2hlY2sgdGhlIGNvbnRlbnRzIG9uY2UgYWdhaW4uJyB9KTtcbiAgICB9KTtcbiAgICBhdXRoV2luZG93LmxvYWRVUkwoYXV0aFVybCk7XG4gIH1cblxuICBnZXQocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICBjb25zdCB7IHVybCB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNlbmQoUi5tZXJnZSh7IHVybCwgbWV0aG9kOiAnR0VUJyB9LCByZXF1ZXN0KSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgaWYoZXJyb3IpIHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgcmVzcG9uc2UgfSk7XG4gICAgICBjYWxsYmFjayhudWxsLCByZXNwb25zZSk7XG4gICAgfSk7XG4gIH1cblxuICBwb3N0KHJlcXVlc3QsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgeyB1cmwgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5zZW5kKFIubWVyZ2UoeyB1cmwsIG1ldGhvZDogJ1BPU1QnIH0sIHJlcXVlc3QpLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBpZihlcnJvcikgcmV0dXJuIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyByZXNwb25zZSB9KTtcbiAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3BvbnNlKTtcbiAgICB9KTtcbiAgfVxuXG4gIF9wb3N0KHJlcXVlc3QpIHtcbiAgICBjb25zdCB7IHVybCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuc2VuZFN5bmMoUi5tZXJnZSh7IHVybCwgbWV0aG9kOiAnUE9TVCcgfSwgcmVxdWVzdCkpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyByZXNwb25zZSB9KTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn07XG5mZXRjaC5kaXNwbGF5TmFtZSA9ICdmZXRjaCc7XG5cbmNvbnN0IHdpbiA9IHtcbiAgZGlzcGxheU5hbWU6ICd3aW4nLFxuICBzaG93U2F2ZURpYWxvZyhjYWxsYmFjaykge1xuICAgIGNvbnN0IHRpdGxlID0gJ1NhdmUnO1xuICAgIGxvZy5pbmZvKHdpbi5kaXNwbGF5TmFtZSwgJ3Nob3dTYXZlRGlhbG9nJywgdGl0bGUpXG4gICAgY29uc3QgY3VycmVudCA9IHJlbW90ZS5nZXRDdXJyZW50V2luZG93KCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHRpdGxlXG4gICAgLCBmaWx0ZXJzOiBbXG4gICAgICAgIHsgbmFtZTogJ0NTViBGaWxlJywgZXh0ZW5zaW9uczogWydjc3YnXX1cbiAgICAgICwgeyBuYW1lOiAnQWxsIEZpbGVzJywgZXh0ZW5zaW9uczogWycqJ10gfVxuICAgICAgXVxuICAgIH07XG4gICAgcmVtb3RlLmRpYWxvZy5zaG93U2F2ZURpYWxvZyhjdXJyZW50LCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgc2hvd0Vycm9yQm94KHsgbmFtZSwgbWVzc2FnZSB9KSB7XG4gICAgaWYobWVzc2FnZS5lcnJvcnMpIHtcbiAgICAgIG5hbWUgICAgID0gbWVzc2FnZS5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgIG1lc3NhZ2UgID0gbWVzc2FnZS5lcnJvcnNbMF0ubG9uZ01lc3NhZ2U7XG4gICAgfSBlbHNlIFxuICAgIGlmKG1lc3NhZ2UuZXJyb3IpIHtcbiAgICAgIG5hbWUgICAgID0gbWVzc2FnZS5lcnJvcjtcbiAgICAgIG1lc3NhZ2UgID0gbWVzc2FnZS5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgbG9nLmluZm8od2luLmRpc3BsYXlOYW1lLCAnc2hvd0Vycm9yQm94JywgbmFtZSlcbiAgICByZW1vdGUuZGlhbG9nLnNob3dFcnJvckJveChuYW1lLCBtZXNzYWdlKTtcbiAgfSxcblxuICBzaG93Q2xvc2VNZXNzYWdlQm94KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgdGl0bGUgPSAnUXVpdCc7XG4gICAgbG9nLmluZm8od2luLmRpc3BsYXlOYW1lLCAnc2hvd0Nsb3NlTWVzc2FnZUJveCcsIHRpdGxlKVxuICAgIGNvbnN0IGN1cnJlbnQgPSByZW1vdGUuZ2V0Q3VycmVudFdpbmRvdygpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICB0aXRsZVxuICAgICwgdHlwZTogJ2luZm8nXG4gICAgLCBidXR0b25zOiBbJ09LJywgJ0NhbmNlbCddXG4gICAgLCBtZXNzYWdlOiAnV291bGQgeW91IGxpa2UgdG8gY2xvc2UgdGhpcyB3aW5kb3c/J1xuICAgICwgZGV0YWlsOiAnQ2xvc2UgdGhpcyB3aW5kb3cuJ1xuICAgIH07XG4gICAgcmVtb3RlLmRpYWxvZy5zaG93TWVzc2FnZUJveChjdXJyZW50LCBvcHRpb25zLCBjYWxsYmFjayk7XG4gIH0sXG5cbiAgc2hvd1NhdmVNZXNzYWdlQm94KCkge1xuICAgIGNvbnN0IHRpdGxlID0gJ1NhdmUnO1xuICAgIGxvZy5pbmZvKHdpbi5kaXNwbGF5TmFtZSwgJ3Nob3dTYXZlTWVzc2FnZUJveCcsIHRpdGxlKVxuICAgIGNvbnN0IGN1cnJlbnQgPSByZW1vdGUuZ2V0Q3VycmVudFdpbmRvdygpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICB0aXRsZVxuICAgICwgdHlwZTogJ2luZm8nXG4gICAgLCBidXR0b25zOiBbICdPSycgXVxuICAgICwgbWVzc2FnZTogJ1NhdmUgZmlsZSdcbiAgICAsIGRldGFpbDogJ0NTViBmaWxlIHNhdmVkLidcbiAgICB9O1xuICAgIHJlbW90ZS5kaWFsb2cuc2hvd01lc3NhZ2VCb3goY3VycmVudCwgb3B0aW9ucyk7XG4gIH0sXG5cbiAgY2xvc2UoKSB7XG4gICAgY29uc3QgdGl0bGUgPSAnQ2xvc2UnO1xuICAgIGxvZy5pbmZvKHdpbi5kaXNwbGF5TmFtZSwgJ2Nsb3NlJywgdGl0bGUpXG4gICAgY29uc3QgY3VycmVudCA9IHJlbW90ZS5nZXRDdXJyZW50V2luZG93KCk7XG4gICAgY3VycmVudC5jbG9zZSgpO1xuICB9XG59O1xuXG5jb25zdCBzeXMgPSB7XG4gIGRpc3BsYXlOYW1lOiAnc3lzJyxcbiAgYWRkYm9tRmlsZShmaWxlbmFtZSkge1xuICAgIGNvbnN0IG9iaiA9ICBCdWZmZXIuZnJvbShbMHhFRiwgMHhCQiwgMHhCRl0pO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBmcy5hcHBlbmRGaWxlKGZpbGVuYW1lLCBvYmosIGVyciA9PiB7XG4gICAgICAgIGlmKGVycikgcmVqZWN0KGVycik7XG4gICAgICAgIHJlc29sdmUoJ0ZpbGUgaGFzIGJlZW4gc2F2ZWQhJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcblxuICBzYXZlRmlsZShmaWxlbmFtZSwgb2JqKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLmFwcGVuZEZpbGUoZmlsZW5hbWUsIG9iaiwgZXJyID0+IHtcbiAgICAgICAgaWYoZXJyKSByZWplY3QoZXJyKTtcbiAgICAgICAgcmVzb2x2ZSgnRmlsZSBoYXMgYmVlbiBzYXZlZCEnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LFxuXG4gIHRvdWNoRmlsZShmaWxlbmFtZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGZzLmNsb3NlU3luYyhmcy5vcGVuU3luYyhmaWxlbmFtZSwgJ3cnLCAwbzY2NikpO1xuICAgICAgcmVzb2x2ZSgnRmlsZSBoYXMgYmVlbiB0b3VjaGVkIScpO1xuICAgIH0pO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGZldGNoLCB3aW4sIHN5cyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxNCBGZWxpeCBHbmFzc1xuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vc3Bpbi5qcy5vcmcvXG4gKlxuICogRXhhbXBsZTpcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgbGluZXM6IDEyICAgICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuICAgICwgbGVuZ3RoOiA3ICAgICAgICAgICAgIC8vIFRoZSBsZW5ndGggb2YgZWFjaCBsaW5lXG4gICAgLCB3aWR0aDogNSAgICAgICAgICAgICAgLy8gVGhlIGxpbmUgdGhpY2tuZXNzXG4gICAgLCByYWRpdXM6IDEwICAgICAgICAgICAgLy8gVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgY2lyY2xlXG4gICAgLCBzY2FsZTogMS4wICAgICAgICAgICAgLy8gU2NhbGVzIG92ZXJhbGwgc2l6ZSBvZiB0aGUgc3Bpbm5lclxuICAgICwgY29ybmVyczogMSAgICAgICAgICAgIC8vIFJvdW5kbmVzcyAoMC4uMSlcbiAgICAsIGNvbG9yOiAnIzAwMCcgICAgICAgICAvLyAjcmdiIG9yICNycmdnYmJcbiAgICAsIG9wYWNpdHk6IDEvNCAgICAgICAgICAvLyBPcGFjaXR5IG9mIHRoZSBsaW5lc1xuICAgICwgcm90YXRlOiAwICAgICAgICAgICAgIC8vIFJvdGF0aW9uIG9mZnNldFxuICAgICwgZGlyZWN0aW9uOiAxICAgICAgICAgIC8vIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2VcbiAgICAsIHNwZWVkOiAxICAgICAgICAgICAgICAvLyBSb3VuZHMgcGVyIHNlY29uZFxuICAgICwgdHJhaWw6IDEwMCAgICAgICAgICAgIC8vIEFmdGVyZ2xvdyBwZXJjZW50YWdlXG4gICAgLCBmcHM6IDIwICAgICAgICAgICAgICAgLy8gRnJhbWVzIHBlciBzZWNvbmQgd2hlbiB1c2luZyBzZXRUaW1lb3V0KClcbiAgICAsIHpJbmRleDogMmU5ICAgICAgICAgICAvLyBVc2UgYSBoaWdoIHotaW5kZXggYnkgZGVmYXVsdFxuICAgICwgY2xhc3NOYW1lOiAnc3Bpbm5lcicgIC8vIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlIGVsZW1lbnRcbiAgICAsIHRvcDogJzUwJScgICAgICAgICAgICAvLyBjZW50ZXIgdmVydGljYWxseVxuICAgICwgbGVmdDogJzUwJScgICAgICAgICAgIC8vIGNlbnRlciBob3Jpem9udGFsbHlcbiAgICAsIHNoYWRvdzogZmFsc2UgICAgICAgICAvLyBXaGV0aGVyIHRvIHJlbmRlciBhIHNoYWRvd1xuICAgICwgaHdhY2NlbDogZmFsc2UgICAgICAgIC8vIFdoZXRoZXIgdG8gdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiAobWlnaHQgYmUgYnVnZ3kpXG4gICAgLCBwb3NpdGlvbjogJ2Fic29sdXRlJyAgLy8gRWxlbWVudCBwb3NpdGlvbmluZ1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vJylcbiAgICBjb25zdCBzcGlubmVyID0gbmV3IFNwaW5uZXIob3B0cykuc3Bpbih0YXJnZXQpXG4gKi9cbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcblxuICAvKiBDb21tb25KUyAqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpXG5cbiAgLyogQU1EIG1vZHVsZSAqL1xuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIGRlZmluZShmYWN0b3J5KVxuXG4gIC8qIEJyb3dzZXIgZ2xvYmFsICovXG4gIGVsc2Ugcm9vdC5TcGlubmVyID0gZmFjdG9yeSgpXG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCJcblxuICBsZXQgcHJlZml4ZXMgPSBbJ3dlYmtpdCcsICdNb3onLCAnbXMnLCAnTyddIC8qIFZlbmRvciBwcmVmaXhlcyAqL1xuICAgICwgYW5pbWF0aW9ucyA9IHt9IC8qIEFuaW1hdGlvbiBydWxlcyBrZXllZCBieSB0aGVpciBuYW1lICovXG4gICAgLCB1c2VDc3NBbmltYXRpb25zIC8qIFdoZXRoZXIgdG8gdXNlIENTUyBhbmltYXRpb25zIG9yIHNldFRpbWVvdXQgKi9cbiAgICAsIHNoZWV0IC8qIEEgc3R5bGVzaGVldCB0byBob2xkIHRoZSBAa2V5ZnJhbWUgb3IgVk1MIHJ1bGVzLiAqL1xuXG4gIC8qKlxuICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBlbGVtZW50cy4gSWYgbm8gdGFnIG5hbWUgaXMgZ2l2ZW4sXG4gICAqIGEgRElWIGlzIGNyZWF0ZWQuIE9wdGlvbmFsbHkgcHJvcGVydGllcyBjYW4gYmUgcGFzc2VkLlxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlRWwgKHRhZywgcHJvcCkge1xuICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnIHx8ICdkaXYnKVxuICAgICAgLCBuXG5cbiAgICBmb3IgKG4gaW4gcHJvcCkgZWxbbl0gPSBwcm9wW25dXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICAvKipcbiAgICogQXBwZW5kcyBjaGlsZHJlbiBhbmQgcmV0dXJucyB0aGUgcGFyZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gaW5zIChwYXJlbnQgLyogY2hpbGQxLCBjaGlsZDIsIC4uLiovKSB7XG4gICAgZm9yIChsZXQgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYXJndW1lbnRzW2ldKVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIG9wYWNpdHkga2V5ZnJhbWUgYW5pbWF0aW9uIHJ1bGUgYW5kIHJldHVybnMgaXRzIG5hbWUuXG4gICAqIFNpbmNlIG1vc3QgbW9iaWxlIFdlYmtpdHMgaGF2ZSB0aW1pbmcgaXNzdWVzIHdpdGggYW5pbWF0aW9uLWRlbGF5LFxuICAgKiB3ZSBjcmVhdGUgc2VwYXJhdGUgcnVsZXMgZm9yIGVhY2ggbGluZS9zZWdtZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gYWRkQW5pbWF0aW9uIChhbHBoYSwgdHJhaWwsIGksIGxpbmVzKSB7XG4gICAgY29uc3QgbmFtZSA9IFsnb3BhY2l0eScsIHRyYWlsLCB+fihhbHBoYSAqIDEwMCksIGksIGxpbmVzXS5qb2luKCctJylcbiAgICAgICwgc3RhcnQgPSAwLjAxICsgaS9saW5lcyAqIDEwMFxuICAgICAgLCB6ID0gTWF0aC5tYXgoMSAtICgxLWFscGhhKSAvIHRyYWlsICogKDEwMC1zdGFydCksIGFscGhhKVxuICAgICAgLCBwcmVmaXggPSB1c2VDc3NBbmltYXRpb25zLnN1YnN0cmluZygwLCB1c2VDc3NBbmltYXRpb25zLmluZGV4T2YoJ0FuaW1hdGlvbicpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIHByZSA9IHByZWZpeCAmJiAnLScgKyBwcmVmaXggKyAnLScgfHwgJydcblxuICAgIGlmICghYW5pbWF0aW9uc1tuYW1lXSkge1xuICAgICAgc2hlZXQuaW5zZXJ0UnVsZShcbiAgICAgICAgJ0AnICsgcHJlICsgJ2tleWZyYW1lcyAnICsgbmFtZSArICd7JyArXG4gICAgICAgICcwJXtvcGFjaXR5OicgKyB6ICsgJ30nICtcbiAgICAgICAgc3RhcnQgKyAnJXtvcGFjaXR5OicgKyBhbHBoYSArICd9JyArXG4gICAgICAgIChzdGFydCswLjAxKSArICcle29wYWNpdHk6MX0nICtcbiAgICAgICAgKHN0YXJ0K3RyYWlsKSAlIDEwMCArICcle29wYWNpdHk6JyArIGFscGhhICsgJ30nICtcbiAgICAgICAgJzEwMCV7b3BhY2l0eTonICsgeiArICd9JyArXG4gICAgICAgICd9Jywgc2hlZXQuY3NzUnVsZXMubGVuZ3RoKVxuXG4gICAgICBhbmltYXRpb25zW25hbWVdID0gMVxuICAgIH1cblxuICAgIHJldHVybiBuYW1lXG4gIH1cblxuICAvKipcbiAgICogVHJpZXMgdmFyaW91cyB2ZW5kb3IgcHJlZml4ZXMgYW5kIHJldHVybnMgdGhlIGZpcnN0IHN1cHBvcnRlZCBwcm9wZXJ0eS5cbiAgICovXG4gIGZ1bmN0aW9uIHZlbmRvciAoZWwsIHByb3ApIHtcbiAgICBsZXQgcyA9IGVsLnN0eWxlXG4gICAgICAsIHBwXG4gICAgICAsIGlcblxuICAgIHByb3AgPSBwcm9wLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcC5zbGljZSgxKVxuICAgIGlmIChzW3Byb3BdICE9PSB1bmRlZmluZWQpIHJldHVybiBwcm9wXG4gICAgZm9yIChpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwcCA9IHByZWZpeGVzW2ldK3Byb3BcbiAgICAgIGlmIChzW3BwXSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gcHBcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBtdWx0aXBsZSBzdHlsZSBwcm9wZXJ0aWVzIGF0IG9uY2UuXG4gICAqL1xuICBmdW5jdGlvbiBjc3MgKGVsLCBwcm9wKSB7XG4gICAgZm9yIChsZXQgbiBpbiBwcm9wKSB7XG4gICAgICBlbC5zdHlsZVt2ZW5kb3IoZWwsIG4pIHx8IG5dID0gcHJvcFtuXVxuICAgIH1cblxuICAgIHJldHVybiBlbFxuICB9XG5cbiAgLyoqXG4gICAqIEZpbGxzIGluIGRlZmF1bHQgdmFsdWVzLlxuICAgKi9cbiAgZnVuY3Rpb24gbWVyZ2UgKG9iaikge1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBkZWYgPSBhcmd1bWVudHNbaV1cbiAgICAgIGZvciAobGV0IG4gaW4gZGVmKSB7XG4gICAgICAgIGlmIChvYmpbbl0gPT09IHVuZGVmaW5lZCkgb2JqW25dID0gZGVmW25dXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmpcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBsaW5lIGNvbG9yIGZyb20gdGhlIGdpdmVuIHN0cmluZyBvciBhcnJheS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldENvbG9yIChjb2xvciwgaWR4KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjb2xvciA9PT0gJ3N0cmluZycgPyBjb2xvciA6IGNvbG9yW2lkeCAlIGNvbG9yLmxlbmd0aF1cbiAgfVxuXG4gIC8vIEJ1aWx0LWluIGRlZmF1bHRzXG5cbiAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgbGluZXM6IDEyICAgICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuICAsIGxlbmd0aDogNyAgICAgICAgICAgICAvLyBUaGUgbGVuZ3RoIG9mIGVhY2ggbGluZVxuICAsIHdpZHRoOiA1ICAgICAgICAgICAgICAvLyBUaGUgbGluZSB0aGlja25lc3NcbiAgLCByYWRpdXM6IDEwICAgICAgICAgICAgLy8gVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgY2lyY2xlXG4gICwgc2NhbGU6IDEuMCAgICAgICAgICAgIC8vIFNjYWxlcyBvdmVyYWxsIHNpemUgb2YgdGhlIHNwaW5uZXJcbiAgLCBjb3JuZXJzOiAxICAgICAgICAgICAgLy8gUm91bmRuZXNzICgwLi4xKVxuICAsIGNvbG9yOiAnIzAwMCcgICAgICAgICAvLyAjcmdiIG9yICNycmdnYmJcbiAgLCBvcGFjaXR5OiAxLzQgICAgICAgICAgLy8gT3BhY2l0eSBvZiB0aGUgbGluZXNcbiAgLCByb3RhdGU6IDAgICAgICAgICAgICAgLy8gUm90YXRpb24gb2Zmc2V0XG4gICwgZGlyZWN0aW9uOiAxICAgICAgICAgIC8vIDE6IGNsb2Nrd2lzZSwgLTE6IGNvdW50ZXJjbG9ja3dpc2VcbiAgLCBzcGVlZDogMSAgICAgICAgICAgICAgLy8gUm91bmRzIHBlciBzZWNvbmRcbiAgLCB0cmFpbDogMTAwICAgICAgICAgICAgLy8gQWZ0ZXJnbG93IHBlcmNlbnRhZ2VcbiAgLCBmcHM6IDIwICAgICAgICAgICAgICAgLy8gRnJhbWVzIHBlciBzZWNvbmQgd2hlbiB1c2luZyBzZXRUaW1lb3V0KClcbiAgLCB6SW5kZXg6IDJlOSAgICAgICAgICAgLy8gVXNlIGEgaGlnaCB6LWluZGV4IGJ5IGRlZmF1bHRcbiAgLCBjbGFzc05hbWU6ICdzcGlubmVyJyAgLy8gQ1NTIGNsYXNzIHRvIGFzc2lnbiB0byB0aGUgZWxlbWVudFxuICAsIHRvcDogJzUwJScgICAgICAgICAgICAvLyBjZW50ZXIgdmVydGljYWxseVxuICAsIGxlZnQ6ICc1MCUnICAgICAgICAgICAvLyBjZW50ZXIgaG9yaXpvbnRhbGx5XG4gICwgc2hhZG93OiBmYWxzZSAgICAgICAgIC8vIFdoZXRoZXIgdG8gcmVuZGVyIGEgc2hhZG93XG4gICwgaHdhY2NlbDogZmFsc2UgICAgICAgIC8vIFdoZXRoZXIgdG8gdXNlIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiAobWlnaHQgYmUgYnVnZ3kpXG4gICwgcG9zaXRpb246ICdhYnNvbHV0ZScgIC8vIEVsZW1lbnQgcG9zaXRpb25pbmdcbiAgfVxuXG4gIC8qKiBUaGUgY29uc3RydWN0b3IgKi9cbiAgZnVuY3Rpb24gU3Bpbm5lciAobykge1xuICAgIHRoaXMub3B0cyA9IG1lcmdlKG8gfHwge30sIFNwaW5uZXIuZGVmYXVsdHMsIGRlZmF1bHRzKVxuICB9XG5cbiAgLy8gR2xvYmFsIGRlZmF1bHRzIHRoYXQgb3ZlcnJpZGUgdGhlIGJ1aWx0LWluczpcbiAgU3Bpbm5lci5kZWZhdWx0cyA9IHt9XG5cbiAgbWVyZ2UoU3Bpbm5lci5wcm90b3R5cGUsIHtcbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBzcGlubmVyIHRvIHRoZSBnaXZlbiB0YXJnZXQgZWxlbWVudC4gSWYgdGhpcyBpbnN0YW5jZSBpcyBhbHJlYWR5XG4gICAgICogc3Bpbm5pbmcsIGl0IGlzIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBmcm9tIGl0cyBwcmV2aW91cyB0YXJnZXQgYiBjYWxsaW5nXG4gICAgICogc3RvcCgpIGludGVybmFsbHkuXG4gICAgICovXG4gICAgc3BpbjogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdGhpcy5zdG9wKClcblxuICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgLCBvID0gc2VsZi5vcHRzXG4gICAgICAgICwgZWwgPSBzZWxmLmVsID0gY3JlYXRlRWwobnVsbCwge2NsYXNzTmFtZTogby5jbGFzc05hbWV9KVxuXG4gICAgICBjc3MoZWwsIHtcbiAgICAgICAgcG9zaXRpb246IG8ucG9zaXRpb25cbiAgICAgICwgd2lkdGg6IDBcbiAgICAgICwgekluZGV4OiBvLnpJbmRleFxuICAgICAgLCBsZWZ0OiBvLmxlZnRcbiAgICAgICwgdG9wOiBvLnRvcFxuICAgICAgfSlcblxuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKGVsLCB0YXJnZXQuZmlyc3RDaGlsZCB8fCBudWxsKVxuICAgICAgfVxuXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJvZ3Jlc3NiYXInKVxuICAgICAgc2VsZi5saW5lcyhlbCwgc2VsZi5vcHRzKVxuXG4gICAgICBpZiAoIXVzZUNzc0FuaW1hdGlvbnMpIHtcbiAgICAgICAgLy8gTm8gQ1NTIGFuaW1hdGlvbiBzdXBwb3J0LCB1c2Ugc2V0VGltZW91dCgpIGluc3RlYWRcbiAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgICAgLCBzdGFydCA9IChvLmxpbmVzIC0gMSkgKiAoMSAtIG8uZGlyZWN0aW9uKSAvIDJcbiAgICAgICAgICAsIGFscGhhXG4gICAgICAgICAgLCBmcHMgPSBvLmZwc1xuICAgICAgICAgICwgZiA9IGZwcyAvIG8uc3BlZWRcbiAgICAgICAgICAsIG9zdGVwID0gKDEgLSBvLm9wYWNpdHkpIC8gKGYgKiBvLnRyYWlsIC8gMTAwKVxuICAgICAgICAgICwgYXN0ZXAgPSBmIC8gby5saW5lc1xuXG4gICAgICAgIDsoZnVuY3Rpb24gYW5pbSAoKSB7XG4gICAgICAgICAgaSsrXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvLmxpbmVzOyBqKyspIHtcbiAgICAgICAgICAgIGFscGhhID0gTWF0aC5tYXgoMSAtIChpICsgKG8ubGluZXMgLSBqKSAqIGFzdGVwKSAlIGYgKiBvc3RlcCwgby5vcGFjaXR5KVxuXG4gICAgICAgICAgICBzZWxmLm9wYWNpdHkoZWwsIGogKiBvLmRpcmVjdGlvbiArIHN0YXJ0LCBhbHBoYSwgbylcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VsZi50aW1lb3V0ID0gc2VsZi5lbCAmJiBzZXRUaW1lb3V0KGFuaW0sIH5+KDEwMDAgLyBmcHMpKVxuICAgICAgICB9KSgpXG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGFuZCByZW1vdmVzIHRoZSBTcGlubmVyLlxuICAgICAqL1xuICAsIHN0b3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5lbFxuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG4gICAgICAgIGlmIChlbC5wYXJlbnROb2RlKSBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKVxuICAgICAgICB0aGlzLmVsID0gdW5kZWZpbmVkXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIG1ldGhvZCB0aGF0IGRyYXdzIHRoZSBpbmRpdmlkdWFsIGxpbmVzLiBXaWxsIGJlIG92ZXJ3cml0dGVuXG4gICAgICogaW4gVk1MIGZhbGxiYWNrIG1vZGUgYmVsb3cuXG4gICAgICovXG4gICwgbGluZXM6IGZ1bmN0aW9uIChlbCwgbykge1xuICAgICAgbGV0IGkgPSAwXG4gICAgICAgICwgc3RhcnQgPSAoby5saW5lcyAtIDEpICogKDEgLSBvLmRpcmVjdGlvbikgLyAyXG4gICAgICAgICwgc2VnXG5cbiAgICAgIGZ1bmN0aW9uIGZpbGwgKGNvbG9yLCBzaGFkb3cpIHtcbiAgICAgICAgcmV0dXJuIGNzcyhjcmVhdGVFbCgpLCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgLCB3aWR0aDogby5zY2FsZSAqIChvLmxlbmd0aCArIG8ud2lkdGgpICsgJ3B4J1xuICAgICAgICAsIGhlaWdodDogby5zY2FsZSAqIG8ud2lkdGggKyAncHgnXG4gICAgICAgICwgYmFja2dyb3VuZDogY29sb3JcbiAgICAgICAgLCBib3hTaGFkb3c6IHNoYWRvd1xuICAgICAgICAsIHRyYW5zZm9ybU9yaWdpbjogJ2xlZnQnXG4gICAgICAgICwgdHJhbnNmb3JtOiAncm90YXRlKCcgKyB+figzNjAvby5saW5lcyppICsgby5yb3RhdGUpICsgJ2RlZykgdHJhbnNsYXRlKCcgKyBvLnNjYWxlKm8ucmFkaXVzICsgJ3B4JyArICcsMCknXG4gICAgICAgICwgYm9yZGVyUmFkaXVzOiAoby5jb3JuZXJzICogby5zY2FsZSAqIG8ud2lkdGggPj4gMSkgKyAncHgnXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGZvciAoOyBpIDwgby5saW5lczsgaSsrKSB7XG4gICAgICAgIHNlZyA9IGNzcyhjcmVhdGVFbCgpLCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICAgICAgLCB0b3A6IDEgKyB+KG8uc2NhbGUgKiBvLndpZHRoIC8gMikgKyAncHgnXG4gICAgICAgICwgdHJhbnNmb3JtOiBvLmh3YWNjZWwgPyAndHJhbnNsYXRlM2QoMCwwLDApJyA6ICcnXG4gICAgICAgICwgb3BhY2l0eTogby5vcGFjaXR5XG4gICAgICAgICwgYW5pbWF0aW9uOiB1c2VDc3NBbmltYXRpb25zICYmIGFkZEFuaW1hdGlvbihvLm9wYWNpdHksIG8udHJhaWwsIHN0YXJ0ICsgaSAqIG8uZGlyZWN0aW9uLCBvLmxpbmVzKSArICcgJyArIDEgLyBvLnNwZWVkICsgJ3MgbGluZWFyIGluZmluaXRlJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChvLnNoYWRvdykgaW5zKHNlZywgY3NzKGZpbGwoJyMwMDAnLCAnMCAwIDRweCAjMDAwJyksIHt0b3A6ICcycHgnfSkpXG4gICAgICAgIGlucyhlbCwgaW5zKHNlZywgZmlsbChnZXRDb2xvcihvLmNvbG9yLCBpKSwgJzAgMCAxcHggcmdiYSgwLDAsMCwuMSknKSkpXG4gICAgICB9XG4gICAgICByZXR1cm4gZWxcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2QgdGhhdCBhZGp1c3RzIHRoZSBvcGFjaXR5IG9mIGEgc2luZ2xlIGxpbmUuXG4gICAgICogV2lsbCBiZSBvdmVyd3JpdHRlbiBpbiBWTUwgZmFsbGJhY2sgbW9kZSBiZWxvdy5cbiAgICAgKi9cbiAgLCBvcGFjaXR5OiBmdW5jdGlvbiAoZWwsIGksIHZhbCkge1xuICAgICAgaWYgKGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aCkgZWwuY2hpbGROb2Rlc1tpXS5zdHlsZS5vcGFjaXR5ID0gdmFsXG4gICAgfVxuXG4gIH0pXG5cblxuICBmdW5jdGlvbiBpbml0Vk1MICgpIHtcblxuICAgIC8qIFV0aWxpdHkgZnVuY3Rpb24gdG8gY3JlYXRlIGEgVk1MIHRhZyAqL1xuICAgIGZ1bmN0aW9uIHZtbCAodGFnLCBhdHRyKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRWwoJzwnICsgdGFnICsgJyB4bWxucz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC5jb206dm1sXCIgY2xhc3M9XCJzcGluLXZtbFwiPicsIGF0dHIpXG4gICAgfVxuXG4gICAgLy8gTm8gQ1NTIHRyYW5zZm9ybXMgYnV0IFZNTCBzdXBwb3J0LCBhZGQgYSBDU1MgcnVsZSBmb3IgVk1MIGVsZW1lbnRzOlxuICAgIHNoZWV0LmFkZFJ1bGUoJy5zcGluLXZtbCcsICdiZWhhdmlvcjp1cmwoI2RlZmF1bHQjVk1MKScpXG5cbiAgICBTcGlubmVyLnByb3RvdHlwZS5saW5lcyA9IGZ1bmN0aW9uIChlbCwgbykge1xuICAgICAgY29uc3QgciA9IG8uc2NhbGUgKiAoby5sZW5ndGggKyBvLndpZHRoKVxuICAgICAgICAsIHMgPSBvLnNjYWxlICogMiAqIHJcblxuICAgICAgZnVuY3Rpb24gZ3JwICgpIHtcbiAgICAgICAgcmV0dXJuIGNzcyhcbiAgICAgICAgICB2bWwoJ2dyb3VwJywge1xuICAgICAgICAgICAgY29vcmRzaXplOiBzICsgJyAnICsgc1xuICAgICAgICAgICwgY29vcmRvcmlnaW46IC1yICsgJyAnICsgLXJcbiAgICAgICAgICB9KVxuICAgICAgICAsIHsgd2lkdGg6IHMsIGhlaWdodDogcyB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgbGV0IG1hcmdpbiA9IC0oby53aWR0aCArIG8ubGVuZ3RoKSAqIG8uc2NhbGUgKiAyICsgJ3B4J1xuICAgICAgICAsIGcgPSBjc3MoZ3JwKCksIHtwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiBtYXJnaW4sIGxlZnQ6IG1hcmdpbn0pXG4gICAgICAgICwgaTtcblxuICAgICAgZnVuY3Rpb24gc2VnIChpLCBkeCwgZmlsdGVyKSB7XG4gICAgICAgIGlucyhcbiAgICAgICAgICBnXG4gICAgICAgICwgaW5zKFxuICAgICAgICAgICAgY3NzKGdycCgpLCB7cm90YXRpb246IDM2MCAvIG8ubGluZXMgKiBpICsgJ2RlZycsIGxlZnQ6IH5+ZHh9KVxuICAgICAgICAgICwgaW5zKFxuICAgICAgICAgICAgICBjc3MoXG4gICAgICAgICAgICAgICAgdm1sKCdyb3VuZHJlY3QnLCB7YXJjc2l6ZTogby5jb3JuZXJzfSlcbiAgICAgICAgICAgICAgLCB7IHdpZHRoOiByXG4gICAgICAgICAgICAgICAgLCBoZWlnaHQ6IG8uc2NhbGUgKiBvLndpZHRoXG4gICAgICAgICAgICAgICAgLCBsZWZ0OiBvLnNjYWxlICogby5yYWRpdXNcbiAgICAgICAgICAgICAgICAsIHRvcDogLW8uc2NhbGUgKiBvLndpZHRoID4+IDFcbiAgICAgICAgICAgICAgICAsIGZpbHRlcjogZmlsdGVyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAsIHZtbCgnZmlsbCcsIHtjb2xvcjogZ2V0Q29sb3Ioby5jb2xvciwgaSksIG9wYWNpdHk6IG8ub3BhY2l0eX0pXG4gICAgICAgICAgICAsIHZtbCgnc3Ryb2tlJywge29wYWNpdHk6IDB9KSAvLyB0cmFuc3BhcmVudCBzdHJva2UgdG8gZml4IGNvbG9yIGJsZWVkaW5nIHVwb24gb3BhY2l0eSBjaGFuZ2VcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgaWYgKG8uc2hhZG93KVxuICAgICAgICBmb3IgKGkgPSAxOyBpIDw9IG8ubGluZXM7IGkrKykge1xuICAgICAgICAgIHNlZyhpLCAtMiwgJ3Byb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5CbHVyKHBpeGVscmFkaXVzPTIsbWFrZXNoYWRvdz0xLHNoYWRvd29wYWNpdHk9LjMpJylcbiAgICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSAxOyBpIDw9IG8ubGluZXM7IGkrKykgc2VnKGkpXG4gICAgICByZXR1cm4gaW5zKGVsLCBnKVxuICAgIH1cblxuICAgIFNwaW5uZXIucHJvdG90eXBlLm9wYWNpdHkgPSBmdW5jdGlvbiAoZWwsIGksIHZhbCwgbykge1xuICAgICAgY29uc3QgYyA9IGVsLmZpcnN0Q2hpbGRcbiAgICAgIG8gPSBvLnNoYWRvdyAmJiBvLmxpbmVzIHx8IDBcbiAgICAgIGlmIChjICYmIGkgKyBvIDwgYy5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICBjID0gYy5jaGlsZE5vZGVzW2kgKyBvXTsgYyA9IGMgJiYgYy5maXJzdENoaWxkOyBjID0gYyAmJiBjLmZpcnN0Q2hpbGRcbiAgICAgICAgaWYgKGMpIGMub3BhY2l0eSA9IHZhbFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2hlZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgZWwgPSBjcmVhdGVFbCgnc3R5bGUnLCB7dHlwZSA6ICd0ZXh0L2Nzcyd9KVxuICAgICAgaW5zKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0sIGVsKVxuICAgICAgcmV0dXJuIGVsLnNoZWV0IHx8IGVsLnN0eWxlU2hlZXRcbiAgICB9KCkpXG5cbiAgICBjb25zdCBwcm9iZSA9IGNzcyhjcmVhdGVFbCgnZ3JvdXAnKSwge2JlaGF2aW9yOiAndXJsKCNkZWZhdWx0I1ZNTCknfSlcblxuICAgIGlmICghdmVuZG9yKHByb2JlLCAndHJhbnNmb3JtJykgJiYgcHJvYmUuYWRqKSBpbml0Vk1MKClcbiAgICBlbHNlIHVzZUNzc0FuaW1hdGlvbnMgPSB2ZW5kb3IocHJvYmUsICdhbmltYXRpb24nKVxuICB9XG5cbiAgcmV0dXJuIFNwaW5uZXJcblxufSkpO1xuIiwiaW1wb3J0IHF1ZXJ5c3RyaW5nICAgICAgICAgICAgICBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgY3J5cHRvICAgICAgICAgICAgICAgICAgIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBVUkwsIFVSTFNlYXJjaFBhcmFtcyB9IGZyb20gJ3VybCc7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52LlBMQVRGT1JNIHx8ICdsb2NhbCc7XG5jb25zdCBpc05vZGUgPSBlbnYgPT09ICdsb2NhbCc7XG5jb25zdCBjb2xvcl9jb2RlID0ge1xuICBSZXNldDogICAgICBpc05vZGUgPyBcIlxceDFiWzBtXCIgOiAnJ1xuLCBCcmlnaHQ6ICAgICBpc05vZGUgPyBcIlxceDFiWzFtXCIgOiAnJ1xuLCBEaW06ICAgICAgICBpc05vZGUgPyBcIlxceDFiWzJtXCIgOiAnJ1xuLCBVbmRlcnNjb3JlOiBpc05vZGUgPyBcIlxceDFiWzRtXCIgOiAnJ1xuLCBCbGluazogICAgICBpc05vZGUgPyBcIlxceDFiWzVtXCIgOiAnJ1xuLCBSZXZlcnNlOiAgICBpc05vZGUgPyBcIlxceDFiWzdtXCIgOiAnJ1xuLCBIaWRkZW46ICAgICBpc05vZGUgPyBcIlxceDFiWzhtXCIgOiAnJ1xuXG4sIEZnQmxhY2s6ICAgIGlzTm9kZSA/IFwiXFx4MWJbMzBtXCIgOiAnJ1xuLCBGZ1JlZDogICAgICBpc05vZGUgPyBcIlxceDFiWzMxbVwiIDogJydcbiwgRmdHcmVlbjogICAgaXNOb2RlID8gXCJcXHgxYlszMm1cIiA6ICcnXG4sIEZnWWVsbG93OiAgIGlzTm9kZSA/IFwiXFx4MWJbMzNtXCIgOiAnJ1xuLCBGZ0JsdWU6ICAgICBpc05vZGUgPyBcIlxceDFiWzM0bVwiIDogJydcbiwgRmdNYWdlbnRhOiAgaXNOb2RlID8gXCJcXHgxYlszNW1cIiA6ICcnXG4sIEZnQ3lhbjogICAgIGlzTm9kZSA/IFwiXFx4MWJbMzZtXCIgOiAnJ1xuLCBGZ1doaXRlOiAgICBpc05vZGUgPyBcIlxceDFiWzM3bVwiIDogJydcblxuLCBCZ0JsYWNrOiAgICBpc05vZGUgPyBcIlxceDFiWzQwbVwiIDogJydcbiwgQmdSZWQ6ICAgICAgaXNOb2RlID8gXCJcXHgxYls0MW1cIiA6ICcnXG4sIEJnR3JlZW46ICAgIGlzTm9kZSA/IFwiXFx4MWJbNDJtXCIgOiAnJ1xuLCBCZ1llbGxvdzogICBpc05vZGUgPyBcIlxceDFiWzQzbVwiIDogJydcbiwgQmdCbHVlOiAgICAgaXNOb2RlID8gXCJcXHgxYls0NG1cIiA6ICcnXG4sIEJnTWFnZW50YTogIGlzTm9kZSA/IFwiXFx4MWJbNDVtXCIgOiAnJ1xuLCBCZ0N5YW46ICAgICBpc05vZGUgPyBcIlxceDFiWzQ2bVwiIDogJydcbiwgQmdXaGl0ZTogICAgaXNOb2RlID8gXCJcXHgxYls0N21cIiA6ICcnXG59XG5cbmNvbnN0IHN0ZCA9IHtcbiAgdG9SR0JhKHN0ciwgYSkge1xuICAgIGNvbnN0IHIgPSBwYXJzZUludChzdHIuc3Vic3RyKDEsMiksIDE2KTtcbiAgICBjb25zdCBnID0gcGFyc2VJbnQoc3RyLnN1YnN0cigzLDIpLCAxNik7XG4gICAgY29uc3QgYiA9IHBhcnNlSW50KHN0ci5zdWJzdHIoNSwyKSwgMTYpO1xuICAgIHJldHVybiBgcmdiYSgke3J9LCAke2d9LCAke2J9LCAke2F9KWA7XG4gIH0sXG5cbiAgbG9nRXJyb3IoY2FsbGVyLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgZGF0ZSA9IGNvbG9yX2NvZGVbJ0ZnUmVkJ10gKyBgWyR7dGhpcy5nZXRMb2NhbElTT1RpbWVTdGFtcChuZXcgRGF0ZSl9XWA7XG4gICAgY29uc3QgaGVhZCA9IGNvbG9yX2NvZGVbJ1Jlc2V0J10gKyBuYW1lO1xuICAgIGNvbnNvbGUuZXJyb3IoZGF0ZSAsJ1tFUlJPUl0nLCBjYWxsZXIsICctJyxoZWFkLCAnOicsIG1lc3NhZ2UpO1xuICB9LFxuXG4gIGxvZ1dhcm4oY2FsbGVyLCBuYW1lLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgZGF0ZSA9IGNvbG9yX2NvZGVbJ0ZnWWVsbG93J10gKyBgWyR7dGhpcy5nZXRMb2NhbElTT1RpbWVTdGFtcChuZXcgRGF0ZSl9XWA7XG4gICAgY29uc3QgaGVhZCA9IGNvbG9yX2NvZGVbJ1Jlc2V0J10gKyBuYW1lO1xuICAgIGNvbnNvbGUud2FybihkYXRlICwnW1dBUk5dJywgY2FsbGVyLCAnLScsaGVhZCwgJzonLCBtZXNzYWdlKTtcbiAgfSxcblxuICBsb2dEZWJ1ZyhjYWxsZXIsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBkYXRlID0gY29sb3JfY29kZVsnRmdDeWFuJ10gKyBgWyR7dGhpcy5nZXRMb2NhbElTT1RpbWVTdGFtcChuZXcgRGF0ZSl9XWA7XG4gICAgY29uc3QgaGVhZCA9IGNvbG9yX2NvZGVbJ1Jlc2V0J10gKyBuYW1lO1xuICAgIGNvbnNvbGUubG9nKGRhdGUgLCdbREVCVUddJywgY2FsbGVyLCAnLScsaGVhZCwgJzonLCBtZXNzYWdlKTtcbiAgfSxcblxuICBsb2dUcmFjZShjYWxsZXIsIG5hbWUsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBkYXRlID0gY29sb3JfY29kZVsnRmdCbHVlJ10gKyBgWyR7dGhpcy5nZXRMb2NhbElTT1RpbWVTdGFtcChuZXcgRGF0ZSl9XWA7XG4gICAgY29uc3QgaGVhZCA9IGNvbG9yX2NvZGVbJ1Jlc2V0J10gKyBuYW1lO1xuICAgIGNvbnNvbGUudHJhY2UoZGF0ZSwgJ1tUUkFDRV0nLCBjYWxsZXIsICctJywgaGVhZCwgJzonLCBtZXNzYWdlKTtcbiAgfSxcblxuICBsb2dJbmZvKGNhbGxlciwgbmFtZSwgbWVzc2FnZSkge1xuICAgIGNvbnN0IGRhdGUgPSBjb2xvcl9jb2RlWydGZ0dyZWVuJ10gKyBgWyR7dGhpcy5nZXRMb2NhbElTT1RpbWVTdGFtcChuZXcgRGF0ZSl9XWA7XG4gICAgY29uc3QgaGVhZCA9IGNvbG9yX2NvZGVbJ1Jlc2V0J10gKyBuYW1lO1xuICAgIGNvbnNvbGUuaW5mbyhkYXRlLCAnW0lORk9dJywgY2FsbGVyLCAnLScsIGhlYWQsICc6JywgbWVzc2FnZSk7XG4gIH0sXG5cbiAgaXModHlwZSwgb2JqKSB7XG4gICAgY29uc3QgY2xhcyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLnNsaWNlKDgsIC0xKTtcbiAgICByZXR1cm4gb2JqICE9PSB1bmRlZmluZWQgJiYgb2JqICE9PSBudWxsICYmIGNsYXMgPT09IHR5cGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvcHkgdGhlIGVudW1lcmFibGUgcHJvcGVydGllcyBvZiBwIHRvIG8sIGFuZCByZXR1cm4gby5cbiAgICogSWYgbyBhbmQgcCBoYXZlIGEgcHJvcGVydHkgYnkgdGhlIHNhbWUgbmFtZSwgbydzIHByb3BlcnR5IGlzIFxuICAgKiBvdmVyd3JpdHRlbi4gVGhpcyBmdW5jdGlvbiBkb2VzIG5vdCBoYW5kbGUgZ2V0dGVycyBhbmQgc2V0dGVycyBcbiAgICogb3IgY29weSBhdHRyaWJ1dGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcGFyYW0ge29iamVjdH0gcFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgZXh0ZW5kKG8sIHApIHtcbiAgICBmb3IobGV0IHByb3AgaW4gcCkgeyAgICAgICAgICAgIC8vIEZvciBhbGwgcHJvcHMgaW4gcC5cbiAgICAgIG9bcHJvcF0gPSBwW3Byb3BdOyAgICAgICAgLy8gQWRkIHRoZSBwcm9wZXJ0eSB0byBvLlxuICAgIH1cbiAgICByZXR1cm4gbztcbiAgfSxcblxuICAvKipcbiAgICogQ29weSB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIHAgdG8gbywgYW5kIHJldHVybiBvLlxuICAgKiBJZiBvIGFuZCBwIGhhdmUgYSBwcm9wZXJ0eSBieSB0aGUgc2FtZSBuYW1lLCBvJ3MgcHJvcGVydHkgaXMgXG4gICAqIGxlZnQgYWxvbmUuIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgaGFuZGxlIGdldHRlcnMgYW5kIHNldHRlcnMgXG4gICAqIG9yIGNvcHkgYXR0cmlidXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9cbiAgICogQHBhcmFtIHtvYmplY3R9IHBcbiAgICogQHJldHVybnMge29iamVjdH1cbiAgICovXG4gIG1lcmdlKG8sIHApIHtcbiAgICBmb3IobGV0ICBwcm9wIGluIHApIHsgICAgICAgICAgICAvLyBGb3IgYWxsIHByb3BzIGluIHAuXG4gICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eVtwcm9wXSkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4Y2VwdCB0aG9zZSBhbHJlYWR5IGluIG8uXG4gICAgICBvW3Byb3BdID0gcFtwcm9wXTsgICAgICAgIC8vIEFkZCB0aGUgcHJvcGVydHkgdG8gby5cbiAgICB9XG4gICAgcmV0dXJuIG87XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZSBwcm9wZXJ0aWVzIGZyb20gbyBpZiB0aGVyZSBpcyBub3QgYSBwcm9wZXJ0eSB3aXRoIHRoZSBcbiAgICogc2FtZSBuYW1lIGluIHAuIFJldHVybiBvLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcGFyYW0ge29iamVjdH0gcFxuICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgKi9cbiAgcmVzdHJpY3QobywgcCkge1xuICAgIGZvcihsZXQgcHJvcCBpbiBvKSB7ICAgICAgICAgICAgLy8gRm9yIGFsbCBwcm9wcyBpbiBvXG4gICAgICBpZiAoIShwcm9wIGluIHApKSBkZWxldGUgb1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIGlmIG5vdCBpbiBwXG4gICAgfVxuICAgIHJldHVybiBvO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3IgZWFjaCBwcm9wZXJ0eSBvZiBwLCBkZWxldGUgdGhlIHByb3BlcnR5IHdpdGggdGhlIHNhbWUgbmFtZSBcbiAgICogZnJvbSBvLiBSZXR1cm4gby5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9cbiAgICogQHBhcmFtIHtvYmplY3R9IHBcbiAgICogQHJldHVybnMge29iamVjdH1cbiAgICovXG4gIHN1YnRyYWN0KG8sIHApIHtcbiAgICBmb3IobGV0IHByb3AgaW4gcCkgeyAgICAgICAgICAgIC8vIEZvciBhbGwgcHJvcHMgaW4gcFxuICAgICAgZGVsZXRlIG9bcHJvcF07ICAgICAgICAgICAvLyBEZWxldGUgZnJvbSBvIChkZWxldGluZyBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vbmV4aXN0ZW50IHByb3AgaXMgaGFybWxlc3MpXG4gICAgfVxuICAgIHJldHVybiBvO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYSBuZXcgb2JqZWN0IHRoYXQgaG9sZHMgdGhlIHByb3BlcnRpZXMgb2YgYm90aCBvIGFuZCBwLlxuICAgKiBJZiBvIGFuZCBwIGhhdmUgcHJvcGVydGllcyBieSB0aGUgc2FtZSBuYW1lLCB0aGUgdmFsdWVzIFxuICAgKiBmcm9tIG8gYXJlIHVzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwXG4gICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAqL1xuICB1bmlvbihvLHApIHtcbiAgICByZXR1cm4gZXh0ZW5kKGV4dGVuZCh7fSxvKSwgcCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJldHVybiBhIG5ldyBvYmplY3QgdGhhdCBob2xkcyBvbmx5IHRoZSBwcm9wZXJ0aWVzIG9mIG8gdGhhdCBcbiAgICogYWxzbyBhcHBlYXIgaW4gcC4gVGhpcyBpcyBzb21ldGhpbmcgbGlrZSB0aGUgaW50ZXJzZWN0aW9uIG9mIG8gXG4gICAqIGFuZCBwLCBidXQgdGhlIHZhbHVlcyBvZiB0aGUgcHJvcGVydGllcyBpbiBwIGFyZSBkaXNjYXJkZWRcbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9cbiAgICogQHBhcmFtIHtvYmplY3R9IHBcbiAgICogQHJldHVybnMge29iamVjdH1cbiAgICovXG4gIGludGVyc2VjdGlvbihvLHApIHsgXG4gICAgcmV0dXJuIHJlc3RyaWN0KGV4dGVuZCh7fSwgbyksIHApOyBcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJuIGFuIGFycmF5IHRoYXQgaG9sZHMgdGhlIG5hbWVzIG9mIHRoZSBlbnVtZXJhYmxlIG93biBcbiAgICogcHJvcGVydGllcyBvZiBvLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb1xuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBrZXlzKG8pIHtcbiAgICBpZiAodHlwZW9mIG8gIT09IFwib2JqZWN0XCIpIHRocm93IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPYmplY3QgYXJndW1lbnQgcmVxdWlyZWRcbiAgICBsZXQgcmVzdWx0ID0gW107ICAgICAgICAgICAgLy8gVGhlIGFycmF5IHdlIHdpbGwgcmV0dXJuXG4gICAgZm9yKGxldCBwcm9wIGluIG8pIHsgICAgICAgIC8vIEZvciBhbGwgZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG4gICAgICBpZiAoby5oYXNPd25Qcm9wZXJ0eShwcm9wKSkgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGl0IGlzIGFuIG93biBwcm9wZXJ0eVxuICAgICAgICByZXN1bHQucHVzaChwcm9wKTsgICAgICAvLyBhZGQgaXQgdG8gdGhlIGFycmF5LlxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0OyAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBhcnJheS5cbiAgfSxcblxuICAvKipcbiAgICogYW5kXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IG9cbiAgICogQHBhcmFtIHthcnJheX0gcFxuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBhbmQobywgcCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSB8fCAhQXJyYXkuaXNBcnJheShwKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgX3AgPSBwLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gX28uY29uY2F0KF9wKVxuICAgICAuZmlsdGVyKGZ1bmN0aW9uKHgsIGksIHkpeyBcbiAgICAgICByZXR1cm4geS5pbmRleE9mKHgpICE9PSB5Lmxhc3RJbmRleE9mKHgpOyB9KVxuICAgICAuZmlsdGVyKGZ1bmN0aW9uKHgsIGksIHkpeyBcbiAgICAgICByZXR1cm4geS5pbmRleE9mKHgpID09PSBpOyB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBkZWxcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcGFyYW0ge2FycmF5fSBwXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIGRlbChvLCBwKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pIHx8ICFBcnJheS5pc0FycmF5KHApKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCBfcCA9IHAuZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCByZXN1bHQgPVxuICAgICBfby5maWx0ZXIoZnVuY3Rpb24oeCwgaSwgeSkgeyByZXR1cm4gX3AuaW5kZXhPZih4KSA9PT0gLTE7IH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGFkZFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEBwYXJhbSB7YXJyYXl9IHBcbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgYWRkKG8sIHApIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobykgfHwgIUFycmF5LmlzQXJyYXkocCkpIHRocm93IFR5cGVFcnJvcigpO1xuICAgIGNvbnN0IF9vID0gby5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IF9wID0gcC5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IHJlc3VsdCA9XG4gICAgIF9wLmZpbHRlcihmdW5jdGlvbih4LCBpLCB5KSB7IHJldHVybiBfby5pbmRleE9mKHgpID09PSAtMTsgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvKipcbiAgICogZGlmXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IG9cbiAgICogQHBhcmFtIHthcnJheX0gcFxuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBkaWYobywgcCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSB8fCAhQXJyYXkuaXNBcnJheShwKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgX3AgPSBwLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgY29uc3QgcmVzdWx0ID1cbiAgICAgIF9vLmZpbHRlcihmdW5jdGlvbih4LCBpLCB5KSB7IHJldHVybiBfcC5pbmRleE9mKHgpID09PSAtMTsgfSlcbiAgICAgLmNvbmNhdChcbiAgICAgICAgX3AuZmlsdGVyKGZ1bmN0aW9uKHgsIGksIHkpIHsgXG4gICAgICAgICAgcmV0dXJuIF9vLmluZGV4T2YoeCkgPT09IC0xOyB9KVxuICAgICAgKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9LFxuXG4gIC8qKlxuICAgKiBkdXBcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcGFyYW0ge2FycmF5fSBwXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIGR1cChvLCBwKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pIHx8ICFBcnJheS5pc0FycmF5KHApKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCBfcCA9IHAuZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICBjb25zdCByZXN1bHQgPSBfby5jb25jYXQoX3ApXG4gICAgIC5maWx0ZXIoZnVuY3Rpb24oeCwgaSwgeSl7IHJldHVybiB5LmluZGV4T2YoeCkgPT09IGk7IH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGRzdC5cbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBkc3QobykgeyBcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobykpIHRocm93IFR5cGVFcnJvcigpO1xuICAgIGNvbnN0IF9vID0gby5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIGNvbnN0IF9wID0gX28uc29ydChmdW5jdGlvbihzLCB0KXtcbiAgICAgIGNvbnN0IGE9cy50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBiPXQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYoYTxiKSByZXR1cm4gLTE7XG4gICAgICBpZihhPmIpIHJldHVybiAxO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgY29uc3QgcmVzdWx0ID0gX3AuZmlsdGVyKGZ1bmN0aW9uKHgsIGksIHkpIHtcbiAgICAgIGlmKGk9PT0wKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiB4IT09eVtpLTFdO1xuICAgIH0pXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSxcblxuICAvKipcbiAgICogb2RlciBieSBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IG9cbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgc29ydFN0cihvKSB7IFxuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgcmV0dXJuIF9vLnNvcnQoZnVuY3Rpb24ocywgdCl7XG4gICAgICBjb25zdCBhPXMudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgYj10LnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmKGE8YikgcmV0dXJuIC0xO1xuICAgICAgaWYoYT5iKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzb3J0IGJ5IG51bWJlcixcbiAgICpcbiAgICogQHBhcmFtIHthcnJheX0gb1xuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBzb3J0TnVtKG8pIHsgXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KG8pKSB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICBjb25zdCBfbyA9IG8uZmlsdGVyKGZ1bmN0aW9uKHgpeyByZXR1cm4geCB9KTtcbiAgICByZXR1cm4gX28uc29ydChmdW5jdGlvbihhLCBiKXtcbiAgICAgIGlmKGE8YikgcmV0dXJuIC0xO1xuICAgICAgaWYoYT5iKSByZXR1cm4gMTtcbiAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzb3J0IHZhbHVlIGJ5IG9iamVjdCBrZXkgc3RyaW5nLFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIHNvcnRPYmpTdHIobywgaykgeyBcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkobykpIHRocm93IFR5cGVFcnJvcigpO1xuICAgIGNvbnN0IF9vID0gby5maWx0ZXIoZnVuY3Rpb24oeCl7IHJldHVybiB4IH0pO1xuICAgIHJldHVybiBfby5zb3J0KGZ1bmN0aW9uKHMsIHQpe1xuICAgICAgY29uc3QgYT1zW2tdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGI9dFtrXS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZihhPGIpIHJldHVybiAtMTtcbiAgICAgIGlmKGE+YikgcmV0dXJuIDE7XG4gICAgICByZXR1cm4gMDtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogc29ydCB2YWx1ZSBieSBvYmplY3Qga2V5IHVuaWNvZGUuLFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBvXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBrXG4gICAqIEByZXR1cm5zIHthcnJheX1cbiAgICovXG4gIHNvcnRPYmpVbmkobywgaykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvKSkgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgY29uc3QgX28gPSBvLmZpbHRlcihmdW5jdGlvbih4KXsgcmV0dXJuIHggfSk7XG4gICAgcmV0dXJuIF9vLnNvcnQoZnVuY3Rpb24ocywgdCkge1xuICAgICAgY29uc3QgYT1zW2tdO1xuICAgICAgY29uc3QgYj10W2tdO1xuICAgICAgaWYoYTxiKSByZXR1cm4gLTE7XG4gICAgICBpZihhPmIpIHJldHVybiAxO1xuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBnZXRUaW1lU3RhbXBcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldFRpbWVTdGFtcCgpIHtcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKCk7XG4gICAgcmV0dXJuIGR0LnRvSVNPU3RyaW5nKCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldExvY2FsVGltZVN0YW1wXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXRMb2NhbFRpbWVTdGFtcChzKSB7XG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShzKTtcbiAgICBjb25zdCBfeXIgPSBkdC5nZXRGdWxsWWVhcigpO1xuICAgIGNvbnN0IF9tbyA9IGR0LmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IF9keSA9IGR0LmdldERhdGUoKTtcbiAgICBjb25zdCBfdG0gPSBkdC50b1RpbWVTdHJpbmcoKS5zcGxpdCgnICcpWzBdO1xuICAgIHJldHVybiBgJHtfeXJ9LSR7X21vfS0ke19keX0gJHtfdG19YDtcbiAgfSxcblxuICAvKipcbiAgICogZ2V0TG9jYWxEYXRlU3RhbXBcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldExvY2FsRGF0ZVN0YW1wKHMpIHtcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKHMpO1xuICAgIGNvbnN0IF9tbyA9IGR0LmdldE1vbnRoKCkgKyAxO1xuICAgIGNvbnN0IF9keSA9IGR0LmdldERhdGUoKTtcbiAgICByZXR1cm4gYCR7X21vfS8ke19keX1gO1xuICB9LFxuXG4gIC8qKlxuICAgKiBzZXRUaW1lU3RhbXBcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNcbiAgICogQHJldHVybnMge29iamVjdH1cbiAgICovXG4gIHNldFRpbWVTdGFtcChzKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IC9eKFxcZCspXFwvKFxcZCspXFwvKFxcZCspJC8uZXhlYyhzKTtcbiAgICBpZighbWF0Y2hlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB5ID0gcGFyc2VJbnQobWF0Y2hlc1sxXSk7XG4gICAgY29uc3QgbSA9IHBhcnNlSW50KG1hdGNoZXNbMl0pO1xuICAgIGNvbnN0IGQgPSBwYXJzZUludChtYXRjaGVzWzNdKTtcbiAgICBpZihtIDwgMSB8fCBtID4gMTIgfHwgZCA8IDEgfHwgZCA+IDMxKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZSh5LCBtIC0gMSwgZCwgMCwgMCwgMCwgMCk7XG4gICAgaWYoZHQuZ2V0RnVsbFllYXIoKSAhPT0geVxuICAgICAgICB8fCBkdC5nZXRNb250aCgpICE9PSBtIC0gMVxuICAgICAgICB8fCBkdC5nZXREYXRlKCkgIT09IGQpXG4gICAge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBkdC50b0lTT1N0cmluZygpO1xuICB9LFxuXG4gIGlzVmFsaWREYXRlKHMpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gL14oXFxkKylcXC8oXFxkKylcXC8oXFxkKykkLy5leGVjKHMpO1xuICAgIGlmKCFtYXRjaGVzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHkgPSBwYXJzZUludChtYXRjaGVzWzFdKTtcbiAgICBjb25zdCBtID0gcGFyc2VJbnQobWF0Y2hlc1syXSk7XG4gICAgY29uc3QgZCA9IHBhcnNlSW50KG1hdGNoZXNbM10pO1xuICAgIGlmKG0gPCAxIHx8IG0gPiAxMiB8fCBkIDwgMSB8fCBkID4gMzEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZSh5LCBtIC0gMSwgZCwgMCwgMCwgMCwgMCk7XG4gICAgaWYoZHQuZ2V0RnVsbFllYXIoKSAhPT0geVxuICAgICAgICB8fCBkdC5nZXRNb250aCgpICE9PSBtIC0gMVxuICAgICAgICB8fCBkdC5nZXREYXRlKCkgIT09IGQpXG4gICAge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICAvKipcbiAgICogU2NoZWR1bGUgYW4gaW52b2NhdGlvbiBvciBpbnZvdmF0aW9ucyBvZiBmbigpIGluIHRoZSBmdXR1cmUuXG4gICAqIE5vdGUgdGhhdCB0aGUgY2FsbCB0byBpbnZva2UoKSBkb2VzIG5vdCBibG9jazogaXQgcmV0dXJucyBcbiAgICogcmlnaHQgYXdheS5cbiAgICpcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gLSBJZiBpbnRlcnZhbCBpcyBzcGVjaWZpZWQgYnV0IGVuZCBpcyBcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIG9taXRlZCwgdGhlbiBuZXZlciBzdG9wIGludm9raW5nIGZuLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIElmIGludGVydmFsIGFuZCBlbmQgYXJlIG9taXRlZCwgdGhlbiBcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGp1c3QgaW52b2tlIGZuIG9uY2UgYWZ0ZXIgc3RhcnQgbXMuXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgSWYgb25seSBmbiBpcyBzcGVjaWZpZWQsIGJlaGF2ZSBhcyBpcyBcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0IHdhcyAwLlxuICAgKiBAcGFyYW0ge251bWJlcn0gcyAtICBXYWl0IHN0YXJ0IG1pbGxpc2Vjb25kcywgdGhlbiBjYWxsIGZuKCkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpIC0gIENhbGwgZm4oKSBldmVyeSBpbnRlcnZhbCBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlIC0gIFN0b3BwaW5nIGFmdGVyIGEgdG90YWwgb2Ygc3RhcnQrZW5kIFxuICAgKiAgICAgICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMuXG4gICAqL1xuICBpbnZva2UoZm4sIHMsIGksIGUpIHtcbiAgICBpZiAoIXMpIHMgPSAwO1xuICAgIHNldFRpbWVvdXQoZm4sIHMpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDMpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBoID0gc2V0SW50ZXJ2YWwoZm4sIGkpO1xuICAgICAgICBpZiAoZSkgc2V0VGltZW91dCgoKSA9PiB7IGNsZWFySW50ZXJ2YWwoaCk7IH0sIGUpO1xuICAgICAgfSwgcyk7XG4gICAgfVxuICB9LFxuXG4gIGludm9rZU1hcChmbiwgcywgaSwgZSkge1xuICAgIGNvbnN0IGFyZ0xlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgaWYoIXMpIHMgPSAwO1xuICAgIGxldCBpZHggPSAwO1xuICAgIHJldHVybiBhcnIgPT4ge1xuICAgICAgY29uc3QgYXJyTGVuID0gYXJyLmxlbmd0aDtcbiAgICAgIGNvbnN0IHNldFRpbWUgPSAob2JqLCBpZHgpID0+IHNldFRpbWVvdXQoZm4uYmluZCh0aGlzLCBvYmopLCBpKmlkeCk7XG4gICAgICBzZXRUaW1lb3V0KGZuLmJpbmQodGhpcywgYXJyLnNoaWZ0KCkpLCBzKTtcbiAgICAgIGlmIChhcmdMZW4gPj0gMykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFyci5mb3JFYWNoKHNldFRpbWUpLCBzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiAtIG1vbml0b3IgY2FsbGJhY2sgKHJldHVybiB0cnVlIG9yIGZhbHNlKS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gcnMgLSByZXNvbHZlIGNhbGxiYWNrIChtb25pdG9yIHJlc3VsdHMpLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByaiAtIHJlamVjdCBjYWxsYmFjayAodGltZSBvdXQpLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlZCAtIGNvbXBsZXRlIGNhbGxiYWNrO1xuICAgKiBAcGFyYW0ge251bWJlcn0gcyAtICBXYWl0IHN0YXJ0IG1pbGxpc2Vjb25kcywgdGhlbiBjYWxsIGZuKCkuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBpIC0gIENhbGwgZm4oKSBldmVyeSBpbnRlcnZhbCBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlIC0gIFN0b3BwaW5nIGFmdGVyIGEgdG90YWwgb2Ygc3RhcnQrZW5kIFxuICAgKiAgICAgICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMuXG4gICAqIFxuICAgKlxuICAgKi9cbiAgaW52b2tlMihmbiwgcnMsIHJqLCBlZCwgcywgaSwgZSkge1xuICAgIGlmICghcykgcyA9IDA7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCBfYSA9IGZuKCk7XG4gICAgICBycyhfYSk7XG4gICAgICBpZihfYSkgcmV0dXJuIGVkKCk7XG4gICAgICBpZighZSkgcmV0dXJuIHJqKHsgbmFtZTogJ0Vycm9yJywgbWVzc2FnZTogJ1RJTUUgT1VUIScgfSk7XG4gICAgfSwgcyk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gNikge1xuICAgICAgbGV0IF9iID0gMDtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBoID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IF9hID0gZm4oKTtcbiAgICAgICAgICBycyhfYSk7XG4gICAgICAgICAgaWYoX2EpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaCk7XG4gICAgICAgICAgICByZXR1cm4gZWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoKGUtcykgPD0gKGkqKytfYikpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaCk7XG4gICAgICAgICAgICByZXR1cm4gcmooeyBuYW1lOiAnRXJyb3InLCBtZXNzYWdlOiAnVElNRSBPVVQhJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIGkpO1xuICAgICAgfSwgcyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBFbmNvZGUgdGhlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0IGFzIGlmIHRoZXkgd2VyZSBuYW1lL3ZhbHVlIFxuICAgKiBwYWlycyBmcm9tIGFuIEhUTUwgZm9ybSwgXG4gICAqIHVzaW5nIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCBmb3JtYXRcbiAgICovXG4gIGVuY29kZUZvcm1EYXRhKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEpIHJldHVybiBcIlwiO1xuICAgIGxldCBwYWlycyA9IFtdO1xuICAgIGZvcihsZXQgbmFtZSBpbiBkYXRhKSB7XG4gICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlO1xuICAgICAgaWYgKHR5cGVvZiBkYXRhW25hbWVdID09PSBcImZ1bmN0aW9uXCIpIGNvbnRpbnVlO1xuICAgICAgbGV0IHZhbHVlID0gZGF0YVtuYW1lXS50b1N0cmluZygpO1xuICAgICAgbmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lLnJlcGxhY2UoXCIgXCIsIFwiK1wiKSk7XG4gICAgICB2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZS5yZXBsYWNlKFwiIFwiLCBcIitcIikpO1xuICAgICAgcGFpcnMucHVzaChuYW1lICsgXCI9XCIgKyB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERlY29kZSBhbiBIVE1MIGZvcm0gYXMgaWYgdGhleSB3ZXJlIG5hbWUvdmFsdWUgcGFpcnMgZnJvbSBcbiAgICogdGhlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0LCBcbiAgICogdXNpbmcgYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGZvcm1hdOKGslxuICAgKi9cbiAgZGVjb2RlRm9ybURhdGEodGV4dCwgc2VwLCBlcSwgaXNEZWNvZGUpIHtcbiAgICB0ZXh0ID0gdGV4dCB8fCBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpO1xuICAgIHNlcCA9IHNlcCB8fCAnJic7XG4gICAgZXEgPSBlcSB8fCAnPSc7XG4gICAgY29uc3QgZGVjb2RlID0gKGlzRGVjb2RlKSA/IGRlY29kZVVSSUNvbXBvbmVudCBcbiAgICAgIDogZnVuY3Rpb24oYSkgeyByZXR1cm4gYTsgfTtcbiAgICByZXR1cm4gdGV4dC5zcGxpdChzZXApLnJlZHVjZShmdW5jdGlvbihvYmosIHYpIHtcbiAgICAgIGNvbnN0IHBhaXIgPSB2LnNwbGl0KGVxKTtcbiAgICAgIG9ialtwYWlyWzBdXSA9IGRlY29kZShwYWlyWzFdKTtcbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSwge30pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZWQgYSByYW5kYW0gY2hhcmFjdGVycywgdXNpbmcgJ01hdGgucmFuZG9tKCknIG1ldGhvZC5cbiAgICogJGxlbmd0aDogbnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gYmUgZ2VuZXJhdGVkLlxuICAgKiBhZGRlZCBbIC8qLSsuLCEjJCUmKCl+fF8gIF0gdG8gbWFrZVJhbmRTdHIuXG4gICAqL1xuICBtYWtlUmFuZFBhc3N3b3JkKGxlbmd0aCkge1xuICAgIGNvbnN0IGNoYXJzID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSkxLTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5LyotKy4sISMkJSYoKX58Xyc7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgIHN0ciArPSBjaGFyc1sgTWF0aC5mbG9vciggTWF0aC5yYW5kb20oKSAqIDc4ICkgXTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfSxcblxuICAvKipcbiAgICogR2VuZXJhdGVkIGEgcmFuZGFtIGNoYXJhY3RlcnMsIHVzaW5nICdNYXRoLnJhbmRvbSgpJyBtZXRob2QuXG4gICAqICRsZW5ndGg6IG51bWJlciBvZiBjaGFyYWN0ZXJzIHRvIGJlIGdlbmVyYXRlZC5cbiAgICovXG4gIG1ha2VSYW5kU3RyKGxlbmd0aCkge1xuICAgIGNvbnN0IGNoYXJzID1cbiAgJ2FiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSkxLTU5PUFFSU1RVVldYWVowMTIzNDU2Nzg5JztcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgc3RyICs9IGNoYXJzWyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogNjIgKSBdO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZWQgYSByYW5kYW0gY2hhcmFjdGVycywgdXNpbmcgJ01hdGgucmFuZG9tKCknIG1ldGhvZC5cbiAgICogJGxlbmd0aDogbnVtYmVyIG9mIGNoYXJhY3RlcnMgdG8gYmUgZ2VuZXJhdGVkLlxuICAgKi9cbiAgbWFrZVJhbmRJbnQobGVuZ3RoKSB7XG4gICAgY29uc3QgY2hhcnMgPSAnMTIzNDU2Nzg5JztcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgc3RyICs9IGNoYXJzWyBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogOSApIF07XG4gICAgfVxuICAgIHJldHVybiBwYXJzZUludChzdHIsIDEwKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZXR1cm4gYSBjaGFyYWN0ZXIgc3RyaW5nIGRlY29kZWQgZnJvbSBCYXNlIDY0LlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gQmFzZTY0IGNoYXJhY3RvciBzdHJpbmcuXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gIGRlY29kZV9iYXNlNjQoc3RyaW5nKSB7XG4gICAgY29uc3QgYiA9IEJ1ZmZlci5mcm9tKHN0cmluZywgJ2Jhc2U2NCcpXG4gICAgcmV0dXJuIGIudG9TdHJpbmcoKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgY2hhcmFjdGVyIHN0cmluZyBlbmNvZGVkIHRvIEJBU0UgNjQuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBBc2NpaSBjaGFyYWN0b3Igc3RyaW5nLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBlbmNvZGVfYmFzZTY0KHN0cmluZykge1xuICAgIGNvbnN0IGIgPSBCdWZmZXIuZnJvbShzdHJpbmcpO1xuICAgIHJldHVybiBiLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gY29tYmluZXMgdHdvIGZ1bmN0aW9ucy5cbiAgICogXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGpvaW4gLSBmb3JrLWpvaW4gZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMxIC0gZnVuY3Rpb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMyIC0gZnVuY3Rpb24uXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufVxuICAgKi9cbiAgZm9yayhqb2luLCBmdW5jMSwgZnVuYzIpIHtcbiAgICByZXR1cm4gdmFsID0+IGpvaW4oZnVuYzEodmFsKSwgZnVuYzIodmFsKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRvIHNvcnQgdGhlIGtleSBvZiB0aGUgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb2JqIC0gb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IFxuICAgKi9cbiAga3NvcnQob2JqKXtcbiAgICBjb25zdCBrZXlzID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnNvcnQoKTtcbiAgICBsZXQgcmVzID0ge307XG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHJlc1trZXldID0gb2JqW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSxcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCByZXR1cm4gYSBjaGFyYWN0ZXIgc3RyaW5nIGVuY29kZSBcbiAgICogZnJvbSBBc3NvY2lhdGl2ZSBhcnJheSBvYmplY3QuXG4gICAqIFxuICAgKiBAcGFyYW0ge29iamN0fSBvYmogLSBxdWVyeSBwYXJhbWV0ZXIgb2JqZWN0LlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICB1cmxlbmNvZGUob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBcIlwiO1xuICAgIGxldCBwYWlycyA9IFtdO1xuICAgIGZvcihsZXQgbmFtZSBpbiBvYmopIHtcbiAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KG5hbWUpKSBjb250aW51ZTtcbiAgICAgIGlmICh0eXBlb2Ygb2JqW25hbWVdID09PSBcImZ1bmN0aW9uXCIpIGNvbnRpbnVlO1xuICAgICAgbGV0IHZhbHVlID0gb2JqW25hbWVdLnRvU3RyaW5nKCk7XG4gICAgICBuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpO1xuICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgcGFpcnMucHVzaChuYW1lICsgXCI9XCIgKyB2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBwYWlycy5qb2luKCcmJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJuIGEgY2hhcmFjdGVyIHN0cmluZyBlbmNvZGUgXG4gICAqIGZyb20gQXNzb2NpYXRpdmUgYXJyYXkgb2JqZWN0LlxuICAgKiBcbiAgICogQHBhcmFtIHtvYmpjdH0gb2JqIC0gcXVlcnkgcGFyYW1ldGVyIG9iamVjdC5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdXJsZW5jb2RlX2Zha2Uob2JqKSB7XG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIGZvcihsZXQga2V5IGluIG9iaikge1xuICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cy5tYXAoKGtleSwgaWR4KSA9PiBgJHtrZXl9PSR7b2JqW2tleV19YClcbiAgICAgIC5tYXAocGFpciA9PiBwYWlyLnJlcGxhY2UoXCIgXCIsIFwiK1wiKSlcbiAgICAgIC5qb2luKCcmJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJuIGEgY2hhcmFjdGVyIHN0cmluZyBlbmNvZGUgXG4gICAqIGZyb20gQXNzb2NpYXRpdmUgYXJyYXkgb2JqZWN0LlxuICAgKiBcbiAgICogQHBhcmFtIHtvYmpjdH0gb2JqIC0gcXVlcnkgcGFyYW1ldGVyIG9iamVjdC5cbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgdXJsZW5jb2RlX3JmYzM5ODYob2JqKSB7XG4gICAgcmV0dXJuIHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeShvYmopO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgYSBjaGFyYWN0ZXIgc3RyaW5nIGVuY29kZWQgdG8gc2hhMjU2IGhhc2guIFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIC0gc3RyaW5nIHRvIGJlIGNvbnZlcnRlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3JldF9rZXkgLSBzZWNyZXQga2V5IHN0cmluZyByZXF1aXJlZCBmb3IgY29udmVyc2lvbi5cbiAgICovXG4gIGNyeXB0b19zaGEyNTYoc3RyaW5nLCBzZWNyZXRfa2V5KSB7XG4gICAgcmV0dXJuIGNyeXB0b1xuICAgICAgLmNyZWF0ZUhtYWMoJ3NoYTI1NicsIHNlY3JldF9rZXkpXG4gICAgICAudXBkYXRlKHN0cmluZylcbiAgICAgIC5kaWdlc3QoJ2Jhc2U2NCcpO1xuICB9LFxuXG4gIGNyeXB0b19wYmtkZjIocGFzcywgc2FsdCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHJhbmRvbSA9IGNiayA9PiBjcnlwdG8ucmFuZG9tQnl0ZXMoMTI4LCBjYmspO1xuICAgICAgY29uc3QgcGJrZGYyID0gKHNsdCwgY2JrKSA9PlxuICAgICAgICBjcnlwdG8ucGJrZGYyKHBhc3MsIHNsdCwgNzAwMCwgbGVuZ3RoLCAnc2hhMjU2JywgY2JrKTtcbiAgICAgIGNvbnN0IGJpbjJzdHIgPSBiaW4gPT4gQnVmZmVyLmZyb20oYmluKS50b1N0cmluZygnaGV4Jyk7XG4gICAgICBpZihzYWx0KSB7XG4gICAgICAgIHBia2RmMihzYWx0LCAoZXJyLCBfaGFzaCkgPT4ge1xuICAgICAgICAgIGlmKGVycikgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgIHJlc29sdmUoeyBzYWx0LCBoYXNoOiBiaW4yc3RyKF9oYXNoKSB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5kb20oKGVyciwgX3NhbHQpID0+IHtcbiAgICAgICAgICBzYWx0ID0gYmluMnN0cihfc2FsdCk7XG4gICAgICAgICAgcGJrZGYyKHNhbHQsIChlcnIsIF9oYXNoKSA9PiB7XG4gICAgICAgICAgICBpZihlcnIpIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIHJlc29sdmUoeyBzYWx0LCBoYXNoOiBiaW4yc3RyKF9oYXNoKSB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0aGF0IHJldHVybnMgaW5zdGFuY2UuIFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdXJsIGNoYXJhY3RlciBzdHJpbmcuXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSByZXR1cm4gdXJsIGluc3RhbmNlLlxuICAgKi9cbiAgcGFyc2VfdXJsKHVybCkge1xuICAgIHJldHVybiBuZXcgVVJMKHVybCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIHRoYXQgcmV0dXJucyBpbnN0YW5jZS4gXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBxdWVyeSAtIHNlYXJjaCBxdWVyeSBvYmplY3QuXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSByZXR1cm4gVVJMU2VhcmNoUGFyYW1zIGluc3RhbmNlLlxuICAgKi9cbiAgcGFyc2VfcXVlcnkocXVlcnkpIHtcbiAgICByZXR1cm4gbmV3IFVSTFNlYXJjaFBhcmFtcyhxdWVyeSk7XG4gIH0sXG5cbiAgZ2V0TG9jYWxJU09UaW1lU3RhbXAgKGRhdGUpIHtcbiAgICBjb25zdCBzZXREYXRlID0gW1xuICAgICAgZGF0ZS5nZXRGdWxsWWVhcigpXG4gICAgLCAoJzAwJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSkuc3Vic3RyKC0yKVxuICAgICwgKCcwMCcgKyBkYXRlLmdldERhdGUoKSkuc3Vic3RyKC0yKVxuICAgIF07XG4gICAgY29uc3Qgc2V0VGltZSA9IFtcbiAgICAgICgnMDAnICsgZGF0ZS5nZXRIb3VycygpKS5zdWJzdHIoLTIpXG4gICAgLCAoJzAwJyArIGRhdGUuZ2V0TWludXRlcygpKS5zdWJzdHIoLTIpXG4gICAgLCAoJzAwJyArIGRhdGUuZ2V0U2Vjb25kcygpKS5zdWJzdHIoLTIpXG4gICAgLCAoJzAwJyArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpLnN1YnN0cigtMylcbiAgICBdO1xuICAgIHJldHVybiBbXG4gICAgICBzZXREYXRlLmpvaW4oJy0nKSwgJ1QnLCBzZXRUaW1lLmpvaW4oJzonKVxuICAgIF0uam9pbignJyk7XG4gIH0sXG5cbiAgZ2V0TG9jYWxJU09ab25lU3RhbXAgKGRhdGUpIHtcbiAgICBjb25zdCBzZXRPZmZzZXQgPSBkID0+IHtcbiAgICAgIGNvbnN0IG8gPSBkLmdldFRpbWV6b25lT2Zmc2V0KCkgLyAtNjA7XG4gICAgICByZXR1cm4gKCgwIDwgbykgPyAnKycgOiAnLScpXG4gICAgICAgICsgKCcwMCcgKyBNYXRoLmFicyhvKSkuc3Vic3RyKC0yKSArICc6MDAnOyB9O1xuICAgIGNvbnN0IHNldERhdGUgPSBbXG4gICAgICBkYXRlLmdldEZ1bGxZZWFyKClcbiAgICAsICgnMDAnICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpKS5zdWJzdHIoLTIpXG4gICAgLCAoJzAwJyArIGRhdGUuZ2V0RGF0ZSgpKS5zdWJzdHIoLTIpXG4gICAgXTtcbiAgICBjb25zdCBzZXRUaW1lID0gW1xuICAgICAgKCcwMCcgKyBkYXRlLmdldEhvdXJzKCkpLnN1YnN0cigtMilcbiAgICAsICgnMDAnICsgZGF0ZS5nZXRNaW51dGVzKCkpLnN1YnN0cigtMilcbiAgICAsICgnMDAnICsgZGF0ZS5nZXRTZWNvbmRzKCkpLnN1YnN0cigtMilcbiAgICAsICgnMDAwJyArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpLnN1YnN0cigtMylcbiAgICBdO1xuICAgIHJldHVybiBbXG4gICAgICBzZXREYXRlLmpvaW4oJy0nKSwgJ1QnLCBzZXRUaW1lLmpvaW4oJzonKSwgc2V0T2Zmc2V0KGRhdGUpXG4gICAgXS5qb2luKCcnKTtcbiAgfSxcblxuICAvKlxuICAgKiBleCkgZm9ybWF0RGF0ZShuZXcgRGF0ZSgnMjAxNS8wMy8wNCcpLCAnTU1NIGR0LCB5eXl5IFt3XScpO1xuICAgKiA9PiBcIk1hciA0dGgsIDIwMTUgW1dlZF1cIlxuICAgKiBAcGFyYW0ge2RhdGV9IGRhdGUgLSBkYXRlIGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0IC0gZGF0ZSBmb3JtYXQuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gLSBmb3JtYXRlZCBkYXRlIHN0cmluZy5cbiAgICovXG4gIGZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0KSB7XG4gICAgcmV0dXJuIGRhdGVGb3JtYXQuZm9ybWF0KGRhdGUsIGZvcm1hdCk7XG4gIH0sXG5cbiAgZm9ybWF0TnVtYmVyKG51bSwgZm9ybWF0KSB7XG4gICAgcmV0dXJuIG51bUZvcm1hdC5mb3JtYXQobnVtLCBmb3JtYXQpO1xuICB9LFxuICBcbiAgcmVnZXhaaXAocG9zdGFsX2NvZGUsIGNvdW50cnlfY29kZSkge1xuICAgIHJldHVybiB6aXBSZWdleC5yZWdleChjb3VudHJ5X2NvZGUsIHBvc3RhbF9jb2RlKTtcbiAgfSxcblxuICAvL3JlZ2V4UGhvbmUocGhvbmVfbnVtYmVyLCBjb3VudHJ5X2NvZGUpIHtcbiAgLy8gIHJldHVybiAvXltcXGQsLV0rJC8udGVzdChwaG9uZV9udW1iZXIpO1xuICAvL31cblxuICByZWdleE51bWJlcihudW1iZXIpIHtcbiAgICByZXR1cm4gL15bXFxkLC1dKyQvLnRlc3QobnVtYmVyKTtcbiAgfSxcblxuICByZWdleEVtYWlsKGFkZHJlc3MpIHtcbiAgICByZXR1cm4gL15bLWEtejAtOX4hJCVeJipfPSt9e1xcJz9dKyhcXC5bLWEtejAtOX4hJCVeJipfPSt9e1xcJz9dKykqQChbYS16MC05X11bYS16MC05X10qKFxcLlstYS16MC05X10rKSpcXC4oYWVyb3xhcnBhfGJpenxjb218Y29vcHxlZHV8Z292fGluZm98aW50fG1pbHxtdXNldW18bmFtZXxuZXR8b3JnfHByb3x0cmF2ZWx8bW9iaXxbYS16XVthLXpdKXwoWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfSkpKDpbMC05XXsxLDV9KT8kL2kudGVzdChhZGRyZXNzKTtcbiAgfVxuXG59O1xuZXhwb3J0IGRlZmF1bHQgc3RkO1xuXG5jb25zdCBudW1Gb3JtYXQgPSB7XG4gIGZtdDoge1xuICAgIGRkZGRkOiBmdW5jdGlvbihudW0pIHsgcmV0dXJuICgnMDAwMCcgKyBudW0pLnNsaWNlKC01KTsgfSxcbiAgICBkZGRkOiBmdW5jdGlvbihudW0pIHsgcmV0dXJuICgnMDAwJyArIG51bSkuc2xpY2UoLTQpOyB9LFxuICAgIGRkZDogZnVuY3Rpb24obnVtKSB7IHJldHVybiAoJzAwJyArIG51bSkuc2xpY2UoLTMpOyB9LFxuICAgIGRkOiBmdW5jdGlvbihudW0pIHsgcmV0dXJuICgnMCcgKyBudW0pLnNsaWNlKC0yKTsgfSxcbiAgICB0OiBmdW5jdGlvbihudW0pIHsgcmV0dXJuIG51bVxuICAgICAgICAudG9TdHJpbmcoKS5yZXBsYWNlKC8oXFxkKSg/PShcXGR7M30pKyg/IVxcZCkpL2csIFwiJDEsXCIpOyB9XG4gIH0sXG4gIGZvcm1hdDogZnVuY3Rpb24gbnVtRm9ybWF0IChudW0sIGZvcm1hdCkge1xuICAgIGxldCByZXN1bHQgPSBmb3JtYXQ7XG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMuZm10KVxuICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2Uoa2V5LCB0aGlzLmZtdFtrZXldKG51bSkpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07XG5cbi8qXG4gKiBzdGQuZGF0ZUZvcm1hdChuZXcgRGF0ZSgpLCAnWVlZWS9NTS9ERCBoaDptbScpO1xuICpcbiAqLyBcbmNvbnN0IGRhdGVGb3JtYXQgPSB7XG4gIGZtdCA6IHtcbiAgICBoaDogICBmdW5jdGlvbihkYXRlKSB7IHJldHVybiAoJzAnICsgZGF0ZS5nZXRIb3VycygpKS5zbGljZSgtMik7IH0sXG4gICAgaDogICAgZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRIb3VycygpOyB9LFxuICAgIG1tOiAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuICgnMCcgKyBkYXRlLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpOyB9LFxuICAgIG06ICAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0TWludXRlcygpOyB9LFxuICAgIHNzOiAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuICgnMCcgKyBkYXRlLmdldFNlY29uZHMoKSkuc2xpY2UoLTIpOyB9LFxuICAgIHM6ICAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpOyB9LFxuICAgIGNjYzogIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiAoJzAwJyArIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpLnNsaWNlKC0zKTtcbiAgICB9LFxuICAgIEREOiAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuICgnMCcgKyBkYXRlLmdldERhdGUoKSkuc2xpY2UoLTIpOyB9LFxuICAgIEQ6ICAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpOyB9LFxuICAgIFlZWVk6IGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKSArICcnOyB9LFxuICAgIFlZOiAgIGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKS0yMDAwICsgJyc7IH0sXG4gICAgdDogICAgZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpPD0zXG4gICAgICAgID8gW1wic3RcIiwgXCJuZFwiLCBcInJkXCJdW2RhdGUuZ2V0RGF0ZSgpLTFdOiAndGgnO1xuICAgIH0sXG4gICAgdzogICAgZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgXCJTdW5cIiwgXCIkb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIlxuICAgICAgXVtkYXRlLmdldERheSgpXTtcbiAgICB9LFxuICAgIE1NTU06IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBbXG4gICAgICAgIFwiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiJGFyY2hcIiwgXCJBcHJpbFwiLCBcIiRheVwiLCBcIkp1bmVcIiwgXCJKdWx5XCJcbiAgICAgICwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG4gICAgICBdW2RhdGUuZ2V0TW9udGgoKV07XG4gICAgfSxcbiAgICBNTU06ICBmdW5jdGlvbihkYXRlKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBcIkphblwiLCBcIkZlYlwiLCBcIiRhclwiLCBcIkFwclwiLCBcIkBheVwiLCBcIkp1blwiLCBcIkpseVwiLCBcIkF1Z1wiLCBcIlNwdFwiXG4gICAgICAsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJcbiAgICAgIF1bZGF0ZS5nZXRNb250aCgpXTtcbiAgICB9LCAgXG4gICAgTU06ICAgZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgcmV0dXJuICgnMCcgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkpLnNsaWNlKC0yKTtcbiAgICB9LFxuICAgIE06IGZ1bmN0aW9uKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDE7IH0sXG4gICAgJDogZnVuY3Rpb24oZGF0ZSkgeyByZXR1cm4gJ00nOyB9XG4gIH0sXG4gIGZvcm1hdDpmdW5jdGlvbiBkYXRlRm9ybWF0IChkYXRlLCBmb3JtYXQpIHtcbiAgICBsZXQgcmVzdWx0ID0gZm9ybWF0O1xuICAgIGZvciAobGV0IGtleSBpbiB0aGlzLmZtdClcbiAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKGtleSwgdGhpcy5mbXRba2V5XShkYXRlKSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufTtcblxuY29uc3QgemlwUmVnZXggPSB7XG4gIHJlZzoge1xuICAgIFwiR0JcIjpcIkdJUlsgXT8wQUF8KChBQnxBTHxCfEJBfEJCfEJEfEJIfEJMfEJOfEJSfEJTfEJUfENBfENCfENGfENIfENNfENPfENSfENUfENWfENXfERBfEREfERFfERHfERIfERMfEROfERUfERZfEV8RUN8RUh8RU58RVh8Rkt8Rll8R3xHTHxHWXxHVXxIQXxIRHxIR3xIUHxIUnxIU3xIVXxIWHxJR3xJTXxJUHxJVnxKRXxLQXxLVHxLV3xLWXxMfExBfExEfExFfExMfExOfExTfExVfE18TUV8TUt8TUx8TnxORXxOR3xOTnxOUHxOUnxOV3xPTHxPWHxQQXxQRXxQSHxQTHxQT3xQUnxSR3xSSHxSTXxTfFNBfFNFfFNHfFNLfFNMfFNNfFNOfFNPfFNQfFNSfFNTfFNUfFNXfFNZfFRBfFREfFRGfFROfFRRfFRSfFRTfFRXfFVCfFd8V0F8V0N8V0R8V0Z8V058V1J8V1N8V1Z8WU98WkUpKFxcXFxkW1xcXFxkQS1aXT9bIF0/XFxcXGRbQUJELUhKTE4tVVctWl17Mn0pKXxCRlBPWyBdP1xcXFxkezEsNH1cIixcbiAgICBcIkpFXCI6XCJKRVxcXFxkW1xcXFxkQS1aXT9bIF0/XFxcXGRbQUJELUhKTE4tVVctWl17Mn1cIixcbiAgICBcIkdHXCI6XCJHWVxcXFxkW1xcXFxkQS1aXT9bIF0/XFxcXGRbQUJELUhKTE4tVVctWl17Mn1cIixcbiAgICBcIklNXCI6XCJJTVxcXFxkW1xcXFxkQS1aXT9bIF0/XFxcXGRbQUJELUhKTE4tVVctWl17Mn1cIixcbiAgICBcIlVTXCI6XCJcXFxcZHs1fShbIFxcXFwtXVxcXFxkezR9KT9cIixcbiAgICBcIkNBXCI6XCJbQUJDRUdISktMTU5QUlNUVlhZXVxcXFxkW0FCQ0VHSEotTlBSU1RWLVpdWyBdP1xcXFxkW0FCQ0VHSEotTlBSU1RWLVpdXFxcXGRcIixcbiAgICBcIkRFXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiSlBcIjpcIlxcXFxkezN9LVxcXFxkezR9XCIsXG4gICAgXCJGUlwiOlwiXFxcXGR7Mn1bIF0/XFxcXGR7M31cIixcbiAgICBcIkFVXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiSVRcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJDSFwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkFUXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiRVNcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJOTFwiOlwiXFxcXGR7NH1bIF0/W0EtWl17Mn1cIixcbiAgICBcIkJFXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiREtcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJTRVwiOlwiXFxcXGR7M31bIF0/XFxcXGR7Mn1cIixcbiAgICBcIk5PXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiQlJcIjpcIlxcXFxkezV9W1xcXFwtXT9cXFxcZHszfVwiLFxuICAgIFwiUFRcIjpcIlxcXFxkezR9KFtcXFxcLV1cXFxcZHszfSk/XCIsXG4gICAgXCJGSVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkFYXCI6XCIyMlxcXFxkezN9XCIsXG4gICAgXCJLUlwiOlwiXFxcXGR7M31bXFxcXC1dXFxcXGR7M31cIixcbiAgICBcIkNOXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiVFdcIjpcIlxcXFxkezN9KFxcXFxkezJ9KT9cIixcbiAgICBcIlNHXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiRFpcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJBRFwiOlwiQURcXFxcZHszfVwiLFxuICAgIFwiQVJcIjpcIihbQS1ISi1OUC1aXSk/XFxcXGR7NH0oW0EtWl17M30pP1wiLFxuICAgIFwiQU1cIjpcIigzNyk/XFxcXGR7NH1cIixcbiAgICBcIkFaXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiQkhcIjpcIigoMVswLTJdfFsyLTldKVxcXFxkezJ9KT9cIixcbiAgICBcIkJEXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiQkJcIjpcIihCQlxcXFxkezV9KT9cIixcbiAgICBcIkJZXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiQk1cIjpcIltBLVpdezJ9WyBdP1tBLVowLTldezJ9XCIsXG4gICAgXCJCQVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIklPXCI6XCJCQk5EIDFaWlwiLFxuICAgIFwiQk5cIjpcIltBLVpdezJ9WyBdP1xcXFxkezR9XCIsXG4gICAgXCJCR1wiOlwiXFxcXGR7NH1cIixcbiAgICBcIktIXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiQ1ZcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJDTFwiOlwiXFxcXGR7N31cIixcbiAgICBcIkNSXCI6XCJcXFxcZHs0LDV9fFxcXFxkezN9LVxcXFxkezR9XCIsXG4gICAgXCJIUlwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkNZXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiQ1pcIjpcIlxcXFxkezN9WyBdP1xcXFxkezJ9XCIsXG4gICAgXCJET1wiOlwiXFxcXGR7NX1cIixcbiAgICBcIkVDXCI6XCIoW0EtWl1cXFxcZHs0fVtBLVpdfCg/OltBLVpdezJ9KT9cXFxcZHs2fSk/XCIsXG4gICAgXCJFR1wiOlwiXFxcXGR7NX1cIixcbiAgICBcIkVFXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiRk9cIjpcIlxcXFxkezN9XCIsXG4gICAgXCJHRVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkdSXCI6XCJcXFxcZHszfVsgXT9cXFxcZHsyfVwiLFxuICAgIFwiR0xcIjpcIjM5XFxcXGR7Mn1cIixcbiAgICBcIkdUXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiSFRcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJITlwiOlwiKD86XFxcXGR7NX0pP1wiLFxuICAgIFwiSFVcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJJU1wiOlwiXFxcXGR7M31cIixcbiAgICBcIklOXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiSURcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJJTFwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkpPXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiS1pcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJLRVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIktXXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiTEFcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJMVlwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkxCXCI6XCIoXFxcXGR7NH0oWyBdP1xcXFxkezR9KT8pP1wiLFxuICAgIFwiTElcIjpcIig5NDhbNS05XSl8KDk0OVswLTddKVwiLFxuICAgIFwiTFRcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJMVVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIk1LXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiTVlcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJNVlwiOlwiXFxcXGR7NX1cIixcbiAgICBcIk1UXCI6XCJbQS1aXXszfVsgXT9cXFxcZHsyLDR9XCIsXG4gICAgXCJNVVwiOlwiKFxcXFxkezN9W0EtWl17Mn1cXFxcZHszfSk/XCIsXG4gICAgXCJNWFwiOlwiXFxcXGR7NX1cIixcbiAgICBcIk1EXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiTUNcIjpcIjk4MFxcXFxkezJ9XCIsXG4gICAgXCJNQVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIk5QXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiTlpcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJOSVwiOlwiKChcXFxcZHs0fS0pP1xcXFxkezN9LVxcXFxkezN9KC1cXFxcZHsxfSk/KT9cIixcbiAgICBcIk5HXCI6XCIoXFxcXGR7Nn0pP1wiLFxuICAgIFwiT01cIjpcIihQQyApP1xcXFxkezN9XCIsXG4gICAgXCJQS1wiOlwiXFxcXGR7NX1cIixcbiAgICBcIlBZXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiUEhcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJQTFwiOlwiXFxcXGR7Mn0tXFxcXGR7M31cIixcbiAgICBcIlBSXCI6XCIwMFs2NzldXFxcXGR7Mn0oWyBcXFxcLV1cXFxcZHs0fSk/XCIsXG4gICAgXCJST1wiOlwiXFxcXGR7Nn1cIixcbiAgICBcIlJVXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiU01cIjpcIjQ3ODlcXFxcZFwiLFxuICAgIFwiU0FcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJTTlwiOlwiXFxcXGR7NX1cIixcbiAgICBcIlNLXCI6XCJcXFxcZHszfVsgXT9cXFxcZHsyfVwiLFxuICAgIFwiU0lcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJaQVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIkxLXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiVEpcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJUSFwiOlwiXFxcXGR7NX1cIixcbiAgICBcIlROXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiVFJcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJUTVwiOlwiXFxcXGR7Nn1cIixcbiAgICBcIlVBXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiVVlcIjpcIlxcXFxkezV9XCIsXG4gICAgXCJVWlwiOlwiXFxcXGR7Nn1cIixcbiAgICBcIlZBXCI6XCIwMDEyMFwiLFxuICAgIFwiVkVcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJaTVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIkFTXCI6XCI5Njc5OVwiLFxuICAgIFwiQ0NcIjpcIjY3OTlcIixcbiAgICBcIkNLXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiUlNcIjpcIlxcXFxkezZ9XCIsXG4gICAgXCJNRVwiOlwiOFxcXFxkezR9XCIsXG4gICAgXCJDU1wiOlwiXFxcXGR7NX1cIixcbiAgICBcIllVXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiQ1hcIjpcIjY3OThcIixcbiAgICBcIkVUXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiRktcIjpcIkZJUVEgMVpaXCIsXG4gICAgXCJORlwiOlwiMjg5OVwiLFxuICAgIFwiRk1cIjpcIig5Njk0WzEtNF0pKFsgXFxcXC1dXFxcXGR7NH0pP1wiLFxuICAgIFwiR0ZcIjpcIjlbNzhdM1xcXFxkezJ9XCIsXG4gICAgXCJHTlwiOlwiXFxcXGR7M31cIixcbiAgICBcIkdQXCI6XCI5Wzc4XVswMV1cXFxcZHsyfVwiLFxuICAgIFwiR1NcIjpcIlNJUVEgMVpaXCIsXG4gICAgXCJHVVwiOlwiOTY5WzEyM11cXFxcZChbIFxcXFwtXVxcXFxkezR9KT9cIixcbiAgICBcIkdXXCI6XCJcXFxcZHs0fVwiLFxuICAgIFwiSE1cIjpcIlxcXFxkezR9XCIsXG4gICAgXCJJUVwiOlwiXFxcXGR7NX1cIixcbiAgICBcIktHXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiTFJcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJMU1wiOlwiXFxcXGR7M31cIixcbiAgICBcIk1HXCI6XCJcXFxcZHszfVwiLFxuICAgIFwiTUhcIjpcIjk2OVs2N11cXFxcZChbIFxcXFwtXVxcXFxkezR9KT9cIixcbiAgICBcIk1OXCI6XCJcXFxcZHs2fVwiLFxuICAgIFwiTVBcIjpcIjk2OTVbMDEyXShbIFxcXFwtXVxcXFxkezR9KT9cIixcbiAgICBcIk1RXCI6XCI5Wzc4XTJcXFxcZHsyfVwiLFxuICAgIFwiTkNcIjpcIjk4OFxcXFxkezJ9XCIsXG4gICAgXCJORVwiOlwiXFxcXGR7NH1cIixcbiAgICBcIlZJXCI6XCIwMDgoKFswLTRdXFxcXGQpfCg1WzAxXSkpKFsgXFxcXC1dXFxcXGR7NH0pP1wiLFxuICAgIFwiUEZcIjpcIjk4N1xcXFxkezJ9XCIsXG4gICAgXCJQR1wiOlwiXFxcXGR7M31cIixcbiAgICBcIlBNXCI6XCI5Wzc4XTVcXFxcZHsyfVwiLFxuICAgIFwiUE5cIjpcIlBDUk4gMVpaXCIsXG4gICAgXCJQV1wiOlwiOTY5NDBcIixcbiAgICBcIlJFXCI6XCI5Wzc4XTRcXFxcZHsyfVwiLFxuICAgIFwiU0hcIjpcIihBU0NOfFNUSEwpIDFaWlwiLFxuICAgIFwiU0pcIjpcIlxcXFxkezR9XCIsXG4gICAgXCJTT1wiOlwiXFxcXGR7NX1cIixcbiAgICBcIlNaXCI6XCJbSExNU11cXFxcZHszfVwiLFxuICAgIFwiVENcIjpcIlRLQ0EgMVpaXCIsXG4gICAgXCJXRlwiOlwiOTg2XFxcXGR7Mn1cIixcbiAgICBcIlhLXCI6XCJcXFxcZHs1fVwiLFxuICAgIFwiWVRcIjpcIjk3NlxcXFxkezJ9XCIsXG4gICAgXCJaWlwiOlwiW1xcXFxkLC1dK1wiXG4gIH0sXG4gIHJlZ2V4OiBmdW5jdGlvbihjb3VudHJ5X2NvZGUsIHBvc3RhbF9jb2RlKSB7XG4gICAgY29uc3QgcmVnID0gdGhpcy5yZWdbY291bnRyeV9jb2RlXVxuICAgICAgPyB0aGlzLnJlZ1tjb3VudHJ5X2NvZGVdIDogdGhpcy5yZWdbJ1paJ11cbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicrcmVnKyckJykudGVzdChwb3N0YWxfY29kZSk7IH1cbn07XG4iLCJpbXBvcnQgeyBwYXJzZSB9ICBmcm9tICdpc284NjAxLWR1cmF0aW9uJztcbmltcG9ydCBTcGlubmVyICAgIGZyb20gJ1V0aWxpdGllcy9zcGluJztcblxubGV0IExvZ2dlciA9IG51bGw7XG5sZXQgU3BpbmVyID0gbnVsbDtcbmxldCB0YXJnZXQgPSBudWxsO1xuXG5jb25zdCB1dGlsID0ge1xuICBnZXRDU1ZIZWFkZXIob2JqKSB7XG4gICAgbGV0IGFyciA9IG5ldyBBcnJheSgpO1xuICAgIGZvcihsZXQgcHJvcCBpbiBvYmopIHtcbiAgICAgIGFyci5wdXNoKHByb3ApO1xuICAgIH1cbiAgICByZXR1cm4gYXJyLmpvaW4oKSArICdcXG4nO1xuICB9LFxuICBzZXRDU1ZIZWFkZXIob2Jqcykge1xuICAgIGxldCBhcnIgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IHByb3AgaW4gb2Jqc1swXSkge1xuICAgICAgYXJyLnB1c2gocHJvcCk7XG4gICAgfVxuICAgIG9iai51bnNoaWZ0KGFycik7XG4gICAgcmV0dXJuIG9ianM7XG4gIH0sXG4gIHRvTGVmdERheXMoZGF0ZSkge1xuICAgIGNvbnN0IG9iaiA9IHBhcnNlKGRhdGUpO1xuICAgIHJldHVybiAoXG4gICAgICAgIGAke29iai5kYXlzfSBkYXlzYCArICcgLyAnXG4gICAgICArIGAke29iai5ob3Vyc30gaG91cnNgICsgJyAvICdcbiAgICAgICsgYCR7b2JqLm1pbnV0ZXN9IG1pbnV0ZXNgKTtcbiAgfVxufTtcblxuY29uc3QgTSA9IHtcbiAgZm9yayhqb2luLCBmdW5jMSwgZnVuYzIpIHtcbiAgICByZXR1cm4gdmFsID0+IGpvaW4oZnVuYzEodmFsKSwgZnVuYzIodmFsKSk7XG4gIH1cbn07XG5cbmNvbnN0IGxvZyA9IHtcbiAgTG9nZ2VyLFxuICBjb25maWcoYXBkLCBseXQsIGZsdiwgbmFtKSB7XG4gICAgY29uc3QgYXBkcyA9IHtcbiAgICAgICdhbGVydCc6ICAgICAgbmV3IExvZzRqcy5KU0FsZXJ0QXBwZW5kZXIoKVxuICAgICAgLCAnY29uc29sZSc6ICBuZXcgTG9nNGpzLkJyb3dzZXJDb25zb2xlQXBwZW5kZXIoKVxuICAgIH07XG4gICAgY29uc3QgbHl0cyA9IHtcbiAgICAgICdiYXNpYyc6ICAgICAgbmV3IExvZzRqcy5CYXNpY0xheW91dCgpXG4gICAgICAsICdqc29uJzogICAgIG5ldyBMb2c0anMuSlNPTkxheW91dCgpXG4gICAgICAsICd4bWwnOiAgICAgIG5ldyBMb2c0anMuWE1MTGF5b3V0KClcbiAgICB9O1xuICAgIGNvbnN0IGZsdnMgPSB7XG4gICAgICAnT0ZGJzogICAgICAgIExvZzRqcy5MZXZlbC5PRkZcbiAgICAgICwgJ0ZBVEFMJzogICAgTG9nNGpzLkxldmVsLkZBVEFMXG4gICAgICAsICdFUlJPUic6ICAgIExvZzRqcy5MZXZlbC5FUlJPUlxuICAgICAgLCAnV0FSTic6ICAgICBMb2c0anMuTGV2ZWwuV0FSTlxuICAgICAgLCAnSU5GTyc6ICAgICBMb2c0anMuTGV2ZWwuSU5GT1xuICAgICAgLCAnREVCVUcnOiAgICBMb2c0anMuTGV2ZWwuREVCVUdcbiAgICAgICwgJ1RSQUNFJzogICAgTG9nNGpzLkxldmVsLlRSQUNFXG4gICAgICAsICdBTEwnOiAgICAgIExvZzRqcy5MZXZlbC5BTExcbiAgICB9O1xuICAgIGNvbnN0IGFwcGVuZGVyID0gYXBkc1thcGRdO1xuICAgIGFwcGVuZGVyLnNldExheW91dChseXRzW2x5dF0pO1xuICAgIGNvbnN0IGxvZ2dlciA9IG5ldyBMb2c0anMuZ2V0TG9nZ2VyKG5hbSk7XG4gICAgbG9nZ2VyLmFkZEFwcGVuZGVyKGFwcGVuZGVyKTtcbiAgICB0aGlzLkxvZ2dlciA9IGxvZ2dlcjtcbiAgfSxcbiAgbG9nZ2VyKG1sdiwgbXNnKSB7XG4gICAgY29uc3QgX21zZyA9IG1zZy5tYXAoIHZhbCA9PiB7XG4gICAgICBpZih0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsLCBudWxsLCA0KTtcbiAgICAgIH0gZWxzZSBpZih2YWwgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJz8nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLkxvZ2dlci5sb2cobWx2LCBfbXNnLmpvaW4oJyAnKSwgbnVsbCk7XG4gIH0sXG4gIGZhdGFsKG1zZykgIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvZ2dlcignRkFUQUwnLCAgYXJncyk7XG4gIH0sXG4gIGVycm9yKG1zZykgIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvZ2dlcignRVJST1InLCAgYXJncyk7XG4gIH0sXG4gIHdhcm4obXNnKSAgIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvZ2dlcignV0FSTicsICAgYXJncyk7XG4gIH0sXG4gIGluZm8obXNnKSAgIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvZ2dlcignSU5GTycsICAgYXJncyk7XG4gIH0sXG4gIGRlYnVnKG1zZykgIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvZ2dlcignREVCVUcnLCAgYXJncyk7XG4gIH0sXG4gIHRyYWNlKG1zZykgIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB0aGlzLmxvZ2dlcignVFJBQ0UnLCAgYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IHNwbiA9IHtcbiAgU3Bpbm5lcixcbiAgdGFyZ2V0LFxuICBjb25maWcodGFyZ2V0KSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGxpbmVzOiAgICAgICAgMTMgIC8vIFRoZSBudW1iZXIgb2YgbGluZXMgdG8gZHJhd1xuICAgICAgLCBsZW5ndGg6ICAgICAyOCAgLy8gVGhlIGxlbmd0aCBvZiBlYWNoIGxpbmVcbiAgICAgICwgd2lkdGg6ICAgICAgMTQgIC8vIFRoZSBsaW5lIHRoaWNrbmVzc1xuICAgICAgLCByYWRpdXM6ICAgICA0MiAgLy8gVGhlIHJhZGl1cyBvZiB0aGUgaW5uZXIgY2lyY2xlXG4gICAgICAsIHNjYWxlOiAgICAgIDEgICAvLyBTY2FsZXMgb3ZlcmFsbCBzaXplIG9mIHRoZSBzcGlubmVyXG4gICAgICAsIGNvcm5lcnM6ICAgIDEgICAvLyBDb3JuZXIgcm91bmRuZXNzICgwLi4xKVxuICAgICAgLCBjb2xvcjogICAgICAnIzAwMCcgLy8gI3JnYiBvciAjcnJnZ2JiIG9yIGFycmF5IG9mIGNvbG9yc1xuICAgICAgLCBvcGFjaXR5OiAgICAwLjI1IC8vIE9wYWNpdHkgb2YgdGhlIGxpbmVzXG4gICAgICAsIHJvdGF0ZTogICAgIDAgICAvLyBUaGUgcm90YXRpb24gb2Zmc2V0XG4gICAgICAsIGRpcmVjdGlvbjogIDEgICAvLyAxOiBjbG9ja3dpc2UsIC0xOiBjb3VudGVyY2xvY2t3aXNlXG4gICAgICAsIHNwZWVkOiAgICAgIDEgICAvLyBSb3VuZHMgcGVyIHNlY29uZFxuICAgICAgLCB0cmFpbDogICAgICA2MCAgLy8gQWZ0ZXJnbG93IHBlcmNlbnRhZ2VcbiAgICAgICwgZnBzOiAgICAgICAgMjAgIC8vIEZyYW1lcyBwZXIgc2Vjb25kIHdoZW4gdXNpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoKSBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYSBmYWxsYmFjayBmb3IgQ1NTXG4gICAgICAsIHpJbmRleDogICAgIDJlOSAvLyBUaGUgei1pbmRleCAoZGVmYXVsdHMgdG8gMjAwMDAwMDAwMClcbiAgICAgICwgY2xhc3NOYW1lOiAgJ3NwaW5uZXInICAgLy8gVGhlIENTUyBjbGFzcyB0byBhc3NpZ24gdG8gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBzcGlubmVyXG4gICAgICAsIHRvcDogICAgICAgICc0OSUnIC8vIFRvcCBwb3NpdGlvbiByZWxhdGl2ZSB0byBwYXJlbnRcbiAgICAgICwgbGVmdDogICAgICAgJzQ5JScgLy8gTGVmdCBwb3NpdGlvbiByZWxhdGl2ZSB0byBwYXJlbnRcbiAgICAgICwgc2hhZG93OiAgICAgZmFsc2UgLy8gV2hldGhlciB0byByZW5kZXIgYSBzaGFkb3dcbiAgICAgICwgaHdhY2NlbDogICAgZmFsc2UgLy8gV2hldGhlciB0byB1c2UgaGFyZHdhcmUgYWNjZWxlcmF0aW9uXG4gICAgICAsIHBvc2l0aW9uOiAgICdhYnNvbHV0ZScgLy8gRWxlbWVudCBwb3NpdGlvbmluZ1xuICAgIH07XG4gICAgdGhpcy5TcGlubmVyID0gbmV3IFNwaW5uZXIob3B0cyk7XG4gICAgdGhpcy50YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpO1xuICB9LFxuICBzcGluKCkgeyB0aGlzLlNwaW5uZXIuc3Bpbih0aGlzLnRhcmdldCk7IH0sXG4gIHN0b3AoKSAgeyB0aGlzLlNwaW5uZXIuc3RvcCgpOyB9XG59O1xuXG5jb25zdCBzdG9yID0ge1xuICAvKipcbiAgICogc2V0Q29va2llc1xuICAgKlxuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHBhcmFtIGRheXNUb0xpdmVcbiAgICovXG4gIHNldENvb2tpZXMobmFtZSwgdmFsdWUsIGRheXNUb0xpdmUpIHtcbiAgICBsZXQgY29va2llID0gbmFtZSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICBpZih0eXBlb2YgZGF5c1RvTGl2ZSA9PT0gXCJudW1iZXJcIilcbiAgICAgIGNvb2tpZSArPSBcIjsgbWF4LWFnZT1cIiArIChkYXlzVG9MaXZlKjYwKjYwKjI0KTtcbiAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIGdldENvb2tpZXNcbiAgICogUmV0dXJuIHRoZSBkb2N1bWVudCdzIGNvb2tpZXMgYXMgYW4gb2JqZWN0IG9mIG5hbWUvdmFsdWVcbiAgICogcGFpcnMuQXNzdW1lIHRoYXQgY29va2llIHZhbHVlcyBhcmUgZW5jb2RlZCB3aXRoXG4gICAqIGVuY29kZVVSSUNvbXBvbmVudCgpLlxuICAgKlxuICAgKiBAcmV0dXJucyB7b2JqZWN0fSAtIFN0b3JlIG5hbWUgYW5kIHZhbHVlIGluIG9iamVjdC5cbiAgICovXG4gIGdldENvb2tpZXMoKSB7XG4gICAgICBsZXQgY29va2llcyA9IHt9O1xuICAgICAgY29uc3QgYWxsID0gZG9jdW1lbnQuY29va2llO1xuICAgICAgaWYgKGFsbCA9PT0gXCJcIilcbiAgICAgICAgICByZXR1cm4gY29va2llcztcbiAgICAgIGNvbnN0IGxpc3QgPSBhbGwuc3BsaXQoXCI7IFwiKTtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY29va2llID0gbGlzdFtpXTtcbiAgICAgICAgICBjb25zdCBwID0gY29va2llLmluZGV4T2YoXCI9XCIpO1xuICAgICAgICAgIGNvbnN0IG5hbWUgPSBjb29raWUuc3Vic3RyaW5nKDAscCk7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjb29raWUuc3Vic3RyaW5nKHArMSk7XG4gICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgIGNvb2tpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb29raWVzO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDb29raWVTdG9yYWdlXG4gICAqIFRoaXMgY2xhc3MgaW1wbGVtZW50cyB0aGUgU3RvcmFnZSBBUEkgdGhhdCBsb2NhbFN0b3JhZ2UgYW5kXG4gICAqIHNlc3Npb25TdG9yYWdlIGRvLCBidXQgaW1wbGVtZW50cyBpdCBvbiB0b3Agb2YgSFRUUCBDb29raWVzLlxuICAgKlxuICAgKiBAcGFyYW0gbWF4YWdlIHtudW1iZXJ9IC0gbGlmZXRpbWVcbiAgICogQHBhcmFtIHBhdGgge3N0cmluZ30gLSBzY29wZVxuICAgKi9cbiAgQ29va2llU3RvcmFnZShtYXhhZ2UsIHBhdGgpIHtcbiAgICAgIGNvbnN0IGNvb2tpZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbGV0IGNvb2tpZXMgPSB7fTtcbiAgICAgICAgICBjb25zdCBhbGwgPSBkb2N1bWVudC5jb29raWU7XG4gICAgICAgICAgaWYgKGFsbCA9PT0gXCJcIilcbiAgICAgICAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgICAgICAgY29uc3QgbGlzdCA9IGFsbC5zcGxpdChcIjsgXCIpO1xuICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgIGNvbnN0IHAgPSBjb29raWUuaW5kZXhPZihcIj1cIik7XG4gICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBjb29raWUuc3Vic3RyaW5nKDAscCk7XG4gICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29va2llLnN1YnN0cmluZyhwKzEpO1xuICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgIGNvb2tpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNvb2tpZXM7XG4gICAgICB9KCkpO1xuICAgICAgbGV0IGtleXMgPSBbXTtcbiAgICAgIGZvcihsZXQga2V5IGluIGNvb2tpZXMpIGtleXMucHVzaChrZXkpO1xuICAgICAgdGhpcy5sZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICAgIHRoaXMua2V5ID0gZnVuY3Rpb24obikge1xuICAgICAgICAgIGlmIChuIDwgMCB8fCBuID49IGtleXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICByZXR1cm4ga2V5c1tuXTtcbiAgICAgIH07XG4gICAgICB0aGlzLmdldEl0ZW0gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBjb29raWVzW25hbWVdIHx8IG51bGw7XG4gICAgICB9O1xuICAgICAgdGhpcy5zZXRJdGVtID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgIGlmICghKGtleSBpbiBjb29raWVzKSkge1xuICAgICAgICAgICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29va2llc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgbGV0IGNvb2tpZSA9IGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICBpZiAobWF4YWdlKSBjb29raWUgKz0gXCI7IG1heC1hZ2U9XCIgKyBtYXhhZ2U7XG4gICAgICAgICAgaWYgKHBhdGgpIGNvb2tpZSArPSBcIjsgcGF0aD1cIiArIHBhdGg7XG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llO1xuICAgICAgfTtcbiAgICAgIHRoaXMucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIGlmICghKGtleSBpbiBjb29raWVzKSkgcmV0dXJuO1xuICAgICAgICAgIGRlbGV0ZSBjb29raWVzW2tleV07XG4gICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKGtleXNbaV0gPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAga2V5cy5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGVuZ3RoLS07XG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0ga2V5ICsgXCI9OyBtYXgtYWdlPTBcIjtcbiAgICAgIH07XG4gICAgICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleXNbaV0gKyBcIj07IG1heC1hZ2U9MFwiO1xuICAgICAgICAgIGNvb2tpZXMgPSB7fTtcbiAgICAgICAgICBrZXlzID0gW107XG4gICAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgfTtcbiAgfSxcblxuICAvKipcbiAgICogVXNlckRhdGFTdG9yYWdlXG4gICAqIENyZWF0ZSBhIGRvY3VtZW50IGVsZW1lbnQgYW5kIGluc3RhbGwgdGhlIHNwZWNpYWwgdXNlckRhdGFcbiAgICogYmVoYXZpb3Igb24gaXQgc28gaXQgZ2V0cyBzYXZlKCkgYW5kIGxvYWQoKSBtZXRob2RzLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWF4YWdlIC0gSWYgbWF4YWdlIGlzIHNwZWNpZmllZCwgZXhwaXJlIHRoZVxuICAgKiAgICAgICAgICAgICAgICAgIHVzZXJEYXRhIGluIG1heGFnZSBzZWNvbmRzXG4gICAqL1xuICBVc2VyRGF0YVN0b3JhZ2UobWF4YWdlKSAge1xuICAgICAgY29uc3QgbWVtb3J5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG1lbW9yeS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBtZW1vcnkuc3R5bGUuYmVoYXZpb3IgPSBcInVybCgnI2RlZmF1bHQjdXNlckRhdGEnKVwiO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtZW1vcnkpO1xuICAgICAgaWYgKG1heGFnZSkge1xuICAgICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgIGNvbnN0IGV4cGlyZXMgPSBub3cgKyBtYXhhZ2UgKiAxMDAwO1xuICAgICAgICAgIG1lbW9yeS5leHBpcmVzID0gbmV3IERhdGUoZXhwaXJlcykudG9VVENTdHJpbmcoKTtcbiAgICAgIH1cbiAgICAgIG1lbW9yeS5sb2FkKFwiVXNlckRhdGFTdG9yYWdlXCIpO1xuICAgICAgdGhpcy5nZXRJdGVtID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIG1lbW9yeS5nZXRBdHRyaWJ1dGUoa2V5KSB8fCBudWxsO1xuICAgICAgfTtcbiAgICAgIHRoaXMuc2V0SXRlbSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICBtZW1vcnkuc2V0QXR0cmlidXRlKGtleSx2YWx1ZSk7XG4gICAgICAgICAgbWVtb3J5LnNhdmUoXCJVc2VyRGF0YVN0b3JhZ2VcIik7XG4gICAgICB9O1xuICAgICAgdGhpcy5yZW1vdmVJdGVtID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgbWVtb3J5LnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgICAgICAgIG1lbW9yeS5zYXZlKFwiVXNlckRhdGFTdG9yYWdlXCIpO1xuICAgICAgfTtcbiAgfVxufTtcbmV4cG9ydCB7IE0sIGxvZywgc3BuLCBzdG9yLCB1dGlsIH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicXVlcnlzdHJpbmdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=