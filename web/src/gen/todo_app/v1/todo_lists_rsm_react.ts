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
  TodoListObject, 
	TodoListsState, 
	AddTodoListRequest, 
	AddTodoListResponse, 
	ListTodoListsRequest, 
	ListTodoListsResponse, 
	DeleteTodoListRequest, 
	DeleteTodoListResponse,
} from "./todo_lists_pb";

// Additionally re-export all messages from the pb module.
export {
  TodoListObject, 
	TodoListsState, 
	AddTodoListRequest, 
	AddTodoListResponse, 
	ListTodoListsRequest, 
	ListTodoListsResponse, 
	DeleteTodoListRequest, 
	DeleteTodoListResponse,
};

// Start of service specific code.
///////////////////////////////////////////////////////////////////////////


export interface TodoListsApi {
  AddTodoList: (partialRequest?: __bufbuildProtobufPartialMessage<AddTodoListRequest>) =>
  Promise<AddTodoListResponse>;
  ListTodoLists: (partialRequest?: __bufbuildProtobufPartialMessage<ListTodoListsRequest>) =>
  Promise<ListTodoListsResponse>;
  DeleteTodoList: (partialRequest?: __bufbuildProtobufPartialMessage<DeleteTodoListRequest>) =>
  Promise<DeleteTodoListResponse>;
  useListTodoLists: (partialRequest?: __bufbuildProtobufPartialMessage<ListTodoListsRequest>) => {
   response: ListTodoListsResponse | undefined;
    isLoading: boolean;
    error: unknown;
    mutations: {
       AddTodoList: (request: __bufbuildProtobufPartialMessage<AddTodoListRequest>,
       optimistic_metadata?: any ) =>
      Promise<resemble_react.ResponseOrError<AddTodoListResponse>>;
       DeleteTodoList: (request: __bufbuildProtobufPartialMessage<DeleteTodoListRequest>,
       optimistic_metadata?: any ) =>
      Promise<resemble_react.ResponseOrError<DeleteTodoListResponse>>;
    };
      pendingAddTodoListMutations: {
        request: AddTodoListRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
        optimistic_metadata?: any;
      }[];
      failedAddTodoListMutations: {
        request: AddTodoListRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
      }[];
      recoveredAddTodoListMutations: {
        request: AddTodoListRequest;
        idempotencyKey: string;
        run: () => void;
      }[];
      pendingDeleteTodoListMutations: {
        request: DeleteTodoListRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
        optimistic_metadata?: any;
      }[];
      failedDeleteTodoListMutations: {
        request: DeleteTodoListRequest;
        idempotencyKey: string;
        isLoading: boolean;
        error?: unknown;
      }[];
      recoveredDeleteTodoListMutations: {
        request: DeleteTodoListRequest;
        idempotencyKey: string;
        run: () => void;
      }[];
  };
}

export interface TodoListsMutators {
  addTodoList: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<AddTodoListRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrErrors<
        AddTodoListResponse,
        resemble_api.SystemErrorDetails
      >>;

    pending: resemble_react.Mutation<AddTodoListRequest>[];
  };
  deleteTodoList: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<DeleteTodoListRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrErrors<
        DeleteTodoListResponse,
        resemble_api.SystemErrorDetails
      >>;

    pending: resemble_react.Mutation<DeleteTodoListRequest>[];
  };
}


export interface UseTodoListsApi {
  mutators: TodoListsMutators;
  useListTodoLists: (
    partialRequest?: __bufbuildProtobufPartialMessage<ListTodoListsRequest>
  ) => {
    response: ListTodoListsResponse | undefined;
    isLoading: boolean;
    error: undefined | resemble_api.SystemErrorDetails
;
  };
  listTodoLists: (
    partialRequest?: __bufbuildProtobufPartialMessage<ListTodoListsRequest>
  ) => Promise<
    resemble_react.ResponseOrErrors<
    ListTodoListsResponse,
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

export const TodoLists = (
  { id, storeMutationsLocallyInNamespace }: SettingsParams
): TodoListsApi => {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.append("x-resemble-service-name", "todo_app.v1.TodoLists");
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

  const AddTodoList = async (
    partialRequest: __bufbuildProtobufPartialMessage<AddTodoListRequest> = {}
  ) => {
    const request = partialRequest instanceof AddTodoListRequest
      ? partialRequest
      : new AddTodoListRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoLists.AddTodoList", "POST"
      )
    );

