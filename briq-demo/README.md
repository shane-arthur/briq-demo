# BriqDemo


## Getting Started 

`npm i @angular/cli -g --save-dev`
`cd briq-demo`
`npm i`
`npm start`

### Viewing App

After Running Npm Start, open a browser on port 4200.

### Using the App

Select Upload File Button. Choose the designated excel sheet provided. 

Table has pagination and it sortable from sq footage header

Check console for relevency scores

#### Front End Architecture

Making use of Angular 8, Angular Material, Angular CDK Table.

Page is composed of a smart container (App.component) which handles selecting and reading in the excel data.

From there, the data is passed down to a dumb table component which leverges the Mat-Table with sorting and pagination. 

All styles are encapsulated through their individual component. Material Module is exported seperately and imported into the apps main module.

##### Why Angular?
CLI allowed to create bootstrapped components quickly. Material Table integration is seemless when you define the data source.
Using any other framework would have taken 10+ hours, but with angular-cli and material, I was able to focus on data massaging right away and complete this app in 3 hours.

##### Relevency Score Logic
The count of the filtered items is taken (Square footage greater than 50K, and no mention of residential in description).

This count will give us a percentage once we divide against the whole data set which we can use as an relevency buffer percentage. 

From here, the data is already sorted by sq footage, and relecency is decreased in relation to the size of the whole set as we iterate down the set.

##### Improvments

Obviously, the nicest improvment would be to not have to upload the data set, and have the excel sheet fetched from an xhr call. (Time).

Table Layout - Deal with margins better (hassle in material since we would be overriding the glasses). (Time)

margins and colors : (Time)