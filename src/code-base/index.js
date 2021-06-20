import moduleList from "./moduleList";
export default (name) => {
  const moduleKeys = Object.keys(moduleList);
  const isModuleExisted = moduleKeys.includes(name);

  if (isModuleExisted) {
    // using factory pattern
    switch (name) {
      case moduleList.Controller:
        return "class Controller {}";
        break;
    }
  } else {
    throw new Error(`${name} does not exist`);
  }
};
