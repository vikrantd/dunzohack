# DunzoHack Codebase

## Demo URL
http://34.93.155.59

Its a 2 page application. The first page 'Stores' has catalogued stores, clicking on store will give you categories of that store and again clicking on categories will give you all the products which belong to that category and store.
The second page is the 'Analyse' page, where you will list of all the images which are not yet processed, you can click on the analyze button at the most right in the row to extract data from the receipt.
After clicking on analyze you will see the extracted data in a tabular form, you can correct the data and hit Save to catalogue from the analyzed receipt.

There is a search bar at the top which will fetch you the products catalogued with the store names they are present in.

## Basic Architecture Design

https://drive.google.com/open?id=1hrs5AfHX88-MTKavOEbIaI5rkS6LFcHW

## Project Structure

### API

Written in NodeJs, communicates with mysqlDB, cloud Vision API, deskew python microservice and UI
Service URL : http://34.93.29.233/api


### UI

Wriiten in Angular@5.0 with ngrx architecture. 
Service URL : http://34.93.155.59

### Deskew Python Microservice 

Uses numpy, alyn, cv2 to deskew images


### Node Deskew Server

This is API wrapper for the python class for Deskew microservice. This service takes a post request and returns the url of the deskewed image

curl -X POST \
http://34.93.117.224/ \
-d '{
"image":
"http://34.93.117.224/public/test.jpeg"
}'

Service URL : http://34.93.117.224/








