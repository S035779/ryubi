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
/******/ 	var hotCurrentHash = "ddebd33c9d47461d9523";
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
/******/ 	deferredModules.push(["./main.js","common"]);
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

/***/ "../node_modules/sax/lib/sax.js":
/*!**************************************!*\
  !*** ../node_modules/sax/lib/sax.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

;(function (sax) { // wrapper for non-node envs
  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
  sax.SAXParser = SAXParser
  sax.SAXStream = SAXStream
  sax.createStream = createStream

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024

  var buffers = [
    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
    'procInstName', 'procInstBody', 'entity', 'attribName',
    'attribValue', 'cdata', 'script'
  ]

  sax.EVENTS = [
    'text',
    'processinginstruction',
    'sgmldeclaration',
    'doctype',
    'comment',
    'opentagstart',
    'attribute',
    'opentag',
    'closetag',
    'opencdata',
    'cdata',
    'closecdata',
    'error',
    'end',
    'ready',
    'script',
    'opennamespace',
    'closenamespace'
  ]

  function SAXParser (strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt)
    }

    var parser = this
    clearBuffers(parser)
    parser.q = parser.c = ''
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
    parser.opt = opt || {}
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
    parser.tags = []
    parser.closed = parser.closedRoot = parser.sawRoot = false
    parser.tag = parser.error = null
    parser.strict = !!strict
    parser.noscript = !!(strict || parser.opt.noscript)
    parser.state = S.BEGIN
    parser.strictEntities = parser.opt.strictEntities
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
    parser.attribList = []

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS)
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0
    }
    emit(parser, 'onready')
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o
      var newf = new F()
      return newf
    }
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = []
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
      return a
    }
  }

  function checkBufferLength (parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    var maxActual = 0
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser)
            break

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata)
            parser.cdata = ''
            break

          case 'script':
            emitNode(parser, 'onscript', parser.script)
            parser.script = ''
            break

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i])
        }
      }
      maxActual = Math.max(maxActual, len)
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual
    parser.bufferCheckPosition = m + parser.position
  }

  function clearBuffers (parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = ''
    }
  }

  function flushBuffers (parser) {
    closeText(parser)
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata)
      parser.cdata = ''
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }
  }

  SAXParser.prototype = {
    end: function () { end(this) },
    write: write,
    resume: function () { this.error = null; return this },
    close: function () { return this.write(null) },
    flush: function () { flushBuffers(this) }
  }

  var Stream
  try {
    Stream = __webpack_require__(/*! stream */ "stream").Stream
  } catch (ex) {
    Stream = function () {}
  }

  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end'
  })

  function createStream (strict, opt) {
    return new SAXStream(strict, opt)
  }

  function SAXStream (strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt)
    }

    Stream.apply(this)

    this._parser = new SAXParser(strict, opt)
    this.writable = true
    this.readable = true

    var me = this

    this._parser.onend = function () {
      me.emit('end')
    }

    this._parser.onerror = function (er) {
      me.emit('error', er)

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null
    }

    this._decoder = null

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function () {
          return me._parser['on' + ev]
        },
        set: function (h) {
          if (!h) {
            me.removeAllListeners(ev)
            me._parser['on' + ev] = h
            return h
          }
          me.on(ev, h)
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  })

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = __webpack_require__(/*! string_decoder */ "string_decoder").StringDecoder
        this._decoder = new SD('utf8')
      }
      data = this._decoder.write(data)
    }

    this._parser.write(data.toString())
    this.emit('data', data)
    return true
  }

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk)
    }
    this._parser.end()
    return true
  }

  SAXStream.prototype.on = function (ev, handler) {
    var me = this
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
        args.splice(0, 0, ev)
        me.emit.apply(me, args)
      }
    }

    return Stream.prototype.on.call(me, ev, handler)
  }

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA['
  var DOCTYPE = 'DOCTYPE'
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.
  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  function isWhitespace (c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  }

  function isQuote (c) {
    return c === '"' || c === '\''
  }

  function isAttribEnd (c) {
    return c === '>' || isWhitespace(c)
  }

  function isMatch (regex, c) {
    return regex.test(c)
  }

  function notMatch (regex, c) {
    return !isMatch(regex, c)
  }

  var S = 0
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  }

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  }

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  }

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
  })

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s
  }

  // shorthand
  S = sax.STATE

  function emit (parser, event, data) {
    parser[event] && parser[event](data)
  }

  function emitNode (parser, nodeType, data) {
    if (parser.textNode) closeText(parser)
    emit(parser, nodeType, data)
  }

  function closeText (parser) {
    parser.textNode = textopts(parser.opt, parser.textNode)
    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
    parser.textNode = ''
  }

  function textopts (opt, text) {
    if (opt.trim) text = text.trim()
    if (opt.normalize) text = text.replace(/\s+/g, ' ')
    return text
  }

  function error (parser, er) {
    closeText(parser)
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line +
        '\nColumn: ' + parser.column +
        '\nChar: ' + parser.c
    }
    er = new Error(er)
    parser.error = er
    emit(parser, 'onerror', er)
    return parser
  }

  function end (parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
    if ((parser.state !== S.BEGIN) &&
      (parser.state !== S.BEGIN_WHITESPACE) &&
      (parser.state !== S.TEXT)) {
      error(parser, 'Unexpected end')
    }
    closeText(parser)
    parser.c = ''
    parser.closed = true
    emit(parser, 'onend')
    SAXParser.call(parser, parser.strict, parser.opt)
    return parser
  }

  function strictFail (parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail')
    }
    if (parser.strict) {
      error(parser, message)
    }
  }

  function newTag (parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
    var parent = parser.tags[parser.tags.length - 1] || parser
    var tag = parser.tag = { name: parser.tagName, attributes: {} }

    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    if (parser.opt.xmlns) {
      tag.ns = parent.ns
    }
    parser.attribList.length = 0
    emitNode(parser, 'onopentagstart', tag)
  }

  function qname (name, attribute) {
    var i = name.indexOf(':')
    var qualName = i < 0 ? [ '', name ] : name.split(':')
    var prefix = qualName[0]
    var local = qualName[1]

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns'
      local = ''
    }

    return { prefix: prefix, local: local }
  }

  function attrib (parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]()
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = ''
      return
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true)
      var prefix = qn.prefix
      var local = qn.local

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser,
            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser,
            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else {
          var tag = parser.tag
          var parent = parser.tags[parser.tags.length - 1] || parser
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns)
          }
          tag.ns[local] = parser.attribValue
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue])
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      })
    }

    parser.attribName = parser.attribValue = ''
  }

  function openTag (parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag

      // add namespace info to tag
      var qn = qname(parser.tagName)
      tag.prefix = qn.prefix
      tag.local = qn.local
      tag.uri = tag.ns[qn.prefix] || ''

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' +
          JSON.stringify(parser.tagName))
        tag.uri = qn.prefix
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          })
        })
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i]
        var name = nv[0]
        var value = nv[1]
        var qualName = qname(name, true)
        var prefix = qualName.prefix
        var local = qualName.local
        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }

        // if there's any attributes with an undefined namespace,
        // then fail on them now.
        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(prefix))
          a.uri = prefix
        }
        parser.tag.attributes[name] = a
        emitNode(parser, 'onattribute', a)
      }
      parser.attribList.length = 0
    }

    parser.tag.isSelfClosing = !!selfClosing

    // process the tag
    parser.sawRoot = true
    parser.tags.push(parser.tag)
    emitNode(parser, 'onopentag', parser.tag)
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT
      } else {
        parser.state = S.TEXT
      }
      parser.tag = null
      parser.tagName = ''
    }
    parser.attribName = parser.attribValue = ''
    parser.attribList.length = 0
  }

  function closeTag (parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.')
      parser.textNode += '</>'
      parser.state = S.TEXT
      return
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>'
        parser.tagName = ''
        parser.state = S.SCRIPT
        return
      }
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length
    var tagName = parser.tagName
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]()
    }
    var closeTo = tagName
    while (t--) {
      var close = parser.tags[t]
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag')
      } else {
        break
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
      parser.textNode += '</' + parser.tagName + '>'
      parser.state = S.TEXT
      return
    }
    parser.tagName = tagName
    var s = parser.tags.length
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop()
      parser.tagName = parser.tag.name
      emitNode(parser, 'onclosetag', parser.tagName)

      var x = {}
      for (var i in tag.ns) {
        x[i] = tag.ns[i]
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p]
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
        })
      }
    }
    if (t === 0) parser.closedRoot = true
    parser.tagName = parser.attribValue = parser.attribName = ''
    parser.attribList.length = 0
    parser.state = S.TEXT
  }

  function parseEntity (parser) {
    var entity = parser.entity
    var entityLC = entity.toLowerCase()
    var num
    var numStr = ''

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity]
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC]
    }
    entity = entityLC
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2)
        num = parseInt(entity, 16)
        numStr = num.toString(16)
      } else {
        entity = entity.slice(1)
        num = parseInt(entity, 10)
        numStr = num.toString(10)
      }
    }
    entity = entity.replace(/^0+/, '')
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity')
      return '&' + parser.entity + ';'
    }

    return String.fromCodePoint(num)
  }

  function beginWhiteSpace (parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA
      parser.startTagPosition = parser.position
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.')
      parser.textNode = c
      parser.state = S.TEXT
    }
  }

  function charAt (chunk, i) {
    var result = ''
    if (i < chunk.length) {
      result = chunk.charAt(i)
    }
    return result
  }

  function write (chunk) {
    var parser = this
    if (this.error) {
      throw this.error
    }
    if (parser.closed) {
      return error(parser,
        'Cannot write after close. Assign an onready handler.')
    }
    if (chunk === null) {
      return end(parser)
    }
    if (typeof chunk === 'object') {
      chunk = chunk.toString()
    }
    var i = 0
    var c = ''
    while (true) {
      c = charAt(chunk, i++)
      parser.c = c

      if (!c) {
        break
      }

      if (parser.trackPosition) {
        parser.position++
        if (c === '\n') {
          parser.line++
          parser.column = 0
        } else {
          parser.column++
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE
          if (c === '\uFEFF') {
            continue
          }
          beginWhiteSpace(parser, c)
          continue

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c)
          continue

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++)
              if (c && parser.trackPosition) {
                parser.position++
                if (c === '\n') {
                  parser.line++
                  parser.column = 0
                } else {
                  parser.column++
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1)
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA
            parser.startTagPosition = parser.position
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.')
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY
            } else {
              parser.textNode += c
            }
          }
          continue

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING
          } else {
            parser.script += c
          }
          continue

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG
          } else {
            parser.script += '<' + c
            parser.state = S.SCRIPT
          }
          continue

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL
            parser.sgmlDecl = ''
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG
            parser.tagName = c
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG
            parser.tagName = ''
          } else if (c === '?') {
            parser.state = S.PROC_INST
            parser.procInstName = parser.procInstBody = ''
          } else {
            strictFail(parser, 'Unencoded <')
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition
              c = new Array(pad).join(' ') + c
            }
            parser.textNode += '<' + c
            parser.state = S.TEXT
          }
          continue

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata')
            parser.state = S.CDATA
            parser.sgmlDecl = ''
            parser.cdata = ''
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT
            parser.comment = ''
            parser.sgmlDecl = ''
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser,
                'Inappropriately located doctype declaration')
            }
            parser.doctype = ''
            parser.sgmlDecl = ''
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
            parser.sgmlDecl = ''
            parser.state = S.TEXT
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED
            parser.sgmlDecl += c
          } else {
            parser.sgmlDecl += c
          }
          continue

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL
            parser.q = ''
          }
          parser.sgmlDecl += c
          continue

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT
            emitNode(parser, 'ondoctype', parser.doctype)
            parser.doctype = true // just remember that we saw it.
          } else {
            parser.doctype += c
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED
              parser.q = c
            }
          }
          continue

        case S.DOCTYPE_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.q = ''
            parser.state = S.DOCTYPE
          }
          continue

        case S.DOCTYPE_DTD:
          parser.doctype += c
          if (c === ']') {
            parser.state = S.DOCTYPE
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED
            parser.q = c
          }
          continue

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD
            parser.q = ''
          }
          continue

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING
          } else {
            parser.comment += c
          }
          continue

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED
            parser.comment = textopts(parser.opt, parser.comment)
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment)
            }
            parser.comment = ''
          } else {
            parser.comment += '-' + c
            parser.state = S.COMMENT
          }
          continue

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment')
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c
            parser.state = S.COMMENT
          } else {
            parser.state = S.TEXT
          }
          continue

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING
          } else {
            parser.cdata += c
          }
          continue

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2
          } else {
            parser.cdata += ']' + c
            parser.state = S.CDATA
          }
          continue

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata)
            }
            emitNode(parser, 'onclosecdata')
            parser.cdata = ''
            parser.state = S.TEXT
          } else if (c === ']') {
            parser.cdata += ']'
          } else {
            parser.cdata += ']]' + c
            parser.state = S.CDATA
          }
          continue

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY
          } else {
            parser.procInstName += c
          }
          continue

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else {
            parser.procInstBody += c
          }
          continue

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            })
            parser.procInstName = parser.procInstBody = ''
            parser.state = S.TEXT
          } else {
            parser.procInstBody += '?' + c
            parser.state = S.PROC_INST_BODY
          }
          continue

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else {
            newTag(parser)
            if (c === '>') {
              openTag(parser)
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name')
              }
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true)
            closeTag(parser)
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >')
            parser.state = S.ATTRIB
          }
          continue

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value')
            parser.attribValue = parser.attribName
            attrib(parser)
            openTag(parser)
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (isWhitespace(c)) {
            continue
          } else {
            strictFail(parser, 'Attribute without value')
            parser.tag.attributes[parser.attribName] = ''
            parser.attribValue = ''
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            })
            parser.attribName = ''
            if (c === '>') {
              openTag(parser)
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c
              parser.state = S.ATTRIB_NAME
            } else {
              strictFail(parser, 'Invalid attribute name')
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue
          } else if (isQuote(c)) {
            parser.q = c
            parser.state = S.ATTRIB_VALUE_QUOTED
          } else {
            strictFail(parser, 'Unquoted attribute value')
            parser.state = S.ATTRIB_VALUE_UNQUOTED
            parser.attribValue = c
          }
          continue

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          parser.q = ''
          parser.state = S.ATTRIB_VALUE_CLOSED
          continue

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes')
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          if (c === '>') {
            openTag(parser)
          } else {
            parser.state = S.ATTRIB
          }
          continue

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c
                parser.state = S.SCRIPT
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.')
              }
            } else {
              parser.tagName = c
            }
          } else if (c === '>') {
            closeTag(parser)
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else if (parser.script) {
            parser.script += '</' + parser.tagName
            parser.tagName = ''
            parser.state = S.SCRIPT
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag')
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE
          }
          continue

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue
          }
          if (c === '>') {
            closeTag(parser)
          } else {
            strictFail(parser, 'Invalid characters in closing tag')
          }
          continue

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState
          var buffer
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT
              buffer = 'textNode'
              break

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED
              buffer = 'attribValue'
              break

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED
              buffer = 'attribValue'
              break
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser)
            parser.entity = ''
            parser.state = returnState
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c
          } else {
            strictFail(parser, 'Invalid character in entity name')
            parser[buffer] += '&' + parser.entity + c
            parser.entity = ''
            parser.state = returnState
          }

          continue

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state)
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser)
    }
    return parser
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode
      var floor = Math.floor
      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000
        var codeUnits = []
        var highSurrogate
        var lowSurrogate
        var index = -1
        var length = arguments.length
        if (!length) {
          return ''
        }
        var result = ''
        while (++index < length) {
          var codePoint = Number(arguments[index])
          if (
            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) !== codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint)
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint)
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000
            highSurrogate = (codePoint >> 10) + 0xD800
            lowSurrogate = (codePoint % 0x400) + 0xDC00
            codeUnits.push(highSurrogate, lowSurrogate)
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits)
            codeUnits.length = 0
          }
        }
        return result
      }
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        })
      } else {
        String.fromCodePoint = fromCodePoint
      }
    }())
  }
})( false ? undefined : exports)


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

