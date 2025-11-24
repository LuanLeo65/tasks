const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;
const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest')

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  setupFiles: ['dotenv/config'],
  moduleNameMapper: compilerOptions.paths ? pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/'}) : {},
};