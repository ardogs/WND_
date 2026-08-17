import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import testRoutes from './routes/test.routes';
import settingsRoutes from './routes/settings.routes';
import supplierRoutes from './routes/supplier.routes';
import quotationRoutes from './routes/quotation.routes';
import path from 'path';
import { getAppBasePath } from './config/paths';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas estáticas seguras para Electron
const basePath = getAppBasePath();
app.use('/static', express.static(path.join(basePath, 'public')));
app.use('/static', express.static(path.join(basePath, 'dist')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/quotations', quotationRoutes);

export default app;