# Homelike-Assessment

Backend Engineer Assessment By Homelike

This is a Node JS (Typescript) implementation of the Homelike Backend Engineer Assessment.

## Setup

- Clone the repository

```bash
git clone https://github.com/uzochukwuonuegbu/Homelike-Assessment.git
```

- Install project dependencies

```bash
cd Homelike-Assessment
npm install
```

> Make sure to configure AWS CLI to be able to run tests


- Run the following command to test endpoints using serverless offline.

```bash
sls offline start
```

### Testing (unit tests)
 Run:

```shell
npm run test
```

### Endpoints(Sample CURLs)

NOTE:
```bash
For endpoints requiring a Bearer token, please use the LOGIN endpoint to get a fresh token 
...because the tokens in the sample curls might be expired at the time of tests.
```

POST Register:
```bash
curl --request POST \
  --url https://djvn3ii2g8.execute-api.eu-central-1.amazonaws.com/dev/auth/register \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: yqEtKcheDMIv4t2AZ2749wXm5WPGL578s6dG4qJ5' \
  --data '{
	"email": "uzo12345@uzo.com",
	"password": "123456",
	"firstName": "Uzochukwuu",
	"lastName": "Onuegbuu"
}'
```


POST Login: 
```bash
curl --request POST \
  --url https://djvn3ii2g8.execute-api.eu-central-1.amazonaws.com/dev/auth/login \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: yqEtKcheDMIv4t2AZ2749wXm5WPGL578s6dG4qJ5' \
  --data '{
	"email": "uzo1234@uzo.com",
	"password": "123456"
}'
```


POST Create Apartment:
```bash
curl --request POST \
  --url https://djvn3ii2g8.execute-api.eu-central-1.amazonaws.com/dev/apartments/add \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OTM5YjIwLWRhOWMtNDFjOS05MWJkLWRkMjhmZGFmMjM4MCIsImVtYWlsIjoidXpvQHV6by5jb20iLCJpYXQiOjE2MjMzMjk1NTh9.SN-FhgKjbeA2qdqDH0PhgK4E70iwy7w4CdDCsl0q_k0' \
  --header 'Content-Type: application/json' \
  --header 'x-api-key: yqEtKcheDMIv4t2AZ2749wXm5WPGL578s6dG4qJ5' \
  --data '{
	"name": "Fourth Apartment",
	"city": "Lagos",
	"country": "Nigeria",
	"rooms": 5,
	"location": {
		"type": "Point",
		"coordinates": [-73.856077, 68.848447]
	}
}'
```


GET Search Apartments(GET Apartments - Filter By city, rooms, country, geo location):
```bash
curl --request GET \
  --url 'https://djvn3ii2g8.execute-api.eu-central-1.amazonaws.com/dev/apartments/search?long=-73.856077&lat=68.848447&nearestTo=1&rooms=5' \
  --header 'x-api-key: yqEtKcheDMIv4t2AZ2749wXm5WPGL578s6dG4qJ5'
  ```
  
  
  
POST Add Apartment To Favourite List:
```bash
curl --request GET \
  --url https://djvn3ii2g8.execute-api.eu-central-1.amazonaws.com/dev/apartments/60c21766b34e84d24596cb8f/favourites \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OTM5YjIwLWRhOWMtNDFjOS05MWJkLWRkMjhmZGFmMjM4MCIsImVtYWlsIjoidXpvQHV6by5jb20iLCJpYXQiOjE2MjMzMjk1NTh9.SN-FhgKjbeA2qdqDH0PhgK4E70iwy7w4CdDCsl0q_k0' \
  --header 'x-api-key: yqEtKcheDMIv4t2AZ2749wXm5WPGL578s6dG4qJ5'
```


GET FavouriteList:
```bash
curl --request GET \
  --url https://djvn3ii2g8.execute-api.eu-central-1.amazonaws.com/dev/apartments/favourites \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3OTM5YjIwLWRhOWMtNDFjOS05MWJkLWRkMjhmZGFmMjM4MCIsImVtYWlsIjoidXpvQHV6by5jb20iLCJpYXQiOjE2MjMzMjk1NTh9.SN-FhgKjbeA2qdqDH0PhgK4E70iwy7w4CdDCsl0q_k0' \
  --header 'x-api-key: yqEtKcheDMIv4t2AZ2749wXm5WPGL578s6dG4qJ5'
  ```

