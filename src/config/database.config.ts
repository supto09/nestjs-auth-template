import { registerAs } from '@nestjs/config';
import { z } from 'zod';
import * as process from 'node:process';

const schema = z.object({
  host: z.string({ required_error: 'DB_HOST not available' }),
  port: z.number({
    required_error: 'DB_PORT not available',
    invalid_type_error: 'DB_PORT not available',
  }),
  username: z.string({ required_error: 'DB_USER not available' }),
  password: z.string({ required_error: 'DB_PASSWORD not available' }),
  database: z.string({ required_error: 'DB_NAME not available' }),
  synchronize: z
    .string()
    .optional()
    .default('false')
    .transform((arg) => arg.toLowerCase() === 'true'),
});

export const DATABASE_CONFIG_KEY = 'database';
export type DatabaseConfigType = z.infer<typeof schema>;

export default registerAs(DATABASE_CONFIG_KEY, () => {
  const parseResult = schema.safeParse({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.DB_SYNCHRONIZE,
  });

  if (!parseResult.success) {
    throw new Error(
      `Invalid database connection env ${parseResult.error.errors[0].message}`,
    );
  }

  return parseResult.data;
});
