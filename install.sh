#!/usr/bin/env bash

set -e;

ql_green='\033[1;32m'
ql_no_color='\033[0m'

echo 'Installing "run-tsc-if" on your system.';

mkdir -p "$HOME/.oresoftware/bin"

curl -H 'Cache-Control: no-cache' "https://raw.githubusercontent.com/oresoftware/run-tsc-if/master/run.sh?$(date +%s)" \
--output "$HOME/.oresoftware/bin/run-tsc-if"

chmod u+x "$HOME/.oresoftware/bin/run-tsc-if"

echo "";
echo -e "${ql_green} => run-tsc-if download/installation succeeded.${ql_no_color}";
echo "";
