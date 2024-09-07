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


# push up the test files to the bucket as test-client_v1.0.0
aws s3 cp ./client/dist/spa/index.html s3://local-bucket/test-client_v1.0.0 --endpoint-url http://localhost:4566
aws s3 cp ./client/dist/spa/favicon.ico s3://local-bucket/assets/favicon.ico --endpoint-url http://localhost:4566
aws s3 cp ./client/dist/spa/assets s3://local-bucket/assets --recursive --endpoint-url http://localhost:4566
aws s3 cp ./client/dist/spa/icons s3://local-bucket/assets --recursive --endpoint-url http://localhost:4566