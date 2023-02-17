import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { OptionalAnyString } from '../../../../../Shared/Infra/Http/Validators/Joi';
import LinkController from '../Controllers/LInkControllers';

class LinkRoutes {
  public register(): Router {
    // Routes
    const linkRoutes = Router();

    // Controllers
    const linkControllers = new LinkController();

    linkRoutes.get(
      '/:short_url',
      celebrate({
        [Segments.PARAMS]: {
          short_url: Joi.string().required(),
        },
      }),
      linkControllers.find,
    );

    linkRoutes.post(
      '/create',
      celebrate({
        [Segments.BODY]: {
          original_url: OptionalAnyString,
        },
      }),
      linkControllers.create,
    );
    return linkRoutes;
  }
}

export default LinkRoutes;
