
#!/usr/bin/env bash

cd "$(dirname "$0")"
cd ../api

echo "Setting up api..."

cd ..
docker-compose run blog-adonis-api /opt/app/setup/00-setup.sh
