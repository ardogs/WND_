export interface AppSettings {
    "apiUrl" : string
    "apiVersion" : string,
    "darkMode" : boolean,
    "fontSize" : number,
    "language" : string
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: string[]; // Detalles opcionales
}


