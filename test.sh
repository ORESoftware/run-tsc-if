is_file_older_than() {

  seconds="$1"
  file="$2"

  echo "The file $file"

  modified_secs="$(date -r "$file" +%s)"
  current_secs="$(date +%s)"

  diff="$(expr "$current_secs" - "$modified_secs")"

  if [[ "$diff" -gt "$seconds" ]]; then
    echo '0'
    return 0
  fi

  echo '1'
  return 1

}

if is_file_older_than 3 "$BASH_SOURCE"; then
  echo 'old'
else
  echo 'young'
fi