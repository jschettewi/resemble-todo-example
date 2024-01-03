import type {
  Message as __bufbuildProtobufMessage,
  MessageType as __bufbuildProtobufMessageType,
  PartialMessage as __bufbuildProtobufPartialMessage,
} from "@bufbuild/protobuf";
import * as resemble_react from "@reboot-dev/resemble-react";
import * as resemble_api from "@reboot-dev/resemble-api";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import {
  Todo, 
	TodoListState, 
	AddTodoRequest, 
	AddTodoResponse, 
	ListTodosRequest, 
	ListTodosResponse, 
	DeleteTodoRequest, 
	DeleteTodoResponse, 
	CompleteTodoRequest, 
	CompleteTodoResponse,
} from "./todo_list_pb";

// Additionally re-export all messages from the pb module.
export {
  Todo, 
	TodoListState, 
	AddTodoRequest, 
	AddTodoResponse, 
	ListTodosRequest, 
	ListTodosResponse, 
	DeleteTodoRequest, 
	DeleteTodoResponse, 
	CompleteTodoRequest, 
	CompleteTodoResponse,
};

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
      Promise<resemble_react.ResponseOrError<AddTodoResponse>>;
       DeleteTodo: (request: __bufbuildProtobufPartialMessage<DeleteTodoRequest>,
       optimistic_metadata?: any ) =>
      Promise<resemble_react.ResponseOrError<DeleteTodoResponse>>;
       CompleteTodo: (request: __bufbuildProtobufPartialMessage<CompleteTodoRequest>,
       optimistic_metadata?: any ) =>
      Promise<resemble_react.ResponseOrError<CompleteTodoResponse>>;
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

export interface TodoListMutators {
  addTodo: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<AddTodoRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrErrors<
        AddTodoResponse,
        resemble_api.SystemErrorDetails
      >>;

    pending: resemble_react.Mutation<AddTodoRequest>[];
  };
  deleteTodo: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<DeleteTodoRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrErrors<
        DeleteTodoResponse,
        resemble_api.SystemErrorDetails
      >>;

    pending: resemble_react.Mutation<DeleteTodoRequest>[];
  };
  completeTodo: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<CompleteTodoRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrErrors<
        CompleteTodoResponse,
        resemble_api.SystemErrorDetails
      >>;

    pending: resemble_react.Mutation<CompleteTodoRequest>[];
  };
}


export interface UseTodoListApi {
  mutators: TodoListMutators;
  useListTodos: (
    partialRequest?: __bufbuildProtobufPartialMessage<ListTodosRequest>
  ) => {
    response: ListTodosResponse | undefined;
    isLoading: boolean;
    error: undefined | resemble_api.SystemErrorDetails
;
  };
  listTodos: (
    partialRequest?: __bufbuildProtobufPartialMessage<ListTodosRequest>
  ) => Promise<
    resemble_react.ResponseOrErrors<
    ListTodosResponse,
    resemble_api.SystemErrorDetails
    >
  >;
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

// *********** NOTE NOTE NOTE NOTE NOTE ***********
//
// Old style `Actor` generated code is deprecated in favor of
// `useActor` (see that code below) and will be removed in an
// upcoming release!
//
// ************************************************

export const TodoList = (
  { id, storeMutationsLocallyInNamespace }: SettingsParams
): TodoListApi => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.append("x-resemble-service-name", "todo_app.v1.TodoList");
  headers.append("x-resemble-actor-id", id);
  headers.append("Connection", "keep-alive");

  const resembleContext = resemble_react.useResembleContext();

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

