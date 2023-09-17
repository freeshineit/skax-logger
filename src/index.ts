/** logger level */
export type LoggerLevel = 'DEBUG' | 'VERBOSE' | 'INFO' | 'WARN' | 'ERROR';

/** logger options */
export interface LoggerOptions {
  /** logger level */
  level?: LoggerLevel;
}

/**
 * @class Logger
 * @classdesc Provide multiple log printing static methods
 * @example
 * Logger.v("verbose log")
 */
class Logger {
  // private static readonly TAG = 'LOGGER';

  /** log level default 0 */
  private static LOGGER_LEVEL: number = 0;

  private static readonly noop = () => {};

  /**
   * @description Static method used to print error logs
   * @static
   *
   * @example
   * Logger.e("error message") // error message
   *
   * @param {...any[]} args error messages
   * @returns {void}
   */
  static e = Logger.loggerFactory('error', Logger.LOGGER_LEVEL <= 4);

  /**
   * @description Static method used to print warn logs
   * @static
   *
   * @example
   * Logger.w("warn message") // warn message
   *
   * @param {...any[]} args warn messages
   * @returns {void}
   */
  static w = Logger.loggerFactory('warn', Logger.LOGGER_LEVEL <= 3);

  /**
   * @description Static method used to print info logs
   * @static
   *
   * @example
   * Logger.i("info message") // info message
   *
   * @param {...any[]} args info messages
   * @returns {void}
   */
  static i = Logger.loggerFactory('info', Logger.LOGGER_LEVEL <= 2);

  /**
   * @description Static method used to print verbose logs
   * @static
   *
   * @example
   * Logger.v("verbose message") // verbose message
   *
   * @param {...any[]} args verbose messages
   * @returns {void}
   */
  static v = Logger.loggerFactory('log', Logger.LOGGER_LEVEL <= 1);

  /**
   * @description Static method used to print debug logs
   * @static
   *
   * @example
   * Logger.d("debug message") // debug message
   *
   * @param {...any[]} msg debug messages
   * @returns {void}
   */
  static d = Logger.loggerFactory('debug', Logger.LOGGER_LEVEL < 1);

  /**
   * @description Static method used to set logger option
   * @static
   *
   * @example
   * Logger.setOptions({level: 'INFO'}) // set logger level
   *
   * @param {LoggerOptions} options logger options
   * @return {void}
   */
  static setOptions(options: LoggerOptions) {
    Logger.LOGGER_LEVEL = Logger._matchLevel(options.level);

    if (Logger.LOGGER_LEVEL !== 0) {
      Logger.e = Logger.loggerFactory('error', Logger.LOGGER_LEVEL <= 4);
      Logger.w = Logger.loggerFactory('warn', Logger.LOGGER_LEVEL <= 3);
      Logger.i = Logger.loggerFactory('info', Logger.LOGGER_LEVEL <= 2);
      Logger.v = Logger.loggerFactory('warn', Logger.LOGGER_LEVEL <= 1);
      Logger.d = Logger.loggerFactory('warn', Logger.LOGGER_LEVEL < 1);
    }
  }

  /**
   * @description Static method used to match logger level
   * @static
   * @private
   *
   * @example
   * Logger._matchLevel("DEBUG") // 0
   *
   * @param {LoggerLevel} level logger level
   * @return {number}
   */
  private static _matchLevel(level?: LoggerLevel) {
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

  static loggerFactory(type: string, bool: boolean) {
    const func = (console as any)[type];

    if (bool && func) {
      return func.bind(console, `[${type.toLocaleUpperCase()}]`);
    }
    return Logger.noop;
  }
}

export default Logger;
