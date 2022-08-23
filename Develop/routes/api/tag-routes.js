const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: {
      model: Product,
      as: 'products'
    }
  }
  );
  console.log('tag get')
  return res.json(tagData)
});

router.get('/:id', async (req, res) => {
  
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagIdData = await Tag.findByPk(req.params.id,
       {
        include:[ {
          model: Product,
          as: 'products'
        }
  
      ]
    });

    if (!tagIdData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    } else {
    res.status(200).json(tagIdData);
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }


});

router.post('/', async (req, res) => {
   // create a new tag
  try {
    const userData = await Tag.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  try {
    const userData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }

});

  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const userData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
