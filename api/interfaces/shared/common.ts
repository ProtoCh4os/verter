export type ResBody<T extends string | number | CommonObject | any[]> =
  | {
      success: true;
      message: T extends string ? string : never;
      payload: T extends string ? never : T;
    }
  | {
      success: false;
      error: T;
    };
