 # Andela_Teamwork With PostgreSQL

[![Build Status](https://travis-ci.org/kelvinator07/Andela_Teamwork.svg?branch=develop)](https://travis-ci.org/kelvinator07/Andela_Teamwork)

[![Coverage Status](https://coveralls.io/repos/github/kelvinator07/Andela_Teamwork/badge.svg?branch=develop)](https://coveralls.io/github/kelvinator07/Andela_Teamwork?branch=develop)

Project Overview: Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.



## How to install this app

1. Clone the repository
1. Create a `.env` file and define the following environment variables
  
    1. CONNECTION_STRING (required): This is the connection string to a PostgreSQL database.
    1. PORT (optional): The port to serve the app from.

1. start the dev server with `yarn startdev`.
1. Start the production server with `yarn start`. The command outputs a production build, then serves it.

## How to test

1. Run the command `yarn test`
