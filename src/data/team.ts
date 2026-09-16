// src/data/team.ts
export type TeamMember = {
  name: string; roleKey: 'programmer' | 'designer'; initials: string;
  links: { linkedin?: string; github?: string };
};

export const team: TeamMember[] = [
  { name: 'Nicko Sambrano Putra', roleKey: 'programmer', initials: 'NP',
    links: { linkedin: 'https://www.linkedin.com/in/ncksp/', github: 'https://github.com/ncksp' } },
  { name: 'Noor Alizah Afifah R', roleKey: 'programmer', initials: 'NA',
    links: { linkedin: 'https://www.linkedin.com/in/noor-alizah-afifah-r-826630148/', github: 'https://github.com/kuroiyuki48' } },
  { name: 'Fandy Ramadhan', roleKey: 'designer', initials: 'FR',
    links: { linkedin: 'https://www.linkedin.com/in/fandy-ramadhan-b75124169/', github: 'https://github.com/fandyramadhan' } },
];
