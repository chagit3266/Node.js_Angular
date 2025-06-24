import { JoiCategorySchema } from '../models/Category.model.js'
import Category from '../models/Category.model.js';

//id כאן נמחוק לפי 
//כי הקטגוריה ודאי כבר קיימת
export const removeRecipeFromCategories = async (recipe) => {
    for (const cat of recipe.categories) {

        const { error } = JoiCategorySchema.reference.validate(cat);
        if (error) continue;

        const category = await Category.findOne({ code: cat.code });
        if (!category) continue;

        //נמחוק את המתכון מתוך המערך
        await category.save();
    }
}

//nameCategory כאן נוסיף לפי
//כי לא בטוח הקטגוריה כבר קיימת
export const addRecipeToCategories = async (recipe, categories) => {
    //cat={name:"",code:""}
    for (const cat of recipe.categories) {

        let category = null;

        const { error: refError, value: refValue } = JoiCategorySchema.reference.validate(cat);//ננסה לבדוק אם הקטגוריה קיימת ע"י קוד

        category = await codeExist(refValue?.code)// מנסה למצוא במאגר את הקטגוריה
        //אם לא קיים קוד תקין
        if (refError || !category) {
            //צריך לבדוק אם השם קיים
            category = await nameExist(refValue?.name)
            //ואם לא ליצור קטגוריה חדשה
            if (!category) {
                // נוודא שהמידע מספיק כדי ליצור קטגוריה חדשה
                const { error: createError, value: createValue } = JoiCategorySchema.create.validate(cat);
                if (createError) {//אם אא ליצור קטגוריה עם השם שנשלח
                    throw {
                        status: 400,
                        message: `Invalid category data: ${createError.details[0].message}`
                    }
                };
                category = new Category({
                    ...createValue
                })
            }
        }
        //להוסיף את המתכון או לקטגוריה החדשה או לקיימת
        const { error, value } = JoiCategorySchema.recipeRef.validate(recipe)
        if (error) continue;
        const exists = category.recipes.some(r => r._id.toString() === recipe._id.toString());
        if (!exists) {
            category.recipes.push(value);
            await category.save();
        }
    }
}

const nameExist = async (name) => {
    const category = await Category.findOne({ description: name });
    return category;
}
const codeExist = async (code) => {
    const category = await Category.findOne({ code });
    return category;
}