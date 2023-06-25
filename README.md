# VIPTop10

This document provides instructions on how to use the API, make requests, and handle validations.

## Installation

1. Clone the repository
2. Install dependencies:

```
cd capstone-api
npm install
```


3. Set up environment variables:

- Create the `.env` file.

- Open the `.env` file and update the necessary variables, such as the database credentials `(DATABASE_USER, DATABASE_PASSWORD)`, API keys `(API_KEY_GOOGLE_MAPS, API_KEYS_AUTHORIZED)` and port `(PORT)`.

4. Generate SSL certificate files:

- Make sure you have the necessary SSL certificate files in the specified directory`(SSL_Certificates)`.

- Replace the placeholders in the code with the actual file paths if it is necessary.

5. Build the project:

```
npm run tsc
```

6. Start the server:

```
npm start
```

## API Endpoints

The API exposes the following endpoints:

- **GET /api/categories**: Retrieve all categories.
- **GET /api/categories/recomms**: Retrieve recommended categories.
- **GET /api/countries**: Retrieve all countries.
- **POST /api/cities**: Filter cities by country.
- **GET /api/places/recomms**: Retrieve recommended places.
- **POST /api/places**: Filter places by city and category.
- **GET /api/places/:id**: Retrieve a place by ID.
- **GET /api/places/category/:categoryid**: Retrieve places by category.

## Request Examples

Here are some examples of how to make requests to the API endpoints:

- Retrieve all categories:
GET */api/categories*

- Filter places by city and category:
POST */api/places*

**Request Body:**
```
    {
        "city": "New York",
        "category": "Restaurant"
    }
```

## API Key Validation

To ensure secure access to the API, the API Key validation middleware is implemented. The API Key must be included in the `Authorization` header of the request.

If the API Key is missing or invalid, you will receive a `401 Unauthorized` response.

## Error Handling

The API handles errors and returns appropriate HTTP status codes and error messages in the response. The possible error status codes include:

- `400 Bad Request`: Invalid request parameters or missing required fields.
- `401 Unauthorized`: Missing or invalid API Key.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server error occurred.

Make sure to handle these errors appropriately in your client application.

## Conclusion

You can now start using the API by following the installation instructions and making requests to the provided endpoints.

## Bugs :bomb:
If you find any bug, please, let us know.

## Styling :page_with_curl:
All files have been written in the [ts-standard](https://github.com/standard/ts-standard) style.

## Authors
* **Obed Rayo** <a href="https://github.com/ObedRav" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

* **Esteban Enriquez** <a href="https://github.com/esteban-94" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>

* **Cristhian Jurado** <a href="https://github.com/Chrs-creyk" rel="nofollow"><img align="center" alt="github" src="https://www.vectorlogo.zone/logos/github/github-tile.svg" height="24" /></a>
