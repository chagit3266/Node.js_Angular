import Recipe from '../models/Recipe.model.js'

export const getAllRecipe = async (req, res, next) => {
    try {
        const id = req.currentUser?._id || null
        let { search, limit, page } = req.query;
        const maxTime = parseInt(req.query.maxTime)
        let query = id ? {
            $or: [
                { isPrivate: false }, { isPrivate: true, 'owner._id': id },
            ],
        } : { isPrivate: false }
        if (search)
            query.name = { $regex: search, $options: 'i' }
        if (!isNaN(maxTime))
            query.preparationTime = { $lte: maxTime }
        limit = parseInt.max(+limit || await Recipe.countDocuments(query), 1);//ע"מ למנוי ערכים שליליים
        const skip = ((parseInt(page) || 1) - 1) * limit;
        let recipes = await Recipe.find(query).skip(skip).limit(limit)

        res.status(200).json(recipes);
    } catch (error) {
        next({ status: error.status, message: error.message });
    }
}
//צריך לשים לב אם הוא רוצה מתכון שהוא פרטי אז לא להחזיר
export const getRecipeById = async (req, res, next) => {
    try {
        const idOwner = req.currentUser?._id || null
        let { _id } = req.query
        let recipe = await Recipe.findById(_id)
        if (!recipe || recipe.owner._id!==idOwner) {
            return next({ message: 'Recipe not found', status: 404 });
        }
        res.status(200).json(recipe);
    } catch (error) {
        next({ status: error.status, message: error.message });
    }
}

// export const getRecipeByPrepTime = async (req, res, next) => {
//     try {
//         const maxTime = parseInt(req.query.maxTime)
//         if (isNaN(maxTime))
//             return next({ status: 400, message: 'Invalid or missing maxPrepTime parameter' });
//         const id = req.currentUser?._id || null
//         let query = id ? {
//             $or: [
//                 { isPrivate: false }, { isPrivate: true, 'owner._id': id },
//             ],
//         } : { isPrivate: false }
//         query.preparationTime = { $lte: maxTime }
//         let recipes = await Recipe.find(query)
//     } catch (error) {
//         next({ status: error.status, message: error.message });
//     }
// }

export const addRecipe = async (req, res, next) => {
    try {
        const recipe = new Recipe({
            ...req.body,
            owner: req.currentUser,
        })
        const save = await recipe.save();
        //צריך לעדכן גם את הקטגוריות
        res.status(201).json(save);
    } catch (error) {
        next({ status: error.status, message: error.message });
    }
}


export const updateRecipe = async (req, res, next) => {
    try {
        const { _id } = req.query
    } catch (error) {

    }
}

export const deleteRecipe = async (req, res, next) => {
    try {

    } catch (error) {

    }
}