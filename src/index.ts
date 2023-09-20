/** logger level */
export type LoggerLevel = 'DEBUG' | 'VERBOSE' | 'INFO' | 'WARN' | 'ERROR';

/** logger options */
export interface LoggerOptions {
  /** logger level */
  level?: LoggerLevel;
}

/**
 * @class Logger
 * @classdesc Provide multiple log printing methods
 * @example
 * const logger = new Logger({})
 * logger.v("verbose log")
 */
class Logger {
  private static readonly noop = () => {};
  private _options: Partial<LoggerOptions> = {};
  private _levelNum: number = 0;

  constructor(options: LoggerOptions = {}) {
    this.setOptions(options);
  }

  /**
   * @description  Method used to print error logs
   * @method
   *
   * @example
   * logger.e("error message") // error message
   *
   * @param {...any[]} args error messages
   * @returns {void}
   */

  public e = this._loggerFactory('error', this._levelNum <= 4);

  /**
   * @description Method used to print warn logs
   * @method
   *
   * @example
   * logger.w("warn message") // warn message
   *
   * @param {...any[]} args warn messages
   * @returns {void}
   */
  w = this._loggerFactory('warn', this._levelNum <= 3);

  /**
   * @description Method used to print info logs
   * @method
   *
   * @example
   * logger.i("info message") // info message
   *
   * @param {...any[]} args info messages
   * @returns {void}
   */
  i = this._loggerFactory('info', this._levelNum <= 2);

  /**
   * @description Method used to print verbose logs
   * @method
   *
   * @example
   * logger.v("verbose message") // verbose message
   *
   * @param {...any[]} args verbose messages
   * @returns {void}
   */
  v = this._loggerFactory('log', this._levelNum <= 1);

  /**
   * @description Method used to print debug logs
   * @method
   *
   * @example
   * logger.d("debug message") // debug message
   *
   * @param {...any[]} msg debug messages
   * @returns {void}
   */
  d = this._loggerFactory('debug', this._levelNum < 1);

  /**
   * @description  Method used to set logger option and change logger level
   *
   * @example
   * logger.setOptions({level: 'INFO'}) // set logger level
   *
   * @param {LoggerOptions} options logger options
   * @return {void}
   */
  setOptions(options: Partial<LoggerOptions>) {
    this._options = options;
    this._levelNum = this._matchLevel(options.level || 'DEBUG');

    if (this._levelNum !== 0) {
      this.e = this._loggerFactory('error', this._levelNum <= 4);
      this.w = this._loggerFactory('warn', this._levelNum <= 3);
      this.i = this._loggerFactory('info', this._levelNum <= 2);
      this.v = this._loggerFactory('warn', this._levelNum <= 1);
      this.d = this._loggerFactory('warn', this._levelNum < 1);
    }
  }

  /**
   * @description Private method used to match logger level
   * @private
   *
   * @example
   * this._matchLevel("DEBUG") // 0
   *
   * @param {LoggerLevel} level logger level
   * @return {number}
   */
  private _matchLevel(level?: LoggerLevel) {
    let logLevel = 0;
    switch (level) {
      case 'DEBUG':
        logLevel = 0;
        break;
      case 'VERBOSE':
        logLevel = 1;
        break;
      case 'INFO':
        logLevel = 2;
        break;
      case 'WARN':
        logLevel = 3;
        break;
      case 'ERROR':
        logLevel = 4;
        break;
    }

    return logLevel;
  }

  /**
   * @private
   * @description Logger factory
   * @param type
   * @param bool
   * @returns
   */
  private _loggerFactory(type: keyof Console, bool: boolean) {
    const func = (console as any)[type];

    if (bool && func) {
      return func.bind(console, `[${type.toLocaleUpperCase()}]`);
    }
    return Logger.noop;
  }

  /**
   * @description Get options
   * @returns {LoggerOptions}
   */
  getOptions() {
    return this._options;
  }

  /**
   * @description Get version
   * @returns {string}
   */
  version() {
    return '__VERSION__';
  }
}

export default Logger;
