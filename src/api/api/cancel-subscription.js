import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, subscriptionId } = req.body;

  try {
    await stripe.subscriptions.cancel(subscriptionId);
    await supabase
      .from('user_profiles')
      .update({ plan: 'free', stripe_subscription_id: null })
      .eq('id', userId);

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
