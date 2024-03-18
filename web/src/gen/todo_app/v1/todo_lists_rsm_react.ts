import type {
  Message as __bufbuildProtobufMessage,
  MessageType as __bufbuildProtobufMessageType,
  PartialMessage as __bufbuildProtobufPartialMessage,
} from "@bufbuild/protobuf";
import {
  Empty
} from "@bufbuild/protobuf";
import * as resemble_react from "@reboot-dev/resemble-react";
import * as resemble_api from "@reboot-dev/resemble-api";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { unstable_batchedUpdates } from "react-dom";
import { v4 as uuidv4 } from "uuid";
import {
  TodoListMessage, 
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
  TodoListMessage, 
	TodoListsState, 
	AddTodoListRequest, 
	AddTodoListResponse, 
	ListTodoListsRequest, 
	ListTodoListsResponse, 
	DeleteTodoListRequest, 
	DeleteTodoListResponse,
};


export interface TodoListsMutators {
  addTodoList: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<AddTodoListRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrAborted<
        AddTodoListResponse,
        TodoListsAddTodoListAborted
      >>;

    pending: resemble_react.Mutation<AddTodoListRequest>[];
  };
  deleteTodoList: {
    // Mutators are functions and can be called directly.
    (partialRequest?: __bufbuildProtobufPartialMessage<DeleteTodoListRequest>,
     optimistic_metadata?: any
    ): Promise<
      resemble_react.ResponseOrAborted<
        DeleteTodoListResponse,
        TodoListsDeleteTodoListAborted
      >>;

    pending: resemble_react.Mutation<DeleteTodoListRequest>[];
  };
}

const TODO_LISTS_ADD_TODO_LIST_ERROR_TYPES = [
  // TODO(benh): don't copy these errors everywhere.
  //
  // gRPC errors.
  resemble_api.errors_pb.Cancelled,
  resemble_api.errors_pb.Unknown,
  resemble_api.errors_pb.InvalidArgument,
  resemble_api.errors_pb.DeadlineExceeded,
  resemble_api.errors_pb.NotFound,
  resemble_api.errors_pb.AlreadyExists,
  resemble_api.errors_pb.PermissionDenied,
  resemble_api.errors_pb.ResourceExhausted,
  resemble_api.errors_pb.FailedPrecondition,
  resemble_api.errors_pb.Aborted,
  resemble_api.errors_pb.OutOfRange,
  resemble_api.errors_pb.Unimplemented,
  resemble_api.errors_pb.Internal,
  resemble_api.errors_pb.Unavailable,
  resemble_api.errors_pb.DataLoss,
  resemble_api.errors_pb.Unauthenticated,
  // Resemble errors.
  //
  // NOTE: also add any new errors into `resemble/v1alpha1/index.ts`.
  resemble_api.errors_pb.ActorAlreadyConstructed,
  resemble_api.errors_pb.ActorNotConstructed,
  resemble_api.errors_pb.TransactionParticipantFailedToPrepare,
  resemble_api.errors_pb.TransactionParticipantFailedToCommit,
  resemble_api.errors_pb.UnknownService,
  resemble_api.errors_pb.UnknownTask,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type TodoListsAddTodoListAbortedError =
  resemble_api.InstanceTypeForErrorTypes<
    typeof TODO_LISTS_ADD_TODO_LIST_ERROR_TYPES
  >[number];

export class TodoListsAddTodoListAborted {

  static fromStatus(status: resemble_api.Status) {
    let error = resemble_api.errorFromGoogleRpcStatusDetails(
      status,
      TODO_LISTS_ADD_TODO_LIST_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new TodoListsAddTodoListAborted(
        error, { message: status.message }
      );
    }

    error = resemble_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new TodoListsAddTodoListAborted(
      error, { message: status.message }
    );
  }

  constructor(
    error: TodoListsAddTodoListAbortedError,
    { message }: { message?: string } = {}
  ) {
    this.error = error;

    let code = resemble_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Resemble specific errors.
      code = resemble_api.StatusCode.ABORTED;;
    }

    this.message = message;
  }

  readonly error: TodoListsAddTodoListAbortedError;
  readonly code: number;
  readonly message?: string;
}

