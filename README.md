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

**BaseUrl** = https://otakudesu-scraping.vercel.app

#### On going anime

```
/on-going?page=[number]
```

Example: https://otakudesu-scraping.vercel.app/on-going?page=1

#### Complete anime

```
/complete?page=[number]
```

Example: https://otakudesu-scraping.vercel.app/complete?page=1

#### Detail anime

```
/[endpoint]
```

Example : https://otakudesu-scraping.vercel.app/spy-family-sub-indo

#### Watch anime by episode

```
/watch/[endpoint]
```

Example : https://otakudesu-scraping.vercel.app/watch/sxf-s2-episode-1-sub-indo

#### Genre

```
/genre/
```

Example : https://otakudesu-scraping.vercel.app/genre/

#### Genre detail

```
/genre/[endpoint]?page=[number]
```

Example : https://otakudesu-scraping.vercel.app/genre/action?page=10

#### Release Schedule

```
/release-schedule/
```

Example : https://otakudesu-scraping.vercel.app/release-schedule/

#### Search anime by keyword

```
/search?q=[keyword]
```

Example : https://otakudesu-scraping.vercel.app/search?q=jujutsu%20kaisen
