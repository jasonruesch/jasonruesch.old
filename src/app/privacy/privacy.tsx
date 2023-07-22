import { MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    id: 'infocollect',
    name: 'WHAT INFORMATION DO WE COLLECT?',
  },
  {
    id: 'infouse',
    name: 'HOW DO WE PROCESS YOUR INFORMATION?',
  },
  {
    id: 'whoshare',
    name: 'WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?',
  },
  {
    id: 'inforetain',
    name: 'HOW LONG DO WE KEEP YOUR INFORMATION?',
  },
  {
    id: 'infosafe',
    name: 'HOW DO WE KEEP YOUR INFORMATION SAFE?',
  },
  {
    id: 'infominors',
    name: 'DO WE COLLECT INFORMATION FROM MINORS?',
  },
  {
    id: 'privacyrights',
    name: 'WHAT ARE YOUR PRIVACY RIGHTS?',
  },
  {
    id: 'DNT',
    name: 'CONTROLS FOR DO-NOT-TRACK FEATURES',
  },
  {
    id: 'caresidents',
    name: 'DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?',
  },
  {
    id: 'policyupdates',
    name: 'DO WE MAKE UPDATES TO THIS NOTICE?',
  },
  {
    id: 'contact',
    name: 'HOW CAN YOU CONTACT US ABOUT THIS NOTICE?',
  },
  {
    id: 'request',
    name: 'HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?',
  },
];

