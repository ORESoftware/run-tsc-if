'use strict';

import * as fs from "fs";
import * as rl from "./run-limit";
import * as path from "path";
import {EVCb} from "./main";
import {RunOpts} from "./main";


export default (opts: RunOpts) => {
  
  let done = false;
  
  const searchDir = (d: string, cb: EVCb<any>) => {
    
    fs.readdir(d, (err, items) => {
      
      if (err) {
        return cb(null);
      }
      
      rl.mapLimit(5, items, (v, cb) => {
        
        const full = path.resolve(d, v);
        
        fs.stat(full, (err, stats) => {
          
          if (err) {
            return cb(null);
          }
          
          if (stats.isDirectory()) {
            return searchDir(full, cb);
          }
          
        });
        
        
      }, cb);
      
    });
    
    
  };
  
};

