#!/bin/bash
# Usage: ./update_version.sh <new_version>
# FORMAT IS <0.0.0>

if [[ "$1" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  find . -name 'package.json' -not -path '*/node_modules/*' -exec bash -c '
    # Parse the version from package.json
    current_version=$(grep -o "\"version\": \"[^\"]*" "$0" | cut -d"\"" -f4)

    # Compare the versions
    if [[ "$(echo -e "$current_version\n$1" | sort -V | head -n1)" == "$1" && "$current_version" != "$1" ]]; then
      # Update the version
      perl -i -pe"s/$current_version/'$1'/" "$0"
      echo "Updated $0 from $current_version to '$1'";
    else
      echo "Cannot update $0 to a higher or same version ('$1'). Current version is $current_version";
    fi
  '  {} \;
else
  echo "Version format <$1> isn't correct, proper format is <0.0.0>";
fi