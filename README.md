# Travel Planning Website

### About
Set up travel groups with your friends or family. Collaborate and add itinerary items for your trip.

### Dependencies
If you need to run the uploadTestData.sh file to upload test data to your postgres database, [jq](https://jqlang.github.io/jq/) is required.

Install with homebrew:
```
brew install jq
```

### Secrets and Database management for development
Secret keys are imported from the file ***server/secrets/secrets.json.*** Therefore to do proper testing, create a file at this location following the templates outlined in ***docs/secret-example/example.json.***

### Starting dev server
To start run
```
npm install
npm run dev
```

This will start a webpack development page on http://localhost:8080 and server on http://localhost:3000

Remember to clear cookie often in development instance.
