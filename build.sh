#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Print commands and their arguments as they are executed.
set -x

# Install Python dependencies
pip install -r requirements.txt

# Create an empty public directory to satisfy the static build process
mkdir public