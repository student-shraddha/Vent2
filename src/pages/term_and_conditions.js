import Image from "next/image";
import TermConditionsCss from "../styles/TermConditions.module.css";
import { Container } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
const BottomSection = dynamic(
  () => import("../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const TermAndConditions = () => {
  return (
    <>
      <Head>
        <title>Ventify Terms and Conditions: Understanding Our Policies</title>
        <meta
          name="description"
          content={`Read Ventify's Terms and Conditions to understand the policies that govern your use of our website. Learn about the roles and responsibilities when booking vacation rentals, and our commitment to user privacy.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* -----------------------    TOP IMAGE SECTION OF TERM AND CONDITIONS     ---------------------------- */}
      <div className={TermConditionsCss.topImage}>
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/termConditions.jpg`}
          alt="TermConditions"
          fill
          className={TermConditionsCss.imageSelf}
        ></Image>
      </div>

      {/* -------------------------    TEXT SECTION    -------------------------------  */}

      <Container>
        <h3 className={TermConditionsCss.title}>Term and Condition</h3>

        <p className={TermConditionsCss.update}>Last updated April 23, 2021</p>

        <p className={TermConditionsCss.para}>
          Ventify.com (“Website”) is provided solely to assist customers in
          gathering vacation rental travel information, determining availability
          of related goods and services, making direct inquiries, rental
          reservations, and paying for such reservations. By accessing or
          utilizing Website, a mobile application or subdomain of Website, or
          any other site operated by or affiliated with us, on which these Terms
          and Conditions are posted, referenced by link or otherwise,{" "}
          <b>
            you acknowledge and agree that you are subject to the following
            Terms and Conditions{" "}
          </b>{" "}
          (“Terms”), as well as our posted Privacy Policy, which also governs
          your use of the Website. Kindly read our Terms carefully, as they
          contain important information regarding your use of the Website,
          limitations of liability and resolution of disputes.
        </p>

        <h5 className={TermConditionsCss.subHeading}>
          1) Website is a Venue, and not a Party to any Rental Agreement or
          Transaction
        </h5>

        <p className={TermConditionsCss.para}>
          We strongly urge all users to be mindful and responsible when
          utilizing the Website, and entering into communications and
          transactions thereon. We do not manage, own, or control in any way the
          properties listed on the Website. We cannot contract for the use of
          any listed properties.
        </p>

        <p className={TermConditionsCss.para}>
          The Website is merely a venue for homeowners and property managers to
          offer their vacation rental properties to potential renters, and a
          platform for said parties to communicate and consummate their chosen
          transactions.
        </p>

        <p className={TermConditionsCss.para}>
          We are not a party to any rental transaction between property
          owners/managers and their renters. All transactions, and every aspect
          thereof between a host and traveler, including the condition, safety,
          quality or legality of the properties advertised hereon are the sole
          the responsibility of each user. Website is not responsible or liable
          for the accuracy of a listing’s content, the ability or legality of a
          host to rent a vacation property or the ability of travelers to pay
          for said properties. You acknowledge and agree that you may be
          required to enter into a separate rental agreement with your host
          prior to making a booking or purchasing a product or service, and that
          such separate contract may place additional restrictions and terms on
          your reservation or related service.
        </p>

        <h5 className={TermConditionsCss.subHeading}>2) Use of the Website</h5>

        <p className={TermConditionsCss.para}>
          Users are granted a limited, non-exclusive and revocable license to
          utilize the Website, it’s content and services, subject to these
          Terms. Access is granted to the Website solely for the purpose, for
          users age 18 and over, of advertising a vacation rental property,
          searching for a property, researching or renting a listed property, or
          utilizing any of the other services or products offered to the public
          on the Website. All user activity on the Website that is not clearly
          for one of these purposes, unless specifically authorized by us in
          writing, is expressly prohibited.
        </p>

        <p className={TermConditionsCss.para}>
          The revocable license to use the Website does not include any right of
          copying, collection, scraping, aggregation, display, or any derivative
          or potentially disruptive or damaging use of the Website, nor any
          right of use of spiders, robots, data mining or similar data gathering
          and extraction tools without our prior written consent (general
          purpose search engines, not offering services that compete with us,
          that gather information for the sole purpose of displaying links back
          to the Website are an exception to the above prohibitions).
        </p>

        <h5 className={TermConditionsCss.subHeading}>3) Privacy Policy</h5>

        <p className={TermConditionsCss.para}>
          We respect your privacy and believe in protecting it. Please{" "}
          <Link href="/privacy" className={TermConditionsCss.linkWord}>
            CLICK HERE{" "}
          </Link>{" "}
          to review our current Privacy Policy.
        </p>

        <p className={TermConditionsCss.para}>
          If you provide your email while utilizing the Website, you authorize
          us to add you to our database of users, and to provide you with
          promotional emails on behalf of our affiliates or advertising our own
          services or offerings. You may opt out of any such emails, or
          newsletters at any time. Users hereby agree that any third party
          website or service that is integrated with our Website shall be
          responsible for the handling of any information or data provided by
          User.
        </p>

        <h5 className={TermConditionsCss.subHeading}>
          4) Copyright Infringement Prohibited Hereon: DMCA Policy
        </h5>

        <p className={TermConditionsCss.paraA}>
          Website does not permit, and will not be a party to, users violating
          or infringing upon any 3rd party’s copyrights. We greatly respect the
          intellectual property rights of other individuals and entities. We
          will freeze or terminate, when appropriate, any property listing or
          user account if copyright infringement is suspected. Please feel free
          to{" "}
          <Link href="/contact_us" className={TermConditionsCss.linkWord}>
            {" "}
            CONTACT US HERE
          </Link>{" "}
          immediately if you believe a copyright violation exists on the
          Website.
        </p>
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default TermAndConditions;
