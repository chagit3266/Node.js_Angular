
export const getAllCategory = async (req, res, next) => {
    try {
        let { code, desc, full } = req.query
        if(code||desc)
            full=1
        const filter = {};
        if (code) filter.code = code;
        if (desc) filter.description = { $regex: desc, $options: 'i' };
        const query = Category.find(filter);
        if (+full)
            query.populate('recipe._id');
        const categories = await query;
        res.status(200).json(categories);
    } catch (error) {
        next({ status: error.status, message: error.message });
    }
}