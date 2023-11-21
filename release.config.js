module.exports = {
  extends: 'semantic-release-npm-github-publish',
  branches: ['main'],
  preset: 'angular',
  presetConfig: {
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'chore', section: 'Chores' },
      { type: 'ci', hidden: true },
      { type: 'docs', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', section: 'Refactoring' },
      { type: 'perf', hidden: true },
      { type: 'test', hidden: true },
    ],
  },
  releaseRules: [
    { type: 'docs', release: 'patch' },
    { type: 'refactor', release: 'patch' },
    { type: 'style', release: 'patch' },
    { type: 'ci', release: 'patch' },
  ],
};
