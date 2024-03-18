// @generated by protoc-gen-es v1.8.0
// @generated from file resemble/v1alpha1/tasks.proto (package resemble.v1alpha1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message resemble.v1alpha1.TaskId
 */
export declare class TaskId extends Message<TaskId> {
  /**
   * @generated from field: string service = 1;
   */
  service: string;

  /**
   * @generated from field: string actor_id = 2;
   */
  actorId: string;

  /**
   * @generated from field: bytes task_uuid = 3;
   */
  taskUuid: Uint8Array;

  constructor(data?: PartialMessage<TaskId>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "resemble.v1alpha1.TaskId";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TaskId;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TaskId;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TaskId;

  static equals(a: TaskId | PlainMessage<TaskId> | undefined, b: TaskId | PlainMessage<TaskId> | undefined): boolean;
}

/**
 * @generated from message resemble.v1alpha1.WaitRequest
 */
export declare class WaitRequest extends Message<WaitRequest> {
  /**
   * @generated from field: resemble.v1alpha1.TaskId task_id = 1;
   */
  taskId?: TaskId;

  constructor(data?: PartialMessage<WaitRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "resemble.v1alpha1.WaitRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WaitRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WaitRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WaitRequest;

  static equals(a: WaitRequest | PlainMessage<WaitRequest> | undefined, b: WaitRequest | PlainMessage<WaitRequest> | undefined): boolean;
}

/**
 * @generated from message resemble.v1alpha1.WaitResponse
 */
export declare class WaitResponse extends Message<WaitResponse> {
  /**
   * @generated from field: bytes response = 1;
   */
  response: Uint8Array;

  constructor(data?: PartialMessage<WaitResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "resemble.v1alpha1.WaitResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): WaitResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): WaitResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): WaitResponse;

  static equals(a: WaitResponse | PlainMessage<WaitResponse> | undefined, b: WaitResponse | PlainMessage<WaitResponse> | undefined): boolean;
}

/**
 * @generated from message resemble.v1alpha1.ListPendingTasksRequest
 */
export declare class ListPendingTasksRequest extends Message<ListPendingTasksRequest> {
  constructor(data?: PartialMessage<ListPendingTasksRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "resemble.v1alpha1.ListPendingTasksRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListPendingTasksRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListPendingTasksRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListPendingTasksRequest;

  static equals(a: ListPendingTasksRequest | PlainMessage<ListPendingTasksRequest> | undefined, b: ListPendingTasksRequest | PlainMessage<ListPendingTasksRequest> | undefined): boolean;
}

/**
 * @generated from message resemble.v1alpha1.ListPendingTasksResponse
 */
export declare class ListPendingTasksResponse extends Message<ListPendingTasksResponse> {
  /**
   * @generated from field: repeated resemble.v1alpha1.TaskId task_ids = 1;
   */
  taskIds: TaskId[];

  constructor(data?: PartialMessage<ListPendingTasksResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "resemble.v1alpha1.ListPendingTasksResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListPendingTasksResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListPendingTasksResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListPendingTasksResponse;

  static equals(a: ListPendingTasksResponse | PlainMessage<ListPendingTasksResponse> | undefined, b: ListPendingTasksResponse | PlainMessage<ListPendingTasksResponse> | undefined): boolean;
}