/***/ "../node_modules/xml2js/lib/bom.js":
/*!*****************************************!*\
  !*** ../node_modules/xml2js/lib/bom.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  exports.stripBOM = function(str) {
    if (str[0] === '\uFEFF') {
      return str.substring(1);
    } else {
      return str;
    }
  };

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/lib/builder.js":
/*!*********************************************!*\
  !*** ../node_modules/xml2js/lib/builder.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, escapeCDATA, requiresCDATA, wrapCDATA,
    hasProp = {}.hasOwnProperty;

  builder = __webpack_require__(/*! xmlbuilder */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/index.js");

  defaults = __webpack_require__(/*! ./defaults */ "../node_modules/xml2js/lib/defaults.js").defaults;

  requiresCDATA = function(entry) {
    return typeof entry === "string" && (entry.indexOf('&') >= 0 || entry.indexOf('>') >= 0 || entry.indexOf('<') >= 0);
  };

  wrapCDATA = function(entry) {
    return "<![CDATA[" + (escapeCDATA(entry)) + "]]>";
  };

  escapeCDATA = function(entry) {
    return entry.replace(']]>', ']]]]><![CDATA[>');
  };

  exports.Builder = (function() {
    function Builder(opts) {
      var key, ref, value;
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
    }

    Builder.prototype.buildObject = function(rootObj) {
      var attrkey, charkey, render, rootElement, rootName;
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      if ((Object.keys(rootObj).length === 1) && (this.options.rootName === defaults['0.2'].rootName)) {
        rootName = Object.keys(rootObj)[0];
        rootObj = rootObj[rootName];
      } else {
        rootName = this.options.rootName;
      }
      render = (function(_this) {
        return function(element, obj) {
          var attr, child, entry, index, key, value;
          if (typeof obj !== 'object') {
            if (_this.options.cdata && requiresCDATA(obj)) {
              element.raw(wrapCDATA(obj));
            } else {
              element.txt(obj);
            }
          } else if (Array.isArray(obj)) {
            for (index in obj) {
              if (!hasProp.call(obj, index)) continue;
              child = obj[index];
              for (key in child) {
                entry = child[key];
                element = render(element.ele(key), entry).up();
              }
            }
          } else {
            for (key in obj) {
              if (!hasProp.call(obj, key)) continue;
              child = obj[key];
              if (key === attrkey) {
                if (typeof child === "object") {
                  for (attr in child) {
                    value = child[attr];
                    element = element.att(attr, value);
                  }
                }
              } else if (key === charkey) {
                if (_this.options.cdata && requiresCDATA(child)) {
                  element = element.raw(wrapCDATA(child));
                } else {
                  element = element.txt(child);
                }
              } else if (Array.isArray(child)) {
                for (index in child) {
                  if (!hasProp.call(child, index)) continue;
                  entry = child[index];
                  if (typeof entry === 'string') {
                    if (_this.options.cdata && requiresCDATA(entry)) {
                      element = element.ele(key).raw(wrapCDATA(entry)).up();
                    } else {
                      element = element.ele(key, entry).up();
                    }
                  } else {
                    element = render(element.ele(key), entry).up();
                  }
                }
              } else if (typeof child === "object") {
                element = render(element.ele(key), child).up();
              } else {
                if (typeof child === 'string' && _this.options.cdata && requiresCDATA(child)) {
                  element = element.ele(key).raw(wrapCDATA(child)).up();
                } else {
                  if (child == null) {
                    child = '';
                  }
                  element = element.ele(key, child.toString()).up();
                }
              }
            }
          }
          return element;
        };
      })(this);
      rootElement = builder.create(rootName, this.options.xmldec, this.options.doctype, {
        headless: this.options.headless,
        allowSurrogateChars: this.options.allowSurrogateChars
      });
      return render(rootElement, rootObj).end(this.options.renderOpts);
    };

    return Builder;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/lib/defaults.js":
/*!**********************************************!*\
  !*** ../node_modules/xml2js/lib/defaults.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  exports.defaults = {
    "0.1": {
      explicitCharkey: false,
      trim: true,
      normalize: true,
      normalizeTags: false,
      attrkey: "@",
      charkey: "#",
      explicitArray: false,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: false,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      childkey: '@@',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      emptyTag: ''
    },
    "0.2": {
      explicitCharkey: false,
      trim: false,
      normalize: false,
      normalizeTags: false,
      attrkey: "$",
      charkey: "_",
      explicitArray: true,
      ignoreAttrs: false,
      mergeAttrs: false,
      explicitRoot: true,
      validator: null,
      xmlns: false,
      explicitChildren: false,
      preserveChildrenOrder: false,
      childkey: '$$',
      charsAsChildren: false,
      includeWhiteChars: false,
      async: false,
      strict: true,
      attrNameProcessors: null,
      attrValueProcessors: null,
      tagNameProcessors: null,
      valueProcessors: null,
      rootName: 'root',
      xmldec: {
        'version': '1.0',
        'encoding': 'UTF-8',
        'standalone': true
      },
      doctype: null,
      renderOpts: {
        'pretty': true,
        'indent': '  ',
        'newline': '\n'
      },
      headless: false,
      chunkSize: 10000,
      emptyTag: '',
      cdata: false
    }
  };

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/lib/parser.js":
/*!********************************************!*\
  !*** ../node_modules/xml2js/lib/parser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var bom, defaults, events, isEmpty, processItem, processors, sax, setImmediate,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  sax = __webpack_require__(/*! sax */ "../node_modules/sax/lib/sax.js");

  events = __webpack_require__(/*! events */ "events");

  bom = __webpack_require__(/*! ./bom */ "../node_modules/xml2js/lib/bom.js");

  processors = __webpack_require__(/*! ./processors */ "../node_modules/xml2js/lib/processors.js");

  setImmediate = __webpack_require__(/*! timers */ "timers").setImmediate;

  defaults = __webpack_require__(/*! ./defaults */ "../node_modules/xml2js/lib/defaults.js").defaults;

  isEmpty = function(thing) {
    return typeof thing === "object" && (thing != null) && Object.keys(thing).length === 0;
  };

  processItem = function(processors, item, key) {
    var i, len, process;
    for (i = 0, len = processors.length; i < len; i++) {
      process = processors[i];
      item = process(item, key);
    }
    return item;
  };

  exports.Parser = (function(superClass) {
    extend(Parser, superClass);

    function Parser(opts) {
      this.parseString = bind(this.parseString, this);
      this.reset = bind(this.reset, this);
      this.assignOrPush = bind(this.assignOrPush, this);
      this.processAsync = bind(this.processAsync, this);
      var key, ref, value;
      if (!(this instanceof exports.Parser)) {
        return new exports.Parser(opts);
      }
      this.options = {};
      ref = defaults["0.2"];
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this.options[key] = value;
      }
      for (key in opts) {
        if (!hasProp.call(opts, key)) continue;
        value = opts[key];
        this.options[key] = value;
      }
      if (this.options.xmlns) {
        this.options.xmlnskey = this.options.attrkey + "ns";
      }
      if (this.options.normalizeTags) {
        if (!this.options.tagNameProcessors) {
          this.options.tagNameProcessors = [];
        }
        this.options.tagNameProcessors.unshift(processors.normalize);
      }
      this.reset();
    }

    Parser.prototype.processAsync = function() {
      var chunk, err;
      try {
        if (this.remaining.length <= this.options.chunkSize) {
          chunk = this.remaining;
          this.remaining = '';
          this.saxParser = this.saxParser.write(chunk);
          return this.saxParser.close();
        } else {
          chunk = this.remaining.substr(0, this.options.chunkSize);
          this.remaining = this.remaining.substr(this.options.chunkSize, this.remaining.length);
          this.saxParser = this.saxParser.write(chunk);
          return setImmediate(this.processAsync);
        }
      } catch (error1) {
        err = error1;
        if (!this.saxParser.errThrown) {
          this.saxParser.errThrown = true;
          return this.emit(err);
        }
      }
    };

    Parser.prototype.assignOrPush = function(obj, key, newValue) {
      if (!(key in obj)) {
        if (!this.options.explicitArray) {
          return obj[key] = newValue;
        } else {
          return obj[key] = [newValue];
        }
      } else {
        if (!(obj[key] instanceof Array)) {
          obj[key] = [obj[key]];
        }
        return obj[key].push(newValue);
      }
    };

    Parser.prototype.reset = function() {
      var attrkey, charkey, ontext, stack;
      this.removeAllListeners();
      this.saxParser = sax.parser(this.options.strict, {
        trim: false,
        normalize: false,
        xmlns: this.options.xmlns
      });
      this.saxParser.errThrown = false;
      this.saxParser.onerror = (function(_this) {
        return function(error) {
          _this.saxParser.resume();
          if (!_this.saxParser.errThrown) {
            _this.saxParser.errThrown = true;
            return _this.emit("error", error);
          }
        };
      })(this);
      this.saxParser.onend = (function(_this) {
        return function() {
          if (!_this.saxParser.ended) {
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      this.saxParser.ended = false;
      this.EXPLICIT_CHARKEY = this.options.explicitCharkey;
      this.resultObject = null;
      stack = [];
      attrkey = this.options.attrkey;
      charkey = this.options.charkey;
      this.saxParser.onopentag = (function(_this) {
        return function(node) {
          var key, newValue, obj, processedKey, ref;
          obj = {};
          obj[charkey] = "";
          if (!_this.options.ignoreAttrs) {
            ref = node.attributes;
            for (key in ref) {
              if (!hasProp.call(ref, key)) continue;
              if (!(attrkey in obj) && !_this.options.mergeAttrs) {
                obj[attrkey] = {};
              }
              newValue = _this.options.attrValueProcessors ? processItem(_this.options.attrValueProcessors, node.attributes[key], key) : node.attributes[key];
              processedKey = _this.options.attrNameProcessors ? processItem(_this.options.attrNameProcessors, key) : key;
              if (_this.options.mergeAttrs) {
                _this.assignOrPush(obj, processedKey, newValue);
              } else {
                obj[attrkey][processedKey] = newValue;
              }
            }
          }
          obj["#name"] = _this.options.tagNameProcessors ? processItem(_this.options.tagNameProcessors, node.name) : node.name;
          if (_this.options.xmlns) {
            obj[_this.options.xmlnskey] = {
              uri: node.uri,
              local: node.local
            };
          }
          return stack.push(obj);
        };
      })(this);
      this.saxParser.onclosetag = (function(_this) {
        return function() {
          var cdata, emptyStr, key, node, nodeName, obj, objClone, old, s, xpath;
          obj = stack.pop();
          nodeName = obj["#name"];
          if (!_this.options.explicitChildren || !_this.options.preserveChildrenOrder) {
            delete obj["#name"];
          }
          if (obj.cdata === true) {
            cdata = obj.cdata;
            delete obj.cdata;
          }
          s = stack[stack.length - 1];
          if (obj[charkey].match(/^\s*$/) && !cdata) {
            emptyStr = obj[charkey];
            delete obj[charkey];
          } else {
            if (_this.options.trim) {
              obj[charkey] = obj[charkey].trim();
            }
            if (_this.options.normalize) {
              obj[charkey] = obj[charkey].replace(/\s{2,}/g, " ").trim();
            }
            obj[charkey] = _this.options.valueProcessors ? processItem(_this.options.valueProcessors, obj[charkey], nodeName) : obj[charkey];
            if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
              obj = obj[charkey];
            }
          }
          if (isEmpty(obj)) {
            obj = _this.options.emptyTag !== '' ? _this.options.emptyTag : emptyStr;
          }
          if (_this.options.validator != null) {
            xpath = "/" + ((function() {
              var i, len, results;
              results = [];
              for (i = 0, len = stack.length; i < len; i++) {
                node = stack[i];
                results.push(node["#name"]);
              }
              return results;
            })()).concat(nodeName).join("/");
            (function() {
              var err;
              try {
                return obj = _this.options.validator(xpath, s && s[nodeName], obj);
              } catch (error1) {
                err = error1;
                return _this.emit("error", err);
              }
            })();
          }
          if (_this.options.explicitChildren && !_this.options.mergeAttrs && typeof obj === 'object') {
            if (!_this.options.preserveChildrenOrder) {
              node = {};
              if (_this.options.attrkey in obj) {
                node[_this.options.attrkey] = obj[_this.options.attrkey];
                delete obj[_this.options.attrkey];
              }
              if (!_this.options.charsAsChildren && _this.options.charkey in obj) {
                node[_this.options.charkey] = obj[_this.options.charkey];
                delete obj[_this.options.charkey];
              }
              if (Object.getOwnPropertyNames(obj).length > 0) {
                node[_this.options.childkey] = obj;
              }
              obj = node;
            } else if (s) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              objClone = {};
              for (key in obj) {
                if (!hasProp.call(obj, key)) continue;
                objClone[key] = obj[key];
              }
              s[_this.options.childkey].push(objClone);
              delete obj["#name"];
              if (Object.keys(obj).length === 1 && charkey in obj && !_this.EXPLICIT_CHARKEY) {
                obj = obj[charkey];
              }
            }
          }
          if (stack.length > 0) {
            return _this.assignOrPush(s, nodeName, obj);
          } else {
            if (_this.options.explicitRoot) {
              old = obj;
              obj = {};
              obj[nodeName] = old;
            }
            _this.resultObject = obj;
            _this.saxParser.ended = true;
            return _this.emit("end", _this.resultObject);
          }
        };
      })(this);
      ontext = (function(_this) {
        return function(text) {
          var charChild, s;
          s = stack[stack.length - 1];
          if (s) {
            s[charkey] += text;
            if (_this.options.explicitChildren && _this.options.preserveChildrenOrder && _this.options.charsAsChildren && (_this.options.includeWhiteChars || text.replace(/\\n/g, '').trim() !== '')) {
              s[_this.options.childkey] = s[_this.options.childkey] || [];
              charChild = {
                '#name': '__text__'
              };
              charChild[charkey] = text;
              if (_this.options.normalize) {
                charChild[charkey] = charChild[charkey].replace(/\s{2,}/g, " ").trim();
              }
              s[_this.options.childkey].push(charChild);
            }
            return s;
          }
        };
      })(this);
      this.saxParser.ontext = ontext;
      return this.saxParser.oncdata = (function(_this) {
        return function(text) {
          var s;
          s = ontext(text);
          if (s) {
            return s.cdata = true;
          }
        };
      })(this);
    };

    Parser.prototype.parseString = function(str, cb) {
      var err;
      if ((cb != null) && typeof cb === "function") {
        this.on("end", function(result) {
          this.reset();
          return cb(null, result);
        });
        this.on("error", function(err) {
          this.reset();
          return cb(err);
        });
      }
      try {
        str = str.toString();
        if (str.trim() === '') {
          this.emit("end", null);
          return true;
        }
        str = bom.stripBOM(str);
        if (this.options.async) {
          this.remaining = str;
          setImmediate(this.processAsync);
          return this.saxParser;
        }
        return this.saxParser.write(str).close();
      } catch (error1) {
        err = error1;
        if (!(this.saxParser.errThrown || this.saxParser.ended)) {
          this.emit('error', err);
          return this.saxParser.errThrown = true;
        } else if (this.saxParser.ended) {
          throw err;
        }
      }
    };

    return Parser;

  })(events.EventEmitter);

  exports.parseString = function(str, a, b) {
    var cb, options, parser;
    if (b != null) {
      if (typeof b === 'function') {
        cb = b;
      }
      if (typeof a === 'object') {
        options = a;
      }
    } else {
      if (typeof a === 'function') {
        cb = a;
      }
      options = {};
    }
    parser = new exports.Parser(options);
    return parser.parseString(str, cb);
  };

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/lib/processors.js":
/*!************************************************!*\
  !*** ../node_modules/xml2js/lib/processors.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var prefixMatch;

  prefixMatch = new RegExp(/(?!xmlns)^.*:/);

  exports.normalize = function(str) {
    return str.toLowerCase();
  };

  exports.firstCharLowerCase = function(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  };

  exports.stripPrefix = function(str) {
    return str.replace(prefixMatch, '');
  };

  exports.parseNumbers = function(str) {
    if (!isNaN(str)) {
      str = str % 1 === 0 ? parseInt(str, 10) : parseFloat(str);
    }
    return str;
  };

  exports.parseBooleans = function(str) {
    if (/^(?:true|false)$/i.test(str)) {
      str = str.toLowerCase() === 'true';
    }
    return str;
  };

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/lib/xml2js.js":
/*!********************************************!*\
  !*** ../node_modules/xml2js/lib/xml2js.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  "use strict";
  var builder, defaults, parser, processors,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  defaults = __webpack_require__(/*! ./defaults */ "../node_modules/xml2js/lib/defaults.js");

  builder = __webpack_require__(/*! ./builder */ "../node_modules/xml2js/lib/builder.js");

  parser = __webpack_require__(/*! ./parser */ "../node_modules/xml2js/lib/parser.js");

  processors = __webpack_require__(/*! ./processors */ "../node_modules/xml2js/lib/processors.js");

  exports.defaults = defaults.defaults;

  exports.processors = processors;

  exports.ValidationError = (function(superClass) {
    extend(ValidationError, superClass);

    function ValidationError(message) {
      this.message = message;
    }

    return ValidationError;

  })(Error);

  exports.Builder = builder.Builder;

  exports.Parser = parser.Parser;

  exports.parseString = parser.parseString;

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js":
/*!*********************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var assign, isArray, isEmpty, isFunction, isObject, isPlainObject,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  assign = function() {
    var i, key, len, source, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (isFunction(Object.assign)) {
      Object.assign.apply(null, arguments);
    } else {
      for (i = 0, len = sources.length; i < len; i++) {
        source = sources[i];
        if (source != null) {
          for (key in source) {
            if (!hasProp.call(source, key)) continue;
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };

  isFunction = function(val) {
    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  };

  isObject = function(val) {
    var ref;
    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
  };

  isArray = function(val) {
    if (isFunction(Array.isArray)) {
      return Array.isArray(val);
    } else {
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  };

  isEmpty = function(val) {
    var key;
    if (isArray(val)) {
      return !val.length;
    } else {
      for (key in val) {
        if (!hasProp.call(val, key)) continue;
        return false;
      }
      return true;
    }
  };

  isPlainObject = function(val) {
    var ctor, proto;
    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
  };

  module.exports.assign = assign;

  module.exports.isFunction = isFunction;

  module.exports.isObject = isObject;

  module.exports.isArray = isArray;

  module.exports.isEmpty = isEmpty;

  module.exports.isPlainObject = isPlainObject;

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLAttribute.js":
/*!**************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLAttribute.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLAttribute;

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.options = parent.options;
      this.stringify = parent.stringify;
      if (name == null) {
        throw new Error("Missing attribute name of element " + parent.name);
      }
      if (value == null) {
        throw new Error("Missing attribute value for attribute " + name + " of element " + parent.name);
      }
      this.name = this.stringify.attName(name);
      this.value = this.stringify.attValue(value);
    }

    XMLAttribute.prototype.clone = function() {
      return Object.create(this);
    };

    XMLAttribute.prototype.toString = function(options) {
      return this.options.writer.set(options).attribute(this);
    };

    return XMLAttribute;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLCData.js":
/*!**********************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLCData.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLCData = (function(superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text");
      }
      this.text = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCData.prototype.toString = function(options) {
      return this.options.writer.set(options).cdata(this);
    };

    return XMLCData;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLComment.js":
/*!************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLComment.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLComment, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLComment = (function(superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text");
      }
      this.text = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return Object.create(this);
    };

    XMLComment.prototype.toString = function(options) {
      return this.options.writer.set(options).comment(this);
    };

    return XMLComment;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDAttList.js":
/*!***************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDAttList.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDAttList, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDAttList = (function(superClass) {
    extend(XMLDTDAttList, superClass);

    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      XMLDTDAttList.__super__.constructor.call(this, parent);
      if (elementName == null) {
        throw new Error("Missing DTD element name");
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name");
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type");
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default");
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT");
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT");
      }
      this.elementName = this.stringify.eleName(elementName);
      this.attributeName = this.stringify.attName(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdAttList(this);
    };

    return XMLDTDAttList;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDElement.js":
/*!***************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDElement.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDElement, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDElement = (function(superClass) {
    extend(XMLDTDElement, superClass);

    function XMLDTDElement(parent, name, value) {
      XMLDTDElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD element name");
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.eleName(name);
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdElement(this);
    };

    return XMLDTDElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDEntity.js":
/*!**************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDEntity.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDEntity, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDEntity = (function(superClass) {
    extend(XMLDTDEntity, superClass);

    function XMLDTDEntity(parent, pe, name, value) {
      XMLDTDEntity.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing entity name");
      }
      if (value == null) {
        throw new Error("Missing entity value");
      }
      this.pe = !!pe;
      this.name = this.stringify.eleName(name);
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity");
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity");
        }
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity");
        }
      }
    }

    XMLDTDEntity.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdEntity(this);
    };

    return XMLDTDEntity;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDNotation.js":
/*!****************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDNotation.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDNotation, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDNotation = (function(superClass) {
    extend(XMLDTDNotation, superClass);

    function XMLDTDNotation(parent, name, value) {
      XMLDTDNotation.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing notation name");
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity");
      }
      this.name = this.stringify.eleName(name);
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    XMLDTDNotation.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdNotation(this);
    };

    return XMLDTDNotation;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDeclaration.js":
/*!****************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDeclaration.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDeclaration, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDeclaration = (function(superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function(options) {
      return this.options.writer.set(options).declaration(this);
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocType.js":
/*!************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocType.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  module.exports = XMLDocType = (function(superClass) {
    extend(XMLDocType, superClass);

    function XMLDocType(parent, pubID, sysID) {
      var ref, ref1;
      XMLDocType.__super__.constructor.call(this, parent);
      this.documentObject = parent;
      if (isObject(pubID)) {
        ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
      }
      if (sysID == null) {
        ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    XMLDocType.prototype.element = function(name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.toString = function(options) {
      return this.options.writer.set(options).docType(this);
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root() || this.documentObject;
    };

    return XMLDocType;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocument.js":
/*!*************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocument.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isPlainObject = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js").isPlainObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringWriter.js");

  module.exports = XMLDocument = (function(superClass) {
    extend(XMLDocument, superClass);

    function XMLDocument(options) {
      XMLDocument.__super__.constructor.call(this, null);
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
      this.isDocument = true;
    }

    XMLDocument.prototype.end = function(writer) {
      var writerOptions;
      if (!writer) {
        writer = this.options.writer;
      } else if (isPlainObject(writer)) {
        writerOptions = writer;
        writer = this.options.writer.set(writerOptions);
      }
      return writer.document(this);
    };

    XMLDocument.prototype.toString = function(options) {
      return this.options.writer.set(options).document(this);
    };

    return XMLDocument;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocumentCB.js":
/*!***************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocumentCB.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, isFunction, isObject, isPlainObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

  XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLElement.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLComment.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLAttribute.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringWriter.js");

  module.exports = XMLDocumentCB = (function() {
    function XMLDocumentCB(options, onData, onEnd) {
      var writerOptions;
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter(options);
      } else if (isPlainObject(options.writer)) {
        writerOptions = options.writer;
        options.writer = new XMLStringWriter(writerOptions);
      }
      this.options = options;
      this.writer = options.writer;
      this.stringify = new XMLStringifier(options);
      this.onDataCallback = onData || function() {};
      this.onEndCallback = onEnd || function() {};
      this.currentNode = null;
      this.currentLevel = -1;
      this.openTags = {};
      this.documentStarted = false;
      this.documentCompleted = false;
      this.root = null;
    }

    XMLDocumentCB.prototype.node = function(name, attributes, text) {
      var ref1;
      if (name == null) {
        throw new Error("Missing node name");
      }
      if (this.root && this.currentLevel === -1) {
        throw new Error("Document can only have one root node");
      }
      this.openCurrent();
      name = name.valueOf();
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      this.currentNode = new XMLElement(this, name, attributes);
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      if (text != null) {
        this.text(text);
      }
      return this;
    };

    XMLDocumentCB.prototype.element = function(name, attributes, text) {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.dtdElement.apply(this, arguments);
      } else {
        return this.node(name, attributes, text);
      }
    };

    XMLDocumentCB.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (!this.currentNode || this.currentNode.children) {
        throw new Error("att() can only be used immediately after an ele() call in callback mode");
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.currentNode.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.text = function(value) {
      var node;
      this.openCurrent();
      node = new XMLText(this, value);
      this.onData(this.writer.text(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.cdata = function(value) {
      var node;
      this.openCurrent();
      node = new XMLCData(this, value);
      this.onData(this.writer.cdata(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.comment = function(value) {
      var node;
      this.openCurrent();
      node = new XMLComment(this, value);
      this.onData(this.writer.comment(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.raw = function(value) {
      var node;
      this.openCurrent();
      node = new XMLRaw(this, value);
      this.onData(this.writer.raw(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.instruction = function(target, value) {
      var i, insTarget, insValue, len, node;
      this.openCurrent();
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        node = new XMLProcessingInstruction(this, target, value);
        this.onData(this.writer.processingInstruction(node, this.currentLevel + 1));
      }
      return this;
    };

    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
      var node;
      this.openCurrent();
      if (this.documentStarted) {
        throw new Error("declaration() must be the first node");
      }
      node = new XMLDeclaration(this, version, encoding, standalone);
      this.onData(this.writer.declaration(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
      this.openCurrent();
      if (root == null) {
        throw new Error("Missing root node name");
      }
      if (this.root) {
        throw new Error("dtd() must come before the root node");
      }
      this.currentNode = new XMLDocType(this, pubID, sysID);
      this.currentNode.rootNodeName = root;
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      return this;
    };

    XMLDocumentCB.prototype.dtdElement = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDElement(this, name, value);
      this.onData(this.writer.dtdElement(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var node;
      this.openCurrent();
      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.onData(this.writer.dtdAttList(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.entity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, false, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.pEntity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, true, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.notation = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDNotation(this, name, value);
      this.onData(this.writer.dtdNotation(node, this.currentLevel + 1));
      return this;
    };

    XMLDocumentCB.prototype.up = function() {
      if (this.currentLevel < 0) {
        throw new Error("The document node has no parent");
      }
      if (this.currentNode) {
        if (this.currentNode.children) {
          this.closeNode(this.currentNode);
        } else {
          this.openNode(this.currentNode);
        }
        this.currentNode = null;
      } else {
        this.closeNode(this.openTags[this.currentLevel]);
      }
      delete this.openTags[this.currentLevel];
      this.currentLevel--;
      return this;
    };

    XMLDocumentCB.prototype.end = function() {
      while (this.currentLevel >= 0) {
        this.up();
      }
      return this.onEnd();
    };

    XMLDocumentCB.prototype.openCurrent = function() {
      if (this.currentNode) {
        this.currentNode.children = true;
        return this.openNode(this.currentNode);
      }
    };

    XMLDocumentCB.prototype.openNode = function(node) {
      if (!node.isOpen) {
        if (!this.root && this.currentLevel === 0 && node instanceof XMLElement) {
          this.root = node;
        }
        this.onData(this.writer.openNode(node, this.currentLevel));
        return node.isOpen = true;
      }
    };

    XMLDocumentCB.prototype.closeNode = function(node) {
      if (!node.isClosed) {
        this.onData(this.writer.closeNode(node, this.currentLevel));
        return node.isClosed = true;
      }
    };

    XMLDocumentCB.prototype.onData = function(chunk) {
      this.documentStarted = true;
      return this.onDataCallback(chunk);
    };

    XMLDocumentCB.prototype.onEnd = function() {
      this.documentCompleted = true;
      return this.onEndCallback();
    };

    XMLDocumentCB.prototype.ele = function() {
      return this.element.apply(this, arguments);
    };

    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
      return this.doctype(root, pubID, sysID);
    };

    XMLDocumentCB.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLDocumentCB.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.t = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLDocumentCB.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.att = function() {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.a = function() {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocumentCB.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocumentCB.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    return XMLDocumentCB;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLElement.js":
/*!************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLElement.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLAttribute, XMLElement, XMLNode, isFunction, isObject, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLAttribute.js");

  module.exports = XMLElement = (function(superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name");
      }
      this.name = this.stringify.eleName(name);
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
      if (parent.isDocument) {
        this.isRoot = true;
        this.documentObject = parent;
        parent.rootObject = this;
      }
    }

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, ref1;
      clonedSelf = Object.create(this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attributes = {};
      ref1 = this.attributes;
      for (attName in ref1) {
        if (!hasProp.call(ref1, attName)) continue;
        att = ref1[attName];
        clonedSelf.attributes[attName] = att.clone();
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = name.valueOf();
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, i, len;
      if (name == null) {
        throw new Error("Missing attribute name");
      }
      name = name.valueOf();
      if (Array.isArray(name)) {
        for (i = 0, len = name.length; i < len; i++) {
          attName = name[i];
          delete this.attributes[attName];
        }
      } else {
        delete this.attributes[name];
      }
      return this;
    };

    XMLElement.prototype.toString = function(options) {
      return this.options.writer.set(options).element(this);
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    return XMLElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js":
/*!*********************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLProcessingInstruction, XMLRaw, XMLText, isEmpty, isFunction, isObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isEmpty = ref.isEmpty;

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  XMLProcessingInstruction = null;

  module.exports = XMLNode = (function() {
    function XMLNode(parent) {
      this.parent = parent;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      this.children = [];
      if (!XMLElement) {
        XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLElement.js");
        XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLCData.js");
        XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLComment.js");
        XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDeclaration.js");
        XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocType.js");
        XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLRaw.js");
        XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLText.js");
        XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
      }
    }

    XMLNode.prototype.element = function(name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref1, val;
      lastChild = null;
      if (attributes == null) {
        attributes = {};
      }
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      if (name != null) {
        name = name.valueOf();
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if ((isObject(val)) && (isEmpty(val))) {
            val = null;
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            lastChild = this.element(key);
            lastChild.element(val);
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name);
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level");
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, ref1;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element");
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref1 = [])), ref1;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var child, ref1;
      if (name != null) {
        name = name.valueOf();
      }
      attributes || (attributes = {});
      attributes = attributes.valueOf();
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var child;
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.commentBefore = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.commentAfter = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.instruction = function(target, value) {
      var insTarget, insValue, instruction, j, len;
      if (target != null) {
        target = target.valueOf();
      }
      if (value != null) {
        value = value.valueOf();
      }
      if (Array.isArray(target)) {
        for (j = 0, len = target.length; j < len; j++) {
          insTarget = target[j];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.children.push(instruction);
      }
      return this;
    };

    XMLNode.prototype.instructionBefore = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.instructionAfter = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      if (doc.children[0] instanceof XMLDeclaration) {
        doc.children[0] = xmldec;
      } else {
        doc.children.unshift(xmldec);
      }
      return doc.root() || doc;
    };

    XMLNode.prototype.doctype = function(pubID, sysID) {
      var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      ref1 = doc.children;
      for (i = j = 0, len = ref1.length; j < len; i = ++j) {
        child = ref1[i];
        if (child instanceof XMLDocType) {
          doc.children[i] = doctype;
          return doctype;
        }
      }
      ref2 = doc.children;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        child = ref2[i];
        if (child.isRoot) {
          doc.children.splice(i, 0, doctype);
          return doctype;
        }
      }
      doc.children.push(doctype);
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node.rootObject;
        } else if (node.isRoot) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.document = function() {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.end = function(options) {
      return this.document().end(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node");
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node");
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importDocument = function(doc) {
      var clonedRoot;
      clonedRoot = doc.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      return this.doctype(pubID, sysID);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    XMLNode.prototype.importXMLBuilder = function(doc) {
      return this.importDocument(doc);
    };

    return XMLNode;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js":
/*!**************************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNode, XMLProcessingInstruction,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLProcessingInstruction = (function(superClass) {
    extend(XMLProcessingInstruction, superClass);

    function XMLProcessingInstruction(parent, target, value) {
      XMLProcessingInstruction.__super__.constructor.call(this, parent);
      if (target == null) {
        throw new Error("Missing instruction target");
      }
      this.target = this.stringify.insTarget(target);
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return Object.create(this);
    };

    XMLProcessingInstruction.prototype.toString = function(options) {
      return this.options.writer.set(options).processingInstruction(this);
    };

    return XMLProcessingInstruction;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLRaw.js":
/*!********************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLRaw.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNode, XMLRaw,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text");
      }
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return Object.create(this);
    };

    XMLRaw.prototype.toString = function(options) {
      return this.options.writer.set(options).raw(this);
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStreamWriter.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStreamWriter.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStreamWriter, XMLText, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLComment.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLElement.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLWriterBase.js");

  module.exports = XMLStreamWriter = (function(superClass) {
    extend(XMLStreamWriter, superClass);

    function XMLStreamWriter(stream, options) {
      XMLStreamWriter.__super__.constructor.call(this, options);
      this.stream = stream;
    }

    XMLStreamWriter.prototype.document = function(doc) {
      var child, i, j, len, len1, ref, ref1, results;
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        child.isLastRootNode = false;
      }
      doc.children[doc.children.length - 1].isLastRootNode = true;
      ref1 = doc.children;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        child = ref1[j];
        switch (false) {
          case !(child instanceof XMLDeclaration):
            results.push(this.declaration(child));
            break;
          case !(child instanceof XMLDocType):
            results.push(this.docType(child));
            break;
          case !(child instanceof XMLComment):
            results.push(this.comment(child));
            break;
          case !(child instanceof XMLProcessingInstruction):
            results.push(this.processingInstruction(child));
            break;
          default:
            results.push(this.element(child));
        }
      }
      return results;
    };

    XMLStreamWriter.prototype.attribute = function(att) {
      return this.stream.write(' ' + att.name + '="' + att.value + '"');
    };

    XMLStreamWriter.prototype.cdata = function(node, level) {
      return this.stream.write(this.space(level) + '<![CDATA[' + node.text + ']]>' + this.endline(node));
    };

    XMLStreamWriter.prototype.comment = function(node, level) {
      return this.stream.write(this.space(level) + '<!-- ' + node.text + ' -->' + this.endline(node));
    };

    XMLStreamWriter.prototype.declaration = function(node, level) {
      this.stream.write(this.space(level));
      this.stream.write('<?xml version="' + node.version + '"');
      if (node.encoding != null) {
        this.stream.write(' encoding="' + node.encoding + '"');
      }
      if (node.standalone != null) {
        this.stream.write(' standalone="' + node.standalone + '"');
      }
      this.stream.write(this.spacebeforeslash + '?>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.docType = function(node, level) {
      var child, i, len, ref;
      level || (level = 0);
      this.stream.write(this.space(level));
      this.stream.write('<!DOCTYPE ' + node.root().name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      if (node.children.length > 0) {
        this.stream.write(' [');
        this.stream.write(this.endline(node));
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          switch (false) {
            case !(child instanceof XMLDTDAttList):
              this.dtdAttList(child, level + 1);
              break;
            case !(child instanceof XMLDTDElement):
              this.dtdElement(child, level + 1);
              break;
            case !(child instanceof XMLDTDEntity):
              this.dtdEntity(child, level + 1);
              break;
            case !(child instanceof XMLDTDNotation):
              this.dtdNotation(child, level + 1);
              break;
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown DTD node type: " + child.constructor.name);
          }
        }
        this.stream.write(']');
      }
      this.stream.write(this.spacebeforeslash + '>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.element = function(node, level) {
      var att, child, i, len, name, ref, ref1, space;
      level || (level = 0);
      space = this.space(level);
      this.stream.write(space + '<' + node.name);
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function(e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          this.stream.write('></' + node.name + '>');
        } else {
          this.stream.write(this.spacebeforeslash + '/>');
        }
      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
        this.stream.write('>');
        this.stream.write(node.children[0].value);
        this.stream.write('</' + node.name + '>');
      } else {
        this.stream.write('>' + this.newline);
        ref1 = node.children;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          switch (false) {
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLElement):
              this.element(child, level + 1);
              break;
            case !(child instanceof XMLRaw):
              this.raw(child, level + 1);
              break;
            case !(child instanceof XMLText):
              this.text(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown XML node type: " + child.constructor.name);
          }
        }
        this.stream.write(space + '</' + node.name + '>');
      }
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.processingInstruction = function(node, level) {
      this.stream.write(this.space(level) + '<?' + node.target);
      if (node.value) {
        this.stream.write(' ' + node.value);
      }
      return this.stream.write(this.spacebeforeslash + '?>' + this.endline(node));
    };

    XMLStreamWriter.prototype.raw = function(node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.text = function(node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdAttList = function(node, level) {
      this.stream.write(this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType);
      if (node.defaultValueType !== '#DEFAULT') {
        this.stream.write(' ' + node.defaultValueType);
      }
      if (node.defaultValue) {
        this.stream.write(' "' + node.defaultValue + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdElement = function(node, level) {
      this.stream.write(this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value);
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdEntity = function(node, level) {
      this.stream.write(this.space(level) + '<!ENTITY');
      if (node.pe) {
        this.stream.write(' %');
      }
      this.stream.write(' ' + node.name);
      if (node.value) {
        this.stream.write(' "' + node.value + '"');
      } else {
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.nData) {
          this.stream.write(' NDATA ' + node.nData);
        }
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdNotation = function(node, level) {
      this.stream.write(this.space(level) + '<!NOTATION ' + node.name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.pubID) {
        this.stream.write(' PUBLIC "' + node.pubID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.endline = function(node) {
      if (!node.isLastRootNode) {
        return this.newline;
      } else {
        return '';
      }
    };

    return XMLStreamWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringWriter.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringWriter.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLText, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLComment.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLElement.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLWriterBase.js");

  module.exports = XMLStringWriter = (function(superClass) {
    extend(XMLStringWriter, superClass);

    function XMLStringWriter(options) {
      XMLStringWriter.__super__.constructor.call(this, options);
    }

    XMLStringWriter.prototype.document = function(doc) {
      var child, i, len, r, ref;
      this.textispresent = false;
      r = '';
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        r += (function() {
          switch (false) {
            case !(child instanceof XMLDeclaration):
              return this.declaration(child);
            case !(child instanceof XMLDocType):
              return this.docType(child);
            case !(child instanceof XMLComment):
              return this.comment(child);
            case !(child instanceof XMLProcessingInstruction):
              return this.processingInstruction(child);
            default:
              return this.element(child, 0);
          }
        }).call(this);
      }
      if (this.pretty && r.slice(-this.newline.length) === this.newline) {
        r = r.slice(0, -this.newline.length);
      }
      return r;
    };

    XMLStringWriter.prototype.attribute = function(att) {
      return ' ' + att.name + '="' + att.value + '"';
    };

    XMLStringWriter.prototype.cdata = function(node, level) {
      return this.space(level) + '<![CDATA[' + node.text + ']]>' + this.newline;
    };

    XMLStringWriter.prototype.comment = function(node, level) {
      return this.space(level) + '<!-- ' + node.text + ' -->' + this.newline;
    };

    XMLStringWriter.prototype.declaration = function(node, level) {
      var r;
      r = this.space(level);
      r += '<?xml version="' + node.version + '"';
      if (node.encoding != null) {
        r += ' encoding="' + node.encoding + '"';
      }
      if (node.standalone != null) {
        r += ' standalone="' + node.standalone + '"';
      }
      r += this.spacebeforeslash + '?>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.docType = function(node, level) {
      var child, i, len, r, ref;
      level || (level = 0);
      r = this.space(level);
      r += '<!DOCTYPE ' + node.root().name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      if (node.children.length > 0) {
        r += ' [';
        r += this.newline;
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += (function() {
            switch (false) {
              case !(child instanceof XMLDTDAttList):
                return this.dtdAttList(child, level + 1);
              case !(child instanceof XMLDTDElement):
                return this.dtdElement(child, level + 1);
              case !(child instanceof XMLDTDEntity):
                return this.dtdEntity(child, level + 1);
              case !(child instanceof XMLDTDNotation):
                return this.dtdNotation(child, level + 1);
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown DTD node type: " + child.constructor.name);
            }
          }).call(this);
        }
        r += ']';
      }
      r += this.spacebeforeslash + '>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.element = function(node, level) {
      var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
      level || (level = 0);
      textispresentwasset = false;
      if (this.textispresent) {
        this.newline = '';
        this.pretty = false;
      } else {
        this.newline = this.newlinedefault;
        this.pretty = this.prettydefault;
      }
      space = this.space(level);
      r = '';
      r += space + '<' + node.name;
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        r += this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function(e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          r += '></' + node.name + '>' + this.newline;
        } else {
          r += this.spacebeforeslash + '/>' + this.newline;
        }
      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
        r += '>';
        r += node.children[0].value;
        r += '</' + node.name + '>' + this.newline;
      } else {
        if (this.dontprettytextnodes) {
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            if (child.value != null) {
              this.textispresent++;
              textispresentwasset = true;
              break;
            }
          }
        }
        if (this.textispresent) {
          this.newline = '';
          this.pretty = false;
          space = this.space(level);
        }
        r += '>' + this.newline;
        ref2 = node.children;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          child = ref2[j];
          r += (function() {
            switch (false) {
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLElement):
                return this.element(child, level + 1);
              case !(child instanceof XMLRaw):
                return this.raw(child, level + 1);
              case !(child instanceof XMLText):
                return this.text(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown XML node type: " + child.constructor.name);
            }
          }).call(this);
        }
        if (textispresentwasset) {
          this.textispresent--;
        }
        if (!this.textispresent) {
          this.newline = this.newlinedefault;
          this.pretty = this.prettydefault;
        }
        r += space + '</' + node.name + '>' + this.newline;
      }
      return r;
    };

    XMLStringWriter.prototype.processingInstruction = function(node, level) {
      var r;
      r = this.space(level) + '<?' + node.target;
      if (node.value) {
        r += ' ' + node.value;
      }
      r += this.spacebeforeslash + '?>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.raw = function(node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.text = function(node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.dtdAttList = function(node, level) {
      var r;
      r = this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
      if (node.defaultValueType !== '#DEFAULT') {
        r += ' ' + node.defaultValueType;
      }
      if (node.defaultValue) {
        r += ' "' + node.defaultValue + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdElement = function(node, level) {
      return this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value + this.spacebeforeslash + '>' + this.newline;
    };

    XMLStringWriter.prototype.dtdEntity = function(node, level) {
      var r;
      r = this.space(level) + '<!ENTITY';
      if (node.pe) {
        r += ' %';
      }
      r += ' ' + node.name;
      if (node.value) {
        r += ' "' + node.value + '"';
      } else {
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.nData) {
          r += ' NDATA ' + node.nData;
        }
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdNotation = function(node, level) {
      var r;
      r = this.space(level) + '<!NOTATION ' + node.name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.pubID) {
        r += ' PUBLIC "' + node.pubID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.openNode = function(node, level) {
      var att, name, r, ref;
      level || (level = 0);
      if (node instanceof XMLElement) {
        r = this.space(level) + '<' + node.name;
        ref = node.attributes;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          r += this.attribute(att);
        }
        r += (node.children ? '>' : '/>') + this.newline;
        return r;
      } else {
        r = this.space(level) + '<!DOCTYPE ' + node.rootNodeName;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        r += (node.children ? ' [' : '>') + this.newline;
        return r;
      }
    };

    XMLStringWriter.prototype.closeNode = function(node, level) {
      level || (level = 0);
      switch (false) {
        case !(node instanceof XMLElement):
          return this.space(level) + '</' + node.name + '>' + this.newline;
        case !(node instanceof XMLDocType):
          return this.space(level) + ']>' + this.newline;
      }
    };

    return XMLStringWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringifier.js":
/*!****************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringifier.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLStringifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      options || (options = {});
      this.noDoubleEncoding = options.noDoubleEncoding;
      ref = options.stringify || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.eleName = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.eleText = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(this.elEscape(val));
    };

    XMLStringifier.prototype.cdata = function(val) {
      val = '' + val || '';
      val = val.replace(']]>', ']]]]><![CDATA[>');
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attName = function(val) {
      return val = '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      val = '' + val || '';
      return this.attEscape(val);
    };

    XMLStringifier.prototype.insTarget = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.insValue = function(val) {
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (val != null) {
        return '' + val || '';
      } else {
        return val;
      }
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var res;
      res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
      if (res) {
        throw new Error("Invalid character in string: " + str + " at index " + res.index);
      }
      return str;
    };

    XMLStringifier.prototype.elEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLText.js":
/*!*********************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLText.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNode, XMLText,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLText = (function(superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text");
      }
      this.value = this.stringify.eleText(text);
    }

    XMLText.prototype.clone = function() {
      return Object.create(this);
    };

    XMLText.prototype.toString = function(options) {
      return this.options.writer.set(options).text(this);
    };

    return XMLText;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLWriterBase.js":
/*!***************************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLWriterBase.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLWriterBase,
    hasProp = {}.hasOwnProperty;

  module.exports = XMLWriterBase = (function() {
    function XMLWriterBase(options) {
      var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
      options || (options = {});
      this.pretty = options.pretty || false;
      this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
      if (this.pretty) {
        this.indent = (ref1 = options.indent) != null ? ref1 : '  ';
        this.newline = (ref2 = options.newline) != null ? ref2 : '\n';
        this.offset = (ref3 = options.offset) != null ? ref3 : 0;
        this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref6 = options.writer || {};
      for (key in ref6) {
        if (!hasProp.call(ref6, key)) continue;
        value = ref6[key];
        this[key] = value;
      }
    }

    XMLWriterBase.prototype.set = function(options) {
      var key, ref, value;
      options || (options = {});
      if ("pretty" in options) {
        this.pretty = options.pretty;
      }
      if ("allowEmpty" in options) {
        this.allowEmpty = options.allowEmpty;
      }
      if (this.pretty) {
        this.indent = "indent" in options ? options.indent : '  ';
        this.newline = "newline" in options ? options.newline : '\n';
        this.offset = "offset" in options ? options.offset : 0;
        this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref = options.writer || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
      return this;
    };

    XMLWriterBase.prototype.space = function(level) {
      var indent;
      if (this.pretty) {
        indent = (level || 0) + this.offset + 1;
        if (indent > 0) {
          return new Array(indent).join(this.indent);
        } else {
          return '';
        }
      } else {
        return '';
      }
    };

    return XMLWriterBase;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xml2js/node_modules/xmlbuilder/lib/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/xml2js/node_modules/xmlbuilder/lib/index.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/Utility.js"), assign = ref.assign, isFunction = ref.isFunction;

  XMLDocument = __webpack_require__(/*! ./XMLDocument */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocument.js");

  XMLDocumentCB = __webpack_require__(/*! ./XMLDocumentCB */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLDocumentCB.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStringWriter.js");

  XMLStreamWriter = __webpack_require__(/*! ./XMLStreamWriter */ "../node_modules/xml2js/node_modules/xmlbuilder/lib/XMLStreamWriter.js");

  module.exports.create = function(name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name");
    }
    options = assign({}, xmldec, doctype, options);
    doc = new XMLDocument(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if ((options.pubID != null) || (options.sysID != null)) {
        doc.doctype(options);
      }
    }
    return root;
  };

  module.exports.begin = function(options, onData, onEnd) {
    var ref1;
    if (isFunction(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB(options, onData, onEnd);
    } else {
      return new XMLDocument(options);
    }
  };

  module.exports.stringWriter = function(options) {
    return new XMLStringWriter(options);
  };

  module.exports.streamWriter = function(stream, options) {
    return new XMLStreamWriter(stream, options);
  };

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/Utility.js":
/*!*************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/Utility.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var assign, getValue, isArray, isEmpty, isFunction, isObject, isPlainObject,
    slice = [].slice,
    hasProp = {}.hasOwnProperty;

  assign = function() {
    var i, key, len, source, sources, target;
    target = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (isFunction(Object.assign)) {
      Object.assign.apply(null, arguments);
    } else {
      for (i = 0, len = sources.length; i < len; i++) {
        source = sources[i];
        if (source != null) {
          for (key in source) {
            if (!hasProp.call(source, key)) continue;
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };

  isFunction = function(val) {
    return !!val && Object.prototype.toString.call(val) === '[object Function]';
  };

  isObject = function(val) {
    var ref;
    return !!val && ((ref = typeof val) === 'function' || ref === 'object');
  };

  isArray = function(val) {
    if (isFunction(Array.isArray)) {
      return Array.isArray(val);
    } else {
      return Object.prototype.toString.call(val) === '[object Array]';
    }
  };

  isEmpty = function(val) {
    var key;
    if (isArray(val)) {
      return !val.length;
    } else {
      for (key in val) {
        if (!hasProp.call(val, key)) continue;
        return false;
      }
      return true;
    }
  };

  isPlainObject = function(val) {
    var ctor, proto;
    return isObject(val) && (proto = Object.getPrototypeOf(val)) && (ctor = proto.constructor) && (typeof ctor === 'function') && (ctor instanceof ctor) && (Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object));
  };

  getValue = function(obj) {
    if (isFunction(obj.valueOf)) {
      return obj.valueOf();
    } else {
      return obj;
    }
  };

  module.exports.assign = assign;

  module.exports.isFunction = isFunction;

  module.exports.isObject = isObject;

  module.exports.isArray = isArray;

  module.exports.isEmpty = isEmpty;

  module.exports.isPlainObject = isPlainObject;

  module.exports.getValue = getValue;

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLAttribute.js":
/*!******************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLAttribute.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLAttribute;

  module.exports = XMLAttribute = (function() {
    function XMLAttribute(parent, name, value) {
      this.options = parent.options;
      this.stringify = parent.stringify;
      this.parent = parent;
      if (name == null) {
        throw new Error("Missing attribute name. " + this.debugInfo(name));
      }
      if (value == null) {
        throw new Error("Missing attribute value. " + this.debugInfo(name));
      }
      this.name = this.stringify.attName(name);
      this.value = this.stringify.attValue(value);
    }

    XMLAttribute.prototype.clone = function() {
      return Object.create(this);
    };

    XMLAttribute.prototype.toString = function(options) {
      return this.options.writer.set(options).attribute(this);
    };

    XMLAttribute.prototype.debugInfo = function(name) {
      var ref, ref1;
      name = name || this.name;
      if ((name == null) && !((ref = this.parent) != null ? ref.name : void 0)) {
        return "";
      } else if (name == null) {
        return "parent: <" + this.parent.name + ">";
      } else if (!((ref1 = this.parent) != null ? ref1.name : void 0)) {
        return "attribute: {" + name + "}";
      } else {
        return "attribute: {" + name + "}, parent: <" + this.parent.name + ">";
      }
    };

    return XMLAttribute;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLCData.js":
/*!**************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLCData.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLCData = (function(superClass) {
    extend(XMLCData, superClass);

    function XMLCData(parent, text) {
      XMLCData.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing CDATA text. " + this.debugInfo());
      }
      this.text = this.stringify.cdata(text);
    }

    XMLCData.prototype.clone = function() {
      return Object.create(this);
    };

    XMLCData.prototype.toString = function(options) {
      return this.options.writer.set(options).cdata(this);
    };

    return XMLCData;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLComment.js":
/*!****************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLComment.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLComment, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLComment = (function(superClass) {
    extend(XMLComment, superClass);

    function XMLComment(parent, text) {
      XMLComment.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing comment text. " + this.debugInfo());
      }
      this.text = this.stringify.comment(text);
    }

    XMLComment.prototype.clone = function() {
      return Object.create(this);
    };

    XMLComment.prototype.toString = function(options) {
      return this.options.writer.set(options).comment(this);
    };

    return XMLComment;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDTDAttList.js":
/*!*******************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDTDAttList.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDAttList, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDAttList = (function(superClass) {
    extend(XMLDTDAttList, superClass);

    function XMLDTDAttList(parent, elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      XMLDTDAttList.__super__.constructor.call(this, parent);
      if (elementName == null) {
        throw new Error("Missing DTD element name. " + this.debugInfo());
      }
      if (attributeName == null) {
        throw new Error("Missing DTD attribute name. " + this.debugInfo(elementName));
      }
      if (!attributeType) {
        throw new Error("Missing DTD attribute type. " + this.debugInfo(elementName));
      }
      if (!defaultValueType) {
        throw new Error("Missing DTD attribute default. " + this.debugInfo(elementName));
      }
      if (defaultValueType.indexOf('#') !== 0) {
        defaultValueType = '#' + defaultValueType;
      }
      if (!defaultValueType.match(/^(#REQUIRED|#IMPLIED|#FIXED|#DEFAULT)$/)) {
        throw new Error("Invalid default value type; expected: #REQUIRED, #IMPLIED, #FIXED or #DEFAULT. " + this.debugInfo(elementName));
      }
      if (defaultValue && !defaultValueType.match(/^(#FIXED|#DEFAULT)$/)) {
        throw new Error("Default value only applies to #FIXED or #DEFAULT. " + this.debugInfo(elementName));
      }
      this.elementName = this.stringify.eleName(elementName);
      this.attributeName = this.stringify.attName(attributeName);
      this.attributeType = this.stringify.dtdAttType(attributeType);
      this.defaultValue = this.stringify.dtdAttDefault(defaultValue);
      this.defaultValueType = defaultValueType;
    }

    XMLDTDAttList.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdAttList(this);
    };

    return XMLDTDAttList;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDTDElement.js":
/*!*******************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDTDElement.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDElement, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDElement = (function(superClass) {
    extend(XMLDTDElement, superClass);

    function XMLDTDElement(parent, name, value) {
      XMLDTDElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD element name. " + this.debugInfo());
      }
      if (!value) {
        value = '(#PCDATA)';
      }
      if (Array.isArray(value)) {
        value = '(' + value.join(',') + ')';
      }
      this.name = this.stringify.eleName(name);
      this.value = this.stringify.dtdElementValue(value);
    }

    XMLDTDElement.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdElement(this);
    };

    return XMLDTDElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDTDEntity.js":
/*!******************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDTDEntity.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDEntity, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDEntity = (function(superClass) {
    extend(XMLDTDEntity, superClass);

    function XMLDTDEntity(parent, pe, name, value) {
      XMLDTDEntity.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD entity name. " + this.debugInfo(name));
      }
      if (value == null) {
        throw new Error("Missing DTD entity value. " + this.debugInfo(name));
      }
      this.pe = !!pe;
      this.name = this.stringify.eleName(name);
      if (!isObject(value)) {
        this.value = this.stringify.dtdEntityValue(value);
      } else {
        if (!value.pubID && !value.sysID) {
          throw new Error("Public and/or system identifiers are required for an external entity. " + this.debugInfo(name));
        }
        if (value.pubID && !value.sysID) {
          throw new Error("System identifier is required for a public external entity. " + this.debugInfo(name));
        }
        if (value.pubID != null) {
          this.pubID = this.stringify.dtdPubID(value.pubID);
        }
        if (value.sysID != null) {
          this.sysID = this.stringify.dtdSysID(value.sysID);
        }
        if (value.nData != null) {
          this.nData = this.stringify.dtdNData(value.nData);
        }
        if (this.pe && this.nData) {
          throw new Error("Notation declaration is not allowed in a parameter entity. " + this.debugInfo(name));
        }
      }
    }

    XMLDTDEntity.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdEntity(this);
    };

    return XMLDTDEntity;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDTDNotation.js":
/*!********************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDTDNotation.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDNotation, XMLNode,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDTDNotation = (function(superClass) {
    extend(XMLDTDNotation, superClass);

    function XMLDTDNotation(parent, name, value) {
      XMLDTDNotation.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing DTD notation name. " + this.debugInfo(name));
      }
      if (!value.pubID && !value.sysID) {
        throw new Error("Public or system identifiers are required for an external entity. " + this.debugInfo(name));
      }
      this.name = this.stringify.eleName(name);
      if (value.pubID != null) {
        this.pubID = this.stringify.dtdPubID(value.pubID);
      }
      if (value.sysID != null) {
        this.sysID = this.stringify.dtdSysID(value.sysID);
      }
    }

    XMLDTDNotation.prototype.toString = function(options) {
      return this.options.writer.set(options).dtdNotation(this);
    };

    return XMLDTDNotation;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDeclaration.js":
/*!********************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDeclaration.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDeclaration, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLDeclaration = (function(superClass) {
    extend(XMLDeclaration, superClass);

    function XMLDeclaration(parent, version, encoding, standalone) {
      var ref;
      XMLDeclaration.__super__.constructor.call(this, parent);
      if (isObject(version)) {
        ref = version, version = ref.version, encoding = ref.encoding, standalone = ref.standalone;
      }
      if (!version) {
        version = '1.0';
      }
      this.version = this.stringify.xmlVersion(version);
      if (encoding != null) {
        this.encoding = this.stringify.xmlEncoding(encoding);
      }
      if (standalone != null) {
        this.standalone = this.stringify.xmlStandalone(standalone);
      }
    }

    XMLDeclaration.prototype.toString = function(options) {
      return this.options.writer.set(options).declaration(this);
    };

    return XMLDeclaration;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDocType.js":
/*!****************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDocType.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDocType, XMLNode, isObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isObject = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js").isObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  module.exports = XMLDocType = (function(superClass) {
    extend(XMLDocType, superClass);

    function XMLDocType(parent, pubID, sysID) {
      var ref, ref1;
      XMLDocType.__super__.constructor.call(this, parent);
      this.name = "!DOCTYPE";
      this.documentObject = parent;
      if (isObject(pubID)) {
        ref = pubID, pubID = ref.pubID, sysID = ref.sysID;
      }
      if (sysID == null) {
        ref1 = [pubID, sysID], sysID = ref1[0], pubID = ref1[1];
      }
      if (pubID != null) {
        this.pubID = this.stringify.dtdPubID(pubID);
      }
      if (sysID != null) {
        this.sysID = this.stringify.dtdSysID(sysID);
      }
    }

    XMLDocType.prototype.element = function(name, value) {
      var child;
      child = new XMLDTDElement(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var child;
      child = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.entity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, false, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.pEntity = function(name, value) {
      var child;
      child = new XMLDTDEntity(this, true, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.notation = function(name, value) {
      var child;
      child = new XMLDTDNotation(this, name, value);
      this.children.push(child);
      return this;
    };

    XMLDocType.prototype.toString = function(options) {
      return this.options.writer.set(options).docType(this);
    };

    XMLDocType.prototype.ele = function(name, value) {
      return this.element(name, value);
    };

    XMLDocType.prototype.att = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      return this.attList(elementName, attributeName, attributeType, defaultValueType, defaultValue);
    };

    XMLDocType.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocType.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocType.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    XMLDocType.prototype.up = function() {
      return this.root() || this.documentObject;
    };

    return XMLDocType;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDocument.js":
/*!*****************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDocument.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDocument, XMLNode, XMLStringWriter, XMLStringifier, isPlainObject,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  isPlainObject = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js").isPlainObject;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "../node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "../node_modules/xmlbuilder/lib/XMLStringWriter.js");

  module.exports = XMLDocument = (function(superClass) {
    extend(XMLDocument, superClass);

    function XMLDocument(options) {
      XMLDocument.__super__.constructor.call(this, null);
      this.name = "?xml";
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter();
      }
      this.options = options;
      this.stringify = new XMLStringifier(options);
      this.isDocument = true;
    }

    XMLDocument.prototype.end = function(writer) {
      var writerOptions;
      if (!writer) {
        writer = this.options.writer;
      } else if (isPlainObject(writer)) {
        writerOptions = writer;
        writer = this.options.writer.set(writerOptions);
      }
      return writer.document(this);
    };

    XMLDocument.prototype.toString = function(options) {
      return this.options.writer.set(options).document(this);
    };

    return XMLDocument;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLDocumentCB.js":
/*!*******************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLDocumentCB.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLAttribute, XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLDocumentCB, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLStringifier, XMLText, getValue, isFunction, isObject, isPlainObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, getValue = ref.getValue;

  XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xmlbuilder/lib/XMLElement.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xmlbuilder/lib/XMLComment.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "../node_modules/xmlbuilder/lib/XMLAttribute.js");

  XMLStringifier = __webpack_require__(/*! ./XMLStringifier */ "../node_modules/xmlbuilder/lib/XMLStringifier.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "../node_modules/xmlbuilder/lib/XMLStringWriter.js");

  module.exports = XMLDocumentCB = (function() {
    function XMLDocumentCB(options, onData, onEnd) {
      var writerOptions;
      this.name = "?xml";
      options || (options = {});
      if (!options.writer) {
        options.writer = new XMLStringWriter(options);
      } else if (isPlainObject(options.writer)) {
        writerOptions = options.writer;
        options.writer = new XMLStringWriter(writerOptions);
      }
      this.options = options;
      this.writer = options.writer;
      this.stringify = new XMLStringifier(options);
      this.onDataCallback = onData || function() {};
      this.onEndCallback = onEnd || function() {};
      this.currentNode = null;
      this.currentLevel = -1;
      this.openTags = {};
      this.documentStarted = false;
      this.documentCompleted = false;
      this.root = null;
    }

    XMLDocumentCB.prototype.node = function(name, attributes, text) {
      var ref1;
      if (name == null) {
        throw new Error("Missing node name.");
      }
      if (this.root && this.currentLevel === -1) {
        throw new Error("Document can only have one root node. " + this.debugInfo(name));
      }
      this.openCurrent();
      name = getValue(name);
      if (attributes == null) {
        attributes = {};
      }
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      this.currentNode = new XMLElement(this, name, attributes);
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      if (text != null) {
        this.text(text);
      }
      return this;
    };

    XMLDocumentCB.prototype.element = function(name, attributes, text) {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.dtdElement.apply(this, arguments);
      } else {
        return this.node(name, attributes, text);
      }
    };

    XMLDocumentCB.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (!this.currentNode || this.currentNode.children) {
        throw new Error("att() can only be used immediately after an ele() call in callback mode. " + this.debugInfo(name));
      }
      if (name != null) {
        name = getValue(name);
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.currentNode.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLDocumentCB.prototype.text = function(value) {
      var node;
      this.openCurrent();
      node = new XMLText(this, value);
      this.onData(this.writer.text(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.cdata = function(value) {
      var node;
      this.openCurrent();
      node = new XMLCData(this, value);
      this.onData(this.writer.cdata(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.comment = function(value) {
      var node;
      this.openCurrent();
      node = new XMLComment(this, value);
      this.onData(this.writer.comment(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.raw = function(value) {
      var node;
      this.openCurrent();
      node = new XMLRaw(this, value);
      this.onData(this.writer.raw(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.instruction = function(target, value) {
      var i, insTarget, insValue, len, node;
      this.openCurrent();
      if (target != null) {
        target = getValue(target);
      }
      if (value != null) {
        value = getValue(value);
      }
      if (Array.isArray(target)) {
        for (i = 0, len = target.length; i < len; i++) {
          insTarget = target[i];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        node = new XMLProcessingInstruction(this, target, value);
        this.onData(this.writer.processingInstruction(node, this.currentLevel + 1), this.currentLevel + 1);
      }
      return this;
    };

    XMLDocumentCB.prototype.declaration = function(version, encoding, standalone) {
      var node;
      this.openCurrent();
      if (this.documentStarted) {
        throw new Error("declaration() must be the first node.");
      }
      node = new XMLDeclaration(this, version, encoding, standalone);
      this.onData(this.writer.declaration(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.doctype = function(root, pubID, sysID) {
      this.openCurrent();
      if (root == null) {
        throw new Error("Missing root node name.");
      }
      if (this.root) {
        throw new Error("dtd() must come before the root node.");
      }
      this.currentNode = new XMLDocType(this, pubID, sysID);
      this.currentNode.rootNodeName = root;
      this.currentNode.children = false;
      this.currentLevel++;
      this.openTags[this.currentLevel] = this.currentNode;
      return this;
    };

    XMLDocumentCB.prototype.dtdElement = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDElement(this, name, value);
      this.onData(this.writer.dtdElement(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.attList = function(elementName, attributeName, attributeType, defaultValueType, defaultValue) {
      var node;
      this.openCurrent();
      node = new XMLDTDAttList(this, elementName, attributeName, attributeType, defaultValueType, defaultValue);
      this.onData(this.writer.dtdAttList(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.entity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, false, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.pEntity = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDEntity(this, true, name, value);
      this.onData(this.writer.dtdEntity(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.notation = function(name, value) {
      var node;
      this.openCurrent();
      node = new XMLDTDNotation(this, name, value);
      this.onData(this.writer.dtdNotation(node, this.currentLevel + 1), this.currentLevel + 1);
      return this;
    };

    XMLDocumentCB.prototype.up = function() {
      if (this.currentLevel < 0) {
        throw new Error("The document node has no parent.");
      }
      if (this.currentNode) {
        if (this.currentNode.children) {
          this.closeNode(this.currentNode);
        } else {
          this.openNode(this.currentNode);
        }
        this.currentNode = null;
      } else {
        this.closeNode(this.openTags[this.currentLevel]);
      }
      delete this.openTags[this.currentLevel];
      this.currentLevel--;
      return this;
    };

    XMLDocumentCB.prototype.end = function() {
      while (this.currentLevel >= 0) {
        this.up();
      }
      return this.onEnd();
    };

    XMLDocumentCB.prototype.openCurrent = function() {
      if (this.currentNode) {
        this.currentNode.children = true;
        return this.openNode(this.currentNode);
      }
    };

    XMLDocumentCB.prototype.openNode = function(node) {
      if (!node.isOpen) {
        if (!this.root && this.currentLevel === 0 && node instanceof XMLElement) {
          this.root = node;
        }
        this.onData(this.writer.openNode(node, this.currentLevel), this.currentLevel);
        return node.isOpen = true;
      }
    };

    XMLDocumentCB.prototype.closeNode = function(node) {
      if (!node.isClosed) {
        this.onData(this.writer.closeNode(node, this.currentLevel), this.currentLevel);
        return node.isClosed = true;
      }
    };

    XMLDocumentCB.prototype.onData = function(chunk, level) {
      this.documentStarted = true;
      return this.onDataCallback(chunk, level + 1);
    };

    XMLDocumentCB.prototype.onEnd = function() {
      this.documentCompleted = true;
      return this.onEndCallback();
    };

    XMLDocumentCB.prototype.debugInfo = function(name) {
      if (name == null) {
        return "";
      } else {
        return "node: <" + name + ">";
      }
    };

    XMLDocumentCB.prototype.ele = function() {
      return this.element.apply(this, arguments);
    };

    XMLDocumentCB.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLDocumentCB.prototype.dtd = function(root, pubID, sysID) {
      return this.doctype(root, pubID, sysID);
    };

    XMLDocumentCB.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLDocumentCB.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLDocumentCB.prototype.t = function(value) {
      return this.text(value);
    };

    XMLDocumentCB.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLDocumentCB.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLDocumentCB.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLDocumentCB.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLDocumentCB.prototype.att = function() {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.a = function() {
      if (this.currentNode && this.currentNode instanceof XMLDocType) {
        return this.attList.apply(this, arguments);
      } else {
        return this.attribute.apply(this, arguments);
      }
    };

    XMLDocumentCB.prototype.ent = function(name, value) {
      return this.entity(name, value);
    };

    XMLDocumentCB.prototype.pent = function(name, value) {
      return this.pEntity(name, value);
    };

    XMLDocumentCB.prototype.not = function(name, value) {
      return this.notation(name, value);
    };

    return XMLDocumentCB;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLElement.js":
/*!****************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLElement.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLAttribute, XMLElement, XMLNode, getValue, isFunction, isObject, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, getValue = ref.getValue;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  XMLAttribute = __webpack_require__(/*! ./XMLAttribute */ "../node_modules/xmlbuilder/lib/XMLAttribute.js");

  module.exports = XMLElement = (function(superClass) {
    extend(XMLElement, superClass);

    function XMLElement(parent, name, attributes) {
      XMLElement.__super__.constructor.call(this, parent);
      if (name == null) {
        throw new Error("Missing element name. " + this.debugInfo());
      }
      this.name = this.stringify.eleName(name);
      this.attributes = {};
      if (attributes != null) {
        this.attribute(attributes);
      }
      if (parent.isDocument) {
        this.isRoot = true;
        this.documentObject = parent;
        parent.rootObject = this;
      }
    }

    XMLElement.prototype.clone = function() {
      var att, attName, clonedSelf, ref1;
      clonedSelf = Object.create(this);
      if (clonedSelf.isRoot) {
        clonedSelf.documentObject = null;
      }
      clonedSelf.attributes = {};
      ref1 = this.attributes;
      for (attName in ref1) {
        if (!hasProp.call(ref1, attName)) continue;
        att = ref1[attName];
        clonedSelf.attributes[attName] = att.clone();
      }
      clonedSelf.children = [];
      this.children.forEach(function(child) {
        var clonedChild;
        clonedChild = child.clone();
        clonedChild.parent = clonedSelf;
        return clonedSelf.children.push(clonedChild);
      });
      return clonedSelf;
    };

    XMLElement.prototype.attribute = function(name, value) {
      var attName, attValue;
      if (name != null) {
        name = getValue(name);
      }
      if (isObject(name)) {
        for (attName in name) {
          if (!hasProp.call(name, attName)) continue;
          attValue = name[attName];
          this.attribute(attName, attValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        if (!this.options.skipNullAttributes || (value != null)) {
          this.attributes[name] = new XMLAttribute(this, name, value);
        }
      }
      return this;
    };

    XMLElement.prototype.removeAttribute = function(name) {
      var attName, i, len;
      if (name == null) {
        throw new Error("Missing attribute name. " + this.debugInfo());
      }
      name = getValue(name);
      if (Array.isArray(name)) {
        for (i = 0, len = name.length; i < len; i++) {
          attName = name[i];
          delete this.attributes[attName];
        }
      } else {
        delete this.attributes[name];
      }
      return this;
    };

    XMLElement.prototype.toString = function(options) {
      return this.options.writer.set(options).element(this);
    };

    XMLElement.prototype.att = function(name, value) {
      return this.attribute(name, value);
    };

    XMLElement.prototype.a = function(name, value) {
      return this.attribute(name, value);
    };

    return XMLElement;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLNode.js":
/*!*************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLNode.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLComment, XMLDeclaration, XMLDocType, XMLElement, XMLNode, XMLProcessingInstruction, XMLRaw, XMLText, getValue, isEmpty, isFunction, isObject, ref,
    hasProp = {}.hasOwnProperty;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js"), isObject = ref.isObject, isFunction = ref.isFunction, isEmpty = ref.isEmpty, getValue = ref.getValue;

  XMLElement = null;

  XMLCData = null;

  XMLComment = null;

  XMLDeclaration = null;

  XMLDocType = null;

  XMLRaw = null;

  XMLText = null;

  XMLProcessingInstruction = null;

  module.exports = XMLNode = (function() {
    function XMLNode(parent) {
      this.parent = parent;
      if (this.parent) {
        this.options = this.parent.options;
        this.stringify = this.parent.stringify;
      }
      this.children = [];
      if (!XMLElement) {
        XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xmlbuilder/lib/XMLElement.js");
        XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xmlbuilder/lib/XMLCData.js");
        XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xmlbuilder/lib/XMLComment.js");
        XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xmlbuilder/lib/XMLDeclaration.js");
        XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xmlbuilder/lib/XMLDocType.js");
        XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xmlbuilder/lib/XMLRaw.js");
        XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xmlbuilder/lib/XMLText.js");
        XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");
      }
    }

    XMLNode.prototype.element = function(name, attributes, text) {
      var childNode, item, j, k, key, lastChild, len, len1, ref1, val;
      lastChild = null;
      if (attributes == null) {
        attributes = {};
      }
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      if (name != null) {
        name = getValue(name);
      }
      if (Array.isArray(name)) {
        for (j = 0, len = name.length; j < len; j++) {
          item = name[j];
          lastChild = this.element(item);
        }
      } else if (isFunction(name)) {
        lastChild = this.element(name.apply());
      } else if (isObject(name)) {
        for (key in name) {
          if (!hasProp.call(name, key)) continue;
          val = name[key];
          if (isFunction(val)) {
            val = val.apply();
          }
          if ((isObject(val)) && (isEmpty(val))) {
            val = null;
          }
          if (!this.options.ignoreDecorators && this.stringify.convertAttKey && key.indexOf(this.stringify.convertAttKey) === 0) {
            lastChild = this.attribute(key.substr(this.stringify.convertAttKey.length), val);
          } else if (!this.options.separateArrayItems && Array.isArray(val)) {
            for (k = 0, len1 = val.length; k < len1; k++) {
              item = val[k];
              childNode = {};
              childNode[key] = item;
              lastChild = this.element(childNode);
            }
          } else if (isObject(val)) {
            lastChild = this.element(key);
            lastChild.element(val);
          } else {
            lastChild = this.element(key, val);
          }
        }
      } else {
        if (!this.options.ignoreDecorators && this.stringify.convertTextKey && name.indexOf(this.stringify.convertTextKey) === 0) {
          lastChild = this.text(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCDataKey && name.indexOf(this.stringify.convertCDataKey) === 0) {
          lastChild = this.cdata(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertCommentKey && name.indexOf(this.stringify.convertCommentKey) === 0) {
          lastChild = this.comment(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertRawKey && name.indexOf(this.stringify.convertRawKey) === 0) {
          lastChild = this.raw(text);
        } else if (!this.options.ignoreDecorators && this.stringify.convertPIKey && name.indexOf(this.stringify.convertPIKey) === 0) {
          lastChild = this.instruction(name.substr(this.stringify.convertPIKey.length), text);
        } else {
          lastChild = this.node(name, attributes, text);
        }
      }
      if (lastChild == null) {
        throw new Error("Could not create any elements with: " + name + ". " + this.debugInfo());
      }
      return lastChild;
    };

    XMLNode.prototype.insertBefore = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.insertAfter = function(name, attributes, text) {
      var child, i, removed;
      if (this.isRoot) {
        throw new Error("Cannot insert elements at root level. " + this.debugInfo(name));
      }
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.element(name, attributes, text);
      Array.prototype.push.apply(this.parent.children, removed);
      return child;
    };

    XMLNode.prototype.remove = function() {
      var i, ref1;
      if (this.isRoot) {
        throw new Error("Cannot remove the root element. " + this.debugInfo());
      }
      i = this.parent.children.indexOf(this);
      [].splice.apply(this.parent.children, [i, i - i + 1].concat(ref1 = [])), ref1;
      return this.parent;
    };

    XMLNode.prototype.node = function(name, attributes, text) {
      var child, ref1;
      if (name != null) {
        name = getValue(name);
      }
      attributes || (attributes = {});
      attributes = getValue(attributes);
      if (!isObject(attributes)) {
        ref1 = [attributes, text], text = ref1[0], attributes = ref1[1];
      }
      child = new XMLElement(this, name, attributes);
      if (text != null) {
        child.text(text);
      }
      this.children.push(child);
      return child;
    };

    XMLNode.prototype.text = function(value) {
      var child;
      child = new XMLText(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.cdata = function(value) {
      var child;
      child = new XMLCData(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.comment = function(value) {
      var child;
      child = new XMLComment(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.commentBefore = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.commentAfter = function(value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.comment(value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.raw = function(value) {
      var child;
      child = new XMLRaw(this, value);
      this.children.push(child);
      return this;
    };

    XMLNode.prototype.instruction = function(target, value) {
      var insTarget, insValue, instruction, j, len;
      if (target != null) {
        target = getValue(target);
      }
      if (value != null) {
        value = getValue(value);
      }
      if (Array.isArray(target)) {
        for (j = 0, len = target.length; j < len; j++) {
          insTarget = target[j];
          this.instruction(insTarget);
        }
      } else if (isObject(target)) {
        for (insTarget in target) {
          if (!hasProp.call(target, insTarget)) continue;
          insValue = target[insTarget];
          this.instruction(insTarget, insValue);
        }
      } else {
        if (isFunction(value)) {
          value = value.apply();
        }
        instruction = new XMLProcessingInstruction(this, target, value);
        this.children.push(instruction);
      }
      return this;
    };

    XMLNode.prototype.instructionBefore = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.instructionAfter = function(target, value) {
      var child, i, removed;
      i = this.parent.children.indexOf(this);
      removed = this.parent.children.splice(i + 1);
      child = this.parent.instruction(target, value);
      Array.prototype.push.apply(this.parent.children, removed);
      return this;
    };

    XMLNode.prototype.declaration = function(version, encoding, standalone) {
      var doc, xmldec;
      doc = this.document();
      xmldec = new XMLDeclaration(doc, version, encoding, standalone);
      if (doc.children[0] instanceof XMLDeclaration) {
        doc.children[0] = xmldec;
      } else {
        doc.children.unshift(xmldec);
      }
      return doc.root() || doc;
    };

    XMLNode.prototype.doctype = function(pubID, sysID) {
      var child, doc, doctype, i, j, k, len, len1, ref1, ref2;
      doc = this.document();
      doctype = new XMLDocType(doc, pubID, sysID);
      ref1 = doc.children;
      for (i = j = 0, len = ref1.length; j < len; i = ++j) {
        child = ref1[i];
        if (child instanceof XMLDocType) {
          doc.children[i] = doctype;
          return doctype;
        }
      }
      ref2 = doc.children;
      for (i = k = 0, len1 = ref2.length; k < len1; i = ++k) {
        child = ref2[i];
        if (child.isRoot) {
          doc.children.splice(i, 0, doctype);
          return doctype;
        }
      }
      doc.children.push(doctype);
      return doctype;
    };

    XMLNode.prototype.up = function() {
      if (this.isRoot) {
        throw new Error("The root node has no parent. Use doc() if you need to get the document object.");
      }
      return this.parent;
    };

    XMLNode.prototype.root = function() {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node.rootObject;
        } else if (node.isRoot) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.document = function() {
      var node;
      node = this;
      while (node) {
        if (node.isDocument) {
          return node;
        } else {
          node = node.parent;
        }
      }
    };

    XMLNode.prototype.end = function(options) {
      return this.document().end(options);
    };

    XMLNode.prototype.prev = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i < 1) {
        throw new Error("Already at the first node. " + this.debugInfo());
      }
      return this.parent.children[i - 1];
    };

    XMLNode.prototype.next = function() {
      var i;
      i = this.parent.children.indexOf(this);
      if (i === -1 || i === this.parent.children.length - 1) {
        throw new Error("Already at the last node. " + this.debugInfo());
      }
      return this.parent.children[i + 1];
    };

    XMLNode.prototype.importDocument = function(doc) {
      var clonedRoot;
      clonedRoot = doc.root().clone();
      clonedRoot.parent = this;
      clonedRoot.isRoot = false;
      this.children.push(clonedRoot);
      return this;
    };

    XMLNode.prototype.debugInfo = function(name) {
      var ref1, ref2;
      name = name || this.name;
      if ((name == null) && !((ref1 = this.parent) != null ? ref1.name : void 0)) {
        return "";
      } else if (name == null) {
        return "parent: <" + this.parent.name + ">";
      } else if (!((ref2 = this.parent) != null ? ref2.name : void 0)) {
        return "node: <" + name + ">";
      } else {
        return "node: <" + name + ">, parent: <" + this.parent.name + ">";
      }
    };

    XMLNode.prototype.ele = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.nod = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.txt = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.dat = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.com = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.ins = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.doc = function() {
      return this.document();
    };

    XMLNode.prototype.dec = function(version, encoding, standalone) {
      return this.declaration(version, encoding, standalone);
    };

    XMLNode.prototype.dtd = function(pubID, sysID) {
      return this.doctype(pubID, sysID);
    };

    XMLNode.prototype.e = function(name, attributes, text) {
      return this.element(name, attributes, text);
    };

    XMLNode.prototype.n = function(name, attributes, text) {
      return this.node(name, attributes, text);
    };

    XMLNode.prototype.t = function(value) {
      return this.text(value);
    };

    XMLNode.prototype.d = function(value) {
      return this.cdata(value);
    };

    XMLNode.prototype.c = function(value) {
      return this.comment(value);
    };

    XMLNode.prototype.r = function(value) {
      return this.raw(value);
    };

    XMLNode.prototype.i = function(target, value) {
      return this.instruction(target, value);
    };

    XMLNode.prototype.u = function() {
      return this.up();
    };

    XMLNode.prototype.importXMLBuilder = function(doc) {
      return this.importDocument(doc);
    };

    return XMLNode;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLProcessingInstruction.js":
/*!******************************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLProcessingInstruction.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNode, XMLProcessingInstruction,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLProcessingInstruction = (function(superClass) {
    extend(XMLProcessingInstruction, superClass);

    function XMLProcessingInstruction(parent, target, value) {
      XMLProcessingInstruction.__super__.constructor.call(this, parent);
      if (target == null) {
        throw new Error("Missing instruction target. " + this.debugInfo());
      }
      this.target = this.stringify.insTarget(target);
      if (value) {
        this.value = this.stringify.insValue(value);
      }
    }

    XMLProcessingInstruction.prototype.clone = function() {
      return Object.create(this);
    };

    XMLProcessingInstruction.prototype.toString = function(options) {
      return this.options.writer.set(options).processingInstruction(this);
    };

    return XMLProcessingInstruction;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLRaw.js":
/*!************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLRaw.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNode, XMLRaw,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLRaw = (function(superClass) {
    extend(XMLRaw, superClass);

    function XMLRaw(parent, text) {
      XMLRaw.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing raw text. " + this.debugInfo());
      }
      this.value = this.stringify.raw(text);
    }

    XMLRaw.prototype.clone = function() {
      return Object.create(this);
    };

    XMLRaw.prototype.toString = function(options) {
      return this.options.writer.set(options).raw(this);
    };

    return XMLRaw;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLStreamWriter.js":
/*!*********************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLStreamWriter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStreamWriter, XMLText, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xmlbuilder/lib/XMLComment.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xmlbuilder/lib/XMLElement.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "../node_modules/xmlbuilder/lib/XMLWriterBase.js");

  module.exports = XMLStreamWriter = (function(superClass) {
    extend(XMLStreamWriter, superClass);

    function XMLStreamWriter(stream, options) {
      XMLStreamWriter.__super__.constructor.call(this, options);
      this.stream = stream;
    }

    XMLStreamWriter.prototype.document = function(doc) {
      var child, i, j, len, len1, ref, ref1, results;
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        child.isLastRootNode = false;
      }
      doc.children[doc.children.length - 1].isLastRootNode = true;
      ref1 = doc.children;
      results = [];
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        child = ref1[j];
        switch (false) {
          case !(child instanceof XMLDeclaration):
            results.push(this.declaration(child));
            break;
          case !(child instanceof XMLDocType):
            results.push(this.docType(child));
            break;
          case !(child instanceof XMLComment):
            results.push(this.comment(child));
            break;
          case !(child instanceof XMLProcessingInstruction):
            results.push(this.processingInstruction(child));
            break;
          default:
            results.push(this.element(child));
        }
      }
      return results;
    };

    XMLStreamWriter.prototype.attribute = function(att) {
      return this.stream.write(' ' + att.name + '="' + att.value + '"');
    };

    XMLStreamWriter.prototype.cdata = function(node, level) {
      return this.stream.write(this.space(level) + '<![CDATA[' + node.text + ']]>' + this.endline(node));
    };

    XMLStreamWriter.prototype.comment = function(node, level) {
      return this.stream.write(this.space(level) + '<!-- ' + node.text + ' -->' + this.endline(node));
    };

    XMLStreamWriter.prototype.declaration = function(node, level) {
      this.stream.write(this.space(level));
      this.stream.write('<?xml version="' + node.version + '"');
      if (node.encoding != null) {
        this.stream.write(' encoding="' + node.encoding + '"');
      }
      if (node.standalone != null) {
        this.stream.write(' standalone="' + node.standalone + '"');
      }
      this.stream.write(this.spacebeforeslash + '?>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.docType = function(node, level) {
      var child, i, len, ref;
      level || (level = 0);
      this.stream.write(this.space(level));
      this.stream.write('<!DOCTYPE ' + node.root().name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      if (node.children.length > 0) {
        this.stream.write(' [');
        this.stream.write(this.endline(node));
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          switch (false) {
            case !(child instanceof XMLDTDAttList):
              this.dtdAttList(child, level + 1);
              break;
            case !(child instanceof XMLDTDElement):
              this.dtdElement(child, level + 1);
              break;
            case !(child instanceof XMLDTDEntity):
              this.dtdEntity(child, level + 1);
              break;
            case !(child instanceof XMLDTDNotation):
              this.dtdNotation(child, level + 1);
              break;
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown DTD node type: " + child.constructor.name);
          }
        }
        this.stream.write(']');
      }
      this.stream.write(this.spacebeforeslash + '>');
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.element = function(node, level) {
      var att, child, i, len, name, ref, ref1, space;
      level || (level = 0);
      space = this.space(level);
      this.stream.write(space + '<' + node.name);
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function(e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          this.stream.write('></' + node.name + '>');
        } else {
          this.stream.write(this.spacebeforeslash + '/>');
        }
      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
        this.stream.write('>');
        this.stream.write(node.children[0].value);
        this.stream.write('</' + node.name + '>');
      } else {
        this.stream.write('>' + this.newline);
        ref1 = node.children;
        for (i = 0, len = ref1.length; i < len; i++) {
          child = ref1[i];
          switch (false) {
            case !(child instanceof XMLCData):
              this.cdata(child, level + 1);
              break;
            case !(child instanceof XMLComment):
              this.comment(child, level + 1);
              break;
            case !(child instanceof XMLElement):
              this.element(child, level + 1);
              break;
            case !(child instanceof XMLRaw):
              this.raw(child, level + 1);
              break;
            case !(child instanceof XMLText):
              this.text(child, level + 1);
              break;
            case !(child instanceof XMLProcessingInstruction):
              this.processingInstruction(child, level + 1);
              break;
            default:
              throw new Error("Unknown XML node type: " + child.constructor.name);
          }
        }
        this.stream.write(space + '</' + node.name + '>');
      }
      return this.stream.write(this.endline(node));
    };

    XMLStreamWriter.prototype.processingInstruction = function(node, level) {
      this.stream.write(this.space(level) + '<?' + node.target);
      if (node.value) {
        this.stream.write(' ' + node.value);
      }
      return this.stream.write(this.spacebeforeslash + '?>' + this.endline(node));
    };

    XMLStreamWriter.prototype.raw = function(node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.text = function(node, level) {
      return this.stream.write(this.space(level) + node.value + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdAttList = function(node, level) {
      this.stream.write(this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType);
      if (node.defaultValueType !== '#DEFAULT') {
        this.stream.write(' ' + node.defaultValueType);
      }
      if (node.defaultValue) {
        this.stream.write(' "' + node.defaultValue + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdElement = function(node, level) {
      this.stream.write(this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value);
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdEntity = function(node, level) {
      this.stream.write(this.space(level) + '<!ENTITY');
      if (node.pe) {
        this.stream.write(' %');
      }
      this.stream.write(' ' + node.name);
      if (node.value) {
        this.stream.write(' "' + node.value + '"');
      } else {
        if (node.pubID && node.sysID) {
          this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
        } else if (node.sysID) {
          this.stream.write(' SYSTEM "' + node.sysID + '"');
        }
        if (node.nData) {
          this.stream.write(' NDATA ' + node.nData);
        }
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.dtdNotation = function(node, level) {
      this.stream.write(this.space(level) + '<!NOTATION ' + node.name);
      if (node.pubID && node.sysID) {
        this.stream.write(' PUBLIC "' + node.pubID + '" "' + node.sysID + '"');
      } else if (node.pubID) {
        this.stream.write(' PUBLIC "' + node.pubID + '"');
      } else if (node.sysID) {
        this.stream.write(' SYSTEM "' + node.sysID + '"');
      }
      return this.stream.write(this.spacebeforeslash + '>' + this.endline(node));
    };

    XMLStreamWriter.prototype.endline = function(node) {
      if (!node.isLastRootNode) {
        return this.newline;
      } else {
        return '';
      }
    };

    return XMLStreamWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLStringWriter.js":
/*!*********************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLStringWriter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLCData, XMLComment, XMLDTDAttList, XMLDTDElement, XMLDTDEntity, XMLDTDNotation, XMLDeclaration, XMLDocType, XMLElement, XMLProcessingInstruction, XMLRaw, XMLStringWriter, XMLText, XMLWriterBase,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLDeclaration = __webpack_require__(/*! ./XMLDeclaration */ "../node_modules/xmlbuilder/lib/XMLDeclaration.js");

  XMLDocType = __webpack_require__(/*! ./XMLDocType */ "../node_modules/xmlbuilder/lib/XMLDocType.js");

  XMLCData = __webpack_require__(/*! ./XMLCData */ "../node_modules/xmlbuilder/lib/XMLCData.js");

  XMLComment = __webpack_require__(/*! ./XMLComment */ "../node_modules/xmlbuilder/lib/XMLComment.js");

  XMLElement = __webpack_require__(/*! ./XMLElement */ "../node_modules/xmlbuilder/lib/XMLElement.js");

  XMLRaw = __webpack_require__(/*! ./XMLRaw */ "../node_modules/xmlbuilder/lib/XMLRaw.js");

  XMLText = __webpack_require__(/*! ./XMLText */ "../node_modules/xmlbuilder/lib/XMLText.js");

  XMLProcessingInstruction = __webpack_require__(/*! ./XMLProcessingInstruction */ "../node_modules/xmlbuilder/lib/XMLProcessingInstruction.js");

  XMLDTDAttList = __webpack_require__(/*! ./XMLDTDAttList */ "../node_modules/xmlbuilder/lib/XMLDTDAttList.js");

  XMLDTDElement = __webpack_require__(/*! ./XMLDTDElement */ "../node_modules/xmlbuilder/lib/XMLDTDElement.js");

  XMLDTDEntity = __webpack_require__(/*! ./XMLDTDEntity */ "../node_modules/xmlbuilder/lib/XMLDTDEntity.js");

  XMLDTDNotation = __webpack_require__(/*! ./XMLDTDNotation */ "../node_modules/xmlbuilder/lib/XMLDTDNotation.js");

  XMLWriterBase = __webpack_require__(/*! ./XMLWriterBase */ "../node_modules/xmlbuilder/lib/XMLWriterBase.js");

  module.exports = XMLStringWriter = (function(superClass) {
    extend(XMLStringWriter, superClass);

    function XMLStringWriter(options) {
      XMLStringWriter.__super__.constructor.call(this, options);
    }

    XMLStringWriter.prototype.document = function(doc) {
      var child, i, len, r, ref;
      this.textispresent = false;
      r = '';
      ref = doc.children;
      for (i = 0, len = ref.length; i < len; i++) {
        child = ref[i];
        r += (function() {
          switch (false) {
            case !(child instanceof XMLDeclaration):
              return this.declaration(child);
            case !(child instanceof XMLDocType):
              return this.docType(child);
            case !(child instanceof XMLComment):
              return this.comment(child);
            case !(child instanceof XMLProcessingInstruction):
              return this.processingInstruction(child);
            default:
              return this.element(child, 0);
          }
        }).call(this);
      }
      if (this.pretty && r.slice(-this.newline.length) === this.newline) {
        r = r.slice(0, -this.newline.length);
      }
      return r;
    };

    XMLStringWriter.prototype.attribute = function(att) {
      return ' ' + att.name + '="' + att.value + '"';
    };

    XMLStringWriter.prototype.cdata = function(node, level) {
      return this.space(level) + '<![CDATA[' + node.text + ']]>' + this.newline;
    };

    XMLStringWriter.prototype.comment = function(node, level) {
      return this.space(level) + '<!-- ' + node.text + ' -->' + this.newline;
    };

    XMLStringWriter.prototype.declaration = function(node, level) {
      var r;
      r = this.space(level);
      r += '<?xml version="' + node.version + '"';
      if (node.encoding != null) {
        r += ' encoding="' + node.encoding + '"';
      }
      if (node.standalone != null) {
        r += ' standalone="' + node.standalone + '"';
      }
      r += this.spacebeforeslash + '?>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.docType = function(node, level) {
      var child, i, len, r, ref;
      level || (level = 0);
      r = this.space(level);
      r += '<!DOCTYPE ' + node.root().name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      if (node.children.length > 0) {
        r += ' [';
        r += this.newline;
        ref = node.children;
        for (i = 0, len = ref.length; i < len; i++) {
          child = ref[i];
          r += (function() {
            switch (false) {
              case !(child instanceof XMLDTDAttList):
                return this.dtdAttList(child, level + 1);
              case !(child instanceof XMLDTDElement):
                return this.dtdElement(child, level + 1);
              case !(child instanceof XMLDTDEntity):
                return this.dtdEntity(child, level + 1);
              case !(child instanceof XMLDTDNotation):
                return this.dtdNotation(child, level + 1);
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown DTD node type: " + child.constructor.name);
            }
          }).call(this);
        }
        r += ']';
      }
      r += this.spacebeforeslash + '>';
      r += this.newline;
      return r;
    };

    XMLStringWriter.prototype.element = function(node, level) {
      var att, child, i, j, len, len1, name, r, ref, ref1, ref2, space, textispresentwasset;
      level || (level = 0);
      textispresentwasset = false;
      if (this.textispresent) {
        this.newline = '';
        this.pretty = false;
      } else {
        this.newline = this.newlinedefault;
        this.pretty = this.prettydefault;
      }
      space = this.space(level);
      r = '';
      r += space + '<' + node.name;
      ref = node.attributes;
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        att = ref[name];
        r += this.attribute(att);
      }
      if (node.children.length === 0 || node.children.every(function(e) {
        return e.value === '';
      })) {
        if (this.allowEmpty) {
          r += '></' + node.name + '>' + this.newline;
        } else {
          r += this.spacebeforeslash + '/>' + this.newline;
        }
      } else if (this.pretty && node.children.length === 1 && (node.children[0].value != null)) {
        r += '>';
        r += node.children[0].value;
        r += '</' + node.name + '>' + this.newline;
      } else {
        if (this.dontprettytextnodes) {
          ref1 = node.children;
          for (i = 0, len = ref1.length; i < len; i++) {
            child = ref1[i];
            if (child.value != null) {
              this.textispresent++;
              textispresentwasset = true;
              break;
            }
          }
        }
        if (this.textispresent) {
          this.newline = '';
          this.pretty = false;
          space = this.space(level);
        }
        r += '>' + this.newline;
        ref2 = node.children;
        for (j = 0, len1 = ref2.length; j < len1; j++) {
          child = ref2[j];
          r += (function() {
            switch (false) {
              case !(child instanceof XMLCData):
                return this.cdata(child, level + 1);
              case !(child instanceof XMLComment):
                return this.comment(child, level + 1);
              case !(child instanceof XMLElement):
                return this.element(child, level + 1);
              case !(child instanceof XMLRaw):
                return this.raw(child, level + 1);
              case !(child instanceof XMLText):
                return this.text(child, level + 1);
              case !(child instanceof XMLProcessingInstruction):
                return this.processingInstruction(child, level + 1);
              default:
                throw new Error("Unknown XML node type: " + child.constructor.name);
            }
          }).call(this);
        }
        if (textispresentwasset) {
          this.textispresent--;
        }
        if (!this.textispresent) {
          this.newline = this.newlinedefault;
          this.pretty = this.prettydefault;
        }
        r += space + '</' + node.name + '>' + this.newline;
      }
      return r;
    };

    XMLStringWriter.prototype.processingInstruction = function(node, level) {
      var r;
      r = this.space(level) + '<?' + node.target;
      if (node.value) {
        r += ' ' + node.value;
      }
      r += this.spacebeforeslash + '?>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.raw = function(node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.text = function(node, level) {
      return this.space(level) + node.value + this.newline;
    };

    XMLStringWriter.prototype.dtdAttList = function(node, level) {
      var r;
      r = this.space(level) + '<!ATTLIST ' + node.elementName + ' ' + node.attributeName + ' ' + node.attributeType;
      if (node.defaultValueType !== '#DEFAULT') {
        r += ' ' + node.defaultValueType;
      }
      if (node.defaultValue) {
        r += ' "' + node.defaultValue + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdElement = function(node, level) {
      return this.space(level) + '<!ELEMENT ' + node.name + ' ' + node.value + this.spacebeforeslash + '>' + this.newline;
    };

    XMLStringWriter.prototype.dtdEntity = function(node, level) {
      var r;
      r = this.space(level) + '<!ENTITY';
      if (node.pe) {
        r += ' %';
      }
      r += ' ' + node.name;
      if (node.value) {
        r += ' "' + node.value + '"';
      } else {
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        if (node.nData) {
          r += ' NDATA ' + node.nData;
        }
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.dtdNotation = function(node, level) {
      var r;
      r = this.space(level) + '<!NOTATION ' + node.name;
      if (node.pubID && node.sysID) {
        r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
      } else if (node.pubID) {
        r += ' PUBLIC "' + node.pubID + '"';
      } else if (node.sysID) {
        r += ' SYSTEM "' + node.sysID + '"';
      }
      r += this.spacebeforeslash + '>' + this.newline;
      return r;
    };

    XMLStringWriter.prototype.openNode = function(node, level) {
      var att, name, r, ref;
      level || (level = 0);
      if (node instanceof XMLElement) {
        r = this.space(level) + '<' + node.name;
        ref = node.attributes;
        for (name in ref) {
          if (!hasProp.call(ref, name)) continue;
          att = ref[name];
          r += this.attribute(att);
        }
        r += (node.children ? '>' : '/>') + this.newline;
        return r;
      } else {
        r = this.space(level) + '<!DOCTYPE ' + node.rootNodeName;
        if (node.pubID && node.sysID) {
          r += ' PUBLIC "' + node.pubID + '" "' + node.sysID + '"';
        } else if (node.sysID) {
          r += ' SYSTEM "' + node.sysID + '"';
        }
        r += (node.children ? ' [' : '>') + this.newline;
        return r;
      }
    };

    XMLStringWriter.prototype.closeNode = function(node, level) {
      level || (level = 0);
      switch (false) {
        case !(node instanceof XMLElement):
          return this.space(level) + '</' + node.name + '>' + this.newline;
        case !(node instanceof XMLDocType):
          return this.space(level) + ']>' + this.newline;
      }
    };

    return XMLStringWriter;

  })(XMLWriterBase);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLStringifier.js":
/*!********************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLStringifier.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLStringifier,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    hasProp = {}.hasOwnProperty;

  module.exports = XMLStringifier = (function() {
    function XMLStringifier(options) {
      this.assertLegalChar = bind(this.assertLegalChar, this);
      var key, ref, value;
      options || (options = {});
      this.noDoubleEncoding = options.noDoubleEncoding;
      ref = options.stringify || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
    }

    XMLStringifier.prototype.eleName = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.eleText = function(val) {
      val = '' + val || '';
      return this.assertLegalChar(this.elEscape(val));
    };

    XMLStringifier.prototype.cdata = function(val) {
      val = '' + val || '';
      val = val.replace(']]>', ']]]]><![CDATA[>');
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.comment = function(val) {
      val = '' + val || '';
      if (val.match(/--/)) {
        throw new Error("Comment text cannot contain double-hypen: " + val);
      }
      return this.assertLegalChar(val);
    };

    XMLStringifier.prototype.raw = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.attName = function(val) {
      return val = '' + val || '';
    };

    XMLStringifier.prototype.attValue = function(val) {
      val = '' + val || '';
      return this.attEscape(val);
    };

    XMLStringifier.prototype.insTarget = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.insValue = function(val) {
      val = '' + val || '';
      if (val.match(/\?>/)) {
        throw new Error("Invalid processing instruction value: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlVersion = function(val) {
      val = '' + val || '';
      if (!val.match(/1\.[0-9]+/)) {
        throw new Error("Invalid version number: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlEncoding = function(val) {
      val = '' + val || '';
      if (!val.match(/^[A-Za-z](?:[A-Za-z0-9._-])*$/)) {
        throw new Error("Invalid encoding: " + val);
      }
      return val;
    };

    XMLStringifier.prototype.xmlStandalone = function(val) {
      if (val) {
        return "yes";
      } else {
        return "no";
      }
    };

    XMLStringifier.prototype.dtdPubID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdSysID = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdElementValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttType = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdAttDefault = function(val) {
      if (val != null) {
        return '' + val || '';
      } else {
        return val;
      }
    };

    XMLStringifier.prototype.dtdEntityValue = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.dtdNData = function(val) {
      return '' + val || '';
    };

    XMLStringifier.prototype.convertAttKey = '@';

    XMLStringifier.prototype.convertPIKey = '?';

    XMLStringifier.prototype.convertTextKey = '#text';

    XMLStringifier.prototype.convertCDataKey = '#cdata';

    XMLStringifier.prototype.convertCommentKey = '#comment';

    XMLStringifier.prototype.convertRawKey = '#raw';

    XMLStringifier.prototype.assertLegalChar = function(str) {
      var res;
      res = str.match(/[\0\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/);
      if (res) {
        throw new Error("Invalid character in string: " + str + " at index " + res.index);
      }
      return str;
    };

    XMLStringifier.prototype.elEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\r/g, '&#xD;');
    };

    XMLStringifier.prototype.attEscape = function(str) {
      var ampregex;
      ampregex = this.noDoubleEncoding ? /(?!&\S+;)&/g : /&/g;
      return str.replace(ampregex, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/\t/g, '&#x9;').replace(/\n/g, '&#xA;').replace(/\r/g, '&#xD;');
    };

    return XMLStringifier;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLText.js":
/*!*************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLText.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLNode, XMLText,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  XMLNode = __webpack_require__(/*! ./XMLNode */ "../node_modules/xmlbuilder/lib/XMLNode.js");

  module.exports = XMLText = (function(superClass) {
    extend(XMLText, superClass);

    function XMLText(parent, text) {
      XMLText.__super__.constructor.call(this, parent);
      if (text == null) {
        throw new Error("Missing element text. " + this.debugInfo());
      }
      this.value = this.stringify.eleText(text);
    }

    XMLText.prototype.clone = function() {
      return Object.create(this);
    };

    XMLText.prototype.toString = function(options) {
      return this.options.writer.set(options).text(this);
    };

    return XMLText;

  })(XMLNode);

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/XMLWriterBase.js":
/*!*******************************************************!*\
  !*** ../node_modules/xmlbuilder/lib/XMLWriterBase.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLWriterBase,
    hasProp = {}.hasOwnProperty;

  module.exports = XMLWriterBase = (function() {
    function XMLWriterBase(options) {
      var key, ref, ref1, ref2, ref3, ref4, ref5, ref6, value;
      options || (options = {});
      this.pretty = options.pretty || false;
      this.allowEmpty = (ref = options.allowEmpty) != null ? ref : false;
      if (this.pretty) {
        this.indent = (ref1 = options.indent) != null ? ref1 : '  ';
        this.newline = (ref2 = options.newline) != null ? ref2 : '\n';
        this.offset = (ref3 = options.offset) != null ? ref3 : 0;
        this.dontprettytextnodes = (ref4 = options.dontprettytextnodes) != null ? ref4 : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = (ref5 = options.spacebeforeslash) != null ? ref5 : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref6 = options.writer || {};
      for (key in ref6) {
        if (!hasProp.call(ref6, key)) continue;
        value = ref6[key];
        this[key] = value;
      }
    }

    XMLWriterBase.prototype.set = function(options) {
      var key, ref, value;
      options || (options = {});
      if ("pretty" in options) {
        this.pretty = options.pretty;
      }
      if ("allowEmpty" in options) {
        this.allowEmpty = options.allowEmpty;
      }
      if (this.pretty) {
        this.indent = "indent" in options ? options.indent : '  ';
        this.newline = "newline" in options ? options.newline : '\n';
        this.offset = "offset" in options ? options.offset : 0;
        this.dontprettytextnodes = "dontprettytextnodes" in options ? options.dontprettytextnodes : 0;
      } else {
        this.indent = '';
        this.newline = '';
        this.offset = 0;
        this.dontprettytextnodes = 0;
      }
      this.spacebeforeslash = "spacebeforeslash" in options ? options.spacebeforeslash : '';
      if (this.spacebeforeslash === true) {
        this.spacebeforeslash = ' ';
      }
      this.newlinedefault = this.newline;
      this.prettydefault = this.pretty;
      ref = options.writer || {};
      for (key in ref) {
        if (!hasProp.call(ref, key)) continue;
        value = ref[key];
        this[key] = value;
      }
      return this;
    };

    XMLWriterBase.prototype.space = function(level) {
      var indent;
      if (this.pretty) {
        indent = (level || 0) + this.offset + 1;
        if (indent > 0) {
          return new Array(indent).join(this.indent);
        } else {
          return '';
        }
      } else {
        return '';
      }
    };

    return XMLWriterBase;

  })();

}).call(this);


/***/ }),

/***/ "../node_modules/xmlbuilder/lib/index.js":
/*!***********************************************!*\
  !*** ../node_modules/xmlbuilder/lib/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Generated by CoffeeScript 1.12.7
(function() {
  var XMLDocument, XMLDocumentCB, XMLStreamWriter, XMLStringWriter, assign, isFunction, ref;

  ref = __webpack_require__(/*! ./Utility */ "../node_modules/xmlbuilder/lib/Utility.js"), assign = ref.assign, isFunction = ref.isFunction;

  XMLDocument = __webpack_require__(/*! ./XMLDocument */ "../node_modules/xmlbuilder/lib/XMLDocument.js");

  XMLDocumentCB = __webpack_require__(/*! ./XMLDocumentCB */ "../node_modules/xmlbuilder/lib/XMLDocumentCB.js");

  XMLStringWriter = __webpack_require__(/*! ./XMLStringWriter */ "../node_modules/xmlbuilder/lib/XMLStringWriter.js");

  XMLStreamWriter = __webpack_require__(/*! ./XMLStreamWriter */ "../node_modules/xmlbuilder/lib/XMLStreamWriter.js");

  module.exports.create = function(name, xmldec, doctype, options) {
    var doc, root;
    if (name == null) {
      throw new Error("Root element needs a name.");
    }
    options = assign({}, xmldec, doctype, options);
    doc = new XMLDocument(options);
    root = doc.element(name);
    if (!options.headless) {
      doc.declaration(options);
      if ((options.pubID != null) || (options.sysID != null)) {
        doc.doctype(options);
      }
    }
    return root;
  };

  module.exports.begin = function(options, onData, onEnd) {
    var ref1;
    if (isFunction(options)) {
      ref1 = [options, onData], onData = ref1[0], onEnd = ref1[1];
      options = {};
    }
    if (onData) {
      return new XMLDocumentCB(options, onData, onEnd);
    } else {
      return new XMLDocument(options);
    }
  };

  module.exports.stringWriter = function(options) {
    return new XMLStringWriter(options);
  };

  module.exports.streamWriter = function(stream, options) {
    return new XMLStreamWriter(stream, options);
  };

}).call(this);


/***/ }),

/***/ "../utils/spin.js":
/*!************************!*\
  !*** ../utils/spin.js ***!
  \************************/
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "../utils/stdutils.js":
/*!****************************!*\
  !*** ../utils/stdutils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
var extend = function extend(o, p) {
  for (prop in p) {
    // For all props in p.
    o[prop] = p[prop]; // Add the property to o.
  }

  return o;
};

module.exports.extend = extend;
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

var merge = function merge(o, p) {
  for (prop in p) {
    // For all props in p.
    if (o.hasOwnProperty[prop]) continue; // Except those already in o.

    o[prop] = p[prop]; // Add the property to o.
  }

  return o;
};

module.exports.merge = merge;
/**
 * Remove properties from o if there is not a property with the 
 * same name in p. Return o.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */

var restrict = function restrict(o, p) {
  for (prop in o) {
    // For all props in o
    if (!(prop in p)) delete o[prop]; // Delete if not in p
  }

  return o;
};

module.exports.restrict = restrict;
/**
 * For each property of p, delete the property with the same name 
 * from o. Return o.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */

var subtract = function subtract(o, p) {
  for (prop in p) {
    // For all props in p
    delete o[prop]; // Delete from o (deleting a
    // nonexistent prop is harmless)
  }

  return o;
};

module.exports.subtract = subtract;
/**
 * Return a new object that holds the properties of both o and p.
 * If o and p have properties by the same name, the values 
 * from o are used.
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */

var union = function union(o, p) {
  return extend(extend({}, o), p);
};

module.exports.union = union;
/**
 * Return a new object that holds only the properties of o that 
 * also appear in p. This is something like the intersection of o 
 * and p, but the values of the properties in p are discarded
 *
 * @param {object} o
 * @param {object} p
 * @returns {object}
 */

var intersection = function intersection(o, p) {
  return restrict(extend({}, o), p);
};

module.exports.intersection = intersection;
/**
 * Return an array that holds the names of the enumerable own 
 * properties of o.
 *
 * @param {object} o
 * @returns {array}
 */

var keys = function keys(o) {
  if (_typeof(o) !== "object") throw TypeError(); // Object argument required

  var result = []; // The array we will return

  for (var _prop in o) {
    // For all enumerable properties
    if (o.hasOwnProperty(_prop)) // If it is an own property
      result.push(_prop); // add it to the array.
  }

  return result; // Return the array.
};

module.exports.keys = keys;
/**
 * and
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */

var and = function and(o, p) {
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
};

module.exports.and = and;
/**
 * del
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */

var del = function del(o, p) {
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
};

module.exports.del = del;
/**
 * add
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */

var add = function add(o, p) {
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
};

module.exports.add = add;
/**
 * dif
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */

var dif = function dif(o, p) {
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
};

module.exports.dif = dif;
/**
 * dup
 *
 * @param {array} o
 * @param {array} p
 * @returns {array}
 */

var dup = function dup(o, p) {
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
};

module.exports.dup = dup;
/**
 * dst
 *
 * @param {array} o
 * @returns {array}
 */

var dst = function dst(o) {
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
};

module.exports.dst = dst;
/**
 * getTimeStamp
 *
 * @returns {string}
 */

var getTimeStamp = function getTimeStamp() {
  var dt = new Date();
  return dt.toISOString();
};

module.exports.getTimeStamp = getTimeStamp;
/**
 * getLocalTimeStamp
 *
 * @param {string} s
 * @returns {string}
 */

var getLocalTimeStamp = function getLocalTimeStamp(s) {
  var dt = new Date(s);

  var _yr = dt.getFullYear();

  var _mo = dt.getMonth() + 1;

  var _dy = dt.getDate();

  var _tm = dt.toTimeString().split(' ')[0];
  return "".concat(_yr, "-").concat(_mo, "-").concat(_dy, " ").concat(_tm);
};

module.exports.getLocalTimeStamp = getLocalTimeStamp;
/**
 * setTimeStamp
 *
 * @param {string} s
 * @returns {object}
 */

var setTimeStamp = function setTimeStamp(s) {
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
};

module.exports.setTimeStamp = setTimeStamp;

var isValidDate = function isValidDate(s) {
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
};

module.exports.isValidDate = isValidDate;
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

var invoke = function invoke(fn, s, i, e) {
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
};

module.exports.invoke = invoke;
/**
 * Encode the properties of an object as if they were name/value 
 * pairs from an HTML form, 
 * using application/x-www-form-urlencoded format
 */

exports.encodeFormData = function (data) {
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
};
/**
 * Decode an HTML form as if they were name/value pairs from 
 * the properties of an object, 
 * using application/x-www-form-urlencoded format↲
 */


exports.decodeFormData = function (text, sep, eq, isDecode) {
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
};
/**
 * Generated a randam characters, using 'Math.random()' method.
 * $length: number of characters to be generated.
 */


exports.makeRandStr = function (length) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
  var str = '';

  for (var i = 0; i < length; ++i) {
    str += chars[Math.floor(Math.random() * 62)];
  }

  return str;
};
/**
 * Generated a randam characters, using 'Math.random()' method.
 * $length: number of characters to be generated.
 */


exports.makeRandInt = function (length) {
  var chars = '123456789';
  var str = '';

  for (var i = 0; i < length; ++i) {
    str += chars[Math.floor(Math.random() * 9)];
  }

  return parseInt(str, 10);
};

/***/ }),

/***/ "../utils/webutils.js":
/*!****************************!*\
  !*** ../utils/webutils.js ***!
  \****************************/
/*! exports provided: util, M, log, spn, str */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "util", function() { return util; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "M", function() { return M; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spn", function() { return spn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str", function() { return str; });
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! xml2js */ "../node_modules/xml2js/lib/xml2js.js");
/* harmony import */ var xml2js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(xml2js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var xmlbuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! xmlbuilder */ "../node_modules/xmlbuilder/lib/index.js");
/* harmony import */ var xmlbuilder__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(xmlbuilder__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var iso8601_duration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! iso8601-duration */ "../node_modules/iso8601-duration/lib/index.js");
/* harmony import */ var iso8601_duration__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(iso8601_duration__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_spin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/spin */ "../utils/spin.js");
/* harmony import */ var _utils_spin__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_utils_spin__WEBPACK_IMPORTED_MODULE_3__);
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
  toCSV: function toCSV(obj) {
    var arr = new Array();

    for (var prop in obj) {
      arr.push(obj[prop]);
    }

    return arr.join();
  },
  toXML: function toXML(req, obj) {
    var xml = new Object();
    xml[req] = obj;
    return xmlbuilder__WEBPACK_IMPORTED_MODULE_1___default.a.create(xml, {
      encoding: 'utf-8'
    }).end();
  },
  toJSON: function toJSON(str) {
    return new Promise(function (resolve) {
      xml2js__WEBPACK_IMPORTED_MODULE_0___default.a.parseString(str, {
        attrkey: 'root',
        charkey: 'sub',
        trim: true,
        explicitArray: false
      }, function (err, res) {
        if (err) log.error(err);
        resolve(res);
      });
    });
  },
  toLeftDays: function toLeftDays(date) {
    var obj = Object(iso8601_duration__WEBPACK_IMPORTED_MODULE_2__["parse"])(date);
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
  Spinner: _utils_spin__WEBPACK_IMPORTED_MODULE_3___default.a,
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
    this.Spinner = new _utils_spin__WEBPACK_IMPORTED_MODULE_3___default.a(opts);
    this.target = document.getElementById(target);
  },
  spin: function spin() {
    this.Spinner.spin(this.target);
  },
  stop: function stop() {
    this.Spinner.stop();
  }
};
var str = {
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

/***/ "../utils/xhrutils.js":
/*!****************************!*\
  !*** ../utils/xhrutils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * encodeFormData
 *
 * @param data {object}
 * @returns {string}
 */
var encodeFormData = function encodeFormData(data) {
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
};
/**
 * get
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */


var get = function get(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + encodeFormData(data));

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");

      if (type.indexOf("xml") !== -1 && request.responseXML) {
        callback(request.responseXML);
      } else if (type === "application/json; charset=utf-8") {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    }
  };

  request.send(null);
};

module.exports.get = get;
/**
 * getData
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */

var getData = function getData(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url + "?" + encodeFormData(data));

  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request);
  };

  request.send(null);
};

module.exports.getData = getData;
/**
 * postData
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */

var postData = function postData(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);

  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request);
  };

  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.send(encodeFormData(data));
};

module.exports.postData = postData;
/**
 * postXML
 *
 * @param url {string}
 * @param head {object}
 * @param data {object}
 * @param callback {function}
 */

var postXML = function postXML(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var type = request.getResponseHeader("Content-Type");

      if (type === "text/xml; charset=utf-8") {
        callback(request.responseXML);
      } else if (type === "application/json; charset=utf-8") {
        callback(JSON.parse(request.responseText));
      } else {
        callback(request.responseText);
      }
    }
  };

  request.setRequestHeader("Content-Type", "text/xml; charset=UTF-8");

  for (var key in data.head) {
    request.setRequestHeader(key, data.head[key]);
  }

  request.send(data.body);
};

module.exports.postXML = postXML;
/**
 * postJSON
 *
 * @param url {string}
 * @param data {object}
 * @param callback {function}
 */

var postJSON = function postJSON(url, data, callback) {
  var request = new XMLHttpRequest();
  request.open("POST", url);

  request.onreadystatechange = function () {
    if (request.readyState === 4 && callback) callback(request);
  };

  request.setRequestHeader("Content-Type", "application/json");
  request.send(JSON.stringify(data));
};

module.exports.postJSON = postJSON;

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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");



var pspid = "AppAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  selectedContent: function selectedContent(selected, title) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: content/select');
    Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
      type: 'content/select',
      selected: selected,
      title: title
    });
  },
  fetchConfig: function fetchConfig() {
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].getConfig().then(function (config) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'config/fetch/appid',
        config: config
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: config/fetch/appid');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  writeConfig: function writeConfig(obj) {
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].putConfig(obj).then(function (config) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'config/write/appid',
        config: config
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: config/write/appid');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");



var pspid = "CompleteAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  increment: function increment(options, page) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
    page = ++page > 0 ? page : 1;
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].fetchCompleteItems(options, page).then(function (items) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/fetch/complete',
        items: items,
        options: options,
        page: page
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: item/fetch/complete');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].fetchCompleteItems(options, page).then(function (items) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/fetch/complete',
        items: items,
        options: options,
        page: page
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Response: item/fetch/complete"));
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  writeCompleteItems: function writeCompleteItems(options) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].writeCompleteItems(options).map(function (objs) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/write/complete',
        options: options
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: item/write/complete');
      return objs;
    });
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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");



var pspid = "NoteAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  increment: function increment(options, page) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
    page = ++page > 0 ? page : 1;
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].fetchItems(options, page).then(function (items) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/fetch/note',
        items: items,
        options: options,
        page: page
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: item/fetch/note');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].fetchItems(options, page).then(function (items) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/fetch/note',
        items: items,
        options: options,
        page: page
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Response: item/fetch/note"));
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  writeItems: function writeItems(options) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].writeItems(options).map(function (objs) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/write/note',
        options: options
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: item/write/note');
      return objs;
    });
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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/NoteApiClient */ "./services/NoteApiClient.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");



var pspid = "ProductsAction";
/* harmony default export */ __webpack_exports__["default"] = ({
  increment: function increment(options, page) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
    page = ++page > 0 ? page : 1;
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].fetchProductsItems(options, page).then(function (items) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/fetch/products',
        items: items,
        options: options,
        page: page
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: item/fetch/products');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  decrement: function decrement(options, page) {
    page = --page > 0 ? page : 1;
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].fetchProductsItems(options, page).then(function (items) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/fetch/products',
        items: items,
        options: options,
        page: page
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Response: item/fetch/products"));
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].stop();
    });
  },
  writeProductsItems: function writeProductsItems(options) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["spn"].spin();
    return _services_NoteApiClient__WEBPACK_IMPORTED_MODULE_1__["default"].writeProductsItems(options).map(function (objs) {
      Object(_dispatcher__WEBPACK_IMPORTED_MODULE_0__["dispatch"])({
        type: 'item/write/products',
        options: options
      });
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Response: item/write/products');
      return objs;
    });
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppBody; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_AppSidebar_AppSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/AppSidebar/AppSidebar */ "./components/AppSidebar/AppSidebar.js");
/* harmony import */ var _components_AppForm_AppForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/AppForm/AppForm */ "./components/AppForm/AppForm.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var pspid = "AppBodyView";

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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppSidebar_AppSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppForm_AppForm__WEBPACK_IMPORTED_MODULE_2__["default"], {
        config: this.props.config
      }));
    }
  }]);

  return AppBody;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

