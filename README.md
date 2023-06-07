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