import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView
} from "react-native";
import React from "react";
import MainHeader from "../../components/MainHeader";

const TermsOfService = ({ navigation }) => {
  return (
    <SafeAreaView style={TermsOfService_Styles.container}>
     <MainHeader screen="Terms Of Service" navigation={navigation} />
     <ScrollView>
       {/* terms of service text */}
        <Text style={TermsOfService_Styles.termsText}>
          
Welcome to Bird Nest!{"\n\n"}

These Terms of Use (or "Terms") govern your use of Bird Nest, except where we expressly state that separate terms (and not these) apply, and provide information about the Bird Nest Service (the "Service"), outlined below. When you create a Bird Nest account or use Bird Nest, you agree to these terms.{"\n\n"}

The Bird Nest Service is one provided to you by Team Vulcan. These Terms of Use therefore constitute an agreement between you and Team Vulcan.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  ARBITRATION NOTICE: YOU AGREE THAT DISPUTES BETWEEN YOU AND US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION. WE EXPLAIN SOME EXCEPTIONS AND HOW YOU CAN OPT OUT OF ARBITRATION BELOW.{"\n\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  The Bird Nest Service{"\n\n"}
</Text>

We agree to provide you with the Bird Nest Service. The Service includes all of the Bird Nest products, features, applications, services, technologies, and software that we provide to advance Bird Nest's mission: To bring you closer to the people and things you love. The Service is made up of the following aspects:{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	Offering personalized opportunities to create, connect, communicate, discover, and share.{"\n"}
</Text>
People are different. We want to strengthen your relationships through shared experiences you actually care about. So we build systems that try to understand who and what you and others care about, and use that information to help you create, find, join, and share in experiences that matter to you. Part of that is highlighting content, features, offers, and accounts you might be interested in, and offering ways for you to experience Bird Nest, based on things you and others do on and off Bird Nest.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	Fostering a positive, inclusive, and safe environment.{"\n"}
</Text>
We develop and use tools and offer resources to our community members that help to make their experiences positive and inclusive, including when we think they might need help. We also have teams and systems that work to combat abuse and violations of our Terms and policies, as well as harmful and deceptive behavior. We use all the information we have-including your information-to try to keep our platform secure. We also may share information about misuse or harmful content with law enforcement.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	Developing and using technologies that help us consistently serve our growing community.{"\n"}
</Text>
Organizing and analyzing information for our growing community is central to our Service. A big part of our Service is creating and using cutting-edge technologies that help us personalize, protect, and improve our Service on an incredibly large scale for a broad global community. Technologies like artificial intelligence and machine learning give us the power to apply complex processes across our Service. Automated technologies also help us ensure the functionality and integrity of our Service.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	Ensuring access to our Service.{"\n"}
</Text>
To operate our global Service, we must store and transfer data across our systems around the world, including outside of your country of residence. The use of this global infrastructure is necessary and essential to provide our Service. This infrastructure may be owned or operated by Team Vulcan, or their affiliates.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	Research and innovation.{"\n"}
</Text>
We use the information we have to study our Service and collaborate with others on research to make our Service better and contribute to the well-being of our community.{"\n\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  How Our Service Is Funded{"\n\n"}
</Text>

Instead of paying to use Bird Nest, by using the Service covered by these Terms, you acknowledge that we can show you ads that businesses and organizations pay us to promote on Bird Nest. We use your personal data, such as information about your activity and interests, to show you ads that are more relevant to you.{"\n\n"}

We show you relevant and useful ads without telling advertisers who you are. We don’t sell your personal data. We allow advertisers to tell us things like their business goal and the kind of audience they want to see their ads. We then show their ad to people who might be interested.{"\n\n"}

We also provide advertisers with reports about the performance of their ads to help them understand how people are interacting with their content on and off Bird Nest. For example, we provide general demographic and interest information to advertisers to help them better understand their audience. We don’t share information that directly identifies you (information such as your name or email address that by itself can be used to contact you or identifies who you are) unless you give us specific permission.{"\n\n"}

You may see branded content on Bird Nest posted by account holders who promote products or services based on a commercial relationship with the business partner mentioned in their content.{"\n\n\n"} 

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  The Data Policy{"\n\n"}
</Text>
Providing our Service requires collecting and using your information. You must agree to the Data Policy to use Bird Nest.{"\n\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Your Commitments{"\n\n"}
</Text>

In return for our commitment to provide the Service, we require you to make the below commitments to us.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Who Can Use Bird Nest.{" "} 
</Text>
We want our Service to be as open and inclusive as possible, but we also want it to be safe, secure, and in accordance with the law. So, we need you to commit to a few restrictions in order to be part of the Bird Nest community.{"\n\n"}

•	You must be at least 13 years old.{"\n\n"}
•	You must not be prohibited from receiving any aspect of our Service under applicable laws or engaging in payments related Services if you are on an applicable denied party listing.{"\n\n"}
•	We must not have previously disabled your account for violation of law or any of our policies.{"\n\n"}
•	You must not be a convicted sex offender.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  How You Can't Use Bird Nest.{" "}
</Text>
Providing a safe and open Service for a broad community requires that we all do our part.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't impersonate others or provide inaccurate information.{"\n"}
</Text>
You don't have to disclose your identity on Bird Nest, but you must provide us with accurate and up to date information (including registration information), which may include providing personal data. Also, you may not impersonate someone or something you aren't, and you can't create an account for someone else unless you have their express permission.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't do anything unlawful, misleading, or fraudulent or for an illegal or unauthorized purpose.{"\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't violate (or help or encourage others to violate) these Terms or our policies.{"\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't do anything to interfere with or impair the intended operation of the Service.{"\n"}
</Text>
This includes misusing any reporting, dispute, or appeals channel, such as by making fraudulent or groundless reports or appeals.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't attempt to create accounts or access or collect information in unauthorized ways.{"\n"}
</Text>
This includes creating accounts or collecting information in an automated way without our express permission.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can’t sell, license, or purchase any account or data obtained from us or our Service.{"\n"}
</Text>
This includes attempts to buy, sell, or transfer any aspect of your account (including your username); solicit, collect, or use login credentials or badges of other users; or request or collect Bird Nest usernames, passwords, or misappropriate access tokens.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't post someone else’s private or confidential information without permission or do anything that violates someone else's rights, including intellectual property rights (e.g., copyright infringement, trademark infringement, counterfeit, or pirated goods).{"\n"}
</Text>
You may use someone else's works under exceptions or limitations to copyright and related rights under applicable law. You represent you own or have obtained all necessary rights to the content you post or share. Learn more, including how to report content that you think infringes your intellectual property rights.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can’t modify, translate, create derivative works of, or reverse engineer our products or their components.{"\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You can't use a domain name or URL in your username without our prior written consent.{"\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Permissions You Give to Us.{" "}
</Text>
As part of our agreement, you also give us permissions that we need to provide the Service.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	We do not claim ownership of your content, but you grant us a license to use it.{"\n"}
  </Text>
Nothing is changing about your rights in your content. We do not claim ownership of your content that you post on or through the Service and you are free to share your content with anyone else, wherever you want. However, we need certain legal permissions from you (known as a “license”) to provide the Service. When you share, post, or upload content that is covered by intellectual property rights (like photos or videos) on or in connection with our Service, you hereby grant to us a non-exclusive, royalty-free, transferable, sub-licensable, worldwide license to host, use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content (consistent with your privacy and application settings). This license will end when your content is deleted from our systems. You can delete content individually or all at once by deleting your account. To learn more about how we use information, and how to control or delete your content, visit the Bird Nest Help Center.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	Permission to use your username, profile picture, and information about your relationships and actions with accounts, ads, and sponsored content.{"\n"}
</Text>
You give us permission to show your username, profile picture, and information about your actions (such as likes) or relationships (such as follows) next to or in connection with accounts, ads, offers, and other sponsored content that you follow or engage with that are displayed on Bird Nest, without any compensation to you. For example, we may show that you liked a sponsored post created by a brand that has paid us to display its ads on Bird Nest. As with actions on other content and follows of other accounts, actions on sponsored content and follows of sponsored accounts can be seen only by people who have permission to see that content or follow. We will also respect your ad settings.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  •	You agree that we can download and install updates to the Service on your device.{"\n\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Additional Rights We Retain{"\n\n"}
</Text>

•	If you select a username or similar identifier for your account, we may change it if we believe it is appropriate or necessary (for example, if it infringes someone's intellectual property or impersonates another user).{"\n\n"}
•	If you use content covered by intellectual property rights that we have and make available in our Service (for example, images, designs, videos, or sounds we provide that you add to content you create or share), we retain all rights to our content (but not yours).{"\n\n"}
•	You can only use our intellectual property and trademarks or similar marks with our prior written permission.{"\n\n"}
•	You must obtain written permission from us or under an open source license to modify, create derivative works of, decompile, or otherwise attempt to extract source code from us.{"\n\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Content Removal and Disabling or Terminating Your Account{"\n\n"}
</Text>

•	We can remove any content or information you share on the Service if we believe that it violates these Terms of Use, our policies, or we are permitted or required to do so by law. We can refuse to provide or stop providing all or part of the Service to you (including terminating or disabling your access to Bird Nest) immediately to protect our community or services, or if you create risk or legal exposure for us, violate these Terms of Use or our policies, if you repeatedly infringe other people's intellectual property rights, or where we are permitted or required to do so by law. We can also terminate or change the Service, remove or block content or information shared on our Service, or stop providing all or part of the Service if we determine that doing so is reasonably necessary to avoid or mitigate adverse legal or regulatory impacts on us. If you believe your account has been terminated in error, or you want to disable or permanently delete your account, consult our Help Center. When you request to delete content or your account, the deletion process will automatically begin no more than 30 days after your request. It may take up to 90 days to delete content after the deletion process begins. While the deletion process for such content is being undertaken, the content is no longer visible to other users, but remains subject to these Terms of Use and our Data Policy. After the content is deleted, it may take us up to another 90 days to remove it from backups and disaster recovery systems.{"\n\n"} 
•	Content will not be deleted within 90 days of the account deletion or content deletion process beginning in the following situations:{"\n\n"}
•	where your content has been used by others in accordance with this license and they have not deleted it (in which case this license will continue to apply until that content is deleted); or{"\n\n"}
•	where deletion within 90 days is not possible due to technical limitations of our systems, in which case, we will complete the deletion as soon as technically feasible; or{"\n\n"}
•	where deletion would restrict our ability to:{"\n\n"}
•	investigate or identify illegal activity or violations of our terms and policies (for example, to identify or investigate misuse of our products or systems);{"\n\n"}
•	protect the safety and security of our products, systems, and users;{"\n\n"}
•	comply with a legal obligation, such as the preservation of evidence; or{"\n\n"}
•	comply with a request of a judicial or administrative authority, law enforcement, or a government agency;{"\n\n"}
•	in which case, the content will be retained for no longer than is necessary for the purposes for which it has been retained (the exact duration will vary on a case-by-case basis).{"\n\n"}
•	If you delete or we disable your account, these Terms shall terminate as an agreement between you and us, but this section and the section below called "Our Agreement and What Happens if We Disagree" will still apply even after your account is terminated, disabled, or deleted.{"\n\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Our Agreement and What Happens if We Disagree{"\n\n"}
</Text>

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Our Agreement.{"\n\n"}
</Text>

•	If any aspect of this agreement is unenforceable, the rest will remain in effect.{"\n\n"}
•	Any amendment or waiver to our agreement must be in writing and signed by us. If we fail to enforce any aspect of this agreement, it will not be a waiver.{"\n\n"}
•	We reserve all rights not expressly granted to you.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Who Has Rights Under this Agreement.{"\n\n"}
</Text>

•	Our past, present, and future affiliates and agents, can invoke our rights under this agreement in the event they become involved in a dispute. Otherwise, this agreement does not give rights to any third parties.{"\n\n"}
•	You cannot transfer your rights or obligations under this agreement without our consent.{"\n\n"}
•	Our rights and obligations can be assigned to others. For example, this could occur if our ownership changes (as in a merger, acquisition, or sale of assets) or by law.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Who Is Responsible if Something Happens.{"\n\n"}
</Text>

•	Our Service is provided "as is," and we can't guarantee it will be safe and secure or will work perfectly all the time. TO THE EXTENT PERMITTED BY LAW, WE ALSO DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.{"\n\n"}
•	We also don’t control what people and others do or say, and we aren’t responsible for their (or your) actions or conduct (whether online or offline) or content (including unlawful or objectionable content). We also aren’t responsible for services and features offered by other people or companies, even if you access them through our Service.{"\n\n"}
•	Our responsibility for anything that happens on the Service (also called "liability") is limited as much as the law will allow. If there is an issue with our Service, we can't know what all the possible impacts might be. You agree that we won't be responsible ("liable") for any lost profits, revenues, information, or data, or consequential, special, indirect, exemplary, punitive, or incidental damages arising out of or related to these Terms, even if we know they are possible. This includes when we delete your content, information, or account. Our aggregate liability arising out of or relating to these Terms will not exceed the greater of $100 or the amount you have paid us in the past twelve months.{"\n\n"}
•	You agree to defend (at our request), indemnify and hold us harmless from and against any claims, liabilities, damages, losses, and expenses, including without limitation, reasonable attorney's fees and costs, arising out of or in any way connected with these Terms or your use of the Service. You will cooperate as required by us in the defense of any claim. We reserve the right to assume the exclusive defense and control of any matter subject to indemnification by you, and you will not in any event settle any claim without our prior written consent.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  How We Will Handle Disputes.{"\n\n"}
</Text>

•	Except as provided below, <Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>you and we agree that any cause of action, legal claim, or dispute between you and us arising out of or related to these Terms or Bird Nest ("claim(s)") must be resolved by arbitration on an individual basis. Class actions and class arbitrations are not permitted</Text>
; you and we may bring a claim only on your own behalf and cannot seek relief that would affect other Bird Nest users. If there is a final judicial determination that any particular claim (or a request for particular relief) cannot be arbitrated in accordance with this provision's limitations, then only that claim (or only that request for relief) may be brought in court. All other claims (or requests for relief) remain subject to this provision.{"\n\n"}

•	Instead of using arbitration, you or we can bring claims in your local "small claims" court, if the rules of that court will allow it. If you don't bring your claims in small claims court (or if you or we appeal a small claims court judgment to a court of general jurisdiction), then the claims must be resolved by binding, individual arbitration. The American Arbitration Association will administer all arbitrations under its Consumer Arbitration Rules.
<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>You and we expressly waive a trial by jury.</Text>{"\n\n"}

The following claims don't have to be arbitrated and may be brought in court: disputes related to intellectual property (like copyrights and trademarks), violations of our Platform Policy, or efforts to interfere with the Service or engage with the Service in unauthorized ways (for example, automated ways). In addition, issues relating to the scope and enforceability of the arbitration provision are for a court to decide.{"\n\n"}

This arbitration provision is governed by the Federal Arbitration Act.{"\n\n"}

You can opt out of this provision within 30 days of the date that you agreed to these Terms. To opt out, you must send your name, residence address, username, email address you use for your Bird Nest account, and a clear statement that you want to opt out of this arbitration agreement, and you must send them to Team Vulcan.{"\n\n"}

•	Before you commence arbitration of a claim, you must provide us with a written Notice of Dispute that includes your name, residence address, username, email address or phone number you use for your Bird Nest account, a detailed description of the dispute, and the relief you seek. Any Notice of Dispute you send to us should be mailed to Team Vulcan. Before we commence arbitration, we will send you a Notice of Dispute to the email address you use with your Bird Nest account, or other appropriate means. If we are unable to resolve a dispute within thirty (30) days after the Notice of Dispute is received, you or we may commence arbitration.{"\n\n"}
•	We will pay all arbitration filing fees, administration and hearing costs, and arbitrator fees for any arbitration we bring or if your claims seek less than $75,000 and you timely provided us with a Notice of Dispute. For all other claims, the costs and fees of arbitration shall be allocated in accordance with the arbitration provider's rules, including rules regarding frivolous or improper claims.{"\n\n"}
•	For any claim that is not arbitrated or resolved in small claims court, you agree that it will be resolved exclusively in the U.S. District Court for the Northern District of California or a state court located in San Mateo County. You also agree to submit to the personal jurisdiction of either of these courts for the purpose of litigating any such claim.{"\n\n"}
•	The laws of the State of California, to the extent not preempted by or inconsistent with federal law, will govern these Terms and any claim, without regard to conflict of law provisions.{"\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Unsolicited Material.{"\n\n"}
</Text>

We always appreciate feedback or other suggestions, but may use them without any restrictions or obligation to compensate you for them, and are under no obligation to keep them confidential.{"\n\n\n"}

<Text style={[TermsOfService_Styles.termsText, {fontWeight:"bold" }]}>
  Updating These Terms{"\n\n"}
</Text>

We may change our Service and policies, and we may need to make changes to these Terms so that they accurately reflect our Service and policies. Unless otherwise required by law, we will notify you (for example, through our Service) before we make changes to these Terms and give you an opportunity to review them before they go into effect. Then, if you continue to use the Service, you will be bound by the updated Terms. If you do not want to agree to these or any updated Terms, you can delete your account.

        </Text>
     </ScrollView>
    </SafeAreaView>
  );
};
const TermsOfService_Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    alignItems: "center"
  },
  termsText: {
    fontSize: 15,
    marginHorizontal: 10,
    marginTop: 10,
  },
});
export default TermsOfService;
