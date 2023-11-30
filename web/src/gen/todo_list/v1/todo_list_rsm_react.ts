import type {
  PartialMessage as __bufbuildProtobufPartialMessage,
} from "@bufbuild/protobuf";
import {
  Deferred as __resembleReactDeferred,
  Event as __resembleReactEvent,
  IQueryRequest as __resembleIQueryRequest,
  IQueryResponse as __resembleIQueryResponse,
  Mutation as __resembleMutation,
  QueryRequest as __resembleQueryRequest,
  QueryResponse  as __resembleQueryResponse,
  ResponseOrError as __resembleResponseOrError,
  filterSet as __resembleFilterSet,
  popMutationMaybeFromLocalStorage as __resemblePopMutationMaybeFromLocalStorage,
  pushMutationMaybeToLocalStorage as __resemblePushMutationMaybeToLocalStorage,
  retryForever as __resembleRetryForever,
  useResembleContext as __resembleUseResembleContext
} from "@reboot-dev/resemble-react";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Todo, 
	CompleteTodoRequest, 
	CompleteTodoResponse, 
	DeleteTodoRequest, 
	DeleteTodoResponse, 
	TodoListState, 
	AddTodoRequest, 
	AddTodoResponse, 
	ListTodosRequest, 
	ListTodosResponse,
} from "./todo_list_pb";

// Additionally re-export all messages from the pb module.
export {
  Todo, 
	CompleteTodoRequest, 
	CompleteTodoResponse, 
	DeleteTodoRequest, 
	DeleteTodoResponse, 
	TodoListState, 
	AddTodoRequest, 
	AddTodoResponse, 
	ListTodosRequest, 
	ListTodosResponse,
};

// Check if safari. Print warning, if yes.
// TODO(riley): fix chaos streaming for Safari.
//
// TODO(riley): move this all into helpers.ts.

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

let warnings: { [key: string]: string } = {};

function renderWarnings() {
  const html = document.documentElement;

  // Remove previously rendered warnings so that we compute the proper
  // offsets for layout.
  //
  // TODO(benh): put all of these in a containing `div` so we can just
  // remove it instead?
  for (const warning in warnings) {
    const warningElement = document.getElementById(warning);
    if (warningElement !== null) {
      html.removeChild(warningElement);
    }
  }

  let warningsShown = 0;

  for (const warning in warnings) {
    const warningElement = document.createElement("div");
    warningElement.setAttribute("id", warning);

    // Positioning: left-top corner but place each warning to the right of the previous.
    const messageWidth = 300;
    const leftOffset = warningsShown * messageWidth;
    // More positioning: add a little margin, hover above ~everything (z-index).
    // Looks: red border, white background.
    // Content: text, slightly padded.
    warningElement.style.cssText =
    `position:absolute;top:0px;left:${leftOffset}px;margin:4px;width:300px;z-index:100000;
    border:3px solid red;border-radius:4px;background-color:white;
    padding:4px;font-family:sans-serif`;

    warningElement.innerHTML = "⚠ " + warnings[warning];
    html.appendChild(warningElement);
    warningsShown++;
  }
}

function addWarning({ messageHtml, id }: { messageHtml: string, id: string }) {
  console.warn(messageHtml);
  warnings[id] = messageHtml;
  renderWarnings();
}

function removeWarning({ id }: { id: string }) {
  if (id in warnings) {
    delete warnings[id];

    const warningElement = document.getElementById(id);

    if (warningElement !== null) {
      const html = document.documentElement;
      html.removeChild(warningElement);
    }

    renderWarnings();
  }
}

if (isSafari) {
  const warningText = `Some features of this application may not work as
  intended on Safari. A fix is coming soon! Consider using Firefox or Chrome in
  the meantime.`;
  addWarning({ messageHtml: warningText, id: "isSafari" });
}

async function guardedFetch(request: Request, options: any = {}) {
  try {
    const response = await fetch(request, options);

    // If no exception was thrown while doing a fetch for
    // `localhost.direct` then we must be able to reach it,
    // so if we previously had displayed a warning stop
    // displaying it now.
    //
    // Likely what has happened is the server we are trying
    // to fetch from restarted.
    if (request.url.startsWith("https://localhost.direct") && "guardedFetch" in warnings) {
      removeWarning({ id: "guardedFetch"});
    }

    return response;
  } catch (error) {
    // The fetch failed due to some network error.
    if (request.url.startsWith("https://localhost.direct") && !("guardedFetch" in warnings)) {
      // One possible reason for the error is that the user's ISP doesn't let
      // the user resolve `localhost.direct`. We'd like to warn the user that
      // this is a possibility.
      //
      // We unfortunately can't distinguish between a DNS resolution error and any
      // other kind of network error, even though the user's console shows that
      // information; see:
      //   https://bugs.chromium.org/p/chromium/issues/detail?id=718447
      // Therefore our error message has to be somewhat generic.
      const endpoint = request.url.split("/")[2];  // e.g. "localhost.direct:9991"
      const warningText = `Hi! We hope you're enjoying the Resemble dev experience.
      Looks like we couldn't connect to '${endpoint}', which should resolve to
      '${endpoint.replace("localhost.direct", "127.0.0.1")}'. This may be due
      to one of the following reasons:<br>
      <li>Your backend application is not running.</li>
      <li>Your backend application is running, but not on 127.0.0.1 (e.g.,
          you're using a Codespace in the cloud), and you no longer have connectivity
          (bad Wi-Fi? flaky network? or problems with your port forwarder?)</li>
      <li>Your backend appllication is running, but on a different port.</li>
      <li>Your ISP's DNS server does not allow you to resolve the domain
          'localhost.direct'; see
          <a href="https://reboot-dev.github.io/respect/docs/known_issues">
          "Known Issues"</a> for more information.</li>
      `
      addWarning({ messageHtml: warningText, id: "guardedFetch" });
    }
    throw error;
  }
}

