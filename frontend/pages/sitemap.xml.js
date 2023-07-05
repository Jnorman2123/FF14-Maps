import React from "react";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://helperquest.com",
  }[process.env.NODE_ENV];

  const questsRes = await fetch('https://api.helperquest.com/quests');
  const quests = await questsRes.json();
  const npcsRes = await fetch('https://api.helperquest.com/npcs');
  const npcs = await npcsRes.json();
  const stepsRes = await fetch('https://api.helperquest.com/steps');
  const steps = await stepsRes.json();

  let zones = [
    'Limsa Lominsa Upper Decks', 'Limsa Lominsa Lower Decks', 'Middle La Noscea', 'Lower La Noscea', 'Eastern La Noscea', 
    'Western La Noscea', 'Upper La Noscea', 'Outer La Noscea', 'New Gridania', 'Old Gridania', 'Central Shroud', 
    'East Shroud', 'South Shroud', 'North Shroud', "Ul'dah Steps Of Nald", "Ul'dah Steps Of Thal", 'Hustings Strip', 
    'Western Thanalan', 'Eastern Thanalan', 'Central Thanalan', 'Southern Thanalan', 'Northern Thanalan'
  ];

  let regions = [
    'La Noscea', 'The Black Shroud', 'Thanalan'
  ];

  let questUrls = quests.map(quest => {
    let npcId = steps.filter(step => step.quest_step === quest.id)[0].step_npc;
    let zoneName = npcs.filter(npc => npc.id === npcId)[0].npc_zone.split('(')[0];
    let questName = quest.quest_name;
    if (zoneName.includes(`Ul'dah`)) {
      zoneName = zoneName.replace('of', 'Of').replace('-', '');
    }
    return `https://helperquest.com/quest/${zoneName.split(' ').join('')}+${questName.split(' ').join('')}`;
  });

  let zoneUrls = zones.map(zone => `https://helperquest.com/zone/${zone.split(' ').join('')}`);
  let regionUrls = regions.map(region => `https://helperquest.com/region/${region.split(' ').join('')}`);
  let urls = questUrls.concat(zoneUrls).concat(regionUrls);
  urls.push('https://helperquest.com');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })}
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;