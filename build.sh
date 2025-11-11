#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Print commands and their arguments as they are executed.
set -x

# Install Python dependencies
pip install -r requirements.txt

# Create a public directory and a placeholder file to satisfy the static builder
mkdir public
touch public/index.html