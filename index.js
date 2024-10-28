const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const { loadHotels } = require('./hotels');
const {
  filterByAmenity,
  filterByCountry,
  filterByCategory,
  sortByPrice,
  sortByRating,
  sortByReviews,
} = require('./filter');

const app = express();
const port = 3000;

app.use(cors());

// Load Hotels
let hotelList = loadHotels();

const SORT_LOW_TO_HIGH = 'low-to-high';
const SORT_HIGH_TO_LOW = 'high-to-low';

const SORT_LEAST_TO_MOST = 'least-to-most';
const SORT_MOST_TO_LEAST = 'most-to-least';

const sendResult = (res, obj) => {
  res.send({hotels: obj})
}

app.get('/hotels/sort/pricing', (req, res) => {
  let userPricing = req.query.pricing;
  let sortedHotelList = [];

  switch (userPricing) {
    case SORT_HIGH_TO_LOW:
      sortedHotelList = sortByPrice(hotelList, false);
      sendResult(res, sortedHotelList);
      break;
    case SORT_LOW_TO_HIGH:
      sortedHotelList = sortByPrice(hotelList, true);
      sendResult(res, sortedHotelList);
      break;
    default:
      res.statusCode = 400;
      res.send('invalid price value: ' + userPricing);
  }
});

app.get('/hotels/sort/rating', (req, res) => {
  let userRating = req.query.rating;
  let sortedHotelList = [];

  switch (userRating) {
    case SORT_HIGH_TO_LOW:
      sortedHotelList = sortByRating(hotelList, false);
      sendResult(res, sortedHotelList);
      break;
    case SORT_LOW_TO_HIGH:
      sortedHotelList = sortByRating(hotelList, true);
      sendResult(res, sortedHotelList);
      break;
    default:
      res.statusCode = 400;
      res.send('invalid rating value: ' + userRating);
  }
});

app.get('/hotels/sort/reviews', (req, res) => {
  let userReviews = req.query.reviews;
  let sortedHotelList = [];

  switch (userReviews) {
    case SORT_MOST_TO_LEAST:
      sortedHotelList = sortByReviews(hotelList, false);
      sendResult(res, sortedHotelList);
      break;
    case SORT_LEAST_TO_MOST:
      sortedHotelList = sortByReviews(hotelList, true);
      sendResult(res, sortedHotelList);
      break;
    default:
      res.statusCode = 400;
      res.send('invalid reviews value: ' + userReviews);
  }
});

app.get('/hotels/filter/amenity', (req, res) => {
  sendResult(res, filterByAmenity(hotelList, req.query.amenity));
});

app.get('/hotels/filter/country', (req, res) => {
  sendResult(res, filterByCountry(hotelList, req.query.country));
});

app.get('/hotels/filter/category', (req, res) => {
  console.log(req.query.category);
  sendResult(res, filterByCategory(hotelList, req.query.category));
});

app.get('/hotels', (req, res) => {
  sendResult(res, hotelList);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
