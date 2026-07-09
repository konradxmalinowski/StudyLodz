import { UNIVERSITIES } from '@/constants/universities';

describe('UNIVERSITIES', () => {
  it('every entry has a valid type', () => {
    for (const uni of UNIVERSITIES) {
      expect(['publiczna', 'artystyczna']).toContain(uni.type);
    }
  });

  it('every entry has at least one field of study', () => {
    for (const uni of UNIVERSITIES) {
      expect(uni.fields.length).toBeGreaterThan(0);
    }
  });

  it('has no duplicate titles', () => {
    const titles = UNIVERSITIES.map((u) => u.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
