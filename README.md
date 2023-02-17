# Management API

## Introduction

[Link Shortener] This API is capable of generating 5-character ids and saving them in the database and making searches available with that id that returns the original size url.

## Feature

- Products management;

## How to run

1. install project project dependencies:

   `yarn install`

2. Copy `.env.example` located at the root folder to a new `.env` file and fill it with the credentials that you have set up on the past steps.

3. Copy `orm.config.example.json` located in the root folder to a new `orm.config.json` file and fill it with credentials.

4. to generate entities follow the steps below.

   `yarn prisma generate`

5. Run project:

   `yarn dev`
