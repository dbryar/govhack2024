#!/bin/bash
export AWS_ACCESS_KEY_ID=223344
export AWS_SECRET_ACCESS_KEY=wJalrXUtTHISI/DYNAMODB/bPxRfiCYEXAMPLEKEY

# list buckets and only create if needed by searching for the bucket name in the list
echo "Creating local-bucket"
if [ $? -eq 0 ] && ! [[ $(aws s3 ls --endpoint-url http://localhost:4566) == *"local-bucket"* ]]; then
  aws s3 mb s3://local-bucket --endpoint-url http://localhost:4566
else
  echo "local-bucket already exists"
fi