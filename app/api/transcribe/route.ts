// app/api/transcribe/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { SpeechClient } from '@google-cloud/speech';

const speechClient = new SpeechClient({
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
}
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    const language = (formData.get('language') as string) || 'mn-MN';

    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const audioContent = buffer.toString('base64');

    const request = {
      audio: {
        content: audioContent,
      },
      config: {
        languageCode: language,
        encoding: 'WEBM_OPUS',
        sampleRateHertz: 48000,
        audioChannelCount: 1,
        enableAutomaticPunctuation: true,
        maxAlternatives: 1,
      },
    
    };

    // Perform the transcription
    const [response] = await speechClient.recognize(request);

    // Extract the transcription
    const transcription =
      response.results
        ?.map((result) => result.alternatives?.[0].transcript)
        .join('\n') || '';

    // Return the transcription
    return NextResponse.json({
      success: true,
      transcription,
    });
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// For handling streaming via Cloud Storage or other methods
export const config = {
  api: {
    bodyParser: false,
    responseLimit: '10mb',
  },
};