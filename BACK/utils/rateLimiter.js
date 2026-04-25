import redisClient from "../config/redis.js";

export const checkLoginAttempts = async (
  key,
  limit = 5,
  window = 60,
) => {
  const attempts = await redisClient.incr(key);

  if (attempts === 1) {
    // expiry on the first attempt
    await redisClient.expire(key, window);
  }

  if (attempts > limit) {
    const ttl = await redisClient.ttl(key);
    
    return {
      blocked: true,
      retryAfter: ttl,
    };
  }

  return { blocked: false };
};

export const resetLoginAttempts = async (key) => {
  await redisClient.del(key);
};
