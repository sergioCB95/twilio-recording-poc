import { Injectable } from '@nestjs/common';
import * as Twilio from 'twilio';



@Injectable()
export class AppService {
  recordingWebhook(): string {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('Hello. Please leave a message after the beep.');

    twiml.record({
      recordingStatusCallback: '/transcribe',
    });

    // End the call with <Hangup>
    twiml.hangup();

    return twiml.toString();
  }
}
