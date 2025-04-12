import img1 from './assets/lunch.jpg';
import img2 from './assets/dinner.jpg';
import img3 from './assets/snack.jpg';
import img4 from './assets/dessert.jpg';
import img5 from './assets/side_dish.jpg';
import img6 from './assets/appetizer.jpg';
import img7 from './assets/breakfast.jpg';
import img8 from './assets/beverage.jpg';


export const mealTypes = [
  {
    id: 1,
    name: "Lunch",
    img: img1,
  },

  {
    id: 2,
    name: "Dinner",
    img: img2,
  },

  {
    id: 3,
    name: "Snack",
    img: img3,
  },

  {
    id: 4,
    name: "Dessert",
    img: img4,
  },

  {
    id: 5,
    name: "Side Dish",
    img: img5,
  },

  {
    id: 6,
    name: "Appetizer",
    img: img6,
  },

  {
    id: 7,
    name: "Breakfast",
    img: img7,
  },

  {
    id: 8,
    name: "Beverage",
    img: img8,
  },
];

export const sortValues = [
  {
    id: 1,
    sortBy: "id",
    order: "asc",
    name: "Default",
  },

  {
    id: 2,
    sortBy: "rating",
    order: "asc",
    name: "Rating",
  },

  {
    id: 3,
    sortBy: "rating",
    order: "desc",
    name: "Rating",
  },

  {
    id: 4,
    sortBy: "reviewCount",
    order: "asc",
    name: "Comments",
  },

  {
    id: 5,
    sortBy: "reviewCount",
    order: "desc",
    name: "Comments",
  },

  {
    id: 6,
    sortBy: "cookTimeMinutes",
    order: "asc",
    name: "Time",
  },

  {
    id: 7,
    sortBy: "cookTimeMinutes",
    order: "desc",
    name: "Time",
  },
];

export const recipesPerPage = [
  {
    id: 1,
    value: 10,
  },

  {
    id: 2,
    value: 20,
  },

  {
    id: 3,
    value: 30,
  }
]
