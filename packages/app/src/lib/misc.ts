export function prettyNumber(x: string, opts: { includeDecimal: boolean } = { includeDecimal: false }) {
  const pretty = x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return opts.includeDecimal ? pretty + '.00' : pretty;
}