/***/ }),

/***/ "./components/AppForm/AppForm.js":
/*!***************************************!*\
  !*** ./components/AppForm/AppForm.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_AppAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "AppFormView";

var AppForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppForm, _React$Component);

  function AppForm(props) {
    var _this;

    _classCallCheck(this, AppForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppForm).call(this, props));
    _this.state = Object.assign({}, props.config);
    return _this;
  }

  _createClass(AppForm, [{
    key: "handleChangeSave",
    value: function handleChangeSave(e) {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSave');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), this.props.config);
      e.preventDefault();
      _actions_AppAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeConfig(this.state);
    }
  }, {
    key: "handleChangeText",
    value: function handleChangeText(name, e) {
      var newState = {};
      newState[name] = e.target.value;
      this.setState(newState);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pane"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: "padded-less"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Application Key ID"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "Key ID",
        value: this.state.appid,
        onChange: this.handleChangeText.bind(this, 'appid')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "User Token"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
        className: "form-control",
        placeholder: "Token",
        value: this.state.token,
        onChange: this.handleChangeText.bind(this, 'token')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Finding API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: this.state.findingApi,
        onChange: this.handleChangeText.bind(this, 'findingApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-group"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, "Trading API URL"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        placeholder: "URL",
        value: this.state.tradingApi,
        onChange: this.handleChangeText.bind(this, 'tradingApi')
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "form-actions"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-large btn-form btn-primary",
        onClick: this.handleChangeSave.bind(this)
      }, "Save"))));
    }
  }]);

  return AppForm;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);



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
/* harmony import */ var _actions_AppAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "AppSidebarView";

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
/* harmony import */ var _components_CompleteSidebar_CompleteSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/CompleteSidebar/CompleteSidebar */ "./components/CompleteSidebar/CompleteSidebar.js");
/* harmony import */ var _components_CompleteTable_CompleteTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/CompleteTable/CompleteTable */ "./components/CompleteTable/CompleteTable.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CompleteSidebar_CompleteSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: this.props.page,
        items: this.props.items,
        options: this.props.options
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CompleteTable_CompleteTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
/* harmony import */ var _actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/CompleteAction */ "./actions/CompleteAction.js");
/* harmony import */ var _components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Radio/Radio */ "./components/Radio/Radio.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var remote = electron__WEBPACK_IMPORTED_MODULE_6___default.a.remote;
var dialog = electron__WEBPACK_IMPORTED_MODULE_6___default.a.remote.dialog;
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
    key: "saveFile",
    value: function saveFile(filename, obj) {
      return new Promise(function (resolve, reject) {
        fs__WEBPACK_IMPORTED_MODULE_5___default.a.appendFile(filename, obj, function (err) {
          if (err) reject(err);
          resolve('File has been saved!');
        });
      });
    }
  }, {
    key: "touchFile",
    value: function touchFile(filename) {
      return new Promise(function (resolve) {
        fs__WEBPACK_IMPORTED_MODULE_5___default.a.closeSync(fs__WEBPACK_IMPORTED_MODULE_5___default.a.openSync(filename, 'w', 438));
        resolve('File has been touched!');
      });
    }
  }, {
    key: "showSaveDialog",
    value: function showSaveDialog(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        title: 'Save',
        filters: [{
          name: 'CSV File',
          extensions: ['csv']
        }, {
          name: 'All Files',
          extensions: ['*']
        }]
      };
      dialog.showSaveDialog(win, options, callback);
    }
  }, {
    key: "showErrorBox",
    value: function showErrorBox(str) {
      dialog.showErrorBox("Error", str);
    }
  }, {
    key: "showSaveMessageBox",
    value: function showSaveMessageBox() {
      var win = remote.getCurrentWindow();
      var options = {
        type: 'info',
        buttons: ['OK'],
        title: 'Save file',
        message: 'Save file',
        detail: 'CSV file saved.'
      };
      dialog.showMessageBox(win, options);
    }
  }, {
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

      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSave');
      if (!Number(this.state.pages)) return this.showErrorBox('Pages is not a number!');
      this.showSaveDialog(function (filename) {
        if (!filename) return _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info('File save canceled!');
        _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), 'Save file:', filename);

        _this2.touchFile(filename).then(function () {
          return _this2.saveFile(filename, _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["util"].getCSVHeader(_this2.csvHeader()));
        }).then(function () {
          _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
          _actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeCompleteItems(_this2.state).subscribe(function (obj) {
            return _this2.saveFile(filename, obj);
          }, function (err) {
            return _this2.showErrorBox(err.message);
          }, function () {
            _this2.showSaveMessageBox();

            _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info('File has been saved!');
            _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeHome",
    value: function handleChangeHome() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeHome');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, 0);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleIncrement');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, this.props.page);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, "> Request: handleDecrement"));
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].decrement(this.props.options, this.props.page);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(e) {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSearch');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.state);
      e.preventDefault();
      _actions_CompleteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.state, 0);
    }
  }, {
    key: "handleChangeReset",
    value: function handleChangeReset() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeReset');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.state);
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
      var opts = _utils_stdutils__WEBPACK_IMPORTED_MODULE_4___default.a.dst(items);
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
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "( ", _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].toLeftDays(duration), " )");
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
      var Stm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
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
      var Upd = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(Date.now());
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
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
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
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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

