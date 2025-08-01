import type { UserConfig } from '@commitlint/types';
import standard from './.versionrc';

const config: UserConfig = {
  extends: ['cz'],
  rules: {
    // 'body-leading-blank': [1, 'always'],
    // 'footer-leading-blank': [1, 'always'],
    // 'header-max-length': [2, 'always', 100],
    // 'scope-case': [2, 'always', 'lower-case'],
    // 'subject-case': [
    //   2,
    //   'never',
    //   ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
    // ],
    'subject-empty': [2, 'never'],
    // 'subject-full-stop': [2, 'never', '.'],
    // 'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', standard.types.map(st => st.type)]
  }
};

export default config;
