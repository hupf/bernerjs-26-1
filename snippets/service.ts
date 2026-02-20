import { injected } from "brandi";
import { CommunesFilterParams } from "common/params/communes";
import { type CommunesRepository } from "db/repositories/communes.repository";
import { DI_TOKENS } from "../di/tokens";

export class CommunesService {
  constructor(private communesRepository: CommunesRepository) {}

  findAll(filter: CommunesFilterParams) {
    return this.communesRepository.findAll(filter);
  }
}

injected(CommunesService, DI_TOKENS.communesRepository);
