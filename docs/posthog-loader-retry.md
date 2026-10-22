# PostHog initial SDK download recovery

The existing loader leaves `posthogStarted` true when the SDK script raises a resource error. That page never attempts another download, although Google can keep running. This fix addresses that reproduced control flow; it does not establish the cause or size of the historical GA4/PostHog discrepancy.

`JS/website-consent.js` is the complete consent runtime currently embedded in the live Webflow global Head. Upstream main did not version that runtime. The first commit records its unchanged baseline so the next commit exposes only the recovery delta. The baseline was fetched again from https://www.unifygtm.com/ on October 22, 2026 without executing scripts and matched the October 21 capture byte for byte (SHA256 `76eb39bbf3bd2efe4348074bab55868d68f892cfd9dd4fbafbe2f5fcfa3814e3`). The embedded policy, keys, region resolver and Google configuration are unchanged.

After a terminal script `error`, recovery waits 1 second, then 3 seconds after a second failure. Three total download attempts are permitted for the document lifetime. Every attempt uses the same asset URL and original PostHog initialization queue. No timeout treats a slow download as failed. There is no fallback domain, cache busting, blocker bypass, or SDK configuration change. Persistent failures stop until a new document loads.

Consent denial cancels scheduled recovery. Every attempt checks current permission again. A late SDK callback still applies the existing opt-out state and sends no initial pageview after withdrawal. Withdrawal retains the existing reload behavior. Repeated consent updates cannot reset the attempt budget. Page exit cancels the timer; back/forward cache restoration may resume a known failure within the same budget while permission allows it. Successful readiness captures the current URL once; earlier navigation before SDK readiness is not replayed. Existing subsequent history pageview behavior is unchanged.

## Validation

Run `node --test tests/posthog-loader.test.cjs` and `node --check JS/website-consent.js`. The tests execute the full runtime in a Node VM with mocked DOM, storage, timers, region fetch and SDK. They cannot transmit events. They cover initial success, duplicate callbacks, one-time installation, transient and persistent failures, repeated consent updates, both denied-consent combinations, later grant, withdrawal before retry and during in-flight recovery, page exit/restoration, current-URL navigation, slow downloads, and competing owners. These are integration control-flow tests, not a claim of real private browsing or production browser/network QA.

The normal `npm run build` only minifies the existing global/home assets and does not deploy or bundle this inline consent runtime. No Google/GTM destination configuration changes are required or included.

## Release boundary and rollback

This draft PR does not activate the fix. Do not run `deploy.js` (stages all files and pushes main) or `release.js` as a shortcut. Preserve unrelated working files and pending Webflow changes.

After review and explicit deployment approval, compare the then-current live consent script against the recorded baseline. If it differs, reconcile before replacing anything. Update only the existing consent script body in Webflow's global Head with `JS/website-consent.js`; retain its single owner and all surrounding Head code. Do not add a second external loader. Validate on Webflow staging with measurement intercepted before execution, including initial failure/recovery and withdrawal. Review all pending site changes before a separately authorized production publish. Save the exact pre-publish Head and publish selection for rollback; rollback restores only that saved consent script and republishes the same approved scope.

The source comment also mentions a Next.js generator (`scripts/build.mjs`), but that generator and its release pipeline are absent from this repository. Updating generated Next.js routes requires locating that source and applying the same function delta there, then separately reviewing its deployment. A repository merge or Webflow publish must not be represented as updating that unidentified pipeline.
