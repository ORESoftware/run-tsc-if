'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const get_shell_cmd_str_1 = require("./get-shell-cmd-str");
exports.r2gSmokeTest = async () => {
    return true;
};
exports.getShellCommandString = (opts) => {
    return get_shell_cmd_str_1.default(opts);
};
exports.run = (opts) => {
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
