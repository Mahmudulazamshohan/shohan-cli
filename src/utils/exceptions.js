/**
 * Base Error exception is root exception of all
 */
export class BaseError extends Error {
  constructor(message) {
    super(message);
  }
}
/**
 * Invalid Option exception when option is not valid
 */
export class InvalidOptionError extends BaseError {
  constructor(message) {
    super(message);
  }
}
/**
 * Extension Not Acceptable is not include of ts , js
 */
export class ExtensionNotAcceptable extends BaseError {
  constructor(message) {
    super(message);
  }
}
