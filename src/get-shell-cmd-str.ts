'use strict';

import * as path from "path";
import {RunOpts} from "./main";
import getOpts from './internal-tool';

export default (opts: RunOpts) => {
  
  const {rootDir, outDir, projectRoot} =  getOpts(opts);
  
  return String(`
  
      set -e;
      
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
      
      export root_dir='${rootDir}'
      export out_dir='${outDir}'
      "$HOME/.oresoftware/bin/run-tsc-if" '${projectRoot}'
      
    `);
  
}