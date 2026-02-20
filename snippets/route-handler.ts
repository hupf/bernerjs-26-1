import { RoleSet } from "common/auth/roles";
import { CommunesFilterParams } from "common/params/communes";
import { CONTAINER } from "~/di/container";
import { DI_TOKENS } from "~/di/tokens";

export function defineCommunesEventHandler(container: typeof CONTAINER) {
  const service = container.get(DI_TOKENS.communesService);

  return defineAppEventHandler(
    {
      authorize: RoleSet.any,
      validate: { query: CommunesFilterParams },
    },
    async (event) => {
      const { query: filter } = event.context.validated;
      const result = await service.findAll(filter);
      return result;
    },
  );
}

export default defineCommunesEventHandler(CONTAINER);
