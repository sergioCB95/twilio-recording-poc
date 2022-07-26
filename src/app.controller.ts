import {Controller, Get, Logger, Post, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Post('recording')
  recordingWebhook(@Res() res: Response): void {
    this.logger.log('Calling recording webhook');
    const result = this.appService.recordingWebhook();
    res.type('text/xml');
    res.send(result.toString());
  }

  @Post('transcribe')
  transcribe(@Req() req: Request): void {
    this.logger.log('Calling transcribe webhook');
    /**
     * Body
     * {
     *   RecordingSource: 'RecordVerb',
     *   RecordingSid: '',
     *   RecordingUrl: '',
     *   RecordingStatus: 'completed',
     *   RecordingChannels: '1',
     *   ErrorCode: '0',
     *   CallSid: '',
     *   RecordingStartTime: '',
     *   AccountSid: '',
     *   RecordingDuration: '4'
     * }
     */
    this.logger.log(`Body: ${JSON.stringify(req.body)}`);
  }
}
