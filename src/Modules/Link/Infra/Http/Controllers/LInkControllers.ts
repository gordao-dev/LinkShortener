import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import HttpError from '../../../../../Shared/Infra/Http/Errors/HttpError';
import CreateLinkService from '../../../Services/CreateLInkService';
import findByShortUrlService from '../../../Services/FindShortUrlSerive';

class LinkController {
  public async create(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { body } = request;

    const createLinkService = container.resolve(CreateLinkService);

    const result = await createLinkService.execute(body);

    return response.status(201).json(result);
  }

  public async find(
    request: Request,
    response: Response,
    _: NextFunction,
  ): Promise<Response> {
    const { short_url } = request.params;

    const findByShortUrl = container.resolve(findByShortUrlService);

    try {
      const result = await findByShortUrl.execute({ short_url });
      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof HttpError && error.statusCode === 404) {
        return response.status(404).json({ message: 'Link not found' });
      }

      throw error;
    }
  }
}

export default LinkController;
