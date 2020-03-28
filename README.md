# Indebrau Frontend

## Development
1. Prerequisites: Node v13.5.0

2. Rename '.env.sample' to '.env' and adjust values

3. Install and run:
```sh
npm install
npm run dev
```

## Deployment
Build latest docker image:
```
docker build -t indebrau/indebrau-frontend .
```
Then, use docker-compose scripts from main repository.


## Current Issues
"react-apollo" has to be at version "2.5.6"
"next-with-apollo" has to be at version "4.3.0" (get rid of this..)