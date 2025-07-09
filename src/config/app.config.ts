import { registerAs } from "@nestjs/config";
// this is custom configuration file

export default registerAs('appConfig', () => ({
    environment: process.env.NODE_ENV,
}))

