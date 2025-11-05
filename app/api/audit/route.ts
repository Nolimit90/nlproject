export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextRequest, NextResponse } from 'next/server';

/**
 * 🔐 API pour l'audit PDF - Appelle n8n en passant par le serveur Next.js
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation simple
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email invalide' },
        { status: 400 }
      );
    }

    // URL du webhook n8n pour l'audit PDF
    const webhookUrl = process.env.N8N_AUDIT_WEBHOOK_URL || 'http://78.47.62.117:5678/webhook/page-audit-pdf';

    console.log('📤 Envoi email audit à n8n:', email);

    // Appel au webhook n8n (côté serveur, pas de CORS)
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source: 'audit-systeme-page',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('❌ Erreur n8n:', response.status);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi' },
        { status: 502 }
      );
    }

    console.log('✅ Email audit envoyé avec succès');

    return NextResponse.json({ 
      success: true, 
      message: 'Email envoyé avec succès' 
    });

  } catch (error: any) {
    console.error('💥 Erreur API audit:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

