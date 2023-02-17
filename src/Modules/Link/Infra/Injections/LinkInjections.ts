import { container } from "tsyringe";
import ILinkRepository from "../../Repositories/ILinkRepository";
import LinkRepository from "../TypeORM/Repositories/LinkRepository";

class LinkInjections {
  public register(): void {
    container.registerSingleton<ILinkRepository>(
      "LinkRepository",
      LinkRepository
    );
  }
}

export default LinkInjections;