const TODO_LISTS_LIST_TODO_LISTS_ERROR_TYPES = [
  // TODO(benh): don't copy these errors everywhere.
  //
  // gRPC errors.
  resemble_api.errors_pb.Cancelled,
  resemble_api.errors_pb.Unknown,
  resemble_api.errors_pb.InvalidArgument,
  resemble_api.errors_pb.DeadlineExceeded,
  resemble_api.errors_pb.NotFound,
  resemble_api.errors_pb.AlreadyExists,
  resemble_api.errors_pb.PermissionDenied,
  resemble_api.errors_pb.ResourceExhausted,
  resemble_api.errors_pb.FailedPrecondition,
  resemble_api.errors_pb.Aborted,
  resemble_api.errors_pb.OutOfRange,
  resemble_api.errors_pb.Unimplemented,
  resemble_api.errors_pb.Internal,
  resemble_api.errors_pb.Unavailable,
  resemble_api.errors_pb.DataLoss,
  resemble_api.errors_pb.Unauthenticated,
  // Resemble errors.
  //
  // NOTE: also add any new errors into `resemble/v1alpha1/index.ts`.
  resemble_api.errors_pb.ActorAlreadyConstructed,
  resemble_api.errors_pb.ActorNotConstructed,
  resemble_api.errors_pb.TransactionParticipantFailedToPrepare,
  resemble_api.errors_pb.TransactionParticipantFailedToCommit,
  resemble_api.errors_pb.UnknownService,
  resemble_api.errors_pb.UnknownTask,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type TodoListsListTodoListsAbortedError =
  resemble_api.InstanceTypeForErrorTypes<
    typeof TODO_LISTS_LIST_TODO_LISTS_ERROR_TYPES
  >[number];

export class TodoListsListTodoListsAborted {

  static fromStatus(status: resemble_api.Status) {
    let error = resemble_api.errorFromGoogleRpcStatusDetails(
      status,
      TODO_LISTS_LIST_TODO_LISTS_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new TodoListsListTodoListsAborted(
        error, { message: status.message }
      );
    }

    error = resemble_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new TodoListsListTodoListsAborted(
      error, { message: status.message }
    );
  }

  constructor(
    error: TodoListsListTodoListsAbortedError,
    { message }: { message?: string } = {}
  ) {
    this.error = error;

    let code = resemble_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Resemble specific errors.
      code = resemble_api.StatusCode.ABORTED;;
    }

    this.message = message;
  }

  readonly error: TodoListsListTodoListsAbortedError;
  readonly code: number;
  readonly message?: string;
}

const TODO_LISTS_DELETE_TODO_LIST_ERROR_TYPES = [
  // TODO(benh): don't copy these errors everywhere.
  //
  // gRPC errors.
  resemble_api.errors_pb.Cancelled,
  resemble_api.errors_pb.Unknown,
  resemble_api.errors_pb.InvalidArgument,
  resemble_api.errors_pb.DeadlineExceeded,
  resemble_api.errors_pb.NotFound,
  resemble_api.errors_pb.AlreadyExists,
  resemble_api.errors_pb.PermissionDenied,
  resemble_api.errors_pb.ResourceExhausted,
  resemble_api.errors_pb.FailedPrecondition,
  resemble_api.errors_pb.Aborted,
  resemble_api.errors_pb.OutOfRange,
  resemble_api.errors_pb.Unimplemented,
  resemble_api.errors_pb.Internal,
  resemble_api.errors_pb.Unavailable,
  resemble_api.errors_pb.DataLoss,
  resemble_api.errors_pb.Unauthenticated,
  // Resemble errors.
  //
  // NOTE: also add any new errors into `resemble/v1alpha1/index.ts`.
  resemble_api.errors_pb.ActorAlreadyConstructed,
  resemble_api.errors_pb.ActorNotConstructed,
  resemble_api.errors_pb.TransactionParticipantFailedToPrepare,
  resemble_api.errors_pb.TransactionParticipantFailedToCommit,
  resemble_api.errors_pb.UnknownService,
  resemble_api.errors_pb.UnknownTask,
  // Method errors.
] as const; // Need `as const` to ensure TypeScript infers this as a tuple!

export type TodoListsDeleteTodoListAbortedError =
  resemble_api.InstanceTypeForErrorTypes<
    typeof TODO_LISTS_DELETE_TODO_LIST_ERROR_TYPES
  >[number];

export class TodoListsDeleteTodoListAborted {

  static fromStatus(status: resemble_api.Status) {
    let error = resemble_api.errorFromGoogleRpcStatusDetails(
      status,
      TODO_LISTS_DELETE_TODO_LIST_ERROR_TYPES,
    );

    if (error !== undefined) {
      return new TodoListsDeleteTodoListAborted(
        error, { message: status.message }
      );
    }

    error = resemble_api.errorFromGoogleRpcStatusCode(status);

    // TODO(benh): also consider getting the type names from
    // `status.details` and including that in `message` to make
    // debugging easier.

    return new TodoListsDeleteTodoListAborted(
      error, { message: status.message }
    );
  }

  constructor(
    error: TodoListsDeleteTodoListAbortedError,
    { message }: { message?: string } = {}
  ) {
    this.error = error;

    let code = resemble_api.grpcStatusCodeFromError(this.error);

    if (code === undefined) {
      // Must be one of the Resemble specific errors.
      code = resemble_api.StatusCode.ABORTED;;
    }

    this.message = message;
  }

