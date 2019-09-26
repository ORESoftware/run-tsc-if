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
 
 return String(`
  
      set -e
      
      export out_dir='${opts.outDir}'
      export root_dir='${opts.rootDir}'
      
      (
      
          if [[  -f "$HOME/.oresoftware/bin/run-tsc-if"  ]]; then
            exit 0;
          fi
          
          curl_url='https://raw.githubusercontent.com/oresoftware/run-tsc-if/master/install.sh'
          
          curl --silent -o- "$curl_url" | bash || {
            echo "Could not install run-tsc-if on your system.";
            exit 1;
          }
      
      )
      
      "$HOME/.oresoftware/bin/run-tsc-if" '${opts.projectRoot}'
    
    `);

};


