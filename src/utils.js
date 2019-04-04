export function getQueryParams () {
  const query = window.location.search.substring(1)
  const pairs = query.split('&').map((str) => str.split('='))
  return pairs.reduce((memo, pair) => {
    memo[pair[0]] = pair[1]
    return memo
  }, {})
}
