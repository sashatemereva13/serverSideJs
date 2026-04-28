import redisClient from "../config/redis.js";

export const checkLoginAttempts = async (key, limit = 5) => {
  const attempts = Number(await redisClient.get(key)) || 0;

  if (attempts >= limit) {
    const ttl = await redisClient.ttl(key);

    return {
      blocked: true,
      retryAfter: ttl,
    };
  }

  return { blocked: false };
};

export const incrementLoginAttempts = async (key, window = 60) => {
  const attempts = await redisClient.incr(key);

  if (attempts === 1) {
    await redisClient.expire(key, window);
  }
};

export const resetLoginAttempts = async (key) => {
  await redisClient.del(key);
};
