# /api/immigration

## `GET` `/:city`
<hr>

### Valid city name

| Key | Value |
|:-----|:---:|
| :city | halifax |

Response `200 OK`
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

### Invalid city name (has digits, white space, special characters)

| Key | Value |
|:-----|:---:|
| :city | abc 123 |

Response `400 Bad request`
```
{
    "error": "Invalid city name"
}
```

### City name that exists, but accent is ommited

| Key | Value |
|:-----|:---:|
| :city | montreal |

Response `404 Not found`
```
{
    "error": "City not found or immigration data non existant.",
    "hint": "If the city name contains accents, please include them in your request."
}
```

### City name that exists, accent NOT ommited

| Key | Value |
|:-----|:---:|
| :city | montréal |

Response `200 OK`
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
<br>
<br>

## `GET` `/:city/period/:end`
<hr>

### Valid city name and end date

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :end | 1980 |

Response `200 OK`
```
{
    "city": "calgary",
    "period": "Before 1980",
    "totalImmigrants": 52545,
    "countries": {
        "United Kingdom": 11060,
        "Germany": 3385,
        "United States of America": 3365,
        "India": 2700,
        "Italy": 2535,
        "Philippines": 2210,
        "Netherlands": 2070,
        "Hong Kong": 2040,
        "China": 2000,
		...
    }
}
```


### Invalid city name

| Key | Value |
|:-----|:---:|
| :city | abc 123 |
| :end | 1980 |

Response `400 Bad request`
```
{
    "error": "Invalid city name"
}
```

### Invalid end date

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :end | 2009 |

Response `400 Bad request`
```
{
    "error": "Invalid ending year"
}
```
<br>
<br>

## `GET` `/:city/period/:start/:end`
<hr>

### Valid city name, start and end years

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :start | 2001 |
| :end | 2005 |

Response `200 OK`
```
{
    "city": "vancouver",
    "period": "2001 to 2005",
    "totalImmigrants": 120750,
    "countries": {
        "China": 35735,
        "India": 17315,
        "Philippines": 13165,
        "Korea, South": 7625,
        "Iran": 5985,
        "Taiwan": 4445,
		...
    }
}
```


### Incorrect starting year
In this case, incorrect does not mean that the year does not exist, but that it's not part of the start time period in the DB.

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :start | 2004 |
| :end | 2005 |

Response `404 Not found`
```
{
    "error": "No immigration data found for vancouver in period 2004 to 2005.",
    "hint": "If the city name contains accents, please include them."
}
```

### Incorrect ending year
In this case, incorrect does not mean that the year does not exist, but that it's not part of the end time period in the DB.

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :start | 2011 |
| :end | 2016 |

Response `404 Not found`
```
{
    "error": "No immigration data found for vancouver in period 2011 to 2016.",
    "hint": "If the city name contains accents, please include them."
}
```

### Invalid starting year

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :start | abc |
| :end | 2005 |

Response `400 Bad request`
```
{
    "error": "Invalid starting year"
}
```

### Invalid ending year

| Key | Value |
|:-----|:---:|
| :city | calgary |
| :start | 2011 |
| :end | 2016 |

Response `400 Bad request`
```
{
    "error": "Invalid ending year"
}
```
