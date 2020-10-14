import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Link from 'next/link'
import './style.scss';
import { withRouter } from 'next/router';
import bodyImage from '../../../public/images/about-us.jpg';
import FaIcon from '../../components/fontAwesomeIcon';
import { Helmet } from 'react-helmet';

const AboutUs = ({ router }) => {
    const { slug } = router.query;
    return (
        <div className="about-us-page">
            <Helmet>
                <script type="text/javascript" src="https://app.fllw.co/widget.js" id="Fllwco-Widget-Script"
                    data-config="{'name': 'fllwr', 'config': {'targetElementId': 'fllw-root','type' : 'facebook','campaignId': 4}}"></script>
            </Helmet>
            <Container>
                <div className="py-4">
                    {
                        slug === 'giggedin' &&
                        <div className="about-giggedin-body">
                            <Row>
                                <Col xs={12} className="d-flex justify-content-center mt-4">
                                    <div className="about-us-image background-image-responsive" style={{
                                        backgroundImage: `url('${bodyImage}')`
                                    }}></div>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                <Col xs={12} sm={6}>
                                    <div className="about-giggedin-header mb-3">
                                        <h3 className="about-giggedin-header__text">At <span className="about-giggedin-header__giggedin-name">GiggedIn</span>, we</h3>
                                        <h3 className="about-giggedin-header__text">{'believe in 3 things:'}</h3>
                                    </div>
                                    <div className="about-giggedin-body first-block-item">
                                        <FaIcon
                                            name="faArrowRight"
                                            size={'sm'}
                                            color={'#333'}
                                        />
                                        <span className="first-block-item__text">{'More shared experiences = More fulfilment in life'}</span>
                                    </div>
                                    <div className="about-giggedin-body first-block-item ">
                                        <FaIcon
                                            name="faArrowRight"
                                            size={'sm'}
                                            color={'#333'}
                                        />
                                        <span className="first-block-item__text">{'Supporting artists and our industry'}</span>
                                    </div>
                                    <div className="about-giggedin-body first-block-item">
                                        <FaIcon
                                            name="faArrowRight"
                                            size={'sm'}
                                            color={'#333'}
                                        />
                                        <span className="first-block-item__text">{'Giving back to the community'}</span>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <div className="mb-4 next-block-item__text-b">{`Over the past few years, GiggedIn has grown to become the #1 subscription service for live music and entertainment loved by thousands of Aussies until it all came to a screeching halt in the historic events of March 2020.`}</div>
                                    <div className="next-block-item__text-b">{`With all that's happened, we've turned our attention to using technology to bring artists and fans closer together both at home and across borders.`}</div>
                                </Col>
                            </Row>
                        </div>
                    }
                    {
                        slug === 'terms-and-conditions' &&
                        <>
                            <h4 className="about-us-page__title">{'Our Terms and Conditions'}</h4>
                            <p className="about-us-page__des">{`Welcome to the Terms and Conditions (or "Agreement"). This Agreement describes the terms and conditions that govern your use of our services at giggedIn.com and experience.giggedin.com (our "Site" or "Platform"). Before you may become a member or user of our Site you must read, agree with and accept all of the terms and conditions contained in this Agreement and the Platform's policies, including its Privacy Policy (the "Policies"). These Policies change from time to time. If we do, we’ll let you know about any material changes, either by notifying you on the Site or by sending you an email.`}</p>
                            <p className="about-us-page__des">{`Our Privacy Policies may be accessed here: `}
                                <Link href={{ pathname: '/about-us/[slug]' }} as={'/about-us/privacy-and-policy'}  >
                                    <a className="support-art-email-us">Privacy Policy</a>
                                </Link>
                            </p>
                            <p className="about-us-page__des">{`Each time you use our services you confirm your agreement to be bound by and acknowledge any changes to the Agreement (including the Policies). You also undertake to familiarise yourself with and comply with the Policies relevant to your use of our Site and the services provided under this Agreement (as may be amended from time to time). As you read this Agreement, you should also access and read the information contained in the other pages and websites referred to in this Agreement.`}</p>
                            <p className="about-us-page__des">{`By accepting this Agreement (including the Policies) you agree to be bound by it and also the User Agreements and posted terms and conditions on other websites operated by the Platform, by GiggedIn the technology provider and its related and affiliated companies, to the extent that you use those websites.`}</p>
                            <p className="about-us-page__des">{`We may amend the terms and conditions of this Agreement from time to time.. Except as stated in this Agreement, in a Policy, or as otherwise notified to you, all amended terms will automatically be effective immediately. Your continued use of the Service following the posting of any changes to the Terms and Conditions constitutes acceptance of those changes. If you do not agree with such changes to this Agreement (or any of our Policies), you must terminate your membership or use with the Platform. If, after any such changes to this Agreement or any of our Policies you continue to be a member or user of our Site, you will be considered by us to have accepted the varied terms as part of the Agreement`}</p>
                            <p className="about-us-page__des">{`In this Agreement where the context permits a reference to "you" includes anyone acting on your behalf or with your express or implied authority. A reference to this Agreement includes the Policies, unless stated otherwise.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'The Platform'}</h4>
                            <p className="about-us-page__des">{`The Platform is a Service Provider`}</p>
                            <p className="about-us-page__des">{`The Platform is an online service which acts to allow members and users who comply with the Platform's policies to offer, sell and buy certain goods or experiences within a fixed-price format. The Platform (and Policies) allows individuals, groups and organisations which may include as an example, but are not exclusive to musicians/creatives/celebrities and their teams ("Artists") to list projects or activations (“Experiences”) through selling items such as virtual experiences, merchandise, physical music goods, tickets and anything else by offering items and services ("Packages") to new and existing GiggedIn members and users ("Fans").`}</p>
                            <p className="about-us-page__des">{`The Platform is not directly involved in the transaction between Artists and Fans. As a result, The Platform has no control over the quality, safety, morality or legality of any aspect of the Packages listed, the truth or accuracy of the listings, the ability of Artists to sell Packages or the ability of Fans to pay for Packages. The Platform cannot ensure that a Artist or a Fan will actually complete a transaction. The Platform cannot guarantee the true identity, age, and nationality of a member or user.`}</p>
                            <p className="about-us-page__des">{`You agree that the Platform is only a service provider  and as such is not responsible or liable for any content, for example, data, text, information, graphics, images, photographs, profiles, audio, video, items, and links posted by Artists, other members, users, or outside parties on the Platform. You use the Platform service at your own risk.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Experiences'}</h4>
                            <p className="about-us-page__des">{`All funds are collected for Artists through the  Stripe online payment service and/or the Platform Credit/Debit Card Merchant facility. The Platform collects and transfers these funds to the Artist less fees at the end of a successfully executed experience..`}</p>
                            <p className="about-us-page__des">{`The Platform shall not be liable for the interactions with any organisations and/or individuals found on or through the Platform service. This includes, but is not limited to, delivery of goods and services, and any other terms, conditions, warranties or representations associated with listings on the Platform.`}</p>
                            <p className="about-us-page__des">{`The Platform cannot be held liable for the actions of any Artists  Artists are nevertheless wholly responsible for fulfilling obligations both implied and stated in any experience listing they create. The Platform does not oversee the performance or punctuality of Experiences or Packages.`}</p>
                            <p className="about-us-page__des">{`The Platform reserves the right to cancel an experience and refund all associated members' or user payments at any time for any reason. The Platform reserves the right to remove a experience from public listings for any reason.`}</p>
                            <p className="about-us-page__des">{`The Platform is not responsible for any damage or loss incurred as a result of any dealings on the platform. All dealings are solely between you and such individuals and/or organisations. The Platform is under no obligation to become involved in disputes between Artists and fans, or between any members, users or any other third party. In the event of a dispute, you release GiggedIn and GiggedIn employees, partners and successors in rights from claims, damages and demands of every kind, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and our service.`}</p>
                            <p className="about-us-page__des">{`The Platform cannot guarantee the performance or reliability of the Stripe online payment service.`}</p>
                            <p className="about-us-page__des">{`The Artists and Fans must also agree and comply with the Stripe Acceptable Use Policy.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Packages'}</h4>
                            <p className="about-us-page__des">{`By listing an Experience Package(s) on the Site you warrant that you and all aspects of the Package comply with the Platform's published policies. You also warrant that you may legally sell the Package(s). You must accurately describe your Package and all terms of sale in your Experience Description and the Package description. Your listings may only include text descriptions, graphics, pictures, videos, photographs and other content relevant to the sale of that Package. Each Package must accurately and completely describe the item(s) or experiences on offer. ve`}</p>
                            <p className="about-us-page__des">{`All Artists are urged to outline seller policies for their Experience. These policies may include, for example, shipping, returns, payment and selling policies. Artists must create reasonable policies in good faith and must abide by such policies. All seller policies must comply with the Platform's site-wide policies. Artists are responsible for enforcing their own reasonable seller policies. The Platform reserves the right to request that an Artist modify a seller policy.`}</p>
                            <p className="about-us-page__des">{`All sales are binding. The seller is obligated to ship the Package(s) or otherwise complete the transaction with the Fan, unless there is an exceptional circumstance, such as: (a) the Fan fails to meet the terms of the Artists listing (such as payment method), or (b) the Artist cannot authenticate the Fan’s identity. The Fan is obligated to deliver appropriate payment for Packages purchased, unless there is an exceptional circumstance.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Prohibited, Questionable and Infringing Packages, Items and Activities'}</h4>
                            <p className="about-us-page__des">{`You are solely responsible for your conduct and activities on and regarding to the Platform and any and all data, text, information, graphics, images, photographs, profiles, audio, video, items, and links (together, "Content") that you submit, post, and display on the Site.`}</p>
                            <p className="about-us-page__des">{`Your Content and your use of the Platform shall not:`}</p>
                            <ul className="about-us-page__des-list">
                                <li className="about-us-page__des-list-item">{'Be false, inaccurate or misleading'}</li>
                                <li className="about-us-page__des-list-item">{'Be fraudulent or involve the sale of illegal, counterfeit or stolen items'}</li>
                                <li className="about-us-page__des-list-item">{`Infringe upon any third-party's copyright, patent, trademark, trade secret or other proprietary or intellectual property rights or rights of publicity or privacy`}</li>
                                <li className="about-us-page__des-list-item">{`Violate this Agreement, any site policies, any community guidelines, any Experience guidelines, or any applicable laws, statute, ordinance or regulation (including, but not limited to, those governing export control, consumer protection, unfair competition, antidiscrimination or false advertising)`}</li>
                                <li className="about-us-page__des-list-item">{`Contain items that have been identified by your local government as hazardous to consumers and therefore subject to a recall`}</li>
                                <li className="about-us-page__des-list-item">{`Be defamatory, trade libelous, unlawfully threatening, unlawfully harassing, or impersonate or intimidate any person (including GiggedIn staff or other users), or falsely state or otherwise misrepresent your affiliation with any person, through for example, the use of similar email address, nicknames, or creation of false account(s) or any other method or device`}</li>
                                <li className="about-us-page__des-list-item">{`Be obscene or contain child pornography`}</li>
                                <li className="about-us-page__des-list-item">{`Contain or transmit any code of a destructive nature that may damage, detrimentally interfere with, surreptitiously intercept or expropriate any system, data or personal information`}</li>
                                <li className="about-us-page__des-list-item">{`Host images not part of a listing`}</li>
                                <li className="about-us-page__des-list-item">{`Modify, adapt or hack GiggedIn or modify another website so as to falsely imply that it is associated with the Site;`}</li>
                                <li className="about-us-page__des-list-item">{`Appear to create liability for GiggedIn or cause GiggedIn to lose (in whole or in part) the services of GiggedIn's ISPs or other suppliers`}</li>
                                <li className="about-us-page__des-list-item">{`Link directly or indirectly, refer or contain descriptions of goods, experiences or services that are prohibited under this Agreement, the Privacy Policy, or other policy documents as posted on the Site.`}</li>
                                <li className="about-us-page__des-list-item">{`Furthermore, you may not list any item on the Platform (or consummate any transaction that was initiated using Platform's service) that, by paying to Platform the listing fee or the final value fee, could cause GiggedIn to violate any applicable law, statute, ordinance or regulation, or that violates the Terms of Use.`}</li>
                            </ul>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Fees'}</h4>
                            <p className="about-us-page__des">{`Registering as a member of the Site or user and setting up a Experience on the Platform is free. The Platform charges fees to Artists.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Charitable Donations'}</h4>
                            <p className="about-us-page__des">{`Experiences may have a variable portion of all proceeds donated toward a charity. Donation processing is treated the same as Packages and will not be processed until after a successful Experience is executed by the Artist. The standard Platform service and transaction fees are applicable.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Delivery, Refunds and Chargebacks'}</h4>
                            <p className="about-us-page__des">{`Funds collected for Experiences and Pacakges through the platform are nonrefundable and the Platform is not responsible for issuing refunds to Fans. The Platform transfers the funds to the Artists after Experiences are successfully executed. Artists may initiate refunds at their own discretion. If, for any reason, the Platform is required to refund monies to Fans, the Artist will fully compensate the Platform for the amount refunded as well as any associated costs, including but not limited to transaction or administrative costs.`}</p>
                            <p className="about-us-page__des">{`The Artist is wholly responsible for meeting any obligation or Package stated or implied in their Experience. The Platform is not responsible for the delivery of Packages stated in Experiences. Fans should contact the Artist if the delivery terms are not clearly stated in the Experience description.`}</p>
                            <p className="about-us-page__des">{`Like all Policies, we may change our fees policy and the fees for our services. We may choose to temporarily change our fees policy and the fees for our services for promotional events or other circumstances. If we introduce a new service, the fees for that service are effective at the launch of the service. Unless otherwise stated, all fees are quoted in the currency of the Experience or Package. You are responsible for paying all fees associated with using our services and our Site and all applicable taxes (including any goods and services or value added taxes, which will be added to amounts billed to you, if applicable). The Platform fees must never be mentioned on Experience or Package but you may wish to consider the Platform fees when determining the price points of Packages and Experiences.`}</p>
                            <p className="about-us-page__des">{`The Artist agrees to be accountable and responsible for settling any disputes, refund requests and chargebacks from Fans. If these chargebacks are deducted from the Platform's account after the Experience and Package funds have been transferred, The Artist agrees to transfer the equivalent amount plus any related fees back to the Platform.`}</p>
                            <p className="about-us-page__des">{``}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Electronic Communications'}</h4>
                            <p className="about-us-page__des">{`The communications between you and the Platform use electronic means, whether you visit the Site or send us emails. For contractual purposes, you (a) consent to receive communications from GiggedIn in an electronic form; and (b) agree that all terms and conditions, agreements, notices, disclosures, and other communications that GiggedIn provides to you electronically satisfy any legal requirement that such communications would satisfy if it were in writing. The foregoing does not affect your non-waivable rights.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Support'}</h4>
                            <p className="about-us-page__des">{`The Platform does provide limited support for the Software or Service. However, the Platform may provide access to a protected forum for the users and members to send any questions and/or comments regarding the Software or Service. The Platform does not, however, make any representations or warranties as to the accuracy of any statements or advice provided in response to support postings.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Usage'}</h4>
                            <p className="about-us-page__des">{`Improper Usage of the Platform. We reserve the right to reduce, liquidate, deactivate, suspend or terminate any website  membership, use or access if we terminate the Service or if we suspect, after investigation, that you have misused the GiggedIn service, violated the terms of this Agreement, or have otherwise used the GiggedIn service to conduct any fraudulent or illegal activity.`}</p>
                            <p className="about-us-page__des">{`In the event an account is suspended or terminated for your breach of this Agreement (in each case as determined in our sole discretion), the Platform may suspend or terminate the account associated with such breach and any or all other accounts held by you or your affiliates, and your breach shall be deemed to apply to all such accounts.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'General Terms'}</h4>
                            <p className="about-us-page__des">{`You and we are independent contractors, and nothing in this Agreement creates a partnership, employment relationship or agency. There are no third-party beneficiaries of this Agreement. You may not assign this Agreement or your rights and obligations hereunder, in whole or in part, to any third party without our prior written consent, and any attempt by you to do so will be invalid. Should any part of this Agreement be held invalid or unenforceable, that portion will be construed consistent with applicable law and the remaining portions will remain in full force and effect. Our failure to enforce any provision of this Agreement will not be considered a waiver of the right to enforce such provision. Our rights under this Agreement will survive any termination of this Agreement. The Platform will not be liable for any delay or failure to provide its services caused by a factor outside the Site's reasonable control (including but not limited to any act of God, war, breakdown of plant, industrial dispute, electricity failure, governmental or legal restraint).`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Your Information'}</h4>
                            <p className="about-us-page__des">{`Definition. "Your Information" means any item you list as well as any information you give to us or other members in the registration or listing process, in any public message area (including the discussion boards and in feedback) or through any email feature. Your Information also includes the Experience information you list for sale or display on our Site, as well as any content you post on other web pages within our Site (including photographs or other images).`}</p>
                            <p className="about-us-page__des">{`You are solely responsible for Your Information. We act as a passive conduit for your online distribution and publication of Your Information.`}</p>
                            <p className="about-us-page__des">{`Your Information must not, in any way whatsoever, be potentially or actually harmful to the Platform or any third party, where "harm" includes, but is not limited to non-economic loss that will or may be suffered by the Platform. The Policies contain detailed statements of prohibited conduct relating to Your Information. Without limiting any provision of this Agreement, Your Information must be up to date and kept up to date and must not:`}</p>
                            <ul className="about-us-page__des-list">
                                <li className="about-us-page__des-list-item">{'be false, inaccurate or misleading or deceptive;'}</li>
                                <li className="about-us-page__des-list-item">{'be fraudulent or involve the sale of counterfeit or stolen items;'}</li>
                                <li className="about-us-page__des-list-item">{`infringe any third party's copyright, patent, trademark, trade secret or other proprietary rights or intellectual property rights, rights of publicity, confidentiality or privacy;`}</li>
                                <li className="about-us-page__des-list-item">{`violate any applicable law, statute, ordinance or regulation (including, but not limited to, those governing export and import control, consumer protection, unfair competition, criminal law, antidiscrimination and trade practices/fair trading laws);`}</li>
                                <li className="about-us-page__des-list-item">{`be defamatory, libellous, threatening or harassing;`}</li>
                                <li className="about-us-page__des-list-item">{`be obscene or contain any material that, in the Platform's sole and absolute discretion, is in any way inappropriate or unlawful, including, but not limited to obscene, inappropriate or unlawful images and, if otherwise adult in nature, shall be distributed only to people legally permitted to receive such`}</li>
                                <li className="about-us-page__des-list-item">{`Be obscene or contain child pornography`}</li>
                                <li className="about-us-page__des-list-item">{`contain any content that is prohibited or that, in the Platform's sole and absolute discretion, may be prohibited content;`}</li>
                                <li className="about-us-page__des-list-item">{`contain any malicious code, data or set of instructions that intentionally or unintentionally causes harm or subverts the intended function of the Platform, including, but not limited to viruses, Trojan horses, worms, time bombs, cancelbots, easter eggs or other computer programming routines that may damage, modify, delete, detrimentally interfere with, surreptitiously intercept, access without authority or expropriate any system, data or personal information;`}</li>
                                <li className="about-us-page__des-list-item">{`create liability for us or cause us to lose (in whole or in part) the services of our ISPs or other suppliers; or`}</li>
                                <li className="about-us-page__des-list-item">{`link directly or indirectly to or include descriptions of goods or services that are prohibited under this Agreement;`}</li>
                            </ul>
                            <p className="about-us-page__des">{`Solely to enable the Platform to use the information you supply us with, so that we are not violating any rights you might have in that information, you agree to grant us a nonexclusive, worldwide, perpetual, irrevocable, royalty-free, sub-licensable (through multiple tiers) right to do and authorise the doing of all acts comprised in the copyright and to exercise the publicity, and database rights (but no other rights) you have in Your Information, in any media now known or not currently known, with respect to Your Information. The Platform will only use Your Information in accordance with our Privacy Policy (located here). We need this to use and display your content.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Tax & Legal Compliance'}</h4>
                            <p className="about-us-page__des">{`In addition to this Agreement, you must familiarise yourself with, and comply with the Policies, domestic laws (including common law), state legislation, international laws, statutes, ordinances and regulations regarding your use of our services including listing and/or purchasing Experiences or Packages. In particular, you must ensure that your activities, Experiences and Pacakges you list (which is part of Your Information), and the balance of Your Information do not violate the Broadcasting Services Act 1992 (Cth), the Trade Practices Act 1974 (Cth) and other relevant country based fair trading legislation. Notwithstanding successful conclusion of a transaction you must ensure strict compliance with any particular formalities which, if not complied with, will either render a transaction void or unlawful (eg. the sale of interests in real property ordinarily requires a written document to be created).`}</p>
                            <p className="about-us-page__des">{`Artists alone, and not the Platform, are responsible for ensuring that the Experiences and Packages and any other activities conducted on the Site are lawful. Artists must ensure that they comply with all applicable laws in Australia and all other countries. Artists must also ensure that they strictly comply with this agreement and the policies which form part of the agreement.`}</p>
                            <p className="about-us-page__des">{`Artists should comply with country, state and federal regulations.`}</p>
                            <p className="about-us-page__des">{`Artists should be aware that funds generated using the Platform could be taxable income. It is the Artist's responsibility to declare the funds and comply with local tax laws.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Governing Law'}</h4>
                            <p className="about-us-page__des">{`These terms and conditions are governed in all respects by the laws of Australia and any action arising under them or in any way connected with the Platform service may be brought only in a court in Australia, subject to any law which is expressly inconsistent with this.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Further Information'}</h4>
                            <p className="about-us-page__des">{`Commercially available parental control protections (such as computer hardware, software, or filtering services) may help you to limit access to material that is harmful to persons under the age of 18 years.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'Contact information'}</h4>
                            <p className="about-us-page__des">Contact us on
                                <a
                                    target="_blank"
                                    href="mailto:contact@giggedin.com"
                                    className="support-art-email-us"
                                >
                                    {' contact@giggedIn.com'}
                                </a> if you have any questions.</p>
                            <p className="about-us-page__des">{`Disputes between you and the Platform regarding the website services, complaints or suggestions should be reported to technical support through email `}
                                <a
                                    target="_blank"
                                    href="mailto:contact@giggedin.com"
                                    className="support-art-email-us"
                                >
                                    {'contact@giggedIn.com'}
                                </a></p>
                        </>
                    }
                    {
                        slug === 'privacy-and-policy' &&
                        <>
                            <h4 className="about-us-page__title">{'1. Note About Children'}</h4>
                            <p className="about-us-page__des">{`Children (persons under the age of 18 years) are not eligible to use our services unsupervised and we ask that children do not submit any personal information to us. If you are under the age of 18 years, you can use this service only in conjunction with and under the supervision of your parents or guardians.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'2. Information We Collect'}</h4>
                            <p className="about-us-page__des">{`Our primary purpose in collecting personal information is to provide you with a smooth, efficient, safe and customised experience. This allows us to provide services and features that most likely meet your needs, and to customise our services to make your experience safer and easier.`}</p>
                            <p className="about-us-page__des">{`To fully use our services, you will need to register using our online registration form, where you will be required to provide us with your contact information and other personal information. You are required to provide us with your full name. Under some circumstances we may require some additional necessary financial information, such as, but not limited to: if you are registering using an email account at a free email service, or posting an Experience or Package on our site. We use your financial information, including credit card information to verify your name, address, and other contact information.`}</p>
                            <p className="about-us-page__des">{`We automatically track certain information about you based upon your behaviour on our Site. We use this information to do internal research on our users' demographics, interests, and behaviour to better understand and serve you and our community. This information is compiled and analysed on an aggregated basis. This information may include the URL that you just came from (whether this URL is on our Site or not), which URL you next go to (whether this URL is on our Site or not), what browser you are using, and your IP address.`}</p>
                            <p className="about-us-page__des">{`We use data collection devices such as "cookies" on certain pages of our Site. "Cookies" are small files placed on your hard drive that assist us in providing customised services. We also offer certain features that are only available through the use of a "cookie". We also use "cookies" to allow you to enter your password less frequently during a session. Cookies can also help us provide information which is targeted to your interests. Cookies are stored on your hard drive, not on our Site. Most cookies are "session cookies," meaning that they are automatically deleted at the end of a session. You are always free to decline our cookies if your browser permits, although in that case you may not be able to use certain features on our Site and you may be required to re-enter your password more frequently during a session.`}</p>
                            <p className="about-us-page__des">{`Additionally, you may encounter "cookies" or other similar devices on certain pages of our Site that are placed by third parties. For example, if you view a web page created by a user, there may be a "cookie" placed within that web page. We do not control the use of cookies by third parties.`}</p>
                            <p className="about-us-page__des">{`If you are an Artist or list any Experience or Package with us, we may choose to collect some additional necessary information, including billing address, credit card number and credit card expiration date and bank account details.`}</p>
                            <p className="about-us-page__des">{`If you choose to post messages in our site or other message areas or leave feedback for other users, we will collect and store such information that you disclose to us.`}</p>
                            <p className="about-us-page__des">{`If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the Site, we may collect such information into a file specific to you.`}</p>
                            <p className="about-us-page__des">{`If you register and sign-up on the Platform, on another website or use a web site providing a service for the Platform or a website that helps facilitate your activity on the Platform, that website may provide personal information about you and your transactions back to the Platform.`}</p>
                            <p className="about-us-page__des">{`Payment Information is transmitted securely using Secure Sockets Layer (SSL) encryption technology and processed through a secure third party payment gateway (PCI DSS Compliant). The platform does not store your payment information (such as credit card or debit card information) on the Platform servers or databases.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'3. Our Use of Your Information'}</h4>
                            <p className="about-us-page__des">{`We use personal information about you (including but not limited to the information in the file we maintain about you, and other information we obtain from your current and past activities on the Site) to resolve disputes, troubleshoot problems, help ensure safe trading on our Site, and enforce our User Agreement. At times, we may look across multiple users to identify problems or resolve disputes, and in particular we may examine your information to identify users using multiple Usernames or aliases.`}</p>
                            <p className="about-us-page__des">{`If you choose to post an Experience or Package on our Site, we use your address and billing information to bill you and provide associated support.`}</p>
                            <p className="about-us-page__des">{`You agree that we may use personal information about you to improve our marketing and promotional efforts, to analyse site usage, to improve our content and product offerings and customise our Site's content, layout, and services. These uses improve our Site and better tailor it to meet your needs, so as to provide you with a smooth, efficient, safer and customised experience while using our services.`}</p>
                            <p className="about-us-page__des">{`You agree that we may use your information to contact you and deliver information to you that, in some cases, is targeted to your interests, such as administrative notices, product offerings, and communications relevant to your use of the Site. By accepting the User Agreement and Privacy Policy you expressly agree to receive this information.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'4. Our Disclosure of Your Information'}</h4>
                            <p className="about-us-page__des">{`If you have registered or purchased any package or engaged with any Experience on GiggedIn, a record of your booking data is made available to the Artist and their team in order for them to fulfill Pacakge orders as well as for their records, analysis and to allow them to execute the Experience most effectively.`}</p>
                            <p className="about-us-page__des">{`Artists will be entitled to contact you directly in respect of future offers. The applicable artist and/or team may then use these details to contact you with information and offers regarding future promotions.`}</p>
                            <p className="about-us-page__des">{`These parties will use your personal information in accordance with their own privacy policies. If the applicable artist contacts you and you wish to unsubscribe from this communication or if you have any questions regarding their privacy policy you should contact them directly.`}</p>
                            <p className="about-us-page__des">{`We may disclose your information to our service providers and contractors from time to time to help us provide and market our goods and services to you. Examples of such third party service providers and contractors include call centre operators, software contractors and email/SMS providers. We may also share your information with third parties who provide prizes for competitions or special offers in connection with our goods and services or advertise with us. If we do this we require these parties to protect your information in the same way we do.`}</p>
                            <p className="about-us-page__des">{``}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{`5. Your Use of Other Users' Information`}</h4>
                            <p className="about-us-page__des">{`In order to facilitate the fulfillment of goods and services within Packages and Experiences among all members and users, our service allows you limited access to other users' contact information. As an Artist you have access to the full names, email address and other contact information of the Fan.`}</p>
                            <p className="about-us-page__des">{`By entering into our Terms and Conditions, you agree that, with respect to other users' personal information that you obtain through the Site or through a Platform-related communication or facilitated transaction, the Platform hereby grants to you a license to use such information only for:`}</p>
                            <p className="about-us-page__des">{`Platform-related communications that are not unsolicited commercial messages, using co-branded services offered through the Site (e.g. insurance, shipping and fraud complaints), and any other purpose that such user expressly opts into after adequate disclosure of the purpose(s).`}</p>
                            <p className="about-us-page__des">{`In all cases, you must give users an opportunity to remove themselves from your database and a chance to review what information you have collected about them. In addition, under no circumstances, except as defined in this Section, can you disclose personal information about another user to any third party without our consent and the consent of such other user after adequate disclosure. Note that law enforcement personnel and other rights holders are given different rights with respect to information they access.`}</p>
                            <p className="about-us-page__des">{`We and our users do not tolerate spam. Therefore, without limiting the foregoing, you are not licensed to add a Platform member or user, even a user who has purchased an item from you, to your mail list (email or physical mail) without their express consent after adequate disclosure. To report spam from other members, please send an email using the contact details at the bottom of this page.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'6. Use of Email Tools'}</h4>
                            <p className="about-us-page__des">{`You may not use the send a message service or other email forwarding services that we offer to send spam or otherwise send content that would violate our Terms and Conditions or Privacy Policy.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'7. Control of Your Password'}</h4>
                            <p className="about-us-page__des">{`You are responsible for all actions taken with your password, including fees. Therefore we do not recommend that you disclose your Platform password to any third parties. If you choose to share your password or your information with third parties to provide you additional services, you agree that you are responsible for all actions taken with your password and therefore you should review that third party's privacy policy. If you lose control of your password, you may lose substantial control over your personal information and may be subject to legally binding actions taken on your behalf. Therefore, if your password has been compromised for any reason, you should immediately change your password as detailed in Section 8.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'8. Accessing, Reviewing and Changing Your Personal Information'}</h4>
                            <p className="about-us-page__des">{`Following registration, you can review and change the information you submitted during registration including:`}</p>
                            <p className="about-us-page__des">{`Your registration information such as: name, company, address, city, state, post code, country, primary phone number, secondary phone number, fax number and gender.`}</p>
                            <p className="about-us-page__des">{`Your password (if you have supplied such information).`}</p>
                            <p className="about-us-page__des">{`You must promptly update your personal information if it changes. Once posted, you cannot change or remove any public postings made in our forums or other message areas or the feedback area.`}</p>
                            <p className="about-us-page__des">{`Upon your request, we will delete your account, contact information, and financial information from our active databases within a 30 day period. To make this request, please send an email using the contact details at the bottom of this page.`}</p>
                            <p className="about-us-page__des">{`Upon your request, we will provide a complete record of the data we have for you on file. We will provide this data in a JSON format within a 30 day period. To make this request, please send an email using the contact details at the bottom of this page.`}</p>
                            <p className="about-us-page__des">{`We will retain in our files information you have requested to remove in some circumstances, such as to prevent fraud, resolve disputes, troubleshoot problems, assist with any investigations, and enforce our Terms and Conditions, and to comply with legal requirements. Further, such prior information is never completely removed from our databases due to technical constraints and the fact that we backup our systems. Therefore, you should not expect that all of your personal information will be completely removed from our databases in response to your requests. However, such information will be deactivated from public viewing and usage by other members of the Platform and will only be available to select platform staff and personnel.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'9. Other Information Collectors'}</h4>
                            <p className="about-us-page__des">{`Except as otherwise expressly discussed in this Privacy Policy, this document only addresses the use and disclosure of information we collect from you. To the extent that you disclose your information to other parties, whether they are Artists or Fans on our Site or other sites throughout the Internet, different rules may apply to their use or disclosure of the personal information you disclose to them. To the extent that we use third party advertisers, they adhere to their own privacy customs and policies. Since the Platform does not control the privacy policies of third parties, you are subject to the privacy policies of that third party. We encourage you to ask questions before you disclose your personal information to others.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'10. Security'}</h4>
                            <p className="about-us-page__des">{`Your Information is stored on Site's servers currently located in Australia. We use industry standard efforts to safeguard the confidentiality of your personal information, such as firewalls and encrypted pages and Secure Socket Layers (SSL). However, "perfect security" does not exist on the Internet.`}</p>
                            <p className="about-us-page__des">{`In the event a data breach is found, we will notify all EU residents in a 72 hour period of the breach.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'11. Notice'}</h4>
                            <p className="about-us-page__des">{`We may change this Privacy Policy from time to time based on your comments and our need to accurately reflect our data collection and disclosure practices. All changes to this policy are effective after we provide you with at least thirty (30) days' notice of the changes by posting the changes on the Site and sending email to users who select such notification preference. We provide you with thirty (30) days notice to allow you the opportunity to notify the Site if you do not agree to such changes as described.`}</p>
                            <p className="about-us-page__des">{`If you have any questions, please contact `}
                                <a
                                    target="_blank"
                                    href="mailto:contact@giggedin.com"
                                    className="support-art-email-us"
                                >
                                    {'contact@giggedIn.com'}
                                </a></p>
                            <div className="separate-line my-4"></div>
                        </>
                    }
                </div>
            </Container>
        </div>
    )
}

export default withRouter(AboutUs);