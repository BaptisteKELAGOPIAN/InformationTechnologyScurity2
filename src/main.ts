import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as https from 'https';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
    // Lire les certificats SSL/TLS
    const httpsOptions = {
        key: fs.readFileSync('./privkey.pem'), // Utiliser la nouvelle clé privée
        cert: fs.readFileSync('./fullchain.pem'),
        // passphrase:'VGTU',
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });

    const corsOptions: CorsOptions = {
        origin: 'https://localhost:5173',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
        optionsSuccessStatus: 200,
    };

    app.enableCors(corsOptions);

    await app.listen(3000);
}

bootstrap();

