import "@/styles/globals.css";
import Script from 'next/script';
import ProviderWrapper from "@/utils/provider wrapper/provider_wrapper";
import CommonLayout from "../components/layout";
import HostLayout from "@/components/host/host_layout";
import { useRouter } from "next/router";
import { useState } from "react";
// import CustomToastContainer from "@/components/host/Common/Toastify/CustomToastContainer";

export default function App({ Component, pageProps }) {

  const jsonWebsite = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    "name": "Ventify",
    "url": "https://ventify.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ventify.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  const jsonOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ventify",
    "url": "https://ventify.com",
    "description":
      "The privacy factor, the wow factor...The demand for private and unique event locations has planners increasingly turning their attention to private home and estate venues. As the luster of typical banquet halls and hotel ballrooms fade, the need grows for an organized platform containing the world’s most amazing event - quality / permissible private residences.Los Angeles, Charleston, Miami, Chicago; whether you’re looking to host your guests in a quaint backyard or on a private island estate, look no further than Ventify.",
    "logo": "https://ventify.com/logo.svg",
    "sameAs": [
      "https://www.linkedin.com/company/golfh%C5%8Dm",
      "https://www.facebook.com/golfhom1",
      "https://www.instagram.com/golfhom",
      "https://twitter.com/golfhom?s=20"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1 818-251-6180",
      "contactType": "Customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "USA"
    }
  };

  const router = useRouter()
  const getLayout = (pathname) => {
    // console.log("pathname: ", pathname.startsWith('/dashboard'))
    if (pathname.startsWith('/host')) {
      return HostLayout;
    } else {
      return CommonLayout;
    }
    // return Layout;
  }

  const Layout = getLayout(router.pathname);

  const [openSidebar, setopenSidebar] = useState(false)
  return (


    <>



      <ProviderWrapper>
        <Layout>
          {/* <AuthProvider> */}
          {/* <Header /> */}
          {/* <CustomToastContainer /> */}
          <Component {...pageProps} openSidebar={openSidebar} setopenSidebar={setopenSidebar} />
          {/* <Footer /> */}
          {/* </AuthProvider> */}
        </Layout>
      </ProviderWrapper>

    </>
  );
}
