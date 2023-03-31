## Project: Service Information Management Branch (IMB) Web Application Catalogue

The **IMB Web App Catalogue** project is a web application to track and manage web applications developed by the IMB team.
Users access data through the UI and can perform four basic operations **(CRUD)** – **Create, Read, Update, and Delete**.

## Installing the IMB Catalogue

- Clone the project
- This project require Node.js. [How to install](https://www.knowledgehut.com/blog/web-development/install-node-js-and-npm) 
- In the project folder in the [Visual Studio Code](https://code.visualstudio.com/) terminal  run `npm install` then `npm run dev `
- Go to http://localhost:3000/ in your browser

## API Component

- API endpoins are utilized by the Frontend component.
- All endpoints originate from `http://localhost:3000/api`.
- User Authentication/Authorization is not required.
- A health endpoint that returns a http 200 response indicates that the component is healthy
- All GET, POST, PUT and DELETE endpoints return the proper response codes when consumed.

##### Sample JSON Schema

```javascript
{
        productId: VALUE,
        productName: VALUE,
        productOwnerName: VALUE,
        Developers: [
         "NAME_1",
         "NAME_2",
         "NAME_3",
         "NAME_4",
         "NAME_5"
        ],
        scrumMasterName: VALUE,
        startDate: "YYYY/MM/DD",
        methodology: VALUE
    }
```
## Frontend Component

The frontend component has been developed using **React.js** library and **Next.js** framework . The frontend utilizes endpoints developed in the API to provide with basic CRUD actions described in the user stories provided.

The frontend comprises of a basic table or data table that displays information related to the listed Web Applications.

## User Stories

#### User Story One - List functionality
As Lisa, I want to see a list of all products that IMB currently develops or maintains in a list view. Given that I don't need to be an authorized user. When I navigate to the application landing page I can see a list of all products within IMB and all relevant information related to each product.

- Product Number
- Product Name
- Scrum Master
- Product Owner
- Developer Names (up to 5)
- Start Date
- Methodology (Agile or Waterfall)

##### Acceptance Criteria

- All columns fit on the page.
- I can see a title for each column.
- I can see a total number of all products at IMB.

#### User Story Two - Add New Item functionality
As Lisa, I want to be able to add a product to the list of products that IMB is developing or maintaining. Given that I am on the product view list, when I click the add new product call to action button, I am able to answer the following questions on a form:

- Product Name
- Scrum Master
- Product Owner
- Developer Names (up to 5)
- Start Date
- Methodology (Agile or Waterfall)

##### Acceptance Criteria

- Product number generated is automatic, and doesn't collide with previously generated product IDs.
- User must answer all questions in order to be able to save the form.
- Click on save button will store new record.

#### User Story Three - Edit/Add functionality
As Alan, I want to be able to add or edit product related information so that I can ensure that product data is accurate.

Given that I don't need to be an authorized user when I am on the list page and I click on an edit button. Then I am able to edit the following fields:

- Scrum Master
- Product Owner
- Developer Names (up to 5)
- Methodology (Agile or Waterfall)
- EDIT March 27, 2023
- Product Name

##### Acceptance Criteria

- Call to action button for saving exits.
- I can see my changes saved immediately
- Data created or edited is persistent through the event of a page refresh

#### User Story Four - Search for scrum master functionality
As Lisa, I want to search for a specific Scrum Master name so that I can see all of the products that they are currently working on.

Given that I don't need to be an authorized user when I am on the list view page. Then I can search for a specific person in the Scrum Master role

##### Acceptance Criteria

- All columns fit on the page
- I can see a title for each column
- I can see a total number of all products the Scrum Master is in
- The only products listed include the Scrum Master Name

#### User Story Five - Search for developer functionality
As Alan, I want to search for a specific Developer name so that I can see all of the products that they are currently working on.

Given that I don't need to be an authorized user when I am on the list view page. I can search for a specific developer.

##### Acceptance Criteria

- All columns fit on the page.
- I can see a title for each column.
- I can see a total number of all products the Developer being searched for is working on.
- Only products where the developer is assigned to are shown.

#### LICENCE
https://choosealicense.com/
