# GCP cloud functions google maps services

> fetch travel distances and duration by Google Maps Distance Matrix API via Google Cloud Functions

```sh
# addresses

"No. 227, Ruiguang Road, Neihu District, Taipei City, 114",
"No. 106, Meishu East 2nd Road, Gushan District Kaohsiung City, 804",
"No. 175, Section 1, Changrong Rd, East District Tainan City, 701",
"No. 15, Alley 1, Lane 123, Section 5, Nanjing East Road, Songshan District Taipei City, 105",
"No. 131, Wufu 4th Road, Yancheng District Kaohsiung City, 803"
```

```sh
# travel distrance and duration

waypoint1 → waypoint2, distance, duration
No. 227, Ruiguang Road, Neihu District, Taipei City, 114 → No. 106, Meishu East 2nd Road, Gushan District Kaohsiung City, 804,  352777, 13532
No. 227, Ruiguang Road, Neihu District, Taipei City, 114 → No. 175, Section 1, Changrong Rd, East District Tainan City, 701,  314041, 12166
No. 227, Ruiguang Road, Neihu District, Taipei City, 114 → No. 15, Alley 1, Lane 123, Section 5, Nanjing East Road, Songshan District Taipei City, 105,  5183, 786
No. 227, Ruiguang Road, Neihu District, Taipei City, 114 → No. 131, Wufu 4th Road, Yancheng District Kaohsiung City, 803,  356215, 14018
No. 106, Meishu East 2nd Road, Gushan District Kaohsiung City, 804 → No. 175, Section 1, Changrong Rd, East District Tainan City, 701,  46668, 3203
No. 106, Meishu East 2nd Road, Gushan District Kaohsiung City, 804 → No. 15, Alley 1, Lane 123, Section 5, Nanjing East Road, Songshan District Taipei City, 105,  355412, 14134
No. 106, Meishu East 2nd Road, Gushan District Kaohsiung City, 804 → No. 131, Wufu 4th Road, Yancheng District Kaohsiung City, 803,  4166, 748
No. 175, Section 1, Changrong Rd, East District Tainan City, 701 → No. 15, Alley 1, Lane 123, Section 5, Nanjing East Road, Songshan District Taipei City, 105,  314265, 12478
No. 175, Section 1, Changrong Rd, East District Tainan City, 701 → No. 131, Wufu 4th Road, Yancheng District Kaohsiung City, 803,  49930, 3339
No. 15, Alley 1, Lane 123, Section 5, Nanjing East Road, Songshan District Taipei City, 105 → No. 131, Wufu 4th Road, Yancheng District Kaohsiung City, 803,  359470, 14335
```

## Getting Started

```sh
# clone repo
$ git git@github.com:cage1016/cloudfunctions-google-maps-services.git && cd cloudfunctions-google-maps-services

# install node packages
$ npm install
```

modify `index.js` <YOUR-GCP-API-KEY>

```js
const googleMapsClient = require('@google/maps').createClient({
    key: '<YOUR-GCP-API-KEY>'
})

...
```


### distanceMatrix background

> modify `makefile` assign Google Cloud Storage Bucket you have

```sh
# deploy distanceMatrix
$ make deploy_backend

# call distanceMatrix
$ make call_backend

# log distanceMatrix
$ make log_backend

# show description of distanceMatrix function
$ make describe_backend
```

### distanceMatrix background

> modify `https://<YOUR_REGION>-<YOUR_PROJECT_ID>.cloudfunctions.net/distanceMatrixHttp` endpoint after call `make deploy_http`

```sh
# deploy distanceMatrixHttp
$ make deploy_http

# call distanceMatrixHttp
$ make call_http

# log distanceMatrixHttp
$ make log_http

# show description of distanceMatrixHttp function
$ make describe_http
```

## Reference
- [googlemaps/google-maps-services-js: Node.js client library for Google Maps API Web Services](https://github.com/googlemaps/google-maps-services-js)
- [Developer's Guide  |  Google Maps Distance Matrix API  |  Google Developers](https://developers.google.com/maps/documentation/distance-matrix/intro?hl=en)
- [Google Cloud Functions Documentation  |  Cloud Functions  |  Google Cloud Platform](https://cloud.google.com/functions/docs/)

## Author

[kaichu.io](https://kaichu.io)

## Licence
MIT: [https://github.com/cage1016/cloudfunctions-google-maps-services/blob/master/LICENSE](https://github.com/cage1016/cloudfunctions-google-maps-services/blob/master/LICENSE)