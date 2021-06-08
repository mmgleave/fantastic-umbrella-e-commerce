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
    res.status(500).json({ message: 'Category Not Found' });
  });
});

// create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(500).json({ messasge: 'Failed to Add Category'});
  });
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {category_name: req.body.category_name},
    {where: {id: req.params.id}}
  )
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(500).json({ message: 'Failed to Update Category'});
  })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy(
    {where: {id: req.params.id}}
  )
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    res.status(500).json({ message: 'Failed to Delete Category'});
  })
});

module.exports = router;
