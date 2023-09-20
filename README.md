## @skax/logger

![build](https://github.com/freeshineit/skax-logger/workflows/build/badge.svg) ![Download](https://img.shields.io/npm/dm/@skax/logger.svg) ![Version](https://img.shields.io/npm/v/@skax/logger.svg) ![License](https://img.shields.io/npm/l/@skax/logger.svg)

### Usage

```sh
yarn add @skax/logger
```

```ts
import Logger from '@skax/logger';

const logger = new Logger();

logger.d('console.debug print'); // debug
logger.v('console.log print'); // log
logger.i('console.info print'); // info
logger.w('console.warn print'); // warn
logger.e('console.error print'); // error
```

### umd

```html
<script src="./index.umd.js"></script>
<script>
  (function () {
    const logger = new Logger();

    logger.v(logger.version());

    logger.d('1234132');
    logger.v('1234132');
    logger.i('1234132');
    logger.w('1234132');
    logger.e('1234132');

    logger.setOptions({ level: 'WARN' });

    logger.d('2-1234132');
    logger.v('2-1234132');
    logger.i('2-1234132');
    logger.w('2-1234132');
    logger.e('2-1234132');
  })();
</script>
```
