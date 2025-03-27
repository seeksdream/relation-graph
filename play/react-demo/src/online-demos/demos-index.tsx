import React, {useEffect, useState} from 'react';
const loadDemoByFileName = (demoFileName:string) => {
  try {
    const component = import(`../react-demos/${demoFileName}.tsx`);
    return {
      name: demoFileName,
      component
    };
  } catch (e) {
    return null;
  }
};

export const DemosIndex:React.FC = () => {
  const [DemoComponent, setDemoComponent] = useState();
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const demoId = urlParams.get('demoId');
  const demo = loadDemoByFileName(demoId);
  useEffect(() => {
    console.log(demo);
    if (demo) {
      demo.component.then(d => {
        if (!d && !d.default) {
          setError(true);
          return;
        }
        setDemoComponent(() => {
          return d.default;
        });
        setOk(true);
      }).catch(e => {
        setError(true);
      })
    } else {
      setError(true);
    }
  }, []);
  return (
   <div>
     {error && <div style={{padding: '20px'}}>
         Samples are in progress...
     </div>}
     {ok && <div>
         <DemoComponent />
     </div>}
   </div>
  );
}
