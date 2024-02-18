import getLogLevels from "./getLogLevels";

test('should return levels "log", "warn" and "error" if is production', () => {
  const logLevels = getLogLevels(true);

  expect(logLevels).toEqual(["log", "warn", "error"]);
});
