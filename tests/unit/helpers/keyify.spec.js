import keyify from '../../../src/helpers/keyify.js';

describe('Helpers => Generating Array of string paths from Objects and Arrays with nested properties', () => {
  it('should return empty array when pass none object type value as a parameter', () => {
    expect(keyify()).toEqual([]);
  });

  it('should return empty array when pass empty Object as a parameter', () => {
    expect(keyify({})).toEqual([]);
  });

  it('should return array of string paths when pass Object with nested properties as a parameter', () => {
    const obj = {
      a: {
        b: {
          c: {
            d: {
              e: 'Hi'
            }
          }
        }
      }
    };
    const expected = ['a.b.c.d.e'];
    expect(keyify(obj)).toEqual(expect.arrayContaining(expected));
  });

  it('should return array of string paths when pass Object with nested properties includes Arrays as a parameter', () => {
    const obj = {
      experiences: [
        {
          title: 'Developer 1',
          role: 'Developer 1'
        },
        {
          title: 'Developer 2',
          role: 'Developer 2'
        }
      ],
      a: {
        b: {
          c: {
            d: {
              e: {
                f: [
                  {
                    g: '*___=___*'
                  }
                ]
              }
            }
          }
        }
      },
      a2: {
        b: {
          c: [
            {
              d: [
                {
                  e: {
                    f: 'F***'
                  }
                }
              ]
            }
          ]
        }
      }
    };
    const expected = [
      'experiences[0].title',
      'experiences[0].role',
      'experiences[1].title',
      'experiences[1].role',
      'a.b.c.d.e.f[0].g',
      'a2.b.c[0].d[0].e.f'
    ];
    expect(keyify(obj)).toEqual(expect.arrayContaining(expected));
  });
});
