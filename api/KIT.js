import { RIR } from "./RIR.Core.js";
import { KIT } from "./KIT.js";

export function RIR_KIT(input) {
  const check = RIR.return(input);

  if (check.RIR === "reject") {
    return { status: "reject", source: "RIR" };
  }

  return KIT_RUN(input);
}
