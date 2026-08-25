import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  // 使用 FastifyAdapter 创建应用
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors({
    origin: '*', // 允许所有来源的请求
    credentials: true, // 允许发送 Cookie
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  // 使用 '::' 作为 host，解决兼容性问题 [citation:2]
  await app.listen(process.env.PORT ?? 3000, '::');
  console.log(`🚀 应用已启动: http://localhost:3000`);
}

void bootstrap();
