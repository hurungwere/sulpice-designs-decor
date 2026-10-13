#!/usr/bin/env bash
# Restores the design to the pre-branding snapshot (warm palette).
# Usage: ./restore-pre-branding.sh
set -e
cd "$(dirname "$0")"

SNAP="$(readlink -f .backup/latest)"
if [ -z "$SNAP" ] || [ ! -d "$SNAP/src" ]; then
  echo "No snapshot found under .backup/. Nothing to restore." >&2
  exit 1
fi

echo "Restoring from $SNAP"
rm -rf src public
cp -r "$SNAP/src" src
cp -r "$SNAP/public" public
[ -f "$SNAP/package.json" ] && cp "$SNAP/package.json" package.json
[ -f "$SNAP/package-lock.json" ] && cp "$SNAP/package-lock.json" package-lock.json
echo "Done. Run: npm install && npm run build"
