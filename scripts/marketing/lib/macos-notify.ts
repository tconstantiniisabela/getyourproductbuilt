import { execFileSync } from "node:child_process";
import os from "node:os";

export function macNotify(title: string, message: string): void {
  if (os.platform() !== "darwin") {
    console.warn("[notify] macOS only; skipping notification.");
    return;
  }
  const script = `display notification ${JSON.stringify(message)} with title ${JSON.stringify(title)}`;
  execFileSync("/usr/bin/osascript", ["-e", script], { stdio: "ignore" });
}
