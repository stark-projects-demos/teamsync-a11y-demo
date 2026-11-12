import fs from "fs";
import { expect, test } from "@playwright/test";
import { StarkScan } from "@stark-ci/playwright";

const FAIL_BUDGET = 11;
const CONTRAST_BUDGET = 4;

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/TeamSync/);
});

test("try TeamSync link", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(/Try TeamSync/)).toBeVisible();
});

test("accessibility scan", async ({ page }) => {
  await page.goto("/");

  const results = await StarkScan(page.mainFrame(), {
    wcagVersion: "2.2",
    conformanceLevel: "AA",
    sendResults: true,
    name: "TeamSync Site",
    token: process.env.STARK_PROJECT_TOKEN!,
  });

  // Local fallback so an agent can still read violations if the Stark MCP is unreachable.
  fs.writeFileSync("stark-results.json", JSON.stringify(results, null, 2));

  expect(results.failed).toBeLessThan(FAIL_BUDGET);
  expect(results.resultsByCriteria["1.4"]?.failed || 0).toBeLessThan(CONTRAST_BUDGET);
});
