import React, {useRef, useEffect, useContext} from 'react';
import {RelationGraphStoreContext} from "../store/reducers/StockStore";
import {RGBackgroundProps} from "../../../../../../../relation-graph-models/types";

const GraphBackground:React.FC<RGBackgroundProps> = ({ children, forDisplay, forImage }) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const options = graphInstance && graphInstance.options;
  const $backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set background styles
    $backgroundRef.current!.style.backgroundColor = 'transparent';
    $backgroundRef.current!.style.backgroundImage = 'none';
    $backgroundRef.current!.style.backgroundRepeat = 'no-repeat';

    // Replace the following line with the appropriate logic for setting the background in your React app
    graphInstance.setBackgroundDom($backgroundRef.current, forDisplay, forImage);
    return () => {
      graphInstance.setBackgroundDom(null, forDisplay, forImage);
    };
  }, []);
  return (
    <div
      className={`rel-background`}
      ref={$backgroundRef}
    >
      {children}
    </div>
  );
};

export default GraphBackground;
