import sanityStripeMiddleware from '../../../../server/middleware/sanityStripeMiddleware.js'

export const createStripeProducts = async (req, res) => {
  try {
   await sanityStripeMiddleware(req, res)
  } catch (err) {
    return { status: 'Error', err: err?.response?.data };
  }

  return res.status(200).json('Stripe Product Created');
}
