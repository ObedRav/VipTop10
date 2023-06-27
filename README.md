# VIPTop10 :earth_africa:

This document provides instructions on how to use the VIPTop10 API, make requests, and handle validations. The API allows you to retrieve information about categories, countries, cities, and places, and provides filtering and recommendation features.

<p align="center">
  <img src="https://github.com/ObedRav/VipTop10/blob/development/Images/UML.png" alt="UML" height=550>
</p>


## Node Installation :space_invader:

<p align="center">
  <img src="https://github.com/ObedRav/VipTop10/blob/development/Images/node.png" alt="node logo" height=250>
</p>

### Prerequisites :ghost:

- Node.js (version 18 or higher)
- npm (Node Package Manager)

### Installation Steps :skier:

**1.** Clone the repository

**2.** Set up environment variables:

- Create a file with `.env` extension in the root directory of the project.
- Open the `.env` file and update the necessary variables:

```env
DATABASE_USER=<database-user>
DATABASE_PASSWORD=<database-password>
PORT=<port-number>
API_KEY_GOOGLE_MAPS=<google-maps-api-key>
API_KEYS_AUTHORIZED=<authorized-api-keys>
```

Replace `<database-user>`,`<database-password>`, `<port-number>`, `<google-maps-api-key>`, and `<authorized-api-keys>` with the actual values for your environment.

- If the `.env` file doesn't export the variables correctly, you can manually export them by running the following commands in the terminal (replace `<value>` with the actual value for each variable):

```bash
export DATABASE_USER=<value>
export DATABASE_PASSWORD=<value>
export PORT=<value>
export API_KEY_GOOGLE_MAPS=<value>
export API_KEYS_AUTHORIZED=<value>
```

Make sure to export the variables correctly to ensure the project works as expected.

**3.** Generate SSL certificate files:

- Make sure you have the necessary SSL certificate files in the specified directory `SSL_Certificates`. Ensure that the server key file is named `server.key` and the server certificate file is named `server.cert`.

     If you only want to check the API, you can use the following command to generate a certificate and key:

     ```ruby
     openssl req -nodes -new -x509 -keyout server.key -out server.cert
     ```

**4.** Install dependencies:

```ruby
npm install
```

**5.** Build the project:

```ruby
npm run tsc
```

**6.** Start the server:

```ruby
npm start
```

The API will be accessible at `https://localhost:<port>/api`.

## Docker Installation :robot:

<p align="center">
  <img src="https://github.com/ObedRav/VipTop10/blob/development/Images/docker.png" alt="docker logo" height=250>
</p>

### Prerequisites :alien:

- Docker Engine

### Installation Steps :snowboarder:

**1.** Clone the repository

**2.** Set up environment variables:

- Create a file with `.txt` extension in the root directory of the project.
- Open the `.txt` file and update the necessary variables:

```env
DATABASE_USER=<database-user>
DATABASE_PASSWORD=<database-password>
PORT=<port-number>
API_KEY_GOOGLE_MAPS=<google-maps-api-key>
API_KEYS_AUTHORIZED=<authorized-api-keys>
```
Replace `<database-user>`,`<database-password>`, `<port-number>`, `<google-maps-api-key>`, and `<authorized-api-keys>` with the actual values for your environment.

**3.** Generate SSL certificate files:

- Make sure you have the necessary SSL certificate files in the specified directory `SSL_Certificates`. Ensure that the server key file is named `server.key` and the server certificate file is named `server.cert`.

     If you only want to check the API, you can use the following command to generate a certificate and key:

     ```ruby
     openssl req -nodes -new -x509 -keyout server.key -out server.cert
     ```

**4.** Build the Docker image:

```ruby
docker build -t top10 .
```

**5.** Start the Docker container:

```ruby
docker run --env-file <your-file.txt> -p <host-port>:<container-port> top10
```
Replace `<host-port>` with the desired port number on your host machine and `<container-port>` with the corresponding port number specified in the .txt file (usually 5000).

The API will be accessible at `https://localhost:<port>/api`.


## API Endpoints :page_with_curl:

The API exposes the following endpoints:

- **GET /api/categories**: Retrieve all categories.
- **GET /api/categories/recomms**: Retrieve recommended categories.
- **GET /api/countries**: Retrieve all countries.
- **POST /api/cities**: Filter cities by country.
- **GET /api/places/recomms**: Retrieve recommended places.
- **POST /api/places**: Filter places by city and category.
- **GET /api/places/:id**: Retrieve a place by ID.
- **GET /api/places/category/:categoryid**: Retrieve places by category.

## Request Examples :notebook:

Here are some examples of how to make requests to the API endpoints:

- Retrieve all categories:
**GET** */api/categories*

- Filter places by city and category:
**POST** */api/places*

**Request Body:**
```json
    {
        "city": "New York",
        "category": "Restaurant"
    }
```

## API Key Validation :newspaper:

To ensure secure access to the API, the API Key validation middleware is implemented. The API Key must be included in the `Authorization` header of the request.

If the API Key is missing or invalid, you will receive a `401 Unauthorized` response.

```json
{
    "error": "Unauthorized"
}
```

## Error Handling :x:

The API handles errors and returns appropriate HTTP status codes and error messages in the response. The possible error status codes include:

- `400 Bad Request`: Invalid request parameters or missing required fields.
- `401 Unauthorized`: Missing or invalid API Key.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server error occurred.

Make sure to handle these errors appropriately in your client application.

## Usage :white_check_mark:

You can now start using the API by following the installation instructions and making requests to the provided endpoints.

## Bugs :bomb:
If you find any bug, please, let us know.

## Styling :page_with_curl:
All files have been written in the [ts-standard](https://github.com/standard/ts-standard) style.

## Process :desktop_computer:
If you want to watch the building process, you can type this in your console
```bash
git log --all --graph --decorate --oneline
```

## Authors

* **Obed Rayo** <a href="https://github.com/ObedRav" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

* **Esteban Enriquez** <a href="https://github.com/esteban-94" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

* **Cristhian Jurado** <a href="https://github.com/Chrs-creyk" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>
