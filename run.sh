#!/usr/bin/env bash

run_tsc='nope'
project_root="${project_root:-$1}"
project_root="${project_root:-"$PWD"}"
root_dir="${root_dir:-src}"
out_dir="${out_dir:-dist}"
export PATH="$project_root/node_modules/.bin:${PATH}"

find_files(){
  (cd "$project_root/$root_dir" && find . -type f)
}

for f in `find_files`; do

    f="${f:2}" # remove first 2 chars  (remove './' at the beginning)
    length="${#f}"
    end_index=$(expr "$length" - '3')
    jsf="${f:0:$end_index}.js"

    full_src="$project_root/$root_dir/$f";
    full_dist="$project_root/$out_dir/$jsf";

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

    if [[ -f 'package.json' ]]; then
      if command -v sha1sum &> /dev/null; then
         new_sha="$(sha1sum 'package.json')"
      elif command -v md5sum &> /dev/null; then
         new_sha="$(md5sum 'package.json')"
      fi
    fi


    if [[ -z "$new_sha" ]]; then
       new_sha='(no package.json file, or no sha1sum/md5sum programs available.)';
    fi

    if [[ -f "node_modules/.sha/run-tsc-if/package.json.sha" ]]; then
      old_sha="$(cat 'node_modules/.sha/run-tsc-if/package.json.sha')";
    else
      old_sha='(no package.json.sha file)';
    fi

    echo "$new_sha" > "node_modules/.sha/run-tsc-if/package.json.sha"

    if [[ "$new_sha" != "$old_sha" ]]; then
       exit 1;
    fi

    exit 0;
  )
}

export package_json_change='nope'

if ! check_sha; then
  package_json_change='yes'
  run_tsc='yes'
  echo 'package.json changed, running npm install...'
  npm i && echo 'npm install .. has completed.' ||  echo 'npm install did not do too good...';
fi

run_npm_i(){
  if [[ "$package_json_change" == 'yes' ]]; then
    npm i
  fi
}


if [[ "$run_tsc" == 'yes'  || "$package_json_change" == 'yes' ]]; then

  echo 'Running transpile with tsc, because we have un-transpiled files, or package.json changed.';

  (cd "$project_root" && run_npm_i && tsc && {

     set +e;  # sha1sum may not be available in users env

     new_sha="(no sha1sum or md5sum programs available)"

     if command -v sha1sum &> /dev/null; then
        new_sha="$(sha1sum 'package.json')"
     elif command -v md5sum &> /dev/null; then
        new_sha="$(md5sum 'package.json')"
     fi

     mkdir -p "node_modules/.sha/run-tsc-if"
     echo "$new_sha" > "node_modules/.sha/run-tsc-if/package.json.sha"

  })

fi
