import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { mockAdapter, setAdapter } from "@vanilla-extract/css/adapter";
import { setFileScope } from "@vanilla-extract/css/fileScope";

GlobalRegistrator.register();
setAdapter(mockAdapter);
setFileScope("tests/runtime-styles.css.ts");
