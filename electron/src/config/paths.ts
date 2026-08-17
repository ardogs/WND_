import { app } from 'electron';
import path from 'path';
import fs from 'fs';

/**
 * Obtiene la ruta base de la aplicación.
 * En Electron empaquetado/desarrollo usa app.getAppPath(), o process.cwd() como fallback.
 */
export const getAppBasePath = (): string => {
    try {
        if (app && typeof app.getAppPath === 'function') {
            return app.getAppPath();
        }
    } catch {
        // Fallback si no está en contexto de Electron
    }
    return process.cwd();
};

/**
 * Obtiene la ruta de la plantilla Excel de cotizaciones.
 * Busca en orden de prioridad:
 * 1. public/templates/ dentro del appPath (desarrollo / raíz)
 * 2. dist/templates/ dentro del appPath
 * 3. Carpeta de recursos de Electron (process.resourcesPath)
 * 4. Ruta relativa al directorio compilado (__dirname)
 */
export const getTemplatePath = (): string => {
    const basePath = getAppBasePath();
    const resourcesPath = (process as unknown as { resourcesPath?: string }).resourcesPath || '';

    const candidates = [
        path.join(basePath, 'public/templates/template_quotation.xlsx'),
        path.join(basePath, 'dist/templates/template_quotation.xlsx'),
        path.join(resourcesPath, 'templates/template_quotation.xlsx'),
        path.join(resourcesPath, 'public/templates/template_quotation.xlsx'),
        path.join(__dirname, '../../public/templates/template_quotation.xlsx'),
        path.join(__dirname, '../public/templates/template_quotation.xlsx'),
    ];

    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }

    // Retorna la ruta por defecto en public/templates/
    return candidates[0];
};

/**
 * Obtiene el directorio seguro para archivos temporales del sistema operativo.
 * Utiliza app.getPath('temp')/wnd_temp o process.env.TEMP/wnd_temp.
 * Crea el directorio si no existe.
 */
export const getTempDir = (): string => {
    let baseTemp: string;
    try {
        if (app && typeof app.getPath === 'function') {
            baseTemp = app.getPath('temp');
        } else {
            baseTemp = process.env.TEMP || process.env.TMP || '/tmp';
        }
    } catch {
        baseTemp = process.env.TEMP || process.env.TMP || '/tmp';
    }

    const tempDir = path.join(baseTemp, 'wnd_temp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    return tempDir;
};
