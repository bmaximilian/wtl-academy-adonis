#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ..

yes | cp -f .env.example .env

adonis migration:refresh
# adonis seed
adonis key:generate
