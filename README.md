 # Andela_Teamwork With PostgreSQL

[![Build Status](https://travis-ci.com/kelvinator07/Teamwork-Backend.svg?branch=develop)](https://travis-ci.com/kelvinator07/Teamwork-Backend)

[![Coverage Status](https://coveralls.io/repos/github/kelvinator07/Teamwork-Backend/badge.svg?branch=develop)](https://coveralls.io/github/kelvinator07/Teamwork-Backend?branch=develop)

[![Maintainability](https://api.codeclimate.com/v1/badges/9d24c1d56291de70ee57/maintainability)](https://codeclimate.com/github/kelvinator07/Teamwork-Backend/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/9d24c1d56291de70ee57/test_coverage)](https://codeclimate.com/github/kelvinator07/Teamwork-Backend/test_coverage)

[![Build status](https://ci.appveyor.com/api/projects/status/uq689l19p0sgtdpk?svg=true)](https://ci.appveyor.com/project/kelvinator07/teamwork-backend)


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