  readonly error: TodoListsDeleteTodoListAbortedError;
  readonly code: number;
  readonly message?: string;
}


export interface UseTodoListsApi {
  mutators: TodoListsMutators;
  useListTodoLists: (
    partialRequest?: __bufbuildProtobufPartialMessage<ListTodoListsRequest>
  ) => {
    response: ListTodoListsResponse | undefined;
    isLoading: boolean;
    aborted: undefined | TodoListsListTodoListsAborted;
  };
  listTodoLists: (
    partialRequest?: __bufbuildProtobufPartialMessage<ListTodoListsRequest>
  ) => Promise<
    resemble_react.ResponseOrAborted<
    ListTodoListsResponse,
    TodoListsListTodoListsAborted
    >
  >;
}

export interface SettingsParams {
  id: string;
  storeMutationsLocallyInNamespace?: string;
}

class TodoListsInstance {

  constructor(id: string, endpoint: string) {
    this.id = id;
    this.endpoint = endpoint;
    this.refs = 1;

    // TODO(benh): rather than keeping a long-lived open connection
    // via `WebSocketsConnection`, we could consider aborting that
    // connection once the websocket is established.
    this.initializeWebSocketsConnection();
    this.initializeWebSocket();
  }

  private ref() {
    this.refs += 1;
    return this.refs;
  }

  private unref() {
    this.refs -= 1;

    if (this.refs === 0 && this.websocket !== undefined) {
      this.websocket.close();
      this.websocketsConnectionAbortController.abort();
    }

    return this.refs;
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
  private websocketsConnectionAbortController = new AbortController();

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

  private initializeWebSocketsConnection() {
    resemble_react.retryForever(async () => {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      headers.append("Connection", "keep-alive");

      await resemble_react.guardedFetch(
        new Request(
          `${this.endpoint}/__/resemble/todo_app.v1.TodoLists/${this.id}/resemble.v1alpha1.React.WebSocketsConnection`,
          {
            method: "POST",
            headers,
            body: new resemble_api.react_pb.WebSocketsConnectionRequest()
              .toJsonString(),
          }
        ),
        { signal: this.websocketsConnectionAbortController.signal }
      );
    });
  }

  private initializeWebSocket() {
    if (this.websocket === undefined && this.refs > 0) {
      const url = new URL(this.endpoint);
      const protocol = url.protocol === "https:" ? "wss:" : "ws:"
      this.websocket = new WebSocket(
        `${protocol}//${url.host}/__/resemble/todo_app.v1.TodoLists/${this.id}`
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
    bearerToken: string | undefined,
    responseType: __bufbuildProtobufMessageType<ResponseType>,
    reader: resemble_react.Reader<ResponseType>
  ) {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

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

          const queryResponses = resemble_react.grpcServerStream({
            endpoint: `${this.endpoint}/__/resemble/todo_app.v1.TodoLists/${this.id}/resemble.v1alpha1.React.Query`,
            method: "POST",
            headers,
            request: queryRequest,
            responseType: resemble_api.react_pb.QueryResponse,
            signal: reader.abortController.signal,
          });

          for await (const queryResponse of queryResponses) {
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
    resemble_react.ResponseOrAborted<
      AddTodoListResponse,
      TodoListsAddTodoListAborted
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
      resemble_react.ResponseOrAborted<
        AddTodoListResponse,
        TodoListsAddTodoListAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "AddTodoList",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useAddTodoListMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useAddTodoListSetPendings)) {
                  setPending(this.useAddTodoListMutations);
                }
              });
            }
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

            const aborted = TodoListsAddTodoListAborted.fromStatus(status);

            console.warn(
              `'TodoListsAddTodoList' aborted with '${aborted.error.getType().typeName}'`
            );

            resolve({ aborted });

