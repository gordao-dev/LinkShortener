interface IAPIConfig {
  url: string;
  port: number;
}

export const apiConfig: IAPIConfig = {
  url: process.env.API_URL,
  port: Number(process.env.API_PORT) || 3000,
};

export default apiConfig;
