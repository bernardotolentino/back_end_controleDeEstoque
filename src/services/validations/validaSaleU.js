const { saleSchema } = require('./schema');

const validateNewSale = (newSale) => {
  const { error } = saleSchema.validate(newSale);

  if (error) {
    const type = error.details[0].type === 'any.required' ? 'VALUE_REQUIRED' : 'INVALID_VALUE';
    return {
      type,
      message: error.message.replace(/\[\d+\]\./, ''),
    };
  }
};

module.exports = { validateNewSale };