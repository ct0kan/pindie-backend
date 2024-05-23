const categoriesRouter = require('express').Router();
  
const { checkAuth } = require('../middlewares/auth');
const {
    findAllCategories,
    createCategory,
    deleteCategory,
    updateCategory,
    findCategoryById,
    checkIfCategoryExists,
    checkEmptyName,
} = require('../middlewares/categories');
const { sendAllCategories, getCategory, deleteCategoryController } = require('../controllers/categories');

categoriesRouter.get('/categories', findAllCategories, sendAllCategories);
categoriesRouter.get('/categories/:id', findCategoryById, getCategory);
categoriesRouter.post('/categories', findAllCategories, checkIfCategoryExists, checkEmptyName, checkAuth, createCategory, getCategory);
categoriesRouter.put('/categories/:id', checkEmptyName, checkAuth, updateCategory, getCategory);
categoriesRouter.delete('/categories/:id', checkAuth, deleteCategory, deleteCategoryController);

module.exports = categoriesRouter;
