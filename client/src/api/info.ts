import { Info } from '@/types';

const rules: Info = {
  id: '0',
  title: 'obscshie pravila ujutnogo foruma',
  info: ["1. bud' nyashkoj", '2. zhivi kawaiino'],
};

const about: Info[] = [
  {
    title: 'kuda ya popal',
    id: '1',
    info: ['koloda eto chan', 'zdes obitajut nyashki'],
  },
  {
    title: 'kak moderiruetsya chan',
    id: '2',
    info: ['administracia reashaet kto nyashka v sootvetstvii s pravilami'],
  },
];

export const getRules = (): Info => {
  return rules;
};

export const getAbout = (): Info[] => {
  return about;
};
