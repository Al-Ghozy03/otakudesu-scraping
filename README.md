# Otakudesu Scraping

## Usage

1. clone this repository

```
https://github.com/Al-Ghozy03/otakudesu-scraping.git
```

2. run `npm install`
3. run `npm start`
4. it will run on port 3000 (default port)

## Endpoint

**BaseUrl** = http://localhost:3000

#### On going anime

```
/on-going?page=[number]
```

Example: http://localhost:3000/on-going?page=1

#### Complete anime

```
/complete?page=[number]
```

Example: http://localhost:3000/complete?page=53

#### Detail anime

```
/[endpoint]
```

Example : http://localhost:3000/spy-family-sub-indo/

#### Watch anime by episode

```
/watch/[endpoint]
```

Example : http://localhost:3000/watch/sxf-s2-episode-1-sub-indo/

#### Genre

```
/genre/
```

Example : http://localhost:3000/genre/

#### Genre detail

```
/genre/[endpoint]?page=[number]
```

http://localhost:3000/genre/action?page=10

#### Release Schedule

```
/release-schedule/
```

Example : http://localhost:3000/release-schedule/

#### Search anime by keyword

```
/search?q=[keyword]
```

Example : http://localhost:3000/search?q=jujutsu kaisen
