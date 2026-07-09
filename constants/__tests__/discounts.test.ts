import { DISCOUNT_CATEGORIES, DISCOUNT_PARTNERS } from '@/constants/discounts';

describe('DISCOUNT_PARTNERS', () => {
  const categoryNames = DISCOUNT_CATEGORIES.map((c) => c.name);

  it('every partner belongs to a category that exists in DISCOUNT_CATEGORIES', () => {
    for (const partner of DISCOUNT_PARTNERS) {
      expect(categoryNames).toContain(partner.category);
    }
  });

  it('has no duplicate category names', () => {
    expect(new Set(categoryNames).size).toBe(categoryNames.length);
  });

  it('has no duplicate partner names', () => {
    const names = DISCOUNT_PARTNERS.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
