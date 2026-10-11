#!/bin/bash

set -e

echo "Starting RitualicTech landing page server..."

echo "Available commands:"
echo "1. Test the app in browser"
echo "2. Start local server"
echo "3. Open interactive mode"

read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo "Opening browser..."
        xdg-open "http://localhost:8000" || open "http://localhost:8000" || echo "Please open http://localhost:8000 in your browser"
        echo "Server started in background. Press Ctrl+C to stop."
        # Start server in background
        npx http-server --port 8000 -c-1 > server.log 2>&1 &
        SERVER_PID=$!
        # Wait for server
        sleep 3
        echo "Server started. The page should open in your browser."
        echo "Press Ctrl+C to stop the server."
        # Wait for server process
        wait $SERVER_PID
        ;;

    2)
        echo "Starting local server..."
        npx http-server --port 8000 -c-1
        ;;

    3)
        echo "Starting server in interactive mode..."
        echo "The server will be running in the background."
        echo "You can now open http://localhost:8000 in your browser."
        echo "Press Ctrl+C to stop the server."
        npx http-server --port 8000 -c-1
        ;;

    *)
        echo "Invalid option. Please choose 1, 2, or 3."
        exit 1
        ;;
esac