            break;
          default:
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
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
    bearerToken: string | undefined,
    setResponse: (response: ListTodoListsResponse) => void,
    setIsLoading: (isLoading: boolean) => void,
    setStatus: (status: resemble_api.Status) => void
  ) {
    let read = false;

    // NOTE: need to concatenate `request.toJsonString()` with `bearerToken`
    // because it uniquely identifies the request, i.e., a second call
    // that has the same `request` but a different bearerToken should be a
    // different call.
    const key = request.toJsonString() + bearerToken;

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
        bearerToken,
        ListTodoListsResponse,
        reader
      );
    }
  }

  unuseListTodoLists(
    id: string,
    request: ListTodoListsRequest,
    bearerToken: string | undefined
  ) {
    // See comment above in `useListTodoLists` for why
    // we concatenate `request.toJsonString()` with `bearerToken`.
    const key = request.toJsonString() + bearerToken;

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
    resemble_react.ResponseOrAborted<
      DeleteTodoListResponse,
      TodoListsDeleteTodoListAborted
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
      resemble_react.ResponseOrAborted<
        DeleteTodoListResponse,
        TodoListsDeleteTodoListAborted
      >>(
      async (resolve, reject) => {
        const { responseOrStatus } = await this.mutate(
          {
            method: "DeleteTodoList",
            request: mutation.request.toBinary(),
            idempotencyKey: mutation.idempotencyKey,
            bearerToken: mutation.bearerToken,
          },
          ({ isLoading, error }: { isLoading: boolean; error?: any }) => {
            let rerender = false;
            for (const m of this.useDeleteTodoListMutations) {
              if (m === mutation) {
                if (m.isLoading !== isLoading) {
                  m.isLoading = isLoading;
                  rerender = true;
                }
                if (error !== undefined && m.error !== error) {
                  m.error = error;
                  rerender = true;
                }
              }
            }

            if (rerender) {
              unstable_batchedUpdates(() => {
                for (const setPending of Object.values(this.useDeleteTodoListSetPendings)) {
                  setPending(this.useDeleteTodoListMutations);
                }
              });
            }
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

            const aborted = TodoListsDeleteTodoListAborted.fromStatus(status);

            console.warn(
              `'TodoListsDeleteTodoList' aborted with '${aborted.error.getType().typeName}'`
            );

            resolve({ aborted });

            break;
          default:
            // TODO(benh): while this is a _really_ fatal error,
            // should we still set `aborted` instead of throwing?
            reject(new Error('Expecting either a response or a status'));
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
    if (this.unref() === 0) {
      delete TodoListsInstance.instances[this.id];
    }
  }
}

export const useTodoLists = (
  { id }: { id: string }
): UseTodoListsApi => {
  const resembleContext = resemble_react.useResembleContext();

  const endpoint = resembleContext.client.endpoint;
  const bearerToken = resembleContext.bearerToken;

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
    headers.append("Connection", "keep-alive");

    if (bearerToken !== undefined) {
      headers.append("Authorization", `Bearer ${bearerToken}`);
    }

    return headers;
  }, [bearerToken]);


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

    const resembleContext = resemble_react.useResembleContext();

    const bearerToken = resembleContext.bearerToken;

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
          bearerToken,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.addTodoList(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<AddTodoListRequest>>();

      return method;
    }, [bearerToken]);

    addTodoList.pending = pending;

    return addTodoList;
  }

  const addTodoList = useAddTodoList();



  function useListTodoLists(
    partialRequest: __bufbuildProtobufPartialMessage<ListTodoListsRequest> = {}
  ) {
    const newRequest = partialRequest instanceof ListTodoListsRequest
      ? partialRequest.clone()
      : new ListTodoListsRequest(partialRequest);

    const [request, setRequest] = useState(newRequest);

    if (!request.equals(newRequest)) {
      setRequest(newRequest);
    }

    const [response, setResponse] = useState<ListTodoListsResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [aborted, setAborted] = useState<
      undefined
      | TodoListsListTodoListsAborted
      >();

    const resembleContext = resemble_react.useResembleContext();

    const bearerToken = resembleContext.bearerToken;

    useEffect(() => {
      const id = uuidv4();
      instance.useListTodoLists(
        id,
        request,
        bearerToken,
        (response: ListTodoListsResponse) => {
          unstable_batchedUpdates(() => {
            setAborted(undefined);
            setResponse(response);
          });
        },
        setIsLoading,
        (status: resemble_api.Status) => {
          const aborted = TodoListsListTodoListsAborted.fromStatus(status);

          console.warn(
            `'TodoListsListTodoLists' aborted with '${aborted.error.getType().typeName}'`
          );

          setAborted(aborted);
        },
      );
      return () => {
        instance.unuseListTodoLists(id, request, bearerToken);
      };
    }, [request, bearerToken]);

    return { response, isLoading, aborted };
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
              `${resembleContext.client.endpoint}/__/resemble/todo_app.v1.TodoLists/${id}/todo_app.v1.TodoLists.ListTodoLists`, {
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

        const aborted = TodoListsListTodoListsAborted.fromStatus(status);

        console.warn(
          `'TodoListsListTodoLists' aborted with '${aborted.error.getType().typeName}' `
        );

        return { aborted };
      } else {
        const aborted = new TodoListsListTodoListsAborted(
          new resemble_api.errors_pb.Unknown(), {
            message: `Unknown error with HTTP status ${response.status}`
          }
        );

        return { aborted };
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

    const resembleContext = resemble_react.useResembleContext();

    const bearerToken = resembleContext.bearerToken;

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
          bearerToken,
          optimistic_metadata,
          isLoading: false, // Won't start loading if we're flushing mutations.
        };

        return instance.deleteTodoList(mutation);
      };

      method.pending =
        new Array<resemble_react.Mutation<DeleteTodoListRequest>>();

      return method;
    }, [bearerToken]);

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


