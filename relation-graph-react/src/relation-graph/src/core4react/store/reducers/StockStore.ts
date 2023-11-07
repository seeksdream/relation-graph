import { createContext } from 'react';
import type { RelationGraphInstance } from '../../../../../../../relation-graph-vue2/src/types';
export type RGUpdateAction = (rgInstance:RelationGraphInstance) => void;
export type RelationGraphReducer = (state: RelationGraphInstance, action: RGUpdateAction) => RelationGraphInstance;
export const relationGraphReducer:RelationGraphReducer = (state, action):RelationGraphInstance => {
  // console.log('xxxxxxxxx:relationGraphReducer:before:', action);
  action(state);
  // console.log('xxxxxxxxx:relationGraphReducer:after:', action);
  return state;
};
export const RelationGraphStoreContext = createContext<RelationGraphInstance|null>(null) as React.Context<RelationGraphInstance>;
export const RGUpdateContext = createContext<((v?: RelationGraphInstance) => void)|null>(null) as React.Context<((v?: RelationGraphInstance) => void)>;

