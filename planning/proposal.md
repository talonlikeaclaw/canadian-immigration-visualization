# Immigration across Canada

## Data

[Choose Data GitLab Issue](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/4)

We will be using the Canadian federal 2021 census data for immigration per city, and the languages spoken in those cites.


## API

- GET route: `/api/city/:city_name` returns city information.
- GET route: `/api/immigration/:city` returns total immigrants and immigration patterns per city.
- GET route: `/api/language/:city` returns a truncated list of the amount of people that speak english and french at home, and the top 5 unofficial languages.


## Visualizations
- Our story aims to explore and visualize Canadian immigration patterns to different major cities from one coast to the other.
- We will create a narrative that illustrates how different immigrant communities cluster in major Canadian cities, depending on where they are located.

## Views
``` TBD ```
## Functionality
``` TBD ```
## Features and Priorities
| Core features | Add ons |
| -------- | ------- |
| The API to get basic city info | At the very bottom of our page, have a map with each city and more information about each city |
| The API to get the number of immigrants and their origin for each city | Have a parallax effect when scrolling from one city to the other  |
| The API to get the non-official languages spoken for each city |  |
| Have a basic UI displaying the necessary bar-charts for each city| |
| All of our core features should have tests associated to them |

## Dependencies

We will be displaying our data in the form of bar charts using `https://plotly.com/javascript/react/`

_If we decide to display a map at the end and allow users to interact with it and get more information about each city, we will also use react-leaflet (https://react-leaflet.js.org)_