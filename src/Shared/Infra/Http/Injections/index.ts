import LinkInjections from '../../../../Modules/Link/Infra/Injections/LinkInjections';

class Injections {
  public register() {
    const linkInjections = new LinkInjections();
    linkInjections.register();
  }
}

export default Injections;