// Start of service specific code.
///////////////////////////////////////////////////////////////////////////

export interface TodoListApi {
  AddTodo: (partialRequest?: __bufbuildProtobufPartialMessage<AddTodoRequest>) =>
  Promise<AddTodoResponse>;
  ListTodos: (partialRequest?: __bufbuildProtobufPartialMessage<ListTodosRequest>) =>
  Promise<ListTodosResponse>;
  DeleteTodo: (partialRequest?: __bufbuildProtobufPartialMessage<DeleteTodoRequest>) =>
  Promise<DeleteTodoResponse>;
  CompleteTodo: (partialRequest?: __bufbuildProtobufPartialMessage<CompleteTodoRequest>) =>
  Promise<CompleteTodoResponse>;
  useListTodos: (partialRequest?: __bufbuildProtobufPartialMessage<ListTodosRequest>) => {
   response: ListTodosResponse | undefined;
    isLoading: boolean;
    error: unknown;
    mutations: {
       AddTodo: (request: __bufbuildProtobufPartialMessage<AddTodoRequest>,
       optimistic_metadata?: any ) =>
      Promise<__resembleResponseOrError<AddTodoResponse>>;
       DeleteTodo: (request: __bufbuildProtobufPartialMessage<DeleteTodoRequest>,
       optimistic_metadata?: any ) =>
      Promise<__resembleResponseOrError<DeleteTodoResponse>>;
       CompleteTodo: (request: __bufbuildProtobufPartialMessage<CompleteTodoRequest>,
       optimistic_metadata?: any ) =>
      Promise<__resembleResponseOrError<CompleteTodoResponse>>;
    };
      pendingAddTodoMutations: {
        request: AddTodoRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
        optimistic_metadata?: any;
      }[];
      failedAddTodoMutations: {
        request: AddTodoRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
      }[];
      recoveredAddTodoMutations: {
        request: AddTodoRequest;
        idempotencyKey: string;
        run: () => void;
      }[];
      pendingDeleteTodoMutations: {
        request: DeleteTodoRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
        optimistic_metadata?: any;
      }[];
      failedDeleteTodoMutations: {
        request: DeleteTodoRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
      }[];
      recoveredDeleteTodoMutations: {
        request: DeleteTodoRequest;
        idempotencyKey: string;
        run: () => void;
      }[];
      pendingCompleteTodoMutations: {
        request: CompleteTodoRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
        optimistic_metadata?: any;
      }[];
      failedCompleteTodoMutations: {
        request: CompleteTodoRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
      }[];
      recoveredCompleteTodoMutations: {
        request: CompleteTodoRequest;
        idempotencyKey: string;
        run: () => void;
      }[];
  };
}


