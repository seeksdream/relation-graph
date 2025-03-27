import React, {useRef, useEffect, useContext} from 'react';
import {RGWatermarkProps} from "../../../../types";
import {RelationGraphStoreContext, RGUpdateSingalContext} from "../store/reducers/StockStore";

const GraphWatermark: React.FC<RGWatermarkProps> = ({ children, forDisplay, forImage, position, width, height }) => {
  const graphInstance = useContext(RelationGraphStoreContext);
  const updateSingal = useContext(RGUpdateSingalContext);
  const options = graphInstance && graphInstance.options;
  const $watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    $watermarkRef.current!.style.setProperty('--mv-width', width || '200px');
    $watermarkRef.current!.style.setProperty('--mv-height', height || '200px');
    // Replace the following line with the appropriate logic for setting the watermark in your React app
    graphInstance.setWatermarkDom($watermarkRef.current!, forImage, forDisplay, position);
    return () => {
      graphInstance.setWatermarkDom(null, forDisplay, forImage);
    };
  }, [width, height]);
  let show = false;
  if (options.snapshotting) {
    if (forImage === false) {
      show = false;
    } else {
      show = true;
    }
  } else {
    if (forDisplay === true) {
      show = true;
    } else {
      show = false;
    }
  }
  return (
    <div
      className={`rel-watermark rel-watermark-${position || 'br'}`}
      style={{ display: show ? 'block' : 'none' }}
      ref={$watermarkRef}
    >
      {children}
    </div>
  );
};

export default GraphWatermark;
