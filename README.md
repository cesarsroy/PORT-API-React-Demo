# React TypeScript PORT API Demo

## Overview

- This project contains a React application written in Typescript to show the different client-facing endpoints of Bloomberg PORT Enterprise API.
  - Only enterprise clients that subscribe to the full PORT Enterprise package will be able to access the API.
- The application is only for demonstration purposes. It is not meant to be used for any other purpose.

## Technology Used

- The project uses some react open source packages and axios for the https requests.
- react-query is used to wrap the axios requests and offer server state management (caching and error handling)

## Manual Deployment

- Install nodejs and npm in your computer.
- Copy all the files into a directory and navigate from the command console to that directory.
- Then run `npm install`
- To test the application in development mode run `npm run dev`.
- ** Make sure you open the http://localhost address in a web browser that has the CORS policy disabled. ** Otherwise the web browser will block the requests because PORT API endpoints do not whitelist all domains for Cross Origin requests.

## Docker Deployment

- You can simply use the `Dockerfile` in the project to build an image and run a container.
- Make sure you have docker installed in your computer. Then run
- `docker build -t port-api-react .` to build an image the the name port-api-react
- `docker run -p 3000:3000 port-api-react` to run the container exposing the port 3000 in the host machine.
