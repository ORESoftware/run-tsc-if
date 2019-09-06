'use strict';

import * as path from "path";
import {RunOpts} from "./main";


export default (opts: RunOpts): { rootDir: string, outDir: string, projectRoot: string } => {
  
  const projectRoot = opts.projectRoot;
  
  if (!projectRoot) {
    throw 'Need to pass project root to run-tsc-if.';
  }
  
  let rootDir = opts.rootDir;
  let outDir = opts.outDir;
  let tsconfig = null;
  
  if (!rootDir || !outDir) {
    try {
      tsconfig = require(path.resolve(projectRoot + '/tsconfig.json'));
    }
    catch (err) {
      tsconfig = {
        compilerOptions: {
          rootDir: 'src',
          outDir: 'dist'
        }
      }
    }
  }
  
  if (!outDir) {
    outDir = tsconfig.compilerOptions.outDir || 'dist'
  }
  
  if (!rootDir) {
    rootDir = tsconfig.compilerOptions.rootDir || 'src'
  }
  
  return {rootDir, outDir, projectRoot};
}