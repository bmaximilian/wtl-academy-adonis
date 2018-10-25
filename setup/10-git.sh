#!/usr/bin/env bash

cd "$(dirname "$0")"
echo "Setting up git hooks..."
ln -f ./git/hooks/pre-push ../.git/hooks/pre-push
