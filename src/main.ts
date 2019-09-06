'use strict';

import * as path from 'path';
import  runGetShellCmd from './get-shell-cmd-str';
import rl from './run-limit';
import * as fs from "fs";

export type EVCb<T, E = any> = (err: E, val?: T) => void;

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
  
  let done = false;

  const searchDir = (d: string, cb: EVCb<any>) => {
    
    fs.readdir(d, (err, items) => {
      
      if(err){
        return cb(null);
      }
      
      
      rl(items, 5, (v, cb) => {
        
        const full = path.resolve(d, v);
        
        fs.stat(full, (err, stats) => {
  
          if(err){
            return cb(null);
          }
          
          
          
          
          
          if(stats.isDirectory()){
            return searchDir(full, cb);
          }
          
          
          
          
        });
        
        
      }, cb);
      
    });
    
    
    
  };



};


