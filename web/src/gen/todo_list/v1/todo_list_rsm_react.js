"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.TodoList = void 0;
var resemble_react_1 = require("@reboot-dev/resemble-react");
var react_1 = require("react");
var uuid_1 = require("uuid");
var todo_list_pb_1 = require("./todo_list_pb");
// Check if safari. Print warning, if yes.
// TODO(riley): fix chaos streaming for Safari.
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var warningsShown = 0;
function showWarning(messageHtml) {
    var html = document.documentElement;
    var warningEl = document.createElement('div');
    // Positioning: left-top corner but place each warning to the right of the previous.
    var messageWidth = 300;
    var leftOffset = warningsShown * messageWidth;
    // More positioning: add a little margin, hover above ~everything (z-index).
    // Looks: red border, white background.
    // Content: text, slightly padded.
    warningEl.style.cssText =
        "position:absolute;top:0px;left:".concat(leftOffset, "px;margin:4px;width:300px;z-index:100000;\n  border:3px solid red;border-radius:4px;background-color:white;\n  padding:4px;font-family:sans-serif");
    warningEl.innerHTML = "⚠ " + messageHtml;
    html.appendChild(warningEl);
    console.warn(messageHtml);
    warningsShown += 1;
}
if (isSafari) {
    var warningText = "Some features of this application may not work as\n  intended on Safari. A fix is coming soon! Consider using Firefox or Chrome in\n  the meantime.";
    showWarning(warningText);
}
var fetchFailWarningShown = false;
function guardedFetch(request, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var error_1, endpoint, warningText;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch(request, options)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    // The fetch failed due to some network error.
                    if (request.url.startsWith("https://localhost.direct") && !fetchFailWarningShown) {
                        endpoint = request.url.split("/")[2] // e.g. "localhost.direct:9991"
                        ;
                        warningText = "The application failed to connect to the server at\n      '".concat(endpoint, "'. This may be due to one of the following reasons:<br>\n      <li>Your localhost server is not running, or is not running on the same\n          host as your browser.</li>\n      <li>Your localhost server is running, but on a different port.</li>\n      <li>Your ISP's DNS server does not allow you to resolve the domain\n          'localhost.direct'; see\n          <a href=\"https://reboot-dev.github.io/respect/docs/known_issues\">\n          \"Known Issues\"</a> for more information.</li>\n      ");
                        showWarning(warningText);
                        fetchFailWarningShown = true;
                    }
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
var TodoList = function (_a) {
    var id = _a.id, storeMutationsLocallyInNamespace = _a.storeMutationsLocallyInNamespace;
    var headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("x-resemble-service-name", "todo_list.v1.TodoList");
    headers.append("x-resemble-actor-id", id);
    headers.append("Connection", "keep-alive");
    var resembleContext = (0, resemble_react_1.useResembleContext)();
    var newRequest = function (requestBody, path, method, idempotencyKey) {
        var _a;
        if (idempotencyKey !== undefined) {
            headers.set("x-resemble-idempotency-key", idempotencyKey);
        }
        return new Request("".concat((_a = resembleContext.client) === null || _a === void 0 ? void 0 : _a.endpoint).concat(path), {
            method: method,
            headers: headers,
            body: Object.keys(requestBody).length !== 0
                ? JSON.stringify(requestBody)
                : null
        });
    };
    var AddTodo = function (partialRequest) {
        if (partialRequest === void 0) { partialRequest = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var request, requestBody, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = partialRequest instanceof todo_list_pb_1.AddTodoRequest ? partialRequest : new todo_list_pb_1.AddTodoRequest(partialRequest);
                        requestBody = request.toJson();
                        return [4 /*yield*/, guardedFetch(newRequest(requestBody, "/todo_list.v1.TodoList.AddTodo", "POST"))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var ListTodos = function (partialRequest) {
        if (partialRequest === void 0) { partialRequest = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var request, requestBody, response, grpcStatus, grpcMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = partialRequest instanceof todo_list_pb_1.ListTodosRequest ? partialRequest : new todo_list_pb_1.ListTodosRequest(partialRequest);
                        requestBody = request.toJson();
                        return [4 /*yield*/, guardedFetch(newRequest(requestBody, "/todo_list.v1.TodoList.ListTodos", "POST"))];
                    case 1:
                        response = _a.sent();
                        if (!response.ok && response.headers.has("grpc-status")) {
                            grpcStatus = response.headers.get("grpc-status");
                            grpcMessage = response.headers.get("grpc-message");
                            throw new Error("'todo_list.v1.TodoList.ListTodos' for '".concat(id, "' responded ") +
                                "with status ".concat(grpcStatus) +
                                "".concat(grpcMessage !== null ? ": " + grpcMessage : ""));
                        }
                        else if (!response.ok) {
                            throw new Error("'todo_list.v1.TodoList.ListTodos' failed: ".concat(response.body));
                        }
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    var useListTodos = function (partialRequest) {
        if (partialRequest === void 0) { partialRequest = {}; }
        var _a = (0, react_1.useState)(), response = _a[0], setResponse = _a[1];
        var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
        var _c = (0, react_1.useState)(), error = _c[0], setError = _c[1];
        // NOTE: using "refs" here because we want to "remember" some
        // state, but don't want setting that state to trigger new renders (see
        // https://react.dev/learn/referencing-values-with-refs).
        // Using a ref here so that we don't render every time we set it.
        var observedIdempotencyKeys = (0, react_1.useRef)(new Set());
        // NOTE: rather than starting with undefined for 'flushMutations'
        // we start with an event so any mutations that may get created
        // before we've started reading will get queued.
        var flushMutations = (0, react_1.useRef)(new resemble_react_1.Event());
        var _d = (0, react_1.useState)(), abortController = _d[0], setAbortController = _d[1];
        (0, react_1.useEffect)(function () {
            setAbortController(new AbortController());
            return function () {
                abortController === null || abortController === void 0 ? void 0 : abortController.abort();
            };
        }, []);
        var request = partialRequest instanceof todo_list_pb_1.ListTodosRequest
            ? partialRequest
            : new todo_list_pb_1.ListTodosRequest(partialRequest);
        // NOTE: using a ref for the 'request' and 'settings' (below) so
        // that it doesn't get changed after the first time calling 'usePing'.
        var requestRef = (0, react_1.useRef)(request);
        // We are using serialized string comparison here since we can't do value
        // equality of anonymous objects. We must use the proto library's toBinary()
        // since JavaScript's standard JSON library can't serialize every possible
        // field type (notably BigInt).
        var first_request_serialized = requestRef.current.toBinary().toString();
        var current_request_serialized = request.toBinary().toString();
        if (current_request_serialized !== first_request_serialized) {
            throw new Error("Changing the request is not supported!");
        }
        var settingsRef = (0, react_1.useRef)({ id: id, storeMutationsLocallyInNamespace: storeMutationsLocallyInNamespace });
        // We are using string comparison here since we can't do value
        // equality of anonymous objects.
        if (JSON.stringify(settingsRef.current) !== JSON.stringify({ id: id, storeMutationsLocallyInNamespace: storeMutationsLocallyInNamespace })) {
            throw new Error("Changing settings is not supported!");
        }
        var localStorageKeyRef = (0, react_1.useRef)(storeMutationsLocallyInNamespace);
        var queuedMutations = (0, react_1.useRef)([]);
        function hasRunningMutations() {
            if (runningAddTodoMutations.current.length > 0 ||
                runningDeleteTodoMutations.current.length > 0) {
                return true;
            }
            return false;
        }
        var runningAddTodoMutations = (0, react_1.useRef)([]);
        var recoveredAddTodoMutations = (0, react_1.useRef)([]);
        var shouldClearFailedAddTodoMutations = (0, react_1.useRef)(false);
        var _e = (0, react_1.useState)([]), failedAddTodoMutations = _e[0], setFailedAddTodoMutations = _e[1];
        var queuedAddTodoMutations = (0, react_1.useRef)([]);
        var recoverAndPurgeAddTodoMutations = function () {
            if (localStorageKeyRef.current === undefined) {
                return [];
            }
            var suffix = AddTodo;
            var value = localStorage.getItem(localStorageKeyRef.current + suffix);
            if (value === null) {
                return [];
            }
            localStorage.removeItem(localStorageKeyRef.current);
            var mutations = JSON.parse(value);
            var recoveredAddTodoMutations = [];
            var _loop_1 = function (mutation) {
                recoveredAddTodoMutations.push([mutation, function () { return __AddTodo(mutation); }]);
            };
            for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
                var mutation = mutations_1[_i];
                _loop_1(mutation);
            }
            return recoveredAddTodoMutations;
        };
        var doOnceAddTodo = (0, react_1.useRef)(true);
        if (doOnceAddTodo.current) {
            doOnceAddTodo.current = false;
            recoveredAddTodoMutations.current = recoverAndPurgeAddTodoMutations();
        }
        // User facing state that only includes the pending mutations that
        // have not been observed.
        var _f = (0, react_1.useState)([]), unobservedPendingAddTodoMutations = _f[0], setUnobservedPendingAddTodoMutations = _f[1];
        (0, react_1.useEffect)(function () {
            shouldClearFailedAddTodoMutations.current = true;
        }, [failedAddTodoMutations]);
        function __AddTodo(mutation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        // Invariant that we won't yield to event loop before pushing to
                        // runningAddTodoMutations
                        runningAddTodoMutations.current.push(mutation);
                        return [2 /*return*/, _Mutation(
                            // Invariant here is that we use the '/package.service.method'.
                            //
                            // See also 'resemble/helpers.py'.
                            "/todo_list.v1.TodoList.AddTodo", mutation, mutation.request, mutation.idempotencyKey, setUnobservedPendingAddTodoMutations, abortController, shouldClearFailedAddTodoMutations, setFailedAddTodoMutations, runningAddTodoMutations, flushMutations, queuedMutations, todo_list_pb_1.AddTodoRequest, todo_list_pb_1.AddTodoResponse.fromJson)];
                    }
                    finally {
                        runningAddTodoMutations.current = runningAddTodoMutations.current.filter(function (_a) {
                            var idempotencyKey = _a.idempotencyKey;
                            return mutation.idempotencyKey !== idempotencyKey;
                        });
                        (0, resemble_react_1.popMutationMaybeFromLocalStorage)(localStorageKeyRef.current, "AddTodo", function (mutationRequest) {
                            return mutationRequest.idempotencyKey !== mutation.idempotencyKey;
                        });
                    }
                    return [2 /*return*/];
                });
            });
        }
        function _AddTodo(mutation) {
            return __awaiter(this, void 0, void 0, function () {
                var deferred_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setUnobservedPendingAddTodoMutations(function (mutations) { return __spreadArray(__spreadArray([], mutations, true), [mutation], false); });
                            if (!(hasRunningMutations() ||
                                queuedMutations.current.length > 0 ||
                                flushMutations.current !== undefined)) return [3 /*break*/, 1];
                            deferred_1 = new resemble_react_1.Deferred(function () {
                                return __AddTodo(mutation);
                            });
                            // Add to localStorage here.
                            queuedAddTodoMutations.current.push([mutation, function () { return deferred_1.start(); }]);
                            queuedMutations.current.push(function () {
                                for (var _i = 0, _a = queuedAddTodoMutations.current; _i < _a.length; _i++) {
                                    var _b = _a[_i], run = _b[1];
                                    queuedAddTodoMutations.current.shift();
                                    run();
                                    break;
                                }
                            });
                            // Maybe add to localStorage.
                            (0, resemble_react_1.pushMutationMaybeToLocalStorage)(localStorageKeyRef.current, "AddTodo", mutation);
                            return [2 /*return*/, deferred_1.promise];
                        case 1: return [4 /*yield*/, __AddTodo(mutation)];
                        case 2: 
                        // NOTE: we'll add this mutation to `runningAddTodoMutations` in `__AddTodo`
                        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        function AddTodo(partialRequest, optimistic_metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var idempotencyKey, request, mutation;
                return __generator(this, function (_a) {
                    idempotencyKey = (0, uuid_1.v4)();
                    request = partialRequest instanceof todo_list_pb_1.AddTodoRequest ? partialRequest : new todo_list_pb_1.AddTodoRequest(partialRequest);
                    mutation = {
                        request: request,
                        idempotencyKey: idempotencyKey,
                        optimistic_metadata: optimistic_metadata,
                        isLoading: false
                    };
                    return [2 /*return*/, _AddTodo(mutation)];
                });
            });
        }
        var runningDeleteTodoMutations = (0, react_1.useRef)([]);
        var recoveredDeleteTodoMutations = (0, react_1.useRef)([]);
        var shouldClearFailedDeleteTodoMutations = (0, react_1.useRef)(false);
        var _g = (0, react_1.useState)([]), failedDeleteTodoMutations = _g[0], setFailedDeleteTodoMutations = _g[1];
        var queuedDeleteTodoMutations = (0, react_1.useRef)([]);
        var recoverAndPurgeDeleteTodoMutations = function () {
            if (localStorageKeyRef.current === undefined) {
                return [];
            }
            var suffix = DeleteTodo;
            var value = localStorage.getItem(localStorageKeyRef.current + suffix);
            if (value === null) {
                return [];
            }
            localStorage.removeItem(localStorageKeyRef.current);
            var mutations = JSON.parse(value);
            var recoveredDeleteTodoMutations = [];
            var _loop_2 = function (mutation) {
                recoveredDeleteTodoMutations.push([mutation, function () { return __DeleteTodo(mutation); }]);
            };
            for (var _i = 0, mutations_2 = mutations; _i < mutations_2.length; _i++) {
                var mutation = mutations_2[_i];
                _loop_2(mutation);
            }
            return recoveredDeleteTodoMutations;
        };
        var doOnceDeleteTodo = (0, react_1.useRef)(true);
        if (doOnceDeleteTodo.current) {
            doOnceDeleteTodo.current = false;
            recoveredDeleteTodoMutations.current = recoverAndPurgeDeleteTodoMutations();
        }
        // User facing state that only includes the pending mutations that
        // have not been observed.
        var _h = (0, react_1.useState)([]), unobservedPendingDeleteTodoMutations = _h[0], setUnobservedPendingDeleteTodoMutations = _h[1];
        (0, react_1.useEffect)(function () {
            shouldClearFailedDeleteTodoMutations.current = true;
        }, [failedDeleteTodoMutations]);
        function __DeleteTodo(mutation) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        // Invariant that we won't yield to event loop before pushing to
                        // runningDeleteTodoMutations
                        runningDeleteTodoMutations.current.push(mutation);
                        return [2 /*return*/, _Mutation(
                            // Invariant here is that we use the '/package.service.method'.
                            //
                            // See also 'resemble/helpers.py'.
                            "/todo_list.v1.TodoList.DeleteTodo", mutation, mutation.request, mutation.idempotencyKey, setUnobservedPendingDeleteTodoMutations, abortController, shouldClearFailedDeleteTodoMutations, setFailedDeleteTodoMutations, runningDeleteTodoMutations, flushMutations, queuedMutations, todo_list_pb_1.DeleteTodoRequest, todo_list_pb_1.DeleteTodoResponse.fromJson)];
                    }
                    finally {
                        runningDeleteTodoMutations.current = runningDeleteTodoMutations.current.filter(function (_a) {
                            var idempotencyKey = _a.idempotencyKey;
                            return mutation.idempotencyKey !== idempotencyKey;
                        });
                        (0, resemble_react_1.popMutationMaybeFromLocalStorage)(localStorageKeyRef.current, "DeleteTodo", function (mutationRequest) {
                            return mutationRequest.idempotencyKey !== mutation.idempotencyKey;
                        });
                    }
                    return [2 /*return*/];
                });
            });
        }
        function _DeleteTodo(mutation) {
            return __awaiter(this, void 0, void 0, function () {
                var deferred_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setUnobservedPendingDeleteTodoMutations(function (mutations) { return __spreadArray(__spreadArray([], mutations, true), [mutation], false); });
                            if (!(hasRunningMutations() ||
                                queuedMutations.current.length > 0 ||
                                flushMutations.current !== undefined)) return [3 /*break*/, 1];
                            deferred_2 = new resemble_react_1.Deferred(function () {
                                return __DeleteTodo(mutation);
                            });
                            // Add to localStorage here.
                            queuedDeleteTodoMutations.current.push([mutation, function () { return deferred_2.start(); }]);
                            queuedMutations.current.push(function () {
                                for (var _i = 0, _a = queuedDeleteTodoMutations.current; _i < _a.length; _i++) {
                                    var _b = _a[_i], run = _b[1];
                                    queuedDeleteTodoMutations.current.shift();
                                    run();
                                    break;
                                }
                            });
                            // Maybe add to localStorage.
                            (0, resemble_react_1.pushMutationMaybeToLocalStorage)(localStorageKeyRef.current, "DeleteTodo", mutation);
                            return [2 /*return*/, deferred_2.promise];
                        case 1: return [4 /*yield*/, __DeleteTodo(mutation)];
                        case 2: 
                        // NOTE: we'll add this mutation to `runningDeleteTodoMutations` in `__DeleteTodo`
                        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        function DeleteTodo(partialRequest, optimistic_metadata) {
            return __awaiter(this, void 0, void 0, function () {
                var idempotencyKey, request, mutation;
                return __generator(this, function (_a) {
                    idempotencyKey = (0, uuid_1.v4)();
                    request = partialRequest instanceof todo_list_pb_1.DeleteTodoRequest ? partialRequest : new todo_list_pb_1.DeleteTodoRequest(partialRequest);
                    mutation = {
                        request: request,
                        idempotencyKey: idempotencyKey,
                        optimistic_metadata: optimistic_metadata,
                        isLoading: false
                    };
                    return [2 /*return*/, _DeleteTodo(mutation)];
                });
            });
        }
        (0, react_1.useEffect)(function () {
            if (abortController === undefined) {
                return;
            }
            var loop = function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, resemble_react_1.retryForever)(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var responses, responses_1, responses_1_1, response_1, _i, _a, idempotencyKey, _b, _c, run, e_1_1, e_2, _d, _e, run;
                                var e_1, _f;
                                var _g;
                                return __generator(this, function (_h) {
                                    switch (_h.label) {
                                        case 0:
                                            _h.trys.push([0, 15, , 16]);
                                            if (!(runningAddTodoMutations.current.length > 0 || runningDeleteTodoMutations.current.length > 0)) return [3 /*break*/, 2];
                                            // TODO(benh): check invariant
                                            // 'flushMutations.current !== undefined' but don't
                                            // throw an error since that will just retry, instead
                                            // add support for "bailing" from a 'retry' by calling a
                                            // function passed into the lambda that 'retry' takes.
                                            return [4 /*yield*/, ((_g = flushMutations.current) === null || _g === void 0 ? void 0 : _g.wait())];
                                        case 1:
                                            // TODO(benh): check invariant
                                            // 'flushMutations.current !== undefined' but don't
                                            // throw an error since that will just retry, instead
                                            // add support for "bailing" from a 'retry' by calling a
                                            // function passed into the lambda that 'retry' takes.
                                            _h.sent();
                                            _h.label = 2;
                                        case 2:
                                            responses = ReactQuery(resemble_react_1.QueryRequest.create({
                                                method: "ListTodos",
                                                request: requestRef.current.toBinary()
                                            }), abortController === null || abortController === void 0 ? void 0 : abortController.signal);
                                            _h.label = 3;
                                        case 3:
                                            _h.trys.push([3, 8, 9, 14]);
                                            responses_1 = __asyncValues(responses);
                                            _h.label = 4;
                                        case 4: return [4 /*yield*/, responses_1.next()];
                                        case 5:
                                            if (!(responses_1_1 = _h.sent(), !responses_1_1.done)) return [3 /*break*/, 7];
                                            response_1 = responses_1_1.value;
                                            setIsLoading(false);
                                            for (_i = 0, _a = response_1.idempotencyKeys; _i < _a.length; _i++) {
                                                idempotencyKey = _a[_i];
                                                observedIdempotencyKeys.current.add(idempotencyKey);
                                            }
                                            // Only keep around the idempotency keys that are
                                            // still pending as the rest are not useful for us.
                                            observedIdempotencyKeys.current = (0, resemble_react_1.filterSet)(observedIdempotencyKeys.current, function (observedIdempotencyKey) {
                                                return __spreadArray(__spreadArray([], runningAddTodoMutations.current, true), runningDeleteTodoMutations.current, true).some(function (mutation) {
                                                    return observedIdempotencyKey === mutation.idempotencyKey;
                                                });
                                            });
                                            if (flushMutations.current !== undefined) {
                                                // TODO(benh): check invariant
                                                // 'pendingMutations.current.length === 0' but don't
                                                // throw an error since that will just retry, instead
                                                // add support for "bailing" from a 'retry' by calling a
                                                // function passed into the lambda that 'retry' takes.
                                                flushMutations.current = undefined;
                                                // Dequeue 1 queue and run 1 mutation from it.
                                                for (_b = 0, _c = queuedMutations.current; _b < _c.length; _b++) {
                                                    run = _c[_b];
                                                    queuedMutations.current.shift();
                                                    run();
                                                    break;
                                                }
                                            }
                                            setUnobservedPendingAddTodoMutations(function (mutations) {
                                                return mutations
                                                    .filter(function (mutation) {
                                                    // Only keep mutations that are queued, pending or
                                                    // recovered.
                                                    return queuedAddTodoMutations.current.some(function (_a) {
                                                        var queuedAddTodoMutation = _a[0];
                                                        return mutation.idempotencyKey ===
                                                            queuedAddTodoMutation.idempotencyKey;
                                                    }) ||
                                                        runningAddTodoMutations.current.some(function (runningAddTodoMutations) {
                                                            return mutation.idempotencyKey ===
                                                                runningAddTodoMutations.idempotencyKey;
                                                        });
                                                })
                                                    .filter(function (mutation) {
                                                    // Only keep mutations whose effects haven't been observed.
                                                    return !observedIdempotencyKeys.current.has(mutation.idempotencyKey);
                                                });
                                            });
                                            setUnobservedPendingDeleteTodoMutations(function (mutations) {
                                                return mutations
                                                    .filter(function (mutation) {
                                                    // Only keep mutations that are queued, pending or
                                                    // recovered.
                                                    return queuedDeleteTodoMutations.current.some(function (_a) {
                                                        var queuedDeleteTodoMutation = _a[0];
                                                        return mutation.idempotencyKey ===
                                                            queuedDeleteTodoMutation.idempotencyKey;
                                                    }) ||
                                                        runningDeleteTodoMutations.current.some(function (runningDeleteTodoMutations) {
                                                            return mutation.idempotencyKey ===
                                                                runningDeleteTodoMutations.idempotencyKey;
                                                        });
                                                })
                                                    .filter(function (mutation) {
                                                    // Only keep mutations whose effects haven't been observed.
                                                    return !observedIdempotencyKeys.current.has(mutation.idempotencyKey);
                                                });
                                            });
                                            setResponse(todo_list_pb_1.ListTodosResponse.fromBinary(response_1.response));
                                            _h.label = 6;
                                        case 6: return [3 /*break*/, 4];
                                        case 7: return [3 /*break*/, 14];
                                        case 8:
                                            e_1_1 = _h.sent();
                                            e_1 = { error: e_1_1 };
                                            return [3 /*break*/, 14];
                                        case 9:
                                            _h.trys.push([9, , 12, 13]);
                                            if (!(responses_1_1 && !responses_1_1.done && (_f = responses_1["return"]))) return [3 /*break*/, 11];
                                            return [4 /*yield*/, _f.call(responses_1)];
                                        case 10:
                                            _h.sent();
                                            _h.label = 11;
                                        case 11: return [3 /*break*/, 13];
                                        case 12:
                                            if (e_1) throw e_1.error;
                                            return [7 /*endfinally*/];
                                        case 13: return [7 /*endfinally*/];
                                        case 14: return [3 /*break*/, 16];
                                        case 15:
                                            e_2 = _h.sent();
                                            if (abortController === null || abortController === void 0 ? void 0 : abortController.signal.aborted) {
                                                return [2 /*return*/];
                                            }
                                            setError(e_2);
                                            setIsLoading(true);
                                            // Run a mutation in the event that we are trying to read
                                            // from an unconstructed actor and the mutation will peform
                                            // the construction.
                                            //
                                            // TODO(benh): only do this if the reason we failed to
                                            // read was because the actor does not exist.
                                            for (_d = 0, _e = queuedMutations.current; _d < _e.length; _d++) {
                                                run = _e[_d];
                                                queuedMutations.current.shift();
                                                run();
                                                break;
                                            }
                                            // TODO(benh): check invariant
                                            // 'flushMutations.current === undefined' but don't
                                            // throw an error since that will just retry, instead
                                            // add support for "bailing" from a 'retry' by calling a
                                            // function passed into the lambda that 'retry' takes.
                                            flushMutations.current = new resemble_react_1.Event();
                                            throw e_2;
                                        case 16: return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            loop();
        }, [abortController]);
        return {
            response: response,
            isLoading: isLoading,
            error: error,
            mutations: {
                AddTodo: AddTodo,
                DeleteTodo: DeleteTodo
            },
            pendingAddTodoMutations: unobservedPendingAddTodoMutations,
            failedAddTodoMutations: failedAddTodoMutations,
            recoveredAddTodoMutations: recoveredAddTodoMutations.current.map(function (_a) {
                var mutation = _a[0], run = _a[1];
                return (__assign(__assign({}, mutation), { run: run }));
            }),
            pendingDeleteTodoMutations: unobservedPendingDeleteTodoMutations,
            failedDeleteTodoMutations: failedDeleteTodoMutations,
            recoveredDeleteTodoMutations: recoveredDeleteTodoMutations.current.map(function (_a) {
                var mutation = _a[0], run = _a[1];
                return (__assign(__assign({}, mutation), { run: run }));
            })
        };
    };
    var DeleteTodo = function (partialRequest) {
        if (partialRequest === void 0) { partialRequest = {}; }
        return __awaiter(void 0, void 0, void 0, function () {
            var request, requestBody, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = partialRequest instanceof todo_list_pb_1.DeleteTodoRequest ? partialRequest : new todo_list_pb_1.DeleteTodoRequest(partialRequest);
                        requestBody = request.toJson();
                        return [4 /*yield*/, guardedFetch(newRequest(requestBody, "/todo_list.v1.TodoList.DeleteTodo", "POST"))];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    function _Mutation(path, mutation, request, idempotencyKey, setUnobservedPendingMutations, abortController, shouldClearFailedMutations, setFailedMutations, runningMutations, flushMutations, queuedMutations, requestType, responseTypeFromJson) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, run;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, (0, resemble_react_1.retryForever)(function () { return __awaiter(_this, void 0, void 0, function () {
                                var req, response, grpcStatus, grpcMessage, error_2, jsonResponse, e_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            setUnobservedPendingMutations(function (mutations) {
                                                return mutations.map(function (mutation) {
                                                    if (mutation.idempotencyKey === idempotencyKey) {
                                                        return __assign(__assign({}, mutation), { isLoading: true });
                                                    }
                                                    return mutation;
                                                });
                                            });
                                            req = request instanceof requestType
                                                ? request
                                                : new requestType(request);
                                            return [4 /*yield*/, guardedFetch(newRequest(req.toJson(), path, "POST", idempotencyKey), { signal: abortController === null || abortController === void 0 ? void 0 : abortController.signal })];
                                        case 1:
                                            response = _a.sent();
                                            if (!response.ok && response.headers.has("grpc-status")) {
                                                grpcStatus = response.headers.get("grpc-status");
                                                grpcMessage = response.headers.get("grpc-message");
                                                error_2 = new Error("'todo_list.v1.TodoList' for '".concat(id, "' responded ") +
                                                    "with status ".concat(grpcStatus) +
                                                    "".concat(grpcMessage !== null ? ": " + grpcMessage : ""));
                                                if (shouldClearFailedMutations.current) {
                                                    shouldClearFailedMutations.current = false;
                                                    setFailedMutations([
                                                        { request: request, idempotencyKey: idempotencyKey, isLoading: false, error: error_2 },
                                                    ]);
                                                }
                                                else {
                                                    setFailedMutations(function (failedMutations) { return __spreadArray(__spreadArray([], failedMutations, true), [
                                                        { request: request, idempotencyKey: idempotencyKey, isLoading: false, error: error_2 },
                                                    ], false); });
                                                }
                                                setUnobservedPendingMutations(function (mutations) {
                                                    return mutations.filter(function (mutation) { return mutation.idempotencyKey !== idempotencyKey; });
                                                });
                                                return [2 /*return*/, { error: error_2 }];
                                            }
                                            if (!response.ok) {
                                                throw new Error("Failed to fetch");
                                            }
                                            return [4 /*yield*/, response.json()];
                                        case 2:
                                            jsonResponse = _a.sent();
                                            return [2 /*return*/, {
                                                    response: responseTypeFromJson(jsonResponse)
                                                }];
                                        case 3:
                                            e_3 = _a.sent();
                                            setUnobservedPendingMutations(function (mutations) {
                                                return mutations.map(function (mutation) {
                                                    if (mutation.idempotencyKey === idempotencyKey) {
                                                        return __assign(__assign({}, mutation), { error: e_3, isLoading: false });
                                                    }
                                                    else {
                                                        return mutation;
                                                    }
                                                });
                                            });
                                            if (abortController === null || abortController === void 0 ? void 0 : abortController.signal.aborted) {
                                                // TODO(benh): instead of returning 'undefined' as a
                                                // means of knowing that we've aborted provide a way
                                                // of "bailing" from a 'retry' by calling a function
                                                // passed into the lambda that 'retry' takes.
                                                return [2 /*return*/, { error: new Error("Aborted") }];
                                            }
                                            else {
                                                throw e_3;
                                            }
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, {
                                maxBackoffSeconds: 3
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        // NOTE: we deliberately DO NOT remove from
                        // 'unobservedPendingMutations' but instead wait
                        // for a response first so that we don't cause a render
                        // before getting the updated state from the server.
                        if (flushMutations.current !== undefined &&
                            runningMutations.current.length === 0) {
                            flushMutations.current.set();
                        }
                        else {
                            // Dequeue 1 queue and run 1 mutation from it.
                            for (_i = 0, _a = queuedMutations.current; _i < _a.length; _i++) {
                                run = _a[_i];
                                queuedMutations.current.shift();
                                run();
                                break;
                            }
                        }
                        return [7 /*endfinally*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function ReactQuery(request, signal) {
        return __asyncGenerator(this, arguments, function ReactQuery_1() {
            var response, reader, accumulated, _a, value, done, grpcStatus, grpcMessage, json, e_4, _b, value, done;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, __await(guardedFetch(newRequest(resemble_react_1.QueryRequest.toJson(request), "/query", "POST"), { signal: signal }))];
                    case 1:
                        response = _c.sent();
                        if (response.body == null) {
                            throw new Error("Unable to read body of response");
                        }
                        reader = response.body
                            .pipeThrough(new TextDecoderStream())
                            .getReader();
                        if (reader === undefined) {
                            throw new Error("Not able to instantiate reader on response body");
                        }
                        accumulated = "";
                        _c.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 12];
                        return [4 /*yield*/, __await(reader.read())];
                    case 3:
                        _a = _c.sent(), value = _a.value, done = _a.done;
                        if (!(!response.ok && response.headers.has("grpc-status"))) return [3 /*break*/, 4];
                        grpcStatus = response.headers.get("grpc-status");
                        grpcMessage = response.headers.get("grpc-message");
                        throw new Error("'ReactQuery responded " +
                            "with status ".concat(grpcStatus) +
                            "".concat(grpcMessage !== null ? ": " + grpcMessage : ""));
                    case 4:
                        if (!!response.ok) return [3 /*break*/, 5];
                        throw new Error("'ReactQuery' failed: ".concat(value));
                    case 5:
                        if (!done) return [3 /*break*/, 6];
                        return [3 /*break*/, 12];
                    case 6:
                        accumulated += value.trim();
                        if (accumulated.startsWith(",")) {
                            accumulated = accumulated.substring(1);
                        }
                        if (!accumulated.startsWith("[")) {
                            accumulated = "[" + accumulated;
                        }
                        if (!accumulated.endsWith("]")) {
                            accumulated = accumulated + "]";
                        }
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 10, , 11]);
                        json = JSON.parse(accumulated);
                        accumulated = "";
                        return [4 /*yield*/, __await(resemble_react_1.QueryResponse.fromJson(json.at(-1)))];
                    case 8: return [4 /*yield*/, _c.sent()];
                    case 9:
                        _c.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        e_4 = _c.sent();
                        if (e_4 instanceof SyntaxError) {
                            accumulated = accumulated.substring(0, accumulated.length - 1);
                            return [3 /*break*/, 2];
                        }
                        else {
                            throw e_4;
                        }
                        return [3 /*break*/, 11];
                    case 11: return [3 /*break*/, 2];
                    case 12:
                        if (!true) return [3 /*break*/, 14];
                        return [4 /*yield*/, __await(reader.read())];
                    case 13:
                        _b = _c.sent(), value = _b.value, done = _b.done;
                        if (done) {
                            return [3 /*break*/, 14];
                        }
                        else {
                        }
                        return [3 /*break*/, 12];
                    case 14: return [2 /*return*/];
                }
            });
        });
    }
    return {
        AddTodo: AddTodo,
        ListTodos: ListTodos,
        useListTodos: useListTodos,
        DeleteTodo: DeleteTodo
    };
};
exports.TodoList = TodoList;
