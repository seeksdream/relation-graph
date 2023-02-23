import { createContext } from 'react';
import type { RelationGraphInstance } from '../../../RelationGraph';
// import type { Dispatch } from 'react';
// export type RelationGraphReactData = {
//   instanceId:string
//   options: RGOptionsFull | undefined
//   graphData: {
//     rootNode: RGNode | undefined
//     nodes: RGNode[]
//     links: RGLink[]
//   }
//   seeksNodeIdIndex:number
//   allLineColors: {
//     id: string
//     color: string
//   }[]
//   $dom: HTMLElement | undefined
//   $canvasDom: HTMLElement | undefined
// }
// const rgReactData:RelationGraphReactData = {
//   instanceId:'',
//   options: undefined,
//   graphData : {
//     rootNode: undefined,
//     nodes: [],
//     links: [],
//   },
//   seeksNodeIdIndex : 0,
//   allLineColors : [],
//   $dom: undefined,
//   $canvasDom: undefined
// }
export type RGUpdateAction = (rgInstance:RelationGraphInstance) => void;
export type RelationGraphReducer = (state: RelationGraphInstance, action: RGUpdateAction) => RelationGraphInstance;
export const relationGraphReducer:RelationGraphReducer = (state, action):RelationGraphInstance => {
  // console.log('xxxxxxxxx:relationGraphReducer:before:', action);
  action(state)
  // console.log('xxxxxxxxx:relationGraphReducer:after:', action);
  return state;
};
export const RelationGraphStoreContext = createContext<RelationGraphInstance|null>(null) as React.Context<RelationGraphInstance>;
export const RGUpdateContext = createContext<((v?: RelationGraphInstance) => void)|null>(null) as React.Context<((v?: RelationGraphInstance) => void)>;

