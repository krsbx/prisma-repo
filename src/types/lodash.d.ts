import 'lodash';

declare module 'lodash' {
  interface LoDashStatic {
    constantCase(str: string): string;
  }
}
