import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const product = await stripe.products.create({
        name: req.body.title,
        product: req.body.slug.current,
        description: req.body.blurb.en,
        images: `https://cdn.sanity.io/images/dymq6s3c/production/${req.body.defaultProductVariant.images.assets._ref}`,
      });
      // const price = await stripe.prices.create({
      //   unit_amount: req.body.defaultProductVariant.price,
      //   currency: 'eur',
      //   product: req.body.slug.current,
      // });

      res.status(200).json('Sanity-Stripe-Middleware Successfully Created Product');
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
