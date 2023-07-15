import Logger, { type LoggerLevel } from '../src';

const VERBOSE = ['LOGGER VERBOSE', 'verbose message'];
const WARN = ['LOGGER WARN', 'warn message', 'background: #faad14; color: #fff'];
const ERROR = ['LOGGER ERROR', 'error message', 'background: red; color: #fff'];
const DEBUG = ['LOGGER DEBUG', 'debug message', 'background: #1677ff; color: #fff'];
const INFO = ['LOGGER INFO', 'info message', 'background: #ffe58f; color: #fff'];

/**
 * Logger default test
 */
describe('Logger test', () => {
  /**
   * Logger default test
   */
  describe('Logger test', () => {
    it('Logger verbose', () => {
      testFn('log', VERBOSE);
    });

    it('Logger warn', () => {
      testFn('warn', WARN);
    });

    it('Logger error', () => {
      testFn('error', ERROR);
    });

    it('Logger debug', () => {
      testFn('debug', DEBUG);
    });

    it('Logger info', () => {
      testFn('info', INFO);
    });
  });

  /**
   * Logger test set level options
   */
  describe('Logger test', () => {
    it('Logger debug: set level', () => {
      testLoggerLevel('debug', DEBUG);
    });

    it('Logger verbose: set level', () => {
      testLoggerLevel('log', VERBOSE);
    });

    it('Logger info: set level', () => {
      testLoggerLevel('info', INFO);
    });

    it('Logger warn: set level', () => {
      testLoggerLevel('warn', WARN);
    });

    it('Logger error: set level', () => {
      testLoggerLevel('error', ERROR);
    });
  });

  /**
   * Logger test set hide tag options
   */
  describe('Logger test', () => {
    it('Logger verbose: hide tag', () => {
      testHideTagFn('log', VERBOSE);
    });
    it('Logger warn: hide tag', () => {
      testHideTagFn('warn', WARN);
    });
    it('Logger error: hide tag', () => {
      testHideTagFn('error', ERROR);
    });
    it('Logger debug: hide tag', () => {
      testHideTagFn('debug', DEBUG);
    });
    it('Logger info: hide tag', () => {
      testHideTagFn('info', INFO);
    });
  });
});

/**
 *
 * @param type console type
 * @param arrStr string array
 */
function testFn(type: string, arrStr: string[]) {
  const type1 = type === 'debug' ? 'log' : type;

  const original = (global.console as any)[type1];
  (global.console as any)[type1] = jest.fn();

  const loggerLevel = switchLoggerType(type);
  if (loggerLevel === '') return;
  (Logger as any)[loggerLevel](arrStr[1]);

  arrStr[2]
    ? expect((global.console as any)[type1]).toHaveBeenCalledWith(
        `%c[${arrStr[0]}]`,
        arrStr[2],
        arrStr[1],
      )
    : expect((global.console as any)[type1]).toHaveBeenCalledWith(`[${arrStr[0]}]`, arrStr[1]);

  // 恢复原 console 函数引用
  (global.console as any)[type1] = original;
}

/**
 * test logger hidden tag option
 * @param type console type
 * @param arrStr string array
 */
function testHideTagFn(type: string, arrStr: string[]) {
  Logger.setOptions({
    hideTag: true,
  });

  const type1 = type === 'debug' ? 'log' : type;

  const original = (global.console as any)[type1];
  (global.console as any)[type1] = jest.fn();

  const loggerLevel = switchLoggerType(type);
  if (loggerLevel === '') return;
  (Logger as any)[loggerLevel](arrStr[1]);
  expect((global.console as any)[type1]).toHaveBeenCalledWith(arrStr[1]);

  // 恢复原 console 函数引用
  (global.console as any)[type1] = original;
  Logger.setOptions({
    hideTag: false,
  });
}

/**
 * test logger level option
 * @param type console type
 * @param arrStr string array
 */
function testLoggerLevel(type: string, arrStr: string[]) {
  const loggerLevel = switchLoggerType(type);
  const loggerLevel2 = switchLoggerType2(type);
  const type1 = type === 'debug' ? 'log' : type;

  Logger.setOptions({
    level: loggerLevel2,
  });

  const original = (global.console as any)[type1];
  (global.console as any)[type1] = jest.fn();

  if (loggerLevel === '') return;
  (Logger as any)[loggerLevel](arrStr[1]);

  arrStr[2]
    ? expect((global.console as any)[type1]).toHaveBeenCalledWith(
        `%c[${arrStr[0]}]`,
        arrStr[2],
        arrStr[1],
      )
    : expect((global.console as any)[type1]).toHaveBeenCalledWith(`[${arrStr[0]}]`, arrStr[1]);

  // 恢复原 console 函数引用
  (global.console as any)[type1] = original;
  Logger.setOptions({
    level: 'DEBUG',
  });
}

function switchLoggerType(type: string) {
  switch (type) {
    case 'log':
      return 'v';
    case 'info':
      return 'i';
    case 'warn':
      return 'w';
    case 'debug':
      return 'd';
    case 'error':
      return 'e';
  }
  return '';
}

function switchLoggerType2(type: string): LoggerLevel {
  switch (type) {
    case 'log':
      return 'VERBOSE';
    case 'info':
      return 'INFO';
    case 'warn':
      return 'WARN';
    case 'debug':
      return 'DEBUG';
    case 'error':
      return 'ERROR';
  }
  return '' as LoggerLevel;
}
