#!/bin/sh

cd backend && nodemon start &
cd frontend && npm run serve &

echo "Both frontend and backend running 💻️💻️💻️ !!!" &&
echo "Have fun coding mate 😎️" &

wait 
