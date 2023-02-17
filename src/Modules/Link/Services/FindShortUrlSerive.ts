import { inject, injectable } from 'tsyringe';
import HttpError from '../../../Shared/Infra/Http/Errors/HttpError';
import ILinkRepository from '../Repositories/ILinkRepository';

interface IRequest {
  short_url?: string;
}

interface IResponse {
  original_url: string;
}

@injectable()
class findByShortUrlService {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository,
  ) {}

  public async execute({ short_url }: IRequest): Promise<IResponse> {
    const link = await this.linkRepository.findByShortUrl(short_url);

    if (!link) {
      throw new HttpError('Link não encontrado', 404);
    }

    const response: IResponse = { original_url: link.original_url };
    return response;
  }
}

export default findByShortUrlService;
