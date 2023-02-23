import { RelationGraphWithLine } from './RelationGraphWithLine'
import type { RGListeners, RGOptions, RelationGraphInstance } from '../RelationGraph'

export class RelationGraphFinal extends RelationGraphWithLine implements RelationGraphInstance {
  constructor(options: RGOptions, listeners: RGListeners) {
    super(options, listeners)
  }
}
