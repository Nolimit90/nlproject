export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📥 Received payload:', JSON.stringify(body, null, 2));

    const { firstName, lastName, email, telephone, pack, message } = body;

    if (!firstName || !lastName || !email || !message || !pack) {
      console.log('❌ Validation failed - missing required fields');
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const n8nPayload = {
      nom: `${firstName} ${lastName}`,
      email: email,
      telephone: telephone,
      pack: pack,
      message: message,
    };

    console.log('📤 Sending payload to n8n:', JSON.stringify(n8nPayload, null, 2));

    const n8nWebhookUrl = 'https://automation.nlproject.site/webhook/nl-project-contact';

    const res = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify(n8nPayload),
    });

    console.log('📥 n8n response status:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Error from n8n: ${n8nWebhookUrl}, Status: ${res.status}, Error: ${errorText}`);
      return NextResponse.json(
        { success: false, status: res.status, error: errorText },
        { status: 502 }
      );
    }

    console.log('✅ Payload successfully sent to n8n');
    return NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: any) {
    console.error('💥 Global API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}



















