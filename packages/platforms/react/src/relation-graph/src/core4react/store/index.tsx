import {RelationGraphStoreContext, RGUpdateContext, RGUpdateSingalContext} from './reducers/StockStore';
// import { stockStoreStateEmpty, rgReducer, RelationGraphStoreContext, RelationGraphStoreDispatchContext } from './reducers/StockStore';
// export const RelationGraphProvider: React.FC<{children: React.ReactElement}> = ({ children }) => {
//   const [rgStoreState, rgDispatch] = useReducer(rgReducer, stockStoreStateEmpty);
//   return (
//     <RelationGraphStoreDispatchContext.Provider value={ rgDispatch }>
//       <RelationGraphStoreContext.Provider value={ rgStoreState }>
//         {children}
//       </RelationGraphStoreContext.Provider>
//     </RelationGraphStoreDispatchContext.Provider>
//   );
// };
export const RelationGraphProvider = RelationGraphStoreContext.Provider;
export const RGUpdateProvider = RGUpdateContext.Provider;
export const RGUpdateSingalProvider = RGUpdateSingalContext.Provider;
