import Recipe from '../models/Recipe.model'

export const getAllRecipe = async (req, res, next) => {
    try {
        const id = req.currentUser?._id || null
        let { search, limit, page } = req.query;
        let query = id ? {
            $or: [
                { isPrivate: false }, { isPrivate: true, 'owner._id': id },
            ],
        } : { isPrivate: false }
        if (search)
            query.name = { $regex: search, $options: 'i' }
        limit = +limit || await Recipe.countDocuments(query);
        const skip = ((parseInt(page) || 1) - 1) * limit;
        let recipes = await Recipe.find(query).skip(skip).limit(limit)

        res.status(200).json(recipes);
    } catch (error) {
        next({ status: error.status, message: error.message });
    }
}

export const getRecipeById = async (req, res, next) => {
    try {
        let { _id } = req.query
        let recipe = await Recipe.findById(_id)
        if (!recipe) {
            return next({ message: 'Recipe not found', status: 404 });
        }
        res.status(200).json(recipe);
    } catch (error) {
        next({ status: error.status, message: error.message });
    }
}

