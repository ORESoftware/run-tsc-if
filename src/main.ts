'use strict';

import * as path from 'path';
import  runGetShellCmd from './get-shell-cmd-str';
import * as rl from "./run-limit";
import * as fs from "fs";

export type EVCb<T, E = any> = (err?: E, val?: T) => void;


export interface RunOpts {
  projectRoot: string,
  rootDir?: string,
  outDir?: string
}

export const r2gSmokeTest = async () => {
  return true;
};


export const getShellCommandString = (opts: RunOpts) => {
  return runGetShellCmd(opts);
};


export const run = (opts: RunOpts) => {
  

};


