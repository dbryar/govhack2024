function symbolize(key: symbol | unknown): symbol {
  const sym: symbol = typeof key === "symbol" ? key : Symbol.for(String(key));
  return sym;
}

/**
 * A simple container for storing and retrieving dependencies
 * @example
 *   import Container from "./container";
 *   Container.bind(Container.keys.Logger, console);
 *   const logger = Container.get<Console>(Container.keys.Logger);
 */
export class Container {
  static _instance: Container;
  static init(keys: Record<string, symbol>) {
    if (!Container._instance) Container._instance = new Container(keys);
    return Container._instance;
  }

  readonly keys: Record<string, symbol>;
  private container: Record<symbol, unknown> = {};
  private constructor(keys: Record<string, symbol>) {
    this.keys = { ...keys };
  }

  /** binds and object to a container key */
  bind<T = unknown>(key: symbol | unknown, value: T): true | void {
    if (this.has(symbolize(key))) return;
    this.container[symbolize(key)] = value;
    return true;
  }

  /** returns the object as T from the container for the given key */
  get<T>(key: symbol | unknown): T {
    if (this.has(symbolize(key))) return this.container[symbolize(key)] as T;
    return {} as T;
  }

  /** checks for the validity of a given key */
  has(key: symbol | unknown): boolean {
    return this.container[symbolize(key)] !== undefined;
  }

  /**
   * extends get and allows the use of the stored object at the given key as the input to a function with
   * two additional methods: `toCall()` and `toBind()`
   * @returns the stored object with two additional methods:
   * - `toCall(fn: (value: T) => void)`: calls the given function with the stored object, and
   * - `toBind(bindKey: symbol, fn: (value: T) => void)`: binds the result of the function to the bindKey
   */
  use<T>(key: symbol | unknown) {
    const obj = this.get<T>(symbolize(key));
    return {
      ...obj,
      toCall: (fn: (value: T) => void) => fn(obj),
      toBind: (bindKey: symbol | unknown, fn: (value: T) => void) => this.bind(bindKey, fn(obj)),
    };
  }

  /** iterates over the container as though it were an object using Object.entries */
  entries(fn: (args: [symbol, unknown]) => void) {
    const keys = Object.getOwnPropertySymbols(this.container);
    return keys.forEach((key) => {
      const value = this.container[key];
      return fn([key, value]);
    });
  }
}
