const rules = {
  title: 'obscshie pravila ujutnogo foruma',
  info: ["1. bud' nyashkoj", '2. zhivi kawaiino'],
};

const about = [
  {
    title: 'kuda ya popal',
    info: ['koloda eto chan', 'zdes obitajut nyashki'],
  },
  {
    title: 'kak moderiruetsya chan',
    info: ['administracia reashaet kto nyashka v sootvetstvii s pravilami'],
  },
];

export const getRules = () => {
  return rules;
};

export const getAbout = () => {
  return about;
};