/***/ "./components/GlobalFooter/GlobalFooter.js":
/*!*************************************************!*\
  !*** ./components/GlobalFooter/GlobalFooter.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GlobalFooter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var remote = electron__WEBPACK_IMPORTED_MODULE_2___default.a.remote;
var dialog = electron__WEBPACK_IMPORTED_MODULE_2___default.a.remote.dialog;
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
    key: "showCloseMessageBox",
    value: function showCloseMessageBox(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        type: 'info',
        buttons: ['OK', 'Cancel'],
        title: 'Quit',
        message: 'Would you like to close this window?',
        detail: 'Close this window.'
      };
      dialog.showMessageBox(win, options, callback);
    }
  }, {
    key: "close",
    value: function close() {
      var win = remote.getCurrentWindow();
      win.close();
    }
  }, {
    key: "handleClickClose",
    value: function handleClickClose() {
      var _this = this;

      this.showCloseMessageBox(function (response) {
        _utils_webutils__WEBPACK_IMPORTED_MODULE_1__["log"].trace("".concat(pspid, ">"), 'Click button:', response);
        if (!response) _this.close();
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
        onClick: this.handleClickClose.bind(this),
        className: "btn btn-default"
      }, "Close")));
    }
  }]);

  return GlobalFooter;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);


;

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
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
/* harmony import */ var _components_NoteSidebar_NoteSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/NoteSidebar/NoteSidebar */ "./components/NoteSidebar/NoteSidebar.js");
/* harmony import */ var _components_NoteTable_NoteTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/NoteTable/NoteTable */ "./components/NoteTable/NoteTable.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NoteSidebar_NoteSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: this.props.page,
        items: this.props.items,
        options: this.props.options
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NoteTable_NoteTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NoteSidebar; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/NoteAction */ "./actions/NoteAction.js");
/* harmony import */ var _components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Radio/Radio */ "./components/Radio/Radio.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var remote = electron__WEBPACK_IMPORTED_MODULE_6___default.a.remote;
var dialog = electron__WEBPACK_IMPORTED_MODULE_6___default.a.remote.dialog;
var pspid = "NoteSidebarView";

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
    key: "saveFile",
    value: function saveFile(filename, obj) {
      return new Promise(function (resolve, reject) {
        fs__WEBPACK_IMPORTED_MODULE_5___default.a.appendFile(filename, obj, function (err) {
          if (err) reject(err);
          resolve('File has been saved!');
        });
      });
    }
  }, {
    key: "touchFile",
    value: function touchFile(filename) {
      return new Promise(function (resolve) {
        fs__WEBPACK_IMPORTED_MODULE_5___default.a.closeSync(fs__WEBPACK_IMPORTED_MODULE_5___default.a.openSync(filename, 'w', 438));
        resolve('File has been touched!');
      });
    }
  }, {
    key: "showSaveDialog",
    value: function showSaveDialog(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        title: 'Save',
        filters: [{
          name: 'CSV File',
          extensions: ['csv']
        }, {
          name: 'All Files',
          extensions: ['*']
        }]
      };
      dialog.showSaveDialog(win, options, callback);
    }
  }, {
    key: "showErrorBox",
    value: function showErrorBox(str) {
      dialog.showErrorBox("Error", str);
    }
  }, {
    key: "showSaveMessageBox",
    value: function showSaveMessageBox() {
      var win = remote.getCurrentWindow();
      var options = {
        type: 'info',
        buttons: ['OK'],
        title: 'Save file',
        message: 'Save file',
        detail: 'CSV file saved.'
      };
      dialog.showMessageBox(win, options);
    }
  }, {
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

      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSave');
      if (!Number(this.state.pages)) return this.showErrorBox('Pages is not a number!');
      this.showSaveDialog(function (filename) {
        if (!filename) return _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info('File save canceled!');
        _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), 'Save file:', filename);

        _this2.touchFile(filename).then(function () {
          return _this2.saveFile(filename, _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["util"].getCSVHeader(_this2.csvHeader()));
        }).then(function () {
          _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
          _actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeItems(_this2.state).subscribe(function (obj) {
            return _this2.saveFile(filename, obj);
          }, function (err) {
            return _this2.showErrorBox(err.message);
          }, function () {
            _this2.showSaveMessageBox();

            _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info('File has been saved!');
            _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeHome",
    value: function handleChangeHome() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeHome');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, 0);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleIncrement');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, this.props.page);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, "> Request: handleDecrement"));
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].decrement(this.props.options, this.props.page);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(e) {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSearch');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.state);
      e.preventDefault();
      _actions_NoteAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.state, 0);
    }
  }, {
    key: "handleChangeReset",
    value: function handleChangeReset() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeReset');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.state);
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
      var opts = _utils_stdutils__WEBPACK_IMPORTED_MODULE_4___default.a.dst(items);
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
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "NoteTableView";

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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "( ", _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].toLeftDays(duration), " )");
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
      var Stm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
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
      var Upd = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(Date.now());
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
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
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
/* harmony import */ var _components_ProductsSidebar_ProductsSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/ProductsSidebar/ProductsSidebar */ "./components/ProductsSidebar/ProductsSidebar.js");
/* harmony import */ var _components_ProductsTable_ProductsTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/ProductsTable/ProductsTable */ "./components/ProductsTable/ProductsTable.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ProductsSidebar_ProductsSidebar__WEBPACK_IMPORTED_MODULE_1__["default"], {
        page: this.props.page,
        items: this.props.items,
        options: this.props.options
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ProductsTable_ProductsTable__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
/* harmony import */ var _actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/ProductsAction */ "./actions/ProductsAction.js");
/* harmony import */ var _components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/Radio/Radio */ "./components/Radio/Radio.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var remote = electron__WEBPACK_IMPORTED_MODULE_6___default.a.remote;
var dialog = electron__WEBPACK_IMPORTED_MODULE_6___default.a.remote.dialog;
var pspid = "ProductsSidebarView";

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
    key: "saveFile",
    value: function saveFile(filename, obj) {
      return new Promise(function (resolve, reject) {
        fs__WEBPACK_IMPORTED_MODULE_5___default.a.appendFile(filename, obj, function (err) {
          if (err) reject(err);
          resolve('File has been saved!');
        });
      });
    }
  }, {
    key: "touchFile",
    value: function touchFile(filename) {
      return new Promise(function (resolve) {
        fs__WEBPACK_IMPORTED_MODULE_5___default.a.closeSync(fs__WEBPACK_IMPORTED_MODULE_5___default.a.openSync(filename, 'w', 438));
        resolve('File has been touched!');
      });
    }
  }, {
    key: "showSaveDialog",
    value: function showSaveDialog(callback) {
      var win = remote.getCurrentWindow();
      var options = {
        title: 'Save',
        filters: [{
          name: 'CSV File',
          extensions: ['csv']
        }, {
          name: 'All Files',
          extensions: ['*']
        }]
      };
      dialog.showSaveDialog(win, options, callback);
    }
  }, {
    key: "showErrorBox",
    value: function showErrorBox(str) {
      dialog.showErrorBox("Error", str);
    }
  }, {
    key: "showSaveMessageBox",
    value: function showSaveMessageBox() {
      var win = remote.getCurrentWindow();
      var options = {
        type: 'info',
        buttons: ['OK'],
        title: 'Save file',
        message: 'Save file',
        detail: 'CSV file saved.'
      };
      dialog.showMessageBox(win, options);
    }
  }, {
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

      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSave');
      if (!Number(this.state.pages)) return this.showErrorBox('Pages is not a number!');
      this.showSaveDialog(function (filename) {
        if (!filename) return _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info('File save canceled!');
        _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), 'Save file:', filename);

        _this2.touchFile(filename).then(function () {
          return _this2.saveFile(filename, _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["util"].getCSVHeader(_this2.csvHeader()));
        }).then(function () {
          _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].spin();
          _actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].writeProductsItems(_this2.state).subscribe(function (obj) {
            return _this2.saveFile(filename, obj);
          }, function (err) {
            return _this2.showErrorBox(err.message);
          }, function () {
            _this2.showSaveMessageBox();

            _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info('File has been saved!');
            _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["spn"].stop();
          });
        });
      });
    }
  }, {
    key: "handleChangeHome",
    value: function handleChangeHome() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeHome');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, 0);
    }
  }, {
    key: "handleIncrement",
    value: function handleIncrement() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleIncrement');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.props.options, this.props.page);
    }
  }, {
    key: "handleDecrement",
    value: function handleDecrement() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, "> Request: handleDecrement"));
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.props.options);
      _actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].decrement(this.props.options, this.props.page);
    }
  }, {
    key: "handleChangeSearch",
    value: function handleChangeSearch(e) {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeSearch');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.state);
      e.preventDefault();
      _actions_ProductsAction__WEBPACK_IMPORTED_MODULE_1__["default"].increment(this.state, 0);
    }
  }, {
    key: "handleChangeReset",
    value: function handleChangeReset() {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].info("".concat(pspid, ">"), 'Request: handleChangeReset');
      _utils_webutils__WEBPACK_IMPORTED_MODULE_3__["log"].trace("".concat(pspid, ">"), this.state);
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
      var opts = _utils_stdutils__WEBPACK_IMPORTED_MODULE_4___default.a.dst(items);
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Radio_Radio__WEBPACK_IMPORTED_MODULE_2__["default"], {
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
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "( ", _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["util"].toLeftDays(duration), " )");
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
      var Stm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
      var Etm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
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
      var Upd = _utils_stdutils__WEBPACK_IMPORTED_MODULE_1___default.a.getLocalTimeStamp(Date.now());
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
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].trace("".concat(pspid, ">"), options);
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
/* harmony import */ var _actions_AppAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      _actions_AppAction__WEBPACK_IMPORTED_MODULE_1__["default"].selectedContent(0, this.props.children[0].props.label);
    }
  }, {
    key: "handleClickTab",
    value: function handleClickTab(index, title, event) {
      event.preventDefault();
      _actions_AppAction__WEBPACK_IMPORTED_MODULE_1__["default"].selectedContent(index, title);
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
/* harmony import */ var _pages_App_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/App/App */ "./pages/App/App.js");



react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_App_App__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('app'));

