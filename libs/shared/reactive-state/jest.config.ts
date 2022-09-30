export default {
  displayName: 'lib-shared-reactive-state',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../../coverage/libs/shared/reactive-state',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!@angular|@ngneat/spectator|@ngneat/elf-entities|array-move|lodash-es)`],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
