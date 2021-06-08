const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: [
          'id', 
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(500).json({ message: 'Request Failed' });
  })
  // be sure to include its associated Products
});

  // find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'product_name',
          'price',
          'stock',
          'category_id'
        ]
      }
    ]
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(404).json({ message: 'Category Not Found' });
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
