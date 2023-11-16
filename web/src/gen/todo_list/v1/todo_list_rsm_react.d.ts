import type { PartialMessage as __bufbuildProtobufPartialMessage } from "@bufbuild/protobuf";
import { ResponseOrError as __resembleResponseOrError } from "@reboot-dev/resemble-react";
import { DeleteTodoRequest, DeleteTodoResponse, AddTodoRequest, AddTodoResponse, ListTodosRequest, ListTodosResponse } from "./todo_list_pb";
export interface TodoListApi {
    AddTodo: (partialRequest?: __bufbuildProtobufPartialMessage<AddTodoRequest>) => Promise<AddTodoResponse>;
    ListTodos: (partialRequest?: __bufbuildProtobufPartialMessage<ListTodosRequest>) => Promise<ListTodosResponse>;
    DeleteTodo: (partialRequest?: __bufbuildProtobufPartialMessage<DeleteTodoRequest>) => Promise<DeleteTodoResponse>;
    useListTodos: (partialRequest?: __bufbuildProtobufPartialMessage<ListTodosRequest>) => {
        response: ListTodosResponse | undefined;
        isLoading: boolean;
        error: unknown;
        mutations: {
            AddTodo: (request: __bufbuildProtobufPartialMessage<AddTodoRequest>, optimistic_metadata?: any) => Promise<__resembleResponseOrError<AddTodoResponse>>;
            DeleteTodo: (request: __bufbuildProtobufPartialMessage<DeleteTodoRequest>, optimistic_metadata?: any) => Promise<__resembleResponseOrError<DeleteTodoResponse>>;
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
    };
}
export interface SettingsParams {
    id: string;
    storeMutationsLocallyInNamespace?: string;
}
export declare const TodoList: ({ id, storeMutationsLocallyInNamespace }: SettingsParams) => TodoListApi;
