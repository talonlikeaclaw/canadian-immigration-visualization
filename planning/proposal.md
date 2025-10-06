# Immigration across Canada

## Data

[Choose Data GitLab Issue](https://gitlab.com/dawson-cst-cohort-2026/520/section3/teams/teamhabibmelaniatalon/520-project-safari-chiru-dunbar/-/issues/4)

We will be using the Canadian federal 2021 census data for immigration per city, and the languages spoken in those cites.

## API

- GET route: `/api/city/:city_name` returns city information.
- GET route: `/api/immigration/:city` returns all immigration stats for a city (all places of birth × periods), truncated to top 5.
- GET route: `/api/immigration/:city/period/:period` returns origins for a city in a specific immigration period (2011-2021).
- GET route: `/api/languages/:city` returns a truncated list of the amount of people that speak english and french at home, and the top 5 unofficial languages.
- GET route: `/api/city/:city/profile` returns a combined city profile: immigration origins (by period) and languages spoken.
- GET route: `/api/cities/comparison?cities=Toronto,Montreal` returns side-by-side immigration and language data.

## Visualizations
- Our story aims to explore and visualize Canadian immigration patterns to different major cities from one coast to the other.
- We will create a narrative that illustrates how different immigrant communities cluster in major Canadian cities, depending on where they are located.

## Views
### Desktop view
- Above the fold + scrolling down
![1st wire frame: above the scroll + scrolling down]('/planning/wireframes/1.png)
- Continuation of scrolling
![2nd wire frame: scrolling down]('/planning/wireframes/2.png)
![3rd wire frame: scrolling down]('/planning/wireframes/3.png)
![4th wire frame: scrolling down]('/planning/wireframes/4.png)
![5th wire frame: scrolling down]('/planning/wireframes/5.png)
![6th wire frame: scrolling down]('/planning/wireframes/6.png)

### Mobile view
- Above the fold + scrolling down
![1st wire frame: above the scroll + scrolling down]('/planning/wireframes/mobile1.png)
- Continuation of scrolling
![2nd wire frame: scrolling down]('/planning/wireframes/mobile2.png)
![3rd wire frame: scrolling down]('/planning/wireframes/mobile3.png)

## Functionality
- We want the story to be a as contunous and immersive as as possible.
- The main thing users will have to do is scroll. Using a parallax effect, the information and story will come to the user.
- There will also be some other small interactions where the users will click on different buttons to display different charts.

- If we have enough time at the end, we'll add more data and a possibility for users to learn more about the different cities, be able to compare cities, and ultimately come up with their own conclusions about the data.

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