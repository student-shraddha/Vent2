"use client";

import Image from "next/image";
import PrivacyPolicyCss from "../styles/PrivacyPolicy.module.css";
import { Container } from "react-bootstrap";
import Link from "next/link";
import dynamic from "next/dynamic";
import Head from "next/head";

const BottomSection = dynamic(
  () => import("../../common components/bottomGroup"),
  {
    suspense: true,
  }
);
const Privacy = () => {
  return (
    <>
      <Head>
        <title>Ventify Privacy Policy: Protecting Your Personal Information</title>
        <meta
          name="description"
          content={`At Ventify, we value your privacy. Read our Privacy Policy to understand how we collect, use, and protect your personal information. Learn about our commitment to security best practices and your rights regarding your data.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*------------------------ PRIVACY POLICY TOP IMAGE------------------------ */}
      <div className={PrivacyPolicyCss.topImage}>
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/images/privacy.jpg`}
          alt="Privacy"
          fill
          priority
          className={PrivacyPolicyCss.topImgChild}
        />
      </div>

      {/*------------------------ PRIVACY POLICY TEXT CONATINER------------------------ */}
      <Container>
        <h3 className={PrivacyPolicyCss.privacyTitle}>
          VENTIFY.COM PRIVACY POLICY
        </h3>

        <p className={PrivacyPolicyCss.para}>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit or make a purchase from
          ventify.com (the “Site”).
        </p>

        <p className={PrivacyPolicyCss.para}>
          We have a strong commitment to security best practices and industry
          standards. The most secure way for guests to pay for a vacation rental
          is on our Site. Guests who pay on our Site have their transaction
          processed directly via our respected partners at Stripe and PayPal.
        </p>

        <p className={PrivacyPolicyCss.para}>
          We respect the rights and privacy of our users, and we expect our
          users to do the same vis-á-vis other businesses and individuals that
          they encounter on our platform. Feel free to contact us with any
          questions or concerns.
        </p>

        <h4 className={PrivacyPolicyCss.personal}>
          PERSONAL INFORMATION WE COLLECT
        </h4>

        <p className={PrivacyPolicyCss.para}>
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We refer to this
          automatically-collected information as “Device Information.”
        </p>

        <p className={PrivacyPolicyCss.para}>
          We collect Device Information using the following technologies :
        </p>

        <p className={PrivacyPolicyCss.para}>
          – “Cookies” are data files that are placed on your device or computer
          and often include an anonymous unique identifier. For more information
          about cookies, and how to disable cookies, visit
          http://www.allaboutcookies.org.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          – “Log files” track actions occurring on the Site, and collect data
          including your IP address, browser type, Internet service provider,
          referring/exit pages, and date/time stamps.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          – “Web beacons,” “tags,” and “pixels” are electronic files used to
          record information about how you browse the Site.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          Additionally when you make a purchase, attempt to make a purchase, or
          sign up for information services through the Site, we collect certain
          information from you, including your name, billing address, shipping
          address, payment information (including credit card numbers and
          banking information) email address, and phone number. We refer to this
          information as “Order Information.”
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          When we talk about “Personal Information” in this Privacy Policy, we
          are talking both about Device Information and Order Information.
        </p>

        <h4 className={PrivacyPolicyCss.personal}>
          HOW DO WE USE YOUR PERSONAL INFORMATION?
        </h4>

        <p className={PrivacyPolicyCss.para}>
          We use the Order Information that we collect generally to fulfill any
          orders placed through the Site (including processing your payment
          information, arranging for shipping, and providing you with invoices
          and/or order confirmations). Additionally, we use this Order
          Information to:
        </p>

        <p className={PrivacyPolicyCss.paraCom}>• Communicate with you.</p>
        <p className={PrivacyPolicyCss.paraCom}>
          • Screen our orders for potential risk or fraud.
        </p>
        <p className={PrivacyPolicyCss.paraCom}>
          • And when in line with the preferences you have shared with us,
          provide you with information or advertising relating to our products
          or services, and/or the products and services of our affiliates and
          partners.
        </p>

        <p className={PrivacyPolicyCss.para}>
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimize our Site (for example, by generating
          analytics about how our customers browse and interact with the Site,
          and to assess the success of our marketing and advertising campaigns).
        </p>

        <h4 className={PrivacyPolicyCss.personal}>
          SHARING YOUR PERSONAL INFORMATION
        </h4>

        <p className={PrivacyPolicyCss.para}>
          We share your Personal Information with third parties to help us use
          your Personal Information, as described above. We also use Google
          Analytics to help us understand how our customers use the Site–you can
          read more about how Google uses your Personal Information here:
          https://www.google.com/intl/en/policies/privacy/. You can also opt-out
          of Google Analytics here: https://tools.google.com/dlpage/gaoptout.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          Finally, we may also share your Personal Information to comply with
          applicable laws and regulations, to respond to a subpoena, search
          warrant or other lawful request for information we receive, or to
          otherwise protect our rights.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          As described above, we use your Personal Information to provide you
          with targeted advertisements or marketing communications we believe
          may be of interest to you. For more information about how targeted
          advertising works, you can visit the Network Advertising Initiative’s
          (“NAI”) educational page at
          http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          You can opt out of targeted advertising by:
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          FACEBOOK – https://www.facebook.com/settings/?tab=ads
          <br />
          GOOGLE – https://www.google.com/settings/ads/anonymous
          <br />
          BING –
          https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          Additionally, you can opt out of some of these services by visiting
          the Digital Advertising Alliance’s opt-out portal at:
          http://optout.aboutads.info/.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}>DO NOT TRACK</h5>

        <p className={PrivacyPolicyCss.para}>
          Please note that we do not alter our Site’s data collection and use
          practices when we see a Do Not Track signal from your browser.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}>YOUR RIGHTS </h5>

        <p className={PrivacyPolicyCss.para}>
          You have the right to ask us at any time:
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To confirm whether we hold any of your personal data.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To send you a copy of any personal data that we hold about you.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To correct any inaccuracies in your personal data and to add
          relevant details where the personal data we hold is incomplete.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To delete (to the extent possible) any of your personal data, where
          we are required by law to do so.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To stop processing your personal data, where we are required by law
          to do so.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To let you have a portable copy of the personal data we hold about
          you, where we are required by law to do so.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • To stop processing any of your personal data that we process on the
          basis of our legitimate interests.
        </p>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          • And to stop sending you marketing material. However please note that
          we may continue to send you service related (i.e. non-marketing)
          communications, such as email updates.
        </p>

        <p className={PrivacyPolicyCss.para}>
          If you are a European resident, you also of course have the right to
          access personal information we hold about you and to ask that your
          personal information be corrected, updated, or deleted. If you would
          like to exercise this right, please contact us through the contact
          link below.
        </p>

        <p className={PrivacyPolicyCss.para}>
          Additionally, if you are a European resident we note that we are
          processing your information in order to fulfill contracts we might
          have with you (for example if you make an order through the Site), or
          otherwise to pursue our legitimate business interests listed above.
          Additionally, please note that your information will be transferred
          outside of Europe, including to Canada and the United States.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}>OTHER SITES</h5>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          If any part of the ventify.com web site links you to other web sites,
          please know that those sites do not operate under this Privacy Policy.
          We recommend you examine the privacy statements posted on those other
          online entities to understand their procedures for collecting, using,
          and disclosing your personal information.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}>DATA RETENTION</h5>

        <p className={PrivacyPolicyCss.para}>
          {" "}
          When you place an order through the Site, we will maintain your Order
          Information for our records unless and until you ask us to delete this
          information.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}>MINORS</h5>

        <p className={PrivacyPolicyCss.para}>
          The Site is not intended for individuals under the age of 16.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}>CHANGES</h5>

        <p className={PrivacyPolicyCss.para}>
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal or regulatory reasons. We will notify you about
          material changes to this policy by sending you notice to the e-mail
          address you provided in your user profile, or by placing a prominent
          notice on our web site.
        </p>

        <h5 className={PrivacyPolicyCss.subHeading}> CONTACT US</h5>

        <p className={PrivacyPolicyCss.paraA}>
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          via our{" "}
          <Link href="/contact_us" className={PrivacyPolicyCss.contact}>
            Contact Us page.
          </Link>
        </p>
      </Container>

      {/*  -----------------------------           BOTTOM IMAGE SECTION         ----------------------------  */}

      <BottomSection />
    </>
  );
};

export default Privacy;
