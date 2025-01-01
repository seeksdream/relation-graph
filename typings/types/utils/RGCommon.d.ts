export declare const getScreenWidth: () => number;
export declare const getScreenHeight: () => number;
export declare const getColorId: (color: string) => string;
export declare const getLightColor: (col: string) => string;
export declare const getTextSize: (text: string) => number;
export declare const mergeRGObject: (oldObj: Record<string, any>, newObj: Record<string, any>) => Record<string, any>;
export declare const isSupportTouch: (e: MouseEvent | TouchEvent) => boolean;
export declare const getClientCoordinate: (e: MouseEvent | TouchEvent) => {
    clientX: number;
    clientY: number;
};
export declare const devLog: (...args: any[]) => void;
export declare const findParentByClassName: (el: HTMLElement | null, clasName: string, stopClass: string) => HTMLElement | null;
export declare const sleep: (time: number) => Promise<void>;
export declare const relationGraphVersionInfo: (platform?: string) => void;
