import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs';

function getEnvFilePaths(): string[] {
  console.log('>>> process.env.APP_NAME:', process.env.APP_NAME);
  console.log('>>> process.env.NODE_ENV:', process.env.NODE_ENV);

  const appName = process.env.APP_NAME || 'api'; // fallback if not set
  const env = process.env.NODE_ENV || 'development';
  console.log(appName);

  const appEnvFile = path.resolve(__dirname, `../../../apps/${appName}/.env`);
  const appEnvFileSpecific = path.resolve(
    __dirname,
    `../../../apps/${appName}/.env.${env}`,
  );

  const files: string[] = [];
  if (fs.existsSync(appEnvFileSpecific)) files.push(appEnvFileSpecific);
  if (fs.existsSync(appEnvFile)) files.push(appEnvFile);

  return files;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnvFilePaths(),
      expandVariables: true,
    }),
  ],
  exports: [ConfigModule],
})
export class SharedConfigModule {}
