const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
    include: {
      model: Product,
      as: 'products'
    }
  });
  console.log('category get')
  return res.json(categoryData)
  } catch (err) {
    res.json(err)
  }
  })

  router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    try {
      const categoryIdData = await Category.findByPk(req.params.id,
         {
          include: {
            model: Product,
            as: 'products'
          }
         
      });
      if (!categoryIdData) {
        res.status(404).json({ message: 'No category found with that id!' });
        return;
      } else {
      res.status(200).json(categoryIdData);
      }
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  router.post('/', async(req, res) => {
    // create a new category
    try {
      const userData = await Category.create(req.body);
      res.status(200).json(userData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const userData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const userData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
