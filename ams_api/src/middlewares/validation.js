import joi from "joi";

const accountUpdateInputSchema = joi.object({
  accountId: joi.number().required().message("Account ID is required"),
  customerId: joi.number().required().message("Customer ID is required"),
});

export const accountAuth = (req, res, next) => {
  const { customerId } = req.params;

  if (!customerId || isNaN(customerId)) {
    // Check if id is not provided or is not a number
    return res.status(400).json({ status: 400, error: "Bad request" });
  }

  next();
};

export const inputValidation = (req, res, next) => {
  const { error, value } = validationSchema.validate(input);
  if(error){
    return res.json({status: 400, error: error.message});
  }
  next();
};
