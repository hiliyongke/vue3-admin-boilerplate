/**
 * JSON 字符串解析边界处理
 * @param parseString
 * @returns object | null
 */
const safelyParseJson = <T = unknown>(parseString: string): T | null => {
  try {
    return JSON.parse(parseString);
  } catch (_e) {
    return null;
  }
};

export default safelyParseJson;
