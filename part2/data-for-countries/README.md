### Solutions for part2 data-for-countries.

Exercises of part2 are divided in subparts. You can find the solutions for every subpart in their respective folder. This code makes use of the weatherstack api. You need an api_key to retrieve the weather data. Store your own key in a .env file as REACT_APP_API_KEY.

### Exercise part2 data-for-countries

Create an application, in which one can look at data of various countries. The country to be shown is found by typing a search query into the search field. If there are too many (over 10) countries that match the query, then the user is prompted to make their query more specific. If there are fewer than ten countries, but more than one, then all countries matching the query are shown. When there is only one country matching the query, then the basic data of the country, its flag and the languages spoken in that country are shown.
NB: it is enough that your application works for most of the countries. Some countries, like Sudan, can cause trouble, since the name of the country is part of the name of another country, South Sudan. You need not worry about these edge cases.

Improve on the application in the previous exercise, such that when the names of multiple countries are shown on the page there is a button next to the name of the country, which when pressed shows the view for that country.

Add to the view showing the data of a single country the weather report for the capital of that country.

More info about the exercises can be found here: https://fullstackopen.com/en/part2/getting_data_from_server
