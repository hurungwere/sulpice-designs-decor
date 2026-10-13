#!/usr/bin/env bash
# Starts the Astro dev server and opens the live site in Firefox.
# Use this for the fully interactive preview (menu, carousel, filters, form).
set -e
cd "$(dirname "$0")"

[ -d node_modules ] || npm install

PORT="${PORT:-4321}"

# open the browser shortly after the server boots
( sleep 5; xdg-open "http://localhost:${PORT}" >/dev/null 2>&1 \
  || firefox "http://localhost:${PORT}" >/dev/null 2>&1 ) &

echo "Starting Sulpice Designs Decor dev server on http://localhost:${PORT}"
echo "Press Ctrl+C to stop."
npm run dev -- --host --port "${PORT}"
