curl -X POST "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn" -d '{"userId":"043323130","name":"michelerisa","gcpid":"043323130","endtoendID":"20220122ANZBIDJX010O0120571855","status":"Processed","remittanceInfo":"bifast","clientref":"2341242","amt":"23.00","createdAt":"2011-01-22"}' -H "Content-Type: application/json"

curl -X POST "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn" -d '{"userId":"043323129","name":"michelerisa","gcpid":"043323129","endtoendID":"20220122ANZBIDJX010O0120571855","status":"Processed","remittanceInfo":"bifast","clientref":"5676756","amt":"30.00","createdAt":"2011-01-22"}' -H "Content-Type: application/json"

curl -X GET "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn/043323129" -H "Content-Type: application/json"

curl -X GET "https://lswe5vztm4.execute-api.ap-southeast-2.amazonaws.com/dev/trn/30" -H "Content-Type: application/json"
