const isIndonesiaPilot = () => {
  return window._env && window._env.INDONESIA_PILOT_FLAG === "true";
};

export default isIndonesiaPilot;
