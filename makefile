BUCKET=waldo-gcp-testbed.appspot.com
ADDRESSES='{"addresses":["No. 227, Ruiguang Road, Neihu District, Taipei City, 114","No. 106, Meishu East 2nd Road, Gushan District Kaohsiung City, 804","No. 175, Section 1, Changrong Rd, East District Tainan City, 701","No. 15, Alley 1, Lane 123, Section 5, Nanjing East Road, Songshan District Taipei City, 105","No. 131, Wufu 4th Road, Yancheng District Kaohsiung City, 803"]}'

# cloudfunctions background trigger
deploy_backend:
	gcloud beta functions deploy distanceMatrix --stage-bucket ${BUCKET} --trigger-topic distanceMatrix

call_backend:
	gcloud beta functions call distanceMatrix --data ${ADDRESSES}

describe_backend:
	gcloud beta functions describe distanceMatrix

log_backend:
	gcloud beta functions logs read distanceMatrix

# cloudfunctions http tirgger
deploy_http:
	gcloud beta functions deploy distanceMatrixHttp --stage-bucket ${BUCKET} --trigger-http

call_http:
# you could get <YOUR_REGION>-<YOUR_PROJECT_ID> after execute deploy_http or describe_http
	curl -X POST https://us-central1-waldo-gcp-testbed.cloudfunctions.net/distanceMatrixHttp -H "Content-Type:application/json" --data ${ADDRESSES}

describe_http:
	gcloud beta functions describe distanceMatrixHttp

log_http:
	gcloud beta functions logs read distanceMatrixHttp