if (true) {
  module.hot.accept(/*! ./pages/App/App.js */ "./pages/App/App.js", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _pages_App_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/App/App.js */ "./pages/App/App.js");
(function () {
    console.log('Accepting the updated App module!');
    _pages_App_App__WEBPACK_IMPORTED_MODULE_2__["default"].updated();
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}

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
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flux/utils */ "../node_modules/flux/utils.js");
/* harmony import */ var flux_utils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flux_utils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_appStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../stores/appStore */ "./stores/appStore.js");
/* harmony import */ var _actions_AppAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../actions/AppAction */ "./actions/AppAction.js");
/* harmony import */ var _components_AppBody_AppBody__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/AppBody/AppBody */ "./components/AppBody/AppBody.js");
/* harmony import */ var _pages_Note_Note__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../pages/Note/Note */ "./pages/Note/Note.js");
/* harmony import */ var _pages_Complete_Complete__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pages/Complete/Complete */ "./pages/Complete/Complete.js");
/* harmony import */ var _pages_Products_Products__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pages/Products/Products */ "./pages/Products/Products.js");
/* harmony import */ var _components_Tabs_Tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/Tabs/Tabs */ "./components/Tabs/Tabs.js");
/* harmony import */ var _components_Contents_Contents__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../components/Contents/Contents */ "./components/Contents/Contents.js");
/* harmony import */ var _components_GlobalHeader_GlobalHeader__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/GlobalHeader/GlobalHeader */ "./components/GlobalHeader/GlobalHeader.js");
/* harmony import */ var _components_GlobalFooter_GlobalFooter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/GlobalFooter/GlobalFooter */ "./components/GlobalFooter/GlobalFooter.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
    key: "componentWillMount",
    value: function componentWillMount() {
      _actions_AppAction__WEBPACK_IMPORTED_MODULE_4__["default"].fetchConfig();
    }
  }, {
    key: "updated",
    value: function updated() {
      console.log('Updating App modules...');
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "window"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_GlobalHeader_GlobalHeader__WEBPACK_IMPORTED_MODULE_11__["default"], {
        title: this.state.title
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Tabs_Tabs__WEBPACK_IMPORTED_MODULE_9__["default"], {
        selected: this.state.selected
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Search of items"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Search of Completed items"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Search of Product IDs"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        label: "Preference"
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Contents_Contents__WEBPACK_IMPORTED_MODULE_10__["default"], {
        selected: this.state.selected
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_Note_Note__WEBPACK_IMPORTED_MODULE_6__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_Complete_Complete__WEBPACK_IMPORTED_MODULE_7__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_Products_Products__WEBPACK_IMPORTED_MODULE_8__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppBody_AppBody__WEBPACK_IMPORTED_MODULE_5__["default"], {
        config: this.state.config
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_GlobalFooter_GlobalFooter__WEBPACK_IMPORTED_MODULE_12__["default"], null));
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [_stores_appStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return _stores_appStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(App)));

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
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_completeStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../stores/completeStore */ "./stores/completeStore.js");
/* harmony import */ var _components_CompleteBody_CompleteBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/CompleteBody/CompleteBody */ "./components/CompleteBody/CompleteBody.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CompleteBody_CompleteBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options
      });
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [_stores_completeStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return _stores_completeStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return Complete;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(Complete)));

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
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_noteStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../stores/noteStore */ "./stores/noteStore.js");
/* harmony import */ var _components_NoteBody_NoteBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/NoteBody/NoteBody */ "./components/NoteBody/NoteBody.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_NoteBody_NoteBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options
      });
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [_stores_noteStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return _stores_noteStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return Note;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(Note)));

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
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../FluxContainerConverter */ "./FluxContainerConverter.js");
/* harmony import */ var _FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_productsStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../stores/productsStore */ "./stores/productsStore.js");
/* harmony import */ var _components_ProductsBody_ProductsBody__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/ProductsBody/ProductsBody */ "./components/ProductsBody/ProductsBody.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/webutils */ "../utils/webutils.js");
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
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ProductsBody_ProductsBody__WEBPACK_IMPORTED_MODULE_4__["default"], {
        page: this.state.page,
        items: this.state.items,
        options: this.state.options
      });
    }
  }], [{
    key: "getStores",
    value: function getStores() {
      return [_stores_productsStore__WEBPACK_IMPORTED_MODULE_3__["default"]];
    }
  }, {
    key: "calculateState",
    value: function calculateState() {
      return _stores_productsStore__WEBPACK_IMPORTED_MODULE_3__["default"].getState();
    }
  }]);

  return Products;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (flux_utils__WEBPACK_IMPORTED_MODULE_1__["Container"].create(_FluxContainerConverter__WEBPACK_IMPORTED_MODULE_2___default.a.convert(Products)));

