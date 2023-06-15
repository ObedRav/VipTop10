# VIPTOP10.COM

## Introduction
API VIPTOP10.COM contains the information of tourist sites in different categories around the world ordered in a ranking of 10.

## Project Support Features
* Minimal API's endpoints to get information about:
  - Countries.
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
| GET        | /countries                              | Get the list of all countries                                        |
| POST       | /cities                                 | Get the list of all cities of selected country                              |
| GET        | /categories                               | Get the list of all catergories                                           |
| GET        | /categories/recomms                          | Get the 3 list of recommended catergories                        |
| POST       | /places                               | Get the top 10 places filtered by city and category                                       |
| GET        | /places/recomms                               | Get the 6 list of recommended places                                           |
| GET        | /places/(id)                          | Get the information of a palce searching by id                       |


## Response Example 
* Content type: "application/json". Responses are JSON Objects. 
* Response header contains the HTTP CODE with the status. 
* Example:
 
```
 [{"name": "Colombia","coordinates": "4.5709, -74.2973","continent": "America"},{"name": "Dominican Republic","coordinates": "18.7357, -70.1627","continent":"America"},{"name": "United States","coordinates": "37.0902, -95.7129","continent": "America"}]
 ```
## Technologies Used
* [Node.js](https://nodejs.org/en) As an asynchronous event-driven JavaScript runtime, Node.js is designed to build scalable network applications.

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
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/obedrav/"><img src="https://avatars.githubusercontent.com/u/111031016?v=4?s=100" width="100px;" alt="Obed Rayo"/><br /><sub><b>Obed Rayo</b></sub></a><br /><a href="https://github.com/ObedRav" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/cristhian-jurado/"><img src="https://avatars.githubusercontent.com/u/111865322?v=4?s=100" width="100px;" alt="Cristian Jurado"/><br /><sub><b>Cristian Jurado</b></sub></a><br /><a href="https://github.com/Chrs-creyk" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/juan-esteban-enriquez/"><img src="https://avatars.githubusercontent.com/u/114319655?v=4?s=100" width="100px;" alt="Esteban Enriquez"/><br /><sub><b>Esteban Enriquez</b></sub></a><br /><a href="https://github.com/esteban-94" title="Code">💻</a></td>
    </tr>
  </tbody>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the !
## License
MIT License
