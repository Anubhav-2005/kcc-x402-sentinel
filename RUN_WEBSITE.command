#!/bin/bash
cd "$(dirname "$0")"
echo "Starting x402 Sentinel at http://127.0.0.1:4173"
echo "Red:   http://127.0.0.1:4173/red"
echo "Blue:  http://127.0.0.1:4173/blue"
echo "Judge: http://127.0.0.1:4173/judge"
npm start
