"use server"

import Stripe from "stripe"


export async function createPaymentIntent(amount: number, description: string){
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    typescript: true,
    apiVersion: "2024-11-20.acacia"
  });

  const {id, description : desc, client_secret} = await stripe.paymentIntents.create({amount, description, currency: "usd"});


  return {id, description, client_secret};
}