#!/usr/bin/env bash

set -e;

ql_gray='\033[1;30m'
ql_magenta='\033[1;35m'
ql_cyan='\033[1;36m'
ql_orange='\033[1;33m'
ql_green='\033[1;32m'
ql_no_color='\033[0m'


mkdir -p "$HOME/.oresoftware/bin"

curl -H 'Cache-Control: no-cache' "https://raw.githubusercontent.com/oresoftware/run-tsc-if/master/run.sh?$(date +%s)" \
--output "$HOME/.oresoftware/bin/run-tsc-if"

chmod u+x "$HOME/.oresoftware/bin/run-tsc-if"

echo "";
echo -e "${ql_green} => run-tsc-if download/installation succeeded.${ql_no_color}";
echo "";
