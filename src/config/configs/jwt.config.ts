import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const schema = z.object({
  secret: z.string({ required_error: 'JWT_SECRET not available' }),
  accessTokenLifeTime: z.number({
    required_error: 'DB_PORT not available',
    invalid_type_error: 'DB_PORT not available',
  }),
  refreshTokenLifeTime: z.number({
    required_error: 'DB_PORT not available',
    invalid_type_error: 'DB_PORT not available',
  }),
});

export const JWT_CONFIG_KEY = 'jwt_config_key';
export type JwtConfigType = z.infer<typeof schema>;

export default registerAs(JWT_CONFIG_KEY, () => {
  const parseResult = schema.safeParse({
    secret: process.env.JWT_SECRET,
    accessTokenLifeTime: parseInt(
      process.env.JWT_ACCESS_TOKEN_LIFETIME ?? '',
      10,
    ),
    refreshTokenLifeTime: parseInt(
      process.env.JWT_REFRESH_TOKEN_LIFETIME ?? '',
      10,
    ),
  });

  if (!parseResult.success) {
    throw new Error(`Invalid jwt env ${parseResult.error.errors[0].message}`);
  }

  return parseResult.data;
});
