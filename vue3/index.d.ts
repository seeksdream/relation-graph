import Vue from 'vue';
import type {
  RelationGraphInstance,
  RGLine, RGLineSlotProps,
  RGLink,
  RGNode,
  RGNodeSlotProps
} from "./RelationGraph";
import { RelationGraphExpose, RGOptions } from "./RelationGraph";

export * from './RelationGraph'
interface RelationGraph extends Vue {
}
export interface RelationGraph extends RelationGraphExpose {
}

export default RelationGraph
