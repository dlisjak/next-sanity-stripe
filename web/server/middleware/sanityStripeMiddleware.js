const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);

export default function sanityStripeMiddleware(req, res) {
  if (req.body) {
    const product = await stripe.products.create({
      name: req.body.title,
      product: req.body.slug.current,
      description: req.body.blurb.en,
      images: `https://cdn.sanity.io/images/dymq6s3c/production/${req.body.defaultProductVariant.images.assets._ref}`,

    }).then(stripe.prices.create({
        unit_amount: req.body.defaultProductVariant.price,
        currency: 'eur',
        product: req.body.slug.current,
      })).catch(err => {throw new Error('Stripe Failed To Create A Product n/', err)});

      return res.status(200).json({ message: 'Sanity-Stripe-Middleware Successfully Created Product' })
  }
  return res.status(401).json({ message: 'Sanity-Stripe-Middleware Failed' })
}
