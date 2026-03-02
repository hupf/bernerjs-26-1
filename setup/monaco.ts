import { defineMonacoSetup } from "@slidev/types";
// @ts-expect-error Vite raw import
import validationCode from "../snippets/route-handlers/validation.ts?monaco-types&raw";
// @ts-expect-error Vite raw import
import errorCode from "../snippets/route-handlers/error.ts?monaco-types&raw";
// @ts-expect-error Vite raw import
import nitroCode from "../snippets/route-handlers/nitro.ts?monaco-types&raw";

export default defineMonacoSetup(async (monaco) => {
  const defaults = monaco.languages.typescript.typescriptDefaults;
  defaults.setCompilerOptions({
    ...defaults.getCompilerOptions(),
    allowImportingTsExtensions: true,
  });

  // Register snippet files at root level so the Monaco editor model
  // (which has a random URI like file:///<id>.ts) can resolve
  // relative imports like ./validation.ts to file:///validation.ts
  const files: Record<string, string> = {
    "validation.ts": validationCode,
    "error.ts": errorCode,
    "nitro.ts": nitroCode,
  };
  for (const [name, code] of Object.entries(files)) {
    const uri = monaco.Uri.parse(`file:///${name}`);
    defaults.addExtraLib(code, uri.toString());
    if (monaco.editor.getModel(uri) === null) {
      monaco.editor.createModel(code, "typescript", uri);
    }
  }
});
