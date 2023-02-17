import { Link, PrismaClient } from '@prisma/client';
import ICreateLink from '../../../@Types/ICreateLink';
import IFilterLink from '../../../@Types/IFilterLink';
import ILinkRepository from '../../../Repositories/ILinkRepository';

class LinkRepository implements ILinkRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }
  public async find(data: IFilterLink): Promise<Link | undefined> {
    const link = await this.prisma.link.findUnique({
      where: data,
    });

    return link;
  }

  public create = async (data: ICreateLink): Promise<Link> => {
    const link = await this.prisma.link.create({ data });
    return link;
  };

  public async findByShortUrl(shortUrl: string): Promise<Link | null> {
    const link = await this.prisma.link.findUnique({
      where: { short_url: shortUrl },
    });

    if (!link) {
      return null;
    }

    return {
      id: link.id,
      original_url: link.original_url,
      short_url: link.short_url,
      expirationDate: link.expirationDate,
    };
  }
}

export default LinkRepository;
