export declare const getScreenWidth: () => number;
export declare const getScreenHeight: () => number;
export declare const getLightColor: (col: string) => string;
export declare const getTextSize: (text: string) => number;
export declare const mergeRGObject: (oldObj: {
    [key: string]: any;
}, newObj: {
    [key: string]: any;
}) => {
    [key: string]: any;
};
export declare let isSupportTouch: boolean;
export declare const devLog: (...args: any[]) => void;
export declare const relationGraphVersion: string;
export declare const relationGraphVersionInfo: () => void;
