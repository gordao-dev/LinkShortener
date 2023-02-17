import { Link } from '@prisma/client';
import ICreateLink from '../@Types/ICreateLink';
import IFilterLink from '../@Types/IFilterLink';

interface ILinkRepository {
  find(data: IFilterLink): Promise<Link | null>;
  create(data: ICreateLink): Promise<Link>;
  findByShortUrl(shortUrl: string): Promise<{ original_url: string } | null>;
}

export default ILinkRepository;
