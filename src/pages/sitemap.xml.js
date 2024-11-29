import static_routes from "./json/static-routes.json";
// import { getSortedPostsData } from "../lib/posts";

const URL = process.env.NEXT_PUBLIC_DOMAIN;

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     <!-- Add the static URLs manually -->
     ${static_routes
            .map(({ page_url }) => {
                return `
               <url>
                    <loc>${`${URL}/${page_url}`}</loc>
                    <lastmod>${new Date().toISOString()}</lastmod>
                    <priority>0.9</priority>
               </url>
             `;
            })
            .join("")
        }
     
   </urlset >
    `;
}

export async function getServerSideProps({ res }) {
    const posts = []//getSortedPostsData();

    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap(posts);

    res.setHeader("Content-Type", "text/xml");
    // Send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function SiteMap() { }