/***/ }),

/***/ "./services/NoteApiClient.js":
/*!***********************************!*\
  !*** ./services/NoteApiClient.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");
/* harmony import */ var _utils_xhrutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/xhrutils */ "../utils/xhrutils.js");
/* harmony import */ var _utils_xhrutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_utils_xhrutils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/stdutils */ "../utils/stdutils.js");
/* harmony import */ var _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_utils_stdutils__WEBPACK_IMPORTED_MODULE_2__);



_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].config('console', 'basic', 'ALL', 'note-renderer');
_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["spn"].config('app');
var pspid = "eBAPIClient";
var eBay = new Object();
/* harmony default export */ __webpack_exports__["default"] = ({
  request: function request(action, response) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].info("".concat(pspid, ">"), 'Request:', action);

    switch (action) {
      case 'config/fetch':
        return new Promise(function (resolve) {
          var memory = window.localStorage || window.UserDataStorage && new _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["str"].UserDataStorage() || new _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["str"].CookieStorage();
          eBay = JSON.parse(memory.getItem("eBay_config"));
          resolve(eBay);
        });

      case 'config/write':
        return new Promise(function (resolve) {
          var memory = window.localStorage || window.UserDataStorage && new _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["str"].UserDataStorage() || new _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["str"].CookieStorage();
          eBay = response;
          memory.setItem("eBay_config", JSON.stringify(response));
          resolve(response);
        });

      case 'findItemsByKeywords':
        return new Promise(function (resolve) {
          JSONP.request(eBay.findingApi, response, function (obj) {
            resolve(obj);
          });
        });

      case 'findCompletedItems':
        return new Promise(function (resolve) {
          JSONP.request(eBay.findingApi, response, function (obj) {
            resolve(obj);
          });
        });

      case 'findItemsByProduct':
        return new Promise(function (resolve) {
          JSONP.request(eBay.findingApi, response, function (obj) {
            resolve(obj);
          });
        });

      case 'findItemDetails':
        return new Promise(function (resolve) {
          _utils_xhrutils__WEBPACK_IMPORTED_MODULE_1___default.a.postXML(eBay.tradingApi, response, function (obj) {
            resolve(obj);
          });
        });

      default:
        return new Promise(function (resolve) {
          _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].warn("".concat(pspid, "> Unknown request !!"));
          resolve(response);
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
  getDetail: function getDetail(options) {
    return this.request('findItemDetails', this.optDetail({
      token: eBay.token,
      operation: 'GetItem'
    }, options));
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
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'options:', options);
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'page:', page);
    return this.getItems(options, page).then(this.resItems).then(this.setItems) //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  fetchCompleteItems: function fetchCompleteItems(options, page) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'options:', options);
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'page:', page);
    return this.getCompleteItems(options, page).then(this.resCompleteItems).then(this.setItems) //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  fetchProductsItems: function fetchProductsItems(options, page) {
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'options:', options);
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'page:', page);
    return this.getProductsItems(options, page).then(this.resProductsItems).then(this.setItems) //.then(R.tap(this.traceLog.bind(this)))
    .catch(this.errorLog.bind(this));
  },
  writeItems: function writeItems(options) {
    var _this = this;

    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'options:', options);
    var pages = Number(options.pages);

    var streamItems = function streamItems(idx) {
      return Rx.Observable.fromPromise(_this.getItems(options, idx));
    };

    var streamDetail = function streamDetail(obj) {
      return Rx.Observable.fromPromise(_this.getDetail({
        itemId: obj.itemId
      }));
    };

    var forkItems = function forkItems(obj) {
      return Rx.Observable.forkJoin(_this.forItems(options, obj));
    };

    var forkJSON = function forkJSON(obj) {
      return Rx.Observable.forkJoin(_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toJSON(obj));
    };

    return streamItems(1).map(this.resItems).flatMap(forkItems).map(R.map(this.resItems.bind(this))).map(R.map(this.setItems.bind(this))).map(R.flatten).flatMap(Rx.Observable.from).flatMap(streamDetail).flatMap(forkJSON).map(R.map(this.resDetail.bind(this))).map(R.map(this.setDetail.bind(this))).map(R.filter(R.curry(this.filterDetail.bind(this))(options))).map(R.map(this.renderDetail.bind(this))).map(R.map(_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toCSV.bind(this))).map(R.map(function (csv) {
      return csv + '\n';
    }));
  },
  writeCompleteItems: function writeCompleteItems(options) {
    var _this2 = this;

    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'options:', options);
    var pages = Number(options.pages);

    var streamItems = function streamItems(idx) {
      return Rx.Observable.fromPromise(_this2.getCompleteItems(options, idx));
    };

    var streamDetail = function streamDetail(obj) {
      return Rx.Observable.fromPromise(_this2.getDetail({
        itemId: obj.itemId
      }));
    };

    var forkItems = function forkItems(obj) {
      return Rx.Observable.forkJoin(_this2.forCompleteItems(options, obj));
    };

    var forkJSON = function forkJSON(obj) {
      return Rx.Observable.forkJoin(_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toJSON(obj));
    };

    return streamItems(1).map(this.resCompleteItems).flatMap(forkItems).map(R.map(this.resCompleteItems.bind(this))).map(R.map(this.setItems.bind(this))).map(R.flatten).flatMap(Rx.Observable.from).flatMap(streamDetail).flatMap(forkJSON).map(R.map(this.resDetail.bind(this))).map(R.map(this.setDetail.bind(this))).map(R.filter(R.curry(this.filterDetail.bind(this))(options))).map(R.map(this.renderDetail.bind(this))).map(R.map(_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toCSV.bind(this))).map(R.map(function (csv) {
      return csv + '\n';
    }));
  },
  writeProductsItems: function writeProductsItems(options) {
    var _this3 = this;

    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'options:', options);
    var pages = Number(options.pages);

    var streamItems = function streamItems(idx) {
      return Rx.Observable.fromPromise(_this3.getProductsItems(options, idx));
    };

    var streamDetail = function streamDetail(obj) {
      return Rx.Observable.fromPromise(_this3.getDetail({
        itemId: obj.itemId
      }));
    };

    var forkItems = function forkItems(obj) {
      return Rx.Observable.forkJoin(_this3.forProductsItems(options, obj));
    };

    var forkJSON = function forkJSON(obj) {
      return Rx.Observable.forkJoin(_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toJSON(obj));
    };

    return streamItems(1).map(this.resProductsItems).flatMap(forkItems).map(R.map(this.resProductsItems.bind(this))).map(R.map(this.setItems.bind(this))).map(R.flatten).flatMap(Rx.Observable.from).flatMap(streamDetail).flatMap(forkJSON).map(R.map(this.resDetail.bind(this))).map(R.map(this.setDetail.bind(this))).map(R.filter(R.curry(this.filterDetail.bind(this))(options))).map(R.map(this.renderDetail.bind(this))).map(R.map(_utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toCSV.bind(this))).map(R.map(function (csv) {
      return csv + '\n';
    }));
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
  resDetail: function resDetail(obj) {
    return obj.hasOwnProperty('GetItemResponse') ? obj.GetItemResponse : null;
  },
  setItems: function setItems(obj) {
    return obj && obj.ack[0] === 'Success' ? obj.searchResult[0].item : null;
  },
  setDetail: function setDetail(obj) {
    return obj && obj.Ack === 'Success' ? obj.Item : null;
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
    options['paginationInput.entriesPerPage'] = 20;
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

    if (_utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.isValidDate(_p.startDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeFrom';
      options['itemFilter(' + n + ').value(0)'] = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.setTimeStamp(_p.startDate);
      n++;
    }

    if (_utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.isValidDate(_p.endDate)) {
      options['itemFilter(' + n + ').name'] = 'EndTimeTo';
      options['itemFilter(' + n + ').value(0)'] = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.setTimeStamp(_p.endDate);
      n++;
    }

    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'optItems:', options);
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
    options['paginationInput.entriesPerPage'] = 20;
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
    }

    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'optProducts:', options);
    return options;
  },
  optDetail: function optDetail(o, p) {
    var _o = o;

    var _p = p ? p : {};

    var head = new Object();
    var body = new Object();
    head['X-EBAY-API-COMPATIBILITY-LEVEL'] = '967';
    head['X-EBAY-API-CALL-NAME'] = o.operation;
    head['X-EBAY-API-SITEID'] = 0;
    body['@xmlns'] = 'urn:ebay:apis:eBLBaseComponents';
    body['RequesterCredentials'] = {
      'eBayAuthToken': _o.token
    };
    body['ErrorLanguage'] = 'en_US';
    body['WarningLevel'] = 'High';
    body['ItemID'] = _p.itemId;
    body['DetailLevel'] = 'ReturnAll';
    _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'optDetail:', head, body);
    return {
      head: head,
      body: _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toXML(_o.operation, body)
    };
  },
  renderStatus: function renderStatus(status) {
    switch (status) {
      case 0:
        return 'Now available.';

      case 1:
        return 'New added.';

      case 2:
        return 'Removed.';
    }
  },
  renderExtension: function renderExtension(duration) {
    return _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["util"].toLeftDays(duration);
  },
  renderItem: function renderItem(item, idx) {
    var Img = item.hasOwnProperty('galleryURL') ? item.galleryURL[0] : '';
    var Aid = item.itemId[0];
    var Pid = item.hasOwnProperty('productId') ? item.productId.map(function (obj) {
      return "".concat(obj.__value__, " ( ").concat(obj['@type'], " )");
    }) : ['---'];
    var Sid = item.sellerInfo[0].sellerUserName[0];
    var Stm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.getLocalTimeStamp(item.listingInfo[0].startTime[0]);
    var Etm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.getLocalTimeStamp(item.listingInfo[0].endTime[0]);
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
    var Upd = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.getLocalTimeStamp(Date.now());
    return {
      'Key': idx,
      'Image': Img,
      'Url': Url,
      'Title': Ttl,
      'Sell Start': Stm,
      'Sell Stop': Etm,
      'Condition': Cdn,
      'Seller': Sid,
      'ItemID': Aid,
      'ProductID': Pid.join('/'),
      'Category': Cgp,
      'Shipping': Shp,
      'Price': Pc1,
      'Currency': Ci1,
      'Convert Price': Pc2,
      'Convert Currency': Ci2,
      'Status': Stt,
      'Extention': Ext,
      'Avail': stt,
      'Updated': Upd
    };
  },
  renderDetail: function renderDetail(item) {
    var Img = item.hasOwnProperty('PictureDetails') ? '"' + item.PictureDetails.GalleryURL + '"' : '';
    var Url = '"' + item.ListingDetails.ViewItemURL + '"';
    var Ttl = '"' + item.Title + '"';
    var Aid = item.ItemID;
    var UPC = '';
    var EAN = '';
    var ISBN = '';

    if (item.hasOwnProperty('ProductListingDetails')) {
      var pdf = item.ProductListingDetails;
      UPC = pdf.hasOwnProperty('UPC') ? pdf.UPC : '';
      EAN = pdf.hasOwnProperty('EAN') ? pdf.EAN : '';
      ISBN = pdf.hasOwnProperty('ISBN') ? pdf.ISBN : '';
    }

    var Sid = item.Seller.UserID;
    var Stm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.getLocalTimeStamp(item.ListingDetails.StartTime);
    var Etm = _utils_stdutils__WEBPACK_IMPORTED_MODULE_2___default.a.getLocalTimeStamp(item.ListingDetails.EndTime);
    var Pc1 = item.SellingStatus.CurrentPrice.sub;
    var Ci1 = item.SellingStatus.CurrentPrice.root.currencyID;
    var Pc2 = item.ListingDetails.ConvertedStartPrice.sub;
    var Ci2 = item.ListingDetails.ConvertedStartPrice.root.currencyID;
    var Cdn = item.ConditionDisplayName;
    var Cgp = '"' + item.PrimaryCategory.CategoryName + '"';
    var Shp = Array.isArray(item.ShipToLocations) ? item.ShipToLocations : [item.ShipToLocations];
    var Stt = item.SellingStatus.ListingStatus;
    var Ext = item.hasOwnProperty('TimeLeft') ? this.renderExtension(item.TimeLeft) : '';
    return {
      'Image': Img,
      'Url': Url,
      'Title': Ttl,
      'StartTime': Stm,
      'EndTime': Etm,
      'Condition': Cdn,
      'Seller': Sid,
      'ItemID': Aid,
      'ProductID(UPC)': UPC,
      'ProductID(EAN)': EAN,
      'ProductID(ISBN)': ISBN,
      'Category': Cgp,
      'Shipping': Shp.join('/'),
      'CurrentPrice': Pc1,
      'CurrentCurrency': Ci1,
      'ConvertedPrice': Pc2,
      'ConvertedCurrency': Ci2,
      'Status': Stt,
      'LeftTime': Ext
    };
  },
  filterItem: function filterItem(options, obj) {
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
  },
  filterDetail: function filterDetail(options, obj) {
    var item = obj;

    if (options != null) {
      if (!options.shipping.some(function (shipping) {
        return shipping === item.ShipToLocations;
      }) && options.shipping.length) return false;
      if (!options.condition.some(function (condition) {
        return condition === item.ConditionID;
      }) && options.condition.length) return false;
      if (!options.status.some(function (status) {
        return status === item.SellingStatus.ListingStatus;
      }) && options.status.length) return false;
      if (!options.categoryPath.some(function (path) {
        return path === item.PrimaryCategory.CategoryName;
      }) && options.categoryPath.length) return false;
      if (!options.seller.some(function (selr) {
        return selr === item.Seller.UserID;
      }) && options.seller.length) return false;
      if (!options.itemId.some(function (itemid) {
        return itemid === item.ItemID;
      }) && options.itemId.length) return false;
      if (!isFinite(options.lowestPrice) || !isFinite(options.highestPrice)) return false;
      if (Number(options.lowestPrice) > item.SellingStatus.ConvertedCurrentPrice.sub && options.lowestPrice !== '') return false;
      if (Number(options.highestPrice) < item.SellingStatus.ConvertedCurrentPrice.sub && options.highestPrice !== '') return false;
    }

    return true;
  },
  traceLog: function traceLog(obj) {
    return _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].trace("".concat(pspid, ">"), 'Trace log:', obj);
  },
  errorLog: function errorLog(err) {
    return _utils_webutils__WEBPACK_IMPORTED_MODULE_0__["log"].error("".concat(pspid, ">"), 'Error occurred:', err);
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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "appStore";

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
          token: '',
          findingApi: '',
          tradingApi: ''
        }
      };
    }
  }, {
    key: "reduce",
    value: function reduce(state, action) {
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Request: ").concat(action.type));

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

        default:
          return state;
      }
    }
  }]);

  return AppStore;
}(flux_utils__WEBPACK_IMPORTED_MODULE_0__["ReduceStore"]);

/* harmony default export */ __webpack_exports__["default"] = (new AppStore(_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "completeStore";

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
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Request: ").concat(action.type));

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

/* harmony default export */ __webpack_exports__["default"] = (new CompleteStore(_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "noteStore";

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
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Request: ").concat(action.type));

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

/* harmony default export */ __webpack_exports__["default"] = (new NoteStore(_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

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
/* harmony import */ var _dispatcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dispatcher */ "./dispatcher.js");
/* harmony import */ var _utils_webutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/webutils */ "../utils/webutils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var pspid = "productsStore";

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
      _utils_webutils__WEBPACK_IMPORTED_MODULE_2__["log"].info("".concat(pspid, "> Request: ").concat(action.type));

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

/* harmony default export */ __webpack_exports__["default"] = (new ProductsStore(_dispatcher__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("timers");

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map