    return await response.json();
  };

  const ListTodoLists = async (
    partialRequest: __bufbuildProtobufPartialMessage<ListTodoListsRequest> = {}
  ) => {
    const request = partialRequest instanceof ListTodoListsRequest
      ? partialRequest
      : new ListTodoListsRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoLists.ListTodoLists", "POST"
      )
    );

    if (!response.ok && response.headers.has("grpc-status")) {
      const grpcStatus = response.headers.get("grpc-status");
      let grpcMessage = response.headers.get("grpc-message");
      throw new Error(
        `'todo_app.v1.TodoLists.ListTodoLists' for '${id}' responded ` +
          `with status ${grpcStatus}` +
          `${grpcMessage !== null ? ": " + grpcMessage : ""}`
      );
    } else if (!response.ok) {
      throw new Error(
        `'todo_app.v1.TodoLists.ListTodoLists' failed: ${response.body}`
      );
    }

    return await response.json();
  };

  const useListTodoLists = (
    partialRequest: __bufbuildProtobufPartialMessage<ListTodoListsRequest> = {}
  ) => {
    const [response, setResponse] = useState<ListTodoListsResponse>();
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

    const request = partialRequest instanceof ListTodoListsRequest
      ? partialRequest
      : new ListTodoListsRequest(partialRequest);

    // NOTE: using a ref for the 'request' and 'settings' (below) so
    // that it doesn't get changed after the first time calling 'useListTodoLists'.
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
      runningAddTodoListMutations.current.length > 0||
      runningDeleteTodoListMutations.current.length > 0) {
        return true;
      }
      return false;
    }


    const runningAddTodoListMutations = useRef<resemble_react.Mutation<AddTodoListRequest>[]>([]);
    const recoveredAddTodoListMutations = useRef<
      [resemble_react.Mutation<AddTodoListRequest>, () => void][]
    >([]);
    const shouldClearFailedAddTodoListMutations = useRef(false);
    const [failedAddTodoListMutations, setFailedAddTodoListMutations] = useState<
      resemble_react.Mutation<AddTodoListRequest>[]
    >([]);
    const queuedAddTodoListMutations = useRef<[resemble_react.Mutation<AddTodoListRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeAddTodoListMutations = (): [
      resemble_react.Mutation<AddTodoListRequest>,
      () => void
    ][] => {
      if (localStorageKeyRef.current === undefined) {
        return [];
      }
      const suffix = AddTodoList
      const value = localStorage.getItem(localStorageKeyRef.current + suffix);
      if (value === null) {
        return [];
      }

      localStorage.removeItem(localStorageKeyRef.current);
      const mutations: resemble_react.Mutation<AddTodoListRequest>[] = JSON.parse(value);
      const recoveredAddTodoListMutations: [
        resemble_react.Mutation<AddTodoListRequest>,
        () => void
      ][] = [];
      for (const mutation of mutations) {
        recoveredAddTodoListMutations.push([mutation, () => __AddTodoList(mutation)]);
      }
      return recoveredAddTodoListMutations;
    }
    const doOnceAddTodoList = useRef(true)
    if (doOnceAddTodoList.current) {
      doOnceAddTodoList.current = false
      recoveredAddTodoListMutations.current = recoverAndPurgeAddTodoListMutations()
    }

    // User facing state that only includes the pending mutations that
    // have not been observed.
    const [unobservedPendingAddTodoListMutations, setUnobservedPendingAddTodoListMutations] =
      useState<resemble_react.Mutation<AddTodoListRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedAddTodoListMutations.current = true;
    }, [failedAddTodoListMutations]);

    async function __AddTodoList(
      mutation: resemble_react.Mutation<AddTodoListRequest>
    ): Promise<resemble_react.ResponseOrError<AddTodoListResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningAddTodoListMutations
        runningAddTodoListMutations.current.push(mutation)
        return _Mutation<AddTodoListRequest, AddTodoListResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_app.v1.TodoLists.AddTodoList",
          mutation,
          mutation.request,
          mutation.idempotencyKey,
          setUnobservedPendingAddTodoListMutations,
          abortController,
          shouldClearFailedAddTodoListMutations,
          setFailedAddTodoListMutations,
          runningAddTodoListMutations,
          flushMutations,
          queuedMutations,
          AddTodoListRequest,
          AddTodoListResponse.fromJson
        );
      } finally {
        runningAddTodoListMutations.current = runningAddTodoListMutations.current.filter(
          ({ idempotencyKey }) => mutation.idempotencyKey !== idempotencyKey
        );

        resemble_react.popMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "AddTodoList",
          (mutationRequest: resemble_react.Mutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _AddTodoList(mutation: resemble_react.Mutation<AddTodoListRequest>) {
      setUnobservedPendingAddTodoListMutations(
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
        const deferred = new resemble_react.Deferred<resemble_react.ResponseOrError<AddTodoListResponse>>(() =>
          __AddTodoList(mutation)
        );

        // Add to localStorage here.
        queuedAddTodoListMutations.current.push([mutation, () => deferred.start()]);
        queuedMutations.current.push(() => {
          for (const [, run] of queuedAddTodoListMutations.current) {
            queuedAddTodoListMutations.current.shift();
            run();
            break;
          }
        });
        // Maybe add to localStorage.
        resemble_react.pushMutationMaybeToLocalStorage(localStorageKeyRef.current, "AddTodoList", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningAddTodoListMutations` in `__AddTodoList`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __AddTodoList(mutation);
      }
    }

    async function AddTodoList(
      partialRequest: __bufbuildProtobufPartialMessage<AddTodoListRequest>,
      optimistic_metadata?: any
    ): Promise<resemble_react.ResponseOrError<AddTodoListResponse>> {
      const idempotencyKey = uuidv4();

      const request = partialRequest instanceof AddTodoListRequest
        ? partialRequest
        : new AddTodoListRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _AddTodoList(mutation);
    }

    const runningDeleteTodoListMutations = useRef<resemble_react.Mutation<DeleteTodoListRequest>[]>([]);
    const recoveredDeleteTodoListMutations = useRef<
      [resemble_react.Mutation<DeleteTodoListRequest>, () => void][]
    >([]);
    const shouldClearFailedDeleteTodoListMutations = useRef(false);
    const [failedDeleteTodoListMutations, setFailedDeleteTodoListMutations] = useState<
      resemble_react.Mutation<DeleteTodoListRequest>[]
    >([]);
    const queuedDeleteTodoListMutations = useRef<[resemble_react.Mutation<DeleteTodoListRequest>, () => void][]>(
      []
    );
    const recoverAndPurgeDeleteTodoListMutations = (): [
      resemble_react.Mutation<DeleteTodoListRequest>,
      () => void
    ][] => {
      if (localStorageKeyRef.current === undefined) {
        return [];
      }
      const suffix = DeleteTodoList
      const value = localStorage.getItem(localStorageKeyRef.current + suffix);
      if (value === null) {
        return [];
      }

      localStorage.removeItem(localStorageKeyRef.current);
      const mutations: resemble_react.Mutation<DeleteTodoListRequest>[] = JSON.parse(value);
      const recoveredDeleteTodoListMutations: [
        resemble_react.Mutation<DeleteTodoListRequest>,
        () => void
      ][] = [];
      for (const mutation of mutations) {
        recoveredDeleteTodoListMutations.push([mutation, () => __DeleteTodoList(mutation)]);
      }
      return recoveredDeleteTodoListMutations;
    }
    const doOnceDeleteTodoList = useRef(true)
    if (doOnceDeleteTodoList.current) {
      doOnceDeleteTodoList.current = false
      recoveredDeleteTodoListMutations.current = recoverAndPurgeDeleteTodoListMutations()
    }

    // User facing state that only includes the pending mutations that
    // have not been observed.
    const [unobservedPendingDeleteTodoListMutations, setUnobservedPendingDeleteTodoListMutations] =
      useState<resemble_react.Mutation<DeleteTodoListRequest>[]>([]);

    useEffect(() => {
      shouldClearFailedDeleteTodoListMutations.current = true;
    }, [failedDeleteTodoListMutations]);

    async function __DeleteTodoList(
      mutation: resemble_react.Mutation<DeleteTodoListRequest>
    ): Promise<resemble_react.ResponseOrError<DeleteTodoListResponse>> {
      try {
        // Invariant that we won't yield to event loop before pushing to
        // runningDeleteTodoListMutations
        runningDeleteTodoListMutations.current.push(mutation)
        return _Mutation<DeleteTodoListRequest, DeleteTodoListResponse>(
          // Invariant here is that we use the '/package.service.method'.
          //
          // See also 'resemble/helpers.py'.
          "/todo_app.v1.TodoLists.DeleteTodoList",
          mutation,
          mutation.request,
          mutation.idempotencyKey,
          setUnobservedPendingDeleteTodoListMutations,
          abortController,
          shouldClearFailedDeleteTodoListMutations,
          setFailedDeleteTodoListMutations,
          runningDeleteTodoListMutations,
          flushMutations,
          queuedMutations,
          DeleteTodoListRequest,
          DeleteTodoListResponse.fromJson
        );
      } finally {
        runningDeleteTodoListMutations.current = runningDeleteTodoListMutations.current.filter(
          ({ idempotencyKey }) => mutation.idempotencyKey !== idempotencyKey
        );

        resemble_react.popMutationMaybeFromLocalStorage(
          localStorageKeyRef.current,
          "DeleteTodoList",
          (mutationRequest: resemble_react.Mutation<Request>) =>
            mutationRequest.idempotencyKey !== mutation.idempotencyKey
        );


      }
    }
    async function _DeleteTodoList(mutation: resemble_react.Mutation<DeleteTodoListRequest>) {
      setUnobservedPendingDeleteTodoListMutations(
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
        const deferred = new resemble_react.Deferred<resemble_react.ResponseOrError<DeleteTodoListResponse>>(() =>
          __DeleteTodoList(mutation)
        );

        // Add to localStorage here.
        queuedDeleteTodoListMutations.current.push([mutation, () => deferred.start()]);
        queuedMutations.current.push(() => {
          for (const [, run] of queuedDeleteTodoListMutations.current) {
            queuedDeleteTodoListMutations.current.shift();
            run();
            break;
          }
        });
        // Maybe add to localStorage.
        resemble_react.pushMutationMaybeToLocalStorage(localStorageKeyRef.current, "DeleteTodoList", mutation);

        return deferred.promise;
      } else {
        // NOTE: we'll add this mutation to `runningDeleteTodoListMutations` in `__DeleteTodoList`
        // without yielding to event loop so that we are guaranteed atomicity with checking `hasRunningMutations()`.
        return await __DeleteTodoList(mutation);
      }
    }

    async function DeleteTodoList(
      partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoListRequest>,
      optimistic_metadata?: any
    ): Promise<resemble_react.ResponseOrError<DeleteTodoListResponse>> {
      const idempotencyKey = uuidv4();

      const request = partialRequest instanceof DeleteTodoListRequest
        ? partialRequest
        : new DeleteTodoListRequest(partialRequest);

      const mutation = {
        request,
        idempotencyKey,
        optimistic_metadata,
        isLoading: false, // Won't start loading if we're flushing mutations.
      };

      return _DeleteTodoList(mutation);
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
            if (runningAddTodoListMutations.current.length > 0 || runningDeleteTodoListMutations.current.length > 0) {
              // TODO(benh): check invariant
              // 'flushMutations.current !== undefined' but don't
              // throw an error since that will just retry, instead
              // add support for "bailing" from a 'retry' by calling a
              // function passed into the lambda that 'retry' takes.
              await flushMutations.current?.wait();
            }


            const responses = ReactQuery(
              new resemble_api.react_pb.QueryRequest({
                method: "ListTodoLists",
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
                  ...runningAddTodoListMutations.current,
                  ...runningDeleteTodoListMutations.current,
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

              setUnobservedPendingAddTodoListMutations(
              (mutations) =>
                mutations
                  .filter(
                    (mutation) =>
                      // Only keep mutations that are queued, pending or
                      // recovered.
                      queuedAddTodoListMutations.current.some(
                        ([queuedAddTodoListMutation]) =>
                          mutation.idempotencyKey ===
                          queuedAddTodoListMutation.idempotencyKey
                      ) ||
                      runningAddTodoListMutations.current.some(
                        (runningAddTodoListMutations) =>
                          mutation.idempotencyKey ===
                          runningAddTodoListMutations.idempotencyKey
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

              setUnobservedPendingDeleteTodoListMutations(
              (mutations) =>
                mutations
                  .filter(
                    (mutation) =>
                      // Only keep mutations that are queued, pending or
                      // recovered.
                      queuedDeleteTodoListMutations.current.some(
                        ([queuedDeleteTodoListMutation]) =>
                          mutation.idempotencyKey ===
                          queuedDeleteTodoListMutation.idempotencyKey
                      ) ||
                      runningDeleteTodoListMutations.current.some(
                        (runningDeleteTodoListMutations) =>
                          mutation.idempotencyKey ===
                          runningDeleteTodoListMutations.idempotencyKey
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
                setResponse(ListTodoListsResponse.fromBinary(response.response));
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
        AddTodoList,
        DeleteTodoList,
      },
      pendingAddTodoListMutations: unobservedPendingAddTodoListMutations,
      failedAddTodoListMutations,
      recoveredAddTodoListMutations: recoveredAddTodoListMutations.current.map(
        ([mutation, run]) => ({ ...mutation, run: run })
      ),
      pendingDeleteTodoListMutations: unobservedPendingDeleteTodoListMutations,
      failedDeleteTodoListMutations,
      recoveredDeleteTodoListMutations: recoveredDeleteTodoListMutations.current.map(
        ([mutation, run]) => ({ ...mutation, run: run })
      ),
    };
  };


  const DeleteTodoList = async (
    partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoListRequest> = {}
  ) => {
    const request = partialRequest instanceof DeleteTodoListRequest
      ? partialRequest
      : new DeleteTodoListRequest(partialRequest);

    const requestBody = request.toJson();

    // Invariant here is that we use the '/package.service.method' path and
    // HTTP 'POST' method (we need 'POST' because we send an HTTP body).
    //
    // See also 'resemble/helpers.py'.
    const response = await resemble_react.guardedFetch(
      newRequest(
        requestBody,
        "/todo_app.v1.TodoLists.DeleteTodoList", "POST"
      )
    );

    return await response.json();
  };


async function _Mutation<
    Request extends
AddTodoListRequest    |DeleteTodoListRequest,
    Response extends    AddTodoListResponse    |    DeleteTodoListResponse  >(
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
                `'todo_app.v1.TodoLists' for '${id}' responded ` +
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
    AddTodoList,
    ListTodoLists,
    useListTodoLists,
    DeleteTodoList,
  };
};


class TodoListsInstance {

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
        `wss://${url.host}/__/resemble/websocket/todo_app.v1.TodoLists/${this.id}`
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
    headers.append("x-resemble-service-name", "todo_app.v1.TodoLists");
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


  private useAddTodoListMutations: (
    resemble_react.Mutation<AddTodoListRequest>)[] = [];

  private useAddTodoListSetPendings: {
    [id: string]: (mutations: resemble_react.Mutation<AddTodoListRequest>[]) => void
  } = {};

  async addTodoList(
    mutation: resemble_react.Mutation<AddTodoListRequest>
  ): Promise<
    resemble_react.ResponseOrErrors<
      AddTodoListResponse,
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

    this.useAddTodoListMutations.push(mutation);

    unstable_batchedUpdates(() => {
      for (const setPending of Object.values(this.useAddTodoListSetPendings)) {
        setPending(this.useAddTodoListMutations);
      }
    });

    return new Promise<
      resemble_react.ResponseOrErrors<
        AddTodoListResponse,
        resemble_api.SystemErrorDetails
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "AddTodoList",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            for (const m of this.useAddTodoListMutations) {
              if (m === mutation) {
                m.isLoading = isLoading;
                if (error !== undefined) {
                  m.error = error;
                }
              }
              return m;
            }

            unstable_batchedUpdates(() => {
              for (const setPending of Object.values(this.useAddTodoListSetPendings)) {
                setPending(this.useAddTodoListMutations);
              }
            });
          }
        );

        switch (responseOrStatus.case) {
          case "response":
            await observed(() => {
              this.useAddTodoListMutations =
                this.useAddTodoListMutations.filter(m => m !== mutation);

              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useAddTodoListSetPendings)) {
                  setPending(this.useAddTodoListMutations);
                }
              });

              resolve({
                response: AddTodoListResponse.fromBinary(
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

  useAddTodoList(
    id: string,
    setPending: (mutations: resemble_react.Mutation<AddTodoListRequest>[]) => void
  ) {
    this.useAddTodoListSetPendings[id] = setPending;
  }

  unuseAddTodoList(id: string) {
    delete this.useAddTodoListSetPendings[id];
  }


  private useListTodoListsReaders: {
    [id: string]: resemble_react.Reader<ListTodoListsResponse>
  } = {};

  useListTodoLists(
    id: string,
    request: ListTodoListsRequest,
    setResponse: (response: ListTodoListsResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: resemble_api.Status) => void
  ) {
    let read = false;

    const key = request.toJsonString();

    if (!(key in this.useListTodoListsReaders)) {
      this.useListTodoListsReaders[key] = {
        abortController: new AbortController(),
        setResponses: {},
        setIsLoadings: {},
        setStatuses: {},
      };

      read = true;
    }

    let reader = this.useListTodoListsReaders[key];

    reader.setResponses[id] = setResponse;
    reader.setIsLoadings[id] = setIsLoading;
    reader.setStatuses[id] = setStatus;

    if (reader.response !== undefined) {
      setResponse(reader.response);
    }

    if (read) {
      this.read(
        "ListTodoLists",
        request,
        ListTodoListsResponse,
        reader
      );
    }
  }

  unuseListTodoLists(
    id: string,
    request: ListTodoListsRequest
  ) {
    const key = request.toJsonString();

    const reader = this.useListTodoListsReaders[key];

    delete reader.setResponses[id];
    delete reader.setIsLoadings[id];
    delete reader.setStatuses[id];

    if (Object.values(reader.setResponses).length === 0) {
      delete this.useListTodoListsReaders[key];
      reader.abortController.abort();
    }
  }


  private useDeleteTodoListMutations: (
    resemble_react.Mutation<DeleteTodoListRequest>)[] = [];

  private useDeleteTodoListSetPendings: {
    [id: string]: (mutations: resemble_react.Mutation<DeleteTodoListRequest>[]) => void
  } = {};

  async deleteTodoList(
    mutation: resemble_react.Mutation<DeleteTodoListRequest>
  ): Promise<
    resemble_react.ResponseOrErrors<
      DeleteTodoListResponse,
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

    this.useDeleteTodoListMutations.push(mutation);

    unstable_batchedUpdates(() => {
      for (const setPending of Object.values(this.useDeleteTodoListSetPendings)) {
        setPending(this.useDeleteTodoListMutations);
      }
    });

    return new Promise<
      resemble_react.ResponseOrErrors<
        DeleteTodoListResponse,
        resemble_api.SystemErrorDetails
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "DeleteTodoList",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            for (const m of this.useDeleteTodoListMutations) {
              if (m === mutation) {
                m.isLoading = isLoading;
                if (error !== undefined) {
                  m.error = error;
                }
              }
              return m;
            }

            unstable_batchedUpdates(() => {
              for (const setPending of Object.values(this.useDeleteTodoListSetPendings)) {
                setPending(this.useDeleteTodoListMutations);
              }
            });
          }
        );

        switch (responseOrStatus.case) {
          case "response":
            await observed(() => {
              this.useDeleteTodoListMutations =
                this.useDeleteTodoListMutations.filter(m => m !== mutation);

              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useDeleteTodoListSetPendings)) {
                  setPending(this.useDeleteTodoListMutations);
                }
              });

              resolve({
                response: DeleteTodoListResponse.fromBinary(
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

  useDeleteTodoList(
    id: string,
    setPending: (mutations: resemble_react.Mutation<DeleteTodoListRequest>[]) => void
  ) {
    this.useDeleteTodoListSetPendings[id] = setPending;
  }

  unuseDeleteTodoList(id: string) {
    delete this.useDeleteTodoListSetPendings[id];
  }


  private static instances: { [id: string]: TodoListsInstance } = {};

  static use(id: string, endpoint: string) {
    if (!(id in this.instances)) {
      this.instances[id] = new TodoListsInstance(id, endpoint);
    } else {
      this.instances[id].ref();
    }

    return this.instances[id];
  }

  unuse() {
    this.unref();
  }
}

export const useTodoLists = (
  { id }: { id: string }
): UseTodoListsApi => {
  const resembleContext = resemble_react.useResembleContext();

  const endpoint = resembleContext.client?.endpoint || "";

  const [instance, setInstance] = useState(() => {
    return TodoListsInstance.use(
      id, endpoint
    );
  });

  if (instance.id !== id) {
    setInstance(
      TodoListsInstance.use(
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
    headers.append("x-resemble-service-name", "todo_app.v1.TodoLists");
    headers.append("x-resemble-actor-id", id);
    headers.append("Connection", "keep-alive");
    return headers;
  }, [id]);


  function useAddTodoList() {
    const [
      pending,
      setPending
    ] = useState<resemble_react.Mutation<AddTodoListRequest>[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useAddTodoList(id, setPending);
      return () => {
        instance.unuseAddTodoList(id);
      };
    }, []);

    const addTodoList = useMemo(() => {
      const method = async (
        partialRequest: __bufbuildProtobufPartialMessage<AddTodoListRequest> = {},
        optimistic_metadata?: any
      ) => {
        const request = partialRequest instanceof AddTodoListRequest
          ? partialRequest.clone()
          : new AddTodoListRequest(partialRequest);

        const idempotencyKey = uuidv4();

        const mutation = {
          request,
          idempotencyKey,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.addTodoList(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<AddTodoListRequest>>();

      return method;
    }, []);

    addTodoList.pending = pending;

    return addTodoList;
  }

  const addTodoList = useAddTodoList();



  function useListTodoLists(
    partialRequest: __bufbuildProtobufPartialMessage<ListTodoListsRequest> = {}
  ) {
    const [request, setRequest] = useState(
      partialRequest instanceof ListTodoListsRequest
        ? partialRequest.clone()
        : new ListTodoListsRequest(partialRequest)
    );

    if (!request.equals(partialRequest)) {
      setRequest(
        partialRequest instanceof ListTodoListsRequest
          ? partialRequest.clone()
          : new ListTodoListsRequest(partialRequest)
      );
    }

    const [response, setResponse] = useState<ListTodoListsResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<
      undefined
      | resemble_api.SystemErrorDetails
      >();

    const [exception, setException] = useState<Error>();

    useEffect(() => {
      const id = uuidv4();
      instance.useListTodoLists(
        id,
        request,
        (response: ListTodoListsResponse) => {
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
        instance.unuseListTodoLists(id, request);
      };
    }, [request]);

    if (exception !== undefined) {
      throw exception;
    }

    return { response, isLoading, error };
  }

  async function listTodoLists(
    partialRequest: __bufbuildProtobufPartialMessage<ListTodoListsRequest> = {}
  ) {
    const request = partialRequest instanceof ListTodoListsRequest
      ? partialRequest.clone()
      : new ListTodoListsRequest(partialRequest);

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
              `${resembleContext.client?.endpoint}/todo_app.v1.TodoLists.ListTodoLists`, {
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


  function useDeleteTodoList() {
    const [
      pending,
      setPending
    ] = useState<resemble_react.Mutation<DeleteTodoListRequest>[]>([]);

    useEffect(() => {
      const id = uuidv4();
      instance.useDeleteTodoList(id, setPending);
      return () => {
        instance.unuseDeleteTodoList(id);
      };
    }, []);

    const deleteTodoList = useMemo(() => {
      const method = async (
        partialRequest: __bufbuildProtobufPartialMessage<DeleteTodoListRequest> = {},
        optimistic_metadata?: any
      ) => {
        const request = partialRequest instanceof DeleteTodoListRequest
          ? partialRequest.clone()
          : new DeleteTodoListRequest(partialRequest);

        const idempotencyKey = uuidv4();

        const mutation = {
          request,
          idempotencyKey,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.deleteTodoList(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<DeleteTodoListRequest>>();

      return method;
    }, []);

    deleteTodoList.pending = pending;

    return deleteTodoList;
  }

  const deleteTodoList = useDeleteTodoList();


  return {
    mutators: {
      addTodoList,
      deleteTodoList,
    },
    listTodoLists,
    useListTodoLists,
  };
};


