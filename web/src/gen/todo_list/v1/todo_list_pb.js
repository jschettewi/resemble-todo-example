// @generated by protoc-gen-es v1.4.2
// @generated from file todo_list/v1/todo_list.proto (package todo_list.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message todo_list.v1.Todo
 */
export const Todo = proto3.makeMessageType(
  "todo_list.v1.Todo",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "complete", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message todo_list.v1.CompleteTodoRequest
 */
export const CompleteTodoRequest = proto3.makeMessageType(
  "todo_list.v1.CompleteTodoRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from message todo_list.v1.CompleteTodoResponse
 */
export const CompleteTodoResponse = proto3.makeMessageType(
  "todo_list.v1.CompleteTodoResponse",
  [],
);

/**
 * @generated from message todo_list.v1.DeleteTodoRequest
 */
export const DeleteTodoRequest = proto3.makeMessageType(
  "todo_list.v1.DeleteTodoRequest",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from message todo_list.v1.DeleteTodoResponse
 */
export const DeleteTodoResponse = proto3.makeMessageType(
  "todo_list.v1.DeleteTodoResponse",
  [],
);

/**
 * @generated from message todo_list.v1.TodoListState
 */
export const TodoListState = proto3.makeMessageType(
  "todo_list.v1.TodoListState",
  () => [
    { no: 1, name: "todos", kind: "message", T: Todo, repeated: true },
  ],
);

/**
 * @generated from message todo_list.v1.AddTodoRequest
 */
export const AddTodoRequest = proto3.makeMessageType(
  "todo_list.v1.AddTodoRequest",
  () => [
    { no: 1, name: "todo", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message todo_list.v1.AddTodoResponse
 */
export const AddTodoResponse = proto3.makeMessageType(
  "todo_list.v1.AddTodoResponse",
  [],
);

/**
 * @generated from message todo_list.v1.ListTodosRequest
 */
export const ListTodosRequest = proto3.makeMessageType(
  "todo_list.v1.ListTodosRequest",
  [],
);

/**
 * @generated from message todo_list.v1.ListTodosResponse
 */
export const ListTodosResponse = proto3.makeMessageType(
  "todo_list.v1.ListTodosResponse",
  () => [
    { no: 1, name: "todos", kind: "message", T: Todo, repeated: true },
  ],
);

