export declare const getScreenWidth: () => number;
export declare const getScreenHeight: () => number;
export declare const getColorId: (color: string) => string;
export declare const getLightColor: (col: string) => string;
export declare const getTextSize: (text: string) => number;
export declare const mergeRGObject: (oldObj: Record<string, any>, newObj: Record<string, any>) => Record<string, any>;
export declare const isSupportTouch: (e: MouseEvent | TouchEvent) => boolean;
export declare const getClientCoordinate: (e: MouseEvent | TouchEvent) => {
    clientX: any;
    clientY: any;
};
export declare const devLog: (...args: any[]) => void;
export declare const deprecatedWaring: (...args: any[]) => void;
export declare const findParentByClassName: (el: HTMLElement | null, clasName: string, stopClass: string) => HTMLElement | null;
export declare const sleep: (time: number) => Promise<void>;
export declare const getNumberOption: (v: any) => any;
/**
 * 注意：
 *    根据MIT许可证的规定，允许您自由地使用、修改和分发源代码。您可以根据自己的需求对源代码进行更改。
 *    然而，您仍然需要遵守MIT许可证的其他规定，如保留版权声明和免责声明等
 *    relation-graph和relation-graph的网址是它的版权声明，请勿注释掉这一行信息
 * @param platform
 */
export declare const relationGraphVersionInfo: (platform?: string) => void;
