import { Link } from '@prisma/client';
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
class FilterLinkService {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository,
  ) {}

  public async execute({ short_url }: IRequest): Promise<IResponse> {
    const link = await this.linkRepository.find({ short_url });

    if (!link || link.short_url) {
      throw new HttpError('Link não encontrado', 404);
    }

    return { original_url: link.original_url };
  }
}

export default FilterLinkService;
