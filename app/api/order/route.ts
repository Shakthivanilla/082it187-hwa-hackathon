import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      orderNumber,
      totalAmount,
      currency,
      deliveryAddress,
      paymentMethod,
      upiId,
      smsEnabled,
      whatsappEnabled,
    } = body;

    // Generate a realistic order number
    const generatedOrderNumber = `FG-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      status: "success",
      orderId: generatedOrderNumber,
      paymentStatus: "test-mode",
      deliveryEstimate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      smsSent: smsEnabled,
      whatsappSent: whatsappEnabled,
    };

    return NextResponse.json(orderData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Failed to process order" },
      { status: 500 }
    );
  }
}