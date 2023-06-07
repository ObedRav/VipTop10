# VIPTOP10.COM

## Introduction
API VIPTOP10.COM contains the information of tourist sites in different categories around the world ordered in a ranking of 10.

## Project Support Features
* Minimal API's endpoints to get information about:
  - Cuntries.
  - Cities.
  - Places.
* Does not require authentication.
## Versions
* 1.0
## Installation Guide
* Clone this repository.

## Usage
Public page of VIPTOP10.COM

## API Endpoints
| HTTP Verbs | Endpoints                             | Action                                                               |
| ---------- | ------------------------------------- | -------------------------------------------------------------------- |
| GET        | /api/{version}/city                   | Get the list of all cities                                           |
| GET        | /api/{version}/city/{id}              | Get the information of a city by it is id                            |
| GET        | /api/{version}/city/name/{name}       | Get the information of a city by it is name                          |
| GET        | /api/{version}/city/search/{keyword}  | Get the information of a city searching by keyword                   |
| GET        | /api/{version}/city/pagedList         | Get the list of all cities paginated                                 |
| GET        | /api/{version}/country/Colombia       | Get the information of Colombia                                      |
| GET        | /api/{version}/Department             | Get the list of all departments in Colombia                          |
| GET        | /api/{version}/Department/{id}        | Get the information of a department by it is id                      |
| GET        | /api/{version}/Department/name/{name} | Get the information of a department by it is name                    |
| GET        | /api/{version}/Department/search/{keyword} | Get the information of a department searching by keyword        |
| GET        | /api/{version}/Department/pagedList   | Get the list of all department paginated                             |
| GET        | /api/{version}/Region                 | Get the list of all regions in Colombia                              |
| GET        | /api/{version}/President              | Get the list of all presidents in Colombia                           |
| GET        | /api/{version}/President/{id}         | Get the information of a president by it is id                       |
| GET        | /api/{version}/President/name/{name}  | Get the information of a president by it is name                     |
| GET        | /api/{version}/President/year/{name}  | Get the information of a president that ruled during a specific year |
| GET        | /api/{version}/President/search/{keyword}      | Get the information of a president searching by keyword                        |
| GET        | /api/{version}/President/pagedList    | Get the list of all presidents paginated                             |
| GET        | /api/{version}/TouristicAttraction             | Get the list of all touristic attractions in Colombia                          |
| GET        | /api/{version}/TouristicAttraction/{id}        | Get the information of a touristic attraction by it is id                      |
| GET        | /api/{version}/TouristicAttraction/name/{name} | Get the information of a touristic attaction by it is name                     |
| GET        | /api/{version}/TouristicAttraction/search/{keyword} | Get the information of a touristic attaction searching by keyword         |
| GET        | /api/{version}/TouristicAttraction/pagedList   | Get the list of all touristic attractions paginated                            |

## Response Example 
* Content type: "application/json". Responses are JSON Objects. 
* Response header contains the HTTP CODE with the status. 
* Example:
 
```json
 {"id":1,"name":"Colombia","description":"Colombia, officially the Republic of Colombia, is a country in South America with insular regions in North America—near Nicaragua's Caribbean coast—as well as in the Pacific Ocean. The Colombian mainland is bordered by the Caribbean Sea to the north, Venezuela to the east and northeast, Brazil to the southeast, Ecuador and Peru to the south and southwest, the Pacific Ocean to the west, and Panama to the northwest. Colombia is divided into 32 departments and the Capital District of Bogotá, the country's largest city. It covers an area of 1,141,748 square kilometers (440,831 sq mi), and has a population of 52 million. Colombia's cultural heritage—including language, religion, cuisine, and art—reflects its history as a Spanish colony, fusing cultural elements brought by immigration from Europe and the Middle East, with those brought by enslaved Africans, as well as with those of the various Indigenous civilizations that predate colonization. Spanish is the official state language, although English and 64 other languages are recognized regional languages.","stateCapital":"Bogotá","surface":1141748,"population":52235050,"languages":["Spanish","English"],"timeZone":"UTC-5","currency":"Colombian Peso","currencyCode":"COP","isoCode":"CO","internetDomain":".co","phonePrefix":"+57","radioPrefix":"HK","aircraftPrefix":"HK"}
 ```
## Technologies Used
* [Microsoft Azure](https://azure.microsoft.com/en-us/resources/cloud-computing-dictionary/what-is-azure/) The Azure cloud platform is more than 200 products and cloud services designed to help you bring new solutions to life—to solve today’s challenges and create the future. Build, run, and manage applications across multiple clouds, on-premises, and at the edge, with the tools and frameworks of your choice.

## Contributors ✨
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/cristhian-jurado/"><img src="https://avatars.githubusercontent.com/u/111865322?v=4?s=100" width="100px;" alt="Cristian Jurado"/><br /><sub><b>Cristian Jurado</b></sub></a><br /><a href="https://github.com/Chrs-creyk" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the !
## License
MIT License