  const AddTodo = async (
    partialRequest: __bufbuildProtobufPartialMessage<AddTodoRequest> = {}
  ) => {
    const request = partialRequest instanceof AddTodoRequest
      ? partialRequest
      : new AddTodoRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoList.AddTodo", "POST"
      )
    );

    return await response.json();
  };

  const ListTodos = async (
    partialRequest: __bufbuildProtobufPartialMessage<ListTodosRequest> = {}
  ) => {
    const request = partialRequest instanceof ListTodosRequest
      ? partialRequest
      : new ListTodosRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoList.ListTodos", "POST"
      )
    );

    if (!response.ok && response.headers.has("grpc-status")) {
      const grpcStatus = response.headers.get("grpc-status");
      let grpcMessage = response.headers.get("grpc-message");
      throw new Error(
        `'todo_app.v1.TodoList.ListTodos' for '${id}' responded ` +
          `with status ${grpcStatus}` +
          `${grpcMessage !== null ? ": " + grpcMessage : ""}`
      );
    } else if (!response.ok) {
      throw new Error(
        `'todo_app.v1.TodoList.ListTodos' failed: ${response.body}`
      );
    }

    return await response.json();
  };

  const useListTodos = (
    partialRequest: __bufbuildProtobufPartialMessage<ListTodosRequest> = {}
  ) => {
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
    const flushMutations = useRef<resemble_react.Event | undefined>(new resemble_react.Event());

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
    // that it doesn't get changed after the first time calling 'useListTodos'.
    const requestRef = useRef(request);

    // We are using serialized string comparison here since we can't do value
    // equality of anonymous objects. We must use the proto library's toBinary()
    // since JavaScript's standard JSON library can't serialize every possible
    // field type (notably BigInt).
    //
    // TODO(benh): this comment doesn't make sense because `request` should
    // not be an anonymous object, maybe this was added before we did
    // `partialRequest` and we now need to revisit this and use the equality
    // mechanisms provided by `protoc-gen-es`?
    const first_request_serialized = requestRef.current.toBinary().toString();
    const current_request_serialized = request.toBinary().toString();
    if (current_request_serialized !== first_request_serialized) {
      throw new Error("Changing the request is not supported!");
    }

    const settingsRef = useRef({id, storeMutationsLocallyInNamespace});
    // We are using string comparison here since we can't do value
    // equality of anonymous objects.
    //
    // TODO(benh): create a `compareSettings()` or similar so we don't
    // have to `JSON.stringify()` every time!
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


    const runningAddTodoMutations = useRef<resemble_react.Mutation<AddTodoRequest>[]>([]);
    const recoveredAddTodoMutations = useRef<
      [resemble_react.Mutation<AddTodoRequest>, () => void][]
    >([]);
    const shouldClearFailedAddTodoMutations = useRef(false);
    const [failedAddTodoMutations, setFailedAddTodoMutations] = useState<
      resemble_react.Mutation<AddTodoRequest>[]
    >([]);
    const queuedAddTodoMutations = useRef<[resemble_react.Mutation<AddTodoRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeAddTodoMutations = (): [
      resemble_react.Mutation<AddTodoRequest>,
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
      const mutations: resemble_react.Mutation<AddTodoRequest>[] = JSON.parse(value);
      const recoveredAddTodoMutations: [
        resemble_react.Mutation<AddTodoRequest>,
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
      useState<resemble_react.Mutation<AddTodoRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedAddTodoMutations.current = true;
    }, [failedAddTodoMutations]);

    async function __AddTodo(
      mutation: resemble_react.Mutation<AddTodoRequest>
    ): Promise<resemble_react.ResponseOrError<AddTodoResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningAddTodoMutations
        runningAddTodoMutations.current.push(mutation)
        return _Mutation<AddTodoRequest, AddTodoResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_app.v1.TodoList.AddTodo",
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

        resemble_react.popMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "AddTodo",
          (mutationRequest: resemble_react.Mutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _AddTodo(mutation: resemble_react.Mutation<AddTodoRequest>) {
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
        const deferred = new resemble_react.Deferred<resemble_react.ResponseOrError<AddTodoResponse>>(() =>
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
        resemble_react.pushMutationMaybeToLocalStorage(localStorageKeyRef.current, "AddTodo", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningAddTodoMutations` in `__AddTodo`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __AddTodo(mutation);
      }
    }

    async function AddTodo(
      partialRequest: __bufbuildProtobufPartialMessage<AddTodoRequest>,
      optimistic_metadata?: any
    ): Promise<resemble_react.ResponseOrError<AddTodoResponse>> {
      const idempotencyKey = uuidv4();

      const request = partialRequest instanceof AddTodoRequest
        ? partialRequest
        : new AddTodoRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _AddTodo(mutation);
    }

    const runningDeleteTodoMutations = useRef<resemble_react.Mutation<DeleteTodoRequest>[]>([]);
    const recoveredDeleteTodoMutations = useRef<
      [resemble_react.Mutation<DeleteTodoRequest>, () => void][]
    >([]);
    const shouldClearFailedDeleteTodoMutations = useRef(false);
    const [failedDeleteTodoMutations, setFailedDeleteTodoMutations] = useState<
      resemble_react.Mutation<DeleteTodoRequest>[]
    >([]);
    const queuedDeleteTodoMutations = useRef<[resemble_react.Mutation<DeleteTodoRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeDeleteTodoMutations = (): [
      resemble_react.Mutation<DeleteTodoRequest>,
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
      const mutations: resemble_react.Mutation<DeleteTodoRequest>[] = JSON.parse(value);
      const recoveredDeleteTodoMutations: [
        resemble_react.Mutation<DeleteTodoRequest>,
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
      useState<resemble_react.Mutation<DeleteTodoRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedDeleteTodoMutations.current = true;
    }, [failedDeleteTodoMutations]);

    async function __DeleteTodo(
      mutation: resemble_react.Mutation<DeleteTodoRequest>
    ): Promise<resemble_react.ResponseOrError<DeleteTodoResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningDeleteTodoMutations
        runningDeleteTodoMutations.current.push(mutation)
        return _Mutation<DeleteTodoRequest, DeleteTodoResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_app.v1.TodoList.DeleteTodo",
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

        resemble_react.popMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "DeleteTodo",
          (mutationRequest: resemble_react.Mutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _DeleteTodo(mutation: resemble_react.Mutation<DeleteTodoRequest>) {
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
        const deferred = new resemble_react.Deferred<resemble_react.ResponseOrError<DeleteTodoResponse>>(() =>
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
        resemble_react.pushMutationMaybeToLocalStorage(localStorageKeyRef.current, "DeleteTodo", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningDeleteTodoMutations` in `__DeleteTodo`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __DeleteTodo(mutation);
      }
    }

    async function DeleteTodo(
      partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoRequest>,
      optimistic_metadata?: any
    ): Promise<resemble_react.ResponseOrError<DeleteTodoResponse>> {
      const idempotencyKey = uuidv4();

      const request = partialRequest instanceof DeleteTodoRequest
        ? partialRequest
        : new DeleteTodoRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _DeleteTodo(mutation);
    }

    const runningCompleteTodoMutations = useRef<resemble_react.Mutation<CompleteTodoRequest>[]>([]);
    const recoveredCompleteTodoMutations = useRef<
      [resemble_react.Mutation<CompleteTodoRequest>, () => void][]
    >([]);
    const shouldClearFailedCompleteTodoMutations = useRef(false);
    const [failedCompleteTodoMutations, setFailedCompleteTodoMutations] = useState<
      resemble_react.Mutation<CompleteTodoRequest>[]
    >([]);
    const queuedCompleteTodoMutations = useRef<[resemble_react.Mutation<CompleteTodoRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeCompleteTodoMutations = (): [
      resemble_react.Mutation<CompleteTodoRequest>,
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
      const mutations: resemble_react.Mutation<CompleteTodoRequest>[] = JSON.parse(value);
      const recoveredCompleteTodoMutations: [
        resemble_react.Mutation<CompleteTodoRequest>,
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
      useState<resemble_react.Mutation<CompleteTodoRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedCompleteTodoMutations.current = true;
    }, [failedCompleteTodoMutations]);

    async function __CompleteTodo(
      mutation: resemble_react.Mutation<CompleteTodoRequest>
    ): Promise<resemble_react.ResponseOrError<CompleteTodoResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningCompleteTodoMutations
        runningCompleteTodoMutations.current.push(mutation)
        return _Mutation<CompleteTodoRequest, CompleteTodoResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_app.v1.TodoList.CompleteTodo",
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

        resemble_react.popMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "CompleteTodo",
          (mutationRequest: resemble_react.Mutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _CompleteTodo(mutation: resemble_react.Mutation<CompleteTodoRequest>) {
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
        const deferred = new resemble_react.Deferred<resemble_react.ResponseOrError<CompleteTodoResponse>>(() =>
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
        resemble_react.pushMutationMaybeToLocalStorage(localStorageKeyRef.current, "CompleteTodo", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningCompleteTodoMutations` in `__CompleteTodo`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __CompleteTodo(mutation);
      }
    }

    async function CompleteTodo(
      partialRequest: __bufbuildProtobufPartialMessage<CompleteTodoRequest>,
      optimistic_metadata?: any
    ): Promise<resemble_react.ResponseOrError<CompleteTodoResponse>> {
      const idempotencyKey = uuidv4();

      const request = partialRequest instanceof CompleteTodoRequest
        ? partialRequest
        : new CompleteTodoRequest(partialRequest);

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
        await resemble_react.retryForever(async () => {
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
              new resemble_api.react_pb.QueryRequest({
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
              observedIdempotencyKeys.current = resemble_react.filterSet(
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

                // Dequeue the next mutation and run it.
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


              if (response.response !== undefined) {
                setResponse(ListTodosResponse.fromBinary(response.response));
              }
            }
          } catch (e: unknown) {
            if (abortController?.signal.aborted) {
              return;
            }

            setError(e);
            setIsLoading(true);

            // Run a mutation in the event that we are trying to read
            // from an unconstructed actor and the mutation will perform
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
            flushMutations.current = new resemble_react.Event();

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


  const DeleteTodo = async (
    partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoRequest> = {}
  ) => {
    const request = partialRequest instanceof DeleteTodoRequest
      ? partialRequest
      : new DeleteTodoRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoList.DeleteTodo", "POST"
      )
    );

    return await response.json();
  };

  const CompleteTodo = async (
    partialRequest: __bufbuildProtobufPartialMessage<CompleteTodoRequest> = {}
  ) => {
    const request = partialRequest instanceof CompleteTodoRequest
      ? partialRequest
      : new CompleteTodoRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoList.CompleteTodo", "POST"
      )
    );

    return await response.json();
  };


async function _Mutation<
    Request extends
AddTodoRequest    |DeleteTodoRequest    |CompleteTodoRequest,
    Response extends    AddTodoResponse    |    DeleteTodoResponse    |    CompleteTodoResponse  >(
    path: string,
    mutation: resemble_react.Mutation<Request>,
    request: Request,
    idempotencyKey: string,
    setUnobservedPendingMutations: Dispatch<
      SetStateAction<resemble_react.Mutation<Request>[]>
    >,
    abortController: AbortController | undefined,
    shouldClearFailedMutations: MutableRefObject<boolean>,
    setFailedMutations: Dispatch<SetStateAction<resemble_react.Mutation<Request>[]>>,
    runningMutations: MutableRefObject<resemble_react.Mutation<Request>[]>,
    flushMutations: MutableRefObject<resemble_react.Event | undefined>,
    queuedMutations: MutableRefObject<Array<() => void>>,
    requestType: { new (request: Request): Request },
    responseTypeFromJson: (json: any) => Response
  ): Promise<resemble_react.ResponseOrError<Response>> {

    try {
      return await resemble_react.retryForever(
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

            const response = await resemble_react.guardedFetch(
              newRequest(req.toJson(), path, "POST", idempotencyKey),
              { signal: abortController?.signal }
            );

            if (!response.ok && response.headers.has("grpc-status")) {
              const grpcStatus = response.headers.get("grpc-status");
              let grpcMessage = response.headers.get("grpc-message");
              const error = new Error(
                `'todo_app.v1.TodoList' for '${id}' responded ` +
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

              return { error } as resemble_react.ResponseOrError<Response>;
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
    request: resemble_api.react_pb.QueryRequest,
    signal: AbortSignal
  ): AsyncGenerator<resemble_api.react_pb.QueryResponse, void, unknown> {
    const response = await resemble_react.guardedFetch(
      newRequest(request, "/query", "POST"),
      { signal: signal }
    );

    if (response.body === null) {
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
          yield resemble_api.react_pb.QueryResponse.fromJson(json.at(-1));
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


class TodoListInstance {

  constructor(id: string, endpoint: string) {
    this.id = id;
    this.endpoint = endpoint;
    this.refs = 1;

    this.initializeWebSocket();
  }

  ref() {
    this.refs += 1;
  }

  unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
    }
  }

  readonly id: string;
  private endpoint: string;
  private refs: number;
  private observers: resemble_react.Observers = {};
  private loadingReaders = 0;
  private runningMutates: resemble_react.Mutate[] = [];
  private queuedMutates: resemble_react.Mutate[] = [];
  private flushMutates?: resemble_react.Event = undefined;
  private websocket?: WebSocket = undefined;
  private backoff: resemble_react.Backoff = new resemble_react.Backoff();

  private hasRunningMutations() {
    return this.runningMutates.length > 0;
  }

  private async flushMutations() {
    if (this.flushMutates === undefined) {
      this.flushMutates = new resemble_react.Event();
    }
    await this.flushMutates.wait();
  }

  private readersLoadedOrFailed() {
    this.flushMutates = undefined;

    if (this.queuedMutates.length > 0) {
      this.runningMutates = this.queuedMutates;
      this.queuedMutates = [];

      if (this.websocket?.readyState === WebSocket.OPEN) {
        for (const { request, update } of this.runningMutates) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch (e: unknown) {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      }
    }
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0) {
      const url = new URL(this.endpoint);
      this.websocket = new WebSocket(
        `wss://${url.host}/__/resemble/websocket/todo_app.v1.TodoList/${this.id}`
      );

      this.websocket.binaryType = "arraybuffer";

      this.websocket.onopen = (event) => {
        if (this.websocket?.readyState === WebSocket.OPEN) {
          for (const { request, update } of this.runningMutates) {
            update({ isLoading: true });
            try {
              this.websocket.send(request.toBinary());
            } catch (e: unknown) {
              // We'll retry since we've stored in `*Mutates`.
            }
          }
        }
      };

      this.websocket.onerror = async (event) => {
        if (this.websocket !== undefined) {
          // TODO: explicitly close?
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onclose = async (event) => {
        if (this.websocket !== undefined) {
          // TODO: explicitly close?
          this.websocket = undefined;

          for (const { update } of this.runningMutates) {
            update({ isLoading: false, error: "WebSocket disconnected" });
          }

          if (this.refs > 0) {
            await this.backoff.wait();

            this.initializeWebSocket();
          }
        }
      };

      this.websocket.onmessage = async (event) => {
        const { resolve } = this.runningMutates[0];
        this.runningMutates.shift();

        const response = resemble_api.react_pb.MutateResponse.fromBinary(
          new Uint8Array(event.data)
        );

        resolve(response);

        if (
          this.flushMutates !== undefined &&
          this.runningMutates.length === 0
        ) {
          this.flushMutates.set();
        }
      };
    }
  }

  private async mutate(
    partialRequest: __bufbuildProtobufPartialMessage<resemble_api.react_pb.MutateRequest>,
    update: (props: { isLoading: boolean; error?: any }) => void
  ): Promise<resemble_api.react_pb.MutateResponse> {
    const request = partialRequest instanceof resemble_api.react_pb.MutateRequest
      ? partialRequest
      : new resemble_api.react_pb.MutateRequest(partialRequest);

    return new Promise((resolve, _) => {
      if (this.loadingReaders === 0) {
        this.runningMutates.push({ request, resolve, update });
        if (this.websocket?.readyState === WebSocket.OPEN) {
          update({ isLoading: true });
          try {
            this.websocket.send(request.toBinary());
          } catch (e: unknown) {
            // We'll retry since we've stored in `*Mutates`.
          }
        }
      } else {
        this.queuedMutates.push({ request, resolve, update });
      }
    });
  }

  private async read<
    RequestType extends __bufbuildProtobufMessage<RequestType>,
    ResponseType extends __bufbuildProtobufMessage<ResponseType>,
    >(
    method: string,
    request: RequestType,
    responseType: __bufbuildProtobufMessageType<ResponseType>,
    reader: resemble_react.Reader<ResponseType>
  ) {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("x-resemble-service-name", "todo_app.v1.TodoList");
    headers.append("x-resemble-actor-id", this.id);
    headers.append("Connection", "keep-alive");

    const queryRequest = new resemble_api.react_pb.QueryRequest({
      method,
      request: request.toBinary(),
    });

    // Expected idempotency key we should observe due to a mutation.
    interface Expected {
      // Idempotency key of mutation.
      idempotencyKey: string;

      // Callback when we've observed this idempotency key.
      observed: (callback: () => void) => Promise<void>;

      // Callback when we no longer care about observing.
      aborted: () => void;
    }

    let expecteds: Expected[] = [];

    // When we disconnect we may not be able to observe
    // responses due to mutations yet there may still be
    // some outstanding responses that are expected which
    // we treat as "orphans" in the sense that we won't
    // observe their idempotency keys but once we reconnect
    // we will still have observed their effects and can
    // call `observed()` on them.
    let orphans: Expected[] = [];

    const id = `${uuidv4()}`;

    this.observers[id] = {
      observe: (
        idempotencyKey: string,
        observed: (callback: () => void) => Promise<void>,
        aborted: () => void
      ) => {
        expecteds.push({ idempotencyKey, observed, aborted });
      },
      unobserve: (idempotencyKey: string) => {
        expecteds = expecteds.filter(
          expected => expected.idempotencyKey !== idempotencyKey
        );
      }
    };

    try {
      await resemble_react.retryForever(async () => {
        let loaded = false;
        this.loadingReaders += 1;

        // Any mutations started after we've incremented
        // `this.loadingReaders` will be queued until after
        // all the readers have loaded and thus (1) we know all
        // current `expected` are actually `orphans` that
        // we will haved "observed" once we are (re)connected
        // because we flush mutations before starting to read
        // and (2) all queued mutations can stay in `expected`
        // because we will in fact be able to observe them
        // since they won't get sent over the websocket
        // until after we are (re)connected.
        //
        // NOTE: we need to concatenate with `orphans`
        // because we may try to (re)connect multiple times
        // and between each try more mutations may have been
        // made (or queued ones will be moved to running).
        orphans = [...orphans, ...expecteds];
        expecteds = [];

        try {
          // Wait for potentially completed mutations to flush
          // before starting to read so that we read the latest
          // state including those mutations.
          if (this.hasRunningMutations()) {
            await this.flushMutations();
          }

          unstable_batchedUpdates(() => {
            for (const setIsLoading of Object.values(reader.setIsLoadings)) {
              setIsLoading(true);
            }
          });

          const jsonResponses = resemble_react.grpcServerStream(
            new Request(
              `${this.endpoint}/resemble.v1alpha1.React.Query`,
              {
                method: "POST",
                headers,
                body: queryRequest.toJsonString()
              }
            ),
            { signal: reader.abortController.signal }
          );

          for await (const jsonResponse of jsonResponses) {
            if (!loaded) {
              if ((this.loadingReaders -= 1) === 0) {
                this.readersLoadedOrFailed();
              }
              loaded = true;
            }

            unstable_batchedUpdates(() => {
              for (const setIsLoading of Object.values(reader.setIsLoadings)) {
                setIsLoading(false);
              }
            });

            const queryResponse = resemble_api.react_pb.QueryResponse.fromJson(
              jsonResponse
            );

            const response = queryResponse.response !== undefined
              ? responseType.fromBinary(queryResponse.response)
              : undefined;

            // If we were disconnected it must be that we've
            // observed all `orphans` because we waited
            // for any mutations to flush before we re-started to
            // read.
            if (orphans.length > 0) {
              // We mark all mutations as observed except the
              // last one which we also invoke all `setResponse`s.
              // In this way we effectively create a barrier
              // for all readers that will synchronize on the last
              // mutation, but note that this still may lead
              // to some partial state/response updates because
              // one reader may have actually received a response
              // while another reader got disconnected. While this
              // is likely very rare, it is possible. Mitigating
              // this issue is non-trivial and for now we have
              // no plans to address it.
              for (let i = 0; i < orphans.length - 1; i++) {
                orphans[i].observed(() => {});
              }
              await orphans[orphans.length - 1].observed(() => {
                if (response !== undefined) {
                  reader.response = response;
                  for (const setResponse of Object.values(reader.setResponses)) {
                    setResponse(response);
                  }
                }
              });

              orphans = [];
            } else if (
              expecteds.length > 0 &&
              queryResponse.idempotencyKeys.includes(
                expecteds[0].idempotencyKey
              )
            ) {
              // eslint-disable-next-line no-loop-func
              await expecteds[0].observed(() => {
                if (response !== undefined) {
                  reader.response = response;
                  for (const setResponse of Object.values(reader.setResponses)) {
                    setResponse(response);
                  }
                }
                // eslint-disable-next-line no-loop-func
                expecteds.shift();
              });
            } else if (response !== undefined) {
              unstable_batchedUpdates(() => {
                reader.response = response;
                for (const setResponse of Object.values(reader.setResponses)) {
                  setResponse(response);
                }
              });
            }
          }

          throw new Error('Not expecting stream to ever be done');
        } catch (e: unknown) {
          if (!loaded) {
            if ((this.loadingReaders -= 1) === 0) {
              this.readersLoadedOrFailed();
            }
          }

          loaded = false;

          if (reader.abortController.signal.aborted) {
            for (const { aborted } of [...orphans, ...expecteds]) {
              aborted();
            }
            return;
          }

          unstable_batchedUpdates(() => {
            for (const setIsLoading of Object.values(reader.setIsLoadings)) {
              setIsLoading(false);
            }
            if (e instanceof resemble_api.Status) {
              for (const setStatus of Object.values(reader.setStatuses)) {
                setStatus(e);
              }
            }
          });

          console.error(e);

          throw e; // This just retries!
        }
      });
    } finally {
      delete this.observers[id];
    }
  }


  private useAddTodoMutations: (
    resemble_react.Mutation<AddTodoRequest>)[] = [];

  private useAddTodoSetPendings: {
    [id: string]: (mutations: resemble_react.Mutation<AddTodoRequest>[]) => void
  } = {};

  async addTodo(
    mutation: resemble_react.Mutation<AddTodoRequest>
  ): Promise<
    resemble_react.ResponseOrErrors<
      AddTodoResponse,
      resemble_api.SystemErrorDetails
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new resemble_react.Event();

    const callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks.push(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        unstable_batchedUpdates(() => {
          for (const callback of callbacks) {
            callback();
          }
        });
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useAddTodoMutations.push(mutation);

    unstable_batchedUpdates(() => {
      for (const setPending of Object.values(this.useAddTodoSetPendings)) {
        setPending(this.useAddTodoMutations);
      }
    });

    return new Promise<
      resemble_react.ResponseOrErrors<
        AddTodoResponse,
        resemble_api.SystemErrorDetails
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "AddTodo",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            for (const m of this.useAddTodoMutations) {
              if (m === mutation) {
                m.isLoading = isLoading;
                if (error !== undefined) {
                  m.error = error;
                }
              }
              return m;
            }

            unstable_batchedUpdates(() => {
              for (const setPending of Object.values(this.useAddTodoSetPendings)) {
                setPending(this.useAddTodoMutations);
              }
            });
          }
        );

        switch (responseOrStatus.case) {
          case "response":
            await observed(() => {
              this.useAddTodoMutations =
                this.useAddTodoMutations.filter(m => m !== mutation);

              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useAddTodoSetPendings)) {
                  setPending(this.useAddTodoMutations);
                }
              });

              resolve({
                response: AddTodoResponse.fromBinary(
                  responseOrStatus.value
                )
              });
            });
            break;
          case "status":
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = resemble_api.Status.fromJsonString(responseOrStatus.value);

            let error;
            if ((error = resemble_api.SystemError.fromStatus(status)) !== undefined) {
              resolve({ error });
            } else {
              reject(
                new Error(
                  `Unknown error with gRPC status ${JSON.stringify(status)}`
                )
              );
            }
            break;
          default:
            reject(new Error('Expecting either a response or an error'));
        }
      });
  }

  useAddTodo(
    id: string,
    setPending: (mutations: resemble_react.Mutation<AddTodoRequest>[]) => void
  ) {
    this.useAddTodoSetPendings[id] = setPending;
  }

  unuseAddTodo(id: string) {
    delete this.useAddTodoSetPendings[id];
  }


  private useListTodosReaders: {
    [id: string]: resemble_react.Reader<ListTodosResponse>
  } = {};

  useListTodos(
    id: string,
    request: ListTodosRequest,
    setResponse: (response: ListTodosResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: resemble_api.Status) => void
  ) {
    let read = false;

    const key = request.toJsonString();

    if (!(key in this.useListTodosReaders)) {
      this.useListTodosReaders[key] = {
        abortController: new AbortController(),
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},
      };

      read = true;
    }

    let reader = this.useListTodosReaders[key];

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    if (reader.response !== undefined) {
      setResponse(reader.response);
    }

    if (read) {
      this.read(
        "ListTodos",
        request,
        ListTodosResponse,
        reader
      );
    }
  }

  unuseListTodos(
    id: string,
    request: ListTodosRequest
  ) {
    const key = request.toJsonString();

    const reader = this.useListTodosReaders[key];

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    if (Object.values(reader.setResponses).length === 0) {
      delete this.useListTodosReaders[key];
      reader.abortController.abort();
    }
  }


  private useDeleteTodoMutations: (
    resemble_react.Mutation<DeleteTodoRequest>)[] = [];

  private useDeleteTodoSetPendings: {
    [id: string]: (mutations: resemble_react.Mutation<DeleteTodoRequest>[]) => void
  } = {};

  async deleteTodo(
    mutation: resemble_react.Mutation<DeleteTodoRequest>
  ): Promise<
    resemble_react.ResponseOrErrors<
      DeleteTodoResponse,
      resemble_api.SystemErrorDetails
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new resemble_react.Event();

    const callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks.push(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        unstable_batchedUpdates(() => {
          for (const callback of callbacks) {
            callback();
          }
        });
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useDeleteTodoMutations.push(mutation);

    unstable_batchedUpdates(() => {
      for (const setPending of Object.values(this.useDeleteTodoSetPendings)) {
        setPending(this.useDeleteTodoMutations);
      }
    });

    return new Promise<
      resemble_react.ResponseOrErrors<
        DeleteTodoResponse,
        resemble_api.SystemErrorDetails
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "DeleteTodo",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            for (const m of this.useDeleteTodoMutations) {
              if (m === mutation) {
                m.isLoading = isLoading;
                if (error !== undefined) {
                  m.error = error;
                }
              }
              return m;
            }

            unstable_batchedUpdates(() => {
              for (const setPending of Object.values(this.useDeleteTodoSetPendings)) {
                setPending(this.useDeleteTodoMutations);
              }
            });
          }
        );

        switch (responseOrStatus.case) {
          case "response":
            await observed(() => {
              this.useDeleteTodoMutations =
                this.useDeleteTodoMutations.filter(m => m !== mutation);

              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useDeleteTodoSetPendings)) {
                  setPending(this.useDeleteTodoMutations);
                }
              });

              resolve({
                response: DeleteTodoResponse.fromBinary(
                  responseOrStatus.value
                )
              });
            });
            break;
          case "status":
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = resemble_api.Status.fromJsonString(responseOrStatus.value);

            let error;
            if ((error = resemble_api.SystemError.fromStatus(status)) !== undefined) {
              resolve({ error });
            } else {
              reject(
                new Error(
                  `Unknown error with gRPC status ${JSON.stringify(status)}`
                )
              );
            }
            break;
          default:
            reject(new Error('Expecting either a response or an error'));
        }
      });
  }

  useDeleteTodo(
    id: string,
    setPending: (mutations: resemble_react.Mutation<DeleteTodoRequest>[]) => void
  ) {
    this.useDeleteTodoSetPendings[id] = setPending;
  }

  unuseDeleteTodo(id: string) {
    delete this.useDeleteTodoSetPendings[id];
  }


  private useCompleteTodoMutations: (
    resemble_react.Mutation<CompleteTodoRequest>)[] = [];

  private useCompleteTodoSetPendings: {
    [id: string]: (mutations: resemble_react.Mutation<CompleteTodoRequest>[]) => void
  } = {};

  async completeTodo(
    mutation: resemble_react.Mutation<CompleteTodoRequest>
  ): Promise<
    resemble_react.ResponseOrErrors<
      CompleteTodoResponse,
      resemble_api.SystemErrorDetails
  >> {
    // We always have at least 1 observer which is this function!
    let remainingObservers = 1;

    const event = new resemble_react.Event();

    const callbacks: (() => void)[] = [];

    const observed = (callback: () => void) => {
      callbacks.push(callback);
      remainingObservers -= 1;
      if (remainingObservers === 0) {
        unstable_batchedUpdates(() => {
          for (const callback of callbacks) {
            callback();
          }
        });
        event.set();
      }
      return event.wait();
    };

    const aborted = () => {
      observed(() => {});
    }

    // Tell observers about this pending mutation.
    for (const id in this.observers) {
      remainingObservers += 1;
      this.observers[id].observe(mutation.idempotencyKey, observed, aborted);
    }

    this.useCompleteTodoMutations.push(mutation);

    unstable_batchedUpdates(() => {
      for (const setPending of Object.values(this.useCompleteTodoSetPendings)) {
        setPending(this.useCompleteTodoMutations);
      }
    });

    return new Promise<
      resemble_react.ResponseOrErrors<
        CompleteTodoResponse,
        resemble_api.SystemErrorDetails
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "CompleteTodo",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            for (const m of this.useCompleteTodoMutations) {
              if (m === mutation) {
                m.isLoading = isLoading;
                if (error !== undefined) {
                  m.error = error;
                }
              }
              return m;
            }

            unstable_batchedUpdates(() => {
              for (const setPending of Object.values(this.useCompleteTodoSetPendings)) {
                setPending(this.useCompleteTodoMutations);
              }
            });
          }
        );

        switch (responseOrStatus.case) {
          case "response":
            await observed(() => {
              this.useCompleteTodoMutations =
                this.useCompleteTodoMutations.filter(m => m !== mutation);

              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useCompleteTodoSetPendings)) {
                  setPending(this.useCompleteTodoMutations);
                }
              });

              resolve({
                response: CompleteTodoResponse.fromBinary(
                  responseOrStatus.value
                )
              });
            });
            break;
          case "status":
            // Let the observers know they no longer should expect to
            // observe this idempotency key.
            for (const id in this.observers) {
              this.observers[id].unobserve(mutation.idempotencyKey);
            }

            const status = resemble_api.Status.fromJsonString(responseOrStatus.value);

            let error;
            if ((error = resemble_api.SystemError.fromStatus(status)) !== undefined) {
              resolve({ error });
            } else {
              reject(
                new Error(
                  `Unknown error with gRPC status ${JSON.stringify(status)}`
                )
              );
            }
            break;
          default:
            reject(new Error('Expecting either a response or an error'));
        }
      });
  }

  useCompleteTodo(
    id: string,
    setPending: (mutations: resemble_react.Mutation<CompleteTodoRequest>[]) => void
  ) {
    this.useCompleteTodoSetPendings[id] = setPending;
  }

  unuseCompleteTodo(id: string) {
    delete this.useCompleteTodoSetPendings[id];
  }


  private static instances: { [id: string]: TodoListInstance } = {};

  static use(id: string, endpoint: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new TodoListInstance(id, endpoint);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    this.unref();
  }
}

