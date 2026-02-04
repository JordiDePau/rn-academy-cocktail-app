
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  const content: React.FC<SvgProps>;
  export default content;
}

declare module '*.riv' {
  const content: any;
  export default content;
}

/**
 * An empty dictionary/record with unknown property values.
 * Use this when you just need an opaque object type instead of `object`
 */

declare type EmptyObject = Record<PropertyKey, any>;

// EmptyObject is a hack to make the type show up as PngImage instead of number
// https://github.com/microsoft/TypeScript/issues/31940#issuecomment-841712377
declare type PngImage = EmptyObject & number;
declare type JpgImage = EmptyObject & number;
declare type WebpImage = EmptyObject & number;

declare module '*.png' {
  const content: PngImage;
  export default content;
}

declare module '*.jpg' {
  const content: JpgImage;
  export default content;
}

declare module '*.webp' {
  const content: WebpImage;
  export default content;
}

/** Date string in ISO format, typically returned by Date.toISOString() */
declare type ISODate = ReturnType<Date['toISOString']>;

/** Utility type that makes T nullable and optional */
declare type Nullish<T> = T | undefined | null;

/** Extend Map interface which always returns a defined value for Map#get */
declare interface StrictMap<K, V> extends Map<K, V> {
  get: (key: K) => V;
}
