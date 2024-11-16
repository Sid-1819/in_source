"use client"

import React from 'react'

import MarkdownEditor from '@uiw/react-markdown-editor';
const GuidelinesTab = () => {
  document.documentElement.setAttribute('data-color-mode', 'light')

    const rules = `
**1. Dates and Timing**
The timings and dates mentioned for each Contest remain the same. Any submissions or willingness to enter or submit after the due dates will not be entertained.


**2. Eligibility**
The Contest IS open to:
- All active CMSS (Cyber Managers Software Services Pvt. Ltd.) employees only.
 For the eligibility of season prizes, you need to be on active payroll of CMSS at the time of Season closure
  - You must apply from CMSS or CMSSL email address only
- You further warrant that your actions do not violate the company's or client policies and procedures.

An Eligible Individual can only submit once in a single contest as one Team or on an individual basis (meaning, he cannot participate as an individual and as a team in the same contest) . If an individual representing a team is entering the Contest, they must appoint and authorize one individual (the “Representative”) to represent, act, and enter a Submission, on their behalf. By entering a Submission on behalf of a Team, you represent and warrant that you are the Representative authorized to act on behalf of your Team.

**3. Contest Prize Eligibility**

1. Substitutions & Changes: Prizes are non-transferable by the winner. CMSS in its sole discretion has the right to make a prize substitution of equivalent value. CMSS will not award a prize if there are no eligible Submissions entered in the Contest, or if there are no eligible Entrants or Submissions for a specific prize.
2. Prize Delivery: Unless explicitly stated otherwise, all prizes are non-transferable and cannot be converted to cash. Any cash prizes if awarded (in a contest) are subject to applicable taxes, which will be the responsibility of the recipient.

**4. Seasonal Prize Eligibility**

1. Substitutions & Changes: Prizes are non-transferable by the winner. CMSS in its sole discretion has the right to make a prize substitution of equivalent value. CMSS will not award a prize if there are no eligible Submissions entered in the Contest, or if there are no eligible Entrants or Submissions for a specific prize.
2. Prize Delivery: Unless explicitly stated otherwise, all prizes are non-transferable and cannot be converted to cash. Any cash prizes if awarded (in a contest) are subject to applicable taxes, which will be the responsibility of the recipient.
3. You must be on an active payroll of CMSS during the final seasonal selection to be eligible for prize
4. You must have participated in at least 10 contests through the season and your submission must be among the qualified submissions

**5. Qualified Submission Meaning**

1. That the work you have submitted is what you own fully / created by you
2. That this is not mere copy paste of work from the internet
3. That it is not a well written submission by using AI prompts
4. That the work submitted does not just contain general ideas or theory but has enough supporting references
5. Content is produced out of your research skills
6. You may use GPT for the purpose of grammar and language improvement but not to auto generate content

**6. How To Enter**

Once you are on the contest hosted site and login.

- Register for the selected Contest that you are interested in on the contest website by clicking the “Join” button.

**7. Submission Requirements**

- A detailed description of what is expected is mentioned in the deliverables section of each contest. You are required to submit the same.

**8. Submission ownership**

Be the original work of the Entrant, be solely owned by the Entrant, and not violate the IP rights of any other person or entity.

**9. Judges & Criteria**

Eligible submissions will be evaluated by a panel of judges selected by the CMSS (the “Judges”). Judges may be employees of CMSS or third parties, may or may not be listed individually on the Website, and may change before or during the Judging Period. Judging may take place in one or more rounds with one or more panels of Judges, at the discretion of CMSS.

**10. Shortlisting process**

__Stage One) Qualification__

The first stage will determine via pass/fail whether the ideas meet a baseline level of viability, in that the Project reasonably fits the theme and reasonably applies the deliverables defined in the Contest. This will be termed as qualified submission. Qualified submissions will count towards the Season prize criteria of no. of contests participated in.

__Stage Two) Ranking__

All Submissions that pass Stage One will be evaluated in Stage Two based on the following criteria (the “Judging Criteria”):

Entries will be judged on the following equally weighted criteria, and according to the sole and absolute discretion of the judges:

- All areas mentioned in the deliverables section
- Out-of-box thinking (creativity / edge cases / deep research)
- Quality of the submitted code / documentation

The scores from the Judges will determine the rank for potential winners of the applicable prizes.

__Stage Three) Fine Tuning Submission__

In the final stage of the contest, By rank, you would be asked to review and cover any additional cases that may have been missed in the original documentation. This process will follow the contestants' ranks, giving the top-ranked participant the first opportunity to complete this task. If the first-ranked contestant fails to submit their work, the chance will pass to the next highest-ranked participant, and so on. The final winner will be determined based on who successfully completes the required documentation. If the first-ranked participant completes it, they will be declared the winner; if they do not, they will move down in rank, and the next eligible participant will have the chance to win. If none of the eligible participants submits the additional documentation, there will be no 1st Rank for the contest.

However, if none of the submissions meets the expected benchmark (All deliverables), no winner will be declared for that contest.

Tie Breaking

For each Rank, if two or more Submissions are tied, the tied Submission with the highest score in the first applicable criterion listed above will be considered the higher scoring Submission. In the event any ties remain, this process will be repeated, as needed, by comparing the tied Submissions’ scores on the next applicable criterion. If two or more Submissions are tied on all applicable criteria, the panel of Judges will vote on the tied Submissions.

**11. Language Requirements**

All Submission materials must be in English.

**12. Team Representation**

If a team is entering the Contest, they must appoint and authorize one individual (the “Representative”) to represent, act, and enter a Submission, on their behalf. The Representative must meet the eligibility requirements above. By entering a Submission on the Contest Website on behalf of a team or organization you represent and warrant that you are the Representative authorized to act on behalf of your team.

All Team members working on the contest should be an active employee during the submission of the contest

**13. Intellectual Property**

Your Submission must: (a) be your (or your Team) original work product; (b) be solely created by you, your Team with no other person or entity having any right or interest in it; and (c) not violate the intellectual property rights or other rights including but not limited to copyright, trademark, patent, contract, and/or privacy rights, of any other person or entity. An Entrant may contract with a third party for technical assistance to create the Submission provided the Submission components are solely the Entrant’s work product and the result of the Entrant’s ideas and creativity, and the Entrant owns all rights to them. An Entrant may submit a Submission that includes the use of open source software or hardware, provided the Entrant complies with applicable open source licenses and, as part of the Submission, creates software that enhances and builds upon the features and functionality included in the underlying open source product. By entering the Contest, you represent, warrant, and agree that your Submission meets these requirements.

You accept that by submitting all materials to the contest, you are granting all rights to refer, use, modify and commercialize by CMSS.

**14. Submission Modifications post deadline**

After the Submission Period. CMSS may permit you to modify part of your Submission after the Submission Period for the purpose of adding, removing or replacing material that potentially infringes a third party mark or right, discloses personally identifiable information, or is otherwise inappropriate. The modified Submission must remain substantively the same as the original Submission with the only modification being what CMSS permits.

**15. General Conditions**

1. CMSS reserves the right, in their sole discretion, to cancel, suspend and/or modify the Contest, or any part of it, in the event of a technical failure, fraud, or any other factor or event that was not anticipated or is not within their control.
2. CMSS reserves the right in their sole discretion to disqualify any individual or Entrant if it finds to be actually or presenting the appearance of tampering with the entry process or the operation of the Contest or to be acting in violation of these Official Rules or in a manner that is inappropriate, unsportsmanlike, not in the best interests of this Contest, or a violation of any applicable law or regulation.
3. Any attempt by any person to undermine the proper conduct of the Contest may be a violation of criminal and civil law. Should CMSS suspect that such an attempt has been made or is threatened, they reserve the right to take appropriate action including but not limited to requiring an Entrant to cooperate with an investigation and referral to criminal and civil law enforcement authorities.
4. If there is any discrepancy or inconsistency between the terms and conditions of the Official Rules and disclosures or other statements contained in any Contest materials, including but not limited to the Contest Submission form, Contest Website, or advertising, the terms and conditions of the Official Rules shall prevail.
5. The terms and conditions of the Official Rules are subject to change at any time, including the rights or obligations of the Entrant and CMSS. CMSS will post the terms and conditions of the amended Official Rules on the Contest Website. To the fullest extent permitted by law, any amendment will become effective at the time specified in the posting of the amended Official Rules or, if no time is specified, the time of posting.
6. If at any time prior to the deadline, an Entrant or prospective Entrant believes that any term in the Official Rules is or may be ambiguous, they must submit a written request for clarification.

**16. Limitations of Liability**

By entering, all Entrants (including, in the case of a Team, all participating members) agree to release the Released Parties from any and all liability in connection with the Prizes or Entrant’s participation in the Contest. Provided, however, that any liability limitation regarding gross negligence or intentional acts, or events of death or body injury shall not be applicable in jurisdictions where such limitation is not legal.`

  return (
    <>
    <h1><strong>Guidelines</strong></h1>
    <MarkdownEditor.Markdown source={rules} />
    </>
  )
}

export default GuidelinesTab
