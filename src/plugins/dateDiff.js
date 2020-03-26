export default {
  inDays(d1, d2) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000));
  },

  inMonths(d1, d2) {
    const d1Y = d1.getFullYear();
    const d2Y = d2.getFullYear();
    const d1M = d1.getMonth();
    const d2M = d2.getMonth();

    return d2M + 12 * d2Y - (d1M + 12 * d1Y);
  },

  inYears(d1, d2) {
    const t2 = d2.getTime();
    const t1 = d1.getTime();

    return Math.floor((t2 - t1) / 1000 / 60 / 60 / 24 / 365);
  }
};
