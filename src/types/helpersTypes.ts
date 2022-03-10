import { DeckType } from "./deck"

export interface TypedRequestBody<T> extends Express.Request {
    body: T
}

export type ElementType < T extends ReadonlyArray < unknown > > = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never

export type CreateDeckReq = TypedRequestBody<{shuffled: string, type: DeckType}>

export type OpenDeckReq = TypedRequestBody<{uuid: string}>

export type DrawDeckReq = TypedRequestBody<{amount: number, uuid: string}>

export type ShuffleDeckReq = TypedRequestBody<{uuid: string}>

