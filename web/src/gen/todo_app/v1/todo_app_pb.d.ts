// @generated by protoc-gen-es v1.6.0
// @generated from file todo_app/v1/todo_app.proto (package todo_app.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message todo_app.v1.FullTodoList
 */
export declare class FullTodoList extends Message<FullTodoList> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: repeated todo_app.v1.Todo todos = 3;
   */
  todos: Todo[];

  constructor(data?: PartialMessage<FullTodoList>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.FullTodoList";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FullTodoList;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FullTodoList;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FullTodoList;

  static equals(a: FullTodoList | PlainMessage<FullTodoList> | undefined, b: FullTodoList | PlainMessage<FullTodoList> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.ListOfLists
 */
export declare class ListOfLists extends Message<ListOfLists> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  constructor(data?: PartialMessage<ListOfLists>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.ListOfLists";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListOfLists;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListOfLists;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListOfLists;

  static equals(a: ListOfLists | PlainMessage<ListOfLists> | undefined, b: ListOfLists | PlainMessage<ListOfLists> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.TodoListsSate
 */
export declare class TodoListsSate extends Message<TodoListsSate> {
  /**
   * @generated from field: repeated todo_app.v1.FullTodoList todolists = 1;
   */
  todolists: FullTodoList[];

  constructor(data?: PartialMessage<TodoListsSate>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.TodoListsSate";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TodoListsSate;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TodoListsSate;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TodoListsSate;

  static equals(a: TodoListsSate | PlainMessage<TodoListsSate> | undefined, b: TodoListsSate | PlainMessage<TodoListsSate> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.AddTodoListRequest
 */
export declare class AddTodoListRequest extends Message<AddTodoListRequest> {
  /**
   * @generated from field: string text = 1;
   */
  text: string;

  constructor(data?: PartialMessage<AddTodoListRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.AddTodoListRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddTodoListRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddTodoListRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddTodoListRequest;

  static equals(a: AddTodoListRequest | PlainMessage<AddTodoListRequest> | undefined, b: AddTodoListRequest | PlainMessage<AddTodoListRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.AddTodoListResponse
 */
export declare class AddTodoListResponse extends Message<AddTodoListResponse> {
  constructor(data?: PartialMessage<AddTodoListResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.AddTodoListResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddTodoListResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddTodoListResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddTodoListResponse;

  static equals(a: AddTodoListResponse | PlainMessage<AddTodoListResponse> | undefined, b: AddTodoListResponse | PlainMessage<AddTodoListResponse> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.ListTodoListsRequest
 */
export declare class ListTodoListsRequest extends Message<ListTodoListsRequest> {
  constructor(data?: PartialMessage<ListTodoListsRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.ListTodoListsRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTodoListsRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTodoListsRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTodoListsRequest;

  static equals(a: ListTodoListsRequest | PlainMessage<ListTodoListsRequest> | undefined, b: ListTodoListsRequest | PlainMessage<ListTodoListsRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.ListTodoListsResponse
 */
export declare class ListTodoListsResponse extends Message<ListTodoListsResponse> {
  /**
   * @generated from field: repeated todo_app.v1.FullTodoList todolists = 1;
   */
  todolists: FullTodoList[];

  constructor(data?: PartialMessage<ListTodoListsResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.ListTodoListsResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTodoListsResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTodoListsResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTodoListsResponse;

  static equals(a: ListTodoListsResponse | PlainMessage<ListTodoListsResponse> | undefined, b: ListTodoListsResponse | PlainMessage<ListTodoListsResponse> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.DeleteTodoListRequest
 */
export declare class DeleteTodoListRequest extends Message<DeleteTodoListRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<DeleteTodoListRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.DeleteTodoListRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTodoListRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTodoListRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTodoListRequest;

  static equals(a: DeleteTodoListRequest | PlainMessage<DeleteTodoListRequest> | undefined, b: DeleteTodoListRequest | PlainMessage<DeleteTodoListRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.DeleteTodoListResponse
 */
export declare class DeleteTodoListResponse extends Message<DeleteTodoListResponse> {
  constructor(data?: PartialMessage<DeleteTodoListResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.DeleteTodoListResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTodoListResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTodoListResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTodoListResponse;

  static equals(a: DeleteTodoListResponse | PlainMessage<DeleteTodoListResponse> | undefined, b: DeleteTodoListResponse | PlainMessage<DeleteTodoListResponse> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.Todo
 */
export declare class Todo extends Message<Todo> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string text = 2;
   */
  text: string;

  /**
   * @generated from field: bool complete = 3;
   */
  complete: boolean;

  constructor(data?: PartialMessage<Todo>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.Todo";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Todo;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Todo;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Todo;

  static equals(a: Todo | PlainMessage<Todo> | undefined, b: Todo | PlainMessage<Todo> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.TodoListState
 */
export declare class TodoListState extends Message<TodoListState> {
  /**
   * @generated from field: repeated todo_app.v1.Todo todos = 1;
   */
  todos: Todo[];

  constructor(data?: PartialMessage<TodoListState>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.TodoListState";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TodoListState;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TodoListState;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TodoListState;

  static equals(a: TodoListState | PlainMessage<TodoListState> | undefined, b: TodoListState | PlainMessage<TodoListState> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.AddTodoRequest
 */
export declare class AddTodoRequest extends Message<AddTodoRequest> {
  /**
   * @generated from field: string todo = 1;
   */
  todo: string;

  constructor(data?: PartialMessage<AddTodoRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.AddTodoRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddTodoRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddTodoRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddTodoRequest;

  static equals(a: AddTodoRequest | PlainMessage<AddTodoRequest> | undefined, b: AddTodoRequest | PlainMessage<AddTodoRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.AddTodoResponse
 */
export declare class AddTodoResponse extends Message<AddTodoResponse> {
  constructor(data?: PartialMessage<AddTodoResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.AddTodoResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AddTodoResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AddTodoResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AddTodoResponse;

  static equals(a: AddTodoResponse | PlainMessage<AddTodoResponse> | undefined, b: AddTodoResponse | PlainMessage<AddTodoResponse> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.ListTodosRequest
 */
export declare class ListTodosRequest extends Message<ListTodosRequest> {
  constructor(data?: PartialMessage<ListTodosRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.ListTodosRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTodosRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTodosRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTodosRequest;

  static equals(a: ListTodosRequest | PlainMessage<ListTodosRequest> | undefined, b: ListTodosRequest | PlainMessage<ListTodosRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.ListTodosResponse
 */
export declare class ListTodosResponse extends Message<ListTodosResponse> {
  /**
   * @generated from field: repeated todo_app.v1.Todo todos = 1;
   */
  todos: Todo[];

  constructor(data?: PartialMessage<ListTodosResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.ListTodosResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListTodosResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListTodosResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListTodosResponse;

  static equals(a: ListTodosResponse | PlainMessage<ListTodosResponse> | undefined, b: ListTodosResponse | PlainMessage<ListTodosResponse> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.DeleteTodoRequest
 */
export declare class DeleteTodoRequest extends Message<DeleteTodoRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<DeleteTodoRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.DeleteTodoRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTodoRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTodoRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTodoRequest;

  static equals(a: DeleteTodoRequest | PlainMessage<DeleteTodoRequest> | undefined, b: DeleteTodoRequest | PlainMessage<DeleteTodoRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.DeleteTodoResponse
 */
export declare class DeleteTodoResponse extends Message<DeleteTodoResponse> {
  constructor(data?: PartialMessage<DeleteTodoResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.DeleteTodoResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeleteTodoResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeleteTodoResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeleteTodoResponse;

  static equals(a: DeleteTodoResponse | PlainMessage<DeleteTodoResponse> | undefined, b: DeleteTodoResponse | PlainMessage<DeleteTodoResponse> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.CompleteTodoRequest
 */
export declare class CompleteTodoRequest extends Message<CompleteTodoRequest> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<CompleteTodoRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.CompleteTodoRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CompleteTodoRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CompleteTodoRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CompleteTodoRequest;

  static equals(a: CompleteTodoRequest | PlainMessage<CompleteTodoRequest> | undefined, b: CompleteTodoRequest | PlainMessage<CompleteTodoRequest> | undefined): boolean;
}

/**
 * @generated from message todo_app.v1.CompleteTodoResponse
 */
export declare class CompleteTodoResponse extends Message<CompleteTodoResponse> {
  constructor(data?: PartialMessage<CompleteTodoResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "todo_app.v1.CompleteTodoResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CompleteTodoResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CompleteTodoResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CompleteTodoResponse;

  static equals(a: CompleteTodoResponse | PlainMessage<CompleteTodoResponse> | undefined, b: CompleteTodoResponse | PlainMessage<CompleteTodoResponse> | undefined): boolean;
}

