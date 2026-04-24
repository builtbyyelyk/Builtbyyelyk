import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { paymentMethodId, priceType, userId, email } = req.body;

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    let customer;
    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({ email, payment_method: paymentMethodId });
    }

    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId }
    });

   const priceId = priceType === 'annual'
      ? 'price_1TCk98IiCMt6oiqgTLdx5MTz'
      : 'price_1TCk7sIiCMt6oiqg5qyK8eHm'

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: { payment_method_types: ['card'], save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    });

    const paymentIntent = subscription.latest_invoice.payment_intent;

    if (paymentIntent.status === 'succeeded') {
      await supabase
        .from('user_profiles')
        .update({ plan: 'pro', stripe_customer_id: customer.id, stripe_subscription_id: subscription.id })
        .eq('id', userId);

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({
      requiresAction: true,
      clientSecret: paymentIntent.client_secret
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
