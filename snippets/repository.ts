import { injected } from "brandi";
import { Commune } from "common/models/commune.model";
import { CommunesFilterParams } from "common/params/communes";
import { toCamel } from "common/utils/case";
import { type KyselyInstance, sql } from "..";
import { DI_TOKENS } from "../di/tokens";

export class CommunesRepository {
  constructor(private db: KyselyInstance) {}

  async findAll(
    filter?: CommunesFilterParams,
    db = this.db,
  ): Promise<ReadonlyArray<Commune>> {
    let query = db.selectFrom("communes").selectAll();

    if (filter?.canton) {
      query = query.where(sql`LOWER(canton)`, "=", filter.canton.toLowerCase());
    }

    if (filter?.searchTerm) {
      query = query.where("name", "ilike", `${filter?.searchTerm}%`);
    }

    return toCamel(await query.orderBy("name", "asc").execute());
  }
}

injected(CommunesRepository, DI_TOKENS.database);