export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}
export const TodoList = ({ id, storeMutationsLocallyInNamespace}: SettingsParams): TodoListApi => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.append("x-resemble-service-name", "todo_list.v1.TodoList");
  headers.append("x-resemble-actor-id", id);
  headers.append("Connection", "keep-alive");

  const resembleContext = __resembleUseResembleContext();

  const newRequest = (
    requestBody: any,
    path: string,
    method: "GET" | "POST",
    idempotencyKey?: string,
  ) => {
    if (idempotencyKey !== undefined) {
      headers.set("x-resemble-idempotency-key", idempotencyKey);
    }
    return new Request(`${resembleContext.client?.endpoint}${path}`, {
      method: method,
      headers: headers,
      body:
        Object.keys(requestBody).length !== 0
          ? JSON.stringify(requestBody)
          : null,
    });
  };

  const AddTodo = async (partialRequest: __bufbuildProtobufPartialMessage<AddTodoRequest> = {}) => {
    const request = partialRequest instanceof AddTodoRequest ? partialRequest : new AddTodoRequest(partialRequest);
    const requestBody = request.toJson();
    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await guardedFetch(
      newRequest(requestBody, "/todo_list.v1.TodoList.AddTodo", "POST"));

    return await response.json();
  };

  const ListTodos = async (partialRequest: __bufbuildProtobufPartialMessage<ListTodosRequest> = {}) => {
    const request = partialRequest instanceof ListTodosRequest ? partialRequest : new ListTodosRequest(partialRequest);
    const requestBody = request.toJson();
    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await guardedFetch(
      newRequest(requestBody, "/todo_list.v1.TodoList.ListTodos", "POST"));

    if (!response.ok && response.headers.has("grpc-status")) {
      const grpcStatus = response.headers.get("grpc-status");
      let grpcMessage = response.headers.get("grpc-message");
      throw new Error(
        `'todo_list.v1.TodoList.ListTodos' for '${id}' responded ` +
          `with status ${grpcStatus}` +
          `${grpcMessage !== null ? ": " + grpcMessage : ""}`
      );
    } else if (!response.ok) {
      throw new Error(
        `'todo_list.v1.TodoList.ListTodos' failed: ${response.body}`
      );
    }

    return await response.json();
  };

  const useListTodos = (partialRequest: __bufbuildProtobufPartialMessage<ListTodosRequest> = {}) => {
    const [response, setResponse] = useState<ListTodosResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();

    // NOTE: using "refs" here because we want to "remember" some
    // state, but don't want setting that state to trigger new renders (see
    // https://react.dev/learn/referencing-values-with-refs).
    // Using a ref here so that we don't render every time we set it.

    const observedIdempotencyKeys = useRef(new Set<string>());
    // NOTE: rather than starting with undefined for 'flushMutations'
    // we start with an event so any mutations that may get created
    // before we've started reading will get queued.
    const flushMutations = useRef<__resembleReactEvent | undefined>(new __resembleReactEvent());

    const [abortController, setAbortController] = useState<AbortController | undefined>();

    useEffect(() => {
      if (abortController === undefined) {
        setAbortController(new AbortController());
      }
      return () => {
        abortController?.abort();
      };
    }, [abortController]);

    const request = partialRequest instanceof ListTodosRequest
        ? partialRequest
        : new ListTodosRequest(partialRequest);

    // NOTE: using a ref for the 'request' and 'settings' (below) so
    // that it doesn't get changed after the first time calling 'usePing'.
    const requestRef = useRef(request);

    // We are using serialized string comparison here since we can't do value
    // equality of anonymous objects. We must use the proto library's toBinary()
    // since JavaScript's standard JSON library can't serialize every possible
    // field type (notably BigInt).
    const first_request_serialized = requestRef.current.toBinary().toString();
    const current_request_serialized = request.toBinary().toString();
    if (current_request_serialized !== first_request_serialized) {
      throw new Error("Changing the request is not supported!");
    }

    const settingsRef = useRef({id, storeMutationsLocallyInNamespace});
    // We are using string comparison here since we can't do value
    // equality of anonymous objects.
    if (JSON.stringify(settingsRef.current) !== JSON.stringify({id, storeMutationsLocallyInNamespace})) {
      throw new Error("Changing settings is not supported!");
    }

    const localStorageKeyRef = useRef(storeMutationsLocallyInNamespace);

    const queuedMutations = useRef<Array<() => void>>([]);

function hasRunningMutations(): boolean {
      if (
      runningAddTodoMutations.current.length > 0||
      runningDeleteTodoMutations.current.length > 0||
      runningCompleteTodoMutations.current.length > 0) {
        return true;
      }
      return false;
    }


    const runningAddTodoMutations = useRef<__resembleMutation<AddTodoRequest>[]>([]);
    const recoveredAddTodoMutations = useRef<
      [__resembleMutation<AddTodoRequest>, () => void][]
    >([]);
    const shouldClearFailedAddTodoMutations = useRef(false);
    const [failedAddTodoMutations, setFailedAddTodoMutations] = useState<
      __resembleMutation<AddTodoRequest>[]
    >([]);
    const queuedAddTodoMutations = useRef<[__resembleMutation<AddTodoRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeAddTodoMutations = (): [
      __resembleMutation<AddTodoRequest>,
      () => void
    ][] => {
      if (localStorageKeyRef.current === undefined) {
        return [];
      }
      const suffix = AddTodo
      const value = localStorage.getItem(localStorageKeyRef.current + suffix);
      if (value === null) {
        return [];
      }

      localStorage.removeItem(localStorageKeyRef.current);
      const mutations: __resembleMutation<AddTodoRequest>[] = JSON.parse(value);
      const recoveredAddTodoMutations: [
        __resembleMutation<AddTodoRequest>,
        () => void
      ][] = [];
      for (const mutation of mutations) {
        recoveredAddTodoMutations.push([mutation, () => __AddTodo(mutation)]);
      }
      return recoveredAddTodoMutations;
    }
    const doOnceAddTodo = useRef(true)
    if (doOnceAddTodo.current) {
      doOnceAddTodo.current = false
      recoveredAddTodoMutations.current = recoverAndPurgeAddTodoMutations()
    }

    // User facing state that only includes the pending mutations that
    // have not been observed.
    const [unobservedPendingAddTodoMutations, setUnobservedPendingAddTodoMutations] =
      useState<__resembleMutation<AddTodoRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedAddTodoMutations.current = true;
    }, [failedAddTodoMutations]);

    async function __AddTodo(
      mutation: __resembleMutation<AddTodoRequest>
    ): Promise<__resembleResponseOrError<AddTodoResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningAddTodoMutations
        runningAddTodoMutations.current.push(mutation)
        return _Mutation<AddTodoRequest, AddTodoResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_list.v1.TodoList.AddTodo",
          mutation,
          mutation.request,
          mutation.idempotencyKey,
          setUnobservedPendingAddTodoMutations,
          abortController,
          shouldClearFailedAddTodoMutations,
          setFailedAddTodoMutations,
          runningAddTodoMutations,
          flushMutations,
          queuedMutations,
          AddTodoRequest,
          AddTodoResponse.fromJson
        );
      } finally {
        runningAddTodoMutations.current = runningAddTodoMutations.current.filter(
          ({ idempotencyKey }) => mutation.idempotencyKey !== idempotencyKey
        );

        __resemblePopMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "AddTodo",
          (mutationRequest: __resembleMutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _AddTodo(mutation: __resembleMutation<AddTodoRequest>) {
      setUnobservedPendingAddTodoMutations(
        (mutations) => [...mutations, mutation]
      )

      // NOTE: we only run one mutation at a time so that we provide a
      // serializable experience for the end user but we will
      // eventually support mutations in parallel when we have strong
      // eventually consistent writers.
      if (
        hasRunningMutations() ||
        queuedMutations.current.length > 0 ||
        flushMutations.current !== undefined
      ) {
        const deferred = new __resembleReactDeferred<__resembleResponseOrError<AddTodoResponse>>(() =>
          __AddTodo(mutation)
        );

        // Add to localStorage here.
        queuedAddTodoMutations.current.push([mutation, () => deferred.start()]);
        queuedMutations.current.push(() => {
          for (const [, run] of queuedAddTodoMutations.current) {
            queuedAddTodoMutations.current.shift();
            run();
            break;
          }
        });
        // Maybe add to localStorage.
        __resemblePushMutationMaybeToLocalStorage(localStorageKeyRef.current, "AddTodo", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningAddTodoMutations` in `__AddTodo`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __AddTodo(mutation);
      }
    }

    async function AddTodo(
      partialRequest: __bufbuildProtobufPartialMessage<AddTodoRequest>, optimistic_metadata?: any
    ): Promise<__resembleResponseOrError<AddTodoResponse>> {
      const idempotencyKey = uuidv4();
      const request = partialRequest instanceof AddTodoRequest ? partialRequest : new AddTodoRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _AddTodo(mutation);
    }

    const runningDeleteTodoMutations = useRef<__resembleMutation<DeleteTodoRequest>[]>([]);
    const recoveredDeleteTodoMutations = useRef<
      [__resembleMutation<DeleteTodoRequest>, () => void][]
    >([]);
    const shouldClearFailedDeleteTodoMutations = useRef(false);
    const [failedDeleteTodoMutations, setFailedDeleteTodoMutations] = useState<
      __resembleMutation<DeleteTodoRequest>[]
    >([]);
    const queuedDeleteTodoMutations = useRef<[__resembleMutation<DeleteTodoRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeDeleteTodoMutations = (): [
      __resembleMutation<DeleteTodoRequest>,
      () => void
    ][] => {
      if (localStorageKeyRef.current === undefined) {
        return [];
      }
      const suffix = DeleteTodo
      const value = localStorage.getItem(localStorageKeyRef.current + suffix);
      if (value === null) {
        return [];
      }

      localStorage.removeItem(localStorageKeyRef.current);
      const mutations: __resembleMutation<DeleteTodoRequest>[] = JSON.parse(value);
      const recoveredDeleteTodoMutations: [
        __resembleMutation<DeleteTodoRequest>,
        () => void
      ][] = [];
      for (const mutation of mutations) {
        recoveredDeleteTodoMutations.push([mutation, () => __DeleteTodo(mutation)]);
      }
      return recoveredDeleteTodoMutations;
    }
    const doOnceDeleteTodo = useRef(true)
    if (doOnceDeleteTodo.current) {
      doOnceDeleteTodo.current = false
      recoveredDeleteTodoMutations.current = recoverAndPurgeDeleteTodoMutations()
    }

    // User facing state that only includes the pending mutations that
    // have not been observed.
    const [unobservedPendingDeleteTodoMutations, setUnobservedPendingDeleteTodoMutations] =
      useState<__resembleMutation<DeleteTodoRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedDeleteTodoMutations.current = true;
    }, [failedDeleteTodoMutations]);

    async function __DeleteTodo(
      mutation: __resembleMutation<DeleteTodoRequest>
    ): Promise<__resembleResponseOrError<DeleteTodoResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningDeleteTodoMutations
        runningDeleteTodoMutations.current.push(mutation)
        return _Mutation<DeleteTodoRequest, DeleteTodoResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_list.v1.TodoList.DeleteTodo",
          mutation,
          mutation.request,
          mutation.idempotencyKey,
          setUnobservedPendingDeleteTodoMutations,
          abortController,
          shouldClearFailedDeleteTodoMutations,
          setFailedDeleteTodoMutations,
          runningDeleteTodoMutations,
          flushMutations,
          queuedMutations,
          DeleteTodoRequest,
          DeleteTodoResponse.fromJson
        );
      } finally {
        runningDeleteTodoMutations.current = runningDeleteTodoMutations.current.filter(
          ({ idempotencyKey }) => mutation.idempotencyKey !== idempotencyKey
        );

        __resemblePopMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "DeleteTodo",
          (mutationRequest: __resembleMutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _DeleteTodo(mutation: __resembleMutation<DeleteTodoRequest>) {
      setUnobservedPendingDeleteTodoMutations(
        (mutations) => [...mutations, mutation]
      )

      // NOTE: we only run one mutation at a time so that we provide a
      // serializable experience for the end user but we will
      // eventually support mutations in parallel when we have strong
      // eventually consistent writers.
      if (
        hasRunningMutations() ||
        queuedMutations.current.length > 0 ||
        flushMutations.current !== undefined
      ) {
        const deferred = new __resembleReactDeferred<__resembleResponseOrError<DeleteTodoResponse>>(() =>
          __DeleteTodo(mutation)
        );

        // Add to localStorage here.
        queuedDeleteTodoMutations.current.push([mutation, () => deferred.start()]);
        queuedMutations.current.push(() => {
          for (const [, run] of queuedDeleteTodoMutations.current) {
            queuedDeleteTodoMutations.current.shift();
            run();
            break;
          }
        });
        // Maybe add to localStorage.
        __resemblePushMutationMaybeToLocalStorage(localStorageKeyRef.current, "DeleteTodo", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningDeleteTodoMutations` in `__DeleteTodo`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __DeleteTodo(mutation);
      }
    }

    async function DeleteTodo(
      partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoRequest>, optimistic_metadata?: any
    ): Promise<__resembleResponseOrError<DeleteTodoResponse>> {
      const idempotencyKey = uuidv4();
      const request = partialRequest instanceof DeleteTodoRequest ? partialRequest : new DeleteTodoRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _DeleteTodo(mutation);
    }

    const runningCompleteTodoMutations = useRef<__resembleMutation<CompleteTodoRequest>[]>([]);
    const recoveredCompleteTodoMutations = useRef<
      [__resembleMutation<CompleteTodoRequest>, () => void][]
    >([]);
    const shouldClearFailedCompleteTodoMutations = useRef(false);
    const [failedCompleteTodoMutations, setFailedCompleteTodoMutations] = useState<
      __resembleMutation<CompleteTodoRequest>[]
    >([]);
    const queuedCompleteTodoMutations = useRef<[__resembleMutation<CompleteTodoRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeCompleteTodoMutations = (): [
      __resembleMutation<CompleteTodoRequest>,
      () => void
    ][] => {
      if (localStorageKeyRef.current === undefined) {
        return [];
      }
      const suffix = CompleteTodo
      const value = localStorage.getItem(localStorageKeyRef.current + suffix);
      if (value === null) {
        return [];
      }

      localStorage.removeItem(localStorageKeyRef.current);
      const mutations: __resembleMutation<CompleteTodoRequest>[] = JSON.parse(value);
      const recoveredCompleteTodoMutations: [
        __resembleMutation<CompleteTodoRequest>,
        () => void
      ][] = [];
      for (const mutation of mutations) {
        recoveredCompleteTodoMutations.push([mutation, () => __CompleteTodo(mutation)]);
      }
      return recoveredCompleteTodoMutations;
    }
    const doOnceCompleteTodo = useRef(true)
    if (doOnceCompleteTodo.current) {
      doOnceCompleteTodo.current = false
      recoveredCompleteTodoMutations.current = recoverAndPurgeCompleteTodoMutations()
    }

    // User facing state that only includes the pending mutations that
    // have not been observed.
    const [unobservedPendingCompleteTodoMutations, setUnobservedPendingCompleteTodoMutations] =
      useState<__resembleMutation<CompleteTodoRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedCompleteTodoMutations.current = true;
    }, [failedCompleteTodoMutations]);

    async function __CompleteTodo(
      mutation: __resembleMutation<CompleteTodoRequest>
    ): Promise<__resembleResponseOrError<CompleteTodoResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningCompleteTodoMutations
        runningCompleteTodoMutations.current.push(mutation)
        return _Mutation<CompleteTodoRequest, CompleteTodoResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_list.v1.TodoList.CompleteTodo",
          mutation,
          mutation.request,
          mutation.idempotencyKey,
          setUnobservedPendingCompleteTodoMutations,
          abortController,
          shouldClearFailedCompleteTodoMutations,
          setFailedCompleteTodoMutations,
          runningCompleteTodoMutations,
          flushMutations,
          queuedMutations,
          CompleteTodoRequest,
          CompleteTodoResponse.fromJson
        );
      } finally {
        runningCompleteTodoMutations.current = runningCompleteTodoMutations.current.filter(
          ({ idempotencyKey }) => mutation.idempotencyKey !== idempotencyKey
        );

        __resemblePopMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "CompleteTodo",
          (mutationRequest: __resembleMutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _CompleteTodo(mutation: __resembleMutation<CompleteTodoRequest>) {
      setUnobservedPendingCompleteTodoMutations(
        (mutations) => [...mutations, mutation]
      )

      // NOTE: we only run one mutation at a time so that we provide a
      // serializable experience for the end user but we will
      // eventually support mutations in parallel when we have strong
      // eventually consistent writers.
      if (
        hasRunningMutations() ||
        queuedMutations.current.length > 0 ||
        flushMutations.current !== undefined
      ) {
        const deferred = new __resembleReactDeferred<__resembleResponseOrError<CompleteTodoResponse>>(() =>
          __CompleteTodo(mutation)
        );

        // Add to localStorage here.
        queuedCompleteTodoMutations.current.push([mutation, () => deferred.start()]);
        queuedMutations.current.push(() => {
          for (const [, run] of queuedCompleteTodoMutations.current) {
            queuedCompleteTodoMutations.current.shift();
            run();
            break;
          }
        });
        // Maybe add to localStorage.
        __resemblePushMutationMaybeToLocalStorage(localStorageKeyRef.current, "CompleteTodo", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningCompleteTodoMutations` in `__CompleteTodo`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __CompleteTodo(mutation);
      }
    }

    async function CompleteTodo(
      partialRequest: __bufbuildProtobufPartialMessage<CompleteTodoRequest>, optimistic_metadata?: any
    ): Promise<__resembleResponseOrError<CompleteTodoResponse>> {
      const idempotencyKey = uuidv4();
      const request = partialRequest instanceof CompleteTodoRequest ? partialRequest : new CompleteTodoRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _CompleteTodo(mutation);
    }

    useEffect(() => {
      if (abortController === undefined ) {
        return;
      }
      const loop = async () => {
        await __resembleRetryForever(async () => {
          try {// Wait for any mutations to complete before starting to
            // read so that we read the latest state including those
            // mutations.
            if (runningAddTodoMutations.current.length > 0 || runningDeleteTodoMutations.current.length > 0 || runningCompleteTodoMutations.current.length > 0) {
              // TODO(benh): check invariant
              // 'flushMutations.current !== undefined' but don't
              // throw an error since that will just retry, instead
              // add support for "bailing" from a 'retry' by calling a
              // function passed into the lambda that 'retry' takes.
              await flushMutations.current?.wait();
            }


            const responses = ReactQuery(
              __resembleQueryRequest.create({
                method: "ListTodos",
                request: requestRef.current.toBinary(),
              }),
              abortController?.signal
            );

            for await (const response of responses) {
              setIsLoading(false);

              for (const idempotencyKey of response.idempotencyKeys) {
                observedIdempotencyKeys.current.add(idempotencyKey);
              }

              // Only keep around the idempotency keys that are
              // still pending as the rest are not useful for us.
              observedIdempotencyKeys.current = __resembleFilterSet(
                observedIdempotencyKeys.current,
                (observedIdempotencyKey) =>
                  [
                  ...runningAddTodoMutations.current,
                  ...runningDeleteTodoMutations.current,
                  ...runningCompleteTodoMutations.current,
                  ].some(
                    (mutation) =>
                      observedIdempotencyKey === mutation.idempotencyKey
                  )
              );

              if (flushMutations.current !== undefined) {
                // TODO(benh): check invariant
                // 'pendingMutations.current.length === 0' but don't
                // throw an error since that will just retry, instead
                // add support for "bailing" from a 'retry' by calling a
                // function passed into the lambda that 'retry' takes.

                flushMutations.current = undefined;

                // Dequeue 1 queue and run 1 mutation from it.
                for (const run of queuedMutations.current) {
                  queuedMutations.current.shift();
                  run();
                  break;
                }
              }

              setUnobservedPendingAddTodoMutations(
              (mutations) =>
                mutations
                  .filter(
                    (mutation) =>
                      // Only keep mutations that are queued, pending or
                      // recovered.
                      queuedAddTodoMutations.current.some(
                        ([queuedAddTodoMutation]) =>
                          mutation.idempotencyKey ===
                          queuedAddTodoMutation.idempotencyKey
                      ) ||
                      runningAddTodoMutations.current.some(
                        (runningAddTodoMutations) =>
                          mutation.idempotencyKey ===
                          runningAddTodoMutations.idempotencyKey
                      )
                  )
                  .filter(
                    (mutation) =>
                      // Only keep mutations whose effects haven't been observed.
                      !observedIdempotencyKeys.current.has(
                        mutation.idempotencyKey
                      )
                  )
              )

              setUnobservedPendingDeleteTodoMutations(
              (mutations) =>
                mutations
                  .filter(
                    (mutation) =>
                      // Only keep mutations that are queued, pending or
                      // recovered.
                      queuedDeleteTodoMutations.current.some(
                        ([queuedDeleteTodoMutation]) =>
                          mutation.idempotencyKey ===
                          queuedDeleteTodoMutation.idempotencyKey
                      ) ||
                      runningDeleteTodoMutations.current.some(
                        (runningDeleteTodoMutations) =>
                          mutation.idempotencyKey ===
                          runningDeleteTodoMutations.idempotencyKey
                      )
                  )
                  .filter(
                    (mutation) =>
                      // Only keep mutations whose effects haven't been observed.
                      !observedIdempotencyKeys.current.has(
                        mutation.idempotencyKey
                      )
                  )
              )

              setUnobservedPendingCompleteTodoMutations(
              (mutations) =>
                mutations
                  .filter(
                    (mutation) =>
                      // Only keep mutations that are queued, pending or
                      // recovered.
                      queuedCompleteTodoMutations.current.some(
                        ([queuedCompleteTodoMutation]) =>
                          mutation.idempotencyKey ===
                          queuedCompleteTodoMutation.idempotencyKey
                      ) ||
                      runningCompleteTodoMutations.current.some(
                        (runningCompleteTodoMutations) =>
                          mutation.idempotencyKey ===
                          runningCompleteTodoMutations.idempotencyKey
                      )
                  )
                  .filter(
                    (mutation) =>
                      // Only keep mutations whose effects haven't been observed.
                      !observedIdempotencyKeys.current.has(
                        mutation.idempotencyKey
                      )
                  )
              )


              setResponse(ListTodosResponse.fromBinary(response.response));
            }
          } catch (e: unknown) {
            if (abortController?.signal.aborted) {
              return;
            }

            setError(e);
            setIsLoading(true);

            // Run a mutation in the event that we are trying to read
            // from an unconstructed actor and the mutation will peform
            // the construction.
            //
            // TODO(benh): only do this if the reason we failed to
            // read was because the actor does not exist.
            for (const run of queuedMutations.current) {
              queuedMutations.current.shift();
              run();
              break;
            }

            // TODO(benh): check invariant
            // 'flushMutations.current === undefined' but don't
            // throw an error since that will just retry, instead
            // add support for "bailing" from a 'retry' by calling a
            // function passed into the lambda that 'retry' takes.
            flushMutations.current = new __resembleReactEvent();

            throw e;
          }
        });
      };

      loop();
    }, [abortController]);

    return {
      response,
      isLoading,
      error,
      mutations: {
        AddTodo,
        DeleteTodo,
        CompleteTodo,
      },
      pendingAddTodoMutations: unobservedPendingAddTodoMutations,
      failedAddTodoMutations,
      recoveredAddTodoMutations: recoveredAddTodoMutations.current.map(
        ([mutation, run]) => ({ ...mutation, run: run })
      ),
      pendingDeleteTodoMutations: unobservedPendingDeleteTodoMutations,
      failedDeleteTodoMutations,
      recoveredDeleteTodoMutations: recoveredDeleteTodoMutations.current.map(
        ([mutation, run]) => ({ ...mutation, run: run })
      ),
      pendingCompleteTodoMutations: unobservedPendingCompleteTodoMutations,
      failedCompleteTodoMutations,
      recoveredCompleteTodoMutations: recoveredCompleteTodoMutations.current.map(
        ([mutation, run]) => ({ ...mutation, run: run })
      ),
    };
  };


  const DeleteTodo = async (partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoRequest> = {}) => {
    const request = partialRequest instanceof DeleteTodoRequest ? partialRequest : new DeleteTodoRequest(partialRequest);
    const requestBody = request.toJson();
    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await guardedFetch(
      newRequest(requestBody, "/todo_list.v1.TodoList.DeleteTodo", "POST"));

    return await response.json();
  };

  const CompleteTodo = async (partialRequest: __bufbuildProtobufPartialMessage<CompleteTodoRequest> = {}) => {
    const request = partialRequest instanceof CompleteTodoRequest ? partialRequest : new CompleteTodoRequest(partialRequest);
    const requestBody = request.toJson();
    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await guardedFetch(
      newRequest(requestBody, "/todo_list.v1.TodoList.CompleteTodo", "POST"));

    return await response.json();
  };


async function _Mutation<
    Request extends
AddTodoRequest    |DeleteTodoRequest    |CompleteTodoRequest,
    Response extends    AddTodoResponse    |    DeleteTodoResponse    |    CompleteTodoResponse  >(
    path: string,
    mutation: __resembleMutation<Request>,
    request: Request,
    idempotencyKey: string,
    setUnobservedPendingMutations: Dispatch<
      SetStateAction<__resembleMutation<Request>[]>
    >,
    abortController: AbortController | undefined,
    shouldClearFailedMutations: MutableRefObject<boolean>,
    setFailedMutations: Dispatch<SetStateAction<__resembleMutation<Request>[]>>,
    runningMutations: MutableRefObject<__resembleMutation<Request>[]>,
    flushMutations: MutableRefObject<__resembleReactEvent | undefined>,
    queuedMutations: MutableRefObject<Array<() => void>>,
    requestType: { new (request: Request): Request },
    responseTypeFromJson: (json: any) => Response
  ): Promise<__resembleResponseOrError<Response>> {

    try {
      return await __resembleRetryForever(
        async () => {
          try {
            setUnobservedPendingMutations(
              (mutations) => {
                return mutations.map((mutation) => {
                  if (mutation.idempotencyKey === idempotencyKey) {
                    return { ...mutation, isLoading: true };
                  }
                  return mutation;
                });
              }
            );
            const req: Request =
              request instanceof requestType
                ? request
                : new requestType(request);

            const response = await guardedFetch(
              newRequest(req.toJson(), path, "POST", idempotencyKey),
              { signal: abortController?.signal }
            );

            if (!response.ok && response.headers.has("grpc-status")) {
              const grpcStatus = response.headers.get("grpc-status");
              let grpcMessage = response.headers.get("grpc-message");
              const error = new Error(
                `'todo_list.v1.TodoList' for '${id}' responded ` +
                  `with status ${grpcStatus}` +
                  `${grpcMessage !== null ? ": " + grpcMessage : ""}`
              );

              if (shouldClearFailedMutations.current) {
                shouldClearFailedMutations.current = false;
                setFailedMutations([
                  { request, idempotencyKey, isLoading: false, error },
                ]);
              } else {
                setFailedMutations((failedMutations) => [
                  ...failedMutations,
                  { request, idempotencyKey, isLoading: false, error },
                ]);
              }
              setUnobservedPendingMutations(
                (mutations) =>
                  mutations.filter(
                    (mutation) => mutation.idempotencyKey !== idempotencyKey
                  )
              );

              return { error } as __resembleResponseOrError<Response>;
            }
            if (!response.ok) {
              throw new Error("Failed to fetch");
            }
            const jsonResponse = await response.json();
            return {
              response: responseTypeFromJson(jsonResponse),
            };
          } catch (e: unknown) {
            setUnobservedPendingMutations(
              (mutations) =>
                mutations.map((mutation) => {
                  if (mutation.idempotencyKey === idempotencyKey) {
                    return { ...mutation, error: e, isLoading: false };
                  } else {
                    return mutation;
                  }
                })
            );

            if (abortController?.signal.aborted) {
              // TODO(benh): instead of returning 'undefined' as a
              // means of knowing that we've aborted provide a way
              // of "bailing" from a 'retry' by calling a function
              // passed into the lambda that 'retry' takes.
              return { error: new Error("Aborted") };
            } else {
              throw e;
            }
          }
        },
        {
          maxBackoffSeconds: 3,
        }
      );
    } finally {
      // NOTE: we deliberately DO NOT remove from
      // 'unobservedPendingMutations' but instead wait
      // for a response first so that we don't cause a render
      // before getting the updated state from the server.

      if (
        flushMutations.current !== undefined &&
        runningMutations.current.length === 0
      ) {
        flushMutations.current.set();
      } else {
        // Dequeue 1 queue and run 1 mutation from it.
        for (const run of queuedMutations.current) {
          queuedMutations.current.shift();
          run();
          break;
        }
      }
    }
  }

  async function* ReactQuery(
    request: __resembleIQueryRequest,
    signal: AbortSignal
  ): AsyncGenerator<__resembleIQueryResponse, void, unknown> {
    const response = await guardedFetch(
      newRequest(__resembleQueryRequest.toJson(request), "/query", "POST"),
      { signal: signal }
    );

    if (response.body == null) {
      throw new Error("Unable to read body of response");
    }

    const reader = response.body
      .pipeThrough(new TextDecoderStream())
      .getReader();

    if (reader === undefined) {
      throw new Error("Not able to instantiate reader on response body");
    }

    let accumulated = "";

    while (true) {
      const { value, done } = await reader.read();

      if (!response.ok && response.headers.has("grpc-status")) {
        const grpcStatus = response.headers.get("grpc-status");
        let grpcMessage = response.headers.get("grpc-message");
        throw new Error(
          `'ReactQuery responded ` +
            `with status ${grpcStatus}` +
            `${grpcMessage !== null ? ": " + grpcMessage : ""}`
        );
      } else if (!response.ok) {
        throw new Error(
          `'ReactQuery' failed: ${value}`
        );
      } else if (done) {
        break;
      } else {
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

        try {
          const json = JSON.parse(accumulated);
          accumulated = "";
          yield __resembleQueryResponse.fromJson(json.at(-1));
        } catch (e) {
          if (e instanceof SyntaxError) {
            accumulated = accumulated.substring(0, accumulated.length - 1);
            continue;
          } else {
            throw e;
          }
        }
      }
    }
  }

  return {
    AddTodo,
    ListTodos,
    useListTodos,
    DeleteTodo,
    CompleteTodo,
  };
};