export default function PrivacyPage() {
  const { hash } = useLocation();
  const navigate = useNavigate();
  const targetRefs = useRef<Map<string, HTMLElement>>(new Map());

  const handleScrollTo = useCallback(
    (target: string, e?: MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();

      targetRefs.current.get(target)?.scrollIntoView();

      if (`#${target}` !== hash) {
        navigate(`#${target}`);
      }
    },
    [hash, navigate]
  );

  useEffect(() => {
    if (hash) {
      handleScrollTo(hash.slice(1));
    }
  }, [hash, handleScrollTo]);

  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl font-medium text-neutral-500 dark:text-neutral-400 sm:text-4xl">
        Privacy Policy
      </h1>
      <small>Last updated July 01, 2022</small>
      <p>
        This privacy notice for Jason Ruesch (&quot;Company,&quot;
        &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how and
        why we might collect, store, use, and/or share (&quot;process&quot;)
        your information when you use our services (&quot;Services&quot;), such
        as when you:
      </p>
      <ul className="ml-4 mt-4 list-disc pl-4">
        <li>
          Visit our website at{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://jasonruesch.dev"
            target="_blank"
            rel="noreferrer"
          >
            https://jasonruesch.dev
          </a>
          , or any website of ours that links to this privacy notice
        </li>
        <li>
          Download and use our Facebook application (Jason Ruesch), or any other
          application of ours that links to this privacy notice
        </li>
        <li>
          Engage with us in other related ways, including any sales, marketing,
          or events
        </li>
      </ul>
      <p>
        Questions or concerns? Reading this privacy notice will help you
        understand your privacy rights and choices. If you do not agree with our
        policies and practices, please do not use our Services. If you still
        have any questions or concerns, please contact us at
        privacy@jasonruesch.dev.
      </p>

      <section
        id="summaryofkeypoints"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('summaryofkeypoints', el)}
      >
        <h2>Summary Of Key Points</h2>
        <p>
          <em>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            below to find the section you are looking for. You can also{' '}
            <a
              href="/privacy#toc"
              className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
              onClick={(e) => handleScrollTo('toc', e)}
            >
              click here to go directly to our table of contents.
            </a>
          </em>
        </p>
        <p>
          What personal information do we process? When you visit, use, or
          navigate our Services, we may process personal information depending
          on how you interact with Jason Ruesch and the Services, the choices
          you make, and the products and features you use.{' '}
          <a
            href="/privacy#personalinfo"
            className="cursor-pointer text-cyan-500 dark:text-violet-400"
            onClick={(e) => handleScrollTo('personalinfo', e)}
          >
            Click here to learn more.
          </a>
        </p>
        <p>
          Do we process any sensitive personal information? We do not process
          sensitive personal information.
        </p>
        <p>
          Do we receive any information from third parties? We do not receive
          any information from third parties.
        </p>
        <p>
          How do we process your information? We process your information to
          provide, improve, and administer our Services, communicate with you,
          for security and fraud prevention, and to comply with law. We may also
          process your information for other purposes with your consent. We
          process your information only when we have a valid legal reason to do
          so.{' '}
          <a
            href="/privacy#infouse"
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            onClick={(e) => handleScrollTo('infouse', e)}
          >
            Click here to learn more.
          </a>
        </p>
        <p>
          In what situations and with which parties do we share personal
          information? We may share information in specific situations and with
          specific third parties.{' '}
          <a
            href="/privacy#whoshare"
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            onClick={(e) => handleScrollTo('whoshare', e)}
          >
            Click here to learn more.
          </a>
        </p>
        <p>
          How do we keep your information safe? We have organizational and
          technical processes and procedures in place to protect your personal
          information. However, no electronic transmission over the internet or
          information storage technology can be guaranteed to be 100% secure, so
          we cannot promise or guarantee that hackers, cybercriminals, or other
          unauthorized third parties will not be able to defeat our security and
          improperly collect, access, steal, or modify your information.{' '}
          <a
            href="/privacy#infosafe"
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            onClick={(e) => handleScrollTo('infosafe', e)}
          >
            Click here to learn more.
          </a>
        </p>
        <p>
          What are your rights? Depending on where you are located
          geographically, the applicable privacy law may mean you have certain
          rights regarding your personal information.{' '}
          <a
            href="/privacy#privacyrights"
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            onClick={(e) => handleScrollTo('privacyrights', e)}
          >
            Click here to learn more.
          </a>
        </p>
        <p>
          How do you exercise your rights? The easiest way to exercise your
          rights is by filling out our data subject request form available{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://app.termly.io/notify/793f077a-7821-4f8d-993b-8e5d5ccd4cc3"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          , or by contacting us. We will consider and act upon any request in
          accordance with applicable data protection laws.
        </p>
        <p>
          Want to learn more about what Jason Ruesch does with any information
          we collect?{' '}
          <a
            href="/privacy#toc"
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            onClick={(e) => handleScrollTo('toc', e)}
          >
            Click here to review the notice in full.
          </a>
        </p>
      </section>
      <section
        id="toc"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('toc', el)}
      >
        <h2>Table Of Contents</h2>
        <ol className="list-inside list-decimal">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={`/privacy#${item.id}`}
                className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
                onClick={(e) => handleScrollTo(item.id, e)}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ol>
      </section>
      <section
        id="infocollect"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('infocollect', el)}
      >
        <h2>1. WHAT INFORMATION DO WE COLLECT?</h2>
        <h3
          id="personalinfo"
          ref={(el) => el && targetRefs.current.set('personalinfo', el)}
        >
          Personal information you disclose to us
        </h3>
        <p className="mb-4">
          <em>
            In Short: We collect personal information that you provide to us.
          </em>
        </p>
        <p>
          We collect personal information that you voluntarily provide to us
          when you express an interest in obtaining information about us or our
          products and Services, when you participate in activities on the
          Services, or otherwise when you contact us.
        </p>
        <p>
          Personal Information Provided by You. The personal information that we
          collect depends on the context of your interactions with us and the
          Services, the choices you make, and the products and features you use.
          The personal information we collect may include the following:
        </p>
        <ul className="ml-4 mt-4 list-disc pl-4">
          <li>names</li>
          <li>email addresses</li>
        </ul>
        <h3
          id="sensitiveinfo"
          className="mt-4"
          ref={(el) => el && targetRefs.current.set('sensitiveinfo', el)}
        >
          Sensitive Information
        </h3>
        <p>We do not process sensitive information.</p>
        <p>
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>
        <p>
          Information collected when you use our Facebook application(s). We by
          default access your{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://www.facebook.com/about/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook basic account information
          </a>
          , including your name, email, gender, birthday, current city, and
          profile picture URL, as well as other information that you choose to
          make public. We may also request access to other permissions related
          to your account, such as friends, check-ins, and likes, and you may
          choose to grant or deny us access to each individual permission. For
          more information regarding Facebook permissions, refer to the{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://developers.facebook.com/docs/facebook-login/permissions"
            target="_blank"
            rel="noreferrer"
          >
            Facebook Permissions Reference page.
          </a>
        </p>
      </section>
      <section
        id="infouse"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('infouse', el)}
      >
        <h2>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
        <p className="mb-4">
          <em>
            In Short: We process your information to provide, improve, and
            administer our Services, communicate with you, for security and
            fraud prevention, and to comply with law. We may also process your
            information for other purposes with your consent.
          </em>
        </p>
        <p>
          We process your personal information for a variety of reasons,
          depending on how you interact with our Services, including:
        </p>
        <ul className="ml-4 mt-4 list-disc pl-4">
          <li>
            To deliver and facilitate delivery of services to the user. We may
            process your information to provide you with the requested service.
          </li>
          <li>
            To respond to user inquiries/offer support to users. We may process
            your information to respond to your inquiries and solve any
            potential issues you might have with the requested service.
          </li>
        </ul>
      </section>
      <section
        id="whoshare"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('whoshare', el)}
      >
        <h2>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
        <p className="mb-4">
          <em>
            In Short: We may share information in specific situations described
            in this section and/or with the following third parties.
          </em>
        </p>
        <p>
          We may need to share your personal information in the following
          situations:
        </p>
        <ul className="ml-4 mt-4 list-disc pl-4">
          <li>
            Business Transfers. We may share or transfer your information in
            connection with, or during negotiations of, any merger, sale of
            company assets, financing, or acquisition of all or a portion of our
            business to another company.
          </li>
        </ul>
      </section>
      <section
        id="inforetain"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('inforetain', el)}
      >
        <h2>4. HOW LONG DO WE KEEP YOUR INFORMATION?</h2>
        <p className="mb-4">
          <em>
            In Short: We keep your information for as long as necessary to
            fulfill the purposes outlined in this privacy notice unless
            otherwise required by law.
          </em>
        </p>
        <p>
          We will only keep your personal information for as long as it is
          necessary for the purposes set out in this privacy notice, unless a
          longer retention period is required or permitted by law (such as tax,
          accounting, or other legal requirements). No purpose in this notice
          will require us keeping your personal information for longer than 90
          days .
        </p>
        <p>
          When we have no ongoing legitimate business need to process your
          personal information, we will either delete or anonymize such
          information, or, if this is not possible (for example, because your
          personal information has been stored in backup archives), then we will
          securely store your personal information and isolate it from any
          further processing until deletion is possible.
        </p>
      </section>
      <section
        id="infosafe"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('infosafe', el)}
      >
        <h2>5. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <p className="mb-4">
          <em>
            In Short: We aim to protect your personal information through a
            system of organizational and technical security measures.
          </em>
        </p>
        <p>
          We have implemented appropriate and reasonable technical and
          organizational security measures designed to protect the security of
          any personal information we process. However, despite our safeguards
          and efforts to secure your information, no electronic transmission
          over the Internet or information storage technology can be guaranteed
          to be 100% secure, so we cannot promise or guarantee that hackers,
          cybercriminals, or other unauthorized third parties will not be able
          to defeat our security and improperly collect, access, steal, or
          modify your information. Although we will do our best to protect your
          personal information, transmission of personal information to and from
          our Services is at your own risk. You should only access the Services
          within a secure environment.
        </p>
      </section>
      <section
        id="infominors"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('infominors', el)}
      >
        <h2>6. DO WE COLLECT INFORMATION FROM MINORS?</h2>
        <p className="mb-4">
          <em>
            In Short: We do not knowingly collect data from or market to
            children under 18 years of age.
          </em>
        </p>
        <p>
          We do not knowingly solicit data from or market to children under 18
          years of age. By using the Services, you represent that you are at
          least 18 or that you are the parent or guardian of such a minor and
          consent to such minor dependent&rsquo;s use of the Services. If we
          learn that personal information from users less than 18 years of age
          has been collected, we will deactivate the account and take reasonable
          measures to promptly delete such data from our records. If you become
          aware of any data we may have collected from children under age 18,
          please contact us at privacy@jasonruesch.dev.
        </p>
      </section>
      <section
        id="privacyrights"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('privacyrights', el)}
      >
        <h2>7. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        <p className="mb-4">
          <em>
            In Short: You may review, change, or terminate your account at any
            time.
          </em>
        </p>
        <p>
          If you are located in the EEA or UK and you believe we are unlawfully
          processing your personal information, you also have the right to
          complain to your local data protection supervisory authority. You can
          find their contact details here:{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
            target="_blank"
            rel="noreferrer"
          >
            https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
          </a>
        </p>
        <p>
          If you are located in Switzerland, the contact details for the data
          protection authorities are available here:{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://edoeb.admin.ch/edoeb/en/home.html"
            target="_blank"
            rel="noreferrer"
          >
            edoeb.admin.ch/edoeb/en/home.html.
          </a>
        </p>
        <p
          id="withdrawconsent"
          ref={(el) => el && targetRefs.current.set('withdrawconsent', el)}
        >
          <u>
            Withdrawing your consent: If we are relying on your consent to
            process your personal information, which may be express and/or
            implied consent depending on the applicable law, you have the right
            to withdraw your consent at any time. You can withdraw your consent
            at any time by contacting us by using the contact details provided
            in the section{' '}
            <a
              href="/privacy#contact"
              className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
              onClick={(e) => handleScrollTo('contact', e)}
            >
              &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
            </a>{' '}
            below.
          </u>
        </p>
        <p>
          However, please note that this will not affect the lawfulness of the
          processing before its withdrawal, nor when applicable law allows, will
          it affect the processing of your personal information conducted in
          reliance on lawful processing grounds other than consent.
        </p>
        <p>
          If you have questions or comments about your privacy rights, you may
          email us at privacy@jasonruesch.dev.
        </p>
      </section>
      <section
        id="DNT"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('DNT', el)}
      >
        <h2>8. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
        <p>
          Most web browsers and some mobile operating systems and mobile
          applications include a Do-Not-Track (&quot;DNT&quot;) feature or
          setting you can activate to signal your privacy preference not to have
          data about your online browsing activities monitored and collected. At
          this stage no uniform technology standard for recognizing and
          implementing DNT signals has been finalized. As such, we do not
          currently respond to DNT browser signals or any other mechanism that
          automatically communicates your choice not to be tracked online. If a
          standard for online tracking is adopted that we must follow in the
          future, we will inform you about that practice in a revised version of
          this privacy notice.
        </p>
      </section>
      <section
        id="caresidents"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('caresidents', el)}
      >
        <h2>9. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h2>
        <p className="mb-4">
          <em>
            In Short: Yes, if you are a resident of California, you are granted
            specific rights regarding access to your personal information.
          </em>
        </p>
        <p>
          California Civil Code Section 1798.83, also known as the &quot;Shine
          The Light&quot; law, permits our users who are California residents to
          request and obtain from us, once a year and free of charge,
          information about categories of personal information (if any) we
          disclosed to third parties for direct marketing purposes and the names
          and addresses of all third parties with which we shared personal
          information in the immediately preceding calendar year. If you are a
          California resident and would like to make such a request, please
          submit your request in writing to us using the contact information
          provided below.
        </p>
        <p>
          If you are under 18 years of age, reside in California, and have a
          registered account with Services, you have the right to request
          removal of unwanted data that you publicly post on the Services. To
          request removal of such data, please contact us using the contact
          information provided below and include the email address associated
          with your account and a statement that you reside in California. We
          will make sure the data is not publicly displayed on the Services, but
          please be aware that the data may not be completely or comprehensively
          removed from all our systems (e.g., backups, etc.).
        </p>
      </section>
      <section
        id="policyupdates"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('policyupdates', el)}
      >
        <h2>10. DO WE MAKE UPDATES TO THIS NOTICE?</h2>
        <p className="mb-4">
          <em>
            In Short: Yes, we will update this notice as necessary to stay
            compliant with relevant laws.
          </em>
        </p>
        <p>
          We may update this privacy notice from time to time. The updated
          version will be indicated by an updated &quot;Revised&quot; date and
          the updated version will be effective as soon as it is accessible. If
          we make material changes to this privacy notice, we may notify you
          either by prominently posting a notice of such changes or by directly
          sending you a notification. We encourage you to review this privacy
          notice frequently to be informed of how we are protecting your
          information.
        </p>
      </section>
      <section
        id="contact"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('contact', el)}
      >
        <h2>11. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
        <p>
          If you have questions or comments about this notice, you may email us
          at privacy@jasonruesch.dev.
        </p>
      </section>
      <section
        id="request"
        className="space-y-4"
        ref={(el) => el && targetRefs.current.set('request', el)}
      >
        <h2>
          12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
          YOU?
        </h2>
        <p>
          Based on the applicable laws of your country, you may have the right
          to request access to the personal information we collect from you,
          change that information, or delete it. To request to review, update,
          or delete your personal information, please submit a request form by
          clicking{' '}
          <a
            className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
            href="https://app.termly.io/notify/793f077a-7821-4f8d-993b-8e5d5ccd4cc3"
            target="_blank"
            rel="noreferrer"
          >
            here.
          </a>
        </p>
      </section>
      <section>
        <a
          className="font-medium text-cyan-500 hover:text-cyan-600 dark:text-violet-400 dark:hover:text-violet-500"
          href="https://www.vecteezy.com/free-vector/background"
          target="_blank"
          rel="noreferrer"
        >
          Background Vectors by Vecteezy
        </a>
      </section>
    </div>
  );
}
