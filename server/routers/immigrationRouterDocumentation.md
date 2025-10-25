# /api/immigration

## GET 

`GET` `/:city` \

| Key | Value |
|:-----|:---:|
| :city | halifax |

Response
```
{
    "city": "halifax",
    "period": "before 1980 to 2021",
    "totalImmigrants": 50315,
    "countries": {
        "United Kingdom": 6590,
        "India": 4815,
        "China": 3745,
        "United States of America": 3680,
        "Philippines": 3505,
        "Syria": 2080,
        "Nigeria": 1625,
        "Lebanon": 1350,
        "Korea, South": 1025,
        "Iran": 985,
        "Germany": 935,
		...
    }
}
```

`GET` `/:city` \

| Key | Value |
|:-----|:---:|
| :city | montreal |

Response
```
{
    "error": "City not found or immigration data non existant.",
    "hint": "If the city name contains accents, please include them in your request."
}
```

`GET` `/:city` \

| Key | Value |
|:-----|:---:|
| :city | montréal |

Response
```
{
    "city": "montréal",
    "period": "before 1980 to 2021",
    "totalImmigrants": 1020835,
    "countries": {
        "Haiti": 79720,
        "Algeria": 66730,
        "France": 63235,
        "Morocco": 60545,
        "China": 48080,
        "Italy": 41855,
        "Lebanon": 38580
		...
	}
}
```