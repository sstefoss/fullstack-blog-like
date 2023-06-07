# About this repo

This repo features a fullstack setup using __Hasura__, __Postgres__ and __Apollo__. 

During the installation process the database gets seeded by a list of 100 posts, fetched from https://jsonplaceholder.typicode.com/. The auth process is handled using __JWT__ and an authorized user is allowed to react on the prepopulated posts by liking or disliking them. Inside the user's profile he is also able to use filters and options for liking/disliking them all as showing below:

<img width="1440" alt="Screenshot 2023-06-07 at 12 42 00" src="https://github.com/sstefoss/fullstack-blog-like/assets/912232/a3850e19-6842-4158-b451-3fcbdb2efadc">


# Setup

## Step 1: Run setup.sh

Running the `setup.sh` script will install all services using Docker.

```
$ sh setup.sh
```

## Step 2: Import hasura metadata file

In Hasura console, navigate to  [metadata actions](http://localhost:8080/console/settings/metadata-actions)  and select __Import metadata__.

Select [hasura_metadadata.json](https://github.com/sstefoss/fullstack-blog-like/blob/master/db/hasura_metadata.json) file from inside __./db__ folder.

## Step 3: Ready

Navigate to [http://localhost:3000](http://localhost:3000) to see the project in action.
