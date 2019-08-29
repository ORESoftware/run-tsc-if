'use strict';

exports.run = (opts) => {
  
  const projectRoot = opts.projectRoot;
  const rootDir = opts.rootDir || 'src';
  const outDir = opts.outDir || 'dist';
  
  return String(`
  
      set -e;
      export root_dir='${rootDir}'
      export out_dir='${outDir}'
      
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
      
      "$HOME/.oresoftware/bin/run-tsc-if" '${projectRoot}'
      
    `);
  
};