export const useTodoList = (
  { id }: { id: string }
): UseTodoListApi => {
  const resembleContext = resemble_react.useResembleContext();

  const endpoint = resembleContext.client?.endpoint || "";

  const [instance, setInstance] = useState(() => {
    return TodoListInstance.use(
      id, endpoint
    );
  });

  if (instance.id !== id) {
    setInstance(
      TodoListInstance.use(
        id, endpoint
      )
    );
  }

  useEffect(() => {
    return () => {
      instance.unuse();
    };
  }, [instance]);

  const headers = useMemo(() => {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("x-resemble-service-name", "todo_app.v1.TodoList");
    headers.append("x-resemble-actor-id", id);
    headers.append("Connection", "keep-alive");
    return headers;
  }, [id]);


  function useAddTodo() {
    const [
      pending,
      setPending
    ] = useState<resemble_react.Mutation<AddTodoRequest>[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useAddTodo(id, setPending);
      return () => {
        instance.unuseAddTodo(id);
      };
    }, []);

    const addTodo = useMemo(() => {
      const method = async (
        partialRequest: __bufbuildProtobufPartialMessage<AddTodoRequest> = {},
        optimistic_metadata?: any
      ) => {
        const request = partialRequest instanceof AddTodoRequest
          ? partialRequest.clone()
          : new AddTodoRequest(partialRequest);

        const idempotencyKey = uuidv4();

        const mutation = {
          request,
          idempotencyKey,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.addTodo(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<AddTodoRequest>>();

      return method;
    }, []);

    addTodo.pending = pending;

    return addTodo;
  }

  const addTodo = useAddTodo();



  function useListTodos(
    partialRequest: __bufbuildProtobufPartialMessage<ListTodosRequest> = {}
  ) {
    const [request, setRequest] = useState(
      partialRequest instanceof ListTodosRequest
        ? partialRequest.clone()
        : new ListTodosRequest(partialRequest)
    );

    if (!request.equals(partialRequest)) {
      setRequest(
        partialRequest instanceof ListTodosRequest
          ? partialRequest.clone()
          : new ListTodosRequest(partialRequest)
      );
    }

    const [response, setResponse] = useState<ListTodosResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<
      undefined
      | resemble_api.SystemErrorDetails
      >();

    const [exception, setException] = useState<Error>();

    useEffect(() => {
      const id = uuidv4();
      instance.useListTodos(
        id,
        request,
        (response: ListTodosResponse) => {
          unstable_batchedUpdates(() => {
            setError(undefined);
            setResponse(response);
          });
        },
        setIsLoading,
        (status: resemble_api.Status) => {
          let error;
          if ((error = resemble_api.SystemError.fromStatus(status)) !== undefined) {
            setError(error);
          } else {
            setException(
              new Error(
                `Unknown error with gRPC status ${JSON.stringify(status)}`
              )
            );
          }
        },
      );
      return () => {
        instance.unuseListTodos(id, request);
      };
    }, [request]);

    if (exception !== undefined) {
      throw exception;
    }

    return { response, isLoading, error };
  }

  async function listTodos(
    partialRequest: __bufbuildProtobufPartialMessage<ListTodosRequest> = {}
  ) {
    const request = partialRequest instanceof ListTodosRequest
      ? partialRequest.clone()
      : new ListTodosRequest(partialRequest);

    // Fetch with retry, using a backoff, i.e., if we get disconnected.
    const response = await (async () => {
      const backoff = new resemble_react.Backoff();

      while (true) {
        try {
          // Invariant here is that we use the '/package.service.method' path and
          // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
          //
          // See also 'resemble/helpers.py'.
          return await resemble_react.guardedFetch(
            new Request(
              `${resembleContext.client?.endpoint}/todo_app.v1.TodoList.ListTodos`, {
                method: "POST",
                headers,
                body: request.toJsonString()
              }
            )
          );
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.error(e.message);
          } else {
            console.error(`Unknown error: ${JSON.stringify(e)}`);
          }
        }

        await backoff.wait();
      }
    })();

    if (!response.ok) {
      if (response.headers.get("content-type") === "application/json") {
        const status = resemble_api.Status.fromJson(await response.json());

        let error;
        if ((error = resemble_api.SystemError.fromStatus(status)) !== undefined) {
          return { error };
        } else {
          throw new Error(
            `Unknown error with gRPC status ${JSON.stringify(status)}`
          );
        }
      } else {
        throw new Error(`Unknown error with HTTP status ${response.status}`);
      }
    } else {
      return { response: await response.json() };
    }
  }


  function useDeleteTodo() {
    const [
      pending,
      setPending
    ] = useState<resemble_react.Mutation<DeleteTodoRequest>[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useDeleteTodo(id, setPending);
      return () => {
        instance.unuseDeleteTodo(id);
      };
    }, []);

    const deleteTodo = useMemo(() => {
      const method = async (
        partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoRequest> = {},
        optimistic_metadata?: any
      ) => {
        const request = partialRequest instanceof DeleteTodoRequest
          ? partialRequest.clone()
          : new DeleteTodoRequest(partialRequest);

        const idempotencyKey = uuidv4();

        const mutation = {
          request,
          idempotencyKey,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.deleteTodo(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<DeleteTodoRequest>>();

      return method;
    }, []);

    deleteTodo.pending = pending;

    return deleteTodo;
  }

  const deleteTodo = useDeleteTodo();


  function useCompleteTodo() {
    const [
      pending,
      setPending
    ] = useState<resemble_react.Mutation<CompleteTodoRequest>[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useCompleteTodo(id, setPending);
      return () => {
        instance.unuseCompleteTodo(id);
      };
    }, []);

    const completeTodo = useMemo(() => {
      const method = async (
        partialRequest: __bufbuildProtobufPartialMessage<CompleteTodoRequest> = {},
        optimistic_metadata?: any
      ) => {
        const request = partialRequest instanceof CompleteTodoRequest
          ? partialRequest.clone()
          : new CompleteTodoRequest(partialRequest);

        const idempotencyKey = uuidv4();

        const mutation = {
          request,
          idempotencyKey,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.completeTodo(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<CompleteTodoRequest>>();

      return method;
    }, []);

    completeTodo.pending = pending;

    return completeTodo;
  }

  const completeTodo = useCompleteTodo();


  return {
    mutators: {
      addTodo,
      deleteTodo,
      completeTodo,
    },
    listTodos,
    useListTodos,
  };
};


