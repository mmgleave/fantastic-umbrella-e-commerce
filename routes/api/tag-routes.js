const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
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
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json({ message: 'Request Failed'});
  });
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
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
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json({ message: 'Tag Not Found' });
  });
});

  // create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json({ message: 'Tag Not Created'});
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {tag_name: req.body.tag_name},
    {where: {id: req.params.id}}
  )
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json({ message: 'Tag Not Updated'});
  });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy(
    {where: {id: req.params.id}}
  )
  .then(tagData => res.json(tagData))
  .catch(err => {
    res.status(500).json({ message: 'Tag Not Deleted'});
  });
});

module.exports = router;
