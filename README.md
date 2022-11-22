curl -X POST "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn" -d '{"userId":"043323130","name":"michelerisa","gcpid":"043323130","endtoendID":"20220122ANZBIDJX010O0120571855","status":"Processed","remittanceInfo":"bifast","clientref":"2341242","amt":"23.00","createdAt":"2011-01-22"}' -H "Content-Type: application/json"

curl -X POST "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn" -d '{"userId":"043323129","name":"michelerisa","gcpid":"043323129","endtoendID":"20220122ANZBIDJX010O0120571855","status":"Processed","remittanceInfo":"bifast","clientref":"5676756","amt":"30.00","createdAt":"2011-01-22"}' -H "Content-Type: application/json"

curl -X GET "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn/043323129" -H "Content-Type: application/json"

curl -X GET "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn/30" -H "Content-Type: application/json"

https://hevodata.com/learn/dynamodb-streams-lambda/#w3
1. Create a file index.js and copy below content
console.log('Loading function');
exports.handler = function(event, context, callback) {
    console.log(JSON.stringify(event, null, 2));
    event.Records.forEach(function(record) {
        console.log(record.eventID);
        console.log(record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
    });
    callback(null, "message");
};

2. Run below command
zip function.zip index.js

3. Now create an execution role with the given properties.
Trusted entity: Lambda.
Permissions: AWSLambdaDynamoDBExecutionRole.
Role name: lambda-dynamodb-role.

4. Create a lambda function ProcessDynamoDBRecords and assign the new role.
aws lambda create-function --function-name ProcessDynamoDBRecords --zip-file fileb://function.zip --handler index.handler --runtime nodejs16.x --role arn:aws:iam::935207697442:role/lambda-dynamodb-role
Note - Add all the permissions related to dynamodb

5. Enable stream in the dynamodb table, choose last option

6. Enable even source mapping
aws lambda create-event-source-mapping --function-name ProcessDynamoDBRecords --batch-size 100 --starting-position LATEST --event-source arn:aws:dynamodb:ap-southeast-2:935207697442:table/trn-table-dev/stream/2022-11-22T01:00:15.721

6. To update a lambda function
Update the index.js
zip function.zip index.js
aws lambda update-function-code --function-name ProcessDynamoDBRecords --zip-file fileb://function.zip
