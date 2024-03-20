const rules = {
  title: 'obscshie pravila ujutnogo foruma',
  info: ["1. bud' nyashkoj", '2. zhivi kawaiino'],
};

const about = [
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

export const getRules = () => {
  return rules;
};

export const getAbout = () => {
  return about;
};
