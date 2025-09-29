"use server";

import { auth } from "@clerk/nextjs/server";
import stripe from "@/lib/stripe";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string; // أضفناه هنا
  address?: string; // JSON.stringify({...})
};

export async function createCheckoutSession(
  lineItems: { name: string; description?: string; image?: string; unit_amount: number; quantity: number }[],
  metadata: Metadata
) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized - user not signed in");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems.map(item => ({
      price_data: {
        currency: "usd", // أو أي عملة
        product_data: {
          name: item.name,
          description: item.description || "",
          images: item.image ? [item.image] : [],
        },
        unit_amount: item.unit_amount, // بالسنت
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    metadata: {
      ...metadata,
      clerkUserId: userId,
    },
  });

  return session.url;
}
