#!/usr/bin/env bash

run_tsc='nope'
project_root="${project_root:-$1}"
root_dir="${root_dir:-src}"
dist_dir="${dist_dir:-dist}"
export PATH="$project_root/node_modules/.bin:${PATH}"

for f in `(cd "$project_root/$root_dir" && find . -type f)`; do

    f="${f:2}" # remove first 2 chars
    length="${#f}"
    end_index=$(expr "$length" - '3')
    jsf="${f:0:$end_index}.js"

    full_src="$project_root/$root_dir/$f";
    full_dist="$project_root/$dist_dir/$jsf";

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

check_sha(){
  (
    cd "$project_root"
    mkdir -p "node_modules/.sha/run-tsc-if"
    new_sha="$(sha1sum package.json)"
    old_sha=$(cat "node_modules/.sha/run-tsc-if/package.json.sha");
    echo "$new_sha" > "node_modules/.sha/run-tsc-if/package.json.sha"
    if [[ "$new_sha" != "$old_sha" ]]; then
       exit 1;
    fi
    exit 0;
  )
}

if [[ "$run_tsc" != 'yes' ]]; then
   if ! check_sha; then
      echo 'RUNNNING'
      run_tsc='yes'
   fi
fi


if [[ "$run_tsc" == 'yes' ]]; then

  echo 'Running transpile with tsc, because we have un-transpiled files, or package.json changed.';

  (cd "$project_root" && npm i && tsc && {
    new_sha="$(sha1sum package.json)"
    echo "$new_sha" > "node_modules/.sha/run-tsc-if/package.json.sha"
  })


fi
