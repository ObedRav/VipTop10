# VIPTop10 :earth_africa:

This document provides instructions on how to use the VIPTop10 API, make requests, and handle validations. The API allows you to retrieve information about categories, countries, cities, and places, and provides filtering and recommendation features.

<p align="center">
  <img src="https://github.com/ObedRav/VipTop10/blob/master/public/images/UML.png" alt="UML" height=550>
</p>


## Node Installation :space_invader:

<p align="center">
  <img src="https://github.com/ObedRav/VipTop10/blob/master/public/images/node.png" alt="node logo" height=250>
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

- Run the existing script called `secure_protocol.sh` to generate the SSL certificate files.

```ruby
bash secure_protocol.sh
```

This script will generate the SSL certificate files (`server.key` and `server.cert`) and move them to the `SSL_Certificates` directory.

Please note that the generated key and certificate are suitable for development purposes only. In a production environment, you should obtain a trusted SSL certificate from a certificate authority (CA) to ensure secure communication with the API.

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
  <img src="https://github.com/ObedRav/VipTop10/blob/master/public/images/docker.png" alt="docker logo" height=250>
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

- Run the existing script called `secure_protocol.sh` to generate the SSL certificate files.

```ruby
bash secure_protocol.sh
```

This script will generate the SSL certificate files (`server.key` and `server.cert`) and move them to the `SSL_Certificates` directory.

Please note that the generated key and certificate are suitable for development purposes only. In a production environment, you should obtain a trusted SSL certificate from a certificate authority (CA) to ensure secure communication with the API.

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

- `400 Bad Request`: Indicates invalid request parameters or missing required fields. This can occur if the request is not properly formatted or if required data is missing.
- `401 Unauthorized`: Indicates that the request requires authentication, and either no credentials were provided or the provided credentials are invalid.
- `404 Not Found`: Indicates that the requested resource could not be found. This can occur if the specified endpoint or resource does not exist.
- `503 Service Unavailable`: Indicates that the server is currently unable to handle the request due to a temporary overload or maintenance. This can occur if there are issues connecting to the database.
- `500 Internal Server Error`: Indicates that a server error occurred. This can occur due to various reasons, such as unexpected exceptions or issues with the server infrastructure.

When consuming the API, make sure to handle these errors appropriately in your client application. You can inspect the HTTP status code of the response to determine the type of error that occurred. Additionally, the response may include an error message that provides more information about the specific error.

It's recommended to handle different error scenarios in your client application and provide meaningful feedback to the user based on the encountered errors.

## Available Countries, Cities, and Categories :earth_americas:
The available countries, cities, and categories are these:

**Countries:**

- Colombia :colombia:
- Dominican Republic :dominican_republic:
- United States :us:

**Cities:** :cityscape:

- Bogotá, Colombia
- Medellín, Colombia
- Cali, Colombia
- Barranquilla, Colombia
- Cartagena, Colombia
- Cúcuta, Colombia
- Bucaramanga, Colombia
- Pereira, Colombia
- Santa Marta, Colombia
- Ibagué, Colombia
- Villavicencio, Colombia
- Pasto, Colombia
- Manizales, Colombia
- Montería, Colombia
- Valledupar, Colombia
- Santo Domingo, Dominican Republic
- Santiago de los Caballeros, Dominican Republic
- Santo Domingo Este, Dominican Republic
- Santo Domingo Norte, Dominican Republic
- Santo Domingo Oeste, Dominican Republic
- San Pedro de Macorís, Dominican Republic
- La Romana, Dominican Republic
- Bella Vista, Dominican Republic
- San Cristóbal, Dominican Republic
- Puerto Plata, Dominican Republic
- San Francisco de Macorís, Dominican Republic
- Higüey, Dominican Republic
- La Vega, Dominican Republic
- Concepción de La Vega, Dominican Republic
- Moca, Dominican Republic
- Austin, United States
- Chicago, United States
- Columbus, United States
- Dallas, United States
- Houston, United States
- Indianapolis, United States
- Jacksonville, United States
- Los Angeles, United States
- New York City, United States
- Philadelphia, United States
- Phoenix, United States
- San Antonio, United States
- San Diego, United States
- San Francisco, United States
- San Jose, United States

**Categories:**

- Car Rental :car: 
- Amusement Park :national_park:
- Bowling Alley
- Casino
- Movie Theater
- Night Club
- Stadium :stadium:
- Art Gallery
- Museum
- Bakery
- Bar
- Cafe
- Meal Takeaway
- Restaurant
- Beauty Salon
- Hair Care
- Pharmacy
- Spa
- Book Store
- Clothing Store
- Convenience Store
- Electronics Store
- Jewelry Store
- Liquor Store
- Shoe Store
- Shopping Mall

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

* [**Obed Rayo**](https://github.com/ObedRav) <a href="https://github.com/ObedRav" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

* [**Esteban Enriquez**](https://github.com/esteban-94) <a href="https://github.com/esteban-94" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

* [**Cristhian Jurado**](https://github.com/Chrs-creyk) <a href="https://github.com/Chrs-creyk" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>
