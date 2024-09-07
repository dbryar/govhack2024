#!/bin/bash
export AWS_ACCESS_KEY_ID=223344
export AWS_SECRET_ACCESS_KEY=wJalrXUtTHISI/DYNAMODB/bPxRfiCYEXAMPLEKEY

# list tables and only create if needed by searching for the table name in the list
echo "Creating local-response-table"
if [ $? -eq 0 ] && ! [[ $( AWS_PAGER="" aws dynamodb list-tables --endpoint-url http://localhost:4566 --region ap-southeast-2) == *"local-client-table"* ]]; then
  AWS_PAGER="" aws dynamodb create-table \
    --table-name local-response-table \
    --attribute-definitions \
      AttributeName=pk,AttributeType=S \
      AttributeName=sk,AttributeType=S \
      AttributeName=gsi1pk,AttributeType=S \
      AttributeName=gsi1sk,AttributeType=S \
    --key-schema \
      AttributeName=pk,KeyType=HASH \
      AttributeName=sk,KeyType=RANGE \
    --global-secondary-indexes \
      '[
        {
          "IndexName": "gsi1",
          "KeySchema": [
            {"AttributeName": "gsi1pk","KeyType": "HASH"},
            {"AttributeName": "gsi1sk","KeyType": "RANGE"}
          ],
          "Projection": {
            "ProjectionType": "ALL"
          }
        }
      ]' \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:4566 \
    --region ap-southeast-2
else
  echo "local-response-table already exists"
fi

if [ $? -eq 0 ] && ! [[ $( AWS_PAGER="" aws dynamodb list-tables --endpoint-url http://localhost:4566 --region ap-southeast-2) == *"local-session-table"* ]]; then
  AWS_PAGER="" aws dynamodb create-table \
    --table-name local-session-table \
    --attribute-definitions \
      AttributeName=pk,AttributeType=S \
      AttributeName=sk,AttributeType=S \
      AttributeName=gsi1pk,AttributeType=S \
      AttributeName=gsi1sk,AttributeType=S \
    --key-schema \
      AttributeName=pk,KeyType=HASH \
      AttributeName=sk,KeyType=RANGE \
    --global-secondary-indexes \
      '[
        {
          "IndexName": "gsi1",
          "KeySchema": [
            {"AttributeName": "gsi1pk","KeyType": "HASH"},
            {"AttributeName": "gsi1sk","KeyType": "RANGE"}
          ],
          "Projection": {
            "ProjectionType": "ALL"
          }
        }
      ]' \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:4566 \
    --region ap-southeast-2
else
  echo "local-session-table already exists"
fi
