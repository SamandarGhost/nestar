import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCG_TOP_AGENTS, BATCG_TOP_PROPERTIES, BATCG_TOP_ROLLBACK } from './lib/config';

@Controller()
export class BatchController {
  private logger: Logger = new Logger('BatchController');
  constructor(private readonly batchService: BatchService) { }

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }

  @Timeout(1000)
  handleTimeout() {
    this.logger.debug('Batch Server Ready');
  }

  @Cron('00 * * * * *', { name: BATCG_TOP_ROLLBACK })
  public async batchRollback() {
    try {
      this.logger['context'] = BATCG_TOP_ROLLBACK;
      this.logger.debug('Ecxecuted');
      await this.batchService.batchRollback();
    } catch (err) {
      this.logger.error('Error on batchRollback:', err)
    }
  }

  @Cron('20 * * * * *', { name: BATCG_TOP_PROPERTIES })
  public async batchProperties() {
    try {
      this.logger['context'] = BATCG_TOP_PROPERTIES;
      this.logger.debug('Ecxecuted');
      await this.batchService.batchProperties();
    } catch (err) {
      this.logger.error('Error on batchProperties:', err)
    }
  }

  @Cron('40 * * * * *', { name: BATCG_TOP_AGENTS })
  public async batchAgents() {
    try {
      this.logger['context'] = BATCG_TOP_AGENTS;
      this.logger.debug('Ecxecuted');
      await this.batchService.batchAgents();
    } catch (err) {
      this.logger.error('Error on batchAgents:', err)
    }
  }



  /*
    @Interval(1000)
    handleInterval() {
        this.logger.debug('Interval Test');
    }
  */
}
