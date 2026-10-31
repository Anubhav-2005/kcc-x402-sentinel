#!/bin/bash
cd "$(dirname "$0")"
if ! command -v ngrok >/dev/null 2>&1; then
  echo "ngrok is not installed. Install it with: brew install ngrok"
  exit 1
fi
echo "Opening public tunnel to port 4173..."
echo "Keep RUN_WEBSITE.command running in another terminal."
ngrok http 4173
