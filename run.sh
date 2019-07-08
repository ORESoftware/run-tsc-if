#!/usr/bin/env bash

run_tsc='nope'
project_root="${project_root:-$1}"

for f in `(cd "$project_root/src" && find . -type f)`; do

    f="${f:2}" # remove first 2 chars
    length="${#f}"
    end_index=$(expr "$length" - '3')
    jsf="${f:0:$end_index}.js"

    full_src="$project_root/src/$f";
    full_dist="$project_root/dist/$jsf";

    if [[ "$full_src" != *'.ts' ]]; then
      continue;
    fi

     if [[ "$full_src" == *'.d.ts' ]]; then
      continue;
     fi

    if [[ ! -f "$full_dist" ]]; then
        run_tsc='yes'
        break;
    fi

    if [[ ! "${full_dist}" -nt "${full_src}" ]]; then
        run_tsc='yes'
        break;
    fi

done

if [[ "$run_tsc" == 'yes' ]]; then
  echo 'Running transpile with tsc, because we have un-transpiled files.';
  (cd "$project_root" && tsc)
fi
