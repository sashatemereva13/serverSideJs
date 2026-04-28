import redisClient from "../config/redis.js";

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const setCache = async (key, value, ttl = 60) => {
  await redisClient.setEx(key, ttl, JSON.stringify(value));
};
