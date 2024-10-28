const sortByPrice = (hotelList, isAscending) => {
  if (isAscending) {
    return hotelList.slice().sort((a, b) => a['price'] - b['price']);
  } else {
    return hotelList.slice().sort((a, b) => b['price'] - a['price']);
  }
};

const sortByRating = (hotelList, isAscending) => {
  if (isAscending) {
    return hotelList.slice().sort((a, b) => a['rating'] - b['rating']);
  } else {
    return hotelList.slice().sort((a, b) => b['rating'] - a['rating']);
  }
};

const sortByReviews = (hotelList, isAscending) => {
  if (isAscending) {
    return hotelList.slice().sort((a, b) => a['reviews'] - b['reviews']);
  } else {
    return hotelList.slice().sort((a, b) => b['reviews'] - a['reviews']);
  }
};



const filterByAmenity = (hotelList, userAmenity) => {
  return filterByText(hotelList, 'amenity', userAmenity);
};

const filterByCountry = (hotelList, userCountry) => {
  return filterByText(hotelList, 'country', userCountry);
};

const filterByCategory = (hotelList, userCategory) => {
  return filterByText(hotelList, 'category', userCategory);
};

const filterByText = (elements, attribute, key) => {
  let filteredElements = [];

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];

    if (element[attribute].toLowerCase() === key.toLowerCase()) {
      filteredElements.push(element);
    }
  }

  return filteredElements;
};

module.exports = {
  filterByAmenity,
  filterByCountry,
  filterByCategory,
  sortByPrice,
  sortByRating,
  sortByReviews
};
