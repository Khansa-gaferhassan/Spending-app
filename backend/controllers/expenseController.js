

const Expense = require('../models/Expense');
const ExpenseController = {};








ExpenseController.update = async (req, res, next) => {
    const expense_id = req.params.expense_id;
    const { amount, description, created } = req.body;
    try{
   const expense=await Expense.updateOne({ _id: expense_id }, 
        { amount, description, created });
        return res.send({
            success:true
        })

   }catch(err){
       next(err)
   }

}
ExpenseController.destroy = async (req, res, next) => {
    const expense_id = req.params.expense_id;
    try {
        await Expense.deleteOne({ _id: expense_id });
        res.send({
            success: true,

        })

    } catch (err) {
        next(err)
    }
}

ExpenseController.get = async (req, res, next) => {
    const { user } = req;
    const query = {
        owner: user._id
    }
    try {
        const result = await Expense.find(query);
        return res.send({
            expense: result
        })
    } catch (err) {
        next(err)

    }
};

ExpenseController.create = async (req, res, next) => {

    const { amount, description, created } = req.body;
    const newExpense = new Expense({
        description,
        amount,
        created,
        owner: req.user
    });
    try {
        const saved = await newExpense.save();
        return res.send({
            success: true,
            expense: saved
        })


    }
    catch (err) {
        next(err)
    }
}


module.exports = ExpenseController;