export const parseIpResponse = rawText => (
  rawText
  .split('\n')
  .reduce((initial, current) => {
    const tokens = current.split('=');
    return {
      ...initial,
      [tokens[0]]: tokens[1]
    }
  }, {})
)