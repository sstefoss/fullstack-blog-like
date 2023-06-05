# Setup

## Step 1: Run setup.sh

Running the `setup.sh` script will install all services using Docker.

```
$ sh setup.sh
```

## Step 2: Import hasura metadata file

Navigate to [http://localhost:8080/console/settings/metadata-actions](metadata actions) and select "Import metadata".

Select `hasura_medata.json` file from inside ./db folder.

## Step 3: Ready

Navigate to [http://localhost:3000](http://localhost:3000) to see the project in action.