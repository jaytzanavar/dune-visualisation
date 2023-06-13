# Server Dune for Smardex Project
#### How to query data

For testing purposes utilise API2.Rest file while having installed the Extension REST Client (auth: Huachao Mao)

Perform queries as in postman by adding as an id pararm your query id
ex. GET http://localhost:8080/query/volume/2620571 get  pairs in SMARDEX DEX total volume
 GET http://localhost:8080/query/volume/2632547 get SDEX related pairs total volume

 Also adjust properly your connection with your local Frontend url
 
 ### Important 
 Add to your .env file your proper API key generated in Dune.com
 https://dune.com/settings/api