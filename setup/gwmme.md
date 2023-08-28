# Using GWMME to migrate mailbox to Google Workspace

## Prerequisites

1. user profile
2. service account key (google cloud)
3. google workspace migration for microsoft exchange
4. windows server for migration

## Target
For whom who using on-permises linux mail server with self-signed certificate

## Step 1: create a service account on Google Cloud

1. Navigate to [Google Cloud console](https://console.cloud.google.com)
2. Create a new project [Name: gws-migration]
3. Choose the project cretaed before as deafult
4. open Cloud Shell and run the following command:
   ```bash
   python3 <(curl -s -S -L https://git.io/gwmme-create-service-account)
   ```
5. Download the json file which contains the service account's client ID to the local host

## Step 2: GWMME configuration

Input the information as following:

IMAP Server type: Other IMAP Server
Hostname:
IMAP Security:
IMAP port:

Google Workspace doamin name:
Google Workspace admin user:
service account credentials file:

File of accounts to migrate: 

## Step 3: Migrating mailbox to Google Workspace
