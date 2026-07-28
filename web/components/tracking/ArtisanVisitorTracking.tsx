import Script from "next/script";

const TRACKED_WEBSITE_ID = "019eeed3-ed90-7433-a22a-dd696ce36522";
const VECTOR_SEGMENT_ID = "92b65e70-e71c-4190-b12a-c5cc9603e6ba";
const DEMANDBASE_AUTH = "QP26rudcfYV5OIAESRhfLFXxU5o7kVBUmo2REngW";
const CLOUDFRONT_SCRIPT = `https://d2mvefebd70kbz.cloudfront.net/scripts/${TRACKED_WEBSITE_ID}.js`;

const artisanVisitorSnippet = `
(function() {
  'use strict';

  try {
    var hb = new XMLHttpRequest();
    hb.open("POST", "https://api-dashboard.artisan.co/api/webhooks/website-visitor/heartbeat", true);
    hb.setRequestHeader("Content-Type", "application/json");
    hb.send(JSON.stringify({ trackedWebsiteId: "${TRACKED_WEBSITE_ID}" }));
    console.log("[Website Visitor] Heartbeat sent");
  } catch (e) {}

  !function(e, r) {
    try {
      var segmentId = "${VECTOR_SEGMENT_ID}";
      if (e.vector && typeof e.vector.load === "function") {
        e.vector.load(segmentId);
        return void console.log("Vector snippet already present; loaded Artisan segment.");
      }
      var t = {};
      t.q = t.q || [];
      var actions = ["load", "identify", "on", "track"];
      var make = function(action) {
        return function() {
          t.q.push([action, Array.prototype.slice.call(arguments)]);
          return t;
        };
      };
      for (var i = 0; i < actions.length; i++) {
        t[actions[i]] = make(actions[i]);
      }
      e.vector = t;
      if (!t.loaded) {
        var n = r.createElement("script");
        n.type = "text/javascript";
        n.async = true;
        n.src = "https://cdn.vector.co/pixel.js";
        var a = r.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(n, a);
        t.loaded = true;
      }
      vector.load(segmentId);
    } catch (e) {
      console.error("Error loading Vector:", e);
    }
  }(window, document);

  window.DemandbasePartnerTag = {
    auth: "${DEMANDBASE_AUTH}",
    config: {
      enableSmartPixel: false,
      enableEmailDomainReporter: false
    }
  };

  var dbScript = document.createElement("script");
  dbScript.async = true;
  dbScript.src = "https://tag.demandbase.com/partnertag.min.js";
  dbScript.onload = function() {
    if (window.DemandbasePartnerTag && typeof window.DemandbasePartnerTag.fire === "function") {
      var twId = "${TRACKED_WEBSITE_ID}";
      var webhookUrl = "https://api-dashboard.artisan.co/api/webhooks/demandbase";
      window.DemandbasePartnerTag.fire().then(function(response) {
        var payload = JSON.stringify({
          trackedWebsiteId: twId,
          pageUrl: document.location.href,
          pageTitle: document.title,
          referrer: document.referrer,
          demandbaseResponse: response
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", webhookUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(payload);
        console.log("[Demandbase] Webhook sent, company:", response.company_name || "unknown");
      }).catch(function(err) {
        console.error("[Demandbase] fire() failed:", err);
      });
    }
  };
  document.head.appendChild(dbScript);
})();
`;

export default function ArtisanVisitorTracking() {
  return (
    <>
      <Script
        id="artisan-visitor-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: artisanVisitorSnippet }}
      />
      <Script id="artisan-visitor-cloudfront" src={CLOUDFRONT_SCRIPT} strategy="afterInteractive" />
    </>
  );
}
