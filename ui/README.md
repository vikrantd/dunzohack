# ShoppinPal Category Management 

This application uses Angular5 for the front-end framework along with ngrx-store(which is basically the redux architecture of react.js)  with segregated modules according to views and components that are being utilised inside the view. It helps to maintain a central repository of data which are technically broken down to chunks of view specific data which makes independent components to talk to each other for data flexibily. 

The application allows a user to signup and then use those credentials to login or use any other existing credentials to login. The User can create a category, edit and delete it. It also allows user to add sub-categories to a parent category, traverse through the list and delete the sub-category. User can also search for the Categories and sub-categories in the system. Enhanced search has been enabled , so that if user searches the category, he will also be provided with the information of all the sub-categories contained inside categories.

# Lazy loading

The application works on the lazy loading of modules so that only when you hit the url of a corresponding module or view, it loads the corresponding module rather than loading all the modules of the application. Also lazy scroll loading has been implemented on the sub-categories view of the component. So intially the view shows you a specific count of data, and when the ui screen runs out of data it fetches next round of set of data. The intial counter of data to be shown has been set to 6.

# Breadcrumbs

The application doesnot have the exact implementation of breadcrumbs as it should be, but still it contains the traversal mode when you edit a category or a sub-category. This is basically a hack to be honest, because the UI has been designed in such a way that the scope of options of traversal on UI screen was less and the second reason being all the screens can be traversed easily with screens appearing in single page. But yes it can be always edited to contain the real time traversal as we add more options and screens to the UI.

# Notifications

The UI throws notifications for all the relevant success and unsuccessful events with relevant message.

# To run the project

Clone and npm install. After that ng serve.







