'use strict';

exports.run = (opts) => {
  
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
  
};




