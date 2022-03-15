import {
  InstanceOf,
  Number,
  Optional,
  Record,
  Static,
  Unknown,
  String,
  Array
} from "runtypes"
import { Id, NullStr, withDefaults } from "../common"
import { Timestamp } from "../firebase"

export type BillReference = Static<typeof BillReference>
export const BillReference = Record({
  BillNumber: NullStr,
  DocketNumber: NullStr,
  GeneralCourtNumber: Number
})

export type BillHistoryAction = Static<typeof BillHistoryAction>
export const BillHistoryAction = Record({
  Date: String,
  Branch: String,
  Action: String
})

export type BillHistory = Static<typeof BillHistory>
export const BillHistory = Array(BillHistoryAction)

export type Bill = Static<typeof Bill>
export const Bill = withDefaults(
  Record({
    id: Id,
    content: Unknown,
    cosponsorCount: Number,
    testimonyCount: Number,
    nextHearingAt: Optional(InstanceOf(Timestamp)),
    latestTestimonyAt: Optional(InstanceOf(Timestamp)),
    latestTestimonyId: Optional(Id),
    fetchedAt: InstanceOf(Timestamp),
    history: BillHistory,
    similar: Array(Id),
    currentCommittee: Optional(Record({ id: String, name: String })),
    city: Optional(String)
  }),
  {
    cosponsorCount: 0,
    testimonyCount: 0,
    fetchedAt: Timestamp.fromMillis(0),
    history: [],
    similar: []
  }
)