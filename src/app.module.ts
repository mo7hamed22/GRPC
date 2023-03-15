import { Module } from '@nestjs/common';
import { connect } from 'nats';

import { UserModule } from './users/user.Module';
@Module({
  imports: [UserModule],
})

export class AppModule { }
