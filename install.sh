#!/usr/bin/env bash

set -e;

rti_green='\033[1;32m'
rti_no_color='\033[0m'
rti_magenta='\033[1;35m'
rti_cyan='\033[1;36m'
rti_orange='\033[1;33m'
rti_yellow='\033[1;33m'

echo
echo -e "${rti_cyan} => Installing 'run-tsc-if' on your system.${rti_no_color}"

mkdir -p "$HOME/.oresoftware/bin"

curl --silent -H 'Cache-Control: no-cache' "https://raw.githubusercontent.com/oresoftware/run-tsc-if/master/run.sh?$(date +%s)" \
--output "$HOME/.oresoftware/bin/run-tsc-if"

chmod u+x "$HOME/.oresoftware/bin/run-tsc-if"

echo -e "${rti_green} => run-tsc-if download/installation succeeded.${rti_no_color}";
echo "";
