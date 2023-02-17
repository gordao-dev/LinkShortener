import { Link } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import ILinkRepository from '../Repositories/ILinkRepository';

interface original_url {
  original_url: string;
}

interface IResponse {
  link: Link;
}

@injectable()
class CreateLinkService {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository,
  ) {}

  public async execute({ original_url }: original_url): Promise<IResponse> {
    const link = await this.linkRepository.find({
      original_url,
    });

    if (link) {
      return {
        link,
      };
    }

    let short_url = '';
    let linkExist = null;

    do {
      short_url = this.generateLink();
      linkExist = await this.linkRepository.findByShortUrl(short_url);
    } while (linkExist);

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const newLink = await this.linkRepository.create({
      original_url,
      short_url,
      expirationDate,
    });

    return {
      link: newLink,
    };
  }

  private generateLink(): string {
    let link = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
    for (let i = 0; i < 5; i++) {
      link += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return link;
  }
}

export default CreateLinkService;
